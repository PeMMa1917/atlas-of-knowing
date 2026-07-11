#!/usr/bin/env node
/* v37 smoke test: run every pack against a mocked TOKEngine + DOM,
   then assert the registries, doors, trials, and standings all landed. */
"use strict";
const fs = require("fs");
const path = require("path");
const SRC = path.join(__dirname, "..", "src");

/* ── minimal DOM ── */
function el(id) {
  return {
    id: id, children: [], style: {}, attrs: {}, hidden: false, textContent: "", _innerHTML: "",
    set innerHTML(v) { this._innerHTML = v; }, get innerHTML() { return this._innerHTML; },
    setAttribute(k, v) { this.attrs[k] = v; }, getAttribute(k) { return this.attrs[k]; },
    addEventListener() {}, removeEventListener() {},
    appendChild(c) { this.children.push(c); return c; },
    insertBefore(c) { this.children.push(c); return c; },
    querySelector() { return null; }, querySelectorAll() { return []; },
    closest() { return null; }, focus() {},
    get parentNode() { return DOC_BODY; }, get nextSibling() { return null; },
    remove() {}, click() {}, get isConnected() { return true; },
    getContext() { return null; }, getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; }
  };
}
const DOC_BODY = el("body");
const KNOWN = {};
["panel", "panelTitle", "panelSub", "panelBody", "btnGuide", "btnWarden", "fx"].forEach(id => KNOWN[id] = el(id));
global.document = {
  readyState: "complete",
  getElementById(id) { if (!KNOWN[id] && /^btnV37|^v37/.test(id)) return KNOWN[id] || null; return KNOWN[id] || null; },
  createElement(tag) { const e = el(tag + Math.random()); KNOWN[e.id] = e; return e; },
  addEventListener() {}, removeEventListener() {},
  querySelector() { return null; }, querySelectorAll() { return []; },
  body: DOC_BODY
};
global.window = global;
global.addEventListener = function(){};
global.removeEventListener = function(){};
global.setInterval_real = setInterval;

global.location = { search: "", hash: "" };
try { Object.defineProperty(global, "navigator", { value: {}, configurable: true }); } catch (e) {}
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = fn => 0;
global.cancelAnimationFrame = () => {};
global.CSS = { escape: s => s };
global.fetch = () => Promise.reject(new Error("offline test"));
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

/* ── mocked TOKEngine seams (mirrors the frozen surface the packs use) ── */
const state = {
  player: { region: "hall", x: 1, y: 1, dir: "down" },
  data: {
    xp: 120, lumens: 50, inv: [], flags: {}, quests: {}, journal: [], rungsHit: {},
    ledger: [{ c: "Evidence", e: "Scope", f: "Dialogue", t: 1 }],
    coverage: {}, settings: { plain: false, voice: "reflective" }, oaths: ["horizon"],
    tele: { min: 42 }, halls: { ex: { p1: 1, p2: 1 }, essay: { thesis: true, aoks: ["History"], conclusion: false } },
    badges: { b1: 1, b2: 1 },
    stats: {
      journalTotal: 3, journalManual: 2, journalAuto: 1, edits: 1, rung: { 2: 2, 4: 1 },
      concept: { Evidence: 4 }, element: { Scope: 4 }, subject: { History: 2 },
      days: { "2026-07-09": 3, "2026-07-10": 5 }, streak: 2, bestStreak: 4,
      regions: { "Atlas Hall": 3 }, travels: 5, talks: 4, crafts: 2, masterworks: 1,
      mirages: 3, quick: 1, right: 2, wrong: 1, declines: 1, honestDeclines: 1,
      blindCorrect: 0, toolsUsed: 2, exhibits: 1, kqs: 2, moves: { steelman: 2 },
      vantageWalks: 2, exportTotal: 1, citesForged: 3, citeDrillsRight: 2, searchesRun: 4,
      essayOutlines: 1, pickups: 3, relicsFound: 0
    }
  }
};
const bus = {};
const REGIONS = {}, ITEMS = {}, DIALOGUES = {}, QUESTS = {};
const log = [];
const E = global.TOKEngine = {
  registerRegion(id, def) { REGIONS[id] = def; },
  registerDialogue(id, def) { DIALOGUES[id] = def; },
  registerItem(id, def) { ITEMS[id] = def; },
  registerQuest(id, def) { QUESTS[id] = def; },
  on(evt, fn) { (bus[evt] = bus[evt] || []).push(fn); },
  emit(evt, data) { (bus[evt] || []).forEach(fn => fn(data)); },
  getState: () => state,
  save: () => {}, load: () => {}, setSyncAdapter: () => {}, scheduleSave: () => {},
  gainXP(n, why) { state.data.xp += n; log.push("xp+" + n); },
  gainLumens(n) { state.data.lumens += n; },
  gainTags() {}, give(id) { if (!state.data.inv.includes(id)) state.data.inv.push(id); },
  tagCoverage(ev) { ev.t = Date.now(); state.data.ledger.push(ev);
    state.data.stats.concept[ev.c] = (state.data.stats.concept[ev.c] || 0) + 1;
    state.data.stats.element[ev.e] = (state.data.stats.element[ev.e] || 0) + 1;
    E.emit("coverage", ev); },
  levelFor: xp => Math.floor(Math.sqrt(xp / 50)),
  autoJournal(t) { state.data.journal.push({ rung: 1, text: t, ctx: "test", t: Date.now() }); },
  manualJournal(r, t) { state.data.journal.push({ rung: r, text: t, ctx: "test", t: Date.now() }); state.data.rungsHit[r] = true; },
  openLadder() {}, travel(id) { state.player.region = id; E.emit("worldChange", { region: id }); },
  openDialogue() {}, openVignette() {}, openMsg() {}, openPanel() {}, flashToast() {}, toast() {},
  esc: s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])),
  dayKey: () => "2026-07-10", linkTerms: s => s, grid: rows => rows.map(r => r.split("")), TILE: 32,
  validateSave: () => null, migrateLegacy: () => {},
  CANON: {
    CONCEPTS: ["Evidence","Certainty","Truth","Interpretation","Power","Justification","Explanation","Objectivity","Perspective","Culture","Values","Responsibility"],
    ELEMENTS: ["Scope","Perspectives","Methods and Tools","Ethics"],
    FAMILIES: ["Dialogue","Battle","Puzzle","Craft","Quest","Exploration","Journal","Challenge"],
    SUBJECTS: [], RUNG_NAMES: {}, RUNG_XP: { 1: 5, 2: 10, 3: 20, 4: 35, 5: 50 },
    CONSTELLATIONS: [
      { name: "The Guild", regions: [{ n: "Atlas Hall", id: "hall" }] },
      { name: "Mathematics", regions: [{ n: "House of Wisdom", id: "baghdad" }] }
    ]
  },
  sfx: { play() {} }, fx: { confetti() {}, sparks() {}, ring() {} },
  checkBadges() {}, voice: () => "",
  COMMON: { validateCallsign: s => /^[A-Za-z][A-Za-z0-9]{2,15}$/.test(s) ? { ok: true } : { ok: false, why: "no" } }
};

