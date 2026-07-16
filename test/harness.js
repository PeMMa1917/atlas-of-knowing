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
      w.prompt = () => { w.__prompted = (w.__prompted || 0) + 1; return null; };
      w.confirm = () => false; w.alert = () => {};
      w.Image = class {
        set src(v) { w.setTimeout(() => { if (this.onerror) this.onerror(); }, 3); }
      };
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

  /* -- the arrival: ledger, letter, doors, keepsake card, naming -- */
  section("arrival");
  await sleep(300);
  const bootSpeaker = (W.document.getElementById("dlgSpeaker") || {}).textContent || "";
  ok("a fresh boot opens the Ledger of Names", !!A.dlgCurrent && bootSpeaker.indexOf("Ledger of Names") >= 0, bootSpeaker);
  press(W, "3");
  await sleep(450);
  const letterSpeaker = (W.document.getElementById("dlgSpeaker") || {}).textContent || "";
  ok("the letter follows the ledger, never fights it", !!A.dlgCurrent && letterSpeaker.indexOf("Letter") >= 0, letterSpeaker);
  press(W, "1");
  await sleep(10);
  press(W, "1");
  await sleep(60);
  const findHost = W.document.getElementById("mxFind");
  ok("the letter keepsake shows its find card", !!findHost && !findHost.hidden);
  if (findHost) {
    const kw = Array.from(findHost.querySelectorAll("button")).find((b) => /keep walking/i.test(b.textContent || ""));
    ok("the card offers Keep walking", !!kw);
    if (kw) kw.click();
    ok("Keep walking truly clears the card", findHost.hidden && findHost.style.display === "none", "hidden=" + findHost.hidden + " display=" + findHost.style.display);
  }
  ok("the naming step follows the doors", A.panelOpen === "threshold" || A.panelOpen === "names", "panel=" + A.panelOpen);
  press(W, "Escape");

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
        const countChip = W.document.getElementById("v37CountChip");
        ok("the collected count updates at once", !!countChip && /[1-9]\d* ?\/ ?522/.test((countChip.textContent || "").replace("\u25c8", "")), countChip && countChip.textContent);
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

  /* -- every HUD chip opens something; Escape returns to neutral -- */
  section("chip-sweep");
  {
    A.travel("hall", undefined);
    await sleep(60);
    const chips = Array.from(W.document.querySelectorAll("button.chip")).filter((c) => c.offsetParent !== undefined);
    let openedCount = 0; const inert = [];
    for (const chip of chips) {
      A.closePanel(); A.closeDialogue(); A.toggleSatchel(false);
      const beforeRegion = st().player.region;
      const beforeToasts = W.document.querySelectorAll("#toasts .toastCard").length;
      const labelBefore = chip.textContent;
      const promptedBefore = W.__prompted || 0;
      const before = errors.length;
      chip.click();
      await sleep(30);
      const opened = !!A.panelOpen || !!A.dlgCurrent || A.satchelOpen ||
        st().player.region !== beforeRegion ||
        !!W.document.getElementById("v37idwrap") ||
        W.document.querySelectorAll("#toasts .toastCard").length > beforeToasts ||
        (W.__prompted || 0) > promptedBefore ||
        chip.textContent !== labelBefore;
      if (errors.length > before) inert.push((chip.id || chip.textContent.trim()) + " threw: " + errors[errors.length - 1]);
      else if (!opened) inert.push(chip.id || chip.textContent.trim());
      else openedCount++;
      press(W, "Escape");
      A.closeDialogue(); A.closePanel(); A.toggleSatchel(false);
      if (chip.textContent !== labelBefore && !A.panelOpen && !A.dlgCurrent) chip.click();
      const wrapEl = W.document.getElementById("v37idwrap");
      if (wrapEl) wrapEl.remove();
      if (st().player.region !== beforeRegion) { A.travel(beforeRegion, undefined); await sleep(30); }
    }
    ok(openedCount + " of " + chips.length + " HUD chips respond with a visible surface", inert.length === 0, "inert/throwing: " + inert.slice(0, 5).join(" | "));
  }

  /* -- every core panel renders content, not an empty shell -- */
  section("panel-content");
  {
    const empty = [];
    for (const kind of ["map", "ledger", "journal", "settings", "skills", "badges", "record", "atelier", "market", "puzzles", "roads", "envoys", "codex", "human", "fair", "guide", "chart", "loom", "halls", "grounds", "warden"]) {
      A.closePanel(); A.closeDialogue();
      try { A.openPanel(kind); } catch (e) { empty.push(kind + " throws"); continue; }
      await sleep(10);
      const title = (W.document.getElementById("panelTitle") || {}).textContent || "";
      const body = (W.document.getElementById("panelBody") || {}).innerHTML || "";
      if (!title.trim() || body.length < 40) empty.push(kind + " (title=" + !!title.trim() + ", body=" + body.length + ")");
    }
    A.closePanel();
    ok("all 21 core panels render a title and body", empty.length === 0, empty.slice(0, 5).join(" | "));
  }

  /* -- every dialogue node, every choice, clicked -- */
  section("dialogue-walk");
  {
    const ids = Object.keys(A.DIALOGUES);
    let clicks = 0; const walkProblems = [];
    for (const id of ids) {
      const seen = new Set();
      let frontier = [[]];
      let guard = 0;
      while (frontier.length && guard < 300) {
        const path = frontier.shift();
        A.closeDialogue(); A.closePanel();
        A.openDialogue(id);
        let alive = true;
        for (const step of path) {
          const btns = W.document.querySelectorAll("#dlgChoices .choice");
          if (!btns[step]) { alive = false; break; }
          btns[step].click(); guard++;
          await sleep(2);
          if (!A.dlgCurrent) { alive = false; break; }
        }
        if (!alive) continue;
        const key = (A.dlgCurrent && A.dlgCurrent.nodeKey) + "|" + path.length;
        if (seen.has(key)) continue;
        seen.add(key);
        const btns = W.document.querySelectorAll("#dlgChoices .choice");
        if (!btns.length) { walkProblems.push(id + " path[" + path.join(",") + "]: zero buttons"); continue; }
        const coreChoices = Math.min(btns.length, 4);
        for (let i = 0; i < coreChoices; i++) {
          const before = errors.length;
          const replay = path.concat([i]);
          A.closeDialogue(); A.openDialogue(id);
          let okPath = true;
          for (const stp of replay.slice(0, -1)) {
            const bs = W.document.querySelectorAll("#dlgChoices .choice");
            if (!bs[stp]) { okPath = false; break; }
            bs[stp].click(); guard++;
            await sleep(2);
            if (!A.dlgCurrent) { okPath = false; break; }
          }
          if (!okPath) continue;
          const bs2 = W.document.querySelectorAll("#dlgChoices .choice");
          if (!bs2[i]) continue;
          bs2[i].click(); clicks++; guard++;
          await sleep(2);
          if (errors.length > before) walkProblems.push(id + " path[" + replay.join(",") + "] threw: " + errors[errors.length - 1]);
          else if (A.dlgCurrent && path.length < 5) frontier.push(replay);
        }
      }
      A.closeDialogue();
    }
    ok(clicks + " dialogue choices clicked across " + ids.length + " trees, none threw or dead-ended", walkProblems.length === 0, walkProblems.slice(0, 4).join(" | "));
  }

  /* -- hostile names render as text, never as markup -- */
  section("xss");
  {
    const hostile = '<img src=x onerror="window.__xss=1">';
    st().data.avatar.name = hostile;
    W.__xss = 0;
    A.openPanel("record"); await sleep(10);
    A.closePanel(); A.openPanel("halls"); await sleep(10);
    A.closePanel(); A.openPanel("fair"); await sleep(10);
    A.closePanel();
    A.toggleSatchel(true); await sleep(10); A.toggleSatchel(false);
    const injected = W.document.querySelector('img[src="x"]');
    ok("a hostile avatar name never becomes markup", !injected && W.__xss === 0, "img=" + !!injected + " xss=" + W.__xss);
    st().data.avatar.name = "Harness";
  }

  /* -- rapid open and close cycles leak nothing -- */
  section("races");
  {
    const before = errors.length;
    for (let i = 0; i < 25; i++) {
      A.openDialogue(i % 2 ? "kip" : "sefa");
      press(W, "Escape");
      A.openPanel(i % 2 ? "map" : "grounds");
      press(W, "Escape");
    }
    st().data.settings.twSpeed = 12;
    A.openDialogue("sefa"); A.closeDialogue();
    A.openDialogue("kip");
    await sleep(500);
    const settled = (W.document.getElementById("dlgText").textContent || "").length > 10;
    st().data.settings.twSpeed = 99;
    A.closeDialogue();
    ok("50 rapid open/close cycles, zero errors", errors.length === before, errors.slice(before).slice(0, 3).join(" | "));
    ok("typewriter settles on the last speaker after interruption", settled);
  }

  /* -- the three consumables act as their labels promise -- */
  section("consumables");
  {
    const tk = st().data.tk;
    ok("bench subtree present in the save", !!(tk && tk.bench && tk.bench.stock), typeof tk);
    if (tk && tk.bench) {
      tk.bench.stock.duelRetry = 1;
      A.setArenaTab(); A.openPanel("grounds");
      A.arStart("mud");
      await sleep(5);
      const wrongIdx = (A.AR_FOE_INDEX["mud"].rounds[0].k + 1) % 3;
      const btn = W.document.querySelector('[data-ldopt="' + wrongIdx + '"]');
      btn.click();
      await sleep(5);
      const stillRoundOne = ((W.document.getElementById("panelBody") || {}).textContent || "").indexOf("Round 1 / 3") >= 0;
      ok("Steady Hand: a wrong strike comes back to round one", stillRoundOne && tk.bench.stock.duelRetry === 0, "stock=" + tk.bench.stock.duelRetry);
      for (let r = 0; r < 3; r++) {
        const k2 = A.AR_FOE_INDEX["mud"].rounds[r].k;
        const b2 = W.document.querySelector('[data-ldopt="' + k2 + '"]');
        if (b2) { b2.click(); await sleep(5); }
      }
      press(W, "2");
      await sleep(5);
      A.closeDialogue(); A.closePanel();

      tk.bench.stock.circuitReroll = 2;
      A.setArenaTab(); A.openPanel("grounds");
      const rrA = W.document.getElementById("ldRerollA");
      ok("Second Wind offered on the Arena roster", !!rrA);
      if (rrA) {
        rrA.click(); await sleep(5);
        ok("Second Wind redraws the challenger", !!A.dlgCurrent === false && tk.bench.stock.circuitReroll === 1 && st().data.flags.dailyNonce === 1, "stock=" + tk.bench.stock.circuitReroll + " nonce=" + st().data.flags.dailyNonce);
      }
      A.closeDialogue(); A.closePanel();

      tk.bench.stock.gardenLeap = 1;
      A.openPanel("grounds");
      const gt = W.document.querySelector('[data-ldtab="garden"]');
      if (gt) { gt.click(); await sleep(10); }
      const sow = W.document.querySelector('[data-ldsow="inquiry_sun"]');
      if (sow) { sow.click(); await sleep(10); }
      st().data.stats.secondQs = (st().data.stats.secondQs || 0) + 4;
      const gt2 = W.document.querySelector('[data-ldtab="garden"]');
      if (gt2) { gt2.click(); await sleep(10); }
      const horn = W.document.getElementById("ldHorn");
      ok("Harvest Horn offered while stocked", !!horn);
      if (horn) {
        horn.click(); await sleep(10);
        const harvest = W.document.querySelector('[data-ldharvest="inquiry_sun"]');
        ok("the Horn leaps a ripe-adjacent plot to harvest", !!harvest && tk.bench.stock.gardenLeap === 0, "stock=" + tk.bench.stock.gardenLeap);
      }
      A.closePanel();
    }
  }

  /* -- creatures look like creatures -- */
  section("creatures");
  A.travel("shore", undefined);
  await sleep(80);
  {
    const spriteNpcs = A.liveNPCs.filter((n) => n.def && String(n.def.dlg || "").indexOf("sprite:") === 0);
    ok("knowledge sprites wander their home shore", spriteNpcs.length > 0, "count=" + spriteNpcs.length);
    ok("every wandering sprite wears a creature face, not a robe", spriteNpcs.every((n) => n.def.creature && n.def.icon), spriteNpcs.map((n) => n.def.name).slice(0, 2).join("; "));
  }

  /* -- hostile saves and dead storage never stop the boot -- */
  section("storage-fuzz");
  {
    const key = A.SAVE_KEY;
    for (const [label, seed] of [["garbage JSON", "{not json!!"], ["wrong shape", '{"player":7,"data":"x"}'], ["null literal", "null"]]) {
      const d3 = await boot({ [key]: seed });
      const alive = !!d3.window.__ATLAS_TEST__ && !!d3.window.__ATLAS_TEST__.state.player.region;
      ok("boots through a " + label + " save", alive);
      d3.window.close();
    }
  }

  /* -- document hygiene: unique ids, named buttons -- */
  section("dom-hygiene");
  {
    const seenIds = new Map();
    W.document.querySelectorAll("[id]").forEach((el) => seenIds.set(el.id, (seenIds.get(el.id) || 0) + 1));
    const dupIds = [...seenIds.entries()].filter(([, c]) => c > 1).map(([i, c]) => i + "x" + c);
    ok("no duplicate element ids after a full session", dupIds.length === 0, dupIds.slice(0, 6).join(","));
    const nameless = Array.from(W.document.querySelectorAll("button")).filter((b) => !(b.textContent || "").trim() && !b.getAttribute("aria-label"));
    ok("every button carries a name or label", nameless.length === 0, nameless.slice(0, 4).map((b) => b.id || b.className).join(","));
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
    const wandered = JSON.parse(savedRaw);
    wandered.player.region = "florence";
    wandered.data.avatar.name = "";
    delete wandered.data.flags.arrival_letter;
    delete wandered.data.flags.threshold_done;
    const dW = await boot({ [A.SAVE_KEY]: JSON.stringify(wandered) });
    const AW = dW.window.__ATLAS_TEST__;
    const speakerW = (dW.window.document.getElementById("dlgSpeaker") || {}).textContent || "";
    ok("a nameless save waking in Bottega meets no arrival letter", AW && AW.state.player.region === "florence" && speakerW.indexOf("Letter") < 0, "region=" + (AW && AW.state.player.region) + " speaker=" + speakerW);
    if (AW) {
      AW.state.data.flags.named_ceremony = true;
      AW.closeDialogue(); AW.closePanel();
      AW.travel("hall", undefined);
      await sleep(600);
      let speakerH = (dW.window.document.getElementById("dlgSpeaker") || {}).textContent || "";
      for (let tries = 0; tries < 4 && speakerH.indexOf("Letter") < 0; tries++) {
        AW.closeDialogue(); AW.closePanel();
        await sleep(1100);
        speakerH = (dW.window.document.getElementById("dlgSpeaker") || {}).textContent || "";
      }
      ok("the letter meets the wanderer on the walk into the hall", speakerH.indexOf("Letter") >= 0, speakerH);
    }
    dW.window.close();
  }
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
