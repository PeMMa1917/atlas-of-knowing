#!/usr/bin/env python3
"""Final module: completes the cross-assessment matrix (P2→IO spoken transfer,
Bui→P2, artists→P2), struggle clinics, mixed sessions, extra sprints & themes."""
from content_texts import A, BLAKE, TWW, ADH, BUI, BANKSY, KRUGER, GALLENKUS

HS = 'Highly Scaffolded — steps are laid out for you'
LOW = 'Low — fine when tired'

# ── P2 → IO spoken-transfer frames ────────────────────────────────────
def p2_to_io():
    rows = []
    for p in TWW:
        n = p['name']
        rows.append(A(Assessment='Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'P2 → IO Transfer', 'Activity Type': 'Oral Dialogue',
            'Activity Title': f'{n}: Speak It Like an Oral',
            'Activity Description': (
              f"Deliver a 90-second SPOKEN analysis of '{n}' as if it were an IO extract: name the issue it raises ({p['theme']}), "
              f"describe {p['moment']}, analyse {p['tech']}, land a closing sentence. No writing allowed — voice only, timed. "
              f"Speaking your Paper 2 knowledge locks it deeper AND trains oral fluency in one rep."),
            'Time (min)': 6, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Verbal, Auditory, Analytical, Intrapersonal',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Session Use': 'IO Preparation', 'Materials': 'Timer',
            'Helps With': 'Speaking Confidence, Memory & Recall',
            'Why It Helps': "Retrieval through speech strengthens the same memory the written exam draws on — and doubles as oral-delivery training.",
            'Success Criteria': "Ninety fluent seconds with all four beats, no notes.",
            'If You Are Stuck': "Read the poem aloud first, then speak your analysis immediately while the sound is still in your ear."}))
    for e in ADH:
        n = e['name']
        rows.append(A(Assessment='Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'P2 → IO Transfer', 'Activity Type': 'Oral Dialogue',
            'Activity Title': f'{n}: Sixty Seconds on Stage',
            'Activity Description': (
              f"One minute, out loud, no notes: argue that {n} is the key to understanding {e['theme']} in A Doll's House. "
              f"Force yourself to include one precise moment ({e['detail'].split(';')[0]}) and one technique. "
              f"Spoken argument under time is transferable fitness — it serves the IO's delivery and Paper 2's fluency alike."),
            'Time (min)': 5, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Verbal, Auditory, Analytical, Intrapersonal',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Session Use': 'IO Preparation', 'Materials': 'Timer',
            'Helps With': 'Speaking Confidence, Memory & Recall',
            'Why It Helps': "Arguing aloud converts passive play-knowledge into deployable, examiner-ready fluency for both spoken and written assessment.",
            'Success Criteria': "The minute filled, the moment named, the technique named.",
            'If You Are Stuck': "Open with the formula: 'If you want to understand [theme], watch [element].' Momentum follows."}))
    return rows

# ── Bui → Paper 2 bridges ─────────────────────────────────────────────
def bui_to_p2():
    rows = []
    for e in BUI:
        n = e['name']
        rows.append(A(Assessment='Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 2 Transfer', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: The Ibsen Household Test',
            'Activity Description': (
              f"Family, duty, and what parents owe children run through both The Best We Could Do and A Doll's House. "
              f"Take {n} — {e['detail'].split(';')[0]} — and set it against the Helmer household: who sacrifices, who decides, who leaves? "
              f"Write four comparative sentences on how Bui's panels and Ibsen's stagecraft handle {e['gi']} differently. "
              f"Comparing ACROSS your assessments builds the linking mind the whole course rewards."),
            'Time (min)': 14, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Logical, Writing, Solitary',
            'Text Type(s)': "Graphic Novel, A Doll's House", 'Text / Work Focus': "Thi Bui, A Doll's House",
            'Helps With': 'Comparative Linking, Fresh Ideas & Interpretation',
            'Why It Helps': "One session revises an IO text and a Paper 2 work while training comparison — triple duty.",
            'Success Criteria': "Your sentences compare METHODS (panel vs stage), not just situations.",
            'If You Are Stuck': "Start from 'the best we could do' as a sentence Nora could say. Would she mean it the same way?"}))
    return rows

