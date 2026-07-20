#!/usr/bin/env python3
"""Enrich the existing 1,926 IB Lang&Lit activities with the v3 column set."""
import pandas as pd
import re

SRC = 'ib_db.xlsx'

# ── canonical style names ──────────────────────────────────────────────
STYLE_MAP = {
    'v': ['Visual'], 'visual': ['Visual'],
    'sp': ['Spatial'], 'spatial': ['Spatial'],
    'au': ['Auditory'], 'auditory': ['Auditory'], 'aural': ['Auditory'],
    'r/w': ['Reading', 'Writing'], 'reading/writing': ['Reading', 'Writing'],
    'reading': ['Reading'], 'writing': ['Writing'],
    'k': ['Kinesthetic'], 'kinesthetic': ['Kinesthetic'],
    'vb': ['Verbal'], 'verbal': ['Verbal'],
    'l': ['Linguistic'], 'linguistic': ['Linguistic'],
    'log': ['Logical'], 'logical': ['Logical'],
    'an': ['Analytical'], 'analytical': ['Analytical'],
    'soc': ['Social/Interpersonal'], 'inter': ['Social/Interpersonal'],
    'social': ['Social/Interpersonal'], 'interpersonal': ['Social/Interpersonal'],
    'sol': ['Solitary'], 'solitary': ['Solitary'],
    'intra': ['Intrapersonal'], 'intrapersonal': ['Intrapersonal'],
    'nat': ['Naturalist'], 'natural': ['Naturalist'], 'naturalist': ['Naturalist'],
    'mm': ['Multimodal'], 'multimodal': ['Multimodal'],
    'cultural': ['Social/Interpersonal'], 'reflective': ['Intrapersonal'],
}
STYLE_ORDER = ['Visual', 'Spatial', 'Auditory', 'Reading', 'Writing', 'Kinesthetic',
               'Verbal', 'Linguistic', 'Logical', 'Analytical', 'Social/Interpersonal',
               'Solitary', 'Intrapersonal', 'Naturalist', 'Multimodal']

def canon_styles(raw):
    out = []
    for tok in str(raw or '').split(','):
        for s in STYLE_MAP.get(tok.strip().lower(), []):
            if s not in out:
                out.append(s)
    return ', '.join(sorted(out, key=STYLE_ORDER.index)) if out else 'Multimodal'

# ── skill-column special labels ────────────────────────────────────────
ARTIST_SKILLS = {
    'William Blake Poems': 'William Blake',
    'The Best We Could Do (Thi Bui)': 'Thi Bui',
    'Banksy': 'Banksy',
    'Barbara Kruger': 'Barbara Kruger',
    'Ugur Gallenkuş': 'Ugur Gallenkuş',
}
LEARNER_SKILLS = {
    'Visual Learners', 'Auditory / Aural Learners', 'Kinesthetic / Physical Learners',
    'Reading / Writing Learners', 'Logical / Analytical Learners',
    'Social / Interpersonal Learners', 'Solitary / Intrapersonal Learners',
    'Naturalist / Environmental Learners', 'Verbal / Linguistic Learners',
    'Multimodal and Multi-Sensory Blends',
}
CONTEXT_SKILLS = {
    'On the Commute (MRT, Bus, Walking)': 'On the Go',
    'At the Canteen or Food Court': 'Out & About',
    'Shopping and Retail Spaces': 'Out & About',
    'CCA, Sports, and After-School Activities': 'Out & About',
    'Scrolling Social Media': 'During Screen Time',
    'Texting and Messaging': 'During Screen Time',
    'Watching Video Content (Netflix, YouTube, TikTok)': 'During Screen Time',
    'Listening (Podcasts, Music, Radio)': 'During Screen Time',
}

