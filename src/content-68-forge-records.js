/* ---- content-68-forge-records.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · CONCEPT FORGE + HALL OF RECORDS (content-68)
   v37. Load after content-67b.

   CONCEPT FORGE
   Every canonical coverage row now feeds the concept it names: +4 insight
   per tagged action, on top of the direct awards from relics, trials,
   and encounters. Twelve ladders, one per concept, with titles per tier.
   This is the Dialectic Device mechanic folded into the Atlas: decisions
   level the concept they exercise, and the knower's shape emerges from
   play rather than from one flat XP pool.

   HALL OF RECORDS
   Every leaderboard the Warden's Chartroom will mirror: total points,
   the twelve concepts, the four framework elements, perspectives-in-use,
   crafting, finding, conversations, exploration by region and overall,
   active minutes, daily and weekly engagement, and journal entries.
   Offline it shows your record beside deterministic Guild ghosts, which
   the panel names plainly as pace-setters rather than people. The
   standings snapshot schema defined here is the one contract the sync
   pack pushes and the teacher dashboard reads. No em dashes.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.V37) { try { console.warn("[forge] runtime missing"); } catch (e) {} return; }
  var V = E.V37;
  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function hashN(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }
  function panelEls() { return { title: document.getElementById("panelTitle"), sub: document.getElementById("panelSub"), body: document.getElementById("panelBody") }; }
  var CONCEPTS = E.CANON.CONCEPTS, ELEMENTS = E.CANON.ELEMENTS;
  var LEX_ICON = { Evidence: "🔍", Certainty: "🗿", Truth: "🕯️", Interpretation: "🎭", Power: "👑", Justification: "🧱", Explanation: "⚙️", Objectivity: "⚖️", Perspective: "👥", Culture: "🏮", Values: "💠", Responsibility: "🕊️" };

  /* ── the twelve ladders ── */
  var TIERS = [
    [0, ""], [40, "Apprentice"], [120, "Journeyman"], [280, "Scholar"],
    [520, "Keeper"], [900, "Sage"], [1500, "Luminary"]
  ];
  function tierOf(cxp) {
    var t = 0;
    for (var i = 1; i < TIERS.length; i++) if (cxp >= TIERS[i][0]) t = i;
    return t;
  }
  function tierName(c, cxp) {
    var t = tierOf(cxp);
    return t === 0 ? "Unwoken" : TIERS[t][1] + " of " + c;
  }
  function nextAt(cxp) {
    for (var i = 1; i < TIERS.length; i++) if (cxp < TIERS[i][0]) return TIERS[i][0];
    return null;
  }

  /* every canonical coverage row feeds its concept */
  E.on("coverage", function (ev) {
    if (!ev || !ev.c || CONCEPTS.indexOf(ev.c) < 0) return;
    if (ev.m === "relic" || ev.m === "trial" || ev.m === "study" || ev.m === "encounter") return; /* already paid directly */
    var before = V.cxpOf(ev.c);
    V.cxpAdd(ev.c, 4, ev.f || "coverage");
    announceTier(ev.c, before);
  });
  E.on("v37_cxp", function (ev) {
    if (!ev || !ev.c) return;
    announceTier(ev.c, V.cxpOf(ev.c) - (ev.v | 0));
  });
  var lastAnnounce = {};
  function announceTier(c, before) {
    var now = V.cxpOf(c);
    var tb = tierOf(before), ta = tierOf(now);
    if (ta > tb && lastAnnounce[c] !== ta) {
      lastAnnounce[c] = ta;
      try { E.toast(LEX_ICON[c] + " " + tierName(c, now)); } catch (e) {}
      try { if (E.fx && E.fx.confetti) E.fx.confetti(); } catch (e) {}
      try { if (E.sfx) E.sfx.play("fanfare"); } catch (e) {}
      try { E.gainXP(10, "Tier: " + tierName(c, now)); } catch (e) {}
      try { E.autoJournal("Reached " + tierName(c, now) + ". The concept starts answering to me, a little."); } catch (e) {}
    }
  }

  /* ── Concept Forge panel ── */
  function openForge() {
    try { E.openPanel("v37forge"); } catch (e) {}
    var els = panelEls(); if (!els.body) return;
    els.title.textContent = "The Concept Forge";
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Twelve concepts, twelve ladders. Actions feed the concept they use."
      : "Twelve concepts, each a ladder with its own rungs. Every tagged action in the Atlas feeds the concept it exercises. Your shape as a knower shows below.";
    var rows = CONCEPTS.map(function (c) { return { c: c, v: V.cxpOf(c) }; });
    var max = Math.max(40, Math.max.apply(null, rows.map(function (r) { return r.v; })));
    var strongest = rows.slice().sort(function (a, b) { return b.v - a.v; })[0];
    var weakest = rows.slice().sort(function (a, b) { return a.v - b.v; })[0];
    var h = '<div class="sub" style="margin-bottom:8px">Leaning hardest on <strong>' + esc(strongest.c) + '</strong>, leaving <strong>' + esc(weakest.c) + '</strong> in the cold. The Exhibition rewards a knower who can turn every lens.</div>';
    rows.forEach(function (r) {
      var t = tierOf(r.v), nx = nextAt(r.v);
      h += '<div style="margin:7px 0">' +
        '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px">' +
        '<span>' + LEX_ICON[r.c] + ' <strong>' + esc(r.c) + '</strong> <span style="opacity:.7">' + esc(tierName(r.c, r.v)) + '</span></span>' +
        '<span style="opacity:.75">' + r.v + (nx ? ' / ' + nx : ' · summit') + '</span></div>' +
        '<div style="height:7px;border-radius:4px;background:#2A2A38;overflow:hidden">' +
        '<div style="height:100%;width:' + Math.min(100, Math.round(r.v / max * 100)) + '%;background:linear-gradient(90deg,#6FA8DC,#B07FE8)"></div></div></div>';
    });
    h += '<div class="sub" style="opacity:.75;margin-top:10px">Feeding a ladder: relic finds and studies, trials, encounters, journal rungs, duels, crafts, and any move the ledger tags with the concept. The Search panel pays a bonus for naming a concept before claiming its object.</div>';
    els.body.innerHTML = h;
  }

  /* ── standings snapshot: the one schema everything shares ── */
  function weekKey(dayStr) {
    var d = new Date(dayStr + "T12:00:00");
    if (isNaN(d)) return "";
    var y = d.getFullYear();
    var jan = new Date(y, 0, 1);
    var wk = Math.ceil((((d - jan) / 86400000) + jan.getDay() + 1) / 7);
    return y + "-W" + (wk < 10 ? "0" : "") + wk;
  }
  function buildStandings() {
    var d = SD(), st = d.stats || {};
    var flags = FL();
    var visited = 0, totalRegions = 0;
    try {
      E.CANON.CONSTELLATIONS.forEach(function (cn) { cn.regions.forEach(function (r) {
        totalRegions++;
        if (flags["visited_" + (r.id || "")] || (st.regions && st.regions[r.n])) visited++;
      }); });
    } catch (e) {}
    var cxp = {}; CONCEPTS.forEach(function (c) { cxp[c] = V.cxpOf(c); });
    var trialsStars = 0, trialWins = {}, tstars = 0;
    try {
      Object.keys(flags).forEach(function (k) {
        if (k.indexOf("v37_trial_") === 0) trialsStars += Number(flags[k]) || 0;
        if (k.indexOf("v37_tw_") === 0) trialWins[k.slice(7)] = Number(flags[k]) || 0;
      });
      Object.keys(trialWins).forEach(function (k) { tstars += trialWins[k]; });
    } catch (e) {}
    var days = st.days || {}, dayKeys = Object.keys(days);
    var weeks = {}; dayKeys.forEach(function (k) { var w = weekKey(k); if (w) weeks[w] = (weeks[w] || 0) + 1; });
    var uniqueTalks = 0;
    try { Object.keys(flags).forEach(function (k) { if (k.indexOf("heard_") === 0) uniqueTalks++; }); } catch (e) {}
    var badges = d.badges;
    var badgeN = badges ? (Array.isArray(badges) ? badges.length : Object.keys(badges).length) : 0;
    var relics = V.counts();
    var persp = (st.vantageWalks || 0) * 5 + (st.mirages || 0) * 3 + ((st.concept || {}).Perspective || 0) * 2 + (V.perspTokens() * 4);
    var fam = {};
    try { (d.ledger || []).forEach(function (row) { if (row && row.f) fam[row.f] = (fam[row.f] || 0) + 1; }); } catch (e) {}
    var halls = {};
    try {
      var hl = d.halls || {};
      halls = {
        exPrompts: hl.ex ? Object.keys(hl.ex).length : 0,
        essay: hl.essay ? { thesis: !!hl.essay.thesis, aoks: (hl.essay.aoks || []).length || 0, conclusion: !!hl.essay.conclusion } : {}
      };
    } catch (e) {}
    var prof = readProfile();
    return {
      v: 37, t: Date.now(), day: E.dayKey(),
      profile: prof,
      xp: d.xp | 0, level: (E.levelFor ? E.levelFor(d.xp | 0) : 0), lumens: d.lumens | 0,
      cxp: cxp,
      concept: st.concept || {}, element: st.element || {}, subject: st.subject || {},
      rung: st.rung || {},
      journal: { total: st.journalTotal | 0, manual: st.journalManual | 0, auto: st.journalAuto | 0, edits: st.edits | 0 },
      time: { min: (d.tele && d.tele.min) | 0 },
      days: { n: dayKeys.length, streak: st.streak | 0, best: st.bestStreak | 0, weeks: weeks },
      explore: { visited: visited, total: totalRegions, travels: st.travels | 0, regions: st.regions || {} },
      trials: { stars: trialsStars, wins: tstars, byType: trialWins },
      relics: { got: relics.got, sold: relics.sold, total: relics.total },
      crafts: { made: st.crafts | 0, masterworks: st.masterworks | 0 },
      talksUnique: uniqueTalks, talks: st.talks | 0,
      persp: persp,
      badges: badgeN,
      moves: st.moves || {},
      appraisal: { right: st.right | 0, wrong: st.wrong | 0, declines: st.declines | 0, honestDeclines: st.honestDeclines | 0, blindCorrect: st.blindCorrect | 0, toolsUsed: st.toolsUsed | 0 },
      mirages: st.mirages | 0, quick: st.quick | 0,
      exhibits: st.exhibits | 0, kqs: st.kqs | 0,
      cites: { forged: st.citesForged | 0, drillsRight: st.citeDrillsRight | 0, searches: st.searchesRun | 0 },
      essays: { outlines: st.essayOutlines | 0 },
      exportsTotal: st.exportTotal | 0,
      fam: fam,
      voice: (d.settings && d.settings.voice) || "",
      oaths: (d.oaths && (Array.isArray(d.oaths) ? d.oaths : Object.keys(d.oaths))) || [],
      halls: halls,
      daysMap: days
    };
  }
  function readProfile() {
    var f = FL();
    return {
      first: String(f.v37_p_first || ""), lastInit: String(f.v37_p_lastinit || ""),
      email: String(f.v37_p_email || ""), callsign: String(f.v37_p_callsign || ((SD().avatar && SD().avatar.name) || SD().callsign || ""))
    };
  }
  E.V37_RECORDS = { standings: buildStandings, tierOf: tierOf, tierName: tierName, readProfile: readProfile };

  /* ── the boards ── */
  var BOARDS = [
    { id: "total", n: "Total Points", get: function (s) { return s.xp; }, unit: "XP" },
    { id: "persp", n: "Perspectives in Use", get: function (s) { return s.persp; }, unit: "pts" },
    { id: "crafted", n: "Objects Crafted", get: function (s) { return s.crafts.made; }, unit: "made" },
    { id: "found", n: "Objects Found", get: function (s) { return s.relics.got; }, unit: "found" },
    { id: "talks", n: "Distinct Conversations", get: function (s) { return s.talksUnique; }, unit: "voices" },
    { id: "explore", n: "Atlas Explored", get: function (s) { return s.explore.visited; }, unit: "regions" },
    { id: "time", n: "Active Minutes", get: function (s) { return s.time.min; }, unit: "min" },
    { id: "daily", n: "Daily Flame", get: function (s) { return s.days.best; }, unit: "day streak" },
    { id: "weekly", n: "Weekly Flame", get: function (s) { return Object.keys(s.days.weeks || {}).length; }, unit: "weeks" },
    { id: "journal", n: "Journal Entries", get: function (s) { return s.journal.total; }, unit: "entries" },
    { id: "trials", n: "Trial Stars", get: function (s) { return s.trials.stars; }, unit: "★" }
  ];
  CONCEPTS.forEach(function (c) {
    BOARDS.push({ id: "cxp_" + c, n: c + " Insight", get: function (s) { return (s.cxp || {})[c] || 0; }, unit: "insight", icon: LEX_ICON[c] });
  });
  ELEMENTS.forEach(function (el) {
    BOARDS.push({ id: "el_" + el, n: el + " Coverage", get: function (s) { return (s.element || {})[el] || 0; }, unit: "rows" });
  });
  BOARDS.push({ id: "region_hall", n: "Region Visits (choose below)", get: function (s) { return s.explore.travels; }, unit: "travels" });

  /* deterministic Guild ghosts: pace-setters, plainly labeled */
  var GHOST_NAMES = ["QuietSextant", "AmberLedger", "NorthernScribe", "IronAlmanac", "CedarPilot", "SaltMeridian", "WinterSignal", "KeenSounding"];
  function ghosts(board, mine) {
    var out = [], day = E.dayKey();
    for (var i = 0; i < 4; i++) {
      var h = hashN(day + board.id + i);
      var scale = 0.55 + (h % 90) / 100; /* 0.55 .. 1.45 of your pace */
      var v = Math.max(1, Math.round((mine || 3) * scale + (h % 7)));
      out.push({ callsign: GHOST_NAMES[(h >>> 3) % GHOST_NAMES.length] + "·ghost", v: v, ghost: true });
    }
    return out;
  }

  var boardPick = "total";
  function openRecords() {
    try { E.openPanel("v37records"); } catch (e) {}
    renderRecords();
  }
  function renderRecords() {
    var els = panelEls(); if (!els.body) return;
    var s = buildStandings();
    els.title.textContent = "The Hall of Records";
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Leaderboards. Ghosts set a pace; classmates arrive when your teacher connects the class."
      : "The Guild posts its standings here. Until the classroom backend joins, the ghosts set the pace: deterministic pace-setters, no pretense of personhood.";
    var h = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px"><select id="v37board" style="max-width:100%">' +
      BOARDS.map(function (b) { return '<option value="' + b.id + '"' + (boardPick === b.id ? ' selected' : '') + '>' + (b.icon ? b.icon + ' ' : '') + esc(b.n) + '</option>'; }).join("") +
      '</select></div>';
    var board = BOARDS.filter(function (b) { return b.id === boardPick; })[0] || BOARDS[0];
    var mine = board.get(s);
    var callsign = s.profile.callsign || "you, unsigned";
    var rows;
    var cls = window.V37_CLASSROWS;
    if (Array.isArray(cls) && cls.length) {
      rows = cls.map(function (r) {
        var v = 0;
        try { v = board.get(r.standings || r) | 0; } catch (e) { v = Number((r.metrics || {})[board.id]) || 0; }
        return { callsign: r.callsign || "unsigned", v: v, me: (r.callsign === callsign) };
      });
      if (!rows.some(function (r) { return r.me; })) rows.push({ callsign: callsign, v: mine, me: true });
    } else {
      rows = ghosts(board, mine).concat([{ callsign: callsign, v: mine, me: true }]);
    }
    rows.sort(function (a, b) { return b.v - a.v; });
    h += '<table style="width:100%;border-collapse:collapse">' +
      '<tr style="opacity:.7"><th style="text-align:left;padding:4px">#</th><th style="text-align:left;padding:4px">Call sign</th><th style="text-align:right;padding:4px">' + esc(board.unit) + '</th></tr>';
    rows.forEach(function (r, ix) {
      h += '<tr style="' + (r.me ? 'background:rgba(232,181,74,.12);font-weight:bold' : '') + '">' +
        '<td style="padding:4px">' + (ix + 1) + '</td>' +
        '<td style="padding:4px">' + esc(r.callsign) + (r.ghost ? ' <span style="opacity:.55;font-size:.8em">pace-setter</span>' : '') + '</td>' +
        '<td style="padding:4px;text-align:right">' + r.v + '</td></tr>';
    });
    h += '</table>';
    if (boardPick === "region_hall") {
      h += '<h3 style="margin:10px 0 4px">Visits by region</h3>';
      var regs = Object.keys(s.explore.regions).sort(function (a, b) { return s.explore.regions[b] - s.explore.regions[a]; }).slice(0, 15);
      regs.forEach(function (rn) { h += '<div style="display:flex;justify-content:space-between"><span>' + esc(rn) + '</span><span>' + s.explore.regions[rn] + '</span></div>'; });
    }
    h += '<div class="sub" style="opacity:.75;margin-top:10px">Boards travel with the classroom backend: the same numbers reach the Warden\'s Chartroom under your call sign, and the class boards replace the ghosts. Your name never shows on a public board, only the call sign.</div>';
    els.body.innerHTML = h;
    var sel = els.body.querySelector("#v37board");
    if (sel) sel.onchange = function () { boardPick = sel.value; renderRecords(); };
  }

  /* ── chips and keys ── */
  function addChips() {
    var anchor = document.getElementById("btnV37Trials") || document.getElementById("btnGuide");
    if (!anchor || !anchor.parentNode) return;
    function mk(id, label, aria, fn) {
      if (document.getElementById(id)) return;
      var b = document.createElement("button");
      b.className = "chip"; b.id = id; b.textContent = label;
      b.setAttribute("aria-label", aria); b.addEventListener("click", fn);
      anchor.parentNode.insertBefore(b, anchor.nextSibling);
    }
    mk("btnV37Forge", "Concepts", "Open the Concept Forge: twelve concept ladders fed by your actions", openForge);
    mk("btnV37Records", "Records · Z", "Open the Hall of Records, the leaderboards. Shortcut Z", openRecords);
  }
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target && e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
    if ((e.key || "").toLowerCase() === "z") openRecords();
  });
  E.V37_RECORDS.openForge = openForge;
  E.V37_RECORDS.openRecords = openRecords;

  function boot() { addChips(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
