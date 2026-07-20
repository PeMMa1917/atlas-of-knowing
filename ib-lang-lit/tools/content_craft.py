#!/usr/bin/env python3
"""Craft activities: IO preparation, cross-assessment technique bridges,
Paper 2 thematic/exam craft, Paper 1 text-type expansion."""
from content_texts import A

# ═══════════════════════════════════════════════════════════════════════
#  INDIVIDUAL ORAL CRAFT
# ═══════════════════════════════════════════════════════════════════════
GI_FIELDS = [
  ('Culture, Identity and Community', 'belonging, language loss, diaspora, tradition versus change'),
  ('Beliefs, Values and Education', 'what children are taught to accept, religious authority, schooling as shaping'),
  ('Politics, Power and Justice', 'who holds power, protest, surveillance, institutional control'),
  ('Art, Creativity and Imagination', 'who gets to create, censorship, the power of images'),
  ('Science, Technology and the Environment', 'industrialisation, media technology, humans and nature'),
]
LIT = [('a Blake poem', 'William Blake'), ('a chapter of The Best We Could Do', 'Thi Bui')]
NONLIT = [('a Banksy work', 'Banksy'), ('a Kruger piece', 'Barbara Kruger'), ('a Gallenkuş composite', 'Ugur Gallenkuş')]

