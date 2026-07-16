# Change Log

## v37.2 · 16 July 2026, night

The adversarial pass. Five reports from live play, root-caused and fixed: the keepsake find card now releases the player (its Keep walking button fought an inline display and lost; Escape closes it too); the collected-object counter updates on every acquisition, full Bandolier or not; knowledge sprites draw as creatures instead of gold-robed strangers; the arrival letter waits for the naming ceremony, opens only in Atlas Hall, and meets returning wanderers on their next walk in; the account sign-in wall wakes only for schools configuring the ledger seam, keeping the default build account-free.

Round-two audit fixes: three promised consumables (Steady Hand Draught, Second Wind Tonic, Harvest Horn) gained their missing spend paths and now act as written, with the Second Wind redrawing either daily; six never-referenced functions left the file; the harness grew from 98 to 126 assertions (arrival chain, chip sweep, panel content, a clicked walk of the dialogue graph, hostile-name probes, hostile-save fuzzing, rapid-cycle races, creature rendering, consumable behavior, and the count chip). Full detail: `REVIEW.md`, Round Two.

## v37.1 · 16 July 2026, evening

Critique-driven polish on top of the QA pass below, guided by `REVIEW.md` (an expert panel review in forty-three voices). A Keys reference now sits in the Lantern Room; the threshold signposts text size, plain language, the reading font, contrast, and motion before play begins; the README states independence from the IB; `package.json` and a GitHub Actions gate run the build, the smoke test, and the playthrough harness on every push. The harness grew a device sweep (phone, tablet, laptop viewports), a travel sweep across every region, and a Range volley run. The volley run caught one more latent wedge: the Range accepted shots after the eighth and kept a spent run live, so an Escape from the summary froze the panel; the run now clears at the finish line and stray shots land nowhere.

## QA pass · 16 July 2026

Two test suites guard this build. `test/smoke.js` boots a mocked engine and ends green. `test/harness.js`, new in this commit, boots the whole game headlessly and drives keys, panels, dialogues, pickups, duels, trials, and saves: 88 assertions, all green, zero uncaught errors.

## Fixes for the reported issues

| Issue | Cause | Fix |
|---|---|---|
| Collection screens froze after taking an item | A floor pickup holding a relic id crashed the collect step before its card could close | The step now routes relic ids through the Reliquary seam; every card answers to its button, its number key, and Escape |
| Inscription on the north wall, nothing visible | The renderer drew markers for four interactable kinds only; the Chart Wall Inscription, Osa's copy, the Waygate, and all dig nodes stood invisible | Every remaining kind now glows as a gold diamond; the Waygate wears a labeled ring |
| Choosing a number on the keypad closed the conversation | Number keys routed through a chooser blind to option cards, so a number press closed a card a click handled fine | The chooser now runs each option's own callback; numbers and clicks share one path across story trees, option cards, chorus voices, the rail, and Osa's five lines |
| Panels closed by I here, Escape there | Pack surfaces never listened for Escape | Escape now closes every surface: all core panels, the Reliquary Record, Field Search, the Exchange, the trials browser, the satchel, the journal Ladder, and the class sign-in card; the satchel keeps I as its toggle |
| A opened The Grounds instead of walking | Two separate lines bound A to The Grounds panel | Both bindings gone: A walks, The Grounds opens from its chip, and no chip advertises a letter shortcut anymore |
| The Scarecrow's third question accepted no answers | Mid-duel, A closed the arena while I, O, X, and Z swapped the panel underneath; number presses also closed option cards | With the keymap cleaned and the chooser repaired, the harness runs every foe through every round to the closing card, the Scarecrow included |
| Lines repeated, doubling on each press | Each press of "Why does this matter?" stacked another copy of the same line, and copies outlived the dialogue | One info box replaces itself in place; every render and close sweeps leftovers |
| Two near-identical "plainly" options | Chorus voices offered "What do you mean? (their point, plainly)" beside "Say the whole argument plainly" | The second now reads "Sum up the whole debate": the first glosses one speaker, the second lays out the full room |

## Audit findings, also fixed

| Finding | Fix |
|---|---|
| Older Safari (before 16.4) died at parse on three lookbehind regexes | First-sentence splitting now runs lookbehind-free |
| Held movement keys stuck after a window blur | A blur handler clears the key table |
| The journal Ladder ignored Escape and number keys | Escape steps away; 1 to 5 pick a rung outside the textarea |
| Item cards and plaques inherited rail buttons from the previous speaker | Vignettes and option cards now open rail-free |
| Seam exports for openDialogue, openVignette, and openMsg predated their wrappers | Packs calling through TOKEngine now get the same behavior players get |
| No engine access for automated tests | A guarded test seam wakes only when the address carries `atlastest`; student addresses keep it dark |

## Verification

`node build.js`: 522 objects, zero problems, zero warnings. `node test/smoke.js`: ALL GREEN. `npm i jsdom && node test/harness.js`: 88 of 88 green, zero uncaught errors. The harness sweeps every core panel plus the four pack panels against Escape, the full dialogue graph, number keys across five surfaces, both movement directions, all fallacy duels round by round, a floor claim through the concept quiz, every trial instance at the Proving Grounds, and a save with reload.

## Files changed

`index.html`, `src/content-60-reliquary.js`, `src/content-63-bench.js`, `src/content-67-trials.js`, `src/content-68-forge-records.js`, `src/content-70-sync.js`, `README.md`, plus new `test/harness.js` and this log.
