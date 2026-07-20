#!/usr/bin/env python3
"""Expansion module: extra frames over the text banks, quote lock-ins,
per-assessment technique drills, more P1 text types, curated TWW pairs,
ADH act beats, criterion clinics, everyday contexts, session menus."""
from content_texts import A, BLAKE, TWW, ADH, BUI, BANKSY, KRUGER, GALLENKUS
from content_craft import TECHNIQUES

HS = 'Highly Scaffolded — steps are laid out for you'
LOW = 'Low — fine when tired'

# ── Extra frames over existing banks ──────────────────────────────────
def extra_text_frames():
    rows = []
    for p in TWW:
        n = p['name']
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Endings & Last Lines', 'Activity Type': 'Skill Drill',
            'Activity Title': f'{n}: Last Line Verdict',
            'Activity Description': (
              f"Read only the final lines of '{n}' in your copy. Duffy's endings pass judgement — on the husband, the myth, or the speaker herself. "
              f"Decide: does this ending forgive, condemn, mourn, or liberate? Defend your verdict in three sentences with the closing words as evidence, "
              f"remembering the poem is about {p['focus']}."),
            'Time (min)': 7, 'IB Criterion': 'A, B',
            'Style Preference': 'Reading, Analytical, Intrapersonal, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Session Use': 'Warm-Up', 'Energy Level': LOW,
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': "Endings carry disproportionate essay value — a verdict on every last line arms you for any 'how does the poet conclude' angle.",
            'Success Criteria': "One verdict-word chosen and defended with quoted closing words.",
            'If You Are Stuck': "Try each verdict aloud: 'It forgives… it condemns…'. One will feel obviously wrong — eliminate and repeat."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'The Silenced Other', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: The Husband\'s Missing Reply',
            'Activity Description': (
              f"In '{n}', the man never gets a word. Write his two-line reply — in character, forgiving or defensive as he'd actually be about {p['moment']}. "
              f"Then the analytical payoff: two sentences on WHY Duffy denies him speech, and what changes the moment he has it. "
              f"You've just analysed dramatic monologue's central power move from the inside."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Writing, Fresh Ideas: Verbal, Solitary'.replace('Fresh Ideas: ',''),
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Helps With': 'Fresh Ideas & Interpretation, Analysis Depth',
            'Why It Helps': "Creative inversion is analysis in disguise — voicing the silenced figure exposes exactly how the form controls sympathy.",
            'Success Criteria': "Your two analytical sentences name a real effect of the one-sided form.",
            'If You Are Stuck': "Have him say only 'That's not fair.' Now ask: is it? The poem has been arguing this all along."}))
    for p in BLAKE:
        n = p['name']
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Speaker & Perspective', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: Interrogate the Speaker',
            'Activity Description': (
              f"Who is speaking in '{n}' — a child, a bard, a bystander, Blake himself? More importantly: what does this speaker NOT understand "
              f"or not say about {p['focus']}? Write three sentences: who speaks, what they see, what they miss. "
              f"The gap between speaker-knowledge and reader-knowledge is where Blake hides his argument."),
            'Time (min)': 8, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Reading, Intrapersonal, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': "Speaker-gap analysis is the master key to the Songs — most of their irony lives between naive voice and knowing poet.",
            'Success Criteria': "You named one thing the reader sees that the speaker doesn't.",
            'If You Are Stuck': "Ask: would this speaker be angry if they understood their own poem? If yes, the gap is your answer."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Word-Level Precision', 'Activity Type': 'Technique Drill',
            'Activity Title': f'{n}: One-Word Excavation',
            'Activity Description': (
              f"Choose the single most loaded word in '{n}' — a strong candidate hides in '{p['quote']}'. Excavate it: denotation, two connotations, "
              f"its sound in the mouth, what a synonym would lose. Four quick lines. In the IO, one deeply-read word beats five skimmed lines — "
              f"this is that habit, built."),
            'Time (min)': 5, 'IB Criterion': 'B',
            'Style Preference': 'Linguistic, Analytical, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Session Use': 'Warm-Up', 'Energy Level': LOW,
            'Helps With': 'Analysis Depth, Vocabulary & Terminology',
            'Why It Helps': "Micro-analysis of diction is the fastest visible upgrade to Criterion B — and Blake's vocabulary rewards it endlessly.",
            'Success Criteria': "Four lines exist and the synonym-test genuinely revealed a loss.",
            'If You Are Stuck': f"Use the given quote. In '{p['quote']}', the heaviest word is rarely the longest one."}))
    for e in ADH:
        n = e['name']
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Stagecraft & Structure', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: Director for a Day',
            'Activity Description': (
              f"You're directing the moment involving {n} — {e['detail'].split(';')[0]}. Make three directing decisions: where the actors stand "
              f"(distance = power), one lighting or sound choice, and the single gesture the audience must not miss. Justify each in one line "
              f"against {e['theme']}. Thinking like a director is analysing like an examiner."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Spatial, Visual, Kinesthetic, Analytical',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': "Drama is written for bodies in space — directorial thinking generates the stagecraft analysis Paper 2 essays on plays need.",
            'Success Criteria': "Three decisions, each justified by meaning rather than taste.",
            'If You Are Stuck': "Start with distance: should these characters be close enough to touch? Why / why not — that's already analysis."}))
    for e in BUI:
        n = e['name']
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Thi Bui',
            **{'Skill Focus': 'Memory & Chapter Recall', 'Activity Type': 'Skill Drill',
            'Activity Title': f'{n}: Two-Minute Recall Sketch',
            'Activity Description': (
              f"Without opening the book: sketch (stick figures welcome) the panel you remember best from {n}, and label three visual choices from memory — "
              f"then check against the actual page ({e['detail'].split(';')[0]}). What did your memory keep, and what did it drop? "
              f"What it kept is what you'll cite fluently under pressure; what it dropped needs one more look."),
            'Time (min)': 6, 'IB Criterion': 'A',
            'Style Preference': 'Visual, Spatial, Kinesthetic, Solitary',
            'Text Type(s)': 'Graphic Novel', 'Text / Work Focus': 'Thi Bui',
            'Session Use': 'Warm-Up', 'Exam Proximity': 'Final Week, Night Before', 'Energy Level': LOW,
            'Helps With': 'Memory & Recall, Quotations & Evidence',
            'Why It Helps': "The IO allows no book — drawing from memory is the honest test of what you'll actually be able to describe on the day.",
            'Success Criteria': "A sketch exists and you know exactly one thing to re-look at.",
            'If You Are Stuck': "Can't recall a panel? That IS the result: open the chapter, pick one, close, and sketch. Retrieval starts now."}))
    for w, artist, tt in ([(x, 'Banksy', 'Artwork, Image') for x in BANKSY] +
                          [(x, 'Barbara Kruger', 'Artwork, Image') for x in KRUGER] +
                          [(x, 'Ugur Gallenkuş', 'Photograph, Image') for x in GALLENKUS]):
        n = w['name']
        rows.append(A(Assessment='Individual Oral', Category=f'Individual Oral: {artist}',
            **{'Skill Focus': 'Interpretation & Counter-Reading', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{n}: Caption It Wrong',
            'Activity Description': (
              f"Write two deliberately WRONG captions for {n} — one that reads it as cheerful decoration, one that misses {w['gi']} entirely. "
              f"Then write the caption it deserves. Explaining exactly WHY the wrong captions fail ({w['hook']} is the key they ignore) "
              f"produces sharper analysis than starting from the right answer ever does."),
            'Time (min)': 8, 'IB Criterion': 'A, B',
            'Style Preference': 'Writing, Fresh Ideas: Visual, Solitary'.replace('Fresh Ideas: ',''),
            'Text Type(s)': tt, 'Text / Work Focus': artist,
            'Helps With': 'Fresh Ideas & Interpretation, Analysis Depth',
            'Why It Helps': "Arguing against misreadings is examiner-grade thinking — it shows you know why your interpretation earns its place.",
            'Success Criteria': "Your 'deserved' caption names both the technique and the issue.",
            'If You Are Stuck': "Wrong caption #1 can always be 'Nice colours!' — now say precisely what 'nice' fails to see."}))
    return rows