# ── Artists → Paper 2 bridges ─────────────────────────────────────────
def artists_to_p2():
    rows = []
    banks = ([(w, 'Banksy', "Duffy's wives deflate heroic myths the way Banksy deflates institutions") for w in BANKSY] +
             [(w, 'Barbara Kruger', "Kruger's direct address and Duffy's monologues both conscript their audience") for w in KRUGER] +
             [(w, 'Ugur Gallenkuş', "Gallenkuş's split frames and Ibsen's staged contrasts both argue through juxtaposition") for w in GALLENKUS])
    for w, artist, hook in banks:
        n = w['name']
        rows.append(A(Assessment='Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 2 Transfer', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: Protest Meets Poetry',
            'Activity Description': (
              f"{hook}. Test it with {n} ({w['detail'].split(',')[0]}): find the TWW poem or ADH beat that mounts the most similar critique "
              f"of {w['gi']}. Three sentences: the shared target, each maker's method (visual vs literary toolkit), and which lands harder on you — "
              f"with a reason an examiner would accept."),
            'Time (min)': 12, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Analytical, Logical, Solitary',
            'Text Type(s)': 'Artwork, The World\'s Wife, A Doll\'s House'.replace('\\', ''), 'Text / Work Focus': f"{artist}, The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Fresh Ideas & Interpretation',
            'Why It Helps': "Linking your visual body of work to your Paper 2 texts multiplies revision — one comparison, three assessments touched.",
            'Success Criteria': "The 'lands harder' verdict has a technique-based reason, not a taste-based one.",
            'If You Are Stuck': "Match targets first: institutions → Banksy×'Mrs Sisyphus's pointless system; consumer identity → Kruger×'Mrs Faust'; unequal childhoods → Gallenkuş×the Helmer children."}))
    return rows

# ── Blake × Bui literary pairings ─────────────────────────────────────
BLAKE_BUI = [
  ('The Chimney Sweeper (Innocence)', 'Bố\'s Childhood Chapters', 'children absorbing the logic of a world that uses them'),
  ('London', 'Maps & Borders', 'systems marking every life they touch'),
  ('Infant Sorrow', 'The Opening Birth Scene', 'birth as struggle and the family as first battlefield'),
  ('The Ecchoing Green', 'The Ending: Watching Her Son Swim', 'generational cycles closing in peace'),
  ('A Poison Tree', 'The "Refugee Reflex"', 'buried feeling shaping behaviour years later'),
  ('Holy Thursday (Experience)', 'The Boat Escape', 'institutional failure and children paying the price'),
  ('The Sick Rose', 'Panel Gutters & Silence', 'harm that lives in what is unsaid or unseen'),
  ('The Tyger', 'Water Imagery', 'awe and terror sharing one symbol'),
  ('Nurse\'s Song (Innocence)', 'Má\'s Story', 'caretakers negotiating what children may have'),
  ('The Divine Image', 'The Mother\'s Arms Pair (see Gallenkuş) — or Bui\'s birth scenes', 'the human form as the site of mercy'),
  ('The Garden of Love', 'Redrawn Family Photographs', 'institutions and archives rewriting private memory'),
  ('The Clod and the Pebble', 'The Title\'s Verdict', 'two philosophies of love under one roof'),
]

def blake_bui_rows():
    rows = []
    for bl, bu, ground in BLAKE_BUI:
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral Preparation',
            **{'Skill Focus': 'Literary-to-Literary Linking', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{bl} × {bu}: Shared Ground',
            'Activity Description': (
              f"Your two literary IO options can illuminate each other. Set Blake's '{bl}' beside Bui's {bu}: both circle {ground}. "
              f"Write a five-line comparison: the shared concern / Blake's key device / Bui's key device / one quotation or panel each / "
              f"which would pair better with your non-literary body of work, and why. This is IO selection thinking made visible."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Reading, Logical, Solitary',
            'Text Type(s)': 'Poems, Graphic Novel', 'Text / Work Focus': 'William Blake, Thi Bui',
            'Session Use': 'IO Preparation',
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "Knowing WHY you chose your literary text (against the alternative) produces the confident justifications examiners probe for.",
            'Success Criteria': "The final line makes a real selection argument, not a shrug.",
            'If You Are Stuck': "Score each text /5 for: vivid extract? clear issue link? techniques you can name? The numbers decide."}))
    return rows