WORK_SIGNALS = [
    ('William Blake',   ['william blake', 'blake', 'innocence and experience', 'the tyger', 'chimney sweeper']),
    ('Thi Bui',         ['thi bui', 'best we could do', 'tbwcd']),
    ('Banksy',          ['banksy']),
    ('Barbara Kruger',  ['barbara kruger', 'kruger']),
    ('Ugur Gallenkuş',  ['gallenkuş', 'gallenkus']),
    ("The World's Wife", ["world's wife", 'tww', 'duffy', 'mrs midas', 'little red-cap', 'anne hathaway', 'medusa', 'mrs lazarus']),
    ("A Doll's House",  ["doll's house", 'adh', 'nora', 'torvald', 'ibsen', 'krogstad', 'tarantella', 'macaroon']),
]

P2_CATS_PREFIX = ('Paper 2', 'Crit ', 'Integrated Skills')
P1_CATS = {
    'Strategic Reading', 'Text Type Specific', 'Visual Rhetoric & Design',
    'Digital & News Media', 'Visual Media & Cinema', 'Multimodal Analysis',
    'Genre Specifics', 'Genre Analysis', 'Technical Analysis',
    'Oral & Performative Texts',
}
ALL3_CATS = {'Language & Register'}
P1P2_CATS = {'Thesis & Structure', 'Evidence & Support'}
P2IO_CATS = {'Poetry & Verse Analysis', 'Comparative Analysis'}
GEN_CATS = {'Executive Function & Pragmatics'}

def derive_assessment(row):
    cat, skill = row['Category'], row['Skill']
    blob = (str(row['Skill']) + ' ' + str(row['Text Type(s)']) + ' ' + str(row['Activity Description'])).lower()
    if skill in ARTIST_SKILLS:
        return 'Individual Oral'
    if cat == 'Individual Oral Preparation' or row['Activity Type'] == 'IO Prep':
        return 'Individual Oral'
    if cat.startswith(P2_CATS_PREFIX):
        return 'Paper 2'
    if cat in ALL3_CATS:
        return 'Paper 1, Individual Oral, Paper 2'
    if cat in P1P2_CATS:
        return 'Paper 1, Paper 2'
    if cat in P2IO_CATS:
        return 'Individual Oral, Paper 2'
    if cat in GEN_CATS:
        return 'General'
    if cat == 'Prose & Literary Texts':
        return 'Paper 1' if 'essay' in str(row['Text Type(s)']).lower() else 'Individual Oral, Paper 2'
    if cat in P1_CATS:
        # TWW/ADH-flavoured rows hiding in P1 categories
        if "world's wife" in blob or "doll's house" in blob:
            return 'Paper 2'
        return 'Paper 1'
    return 'General'

def derive_works(row):
    blob = (str(row['Skill']) + ' | ' + str(row['Text Type(s)']) + ' | ' +
            str(row['Activity Title']) + ' | ' + str(row['Activity Description'])).lower()
    found = []
    for work, sigs in WORK_SIGNALS:
        if any(re.search(r'\b' + re.escape(s) + r'\b', blob) for s in sigs):
            found.append(work)
    return ', '.join(found)

# ── skill focus cleanup ────────────────────────────────────────────────
def clean_skill(row):
    skill = str(row['Skill']).strip()
    if skill in ARTIST_SKILLS:
        return 'Close Reading & Interpretation'
    if skill in LEARNER_SKILLS:
        return 'Multimodal Analysis'
    if skill in CONTEXT_SKILLS:
        return 'Everyday Text Analysis'
    if ' - ' in skill:                      # "TextType - Skill" combos
        return skill.split(' - ', 1)[1].strip()
    # strip "[Poems] "-style prefixes that leaked into titles/skills
    return re.sub(r'^\[[^\]]+\]\s*', '', skill)

def location_for(row):
    skill = str(row['Skill']).strip()
    if skill in CONTEXT_SKILLS:
        return CONTEXT_SKILLS[skill]
    return str(row['Location']).strip() or 'Anywhere'

# ── description repair ─────────────────────────────────────────────────
def repair_desc(d):
    d = str(d).strip()
    if d.endswith(('.', '!', '?', ')', '"', "'", '…', ':')):
        return d, False
    # clipped mid-sentence: cut back to the last full sentence
    m = max(d.rfind('. '), d.rfind('! '), d.rfind('? '))
    if m > 80:
        return d[:m + 1], True
    return d.rstrip(' ,;–-') + '…', True