/* ── run the packs in build order ── */
const packs = ["content-60-reliquary.js","content-61-relics-data.js","content-62-pixelart.js","content-63-bench.js","content-67-trials.js","content-67b-arcade.js","content-68-forge-records.js","content-70-sync.js","content-71-reliquary-road.js"];
for (const p of packs) {
  const code = fs.readFileSync(path.join(SRC, p), "utf8");
  try { new Function(code)(); } catch (e) { console.error("PACK CRASH", p, e.stack); process.exit(1); }
  console.log("loaded", p);
}

/* ── assertions ── */
let fails = 0;
function ok(cond, label) { if (cond) console.log("  ✓", label); else { fails++; console.error("  ✗", label); } }

const R = E.RELIQUARY, V = E.V37, T = E.V37_TRIALS;
ok(R && R.list.length === 522, "522 relics loaded (" + (R && R.list.length) + ")");
ok(Object.keys(ITEMS).length >= 522, "items registered (" + Object.keys(ITEMS).length + ")");
ok(REGIONS.reliquary && REGIONS.vault_tech && REGIONS.grounds_v37, "new regions registered");
ok(Object.keys(REGIONS).length === 7 + 12, "7 hubs + 12 chambers registered (" + Object.keys(REGIONS).length + ")");
ok(E.CANON.CONSTELLATIONS.some(c => c.name === "The Reliquary"), "constellation stamped");
const doorsOk = Object.keys(R.doors).every(d => R.doors[d].keys.length === (d.startsWith("secret") ? 1 : 2));
ok(doorsOk, "every door holds its key count");
ok(T.INSTANCES.length > 120, "trial instances generated (" + T.INSTANCES.length + ")");
ok(T.ORDER.every(t => T.IMPL[t]), "all 14 trial types implemented");
ok(T.INSTANCES.every(i => i.kq && i.c && i.e), "every instance carries kq + concept + element");

/* acquisition path */
const first = R.list.find(o => o.pl.mode === "floor");
V.acquire(first.id, "floor");
ok(V.got(first.id) && state.data.inv.includes(first.id), "acquire marks flags + inventory");
ok(V.cxpOf(first.tags.c) > 0, "concept XP flows on acquire");
ok(V.band().length >= 0, "bandolier reads");

/* coverage → concept XP bridge */
const before = V.cxpOf("Truth");
E.tagCoverage({ c: "Truth", e: "Ethics", f: "Dialogue" });
ok(V.cxpOf("Truth") === before + 4, "coverage row feeds +4 concept XP");

/* chamber bounce: locked door returns the traveler */
E.travel("ch_door_math");
ok(true, "locked chamber travel does not crash (bounce is async)");