# ── Struggle clinics ("I'm stuck on…") ────────────────────────────────
CLINICS = [
  ('Getting Started', 'The Blank-Page Protocol',
   "When starting feels impossible, run this exact sequence: (1) Write the date and the task name — your hand is now moving. (2) Write one true, "
   "obvious sentence about the text or question. (3) Write 'What I actually think is…' and finish it, badly. (4) Set a 10-minute timer and forbid "
   "stopping. Most blocks die at step 3; the timer buries them. Practise the protocol once today so it's rehearsed before you need it."),
  ('Analysis Depth', 'The So-What Chain',
   "If your analysis stops at identification ('this is a metaphor'), chain it: write the technique, then ask 'so what?' and answer; then ask 'so what?' "
   "of THAT answer; once more. Three so-whats takes you from feature → effect → meaning → wider purpose. Run the chain on three techniques "
   "in any text today. Depth is a drill, not a gift."),
  ('Structure & Planning', 'The Skeleton-First Habit',
   "Essays wobble when structure is improvised. Rehearse the fix: for any question, spend five minutes producing only: thesis (one line), three point "
   "headers (four words each), evidence tag under each (two words). No prose allowed. Do two skeletons today on different questions. "
   "Writing from skeletons feels like following a map instead of exploring a swamp."),
  ('Time Management', 'The Time-Box Rehearsal',
   "Exam time evaporates in the first task. Train the split: for your next paper, write the minute-marks ON the plan (P1 90 min = 15 read/plan + "
   "65 write + 10 check). Then rehearse ONE section at its real length today with a visible timer. You're not practising content — you're practising "
   "obeying the clock, which is its own skill."),
  ('Quotations & Evidence', 'The Evidence Emergency Kit',
   "Can't remember quotes under pressure? Build the kit: pick just SIX micro-quotes per work (under six words each). Write them on one card. "
   "Test yourself at three spaced points today. Six secured quotes, deployed well, outscore thirty half-known ones. The kit is small on purpose — "
   "small survives adrenaline."),
  ('Comparative Linking', 'The While-Whereas Gym',
   "If comparison collapses into 'text A does X. Text B does Y.', drill the joining shapes: write five sentences about your texts, each using a different "
   "comparative frame: 'While…', 'Whereas…', 'Both… yet…', 'Where X…, Y instead…', 'X's [technique] finds its counterpart in Y's…'. "
   "The grammar forces the linking thought. Five reps today."),
  ('Speaking Confidence', 'The Volume Ladder',
   "Speaking feels exposed, so climb gradually: (1) whisper your IO opening to yourself; (2) say it at normal volume to a wall; (3) record it and listen; "
   "(4) deliver it to one trusted person or pet. One rung per day is legitimate progress. Confidence is volume plus reps, not personality."),
  ('Exam Confidence & Calm', 'The Rehearsed Reset',
   "Build your mid-exam reset NOW: pen down → one slow exhale, longer than the inhale → read the question again, underline the verb → write the "
   "dumbest true sentence. Rehearse the full sequence twice today when calm. A reset that exists only in theory won't surface in panic; "
   "a rehearsed one will."),
  ('Vocabulary & Terminology', 'The Five-a-Day Register',
   "Analytical vocabulary grows by adoption, not memorisation: adopt FIVE terms today (say, juxtaposition, register, foregrounds, connotes, positions). "
   "Use each in one spoken and one written sentence about texts you know. Terms used twice in two modes stick; lists of thirty don't. "
   "Repeat with five new ones next week."),
  ('Memory & Recall', 'The Retrieval Reset',
   "Re-reading feels like learning but isn't. Convert one topic today: close the notes, blank page, write everything you recall (2 min), then check and "
   "mark gaps in colour. The discomfort of the blank page IS the learning. One retrieval beats three re-readings — schedule two more this week."),
  ('Focus & Motivation', 'The Two-Minute Contract',
   "When motivation is gone, sign the smallest contract: 'I will do exactly two minutes, then I may stop guilt-free.' Set the timer, start the task. "
   "Stopping is genuinely allowed — but starting usually recruits its own momentum. Use it today on the task you've avoided longest. "
   "The contract works because it's honest."),
  ('Fresh Ideas & Interpretation', 'The Contrarian Pass',
   "If your readings feel obvious, schedule a contrarian pass: take your current interpretation and argue the opposite for five minutes in writing — "
   "the strongest case you can. You'll either discover a richer reading or return with proof your first one holds. Either result upgrades the essay. "
   "Run it on one text today."),
]

