# IB English A: Language & Literature — Activity Explorer v3

A revision tool for IB Lang & Lit students: **3,325 practice activities** across Paper 1, Paper 2, the Individual Oral, and general study skills, filtered live from a Google Sheet. No Apps Script, no backend — the page fetches the sheet directly on every load.

An independent classroom project: no affiliation with, and no endorsement by, the International Baccalaureate.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app, one file. Point `SHEET_ID` at your Google Sheet and host anywhere static. |
| `IB_LangLit_Master_Activity_Database_v3.xlsx` | The activity database (Activities + Read Me tabs). Import into Google Sheets to power the app. |
| `IB_LangLit_Master_Activity_Database_v3.csv` | Same data as CSV, if you prefer importing that. |
| `tools/` | The Python pipeline that built the database, plus the Playwright test suite. |

## Setup (teacher, once)

1. In Google Sheets: **File → Import → Upload** → the v3 `.xlsx` → *Replace spreadsheet* (or replace just the `Activities` tab). Keep the tab named exactly **Activities**, headers in row 1.
2. Share → **Anyone with the link — Viewer**.
3. In `index.html`, set `SHEET_ID` to the ID from the sheet URL (`docs.google.com/spreadsheets/d/`**`SHEET_ID`**`/edit`). The current value already points at the class sheet.
4. Host `index.html` (GitHub Pages — this repo's Pages deploy serves it at `/ib-lang-lit/` — or Netlify Drop), then embed in Google Sites via **Insert → Embed**. Suggested iframe height: 1100px.

Students always see the latest sheet data — edit cells, add rows, and reload.

## What's new in v3

- **Header-name column matching.** The app finds columns by header text, not position — reorder or add columns freely. (v2 read by fixed position and silently mis-read sheets whose column order differed.) It still reads the original 12-column sheet, deriving the missing fields.
- **19 dynamic filters** in four groups — assessment, cross-assessment scope, text/work focus, criterion; category, skill focus, text type, activity type; session use, time, exam proximity, energy, materials; difficulty, support level, "I want help with…", style preference, format, location — plus **keyword search**. Filters gray out options that would give zero results, show live option counts, and hide entirely when the sheet has no data for them.
- **"Style Preference"** (formerly Learning Style) with the 15 canonical values: Visual, Spatial, Auditory, Reading, Writing, Kinesthetic, Verbal, Linguistic, Logical, Analytical, Social/Interpersonal, Solitary, Intrapersonal, Naturalist, Multimodal. Legacy abbreviations (`R/W`, `Sol`, `An`, …) are normalized automatically.
- **Quick-start presets** for common situations ("I don't know where to start", "Exam is tomorrow", "Revise 2+ assessments at once", …).
- **Student-support fields on every card**: why the activity helps, success criteria, and a concrete "if you're stuck" first move.
- **Cross-assessment activities** (`X-…` IDs) that link the IO texts (Blake, Thi Bui, Banksy, Kruger, Gallenkuş) to Paper 1 and Paper 2, and the Paper 2 works (*The World's Wife*, *A Doll's House*) to Paper 1 and the IO.

## The database

3,325 activities = 1,926 originals (enriched with the new columns; 345 truncated descriptions repaired) + 1,399 new, including per-poem drills for Blake and *The World's Wife*, element- and beat-level work on *A Doll's House*, chapter/motif work on *The Best We Could Do*, work-level activities for Banksy, Kruger, and Gallenkuş, IO craft (pairing labs, rehearsal protocols, Q&A prep), scaffolded support for struggling students, exam-countdown routines, cool-downs, pair/group formats, and 438 cross-assessment bridges.

Column definitions and allowed values are documented in the workbook's **Read Me** tab.

## Regenerating / testing (`tools/`)

- `enrich.py` — enriches a legacy 12-column export with the v3 columns.
- `content_*.py` — the authored new-activity banks.
- `build_xlsx.py` — assembles the final workbook (IDs, styling, Read Me tab).
- `make_payloads.py` + `test_explorer.js` — builds simulated Google-gviz payloads and runs the Playwright end-to-end suite (33 checks: filtering, smart graying, presets, search, legacy-sheet fallbacks) against `index.html`.

```bash
cd ib-lang-lit/tools
python3 enrich.py && python3 build_xlsx.py     # rebuild the workbook
python3 make_payloads.py && node test_explorer.js  # run the UI test suite
```
