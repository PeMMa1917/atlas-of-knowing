/**
 * THE ATLAS OF KNOWING · CLASSROOM BACKEND (Code.gs) · v37
 * ---------------------------------------------------------
 * Lives inside a Google Sheet (Extensions > Apps Script).
 * The Sheet becomes the class database, which also means
 * "export to Google Drive/Sheets" is automatic: the data
 * already lives there, one tab per table.
 *
 * SETUP (once, about five minutes):
 *  1. Create a new Google Sheet. Name it e.g. "TOK Atlas Class".
 *  2. Extensions > Apps Script. Delete the sample code, paste this file.
 *  3. Change TEACHER_PIN below to your own 4-8 digit code.
 *  4. Deploy > New deployment > Web app.
 *       Execute as: Me. Who has access: Anyone.
 *     Copy the web app URL. This URL is the "class address".
 *  5. Give students the game link with ?class=<web app URL> appended,
 *     or let them paste the URL into the Class chip in the game.
 *  6. Open teacher.html, paste the same URL and your PIN.
 *
 * TABS the script creates on first contact:
 *  Students  - one live row per student (latest snapshot)
 *  Journals  - every journal entry, append-only
 *  Awards    - teacher point awards with messages
 *  Sessions  - session heartbeats for time analytics
 *  Errors    - crash reports from student devices
 *
 * UPDATING: paste the new file over the old one, then
 * Deploy > Manage deployments > edit (pencil) > New version.
 * The web app URL stays the same.
 */

var TEACHER_PIN = "CHANGE-ME";   // <-- set your own before deploying

/* WRITE_TOKEN: a second key, carried by the class link you hand out.
   Anything writing to the Sheet must present it, so a class address copied
   off a projected screen cannot post fake students or junk journal entries.
   Leave it "" and writes stay open to anyone holding the address.
   Set it, then give students the link with &t=<token> on the end:
     https://<pages>/?class=<web app URL>&t=<token>
   Teacher awards from teacher.html use TEACHER_PIN instead, not this. */
var WRITE_TOKEN = "";