def clinic_rows():
    rows = []
    for helps, title, desc in CLINICS:
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Scaffolded Support',
            **{'Skill Focus': 'Targeted Clinic', 'Activity Type': 'Guided Analysis',
            'Activity Title': f'Clinic — {title}',
            'Activity Description': desc, 'Time (min)': 15, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Logical, Intrapersonal, Writing, Solitary',
            'Difficulty': 'Foundational', 'Support Level': HS, 'Energy Level': LOW,
            'Session Use': 'Core Activity',
            'Helps With': f'{helps}, Exam Confidence & Calm' if helps != 'Exam Confidence & Calm' else 'Exam Confidence & Calm, Getting Started',
            'Why It Helps': "A named struggle deserves a named protocol — this clinic turns a vague weakness into a repeatable exercise.",
            'Success Criteria': "You ran the protocol once for real today, not just read it.",
            'If You Are Stuck': "Do the first numbered step only. Clinics compound; step one today is the whole assignment."}))
    return rows

# ── Mixed cross-assessment sessions ───────────────────────────────────
MIXED = [
  ('The Voice Session', "One hour on VOICE across everything you study: (1) 15 min — a TWW monologue's persona construction; (2) 15 min — Kruger's pronouns "
   "or Blake's speakers; (3) 15 min — a found first-person Paper 1 text (column, confession ad); (4) 15 min — write one paragraph: 'What I now know "
   "about constructed voice', with one example from each arena. Three assessments, one concept, permanently linked.", 60),
  ('The Juxtaposition Session', "One hour on JUXTAPOSITION: Gallenkuş composite (15) → ADH's staged contrasts, e.g. party upstairs / reckoning downstairs (15) → "
   "a before/after ad or protest photo (15) → synthesis paragraph with all three (15). The technique will never look singular again.", 60),
  ('The Power Session', "One hour on POWER: Banksy's authority-mocking works (15) → Torvald and the letterbox (15) → 'Little Red-Cap' or 'Circe' (15) → "
   "one spoken 2-minute mini-IO linking any two, recorded (15). Every assessment's favourite theme, cross-wired.", 60),
  ('The Childhood Session', "One hour on CHILDHOOD: Blake's sweeps and infants (15) → Bui's drawn childhoods (15) → Gallenkuş's split childhoods (15) → "
   "build one IO-ready pairing on 'how childhood is used to indict adults', with extracts chosen (15).", 60),
  ('The Silence Session', "One hour on SILENCE & OMISSION: Bui's wordless panels (15) → what Nora doesn't say until Act Three (15) → what an ad or press "
   "release omits (15) → paragraph: 'Silence as technique', three examples (15). The subtlest skill in the course, made systematic.", 60),
  ('The Transformation Session', "One hour on TRANSFORMATION: 'Thetis' and 'Mrs Midas' (15) → Nora's costume-to-doorway arc (15) → a brand rebrand or "
   "makeover ad (15) → comparison table + one thesis sentence spanning all three (15).", 60),
  ('The Direct Address Session', "One hour on DIRECT ADDRESS: Kruger's 'you' (15) → Blake's questions to lamb and tiger (15) → second-person adverts and "
   "PSAs (15) → write three sentences, one per arena, each naming a DIFFERENT effect of 'you' (15). One pronoun, three exams.", 60),
  ('The Endings Session', "One hour on ENDINGS: Duffy's last-line verdicts across three poems (15) → the door slam (15) → how ads and articles close "
   "(CTA, kicker) (15) → paragraph: what endings do that openings can't (15). High-yield everywhere.", 60),
]

