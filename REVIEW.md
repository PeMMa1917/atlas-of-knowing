# The Atlas of Knowing · An Expert Panel Review in Forty-Three Voices

Build reviewed: v37.1, 16 July 2026. Evidence base: a full read of the source (`index.html`, `src/*.js`, `build.js`, `teacher.html`, `apps-script/Code.gs`, `data/`), the build gate (`node build.js`: 522 objects, zero problems, zero warnings), and an instrumented headless playthrough (`test/harness.js`: 88 assertions green, zero uncaught errors) driving keys, panels, dialogues, pickups, duels, trials, search, and save cycles. Each voice below speaks to its own stakes: strengths first, concerns second, then a standing line. Tags: **Present** (the build already answers the concern, with the feature named), **Shipped** (changed in this build), **Roadmap** (recommended, deferred deliberately). This review supports dissertation research; the project stands independent of the International Baccalaureate and claims no endorsement.

---

## Panel I · Craft and Industry

### A game designer
The core fantasy holds together: knowing as a craft, practiced in a guild, walked as a world. Mechanics carry the meaning instead of decorating it. The Bandolier's five slots rehearse the Exhibition's choose-three discipline; selling an object kills its gift forever, teaching irreversibility; the Arena's Closed Door law pays players for conceding sound arguments, so judgment beats reflex. Procedural sprites seeded from object ids give 522 unique collectibles at zero asset cost. Two concerns. First, system count: over twenty chips compete for a new player's eye, and the option space explodes right after the first commission with no difficulty curve to pace it. Second, economy legibility: lumen sources and sinks drift without a visible price logic. A staged reveal of chips tied to progression flags would pace the world; the flags already exist. Standing: pacing **Roadmap**; keymap and first-hour orientation **Shipped** (single-meaning keys, a Keys reference in the Lantern Room, a settings signpost on the threshold).

### A triple-A studio executive
Distribution is enviable: one 3 MB file, no install, no account, no server bill, runs from a double-click. Retention scaffolding reads like a live-ops playbook: dailies, streaks, collections, boards, seasonal-feeling chapters. Time-to-fun runs past ten minutes of reading before the first mechanic bites, which consumer funnels would never forgive. Production gaps: no audio yet, no juice curve on early rewards, no localization pipeline (strings sit inline, so translation means surgery). As a niche education title with the IB school network as its channel, the model closes; as a consumer product, the funnel needs a duel inside minute three. Standing: early-fun pacing and string externalization **Roadmap**.

### An indie developer
A solo build carrying 522 authored objects, fourteen trial families, and a class backend deserves respect; the constraint-driven art (hash-seeded pixel sprites) turns a budget hole into an identity. The in-code doctrine comments read like a devlog and will serve any future contributor. The risk is the classic one: twenty systems at eighty percent polish beat none at a hundred, but the next twenty features will not. Freeze scope, patch depth: sound for a handful of moments, juice on the first hour, playtests in public. The new harness makes fearless patching possible; before it, every tweak risked silent breakage. Standing: scope freeze **Roadmap**; regression safety **Shipped** (harness plus CI).

---

## Panel II · Engineering

### An expert coder or programmer
Strengths: a zero-dependency single-file deliverable; a seam registry (`TOKEngine`) letting nine content packs merge without touching the core; a data pipeline where `data/objects/*.json` stays the source of truth and `build.js` regenerates the runtime pack; save migration with fixtures for five legacy shapes; a style lint inside the build gate. This build adds the missing pillars: a headless playthrough harness (88 assertions), a guarded test seam awake only under an `atlastest` address, CI on every push, and `package.json` scripts, so `npm test` tells the truth about the whole game. Remaining debts: a 36,000-line HTML file strains navigation and review; string-keyed flags (`v37_got_*`) invite typos the compiler cannot catch; no LICENSE file blocks reuse by other schools. Standing: tests, CI, keymap hygiene **Shipped**; source splitting, typed checks (JSDoc plus `checkJs`), LICENSE choice **Roadmap**.

### An expert professor of computer science
The elegant moves: deterministic procedural generation (sprite form, daily prices, arena rotations all derive from hashes of stable ids and day keys), which buys testability for free; the seam pattern as a module system without a bundler; the build's dual role as compiler and style court. The harness doubles as an executable specification: panels close on Escape, choices land on live nodes, duels terminate; a reviewer can read the assertions as invariants. Weaknesses an examiner would probe: global mutable state with broad write access; renderer and simulation share one loop with no separation of concerns; no property-based tests over save migration, where the fixture set samples rather than proves. The dissertation angle is strong: the artifact demonstrates constraint-driven engineering (offline, single file, school hardware) shaping architecture, a trade-space rarely written up. Standing: invariant suite **Shipped**; property-based migration tests and loop separation **Roadmap**.