def io_craft_rows():
    rows = []
    # GI refinement per field × pairing
    for field, examples in GI_FIELDS:
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral Preparation',
            **{'Skill Focus': 'Global Issue Refinement'},
            **{'Activity Type': 'IO Prep', 'Activity Title': f'Narrow the Field: {field}',
            'Activity Description': (
              f"The IB field '{field}' is too broad to BE your global issue — it's the neighbourhood, not the address. "
              f"Brainstorm four specific issues inside it (think: {examples}). For each, ask the two IB tests: is it significant on a wide/global scale? "
              f"Is it visible in BOTH one of your literary texts and one body of work? Circle the one that passes best and draft it as a single sentence."),
            'Time (min)': 12, 'IB Criterion': 'A, C',
            'Style Preference': 'Logical, Analytical, Writing, Solitary',
            'Text Type(s)': 'Any', 'Text / Work Focus': '',
            'Session Use': 'IO Preparation',
            'Helps With': 'Getting Started, Structure & Planning',
            'Why It Helps': "A well-scoped global issue is the single biggest predictor of a coherent IO — everything else hangs from it.",
            'Success Criteria': "Your circled issue fits in one sentence and you can already name one moment per text for it.",
            'If You Are Stuck': "Use the frame: 'the way [group/system] [verbs] [group/thing]' — e.g. 'the way institutions justify child labour'."}))
        for lit_label, lit_work in LIT:
            for nl_label, nl_work in NONLIT:
                rows.append(A(Assessment='Individual Oral', Category='Individual Oral Preparation',
                    **{'Skill Focus': 'Text Pairing Studio'},
                    **{'Activity Type': 'IO Prep', 'Activity Title': f'Pairing Lab: {lit_work} × {nl_work} on {field.split(",")[0]}',
                    'Activity Description': (
                      f"Audition the pairing of {lit_label} with {nl_label} for an issue in the field of {field.lower()} "
                      f"(e.g. {examples.split(',')[0]}). Fill a five-line audition card: the issue in one sentence / strongest extract moment from each / "
                      f"one technique each / what the PAIRING shows that neither text shows alone. Verdict out of 10 — keep a league table of your auditions."),
                    'Time (min)': 15, 'IB Criterion': 'A, B, C',
                    'Style Preference': 'Analytical, Logical, Writing, Solitary',
                    'Text Type(s)': 'Poems, Graphic Novel, Artwork', 'Text / Work Focus': f'{lit_work}, {nl_work}',
                    'Session Use': 'IO Preparation',
                    'Helps With': 'Comparative Linking, Structure & Planning',
                    'Why It Helps': "Choosing the right pairing IS the IO — auditioning pairs systematically beats settling for the first idea.",
                    'Success Criteria': "The audition card's last line names something only the pairing reveals.",
                    'If You Are Stuck': "Score each line of the card 0–2 as you go. A pairing scoring under 6 is telling you something."}))
    # Structure & delivery drills (hand-written)
    drills = [
      ('The 40/40/20 Blueprint', 'IO Prep', 'Structure & Outline',
       "Draft your IO skeleton on one page: ~4 minutes literary text + extract, ~4 minutes body of work + extract, ~2 minutes synthesis. "
       "Under each block write ONE thesis-bullet and TWO evidence-bullets. No sentences — bullets only. This page is your master map; every rehearsal starts from it.",
       15, 'A, B, C', 'Logical, Spatial, Writing, Solitary', 'Structure & Planning, Getting Started',
       "The IO rewards balanced treatment — a timed blueprint prevents the classic error of spending seven minutes on the first text.",
       "Your skeleton fits one page and the two text blocks are visibly equal in weight.",
       "Steal this spine: issue → text 1 close reading → text 2 close reading → what they show together. Fill in bullets."),
      ('Ten-Minute Dry Run', 'Exam Practice', 'Full Rehearsal',
       "Deliver your full IO aloud with a visible timer: 10 minutes, no stopping, glance-notes only (10 bullet points maximum). "
       "Whatever goes wrong, keep going — recovering IS the skill. Afterwards note: where did you overrun? Which section felt thin? Fix only the worst section before your next run.",
       20, 'A, B, C, D', 'Verbal, Auditory, Kinesthetic, Intrapersonal', 'Speaking Confidence, Time Management',
       "Nothing predicts IO performance like full-length timed rehearsals — each one you complete lowers exam-day adrenaline.",
       "You reached the synthesis section before 8:30 and finished by 10:00.",
       "Do a 5-minute half-scale version first: 2 min per text, 1 min synthesis. Then double it."),
      ('The Extract X-Ray', 'IO Prep', 'Extract Selection',
       "Take your candidate extract (max 40 lines or one visual work). Highlight in three colours: evidence for your global issue / striking technique / lines you'd cut if allowed. "
       "If the first two colours don't dominate, this is the wrong extract. Choose the 4–6 moments you will actually reference, and number them in speaking order.",
       12, 'A, B', 'Visual, Reading, Logical, Solitary', 'Structure & Planning, Quotations & Evidence',
       "Examiners reward candidates who navigate a deliberately chosen extract — not ones who gesture at a whole text.",
       "You have 4–6 numbered moments, each tagged with issue-relevance and a technique.",
       "Ask of every line: 'does this earn its place for MY issue?' Cut ruthlessly; what remains is your map."),
      ('Signpost Rehearsal', 'IO Prep', 'Cohesion & Delivery',
       "Practise only your connective tissue: say aloud, from memory, your opening sentence, the bridge from text 1 to text 2, the pivot into synthesis, and your closing sentence. "
       "Four sentences, polished until automatic. These are the moments nerves attack first — armour them.",
       8, 'C', 'Verbal, Auditory, Intrapersonal', 'Speaking Confidence, Structure & Planning',
       "Criterion C is largely won in the joins — rehearsed transitions keep the argument visibly organised under pressure.",
       "You can deliver all four signposts back-to-back without notes.",
       "Write each signpost on one flashcard. Shuffle and test yourself out of order."),
      ('The Question Storm', 'IO Prep', 'Teacher Q&A Preparation',
       "After your 10 minutes, your teacher asks questions for 5. Predict them: write eight questions you'd ask if you were the examiner "
       "(the mean ones too — 'isn't this issue too broad?', 'what would a critic say against your reading?'). Answer two aloud in full sentences. "
       "Repeat with two different questions tomorrow.",
       15, 'A, B, C, D', 'Verbal, Analytical, Intrapersonal', 'Speaking Confidence, Fresh Ideas & Interpretation',
       "The discussion section is unscripted by design — but predicted questions convert most of it back into prepared ground.",
       "You answered without a silence longer than three seconds.",
       "Start every answer with 'That's fair — and…' or 'In the text itself…' — stems that buy thinking time."),
      ('Glance-Card Bootcamp', 'IO Prep', 'Notes Discipline',
       "You may bring ten bullet points. Build them: one bullet per structural beat, maximum six words each, no full sentences. "
       "Now rehearse two minutes of your IO using ONLY the card. If you read any bullet aloud verbatim, rewrite it shorter. The card is a trampoline, not a script.",
       12, 'C', 'Writing, Kinesthetic, Logical, Solitary', 'Speaking Confidence, Memory & Recall',
       "Over-written notes cause reading-aloud — the fastest way to lose Criterion D marks for delivery.",
       "Every bullet is ≤6 words and triggers a paragraph of speech.",
       "Write the bullet as the QUESTION your paragraph answers ('why gutters?') rather than its summary."),
      ('Record, Listen, Once', 'Reflection', 'Self-Assessment',
       "Record any two-minute slice of your IO. Listen back once with the rubric beside you and score yourself honestly on all four criteria. "
       "Write one sentence per criterion: the single change that would raise it. Re-record the same slice applying only Criterion-with-lowest-score's fix.",
       15, 'A, B, C, D', 'Auditory, Intrapersonal, Logical', 'Speaking Confidence, Analysis Depth',
       "Self-marking against the actual rubric converts vague worry into a specific to-do list.",
       "Your re-recording measurably improves the targeted criterion.",
       "Can't bear your own voice? Normal. Listen anyway — it fades by the third time, and the data is worth it."),
      ('The Cold Open', 'IO Prep', 'Openings',
       "Draft three different opening sentences for your IO: one starting from the global issue in the world today, one from a striking detail in a text, "
       "one from a question. Say each aloud. Keep the one that makes you want to continue — and note why it works: that's your rhetorical signature.",
       10, 'C', 'Verbal, Writing, Fresh Ideas: Intrapersonal'.replace('Fresh Ideas: ',''), 'Getting Started, Speaking Confidence',
       "First impressions frame the whole assessment — a rehearsed, confident open settles you AND the examiner.",
       "One opening chosen, memorised, and deliverable while making eye contact.",
       "Borrow the shape 'In [text], [detail]. That detail is not small — it is [issue] in miniature.'"),
      ('Balance Audit', 'Reflection', 'Structure & Outline',
       "Take your latest full rehearsal (or plan) and audit the minutes: literary text / body of work / synthesis / anything else. Draw it as a bar chart. "
       "The IB expects roughly equal treatment of both texts — if one bar dwarfs the other, list two cuts and one addition to rebalance before your next run.",
       10, 'C', 'Logical, Spatial, Visual, Solitary', 'Structure & Planning, Time Management',
       "Unbalanced treatment is one of the most common IO penalties — and one of the easiest to fix with data.",
       "Your two text bars are within a minute of each other on paper.",
       "Can't cut anything? Move it to the Q&A ammunition list — nothing is wasted, it's just relocated."),
      ('Technique Vocabulary Sprint: Visual', 'Warm-Up', 'Terminology',
       "Sixty seconds: list every visual-analysis term you can use in the IO (juxtaposition, framing, stencil, typography, colour palette, focal point, "
       "composition, negative space, direct address…). Circle the five you actually use when speaking. Tomorrow, deliberately use two NEW ones in rehearsal.",
       5, 'B, D', 'Verbal, Logical, Solitary', 'Vocabulary & Terminology, Analysis Depth',
       "Criterion D rewards a precise analytical register — terms you can deploy aloud, not just recognise.",
       "Two new terms appeared naturally in your next rehearsal.",
       "Steal terms from photography tutorials: rule of thirds, leading lines, depth of field all transfer."),
    ]
    for title, session, skill, desc, t, crit, styles, helps, why, succ, stuck in drills:
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral Preparation',
            **{'Skill Focus': skill, 'Activity Type': 'IO Prep' if session != 'Exam Practice' else 'Exam Practice',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': crit,
            'Style Preference': styles, 'Text Type(s)': 'Any',
            'Text / Work Focus': 'William Blake, Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş',
            'Session Use': session, 'Exam Proximity': 'Weeks Away, Final Week',
            'Materials': 'Timer, Recording Device, Pen & Paper' if 'ecord' in desc else 'Pen & Paper, Timer',
            'Energy Level': 'High — needs full focus' if session == 'Exam Practice' else 'Medium — normal study energy',
            'Helps With': helps, 'Why It Helps': why, 'Success Criteria': succ, 'If You Are Stuck': stuck}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  TRIPLE BRIDGES — one technique across all three assessments