# ── session use ────────────────────────────────────────────────────────
def derive_session(row):
    at = str(row['Activity Type']).lower()
    cat = str(row['Category']).lower()
    desc = str(row['Activity Description']).lower()
    t = row['Time (min)']
    if 'individual oral' in cat or at == 'io prep':
        return 'IO Preparation'
    if at in ('exam prep', 'exam practice', 'timed practice') or 'timed' in desc[:60] or 'full exam' in desc:
        return 'Exam Practice'
    if at in ('writing practice', 'writing workshop') or 'essay' in at:
        return 'Writing Task'
    if at in ('reflective response', 'editing & revision') or 'reflect' in at:
        return 'Cool-Down' if t <= 10 else 'Reflection'
    if at == 'intrapersonal activity' or any(k in desc for k in ('journal', 'look back on', 'review your notes', 'self-assess')):
        return 'Cool-Down' if t <= 10 else 'Reflection'
    if t <= 3:
        return 'Warm-Up'
    return 'Core Activity'

# ── exam proximity ─────────────────────────────────────────────────────
def derive_proximity(row, session):
    t = row['Time (min)']
    at = str(row['Activity Type']).lower()
    desc = str(row['Activity Description']).lower()
    if session == 'Exam Practice' or 'timed' in desc[:80]:
        return 'Weeks Away, Final Week'
    if any(k in desc for k in ('memoris', 'memoriz', 'recall', 'flashcard', 'quiz yourself', 'from memory')):
        return 'Final Week, Night Before'
    if t <= 3 and 'drill' in at:
        return 'Any Time'
    if t >= 45:
        return 'Months Away, Weeks Away'
    if session in ('Reflection', 'Cool-Down'):
        return 'Any Time'
    return 'Any Time'

# ── materials ──────────────────────────────────────────────────────────
def derive_materials(row):
    desc = str(row['Activity Description']).lower()
    loc = location_for(row)
    out = []
    if any(k in desc for k in ('flashcard', 'flash card', 'cue card')): out.append('Flashcards')
    if any(k in desc for k in ('record yourself', 'record your', 'recording', 'voice memo')): out.append('Recording Device')
    if any(k in desc for k in ('timer', 'timed', 'stopwatch', 'set a time')): out.append('Timer')
    if any(k in desc for k in ('highlight', 'annotate', 'underline', 'margin')): out.append('Printed Text or Screen')
    if any(k in desc for k in ('find any', 'find an', 'find a ', 'search', 'online', 'youtube', 'website', 'social media', 'image search', 'streaming')): out.append('Device')
    if any(k in desc for k in ('write', 'list', 'table', 'sketch', 'draw', 'map', 'chart', 'note', 'sentence')): out.append('Pen & Paper')
    if loc in ('On the Go', 'Out & About') and not out:
        return 'None — just your eyes and brain'
    if not out:
        out.append('Pen & Paper')
    seen = []
    for o in out:
        if o not in seen: seen.append(o)
    return ', '.join(seen[:3])

# ── energy ─────────────────────────────────────────────────────────────
def derive_energy(row, session):
    t = row['Time (min)']
    if session in ('Cool-Down', 'Reflection') or t <= 3:
        return 'Low — fine when tired'
    if session == 'Exam Practice' or t >= 45 or str(row['Difficulty']) == 'Advanced':
        return 'High — needs full focus'
    return 'Medium — normal study energy'

# ── support level ──────────────────────────────────────────────────────
def derive_support(row):
    desc = str(row['Activity Description'])
    diff = str(row['Difficulty'])
    scaffolded = bool(re.search(r'Formula:|template|sentence starter|e\.g\.|step 1|first,|checklist|frame:', desc, re.I))
    if diff == 'Foundational' or (diff == 'Developing' and scaffolded):
        return 'Highly Scaffolded — steps are laid out for you'
    if diff == 'Advanced' and not scaffolded:
        return 'Independent — you drive the thinking'
    return 'Some Scaffolding — guided but open'