---

## Panel III · Pedagogy and Learning Theory

### An expert pedagogist
Constructive alignment holds: intended outcomes (analyze knowledge questions, weigh perspectives, justify claims) map onto activities (rung-laddered journaling, dispute forging, chorus dialogues) and onto rehearsal of the two assessments (triptych practice, essay frames). Feedback is immediate, task-focused, and explanatory: every duel round ends with a why-line, every trial with a debrief. Scaffolds are generous and free by doctrine, hints never cost, and quick exits go unpunished, which protects help-seeking. The gap is fading: scaffolds never retreat as competence grows, so a strong student meets the same rails in month eight as in hour one. Differentiation by readiness stays manual. Standing: scaffold fading and readiness-adaptive prompts **Roadmap**; consistency of exits and inputs (a precondition for any of this) **Shipped**.

### An expert in learning theories
Self-determination theory: autonomy runs high (free routes, declinable offers, self-chosen goals), competence support runs high (tiered trials, criterion badges), relatedness runs thin (rival codes and pseudonymous boards, no collaboration). Situated cognition: the game literally models communities of practice, apprenticing the player to keepers of distinct knowledge traditions, from Sankoré manuscript families to Pacific wayfinders. Cognitive load: intrinsic load is the subject itself; extraneous load spikes at the chip bar (twenty-plus verbs on screen); germane load lands well through concept ladders and the coverage grid. Dual coding pairs every object with a sprite. Retrieval gets spacing through daily seeds and streak returns. Concerns: interleaving is left to the player, and desirable difficulty stays uncalibrated. Standing: chip staging and adaptive difficulty **Roadmap**; input predictability (load-relevant) **Shipped**.

### An expert of educational gamification
The element inventory is complete: points, badges, boards, streaks, tiers, collections, quests. What lifts it above sticker-chart gamification: badges are criterion-referenced deeds, XP attaches to epistemic acts, and the Certainty trace prices shortcut behavior into the record instead of banning it, a frank mechanic almost nobody ships. Risks: reward salience can displace mastery goals; daily flames borrow attention-economy pressure a school should model against; boards rank humans. Recommendations: weight XP toward rung-4 and rung-5 reflection over collection, convert flames to a weekly cadence, and let each class switch boards off. Standing: all three **Roadmap** (data-informed tuning belongs with the teacher-researcher, not a hotfix).

### An expert in gamified learning
Meta-analyses put gamification's average effect small and design-dependent; the moderators favoring gains, meaningful framing, criterion badges, and mastery feedback, all appear here. The dashboard's signal set (speed bias, thin independent writing, cold concepts, never declining) turns telemetry into formative insight rather than surveillance theater, a rare inversion. Watch overjustification: a student who journals for XP may stop journaling when XP stops. The design already counters with identity framing (wayfarer ranks, the naming ceremony); keep the counterweight ahead of the currency. Standing: XP rebalance toward reflection **Roadmap**; the telemetry-to-signal design **Present** (teacher dashboard, signals view).

### An expert of educational games
Judged as a game for learning rather than a gamified drill: the mechanics are endogenous, meaning the play IS the content. Dissection turns an object into two claims and a fact; forging a Dispute Card demands two rival claims of one concept; door keys make prerequisite knowledge literal. Failure costs stay low and informative, identities are tryable (lenses as stances), and problems come well-ordered inside each trial family. Two gaps: the fiction sometimes spends more vocabulary than the concept it teaches, taxing the very readers the plain rail protects; and debrief-to-classroom bridging depends on the teacher, with no printed artifact from a trial run. Standing: trial-summary export **Roadmap**; plain rail on every conversation **Present** (with duplication bug now dead, **Shipped**).

### An expert in game-based learning
The transfer question decides everything: does naming the Scarecrow in the Arena improve fallacy-spotting in an essay draft? The design plants the right bridges, debrief journals with knowledge-question prompts, the Range's fresh-passage volleys, second questions after answers, but no bridging task uses the student's own current essay. Recommend a designed transfer study for the dissertation: pre and post argument-analysis on cold passages, compared across play dosage, plus a bridge activity where students annotate their own drafts with fallacy cards earned in play. The artifact is ready for such a study precisely because the harness and telemetry make behavior observable. Standing: bridge task and study protocol **Roadmap** (dissertation-aligned).