# ═══════════════════════════════════════════════════════════════════════
TECHNIQUES = [
  dict(t='Juxtaposition', io="Gallenkuş's split frames or Banksy's flower-throwing rioter",
       p1='before/after ads, protest photography, charity appeals', p2="innocent Nora against calculating Krogstad, or Duffy's myth-vs-wife framing"),
  dict(t='Direct Address', io="Kruger's 'your body' and 'you are not yourself'",
       p1='second-person adverts, PSAs, campaign posters', p2="Duffy's personas buttonholing the reader ('Look at me now')"),
  dict(t='Irony', io="Banksy's Season's Greetings — snow that is ash",
       p1='satirical columns, parody ads, editorial cartoons', p2="Torvald preaching honesty while living on appearances"),
  dict(t='Symbolism', io="Blake's rose and worm, the balloon in Girl with Balloon",
       p1='logos, national symbols in news photos, product imagery', p2='the macaroons, the tarantella, the slammed door'),
  dict(t='Motif & Repetition', io="water across The Best We Could Do, Blake's repeated 'every'",
       p1='slogan repetition in campaigns, recurring imagery in long features', p2="TWW's recurring devoured/silenced wives; ADH's doors and letters"),
  dict(t='Persona & Constructed Voice', io="the child speakers of Blake's Songs",
       p1='brand voices, confessional columns, influencer captions', p2="every TWW monologue; Nora's performed girlishness"),
  dict(t='Register Shift', io="Bui's clinical captions over intimate scenes",
       p1='formal press releases vs tabloid coverage of one event', p2="Circe's recipe register; Torvald's lecture mode collapsing into panic"),
  dict(t='Satire', io="Banksy's Devolved Parliament chimps",
       p1='opinion cartoons, satirical news, parody adverts', p2="Duffy's deflation of heroic myth ('Mrs Icarus')"),
  dict(t='Imagery Chains', io="Blake's industrial blackness; Bui's orange wash",
       p1='colour-graded ad campaigns, themed news photography', p2="gold hardening through 'Mrs Midas'; illness imagery around Dr Rank"),
  dict(t='Structural Turn (Volta)', io="the reveal moment in any Gallenkuş composite",
       p1='ads that flip halfway, articles with a pivot paragraph', p2="'Little Red-Cap's axe moment; ADH's Act Three reversal"),
  dict(t='Understatement', io="Bui's 'the best we could do' as a title for catastrophe",
       p1='deadpan charity copy, minimalist ads', p2="Mrs Darwin's four lines; Nora's quiet 'I have another duty'"),
  dict(t='Hyperbole', io="Queen Kong-scale feeling; Kruger's totalising slogans",
       p1='advertising superlatives, tabloid headlines', p2="Torvald's rescue fantasies; Duffy's giantess grief"),
  dict(t='Allusion', io="Kruger rewriting Descartes; Blake echoing scripture",
       p1='ads quoting art history, headlines echoing famous phrases', p2="Duffy's entire mythic method; Biblical echoes in ADH's 'miracle'"),
  dict(t='Framing & Perspective', io="whose eyes we borrow in Bui's panels",
       p1='camera angle in news photos, cropped protest images', p2="whose version of events each TWW wife corrects; what ADH's audience knows first"),
  dict(t='Silence & Omission', io="Bui's wordless pages; what Banksy leaves unpainted",
       p1='what ads omit (price, side effects), unphotographed angles', p2="what Nora never says until Act Three; the husbands who never speak in TWW"),
  dict(t='Personification', io="London's 'mind-forg'd manacles' given voice",
       p1='brands as people, products with personalities', p2="death personified around Dr Rank; rivers and cities alive in Duffy"),
  dict(t='Contrast of Scale', io="Gallenkuş's one child against a war; Queen Kong's size",
       p1='David-vs-Goliath charity framing, product close-ups', p2="one macaroon against a marriage; one signature against a legal system"),
  dict(t='Rhetorical Questions', io="'Did he who made the Lamb make thee?'",
       p1='ad headlines that interrogate, campaign slogans', p2="Medusa's final questions; Nora's 'what do you consider my most sacred duty?'"),
]