# ── helps with ─────────────────────────────────────────────────────────
HELP_RULES = [
    ('Getting Started',        r'thesis|opening|first sentence|start|topic sentence|begin|initiat'),
    ('Analysis Depth',         r'technique|effect|why|analy[sz]|connotation|imagery|symbol|juxtapos|close read'),
    ('Structure & Planning',   r'structure|outline|plan|paragraph|organis|organiz|order|map the'),
    ('Time Management',        r'timed|timer|pacing|minutes? only|under \d|speed'),
    ('Quotations & Evidence',  r'quot|evidence|cite|line that|motif|from memory|memoris|memoriz'),
    ('Comparative Linking',    r'compar|both texts|contrast|pair|versus|similarit|link.*between'),
    ('Speaking Confidence',    r'aloud|speak|oral|record yourself|say|voice|whisper|explain to'),
    ('Vocabulary & Terminology', r'vocabulary|verb bank|terminolog|word bank|analytical verbs|glossary'),
    ('Memory & Recall',        r'recall|memoris|memoriz|flashcard|quiz yourself|from memory|name that'),
    ('Fresh Ideas & Interpretation', r'alternative|another interpretation|creative|imagine|rewrite|different perspective|what if'),
]
def derive_helps(row, session):
    blob = (str(row['Skill']) + ' ' + str(row['Activity Title']) + ' ' + str(row['Activity Description'])).lower()
    out = [label for label, pat in HELP_RULES if re.search(pat, blob)]
    cat = str(row['Category'])
    if cat == 'Executive Function & Pragmatics':
        out.insert(0, 'Focus & Motivation')
    if session in ('Exam Practice',):
        out.append('Exam Confidence & Calm')
    if not out:
        out.append('Analysis Depth')
    return ', '.join(out[:4])