# ── Quote lock-ins for TWW / Blake / Bui ──────────────────────────────
def quote_lockins():
    rows = []
    banks = ([(p['name'], "The World's Wife", "The World's Wife", 'Paper 2', "Paper 2: The World's Wife",
               f"the tonal turn around {p['moment']}") for p in TWW] +
             [(p['name'], 'William Blake', 'Poems', 'Individual Oral', 'Individual Oral: Blake',
               f"lines like '{p['quote']}'") for p in BLAKE] +
             [(e['name'], 'Thi Bui', 'Graphic Novel', 'Individual Oral', 'Individual Oral: Thi Bui',
               f"the visual moment of {e['detail'].split(';')[0]}") for e in BUI])
    for name, work, tt, assess, cat, anchor in banks:
        rows.append(A(Assessment=assess, Category=cat,
            **{'Skill Focus': 'Quotation Bank', 'Activity Type': 'Skill Drill',
            'Activity Title': f'{name}: Three-Line Lock-In',
            'Activity Description': (
              f"Choose the three shortest lines (or, for visual texts, three describable details) from {name} that you never want to face an exam without — "
              f"anchor around {anchor}. Write each from memory three times across today: now, in an hour, at night. "
              f"Tag each with the theme it unlocks. Locked-in evidence is confidence you can spend later."),
            'Time (min)': 6, 'IB Criterion': 'A',
            'Style Preference': 'Reading, Writing, Logical, Solitary',
            'Text Type(s)': tt, 'Text / Work Focus': work,
            'Session Use': 'Warm-Up', 'Exam Proximity': 'Final Week, Night Before',
            'Materials': 'Flashcards, Pen & Paper', 'Energy Level': LOW, 'Support Level': HS,
            'Helps With': 'Memory & Recall, Quotations & Evidence',
            'Why It Helps': "Spaced retrieval on a tiny evidence set is the most efficient memorisation protocol known — three touches today beats ten tomorrow.",
            'Success Criteria': "Third rep of all three lines was error-free.",
            'If You Are Stuck': "Shorter lines. Under six words each. Memorability outranks impressiveness."}))
    return rows