def bridge_rows():
    rows = []
    for d in TECHNIQUES:
        t = d['t']
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'One Technique, Three Assessments'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{t} Everywhere: The Triple Hunt',
            'Activity Description': (
              f"One technique, three arenas. Find {t.lower()} in: (1) your IO texts — think {d['io']}; (2) a wild Paper 1 text — {d['p1']}; "
              f"(3) your Paper 2 works — {d['p2']}. For each sighting write one analytical sentence: technique + evidence + effect. "
              f"Note how the SAME move serves different purposes — that observation is transferable gold."),
            'Time (min)': 20, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Logical, Reading, Writing, Solitary',
            'Text Type(s)': 'Any', 'Text / Work Focus': '',
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "Revises all three assessments in one sitting by making the technique — not the text — the unit of study.",
            'Success Criteria': "Three sentences, three different texts, one technique — each sentence names a DIFFERENT effect.",
            'If You Are Stuck': f"Start with the given examples ({d['io'].split(';')[0]}). Your job is then just the Paper 1 wild find."}))
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'One Technique, Three Assessments'},
            **{'Activity Type': 'Writing Practice', 'Activity Title': f'{t}: The Portable Paragraph',
            'Activity Description': (
              f"Write one masterclass paragraph defining {t.lower()} and its typical effects, using your best single example from ANY of your texts "
              f"({d['io'].split(';')[0]}, or {d['p2'].split(';')[0]}). Then list two 'adaptor sentences' showing how you'd redeploy the same paragraph "
              f"in a Paper 1 response and a Paper 2 essay. You are building a reusable analytical asset."),
            'Time (min)': 15, 'IB Criterion': 'B, D',
            'Style Preference': 'Writing, Analytical, Logical, Solitary',
            'Text Type(s)': 'Any', 'Text / Work Focus': '',
            'Session Use': 'Writing Task',
            'Helps With': 'Analysis Depth, Vocabulary & Terminology',
            'Why It Helps': "A bank of portable technique-paragraphs cuts exam thinking time dramatically — you adapt instead of inventing.",
            'Success Criteria': "The paragraph works standalone AND both adaptor sentences feel natural.",
            'If You Are Stuck': "Define the technique in your own words first, badly. Precision comes on the second pass."}))
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'One Technique, Three Assessments'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{t}: Flashcard Forge',
            'Activity Description': (
              f"Make one three-sided knowledge card for {t.lower()} (use front / back / margin): FRONT — definition in ≤12 words. "
              f"BACK — three examples: one IO ({d['io'].split(';')[0]}), one Paper 2 ({d['p2'].split(';')[0]}), one Paper 1 text type where it thrives ({d['p1'].split(',')[0]}). "
              f"MARGIN — two effect-verbs it usually triggers (unsettles, indicts, seduces…). Add to your deck; test in 48 hours."),
            'Time (min)': 6, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Writing, Logical, Solitary',
            'Text Type(s)': 'Any', 'Text / Work Focus': '',
            'Session Use': 'Warm-Up', 'Materials': 'Flashcards, Pen & Paper',
            'Exam Proximity': 'Final Week, Night Before',
            'Energy Level': 'Low — fine when tired',
            'Helps With': 'Memory & Recall, Vocabulary & Terminology',
            'Why It Helps': "One card revises three assessments simultaneously — the highest-leverage flashcard you can own.",
            'Success Criteria': "The card exists, is legible, and the 48-hour self-test is scheduled.",
            'If You Are Stuck': "Copy the examples given in this activity. The forging is in the WRITING-DOWN, not the inventing."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  PAPER 2 THEMES & EXAM CRAFT