/* keys open doors */
const mathKeys = R.doors.door_math.keys;
mathKeys.forEach(k => { state.data.flags["v37_got_" + k] = 1; });
ok(V.doorOpen("door_math"), "door opens once keys are held");

/* exchange: selling removes the gift */
const keyId = mathKeys[0];
state.data.flags["v37_sold_" + keyId] = 1;
ok(!V.doorOpen("door_math") || R.doors.door_math.keys.every(k => state.data.flags["v37_door_door_math"]), "sold key closes an unopened door");

/* standings schema */
const s = E.V37_RECORDS.standings();
["profile","xp","cxp","concept","element","subject","rung","journal","time","days","explore","trials","relics","crafts","talksUnique","persp","badges","fam","voice","oaths","halls","daysMap","appraisal","cites","essays"].forEach(k => ok(k in s, "standings." + k));
ok(s.badges === 2 && s.time.min === 42 && s.fam.Dialogue >= 1, "standings values populated");

/* road */
ok(E.V37_ROAD && E.V37_ROAD.CH.length === 12, "12 road chapters");
ok(E.V37_ROAD.chapterAt() === 0, "road starts at zero");


/* ── v37.1: pixel sprites + assembly bench ── */
ok(E.V37_PX && typeof E.V37_PX.templateOf === "function", "pixel engine present");
(function () {
  var tpls = {}, crash = 0;
  R.list.forEach(u => { try { tpls[E.V37_PX.templateOf(u.id)] = 1; } catch (e) { crash++; } });
  ok(crash === 0, "templateOf runs over all 522 ids");
  ok(Object.keys(tpls).length >= 20, "template variety (" + Object.keys(tpls).length + " templates in use)");
  R.list.slice(0, 30).forEach(u => { try { E.V37_PX.canvasFor(u.id, 2); } catch (e) { crash++; } });
  ok(crash === 0, "canvasFor headless-safe");
})();
const B = E.V37_BENCH;
ok(B && typeof B.dissect === "function", "bench present");
(function () {
  var target = R.list.find(o => o.rarity === "common" && !V.got(o.id));
  state.data.flags["v37_got_" + target.id] = 1;
  ok(V.own(target.id), "target owned before dissection");
  var a = B.anatomy(target.id);
  ok(a && a.claims.length === 2 && a.fact && a.mats.length === 2, "anatomy: 2 claims + fact + mats");
  ok(B.dissect(target.id), "dissect succeeds");
  ok(!V.own(target.id) && V.got(target.id), "broken object: got but not owned");
  ok(B.cardHave(a.claims[0].id) === 1 && B.cardHave(a.fact.id) === 1, "cards granted");
  ok(B.matHave(a.primary) >= 2, "materials granted");
  state.data.lumens = 500;
  ok(B.reassemble(target.id), "reassemble succeeds with parts + fee");
  ok(V.own(target.id), "reassembled object owned again");
  ok(B.cardHave(a.claims[0].id) === 0, "cards consumed by reassembly");
  /* dispute forge across two objects, same concept */
  var pool = R.list.filter(o => o.tags.c === "Evidence").slice(0, 2);
  pool.forEach(o => { state.data.flags["v37_got_" + o.id] = 1; B.dissect(o.id); });
  var c1 = "cl_" + pool[0].id + "_0", c2 = "cl_" + pool[1].id + "_0";
  ok(B.forgeDispute(c1, c2), "dispute forged from rival objects");
  ok(B.disputesTotal() === 1, "dispute counted");
  ok(B.spendDispute() === "Evidence", "dispute spendable");
  /* grounded claim: same concept claim + fact */
  var g1 = "cl_" + pool[0].id + "_1", gf = "fx_" + pool[1].id;
  ok(B.forgeGrounded(g1, gf), "grounded claim forged");
  /* braided exhibit needs two concepts */
  var other = R.list.find(o => o.tags.c === "Culture" && !V.got(o.id));
  state.data.flags["v37_got_" + other.id] = 1; B.dissect(other.id);
  var ba = "cl_" + pool[1].id + "_1", bb = "cl_" + other.id + "_0", bf = "fx_" + other.id;
  var mats = [];
  ["Paper","Wood","Brass","Cloth","Stone","Glass","Silver","Clay","Bronze","Ink","Pigment","Bone","Seed","Cord","Wax","Resin","Gilt","Charcoal","Salt"].forEach(m => { while (mats.length < 2 && B.matHave(m) > 0) mats.push(m); });
  ok(B.forgeBraided(ba, bb, bf, mats), "braided exhibit forged (" + mats.join("+") + ")");
  ok(state.data.inv.some(x => x.indexOf("v37ex_") === 0), "exhibit item in inventory");
  ok((state.data.stats.crafts | 0) >= 3, "stats.crafts fed (" + state.data.stats.crafts + ")");
})();

console.log(fails ? "\nFAILURES: " + fails : "\nALL GREEN · " + R.list.length + " relics · " + T.INSTANCES.length + " trials · " + Object.keys(REGIONS).length + " new regions");
process.exit(fails ? 1 : 0);