# ── Technique drills per assessment ───────────────────────────────────
def technique_assessment_drills():
    rows = []
    for d in TECHNIQUES:
        t = d['t']
        rows.append(A(Assessment='Paper 1', Category='Technical Analysis',
            **{'Skill Focus': f'{t}', 'Activity Type': 'Skill Drill',
            'Activity Title': f'{t} in the Wild: Paper 1 Spot',
            'Activity Description': (
              f"Hunt today's media for one live example of {t.lower()} — likely habitats: {d['p1']}. Capture it (screenshot or describe), "
              f"then write the full analytical unit: technique named → exact evidence → intended audience effect → why the creator chose it here. "
              f"Four sentences. File under '{t}' — three sightings makes you fluent."),
            'Time (min)': 8, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Logical, Analytical, Solitary',
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Analysis Depth, Getting Started',
            'Why It Helps': f"Recognising {t.lower()} at wild-text speed is exactly the reflex Paper 1's timer demands.",
            'Success Criteria': "All four sentences exist and the effect is specific to THIS text, not generic.",
            'If You Are Stuck': f"Go straight to the likeliest habitat: {d['p1'].split(',')[0]}."}))
        rows.append(A(Assessment='Paper 2', Category='Crit B1: Technique Analysis',
            **{'Skill Focus': f'{t}', 'Activity Type': 'Technique Drill',
            'Activity Title': f'{t} Across Both Works',
            'Activity Description': (
              f"Locate {t.lower()} once in EACH Paper 2 work — think {d['p2']}. For each: quote or pinpoint the moment, then one sentence on its effect. "
              f"Finish with the comparative kicker: one sentence on how the SAME device serves DIFFERENT ends in Duffy and Ibsen. "
              f"That kicker sentence is Paper 2 gold — collect twenty of them."),
            'Time (min)': 12, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Reading, Writing, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "Technique-level comparison (not plot-level) is what distinguishes top-band Paper 2 essays.",
            'Success Criteria': "The kicker sentence names two different EFFECTS, not two different examples.",
            'If You Are Stuck': f"Use the given leads: {d['p2'].split(';')[0]}."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral Preparation',
            **{'Skill Focus': f'{t}', 'Activity Type': 'IO Prep',
            'Activity Title': f'{t} in Your IO Texts',
            'Activity Description': (
              f"Find {t.lower()} in your IO material — start from {d['io']}. Speak (don't write) a 45-second analysis: name it, describe the exact spot, "
              f"give the effect, tie it to your global issue. Techniques you can analyse ALOUD are the only ones that will surface in the actual oral — "
              f"writing fluency doesn't automatically transfer."),
            'Time (min)': 6, 'IB Criterion': 'B',
            'Style Preference': 'Verbal, Auditory, Analytical, Solitary',
            'Text Type(s)': 'Poems, Graphic Novel, Artwork', 'Text / Work Focus': 'William Blake, Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş',
            'Session Use': 'IO Preparation', 'Materials': 'Timer',
            'Helps With': 'Speaking Confidence, Analysis Depth',
            'Why It Helps': "Oral fluency with technique vocabulary is trained separately from written fluency — this is that training.",
            'Success Criteria': "The 45 seconds happened aloud without a written script.",
            'If You Are Stuck': f"Use the given example ({d['io'].split(';')[0]}) and just add your global issue at the end."}))
    return rows

# ── Additional Paper 1 text types ─────────────────────────────────────
EXTRA_TT = [
  dict(tt='Review (Film/Music/Restaurant)', find='a scathing one-star and a glowing five-star review of the same thing',
       conv='verdict placement, wit deployment, star economy, credibility moves', quirk='how entertainment value competes with judgement'),
  dict(tt='Manifesto', find='any artistic or political manifesto (they\'re short and wild)',
       conv='declarative absolutes, we-voice, enemy-naming, utopian leap', quirk='what the manifesto refuses to compromise on'),
  dict(tt='Brochure / Leaflet', find='a university, clinic, or tourism brochure',
       conv='fold logic, headline hierarchy, reassurance imagery, fine print', quirk='which fears the brochure quietly manages'),
  dict(tt='Press Release', find='a corporate press release about bad news',
       conv='euphemism, passive constructions, quote scaffolding, boilerplate', quirk='the distance between headline and admission'),
  dict(tt='Interview (Print)', find='a celebrity or expert print interview',
       conv='question framing, edited spontaneity, scene-setting interludes', quirk='who really controls the narrative — asker or answerer'),
  dict(tt='Instruction Manual / How-To', find='any set of assembly or safety instructions',
       conv='imperative chains, numbered logic, warning hierarchy, diagrams', quirk='where clarity fails and why it matters legally'),
  dict(tt='Meme', find='a current meme format in three different uses',
       conv='template recognition, caption-image tension, in-group signalling', quirk='why the same template carries opposite messages'),
  dict(tt='Packaging', find='the box or label of something in your kitchen',
       conv='front-of-pack promises, ingredient burial, colour coding, badge icons', quirk='the legal words hiding among the persuasive ones'),
]

def extra_p1_rows():
    rows = []
    for d in EXTRA_TT:
        tt = d['tt']
        for frame in range(5):
            if frame == 0:
                title, desc, t, session, crit = (f'{tt}: First-30-Seconds Protocol',
                  f"Find {d['find']}. Thirty silent seconds of pure looking/reading. Close it; write purpose, audience, and the first feature that reached you. "
                  f"Reopen and verify. Trained first impressions are Paper 1's opening advantage.", 5, 'Warm-Up', 'A')
            elif frame == 1:
                title, desc, t, session, crit = (f'{tt}: Convention Bingo',
                  f"Grid up the conventions of the {tt.lower()}: {d['conv']}. Tick only what you can evidence in your example; interrogate any empty square — "
                  f"deviation is analysis fuel. Two sentences on the most telling square.", 10, 'Core Activity', 'A, B')
            elif frame == 2:
                title, desc, t, session, crit = (f'{tt}: One-Paragraph Sprint',
                  f"Twelve timed minutes: one polished paragraph on your {tt.lower()} example — claim, two evidenced techniques, audience effect, "
                  f"and a closing link to {d['quirk']}.", 12, 'Writing Task', 'A, B, C, D')
            elif frame == 3:
                title, desc, t, session, crit = (f'{tt}: Compare the Pair',
                  f"Two {tt.lower()}s, different audiences or stances. T-chart: register / imagery / structure / omissions. Three sentences on how "
                  f"audience reshapes the type — HL-style double-text thinking at drill scale.", 15, 'Core Activity', 'A, B')
            else:
                title, desc, t, session, crit = (f'{tt}: Guiding Question Gym',
                  f"Write three exam-plausible guiding questions for your {tt.lower()} ({d['conv'].split(',')[0]}; audience positioning; {d['quirk']}). "
                  f"Plan the hardest in five bulleted minutes.", 12, 'Exam Practice', 'A, B, C')
            rows.append(A(Assessment='Paper 1', Category='Text Type Specific',
                **{'Skill Focus': f'{tt} Conventions',
                'Activity Type': 'Exam Prep' if session == 'Exam Practice' else ('Writing Practice' if session == 'Writing Task' else 'Skill Drill'),
                'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': crit,
                'Style Preference': 'Visual, Logical, Analytical, Solitary' if frame != 2 else 'Writing, Analytical, Logical, Solitary',
                'Text Type(s)': tt.split(' (')[0].split(' / ')[0],
                'Session Use': session, 'Materials': 'Device, Pen & Paper' if frame != 2 else 'Timer, Pen & Paper',
                'Energy Level': LOW if frame == 0 else 'Medium — normal study energy',
                'Exam Proximity': 'Weeks Away, Final Week' if session in ('Exam Practice', 'Writing Task') else 'Any Time',
                'Helps With': 'Time Management, Analysis Depth' if frame in (2, 4) else 'Analysis Depth, Getting Started',
                'Why It Helps': f"{tt}s appear in Paper 1 more often than students expect — five reps make the type familiar territory.",
                'Success Criteria': "The written product exists inside the time box.",
                'If You Are Stuck': f"Focus on the give-away: {d['quirk']}."}))
    return rows

# ── Curated TWW internal pairings ─────────────────────────────────────
TWW_PAIRS = [
  ('Mrs Midas', 'Mrs Faust', 'materialism and what gold costs a marriage'),
  ('Medusa', "Pygmalion's Bride", 'the male gaze — petrifying versus being petrified'),
  ('Little Red-Cap', 'Eurydice', 'escaping the poet who wants your story'),
  ('Penelope', 'Mrs Rip Van Winkle', 'flourishing in a husband\'s absence'),
  ('Queen Herod', 'Demeter', 'maternal love — ruthless versus redemptive'),
  ('Mrs Icarus', 'Mrs Darwin', 'the art of the deflating punchline'),
  ('Thetis', "Pygmalion's Bride", 'shape-shifting under controlling hands'),
  ('Delilah', 'Salome', 'the "dangerous woman" reframed'),
  ('Anne Hathaway', 'Mrs Lazarus', 'widowhood — memory as love versus grief completed'),
  ('Circe', 'Mrs Beast', 'power over men, on whose terms'),
  ('The Kray Sisters', 'Queen Kong', 'female swagger at mythic scale'),
  ('Frau Freud', 'from Mrs Tiresias', 'who is believed about gendered experience'),
  ('Mrs Aesop', 'Mrs Sisyphus', 'married to a man and his obsession'),
]

def tww_pair_rows():
    rows = []
    for a, b, ground in TWW_PAIRS:
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Within-Collection Comparison', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{a} × {b}: Internal Dialogue',
            'Activity Description': (
              f"Read '{a}' and '{b}' back to back — they argue with each other about {ground}. Draw the argument: what would each speaker "
              f"say to the other in one line? Then the essay move: one paragraph on how Duffy uses the two poems to show DIFFERENT possible "
              f"responses to the same condition. Collections are structured arguments; this is how you read one."),
            'Time (min)': 18, 'IB Criterion': 'A, B',
            'Style Preference': 'Reading, Analytical, Logical, Writing, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Helps With': 'Comparative Linking, Fresh Ideas & Interpretation',
            'Why It Helps': "Paper 2 questions about 'the work as a whole' reward exactly this: poems read as deliberate neighbours, not isolated pieces.",
            'Success Criteria': "Your paragraph explains why the collection needs BOTH poems.",
            'If You Are Stuck': "Give each speaker one word for the other ('naive', 'bitter', 'lucky'). Build outward from the exchange."}))
    return rows

