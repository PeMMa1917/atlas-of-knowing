/* ---- content-63-bench.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · THE ASSEMBLY BENCH (content-63)
   v37.1. Load after content-62, before content-67.

   Objects come apart, and the coming-apart teaches. Dissect an owned
   object and the Bench returns its anatomy:
     · two KNOWLEDGE CLAIM cards (the object's rival answers, condensed),
     · one HISTORICAL FACT card (dated, placed, checkable),
     · raw MATERIALS (paper, brass, cloth... read from its pixel form).
   The object itself lies in pieces: its gift stops, keys stop opening
   doors, the Exchange shrugs. Reassembly wants the parts back plus a
   binding fee, and rarer objects want a refined material, so breaking a
   legendary is a decision, not a whim.

   The Bench also assembles new things:
     · BRAIDED EXHIBIT: two claims from different concepts + a fact +
       two materials. The exhibition move, rehearsed in miniature.
     · GROUNDED CLAIM: a claim + a fact of the same concept. Evidence
       under assertion, the habit the essay graders hunt for.
     · DISPUTE CARD: two claims of one concept from different objects.
       The Cipher trials draw extra reveals
       from carried disputes (a counterclaim in the pocket), three at most.
     · REFINED MATERIAL: three of a kind become one finer.

   All state rides monotonic counter flags (granted minus used), so the
   one-save merge law holds. Everything feeds coverage rows, concept
   insight, and stats.crafts. No em dashes in authored strings.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.RELIQUARY || !E.V37) { try { console.warn("[bench] runtime missing"); } catch (e) {} return; }
  var R = E.RELIQUARY, V = E.V37;
  var PX = function () { return E.V37_PX; };

  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function toast(m) { try { E.toast(m); } catch (e) {} }
  function sfx(n) { try { if (E.sfx && E.sfx.play) E.sfx.play(n); } catch (e) {} }
  function juice(k) { try { if (E.fx) { if (k === "big" && E.fx.confetti) E.fx.confetti(); else if (E.fx.sparks) E.fx.sparks(); } } catch (e) {} }
  function save() { try { E.scheduleSave(); } catch (e) {} }
  function panelEls() { return { title: document.getElementById("panelTitle"), sub: document.getElementById("panelSub"), body: document.getElementById("panelBody") }; }
  function num(k) { return Number(FL()[k]) || 0; }
  function inc(k, n) { FL()[k] = num(k) + (n == null ? 1 : n); }

  /* ── counters: granted minus used ── */
  function cardHave(cardId) { return Math.max(0, num("v37_cardn_" + cardId) - num("v37_usedn_" + cardId)); }
  function cardGrant(cardId) { inc("v37_cardn_" + cardId); }
  function cardSpend(cardId) { inc("v37_usedn_" + cardId); }
  function matHave(mat) { return Math.max(0, num("v37_matg_" + mat) - num("v37_matu_" + mat)); }
  function matGrant(mat, n) { inc("v37_matg_" + mat, n || 1); }
  function matSpend(mat, n) { inc("v37_matu_" + mat, n || 1); }
  function disputes(c) { return Math.max(0, num("v37_dispg_" + c) - num("v37_dispu_" + c)); }
  function disputesTotal() {
    var t = 0;
    E.CANON.CONCEPTS.forEach(function (c) { t += disputes(c); });
    return t;
  }

  /* ── anatomy of an object ── */
  function firstSentence(s, cap) {
    var t = String(s || "").split(/(?<=[.!?])\s+/)[0] || String(s || "");
    if (t.length > (cap || 150)) t = t.slice(0, (cap || 150) - 1).replace(/\s+\S*$/, "") + "…";
    return t;
  }
  var SECONDARY_MATS = ["Cord", "Wax", "Resin", "Gilt", "Charcoal", "Salt"];
  function anatomy(id) {
    var o = R.byId[id];
    if (!o) return null;
    var tpl = PX() ? PX().templateOf(id) : "chest";
    var mat = (PX() && PX().MATERIAL_OF[tpl]) || "Wood";
    var h = 2166136261;
    for (var i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return {
      claims: [
        { id: "cl_" + id + "_0", c: o.tags.c, text: firstSentence(o.ans[0]), from: o.name },
        { id: "cl_" + id + "_1", c: o.tags.c, text: firstSentence(o.ans[1]), from: o.name }
      ],
      fact: { id: "fx_" + id, c: o.tags.c, text: firstSentence(o.rw), from: o.name },
      mats: [{ t: mat, n: 2 }, { t: SECONDARY_MATS[h % SECONDARY_MATS.length], n: 1 }],
      primary: mat
    };
  }
  var CARD_TEXT = {}; /* cardId -> {text, c, from, kind} rebuilt each boot from data */
  function indexCards() {
    R.list.forEach(function (o) {
      var a = anatomy(o.id);
      if (!a) return;
      a.claims.forEach(function (cl) { CARD_TEXT[cl.id] = { text: cl.text, c: cl.c, from: cl.from, kind: "claim" }; });
      CARD_TEXT[a.fact.id] = { text: a.fact.text, c: a.fact.c, from: a.fact.from, kind: "fact" };
    });
  }
  function ownedCards(kind) {
    var out = [];
    Object.keys(CARD_TEXT).forEach(function (cid) {
      if (CARD_TEXT[cid].kind !== kind) return;
      var n = cardHave(cid);
      for (var i = 0; i < n; i++) out.push(cid);
    });
    return out;
  }

  /* ── dissect ── */
  var FEE = { common: 10, rare: 20, epic: 35, legendary: 60 };
  function dissect(id) {
    var o = R.byId[id];
    if (!o || !V.own(id)) return false;
    var a = anatomy(id);
    inc("v37_diss_" + id);
    inc("v37_dissections");
    V.setBand(V.band().filter(function (b) { return b !== id; }));
    a.claims.forEach(function (cl) { cardGrant(cl.id); });
    cardGrant(a.fact.id);
    a.mats.forEach(function (m) { matGrant(m.t, m.n); });
    try { E.tagCoverage({ c: o.tags.c, e: "Methods and Tools", f: "Craft", s: o.tags.s, m: "dissect" }); } catch (e) {}
    V.cxpAdd(o.tags.c, 6, "dissection");
    try { E.autoJournal("Took " + o.name + " apart at the Bench. Inside: two claims, one dated fact, and " + a.mats.map(function (m) { return m.n + " " + m.t; }).join(", ") + ". Objects argue; anatomy shows how."); } catch (e) {}
    sfx("thud"); juice();
    toast("Dissected: " + o.name + ". Its gift sleeps until reassembly.");
    if (o.eff.t === "key") toast("A door somewhere sighs. Broken keys open nothing.");
    save();
    return true;
  }
  function reassemble(id) {
    var o = R.byId[id];
    if (!o) return false;
    if (num("v37_reborn_" + id) >= num("v37_diss_" + id)) return false;
    var a = anatomy(id);
    var fee = FEE[o.rarity] || 15;
    var needRefined = (o.rarity === "epic" || o.rarity === "legendary") ? "Refined " + a.primary : null;
    var missing = [];
    a.claims.forEach(function (cl) { if (cardHave(cl.id) < 1) missing.push("its claim card"); });
    if (cardHave(a.fact.id) < 1) missing.push("its fact card");
    if (matHave(a.primary) < 2) missing.push("2 " + a.primary);
    if (needRefined && matHave(needRefined) < 1) missing.push("1 " + needRefined);
    if ((SD().lumens | 0) < fee) missing.push(fee + " lumens");
    if (missing.length) { toast("The Bench wants: " + missing.join(", ") + "."); return false; }
    a.claims.forEach(function (cl) { cardSpend(cl.id); });
    cardSpend(a.fact.id);
    matSpend(a.primary, 2);
    if (needRefined) matSpend(needRefined, 1);
    try { E.gainLumens(-fee); } catch (e) {}
    inc("v37_reborn_" + id);
    SD().stats.crafts = (SD().stats.crafts | 0) + 1;
    try { E.tagCoverage({ c: o.tags.c, e: "Methods and Tools", f: "Craft", s: o.tags.s, m: "reassemble" }); } catch (e) {}
    V.cxpAdd(o.tags.c, 10, "reassembly");
    try { E.autoJournal("Rebuilt " + o.name + " from its own parts. The claims, the fact, the materials: the whole is the argument they make together."); } catch (e) {}
    sfx("fanfare"); juice("big");
    toast("Reassembled: " + o.name + ". Its gift wakes.");
    save();
    return true;
  }

  /* ── synthesis recipes ── */
  function forgeBraided(claimA, claimB, factId, matPicks) {
    var ca = CARD_TEXT[claimA], cb = CARD_TEXT[claimB], fx = CARD_TEXT[factId];
    if (!ca || !cb || !fx) return false;
    if (ca.c === cb.c) { toast("The braid wants two different concepts. Same-concept claims make a Dispute instead."); return false; }
    if (cardHave(claimA) < 1 || cardHave(claimB) < 1 || cardHave(factId) < 1) return false;
    if ((SD().lumens | 0) < 10) { toast("Binding costs 10 lumens."); return false; }
    var matsOk = matPicks.length === 2 && matPicks.every(function (m) { return matHave(m) >= 1; });
    if (!matsOk) { toast("Two materials, any kind, to give the braid a body."); return false; }
    cardSpend(claimA); cardSpend(claimB); cardSpend(factId);
    matPicks.forEach(function (m) { matSpend(m, 1); });
    try { E.gainLumens(-10); } catch (e) {}
    var n = num("v37_exn") + 1;
    FL().v37_exn = n;
    FL()["v37_exname_" + n] = ca.c + " × " + cb.c + " · " + firstSentence(fx.from, 40);
    registerExhibit(n);
    try { E.give("v37ex_" + n); } catch (e) {}
    SD().stats.crafts = (SD().stats.crafts | 0) + 1;
    V.cxpAdd(ca.c, 15, "braided exhibit");
    V.cxpAdd(cb.c, 15, "braided exhibit");
    try { E.tagCoverage({ c: ca.c, e: "Perspectives", f: "Craft", m: "braid" }); } catch (e) {}
    try { E.autoJournal("Braided an exhibit: " + ca.c + " against " + cb.c + ", pinned to a dated fact. Two lenses, one object, the exhibition's whole trick."); } catch (e) {}
    sfx("fanfare"); juice("big");
    toast("Braided Exhibit forged. It waits in your Codex.");
    save();
    return true;
  }
  function registerExhibit(n) {
    var name = String(FL()["v37_exname_" + n] || "Braided Exhibit " + n);
    try {
      E.registerItem("v37ex_" + n, {
        name: "Braided Exhibit: " + name, era: "The Assembly Bench",
        tags: [name.split(" × ")[0] || "Perspective", "Perspectives"],
        desc: "Forged at the Bench from two rival claims and one dated fact. A rehearsal for the true Exhibition: one object, two concepts, and the argument between them."
      });
    } catch (e) {}
  }
  function bootExhibits() {
    var n = num("v37_exn");
    for (var i = 1; i <= n && i <= 60; i++) registerExhibit(i);
  }
  function forgeGrounded(claimId, factId) {
    var cl = CARD_TEXT[claimId], fx = CARD_TEXT[factId];
    if (!cl || !fx) return false;
    if (cl.c !== fx.c) { toast("Grounding wants a claim and a fact from the same concept. Otherwise the ground shifts."); return false; }
    if (cardHave(claimId) < 1 || cardHave(factId) < 1) return false;
    if ((SD().lumens | 0) < 5) { toast("Grounding costs 5 lumens."); return false; }
    cardSpend(claimId); cardSpend(factId);
    try { E.gainLumens(-5); } catch (e) {}
    inc("v37_groundedn");
    SD().stats.crafts = (SD().stats.crafts | 0) + 1;
    V.cxpAdd(cl.c, 12, "grounded claim");
    try { E.tagCoverage({ c: cl.c, e: "Methods and Tools", f: "Craft", m: "ground" }); } catch (e) {}
    sfx("chime"); juice();
    toast("Grounded Claim forged: " + cl.c + " now stands on a dated fact. +12 insight.");
    save();
    return true;
  }
  function forgeDispute(claimA, claimB) {
    var ca = CARD_TEXT[claimA], cb = CARD_TEXT[claimB];
    if (!ca || !cb) return false;
    if (ca.c !== cb.c) { toast("A dispute lives inside one concept. Different concepts braid; they do not dispute."); return false; }
    if (ca.from === cb.from) { toast("Two claims from one object already share a spine. Find its rival in another object."); return false; }
    if (cardHave(claimA) < 1 || cardHave(claimB) < 1) return false;
    if (disputesTotal() >= 3) { toast("Three disputes carried at most. Spend one in a trial first."); return false; }
    cardSpend(claimA); cardSpend(claimB);
    inc("v37_dispg_" + ca.c);
    SD().stats.crafts = (SD().stats.crafts | 0) + 1;
    V.cxpAdd(ca.c, 10, "dispute card");
    try { E.tagCoverage({ c: ca.c, e: "Perspectives", f: "Craft", m: "dispute" }); } catch (e) {}
    sfx("chime"); juice();
    toast("Dispute Card forged (" + ca.c + "). Cipher trials can now argue extra letters loose with it.");
    save();
    return true;
  }
  function refine(mat) {
    if (matHave(mat) < 3) { toast("Refining wants three " + mat + "."); return false; }
    matSpend(mat, 3);
    matGrant("Refined " + mat, 1);
    SD().stats.crafts = (SD().stats.crafts | 0) + 1;
    sfx("tick"); toast("Refined " + mat + " made. Epic and legendary reassembly asks for these.");
    save();
    return true;
  }
  /* trials spend a dispute for the bonus reveal: exposed for content-67 */
  function spendDispute() {
    var cs = E.CANON.CONCEPTS;
    for (var i = 0; i < cs.length; i++) {
      if (disputes(cs[i]) > 0) { inc("v37_dispu_" + cs[i]); save(); return cs[i]; }
    }
    return null;
  }

  E.V37_BENCH = { anatomy: anatomy, dissect: dissect, reassemble: reassemble, cardHave: cardHave, matHave: matHave,
    disputesTotal: disputesTotal, spendDispute: spendDispute, ownedCards: ownedCards, CARD_TEXT: CARD_TEXT,
    forgeBraided: forgeBraided, forgeGrounded: forgeGrounded, forgeDispute: forgeDispute, refine: refine, FEE: FEE };

  /* ── UI ── */
  var tab = "dissect", picks = { claimA: "", claimB: "", fact: "", mats: [], gclaim: "", gfact: "", dclaimA: "", dclaimB: "" };
  function openBench() {
    try { E.openPanel("v37bench"); } catch (e) {}
    render();
  }
  function px(id, scale) { return PX() ? PX().imgHtml(id, scale || 2) : ""; }
  function cardImg(kind, seed) { return PX() ? PX().cardHtml(kind, seed, 2) : ""; }
  function render() {
    var els = panelEls(); if (!els.body) return;
    els.title.textContent = "The Assembly Bench";
    els.sub.textContent = SD().settings && SD().settings.plain
      ? "Take objects apart into claims, a fact, and materials. Put parts together into new things."
      : "Callum keeps the saws clean. Objects come apart into claims, facts, and materials; parts come together into exhibits, grounded claims, and disputes. Anatomy is analysis with sawdust.";
    var h = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' +
      [["dissect", "Dissect"], ["assemble", "Assemble"], ["parts", "Parts (" + (ownedCards("claim").length + ownedCards("fact").length) + ")"]].map(function (t) {
        return '<button class="btn small' + (tab === t[0] ? " gold" : "") + '" data-bt="' + t[0] + '">' + t[1] + '</button>';
      }).join("") + '</div>';
    if (tab === "dissect") h += viewDissect();
    else if (tab === "assemble") h += viewAssemble();
    else h += viewParts();
    els.body.innerHTML = h;
    wire(els);
  }
  function viewDissect() {
    var h = '<div class="sub" style="margin-bottom:6px">Dissection returns two claim cards, one fact card, and materials. The object lies in pieces afterward: no gift, no key, no sale, until reassembled here (fee by rarity: 10/20/35/60 lumens; epic and legendary also want one refined material).</div>';
    var owned = R.list.filter(function (o) { return V.own(o.id); });
    var broken = R.list.filter(function (o) { return Number(FL()["v37_diss_" + o.id] || 0) > Number(FL()["v37_reborn_" + o.id] || 0); });
    if (broken.length) {
      h += '<h3 style="margin:8px 0 4px">In pieces (' + broken.length + ')</h3>';
      broken.forEach(function (o) {
        h += '<div style="border:1px dashed #c96f6f66;border-radius:6px;padding:7px 9px;margin:5px 0;display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
          px(o.id) + '<span style="opacity:.85">' + esc(o.name) + '</span>' +
          '<button class="btn small" data-reasm="' + esc(o.id) + '">Reassemble · ' + (FEE[o.rarity] || 15) + ' lumens</button></div>';
      });
    }
    h += '<h3 style="margin:10px 0 4px">Whole and willing (' + owned.length + ')</h3>';
    if (!owned.length) h += '<div class="sub" style="opacity:.7">Nothing owned and intact. The world holds plenty; Search (X) where you stand.</div>';
    owned.slice(0, 80).forEach(function (o) {
      var a = anatomy(o.id);
      h += '<div style="border:1px solid #555;border-radius:6px;padding:7px 9px;margin:5px 0">' +
        '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' + px(o.id) +
        '<strong>' + esc(o.name) + '</strong><span style="opacity:.6;font-size:.85em">' + esc(o.tags.c) + '</span></div>' +
        '<div class="sub" style="opacity:.75;margin:3px 0">Inside: 2 claims · 1 fact · ' + a.mats.map(function (m) { return m.n + " " + m.t; }).join(" · ") + '</div>' +
        '<button class="btn small" data-diss="' + esc(o.id) + '">Dissect</button>' +
        (o.eff.t === "key" ? ' <span style="color:#c96f6f;font-size:.8em">key: its door will refuse you while broken</span>' : '') +
        '</div>';
    });
    return h;
  }
  function pickList(kind, sel, name, filter) {
    var seen = {}, opts = "";
    ownedCards(kind).forEach(function (cid) {
      if (seen[cid]) return; seen[cid] = 1;
      var c = CARD_TEXT[cid];
      if (filter && !filter(c)) return;
      opts += '<option value="' + esc(cid) + '"' + (sel === cid ? " selected" : "") + '>' +
        esc("[" + c.c + "] " + c.text.slice(0, 70) + " (" + cardHave(cid) + ")") + '</option>';
    });
    return '<select data-pick="' + name + '" style="max-width:100%"><option value="">choose…</option>' + opts + '</select>';
  }
  function matList() {
    var out = [];
    Object.keys(FL()).forEach(function (k) {
      if (k.indexOf("v37_matg_") === 0) {
        var m = k.slice(9);
        if (matHave(m) > 0) out.push(m);
      }
    });
    return out.sort();
  }
  function viewAssemble() {
    var h = "";
    h += '<div style="border:1px solid #B07FE8;border-radius:8px;padding:9px;margin:6px 0">' +
      '<strong>' + cardImg("claim", 1) + ' Braided Exhibit</strong> <span class="sub">2 claims, different concepts + 1 fact + 2 materials + 10 lumens</span>' +
      '<div style="display:grid;gap:4px;margin-top:5px">' +
      'Claim A: ' + pickList("claim", picks.claimA, "claimA") +
      'Claim B: ' + pickList("claim", picks.claimB, "claimB") +
      'Fact: ' + pickList("fact", picks.fact, "fact") +
      'Materials: <div style="display:flex;gap:4px;flex-wrap:wrap">' + matList().map(function (m) {
        var on = picks.mats.indexOf(m) >= 0;
        return '<button class="btn small" data-mat="' + esc(m) + '" style="' + (on ? "border-color:#E8B54A" : "") + '">' + cardImg(m, 2) + ' ' + esc(m) + ' ×' + matHave(m) + '</button>';
      }).join("") + '</div>' +
      '<button class="btn gold" data-forge="braid">Braid it</button></div></div>';
    h += '<div style="border:1px solid #6FA8DC;border-radius:8px;padding:9px;margin:6px 0">' +
      '<strong>' + cardImg("fact", 2) + ' Grounded Claim</strong> <span class="sub">1 claim + 1 fact, same concept + 5 lumens · pays +12 insight</span>' +
      '<div style="display:grid;gap:4px;margin-top:5px">' +
      'Claim: ' + pickList("claim", picks.gclaim, "gclaim") +
      'Fact: ' + pickList("fact", picks.gfact, "gfact") +
      '<button class="btn gold" data-forge="ground">Ground it</button></div></div>';
    h += '<div style="border:1px solid #c96f6f;border-radius:8px;padding:9px;margin:6px 0">' +
      '<strong>' + cardImg("dispute", 3) + ' Dispute Card</strong> <span class="sub">2 claims, one concept, two different objects · Cipher trials draw extra reveals from these (3 held at most) · held now: ' + disputesTotal() + '</span>' +
      '<div style="display:grid;gap:4px;margin-top:5px">' +
      'Claim A: ' + pickList("claim", picks.dclaimA, "dclaimA") +
      'Claim B: ' + pickList("claim", picks.dclaimB, "dclaimB") +
      '<button class="btn gold" data-forge="dispute">Set them arguing</button></div></div>';
    h += '<div style="border:1px solid #9AA49A;border-radius:8px;padding:9px;margin:6px 0">' +
      '<strong>Refine</strong> <span class="sub">3 of a material become 1 refined · epic and legendary reassembly wants refined stock</span>' +
      '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:5px">' + matList().filter(function (m) { return m.indexOf("Refined") !== 0 && matHave(m) >= 3; }).map(function (m) {
        return '<button class="btn small" data-refine="' + esc(m) + '">' + cardImg(m, 2) + ' Refine ' + esc(m) + '</button>';
      }).join("") + '</div></div>';
    var braids = num("v37_exn"), grounded = num("v37_groundedn");
    h += '<div class="sub" style="opacity:.75">Forged so far: ' + braids + ' braided exhibit' + (braids === 1 ? "" : "s") + ' · ' + grounded + ' grounded claim' + (grounded === 1 ? "" : "s") + ' · dissections: ' + num("v37_dissections") + '</div>';
    return h;
  }
  function viewParts() {
    var h = '<h3 style="margin:6px 0 4px">Claim cards</h3>';
    var any = false, seen = {};
    ownedCards("claim").forEach(function (cid) {
      if (seen[cid]) return; seen[cid] = 1; any = true;
      var c = CARD_TEXT[cid];
      h += '<div style="border-left:3px solid #6FA8DC;padding:4px 9px;margin:5px 0">' + cardImg("claim", cid.length) + ' <strong>[' + esc(c.c) + ']</strong> ' + esc(c.text) + ' <span class="sub" style="opacity:.6">from ' + esc(c.from) + ' ×' + cardHave(cid) + '</span></div>';
    });
    if (!any) h += '<div class="sub" style="opacity:.7">None yet. Dissection provides.</div>';
    h += '<h3 style="margin:10px 0 4px">Fact cards</h3>';
    any = false; seen = {};
    ownedCards("fact").forEach(function (cid) {
      if (seen[cid]) return; seen[cid] = 1; any = true;
      var c = CARD_TEXT[cid];
      h += '<div style="border-left:3px solid #E8B54A;padding:4px 9px;margin:5px 0">' + cardImg("fact", cid.length) + ' ' + esc(c.text) + ' <span class="sub" style="opacity:.6">from ' + esc(c.from) + ' ×' + cardHave(cid) + '</span></div>';
    });
    if (!any) h += '<div class="sub" style="opacity:.7">None yet.</div>';
    h += '<h3 style="margin:10px 0 4px">Materials</h3><div style="display:flex;gap:6px;flex-wrap:wrap">';
    var mats = matList();
    if (!mats.length) h += '<span class="sub" style="opacity:.7">Empty bins.</span>';
    mats.forEach(function (m) { h += '<span class="chip" style="border:1px solid #555;border-radius:14px;padding:2px 9px">' + cardImg(m, 2) + ' ' + esc(m) + ' ×' + matHave(m) + '</span>'; });
    h += '</div><h3 style="margin:10px 0 4px">Disputes carried</h3><div>';
    var anyD = false;
    E.CANON.CONCEPTS.forEach(function (c) {
      var n = disputes(c);
      if (n > 0) { anyD = true; h += '<span class="chip" style="border:1px solid #c96f6f;border-radius:14px;padding:2px 9px;margin:2px">' + cardImg("dispute", c.length) + ' ' + esc(c) + ' ×' + n + '</span>'; }
    });
    if (!anyD) h += '<span class="sub" style="opacity:.7">None. Two rival claims of one concept forge one.</span>';
    h += '</div>';
    return h;
  }
  function wire(els) {
    els.body.querySelectorAll("[data-bt]").forEach(function (b) { b.onclick = function () { tab = b.getAttribute("data-bt"); render(); }; });
    els.body.querySelectorAll("[data-diss]").forEach(function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-diss");
        if (b.getAttribute("data-armed")) { dissect(id); render(); return; }
        b.setAttribute("data-armed", "1");
        b.textContent = "Certain? Its gift sleeps until rebuilt.";
      };
    });
    els.body.querySelectorAll("[data-reasm]").forEach(function (b) {
      b.onclick = function () { reassemble(b.getAttribute("data-reasm")); render(); };
    });
    els.body.querySelectorAll("[data-pick]").forEach(function (s) {
      s.onchange = function () { picks[s.getAttribute("data-pick")] = s.value; render(); };
    });
    els.body.querySelectorAll("[data-mat]").forEach(function (b) {
      b.onclick = function () {
        var m = b.getAttribute("data-mat");
        var ix = picks.mats.indexOf(m);
        if (ix >= 0) picks.mats.splice(ix, 1);
        else if (picks.mats.length < 2) picks.mats.push(m);
        render();
      };
    });
    els.body.querySelectorAll("[data-forge]").forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-forge");
        if (k === "braid") { if (forgeBraided(picks.claimA, picks.claimB, picks.fact, picks.mats)) { picks.claimA = picks.claimB = picks.fact = ""; picks.mats = []; } }
        else if (k === "ground") { if (forgeGrounded(picks.gclaim, picks.gfact)) { picks.gclaim = picks.gfact = ""; } }
        else if (k === "dispute") { if (forgeDispute(picks.dclaimA, picks.dclaimB)) { picks.dclaimA = picks.dclaimB = ""; } }
        render();
      };
    });
    els.body.querySelectorAll("[data-refine]").forEach(function (b) {
      b.onclick = function () { refine(b.getAttribute("data-refine")); render(); };
    });
  }

  /* ── chip ── */
  function addChip() {
    var anchor = document.getElementById("btnV37Relics") || document.getElementById("btnGuide");
    if (!anchor || !anchor.parentNode || document.getElementById("btnV37Bench")) return;
    var b = document.createElement("button");
    b.className = "chip"; b.id = "btnV37Bench"; b.textContent = "Bench";
    b.setAttribute("aria-label", "Open the Assembly Bench: dissect objects into claims, facts, and materials, and forge new things");
    b.addEventListener("click", openBench);
    anchor.parentNode.insertBefore(b, anchor.nextSibling);
  }
  function boot() { indexCards(); bootExhibits(); addChip(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
