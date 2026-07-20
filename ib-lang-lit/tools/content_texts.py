#!/usr/bin/env python3
"""Text-anchored new activities: Blake, The World's Wife, A Doll's House,
The Best We Could Do, Banksy, Kruger, Gallenkuş."""

def A(**kw):
    base = {
        'Assessment': 'General', 'Category': '', 'Skill Focus': '', 'Activity Type': 'Skill Drill',
        'Activity Title': '', 'Activity Description': '', 'Time (min)': 5, 'IB Criterion': 'A',
        'Style Preference': 'Reading, Writing, Solitary', 'Text Type(s)': 'Any',
        'Text / Work Focus': '', 'Difficulty': 'Developing', 'Location': 'At Home',
        'Format': 'Individual', 'Session Use': 'Core Activity', 'Exam Proximity': 'Any Time',
        'Materials': 'Pen & Paper', 'Energy Level': 'Medium — normal study energy',
        'Support Level': 'Some Scaffolding — guided but open', 'Helps With': 'Analysis Depth',
        'Why It Helps': '', 'Success Criteria': '', 'If You Are Stuck': '',
    }
    base.update(kw)
    return base

# ═══════════════════════════════════════════════════════════════════════
#  WILLIAM BLAKE — Songs of Innocence and of Experience
# ═══════════════════════════════════════════════════════════════════════
BLAKE = [
  dict(name='The Tyger', coll='Experience', focus='the unanswerable questions about creation and evil',
       tech='relentless interrogative structure and trochaic drumbeat rhythm',
       quote='Did he who made the Lamb make thee?', gi='how societies explain the existence of violence and evil',
       pair='The Lamb', img='the surprisingly tame, almost smiling tiger Blake actually engraved'),
  dict(name='The Lamb', coll='Innocence', focus='innocent faith answering its own gentle question',
       tech='childlike catechism structure — question, answer, blessing',
       quote='Little Lamb, who made thee?', gi='how belief systems are taught to children',
       pair='The Tyger', img='the child and lamb beneath sheltering trees by a cottage'),
  dict(name='London', coll='Experience', focus='a city where every face carries marks of institutional control',
       tech='the repetition of "charter\'d" and "every" tightening like a vice',
       quote='the mind-forg\'d manacles I hear', gi='urban poverty and who owns public space',
       pair=None, img='a child leading a bent old man through darkened streets'),
  dict(name='The Chimney Sweeper (Innocence)', coll='Innocence', focus='a child narrating his own exploitation without recognising it',
       tech='dramatic irony — the sweep\'s cheerful voice against the horror of his situation',
       quote="if all do their duty, they need not fear harm", gi='child labour and the rhetoric used to justify it',
       pair='The Chimney Sweeper (Experience)', img='Tom Dacre\'s dream of sweeps freed from black coffins'),
  dict(name='The Chimney Sweeper (Experience)', coll='Experience', focus='a child who sees exactly who profits from his misery',
       tech='the accusing triad of "God & his Priest & King"',
       quote='They clothed me in the clothes of death', gi='institutions that benefit from the suffering they cause',
       pair='The Chimney Sweeper (Innocence)', img='a small black figure alone in falling snow'),
  dict(name='The Sick Rose', coll='Experience', focus='corruption arriving hidden inside something that looks like love',
       tech='a single extended metaphor left deliberately unexplained in eight lines',
       quote='his dark secret love / Does thy life destroy', gi='hidden harm in intimate relationships',
       pair=None, img='the worm coiled inside the rose\'s crimson centre'),
  dict(name='A Poison Tree', coll='Experience', focus='anger cultivated in secret until it kills',
       tech='the extended allegory of the tree — wrath watered, sunned, and fruited',
       quote='I water\'d it in fears', gi='suppressed emotion and cycles of revenge',
       pair=None, img='the foe outstretched beneath the tree at dawn'),
  dict(name='The Garden of Love', coll='Experience', focus='organised religion built on top of natural joy',
       tech='the shift from open green to "Thou shalt not" writ over the door',
       quote='binding with briars my joys & desires', gi='institutional control of private life and desire',
       pair=None, img='priests in black gowns walking their rounds'),
  dict(name='Holy Thursday (Innocence)', coll='Innocence', focus='charity as public spectacle',
       tech='radiant crowd imagery that may be sincere or savagely ironic',
       quote='Then cherish pity, lest you drive an angel from your door', gi='performative charity and who it really serves',
       pair='Holy Thursday (Experience)', img='thousands of charity children marching two by two into St Paul\'s'),
  dict(name='Holy Thursday (Experience)', coll='Experience', focus='a rich nation that reduces its children to misery',
       tech='four furious rhetorical questions in a deliberately cold, bare metre',
       quote='Babes reduc\'d to misery, / Fed with cold and usurous hand', gi='structural poverty amid national wealth',
       pair='Holy Thursday (Innocence)', img='a mother with a dead child in a barren landscape'),
  dict(name='The Ecchoing Green', coll='Innocence', focus='a community\'s day cycling from play to rest',
       tech='the closing modulation from "Ecchoing Green" to "darkening Green"',
       quote='And sport no more seen / On the darkening Green', gi='community, ageing, and shared public space',
       pair=None, img='elders watching children\'s games beneath the oak'),
  dict(name='Infant Joy', coll='Innocence', focus='a newborn naming itself into existence through joy',
       tech='a dialogue between infant and adult compressed into twelve tiny lines',
       quote='I happy am, / Joy is my name', gi='identity and how naming shapes who we become',
       pair='Infant Sorrow', img='the baby cradled inside an open blossom'),
  dict(name='Infant Sorrow', coll='Experience', focus='birth experienced as a leap into a hostile world',
       tech='violent participles — struggling, striving — collapsing into sulky surrender',
       quote='Into the dangerous world I leapt', gi='the family as the child\'s first experience of power',
       pair='Infant Joy', img='the infant twisting away from its mother on the bed'),
  dict(name='The Clod and the Pebble', coll='Experience', focus='two complete, opposite philosophies of love',
       tech='mirrored stanzas that quote each other\'s syntax to reverse the meaning',
       quote='Love seeketh not itself to please… Love seeketh only Self to please', gi='selfless versus possessive models of love',
       pair=None, img='cattle trampling the clod while the pebble sits untouched in the brook'),
  dict(name='The Divine Image', coll='Innocence', focus='human form as the true location of the divine',
       tech='the abstract quartet Mercy, Pity, Peace, and Love given human body parts',
       quote='For Mercy has a human heart', gi='shared humanity across religious difference',
       pair=None, img='a flame-like vine of figures being raised and comforted'),
  dict(name='Nurse\'s Song (Innocence)', coll='Innocence', focus='an adult who lets children negotiate for more play',
       tech='call-and-response dialogue where the children\'s voices win',
       quote='Well, well, go & play till the light fades away', gi='trust between generations',
       pair=None, img='the ring of children dancing as the nurse watches'),
]