# ── ADH act-by-act beats ──────────────────────────────────────────────
ADH_BEATS = [
  ('Act One: The Establishing Lie', 'the macaroon fib within minutes of curtain-up', 'how tiny deceptions establish the marriage\'s operating system'),
  ('Act One: Mrs Linde Arrives', 'two women auditing each other\'s life choices', 'the road-not-taken structure doubling Nora'),
  ('Act One: Krogstad\'s First Threat', 'the tonal drop when the door closes on pleasantries', 'menace entering domestic space'),
  ('Act Two: The Costume Fitting', 'the Neapolitan dress and Dr Rank\'s shadow', 'performance being prepared while death visits'),
  ('Act Two: Nora and Dr Rank', 'the silk stockings moment and the confession that stops her ask', 'flirtation as currency and its limits'),
  ('Act Two: The Tarantella Rehearsal', 'dancing wilder as Torvald tries to correct her', 'the body screaming what speech cannot'),
  ('Act Three: Linde and Krogstad Choose', 'the "shipwrecked people" joining hands', 'the honest counter-marriage the play builds next door'),
  ('Act Three: The Two Letters', 'rage, then rapture, in the space of minutes', 'Torvald revealed by the speed of his reversal'),
  ('Act Three: The Table Conversation', 'husband and wife sitting down as strangers', 'the play\'s thesis delivered in its quietest staging'),
]