# ═══════════════════════════════════════════════════════════════════════
P2_THEMES = [
  dict(th='Marriage as Performance', tww="wives narrating the roles they played ('Mrs Midas', 'Pygmalion's Bride')",
       adh="Nora's rehearsed girlishness and the tarantella"),
  dict(th='Voice and Silence', tww="silenced women of myth finally monologuing ('Eurydice', 'Medusa')",
       adh="what Nora cannot say until the final conversation"),
  dict(th='Money, Debt and Power', tww="'Mrs Faust's acquisitions; 'Mrs Sisyphus's workaholic",
       adh='the loan, the forgery, and Torvald\'s new bank job'),
  dict(th='Transformation and Escape', tww="'Thetis' shape-shifting; 'Little Red-Cap' walking out of the forest",
       adh="Nora's costume change and the door"),
  dict(th='Male Heroism Deflated', tww="'Mrs Icarus', 'Mrs Darwin', 'Frau Freud' puncturing great men",
       adh="Torvald's rescue fantasy collapsing in minutes"),
  dict(th='Motherhood', tww="'Queen Herod's ruthless protection; 'Demeter's thaw; 'Thetis' ending",
       adh='Nora leaving her children; the nurse Anne-Marie\'s sacrifice'),
  dict(th='Deception and Self-Deception', tww="unfaithful narrators and knowing wives ('Salome', 'The Devil's Wife')",
       adh='macaroons, forged signatures, and Torvald\'s blindness'),
  dict(th='The Gaze and Objectification', tww="'Medusa' weaponising being looked at; 'Pygmalion's Bride' as statue",
       adh='Nora displayed, dressed, and choreographed by Torvald'),
  dict(th='Freedom and Its Price', tww="wives choosing solitude ('Mrs Rip Van Winkle', 'Penelope')",
       adh="the door slam and everything it costs"),
  dict(th='Justice and Judgement', tww="'The Devil's Wife' on public condemnation; 'Pilate's Wife' on complicity",
       adh="the law that 'takes no account of motives' — Nora's crime of love"),
]