# ── per-category guidance (why / success / stuck) ─────────────────────
GUIDE = {
  'Strategic Reading': (
    "Sharpens the fast, accurate first read that Paper 1 rewards — seeing what a text is doing before you write a word.",
    "You can state the text's purpose, audience, and one key technique without rereading.",
    "Cover the text. Ask only: who made this, for whom, and what do they want me to feel? Then look again."),
  'Text Type Specific': (
    "Paper 1 hands you an unfamiliar text type — knowing each type's conventions means you start analysing instead of decoding.",
    "You can name two conventions of this text type and how this example uses or bends them.",
    "List what you'd EXPECT this text type to do. Then hunt for the one place this example does something different."),
  'Multimodal Analysis': (
    "Trains you to read images, layout, and words as one argument — the core of Paper 1's visual texts.",
    "You can explain how one visual choice and one verbal choice work together.",
    "Start with your eye: where did it land first? That spot was designed. Ask why."),
  'Visual Rhetoric & Design': (
    "Design choices are arguments. Decoding them fast gives you instant analytical material for Paper 1.",
    "You can link one design choice (colour, font, layout) to its intended effect on the audience.",
    "Squint at the text so the words blur. What's biggest? What's brightest? Start there."),
  'Digital & News Media': (
    "News and digital texts are Paper 1 favourites — this builds the habits of reading them critically.",
    "You can identify the framing: what's emphasised, what's downplayed, and who benefits.",
    "Find the headline or first line. Ask: what reaction is this engineered to produce?"),
  'Visual Media & Cinema': (
    "Moving-image literacy transfers straight to any visual text Paper 1 gives you.",
    "You can describe one camera/framing choice and its effect on the viewer.",
    "Pause on one frame. Treat it as a photograph: what's in it, what's excluded, who has power?"),
  'Genre Specifics': (
    "Genre conventions are a cheat-code: once you know the formula, deviations become instant analysis.",
    "You can state the genre's formula and one way your example follows or breaks it.",
    "Ask: if I had to make one of these, what three things would I have to include? Check them off."),
  'Genre Analysis': (
    "Genre conventions are a cheat-code: once you know the formula, deviations become instant analysis.",
    "You can state the genre's formula and one way your example follows or breaks it.",
    "Ask: if I had to make one of these, what three things would I have to include? Check them off."),
  'Technical Analysis': (
    "Precise technique-spotting with effects is what moves Criterion B from 'describes' to 'analyses'.",
    "You can name the technique, quote the exact words, and state the effect in one sentence.",
    "Find the one word or image you'd never use in ordinary speech. That's usually the technique."),
  'Thesis & Structure': (
    "A clear thesis and plan is the highest-leverage 5 minutes in any exam response.",
    "Your thesis names the creator's message AND the main methods — not just the topic.",
    "Use the frame: [Creator] uses [technique] and [technique] to [effect/message]. Fill the brackets."),
  'Language & Register': (
    "Analytical vocabulary upgrades every sentence you write or say, in all three assessments.",
    "You used a new analytical verb naturally in a sentence about a real text.",
    "Steal three verbs from the activity, write one sentence each about any text you know well."),
  'Integrated Skills': (
    "Paper 2 marks all four criteria at once — this trains you to hit them in one connected response.",
    "Your paragraph shows knowledge, analysis, structure, and precise language in sequence.",
    "Write the criterion letters A–D in the margin first, then write one sentence aimed at each."),
  'Comparative Analysis': (
    "Comparison is a skill of its own — seeing two texts through one lens instead of describing them in turn.",
    "Your sentence holds BOTH texts: 'While X does…, Y does…' — one idea, two texts.",
    "Pick one word that applies to both texts (power, silence, home). Compare only through that word."),
  'Prose & Literary Texts': (
    "Close reading of prose builds the interpretive muscles behind Paper 2 and the IO.",
    "You can link one sentence-level choice to a whole-text meaning.",
    "Find the sentence that could NOT be deleted. Why does the text need it?"),
  'Poetry & Verse Analysis': (
    "Poem-reading trains compression: every choice counts — the mindset that lifts IO and Paper 2 analysis.",
    "You can explain one sound or line-break choice as meaningful, not decorative.",
    "Read it aloud once. Circle where your voice naturally slowed. Analyse that spot."),
  'Oral & Performative Texts': (
    "Speech and interview texts appear in Paper 1 — and analysing them sharpens your own IO delivery.",
    "You can identify one rhetorical move and explain what it does to the live audience.",
    "Ask: where does the speaker want applause? What did they do in the sentence before it?"),
  'Individual Oral Preparation': (
    "Direct IO preparation — building the 10-minute argument that links a literary and a non-literary text to a global issue.",
    "You can say your global issue in one sentence and name the extract moments that prove it.",
    "Start from the global issue, not the texts: finish the sentence 'Both my texts show that…'"),
  'Executive Function & Pragmatics': (
    "Study skills are the multiplier on everything else — how you start, focus, and finish.",
    "You tried the strategy once, for real, and know whether it works for you.",
    "Shrink the task until it's laughably small. Do the small version now."),
  'Evidence & Support': (
    "Evidence-handling turns opinions into arguments — the backbone of every criterion A and B mark.",
    "Every claim you made sits next to a quoted word or described detail.",
    "For each claim, ask 'says who?' — then paste in the exact words that answer it."),
}
GUIDE_P2 = (
    "Deepens your command of The World's Wife and A Doll's House — the knowledge bank Paper 2 draws on.",
    "You can make this point in an essay with a named moment or quotation attached.",
    "Anchor yourself in one scene or poem you know best. Build the answer outward from there.")