def adh_beat_rows():
    rows = []
    for beat, detail, why_matters in ADH_BEATS:
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Scene & Act Knowledge', 'Activity Type': 'Analytical Activity',
            'Activity Title': f'{beat}: Beat Map',
            'Activity Description': (
              f"Map this beat — {detail}. Three layers, one line each: what literally happens / what each character WANTS in the beat / "
              f"what the audience knows that someone on stage doesn't. Then one sentence on {why_matters}. "
              f"Beat-level fluency lets you cite drama with the precision examiners reward."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Logical, Spatial, Reading, Analytical, Solitary',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Helps With': 'Quotations & Evidence, Analysis Depth',
            'Why It Helps': "Essays that cite beats ('the moment the letter drops') outscore essays that cite acts — precision reads as mastery.",
            'Success Criteria': "All three layers filled and the dramatic-irony layer is genuinely something someone on stage doesn't know.",
            'If You Are Stuck': "Layer two unlocks the rest: everyone on stage wants something every second. Name the wants."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Timed Writing', 'Activity Type': 'Writing Practice',
            'Activity Title': f'{beat}: Ten-Minute Cash-In',
            'Activity Description': (
              f"Ten timed minutes: one exam-grade paragraph using this beat ({detail}) as your central evidence for any thesis about "
              f"{why_matters.split(' — ')[0] if ' — ' in why_matters else why_matters}. Claim first, beat as evidence, technique named "
              f"(stagecraft counts), effect, link. Handwrite. The beat is pre-loaded; the reps make it spendable."),
            'Time (min)': 10, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Writing, Analytical, Logical, Solitary',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Session Use': 'Writing Task', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Time Management, Structure & Planning',
            'Why It Helps': "Paragraph reps on pre-mapped beats build the exact assembly speed Paper 2's clock demands.",
            'Success Criteria': "A finished paragraph with the technique explicitly named.",
            'If You Are Stuck': "Steal your claim from the beat map's layer three — dramatic irony always yields a thesis."}))
    return rows

