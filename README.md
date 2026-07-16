# The Atlas of Knowing · v37

Build 37 of the open-world Theory of Knowledge game, plus a classroom backend and a teacher dashboard. Everything in this folder ships together.

## Folder map

| File | Purpose |
|---|---|
| `index.html` | The full game, one file, no dependencies. Students only need this. |
| `teacher.html` | The Warden's Chartroom: roster, metrics, journals, leaderboards, point awards, exports. |
| `apps-script/Code.gs` | The classroom backend. Lives inside your Google Sheet. |
| `data/objects/*.json` | The 522 objects, in editable batches. Source of truth. |
| `data/objects-master.json` | Merged copy, read by `teacher.html` for object names. |
| `exports/TOK-Atlas-Objects-v37.xlsx` (and `.csv`) | The research spreadsheet: name, game location, description, KQ connections, MLA links, and dissection components. |
| `sprites-preview.html` | Contact sheet of all 522 generated pixel sprites, with search and filters. |
| `src/*.js` | The seven v37 content packs, already baked into `index.html`. |
| `build.js` | Rebuilds `index.html` from `src/` + `data/` after edits. Run: `node build.js` |
| `test/smoke.js` | Boot test against a mocked engine. Run: `node test/smoke.js` |
| `test/harness.js` | Headless playthrough of keys, panels, dialogues, pickups, duels, trials, and saves. Run: `npm i jsdom && node test/harness.js` |

## Quick start, no hosting

Double-click `index.html`. The game runs fully offline. Saves stay in the browser under the same key as v36, so existing student saves carry forward untouched.

## Host on GitHub Pages, embed in Google Sites

1. Create a GitHub repository (public), upload this whole folder.
2. Repository Settings > Pages > Deploy from branch > `main`, folder `/ (root)`.
3. Your game address becomes `https://<username>.github.io/<repo>/` and the dashboard sits at `.../teacher.html`.
4. In Google Sites: Insert > Embed > by URL > paste the game address. Set the frame as large as the page allows; the game fits itself to the frame.

To update later: edit files, push, and Pages redeploys on its own.

## Classroom backend, about five minutes

1. Create a Google Sheet named something like `TOK Atlas Class`.
2. Extensions > Apps Script. Delete the sample code. Paste in `apps-script/Code.gs`.
3. Near the top, change `TEACHER_PIN = "CHANGE-ME"` to your own code.
4. Deploy > New deployment > type: Web app. Execute as: **Me**. Who has access: **Anyone**. Authorize when asked.
5. Copy the web app URL. This URL is the **class address**.

Give students the game link with the address attached once:

```
https://<your-pages-address>/?class=<web app URL>
```

The game stores the address in the save, asks each student for first name, last initial, school email, and a call sign, and starts syncing. Students can also paste the address by hand through the **Class** chip in the game menu.

The Sheet fills itself: `Students` (live roster), `Journals`, `Awards`, `Sessions`. Since the data already lives in Google Drive, Sheets export needs no extra step. File > Download covers Excel and PDF from there as well.

## The teacher dashboard

Open `teacher.html`, paste the class address and your PIN, Connect.

- **Roster**: email, first name, last initial, call sign, level, XP, minutes, days, streaks, journal counts, objects, trial stars, badges, regions, Road chapter, last active. Tap any row for the full chart.
- **Student**: every metric group from the spec: concept distribution and per-concept insight, framework element balance, subject matrix, syllabus family footprint, rung distribution with manual/auto/edit counts and voice register, epistemic stances (vantage vs quick, appraisal record, honest declines, argument moves, oaths), assessment pipelines (exhibition triptychs, IA prompt coverage, essay scaffold state, citation drills), pacing (sessions, average minutes per day, weeks active), objects found by name, badges, and the full Living Journal.
- **Signals** on each student flag likely sticking points: speed bias, thin independent writing, missing rung 4 to 5 entries, cold concepts, never declining, narrow trial variety, broken streaks.
- **Leaderboards**: every board the students see, joined to full names and emails on your side only.
- **Points & Messages**: give or take up to 100 XP per student or whole class, with a reason and a personal message. Delivery happens at the student's next login, through the game's own award seam, and lands in their journal with the reason attached.
- **Exports**: one-click CSV or Excel per table, a whole-class Excel workbook, the live Google Sheet link, and Print for PDF or pasting into a Doc.

