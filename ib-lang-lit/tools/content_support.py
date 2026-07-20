#!/usr/bin/env python3
"""Support activities: struggling-student scaffolds, exam-proximity routines,
cool-downs, pair/group work, general study skills, warm-up sprints."""
from content_texts import A

HS = 'Highly Scaffolded — steps are laid out for you'
LOW = 'Low — fine when tired'
HIGH = 'High — needs full focus'

# ═══════════════════════════════════════════════════════════════════════
#  SCAFFOLDS — for students who are really struggling
# ═══════════════════════════════════════════════════════════════════════
def scaffold_rows():
    rows = []
    fixed = [
      ('The Sentence-Starter Lifeboat', 'Analysis Writing',
       "Copy these five starters onto a card you keep in your notes: 'The writer's choice of ___ creates…', 'This positions the reader to…', "
       "'The effect is intensified by…', 'What appears to be ___ is actually…', 'By the end, this develops into…'. "
       "Now pick ANY text you know and complete all five about it. Yes, it feels mechanical. Mechanical is how fluency starts.",
       10, 'B, D', 'Getting Started, Analysis Depth',
       "When analysis won't come, borrowed sentence shapes carry you until your own arrive — every writer starts on rails.",
       "Five complete sentences exist about a real text.",
       "Do them out of order. Number 4 ('What appears to be…') is secretly the easiest."),
      ('PETAL With Training Wheels', 'Paragraph Building',
       "Write one PETAL paragraph where each element is exactly one sentence, labelled in the margin: Point / Evidence / Technique / Analysis / Link. "
       "Use any text you know well. When it works, write the same paragraph WITHOUT labels and let the sentences join naturally. "
       "Two paragraphs, one skill: structure you can feel.",
       12, 'B, C', 'Structure & Planning, Getting Started',
       "Making the invisible skeleton visible once means you can trust it invisibly forever after.",
       "Both versions exist; the unlabelled one still has all five elements.",
       "Write E (the quotation) first. Point and the rest grow around evidence more easily than the reverse."),
      ('Deconstruct a Model Answer', 'Learning from Models',
       "Find or ask your teacher for one high-scoring sample paragraph. Reverse-engineer it: number its sentences, then label each sentence's JOB "
       "(claims, quotes, analyses, links, zooms out). Copy the sequence of jobs — not the words — and write your own paragraph on a different text "
       "following the exact same job order.",
       20, 'A, B, C, D', 'Structure & Planning, Analysis Depth',
       "Imitating structure (never words) is the fastest legitimate shortcut to exam-grade writing.",
       "Your paragraph follows the model's job-sequence with your own content.",
       "No model available? Use this sequence: claim → context clause → quote → technique → effect → so-what."),
      ('The Half-Blank Analysis', 'Guided Analysis',
       "Copy this frame and fill only the blanks: 'In this text, the creator uses [technique] in the line/image [evidence]. "
       "This makes the audience feel [emotion] because [reason]. This matters to the whole text because [link].' "
       "Complete it three times for three different techniques in one text. The frame is doing the structure; you're doing the thinking.",
       10, 'B', 'Getting Started, Analysis Depth',
       "Separating the thinking from the structuring lets a struggling writer practise one thing at a time.",
       "Three completed frames with three different techniques.",
       "Can't name the technique? Describe what the writer DID in plain words — 'repeated the word', 'made the image huge'. That counts."),
      ('Copy, Then Vary', 'Sentence Craft',
       "Take one sentence you admire from any model essay or article. Copy it out exactly. Then rewrite it three times about YOUR texts, keeping the "
       "grammar skeleton but swapping the content. Example skeleton: 'What [X] presents as [A] is, on closer reading, [B].' "
       "This is how writers have always trained — theft of shape, never of substance.",
       8, 'D', 'Vocabulary & Terminology, Getting Started',
       "Sentence-level fluency is trainable through imitation — and Criterion D notices it immediately.",
       "Three new sentences share the skeleton but say true things about your texts.",
       "Choose a short sentence. Long ones hide their skeletons."),
      ('The Tiny-Wins Ladder', 'Confidence Building',
       "Rule a page into five rungs. Rung 1: write one true sentence about any text ('Blake wrote about children'). Rung 2: add a quoted word to it. "
       "Rung 3: add WHY the writer did it. Rung 4: add the effect on the reader. Rung 5: add 'which connects to the wider idea of…'. "
       "One sentence became analysis in five moves. You can always climb this ladder.",
       8, 'A, B', 'Getting Started, Focus & Motivation',
       "Struggle usually means the first step is too big — this makes the first step laughably small, then compounds it.",
       "You reached rung 5 with one idea, however plain.",
       "Rung 1 can be embarrassingly obvious. 'The poem rhymes.' Climb from there — it works."),
      ('Talk First, Write After', 'Oral Rehearsal for Writing',
       "Can't start writing? Don't. Set a 2-minute timer and explain your text ALOUD to an empty chair (or a pet, or your phone's voice memo): "
       "what it is, what it's doing, the one clever thing you noticed. Then transcribe your best three spoken sentences. "
       "Speech unlocks what the blank page freezes.",
       8, 'A, B', 'Getting Started, Speaking Confidence',
       "Most 'writing blocks' are really starting blocks — speech has a lower activation energy and produces usable sentences.",
       "Three transcribed sentences now exist on paper. That's a draft.",
       "Start the recording with 'OK so basically…' — informality is the door in."),
      ('One Question, One Text, One Minute', 'Micro Analysis',
       "Pick any text within reach — an ad on your phone, a poem from class. Set 60 seconds. Answer ONE question in writing: "
       "'What does this text want from me?' (attention? money? agreement? tears?). When the timer rings, stop mid-word if needed. "
       "You have just done textual analysis. It is genuinely that small a thing, repeated.",
       3, 'A', 'Getting Started, Focus & Motivation',
       "Shrinks 'I can't analyse' to a 60-second act that is impossible to fail — repetition does the rest.",
       "Sixty seconds of writing happened.",
       "If even that feels big, answer aloud instead. Then once more, on paper."),
      ('The Vocabulary Bridge', 'From Everyday to Analytical',
       "Draw two columns. LEFT: how you'd describe a technique to a friend ('the ad makes you feel left out if you don't buy it'). "
       "RIGHT: translate to exam register ('the advertisement constructs exclusivity, positioning non-consumers as outsiders'). "
       "Do five rows. Keep both columns — the left one proves you understood; the right one is the same idea wearing a suit.",
       12, 'D', 'Vocabulary & Terminology, Analysis Depth',
       "You already have the ideas — this converts them into the register that scores, without pretending the plain version is worthless.",
       "Five translations, and you can read the right column aloud without cringing.",
       "Stuck translating? Upgrade only the verb first: makes → constructs, shows → exposes, uses → deploys."),
      ('Error Autopsy, Gently', 'Learning from Feedback',
       "Take one marked piece of work. Find the comment that stung most. Rewrite ONLY the sentence or section it refers to, applying the feedback. "
       "Compare before/after out loud. One improvement, fully banked, beats a page of vague resolutions. File the pair where you'll see it before the exam.",
       15, 'A, B, C, D', 'Focus & Motivation, Structure & Planning',
       "Feedback becomes improvement only when re-drafted — this makes that transaction small and complete.",
       "A before/after pair exists and the after is visibly stronger.",
       "No marked work handy? Mark one of your own paragraphs against the criteria first, then fix the weakest sentence."),
      ('Read One Great Paragraph Aloud', 'Absorbing Register',
       "Find one excellent analytical paragraph (a model essay, a quality review, even this course's samples). Read it aloud twice — once for meaning, "
       "once listening only to its RHYTHM: where sentences are short, where they stack clauses. You are tuning your ear. "
       "Finish by writing one sentence that imitates the rhythm of your favourite sentence.",
       6, 'D', 'Vocabulary & Terminology, Getting Started',
       "Analytical register is caught as much as taught — the ear trains the hand.",
       "You can name one rhythm move the writer made (a short sentence after long ones counts).",
       "Use a film or music review from a broadsheet — analysis of art in confident prose is everywhere."),
      ('The Panic Downshift', 'Exam Anxiety First Aid',
       "For when a text makes your mind white-out (practice now, deploy in exams): put your pen down. Breathe out longer than in, twice. "
       "Then write the dumbest true sentence about the text: 'This is an advertisement for shoes.' Then one more: who is it for? "
       "You are moving again. The ladder back to analysis is made of obvious sentences.",
       5, 'A', 'Exam Confidence & Calm, Getting Started',
       "Panic ends analysis; this is a rehearsed route back that starts from zero and cannot fail.",
       "You practised the full sequence once, calmly, so it's available when needed.",
       "There is no stuck here — 'I am looking at a text' is a legal first sentence."),
      ('Ask the Text Eight Questions', 'Question-Led Analysis',
       "Interrogate any text with this fixed list, one line each: Who made you? For whom? What do you want? What's your best trick? "
       "What are you hiding? What would your enemy say about you? Why now? Why this form? "
       "Answering even five of the eight generates more analytical material than staring ever will.",
       12, 'A, B', 'Getting Started, Fresh Ideas & Interpretation',
       "Questions externalise analysis — instead of 'being insightful', you're just answering, which is easier.",
       "At least five answered lines that could seed paragraphs.",
       "Start with 'What do you want?' — every text wants something, and wanting is analysable."),
    ]
    for title, skill, desc, t, crit, helps, why, succ, stuck in fixed:
        rows.append(A(Assessment='Paper 1, Individual Oral, Paper 2', Category='Scaffolded Support',
            **{'Skill Focus': skill, 'Activity Type': 'Guided Analysis',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': crit,
            'Style Preference': 'Reading, Writing, Verbal, Solitary' if 'loud' in desc.lower() or 'aloud' in desc.lower() else 'Reading, Writing, Logical, Solitary',
            'Difficulty': 'Foundational', 'Support Level': HS, 'Energy Level': LOW,
            'Helps With': helps, 'Why It Helps': why, 'Success Criteria': succ, 'If You Are Stuck': stuck}))
    # Per-assessment starter packs
    packs = [
      ('Paper 1', 'Paper 1 From Zero', "Never finished a Paper 1 response? Start here. Step 1: read any short ad or poster (60s). Step 2: answer in writing — "
       "purpose? audience? (2 min). Step 3: find ONE technique and quote/describe it (2 min). Step 4: one sentence on its effect (2 min). "
       "Step 5: staple the four answers together with connectives. That IS a mini Paper 1 response. Do this daily with different text types.",
       'Advertisement, Poster', ''),
      ('Paper 2', 'Paper 2 From Zero', "Overwhelmed by the essay? Shrink it. Step 1: pick ONE theme (say, control). Step 2: one TWW moment + one ADH moment for it, "
       "from memory or notes (3 min). Step 3: one sentence comparing them with 'While… whereas…' (2 min). Step 4: add one quoted word to each side. "
       "You now hold a complete comparative point — an essay is only four of these plus an intro. Repeat tomorrow with a new theme.",
       "The World's Wife, A Doll's House", "The World's Wife, A Doll's House"),
      ('Individual Oral', 'IO From Zero', "IO feels impossible? Build the smallest version. Step 1: say your global issue aloud, any wording (30s). "
       "Step 2: name one Blake/Bui moment and one Banksy/Kruger/Gallenkuş work that show it (1 min). Step 3: speak for 60 seconds total — "
       "issue, text one, text two, done. That's the IO at 1:10 scale. Each week, double one section until you reach ten minutes.",
       'Any', 'William Blake, Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş'),
    ]
    for assess, title, desc, tts, works in packs:
        rows.append(A(Assessment=assess, Category='Scaffolded Support',
            **{'Skill Focus': 'Assessment On-Ramp', 'Activity Type': 'Guided Analysis',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': 10, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Writing, Verbal, Solitary',
            'Text Type(s)': tts, 'Text / Work Focus': works,
            'Difficulty': 'Foundational', 'Support Level': HS, 'Energy Level': LOW,
            'Session Use': 'Core Activity',
            'Helps With': 'Getting Started, Exam Confidence & Calm',
            'Why It Helps': "An on-ramp built of tiny, completable steps — because the hardest part of every assessment is the first honest attempt.",
            'Success Criteria': "You completed every step, however rough the product.",
            'If You Are Stuck': "Do only Step 1 today. Genuinely. Come back for Step 2 tomorrow — momentum compounds."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  EXAM PROXIMITY ROUTINES
# ═══════════════════════════════════════════════════════════════════════
def proximity_rows():
    rows = []
    data = [
      # (proximity, title, desc, time, session, assess, helps, why, succ, stuck, energy)
      ('Months Away', 'Build Your Quote Bank Early', "Create the master document you'll thank yourself for: one page per studied work (TWW, ADH, Blake, Bui, each artist). "
       "Add three quotations/moments per page this week — each with location and one-word theme tags. Set a weekly 10-minute top-up. "
       "By exam season you'll own a personal anthology no cram session could build.", 30, 'Core Activity', 'Paper 2, Individual Oral',
       'Quotations & Evidence, Memory & Recall',
       "Evidence banks built slowly are retained; ones built in May are rented.",
       "The document exists with all works represented.", "Start with the quotes already in your class notes — collection before curation.", None),
      ('Months Away', 'The Reading Diet', "Subscribe your eyes: pick three recurring non-literary sources (a columnist, a data-viz account, a campaign's ads) "
       "and skim them weekly with one analytical note each — 'noticed: tricolon in headline'. Ten minutes a week compounds into genre fluency "
       "no last-minute practice can fake. Set the weekly slot now.", 10, 'Core Activity', 'Paper 1',
       'Analysis Depth, Focus & Motivation',
       "Paper 1 rewards accumulated genre exposure — a diet beats a binge.",
       "Three sources chosen and this week's three notes made.", "Steal sources: one broadsheet columnist, one NGO campaign, one brand you admire.", LOW),
      ('Months Away', 'Error Log: Open One Today', "Start a running two-column log: LEFT — every mistake feedback identifies (vague thesis, floating quotes, no effects); "
       "RIGHT — the fix in your own words. Review the log before each practice piece. Mistakes repeated are habits; mistakes logged are curriculum.",
       10, 'Reflection', 'Paper 1, Individual Oral, Paper 2', 'Structure & Planning, Focus & Motivation',
       "Your errors are the most personalised syllabus that will ever exist — logging turns them into lessons.",
       "The log exists with at least two entries.", "Mine your most recent marked work for entries one and two.", LOW),
      ('Weeks Away', 'The Rotation Plan', "Three assessments, one calendar. Draw next week: assign each study day ONE lead assessment (P1 / P2 / IO) plus a 10-minute "
       "'minor' from another. Rotation beats bingeing: spacing effects are real, and no assessment goes stale. Pin the plan where you study.",
       15, 'Core Activity', 'Paper 1, Individual Oral, Paper 2', 'Time Management, Focus & Motivation',
       "Interleaved revision outperforms blocked cramming in retention studies again and again.",
       "Seven days, each with a lead and a minor, visible at your desk.", "Default rotation: P1 / P2 / IO / P1 / P2 / IO / rest.", None),
      ('Weeks Away', 'Past-Question Speed Dating', "Collect five practice questions for your target paper. Spend exactly four minutes per question planning an answer — "
       "thesis and three bullet points, then move on regardless. Five plans in twenty minutes. Planning fluency, not completeness, is the skill; "
       "full essays come later.", 25, 'Exam Practice', 'Paper 2', 'Time Management, Structure & Planning',
       "High-rep planning removes the fear of the unseen question — you've dated its cousins.",
       "Five skeleton plans exist; the fifth was faster than the first.", "Recycle themes: power, voice, gender, money cover most questions between them.", HIGH),
      ('Weeks Away', 'Half-Exam Wednesdays', "Once a week, sit HALF an exam under real conditions: one Paper 1 text analysis, or one Paper 2 body section, or a "
       "5-minute IO chunk delivered aloud. Full conditions, half length, weekly rhythm. Stamina builds without burnout, and Wednesday-you keeps "
       "exam-day-you honest.", 45, 'Exam Practice', 'Paper 1, Individual Oral, Paper 2', 'Time Management, Exam Confidence & Calm',
       "Weekly exposure at half scale inoculates against exam-day shock at a sustainable cost.",
       "This week's half-exam happened and is dated in your notes.", "Shrink further if needed: a quarter-exam beats a skipped one.", HIGH),
      ('Final Week', 'One-Pager Per Work', "Distil each studied work onto a single page: five themes, eight micro-quotes, three techniques, one 'shape' diagram "
       "(the work's arc drawn as a line). No sentences — fragments and arrows only. The constraint forces prioritisation, which IS the revision. "
       "Four works, four pages, done across two days.", 30, 'Core Activity', 'Paper 2, Individual Oral', 'Memory & Recall, Structure & Planning',
       "Compression is retrieval practice in disguise — and the pages become your final-days review set.",
       "One complete page per work, readable at arm's length.", "Start from your quote bank and cut — curation is easier than creation.", HIGH),
      ('Final Week', 'The Daily Mixed Six', "Each morning this week: six micro-tasks in 30 minutes — one P1 first-impressions read, one technique flashcard run, "
       "one TWW/ADH comparative sentence, one IO signpost spoken aloud, one quote self-test, one past-question plan. Everything touched daily, "
       "nothing bingeed. Tick the grid; momentum is the metric.", 30, 'Exam Practice', 'Paper 1, Individual Oral, Paper 2',
       'Memory & Recall, Exam Confidence & Calm',
       "Daily contact with every assessment keeps all circuits warm without exhausting any of them.",
       "Six ticks today.", "Halve each task rather than skip it — three minutes of quotes still counts.", None),
      ('Final Week', 'Triage, Kindly', "List every topic/work/skill for your next paper. Mark each: GREEN (secure), AMBER (shaky), RED (avoided). "
       "This week belongs to AMBER — highest return per hour. Schedule reds only if ambers finish. Greens get five-minute confirmations, not hours. "
       "Triage isn't giving up; it's aiming.", 15, 'Reflection', 'Paper 1, Individual Oral, Paper 2', 'Time Management, Focus & Motivation',
       "Final-week hours are precious — spending them where marks actually move is a skill, not a compromise.",
       "Every topic has a colour and next week's slots follow the colours.", "Can't rate honestly? Rate by dread: mild dread = amber, strong dread = red.", None),
      ('Night Before', 'The Calm Kit', "Tonight is for consolidation, not conquest. 20 minutes maximum: re-read your one-pagers slowly, speak your IO signposts "
       "once, lay out tomorrow's logistics (route, ID, pens, water). Then close the books — genuinely. Sleep converts today's work into tomorrow's "
       "retrieval; all-nighters trade marks for anxiety.", 20, 'Cool-Down', 'Paper 1, Individual Oral, Paper 2',
       'Exam Confidence & Calm, Memory & Recall',
       "Sleep is the highest-yield revision activity that exists the night before — everything else is margin.",
       "Books closed by your set time; kit by the door.", "Anxious hands? Copy out your eight favourite micro-quotes once, beautifully, then stop.", LOW),
      ('Night Before', 'Eight Quotes, Once Each', "Choose the eight quotations you most want available tomorrow (mix TWW, ADH, and IO texts if orals loom). "
       "Write each once from memory, check, correct. Do NOT expand the list tonight — eight secured beats thirty skimmed. "
       "End by saying your favourite aloud with its analytical point. Done. You are more ready than you feel.", 15, 'Warm-Up',
       'Paper 2, Individual Oral', 'Memory & Recall, Exam Confidence & Calm',
       "A small, secured evidence set carries further under pressure than a large, wobbly one.",
       "Eight from-memory attempts, all corrected.", "Pick short ones. 'Little skylark' is two words and fully weaponised.", LOW),
      ('Night Before', 'Tomorrow-Morning Note', "Write a six-line note to exam-day you: your thesis formula, your paragraph spine, your two rescue starters "
       "('The dumbest true sentence…'), and one line of perspective ('You have done this in practice N times'). Read it with breakfast. "
       "Externalised calm survives adrenaline better than remembered calm.", 8, 'Cool-Down', 'Paper 1, Individual Oral, Paper 2',
       'Exam Confidence & Calm, Getting Started',
       "A pre-written protocol is what you'll actually follow when nerves arrive — decide tonight so you don't debate tomorrow.",
       "The note exists and sits with your exam kit.", "Copy the formulas from this app's scaffold activities — tonight is assembly, not authorship.", LOW),
    ]
    for prox, title, desc, t, session, assess, helps, why, succ, stuck, energy in data:
        rows.append(A(Assessment=assess, Category='Exam Countdown',
            **{'Skill Focus': f'{prox} Routine', 'Activity Type': 'Exam Prep' if 'Exam' in session else 'Skill Builder',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Logical, Writing, Intrapersonal, Solitary',
            'Session Use': session, 'Exam Proximity': prox,
            'Materials': 'Pen & Paper',
            'Energy Level': energy or 'Medium — normal study energy',
            'Support Level': HS if prox in ('Night Before',) else 'Some Scaffolding — guided but open',
            'Helps With': helps, 'Why It Helps': why, 'Success Criteria': succ, 'If You Are Stuck': stuck}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  COOL-DOWNS
# ═══════════════════════════════════════════════════════════════════════
def cooldown_rows():
    rows = []
    data = [
      ('3-2-1 Landing', "End your session by writing: THREE things you now know/can do that you didn't an hour ago, TWO questions still open, "
       "ONE thing you'll start with next session. Ninety seconds, no polish. You've just built your own next lesson plan and proved the session mattered.", 3),
      ('Teach It to the Wall', "Explain the main thing you just studied to the wall (or a sibling, or the dog) in under two minutes, no notes. "
       "Where you hesitate is where the gap is — write that gap down as next session's first task. Teaching is the fastest audit of learning.", 5),
      ('Error Log Deposit', "Before closing your books: add today's one mistake or weakness to your error log, with its fix in your own words. "
       "One entry per session, every session. The log becomes your personalised mark-scheme over time.", 4),
      ('The Highlight Reel', "Copy out — by hand, nicely — the single best sentence YOU wrote today. Date it. Keep them all on one page. "
       "On rough days, that page is evidence: you can do this, in your own handwriting, repeatedly.", 4),
      ('Schedule the Echo', "Memory needs echoes: put two calendar reminders for today's material — one in 48 hours ('re-test Blake quotes, 5 min'), "
       "one next week. Thirty seconds of scheduling doubles the value of the hour you just spent. Then close everything guilt-free.", 3),
      ('One-Breath Summary', "Take one breath and summarise today's text or topic aloud before you stand up — whatever fits in a single exhale. "
       "The compression finds your core understanding. If nothing fits in a breath, note that honestly: tomorrow starts with re-reading, and that's fine.", 2),
      ('Close the Loops', "Scan today's margin notes for every '?', 'check this', or half-thought. Either resolve each in one line now, or copy it onto "
       "tomorrow's list. Unclosed loops leak attention all evening; this drains the buffer in five minutes.", 5),
      ('Confidence Ledger', "Two columns, one minute each: 'What felt hard today' and 'What I did anyway'. The second column is the one that predicts "
       "your results. Read it back once. Sessions end better on evidence than on vibes.", 4),
    ]
    for title, desc, t in data:
        rows.append(A(Assessment='General', Category='Study Skills & Wellbeing',
            **{'Skill Focus': 'Session Cool-Down', 'Activity Type': 'Reflective Response',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': 'A',
            'Style Preference': 'Intrapersonal, Writing, Verbal, Solitary',
            'Session Use': 'Cool-Down', 'Exam Proximity': 'Any Time',
            'Energy Level': LOW, 'Support Level': HS,
            'Helps With': 'Focus & Motivation, Memory & Recall',
            'Why It Helps': "How a session ends decides how much of it survives — two minutes of consolidation protects sixty of work.",
            'Success Criteria': "It happened before the books closed, not 'later'.",
            'If You Are Stuck': "Do the shortest version: one sentence, out loud, about what you did. That still counts."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  PAIR & GROUP
# ═══════════════════════════════════════════════════════════════════════
def social_rows():
    rows = []
    data = [
      ('Pair', 'Quote Tennis', "Face a partner. Serve a micro-quotation from TWW, ADH, Blake, or Bui; they must return the work, speaker/context, and one "
       "analytical point — then serve back. Dropped return = point to server. First to five. Loud, fast, and better than flashcards for exam recall.",
       10, 'Paper 2, Individual Oral', 'Memory & Recall, Quotations & Evidence', "The World's Wife, A Doll's House", 'Verbal, Auditory, Social/Interpersonal, Kinesthetic'),
      ('Pair', 'Swap-and-Steal Paragraphs', "Each write a timed paragraph on the same text (10 min). Swap. Underline the ONE sentence in your partner's work "
       "you wish you'd written, and say why. Rewrite your own paragraph stealing that move (not the words). Two writers, four improvements, twenty-five minutes.",
       25, 'Paper 1, Paper 2', 'Analysis Depth, Structure & Planning', 'Any', 'Reading, Writing, Social/Interpersonal, Analytical'),
      ('Pair', 'IO Mock Panel', "One delivers any 3-minute IO slice; the other plays examiner with three prepared follow-up questions (one friendly, one probing, "
       "one mean-but-fair). Swap roles. Debrief with the rubric between you: one criterion-linked compliment and one fix each. "
       "The examiner role teaches as much as the candidate role.", 25, 'Individual Oral', 'Speaking Confidence, Fresh Ideas & Interpretation',
       'Any', 'Verbal, Auditory, Social/Interpersonal, Intrapersonal'),
      ('Pair', 'Same Text, Two Lenses', "Both analyse one Paper-1-style text for ten minutes — but one of you may only discuss VERBAL choices, the other only "
       "VISUAL/STRUCTURAL ones. Present to each other; then write one joint thesis that needs both lenses. This is how multimodal analysis is supposed to feel.",
       20, 'Paper 1', 'Analysis Depth, Comparative Linking', 'Advertisement, Infographic, Website', 'Visual, Verbal, Social/Interpersonal, Analytical'),
      ('Pair', 'The Kind Interrogation', "Partner A states their IO global issue and pairing. Partner B asks only questions — no advice — for five minutes: "
       "'why this work and not another?', 'where exactly in the text?', 'who disagrees?'. Swap. Questions expose gaps gently; answers rehearse the real Q&A.",
       15, 'Individual Oral', 'Structure & Planning, Speaking Confidence', 'Any', 'Verbal, Social/Interpersonal, Analytical'),
      ('Group', 'Technique Auction', "Groups of 3–5, one auctioneer. Auctioneer names a technique (juxtaposition, direct address, motif…). Teams bid by naming "
       "texts that use it — any studied work or wild text — and must justify each bid in one sentence. Weak justification = bid void. "
       "Most valid bids after ten techniques wins. Chaos, laughter, and a revision map of the whole course.", 20,
       'Paper 1, Individual Oral, Paper 2', 'Memory & Recall, Comparative Linking', 'Any', 'Verbal, Auditory, Social/Interpersonal, Logical'),
      ('Group', 'Fishbowl: The Question Nobody Chose', "Circle up. Inner pair discusses a Paper 2 question everyone avoided in practice; outer circle tracks "
       "every move on paper: claims, evidence, comparisons, drift. Rotate pairs every four minutes. End by assembling the best plan from all rotations "
       "on the board. The avoided question is now everyone's strongest.", 30, 'Paper 2', 'Comparative Linking, Structure & Planning',
       "The World's Wife, A Doll's House", 'Verbal, Auditory, Social/Interpersonal, Analytical'),
      ('Group', 'Gallery Walk: One Issue, Five Works', "Post five texts around the room (a Blake poem, a Bui spread, one work each from Banksy, Kruger, Gallenkuş). "
       "Groups rotate with one shared global issue, leaving one sticky-note observation per station — no repeats allowed, so later groups must dig deeper. "
       "Final huddle: which TWO works make the strongest IO pairing for this issue, and why?", 30, 'Individual Oral',
       'Comparative Linking, Fresh Ideas & Interpretation', 'Poems, Graphic Novel, Artwork', 'Visual, Kinesthetic, Social/Interpersonal, Analytical'),
      ('Group', 'Speed-Teaching Carousel', "Everyone preps one 90-second masterclass on a niche they own (Kruger's typography, the tarantella, gutters in Bui, "
       "tricolon in speeches). Carousel: teach it three times to three different partners. By round three you'll hear your own explanation sharpen — "
       "and you'll have received three others' masterclasses in trade.", 25, 'Paper 1, Individual Oral, Paper 2',
       'Speaking Confidence, Memory & Recall', 'Any', 'Verbal, Auditory, Social/Interpersonal, Kinesthetic'),
      ('Group', 'Mark-Together Monday', "As a group, mark one anonymous practice paragraph (yours or a bank sample) against the real criteria, projected. "
       "Argue every half-band. Then each writes the 'examiner comment' they'd leave. Comparing comments reveals how differently the rubric can be read — "
       "and where it can't. Calibration now saves marks later.", 25, 'Paper 1, Paper 2', 'Structure & Planning, Analysis Depth',
       'Any', 'Reading, Social/Interpersonal, Logical, Analytical'),
    ]
    for fmt, title, desc, t, assess, helps, tts, styles in data:
        rows.append(A(Assessment=assess, Category='Pair & Group Practice',
            **{'Skill Focus': 'Collaborative Revision', 'Activity Type': 'Social Activity',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': 'A, B, C, D',
            'Style Preference': styles, 'Text Type(s)': tts,
            'Text / Work Focus': "The World's Wife, A Doll's House" if assess == 'Paper 2' else '',
            'Format': fmt, 'Location': 'In Class',
            'Session Use': 'Core Activity',
            'Materials': 'Pen & Paper, Printed Text or Screen',
            'Helps With': helps,
            'Why It Helps': "Studying with others adds retrieval pressure, instant feedback, and accountability that solo sessions can't fake.",
            'Success Criteria': "Everyone produced or performed something — nobody only watched.",
            'If You Are Stuck': "Halve the group or halve the time. Small and real beats big and theoretical."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  GENERAL STUDY SKILLS + WARM-UP SPRINTS
# ═══════════════════════════════════════════════════════════════════════
def general_rows():
    rows = []
    gen = [
      ('Memory Palace: The Doll\'s House Edition', "Build a literal memory palace from the Helmers' apartment: front door (the slam), letterbox (Krogstad's letter), "
       "stove (comfort/lies), tree (appearances), Nora's desk (the forgery). Walk the rooms mentally, placing one quotation at each station. "
       "Ten minutes to build; test yourself tomorrow by 'walking' it. Spatial memory outlasts list memory.",
       15, 'Memory & Recall, Quotations & Evidence', 'Paper 2', "A Doll's House", 'Spatial, Visual, Kinesthetic, Solitary'),
      ('Spaced Repetition Setup', "Set up a simple spaced system for quotes and techniques: today / +2 days / +1 week / +1 month boxes (physical or app). "
       "Load it with just ten cards to start. The system matters more than the software — moving a card you got right feels like winning because it is.",
       20, 'Memory & Recall, Focus & Motivation', 'Paper 1, Individual Oral, Paper 2', '', 'Logical, Kinesthetic, Solitary'),
      ('The Analytical Verb Wall', "Make a poster of 25 analytical verbs sorted by strength: gentle (suggests, evokes) → firm (constructs, positions) → "
       "forceful (indicts, weaponises, dismantles). Put it where you study. Rule: every practice paragraph must use one verb from each band. "
       "Watch your Criterion D transform.", 20, 'Vocabulary & Terminology, Analysis Depth', 'Paper 1, Individual Oral, Paper 2', '', 'Visual, Linguistic, Writing, Solitary'),
      ('Handwriting Stamina Builder', "Exams are handwritten marathons. Twice a week, copy or compose for ten unbroken minutes by hand, timing your word count. "
       "Track the number. Stamina, legibility, and speed all train; cramps surface now instead of mid-exam. Boring, physical, and quietly decisive.",
       10, 'Time Management, Exam Confidence & Calm', 'Paper 1, Paper 2', '', 'Kinesthetic, Writing, Solitary'),
      ('The Focus Sprint Protocol', "Try one 25/5 cycle today: 25 minutes on a single named task (not 'study' — 'plan two Paper 2 questions'), 5 minutes fully off. "
       "Phone in another room. Log what you finished. If 25 feels long, run 15/3 — the protocol scales down honourably. "
       "One good sprint usually recruits a second.", 30, 'Focus & Motivation, Time Management', 'General', '', 'Logical, Kinesthetic, Solitary'),
      ('Nature Walk Analysis', "Take your revision outdoors: walk for fifteen minutes and 'read' the designed environment — shop signs, wayfinding, park notices, "
       "graffiti. Choose the single most persuasive object you pass and analyse it aloud as you walk: purpose, audience, technique, effect. "
       "Naturalist brains study better in motion; texts are genuinely everywhere.", 20, 'Analysis Depth, Focus & Motivation', 'Paper 1', '', 'Naturalist, Kinesthetic, Verbal, Solitary'),
      ('Playlist Close-Reading', "Take one song you already love. Analyse its lyrics as a text: persona, direct address, imagery chains, structural drop. "
       "One page, ten minutes, full enjoyment permitted. Song lyrics are legitimate oral/poetic texts — and analysing what you love rebuilds "
       "the habit on easy mode.", 12, 'Analysis Depth, Fresh Ideas & Interpretation', 'Paper 1, Paper 2', '', 'Auditory, Linguistic, Solitary'),
      ('Explain It in Your Other Language', "If you speak more than one language: explain today's key concept (juxtaposition, dramatic irony, the IO structure) "
       "in your other language, aloud. Translation forces genuine understanding — jargon can't hide. Note any concept that refuses translation; "
       "that's the one to revisit in English tomorrow.", 8, 'Memory & Recall, Vocabulary & Terminology', 'General', '', 'Verbal, Linguistic, Intrapersonal, Solitary'),
    ]
    for title, desc, t, helps, assess, works, styles in gen:
        rows.append(A(Assessment=assess, Category='Study Skills & Wellbeing',
            **{'Skill Focus': 'Study Technique', 'Activity Type': 'Skill Builder',
            'Activity Title': title, 'Activity Description': desc, 'Time (min)': t, 'IB Criterion': 'A',
            'Style Preference': styles, 'Text / Work Focus': works,
            'Session Use': 'Core Activity', 'Exam Proximity': 'Months Away, Weeks Away',
            'Helps With': helps,
            'Why It Helps': "Meta-skills — memory, stamina, focus — multiply every content hour you invest afterwards.",
            'Success Criteria': "You did the setup or the rep once for real, not just read about it.",
            'If You Are Stuck': "Shrink it: five cards, five minutes, one verb band. Systems grow; they don't have to start grown."}))
    # Warm-up sprints: technique spotting + vocab flash
    sprints = [
      ('Alliteration & Sound Play', 'headlines and slogans within reach'),
      ('Tricolon (Rule of Three)', 'speeches, ads, and your own notes'),
      ('Direct Address ("you")', 'any advertisement or app notification'),
      ('Imperatives', 'packaging, buttons, and campaign slogans'),
      ('Statistics as Rhetoric', 'news alerts and infographics'),
      ('Emotive Adjectives', 'charity appeals and reviews'),
      ('Puns & Wordplay', 'shop names and tabloid headlines'),
      ('Contrast / Antithesis', 'political slogans and film taglines'),
      ('Hyperbole', 'ads and influencer captions'),
      ('Euphemism', 'corporate statements and news reports'),
      ('Jargon & Technical Register', 'terms and conditions, sports commentary'),
      ('Personal Pronoun Shifts (I/we/you)', 'speeches and brand copy'),
    ]
    for tech, where in sprints:
        rows.append(A(Assessment='Paper 1', Category='Warm-Up Sprints',
            **{'Skill Focus': 'Technique Spotting', 'Activity Type': 'Skill Drill',
            'Activity Title': f'90-Second Spot: {tech}',
            'Activity Description': (
              f"Ninety seconds on the clock: find one real example of {tech.lower()} in {where}. Say or jot: the exact words, "
              f"who it targets, and the one-word effect (reassures? urges? flatters?). Timer rings, you stop. "
              f"A single spotted technique per day compounds into a Paper 1 reflex."),
            'Time (min)': 2, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Logical, Solitary',
            'Session Use': 'Warm-Up', 'Exam Proximity': 'Any Time',
            'Materials': 'None — just your eyes and brain', 'Location': 'Anywhere',
            'Energy Level': LOW, 'Support Level': HS,
            'Helps With': 'Analysis Depth, Getting Started',
            'Why It Helps': "Tiny daily reps make technique-spotting automatic — freeing exam attention for analysis instead of hunting.",
            'Success Criteria': "One example, one target, one effect-word — inside the 90 seconds.",
            'If You Are Stuck': "Open any app's home screen. Persuasion is guaranteed within one scroll."}))
    return rows

def all_rows():
    return scaffold_rows() + proximity_rows() + cooldown_rows() + social_rows() + general_rows()

if __name__ == '__main__':
    rows = all_rows()
    print(f'{len(rows)} support activities')
    from collections import Counter
    print(Counter(r['Category'] for r in rows))
