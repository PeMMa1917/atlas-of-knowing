/* ---- content-67-trials.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · THE TRIAL ENGINE (content-67-trials.js)
   v37. Load after content-60. Arcade types land in content-67b.

   Fourteen mechanic families, one contract. Every instance carries a
   concept, a framework element, a knowledge question, and a takeaway.
   The debrief pays concept insight, writes a coverage row, and can hand
   over a relic bound to the trial. Tutorials live in the Proving
   Grounds; the world holds the stern versions. Vigor, battle bonuses,
   Perspective Tokens, and Stride all read from the Bandolier, so deck
   choices matter here. That is the whole loop: find, carry, attempt,
   reflect. (Comments may speak freely; player-facing strings obey the
   style law. No em dashes anywhere.)
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.V37) { try { console.warn("[trials] reliquary runtime missing"); } catch (e) {} return; }
  var V = E.V37, R = E.RELIQUARY;

  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function toast(m) { try { E.toast(m); } catch (e) {} }
  function sfx(n) { try { if (E.sfx && E.sfx.play) E.sfx.play(n); } catch (e) {} }
  function juice(k) { try { if (E.fx) { if (k === "big" && E.fx.confetti) E.fx.confetti(); else if (E.fx.sparks) E.fx.sparks(); } } catch (e) {} }
  function save() { try { E.scheduleSave(); } catch (e) {} }
  function hashN(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }
  function panelEls() { return { title: document.getElementById("panelTitle"), sub: document.getElementById("panelSub"), body: document.getElementById("panelBody") }; }

  /* ── the fourteen families ── */
  var TYPES = {
    sweep:  { n: "Assumption Sweep",        f: "Puzzle",      icon: "🔎", blurb: "A wall of statements. Six smuggled assumptions hide among the observations. Find them before the bell." },
    forge:  { n: "Claim Forge",             f: "Craft",       icon: "🔨", blurb: "An argument arrives in pieces. Hammer claim, evidence, warrant, counter, and reply into their load-bearing order." },
    prism:  { n: "Perspective Prism",       f: "Puzzle",      icon: "🔮", blurb: "One event, four standpoints. Match each detail to the only vantage which could have caught it." },
    scales: { n: "Scales of Justification", f: "Puzzle",      icon: "⚖️", blurb: "A claim sits on the pan. Load reasons until belief balances evidence, without tipping into overclaim." },
    cipher: { n: "Cipher of the Stacks",    f: "Puzzle",      icon: "🗝️", blurb: "A quotation locked in substitution cipher. Crack it letter by letter, the way readers crack any unfamiliar text." },
    serve:  { n: "Socratic Serve",          f: "Dialogue",    icon: "🏓", blurb: "Claims fly at you. Return each one with the question which opens it rather than the question which merely wounds." },
    memory: { n: "Memory of the Hall",      f: "Puzzle",      icon: "🏛️", blurb: "The hall flashes a sequence of concepts. Hold it, extend it, and learn what working memory forgives." },
    switch: { n: "Switchworks",             f: "Puzzle",      icon: "🎚️", blurb: "Levers rule lamps through hidden logic. Reroute the truth conditions until every lamp burns." },
    slide:  { n: "Slide of Provenance",     f: "Puzzle",      icon: "🧩", blurb: "A shredded document in nine sliding pieces. Restore it under par and watch the whole story reassemble." },
    volley: { n: "Fallacy Volley",          f: "Battle",      icon: "🛡️", blurb: "Bad arguments fall from the rafters. Name each fallacy before it lands, and let the sound ones pass." },
    maze:   { n: "Boundary Maze",           f: "Challenge",   icon: "🌀", blurb: "Collect three premises and reach the conclusion before the walls rethink themselves at half time." },
    climb:  { n: "Rung Climb",              f: "Challenge",   icon: "🪜", blurb: "A platforming ascent of the Ladder of Knowing, rung by rung. The ledge forgives a late jump, once." },
    shadow: { n: "Shadow Archive",          f: "Exploration", icon: "🕯️", blurb: "Wardens patrol the restricted stacks. Read their routes, slip the sightlines, and lift the folio unseen." },
    tactica:{ n: "Tactica: Grid of Claims", f: "Battle",      icon: "♟️", blurb: "Turn-based war on a five-by-five board. Your claims against the doubts, with matchups instead of dice." }
  };
  var ORDER = ["sweep", "forge", "prism", "scales", "cipher", "serve", "memory", "switch", "slide", "volley", "maze", "climb", "shadow", "tactica"];

  /* ── knowledge question templates per family ── */
  var KQS = {
    sweep:  ["What separates an observation from an assumption wearing its clothes?",
             "How do unstated assumptions steer which claims about {c} get accepted?"],
    forge:  ["What does a claim owe its evidence before anyone owes it belief?",
             "How does the order of reasons change the strength of a case about {c}?"],
    prism:  ["Under what circumstances can two honest witnesses disagree about {c}?",
             "What can a standpoint hide from the person standing on it?"],
    scales: ["How much support does a claim about {c} need before confidence becomes justified?",
             "When does adding more reasons stop adding more justification?"],
    cipher: ["What lets a reader claim to know a text says one thing rather than another?",
             "How far does decoding depend on expectations the decoder brought along?"],
    serve:  ["Which questions open an argument, and which only score against it?",
             "What makes a question about {c} fair to the person answering it?"],
    memory: ["How does the shape of memory limit what a knower can hold at once?",
             "What survives when knowledge outgrows the mind carrying it?"],
    switch: ["How do rules combine to produce outcomes none of them mention alone?",
             "What counts as understanding a system: predicting it, or explaining it?"],
    slide:  ["How much of a source's meaning lives in its arrangement?",
             "What justifies confidence a restored document matches the original?"],
    volley: ["Why do weak arguments about {c} so often travel faster than strong ones?",
             "What duty does a listener carry when a bad argument sounds good?"],
    maze:   ["Is method a route chosen in advance, or a route defended afterward?",
             "What should a knower do when the terrain of {c} shifts mid-argument?"],
    climb:  ["What changes in the knower between noticing and justifying?",
             "Why does the climb from description to defense feel like different muscles?"],
    shadow: ["Who decides which knowledge sits behind a locked stack, and at what cost?",
             "What does it do to knowledge about {c} when access itself is unequal?"],
    tactica:["Can disagreement be won, or only mapped?",
             "Which positions about {c} are strong because of where they stand, rather than what they claim?"]
  };
  /* ── one-line takeaways per family ── */
  var TAKE = {
    sweep: "Assumptions travel disguised as furniture. Naming them is rung one of critique.",
    forge: "An argument is architecture. The warrant is the beam nobody sees and everybody stands on.",
    prism: "Standpoints earn and lose sight at once. Method means borrowing eyes on purpose.",
    scales: "Calibration beats confidence. The pan tips both ways: too little support, and too much claimed from it.",
    cipher: "Reading is decoding plus expectation. Both can mislead; only one admits it.",
    serve: "A fair question hands the answerer room to think. A loaded one only hands them a corner.",
    memory: "Working memory holds about five things. Writing, chart, and codex exist because knowers noticed.",
    switch: "Systems surprise their own rules. Prediction tests understanding harder than recitation.",
    slide: "Arrangement carries meaning. Provenance is an argument about order, not just ownership.",
    volley: "Fallacies are fast because they flatter. Slowness is a defensive skill.",
    maze: "A route is a method. Scouting first spends time to buy certainty, and the trade is the lesson.",
    climb: "Each rung asks more of the same event: notice, name, connect, question, defend.",
    shadow: "Gatekeeping shapes knowing. Every archive teaches with its locks as well as its shelves.",
    tactica: "Positions have matchups. Some claims lose to a counterexample and beat an abstraction, and knowing which is strategy."
  };

  /* region theming: concept and element leanings for instance generation */
  var REGION_LEAN = {
    baghdad: ["Justification", "Methods and Tools", "Mathematics"], timbuktu: ["Evidence", "Perspectives", "History"],
    kerala: ["Certainty", "Methods and Tools", "Mathematics"], maya: ["Interpretation", "Scope", "Mathematics"],
    rod: ["Objectivity", "Methods and Tools", "Mathematics"], hut8: ["Certainty", "Ethics", "Computer Science"],
    royal: ["Evidence", "Methods and Tools", "Physics"], ulugh: ["Objectivity", "Scope", "Physics"],
    shore: ["Culture", "Methods and Tools", "Geography"], beagle: ["Explanation", "Scope", "Biology"],
    haya: ["Culture", "Methods and Tools", "Chemistry"], ring: ["Certainty", "Scope", "Physics"],
    florence: ["Interpretation", "Perspectives", "Visual Arts"], ukiyo: ["Culture", "Perspectives", "Visual Arts"],
    benin: ["Power", "Ethics", "Visual Arts"], harlem: ["Perspective", "Perspectives", "Music"],
    songlines: ["Culture", "Scope", "Geography"], cave: ["Interpretation", "Scope", "Visual Arts"],
    library: ["Evidence", "Scope", "History"], griot: ["Truth", "Perspectives", "History"],
    zimbabwe: ["Power", "Perspectives", "History"], cusco: ["Truth", "Methods and Tools", "History"],
    historian: ["Objectivity", "Ethics", "History"], commission: ["Responsibility", "Ethics", "Global Politics"],
    seoul: ["Values", "Ethics", "Psychology"], qero: ["Culture", "Scope", "World Religions"],
    aggregate: ["Objectivity", "Methods and Tools", "Economics"], hall: ["Perspective", "Scope", "Philosophy"],
    reliquary: ["Interpretation", "Scope", "Philosophy"], vault_tech: ["Explanation", "Methods and Tools", "Design Technology"],
    vault_lang: ["Interpretation", "Scope", "English A: Language and Literature"], vault_pol: ["Power", "Ethics", "Global Politics"],
    vault_rel: ["Values", "Perspectives", "World Religions"], vault_knower: ["Perspective", "Perspectives", "Philosophy"],
    grounds_v37: ["Justification", "Methods and Tools", "Philosophy"]
  };
  var CONCEPTS = E.CANON.CONCEPTS;

  /* ── instance generation: every region carries four to six trials ── */
  var INSTANCES = [], BY_ID = {}, BY_REGION = {};
  function mkInstance(type, region, i, diff, tutorial) {
    var lean = REGION_LEAN[region] || ["Evidence", "Scope", "Philosophy"];
    var c = (i % 3 === 0) ? lean[0] : CONCEPTS[hashN(type + region + i) % CONCEPTS.length];
    var e = (i % 2 === 0) ? lean[1] : ["Scope", "Perspectives", "Methods and Tools", "Ethics"][hashN(region + type + i) % 4];
    var kqT = KQS[type][hashN(region + i) % KQS[type].length];
    var inst = {
      id: "tr_" + type + "_" + region + (i ? "_" + i : ""),
      type: type, region: region, diff: diff, tutorial: !!tutorial,
      c: c, e: e, s: lean[2],
      name: (tutorial ? "First " : diff >= 3 ? "Master " : "") + TYPES[type].n + (i > 1 ? " " + ["II", "III", "IV"][i - 2] : ""),
      kq: kqT.replace("{c}", c),
      take: TAKE[type],
      seed: hashN(type + region + i)
    };
    INSTANCES.push(inst); BY_ID[inst.id] = inst;
    (BY_REGION[region] = BY_REGION[region] || []).push(inst);
    return inst;
  }
  function generateInstances() {
    ORDER.forEach(function (t) { mkInstance(t, "grounds_v37", 1, 1, true); });
    Object.keys(REGION_LEAN).forEach(function (region) {
      if (region === "grounds_v37") return;
      var picks = [];
      for (var k = 0; k < ORDER.length; k++) if (hashN(region + ORDER[k]) % 3 === 0) picks.push(ORDER[k]);
      while (picks.length < 4) picks.push(ORDER[hashN(region + picks.length) % ORDER.length]);
      picks = picks.filter(function (t, ix) { return picks.indexOf(t) === ix; }).slice(0, 6);
      picks.forEach(function (t, ix) {
        mkInstance(t, region, 1, 2, false);
        if (ix < 2) mkInstance(t, region, 2, 3, false);
      });
    });
  }

  /* relics bound to trials: minigame-mode relics pay out on first win of
     their named type in their region */
  function boundRelic(inst) {
    var pool = (R.byRegion[inst.region] || []).filter(function (o) {
      return o.pl.mode === "minigame" && String(o.pl.detail).trim() === TYPES[inst.type].n && !V.got(o.id);
    });
    return pool.length ? pool[0] : null;
  }

  /* ── progress ── */
  function stars(id) { return Number(FL()["v37_trial_" + id]) || 0; }
  function setStars(id, n) {
    if (n > stars(id)) { FL()["v37_trial_" + id] = n; save(); }
  }
  function winsOfType(t) { return Number(FL()["v37_tw_" + t]) || 0; }

  /* ── the browser panel ── */
  function openTrials() {
    try { E.openPanel("v37trials"); } catch (e) {}
    renderBrowser();
  }
  function renderBrowser() {
    var els = panelEls(); if (!els.body) return;
    var rid = E.getState().player.region;
    var here = BY_REGION[rid] || [];
    els.title.textContent = "Trials · " + (R.labels[rid] || rid);
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Each trial trains one thinking move. Stars mark your best run."
      : "Fourteen mechanic families, each one a thinking move with a score attached. The Proving Grounds teach; the world examines.";
    var h = "";
    if (rid !== "grounds_v37") {
      var done = ORDER.filter(function (t) { return stars("tr_" + t + "_grounds_v37") > 0; }).length;
      h += '<div class="sub" style="margin-bottom:8px">Tutorials cleared: ' + done + '/14. The Proving Grounds sit off the Grand Reliquary.</div>';
    }
    if (!here.length) h += '<div class="sub">No trials stand in this region. The Chart marks denser ground.</div>';
    here.forEach(function (inst) {
      var st = stars(inst.id), T = TYPES[inst.type];
      var relic = boundRelic(inst);
      var lock = !inst.tutorial && stars("tr_" + inst.type + "_grounds_v37") === 0;
      h += '<div style="border:1px solid #555;border-radius:8px;padding:10px;margin:8px 0;background:rgba(0,0,0,.15)">' +
        '<div style="display:flex;gap:8px;align-items:baseline;flex-wrap:wrap">' +
        '<span>' + T.icon + '</span><strong>' + esc(inst.name) + '</strong>' +
        '<span style="opacity:.7;font-size:.85em">' + esc(inst.c) + ' · ' + esc(inst.e) + '</span>' +
        '<span style="color:#E8B54A">' + "★".repeat(st) + '<span style="opacity:.35">' + "★".repeat(Math.max(0, 3 - st)) + '</span></span></div>' +
        '<div style="opacity:.85;margin:4px 0">' + esc(T.blurb) + '</div>' +
        '<div style="opacity:.8;font-size:.9em;margin:4px 0"><em>Its question: ' + esc(inst.kq) + '</em></div>' +
        (relic ? '<div style="color:#B07FE8;font-size:.85em">A relic watches this trial: first victory claims it.</div>' : '') +
        '<div style="margin-top:6px">' +
        (lock ? '<span class="sub" style="opacity:.7">Clear the tutorial in the Proving Grounds first. Safe versions before stern ones.</span>'
              : '<button class="btn small gold" data-v37trial="' + esc(inst.id) + '">Begin</button>') +
        '</div></div>';
    });
    els.body.innerHTML = h;
    els.body.querySelectorAll("[data-v37trial]").forEach(function (b) {
      b.onclick = function () { startTrial(b.getAttribute("data-v37trial")); };
    });
  }

  /* ── trial lifecycle ── */
  var current = null;
  function startTrial(id) {
    var inst = BY_ID[id]; if (!inst) return;
    current = { inst: inst, t0: Date.now() };
    var els = panelEls();
    els.title.textContent = TYPES[inst.type].icon + " " + inst.name;
    els.sub.textContent = inst.kq;
    try { E.tagCoverage({ c: inst.c, e: inst.e, f: TYPES[inst.type].f, s: inst.s, m: "trial" }); } catch (e) {}
    IMPL[inst.type](inst, els, function (win, starCount, note) { endTrial(win, starCount, note); });
  }
  function endTrial(win, starCount, note) {
    if (!current) return;
    var inst = current.inst, T = TYPES[inst.type];
    var els = panelEls();
    current = null;
    if (win) {
      var st = Math.max(1, Math.min(3, starCount | 0));
      var firstWin = stars(inst.id) === 0;
      setStars(inst.id, st);
      FL()["v37_tw_" + inst.type] = winsOfType(inst.type) + 1;
      var xp = 20 + st * 5, cxp = 15 + st * 5;
      try { E.gainXP(xp, inst.name); } catch (e) {}
      V.cxpAdd(inst.c, cxp, inst.name);
      var relic = firstWin ? boundRelic(inst) : null;
      if (relic) V.acquire(relic.id, "minigame");
      juice(st >= 3 ? "big" : "ring"); sfx(st >= 3 ? "fanfare" : "chime");
      var h = '<div style="text-align:center;padding:12px 0">' +
        '<div style="font-size:2em">' + T.icon + '</div>' +
        '<div style="color:#E8B54A;font-size:1.4em;margin:6px 0">' + "★".repeat(st) + '</div>' +
        (note ? '<div class="sub">' + esc(note) + '</div>' : '') +
        '<div style="margin:8px 0">+' + xp + ' XP · +' + cxp + ' ' + esc(inst.c) + ' insight</div>' +
        (relic ? '<div style="color:#B07FE8;margin:6px 0">The watching relic steps forward: ' + esc(relic.name) + '</div>' : '') +
        '<div style="max-width:460px;margin:10px auto;opacity:.9"><em>' + esc(inst.take) + '</em></div>' +
        '<div class="sub" style="opacity:.8;margin:8px 0">Carry the question onward: ' + esc(inst.kq) + '<br>A rung 4 Journal entry turns it into your own.</div>' +
        '<button class="btn gold" id="v37back">Back to the trials</button></div>';
      els.body.innerHTML = h;
      try { E.autoJournal("Cleared " + inst.name + " (" + st + " star" + (st > 1 ? "s" : "") + "). Its question stays with me: " + inst.kq); } catch (e) {}
      try { E.emit("v37_trial", { id: inst.id, type: inst.type, stars: st, c: inst.c }); } catch (e) {}
    } else {
      sfx("thud");
      els.body.innerHTML = '<div style="text-align:center;padding:12px 0">' +
        '<div style="font-size:1.6em">' + T.icon + '</div>' +
        '<div style="margin:8px 0">Not this run. ' + (note ? esc(note) : "The trial keeps no grudge and resets the board.") + '</div>' +
        '<div class="sub" style="max-width:420px;margin:8px auto">A missed attempt still counts as evidence: something about the method wants adjusting. Vigor, carried relics, and a slower first read all change the odds.</div>' +
        '<button class="btn" id="v37retry">Try again</button> <button class="btn" id="v37back">Back</button></div>';
      var rb = els.body.querySelector("#v37retry");
      if (rb) rb.onclick = function () { startTrial(inst.id); };
    }
    var back = els.body.querySelector("#v37back");
    if (back) back.onclick = renderBrowser;
    save();
  }

  /* ═════════ IMPLEMENTATIONS: board types (arcade types in 67b) ═════════ */
  var IMPL = {};
  E.V37_TRIALS = { TYPES: TYPES, ORDER: ORDER, INSTANCES: INSTANCES, byId: BY_ID, byRegion: BY_REGION,
    IMPL: IMPL, open: openTrials, start: startTrial, stars: stars, winsOfType: winsOfType, end: endTrial, render: renderBrowser };

  /* helper: bonus seconds from the Bandolier */
  function bonusTime() { return V.battleBonus().time * 4 + (V.hasAbility("stride") ? 5 : 0); }
  function lives() { return 1 + (V.vigor() >= 6 ? 1 : 0) + V.battleBonus().life; }

  /* ── 1 · ASSUMPTION SWEEP ── */
  var SWEEP_ASSUME = [
    "Everyone obviously agrees on this", "Older sources count as wiser sources", "The majority view settles the matter",
    "Numbers never mislead anyone", "Eyewitnesses remember events as they happened", "The expert's field covers this question",
    "Published means verified", "The translation says what the original said", "The sample stands for the whole",
    "Silence means agreement", "The most recent study cancels the older ones", "A confident tone signals a checked claim",
    "The map matches the territory", "Both sides deserve equal time on every question", "The label on the crate tells the whole story",
    "What feels familiar counts as evidence"
  ];
  var SWEEP_FACT = [
    "The ledger lists forty entries for the month", "Three witnesses filed reports on the same day", "The folio carries a dated seal",
    "The instrument reads 21.4 at noon", "Two copies differ in the third line", "The shelf holds nine folios and one gap",
    "The ink fades toward the margin", "The survey reached 412 households", "The chart marks two reefs west of the bay",
    "The translation notes three untranslated terms", "The specimen weighs 214 grams", "The archive stamps each loan with a date",
    "The committee met twice in March", "The plate shows wear along one edge", "The catalog lists the piece as unsigned",
    "Five of six trials repeated the result", "The letter arrived unsealed", "The census skipped two districts, and says so"
  ];
  IMPL.sweep = function (inst, els, done) {
    var rng = inst.seed, pickA = [], pickF = [];
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    var A = SWEEP_ASSUME.slice(), F = SWEEP_FACT.slice();
    for (var i = 0; i < 6; i++) pickA.push(A.splice(nx() % A.length, 1)[0]);
    for (var j = 0; j < 12; j++) pickF.push(F.splice(nx() % F.length, 1)[0]);
    var tiles = pickA.map(function (t) { return { t: t, a: true }; }).concat(pickF.map(function (t) { return { t: t, a: false }; }));
    tiles.sort(function () { return (nx() % 3) - 1; });
    var found = 0, misses = 0, missCap = 3 + (lives() - 1), time = (inst.tutorial ? 120 : 75) + bonusTime(), timer = null;
    var h = '<div class="sub" style="margin-bottom:6px">Mark the six assumptions. Observations stay put. Misses allowed: ' + missCap + '. <span id="v37t"></span></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:6px">';
    tiles.forEach(function (tile, ix) {
      h += '<button class="btn small" style="text-align:left;white-space:normal" data-sw="' + ix + '">' + esc(tile.t) + '</button>';
    });
    els.body.innerHTML = h + '</div>';
    var tEl = els.body.querySelector("#v37t");
    function tick() {
      time--; if (tEl) tEl.textContent = time + "s";
      if (time <= 0) { clearInterval(timer); done(false, 0, "The bell beat the sweep. Six hid; you named " + found + "."); }
    }
    timer = setInterval(tick, 1000); tick();
    els.body.querySelectorAll("[data-sw]").forEach(function (b) {
      b.onclick = function () {
        var tile = tiles[b.getAttribute("data-sw") | 0];
        if (b.disabled) return;
        b.disabled = true;
        if (tile.a) {
          found++; b.style.borderColor = "#7fbf7f"; b.style.opacity = ".65"; sfx("chime"); juice();
          if (found === 6) { clearInterval(timer); done(true, misses === 0 ? 3 : misses === 1 ? 2 : 1, "All six named with " + misses + " miss" + (misses === 1 ? "" : "es") + "."); }
        } else {
          misses++; b.style.borderColor = "#c96f6f"; sfx("thud");
          if (misses > missCap) { clearInterval(timer); done(false, 0, "Too many observations accused. The facts unionized."); }
        }
      };
    });
  };

  /* ── 2 · CLAIM FORGE ── */
  var FORGE_BANK = [
    { claim: "The city should trust the new bridge design.",
      parts: ["Claim: the new bridge design deserves the city's trust.",
        "Evidence: load tests passed at twice the required weight in three independent labs.",
        "Warrant: independent repetition under stress models the loads the bridge will face.",
        "Counter: lab conditions flatten wind and traffic chaos into clean numbers.",
        "Reply: the design adds a monitored trial year with sensors before full opening."] },
    { claim: "The museum should return the carved panel.",
      parts: ["Claim: the museum should return the carved panel to its source community.",
        "Evidence: acquisition records show removal during an occupation, without consent.",
        "Warrant: holdings taken without consent carry an obligation which outlasts paperwork.",
        "Counter: the museum conserved the panel for a century and shares it with millions.",
        "Reply: conservation earns thanks, and stewardship can continue through loans after return."] },
    { claim: "The survey's headline number deserves caution.",
      parts: ["Claim: the survey's headline number deserves caution before anyone repeats it.",
        "Evidence: the sample drew only from one district, in one language, on weekday mornings.",
        "Warrant: a sample this narrow measures its own reach rather than the whole city.",
        "Counter: no survey reaches everyone, and this one still gathered two thousand voices.",
        "Reply: size helps, and reach still rules: two thousand similar voices sing one part."] },
    { claim: "The old star chart still deserves study.",
      parts: ["Claim: the old star chart still deserves a place in the observatory's teaching.",
        "Evidence: its positions err by degrees, and its error pattern maps its maker's method.",
        "Warrant: an instrument's mistakes teach method in a way its successes hide.",
        "Counter: students need accurate charts, and class hours run short already.",
        "Reply: one session on the error pattern buys a habit of auditing every chart after it."] },
    { claim: "The team should publish the failed experiment.",
      parts: ["Claim: the team should publish the failed experiment in full.",
        "Evidence: four other labs plan versions of the same design this year.",
        "Warrant: a published failure spares the field repeated cost and steers better designs.",
        "Counter: journals favor positive results, and careers ride on the ledger.",
        "Reply: registered reports now accept sound methods regardless of outcome, and citing them costs nothing."] },
    { claim: "The griot's account belongs beside the colonial archive.",
      parts: ["Claim: the griot's account belongs beside the colonial archive, as evidence.",
        "Evidence: the sung genealogy preserves names and routes the written record omits.",
        "Warrant: memory institutions earn accuracy checks, whatever medium carries them.",
        "Counter: oral accounts shift between tellings, so the text should outrank the song.",
        "Reply: the archive shifted too, editor by editor: both records earn source criticism, neither earns exile."] }
  ];
  IMPL.forge = function (inst, els, done) {
    var set = FORGE_BANK[inst.seed % FORGE_BANK.length];
    var order = set.parts.slice(), shuffled = set.parts.slice();
    var rng = inst.seed;
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    shuffled.sort(function () { return (nx() % 3) - 1; });
    var placed = 0, strikes = 0, cap = 2 + lives();
    var h = '<div class="sub" style="margin-bottom:6px">Forge the argument in load-bearing order: claim, evidence, warrant, counter, reply. Strikes allowed: ' + cap + '.</div>' +
      '<div id="v37built" style="min-height:40px;border:1px dashed #666;border-radius:6px;padding:6px;margin-bottom:8px"></div>' +
      '<div style="display:grid;gap:6px">' +
      shuffled.map(function (p, ix) { return '<button class="btn small" style="text-align:left;white-space:normal" data-fg="' + ix + '">' + esc(p) + '</button>'; }).join("") + '</div>';
    els.body.innerHTML = h;
    var built = els.body.querySelector("#v37built");
    els.body.querySelectorAll("[data-fg]").forEach(function (b) {
      b.onclick = function () {
        if (b.disabled) return;
        var p = shuffled[b.getAttribute("data-fg") | 0];
        if (p === order[placed]) {
          placed++; b.disabled = true; b.style.opacity = ".45";
          built.innerHTML += '<div style="margin:2px 0">' + placed + '. ' + esc(p) + '</div>';
          sfx("chime"); juice();
          if (placed === order.length) done(true, strikes === 0 ? 3 : strikes <= 2 ? 2 : 1, "Forged with " + strikes + " strike" + (strikes === 1 ? "" : "s") + ".");
        } else {
          strikes++; sfx("thud");
          b.style.borderColor = "#c96f6f";
          setTimeout(function () { b.style.borderColor = ""; }, 400);
          if (strikes > cap) done(false, 0, "The beam cracked. Warrants before counters, always.");
        }
      };
    });
  };

  /* ── 3 · PERSPECTIVE PRISM ── */
  var PRISM_BANK = [
    { event: "A market stall sells the last basket of river fish at double the morning price.",
      views: ["The seller, counting a family's debts", "The buyer, cooking for a wedding tonight", "The fisher, who sold the catch at dawn for a third of this", "The inspector, checking scales and licenses"],
      rounds: [
        { detail: "Knows the catch's original dawn price", v: 2 },
        { detail: "Knows why the price felt fair to pay", v: 1 },
        { detail: "Knows whether the scale reads true", v: 3 }
      ] },
    { event: "A restored fresco reopens to the public with brighter blues than anyone remembers.",
      views: ["The restorer, who matched pigment samples from under the frame", "The parish elder, who prayed under it for sixty years", "The tourist, seeing it for the first time", "The chemist, who dated the overpaint layers"],
      rounds: [
        { detail: "Knows what the blues looked like in living memory", v: 1 },
        { detail: "Knows which layer counted as original", v: 3 },
        { detail: "Knows how the restored color was chosen", v: 0 }
      ] },
    { event: "A village well runs dry the same summer a bottling plant opens upstream.",
      views: ["The hydrologist, with ten years of groundwater charts", "The plant manager, with extraction permits and meters", "The farmer, whose grandmother's well never failed before", "The journalist, arriving with one afternoon and a deadline"],
      rounds: [
        { detail: "Knows the aquifer's decade-long trend", v: 0 },
        { detail: "Knows the plant's exact daily draw", v: 1 },
        { detail: "Knows the well's whole remembered history", v: 2 }
      ] },
    { event: "A new textbook chapter shortens the war to a single page.",
      views: ["The author, working to a page budget from the ministry", "The veteran's granddaughter, reading the page in class", "The historian, who reviewed three drafts", "The publisher, balancing six markets' sensitivities"],
      rounds: [
        { detail: "Knows what the ministry asked to cut", v: 0 },
        { detail: "Knows how the page lands in a living room", v: 1 },
        { detail: "Knows which claims survived peer review", v: 2 }
      ] }
  ];
  IMPL.prism = function (inst, els, done) {
    var set = PRISM_BANK[inst.seed % PRISM_BANK.length];
    var round = 0, misses = 0, cap = lives(), tokens = V.perspTokens();
    function draw() {
      var r = set.rounds[round];
      var h = '<div class="sub" style="margin-bottom:6px">' + esc(set.event) + '</div>' +
        '<div style="margin:8px 0"><strong>Round ' + (round + 1) + ' of 3.</strong> Who alone could know this: <em>' + esc(r.detail) + '</em></div>' +
        '<div style="display:grid;gap:6px">' +
        set.views.map(function (v, ix) {
          var dim = tokens > 0 && misses === 0 && round === 0 && ix === ((r.v + 2) % 4);
          return '<button class="btn small" style="text-align:left;white-space:normal' + (dim ? ';opacity:.5' : '') + '" data-pr="' + ix + '">' + esc(v) + (dim ? ' <span style="opacity:.7">(a Token dims an unlikely eye)</span>' : '') + '</button>';
        }).join("") + '</div>';
      els.body.innerHTML = h;
      els.body.querySelectorAll("[data-pr]").forEach(function (b) {
        b.onclick = function () {
          if ((b.getAttribute("data-pr") | 0) === r.v) {
            sfx("chime"); juice(); round++;
            if (round === 3) done(true, misses === 0 ? 3 : misses === 1 ? 2 : 1, "Three details, each returned to its only possible eye.");
            else draw();
          } else {
            misses++; sfx("thud");
            if (misses > cap) done(false, 0, "The prism fogged. Each standpoint holds one kind of sight.");
            else draw();
          }
        };
      });
    }
    draw();
  };

  /* ── 4 · SCALES OF JUSTIFICATION ── */
  IMPL.scales = function (inst, els, done) {
    var rng = inst.seed;
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    var target = 10 + (nx() % 5); /* needed support */
    var over = target + 4 + (nx() % 3); /* overclaim line */
    var reasons = [];
    var kinds = [
      { t: "Replicated measurement", w: 5 }, { t: "Single eyewitness, sober and near", w: 3 },
      { t: "Expert testimony, inside the field", w: 4 }, { t: "Expert testimony, outside the field", w: 1 },
      { t: "Old authority, uninspected for years", w: 1 }, { t: "Anecdote from a friend", w: 1 },
      { t: "Large survey, mixed sample", w: 4 }, { t: "Small survey, narrow sample", w: 2 },
      { t: "Archival document, dated and sealed", w: 4 }, { t: "Rumor with three retellings", w: 0 },
      { t: "Model prediction, validated twice", w: 4 }, { t: "Analogy to a similar case", w: 2 }
    ];
    for (var i = 0; i < 8; i++) reasons.push(kinds.splice(nx() % kinds.length, 1)[0]);
    var loaded = [], sum = 0, weighs = 0;
    function draw() {
      var h = '<div class="sub" style="margin-bottom:6px">Load reasons until support reaches the claim line without crossing into overclaim. The pan hides weights until placed. Target: between ' + target + ' and ' + (over - 1) + '.</div>' +
        '<div style="margin:6px 0">Support so far: <strong>' + sum + '</strong> · placed: ' + loaded.length + '</div>' +
        '<div style="display:grid;gap:6px">' +
        reasons.map(function (r, ix) {
          var used = loaded.indexOf(ix) >= 0;
          return '<button class="btn small" style="text-align:left' + (used ? ';opacity:.4' : '') + '" data-sc="' + ix + '" ' + (used ? 'disabled' : '') + '>' + esc(r.t) + (used ? ' · weight ' + r.w : '') + '</button>';
        }).join("") + '</div>' +
        '<div style="margin-top:8px"><button class="btn gold" id="v37weigh">Weigh the claim</button> <span class="sub">weighings spent: ' + weighs + '</span></div>';
      els.body.innerHTML = h;
      els.body.querySelectorAll("[data-sc]").forEach(function (b) {
        b.onclick = function () {
          var ix = b.getAttribute("data-sc") | 0;
          loaded.push(ix); sum += reasons[ix].w; sfx("tick"); draw();
        };
      });
      els.body.querySelector("#v37weigh").onclick = function () {
        weighs++;
        if (sum >= target && sum < over) done(true, weighs === 1 ? 3 : weighs === 2 ? 2 : 1, "Balanced at " + sum + ": enough to hold, nothing borrowed.");
        else if (sum >= over) done(false, 0, "Overclaimed at " + sum + ". A claim can drown in its own supporters.");
        else if (weighs >= 3) done(false, 0, "Three weighings, still light at " + sum + ". Rumors weigh nothing; the pan noticed.");
        else { toast("Light at " + sum + ". The pan wants more before belief."); draw(); }
      };
    }
    draw();
  };

  /* ── 5 · CIPHER OF THE STACKS ── */
  var CIPHER_BANK = [
    { q: "DOUBT IS NOT A PLEASANT CONDITION BUT CERTAINTY IS ABSURD", by: "Voltaire, letter of 1770" },
    { q: "THE MAP IS NOT THE TERRITORY", by: "Alfred Korzybski, 1931" },
    { q: "I KNOW THAT I KNOW NOTHING", by: "attributed to Socrates" },
    { q: "HISTORY IS WRITTEN BY THE VICTORS", by: "attribution disputed, often repeated" },
    { q: "THE LIMITS OF MY LANGUAGE MEAN THE LIMITS OF MY WORLD", by: "Ludwig Wittgenstein, 1922" },
    { q: "MEASURE WHAT IS MEASURABLE AND MAKE MEASURABLE WHAT IS NOT", by: "attributed to Galileo" }
  ];
  IMPL.cipher = function (inst, els, done) {
    var set = CIPHER_BANK[inst.seed % CIPHER_BANK.length];
    var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var rng = inst.seed, key = A.slice();
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    for (var i = key.length - 1; i > 0; i--) { var j = nx() % (i + 1); var t = key[i]; key[i] = key[j]; key[j] = t; }
    var enc = {}; A.forEach(function (ch, ix) { enc[ch] = key[ix]; });
    var coded = set.q.split("").map(function (ch) { return enc[ch] || ch; }).join("");
    var freq = {};
    set.q.split("").forEach(function (ch) { if (enc[ch]) freq[enc[ch]] = (freq[enc[ch]] || 0) + 1; });
    var guess = {}, wrong = 0, cap = 4 + lives() + V.battleBonus().reveal * 0; /* reveals separate */
    var reveals = 1 + V.battleBonus().reveal;
    function rendered() {
      return coded.split("").map(function (ch) {
        if (!/[A-Z]/.test(ch)) return ch === " " ? "&nbsp;&nbsp;" : esc(ch);
        var g = guess[ch];
        return '<span data-ci="' + ch + '" style="display:inline-block;min-width:14px;text-align:center;border-bottom:2px solid ' + (g ? '#7fbf7f' : '#666') + ';cursor:pointer;margin:1px">' + (g ? esc(g) : '<span style="opacity:.55">' + esc(ch) + '</span>') + '</span>';
      }).join("");
    }
    function solvedNow() {
      return coded.split("").every(function (ch) { return !/[A-Z]/.test(ch) || guess[ch] === invEnc[ch]; });
    }
    var invEnc = {}; A.forEach(function (ch) { invEnc[enc[ch]] = ch; });
    var picked = null;
    function draw() {
      var h = '<div class="sub" style="margin-bottom:6px">A substitution cipher guards a quotation. Tap a letter, then its true reading. Wrong maps allowed: ' + (cap - wrong) + ' · Reveals: ' + reveals + '</div>' +
        '<div style="font-family:monospace;font-size:1.1em;line-height:2;margin:8px 0">' + rendered() + '</div>' +
        '<div id="v37keys" style="display:flex;flex-wrap:wrap;gap:4px;margin:8px 0">' +
        A.map(function (ch) { return '<button class="btn small" data-ck="' + ch + '" style="min-width:30px">' + ch + '</button>'; }).join("") + '</div>' +
        '<button class="btn small" id="v37rev">Reveal a letter</button>' +
        '<div class="sub" style="opacity:.7;margin-top:6px">Common letters betray themselves by frequency. Readers of unfamiliar scripts start exactly here.</div>';
      els.body.innerHTML = h;
      els.body.querySelectorAll("[data-ci]").forEach(function (sp) {
        sp.onclick = function () {
          picked = sp.getAttribute("data-ci");
          toast("Cipher letter " + picked + " chosen. Now tap its true reading below.");
        };
      });
      els.body.querySelectorAll("[data-ck]").forEach(function (b) {
        b.onclick = function () {
          if (!picked) { toast("Tap a coded letter first."); return; }
          var truth = b.getAttribute("data-ck");
          if (invEnc[picked] === truth) {
            guess[picked] = truth; sfx("chime");
            if (solvedNow()) done(true, wrong === 0 ? 3 : wrong <= 2 ? 2 : 1, '"' + set.q + '" · ' + set.by);
            else draw();
          } else {
            wrong++; sfx("thud");
            if (wrong > cap) done(false, 0, "The cipher held. " + set.by + " keeps the secret one more day.");
            else toast("The stacks shake their heads. " + (cap - wrong) + " wrong maps left.");
          }
        };
      });
      els.body.querySelector("#v37rev").onclick = function () {
        if (reveals <= 0) {
          var spentC = (E.V37_BENCH && E.V37_BENCH.spendDispute) ? E.V37_BENCH.spendDispute() : null;
          if (!spentC) { toast("No reveals left. A carried Dispute Card would argue one letter loose."); return; }
          toast("Your Dispute Card (" + spentC + ") argues a letter loose.");
        } else reveals--;
        var un = coded.split("").filter(function (ch) { return /[A-Z]/.test(ch) && !guess[ch]; });
        if (!un.length) return;
        var pick = un[hashN(un.join("") + wrong) % un.length];
        guess[pick] = invEnc[pick];
        sfx("tick");
        if (solvedNow()) done(true, 1, '"' + set.q + '" · ' + set.by);
        else draw();
      };
    }
    draw();
  };

  /* ── 6 · SOCRATIC SERVE ── */
  var SERVE_BANK = [
    { claim: "Everyone cheats a little, so cheating is fine.",
      best: "What follows from many people doing a thing, about whether the thing serves them?",
      foils: ["Do you cheat, then?", "Who raised you to talk like this?"] },
    { claim: "The oldest account must be the truest, since it stands closest to the events.",
      best: "What else stood close to the events which distance later corrected?",
      foils: ["So newer historians just waste their time?", "Would you trust a two-thousand-year-old doctor?"] },
    { claim: "Numbers do not lie, so the report settles it.",
      best: "Who chose which numbers entered the report, and by what rule?",
      foils: ["Have numbers ever lied to you personally?", "So words always lie, in your view?"] },
    { claim: "If a treatment helped my cousin, it should be offered to everyone.",
      best: "How would we tell a treatment's help apart from a recovery which arrived on its own?",
      foils: ["Is your cousin a doctor now?", "Should hospitals run on family stories?"] },
    { claim: "Art means whatever anyone feels it means, so studying it teaches nothing.",
      best: "If every reading counts equally, what did the ones which changed your mind do differently?",
      foils: ["So feelings never teach anything?", "Would you say the same in front of a painter?"] },
    { claim: "Our region's way of farming lasted centuries, so science has nothing to add.",
      best: "What has lasting this long already tested, and what has it never had to face?",
      foils: ["Centuries of what, exactly, hunger?", "Would your grandparents refuse a better harvest?"] },
    { claim: "The witness sounded certain, so the account stands.",
      best: "What has certainty in the voice got to do with accuracy in the memory?",
      foils: ["Do liars ever sound certain to you?", "Should we only trust nervous witnesses, then?"] },
    { claim: "The algorithm chose it, so no person carries the blame.",
      best: "Who chose what the algorithm should optimize, and who reviewed its choices?",
      foils: ["Would you let an algorithm sentence you?", "So machines are people now?"] },
    { claim: "My culture's medicine is dismissed only because outsiders never bothered to look.",
      best: "What would a fair look at it measure, and who should hold the measuring stick?",
      foils: ["Has anyone actually dismissed it, or is this a feeling?", "Do outsiders owe every practice a study?"] },
    { claim: "History classes should skip the shameful parts to protect national pride.",
      best: "What does pride protect, once it needs protection from the record?",
      foils: ["Are you ashamed of your country?", "Should we teach only shame instead?"] }
  ];
  IMPL.serve = function (inst, els, done) {
    var rng = inst.seed;
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    var bank = SERVE_BANK.slice(), rounds = [];
    for (var i = 0; i < 5; i++) rounds.push(bank.splice(nx() % bank.length, 1)[0]);
    var r = 0, misses = 0, cap = lives(), perRound = (inst.tutorial ? 20 : 12) + Math.floor(bonusTime() / 2), timer = null;
    function draw() {
      var set = rounds[r], t = perRound;
      var opts = [{ t: set.best, ok: true }, { t: set.foils[0], ok: false }, { t: set.foils[1], ok: false }];
      opts.sort(function () { return (nx() % 3) - 1; });
      els.body.innerHTML = '<div class="sub">Return of serve ' + (r + 1) + ' of 5. Choose the question which opens the claim. <span id="v37t">' + t + 's</span></div>' +
        '<div style="border:1px solid #666;border-radius:8px;padding:10px;margin:8px 0"><strong>The claim:</strong> ' + esc(set.claim) + '</div>' +
        '<div style="display:grid;gap:6px">' + opts.map(function (o, ix) { return '<button class="btn small" style="text-align:left;white-space:normal" data-sv="' + (o.ok ? 1 : 0) + '">' + esc(o.t) + '</button>'; }).join("") + '</div>';
      var tEl = els.body.querySelector("#v37t");
      clearInterval(timer);
      timer = setInterval(function () {
        t--; if (tEl) tEl.textContent = t + "s";
        if (t <= 0) { clearInterval(timer); misses++; sfx("thud"); if (misses > cap) done(false, 0, "The claims kept the rally."); else nextRound(); }
      }, 1000);
      els.body.querySelectorAll("[data-sv]").forEach(function (b) {
        b.onclick = function () {
          clearInterval(timer);
          if (b.getAttribute("data-sv") === "1") { sfx("chime"); juice(); nextRound(); }
          else { misses++; sfx("thud"); if (misses > cap) { done(false, 0, "Wounding questions score points and end conversations. The trial wanted openings."); } else nextRound(); }
        };
      });
    }
    function nextRound() {
      r++;
      if (r === 5) done(true, misses === 0 ? 3 : misses === 1 ? 2 : 1, "Five serves returned with " + misses + " miss" + (misses === 1 ? "" : "es") + ".");
      else draw();
    }
    draw();
  };

  /* ── 7 · MEMORY OF THE HALL ── */
  IMPL.memory = function (inst, els, done) {
    var icons = [["Evidence", "🔍"], ["Certainty", "🗿"], ["Truth", "🕯️"], ["Interpretation", "🎭"], ["Power", "👑"], ["Justification", "🧱"], ["Explanation", "⚙️"], ["Objectivity", "⚖️"], ["Perspective", "👥"], ["Culture", "🏮"], ["Values", "💠"], ["Responsibility", "🕊️"]];
    var rng = inst.seed, seq = [], need = inst.tutorial ? 4 : 6, misses = 0, cap = lives();
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    function extend() { seq.push(nx() % 12); }
    extend(); extend(); extend();
    function show(cb) {
      var i = 0;
      els.body.innerHTML = '<div class="sub">The hall speaks its sequence. Hold it.</div><div id="v37flash" style="font-size:3em;text-align:center;padding:30px 0;min-height:90px"></div>';
      var f = els.body.querySelector("#v37flash");
      var t = setInterval(function () {
        if (i >= seq.length) { clearInterval(t); cb(); return; }
        f.textContent = icons[seq[i]][1] + " " + icons[seq[i]][0];
        sfx("tick");
        setTimeout(function () { f.textContent = ""; }, 620);
        i++;
      }, 900);
    }
    function ask() {
      var at = 0;
      els.body.innerHTML = '<div class="sub">Return the sequence, first to last. Length ' + seq.length + ' of ' + need + '.</div>' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">' +
        icons.map(function (ic, ix) { return '<button class="btn small" data-me="' + ix + '">' + ic[1] + '<br>' + ic[0] + '</button>'; }).join("") + '</div>' +
        '<div id="v37echo" style="margin-top:8px;min-height:24px"></div>';
      var echo = els.body.querySelector("#v37echo");
      els.body.querySelectorAll("[data-me]").forEach(function (b) {
        b.onclick = function () {
          var pick = b.getAttribute("data-me") | 0;
          if (pick === seq[at]) {
            at++; echo.textContent += icons[pick][1] + " "; sfx("chime");
            if (at === seq.length) {
              if (seq.length >= need) { done(true, misses === 0 ? 3 : misses === 1 ? 2 : 1, "A sequence of " + seq.length + " held. The chart exists for longer ones."); }
              else { extend(); setTimeout(function () { show(ask); }, 600); }
            }
          } else {
            misses++; sfx("thud");
            if (misses > cap) done(false, 0, "The hall out-remembered you at length " + seq.length + ". Every knower meets this wall; writing was invented on the far side.");
            else { toast("Slipped. The hall repeats itself, patient as stone."); setTimeout(function () { show(ask); }, 500); }
          }
        };
      });
    }
    show(ask);
  };

  /* ── 8 · SWITCHWORKS ── */
  IMPL.switch = function (inst, els, done) {
    var rng = inst.seed;
    function nx() { rng = (rng * 1103515245 + 12345) >>> 0; return rng; }
    var n = 5;
    /* lamp rules over levers, built to guarantee at least one solution */
    var solution = [];
    for (var i = 0; i < n; i++) solution.push(nx() % 2 === 1);
    function mkRule() {
      var kind = nx() % 4, a = nx() % n, b = (a + 1 + nx() % (n - 1)) % n;
      if (kind === 0) return { txt: "burns when " + name(a) + " and " + name(b) + " agree", f: function (s) { return s[a] === s[b]; } };
      if (kind === 1) return { txt: "burns when " + name(a) + " and " + name(b) + " differ", f: function (s) { return s[a] !== s[b]; } };
      if (kind === 2) return { txt: "burns when " + name(a) + " stands up", f: function (s) { return s[a]; } };
      return { txt: "burns unless " + name(a) + " stands up", f: function (s) { return !s[a]; } };
    }
    function name(i) { return "Lever " + "ABCDE"[i]; }
    var rules = [];
    while (rules.length < 4) {
      var r = mkRule();
      if (r.f(solution)) rules.push(r);
    }
    var state = [];
    for (var j = 0; j < n; j++) state.push(false);
    var pulls = 0, par = 9;
    function draw() {
      var lit = rules.filter(function (r) { return r.f(state); }).length;
      els.body.innerHTML = '<div class="sub">Four lamps, four rules, five levers. Light every lamp. Pulls: ' + pulls + ' (three stars at ' + par + ' or fewer)</div>' +
        '<div style="display:flex;gap:8px;justify-content:center;margin:10px 0">' +
        rules.map(function (r, ix) { return '<div style="text-align:center"><div style="font-size:1.6em">' + (r.f(state) ? "🔆" : "⚫") + '</div><div class="sub" style="max-width:120px">' + esc(r.txt) + '</div></div>'; }).join("") + '</div>' +
        '<div style="display:flex;gap:8px;justify-content:center;margin:10px 0">' +
        state.map(function (s, ix) { return '<button class="btn" data-swl="' + ix + '">' + name(ix).split(" ")[1] + '<br>' + (s ? "│ up" : "─ down") + '</button>'; }).join("") + '</div>' +
        '<div class="sub" style="opacity:.7;text-align:center">Cause and effect never listed the side effects. Pull, observe, revise: the experimental method in five levers.</div>';
      els.body.querySelectorAll("[data-swl]").forEach(function (b) {
        b.onclick = function () {
          var ix = b.getAttribute("data-swl") | 0;
          state[ix] = !state[ix]; pulls++; sfx("tick");
          if (rules.every(function (r) { return r.f(state); })) {
            done(true, pulls <= par ? 3 : pulls <= par + 4 ? 2 : 1, "All lamps lit in " + pulls + " pulls.");
          } else draw();
        };
      });
    }
    draw();
  };

  /* Slide, Volley, Maze, Climb, Shadow, Tactica arrive in content-67b. */

  /* ── HUD chip; the satchel keeps the I key to itself ── */
  function addChip() {
    var anchor = document.getElementById("btnV37Relics") || document.getElementById("btnGuide");
    if (!anchor || !anchor.parentNode || document.getElementById("btnV37Trials")) return;
    var b = document.createElement("button");
    b.className = "chip"; b.id = "btnV37Trials"; b.textContent = "Trials+";
    b.setAttribute("aria-label", "Open the fourteen trial families for this region");
    b.addEventListener("click", openTrials);
    anchor.parentNode.insertBefore(b, anchor.nextSibling);
  }

  function boot() { generateInstances(); addChip(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
