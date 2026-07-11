/* export per-object dissection components using the actual game logic */
"use strict";
const fs = require("fs"), path = require("path");
const SRC = path.join(__dirname, "src");
function el() { return { style:{}, children:[], appendChild(){}, insertBefore(){}, setAttribute(){}, getAttribute(){return null;}, addEventListener(){}, querySelector(){return null;}, querySelectorAll(){return [];}, getContext(){return null;}, remove(){}, get parentNode(){return null;}, get isConnected(){return true;} }; }
global.document = { readyState:"complete", getElementById:()=>null, createElement:()=>el(), addEventListener(){}, body:el(), querySelectorAll:()=>[] };
global.window = global; global.addEventListener = ()=>{}; global.removeEventListener = ()=>{};
global.requestAnimationFrame = ()=>0; global.CSS = { escape: s=>s }; global.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
global.performance = { now: () => Date.now() }; global.fetch = () => Promise.reject(new Error("off"));
const state = { player:{region:"hall"}, data:{ xp:0, lumens:0, inv:[], flags:{}, quests:{}, journal:[], rungsHit:{}, ledger:[], coverage:{}, settings:{}, stats:{ concept:{}, element:{}, subject:{}, rung:{}, days:{}, regions:{}, moves:{} }, tele:{min:0}, halls:{}, badges:{}, oaths:[] } };
const E = global.TOKEngine = {
  registerRegion(){}, registerDialogue(){}, registerItem(){}, registerQuest(){},
  on(){}, emit(){}, getState:()=>state, scheduleSave(){}, save(){}, load(){}, setSyncAdapter(){},
  gainXP(){}, gainLumens(){}, gainTags(){}, give(){}, tagCoverage(){}, levelFor:()=>1,
  autoJournal(){}, manualJournal(){}, openLadder(){}, travel(){}, openDialogue(){}, openVignette(){}, openMsg(){}, openPanel(){}, flashToast(){}, toast(){},
  esc:s=>String(s), dayKey:()=>"2026-07-10", linkTerms:s=>s, grid:r=>r.map(x=>x.split("")), TILE:32,
  validateSave:()=>null, migrateLegacy(){},
  CANON:{ CONCEPTS:["Evidence","Certainty","Truth","Interpretation","Power","Justification","Explanation","Objectivity","Perspective","Culture","Values","Responsibility"], ELEMENTS:["Scope","Perspectives","Methods and Tools","Ethics"], FAMILIES:[], SUBJECTS:[], RUNG_XP:{}, CONSTELLATIONS:[] },
  sfx:{play(){}}, fx:{confetti(){},sparks(){},ring(){}}, checkBadges(){}, COMMON:{}
};
["content-60-reliquary.js","content-61-relics-data.js","content-62-pixelart.js","content-63-bench.js"].forEach(p => {
  new Function(fs.readFileSync(path.join(SRC, p), "utf8"))();
});
const R = E.RELIQUARY, B = E.V37_BENCH;
const out = {};
R.list.forEach(o => {
  const a = B.anatomy(o.id);
  out[o.id] = {
    claims: a.claims.map(c => c.text),
    fact: a.fact.text,
    mats: a.mats.map(m => m.n + " " + m.t),
    template: E.V37_PX.templateOf(o.id)
  };
});
fs.writeFileSync(path.join(__dirname, "data", "components.json"), JSON.stringify(out, null, 1));
console.log("components for", Object.keys(out).length, "objects");