---

## Panel IV · TOK and the IB

### A TOK teacher
Every object carries a knowledge question, two rival answers, a why-line, and an MLA trail; the coverage grid tracks concept by framework element by subject; the Ladder converts play into journal entries at five depths, and rung one counts as a full, valid entry, which protects the weakest writer's dignity. Concerns from the marking chair: the two suggested answers per object risk becoming the ceiling of student thinking rather than the floor; auto-journal lines mingle the game's voice with the student's, so rung inflation needs watching (the dashboard already separates manual from auto counts, which helps); and a 522-object world invites forty hours the timetable does not own. Wanted: a one-page map from Road chapters to lesson slots. Standing: lesson mapping and a beyond-both-answers prompt **Roadmap**; voice separation in analytics **Present** (dashboard rung view).

### A head of TOK
Adoption stands or falls on three questions. Consistency: every student now meets the same controls, the same exits, the same numbered choices, and the class boards carry call signs only. Continuity: saves live in the browser, so a student changing devices without class sync loses ground; the roster sync covers connected classes, and a save-code export would cover the rest. Sustainability: one colleague authored this; the bus factor is one. The new CI, harness, README, and data brief lower the handover wall considerably, and `data/objects` stays editable by any colleague with a text editor. Standing: save-code export and a department handover note **Roadmap**; handover artifacts **Shipped** (CI, harness, CHANGELOG, this review).

### The designer of the TOK curriculum
The twelve concepts run as ladders fed by deeds rather than as vocabulary lists, which honors their intended role as lenses. The framework's four parts hold the corners of every tagged action, and both assessments get faithful rehearsal shapes: the triptych (three objects, one question, one defense) and the essay scaffold. One structural worry: knowledge questions at scale. The build gate checks punctuation, never second-orderness, and across 522 objects some KQs will drift from questions about knowledge toward questions about the object. Recommend a KQ audit rubric (contestable, general, knowledge-focused) applied batch by batch. Standing: KQ audit **Roadmap**; concept-as-lens architecture **Present** (Forge ladders, coverage rows).

### Experienced examiners of TOK
The rehearsal shapes match the criteria: the triptych demands a question, an anchored object, and a defense; rung five demands a claim defended against its rival, which mirrors the essay's discriminator between description and evaluation. Two cautions from thousands of scripts. First, borrowed objects: the Exhibition rewards personal context, and a museum of 522 curated objects could seed a cohort of lookalike exhibitions; the game should push each student from these model objects toward one from their own life. Second, template voice: scaffold phrasings leak into prose, and moderators notice thirty scripts sharing a skeleton. Standing: an own-object bridge task and scaffold-fading **Roadmap**; the rung-five rival-defense mechanic **Present**.

### Experienced TOK teachers
Veterans will recognize the doctrine lines: hints free, exits unpunished, declines recorded as legitimate moves. The marking-load story is strong: journals arrive pre-sorted by rung with concept tags, and the signals view flags who needs a conversation. The failure mode veterans fear is tool death: the author leaves, the file rots, the department reverts to slides. The mitigations now exist (CI, tests, editable data, a build script a novice can run), and the change log models how to alter content safely. Standing: **Present** with **Shipped** reinforcements; a two-page teacher quickstart remains **Roadmap**.

### Unexperienced TOK teachers
A new teacher can learn the course from inside the game: the Lexicon defines each concept with examples, the Guide Post holds sentence starters and both assessment frames, and the chorus dialogues model disagreement without a winner, which is the stance new TOK teachers find hardest to teach. The risk runs the other direction: leaning on the game as the course. The dashboard's signals help a novice see patterns veterans see by instinct. A scripted first-six-lessons insert would close the gap between installing the tool and teaching with it. Standing: first-lessons script **Roadmap**; in-game teacher education **Present** (Lexicon, Guide Post, chorus).

### The head of IB
Programme-level reads: the learner profile shows up as mechanics rather than posters (inquirers: the second question; open-minded: the chorus; principled: the integrity seams; reflective: the Ladder). Access arrangements find analogs inside the game (plain language, reading font, contrast, guided timing), aligned with the principle of access without altering demands. Academic integrity: pseudonymous boards, teacher verification through the backend, and analytics separating manual from automatic writing all point the right way; final assessment authenticity still rests with supervised drafting outside the game, and adoption guidance should say so plainly. Data protection: the class Sheet lives in the school's own Google domain, with four fields and no more. Standing: an adoption and integrity one-pager **Roadmap**; integrity affordances **Present**.

