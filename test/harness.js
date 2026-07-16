#!/usr/bin/env node
/* Atlas v37 playthrough harness. Boots the whole game headlessly (jsdom),
   then drives keys, panels, dialogues, pickups, duels, search, trials,
   and save/load through the guarded test seam (?atlastest=1).
   Run: npm i jsdom && node test/harness.js */
"use strict";
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const OBJECTS = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "objects-master.json"), "utf8"));

const errors = [];
const results = [];
let cur = "boot";
function ok(name, cond, detail) {
  results.push({ s: cur, name, pass: !!cond, detail: detail || "" });
  if (!cond) console.log("  FAIL [" + cur + "] " + name + (detail ? " :: " + detail : ""));
}
function section(s) { cur = s; console.log("- " + s); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fake2d(canvas) {
  const prim = { canvas: canvas, fillStyle: "#000", strokeStyle: "#000", lineWidth: 1, font: "10px x", textAlign: "left", textBaseline: "top", globalAlpha: 1, imageSmoothingEnabled: false };
  return new Proxy(prim, {
    get(t, p) {
      if (p in t) return t[p];
      if (p === "measureText") return () => ({ width: 10 });
      if (p === "getImageData") return (x, y, w, h) => ({ data: new Uint8ClampedArray(4 * (w || 1) * (h || 1)), width: w || 1, height: h || 1 });
      if (p === "createImageData") return (w, h) => ({ data: new Uint8ClampedArray(4 * (w || 1) * (h || 1)), width: w, height: h });
      if (p === "createLinearGradient" || p === "createRadialGradient") return () => ({ addColorStop() {} });
      if (p === "createPattern") return () => ({});
      return () => {};
    },
    set(t, p, v) { t[p] = v; return true; },
  });
}

async function boot(storageSeed, size) {
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => errors.push("[" + cur + "] " + String(e.message || e).slice(0, 220)));
  const dom = new JSDOM(HTML, {
    url: "https://atlas.test/?atlastest=1",
    runScripts: "dangerously",
    virtualConsole: vc,
    beforeParse(w) {
      if (size) {
        Object.defineProperty(w, "innerWidth", { configurable: true, value: size.w });
        Object.defineProperty(w, "innerHeight", { configurable: true, value: size.h });
      }
      w.requestAnimationFrame = (fn) => w.setTimeout(() => fn(Date.now()), 40);
      w.cancelAnimationFrame = (id) => w.clearTimeout(id);
      w.HTMLCanvasElement.prototype.getContext = function () { return fake2d(this); };
      w.HTMLCanvasElement.prototype.toDataURL = () => "data:image/png;base64,AAAA";
      if (!w.matchMedia) w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
      w.Element.prototype.scrollIntoView = w.Element.prototype.scrollIntoView || function () {};
      w.fetch = () => Promise.resolve({ ok: false, json: () => Promise.resolve({}), text: () => Promise.resolve("") });
      if (!w.CSS) w.CSS = {};
      if (!w.CSS.escape) w.CSS.escape = (s) => String(s).replace(/[^a-zA-Z0-9_-]/g, (c) => "\\" + c);
      w.addEventListener("error", (e) => errors.push("[" + cur + "] " + String(e.message).slice(0, 220)));
      if (storageSeed) for (const k in storageSeed) w.localStorage.setItem(k, storageSeed[k]);
    },
  });
  await sleep(900);
  return dom;
}

function press(W, k) {
  W.document.body.dispatchEvent(new W.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }));
  W.document.body.dispatchEvent(new W.KeyboardEvent("keyup", { key: k, bubbles: true, cancelable: true }));
}
function hold(W, k) { W.document.body.dispatchEvent(new W.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true })); }
function lift(W, k) { W.document.body.dispatchEvent(new W.KeyboardEvent("keyup", { key: k, bubbles: true, cancelable: true })); }
function clickText(W, rootSel, txt) {
  const root = W.document.querySelector(rootSel);
  if (!root) return false;
  const b = Array.from(root.querySelectorAll("button")).find((x) => (x.textContent || "").indexOf(txt) >= 0);
  if (b) b.click();
  return !!b;
}
function btnLabels(W, rootSel) {
  const root = W.document.querySelector(rootSel);
  if (!root) return [];
  return Array.from(root.querySelectorAll("button")).map((b) => (b.textContent || "").replace(/^\s*\d+\s*/, "").trim()).filter(Boolean);
}

