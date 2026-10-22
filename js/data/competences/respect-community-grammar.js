/**
 * Respect & Community (Unit 2) — Grammar: reported (indirect) speech.
 *
 * Built from the LE / G-Kurs / E-Kurs source (07_Grammar_*). A journalist
 * visited the class; the learner reports what she said, asked and told
 * them to do. The page-top guide holds the backshift table; the tasks are
 * gap-fills that isolate the one change (the verb, if/whether, to/not to)
 * so they can self-check.
 *
 * Step 1 LE (statements) · Step 2 G-Kurs (statements + questions) · Step 3
 * E-Kurs (+ commands, reporting verbs) · Step 4 challenge: report an
 * interview.
 */

const STATEMENTS = [
  { hint: '“I write for the Evening Post.”', segments: ["She said that she ", { answer: "wrote", size: 8 }, " for the Evening Post."] },
  { hint: '“I started as a photographer.”', segments: ["She explained that she ", { answer: "had started", accept: ["started"], size: 12 }, " as a photographer."] },
  { hint: '“My first article was about a school.”', segments: ["She told us that her first article ", { answer: "had been", accept: ["was"], size: 10 }, " about a school."] },
  { hint: '“I can show you how to check a source.”', segments: ["She added that she ", { answer: "could", size: 8 }, " show us how to check a source."] },
  { hint: '“I will come back in June.”', segments: ["She promised that she ", { answer: "would", size: 8 }, " come back in June."] },
  { hint: '“I don’t read the comments under my articles.”', segments: ["She admitted that she ", { answer: "didn't", accept: ["did not", "didnt"], size: 9 }, " read the comments under her articles."] },
  { hint: '“I have interviewed three mayors.”', segments: ["She mentioned that she ", { answer: "had interviewed", size: 16 }, " three mayors."] },
  { hint: '“You must always ask twice.”', segments: ["She said that we ", { answer: "had to", size: 9 }, " always ask twice."] },
];

const QUESTIONS = [
  { hint: '“Where do you work?”', segments: ["They asked her where she ", { answer: "worked", size: 9 }, "."] },
  { hint: '“Do you like your job?”', segments: ["They asked her ", { answer: "if", accept: ["whether"], size: 8 }, " she liked her job."] },
  { hint: '“How many articles do you write in a week?”', segments: ["They wanted to know how many articles she ", { answer: "wrote", size: 8 }, " in a week."] },
  { hint: '“Have you ever been afraid?”', segments: ["They asked her ", { answer: "if", accept: ["whether"], size: 8 }, " she had ever been afraid."] },
  { hint: '“Can we visit your office?”', segments: ["They asked her if they ", { answer: "could", size: 8 }, " visit her office."] },
  { hint: '“Will you print our names?”', segments: ["They wanted to know if she ", { answer: "would", size: 8 }, " print their names."] },
];

const COMMANDS = [
  { hint: '“Please send me your questions by Friday.”', segments: ["She asked us ", { answer: "to send", size: 10 }, " her our questions by Friday."] },
  { hint: '“Don’t record me without asking.”', segments: ["She told us ", { answer: "not to", size: 9 }, " record her without asking."] },
  { hint: '“Check every name twice.”', segments: ["She told us ", { answer: "to check", size: 10 }, " every name twice."] },
  { hint: '“Don’t believe the first thing you read.”', segments: ["She advised us ", { answer: "not to", size: 9 }, " believe the first thing we read."] },
];

const PROBLEM = {
  situation: "You wrote the class report about the journalist's visit. Your teacher gives it back: “Everything is right, but you used said seventeen times.”",
  ideas: [
    "replace every second said with a different verb from the list.",
    "choose the verb that says what she was doing — explaining, promising, admitting.",
    "leave it — said is not a mistake and the report is correct.",
  ],
};