# ── Criterion clinics ─────────────────────────────────────────────────
CRITERIA = [
  ('A', 'Knowledge, Understanding & Interpretation', 'showing you know the text AND can read it, not retell it',
   "Take one recent paragraph you've written. Highlight retelling in one colour, interpretation in another. If retelling wins, rewrite: every plot "
   "mention must buy an insight ('X happens' → 'X happens, which exposes…')."),
  ('B', 'Analysis & Evaluation', 'connecting the creator\'s choices to their effects',
   "Audit a paragraph for the chain choice → evidence → effect. Any link missing? Add one sentence starting 'The effect of this choice is…' "
   "wherever a technique sits effect-less. Count your repaired chains."),
  ('C', 'Focus, Organisation & Coherence', 'one argument, visibly structured, start to finish',
   "Print or view a practice piece. Underline the thesis, then the first sentence of each paragraph. Read ONLY the underlined parts aloud: "
   "do they form a complete argument on their own? Repair the weakest link sentence."),
  ('D', 'Language & Register', 'precise, varied, appropriately formal expression',
   "Take five sentences you've written. For each: upgrade one verb, delete one filler word, and check one term for precision ('picture' → 'composition'?). "
   "Fifteen micro-edits that teach your default register to climb."),
]

def criterion_rows():
    rows = []
    for assess, tag in [('Paper 1', 'Paper 1'), ('Paper 2', 'Paper 2'), ('Individual Oral', 'the IO')]:
        for crit, name, meaning, task in CRITERIA:
            spoken = ' If your target is the IO, do every step ALOUD — the criterion is assessed in speech.' if assess == 'Individual Oral' else ''
            rows.append(A(Assessment=assess, Category='Criterion Clinics',
                **{'Skill Focus': f'Criterion {crit}: {name}', 'Activity Type': 'Guided Analysis',
                'Activity Title': f'Criterion {crit} Clinic for {tag}',
                'Activity Description': f"Criterion {crit} rewards {meaning}. Clinic: {task}{spoken}",
                'Time (min)': 12, 'IB Criterion': crit,
                'Style Preference': 'Verbal, Analytical, Intrapersonal, Solitary' if assess == 'Individual Oral' else 'Reading, Writing, Analytical, Solitary',
                'Text / Work Focus': "The World's Wife, A Doll's House" if assess == 'Paper 2' else '',
                'Session Use': 'Reflection', 'Support Level': HS,
                'Helps With': 'Structure & Planning, Analysis Depth',
                'Why It Helps': f"Working ON a criterion (not just IN it) converts rubric language into editing instincts you can apply mid-exam.",
                'Success Criteria': "You made the named repairs on real work of yours — not hypothetically.",
                'If You Are Stuck': "No recent work? Write four rough sentences about any text right now, then run the clinic on those."}))
    return rows