def p2_craft_rows():
    rows = []
    for d in P2_THEMES:
        th = d['th']
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Thematic Study',
            **{'Skill Focus': 'Theme Ladder'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{th}: Build the Ladder',
            'Activity Description': (
              f"Build a five-rung evidence ladder for '{th.lower()}': rung 1 — define the theme in your own sentence; rungs 2–3 — one TWW moment "
              f"({d['tww']}) and one ADH moment ({d['adh']}), each with a micro-quotation; rung 4 — one technique per text; "
              f"rung 5 — a thesis: what DIFFERENT verdicts do the two texts reach? Keep the ladder — it's a third of an essay plan."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Logical, Spatial, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "Paper 2 questions are theme-shaped — pre-built ladders mean you assemble essays instead of inventing them.",
            'Success Criteria': "Rung 5 names a genuine difference between the texts' verdicts, not just 'both explore it'.",
            'If You Are Stuck': "Rung 5 stem: 'While Duffy's wives [verb] this, Ibsen shows [character] [verbing]…'"}))
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Exam Technique',
            **{'Skill Focus': 'Timed Planning'},
            **{'Activity Type': 'Exam Practice', 'Activity Title': f'{th}: Five-Minute Plan Sprint',
            'Activity Description': (
              f"Invent a plausible exam question on {th.lower()} (frame: 'In what ways and to what effect do writers of works you have studied…'). "
              f"Then plan an answer in exactly five timed minutes: thesis, three comparative points ({d['tww'].split(';')[0]} vs {d['adh'].split(';')[0]}…), "
              f"evidence tags. Stop when the timer stops. Rate your plan /10 for 'could I write from this?'"),
            'Time (min)': 8, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Session Use': 'Exam Practice', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Energy Level': 'High — needs full focus',
            'Helps With': 'Time Management, Structure & Planning',
            'Why It Helps': "The five-minute plan is Paper 2's highest-leverage habit — essays fail from unplanned drift more than weak knowledge.",
            'Success Criteria': "A stranger could see your three points and both texts in the plan.",
            'If You Are Stuck': "Always plan point 1 as the SIMILARITY and points 2–3 as escalating DIFFERENCES. It nearly always fits."}))
    # Exam craft one-offs
    craft = [
      ('Question Autopsy Bank', 'Decode five past-paper-style Paper 2 questions. For each, underline the instruction verb (discuss, compare, to what extent), '
       'circle the concept (identity, conflict, technique), and rewrite the question as your own one-line task statement. Speed matters more than beauty — '
       'this is the skill of never answering the wrong question.', 12, 'Question Decoding', 'Exam Practice', 'A, C',
       'Time Management, Structure & Planning',
       "Misread questions sink more Paper 2 essays than any other cause.",
       "Five task statements, each mentioning both texts.",
       "The concept is usually the abstract noun. Find it, and ask: where do MY texts argue about this?"),
      ('The Grounds Generator', "List ten possible 'grounds of comparison' between TWW and ADH — the shared territory a question might name: "
       "gender roles, power, voice, marriage, money, performance, freedom, justice, transformation, family. For each, jot the FIRST moment from each text that "
       "comes to mind. Gaps in your grid = revision priorities.", 15, 'Comparative Frameworks', 'Core Activity', 'A, B',
       'Comparative Linking, Memory & Recall',
       "A pre-mapped comparison grid converts any question into familiar ground.",
       "All ten rows have at least one moment per text.",
       "Do the five easiest rows first. Momentum makes the hard rows easier."),
      ('Introduction Formula Reps', "Write three Paper 2 introductions in 15 minutes using the formula: contextualising sentence naming both works and authors → "
       "direct answer to the question (thesis) → roadmap of your three points. Use three different themes. The formula should start feeling automatic — "
       "that's the point.", 15, 'Essay Openings', 'Writing Task', 'C, D',
       'Getting Started, Structure & Planning',
       "An automatic introduction saves five exam minutes and sets up every later paragraph.",
       "Each intro is ≤5 sentences and states a real position.",
       "Bad first drafts allowed. The formula, repeated, does the polishing."),
      ('Comparative Connective Gym', "Upgrade your linking language: write one comparative paragraph on any theme using at least five different comparative "
       "connectives (whereas, conversely, similarly, more radically, while both). Underline them. Then delete the two weakest sentences — "
       "connectives should carry argument, not decorate it.", 12, 'Comparative Writing', 'Writing Task', 'C, D',
       'Comparative Linking, Vocabulary & Terminology',
       "Criterion C rewards visibly comparative structure — connectives are its load-bearing beams.",
       "Five distinct connectives doing real argumentative work.",
       "Ban 'both texts show' for one paragraph. Watch what you invent instead."),
      ('The Conclusion That Adds', "Write two conclusions for one practice question: version A summarises your points; version B answers 'so what?' — "
       "what do these two texts, together, reveal that neither could alone? Compare them. Version B is the one examiners remember; note the moves it made.",
       12, 'Essay Endings', 'Writing Task', 'C',
       'Structure & Planning, Fresh Ideas & Interpretation',
       "Conclusions that synthesise (rather than repeat) push essays into the top bands.",
       "Version B says something not already in your body paragraphs.",
       "Stem: 'Read together, these works suggest that [theme] is ultimately…'"),
      ('Evidence Diet: Quote Slimming', "Take any three long quotations from your notes and slim each to under six words without losing the point. "
       "Then embed each slimmed quote in an analytical sentence. Long quotation is a Paper 2 disease — this is the cure.", 10, 'Quotation Craft', 'Warm-Up', 'A, D',
       'Quotations & Evidence, Vocabulary & Terminology',
       "Short embedded quotations demonstrate command; long block quotes demonstrate memory only.",
       "Three sentences, each with a ≤6-word quotation inside it, grammar intact.",
       "Keep only the words you'd bold if you could. Cut the rest."),
      ('Full Dress Rehearsal: 105 Minutes', "Sit a full Paper 2 under exam conditions: choose one question from a set you haven't planned, 105 minutes, "
       "handwritten, no notes. Then rest — mark it tomorrow against the criteria, not today. Schedule this no more than once a fortnight; "
       "it's a stress test, not a daily drill.", 105, 'Full Exam Simulation', 'Exam Practice', 'A, B, C, D',
       'Time Management, Exam Confidence & Calm',
       "Nothing else reveals your true exam behaviour — pacing, panic points, handwriting stamina — like the full sit.",
       "You finished a complete essay and can name your one biggest time-leak.",
       "If 105 minutes feels impossible, sit a half-paper (one body paragraph fewer) this week and the full one next week."),
      ('Mark Like an Examiner', "Take one of your practice paragraphs and the IB criteria. Highlight in four colours: knowledge claims (A), analysis of technique (B), "
       "structural signposts (C), precise vocabulary (D). Whichever colour is scarcest is your next session's focus. Marking yourself teaches the rubric "
       "faster than being marked.", 15, 'Self-Assessment', 'Reflection', 'A, B, C, D',
       'Analysis Depth, Structure & Planning',
       "Internalising the rubric means writing FOR the marks in real time, not hoping afterwards.",
       "You identified your scarcest colour and named one concrete fix.",
       "No colour at all for B? Add one sentence starting 'The effect of this is…' — instant analysis."),
    ]
    for title, desc, t, skill, session, crit, helps, why, succ, stuck in craft:
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Exam Technique',
            **{'Skill Focus': skill,
            'Activity Type': 'Exam Practice' if session == 'Exam Practice' else ('Writing Practice' if session == 'Writing Task' else 'Skill Builder'),
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': crit,
            'Style Preference': 'Writing, Logical, Analytical, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Session Use': session, 'Exam Proximity': 'Weeks Away, Final Week',
            'Materials': 'Timer, Pen & Paper',
            'Energy Level': 'High — needs full focus' if t >= 45 else 'Medium — normal study energy',
            'Helps With': helps, 'Why It Helps': why, 'Success Criteria': succ, 'If You Are Stuck': stuck}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  PAPER 1 TEXT-TYPE EXPANSION