def blake_rows():
    rows = []
    for p in BLAKE:
        n, base = p['name'], dict(
            Category='Individual Oral: Blake', Skill='', works='William Blake',
        )
        why = ("Deepens your knowledge of '%s' for the IO — poem-level detail is what turns a general "
               "global issue into a convincing 10-minute argument." % n)
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Poem Knowledge & Interpretation'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{n}: Sound Under the Meaning',
            'Activity Description': (
              f"Read '{n}' aloud twice. This poem runs on {p['tech']}. Tap the rhythm on the desk on the second read. "
              f"Then write two sentences: where does the sound pattern hold steady, and where does it break or strain? "
              f"What does that break make you feel about {p['focus']}?"),
            'Time (min)': 6, 'IB Criterion': 'B',
            'Style Preference': 'Auditory, Verbal, Kinesthetic, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Session Use': 'Warm-Up', 'Materials': 'Printed Text or Screen, Pen & Paper',
            'Energy Level': 'Low — fine when tired',
            'Helps With': 'Analysis Depth, Speaking Confidence',
            'Why It Helps': why,
            'Success Criteria': "You can point to one line where sound and meaning pull in the same direction — and say it aloud.",
            'If You Are Stuck': "Read just the first stanza aloud in a whisper, then loudly. Which felt wrong? Why?"}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Poem Knowledge & Interpretation'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: One Image, One Argument',
            'Activity Description': (
              f"Take the central image of '{n}' — think of {p['img']}. Write the image at the centre of a page. "
              f"Around it, branch out: literal details → connotations → what it suggests about {p['focus']}. "
              f"Finish with one sentence beginning 'Through this image, Blake argues that…'"),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Spatial, Analytical, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': why,
            'Success Criteria': "Your final sentence names an argument, not a topic — something a listener could disagree with.",
            'If You Are Stuck': "Describe the image to yourself as if to a young child. The word they'd ask about first is your way in."}))
        if p['pair']:
            rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
                **{'Skill Focus': 'Innocence–Experience Pairing'},
                **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Mirror Reading with {p["pair"]}',
                'Activity Description': (
                  f"Set '{n}' beside '{p['pair']}'. Draw a two-column table: same subject, two visions. "
                  f"Fill three rows — speaker's voice, one shared image, ending. Then answer: is the {p['coll']} version "
                  f"correcting the other poem, or grieving it? One paragraph."),
                'Time (min)': 15, 'IB Criterion': 'A, B',
                'Style Preference': 'Reading, Writing, Logical, Analytical, Solitary',
                'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
                'Helps With': 'Comparative Linking, Analysis Depth',
                'Why It Helps': "Blake's paired poems are built for comparison — exactly the linking skill the IO (and Paper 2) reward.",
                'Success Criteria': "Your paragraph holds both poems in the same sentences instead of describing them one after the other.",
                'If You Are Stuck': "Find one word or image that appears in BOTH poems. Compare only what surrounds it."}))
        else:
            rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
                **{'Skill Focus': 'Innocence–Experience Pairing'},
                **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: The Missing Mirror',
                'Activity Description': (
                  f"'{n}' has no official partner poem. Invent the title and first two lines its "
                  f"{'Experience' if p['coll']=='Innocence' else 'Innocence'} mirror would have — the same subject seen through the opposite lens. "
                  f"Then write two sentences: what would have to change about {p['focus']}, and what does the absence of a real mirror suggest?"),
                'Time (min)': 12, 'IB Criterion': 'A, B',
                'Style Preference': 'Writing, Fresh: Linguistic, Analytical, Solitary'.replace('Fresh: ',''),
                'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
                'Helps With': 'Fresh Ideas & Interpretation, Analysis Depth',
                'Why It Helps': "Writing the counter-poem forces you to name exactly what makes Blake's vision in this poem distinctive.",
                'Success Criteria': "Your invented opening clearly reverses the original's stance, not just its subject.",
                'If You Are Stuck': "Steal the original's first line and change only two words. Notice which words HAD to change."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Global Issue Connection'},
            **{'Activity Type': 'Oral Dialogue', 'Activity Title': f'{n}: 60-Second Global Issue Pitch',
            'Activity Description': (
              f"Set a timer for 60 seconds and pitch aloud: how does '{n}' illuminate {p['gi']}? "
              f"You must quote or closely paraphrase once — '{p['quote']}' is a strong candidate — and end with "
              f"'…and that is why this issue still matters.' Record it; listen once; note one improvement."),
            'Time (min)': 5, 'IB Criterion': 'A, C',
            'Style Preference': 'Verbal, Auditory, Intrapersonal, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Session Use': 'IO Preparation', 'Materials': 'Timer, Recording Device',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Speaking Confidence, Getting Started',
            'Why It Helps': "The IO is spoken, not written — this builds the specific muscle of arguing from a poem out loud under time.",
            'Success Criteria': "You filled the full 60 seconds, used the quotation, and landed the closing line without reading.",
            'If You Are Stuck': "Do a 20-second version first: issue, quote, one sentence of why. Then stretch it."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Text & Image (Illuminated Plates)'},
            **{'Activity Type': 'Visual Analysis', 'Activity Title': f'{n}: Plate versus Poem',
            'Activity Description': (
              f"Blake engraved his poems as illuminated plates. Look up the plate for '{n}' — notice {p['img']}. "
              f"Write three sentences: what the image adds that the words never say, what it quietly contradicts, "
              f"and why that gap matters for {p['focus']}. This doubles as multimodal analysis practice."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Spatial, Analytical, Solitary',
            'Text Type(s)': 'Poems, Artwork', 'Text / Work Focus': 'William Blake',
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': "Blake's plates make him secretly multimodal — analysing text with image trains the same skill you need for visual texts everywhere.",
            'Success Criteria': "You found one genuine tension between what the plate shows and what the poem says.",
            'If You Are Stuck': "List three things IN the picture that are never mentioned in the poem. Pick the strangest."}))
        rows.append(A(Assessment='Individual Oral, Paper 1', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 1 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Unseen Eyes',
            'Activity Description': (
              f"Pretend '{n}' just appeared in an exam and you've never met it. Give yourself 5 minutes to produce a Paper-1-style "
              f"plan: guiding question ('How does the text use {p['tech'].split(' and ')[0]} to shape meaning?'), three technique points, "
              f"one line of context-free evidence each. Notice how much faster planning is on a text you know — that speed is the goal for real unseens."),
            'Time (min)': 8, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Logical, Analytical, Writing, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Session Use': 'Exam Practice', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Structure & Planning, Time Management',
            'Why It Helps': "Cross-trains IO knowledge into Paper 1 method: same analytical engine, different exam. One session, two assessments.",
            'Success Criteria': "A complete 3-point plan existed when the timer rang.",
            'If You Are Stuck': "Skip the guiding question. List any three techniques first; the question will emerge from what they share."}))
        rows.append(A(Assessment='Individual Oral, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 2 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Duffy Crossover',
            'Activity Description': (
              f"Find the poem in The World's Wife whose speaker would have the strongest opinion about '{n}' — about {p['focus']}. "
              f"Write a short paragraph comparing how each poet handles voice: who speaks, who is spoken FOR, and one technique each. "
              f"You are practising Paper 2 comparison while revising your IO text."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Reading, Writing, Analytical, Logical, Solitary',
            'Text Type(s)': "Poems, The World's Wife", 'Text / Work Focus': "William Blake, The World's Wife",
            'Helps With': 'Comparative Linking, Fresh Ideas & Interpretation',
            'Why It Helps': "Links your IO literary text to your Paper 2 poetry collection — double-duty revision through one comparison.",
            'Success Criteria': "You justified the pairing with a real shared concern, not just 'both are poems'.",
            'If You Are Stuck': "Default pairing: 'London' ↔ 'Mrs Sisyphus' (endless imposed labour), or your poem ↔ 'Little Red-Cap' (innocence meeting power)."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Blake',
            **{'Skill Focus': 'Syntax & Repetition'},
            **{'Activity Type': 'Technique Drill', 'Activity Title': f'{n}: The Repetition Ledger',
            'Activity Description': (
              f"Make a quick ledger for '{n}': every repeated word, phrase, or structure down the left; tally marks in the middle; "
              f"on the right, what changes (if anything) at each return. Repetition in Blake is never neutral — decide whether each repeat "
              f"comforts, traps, or accuses, given that the poem is about {p['focus']}."),
            'Time (min)': 8, 'IB Criterion': 'B',
            'Style Preference': 'Logical, Reading, Writing, Analytical, Solitary',
            'Text Type(s)': 'Poems', 'Text / Work Focus': 'William Blake',
            'Session Use': 'Warm-Up',
            'Helps With': 'Analysis Depth, Quotations & Evidence',
            'Why It Helps': why,
            'Success Criteria': "Your ledger has at least three entries and each has a verdict: comforts, traps, or accuses.",
            'If You Are Stuck': "Start with 'and'. Blake uses it like a hammer. Count them in one stanza."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  THE WORLD'S WIFE — Carol Ann Duffy (Paper 2)
# ═══════════════════════════════════════════════════════════════════════
TWW = [
  dict(name='Little Red-Cap', myth='Little Red Riding Hood', focus='a young woman narrating her own entry into — and exit from — an older poet\'s world',
       tech='the volta from seduction to the axe', moment='the final image of walking out of the forest alone, flowers in hand',
       theme='innocence, experience, and creative independence', adh='Nora walking out of the house at the end of Act Three'),
  dict(name='Thetis', myth='the shape-shifting sea nymph', focus='a woman who changes form to escape a grip that keeps adapting',
       tech='stanza-by-stanza metamorphosis mirrored in shifting line shapes', moment='the ending where motherhood, not escape, transforms her',
       theme='control, adaptation, and self under pressure', adh='Nora\'s costume changes and performances for Torvald'),
  dict(name='Queen Kong', myth='King Kong', focus='a giant female desire the world reads as monstrous',
       tech='tender domestic detail scaled monstrous', moment='wearing the dead beloved around her neck',
       theme='desire, power reversal, and grief', adh='Torvald treating Nora as a kept, miniature creature'),
  dict(name='Mrs Midas', myth='King Midas', focus='a wife watching greed turn every intimacy untouchable',
       tech='domestic imagery hardening into gold, object by object', moment='the pear turning to gold in his hand in the garden',
       theme='greed, isolation, and the cost of a wish', adh='Torvald\'s love of appearances over persons'),
  dict(name='from Mrs Tiresias', myth='Tiresias changing sex', focus='a spouse observing gender from both sides of the divide',
       tech='deadpan comic registers hiding serious questions', moment='the husband returning as a woman and being believed about nothing',
       theme='gender experience and whose account is trusted', adh='the different rules Nora and Torvald live under'),
  dict(name='Pilate\'s Wife', myth='the trial of Jesus', focus='a woman whose warning dream is ignored by administrative power',
       tech='cool eyewitness narration against sacred history', moment='her dream and the washed hands',
       theme='complicity, conscience, and being unheard', adh='Mrs Linde deciding whether to intervene over the letter'),
  dict(name='Mrs Aesop', myth='Aesop the fabulist', focus='a wife bored to fury by a man who speaks only in morals',
       tech='clichés and proverbs weaponised back at their owner', moment='her final cutting punchline about his fable-telling',
       theme='voice, tedium, and verbal revenge', adh='Nora\'s hidden mockery of Torvald\'s lectures'),
  dict(name='Mrs Darwin', myth='Charles Darwin', focus='a wife claiming the century\'s biggest idea in four lines',
       tech='the diary-entry form and a single devastating punchline', moment='7 April 1852 — the chimpanzee remark',
       theme='erased female authorship', adh='whose work keeps the Helmer household actually running'),
  dict(name='Mrs Sisyphus', myth='Sisyphus and the boulder', focus='a wife watching endless pointless labour eat a marriage',
       tech='clattering rhyme on "-irk" words driving comic despair', moment='her alone at night while he rolls the stone',
       theme='work, futility, and neglect', adh='Nora\'s secret copying work done at night to repay the loan'),
  dict(name='Mrs Faust', myth='the Faustian bargain', focus='a marriage of acquisition where the soul was never there to sell',
       tech='accelerating asyndetic lists of luxury purchases', moment='the final revelation about the missing soul',
       theme='materialism and hollow success', adh='the Helmers\' fragile bought respectability'),
  dict(name='Delilah', myth='Samson and Delilah', focus='a woman asked to make a strong man teachable and soft',
       tech='tenderness narrating what tradition calls betrayal', moment='the haircut retold as an act of care',
       theme='strength, vulnerability, and reframing blame', adh='Nora "helping" Torvald in ways he must never know about'),
  dict(name='Anne Hathaway', myth='Shakespeare\'s widow', focus='a widow keeping love alive in the form of language itself',
       tech='a love sonnet built from the "second best bed"', moment='the bed remembered as a world of romance and words',
       theme='love, memory, and what objects mean', adh='the Christmas tree and props as emotional barometers'),
  dict(name='Queen Herod', myth='the Massacre of the Innocents', focus='a mother re-writing atrocity as maternal protection',
       tech='noir menace in a nativity setting', moment='her order given to protect her daughter from a future heartbreaker',
       theme='protection, power, and violence justified by love', adh='what parents in ADH claim to do "for" their children'),
  dict(name='Medusa', myth='Medusa the Gorgon', focus='jealousy literally petrifying the world around a betrayed woman',
       tech='escalating tercets as living things turn to stone', moment='the final plea-threat: "Look at me now"',
       theme='jealousy, transformation, and the male gaze', adh='Nora\'s fear of being seen truly by Torvald'),
  dict(name='The Devil\'s Wife', myth='the Moors murders (Myra Hindley)', focus='a woman narrating her own descent and public monstering',
       tech='five-part sequence collapsing from ballad to fragment', moment='the prison years and the question of who made whom',
       theme='evil, complicity, and public judgement', adh='Krogstad as the play\'s publicly condemned figure seeking rehabilitation'),
  dict(name='Circe', myth='Circe and Odysseus\' crew', focus='a sorceress instructing nymphs in the cooking of pigs — and men',
       tech='a recipe register carrying total contempt', moment='the remembered girl who once scanned the sea for a ship',
       theme='disillusionment and reclaimed power', adh='Mrs Linde\'s pragmatism about men after a mercenary marriage'),
  dict(name='Mrs Lazarus', myth='the raising of Lazarus', focus='a widow who completed grief only to have it reversed',
       tech='grief sequence in violent physical verbs, then the horror of return', moment='the returned husband smelling "of the grave"',
       theme='grief, moving on, and who miracles are for', adh='Torvald\'s instant "resurrection" of the marriage once the threat passes'),
  dict(name='Pygmalion\'s Bride', myth='Pygmalion\'s statue', focus='a woman playing stone to escape being handled',
       tech='cold hard imagery thawing into strategic performance', moment='her faked warmth that finally drives him away',
       theme='objectification and performance as defence', adh='Nora\'s tarantella danced to distract and delay'),
  dict(name='Mrs Rip Van Winkle', myth='Rip Van Winkle\'s sleep', focus='a wife flourishing during a husband\'s long absence',
       tech='hobbies list blooming while he sleeps; deflating final rhyme', moment='his waking with the little blue pills',
       theme='female flourishing outside marriage', adh='what Nora might become after the door closes'),
  dict(name='Mrs Icarus', myth='Icarus flying too close to the sun', focus='a wife watching male hubris from the shore',
       tech='one five-line sentence of magnificent deflation', moment='the "total, utter, absolute, Grade A pillock" verdict',
       theme='hubris deflated by the domestic witness', adh='Torvald\'s grand self-image versus his actual courage'),
  dict(name='Frau Freud', myth='Sigmund Freud\'s theories', focus='a wife burying penis-envy under an avalanche of synonyms',
       tech='a single-sentence sonnet that is mostly a comic list', moment='the pivot to "not envy" at the close',
       theme='reclaiming the discourse about women\'s minds', adh='Dr Rank\'s clinical frankness inside polite society'),
  dict(name='Salome', myth='Salome and John the Baptist', focus='a morning-after voice discovering a head on the pillow',
       tech='breezy hangover register colliding with horror', moment='the casual decision to "clean up her act" — again',
       theme='desire, violence, and consequence-free power', adh='actions in ADH whose consequences fall on someone else'),
  dict(name='Eurydice', myth='Orpheus and Eurydice', focus='a dead woman desperate NOT to be rescued by her poet',
       tech='direct address to "girls" puncturing the male masterpiece', moment='the trick — asking to hear the poem one more time',
       theme='authorship, muses, and refusing rescue', adh='Nora refusing Torvald\'s final offer to "save" her'),
  dict(name='The Kray Sisters', myth='the Kray twins (London gangsters)', focus='gangland London re-run as sisterhood protection racket',
       tech='cockney rhyming slang building a female mythology', moment='their rule: no lady raises a hand for a man',
       theme='solidarity, protection, and myth-making', adh='the women of ADH quietly protecting one another'),
  dict(name='Penelope', myth='Penelope weaving and unweaving', focus='a waiting wife who discovers her own art matters more than his return',
       tech='embroidery imagery absorbing the entire epic', moment='licking the scarlet thread as footsteps finally near',
       theme='patience transformed into self-sufficiency', adh='Nora\'s secret work becoming her secret pride'),
  dict(name='Mrs Beast', myth='Beauty and the Beast', focus='a woman choosing a beast to guarantee the upper hand',
       tech='hard-nosed poker-table register over fairy-tale material', moment='the poker game with the tragic wives invoked',
       theme='power in relationships, on whose terms', adh='the marriage bargain the Helmers actually made'),
  dict(name='Demeter', myth='Demeter and Persephone', focus='a mother\'s frozen world thawed by a returning daughter',
       tech='the collection\'s only fully tender close — spring arriving barefoot', moment='the daughter bringing "all spring\'s flowers"',
       theme='maternal love and renewal', adh='the play\'s children and what Nora leaves them for'),
]

def tww_rows():
    rows = []
    for p in TWW:
        n = p['name']
        why = (f"Poem-level mastery of '{n}' — Paper 2 essays live or die on this kind of specific knowledge (Criterion A).")
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Voice & Persona'},
            **{'Activity Type': 'Technique Drill', 'Activity Title': f'{n}: Voice Autopsy',
            'Activity Description': (
              f"Re-read '{n}'. The persona is {p['focus']}. Track the voice across the poem: label each stanza with one word for its tone. "
              f"Where exactly does the tone turn? Quote the turning line from your copy and write two sentences on what triggers the shift."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Reading, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Helps With': 'Analysis Depth, Quotations & Evidence',
            'Why It Helps': why,
            'Success Criteria': "You located the exact line where the voice changes — not just 'near the end'.",
            'If You Are Stuck': "Read only the first line and the last line. Name the difference; then hunt for where it happened."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Myth vs Retelling'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: What Duffy Changed',
            'Activity Description': (
              f"'{n}' rewrites {p['myth']}. In two columns, list what the source story emphasises versus what Duffy's version emphasises. "
              f"Circle the single most significant change. Write three sentences: what the change is, why it matters for {p['theme']}, "
              f"and what it reveals about the collection's whole project."),
            'Time (min)': 12, 'IB Criterion': 'A',
            'Style Preference': 'Logical, Reading, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': why,
            'Success Criteria': "Your 'most significant change' is defended, not just asserted.",
            'If You Are Stuck': "Ask: in the original, who gets to speak? In Duffy's version, who speaks? Start there."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Technique in Context'},
            **{'Activity Type': 'Technique Drill', 'Activity Title': f'{n}: Signature Technique Zoom',
            'Activity Description': (
              f"The engine of '{n}' is {p['tech']}. Find the two or three places in your copy where this technique is strongest. "
              f"For each: quote the words, name the effect on the reader, and connect it to {p['theme']}. "
              f"Write it as three tight analytical sentences you could drop into an essay."),
            'Time (min)': 10, 'IB Criterion': 'B',
            'Style Preference': 'Analytical, Reading, Writing, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Helps With': 'Analysis Depth, Quotations & Evidence',
            'Why It Helps': "Ready-made Criterion B material: technique + quotation + effect, pre-drafted before exam day.",
            'Success Criteria': "Three sentences exist that you could reuse verbatim in a timed essay.",
            'If You Are Stuck': "Find the line that makes you smile or wince. The technique is usually hiding in it."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Key Moment Knowledge'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{n}: Moment Zoom',
            'Activity Description': (
              f"From memory first: describe {p['moment']} in '{n}' — then check your copy and correct yourself. "
              f"Write one sentence on why THIS moment (not another) is where the poem's meaning concentrates, "
              f"and one on how you would use it to answer a question about {p['theme']}."),
            'Time (min)': 7, 'IB Criterion': 'A',
            'Style Preference': 'Reading, Writing, Intrapersonal, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Session Use': 'Warm-Up', 'Exam Proximity': 'Final Week, Night Before',
            'Helps With': 'Memory & Recall, Quotations & Evidence',
            'Energy Level': 'Low — fine when tired',
            'Why It Helps': "Testing recall BEFORE checking is the fastest way to find and fix knowledge gaps pre-exam.",
            'Success Criteria': "Your from-memory version needed at most small corrections.",
            'If You Are Stuck': "Open the book, read the moment once, close the book, and describe it aloud. That counts."}))
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Comparative Reading',
            **{'Skill Focus': 'TWW–ADH Pairing'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: The Ibsen Echo',
            'Activity Description': (
              f"Pair '{n}' with a precise moment in A Doll's House: {p['adh']}. Write a comparative paragraph with one grounds of "
              f"comparison ({p['theme']}), one technique from each text, and a 'While… whereas…' sentence holding both. "
              f"This pairing is exam ammunition — file it in your comparison bank."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Logical, Writing, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "Paper 2 is comparison under pressure — pre-built pairings like this are the single best preparation.",
            'Success Criteria': "Your paragraph could answer a real question on gender, power, or voice with both texts present throughout.",
            'If You Are Stuck': "Write the 'While…' sentence first, even badly. The paragraph grows around it."}))
        rows.append(A(Assessment='Paper 1, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'P2 → Paper 1 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Monologue as Media Text',
            'Activity Description': (
              f"Duffy's '{n}' is a dramatic monologue — a voice engineered for effect, like an opinion column or a first-person ad. "
              f"Find any first-person non-literary text (column, confessional Instagram caption, charity appeal letter). "
              f"Compare the voice-building toolkit: pronouns, register, direct address, self-revelation. Two sentences on each text; "
              f"one on what 'constructed voice' means for BOTH Paper 1 and Paper 2."),
            'Time (min)': 12, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Reading, Writing, Solitary',
            'Text Type(s)': "The World's Wife, Opinion Column, Social Media Post", 'Text / Work Focus': "The World's Wife",
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "One skill, two papers: recognising a constructed first-person voice scores in Paper 1 unseen texts AND Paper 2 poetry.",
            'Success Criteria': "You can name two voice-building techniques the poem and the media text share.",
            'If You Are Stuck': "Count the 'I's in each text first. What is each 'I' trying to make you feel?"}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: The World's Wife",
            **{'Skill Focus': 'Openings & Titles'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{n}: First Line Forensics',
            'Activity Description': (
              f"Copy out the first line of '{n}'. Interrogate it: what does it establish about speaker, tone, and situation before line two exists? "
              f"What promise does it make that the ending keeps or breaks? Then the title: why '{n}' and not the husband's name alone? "
              f"Four sentences total."),
            'Time (min)': 8, 'IB Criterion': 'A, B',
            'Style Preference': 'Reading, Writing, Analytical, Solitary',
            'Text Type(s)': "The World's Wife", 'Text / Work Focus': "The World's Wife",
            'Session Use': 'Warm-Up',
            'Helps With': 'Analysis Depth, Getting Started',
            'Why It Helps': "Openings and titles are high-yield: examiners reward candidates who analyse how poems begin, not just what happens.",
            'Success Criteria': "You stated one thing the first line PROMISES — and tracked whether the poem keeps it.",
            'If You Are Stuck': "Rewrite the first line in the dullest possible words. What died? That's what to analyse."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  A DOLL'S HOUSE — Henrik Ibsen (Paper 2)
# ═══════════════════════════════════════════════════════════════════════
ADH = [
  dict(name='The Macaroons', kind='symbol', focus='Nora\'s small forbidden pleasures and the lies that protect them',
       detail='she eats them secretly, denies them to Torvald, and offers them publicly at her most defiant moments',
       theme='deception as survival inside a controlling marriage'),
  dict(name='The Tarantella', kind='symbol', focus='a dance of poison and performance',
       detail='Nora rehearses wildly to distract Torvald from the letterbox — dancing "as if her life depended on it", which it does',
       theme='performance, panic, and the body saying what words cannot'),
  dict(name='The Letterbox', kind='symbol', focus='the locked container of truth only Torvald has a key to',
       detail='Krogstad\'s letter sits visible but unreachable, converting the hallway into a time bomb',
       theme='control of information as control of a household'),
  dict(name='The Christmas Tree', kind='symbol', focus='festive display tracking Nora\'s inner state',
       detail='fresh and decorated in Act One; stripped and dishevelled with burnt-down candles by Act Two',
       theme='appearances decaying as truth approaches'),
  dict(name='Pet Names ("little skylark", "squirrel")', kind='language', focus='endearments that miniaturise',
       detail='Torvald\'s animal diminutives make affection and belittlement the same gesture',
       theme='language constructing an infantilised wife'),
  dict(name='The Doll\'s House Metaphor', kind='symbol', focus='the title\'s accusation against the whole household',
       detail='Nora names it in Act Three: she was papa\'s doll-child, then Torvald\'s doll-wife, and the children her dolls in turn',
       theme='inherited patterns of ownership disguised as love'),
  dict(name='The Final Door Slam', kind='stagecraft', focus='the most famous sound effect in theatre history',
       detail='the play ends not on a line but on the sound of the front door closing from below',
       theme='exit as the only available speech act'),
  dict(name='Money & the Loan', kind='motif', focus='the forged signature that funded a rescue',
       detail='Nora borrowed to save Torvald\'s life and repays in secret instalments earned by copying work at night',
       theme='the economics hidden under romantic ideals'),
  dict(name='Nora Helmer', kind='character', focus='a performer discovering the performance',
       detail='she shifts register with every scene partner — chirping for Torvald, confiding in Mrs Linde, bargaining with Krogstad',
       theme='identity assembled, then chosen'),
  dict(name='Torvald Helmer', kind='character', focus='respectability embodied and terrified',
       detail='his fantasies of rescuing Nora collapse in minutes when rescue would cost his reputation',
       theme='the gap between proclaimed and actual courage'),
  dict(name='Nils Krogstad', kind='character', focus='the villain the play refuses to keep villainous',
       detail='a desperate father seeking rehabilitation, mirroring Nora\'s own crime of forgery for love',
       theme='society\'s power to condemn and redeem'),
  dict(name='Mrs Linde', kind='character', focus='the road Nora didn\'t take — work, widowhood, clear eyes',
       detail='she married for money out of duty, lost everything, and chooses Krogstad freely at the end',
       theme='pragmatic female survival versus romantic illusion'),
  dict(name='Dr Rank', kind='character', focus='mortality and honesty inside the cheerful house',
       detail='dying of an inherited illness, he speaks the only undisguised truths — and marks his exit with a black cross',
       theme='inheritance, decay, and truth-telling at the margin'),
  dict(name='The Miracle ("det vidunderlige")', kind='motif', focus='the rescue Nora expects and the one she gets',
       detail='she waits for Torvald to sacrifice himself for her; the "miracle" she leaves hoping for is a real marriage',
       theme='romantic ideology meeting reality'),
  dict(name='Stage Directions & Props', kind='stagecraft', focus='Ibsen\'s silent second script',
       detail='doors, lamps, the stove, costume changes — objects blocking and revealing characters\' moves',
       theme='meaning staged, not stated'),
  dict(name='Act One → Three: Nora\'s Arc', kind='structure', focus='the three-act tightening of a trap',
       detail='establishment, escalation, explosion: each act ends with the walls closer in',
       theme='dramatic structure as an argument about inevitability'),
  dict(name='The Fancy-Dress Costume', kind='symbol', focus='the Neapolitan fisher-girl outfit Torvald chose',
       detail='Nora dances in a costume selected by her husband, then changes into everyday clothes for the final conversation',
       theme='costume as imposed identity — and its removal'),
  dict(name='Dramatic Irony of the Letters', kind='structure', focus='the audience always knows more than Torvald',
       detail='two letters — the threat and the returned bond — reverse the household twice in one act',
       theme='knowledge gaps as the engine of tension'),
]

def adh_rows():
    rows = []
    for e in ADH:
        n = e['name']
        why = f"Precise command of {n} gives your Paper 2 essays the named, quotable detail Criterion A rewards."
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Symbol & Motif Tracking' if e['kind'] in ('symbol','motif') else ('Character Study' if e['kind']=='character' else 'Stagecraft & Structure')},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Three Appearances',
            'Activity Description': (
              f"Track {n} across the play — {e['detail']}. Note its first appearance, its most charged appearance, and its last. "
              f"For each: one line on what it shows at that point. Then one sentence on the trajectory: what story does this element tell "
              f"about {e['theme']} all by itself?"),
            'Time (min)': 12, 'IB Criterion': 'A, B',
            'Style Preference': 'Logical, Reading, Writing, Analytical, Solitary',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Helps With': 'Quotations & Evidence, Analysis Depth',
            'Why It Helps': why,
            'Success Criteria': "You can narrate the element's full arc without opening the book.",
            'If You Are Stuck': "Just find its FIRST appearance and ask: why introduce it here and not later?"}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Analytical Writing'},
            **{'Activity Type': 'Writing Practice', 'Activity Title': f'{n}: One-Paragraph Cash-In',
            'Activity Description': (
              f"Write a single exam-grade paragraph arguing that {n} is central to {e['theme']}. Structure: claim → context in one clause → "
              f"two precise moments ({e['detail'].split(';')[0]}…) → technique named → so-what sentence linking to Ibsen's larger critique. "
              f"Time limit: 10 minutes, handwritten if possible."),
            'Time (min)': 10, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Writing, Analytical, Logical, Solitary',
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Session Use': 'Writing Task', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Structure & Planning, Time Management',
            'Why It Helps': "Pre-drafted paragraphs on the play's key elements become instant building blocks in the real exam.",
            'Success Criteria': "The paragraph contains two named moments and one named technique — check by underlining them.",
            'If You Are Stuck': "Write the so-what sentence LAST but the claim FIRST. Fill the middle with the two moments."}))
        rows.append(A(Assessment='Paper 2', Category='Paper 2 Comparative Reading',
            **{'Skill Focus': 'ADH–TWW Pairing'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Find the Duffy Twin',
            'Activity Description': (
              f"Which World's Wife poem speaks most directly to {n} and {e['theme']}? Choose, justify in two sentences, then build a "
              f"mini comparison table: shared concern / Ibsen's method / Duffy's method / one quotation each. "
              f"Keep the table — five of these and you have a full revision bank."),
            'Time (min)': 15, 'IB Criterion': 'A, B',
            'Style Preference': 'Analytical, Logical, Writing, Solitary',
            'Text Type(s)': "The World's Wife, A Doll's House", 'Text / Work Focus': "The World's Wife, A Doll's House",
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "Builds your pairing repertoire in the direction exams actually demand: element-level, not text-level, comparison.",
            'Success Criteria': "Your justification names a SHARED concern, not a coincidence.",
            'If You Are Stuck': "Safe bets: pet names ↔ 'Queen Kong' (miniaturised lovers); the letterbox ↔ 'Pilate's Wife' (withheld truth); the door slam ↔ 'Little Red-Cap' (walking out)."}))
        rows.append(A(Assessment='Paper 1, Paper 2', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'P2 → Paper 1 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Restage It Today',
            'Activity Description': (
              f"Imagine {n} translated into a modern non-literary text: an Instagram story, a news photo, an advert, a public-service poster. "
              f"Sketch or describe the modern version in three sentences, keeping {e['theme']} intact. Then name which visual/verbal techniques "
              f"your version would need — you are reverse-engineering the toolkit Paper 1 texts use."),
            'Time (min)': 10, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Spatial, Fresh Ideas: Analytical, Solitary'.replace('Fresh Ideas: ',''),
            'Text Type(s)': "A Doll's House, Advertisement, Social Media Post", 'Text / Work Focus': "A Doll's House",
            'Helps With': 'Fresh Ideas & Interpretation, Analysis Depth',
            'Why It Helps': "Translating drama into media texts trains both directions: literary insight for Paper 2, text-type awareness for Paper 1.",
            'Success Criteria': "Your modern version preserves the power dynamic, and you named at least two techniques it would use.",
            'If You Are Stuck': "Default: the letterbox becomes a phone with one unread message. Build from there."}))
        rows.append(A(Assessment='Paper 2', Category="Paper 2: A Doll's House",
            **{'Skill Focus': 'Quotation Bank'},
            **{'Activity Type': 'Skill Drill', 'Activity Title': f'{n}: Two-Line Armoury',
            'Activity Description': (
              f"Find the two shortest quotations in your copy that prove the significance of {n}. Shorter is better — under eight words each. "
              f"Write each on a flashcard: quotation on front; on the back, act number, speaker, and the analytical point it unlocks about {e['theme']}. "
              f"Test yourself tomorrow."),
            'Time (min)': 8, 'IB Criterion': 'A',
            'Style Preference': 'Reading, Writing, Memory: Logical, Solitary'.replace('Memory: ',''),
            'Text Type(s)': "A Doll's House", 'Text / Work Focus': "A Doll's House",
            'Session Use': 'Warm-Up', 'Materials': 'Flashcards, Pen & Paper',
            'Exam Proximity': 'Final Week, Night Before',
            'Helps With': 'Memory & Recall, Quotations & Evidence',
            'Energy Level': 'Low — fine when tired',
            'Why It Helps': "Short quotations are the ones you'll actually remember under pressure — and Criterion A rewards precise support.",
            'Success Criteria': "Both quotations are under eight words and you know who says them, when.",
            'If You Are Stuck': "Pet names count. 'Little skylark' is already a quotation — bank it."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  THE BEST WE COULD DO — Thi Bui (Individual Oral, literary)
# ═══════════════════════════════════════════════════════════════════════
BUI = [
  dict(name='The Opening Birth Scene', focus='Thi\'s labour intercut with her mother waiting outside',
       detail='the memoir begins with becoming a parent — the event that reframes all her questions about her own parents',
       gi='how becoming a parent changes our judgement of our parents'),
  dict(name='The Orange-Wash Palette', focus='the single rust/orange ink wash over brush lines',
       detail='one colour carries heat, blood, nostalgia, and war equally — mood is tonal, not chromatic',
       gi='how aesthetic choices shape the memory of conflict'),
  dict(name='Panel Gutters & Silence', focus='what happens between the panels',
       detail='Bui often lets the white space carry trauma the family cannot say aloud',
       gi='intergenerational silence around displacement'),
  dict(name='Water Imagery', focus='the sea as womb, grave, and passage',
       detail='amniotic fluid, the boat escape, bathtubs, and rain rhyme visually across chapters',
       gi='the refugee crossing as both loss and birth'),
  dict(name='Bố\'s Childhood Chapters', focus='the father\'s terror-filled boyhood in wartime Vietnam',
       detail='trapdoors, hiding, an absent father — explaining (not excusing) the man he became',
       gi='how war trauma is transmitted to the next generation'),
  dict(name='Má\'s Story', focus='the mother\'s ambitions folded into marriage and exile',
       detail='school prizes, French colonial schooling, six pregnancies, a professional life never lived',
       gi='women\'s sacrificed ambitions inside family survival'),
  dict(name='The Boat Escape', focus='the night crossing that splits the family\'s history in two',
       detail='claustrophobic panels, the baby drugged to stay silent, the open sea framed like both coffin and cradle',
       gi='the physical reality behind the word "refugee"'),
  dict(name='Redrawn Family Photographs', focus='photos rendered as drawings inside the memoir',
       detail='by re-drawing rather than reprinting photographs, Bui claims interpretation over documentation',
       gi='who owns and retells a family\'s history'),
  dict(name='Maps & Borders', focus='Vietnam\'s changing map as a character in the story',
       detail='colonial partitions and regime changes redrawn in Bui\'s hand, entangling geopolitics with family moves',
       gi='how political borders redraw private lives'),
  dict(name='The Title\'s Verdict', focus='"the best we could do" as judgement and absolution at once',
       detail='the phrase surfaces around parenting choices made under impossible constraints',
       gi='judging past generations by present standards'),
  dict(name='The "Refugee Reflex"', focus='inherited fear shaping present-day behaviour',
       detail='Bui names the reflex of always being ready to lose everything — packed bags of the mind',
       gi='the long afterlife of displacement in safe countries'),
  dict(name='Chapter Transitions', focus='how the memoir time-travels',
       detail='a present-day image graphically "matches" a past one — a hand, a doorway, water — and the page falls through time',
       gi='memory as association rather than chronology'),
  dict(name='Empty & Wordless Panels', focus='the moments Bui refuses to caption',
       detail='full-page bleeds of sea or sky where narration stops entirely',
       gi='the limits of language for extreme experience'),
  dict(name='The Ending: Watching Her Son Swim', focus='the final image of the son free in water',
       detail='the water that nearly killed the family becomes the element of the child\'s freedom',
       gi='what healing across generations can look like'),
]

def bui_rows():
    rows = []
    for e in BUI:
        n = e['name']
        why = f"Panel-level knowledge of {n} turns a vague IO point about refugees or family into precise, quotable visual analysis."
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Thi Bui',
            **{'Skill Focus': 'Graphic Memoir Analysis'},
            **{'Activity Type': 'Visual Analysis', 'Activity Title': f'{n}: Panel Autopsy',
            'Activity Description': (
              f"Open The Best We Could Do to {n.lower() if n[0]=='T' else n} — {e['detail']}. Choose the single strongest panel. "
              f"Autopsy it: framing (close/wide?), line weight, use of the orange wash, text placement, gutter before and after. "
              f"Write three sentences linking these choices to {e['gi']}."),
            'Time (min)': 10, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Spatial, Analytical, Solitary',
            'Text Type(s)': 'Graphic Novel', 'Text / Work Focus': 'Thi Bui',
            'Helps With': 'Analysis Depth, Quotations & Evidence',
            'Why It Helps': why,
            'Success Criteria': "You named at least three concrete visual choices — not just what the panel shows, but how.",
            'If You Are Stuck': "Ask of the panel: why THIS distance from the subject? Closer = intimacy or claustrophobia; further = loneliness or safety."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Thi Bui',
            **{'Skill Focus': 'Global Issue Connection'},
            **{'Activity Type': 'Oral Dialogue', 'Activity Title': f'{n}: Speak the Issue',
            'Activity Description': (
              f"Set a 90-second timer. Speaking aloud, connect {n} to the global issue of {e['gi']}. Structure: name the issue → describe one panel "
              f"precisely → analyse two visual choices → zoom out to why it matters beyond the book. Record and listen once: "
              f"did you describe more than you analysed? Adjust and re-record."),
            'Time (min)': 8, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Verbal, Auditory, Intrapersonal, Solitary',
            'Text Type(s)': 'Graphic Novel', 'Text / Work Focus': 'Thi Bui',
            'Session Use': 'IO Preparation', 'Materials': 'Timer, Recording Device',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Speaking Confidence, Analysis Depth',
            'Why It Helps': "Rehearses the exact IO move — panel to issue and back — under gentle time pressure.",
            'Success Criteria': "Your second recording spends more seconds on 'how' and 'why' than on 'what happens'.",
            'If You Are Stuck': "Script only your first sentence. Everything after can be rough — this is a rep, not a performance."}))
        rows.append(A(Assessment='Individual Oral, Paper 1', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 1 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Graphic Novel as Unseen',
            'Activity Description': (
              f"Graphic novel extracts appear in Paper 1. Treat the pages around {n} as an unseen: 5 minutes, no notes — write a guiding "
              f"question about how image and text interact, then a 3-point plan (layout, line/colour, words-vs-images). "
              f"You already know the content ({e['detail']}), so all your energy goes into method — that's the point."),
            'Time (min)': 10, 'IB Criterion': 'A, B, C',
            'Style Preference': 'Visual, Logical, Writing, Solitary',
            'Text Type(s)': 'Graphic Novel', 'Text / Work Focus': 'Thi Bui',
            'Session Use': 'Exam Practice', 'Materials': 'Timer, Pen & Paper',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Structure & Planning, Time Management',
            'Why It Helps': "Your IO text doubles as Paper 1 training data: graphic-novel analysis is a listed Paper 1 text type.",
            'Success Criteria': "A 3-point plan in 5 minutes, each point naming a visual-verbal technique.",
            'If You Are Stuck': "Point 1 is always available: what the gutter (the gap between panels) makes the reader do."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Thi Bui',
            **{'Skill Focus': 'Text & Image Tension'},
            **{'Activity Type': 'Technique Drill', 'Activity Title': f'{n}: Words vs Pictures Ledger',
            'Activity Description': (
              f"For one spread involving {n}, make a two-column ledger: LEFT — what the caption/narration says; RIGHT — what the images show. "
              f"Hunt for the row where they disagree, understate, or overshoot each other. That tension is where graphic memoirs make meaning. "
              f"One sentence: what does the gap say about {e['gi']}?"),
            'Time (min)': 8, 'IB Criterion': 'B',
            'Style Preference': 'Visual, Logical, Reading, Solitary',
            'Text Type(s)': 'Graphic Novel', 'Text / Work Focus': 'Thi Bui',
            'Session Use': 'Warm-Up',
            'Helps With': 'Analysis Depth, Fresh Ideas & Interpretation',
            'Why It Helps': why,
            'Success Criteria': "You found one real word-image gap — not a spread where they simply agree.",
            'If You Are Stuck': "Look for a calm caption over a violent image, or a violent caption over a calm image. Bui does both."}))
        rows.append(A(Assessment='Individual Oral', Category='Individual Oral: Thi Bui',
            **{'Skill Focus': 'Pairing with Non-Literary BOW'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Choose Its Gallery Partner',
            'Activity Description': (
              f"If you had to hang one Banksy, Kruger, or Gallenkuş work next to {n} in an exhibition about {e['gi']}, which would it be? "
              f"Decide in 60 seconds, then defend for five: two sentences on the shared issue, two on the DIFFERENT toolkits "
              f"(memoir brushwork vs stencil/typography/photo-composite), one on what the pairing reveals that neither shows alone."),
            'Time (min)': 8, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Analytical, Logical, Solitary',
            'Text Type(s)': 'Graphic Novel, Artwork', 'Text / Work Focus': 'Thi Bui, Banksy, Barbara Kruger, Ugur Gallenkuş',
            'Session Use': 'IO Preparation',
            'Helps With': 'Comparative Linking, Fresh Ideas & Interpretation',
            'Why It Helps': "The IO's heart is a literary/non-literary pairing on one issue — this drills exactly that selection-and-defence move.",
            'Success Criteria': "Your defence names one thing ONLY the pairing reveals.",
            'If You Are Stuck': "Water panels pair naturally with Gallenkuş's sea-crossing composites; silence panels with Kruger's shouting text — try the contrast."}))
    return rows

# ═══════════════════════════════════════════════════════════════════════
#  BANKSY / KRUGER / GALLENKUŞ — non-literary bodies of work (IO)
# ═══════════════════════════════════════════════════════════════════════
BANKSY = [
  dict(name='Girl with Balloon', detail='a stencilled girl reaching for a heart-shaped balloon, captioned "There is always hope" at its Southbank site',
       gi='hope and loss in public space', hook='whether the balloon is leaving her or being released'),
  dict(name='Love is in the Air (Flower Thrower)', detail='a masked rioter mid-throw, the Molotov swapped for a bouquet, on a West Bank wall',
       gi='protest, violence, and the possibility of peace', hook='the pose of violence holding an object of peace'),
  dict(name='One Nation Under CCTV', detail='a giant painted slogan beside a real surveillance camera, with a painted child painter and watching officer',
       gi='surveillance and state power', hook='graffiti about being watched, placed where it was being watched'),
  dict(name='Kissing Coppers', detail='two uniformed British policemen kissing, stencilled on a Brighton pub wall',
       gi='authority, masculinity, and LGBTQ visibility', hook='the uniform of authority performing tenderness'),
  dict(name='Mobile Lovers', detail='a couple embracing while each stares at a phone screen glowing behind the other\'s back',
       gi='technology\'s colonisation of intimacy', hook='an embrace and an absence in the same gesture'),
  dict(name='Season\'s Greetings', detail='a child tasting snow that, around the corner, is revealed as ash from a burning skip — painted in Port Talbot',
       gi='industrial pollution and childhood', hook='the corner of the building hiding the truth from the child but not from us'),
  dict(name='Devolved Parliament', detail='a four-metre oil painting of the House of Commons populated entirely by chimpanzees',
       gi='trust in political institutions', hook='the painstaking traditional oil technique applied to ridicule'),
  dict(name='Slave Labour', detail='a child at a sewing machine stitching Union Jack bunting, painted before the Jubilee',
       gi='child labour hidden inside national celebration', hook='who manufactures patriotism'),
  dict(name='The Walled Off Hotel', detail='a functioning hotel in Bethlehem whose rooms face the separation wall — "the worst view in the world"',
       gi='occupation, tourism, and bearing witness', hook='hospitality built to make guests uncomfortable'),
  dict(name='Sweeping It Under the Carpet', detail='a maid lifting a section of brick wall like a curtain to sweep dust beneath it',
       gi='what societies choose not to see', hook='the wall itself becoming a carpet'),
  dict(name='Girl Frisking Soldier', detail='a pigtailed girl in pink patting down an armed soldier who stands spread against a wall',
       gi='militarism seen through a child\'s frame', hook='the reversal of who searches whom'),
]
KRUGER = [
  dict(name='Untitled (I shop therefore I am)', detail='Descartes rewritten in Futura Bold Oblique, white on red, over a hand holding the card-like slogan',
       gi='consumerism as identity', hook='philosophy\'s proof of existence replaced by a purchase'),
  dict(name='Untitled (Your body is a battleground)', detail='a woman\'s face split positive/negative, made for the 1989 Washington march',
       gi='control over women\'s bodies', hook='the pronoun "your" conscripting every viewer'),
  dict(name='Untitled (We don\'t need another hero)', detail='a girl admiring a boy\'s flexed bicep, the slogan cutting across the Norman Rockwell-style image',
       gi='gender roles taught in childhood', hook='the found image saying one thing, the text refusing it'),
  dict(name='Untitled (You are not yourself)', detail='a woman\'s face in shattered mirror fragments under the fractured text',
       gi='identity under media pressure', hook='the broken mirror doing literally what the text says'),
  dict(name='Belief+Doubt (installation)', detail='an entire lobby wrapped floor-to-ceiling in text: BELIEF+DOUBT=SANITY, WHOSE VALUES?, FOREVER',
       gi='ideology in public space', hook='standing INSIDE the argument instead of in front of it'),
  dict(name='Untitled (Money can buy you love)', detail='the corrected Beatles line over found romantic imagery',
       gi='romance as transaction', hook='one changed word collapsing a cultural ideal'),
  dict(name='Untitled (Thinking of You. I Mean Me. I Mean You.)', detail='the retrospective title-work whose pronouns keep correcting themselves',
       gi='self, other, and address in the attention economy', hook='a sentence that cannot decide who it is about'),
  dict(name='The Signature Style Itself', detail='found black-and-white photographs + red bars + white Futura Bold Oblique — a portable, instantly readable machine',
       gi='mass media\'s visual grammar turned against itself', hook='advertising\'s own toolkit hijacked for critique'),
]
GALLENKUS = [
  dict(name='The Classroom Split', detail='half a bright classroom of raised hands stitched to half a bombed-out schoolroom',
       gi='unequal access to education', hook='the identical posture of children across the divide'),
  dict(name='The Playground / Rubble Pair', detail='a child on a swing completed by a child swinging on scavenged rebar',
       gi='childhood under privilege and under war', hook='play persisting in both halves'),
  dict(name='The Beach / Crossing Pair', detail='holiday shallows on one side, an overloaded dinghy on the other, sharing one sea',
       gi='the sea as playground and graveyard', hook='the same water meaning leisure and death'),
  dict(name='The Mother\'s Arms Pair', detail='a cradled newborn joined to a child carried from wreckage in the same embrace geometry',
       gi='care under radically unequal conditions', hook='identical arms, opposite worlds'),
  dict(name='The Mealtime Pair', detail='a laden birthday table meeting a shared pot in a famine zone, the composition split at the plate',
       gi='food inequality', hook='the table line running unbroken across both worlds'),
  dict(name='The Toys / Weapons Pair', detail='a child\'s toy gun mirrored by a child soldier\'s real one',
       gi='childhood militarised', hook='the same grip taught by different worlds'),
  dict(name='The Bedtime Pair', detail='a duvet-wrapped sleeper completed by a child asleep on cardboard',
       gi='shelter as lottery', hook='sleep — the one thing both children do identically'),
  dict(name='The Hospital Pair', detail='a monitored neonatal ward fused with an improvised clinic',
       gi='healthcare inequality at birth', hook='machines on one side, hands on the other'),
]

def _artist_rows(works, artist, texttype, toolkit):
    rows = []
    for w in works:
        n = w['name']
        why = f"Work-level knowledge of {artist} — being able to name and analyse specific pieces like {n} is what lifts an IO from general to convincing."
        rows.append(A(Assessment='Individual Oral', Category=f'Individual Oral: {artist}',
            **{'Skill Focus': 'Work Knowledge & Interpretation'},
            **{'Activity Type': 'Visual Analysis', 'Activity Title': f'{n}: Sixty-Second Inventory',
            'Activity Description': (
              f"Look at {n} — {w['detail']}. In 60 seconds, list every deliberate choice you can see: subject, placement, scale, colour, "
              f"text (if any), what's excluded. Then circle the choice that carries the most meaning for {w['gi']} and write two sentences on it."),
            'Time (min)': 6, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Logical, Solitary',
            'Text Type(s)': texttype, 'Text / Work Focus': artist,
            'Session Use': 'Warm-Up', 'Materials': 'Device, Pen & Paper',
            'Energy Level': 'Low — fine when tired',
            'Helps With': 'Analysis Depth, Getting Started',
            'Why It Helps': why,
            'Success Criteria': "Your list has at least six choices, and your circled one connects clearly to the issue.",
            'If You Are Stuck': f"Start with the hook: {w['hook']}. Everything radiates from there."}))
        rows.append(A(Assessment='Individual Oral', Category=f'Individual Oral: {artist}',
            **{'Skill Focus': 'Global Issue Connection'},
            **{'Activity Type': 'Oral Dialogue', 'Activity Title': f'{n}: Two-Minute IO Slice',
            'Activity Description': (
              f"Deliver a two-minute mini-IO segment on {n} and {w['gi']}, aloud, standing up. Structure: issue in one sentence → the work "
              f"described in two → three analysed choices ({toolkit}) → one sentence on wider relevance. Record it. Listening back, "
              f"count your filler words — that number is your target to halve next time."),
            'Time (min)': 10, 'IB Criterion': 'A, B, C, D',
            'Style Preference': 'Verbal, Auditory, Kinesthetic, Intrapersonal',
            'Text Type(s)': texttype, 'Text / Work Focus': artist,
            'Session Use': 'IO Preparation', 'Materials': 'Timer, Recording Device',
            'Exam Proximity': 'Weeks Away, Final Week',
            'Helps With': 'Speaking Confidence, Time Management',
            'Why It Helps': "Simulates a real IO segment at real scale — two minutes is roughly what one work gets in your ten.",
            'Success Criteria': "You hit all four structural beats inside two minutes without reading from notes.",
            'If You Are Stuck': "Do it once badly on purpose. The second take is always easier — you've already heard yourself survive it."}))
        rows.append(A(Assessment='Individual Oral, Paper 1', Category='Cross-Assessment Bridge',
            **{'Skill Focus': 'IO → Paper 1 Transfer'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: Find Its Paper 1 Cousin',
            'Activity Description': (
              f"{n} works through {w['hook']}. Find a real non-literary text — an ad, a charity appeal, a news photo, a poster — that uses "
              f"the same core technique. Put them side by side and write four sentences: technique in the artwork, technique in the found text, "
              f"one difference in purpose, one sentence on how you'd analyse the found text in Paper 1."),
            'Time (min)': 12, 'IB Criterion': 'A, B',
            'Style Preference': 'Visual, Analytical, Logical, Solitary',
            'Text Type(s)': f'{texttype}, Advertisement, Photograph', 'Text / Work Focus': artist,
            'Materials': 'Device, Pen & Paper',
            'Helps With': 'Comparative Linking, Analysis Depth',
            'Why It Helps': "Your IO artist becomes a Paper 1 training set: the same visual grammar appears in exam texts constantly.",
            'Success Criteria': "The shared technique is named precisely (not 'both are powerful').",
            'If You Are Stuck': "Charity appeals borrow these tricks shamelessly. Search one from a major NGO and compare."}))
        rows.append(A(Assessment='Individual Oral', Category=f'Individual Oral: {artist}',
            **{'Skill Focus': 'Pairing with Literary Work'},
            **{'Activity Type': 'Analytical Activity', 'Activity Title': f'{n}: The Literary Handshake',
            'Activity Description': (
              f"Pair {n} with the strongest moment from your literary IO texts — a Blake poem or a Thi Bui chapter — for the issue of {w['gi']}. "
              f"Write the pairing as an IO thesis sentence: 'Both [literary text] and {artist}'s {n} expose…, but where one uses…, the other uses…'. "
              f"Then list the two extract moments you'd bring."),
            'Time (min)': 10, 'IB Criterion': 'A, C',
            'Style Preference': 'Analytical, Writing, Logical, Solitary',
            'Text Type(s)': f'{texttype}, Poems, Graphic Novel', 'Text / Work Focus': f'{artist}, William Blake, Thi Bui',
            'Session Use': 'IO Preparation',
            'Helps With': 'Comparative Linking, Structure & Planning',
            'Why It Helps': "The IO is exactly this handshake — one literary, one non-literary, one issue. Every rehearsal of it compounds.",
            'Success Criteria': "Your thesis sentence contains both texts, the issue, AND a difference in method.",
            'If You Are Stuck': "Template: 'Both X and Y expose [issue], but where X uses [technique], Y uses [technique].' Fill five blanks."}))
        rows.append(A(Assessment='Individual Oral', Category=f'Individual Oral: {artist}',
            **{'Skill Focus': 'Context & Placement'},
            **{'Activity Type': 'Contextual Activity', 'Activity Title': f'{n}: Move It and See',
            'Activity Description': (
              f"Thought experiment: relocate {n} — {w['detail'].split(',')[0]} — into three new contexts: a gallery wall, "
              f"an Instagram feed, a school corridor. For each, one sentence: what survives, what dies, what changes meaning? "
              f"Conclude: how much of this work's power IS its context? That question impresses in the IO's discussion section."),
            'Time (min)': 8, 'IB Criterion': 'A, B',
            'Style Preference': 'Spatial, Visual, Fresh Ideas: Analytical, Intrapersonal'.replace('Fresh Ideas: ',''),
            'Text Type(s)': texttype, 'Text / Work Focus': artist,
            'Helps With': 'Fresh Ideas & Interpretation, Analysis Depth',
            'Why It Helps': "Context questions are favourite IO follow-ups — this preloads a thoughtful answer.",
            'Success Criteria': "You reached a verdict: context is essential / helpful / almost irrelevant for this work — with a reason.",
            'If You Are Stuck': "Start with the silliest move (the school corridor). The absurdity shows you what the work needs."}))
    return rows

def artist_rows():
    rows = []
    rows += _artist_rows(BANKSY, 'Banksy', 'Artwork, Image', 'stencil economy, placement, irony')
    rows += _artist_rows(KRUGER, 'Barbara Kruger', 'Artwork, Image', 'typography, pronouns, found image')
    rows += _artist_rows(GALLENKUS, 'Ugur Gallenkuş', 'Photograph, Image', 'split composition, matching geometry, colour contrast')
    return rows

def all_rows():
    return blake_rows() + tww_rows() + adh_rows() + bui_rows() + artist_rows()

if __name__ == '__main__':
    rows = all_rows()
    print(f'{len(rows)} text-anchored activities')
    from collections import Counter
    print(Counter(r['Category'] for r in rows))
