# Atlas of Knowing v37 · Object Authoring Brief

You are authoring collectible objects ("relics") for The Atlas of Knowing, an open-world game for the IB Theory of Knowledge course. Players are teenagers, many with English as an additional language. Objects teach students to connect physical things to knowledge questions, the core skill of the TOK Exhibition.

## Mission
Author your assigned batch of hyper-specific objects as one strict JSON array. Hyper-specific means a named, dated, particular thing, never a category. Bad: "a medical textbook". Good: "Gray's Anatomy, First Edition, London, 1858". Bad: "a protest sign". Good: "Greta Thunberg's 'Skolstrejk for Klimatet' Plywood Sign, Stockholm, 2018".

Draw inspiration from the teacher's suggestion list (path given in your instructions). Convert every generic entry you use into a specific named instance. Invent beyond the list freely. Favor breadth across cultures, eras, and disciplines: objects from Africa, Asia, the Americas, Oceania, and Europe; ancient and modern; famous and humble.

## JSON schema (strict, every field required unless marked)
```json
{
  "id": "r61_001",
  "name": "Gray's Anatomy, First Edition, London, 1858",
  "icon": "📖",
  "region": "royal",
  "pl": { "mode": "floor", "detail": "" },
  "eff": { "t": "insight", "c": "Evidence", "v": 10 },
  "tags": { "c": "Evidence", "e": "Methods and Tools", "s": "Biology" },
  "kq": "How do experts decide when a source of knowledge has become outdated?",
  "ans": [
    "Newer evidence can retire old authority. Later dissection and imaging corrected several plates, so the book moved from manual to museum piece.",
    "Age can add a second kind of value. Historians read the 1858 edition as evidence about Victorian science itself, so one object answers two very different questions."
  ],
  "rw": "Henry Gray and illustrator Henry Vandyke Carter published this dissection atlas in 1858. Surgeons trained from its plates for over a century, and updated editions still sit in medical schools today. The book shows how drawing, not photography, first standardized human anatomy.",
  "desc": "A heavy anatomy atlas. Its engraved plates once defined what a body was allowed to look like.",
  "mla": [
    "\"Gray's Anatomy.\" Wikipedia, Wikimedia Foundation, n.d., en.wikipedia.org/wiki/Gray%27s_Anatomy.",
    "\"Henry Gray.\" Encyclopaedia Britannica, n.d., www.britannica.com/biography/Henry-Gray."
  ],
  "img": ""
}
```

### Field rules
- id: your batch prefix + 3-digit index, in order, no gaps.
- name: at most 70 characters, hyper-specific, no em dashes.
- icon: exactly one emoji.
- region: one id from the region list below. Fit the object's theme.
- pl.mode: one of floor, npc, cache, shop, minigame. Batch quota below.
  - floor: detail = "" (object sits in the region, visible).
  - npc: detail = "Name: one short line on why they hand it over." Invent a fitting NPC name.
  - cache: detail = one hiding hint sentence, e.g. "Under the third floor tile past the shelving."
  - shop: detail = "" and add "cost": integer 20 to 160 inside pl.
  - minigame: detail = exactly one of: Assumption Sweep, Claim Forge, Perspective Prism, Scales of Justification, Fallacy Volley, Boundary Maze, Rung Climb, Memory of the Hall, Cipher of the Stacks, Socratic Serve.