# ═══════════════════════════════════════════════════════════════════════
TEXT_TYPES = [
  dict(tt='Advertisement', find='any print or social ad for a product you\'d never buy',
       conv='target audience, desire-creation, image-text anchor, call to action', quirk='what the ad is really selling (status? fear? belonging?)'),
  dict(tt='Opinion Column', find='a column from a major paper on a topic you disagree with',
       conv='constructed persona, anecdotal openings, concession-rebuttal, sign-off stance', quirk='where the columnist performs doubt to seem fair'),
  dict(tt='News Article', find='front-page coverage of the same event from two outlets',
       conv='inverted pyramid, sourcing, headline framing, photo choice', quirk='what the passive voice is hiding'),
  dict(tt='Infographic', find='a data-heavy infographic from a news site or NGO',
       conv='visual hierarchy, iconography, data selection, colour coding', quirk='what the scale or baseline choices exaggerate'),
  dict(tt='Speech', find='a famous speech transcript (with video if possible)',
       conv='direct address, tricolon, anaphora, applause engineering', quirk='the gap between the written text and the delivered performance'),
  dict(tt='Blog Post', find='a personal blog post with a strong voice',
       conv='informal register, reader intimacy, paragraph rhythm, embedded links', quirk='how casualness is carefully constructed'),
  dict(tt='Social Media Post', find='a viral thread or caption-led post',
       conv='hook lines, hashtag positioning, platform conventions, engagement bait', quirk='what the format forces the argument to become'),
  dict(tt='Editorial Cartoon', find='today\'s political cartoon from any major outlet',
       conv='caricature, labelling, visual metaphor, caption interplay', quirk='what you must already know for the joke to land'),
  dict(tt='Graphic Novel Extract', find='any two-page graphic novel spread (Bui counts!)',
       conv='panel size, gutters, bleeds, lettering, image-text braiding', quirk='how reading order is choreographed without arrows'),
  dict(tt='Travel Writing', find='a travel feature about somewhere you know',
       conv='sensory cataloguing, insider-outsider stance, romanticising lens', quirk='what the writer\'s gaze does to the locals'),
  dict(tt='Formal Letter / Open Letter', find='a published open letter (to a politician, a company, the future)',
       conv='salutation politics, register control, escalation structure', quirk='the real audience (never just the addressee)'),
  dict(tt='Film / Event Poster', find='a current film or concert poster',
       conv='title typography, star hierarchy, tagline economy, genre signalling', quirk='what the poster promises that the product can\'t'),
  dict(tt='Magazine Cover', find='this month\'s cover of any big magazine',
       conv='masthead, cover lines, image-gaze, colour psychology', quirk='the ideology of who gets the cover and how they\'re lit'),
  dict(tt='Website Landing Page', find='the homepage of a brand you use',
       conv='above-the-fold logic, scroll choreography, CTA buttons, trust signals', quirk='what friction was removed, and why that matters'),
  dict(tt='Photograph with Caption', find='a news photo and its caption from today',
       conv='framing, timing, caption anchoring, credit context', quirk='how a different caption would change the same pixels'),
  dict(tt='Podcast / Radio Segment', find='a five-minute podcast segment on any issue',
       conv='sound design, host intimacy, ad transitions, scripted spontaneity', quirk='what the medium does that print cannot'),
]