Privacy note: student-facing boards show call signs only. Names and emails appear only in the Sheet and the dashboard.

## What v37 adds inside the game

- **522 objects** with knowledge questions, suggested answers, effects, and rarity tiers, placed across every region: in the open, hidden in caches, held by characters, sold at the Exchange, won from trials, and sealed in chambers. The Search chip turns any region into a scavenging ground; claims ask the student to name the concept first.
- **A unique pixel sprite for every object**, generated inside the game from the object's id: template from its type, hue from its concept, accent from its rarity, jitter from its hash. Sprites appear on collection (a splash card), in the Reliquary Record, Field Search, the Exchange, the Bandolier, and the Bench. `sprites-preview.html` shows the whole set on one page. Each item's card carries what it is, where it was found, why it matters for knowledge, and MLA research links.
- **The Assembly Bench** (Bench chip): dissect an owned object into two knowledge claim cards, one dated historical fact card, and raw materials read from its pixel form. Broken objects lose their gift, keys included, until reassembled for a fee (epic and legendary want a refined material). Assemble parts into new things: a Braided Exhibit (two claims from different concepts pinned to a fact, the exhibition move in miniature), a Grounded Claim (claim + fact, same concept), a Dispute Card (two rival claims of one concept; Cipher trials draw extra reveals from carried disputes), and Refined Materials (three of a kind become one finer). Everything feeds concept insight, coverage rows, and the crafting leaderboard.
- **The Bandolier**: carry five objects at most; only carried objects grant gifts (Vigor, trial bonuses, abilities, routes, Perspective Tokens). Deck choice becomes strategy, mirroring the Exhibition's choose-three discipline.
- **The Exchange**: floating daily prices; selling pays lumens and removes the gift forever, keys included.
- **Doors and chambers**: key objects open twelve locked chambers, metroidvania style. Wrong entry bounces you back with the shopping list.
- **Fourteen trial families** (Trials+ · I): hidden-object sweeps, argument forging, perspective matching, justification scales, cipher cracking, Socratic returns, sequence memory, lever logic, slide restoration, fallacy volleys, shifting mazes, a coyote-time platformer, sightline stealth, and turn-based matchup tactics. Every instance carries a concept, a framework element, and a knowledge question, pays concept insight, and debriefs with a takeaway. Tutorials live in the Proving Grounds before the world offers stern versions.
- **The Concept Forge**: twelve concept ladders. Every tagged action anywhere in the Atlas feeds the concept the action exercises; tiers run Apprentice to Luminary.
- **Hall of Records** (the Records chip): leaderboards for total points, each concept, each element, perspectives, crafting, finding, conversations, exploration by region and overall, minutes, daily and weekly flames, journal entries, and trial stars. Offline, labeled pace-setter ghosts hold the bar; connected, real classmates replace them, call signs only.
- **The Reliquary Road**: a twelve-chapter arc, one per concept, each braiding a trial, an object set, and a journal rung, ending in a rehearsal triptych: three objects, one question, one defense.
- **Seven new regions**: the Grand Reliquary hub, five themed vaults, and the Proving Grounds, each with lore plaques and one silent room told through furniture alone.

## Editing the objects, or adding more

1. Edit any `data/objects/b6*.json` (the OBJECT-BRIEF.md in `data/` holds the schema and style law).
2. Run `node build.js`. The script validates ids, tags, doors, placements, and the banned-word list, regenerates the data pack, and rebuilds `index.html`.
3. Run `node test/smoke.js` for the green wall.
4. Regenerate the spreadsheet if wanted (the build prints counts; the xlsx script lives in the session notes, or ask Claude to re-run it).

## Object images

Objects use generated pixel art rather than photographs: no files to source, no copyright questions, and every sprite stays unique and consistent per object. Open `sprites-preview.html` for the full contact sheet. The batch JSONs still hold the 29 Wikimedia Commons category links gathered earlier (in each object's `img` field) in case photo references become useful later; the game and spreadsheet no longer depend on them.

## Save compatibility

v37 keeps the single save key (`tok_atlas_save_v3`) and adds only flag entries, so v36 saves load unchanged and the migrator stays untouched.