GUIDE_ARTIST = {
  'William Blake': (
    "Builds your Blake knowledge for the IO — his paired poems are a goldmine for global issues of power, innocence, and institutional control.",
    "You can connect this poem's technique to your global issue in one spoken sentence.",
    "Say the poem's title and finish aloud: 'This poem is really about…' Don't overthink — your gut reading is a fine starting point."),
  'Thi Bui': (
    "Builds your knowledge of The Best We Could Do for the IO — how Bui's panels, gutters, and washes carry memory, displacement, and family.",
    "You can describe one panel precisely and say what it shows about your global issue.",
    "Open any chapter. Find one panel with no words. Ask: what is the image saying that words couldn't?"),
  'Banksy': (
    "Builds your Banksy knowledge for the IO — how stencil, placement, and irony turn walls into arguments.",
    "You can explain one work's visual irony and connect it to your global issue.",
    "Describe the work to an imaginary friend in one sentence. The word you emphasise is your analysis lead."),
  'Barbara Kruger': (
    "Builds your Kruger knowledge for the IO — direct address, found images, and consumer critique in three colours.",
    "You can explain what the pronouns (you/I/we) are doing in one work.",
    "Read the slogan aloud. Who is 'you'? Who is 'we'? Answering that is half the analysis."),
  'Ugur Gallenkuş': (
    "Builds your Gallenkuş knowledge for the IO — split-frame juxtapositions that make global inequality impossible to unsee.",
    "You can explain how the two halves of one composite speak to each other.",
    "Cover one half of the image. React to the visible half. Then reveal — the jolt you feel IS the technique."),
}

def guidance(row, assessment, works):
    skill = str(row['Skill']).strip()
    if skill in ARTIST_SKILLS:
        return GUIDE_ARTIST[ARTIST_SKILLS[skill]]
    cat = str(row['Category'])
    if cat.startswith(P2_CATS_PREFIX):
        return GUIDE_P2
    if cat in GUIDE:
        return GUIDE[cat]
    if 'Individual Oral' in assessment:
        return GUIDE['Individual Oral Preparation']
    return (
        "Targeted practice for a specific IB skill — small, repeatable, and cumulative.",
        "You produced something concrete you could show a teacher or reuse in revision.",
        "Do the smallest version of the task first: one sentence, one example, one minute.")

# ── main ───────────────────────────────────────────────────────────────
def enrich():
    df = pd.read_excel(SRC, sheet_name='Activities')
    df['Time (min)'] = pd.to_numeric(df['Time (min)'], errors='coerce').fillna(5).astype(int)

    repaired = 0
    rows = []
    for _, row in df.iterrows():
        desc, was_fixed = repair_desc(row['Activity Description'])
        repaired += was_fixed
        assessment = derive_assessment(row)
        works = derive_works(row)
        session = derive_session(row)
        why, success, stuck = guidance(row, assessment, works)
        title = re.sub(r'\s*\(\d+ min\)\s*$', '', str(row['Activity Title']).strip())
        title = re.sub(r'^\[[^\]]+\]\s*', '', title)
        rows.append({
            'Assessment': assessment,
            'Category': row['Category'],
            'Skill Focus': clean_skill(row),
            'Activity Type': row['Activity Type'],
            'Activity Title': title,
            'Activity Description': desc,
            'Time (min)': int(row['Time (min)']),
            'IB Criterion': row['IB Criterion'],
            'Style Preference': canon_styles(row['Learning Styles']),
            'Text Type(s)': row['Text Type(s)'],
            'Text / Work Focus': works,
            'Difficulty': row['Difficulty'],
            'Location': location_for(row),
            'Format': row['Format'],
            'Session Use': session,
            'Exam Proximity': derive_proximity(row, session),
            'Materials': derive_materials(row),
            'Energy Level': derive_energy(row, session),
            'Support Level': derive_support(row),
            'Helps With': derive_helps(row, session),
            'Why It Helps': why,
            'Success Criteria': success,
            'If You Are Stuck': stuck,
        })
    out = pd.DataFrame(rows)
    print(f'Enriched {len(out)} rows; repaired {repaired} clipped descriptions')
    return out

if __name__ == '__main__':
    out = enrich()
    out.to_json('enriched.json', orient='records')
    print('\nAssessment spread:')
    print(out['Assessment'].value_counts())
    print('\nSession spread:', dict(out['Session Use'].value_counts()))
    print('Support spread:', dict(out['Support Level'].value_counts()))
    print('Energy spread:', dict(out['Energy Level'].value_counts()))
    print('Works spread:', dict(out['Text / Work Focus'].value_counts().head(12)))
    print('Style sample:', out['Style Preference'].head(3).tolist())