export default {
  title: "Reported Speech",

  guide: {
    label: "Reported speech — your toolkit",
    subtitle: "Somebody said something; you tell it to a third person — three things change every time.",
    numbered: false,
    types: [
      {
        name: "Statements",
        tag: "He said (that) …",
        accent: "olive",
        formula: "verb one step back · I → he / she · my → his / her · drop the speech marks",
        de: "Aussagen",
        example: "I am late. → He said that he was late.",
      },
      {
        name: "Questions",
        tag: "He asked …",
        accent: "slate",
        formula: "yes/no → if or whether · normal word order (subject, then verb) · no question mark",
        de: "Fragen",
        example: "Are you new? → She asked me if I was new.",
      },
      {
        name: "Commands & requests",
        tag: "She told us …",
        accent: "ochre",
        formula: "command / request → to + verb · Don’t … → not to + verb · the person comes first",
        de: "Aufforderungen",
        example: "Don’t shout. → She told us not to shout.",
      },
      {
        name: "Time & place words",
        tag: "also shift",
        accent: "coral",
        formula: "today → that day · tomorrow → the next day · yesterday → the day before · here → there",
        de: "Zeit- und Ortsangaben",
        example: "I’ll call tomorrow. → He said he would call the next day.",
      },
    ],
    tensesLabel: "One step back — the backshift (know it by heart)",
    tenses: [
      { tense: "am / is / are", use: "→ was / were", example: "“I am late.” → he was late", accent: "olive", signals: "" },
      { tense: "simple present (write)", use: "→ simple past (wrote)", example: "“I write.” → she wrote", accent: "olive", signals: "" },
      { tense: "simple past (started)", use: "→ past perfect (had started)", example: "“I started.” → she had started", accent: "ochre", signals: "" },
      { tense: "present perfect (have seen)", use: "→ past perfect (had seen)", example: "“I have seen it.” → he had seen it", accent: "coral", signals: "" },
      { tense: "will", use: "→ would", example: "“I will come.” → she would come", accent: "slate", signals: "" },
      { tense: "can", use: "→ could", example: "“I can help.” → he could help", accent: "slate", signals: "" },
      { tense: "must", use: "→ had to", example: "“You must ask.” → we had to ask", accent: "ochre", signals: "" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Aussagen berichten — ein Schritt zurück",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Grammatik · LE",
          title: "The journalist's visit",
          paragraphs: [
            [
              "A journalist visited your class. When you ",
              { w: "report", de: "berichten" },
              " what she said, the verb goes one step back: ",
              { w: "direct speech", de: "die direkte Rede" },
              " becomes ",
              { w: "indirect speech", de: "die indirekte Rede" },
              ". Look at the backshift table at the top of this page.",
            ],
          ],
          help: "Tipp: is/are → was/were · present → past · will → would · can → could · must → had to.",
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Ein Schritt zurück",
          title: "Report what she said",
          introDe: "Setz das Verb eine Zeitstufe zurück. Schreib das fehlende Verb, dann Check.",
          intro: "Put the verb one step back. Type the missing verb, then Check.",
          items: STATEMENTS.slice(0, 6),
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Report one thing yourself",
          introDe: "Denk an einen Satz, den eine Lehrkraft diese Woche zu deiner Klasse gesagt hat. Gib ihn in einem Satz wieder.",
          intro: "Think of one thing a teacher said to your class this week. Report it in one sentence.",
          starters: ["My teacher said that …"],
          help: "Denk an den Rückschritt: „I am …“ → „… that he/she was …“.",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "What did your friend say?",
          introDe: "Gib eine Sache wieder, die dir heute ein Freund oder eine Freundin gesagt hat. Schreib einen Satz.",
          intro: "Report one thing a friend told you today. Write one sentence.",
          starters: ["My friend said that …"],
          help: "Denk an den Rückschritt: is → was · can → could",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Aussagen und Fragen berichten",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "gap-fill",
          kind: "Interaktiv · Aussagen",
          title: "Report what she said",
          intro: "Put the verb one step back. Type the missing verb, then Check.",
          items: STATEMENTS,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Fragen",
          title: "What the class wanted to know",
          intro: "Yes/no questions take if or whether; wh-questions keep the question word. Normal word order, no question mark. Type the missing word, then Check.",
          items: QUESTIONS,
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Report two things",
          intro: "Report one thing the journalist said and one thing she asked — in your own sentences.",
          starters: ["She said that …", "She asked us …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "A question you were asked",
          intro: "Report one question somebody asked you this week — and your answer. Two sentences.",
          starters: ["… asked me if …", "I told them that …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Aussagen, Fragen, Aufforderungen + Redeeinleitungen",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "gap-fill",
          kind: "Interaktiv · Aussagen",
          title: "Report what she said",
          intro: "Put the verb one step back. Type the missing verb, then Check.",
          items: STATEMENTS,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Fragen",
          title: "What the class wanted to know",
          intro: "if / whether · normal word order · no question mark. Type the missing word, then Check.",
          items: QUESTIONS,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Aufforderungen",
          title: "What she asked us to do",
          intro: "A command or request becomes to + verb; Don’t … becomes not to + verb. Type the missing words, then Check.",
          items: COMMANDS,
        },
        {
          type: "written",
          kind: "Schreiben · Redeeinleitungen",
          title: "Not only “said”",
          intro:
            "Write the class report in five sentences. Use five different reporting verbs — and choose the one that says what the journalist was actually doing (explained, promised, admitted, warned, advised, told us …).",
          starters: [
            "She explained that …",
            "She promised that …",
            "She admitted that …",
            "She warned us not to …",
            "She advised us to …",
          ],
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: "Rate every idea, pick the best AND the weakest, then defend your choice.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "A piece of advice",
          intro: "Report a piece of advice someone once gave you, and say if it helped. Two sentences.",
          starters: ["… advised me to …", "It helped / did not help, because …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Report an interview",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Projekt · Challenge",
          title: "You are the reporter",
          intro:
            "Interview a classmate (or imagine one) about the buddy system or Mix-It-Up Day. Then write the report in reported speech: two things they said, one thing they asked you, and one thing they asked you to do. Use a different reporting verb each time — not only “said”.",
          starters: [
            "First they said that …",
            "They also explained that …",
            "They asked me whether …",
            "Finally they told me to …",
          ],
          help: "Denk an den Rückschritt und an die Pronomen (I → he/she, my → his/her).",
        },
      ],
    },
  ],
};
