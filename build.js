#!/usr/bin/env node
/* Atlas v37 build: merge object batches, validate, generate the data pack,
   assemble index.html, and report. Run from atlas-v37/. */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const OBJ_DIR = path.join(ROOT, "data", "objects");
const SRC = path.join(ROOT, "src");

const CONCEPTS = ["Evidence","Certainty","Truth","Interpretation","Power","Justification","Explanation","Objectivity","Perspective","Culture","Values","Responsibility"];
const ELEMENTS = ["Scope","Perspectives","Methods and Tools","Ethics"];
const SUBJECTS = ["Mathematics","Biology","Chemistry","Physics","ESS","Sports Science","Computer Science","History","Geography","Economics","Psychology","Global Politics","Business Management","World Religions","English A: Language and Literature","Literature A","Language B","Visual Arts","Music","Theatre","Film","Design Technology","Philosophy"];
const REGIONS = ["hall","baghdad","timbuktu","kerala","maya","rod","hut8","royal","ulugh","shore","beagle","haya","ring","florence","ukiyo","benin","harlem","songlines","cave","library","griot","zimbabwe","cusco","historian","commission","seoul","qero","aggregate","reliquary","vault_tech","vault_lang","vault_pol","vault_rel","vault_knower","grounds_v37","ch_door_math","ch_door_ns","ch_door_arts","ch_door_hist","ch_door_hs","ch_door_themes","ch_secret_ma","ch_secret_ns","ch_secret_ar","ch_secret_hi","ch_secret_hu","ch_secret_th"];
const MODES = ["floor","npc","cache","shop","minigame","chamber"];
const MINIGAMES = ["Assumption Sweep","Claim Forge","Perspective Prism","Scales of Justification","Fallacy Volley","Boundary Maze","Rung Climb","Memory of the Hall","Cipher of the Stacks","Socratic Serve","Switchworks","Slide of Provenance","Shadow Archive","Tactica: Grid of Claims"];
const EFFECTS = ["insight","stamina","key","battle","ability","path","perspective"];
const DOORS = ["door_math","door_ns","door_arts","door_hist","door_hs","door_themes","secret_ma","secret_ns","secret_ar","secret_hi","secret_hu","secret_th"];

const HARD_BANNED = [
  "—", " tension", "delve", "pivotal", "crucial", "underscor", "important to note",
  "genuine", "sophisticated", "honestly", "honest ", "honesty", "powerful",
  "most people", "not only", "not just", "but also", "the kind of",
  "doing something", "something happens", "the way that", "it is worth"
];
const WORD_BANNED = ["worth", "work", "works", "worked", "working", "workshop", "artwork", "real", "sharp", "sharper", "sharply", "sharpen", "honest"];
const OPENER_BANNED = [/\bit is\b/i, /\bthis is\b/i, /\bthere is\b/i, /\bthat is\b/i, /\bthat makes\b/i];

function visibleText(o) {
  return [o.name, o.desc, o.rw, o.kq, (o.ans||[]).join(" "), (o.pl && o.pl.detail) || ""].join(" | ");
}