# ── Everyday context spotting (fresh set) ─────────────────────────────
CONTEXTS = [
  ('On the Go', 'Bus-Stop Poster Autopsy', "One poster at your stop or station: before your ride arrives, answer aloud or in notes — who paid, who's targeted, "
   "what's the emotional lever (fear? aspiration? belonging?), and one visual choice serving it. Your commute just became technique reps."),
  ('On the Go', 'Announcement Register Check', "Listen to one transport announcement or overhead sign. Formal? Friendly? Threatening? Rewrite it in the opposite "
   "register in your head. What changed — and what does the ORIGINAL register say about how the operator sees you?"),
  ('During Screen Time', 'The Ad-Break Double-Take', "Next ad that interrupts you: watch it twice on purpose. First pass — feel what it wants you to feel. "
   "Second pass — catch three choices manufacturing that feeling (music cue, cut speed, voice tone, colour grade). Two-minute analysis, done on the sofa."),
  ('During Screen Time', 'Thumbnail Forensics', "Open any streaming or video platform. Study six thumbnails: what faces, colours, and text sizes recur? "
   "Which one would you click, and which single design choice earned it? You're analysing visual rhetoric's front line."),
  ('During Screen Time', 'Caption vs Image Audit', "Scroll to any influencer or brand post. Cover the caption: what does the image alone say? Reveal: how does "
   "the caption redirect the image's meaning? That anchoring move is a Paper 1 term in action — name it when you write it up.",),
  ('Out & About', 'Menu Rhetoric', "Reading a menu or shop board: find the most persuasive dish description. Which adjectives earn their place ('hand-cut', "
   "'slow-roasted')? What's the priciest item's position on the page? Menus are persuasion documents — order, then analyse."),
  ('Out & About', 'Window Display Reading', "One shop window, sixty seconds: what story is the display telling, who is the imagined customer, and what's "
   "deliberately absent (price tags? clutter? people)? Absence is a choice — say what it's doing."),
  ('Out & About', 'Signage Power Audit', "Collect three signs on one street: one that asks, one that tells, one that warns. Compare their registers, fonts, "
   "and legal weight. Who gets to command in public space, and how does design encode authority?"),
]

def context_rows():
    rows = []
    for loc, title, desc in CONTEXTS:
        rows.append(A(Assessment='Paper 1', Category='Everyday Text Spotting',
            **{'Skill Focus': 'Everyday Text Analysis', 'Activity Type': 'Skill Drill',
            'Activity Title': title, 'Activity Description': desc,
            'Time (min)': 4, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Logical, Naturalist, Solitary',
            'Location': loc, 'Session Use': 'Warm-Up',
            'Materials': 'None — just your eyes and brain',
            'Energy Level': LOW, 'Support Level': HS,
            'Exam Proximity': 'Any Time',
            'Helps With': 'Analysis Depth, Focus & Motivation',
            'Why It Helps': "The world is an unmarked Paper 1 anthology — spotting techniques in it daily builds fluency no textbook can.",
            'Success Criteria': "One real text analysed before you moved on with your day.",
            'If You Are Stuck': "Default question anywhere: 'What does this text want from me?' Every public text wants something."}))
    return rows