def mixed_rows():
    rows = []
    for title, desc, t in MIXED:
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'Mixed Concept Session', 'Activity Type': 'Analytical Framework',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Analytical, Logical, Multimodal, Solitary',
            'Text / Work Focus': '', 'Session Use': 'Core Activity',
            'Materials': 'Timer, Pen & Paper, Device',
            'Energy Level': 'High — needs full focus',
            'Exam Proximity': 'Months Away, Weeks Away',
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "Concept-led sessions weave every assessment into one net — knowledge that connects is knowledge that survives exams.",
            'Success Criteria': "All four blocks happened and the synthesis product exists.",
            'If You Are Stuck': "Run it at half scale (7-minute blocks). The structure matters more than the duration."}))
    return rows

# ── Extra warm-up sprints & vocabulary flashes ────────────────────────
SPRINTS2 = [
  ('Sibilance & Sound Texture', 'brand names and slogans around you'),
  ('Metaphor vs Simile Snap', 'song lyrics or sports commentary'),
  ('Passive Voice Hunt', 'news alerts and official statements'),
  ('Modality (must/may/should)', 'school rules, terms of service, adverts'),
  ('Superlatives & Absolutes', 'ads and thumbnails ("best ever", "everyone")'),
  ('Scare Quotes & Irony Marks', 'headlines and social posts'),
  ('Ellipsis & What Got Cut', 'trailers, pull-quotes, captions'),
  ('Typography as Tone', 'any two apps\' notification styles'),
  ('Framing Verbs in News', "who 'claims' vs who 'confirms' in one story"),
  ('Register Mixing', 'formal words in casual posts, slang in ads'),
  ('Numbers as Persuasion', "prices ending in 9, '9 out of 10', countdowns"),
  ('Colour Coding', 'warning labels, sale signs, app badges'),
]
VOCAB = [
  ('Visual Analysis Word Bank', 'composition, focal point, negative space, leading lines, colour palette, saturation, framing, depth of field, iconography, salience'),
  ('Sound & Rhythm Word Bank', 'cadence, assonance, sibilance, plosive, metre, caesura, enjambment, refrain, euphony, cacophony'),
  ('Structure Word Bank', 'foregrounds, juxtaposes, frames, delays, withholds, escalates, circles back, fragments, intercuts, resolves'),
  ('Tone Word Bank: Critical', 'scathing, wry, acerbic, elegiac, clinical, deadpan, indignant, mordant, rueful, caustic'),
  ('Tone Word Bank: Warm', 'tender, reverent, buoyant, wistful, intimate, celebratory, consoling, playful, earnest, nostalgic'),
  ('Argument Verb Bank', 'contends, posits, concedes, refutes, qualifies, undermines, corroborates, insinuates, legitimises, indicts'),
  ('Drama & Stagecraft Word Bank', 'blocking, proxemics, tableau, aside, dramatic irony, fourth wall, stage business, exeunt, set dressing, sightlines'),
  ('Comics & Graphic Word Bank', 'panel, gutter, bleed, splash page, speech balloon, caption box, line weight, wash, braiding, closure'),
  ('Media & Digital Word Bank', 'clickbait, algorithmic feed, engagement, parasocial, astroturfing, native advertising, paywall, virality, doomscroll, thumbnail'),
  ('Poetry Form Word Bank', 'dramatic monologue, persona, volta, sonnet, quatrain, tercet, blank verse, apostrophe, conceit, lyric'),
]