def p1_rows():
    rows = []
    for d in TEXT_TYPES:
        tt = d['tt']
        rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
            **{'Skill Focus': f'{tt} Conventions'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{tt}: First-30-Seconds Protocol',
            'Activity Description': (
              f"Find {d['find']}. Give yourself 30 silent seconds — no analysis, just looking/reading. Then close it and write from memory: "
              f"purpose, audience, and the one feature that reached you first. Reopen and check. Paper 1 rewards trained first impressions; "
              f"this protocol trains them."),
            'Time (min)': 5, 'IB Criterion': 'A',
            'Style Preference': 'Visual, Logical, Intrapersonal, Solitary',
            'Text Type(s)': tt.split(' / ')[0], 'Text / Work Focus': '',
            'Session Use': 'Warm-Up', 'Materials': 'Device, Pen & Paper',
            'Energy Level': 'Low — fine when tired',
            'Helps With': 'Getting Started, Analysis Depth',
            'Why It Helps': f"Speed-reading {tt.lower()}s accurately is exactly what Paper 1's time pressure demands.",
            'Success Criteria': "Your from-memory purpose and audience survived the re-check.",
            'If You Are Stuck': "Just answer: who PAID for this text to exist, and what do they get if it works?"}))
        rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
            **{'Skill Focus': f'{tt} Conventions'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{tt}: Convention Bingo',
            'Activity Description': (
              f"Draw a 2×2 bingo grid with the classic {tt.lower()} conventions: {d['conv']}. Analyse your found example and tick each convention "
              f"you can EVIDENCE (quote or describe the exact spot). Any un-ticked square is interesting: is the text bending its genre, and why? "
              f"Two sentences on the most interesting square."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Logical, Analytical, Solitary',
            'Text Type(s)': tt.split(' / ')[0], 'Text / Work Focus': '',
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Analysis Depth, Structure & Planning',
            'Why It Helps': "Convention-awareness lets you praise conformity OR analyse deviation — either way you sound in command.",
            'Success Criteria': "Every tick has a pointed-to piece of evidence, not a vibe.",
            'If You Are Stuck': f"Start with the give-away: {d['quirk']}."}))
        rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
            **{'Skill Focus': f'{tt} Conventions'},
            **{'Activity Type': 'Writing Practice', 'Activity Title': f'{tt}: One-Paragraph Sprint',
            'Activity Description': (
              f"Set 12 minutes. Write ONE polished analytical paragraph on your {tt.lower()} example, built as: claim about purpose → "
              f"two evidenced techniques → effect on the target audience → link back to {d['quirk']}. Handwrite if your exam is handwritten. "
              f"Then underline your two technique names — if you can't, that's tomorrow's vocabulary work."),
            'Time (min)': 12, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Writing, Analytical, Logical, Solitary',
            'Text Type(s)': tt.split(' / ')[0], 'Text / Work Focus': '',
            'Session Use': 'Writing Task', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Time Management, Analysis Depth',
            'Why It Helps': "Paragraph-scale sprints build exam fitness without the cost of full essays — high reps, low dread.",
            'Success Criteria': "One complete paragraph inside the timer with two named techniques.",
            'If You Are Stuck': "Use the spine: 'This [text type] positions its audience to… It does this first through… and reinforces it with…'"}))
        rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
            **{'Skill Focus': f'{tt} Conventions'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{tt}: Compare the Pair',
            'Activity Description': (
              f"Find TWO examples of {tt.lower()}s aimed at different audiences (e.g. teen vs corporate, local vs global). "
              f"Build a quick T-chart: register / imagery / structure / what's omitted. Write three sentences on how audience reshapes the "
              f"same text type — this doubles as HL Paper 1 thinking, where two texts must be handled in one sitting."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Logical, Visual, Analytical, Solitary',
            'Text Type(s)': tt.split(' / ')[0], 'Text / Work Focus': '',
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "Seeing one text type flex across audiences deepens convention knowledge into genuine genre insight.",
            'Success Criteria': "Your T-chart shows at least three real differences with evidence.",
            'If You Are Stuck': "Same product, two brands. Same story, two outlets. Same city, two travel sites. Pick one."}))
        rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
            **{'Skill Focus': f'{tt} Conventions'},
            **{'Activity Type': 'Exam Prep', 'Activity Title': f'{tt}: Guiding Question Gym',
            'Activity Description': (
              f"Paper 1 arrives with a guiding question. Write three plausible ones for your {tt.lower()} example — one about {d['conv'].split(',')[0]}, "
              f"one about audience positioning, one about {d['quirk']}. Choose the hardest and bullet a 3-point answer plan in five minutes. "
              f"Inventing questions teaches you to see texts the way setters do."),
            'Time (min)': 12, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Analytical, Writing, Solitary',
            'Text Type(s)': tt.split(' / ')[0], 'Text / Work Focus': '',
            'Session Use': 'Exam Practice', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Structure & Planning, Getting Started',
            'Why It Helps': "Students who can SET questions never freeze when handed one — the setter's perspective demystifies the paper.",
            'Success Criteria': "Three distinct questions and one workable plan exist.",
            'If You Are Stuck': "All guiding questions are cousins of: 'How does the text use [features] to [purpose]?' Fill the brackets three ways."}))
    return rows

def all_rows():
    return io_craft_rows() + bridge_rows() + p2_craft_rows() + p1_rows()

if __name__ == '__main__':
    rows = all_rows()
    print(f'{len(rows)} craft activities')
    from collections import Counter
    print(Counter(r['Category'] for r in rows))