# ── Session menus ─────────────────────────────────────────────────────
MENUS = [
  ('5', 'Paper 1', "Got exactly five minutes for Paper 1? Run this set menu: 90-second technique spot on any nearby text → 2-minute purpose/audience/technique "
   "jotting → 90-second spoken summary of what you found. Five minutes, one complete analytical cycle, zero setup."),
  ('5', 'Paper 2', "Five minutes for Paper 2: pick one theme → recall one TWW moment and one ADH moment for it (no notes) → write a single 'While… whereas…' "
   "sentence → check your notes for what you forgot. One comparative rep, complete."),
  ('5', 'Individual Oral', "Five minutes for the IO: speak your global issue sentence → deliver ONE minute on either text aloud → note the wobbliest moment "
   "→ say that section once more, better. A daily five like this outperforms a weekly hour."),
  ('15', 'Paper 1', "Fifteen-minute Paper 1 menu: 30-second first read of a found text → 3-minute convention check for its text type → 10-minute one-paragraph "
   "sprint (claim, two techniques, effect) → 90-second re-read marking your best sentence. Done — one full mini-response."),
  ('15', 'Paper 2', "Fifteen-minute Paper 2 menu: invent a question from a theme (2 min) → five-minute plan (thesis + three comparative points) → "
   "write only the introduction (5 min) → self-check against Criterion C (3 min). Planning muscle plus opening muscle, no essay fatigue."),
  ('15', 'Individual Oral', "Fifteen-minute IO menu: two-minute slice delivered aloud → listen back to a recording of it → rubric self-score on one criterion → "
   "re-deliver the slice applying the one fix. Deliberate practice loop, complete in a quarter hour."),
  ('30', 'Paper 1', "Thirty-minute Paper 1 menu: full guided analysis of one substantial text — 5 min reading + annotation, 5 min planning against a guiding "
   "question, 15 min writing two body paragraphs, 5 min underlining every named technique (fewer than four? note vocabulary as next focus)."),
  ('30', 'Paper 2', "Thirty-minute Paper 2 menu: theme ladder for one fresh theme (10 min) → timed introduction plus one full body paragraph (15 min) → "
   "error-log entry on the weakest link (5 min). One deep comparative rep with feedback banked."),
  ('30', 'Individual Oral', "Thirty-minute IO menu: outline refresh on the one-page blueprint (5 min) → full first half delivered aloud, timed (5 min) → "
   "review recording, mark two fixes (10 min) → re-deliver with fixes (5 min) → schedule tomorrow's other half (1 min). Structured, complete, repeatable."),
]

def menu_rows():
    rows = []
    for mins, assess, desc in MENUS:
        rows.append(A(Assessment=assess, Category='Set-Menu Sessions',
            **{'Skill Focus': 'Guided Session Plan', 'Activity Type': 'Skill Builder',
            'Activity Title': f'The {mins}-Minute {assess} Menu',
            'Activity Description': desc, 'Time (min)': int(mins), 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Kinesthetic, Solitary',
            'Text / Work Focus': "The World's Wife, A Doll's House" if assess == 'Paper 2' else ('William Blake, Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş' if assess == 'Individual Oral' else ''),
            'Session Use': 'Core Activity', 'Materials': 'Timer, Pen & Paper',
            'Support Level': HS,
            'Helps With': 'Time Management, Getting Started',
            'Why It Helps': "Decision fatigue kills short sessions — a fixed menu means every scrap of time converts to reps automatically.",
            'Success Criteria': "Every course of the menu happened inside the time box.",
            'If You Are Stuck': "Start the timer before you feel ready. The menu handles the rest."}))
    return rows

def all_rows():
    return (extra_text_frames() + quote_lockins() + technique_assessment_drills() +
            extra_p1_rows() + tww_pair_rows() + adh_beat_rows() + criterion_rows() +
            context_rows() + menu_rows())

if __name__ == '__main__':
    rows = all_rows()
    print(f'{len(rows)} expansion activities')
    from collections import Counter
    for k, v in Counter(r['Category'] for r in rows).most_common(): print(f'  {v:4d}  {k}')
