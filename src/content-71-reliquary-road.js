/* ---- content-71-reliquary-road.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · THE RELIQUARY ROAD (content-71)
   v37. Load after content-68. A twelve-chapter main arc, one chapter per
   concept, each braiding three requirements so mechanics and meaning
   land together (ludonarrative pairing by design):
     1. win a named trial family in a named region (the mechanic IS the
        concept: stealth for Power, restoration for Objectivity, the
        volley for Values under pressure);
     2. hold a number of relics tagged with the chapter's concept;
     3. write one journal entry at the chapter's rung or higher.
   The finale rehearses the Exhibition itself: three carried objects,
   one question, one defended paragraph. No em dashes.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.V37 || !E.V37_TRIALS) { try { console.warn("[road] prerequisites missing"); } catch (e) {} return; }
  var V = E.V37, T = E.V37_TRIALS, R = E.RELIQUARY;
  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }

  var CH = [
    { c: "Evidence", type: "sweep", region: "library", relics: 3, rung: 2,
      tale: "The Great Library reports a strange rot: statements shelved as observations keep turning out to be assumptions in borrowed coats. The Guild wants a sweeper.",
      why: "Evidence begins with sorting what was seen from what was smuggled in." },
    { c: "Certainty", type: "scales", region: "kerala", relics: 3, rung: 2,
      tale: "On the Kerala Coast the astronomers refuse to say certain. They say calibrated. Load their scales until you feel the difference in your hands.",
      why: "Certainty is a quantity to manage, and the pan punishes both misers and spendthrifts." },
    { c: "Truth", type: "cipher", region: "cusco", relics: 4, rung: 3,
      tale: "Cusco keeps two records of the same years, khipu and chronicle, and a ciphered page which may referee between them. Crack it.",
      why: "Truth claims arrive encoded: in scripts, in translations, in editors' choices. Reading is decoding." },
    { c: "Interpretation", type: "prism", region: "florence", relics: 4, rung: 3,
      tale: "A bottega feud: four witnesses to one unveiling, four accounts, zero liars. The District wants the detail-work done properly.",
      why: "Interpretation is not failure of truth but the shape of testimony. The prism trains the sorting." },
    { c: "Power", type: "shadow", region: "zimbabwe", relics: 4, rung: 3,
      tale: "At Great Zimbabwe the restricted stacks hold the excavation notes colonial wardens once sealed. The Guild judges the seal unlawful. Walk quietly.",
      why: "Power decides who reads. Stealth play makes the gatekeeping visible from below." },
    { c: "Justification", type: "forge", region: "baghdad", relics: 5, rung: 4,
      tale: "The House of Wisdom commissions a load-bearing argument for a disputed translation grant. Bring a warrant which holds weight.",
      why: "Justification is architecture, and the forge refuses ornaments posing as beams." },
    { c: "Explanation", type: "switch", region: "vault_tech", relics: 5, rung: 4,
      tale: "An engine in the Bazaar behaves lawfully and surprisingly at once. Its keeper wants a knower who can light every lamp and then say why.",
      why: "Explanation outruns prediction. The levers teach the gap." },
    { c: "Objectivity", type: "slide", region: "aggregate", relics: 5, rung: 4,
      tale: "The Aggregate's flood-year data page arrived shredded. Restore its order without letting your hopes choose the arrangement.",
      why: "Objectivity lives in procedure: the same tiles, the same rules, whoever's hands." },
    { c: "Perspective", type: "serve", region: "harlem", relics: 5, rung: 4,
      tale: "A Harlem salon hosts the fastest claims in the Atlas. Return serve with questions which open rather than wound, and earn a seat.",
      why: "Perspective is practiced by asking from inside someone else's corner." },
    { c: "Culture", type: "memory", region: "songlines", relics: 6, rung: 4,
      tale: "In Songlines Country the hall itself remembers, and expects visitors to carry sequence without paper. Hold what it sings to you.",
      why: "Whole knowledge systems ride trained memory. Feel the medium in your own working memory." },
    { c: "Values", type: "volley", region: "seoul", relics: 6, rung: 5,
      tale: "Seoul's forum drowns in confident nonsense every evening rush. Stand the line: name the fallacies, wave the sound arguments through.",
      why: "Values under time pressure: the volley is an ethics of attention, played fast." },
    { c: "Responsibility", type: "tactica", region: "commission", relics: 6, rung: 5,
      tale: "Truth Commission Hall stages its final exercise as a board of claims and doubts. Clear the board, then answer for every piece you spent.",
      why: "Responsibility means moves owned afterward: the debrief counts your losses by name." }
  ];

  function chapterAt() { return Number(FL().v37_road) || 0; } /* completed count */
  function relicCount(c) {
    var n = 0;
    R.list.forEach(function (o) { if (o.tags.c === c && V.got(o.id)) n++; });
    return n;
  }
  function rungMet(rung) {
    var rh = SD().rungsHit || {};
    for (var k = rung; k <= 5; k++) if (rh[k]) return true;
    return false;
  }
  function trialMet(ch2) {
    /* any starred instance of the family in the named region */
    return (T.byRegion[ch2.region] || []).some(function (inst) {
      return inst.type === ch2.type && T.stars(inst.id) > 0;
    });
  }
  function reqs(ch2) {
    return [
      { ok: trialMet(ch2), txt: "Win " + T.TYPES[ch2.type].n + " in " + (R.labels[ch2.region] || ch2.region) },
      { ok: relicCount(ch2.c) >= ch2.relics, txt: "Hold " + ch2.relics + " objects tagged " + ch2.c + " (" + relicCount(ch2.c) + " held)" },
      { ok: rungMet(ch2.rung), txt: "One Journal entry at rung " + ch2.rung + " or higher" }
    ];
  }
  function tryAdvance(quiet) {
    var at = chapterAt();
    if (at >= CH.length) return finaleReady(quiet);
    var ch2 = CH[at];
    var rq = reqs(ch2);
    if (!rq.every(function (r2) { return r2.ok; })) return false;
    FL().v37_road = at + 1;
    V.cxpAdd(ch2.c, 40, "Reliquary Road");
    try { E.gainXP(60, "Road chapter: " + ch2.c); } catch (e) {}
    try { E.gainLumens(30); } catch (e) {}
    try { if (E.fx && E.fx.confetti) E.fx.confetti(); } catch (e) {}
    try { if (E.sfx) E.sfx.play("fanfare"); } catch (e) {}
    try { E.openVignette("The Road turns: " + ch2.c, ch2.why + "\n\nChapter " + (at + 1) + " of 12 closes. " + (at + 1 < CH.length ? "Next: " + CH[at + 1].c + ", in " + (R.labels[CH[at + 1].region] || CH[at + 1].region) + "." : "The finale waits in the Grand Reliquary.")); } catch (e) {}
    try { E.autoJournal("Reliquary Road, chapter closed: " + ch2.c + ". " + ch2.why); } catch (e) {}
    try { E.scheduleSave(); } catch (e) {}
    return true;
  }
  function finaleReady() {
    return chapterAt() >= CH.length && !FL().v37_road_done;
  }
  function finale(pickIds, kq, defense) {
    if (!finaleReady()) return;
    FL().v37_road_done = 1;
    V.cxpAdd("Perspective", 30, "Finale");
    try { E.gainXP(150, "The Reliquary Road, walked"); } catch (e) {}
    try { E.gainLumens(100); } catch (e) {}
    try { E.manualJournal(5, "My rehearsal triptych: " + pickIds.map(function (id) { return R.byId[id] ? R.byId[id].name : id; }).join(" · ") + "\nQuestion: " + kq + "\nDefense: " + defense, ["Perspective", "Evidence"]); } catch (e) {}
    try { if (E.fx && E.fx.confetti) E.fx.confetti(); } catch (e) {}
    try { E.openVignette("The Road ends where the Exhibition begins", "Three objects, one question, one defended paragraph: the exact shape of the assessment, rehearsed with objects you chose and carried yourself. The Codex Builder (N) takes it from here."); } catch (e) {}
    try { E.scheduleSave(); } catch (e) {}
  }

  /* nudge when a requirement lands */
  ["v37_trial", "v37_relic", "journal"].forEach(function (evt) {
    E.on(evt, function () { setTimeout(function () { tryAdvance(true); }, 250); });
  });

  /* ── panel ── */
  function panelEls() { return { title: document.getElementById("panelTitle"), sub: document.getElementById("panelSub"), body: document.getElementById("panelBody") }; }
  function openRoad() {
    try { E.openPanel("v37road"); } catch (e) {}
    render();
  }
  function render() {
    var els = panelEls(); if (!els.body) return;
    var at = chapterAt();
    els.title.textContent = "The Reliquary Road";
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Twelve chapters, one per concept. Each asks a trial, a set of objects, and a journal entry."
      : "A main road through all twelve concepts. Each chapter braids a mechanic, a collection, and a reflection, because the three are one skill wearing three coats.";
    var h = "";
    CH.forEach(function (ch2, ix) {
      var state = ix < at ? "done" : ix === at ? "open" : "locked";
      var col = state === "done" ? "#7fbf7f" : state === "open" ? "#E8B54A" : "#555";
      h += '<div style="border:1px solid ' + col + '55;border-left:4px solid ' + col + ';border-radius:6px;padding:9px 11px;margin:7px 0;' + (state === "locked" ? "opacity:.55" : "") + '">' +
        '<div><strong>' + (ix + 1) + ' · ' + esc(ch2.c) + '</strong> <span style="opacity:.7">' + (state === "done" ? "walked" : state === "open" ? "the road stands here" : "beyond the bend") + '</span></div>';
      if (state !== "locked") {
        h += '<div style="opacity:.9;margin:4px 0">' + esc(ch2.tale) + '</div>';
        if (state === "open") {
          reqs(ch2).forEach(function (r2) {
            h += '<div style="margin:2px 0">' + (r2.ok ? "✅" : "⬜") + ' ' + esc(r2.txt) + '</div>';
          });
          h += '<div style="margin-top:6px"><button class="btn small gold" id="v37adv">Present your progress</button></div>';
        } else {
          h += '<div class="sub" style="opacity:.7">' + esc(ch2.why) + '</div>';
        }
      }
      h += '</div>';
    });
    if (finaleReady()) {
      var owned = R.list.filter(function (o) { return V.own(o.id); });
      h += '<div style="border:2px solid #E8B54A;border-radius:8px;padding:10px;margin:10px 0">' +
        '<strong>The Finale: a rehearsal triptych.</strong>' +
        '<div class="sub" style="margin:4px 0">Choose three carried objects, ask one knowledge question they all answer differently, and defend your grouping in two sentences. The Exhibition, in miniature.</div>' +
        '<div style="display:grid;gap:4px;margin:6px 0;max-height:180px;overflow:auto">' +
        owned.slice(0, 80).map(function (o) { return '<label><input type="checkbox" data-v37fin="' + esc(o.id) + '"> ' + esc(o.icon) + ' ' + esc(o.name) + '</label>'; }).join("") + '</div>' +
        '<input id="v37finkq" placeholder="Your knowledge question" style="width:100%;margin:4px 0">' +
        '<textarea id="v37findef" placeholder="Two sentences defending the grouping" style="width:100%;min-height:60px"></textarea>' +
        '<button class="btn gold" id="v37finGo" style="margin-top:6px">Mount the triptych</button></div>';
    }
    if (FL().v37_road_done) h += '<div class="sub" style="color:#7fbf7f">The Road is walked. The Codex Builder (N) waits for the true Exhibition.</div>';
    els.body.innerHTML = h;
    var adv = els.body.querySelector("#v37adv");
    if (adv) adv.onclick = function () {
      if (!tryAdvance()) { try { E.toast("The road checks its list and waits. Something above stays unticked."); } catch (e) {} }
      render();
    };
    var fin = els.body.querySelector("#v37finGo");
    if (fin) fin.onclick = function () {
      var picks = Array.prototype.slice.call(els.body.querySelectorAll("[data-v37fin]:checked")).map(function (i2) { return i2.getAttribute("data-v37fin"); });
      var kq = (els.body.querySelector("#v37finkq") || {}).value || "";
      var def = (els.body.querySelector("#v37findef") || {}).value || "";
      if (picks.length !== 3) { try { E.toast("Three objects. The triptych is strict."); } catch (e) {} return; }
      if (kq.trim().length < 12 || !/\?/.test(kq)) { try { E.toast("The question wants a question mark and some spine."); } catch (e) {} return; }
      if (def.trim().length < 40) { try { E.toast("Two sentences. Give the grouping its defense."); } catch (e) {} return; }
      finale(picks, kq.trim(), def.trim());
      render();
    };
  }
  E.V37_ROAD = { open: openRoad, chapterAt: chapterAt, CH: CH };

  function addChip() {
    var anchor = document.getElementById("btnV37Records") || document.getElementById("btnGuide");
    if (!anchor || !anchor.parentNode || document.getElementById("btnV37Road")) return;
    var b = document.createElement("button");
    b.className = "chip"; b.id = "btnV37Road"; b.textContent = "Road";
    b.setAttribute("aria-label", "Open the Reliquary Road, the twelve-chapter concept arc");
    b.addEventListener("click", openRoad);
    anchor.parentNode.insertBefore(b, anchor.nextSibling);
  }
  function boot() { addChip(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
