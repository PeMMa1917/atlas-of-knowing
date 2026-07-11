/* ---- content-60-reliquary.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · THE RELIQUARY RUNTIME (content-60-reliquary.js)
   v37. Load after content-44, before content-61..66 (relic data),
   content-67 (trials), content-68 (concept forge), content-69 (records),
   content-70 (sync), content-71 (the Reliquary Road).

   WHAT THIS PACK ADDS
   · E.relicsLoad(arr): the intake for 500+ authored objects. Each relic
     becomes a Codex item, a placement (floor, npc, cache, shop, minigame,
     chamber), an effect, and a research card.
   · The Bandolier: equip at most five relics; only equipped relics grant
     their gifts. Deck choice becomes the metagame.
   · Rarity tiers: common, rare, epic, legendary, color coded.
   · The Exchange: sell a relic for lumens at a floating daily price and
     lose its gift forever; buy stocked relics with lumens.
   · Field Search: every region becomes a scavenging ground. Claims ask
     the player to name the object's concept before it yields.
   · Doors and chambers: key relics open locked chambers, metroidvania
     style. Enter without the keys and the door turns you around, naming
     what it wants.
   · Seven new regions: the Grand Reliquary and six themed vaults, each
     with a hidden chamber, lore signs, and one silent room told through
     its furniture.
   · New HUD chips and shortcuts: Relics (O), Search (X), plus a courier
     chip to the Reliquary itself.

   SAVE LAW: no new top-level save fields. All v37 state rides
   state.data.flags with the v37_ prefix: numbers merge by max, strings
   by richest, so the one-save doctrine holds.
   NO EM DASHES in any authored string.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.getState) { try { console.warn("[reliquary] engine missing"); } catch (e) {} return; }

  /* ── shorthands over the frozen surface ── */
  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function toast(m) { try { E.toast(m); } catch (e) {} }
  function sfx(n) { try { if (E.sfx && E.sfx.play) E.sfx.play(n); } catch (e) {} }
  function juice(kind) {
    try {
      if (!E.fx) return;
      if (kind === "big" && E.fx.confetti) E.fx.confetti();
      else if (kind === "ring" && E.fx.ring) E.fx.ring();
      else if (E.fx.sparks) E.fx.sparks();
    } catch (e) {}
  }
  function save() { try { E.scheduleSave(); } catch (e) {} }
  function panelEls() {
    return {
      title: document.getElementById("panelTitle"),
      sub: document.getElementById("panelSub"),
      body: document.getElementById("panelBody")
    };
  }

  /* ── rarity law ── */
  var RARITY = {
    legendary: { n: "Legendary", col: "#E8B54A", xp: 40, base: 90 },
    epic:      { n: "Epic",      col: "#B07FE8", xp: 30, base: 55 },
    rare:      { n: "Rare",      col: "#6FA8DC", xp: 20, base: 30 },
    common:    { n: "Common",    col: "#9AA49A", xp: 12, base: 15 }
  };
  function rarityOf(o) {
    var t = o.eff && o.eff.t;
    if (t === "key" || t === "ability") return "legendary";
    if (t === "path" || t === "perspective" || (t === "stamina" && o.eff.v >= 3)) return "epic";
    if (t === "battle" || t === "stamina" || (t === "insight" && (o.eff.v | 0) >= 15)) return "rare";
    return "common";
  }
  function effLine(o) {
    var f = o.eff || {};
    if (f.t === "insight") return "Gift on finding: +" + f.v + " " + f.c + " insight.";
    if (f.t === "stamina") return "Gift while carried: +" + f.v + " Vigor for trials.";
    if (f.t === "key") return "Gift: a key. A locked door in the vaults answers to it.";
    if (f.t === "battle") return "Gift while carried: " + ({ life: "one extra try", reveal: "one free reveal", time: "extra seconds" }[f.kind] || "an edge") + " in trials.";
    if (f.t === "ability") return "Gift while carried: the " + (ABILITY_NAMES[f.id] || f.id) + " ability.";
    if (f.t === "path") return "Gift while carried: a courier route to " + (REGION_LABELS[f.region] || f.region) + ".";
    if (f.t === "perspective") return "Gift while carried: a Perspective Token for " + f.c + ".";
    return "";
  }
  var ABILITY_NAMES = { dowse: "Dowse", lens: "Lens", echo: "Echo", beacon: "Beacon", stride: "Stride" };
  var ABILITY_HELP = {
    dowse: "Dowse: Field Search shows every cache hint in the region, fully written out.",
    lens: "Lens: each region offers one hidden perspective plaque, a bonus question with insight attached.",
    echo: "Echo: replay the last journal nudge whenever you need it.",
    beacon: "Beacon: once each day, travel to any visited region from anywhere.",
    stride: "Stride: timed trials run a little slower for you. The clock respects a practiced walker."
  };

  /* ── region labels (for effect lines and door notes) ── */
  var REGION_LABELS = {
    hall: "Atlas Hall", baghdad: "House of Wisdom", timbuktu: "Sankoré Courtyard",
    kerala: "Kerala Coast", maya: "Maya Lowlands", rod: "Rod & Chapter Hall", hut8: "Hut 8",
    royal: "Royal Society Court", ulugh: "Ulugh Beg's Observatory", shore: "Wayfinder's Ocean",
    beagle: "The Beagle's Wake", haya: "Haya Furnaces", ring: "The Ring",
    florence: "Bottega District", ukiyo: "Ukiyo District", benin: "Benin City",
    harlem: "Harlem", songlines: "Songlines Country", cave: "The Painted Cave",
    library: "The Great Library", griot: "Griot Roads", zimbabwe: "Great Zimbabwe",
    cusco: "Cusco of Two Records", historian: "The Grand Historian's Study",
    commission: "Truth Commission Hall", seoul: "Seoul", qero: "Q'ero Highlands",
    aggregate: "The Aggregate",
    reliquary: "The Grand Reliquary", vault_tech: "The Engine Bazaar",
    vault_lang: "The Tower of Tongues", vault_pol: "The Forum of Claims",
    vault_rel: "The Pilgrim Roads", vault_knower: "The Hall of Mirrors",
    grounds_v37: "The Proving Grounds",
    ch_door_math: "Chamber of Number", ch_door_ns: "Chamber of Evidence",
    ch_door_arts: "Chamber of Meaning", ch_door_hist: "Chamber of Memory",
    ch_door_hs: "Chamber of the Living", ch_door_themes: "Chamber of Themes",
    ch_secret_ma: "The Uncounted Room", ch_secret_ns: "The Unmeasured Room",
    ch_secret_ar: "The Unsigned Room", ch_secret_hi: "The Unwritten Room",
    ch_secret_hu: "The Unasked Room", ch_secret_th: "The Unnamed Room"
  };

  /* ── the doors: metroidvania gates. keys arrive from relic data. ── */
  var DOORS = {
    door_math:   { name: "The Numbered Door",  vault: "vault_knower", chamber: "ch_door_math",   note: "Number opens it. Two counting keys." },
    door_ns:     { name: "The Weighed Door",   vault: "vault_tech",   chamber: "ch_door_ns",     note: "Evidence opens it. Two instrument keys." },
    door_arts:   { name: "The Signed Door",    vault: "vault_knower", chamber: "ch_door_arts",   note: "Meaning opens it. Two signed keys." },
    door_hist:   { name: "The Dated Door",     vault: "vault_pol",    chamber: "ch_door_hist",   note: "Memory opens it. Two dated keys." },
    door_hs:     { name: "The Counted Door",   vault: "vault_pol",    chamber: "ch_door_hs",     note: "The living open it. Two witness keys." },
    door_themes: { name: "The Threshold Door", vault: "vault_rel",    chamber: "ch_door_themes", note: "Themes open it. Two threshold keys." },
    secret_ma:   { name: "The Uncounted Seam", vault: "vault_lang",   chamber: "ch_secret_ma",   note: "One quiet key." },
    secret_ns:   { name: "The Unmeasured Seam",vault: "vault_tech",   chamber: "ch_secret_ns",   note: "One quiet key." },
    secret_ar:   { name: "The Unsigned Seam",  vault: "vault_knower", chamber: "ch_secret_ar",   note: "One quiet key." },
    secret_hi:   { name: "The Unwritten Seam", vault: "vault_lang",   chamber: "ch_secret_hi",   note: "One quiet key." },
    secret_hu:   { name: "The Unasked Seam",   vault: "vault_pol",    chamber: "ch_secret_hu",   note: "One quiet key." },
    secret_th:   { name: "The Unnamed Seam",   vault: "vault_rel",    chamber: "ch_secret_th",   note: "One quiet key." }
  };
  Object.keys(DOORS).forEach(function (d) { DOORS[d].id = d; DOORS[d].keys = []; });

  /* ── registry ── */
  var R = {
    list: [], byId: {}, byRegion: {}, byMode: { floor: [], npc: [], cache: [], shop: [], minigame: [], chamber: [] },
    doors: DOORS, sets: [], RARITY: RARITY, rarityOf: rarityOf, effLine: effLine,
    labels: REGION_LABELS, abilityHelp: ABILITY_HELP
  };
  E.RELIQUARY = R;

  /* ── flag state helpers ── */
  function got(id) { return !!FL()["v37_got_" + id]; }
  function soldOff(id) { return !!FL()["v37_sold_" + id]; }
  function brokenNow(id) { return (Number(FL()["v37_diss_" + id]) || 0) > (Number(FL()["v37_reborn_" + id]) || 0); }
  function own(id) { return got(id) && !soldOff(id) && !brokenNow(id); }
  function band() {
    var s = FL().v37_band;
    return (typeof s === "string" && s.length) ? s.split(",").filter(function (x) { return own(x); }) : [];
  }
  function setBand(a) {
    var seen = {}, out = [];
    a.forEach(function (id) { if (own(id) && !seen[id] && out.length < 5) { seen[id] = 1; out.push(id); } });
    FL().v37_band = out.join(",");
    save(); updateCountChip();
  }
  function equippedList() { return band().map(function (id) { return R.byId[id]; }).filter(Boolean); }
  function cxpAdd(c, v, why) {
    if (!c || !v) return;
    var k = "v37_cxp_" + c;
    FL()[k] = (Number(FL()[k]) || 0) + (v | 0);
    try { E.emit("v37_cxp", { c: c, v: v | 0, why: why || "" }); } catch (e) {}
    save();
  }
  function cxpOf(c) { return Number(FL()["v37_cxp_" + c]) || 0; }

  /* ── derived powers: only the Bandolier speaks ── */
  var V37 = {
    got: got, own: own, sold: soldOff, broken: brokenNow, band: band, setBand: setBand,
    cxpAdd: cxpAdd, cxpOf: cxpOf, acquire: acquire, rarityOf: rarityOf,
    openRelics: function () { openV37Panel("v37relics"); },
    openSearch: function () { openV37Panel("v37search"); },
    openExchange: function () { openV37Panel("v37exch"); },
    vigor: function () {
      var v = 3;
      equippedList().forEach(function (o) { if (o.eff.t === "stamina") v += (o.eff.v | 0); });
      return Math.min(v, 12);
    },
    hasAbility: function (id) {
      return equippedList().some(function (o) { return o.eff.t === "ability" && o.eff.id === id; });
    },
    battleBonus: function () {
      var b = { life: 0, reveal: 0, time: 0 };
      equippedList().forEach(function (o) { if (o.eff.t === "battle") b[o.eff.kind] = (b[o.eff.kind] || 0) + (o.eff.v | 0 || 1); });
      return b;
    },
    perspTokens: function () {
      return equippedList().filter(function (o) { return o.eff.t === "perspective"; }).length;
    },
    pathRegions: function () {
      var out = [];
      equippedList().forEach(function (o) { if (o.eff.t === "path" && o.eff.region) out.push(o.eff.region); });
      return out;
    },
    keysHeld: function (doorId) {
      var d = DOORS[doorId]; if (!d) return { have: 0, need: 0, missing: [] };
      var missing = d.keys.filter(function (k) { return !own(k); });
      return { have: d.keys.length - missing.length, need: d.keys.length, missing: missing };
    },
    doorOpen: function (doorId) {
      if (FL()["v37_door_" + doorId]) return true;
      var k = V37.keysHeld(doorId);
      return k.need > 0 && k.missing.length === 0;
    },
    counts: function () {
      var g = 0, s = 0;
      R.list.forEach(function (o) { if (got(o.id)) g++; if (soldOff(o.id)) s++; });
      return { got: g, sold: s, total: R.list.length };
    }
  };
  E.V37 = V37;

  /* ── intake: called by content-61..66 with authored arrays ── */
  E.relicsLoad = function (arr) {
    (arr || []).forEach(function (o) {
      if (!o || !o.id || R.byId[o.id]) return;
      o.rarity = rarityOf(o);
      R.list.push(o); R.byId[o.id] = o;
      var mode = (o.pl && o.pl.mode) || "floor";
      (R.byMode[mode] || R.byMode.floor).push(o);
      if (!R.byRegion[o.region]) R.byRegion[o.region] = [];
      R.byRegion[o.region].push(o);
      if (o.eff && o.eff.t === "key" && DOORS[o.eff.door]) DOORS[o.eff.door].keys.push(o.id);
      E.registerItem(o.id, {
        name: o.name, era: REGION_LABELS[o.region] || o.region,
        tags: [o.tags.c, o.tags.e],
        desc: (function (obj) {
          return function () {
            var whatWhy = String(obj.rw || "").split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
            var broken = (Number(FL()["v37_diss_" + obj.id]) || 0) > (Number(FL()["v37_reborn_" + obj.id]) || 0);
            return obj.desc +
              "\n\nWhat and why: " + whatWhy +
              "\nFound in: " + (REGION_LABELS[obj.region] || obj.region) +
              "\n" + RARITY[obj.rarity].n + " · " + obj.tags.c + " · " + obj.tags.e +
              (obj.tags.s ? " · " + obj.tags.s : "") + "\n" + effLine(obj) +
              (broken ? "\nIn pieces at the Assembly Bench. Its gift sleeps." : "") +
              "\n\nIts question: " + obj.kq +
              (obj.mla && obj.mla.length ? "\n\nResearch trail:\n" + obj.mla.join("\n") : "");
          };
        })(o)
      });
    });
    buildSets();
    updateCountChip();
  };

  /* ── acquisition ── */
  function acquire(id, how) {
    var o = R.byId[id];
    if (!o || got(id)) return false;
    FL()["v37_got_" + id] = 1;
    try { E.give(id); } catch (e) {}
    var fam = { floor: "Exploration", npc: "Dialogue", cache: "Exploration", shop: "Craft", minigame: "Challenge", chamber: "Quest", engine: "Exploration" }[how] || "Exploration";
    if (how !== "engine") {
      try { E.tagCoverage({ c: o.tags.c, e: o.tags.e, f: fam, s: o.tags.s, m: "relic" }); } catch (e) {}
      try { E.gainXP(RARITY[o.rarity].xp, o.name); } catch (e) {}
    }
    cxpAdd(o.tags.c, o.eff.t === "insight" ? (o.eff.v | 0) : 8, o.name);
    if (o.eff.t === "insight" && o.eff.c && o.eff.c !== o.tags.c) cxpAdd(o.eff.c, o.eff.v | 0, o.name);
    if (band().length < 5 && o.eff.t !== "insight") setBand(band().concat([id]));
    if (o.rarity === "legendary") { juice("big"); sfx("fanfare"); }
    else if (o.rarity === "epic") { juice("ring"); sfx("chime"); }
    else { juice(); sfx("pickup"); }
    toast(RARITY[o.rarity].n + ": " + o.name);
    if (o.eff.t === "key") {
      var d = DOORS[o.eff.door];
      if (d) {
        var kk = V37.keysHeld(d.id);
        toast(kk.missing.length === 0 ? d.name + " will open now." : d.name + " stirs. " + kk.have + " of " + kk.need + " keys held.");
      }
    }
    try {
      var firstRw = String(o.rw || "").split(/(?<=[.!?])\s+/)[0] || "";
      E.autoJournal("Found " + o.name + " in " + (REGION_LABELS[o.region] || o.region) + ". " + firstRw + " Its question follows me: " + o.kq);
    } catch (e) {}
    try { if (E.checkBadges) E.checkBadges(); } catch (e) {}
    checkSets(o);
    try { E.emit("v37_relic", { id: id, how: how, rarity: o.rarity }); } catch (e) {}
    save();
    return true;
  }

  /* engine floor pickups in our regions arrive through the base seam */
  E.on("pickup", function (ev) {
    if (ev && ev.item && R.byId[ev.item] && !got(ev.item)) acquire(ev.item, "engine");
  });

  /* ── sets: completion loops ── */
  function buildSets() {
    R.sets = [];
    E.CANON.CONCEPTS.forEach(function (c) {
      var pool = R.list.filter(function (o) { return o.tags.c === c; });
      if (pool.length >= 6) R.sets.push({
        id: "set_c_" + c, name: "The " + c + " Cabinet", kind: "concept", c: c,
        need: 6, pool: pool.map(function (o) { return o.id; }),
        reward: { lumens: 40, cxp: 60 }
      });
    });
    [["set_b61", "The Paper Trail", "r61_"], ["set_b62", "The Instrument Case", "r62_"],
     ["set_b63", "The Signed Gallery", "r63_"], ["set_b64", "The Counting House", "r64_"],
     ["set_b65", "The Threshold Shelf", "r65_"], ["set_b66", "The Witness Stand", "r66_"]]
      .forEach(function (row) {
        var pool = R.list.filter(function (o) { return o.id.indexOf(row[2]) === 0; });
        if (pool.length) R.sets.push({
          id: row[0], name: row[1], kind: "wing", need: Math.min(25, pool.length),
          pool: pool.map(function (o) { return o.id; }), reward: { lumens: 100, cxp: 100 }
        });
      });
  }
  function setProgress(s) {
    var n = 0;
    s.pool.forEach(function (id) { if (got(id)) n++; });
    return n;
  }
  function checkSets(justGot) {
    R.sets.forEach(function (s) {
      if (FL()["v37_set_" + s.id]) return;
      if (setProgress(s) >= s.need) {
        FL()["v37_set_" + s.id] = 1;
        try { E.gainLumens(s.reward.lumens); } catch (e) {}
        if (s.c) cxpAdd(s.c, s.reward.cxp, s.name);
        juice("big"); sfx("fanfare");
        try { E.openVignette(s.name + " complete", "The cabinet closes with a click of satisfaction. Reward: " + s.reward.lumens + " lumens." + (s.c ? " Insight: +" + s.reward.cxp + " " + s.c + "." : "")); } catch (e) {}
        save();
      }
    });
  }

  /* ── the Exchange: floating prices, selling loses the gift ── */
  function hashN(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h;
  }
  function drift(id) {
    var h = hashN(E.dayKey() + "::" + id);
    return 0.7 + (h % 81) / 100; /* 0.70 .. 1.50 */
  }
  function featuredConcept() {
    var cs = E.CANON.CONCEPTS;
    return cs[hashN("feat" + E.dayKey()) % cs.length];
  }
  function priceOf(o, sell) {
    var p = RARITY[o.rarity].base * drift(o.id);
    if (o.tags.c === featuredConcept()) p *= 1.3;
    if (!sell) p *= 1.6;
    if (o.pl && o.pl.mode === "shop" && o.pl.cost && !sell) p = Math.max(p, o.pl.cost * drift(o.id));
    return Math.max(5, Math.round(p));
  }
  function dailyStock() {
    var pool = R.byMode.shop.filter(function (o) { return !got(o.id); });
    var day = E.dayKey(), scored = pool.map(function (o) { return { o: o, k: hashN(day + o.id) }; });
    scored.sort(function (a, b) { return a.k - b.k; });
    return scored.slice(0, 8).map(function (x) { return x.o; });
  }
  function sellRelic(id) {
    var o = R.byId[id];
    if (!o || !own(id)) return;
    var price = priceOf(o, true);
    FL()["v37_sold_" + id] = 1;
    setBand(band().filter(function (b) { return b !== id; }));
    try { E.gainLumens(price); } catch (e) {}
    try { E.autoJournal("Sold " + o.name + " at the Exchange for " + price + " lumens. Gone. Its gift left with it."); } catch (e) {}
    toast("Sold: " + o.name + " (+" + price + " lumens)");
    sfx("coin"); save();
  }
  function buyRelic(id) {
    var o = R.byId[id];
    if (!o || got(id)) return;
    var price = priceOf(o, false);
    if ((SD().lumens | 0) < price) { toast("Not enough lumens. The stallkeeper waits without judgment."); return; }
    try { E.gainLumens(-price); } catch (e) {}
    acquire(id, "shop");
  }

  /* ── panel plumbing: our own kinds ride the open panel seam ── */
  var V37_KINDS = { v37relics: 1, v37search: 1, v37exch: 1 };
  function openV37Panel(kind) {
    try { E.openPanel(kind); } catch (e) {}
    var els = panelEls(); if (!els.body) return;
    if (kind === "v37relics") renderRelicsPanel(els);
    else if (kind === "v37search") renderSearchPanel(els);
    else if (kind === "v37exch") renderExchangePanel(els);
  }

  function chipRow(o, extra) {
    var col = RARITY[o.rarity].col;
    var face = (E.V37_PX ? E.V37_PX.imgHtml(o.id, 2) : '<span>' + esc(o.icon || "◈") + '</span>');
    return '<div style="border:1px solid ' + col + '55;border-left:4px solid ' + col + ';border-radius:6px;padding:8px 10px;margin:6px 0;background:rgba(0,0,0,.18)">' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
      face + '<strong>' + esc(o.name) + '</strong>' +
      '<span style="color:' + col + ';font-size:.8em">' + RARITY[o.rarity].n + '</span>' +
      '<span style="opacity:.75;font-size:.8em">' + esc(o.tags.c) + ' · ' + esc(o.tags.e) + (o.tags.s ? ' · ' + esc(o.tags.s) : '') + '</span>' +
      '</div>' +
      '<div style="opacity:.85;font-size:.9em;margin-top:3px">' + esc(effLine(o)) + '</div>' +
      (extra || "") + '</div>';
  }

  /* ── THE BANDOLIER & COLLECTION PANEL ── */
  var relFilter = { rar: "", c: "", q: "" };
  function renderRelicsPanel(els) {
    var ct = V37.counts();
    els.title.textContent = "The Reliquary Record";
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Your objects, your five carried gifts, and your cabinets. " + ct.got + " of " + ct.total + " found."
      : "Every object you have lifted from the world, the five you carry, and the cabinets they complete. " + ct.got + " of " + ct.total + " found.";
    var b = band();
    var h = '<div class="sub" style="margin:4px 0 8px">The Bandolier holds five. Only carried relics give their gifts. Choose like a curator: the exhibition takes three, you get five.</div>';
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">';
    for (var i = 0; i < 5; i++) {
      var id = b[i], o = id && R.byId[id];
      h += o
        ? '<button class="btn small" data-v37unequip="' + esc(id) + '" title="Set it down">' + (E.V37_PX ? E.V37_PX.imgHtml(id, 2) : esc(o.icon)) + ' ' + esc(o.name.slice(0, 24)) + '</button>'
        : '<span style="border:1px dashed #666;border-radius:6px;padding:6px 10px;opacity:.6">empty loop</span>';
    }
    h += '</div>';
    var vig = V37.vigor(), bb = V37.battleBonus(), pt = V37.perspTokens();
    var abil = ["dowse", "lens", "echo", "beacon", "stride"].filter(V37.hasAbility);
    h += '<div class="sub" style="margin-bottom:10px">Carried gifts: Vigor ' + vig +
      (bb.life ? ' · +' + bb.life + ' tries' : '') + (bb.reveal ? ' · +' + bb.reveal + ' reveals' : '') +
      (bb.time ? ' · +' + (bb.time * 4) + 's trial time' : '') +
      (pt ? ' · ' + pt + ' Perspective Tokens' : '') +
      (abil.length ? ' · Abilities: ' + abil.map(function (a) { return ABILITY_NAMES[a]; }).join(", ") : '') +
      (V37.pathRegions().length ? ' · Routes: ' + V37.pathRegions().map(function (r) { return REGION_LABELS[r] || r; }).join(", ") : '') + '</div>';
    if (abil.length) h += '<div class="sub" style="opacity:.8;margin-bottom:8px">' + abil.map(function (a) { return esc(ABILITY_HELP[a]); }).join("<br>") + '</div>';

    /* cabinets */
    h += '<h3 style="margin:12px 0 4px">Cabinets</h3>';
    R.sets.forEach(function (s) {
      var n = setProgress(s), done = !!FL()["v37_set_" + s.id];
      h += '<div style="margin:4px 0"><span style="opacity:.85">' + esc(s.name) + '</span> ' +
        '<span style="opacity:.6">' + n + '/' + s.need + (done ? ' · complete' : '') + '</span>' +
        '<div style="height:5px;border-radius:3px;background:#333;overflow:hidden"><div style="height:100%;width:' + Math.min(100, Math.round(n / s.need * 100)) + '%;background:' + (done ? '#7fbf7f' : '#B07FE8') + '"></div></div></div>';
    });

    /* collection browser */
    h += '<h3 style="margin:14px 0 4px">The Collection</h3>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">' +
      '<input id="v37q" placeholder="search objects" value="' + esc(relFilter.q) + '" style="flex:1;min-width:120px">' +
      '<select id="v37rar"><option value="">every rarity</option>' + Object.keys(RARITY).map(function (r) { return '<option' + (relFilter.rar === r ? ' selected' : '') + ' value="' + r + '">' + RARITY[r].n + '</option>'; }).join("") + '</select>' +
      '<select id="v37c"><option value="">every concept</option>' + E.CANON.CONCEPTS.map(function (c) { return '<option' + (relFilter.c === c ? ' selected' : '') + '>' + c + '</option>'; }).join("") + '</select></div>';
    var shown = 0;
    R.list.forEach(function (o) {
      if (!got(o.id)) return;
      if (relFilter.rar && o.rarity !== relFilter.rar) return;
      if (relFilter.c && o.tags.c !== relFilter.c) return;
      if (relFilter.q && o.name.toLowerCase().indexOf(relFilter.q.toLowerCase()) < 0) return;
      if (shown++ > 60) return;
      var canCarry = own(o.id) && band().indexOf(o.id) < 0 && band().length < 5 && o.eff.t !== "insight";
      h += chipRow(o,
        '<div style="opacity:.8;font-size:.85em;margin-top:4px">Its question: ' + esc(o.kq) + '</div>' +
        '<div style="margin-top:5px;display:flex;gap:6px;flex-wrap:wrap">' +
        (soldOff(o.id) ? '<span style="opacity:.6">sold. the Exchange keeps no returns.</span>'
          : (canCarry ? '<button class="btn small" data-v37equip="' + esc(o.id) + '">Carry it</button>' : '') +
            '<button class="btn small" data-v37study="' + esc(o.id) + '">Study it</button>') +
        '</div>');
    });
    if (!shown) h += '<div class="sub" style="opacity:.7">Nothing here yet. The world holds ' + (ct.total - ct.got) + ' more objects. Open Search (X) wherever you stand.</div>';
    els.body.innerHTML = h;
    wireRelicsPanel(els);
  }
  function wireRelicsPanel(els) {
    els.body.querySelectorAll("[data-v37equip]").forEach(function (btn) {
      btn.onclick = function () { setBand(band().concat([btn.getAttribute("data-v37equip")])); renderRelicsPanel(els); };
    });
    els.body.querySelectorAll("[data-v37unequip]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-v37unequip");
        setBand(band().filter(function (b) { return b !== id; })); renderRelicsPanel(els);
      };
    });
    els.body.querySelectorAll("[data-v37study]").forEach(function (btn) {
      btn.onclick = function () { studyRelic(btn.getAttribute("data-v37study")); };
    });
    var q = els.body.querySelector("#v37q"), rr = els.body.querySelector("#v37rar"), cc = els.body.querySelector("#v37c");
    if (q) q.oninput = function () { relFilter.q = q.value; renderRelicsPanel(els); };
    if (rr) rr.onchange = function () { relFilter.rar = rr.value; renderRelicsPanel(els); };
    if (cc) cc.onchange = function () { relFilter.c = cc.value; renderRelicsPanel(els); };
  }
  function studyRelic(id) {
    var o = R.byId[id]; if (!o) return;
    var txt = o.rw + "\n\nIts question: " + o.kq +
      "\n\nTwo answers the Guild has heard:\n1. " + o.ans[0] + "\n2. " + o.ans[1] +
      (o.mla && o.mla.length ? "\n\nResearch trail (MLA):\n" + o.mla.join("\n") : "") +
      "\n\nTake the question further in your Journal (J). Rung 4 names a knowledge question; rung 5 defends an answer against its rival.";
    try { E.openVignette(o.name, txt); } catch (e) {}
    cxpAdd(o.tags.c, 3, "study");
    try { E.tagCoverage({ c: o.tags.c, e: o.tags.e, f: "Journal", s: o.tags.s, m: "study" }); } catch (e) {}
  }

  /* ── FIELD SEARCH: scavenging, digs, encounters ── */
  function currentRegionId() { return E.getState().player.region; }
  function renderSearchPanel(els) {
    var rid = currentRegionId();
    var here = (R.byRegion[rid] || []).filter(function (o) { return ["floor", "npc", "cache"].indexOf(o.pl.mode) >= 0; });
    var left = here.filter(function (o) { return !got(o.id); });
    els.title.textContent = "Field Search · " + (REGION_LABELS[rid] || rid);
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Objects hide where knowledge was made. Look, dig, and talk."
      : "Every region keeps objects the ledgers forgot. Some sit in plain sight, some hide, some walk and talk.";
    var h = "";
    if (!here.length) {
      h = '<div class="sub">No loose objects here. The vaults south of Atlas Hall hold the dense shelving; the courier chip reads Reliquary.</div>';
    } else {
      h += '<div class="sub" style="margin-bottom:8px">' + left.length + ' of ' + here.length + ' still hidden here.</div>';
      var dowse = V37.hasAbility("dowse");
      here.forEach(function (o) {
        if (got(o.id)) { h += '<div style="opacity:.45;margin:3px 0">✓ ' + esc(o.icon) + ' ' + esc(o.name) + '</div>'; return; }
        if (o.pl.mode === "floor") {
          h += chipRow(o, '<div style="margin-top:5px"><button class="btn small gold" data-v37claim="' + esc(o.id) + '">Examine it</button></div>');
        } else if (o.pl.mode === "cache") {
          h += '<div style="border:1px dashed #777;border-radius:6px;padding:8px 10px;margin:6px 0">' +
            '<strong>A hidden thing.</strong> <span style="opacity:.8">' + esc(dowse ? o.pl.detail : (o.pl.detail || "").slice(0, 40) + (String(o.pl.detail || "").length > 40 ? "…" : "")) + '</span>' +
            (dowse ? ' <span style="opacity:.6">(Dowse reads the whole hint.)</span>' : '') +
            '<div style="margin-top:5px"><button class="btn small" data-v37dig="' + esc(o.id) + '">Dig</button> <span id="v37digbar_' + esc(o.id) + '"></span></div></div>';
        } else if (o.pl.mode === "npc") {
          var nm = String(o.pl.detail || "A Keeper:").split(":")[0];
          h += '<div style="border:1px solid #666;border-radius:6px;padding:8px 10px;margin:6px 0">' +
            '<strong>' + esc(nm) + '</strong> <span style="opacity:.8">has something for a listener.</span>' +
            '<div style="margin-top:5px"><button class="btn small" data-v37meet="' + esc(o.id) + '">Approach</button></div></div>';
        }
      });
      if (V37.hasAbility("lens")) {
        var lk = "v37_lens_" + rid;
        h += FL()[lk]
          ? '<div class="sub" style="opacity:.6;margin-top:8px">The Lens has read this region.</div>'
          : '<div style="margin-top:8px"><button class="btn small" id="v37lens">Raise the Lens</button> <span class="sub">one hidden perspective plaque per region</span></div>';
      }
    }
    els.body.innerHTML = h;
    wireSearchPanel(els, rid);
  }
  function conceptQuiz(o, after) {
    /* name the concept before the object yields: identification practice */
    var right = o.tags.c;
    var pool = E.CANON.CONCEPTS.filter(function (c) { return c !== right; });
    var a = pool[hashN(o.id + "a") % pool.length];
    var b = pool[hashN(o.id + "b") % (pool.length - 1)]; if (b === a) b = pool[(hashN(o.id + "b") + 7) % pool.length];
    var opts = [right, a, b].sort(function (x, y) { return hashN(o.id + x) - hashN(o.id + y); });
    var els = panelEls();
    var h = chipRow(o, '') +
      '<div style="margin:8px 0">Which concept does this object serve first?</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
      opts.map(function (c) { return '<button class="btn small" data-v37cq="' + esc(c) + '">' + esc(c) + '</button>'; }).join("") + '</div>' +
      '<div class="sub" style="opacity:.7;margin-top:6px">Any reading can be argued. The tag on its crate names one.</div>';
    els.body.innerHTML = h;
    els.body.querySelectorAll("[data-v37cq]").forEach(function (btn) {
      btn.onclick = function () {
        var pick = btn.getAttribute("data-v37cq");
        if (pick === right) { cxpAdd(right, 10, "named the concept"); toast("Named: " + right + " (+10 insight)"); sfx("chime"); }
        else { cxpAdd(right, 3, "met the concept"); toast("The crate reads " + right + ". A defensible reach, still."); }
        after();
      };
    });
  }
  function wireSearchPanel(els, rid) {
    els.body.querySelectorAll("[data-v37claim]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-v37claim"), o = R.byId[id];
        conceptQuiz(o, function () { acquire(id, "floor"); renderSearchPanel(els); });
      };
    });
    els.body.querySelectorAll("[data-v37dig]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-v37dig");
        var bar = els.body.querySelector("#v37digbar_" + CSS.escape(id));
        var n = 0; btn.disabled = true;
        var t = setInterval(function () {
          n++; if (bar) bar.textContent = "▒".repeat(n);
          sfx("tick");
          if (n >= 4) { clearInterval(t); acquire(id, "cache"); renderSearchPanel(els); }
        }, 320);
      };
    });
    els.body.querySelectorAll("[data-v37meet]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-v37meet"), o = R.byId[id];
        var parts = String(o.pl.detail || "A Keeper: take it.").split(":");
        var nm = parts[0], line = parts.slice(1).join(":").trim();
        var h = '<div style="margin-bottom:6px"><strong>' + esc(nm) + '</strong>: ' + esc(line) + '</div>' +
          '<div class="sub" style="margin-bottom:6px">They hold out ' + esc(o.name) + ' and ask what you make of its question: <em>' + esc(o.kq) + '</em></div>' +
          '<div style="display:grid;gap:6px">' +
          '<button class="btn small" data-v37say="0">' + esc(o.ans[0].slice(0, 110)) + '</button>' +
          '<button class="btn small" data-v37say="1">' + esc(o.ans[1].slice(0, 110)) + '</button></div>';
        els.body.innerHTML = h;
        els.body.querySelectorAll("[data-v37say]").forEach(function (sb) {
          sb.onclick = function () {
            cxpAdd(o.tags.c, 8, "answered " + nm);
            try { E.tagCoverage({ c: o.tags.c, e: o.tags.e, f: "Dialogue", s: o.tags.s, m: "encounter" }); } catch (e) {}
            acquire(o.id, "npc");
            renderSearchPanel(els);
          };
        });
      };
    });
    var lens = els.body.querySelector("#v37lens");
    if (lens) lens.onclick = function () {
      FL()["v37_lens_" + rid] = 1;
      var cs = E.CANON.CONCEPTS, c = cs[hashN("lens" + rid) % cs.length];
      cxpAdd(c, 12, "lens plaque");
      try { E.openVignette("The Lens · " + (REGION_LABELS[rid] || rid), "A plaque only the Lens can read:\n\nWhose knowing built this place, and whose knowing carried it here without credit?\n\nThe plaque files itself under " + c + ". +12 insight."); } catch (e) {}
      save(); renderSearchPanel(els);
    };
  }

  /* ── THE EXCHANGE PANEL ── */
  function renderExchangePanel(els) {
    els.title.textContent = "The Exchange";
    var feat = featuredConcept();
    els.sub.textContent = "Prices drift daily. Today collectors favor " + feat + " pieces. Sold means gone: the gift leaves with the object.";
    var h = '<h3 style="margin:4px 0">Today’s stall</h3>';
    var stock = dailyStock();
    if (!stock.length) h += '<div class="sub">The stall stands empty. Tomorrow brings a new crate.</div>';
    stock.forEach(function (o) {
      h += chipRow(o, '<div style="margin-top:5px"><button class="btn small gold" data-v37buy="' + esc(o.id) + '">Buy · ' + priceOf(o, false) + ' lumens</button>' +
        '<span style="opacity:.6;font-size:.85em"> delivered from ' + esc(REGION_LABELS[o.region] || o.region) + '</span></div>');
    });
    h += '<h3 style="margin:12px 0 4px">Sell from your satchel</h3><div class="sub" style="margin-bottom:6px">The stallkeeper pays at once and forgets your name. No returns, no buybacks, and the object’s gift ends at the counter.</div>';
    var any = false;
    R.list.forEach(function (o) {
      if (!own(o.id)) return;
      any = true;
      h += chipRow(o, '<div style="margin-top:5px"><button class="btn small" data-v37sell="' + esc(o.id) + '">Sell · ' + priceOf(o, true) + ' lumens</button></div>');
    });
    if (!any) h += '<div class="sub" style="opacity:.7">Nothing to sell. A fine problem.</div>';
    els.body.innerHTML = h;
    els.body.querySelectorAll("[data-v37buy]").forEach(function (btn) {
      btn.onclick = function () { buyRelic(btn.getAttribute("data-v37buy")); renderExchangePanel(els); };
    });
    els.body.querySelectorAll("[data-v37sell]").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-v37sell"), o = R.byId[id];
        if (btn.getAttribute("data-armed")) { sellRelic(id); renderExchangePanel(els); return; }
        btn.setAttribute("data-armed", "1");
        btn.textContent = "Certain? " + esc(o.name.slice(0, 20)) + " leaves forever.";
      };
    });
  }

  /* ── NEW REGIONS: the Grand Reliquary and six vaults ── */
  function grid(rows) { return E.grid ? E.grid(rows) : rows.map(function (r) { return r.split(""); }); }
  var TILES = { "#": "wall", ".": "stone", ",": "deco", "p": "path", "S": "shelf", "~": "water", "C": "column", "g": "grass", "t": "tree" };
  var PALS = {
    reliquary:   { wall: "#4A3B5C", wallTop: "#6B5786", deco: "#8A76A8", decoGround: "#3A3048", path: "#5C4E76", shelf: "#2E2640", stone: "#3A3048", stone2: "#342B42", water: "#2E4F6A", waterHi: "#7FA6C6", column: "#7A66A0", grass: "#3A3048", grass2: "#342B42", tree: "#8A76A8", tree2: "#6B5786", treeTrunk: "#4A3B5C", sand: "#3A3048", sand2: "#342B42", wood: "#2E2640", wood2: "#4A3B5C", plank: "#4A3B5C", rug: "#8A76A8", rugTrim: "#6B5786" },
    vault_tech:  { wall: "#31424E", wallTop: "#4A5F6E", deco: "#6E8A9A", decoGround: "#26333C", path: "#3E5260", shelf: "#1F2A32", stone: "#26333C", stone2: "#222E36", water: "#2E5F7A", waterHi: "#8CC3D6", column: "#5C7686", grass: "#26333C", grass2: "#222E36", tree: "#6E8A9A", tree2: "#4A5F6E", treeTrunk: "#31424E", sand: "#26333C", sand2: "#222E36", wood: "#1F2A32", wood2: "#31424E", plank: "#31424E", rug: "#6E8A9A", rugTrim: "#4A5F6E" },
    vault_lang:  { wall: "#5C4A32", wallTop: "#7E6746", deco: "#A8894F", decoGround: "#463826", path: "#6A5638", shelf: "#382C1E", stone: "#463826", stone2: "#403322", water: "#3E6B7A", waterHi: "#7FB6C9", column: "#96794A", grass: "#463826", grass2: "#403322", tree: "#A8894F", tree2: "#7E6746", treeTrunk: "#5C4A32", sand: "#463826", sand2: "#403322", wood: "#382C1E", wood2: "#5C4A32", plank: "#5C4A32", rug: "#A8894F", rugTrim: "#7E6746" },
    vault_pol:   { wall: "#59323A", wallTop: "#7A4650", deco: "#A05E6A", decoGround: "#42262C", path: "#663A44", shelf: "#341E22", stone: "#42262C", stone2: "#3C2228", water: "#2E4F6A", waterHi: "#7FA6C6", column: "#8E5460", grass: "#42262C", grass2: "#3C2228", tree: "#A05E6A", tree2: "#7A4650", treeTrunk: "#59323A", sand: "#42262C", sand2: "#3C2228", wood: "#341E22", wood2: "#59323A", plank: "#59323A", rug: "#A05E6A", rugTrim: "#7A4650" },
    vault_rel:   { wall: "#2E4A44", wallTop: "#436B62", deco: "#5E9284", decoGround: "#243A36", path: "#38564F", shelf: "#1C2E2A", stone: "#243A36", stone2: "#203430", water: "#2E5F7A", waterHi: "#8CC3D6", column: "#528074", grass: "#243A36", grass2: "#203430", tree: "#5E9284", tree2: "#436B62", treeTrunk: "#2E4A44", sand: "#243A36", sand2: "#203430", wood: "#1C2E2A", wood2: "#2E4A44", plank: "#2E4A44", rug: "#5E9284", rugTrim: "#436B62" },
    vault_knower:{ wall: "#3E3E52", wallTop: "#5A5A76", deco: "#7E7EA2", decoGround: "#30303E", path: "#4A4A62", shelf: "#26262E", stone: "#30303E", stone2: "#2A2A38", water: "#2E4F6A", waterHi: "#7FA6C6", column: "#6E6E92", grass: "#30303E", grass2: "#2A2A38", tree: "#7E7EA2", tree2: "#5A5A76", treeTrunk: "#3E3E52", sand: "#30303E", sand2: "#2A2A38", wood: "#26262E", wood2: "#3E3E52", plank: "#3E3E52", rug: "#7E7EA2", rugTrim: "#5A5A76" }
  };
  var NP = { skin: "#B98B62", robe: "#4A3B5C", trim: "#C9A54E", hair: "#2A2018" };

  function vaultGrid() {
    return grid([
      "##########################",
      "#..........CC...........#",
      "#.SS..,......,......SS...#",
      "#........................#",
      "#...,....pppppp....,.....#",
      "#........p....p..........#",
      "#.SS.....p....p.....SS...#",
      "#........p....p..........#",
      "#...##...pppppp...##.....#",
      "#...#,....................#",
      "#...##..,..........##....#",
      "#..........CC......#,#...#",
      "#.SS................##...#",
      "#........................#",
      "#....,........,....,.....#",
      "#........................#",
      "##########################"
    ].map(function (r) { return r.length < 26 ? (r + "######").slice(0, 26) : r.slice(0, 26); }));
  }
  function chamberGrid() {
    return grid([
      "############",
      "#..........#",
      "#..S....S..#",
      "#....pp....#",
      "#....pp....#",
      "#..S....S..#",
      "#..........#",
      "############"
    ]);
  }

  function mkChamber(doorId, legendary, loreTitle, loreText) {
    var d = DOORS[doorId];
    var inter = {
      "5,6": { type: "portal", label: "Back to the vault", to: { region: d.vault, spawn: "default" } },
      "2,2": { type: "sign", title: loreTitle, text: loreText }
    };
    if (legendary) inter["9,2"] = { type: "pickup", item: legendary };
    E.registerRegion(d.chamber, {
      name: REGION_LABELS[d.chamber] || d.name, tag: "chamber", pal: PALS.reliquary,
      tiles: TILES, grid: chamberGrid(),
      spawns: { default: { x: 5, y: 5 } },
      npcs: [],
      interactables: inter
    });
  }

  function sentinelDialogue(doorId) {
    var d = DOORS[doorId], dlgId = "v37_sent_" + doorId;
    E.registerDialogue(dlgId, {
      entry: function () { return V37.doorOpen(doorId) ? "open" : "shut"; },
      nodes: {
        shut: {
          speaker: d.name,
          text: function () {
            var k = V37.keysHeld(doorId);
            var names = k.missing.map(function (id) { return R.byId[id] ? R.byId[id].name : id; });
            return d.note + " Held: " + k.have + " of " + k.need + "." + (names.length ? " Still wanted: " + names.join("; ") + "." : " The lock waits for its list to load.");
          },
          choices: [{ t: "I will come back with them.", next: null }]
        },
        open: {
          speaker: d.name,
          text: "The keys answer. The door remembers being a wall and chooses otherwise.",
          choices: [{ t: "Enter.", next: null }]
        }
      }
    });
    return dlgId;
  }

  function mkVault(id, name, doorIds, signText, silentRoom) {
    var inter = {
      "12,4": { type: "portal", label: "The Grand Reliquary", to: { region: "reliquary", spawn: "default" } },
      "3,2": { type: "sign", title: name, text: signText },
      "20,10": { type: "sign", title: "The Silent Room", text: silentRoom + "\n\nNo plaque explains it. Read the furniture, then tell your Journal what the room refuses to say aloud." }
    };
    var npcs = [];
    doorIds.forEach(function (doorId, i) {
      var d = DOORS[doorId];
      var spots = [{ x: 4, y: 9, px: 4, py: 10 }, { x: 19, y: 11, px: 20, py: 11 }][i] || { x: 4, y: 9, px: 4, py: 10 };
      inter[spots.px + "," + spots.py] = { type: "portal", label: d.name, to: { region: d.chamber, spawn: "default" } };
      npcs.push({ id: "v37s_" + doorId, x: spots.x, y: spots.y, dlg: sentinelDialogue(doorId), wander: false, pal: NP });
    });
    /* floor relics assigned to this region land as visible pickups */
    var free = [[6, 2], [16, 2], [22, 3], [2, 6], [22, 6], [6, 12], [16, 12], [22, 13], [2, 14], [10, 14], [14, 10], [8, 6]];
    (R.byRegion[id] || []).filter(function (o) { return o.pl.mode === "floor"; }).slice(0, free.length).forEach(function (o, i) {
      inter[free[i][0] + "," + free[i][1]] = { type: "pickup", item: o.id };
    });
    E.registerRegion(id, {
      name: name, tag: "vault", pal: PALS[id] || PALS.reliquary,
      tiles: TILES, grid: vaultGrid(),
      spawns: { default: { x: 12, y: 6 } },
      npcs: npcs, interactables: inter
    });
  }

  function mkReliquaryHub() {
    var inter = {
      "12,3": { type: "sign", title: "The Grand Reliquary", text: "Five hundred objects wait in the world, each one a door into a knowledge question. Find them, carry five, trade at your own cost, and let the locked chambers name what they want. The exhibition asks for three objects and one question. Practice here with hundreds." },
      "3,5":  { type: "portal", label: "The Engine Bazaar", to: { region: "vault_tech", spawn: "default" } },
      "3,9":  { type: "portal", label: "The Tower of Tongues", to: { region: "vault_lang", spawn: "default" } },
      "3,13": { type: "portal", label: "The Forum of Claims", to: { region: "vault_pol", spawn: "default" } },
      "22,5": { type: "portal", label: "The Pilgrim Roads", to: { region: "vault_rel", spawn: "default" } },
      "22,9": { type: "portal", label: "The Hall of Mirrors", to: { region: "vault_knower", spawn: "default" } },
      "22,13":{ type: "portal", label: "The Proving Grounds", to: { region: "grounds_v37", spawn: "default" } },
      "12,14":{ type: "portal", label: "Atlas Hall", to: { region: "hall", spawn: "default" } }
    };
    var free = [[8, 2], [16, 2], [6, 7], [18, 7], [8, 12], [16, 12]];
    (R.byRegion.reliquary || []).filter(function (o) { return o.pl.mode === "floor"; }).slice(0, free.length).forEach(function (o, i) {
      inter[free[i][0] + "," + free[i][1]] = { type: "pickup", item: o.id };
    });
    E.registerDialogue("v37_exchange_keeper", {
      entry: function () { return "hi"; },
      nodes: {
        hi: {
          speaker: "Odessa, the Exchange",
          text: "Prices drift with the day. I pay in lumens and keep no returns. Sell me a key and the door stays shut for you: the gift leaves with the object. Still trading?",
          choices: [
            { t: "Open the stall.", next: "go" },
            { t: "Just looking.", next: null }
          ]
        },
        go: { speaker: "Odessa, the Exchange", text: "The counter is yours.", choices: [{ t: "(Trade)", next: null }] }
      }
    });
    E.registerRegion("reliquary", {
      name: "The Grand Reliquary", tag: "reliquary", pal: PALS.reliquary,
      tiles: TILES, grid: vaultGrid(),
      spawns: { default: { x: 12, y: 8 } },
      npcs: [{ id: "v37_odessa", x: 12, y: 11, dlg: "v37_exchange_keeper", wander: false, pal: { skin: "#C79A6B", robe: "#8A5E2E", trim: "#E8B54A", hair: "#2A2018" } }],
      interactables: inter
    });
    /* the Exchange opens when Odessa's dialogue closes on the trade branch */
    E.on("v37_tick", function () {});
  }

  function mkProvingGrounds() {
    E.registerRegion("grounds_v37", {
      name: "The Proving Grounds", tag: "grounds", pal: PALS.vault_knower,
      tiles: TILES, grid: chamberGrid(),
      spawns: { default: { x: 5, y: 5 } },
      npcs: [],
      interactables: {
        "5,6": { type: "portal", label: "The Grand Reliquary", to: { region: "reliquary", spawn: "default" } },
        "2,2": { type: "sign", title: "The Proving Grounds", text: "Each trial type trains here first, in the safe version, before the world offers the stern version. Open Trials (I) while standing here and every tutorial unlocks. Fail freely. The floor keeps no record of falls, only of climbs." },
        "9,2": { type: "sign", title: "House rule", text: "One mechanic at a time, then two braided, then the trial proper. Cognitive load respects a queue." }
      }
    });
  }

  /* chart constellation so the Chart Table shows the new wing */
  function stampConstellation() {
    try {
      var CC = E.CANON.CONSTELLATIONS;
      if (CC && !CC.some(function (c) { return c.name === "The Reliquary"; })) {
        CC.push({
          name: "The Reliquary", epithet: "The Constellation of Things",
          regions: [
            { n: "The Grand Reliquary", id: "reliquary" },
            { n: "The Engine Bazaar", id: "vault_tech" },
            { n: "The Tower of Tongues", id: "vault_lang" },
            { n: "The Forum of Claims", id: "vault_pol" },
            { n: "The Pilgrim Roads", id: "vault_rel" },
            { n: "The Hall of Mirrors", id: "vault_knower" },
            { n: "The Proving Grounds", id: "grounds_v37" }
          ]
        });
      }
    } catch (e) {}
  }

  /* chamber entry guard: the metroidvania bounce */
  E.on("worldChange", function (ev) {
    var rid = ev && ev.region;
    if (!rid || rid.indexOf("ch_") !== 0) return;
    var doorId = rid.slice(3);
    var d = DOORS[doorId];
    if (!d) return;
    if (V37.doorOpen(doorId)) {
      if (!FL()["v37_door_" + doorId]) {
        FL()["v37_door_" + doorId] = 1;
        cxpAdd(doorKeyConcept(doorId), 25, d.name);
        juice("big"); sfx("fanfare");
        toast(d.name + " opens.");
        save();
      }
      return;
    }
    var k = V37.keysHeld(doorId);
    var names = k.missing.slice(0, 3).map(function (id) { return R.byId[id] ? R.byId[id].name : id; });
    setTimeout(function () {
      try { E.travel(d.vault, "default"); } catch (e) {}
      try { E.openVignette(d.name, "The door reads your satchel and stays a wall.\n\n" + d.note + "\nHeld: " + k.have + " of " + k.need + "." + (names.length ? "\nStill wanted: " + names.join("; ") + "." : "") + "\n\nSold keys count as gone. The Exchange warned you kindly."); } catch (e) {}
    }, 60);
  });
  function doorKeyConcept(doorId) {
    return { door_math: "Certainty", door_ns: "Evidence", door_arts: "Interpretation", door_hist: "Perspective", door_hs: "Responsibility", door_themes: "Culture", secret_ma: "Justification", secret_ns: "Objectivity", secret_ar: "Values", secret_hi: "Truth", secret_hu: "Power", secret_th: "Explanation" }[doorId] || "Evidence";
  }

  /* Odessa opens the Exchange when her dialogue closes on the go branch */
  var lastTalk = 0;
  E.on("talk", function () { lastTalk = Date.now(); });
  document.addEventListener("click", function (ev) {
    var b = ev.target && ev.target.closest && ev.target.closest("button.choice");
    if (!b) return;
    if (/\(Trade\)/.test(b.textContent || "")) setTimeout(function () { openV37Panel("v37exch"); }, 80);
  }, true);

  /* ── HUD chips and shortcuts ── */
  var countChip = null;
  function addChips() {
    var anchor = document.getElementById("btnGuide") || document.getElementById("btnWarden");
    if (!anchor || !anchor.parentNode) return;
    function mk(id, label, aria, fn) {
      if (document.getElementById(id)) return null;
      var b = document.createElement("button");
      b.className = "chip"; b.id = id; b.textContent = label;
      b.setAttribute("aria-label", aria);
      b.addEventListener("click", fn);
      anchor.parentNode.insertBefore(b, anchor.nextSibling);
      return b;
    }
    mk("btnV37Court", "Reliquary", "Courier to the Grand Reliquary, the hall of five hundred objects", function () {
      try { E.travel("reliquary", "default"); } catch (e) {}
    });
    mk("btnV37Search", "Search · X", "Open Field Search: the objects hidden where you stand. Shortcut X", function () { openV37Panel("v37search"); });
    mk("btnV37Relics", "Relics · O", "Open the Reliquary Record: your objects, Bandolier, and cabinets. Shortcut O", function () { openV37Panel("v37relics"); });
    countChip = document.createElement("span");
    countChip.className = "chip"; countChip.id = "v37CountChip";
    anchor.parentNode.insertBefore(countChip, anchor.nextSibling);
    updateCountChip();
  }
  function updateCountChip() {
    if (!countChip) return;
    var ct = V37.counts();
    countChip.textContent = "◈ " + ct.got + "/" + ct.total;
    countChip.title = "Objects found. Bandolier: " + band().length + "/5.";
  }
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target && e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
    var k = (e.key || "").toLowerCase();
    if (k === "o") { openV37Panel("v37relics"); }
    else if (k === "x") { openV37Panel("v37search"); }
  });

  /* Beacon: one free jump per day to any visited region */
  V37.beacon = function (rid) {
    if (!V37.hasAbility("beacon")) { toast("No Beacon carried."); return; }
    var day = E.dayKey();
    if (FL().v37_beacon_day === day) { toast("The Beacon burned once already today."); return; }
    FL().v37_beacon_day = day;
    try { E.travel(rid, "default"); } catch (e) {}
    toast("The Beacon spends its daily light.");
    save();
  };

  /* ── boot ── */
  function boot() {
    stampConstellation();
    mkReliquaryHub();
    mkVault("vault_tech", "The Engine Bazaar", ["door_ns", "secret_ns"],
      "Stalls of instruments and engines. Every device answers a question someone chose to ask, and hides the questions nobody funded.",
      "A workbench lies on its side. Solder still bright. Three chairs face a fourth chair, empty, its cushion worn to thread. On the floor: a cracked lens, swept toward the door, then abandoned mid-sweep.");
    mkVault("vault_lang", "The Tower of Tongues", ["secret_ma", "secret_hi"],
      "Dictionaries, syllabaries, phrasebooks, and the silences between them. A language holds a map of what its speakers bothered to name.",
      "A copying desk with two inkwells, one dry for years, one fresh. The fresh one sits beside a page of a script nobody at the desk could read. Somebody kept copying anyway. The wastebin holds forty tries.");
    mkVault("vault_pol", "The Forum of Claims", ["door_hist", "door_hs", "secret_hu"],
      "Ballots, banners, borders, verdicts. Power decides which claims get a floor to stand on. The floor here creaks on purpose.",
      "A podium faces two hundred chairs. Every chair carries a printed speech, each one identical, except the third row, where one copy bleeds red ink through every margin, and its chair alone stands turned toward the exit.");
    mkVault("vault_rel", "The Pilgrim Roads", ["door_themes", "secret_th"],
      "Prayer wheels, folios, offering bowls, walking staffs. Roads made of belief wear differently from roads made of trade, and both arrive.",
      "A shrine with two offering bowls. One overflows with coins, polished by hopeful thumbs. One holds a single dried flower and a note folded eight times. The dust says the flower bowl gets visited daily. The coin bowl waits by the door.");
    mkVault("vault_knower", "The Hall of Mirrors", ["door_math", "door_arts", "secret_ar"],
      "The theme with your name on it. Every mirror here shows the same knower and a different knowing. Bring a face you can defend.",
      "Twelve mirrors, eleven polished. The twelfth hangs covered by a curtain, and the floor before it shows more footprints than all the others combined.");
    mkProvingGrounds();
    Object.keys(DOORS).forEach(function (doorId) {
      var lore = {
        door_math: ["The Chamber of Number", "Counting came before writing. The tokens in this room bought sheep, then bought certainty, then bought the idea numbers live somewhere purer than sheep. Decide for yourself where they live."],
        door_ns: ["The Chamber of Evidence", "Every instrument here extended a sense, and every extension chose what to ignore. A telescope refuses smells. A thermometer refuses grudges. Method means principled refusal."],
        door_arts: ["The Chamber of Meaning", "Nothing in this room states a fact, and the room refuses to stop meaning things anyway. Sit with how much knowledge never passes through a proposition."],
        door_hist: ["The Chamber of Memory", "The past left more evidence than any shelf can hold and less than any question needs. Every history is a solved storage problem with a point of view."],
        door_hs: ["The Chamber of the Living", "The objects here measured people, and people noticed being measured, and changed. No other science negotiates with its subject matter."],
        door_themes: ["The Chamber of Themes", "Knowledge, technology, language, politics, religion: five lenses, one knower. The chamber keeps them side by side so you can catch them disagreeing."],
        secret_ma: ["The Uncounted Room", "What resisted counting: grief, tact, the smell of rain. The Guild keeps this room to stay humble about the census."],
        secret_ns: ["The Unmeasured Room", "Instruments outgrew their makers here. The room asks who audits the tools once everyone trusts them."],
        secret_ar: ["The Unsigned Room", "Pieces with no maker's name. Anonymity changes an object's authority, and the room lets you feel the change."],
        secret_hi: ["The Unwritten Room", "Histories carried in bodies, songs, and roads. Writing is one storage medium among several, and the newest one at this scale."],
        secret_hu: ["The Unasked Room", "Questions surveys never asked, because the funders knew the answers would cost them. Absence of data is a decision with an author."],
        secret_th: ["The Unnamed Room", "Every tradition keeps a word for the thing words miss. This room stores the gesture toward it."]
      }[doorId];
      var legendary = "v37_ch_" + doorId;
      mkChamber(doorId, legendary, lore[0], lore[1]);
    });
    addChips();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
