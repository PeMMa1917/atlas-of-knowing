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
 */

var TEACHER_PIN = "CHANGE-ME";   // <-- set your own before deploying

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
    if (body.kind === "snapshot") out = handleSnapshot(body);
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
    if (p.action === "pull") return json(pullAwards(p.email, Number(p.since) || 0));
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
  if (String(pin) !== String(TEACHER_PIN)) return { ok: false, error: "wrong pin" };
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
      Sessions: ["email", "start", "day", "minutes", "updated"]
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
    email, prof.first || "", prof.lastInit || "", prof.callsign || "",
    new Date(), s.level || 0, s.xp || 0, s.lumens || 0,
    (s.time && s.time.min) || 0, (s.days && s.days.n) || 0,
    (s.days && s.days.streak) || 0, (s.days && s.days.best) || 0,
    (s.journal && s.journal.total) || 0, (s.journal && s.journal.manual) || 0,
    (s.relics && s.relics.got) || 0, (s.relics && s.relics.sold) || 0,
    (s.trials && s.trials.stars) || 0, s.badges || 0,
    (s.explore && s.explore.visited) || 0, (body.road && body.road.chapter) || 0,
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
    rows.push([email, t, new Date(t), j.rung || 0, j.ctx || "", String(j.text || "").slice(0, 900)]);
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
      sh.getRange(i + 1, 4, 1, 2).setValues([[ses.min || 0, new Date()]]);
      return;
    }
  }
  sh.appendRow([email, ses.start, Utilities.formatDate(new Date(Number(ses.start)), Session.getScriptTimeZone(), "yyyy-MM-dd"), ses.min || 0, new Date()]);
}

/* ── awards ── */
function handleAward(body) {
  if (String(body.pin) !== String(TEACHER_PIN)) return { ok: false, error: "wrong pin" };
  var emails = body.email === "*" ? allEmails() : [String(body.email || "").toLowerCase().trim()];
  if (!emails.length || !emails[0]) return { ok: false, error: "no student" };
  var amount = Math.max(-100, Math.min(100, Number(body.amount) || 0));
  if (!amount) return { ok: false, error: "amount 0" };
  var sh = sheet_("Awards");
  var props = PropertiesService.getScriptProperties();
  var id = Number(props.getProperty("awardId")) || 0;
  emails.forEach(function (em) {
    id++;
    sh.appendRow([id, Date.now(), new Date(), em, amount, String(body.reason || "").slice(0, 200), String(body.msg || "").slice(0, 500), String(body.from || "teacher")]);
  });
  props.setProperty("awardId", String(id));
  return { ok: true, lastId: id, count: emails.length };
}

function pullAwards(email, since) {
  email = String(email || "").toLowerCase().trim();
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
