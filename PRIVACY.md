# Student data in The Atlas of Knowing

Plain language, for students, parents, colleagues, and anyone asked to approve this in a school.

## The short version

Play the game on your own and nothing leaves your computer. Your teacher can connect a class, and then four kinds of data travel to a Google Sheet **your teacher owns**, in your teacher's own Google account. No one else collects anything. There is no company behind this and no central database.

## What the game stores on your own device

The game saves progress in your browser (`localStorage`, under the key `tok_atlas_save_v3`): where you are in the world, objects found, journal entries, trial results, concept ladders. Clearing your browser data erases it. Nobody else can read it.

**A student with no class address never sends data anywhere.** This applies to anyone who opens the game from a public link and just plays.

## What travels when a class is connected

A teacher deploys the backend (`apps-script/Code.gs`) inside their own Google Sheet and hands out a class link. The game then sends, every few minutes and when the page closes:

| Data | Where it lands | Why |
|---|---|---|
| First name, last initial, school email, call sign | `Students` tab | So the teacher can tell whose row is whose |
| Progress figures: level, XP, minutes, days, streaks, objects, trial stars, badges, regions | `Students` tab | Pacing and coverage |
| Journal entries: the text you wrote, the rung, the context, the time | `Journals` tab | The teacher reads student writing, as in any exercise book |
| Session heartbeats: start, day, minutes | `Sessions` tab | Time analytics |
| Teacher point awards and messages | `Awards` tab | Sent by the teacher, delivered at next login |

Nothing else. No location, no device fingerprint, no browsing history, no analytics, no advertising, no third party.

## Who can see what

- **Your teacher** sees everything in their Sheet: names, emails, journals, all figures. They reach it through the dashboard (`teacher.html`) with a PIN checked inside their own Google account.
- **Classmates** see call signs only. Leaderboards inside the game carry a call sign and a number. They never carry a name or an email. This was checked against the live backend: the public `boards` response contains no email and no name.
- **Anyone else**: nothing, unless they hold the class link (see below).

## Honest limits

We would rather state these than let someone discover them.

- **The game file is public.** Anyone who plays it downloads it, so anything written inside it can be read. That is why the teacher's PIN and email live in the Apps Script backend rather than in the game. Treat any "secret" placed in the game file as published.
- **The class link is a key.** Whoever holds it can send progress data into that teacher's Sheet. Teachers who set `WRITE_TOKEN` in `Code.gs` require a second key on the link, so an address glimpsed on a projector cannot post. Reading the roster or journals always needs the teacher PIN, checked server-side.
- **Email is the heaviest piece of data here.** The game asks for a school email so the teacher can match a row to a person across devices. A teacher who does not need that can ask students to leave it out; the game still syncs by call sign, though a student who clears their browser cannot then be reconnected to their old row.
- **Google holds the data.** The Sheet, the Apps Script, and the logs live in the teacher's Google account and are governed by whatever agreement the school has with Google.

## Opting out

- **A student** can play without signing the ledger and without a class link. Progress stays on their machine. Nothing syncs.
- **A student who signed in** can ask their teacher to remove them. The teacher deletes the row in `Students`, the matching rows in `Journals` and `Sessions`, and any lines in `Awards`. That erases the record; the game keeps working.
- **A teacher** can shut the whole thing off by removing the Apps Script deployment. Students keep playing offline.

## For teachers setting this up

1. `TEACHER_PIN` in `Code.gs`: change it before deploying. It guards every read of student data.
2. `WRITE_TOKEN` in `Code.gs`: set it, then hand out the link as `...?class=<web app URL>&t=<token>`. Without it, anyone with the class address can write to your Sheet.
3. Never put an email address, a PIN, or a token into `index.html` or anything under `src/`. Those files are served to every student.
4. Editing `Code.gs` does not change what is live. Deploy > Manage deployments > pencil > Version: New version > Deploy.
5. Tell your students what this document says. They are the ones whose writing is being collected.