- eff: one effect object. Batch quotas below. Vocabulary:
  - {"t":"insight","c":"<concept>","v":5..25} (concept XP bonus; the default filler effect)
  - {"t":"stamina","v":1|2|3} (raises the Vigor meter used by trials)
  - {"t":"key","door":"<door id>"} (opens a locked chamber; use ONLY your assigned door ids)
  - {"t":"battle","v":1,"kind":"life"|"reveal"|"time"} (bonus in trials)
  - {"t":"ability","id":"dowse"|"lens"|"echo"|"beacon"|"stride"} (grants a verb: dowse finds relics, lens reveals a region's hidden perspective, echo replays a journal prompt, beacon grants one fast travel per day, stride speeds trial timers)
  - {"t":"path","region":"<region id>"} (reveals a shortcut portal to a region)
  - {"t":"perspective","c":"<concept>"} (grants a Perspective Token for the Prism trials)
- tags.c: one of the 12 concepts. tags.e: one of the 4 elements. tags.s: one subject from the list.
- kq: one knowledge question, open, second-order, ends with a question mark. Vary the stems: "How far...", "To what extent...", "Who decides...", "Under what circumstances...", "What role does...".
- ans: exactly 2 suggested answers, each 1-2 sentences, each carrying a reason. These model good TOK thinking for students. Make them disagree with each other or pull in different directions when possible.
- rw: 2-4 sentences on the real object in the real world and what it means for knowledge and culture. Factual, dated, placed. No invented facts.
- desc: 1-2 sentence in-game flavor line, atmospheric, shown on pickup.
- mla: 1-2 MLA-style entries students can follow to research the object. URL confidence law: only include URLs you are highly confident exist. Wikipedia article slugs are acceptable. Britannica, museum collection top pages, Smithsonian, BBC, Khan Academy only when you are sure of the path. Never invent deep links. Omit https:// prefix, start with the domain.
- img: "" unless the object is world-famous with an unmistakable Wikimedia Commons category. Then use the form commons.wikimedia.org/wiki/Category:Rosetta_Stone. When in doubt, leave "".

## Region ids
Existing world (use the fit):
hall = Atlas Hall (Guild hub) · baghdad = House of Wisdom · timbuktu = Sankoré Courtyard · kerala = Kerala Coast · maya = Maya Lowlands · rod = Rod & Chapter Hall (guild geometry) · hut8 = Hut 8 (Bletchley codebreaking) · royal = Royal Society Court · ulugh = Ulugh Beg's Observatory · shore = Wayfinder's Ocean (Pacific navigation) · beagle = The Beagle's Wake · haya = Haya Furnaces (Tanzanian steel) · ring = The Ring (particle physics) · florence = Bottega District · ukiyo = Ukiyo District (Edo prints) · benin = Benin City · harlem = Harlem (Renaissance) · songlines = Songlines Country · cave = The Painted Cave · library = The Great Library · griot = Griot Roads · zimbabwe = Great Zimbabwe · cusco = Cusco of Two Records (khipu and chronicle) · historian = The Grand Historian's Study (Sima Qian) · commission = Truth Commission Hall · seoul = Seoul (modern human sciences) · qero = Q'ero Highlands (Andean knowledge) · aggregate = The Aggregate (statistics)

New v37 regions (also valid):
reliquary = The Grand Reliquary (object hub) · vault_tech = The Engine Bazaar (technology theme) · vault_lang = The Tower of Tongues (language theme) · vault_pol = The Forum of Claims (politics theme) · vault_rel = The Pilgrim Roads (religion theme) · vault_knower = The Hall of Mirrors (knowledge and the knower)

## Canon lists
Concepts (12): Evidence, Certainty, Truth, Interpretation, Power, Justification, Explanation, Objectivity, Perspective, Culture, Values, Responsibility
Elements (4): Scope, Perspectives, Methods and Tools, Ethics
Subjects: Mathematics, Biology, Chemistry, Physics, ESS, Sports Science, Computer Science, History, Geography, Economics, Psychology, Global Politics, Business Management, World Religions, English A: Language and Literature, Literature A, Language B, Visual Arts, Music, Theatre, Film, Design Technology, Philosophy

## Batch quotas (per 85 objects)
- pl.mode: 25 floor, 20 npc, 15 cache, 10 shop, 15 minigame.
- eff: exactly 3 key (your assigned doors only), 8 stamina, 8 battle, 5 ability, 5 path, 10 perspective, rest insight.
- tags.c: each of the 12 concepts appears at least 5 times.
- tags.e: each element at least 15 times.
- tags.s: at least 14 different subjects.
- minigame placements: spread across at least 6 different minigame types.
- Regions: use at least 10 different region ids; lean on your assigned set.

## Style law (binding for every visible string)
- No em dashes anywhere. Use commas, periods, or colons.
- Active voice only.
- Short sentences. B2-level English. Concrete verbs.
- Never use these words or their variants: tension, delve, pivotal, crucial, underscore, important to note, genuine, genuinely, sharp, sharpen, sharply, sophisticated, honestly, honest, honesty, powerful, worth, work (noun or verb; "artwork" and "workshop" also banned; use piece, studio, made, created), real (use actual, physical, true-to-life, or name the thing), most people, not only, not just, but also, the kind of, doing something, something happens, the way that.
- Avoid these sentence openers and fillers: "it is", "this is", "there is", "that is", "that makes", "it is worth".
- Avoid the word "that" wherever grammar allows. Recast the sentence when needed.
- Exception: Power as a concept name (tags, kq) stays, since the IB syllabus names it. The adjective "powerful" stays banned.
- One more exception: URLs and proper titles of books, papers, and pieces keep their original wording.

## Verification before you finish
1. Parse your JSON file with node to confirm validity.
2. Confirm the count (85 minimum).
3. Scan your strings for banned words and em dashes; fix hits.
4. Reply with: final count, concept distribution, effect distribution, any tag outside canon (should be none), and the number of img links you filled.