### The IB itself
Mission alignment runs deep: the game centers knowledge traditions across continents as producers of knowledge, never props, from Sankoré family libraries to wayfinding, griots, Great Zimbabwe, and the qero record; international-mindedness is the world model, not a unit. Compliance notes: the project should continue stating independence from the IB (this build adds the line to the README), avoid IB marks and logos, and frame all outcome claims as research questions until data lands. Standing: independence statement **Shipped**; outcome-claim discipline **Roadmap** (a dissertation obligation as much as a policy one).

---

## Panel V · School Leadership and Community

### The head of a high-achieving school
The rigor case makes itself: research trails in MLA on every object, twelve mastery ladders, an endgame (Luminary, dispute forging, the Road's rehearsal triptychs) with a ceiling above the strongest cohort. The questions this desk asks: where is the evidence of transfer to scores, and what does play displace on the timetable? The build now supports an evidence pipeline (telemetry, signals, exportable journals), so run a term-long pilot in one section against a comparison section before whole-cohort adoption, and publish the rung distributions. Integrity under board pressure needs one eye open. Standing: pilot protocol **Roadmap**; evidence instruments **Present** (dashboard, exports).

### The head of a low-achieving school
The access case is unusually strong: no licenses, no accounts, no bandwidth after one 3 MB download, runs on aging hardware, saves without a server, and the plain-language mode plus free hints lower the floor without lowering the questions. The concept quiz gates collection behind thinking, so XP farming still touches the ideas. Concerns: text volume remains the tax on weak readers even in plain mode; boards can sting the bottom third even under call signs; and the Apps Script setup, five minutes for a confident teacher, reads as a wall for a stretched one. Standing: per-class board toggle and a printed quickstart **Roadmap**; offline single-file delivery **Present**.

### Teachers of other subjects
The subject matrix names twenty-three courses, and the envoy line runs knowledge from each subject into TOK through concrete objects: a treaty in two languages for English, tomography of the Antikythera mechanism for physics-adjacent history of science. Two invitations follow. First, borrowing: the Fallacy Volley and the provenance trials would serve English, History, and the sciences directly. Second, review: subject specialists should audit the objects touching their fields, since one confident error costs credibility across the whole set; the spreadsheet export makes such an audit a lunch-break task per subject. Standing: subject-specialist review pass **Roadmap**; export instruments **Present** (`exports/` workbook).

### A parent
The reassurances parents actually ask about: no ads, no purchases, no strangers (rivalry runs through hand-typed codes; boards show call signs), no account creation, and the whole game lives in one file on the device. When a class connects, the sign-in card states exactly four fields and their destination, the teacher's class Sheet, before a child types anything. Watchpoints: daily streaks tug at evenings, and a school tool should tug gently; and parents deserve one page explaining what the journal is for and how to see the portfolio. Standing: family letter and gentler streak cadence **Roadmap**; data minimalism **Present** (sign-in card, privacy note).

### A learning support coordinator
The provision list, verified in the code rather than the brochure: plain-language mode across prompts and dialogue, a per-conversation plain rail, a reading-support font, text scaling to 140 percent, high contrast, reduced motion honoring the system setting, guided timing windows, chunked reading in the Guide, keyboard-complete play, numbered choices, one exit key everywhere, free hints by doctrine, and a rung-one journal entry counted whole. This clears most access plans on paper. The gaps: no read-aloud, scaling stops at 140 percent, and arcade-star routes still demand motor speed despite the doctrine line promising access parity. Standing: read-aloud (browser speech synthesis), higher scale ceiling, and non-timed star routes **Roadmap**; the provision list above **Present**, with input consistency **Shipped**.

---

## Panel VI · Student Voices

### A high-school student
The letter opening lands; walking a world beats a worksheet; duels and gardens feel like a game someone wanted to make. The gripes: after the first commission the chip bar turns into an airport departures board; some conversations run long between things to do; and playing on a phone on the bus should feel first-class, since the bus is where free time lives. The keys now do one thing each, choices carry numbers, and Escape always means out, which kills the worst confusions. Standing: mobile-first pass and tighter early pacing **Roadmap**; control sanity **Shipped**.

### A student who is highly motivated in TOK and IB
The ceiling holds: Luminary tiers, dispute forging, thirty-five prompt rehearsals, rung-five defenses against a rival claim, and research trails deep enough to start an extended essay hunt. The ask from the front row: recognition for going past the two given answers, a route to argue a third reading and have the game notice; and export of everything (the portfolio press covers print and download). One more: let strong students author objects, since `data/objects` is editable JSON and the object brief documents the schema; proposing a valid object is itself a TOK exercise. Standing: third-reading challenge and student-authored object proposals **Roadmap**; portfolio export **Present**.

### A student who is not motivated academically
Straight answer: another school thing in a game costume gets sniffed out in one lesson. What survives the sniff test here: walking, duels with a win state, creatures and sprites to collect, a garden growing off deeds instead of lectures. What triggers it: reading walls before the first fight, twenty buttons, and any leaderboard where my name sits at the bottom. The declines-count respect is noticed: the game records a refusal as a move, and nobody punishes an exit. Get the first duel inside the first ten minutes and keep boards optional, and this crowd stays. Standing: earlier first duel and board opt-out **Roadmap**; exit-without-penalty doctrine **Present**.

### Experienced TOK students
Alumni verdict: the Bandolier's choose-five, spend-three agony mirrors the actual Exhibition month with uncomfortable accuracy, and the rung-five rival defense is precisely the move separating a six from a nine on the essay. What the game cannot fake: the personal stake of an object from your own life, the ticket stub, the grandmother's recipe card, the visa letter. The curated 522 teach the shape of a good object; the leap to your own remains the assessment. Build the bridge: a final Road step where the student names an object from home, writes its context, and drafts its question inside the same triptych frame. Standing: own-object bridge **Roadmap**; triptych rehearsal **Present**.

---

## Panel VII · Inclusion and Access

### A student with learning needs
The kindest sentence in the design: asking never ends the conversation, and hints cost nothing. Plain mode simplifies every prompt; one key always leaves; every choice wears a number; a one-line journal entry counts whole. Remaining weight: many systems to remember across days (the compass and quest chip carry the thread), and vocabulary in flavor text still runs past plain mode's reach in places. Standing: memory-friendly session summaries **Roadmap**; the floor-of-dignity design **Present**.

### A student with dyslexia
Verified in the stylesheet, not the brochure: a rounder reading font with wider letter and word spacing on every panel, dialogue, and control; text scaling; instant-text option killing the typewriter smear; left-aligned copy. Frictions: all-caps strings (inscriptions, concept names in rail lines) slow tracking, though they run short; long line lengths on wide panels raise return-sweep errors, so a measure cap near seventy characters would help; and read-aloud remains absent. Standing: measure cap, sentence-case option, speech synthesis **Roadmap**; font, spacing, scaling, instant text **Present**.

### EAL learners
Layered language support: plain mode rewrites prompts and frames; the rail glosses any line on demand ("What do you mean?"); the Lexicon defines each concept in a tap with an example; journal entries may arrive in any language by explicit doctrine. Costs: idiomatic flavor (coyote time, mud sticks to the reader) taxes learners even when optional; strings live inline, so no translation layer can bolt on without engineering. Standing: idiom pass on flavor text and string externalization **Roadmap**; the gloss-and-lexicon stack **Present**.

### Students with ADHD
Fit: short loops (a volley, a dig, a duel round) with instant, explanatory feedback; movement between reading beats; exits without penalty, so abandoning mid-task carries no shame spiral. Friction: the early sequence front-loads reading before the first loop closes; twenty chips invite tab-switching inside the game itself; streak flames convert a missed day into guilt, the exact loop to avoid; and collection completionism (522) can swallow a hyperfocus week. Standing: earlier action, weekly-cadence flames, one-next-thing emphasis **Roadmap**; short-loop structure and free exits **Present**.

### Students with ODD
Rare fit, mostly by accident of philosophy: the game never forces compliance. Refusals are recorded as legitimate moves; the Arena pays the player for conceding when the opposing argument holds, modeling authority-independent judgment; nothing locks until an adult approves. Triggers to manage: teacher point awards and messages land inside the student's own journal, which can read as an adult writing in my book; boards rank peers. Route the teacher's voice to a separate ledger with the student's consent toggle, and keep boards class-optional. Standing: consent routing for teacher messages **Roadmap**; non-coercive core **Present**.

### Students with visual impairments
A plain reading: panels, dialogues, and choices live in the DOM with labels and a polite live region for toasts, so magnification and contrast users get a serviceable path (scaling to 140 percent, high contrast, focus landing on the first control of each panel). The tile world itself renders to canvas, opaque to a screen reader; a blind student can win every conversation and lose the world. Full non-visual play needs a described world: positional text ("Sefa stands two steps north"), landmark lists per region, and speech output. Standing: described-world layer and higher scale ceiling **Roadmap**; DOM-side accessibility **Present**.

### Students with physical differences
Keyboard-complete play, no drag requirement, no chorded inputs, and guided timing windows widen the arcade demands. Remaining barriers: chips make small click targets; keys resist remapping; several arcade trials still gate their stars behind sustained precise timing, against the project's own access-parity doctrine. Standing: remappable keys, larger targets, non-timed star routes **Roadmap**; single-switch-friendly conversation flow **Present** (numbers plus Escape).

### Students with neurological differences
Predictability now holds: one key, one meaning; one exit, everywhere; numbered choices; motion reducible at the system or game level; no audio surprises (sound ships off). The plain rail doubles as a literal-language mode, translating figurative flavor on demand. Sensory and social load stays adjustable: toasts cap at three, boards hide behind a chip, and nothing requires synchronous peers. Watch metaphor density in required quest text rather than optional flavor. Standing: metaphor audit of required text **Roadmap**; predictability architecture **Shipped** and **Present**.

### Students who are far below grade level
The floor design carries them: plain mode, free hints, a compass always pointing at the next step in plain words, a concept quiz with a consolation payoff so no attempt scores zero, and the rung-one doctrine making one true sentence a complete journal entry. The tax remains reading stamina; even short lines accumulate across a session. Picture-supported hints and read-aloud would move this group most. Standing: both **Roadmap**; floor mechanics **Present**.

### Students who struggle with encoding
No spelling gate exists anywhere in play: collection, duels, trials, and dialogue all run on selection, and the journal accepts any language, any length, with sentence starters one tap away. Writing remains invited, never demanded, and the auto-journal offers a model voice to lean on, clearly marked in analytics. Dictation through the browser would close the loop. Standing: dictation hook **Roadmap**; selection-first play and starter scaffolds **Present**.

### Students who struggle with decoding
The heaviest tax in a text-rich game lands here, and the mitigations stack: plain rewrites, glosses per line, instant text, reading font, spacing, chunked long passages behind next-buttons in the Guide. The missing keystone stays read-aloud; browser speech synthesis runs offline and free, and wiring it to dialogue and panels would change who can play unassisted. Standing: read-aloud **Roadmap** (highest single-item value in this panel); the mitigation stack **Present**.

### Students who struggle with writing
Composition support arrives in graduated frames: starters per rung, both assessment frames, second questions prompting one more sentence, and the portfolio press turning fragments into a document to keep. The rung ladder rewards climbing without demanding it. The gap sits between selecting and composing: no mechanic yet rehearses sentence-combining or paragraph assembly from earned cards, though the Bench already assembles claims and facts into exhibits, one metaphor away from assembling sentences. Standing: sentence-assembly mechanic **Roadmap**; graduated frames **Present**.

### Students who are far above grade level
The ceiling answers them: Luminary ladders, dispute forging, rival-defended rung fives, hard trial tiers, and research trails pointing at primary sources. Two extensions fit the profile: authorship (propose new objects against the documented schema, a peer-reviewable act) and critique (turn the game's own claims into an evaluated exercise, exactly the move this review models). Boredom risk stays low; misdirection risk (farming boards instead of climbing rungs) stays live and tunable. Standing: authorship pipeline **Roadmap**; ceiling mechanics **Present**.

---

## Panel VIII · Player and Motivation Profiles

### Different player types
Read against the classic compass of player types: achievers feast (ladders, stars, badges, ranks); explorers feast harder (nineteen regions, hidden caches, secret doors, lore plaques, one silent room per vault told through furniture alone); competitors get duels, rivals, and boards, all asynchronous and pseudonymous; socializers go hungry, since no mechanic lets two students build one thing together. A co-op dispute, two students forging one Dispute Card from opposing claims, would feed the missing quadrant with the course's own move. Standing: cooperative mechanics **Roadmap**; achiever and explorer economies **Present**.

### Different gamers
Session profiles all find a loop: five spare minutes fit a volley or a dig; a lesson fits a trial plus a journal entry; a weekend fits a Road chapter or a cabinet hunt. Genre literacy splits the audience: game-fluent students read door-and-key structure instantly, while non-gamers hold the compass, which speaks plain directions on demand. Input assumptions stay desktop-first; touch play functions, and a phone-first pass (larger targets, bottom-reach layout) would meet players where their hardware lives. Standing: phone-first layout pass **Roadmap**; multi-length loops **Present**.

### Different motivation types
Mastery-driven students meet tiered depth and visible skill growth; reward-responsive students meet XP, badges, and collections; recognition-seekers meet boards under call signs; failure-avoidant students meet the gentlest floor in the design, free hints, exits without penalty, a one-line entry counted whole, and a refusal recorded as a legitimate move. Amotivated students remain the hardest audience, and their fix is pacing, the first duel arriving early, rather than more reward plumbing. Standing: early-loop pacing **Roadmap**; the four motivational floors **Present**.

---

## Synthesis

Five findings recur across panels. First, the deep design is sound: mechanics embody the epistemology, scaffolds respect dignity, and integrity affordances anticipate misuse; twenty voices found features already answering their concern, a credit to the doctrine comments guiding the build. Second, the first hour costs too much reading before the first satisfying loop closes; designers, students, and attention-profile panels all converge here. Third, reading remains the tax the access stack cannot fully refund without read-aloud; speech synthesis is the highest-value single addition on the roadmap. Fourth, comparison mechanics (boards, streaks) need per-class governance switches so motivation tools never become shame tools. Fifth, the assessment bridge from curated objects to the student's own object decides whether examiners meet rehearsed skill or borrowed content; one Road step closes it.

| Theme | Voices converging | State |
|---|---|---|
| Input and exit consistency | designer, students, neurological, LS coordinator | **Shipped** (this build) |
| Regression safety and engineering hygiene | coder, CS professor, indie, heads | **Shipped** (harness, CI, scripts) |
| First-hour pacing | designer, AAA, ADHD, unmotivated student | **Roadmap** |
| Read-aloud and described world | decoding, visual, below-grade, LS | **Roadmap** |
| Board and streak governance | gamification, ODD, low-achieving head, parent | **Roadmap** |
| Own-object assessment bridge | examiners, alumni, curriculum designer | **Roadmap** |
| KQ second-orderness audit | curriculum designer, TOK teacher | **Roadmap** |

## The record of this build (v37.1)

Shipped and verified by the harness and build gate: every key now carries one meaning and WASD walks (the A conflict and four pack shortcut hijacks removed); Escape closes every surface including pack panels, the Ladder, and the class sign-in card; number keys act on every numbered choice across story trees, option cards, chorus voices, the rail, and Osa's lines; rail info lines render once and never stack; the redundant plainly-pair reads distinctly; the Chart Wall Inscription, Osa's copy, the Waygate, and all dig nodes draw visible markers; relic floor pickups collect cleanly; three lookbehind regexes now parse on older Safari; the Range clears a finished volley so stray shots and summary exits land clean; a Keys reference sits in the Lantern Room; the threshold signposts reading options before play begins; the README states independence from the IB; `package.json`, CI, a guarded test seam, and an 88-assertion playthrough harness guard every future change. Full detail: `CHANGELOG.md`.

## Method note

Voices are authored personas grounded in the reviewed artifact, written for research scaffolding rather than as substitutes for human participants; where a voice cites a feature, the feature was verified in source or exercised by the harness during this review. Claims about learning outcomes appear only as questions or study designs, never as findings.

---

# Round Two · The Adversarial Pass (v37.2)

Same evidence discipline, harder questions. This pass replayed the whole game headlessly with a grown harness (98 assertions to 126), swept the source with scope-aware static analysis, and chased five fresh reports from live play. Every finding below is fixed in v37.2 and guarded by a named assertion.

## Field reports from live play, root-caused

**A collected item trapped the player.** The keepsake find card ("Keep walking") set its overlay to hidden, but an inline `display:flex` outranked the hidden attribute, so the invisible-looking card kept swallowing every click. The button now clears the display as well, Escape closes the card, and the arrival test clicks it under automation.

**The collected count froze.** The ◈ counter refreshed only when the Bandolier changed, so a full Bandolier or an insight relic left the chip stale. Every acquisition now updates it, and the field-search test reads the chip after a claim.

**A person turned out to be a frog.** Knowledge sprites (the catchable companions) spawned as wandering NPCs wearing a humanoid palette, so Brook the frog walked the shore as a gold-robed person. Creature NPCs now draw as their own creature face with a ground shadow, and a test walks the shore to confirm no sprite wears a robe.

**The Guild letter arrived in the Bottega.** Three boot flows fought for one surface: the arrival letter opened at load, the naming ceremony stomped it 700 ms later, and an account sign-in wall (shipped unconfigured, yet still active) stalled the chain behind an email form. The sequence now runs as one chain: naming first, letter after, and only in the hall; the sign-in wall wakes only for schools configuring the ledger seam; a wanderer who missed the letter meets it on the next walk into the hall. Four assertions pin the order.

**Instructions pointing at absent scenery.** The chart wall, Osa's copy, and the Waygate now stand visible (round one); remaining mentions of desks and drawers live in conversational flavor rather than instructions. A content audit rubric for imperative sentences ("examine the X") sits on the roadmap for the object batches.

## The technical audit, category by category

| Category | Verdict |
|---|---|
| Markup and accessibility | No duplicate ids after a full session; every button carries a name or label; toasts announce politely; panels focus their first control. Verified by the dom-hygiene section. |
| CSS | No true duplicate selectors: the apparent repeats live inside print-template strings or split shared-versus-specific rules on purpose. Reading settings (font scale, spacing, contrast) consume their variables. |
| JavaScript syntax and reach | All ten scripts parse clean at ES2018; the nine apparent optional-chaining sites are ternaries against `.6` literals; three lookbehind regexes were replaced in round one. No same-scope duplicate function declarations; per-pack helper repeats follow the seam convention. |
| Logic and game mechanics | Three promised consumables (Steady Hand Draught, Second Wind Tonic, Harvest Horn) had no spend path even while level-up gifts granted them; all three now act as their labels promise, under test. The Range no longer accepts a ninth shot. |
| Runtime and races | Fifty rapid open/close cycles across dialogues and panels leak nothing; the typewriter settles on the last speaker after interruption; window blur clears held keys. |
| Save and load | A round trip restores region and progress; garbage JSON, wrong-shaped saves, and null literals all boot clean through the migrators; legacy fixtures keep passing. |
| Security | A hostile avatar name (`<img onerror>`) renders as text everywhere probed; class data stays four fields behind an explicit card; standings escape names; storage access sits in try/catch. |
| Performance | The renderer culls to the viewport; panels render on demand, never per frame; saves debounce at 400 ms; toast stack caps at three. No per-frame DOM reads found. |
| Dead code | Six never-referenced functions removed (a superseded journal renderer among them); the two consumable helpers earned their keep instead of deletion. |
| Documentation accuracy | The README's no-account promise now matches the code: the sign-in wall waits for configuration. |

## Happy and unhappy, dimension by dimension

| Dimension | Who cheers | Who still frowns |
|---|---|---|
| Gameplay | Designers and students cheer duels, gardens, and collections finally free of input traps; the keepsake card releases its hostages. | Pacing voices (AAA, ADHD, the unmotivated student) still want the first duel earlier than the first ten minutes. |
| Educational value | Pedagogy panels cheer criterion badges, rung-one dignity, and debriefs with why-lines; examiners cheer the rival-defense rung. | Transfer evidence remains a study, not a claim; the own-object bridge stays the missing assessment link. |
| Speed | One 3 MB file, no dependencies, boots offline in seconds on school hardware; the culled renderer holds frame budgets. | First-load weight matters on metered phones; a split loading screen sits on the roadmap. |
| Specificity | TOK teachers cheer concept-by-element tagging on every act; the curriculum designer cheers concepts-as-lenses. | KQ second-orderness across 522 objects still wants its audit rubric. |
| Collections | Collectors cheer 522 seeded sprites, cabinets, and the live count chip; the Bandolier's choose-five discipline teaches curation. | Completionism can swallow weeks; hyperfocus safeguards remain a roadmap item. |
| TOK application | Exhibition and essay rehearsal shapes match the assessments; the coverage grid maps the syllabus. | Scaffold fading and the personal-object leap still separate rehearsal from the assessed thing. |
| Other subjects | Envoys bridge twenty-three courses with concrete objects; trials borrow well (fallacies for English, provenance for History). | Subject specialists still owe the object batches an accuracy pass; the export workbook makes it a lunch-break task. |

## The verified record

126 assertions green, zero uncaught errors, across: arrival sequencing, keymap purity, Escape everywhere, panel content, the full dialogue graph plus a clicked walk of every reachable choice, chorus uniqueness, number keys on five surfaces, pickups, landmarks, every duel, every trial boot, field search with a live count chip, every region, a full Range volley with a stray-shot guard, creatures on the shore, hostile names, hostile saves, dead storage, rapid-cycle races, three consumables, three device profiles, and a save round trip with a Bottega wanderer meeting her letter in the hall. The build gate reports zero problems and zero warnings; the smoke test stays ALL GREEN; CI reruns everything on each push.