/* ── input hygiene ── */
function clean_(s, n) {
  s = String(s == null ? "" : s).slice(0, n || 200);
  /* a leading = + - @ or tab reads as a formula once it lands in a cell
     (or an exported sheet); the apostrophe pins it as plain text */
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}
function num_(v, lo, hi) {
  v = Number(v); if (!isFinite(v)) v = 0;
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

/* ── wrong-PIN throttle: twenty misses lock PIN routes for an hour ── */
function pinOk_(pin) {
  var cache = CacheService.getScriptCache();
  var fails = Number(cache.get("pinFails") || 0);
  if (fails >= 20) return "locked";
  if (String(pin) === String(TEACHER_PIN)) { cache.remove("pinFails"); return "ok"; }
  cache.put("pinFails", String(fails + 1), 3600);
  return "no";
}

/* ── one key per student: the first save to write an email keeps it.
      A fresh save claiming the same email is turned away until the
      teacher presses "Reset key" on that row in the Chartroom. ── */
function authOk_(email, auth) {
  auth = String(auth || "").slice(0, 80);
  if (!auth) return false;
  var props = PropertiesService.getScriptProperties();
  var stored = props.getProperty("sec_" + email);
  if (!stored) { props.setProperty("sec_" + email, auth); return true; }
  return stored === auth;
}

var STUDENT_COLS = [
  "email", "first", "lastInit", "callsign", "updated", "level", "xp", "lumens",
  "minutes", "daysPlayed", "streak", "bestStreak", "journalTotal", "journalManual",
  "relicsGot", "relicsSold", "trialStars", "badges", "regionsVisited", "roadChapter",
  "standingsJson"
];

function doPost(e) {
  var out = { ok: false };
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.kind === "snapshot" || body.kind === "errors") {
      if (WRITE_TOKEN && String(body.token || "") !== String(WRITE_TOKEN)) out = { ok: false, error: "bad token" };
      else out = body.kind === "errors" ? handleErrors(body) : handleSnapshot(body);
    }
    else if (body.kind === "award") out = handleAward(body);
    else out.error = "unknown kind";
  } catch (err) {
    out.error = String(err);
  }
  return json(out);
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.action === "ping") return json({ ok: true, at: Date.now() });
    /* the game asks here whether a typed code is the teacher PIN, so the PIN
       stays in this account and never ships inside the public game file */
    if (p.action === "teachcheck") return json({ ok: pinOk_(p.pin || "") === "ok" });
    if (p.action === "pull") return json(pullAwards(p.email, Number(p.since) || 0, p.auth));
    if (p.action === "resetkey") return json(withPin(p.pin, function () {
      PropertiesService.getScriptProperties().deleteProperty("sec_" + String(p.email || "").toLowerCase().trim());
      return { ok: true };
    }));
    if (p.action === "boards") return json(classBoards());
    if (p.action === "roster") return json(withPin(p.pin, roster));
    if (p.action === "journal") return json(withPin(p.pin, function () { return journalOf(p.email); }));
    if (p.action === "awardlog") return json(withPin(p.pin, awardLog));
    if (p.action === "sessions") return json(withPin(p.pin, sessionsAll));
    if (p.action === "meta") return json(withPin(p.pin, function () {
      return { ok: true, sheetUrl: SpreadsheetApp.getActive().getUrl(), students: sheet_("Students").getLastRow() - 1 };
    }));
    return json({ ok: false, error: "unknown action" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function withPin(pin, fn) {
  var v = pinOk_(pin);
  if (v === "locked") return { ok: false, error: "too many wrong PINs; locked for an hour" };
  if (v !== "ok") return { ok: false, error: "wrong pin" };
  return fn();
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_(name) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    var head = {
      Students: STUDENT_COLS,
      Journals: ["email", "t", "when", "rung", "ctx", "text"],
      Awards: ["id", "t", "when", "email", "amount", "reason", "msg", "from"],
      Sessions: ["email", "start", "day", "minutes", "updated"],
      Errors: ["email", "when", "message", "source", "line", "stack", "ua"]
    }[name];
    if (head) { sh.appendRow(head); sh.setFrozenRows(1); }
  }
  return sh;
}

/* ── snapshot intake ── */
function handleSnapshot(body) {
  var s = body.standings || {};
  var prof = s.profile || {};
  var email = String(prof.email || "").toLowerCase().trim();
  if (!email) return { ok: false, error: "no email in profile" };

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (!authOk_(email, body.auth)) return { ok: false, error: "locked" };
    upsertStudent(email, prof, s, body);
    appendJournals(email, body.journal || []);
    upsertSession(email, body.session || {});
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}

function upsertStudent(email, prof, s, body) {
  var sh = sheet_("Students");
  var data = sh.getDataRange().getValues();
  var rowIx = -1;
  for (var i = 1; i < data.length; i++) if (String(data[i][0]).toLowerCase() === email) { rowIx = i + 1; break; }
  var row = [
    clean_(email, 120), clean_(prof.first, 40), clean_(prof.lastInit, 4), clean_(prof.callsign, 24),
    new Date(), num_(s.level, 0, 999), num_(s.xp, 0, 1e7), num_(s.lumens, 0, 1e7),
    num_(s.time && s.time.min, 0, 1e6), num_(s.days && s.days.n, 0, 3650),
    num_(s.days && s.days.streak, 0, 3650), num_(s.days && s.days.best, 0, 3650),
    num_(s.journal && s.journal.total, 0, 1e5), num_(s.journal && s.journal.manual, 0, 1e5),
    num_(s.relics && s.relics.got, 0, 1e4), num_(s.relics && s.relics.sold, 0, 1e4),
    num_(s.trials && s.trials.stars, 0, 1e5), num_(s.badges, 0, 1e4),
    num_(s.explore && s.explore.visited, 0, 999), num_(body.road && body.road.chapter, 0, 12),
    JSON.stringify({ standings: s, relics: body.relics || [], badges: body.badges || [] }).slice(0, 45000)
  ];
  if (rowIx > 0) sh.getRange(rowIx, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
}

function appendJournals(email, entries) {
  if (!entries.length) return;
  var sh = sheet_("Journals");
  var last = 0;
  var props = PropertiesService.getScriptProperties();
  var key = "jmax_" + email;
  last = Number(props.getProperty(key)) || 0;
  var rows = [];
  entries.forEach(function (j) {
    var t = Number(j.t) || 0;
    if (t <= last) return;
    rows.push([email, t, new Date(t), num_(j.rung, 0, 5), clean_(j.ctx, 80), clean_(j.text, 900)]);
  });
  if (rows.length) {
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
    props.setProperty(key, String(rows[rows.length - 1][1]));
  }
}

function upsertSession(email, ses) {
  if (!ses.start) return;
  var sh = sheet_("Sessions");
  var data = sh.getDataRange().getValues();
  for (var i = data.length - 1; i >= 1; i--) {
    if (String(data[i][0]).toLowerCase() === email && Number(data[i][1]) === Number(ses.start)) {
      sh.getRange(i + 1, 4, 1, 2).setValues([[num_(ses.min, 0, 1440), new Date()]]);
      return;
    }
  }
  sh.appendRow([email, ses.start, Utilities.formatDate(new Date(Number(ses.start)), Session.getScriptTimeZone(), "yyyy-MM-dd"), num_(ses.min, 0, 1440), new Date()]);
}

/* ── crash reports from the game, capped so junk cannot flood the tab ── */
function handleErrors(body) {
  var sh = sheet_("Errors");
  if (sh.getLastRow() > 4000) return { ok: true, capped: true };
  var rows = [];
  (Array.isArray(body.errors) ? body.errors : []).slice(0, 5).forEach(function (er) {
    er = er || {};
    rows.push([
      clean_(String(body.email || "").toLowerCase(), 120), new Date(),
      clean_(er.msg, 300), clean_(er.src, 200), num_(er.line, 0, 1e6),
      clean_(er.stack, 500), clean_(body.ua, 200)
    ]);
  });
  if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  return { ok: true };
}

/* ── awards ── */
function handleAward(body) {
  var v = pinOk_(body.pin);
  if (v === "locked") return { ok: false, error: "too many wrong PINs; locked for an hour" };
  if (v !== "ok") return { ok: false, error: "wrong pin" };
  var emails = body.email === "*" ? allEmails() : [String(body.email || "").toLowerCase().trim()];
  if (!emails.length || !emails[0]) return { ok: false, error: "no student" };
  var amount = Math.max(-100, Math.min(100, Number(body.amount) || 0));
  if (!amount) return { ok: false, error: "amount 0" };
  var sh = sheet_("Awards");
  var props = PropertiesService.getScriptProperties();
  var id = Number(props.getProperty("awardId")) || 0;
  emails.forEach(function (em) {
    id++;
    sh.appendRow([id, Date.now(), new Date(), em, amount, clean_(body.reason, 200), clean_(body.msg, 500), clean_(body.from || "teacher", 40)]);
  });
  props.setProperty("awardId", String(id));
  return { ok: true, lastId: id, count: emails.length };
}

function pullAwards(email, since, auth) {
  email = String(email || "").toLowerCase().trim();
  if (!email) return { ok: false, error: "no email" };
  /* awards carry personal teacher messages, so reading them takes the
     same per-student key that writing the snapshot does */
  if (!authOk_(email, auth)) return { ok: false, error: "locked" };
  var sh = sheet_("Awards");
  var data = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][3]).toLowerCase() !== email) continue;
    if (Number(data[i][0]) <= since) continue;
    out.push({ id: Number(data[i][0]), t: Number(data[i][1]), amount: Number(data[i][4]), reason: data[i][5], msg: data[i][6] });
  }
  return { ok: true, awards: out.slice(0, 20) };
}