const problems = [], warnings = [];
let all = [], ids = new Set(), names = new Set();
["b60","b61","b62","b63","b64","b65","b66"].forEach(b => {
  const p = path.join(OBJ_DIR, b + ".json");
  if (!fs.existsSync(p)) { problems.push("missing batch " + b); return; }
  let arr;
  try { arr = JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { problems.push(b + " parse: " + e.message); return; }
  arr.forEach(o => { o._batch = b; });
  all = all.concat(arr);
});

const doorKeys = {};
all.forEach(o => {
  const where = o.id || "(no id)";
  if (!o.id) problems.push("no id in " + o._batch);
  if (ids.has(o.id)) problems.push("dup id " + o.id);
  ids.add(o.id);
  const nm = String(o.name||"").toLowerCase();
  if (names.has(nm)) warnings.push("dup name " + o.name);
  names.add(nm);
  if (!REGIONS.includes(o.region)) problems.push(where + " region " + o.region);
  if (!o.pl || !MODES.includes(o.pl.mode)) problems.push(where + " mode " + (o.pl && o.pl.mode));
  if (o.pl && o.pl.mode === "minigame" && !MINIGAMES.includes(String(o.pl.detail).trim())) problems.push(where + " minigame " + o.pl.detail);
  if (o.pl && o.pl.mode === "shop" && !(o.pl.cost >= 5 && o.pl.cost <= 400)) warnings.push(where + " shop cost " + o.pl.cost);
  if (!o.eff || !EFFECTS.includes(o.eff.t)) problems.push(where + " eff " + (o.eff && o.eff.t));
  if (o.eff && o.eff.t === "key") {
    if (!DOORS.includes(o.eff.door)) problems.push(where + " door " + o.eff.door);
    else (doorKeys[o.eff.door] = doorKeys[o.eff.door] || []).push(o.id);
  }
  if (o.eff && o.eff.t === "path" && !REGIONS.includes(o.eff.region)) problems.push(where + " path region " + o.eff.region);
  if (o.eff && o.eff.t === "perspective" && !CONCEPTS.includes(o.eff.c)) problems.push(where + " persp concept " + o.eff.c);
  if (o.eff && o.eff.t === "insight" && !CONCEPTS.includes(o.eff.c)) problems.push(where + " insight concept " + o.eff.c);
  if (!o.tags || !CONCEPTS.includes(o.tags.c)) problems.push(where + " concept " + (o.tags && o.tags.c));
  if (!o.tags || !ELEMENTS.includes(o.tags.e)) problems.push(where + " element " + (o.tags && o.tags.e));
  if (o.tags && o.tags.s && !SUBJECTS.includes(o.tags.s)) problems.push(where + " subject " + o.tags.s);
  if (!/\?\s*$/.test(String(o.kq||""))) warnings.push(where + " kq lacks ?");
  if (!Array.isArray(o.ans) || o.ans.length !== 2) problems.push(where + " needs exactly 2 answers");
  if (o.img && !/^(commons\.wikimedia\.org|https:\/\/commons\.wikimedia\.org)/.test(o.img)) warnings.push(where + " img not commons: " + o.img);

  const txt = visibleText(o), low = " " + txt.toLowerCase() + " ";
  HARD_BANNED.forEach(w => { if (low.includes(w)) warnings.push("banned '" + w.trim() + "' in " + where + ": …" + txt.slice(Math.max(0, low.indexOf(w) - 20), low.indexOf(w) + 30) + "…"); });
  WORD_BANNED.forEach(w => {
    const re = new RegExp("\\b" + w + "\\b", "i");
    const m = re.exec(txt);
    if (m) warnings.push("banned word '" + w + "' in " + where + ": …" + txt.slice(Math.max(0, m.index - 24), m.index + 28) + "…");
  });
  OPENER_BANNED.forEach(re => { const m = re.exec(txt); if (m) warnings.push("banned opener '" + m[0] + "' in " + where + ": …" + txt.slice(Math.max(0, m.index - 24), m.index + 30) + "…"); });
});
DOORS.forEach(d => {
  const n = (doorKeys[d] || []).length;
  const want = d.startsWith("secret") ? 1 : 2;
  if (n !== want) warnings.push("door " + d + " has " + n + " keys (wants " + want + ")");
});

const thatCount = all.reduce((a, o) => a + (visibleText(o).match(/\bthat\b/gi) || []).length, 0);

/* master json for the spreadsheet + teacher.html */
all.forEach(o => delete o._batch);
fs.writeFileSync(path.join(ROOT, "data", "objects-master.json"), JSON.stringify(all, null, 1));

/* game data pack: only the fields the runtime reads */
const gameFields = all.map(o => ({ id:o.id, name:o.name, icon:o.icon, region:o.region, pl:o.pl, eff:o.eff, tags:o.tags, kq:o.kq, ans:o.ans, rw:o.rw, desc:o.desc, mla:o.mla||[] }));
const dataPack = "/* ---- content-61-relics-data.js (generated by build.js; edit data/objects/*.json instead) ---- */\n" +
  "(function(){\n\"use strict\";\nvar E = window.TOKEngine;\nif (!E || !E.relicsLoad) { try { console.warn(\"[relics-data] runtime missing\"); } catch (e) {} return; }\n" +
  "E.relicsLoad(" + JSON.stringify(gameFields) + ");\n})();\n";
fs.writeFileSync(path.join(SRC, "content-61-relics-data.js"), dataPack);

/* assemble index.html */
const packs = ["content-60-reliquary.js","content-61-relics-data.js","content-62-pixelart.js","content-63-bench.js","content-67-trials.js","content-67b-arcade.js","content-68-forge-records.js","content-70-sync.js","content-71-reliquary-road.js"];
let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
/* strip any previously injected v37 block for idempotent rebuilds */
html = html.replace(/\n<!-- V37 PACKS START -->[\s\S]*<!-- V37 PACKS END -->\n/, "\n");
let inject = "\n<!-- V37 PACKS START -->\n";
packs.forEach(p => {
  const code = fs.readFileSync(path.join(SRC, p), "utf8");
  if (code.includes("</scr" + "ipt>")) problems.push(p + " contains a script closing tag");
  new Function(code); /* syntax gate: throws on parse error */
  inject += "<script>\n" + code + "\n</scr" + "ipt>\n";
});
inject += "<!-- V37 PACKS END -->\n";
if (!html.includes("</body>")) problems.push("index.html lacks </body>");
html = html.replace("</body>", inject + "</body>");
/* stamp the build */
html = html.replace(/<title>[^<]*<\/title>/, "<title>The Atlas of Knowing · v37 · An Open-World Journey Through Theory of Knowledge</title>");
fs.writeFileSync(path.join(ROOT, "index.html"), html);

console.log("objects:", all.length);
console.log("by batch:", ["b60","b61","b62","b63","b64","b65","b66"].map(b => b + "=" + all.filter(o => (o.id||"").startsWith(b === "b60" ? "v37_" : "r" + b.slice(1))).length).join(" "));
console.log("modes:", MODES.map(m => m + "=" + all.filter(o => o.pl.mode === m).length).join(" "));
console.log("effects:", EFFECTS.map(e => e + "=" + all.filter(o => o.eff.t === e).length).join(" "));
console.log("images filled:", all.filter(o => o.img).length);
console.log("soft 'that' count:", thatCount);
console.log("index.html bytes:", fs.statSync(path.join(ROOT, "index.html")).size);
console.log("PROBLEMS:", problems.length); problems.slice(0, 40).forEach(p => console.log("  ✗", p));
console.log("WARNINGS:", warnings.length); warnings.slice(0, 60).forEach(w => console.log("  ⚠", w));
process.exit(problems.length ? 1 : 0);