(async function main() {
  section("boot");
  const dom = await boot();
  const W = dom.window;
  const A = W.__ATLAS_TEST__;
  ok("test seam alive", !!A);
  ok("no script errors during load", errors.length === 0, errors.join(" | "));
  if (!A) { console.log("cannot continue"); process.exit(2); }

  const st = () => A.state;
  st().data.avatar.name = "Harness";
  st().data.flags.arrival_letter = 1;
  st().data.flags.threshold_done = 1;
  st().data.flags.arrival_done = 1;
  st().data.flags.arrival_read = 1;
  st().data.flags.arrival_reading = "communities";
  st().data.settings.twSpeed = 99;
  st().data.settings.reducedMotion = true;
  st().data.settings.audioOn = false;
  A.closePanel(); A.closeDialogue(); A.toggleSatchel(false);

  /* -- keymap: one key, one action -- */
  section("keymap");
  press(W, "a");
  ok("'a' opens no panel (walking only)", A.panelOpen === null, "panelOpen=" + A.panelOpen);
  ok("'a' absent from PANEL_KEYS", !("a" in A.PANEL_KEYS) && !("A" in A.PANEL_KEYS));
  A.closePanel(); A.closeDialogue(); A.toggleSatchel(false);
  press(W, "i");
  ok("'i' opens the satchel alone", A.satchelOpen === true && A.panelOpen === null, "panel=" + A.panelOpen);
  press(W, "Escape");
  ok("Escape closes the satchel", A.satchelOpen === false);
  const single = { o: "settings", x: "loom", z: "halls", m: "map", j: "journal", g: "market" };
  for (const k in single) {
    A.closePanel(); A.closeDialogue(); A.toggleSatchel(false);
    press(W, k);
    await sleep(25);
    ok("'" + k + "' opens exactly '" + single[k] + "'", A.panelOpen === single[k], "got " + A.panelOpen);
    press(W, "Escape");
    ok("Escape closes '" + single[k] + "'", A.panelOpen === null);
  }
  A.openDialogue("sefa");
  press(W, "o"); press(W, "x"); press(W, "z"); press(W, "i");
  ok("o/x/z/i leave a running dialogue alone", !!A.dlgCurrent && A.panelOpen === null && !A.satchelOpen, "dlg=" + !!A.dlgCurrent + " panel=" + A.panelOpen);
  A.closeDialogue();

  A.travel("hall", undefined);
  await sleep(150);
  const x0 = st().player.x;
  hold(W, "d"); await sleep(600); lift(W, "d");
  const x1 = st().player.x;
  ok("'d' moves the character", x1 > x0, "x " + x0 + " -> " + x1);
  hold(W, "a"); await sleep(600); lift(W, "a");
  const x2 = st().player.x;
  ok("'a' moves the character", x2 < x1, "x " + x1 + " -> " + x2);

  /* -- panels: Escape closes every one -- */
  section("panels-escape");
  const kinds = ["map", "ledger", "journal", "settings", "skills", "badges", "record", "atelier", "market", "puzzles", "roads", "envoys", "codex", "human", "fair", "guide", "chart", "loom", "halls", "grounds", "warden"];
  for (const kind of kinds) {
    A.closePanel(); A.closeDialogue();
    try { A.openPanel(kind); } catch (e) { ok(kind + ": opens", false, String(e)); continue; }
    await sleep(10);
    const opened = A.panelOpen;
    press(W, "Escape");
    ok(kind + ": opens, Escape closes", opened === kind && A.panelOpen === null, "opened=" + opened + " after=" + A.panelOpen);
  }
  for (const fn of ["openRelics", "openSearch", "openExchange"]) {
    A.closePanel();
    W.TOKEngine.V37[fn]();
    await sleep(10);
    const openedV = A.panelOpen;
    press(W, "Escape");
    ok(fn + ": Escape closes", !!openedV && A.panelOpen === null, "opened=" + openedV);
  }
  const trialsChip = W.document.getElementById("btnV37Trials");
  ok("trials chip present, no shortcut suffix", !!trialsChip && trialsChip.textContent.indexOf("·") < 0, trialsChip && trialsChip.textContent);
  if (trialsChip) {
    trialsChip.click(); await sleep(10);
    const tOpen = A.panelOpen;
    press(W, "Escape");
    ok("trials browser: Escape closes", !!tOpen && A.panelOpen === null, "opened=" + tOpen);
  }

  /* -- dialogue graph: every choice lands -- */
  section("dialogue-graph");
  const bad = [], dups = [];
  const D = A.DIALOGUES;
  Object.keys(D).forEach((id) => {
    const def = D[id];
    Object.keys(def.nodes).forEach((nk) => {
      const node = def.nodes[nk];
      try {
        const t = typeof node.text === "function" ? node.text(st()) : node.text;
        if (t == null || t === "") bad.push(id + "/" + nk + ": empty text");
      } catch (e) { bad.push(id + "/" + nk + ": text throws " + e.message); }
      const list = node.choices || (node.next ? [{ t: "Continue", next: node.next }] : []);
      const seen = {};
      list.forEach((c) => {
        if (c.next && !def.nodes[c.next]) bad.push(id + "/" + nk + " -> missing node " + c.next);
        const lab = String(c.t || "").toLowerCase();
        if (seen[lab]) dups.push(id + "/" + nk + ": duplicate choice '" + c.t + "'");
        seen[lab] = 1;
      });
    });
  });
  ok("all " + Object.keys(D).length + " dialogue trees: choices land on live nodes", bad.length === 0, bad.slice(0, 5).join(" | "));
  ok("no duplicate choice labels inside a node", dups.length === 0, dups.slice(0, 5).join(" | "));

  /* -- number keys select, never close -- */
  section("number-keys");
  A.closePanel(); A.closeDialogue();
  let hit = 0;
  A.openMsgOpts("Probe", "pick one", [{ t: "first", fn: () => { hit = 1; } }, { t: "second", fn: () => { hit = 2; } }]);
  press(W, "2");
  ok("number key fires the option callback", hit === 2, "hit=" + hit);
  ok("dialogue stays open when the option keeps it open", !!A.dlgCurrent);
  press(W, "9");
  ok("out-of-range number does nothing", !!A.dlgCurrent);
  A.closeDialogue();
  A.openDialogue("sefa");
  press(W, "1");
  ok("number key advances a story dialogue", !!A.dlgCurrent);
  const badges = Array.from(W.document.querySelectorAll("#dlgChoices .choice .num")).map((n) => n.textContent.trim());
  ok("every visible choice wears a numeric badge", badges.length > 0 && badges.every((t) => /^\d+$/.test(t)), JSON.stringify(badges));
  ok("badges count as 1..n in order", badges.every((t, i) => +t === i + 1), JSON.stringify(badges));
  const railIdx = Array.from(W.document.querySelectorAll("#dlgChoices .choice")).findIndex((b) => b.textContent.indexOf("Remind me who you are") >= 0);
  if (railIdx >= 0) {
    press(W, String(railIdx + 1));
    await sleep(10);
    ok("rail option answers to its number key", W.document.querySelectorAll(".rrInfo").length === 1, "boxes=" + W.document.querySelectorAll(".rrInfo").length);
  }
  A.closeDialogue();

  /* -- the rail: no doubled lines, ever -- */
  section("rail-dedup");
  A.openDialogue("sefa");
  const whyHit = clickText(W, "#dlgChoices", "Why does this matter");
  await sleep(10);
  clickText(W, "#dlgChoices", "Why does this matter");
  await sleep(10);
  const boxes = W.document.querySelectorAll(".rrInfo").length;
  ok("'Why does this matter?' twice keeps one info box", whyHit && boxes === 1, "boxes=" + boxes);
  const railLine = "what the Atlas covers depends";
  const shown = (W.document.getElementById("dlgText").textContent + " " + Array.from(W.document.querySelectorAll(".rrInfo")).map((b) => b.textContent).join(" "));
  ok("rail line appears once, never doubled", shown.split(railLine).length - 1 <= 1, "count=" + (shown.split(railLine).length - 1));
  press(W, "Escape");
  A.openDialogue("kip");
  ok("stale info boxes cleared by the next dialogue", W.document.querySelectorAll(".rrInfo").length === 0);
  A.closeDialogue();
  A.openDialogue("sefa"); A.closeDialogue();
  A.openVignette("A Plain Card", "No rail buttons belong here.");
  const vLabels = btnLabels(W, "#dlgChoices");
  ok("vignette shows only its own Continue", vLabels.length === 1, JSON.stringify(vLabels));
  A.closeDialogue();

  /* -- chorus voices: unique options, numbers act -- */
  section("chorus");
  const chorusProblems = [];
  let sawSumUp = false, sawOldDup = false;
  Object.keys(A.CHORUS).forEach((rid) => {
    (A.CHORUS[rid].v || []).forEach((v, i) => {
      try {
        A.rrChorusOpen(rid, i);
        const labs = btnLabels(W, "#dlgChoices").map((l) => l.toLowerCase());
        const seen = {};
        labs.forEach((l) => { if (seen[l]) chorusProblems.push(rid + "#" + i + " duplicate: " + l); seen[l] = 1; });
        if (labs.some((l) => l.indexOf("sum up the whole debate") >= 0)) sawSumUp = true;
        if (labs.some((l) => l.indexOf("say the whole argument plainly") >= 0)) sawOldDup = true;
        A.closeDialogue();
      } catch (e) { chorusProblems.push(rid + "#" + i + " throws: " + e.message); }
    });
  });
  ok("every chorus voice opens with unique options", chorusProblems.length === 0, chorusProblems.slice(0, 4).join(" | "));
  ok("redundant 'say/state it plainly' pair resolved", sawSumUp && !sawOldDup, "sumUp=" + sawSumUp + " old=" + sawOldDup);
  A.rrChorusOpen("hall", 0);
  press(W, "1");
  ok("chorus: number key acts instead of closing", !!A.dlgCurrent);
  A.closeDialogue();

  /* -- pickups: collect, read, continue -- */
  section("pickup");
  let spot = null;
  for (const rid in A.REGIONS) {
    const rg = A.REGIONS[rid];
    for (const k in (rg.interactables || {})) {
      const it = rg.interactables[k];
      if (it.type === "pickup" && A.ITEMS[it.item]) { spot = { rid, key: k, item: it.item }; break; }
    }
    if (spot) break;
  }
  ok("a codex pickup exists somewhere", !!spot, JSON.stringify(spot));
  if (spot) {
    A.travel(spot.rid, undefined);
    await sleep(60);
    const xy = spot.key.split(",");
    st().player.x = +xy[0]; st().player.y = +xy[1];
    st().player.px = st().player.x * A.TILE; st().player.py = st().player.y * A.TILE;
    A.interact();
    await sleep(10);
    ok("pickup opens its card", !!A.dlgCurrent);
    press(W, "1");
    ok("its button answers to the number key and closes", !A.dlgCurrent);
    ok("walking is free again (uiOpen false)", A.uiOpen === false);
    ok("item landed in the satchel", st().data.inv.includes(spot.item));
  }

  /* -- hall landmarks: placed, reachable, closable -- */
  section("landmarks");
  const hallInts = A.REGIONS.hall.interactables || {};
  const mxKey = Object.keys(hallInts).find((k) => hallInts[k].type === "mxwall");
  const osaKey = Object.keys(hallInts).find((k) => hallInts[k].type === "osacopy");
  const wgKey = Object.keys(hallInts).find((k) => hallInts[k].type === "waygate");
  ok("chart wall inscription placed in the hall", !!mxKey, "key=" + mxKey);
  ok("osa's copy placed in the hall", !!osaKey, "key=" + osaKey);
  ok("waygate placed in the hall", !!wgKey, "key=" + wgKey);
  if (mxKey) {
    A.travel("hall", undefined);
    await sleep(40);
    const mxy = mxKey.split(",");
    st().player.x = +mxy[0]; st().player.y = +mxy[1];
    st().player.px = st().player.x * A.TILE; st().player.py = st().player.y * A.TILE;
    A.interact();
    ok("inscription answers to the action key", !!A.dlgCurrent);
    press(W, "Escape");
    ok("inscription card closes on Escape", !A.dlgCurrent);
  }
  if (osaKey) {
    st().data.flags.osa_stage = 1;
    const oxy = osaKey.split(",");
    st().player.x = +oxy[0]; st().player.y = +oxy[1];
    st().player.px = st().player.x * A.TILE; st().player.py = st().player.y * A.TILE;
    A.interact();
    let steps = 0;
    while (A.dlgCurrent && steps < 6) {
      const t = (W.document.getElementById("dlgSpeaker").textContent || "");
      if (t.indexOf("line") < 0) break;
      press(W, "1");
      await sleep(5);
      steps++;
    }
    ok("osa's five lines all accept an answer", steps === 5, "steps=" + steps);
    ok("a verdict card follows the fifth answer", !!A.dlgCurrent);
    press(W, "Escape");
    ok("verdict closes on Escape", !A.dlgCurrent);
  }

  /* -- the arena: every foe, every round, every button -- */
  section("arena");
  A.closePanel(); A.closeDialogue();
  const foeIds = A.FALLACY_FOES.map((f) => f.id);
  let arenaFailures = 0;
  for (const fid of foeIds) {
    A.closeDialogue(); A.closePanel();
    A.setArenaTab();
    A.openPanel("grounds");
    A.arStart(fid);
    await sleep(5);
    const rounds = A.AR_FOE_INDEX[fid].rounds.length;
    let died = "";
    for (let r = 0; r < rounds; r++) {
      const k = A.AR_FOE_INDEX[fid].rounds[r].k;
      const btn = W.document.querySelector('[data-ldopt="' + k + '"]');
      if (!btn) { died = "round " + (r + 1) + ": options missing"; break; }
      const before = errors.length;
      btn.click();
      await sleep(5);
      if (errors.length > before) { died = "round " + (r + 1) + " threw: " + errors[errors.length - 1]; break; }
    }
    if (died || !A.dlgCurrent) { arenaFailures++; ok("duel " + fid + " finishes", false, died || "no closing card"); }
    press(W, "2");
    A.closeDialogue();
  }
  ok("all " + foeIds.length + " duels run start to finish", arenaFailures === 0);
  const scare = A.AR_FOE_INDEX["scare"];
  ok("the Scarecrow carries three answerable rounds", scare && scare.rounds.length === 3 && scare.rounds.every((r) => r.o.length === 3 && r.k >= 0 && r.k < 3));
  A.closePanel();

  /* -- field search: examine, name the concept, keep walking -- */
  section("field-search");
  const floorObj = OBJECTS.find((o) => o.pl && o.pl.mode === "floor" && o.region && !/^ch_/.test(o.region));
  if (floorObj) {
    st().player.region = floorObj.region;
    W.TOKEngine.V37.openSearch();
    await sleep(15);
    const exam = W.document.querySelector('[data-v37claim="' + floorObj.id + '"]');
    ok("floor object offers Examine", !!exam, floorObj.id + " @ " + floorObj.region);
    if (exam) {
      exam.click();
      await sleep(10);
      const quiz = W.document.querySelectorAll("[data-v37cq]");
      ok("concept quiz shows three names", quiz.length === 3, "got " + quiz.length);
      if (quiz.length) {
        quiz[0].click();
        await sleep(10);
        ok("object collected after the claim", !!st().data.flags["v37_got_" + floorObj.id]);
        ok("search panel painted again", A.panelOpen !== null);
      }
    }
    press(W, "Escape");
    ok("Escape leaves the search, walking free", A.panelOpen === null && A.uiOpen === false);
  }

  /* -- trials: each instance here boots, Escape retreats -- */
  section("trials");
  A.travel("grounds_v37", undefined);
  await sleep(60);
  if (trialsChip) {
    let booted = 0; const failedTrials = [];
    trialsChip.click();
    await sleep(15);
    const ids = Array.from(W.document.querySelectorAll("[data-v37trial]")).map((b) => b.getAttribute("data-v37trial"));
    for (const tid of ids) {
      trialsChip.click();
      await sleep(8);
      const b = W.document.querySelector('[data-v37trial="' + tid + '"]');
      if (!b) { failedTrials.push(tid + ": no Begin button"); continue; }
      const before = errors.length;
      b.click();
      await sleep(70);
      if (errors.length > before) failedTrials.push(tid + ": " + errors[errors.length - 1]);
      else booted++;
      press(W, "Escape");
      A.closeDialogue(); A.closePanel();
      await sleep(8);
    }
    ok(booted + " of " + ids.length + " trial instances boot without a throw", failedTrials.length === 0, failedTrials.slice(0, 4).join(" | "));
  }

  /* -- every region travels and renders clean -- */
  section("world-sweep");
  {
    const regionIds = Object.keys(A.REGIONS);
    const broken = [];
    for (const rid of regionIds) {
      const before = errors.length;
      try { A.travel(rid, undefined); } catch (e) { broken.push(rid + ": " + e.message); continue; }
      await sleep(90);
      if (errors.length > before) broken.push(rid + ": " + errors[errors.length - 1]);
    }
    ok("all " + regionIds.length + " regions travel and render clean", broken.length === 0, broken.slice(0, 4).join(" | "));
  }

  /* -- the Range: one full volley, clicked shot by shot -- */
  section("range");
  A.closePanel(); A.closeDialogue();
  A.openPanel("grounds");
  const rangeTab = W.document.querySelector('[data-ldtab="range"]');
  ok("range tab present", !!rangeTab);
  if (rangeTab) {
    rangeTab.click();
    await sleep(10);
    const free = W.document.querySelector("#ldRangeFree");
    ok("practice volley offered", !!free);
    if (free) {
      free.click();
      await sleep(10);
      let shots = 0;
      const before = errors.length;
      while (shots < 12) {
        if (A.dlgCurrent) break;
        const hold = W.document.querySelector('[data-ldshot=""]');
        if (!hold) break;
        hold.click();
        shots++;
        await sleep(10);
      }
      ok("volley of eight resolves shot by shot", shots === 8 && errors.length === before, "shots=" + shots);
      ok("summary card follows the eighth shot", !!A.dlgCurrent);
      const stray = W.document.querySelector('[data-ldshot=""]');
      if (stray) stray.click();
      ok("a stray ninth shot lands nowhere", errors.length === before);
      press(W, "2");
      await sleep(10);
      ok("leave-by-number returns the Range landing view", !!W.document.querySelector("#ldRangeFree"), "dlg=" + !!A.dlgCurrent);
    }
  }
  press(W, "Escape");

  /* -- device profiles: phone, tablet, laptop -- */
  section("device-sweep");
  for (const [label, wpx, hpx] of [["phone", 390, 844], ["tablet", 820, 1180], ["laptop", 1366, 768]]) {
    const d2 = await boot(null, { w: wpx, h: hpx });
    const AA = d2.window.__ATLAS_TEST__;
    if (!AA) { ok(label + ": boots", false); continue; }
    AA.state.data.avatar.name = "D";
    AA.state.data.flags.arrival_letter = 1;
    AA.state.data.flags.threshold_done = 1;
    AA.state.data.flags.arrival_done = 1;
    AA.closePanel(); AA.closeDialogue();
    AA.openDialogue("kip");
    const dlgOk = !!AA.dlgCurrent;
    d2.window.document.body.dispatchEvent(new d2.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
    const escOk = !AA.dlgCurrent;
    AA.openPanel("map");
    const panOk = AA.panelOpen === "map";
    d2.window.close();
    ok(label + " " + wpx + "x" + hpx + ": boots, talks, escapes, opens panels", dlgOk && escOk && panOk);
  }

  /* -- save, reload, resume -- */
  section("save-load");
  A.travel("timbuktu", undefined);
  st().data.xp = Math.max(st().data.xp, 777);
  A.saveNow();
  const savedRaw = W.localStorage.getItem(A.SAVE_KEY);
  ok("save lands in storage", !!savedRaw, "key=" + A.SAVE_KEY);
  if (savedRaw) {
    const dom2 = await boot({ [A.SAVE_KEY]: savedRaw });
    const A2 = dom2.window.__ATLAS_TEST__;
    ok("reload restores the region", A2 && A2.state.player.region === "timbuktu", "got " + (A2 && A2.state.player.region));
    ok("reload restores xp", A2 && A2.state.data.xp >= 777, "xp=" + (A2 && A2.state.data.xp));
    dom2.window.close();
  }

  /* -- wrap -- */
  section("summary");
  ok("zero uncaught errors across the whole run", errors.length === 0, errors.slice(0, 8).join(" | "));
  const fails = results.filter((r) => !r.pass);
  console.log("");
  console.log((results.length - fails.length) + " / " + results.length + " assertions green");
  if (fails.length) {
    console.log("FAILURES:");
    fails.forEach((f) => console.log("  X [" + f.s + "] " + f.name + (f.detail ? " :: " + f.detail : "")));
  }
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error("harness crashed:", e); process.exit(2); });
