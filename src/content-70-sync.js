/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · CLASSROOM SYNC (content-70)
   v37. Load after content-68 (and 71). Connects the game to a Google
   Apps Script web app backed by the teacher's own Google Sheet.

   WHAT RIDES THE WIRE
   · Outbound, every few minutes and on page hide: the standings snapshot
     from content-68, plus recent journal entries and session heartbeats.
     Data goes only to the teacher's script URL, nowhere else.
   · Inbound: teacher point awards with messages. Each unseen award fires
     the engine's own xp_award seam (Stage 9 already listens), then shows
     the teacher's note at login, as asked.
   · Class leaderboards: real classmate rows (call signs only) replace
     the Guild ghosts in the Hall of Records once the class connects.

   IDENTITY
   First visit with a class URL configured asks for first name, last
   initial, school email, and call sign, states plainly where the data
   goes, and stores it in save flags. The call sign walks through the
   Steward's own validator when available. No em dashes.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.V37_RECORDS) { try { console.warn("[sync] records pack missing"); } catch (e) {} return; }
  function SD() { return E.getState().data; }
  function FL() { return SD().flags; }
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function save() { try { E.scheduleSave(); } catch (e) {} }
  function toast(m) { try { E.toast(m); } catch (e) {} }

  /* ── config: the class URL ── */
  function classUrl() {
    if (typeof window.ATLAS_SYNC_URL === "string" && window.ATLAS_SYNC_URL.indexOf("http") === 0) return window.ATLAS_SYNC_URL;
    var f = String(FL().v37_sync_url || "");
    return f.indexOf("http") === 0 ? f : "";
  }
  /* the write token: a second key the class link carries. Snapshots without
     it bounce, so an address copied off a projected screen cannot post. */
  function classToken() { return String(FL().v37_sync_token || ""); }
  (function readParam() {
    try {
      var m = /[?&]class=([^&]+)/.exec(location.search || "");
      if (m) {
        var url = decodeURIComponent(m[1]);
        if (url.indexOf("https://script.google.com/") === 0) { FL().v37_sync_url = url; save(); }
      }
      var tk = /[?&]t=([^&]+)/.exec(location.search || "");
      if (tk) { FL().v37_sync_token = decodeURIComponent(tk[1]); save(); }
    } catch (e) {}
  })();
  /* the ledger card in the base game asks the class desk about teacher PINs */
  window.V37_SYNC = { classUrl: classUrl, classToken: classToken };

  /* ── identity ── */
  function profile() { return E.V37_RECORDS.readProfile(); }
  function profileComplete(p) { return p.first && p.lastInit && p.email && p.callsign; }
  function askIdentity(force) {
    if (document.getElementById("v37idwrap")) return;
    var p = profile();
    if (!force && profileComplete(p)) return;
    var wrap = document.createElement("div");
    wrap.id = "v37idwrap";
    wrap.style.cssText = "position:fixed;inset:0;background:rgba(8,6,14,.82);z-index:9000;display:flex;align-items:center;justify-content:center;padding:16px";
    wrap.innerHTML = '<div style="background:#1A1626;border:1px solid #6B5786;border-radius:12px;max-width:440px;width:100%;padding:18px;color:#E8E3F0;font-family:inherit">' +
      '<h2 style="margin:0 0 6px">Sign the Guild ledger</h2>' +
      '<div style="opacity:.8;font-size:.9em;margin-bottom:10px">Your class is connected. These four lines go to your teacher\'s class sheet and nowhere else. Boards in the game show only your call sign.</div>' +
      '<label style="display:block;margin:6px 0">First name<br><input id="v37idf" value="' + esc(p.first) + '" style="width:100%"></label>' +
      '<label style="display:block;margin:6px 0">Last initial<br><input id="v37idl" maxlength="1" value="' + esc(p.lastInit) + '" style="width:60px"></label>' +
      '<label style="display:block;margin:6px 0">School email<br><input id="v37ide" type="email" value="' + esc(p.email) + '" style="width:100%"></label>' +
      '<label style="display:block;margin:6px 0">Call sign <span style="opacity:.6">(letters, 3 to 16, never a full name)</span><br><input id="v37idc" value="' + esc(p.callsign) + '" style="width:100%"></label>' +
      '<div id="v37iderr" style="color:#c96f6f;min-height:18px;font-size:.85em"></div>' +
      '<div style="display:flex;gap:8px;margin-top:8px">' +
      '<button class="btn gold" id="v37idgo" style="padding:8px 14px">Sign</button>' +
      '<button class="btn" id="v37idlater" style="padding:8px 14px">Later</button></div></div>';
    document.body.appendChild(wrap);
    document.getElementById("v37idlater").onclick = function () { wrap.remove(); };
    document.getElementById("v37idgo").onclick = function () {
      var first = document.getElementById("v37idf").value.trim();
      var lastI = document.getElementById("v37idl").value.trim().toUpperCase();
      var email = document.getElementById("v37ide").value.trim();
      var call = document.getElementById("v37idc").value.trim();
      var err = document.getElementById("v37iderr");
      if (!first) { err.textContent = "First name, please."; return; }
      if (!/^[A-Za-z]$/.test(lastI)) { err.textContent = "Last initial: one letter."; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = "The email wants a full address."; return; }
      try {
        if (E.COMMON && E.COMMON.validateCallsign) {
          var v = E.COMMON.validateCallsign(call);
          if (!v.ok) { err.textContent = v.why; return; }
        } else if (!/^[A-Za-z][A-Za-z0-9]{2,15}$/.test(call)) { err.textContent = "Call sign: letters and digits, 3 to 16, starting with a letter."; return; }
      } catch (e2) {}
      FL().v37_p_first = first; FL().v37_p_lastinit = lastI;
      FL().v37_p_email = email.toLowerCase(); FL().v37_p_callsign = call;
      /* the base game keeps the call sign on the avatar and gates its naming
         ceremony on named_ceremony. Write both, or the Ledger of Names asks
         the same question a second time. */
      try {
        var d = SD();
        if (d.avatar && !d.avatar.name) {
          d.avatar.name = call;
          FL().named_ceremony = true;
          try { if (window.updateHud) window.updateHud(); } catch (e3) {}
          try { if (window.checkBadges) window.checkBadges(); } catch (e4) {}
        }
      } catch (e5) {}
      save();
      wrap.remove();
      toast("Signed. The Chartroom knows " + call + " now.");
      pushSoon(400);
    };
  }

  /* ── transport: simple requests only, no preflight ── */
  function post(payload, cb) {
    var url = classUrl(); if (!url) return;
    try {
      payload = Object.assign({}, payload, { token: classToken() });
      fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
        .then(function (r) { return r.json(); }).then(function (j) { if (cb) cb(j); })
        .catch(function () { if (cb) cb(null); });
    } catch (e) { if (cb) cb(null); }
  }
  function get(params, cb) {
    var url = classUrl(); if (!url) return;
    var q = Object.keys(params).map(function (k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
    try {
      fetch(url + (url.indexOf("?") > 0 ? "&" : "?") + q)
        .then(function (r) { return r.json(); }).then(function (j) { cb(j); })
        .catch(function () { cb(null); });
    } catch (e) { cb(null); }
  }

  /* ── outbound: snapshot + journal + session ── */
  var sessionStart = Date.now(), lastPushHash = "", pushTimer = null;
  function snapshotPayload(reason) {
    var s = E.V37_RECORDS.standings();
    var journal = [];
    try {
      (SD().journal || []).slice(-150).forEach(function (j) {
        journal.push({ t: j.t, rung: j.rung | 0, ctx: String(j.ctx || "").slice(0, 60), text: String(j.text || "").slice(0, 400) });
      });
    } catch (e) {}
    var badges = [];
    try {
      var b = SD().badges;
      if (Array.isArray(b)) badges = b.slice(0, 500);
      else if (b && typeof b === "object") badges = Object.keys(b).slice(0, 500);
    } catch (e) {}
    var relicIds = [];
    try { E.RELIQUARY.list.forEach(function (o) { if (E.V37.got(o.id)) relicIds.push(o.id); }); } catch (e) {}
    return {
      kind: "snapshot", reason: reason || "tick",
      session: { start: sessionStart, min: Math.round((Date.now() - sessionStart) / 60000) },
      standings: s, journal: journal, badges: badges, relics: relicIds,
      road: { chapter: (E.V37_ROAD ? E.V37_ROAD.chapterAt() : 0) }
    };
  }
  function pushNow(reason) {
    var p = profile();
    if (!classUrl() || !p.email) return;
    var payload = snapshotPayload(reason);
    var h = JSON.stringify(payload.standings).length + ":" + payload.journal.length + ":" + payload.relics.length;
    if (reason === "tick" && h === lastPushHash) return;
    lastPushHash = h;
    post(payload, function (j) {
      if (j && j.ok) FL().v37_last_push = Date.now();
    });
  }
  function pushSoon(ms) { clearTimeout(pushTimer); pushTimer = setTimeout(function () { pushNow("event"); }, ms || 1500); }
  ["v37_relic", "v37_trial", "journal", "coverage"].forEach(function (evt) {
    E.on(evt, function () { pushSoon(4000); });
  });
  setInterval(function () { pushNow("tick"); }, 240000);
  window.addEventListener("pagehide", function () {
    var url = classUrl(), p = profile();
    if (!url || !p.email || !navigator.sendBeacon) return;
    try { navigator.sendBeacon(url, JSON.stringify(snapshotPayload("bye"))); } catch (e) {}
  });

  /* ── inbound: awards with teacher messages ── */
  function checkAwards(atLogin) {
    var p = profile();
    if (!classUrl() || !p.email) return;
    get({ action: "pull", email: p.email, since: String(FL().v37_award_last || 0) }, function (j) {
      if (!j || !j.ok || !j.awards || !j.awards.length) return;
      var maxId = Number(FL().v37_award_last || 0);
      j.awards.forEach(function (a, ix) {
        var id = Number(a.id) || 0;
        if (id <= maxId) return;
        maxId = Math.max(maxId, id);
        setTimeout(function () {
          try { E.emit("xp_award", { amount: a.amount | 0, reason: String(a.reason || "class note") }); } catch (e) {}
          var sign = (a.amount | 0) > 0 ? "+" : "";
          try {
            E.openVignette("A note from your teacher",
              sign + (a.amount | 0) + " XP · " + String(a.reason || "") +
              (a.msg ? "\n\n“" + String(a.msg).slice(0, 400) + "”" : "") +
              "\n\nThe Warden's Desk logs every mark with its reason.");
          } catch (e) {}
        }, 600 + ix * 1200);
      });
      FL().v37_award_last = maxId;
      save();
    });
  }
  setInterval(function () { checkAwards(false); }, 180000);

  /* ── class boards for the Hall of Records ── */
  function fetchBoards() {
    if (!classUrl()) return;
    get({ action: "boards" }, function (j) {
      if (j && j.ok && Array.isArray(j.rows)) {
        window.V37_CLASSROWS = j.rows;
      }
    });
  }
  setInterval(fetchBoards, 300000);

  /* ── connect chip ── */
  function addChip() {
    var anchor = document.getElementById("btnV37Road") || document.getElementById("btnGuide");
    if (!anchor || !anchor.parentNode || document.getElementById("btnV37Class")) return;
    var b = document.createElement("button");
    b.className = "chip"; b.id = "btnV37Class";
    var connected = !!classUrl();
    b.textContent = connected ? (profileComplete(profile()) ? "Class ✓" : "Class: sign in") : "Class";
    b.setAttribute("aria-label", "Classroom link: sign the ledger or paste your class address");
    b.addEventListener("click", function () {
      if (classUrl()) { askIdentity(true); return; }
      var url = prompt("Paste the class address your teacher shared (a script.google.com link):", "");
      if (url && url.trim().indexOf("https://script.google.com/") === 0) {
        url = url.trim();
        var tm = /[?&]t=([^&]+)/.exec(url);
        if (tm) { FL().v37_sync_token = decodeURIComponent(tm[1]); url = url.replace(/([?&])t=[^&]*/, "$1").replace(/[?&]$/, ""); }
        FL().v37_sync_url = url; save();
        b.textContent = "Class: sign in";
        askIdentity(true);
      } else if (url) toast("The address should start with https://script.google.com/");
    });
    anchor.parentNode.insertBefore(b, anchor.nextSibling);
  }

  function boot() {
    addChip();
    if (classUrl()) {
      setTimeout(function () { askIdentity(false); }, 1200);
      setTimeout(function () { checkAwards(true); fetchBoards(); pushNow("login"); }, 2500);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