def sprint_rows():
    rows = []
    for tech, where in SPRINTS2:
        rows.append(A(Assessment='Paper 1', Category='Warm-Up Sprints',
            **{'Skill Focus': 'Technique Spotting', 'Activity Type': 'Skill Drill',
            'Activity Title': f'90-Second Spot: {tech}',
            'Activity Description': (
              f"Ninety seconds: find one live example of {tech.lower()} in {where}. Capture the exact words/details, the target audience, "
              f"and a one-word effect. Stop at the bell. Daily micro-spotting compounds into exam-speed recognition."),
            'Time (min)': 2, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Logical, Solitary',
            'Session Use': 'Warm-Up', 'Location': 'Anywhere',
            'Materials': 'None — just your eyes and brain',
            'Energy Level': LOW, 'Support Level': HS,
            'Helps With': 'Analysis Depth, Getting Started',
            'Why It Helps': "Tiny daily reps make technique-spotting automatic — exam attention then goes to analysis, not hunting.",
            'Success Criteria': "One example, one target, one effect-word inside the 90 seconds.",
            'If You Are Stuck': "Your lock screen and its notifications are already a text. Start there."}))
    for bank, words in VOCAB:
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Warm-Up Sprints',
            **{'Skill Focus': 'Terminology Building', 'Activity Type': 'Skill Drill',
            'Activity Title': f'Vocabulary Flash: {bank}',
            'Activity Description': (
              f"Three minutes with today's bank: {words}. Step 1 — tick the ones you could define aloud right now. Step 2 — pick TWO unticked, "
              f"look them up, and use each in one sentence about a text you're studying. Step 3 — add both to your flashcard deck. "
              f"Two honest adoptions per session beats skimming the whole list."),
            'Time (min)': 3, 'IB Criterion': 'D',
            'Style Preference': 'Linguistic, Reading, Writing, Solitary',
            'Session Use': 'Warm-Up', 'Materials': 'Flashcards, Pen & Paper',
            'Energy Level': LOW, 'Support Level': HS,
            'Exam Proximity': 'Any Time',
            'Helps With': 'Vocabulary & Terminology, Memory & Recall',
            'Why It Helps': "Criterion D moves when working vocabulary grows — and vocabulary grows two words at a time, used, not thirty at a time, skimmed.",
            'Success Criteria': "Two new terms used in real sentences about your texts.",
            'If You Are Stuck': "Choose the two shortest unticked words. Short terms get used; long ones get admired."}))
    return rows

# ── Extra P2 themes ───────────────────────────────────────────────────
THEMES2 = [
  ('Secrets & Exposure', "the letterbox ticking toward disclosure", "wives narrating what history hushed up ('Pilate's Wife', 'The Devil's Wife')"),
  ('Respectability & Class', "Torvald's bank-manager morality", "'Mrs Faust's purchased status; the Krays' underworld codes"),
  ('Fathers & Inheritance', "Nora repeating papa's doll-life; Rank's inherited disease", "'Queen Herod' protecting a daughter; 'Demeter' receiving one"),
  ('Names, Titles & Identity', "'Mrs Helmer' versus Nora; the pet names", "every 'Mrs' title in the collection — identity via the husband, then beyond him"),
  ('Domestic Objects as Weapons', "macaroons, the tree, the stove, the lamp", "the pear turning gold; the second-best bed; Circe's cookware"),
  ('Exits & Endings', "the door slam heard across a century", "walking out of the forest in 'Little Red-Cap'; 'Mrs Beast' keeping the upper hand"),
]

def themes2_rows():
    rows = []
    for th, adh, tww in THEMES2:
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Thematic Study',
            **{'Skill Focus': 'Theme Ladder', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{th}: Build the Ladder',
            'Activity Description': (
              f"Five-rung evidence ladder for '{th.lower()}': define it in your own sentence → one ADH moment ({adh}) with a micro-quote → "
              f"one TWW moment ({tww}) with a micro-quote → one technique per text → thesis on the texts' DIFFERENT verdicts. "
              f"File the ladder in your comparison bank."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Logical, Spatial, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "Paper 2 questions are theme-shaped — each pre-built ladder is a third of an essay plan waiting.",
            'Success Criteria': "Rung five names a genuine difference in verdict.",
            'If You Are Stuck': "Rung stem: 'While Duffy's speakers [verb], Ibsen stages [character] [verbing]…'"}))
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Exam Technique',
            **{'Skill Focus': 'Timed Planning', 'Activity Type': 'Exam Practice',
            'Activity Title': f'{th}: Five-Minute Plan Sprint',
            'Activity Description': (
              f"Frame an exam question on {th.lower()} ('In what ways and to what effect…'), then plan in five timed minutes: thesis, "
              f"three comparative points drawing on {adh.split(';')[0]} and {tww.split(';')[0]}, evidence tags. Stop at the bell; rate the plan /10."),
            'Time (min)': 8, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Session Use': 'Exam Practice', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week', 'Energy Level': 'High — needs full focus',
            'Helps With': 'Time Management, Structure & Planning',
            'Why It Helps': "Plan-sprints are Paper 2's highest-leverage rep — drift, not ignorance, sinks most essays.",
            'Success Criteria': "A stranger could see both texts and three points in your five-minute plan.",
            'If You Are Stuck': "Point 1 similarity, points 2–3 escalating differences. It nearly always fits."}))
    return rows