function awardLog() {
  var data = sheet_("Awards").getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    out.push({ id: data[i][0], when: data[i][2], email: data[i][3], amount: data[i][4], reason: data[i][5], msg: data[i][6] });
  }
  return { ok: true, rows: out.reverse().slice(0, 300) };
}

function allEmails() {
  var data = sheet_("Students").getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) if (data[i][0]) out.push(String(data[i][0]).toLowerCase());
  return out;
}

/* ── boards for students: call signs only, no names, no emails ── */
function classBoards() {
  var data = sheet_("Students").getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var blob = {};
    try { blob = JSON.parse(data[i][STUDENT_COLS.length - 1] || "{}"); } catch (e) {}
    var st = blob.standings || {};
    if (st.profile) st.profile = { callsign: st.profile.callsign || "" };
    rows.push({ callsign: data[i][3] || "unsigned", standings: st });
  }
  return { ok: true, rows: rows };
}

/* ── teacher roster: everything ── */
function roster() {
  var data = sheet_("Students").getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var r = {};
    STUDENT_COLS.forEach(function (c, ix) { r[c] = data[i][ix]; });
    try {
      var blob = JSON.parse(r.standingsJson || "{}");
      r.standings = blob.standings || {};
      r.relicIds = blob.relics || [];
      r.badgeIds = blob.badges || [];
    } catch (e) { r.standings = {}; r.relicIds = []; r.badgeIds = []; }
    delete r.standingsJson;
    rows.push(r);
  }
  return { ok: true, rows: rows };
}

function journalOf(email) {
  email = String(email || "").toLowerCase().trim();
  var data = sheet_("Journals").getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() !== email) continue;
    out.push({ t: data[i][1], when: data[i][2], rung: data[i][3], ctx: data[i][4], text: data[i][5] });
  }
  return { ok: true, rows: out.slice(-400) };
}

function sessionsAll() {
  var data = sheet_("Sessions").getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    out.push({ email: data[i][0], start: data[i][1], day: data[i][2], minutes: data[i][3] });
  }
  return { ok: true, rows: out.slice(-2000) };
}