# ── Exam-morning primers & recovery ───────────────────────────────────
def morning_rows():
    rows = []
    data = [
      ('Paper 1', 'Exam-Morning Primer: Paper 1', "Twenty minutes, morning of Paper 1 — warm the engine, don't flood it: one 90-second technique spot "
       "on any breakfast-table text → read your six favourite analytical verbs aloud → one purpose/audience/technique jotting on a found ad → "
       "re-read your tomorrow-morning note. Stop. Arrive warm, not spent."),
      ('Paper 2', 'Exam-Morning Primer: Paper 2', "Twenty minutes, morning of Paper 2: walk your ADH memory palace once → say eight micro-quotes aloud "
       "(four per text) → read one theme ladder slowly → speak your thesis formula once. No new material, no practice essays. "
       "Consolidation only; the work is already in you."),
      ('Individual Oral', 'IO-Day Primer', "Ninety minutes before your IO: deliver ONLY the four signposts aloud twice → walk through your ten glance-card "
       "bullets once, slowly → one full exhale routine → say your opening sentence at performance volume once. Do NOT run the full ten minutes — "
       "you'd leave your best take in the corridor. Trust the reps you've banked."),
      ('Paper 1', 'Post-Mock Recovery: Paper 1', "Within 48 hours of a Paper 1 mock: re-read your response once without judgement → underline the best sentence "
       "you wrote → log ONE structural fix and ONE vocabulary fix in your error log → do a single 12-minute paragraph sprint applying both. "
       "Close the loop; skip the self-flagellation."),
      ('Paper 2', 'Post-Mock Recovery: Paper 2', "Within 48 hours of a Paper 2 mock: reconstruct your essay's skeleton from memory — thesis and point headers "
       "only → compare with what you actually wrote; note where the plan drifted → write the missing or broken paragraph properly, untimed. "
       "One repaired paragraph teaches more than a full re-sit."),
      ('Individual Oral', 'Post-Rehearsal Recovery: IO', "After a rough IO rehearsal: write three lines — what survived, what collapsed, what surprised you. "
       "Fix ONLY the collapsed section: re-outline it, deliver just that section twice. Then one full run tomorrow, not today. "
       "Rebuilding beats re-running when morale is low."),
    ]
    for assess, title, desc in data:
        prox = 'Night Before' if 'Primer' in title else 'Weeks Away, Final Week'
        rows.append(A(Assessment=assess, Category='Exam Countdown',
            **{'Skill Focus': 'Exam-Day Routine' if 'Primer' in title else 'Mock Debrief',
            'Activity Type': 'Exam Prep',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': 20, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Intrapersonal, Verbal, Logical, Solitary',
            'Text / Work Focus': "The World's Wife, A Doll's House" if assess == 'Paper 2' else ('William Blake, Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş' if assess == 'Individual Oral' else ''),
            'Session Use': 'Exam Practice' if 'Recovery' in title else 'Warm-Up',
            'Exam Proximity': prox, 'Support Level': HS, 'Energy Level': LOW,
            'Helps With': 'Exam Confidence & Calm, Focus & Motivation',
            'Why It Helps': "Ritualised mornings and debriefs convert anxiety into procedure — procedure is followable under any mood.",
            'Success Criteria': "You followed the sequence as written, including the stopping.",
            'If You Are Stuck': "Do the aloud parts only. Voice first; the rest follows."}))
    return rows

def all_rows():
    return (p2_to_io() + bui_to_p2() + artists_to_p2() + blake_bui_rows() + clinic_rows() +
            mixed_rows() + sprint_rows() + themes2_rows() + morning_rows())

if __name__ == '__main__':
    rows = all_rows()
    print(f'{len(rows)} final-module activities')
    from collections import Counter
    for k, v in Counter(r['Category'] for r in rows).most_common(): print(f'  {v:4d}  {k}')
