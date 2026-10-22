/**
 * Respect & Community (Unit 2) — Revision: ready for the test.
 *
 * Built from the LE / G-Kurs / E-Kurs source (08_Revision_*). The last
 * sheet before the test: eight verbs that need the right preposition, one
 * mixed question from every lesson of the unit (so a wrong answer points
 * to the sheet to revise), participles (E-Kurs), and a revision plan.
 *
 * Step 1 LE · Step 2 G-Kurs (+ revision plan) · Step 3 E-Kurs (+
 * participles, problem) · Step 4 challenge: be the examiner.
 */

const GLOSS_INTRO = [
  "This is the last sheet before the test. Eight verbs each need the right preposition — learn them as one word. A good class knows how to ",
  { w: "deal with", de: "sich kümmern um / bewältigen" },
  " a problem and to ",
  { w: "keep an eye on", de: "ein Auge haben auf" },
  " each other, so everyone can ",
  { w: "feel comfortable with", de: "sich wohlfühlen mit" },
  " the group. When a plan ",
  { w: "breaks down", de: "zusammenbricht / kaputtgeht" },
  " or a new student ",
  { w: "turns up", de: "auftaucht" },
  ", a buddy will ",
  { w: "stick with", de: "bei jmdm. bleiben" },
  " them so nobody has to ",
  { w: "suffer from", de: "leiden unter" },
  " being alone. (And when the old shop closed, they had to ",
  { w: "board up", de: "mit Brettern verschließen" },
  " the windows.)",
];

const VERB_PREP = {
  options: ["with", "on", "down", "up", "from", "about", "for"],
  items: [
    { left: "deal", answer: "with" },
    { left: "keep an eye", answer: "on" },
    { left: "feel comfortable", answer: "with" },
    { left: "break", answer: "down" },
    { left: "turn", answer: "up" },
    { left: "stick", answer: "with" },
    { left: "suffer", answer: "from" },
    { left: "board", answer: "up" },
  ],
};

const MIXED = [
  { hint: "Sheet 1 · Vocabulary", segments: ["A person who sees it happen and does nothing is a ", { answer: "bystander", size: 12 }, "."] },
  { hint: "Sheet 2 · Reading — give the line", segments: ["The proof is in lines 12 and 13. Write it the way the test wants it: ", { answer: "ll. 12-13", accept: ["ll 12-13", "ll.12-13", "ll. 12–13", "12-13", "l. 12-13"], size: 12 }] },
  { hint: "Sheet 3 · Listening — only the missing words", segments: ["Right answer (1–5 words): ", { answer: "eight seconds", accept: ["8 seconds"], size: 14 }, " — not the whole sentence."] },
  { hint: "Sheet 4 · Mediation — in English", segments: ["„Frag sie, wann sie kommt.“ → ", { answer: "Ask her when she is coming", accept: ["ask her when she comes", "ask her when she will come", "ask her when she arrives", "ask her when she is coming."], size: 30 }] },
  { hint: "Sheet 5 · Writing — put in the linking word", segments: ["", { answer: "In my opinion", accept: ["to sum up", "firstly"], size: 14 }, ", I think the project should stay."] },
  { hint: "Sheet 6 · Speaking — which move?", segments: ["„I see what you mean, but we only have four lessons.“ → ", { answer: "disagree politely", accept: ["disagree"], size: 18 }] },
  { hint: "Sheet 7 · Grammar — one step back", segments: ["„I can help.“ → She said that she ", { answer: "could", size: 8 }, " help."] },
];

const REVISION_PLAN = [
  "1 Vocabulary — the eight words and how to explain a word",
  "2 Reading — true/false with the line, and the same meaning in other words",
  "3 Listening — read the questions first, 1–5 words in a gap",
  "4 Mediation — only what was asked; the points say how much",
  "5 Writing — collect, sort, link, write, check",
  "6 Speaking — react, give a reason, ask back, disagree politely",
  "7 Grammar — one step back, if for questions, to for requests",
];

const PROBLEM = {
  situation: "The test is on Friday. You have two evenings and you got four of the seven mixed questions wrong — all four from different lessons.",
  ideas: [
    "read all seven sheets again from the beginning.",
    "take only the four sheets where something went wrong — two each evening.",
    "do the four tasks again without looking, then check, then redo the ones still wrong.",
  ],
};

export default {
  title: "Ready for the Test",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Verben mit Präposition + kurzer Check",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Revision · LE",
          title: "The last sheet before the test",
          paragraphs: [GLOSS_INTRO],
          highlight: true,
          help: "Merke: die Präposition gehört zum Verb — deal with, nie deal about. Die deutsche Übersetzung hilft nicht: suffer from, aber leiden unter.",
        },
        {
          type: "match-up",
          kind: "Interaktiv · Verb + Präposition",
          title: "The right preposition",
          intro: "Give each verb its preposition. Two prepositions are not needed. Then Check.",
          options: VERB_PREP.options,
          items: VERB_PREP.items,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Quer durch die Unit",
          title: "One question from the unit",
          intro: "Answer without looking at the other pages first. Then Check.",
          items: [MIXED[0], MIXED[4], MIXED[5], MIXED[6]],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Eine Frage aus jeder Stunde",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "match-up",
          kind: "Interaktiv · Verb + Präposition",
          title: "The right preposition",
          intro: "Give each verb its preposition. Two prepositions are not needed. Then Check.",
          options: VERB_PREP.options,
          items: VERB_PREP.items,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Quer durch die Unit",
          title: "One question from every lesson",
          intro: "Answer without looking at the other pages first. Then Check — and note the sheet number of anything you got wrong.",
          items: MIXED,
        },
        {
          type: "written",
          kind: "Revision · Lernplan",
          title: "Your revision plan",
          intro: "Tick only the sheets you really still need to look at before the test.",
          lines: REVISION_PLAN,
          checklist: true,
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Quer durch die Unit + Participles",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "match-up",
          kind: "Interaktiv · Verb + Präposition",
          title: "The right preposition",
          intro: "Give each verb its preposition. Two prepositions are not needed. Then Check.",
          options: VERB_PREP.options,
          items: VERB_PREP.items,
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Quer durch die Unit",
          title: "One question from every lesson",
          intro: "Answer without looking at the other pages first. Then Check — and note the sheet number of anything you got wrong.",
          items: MIXED,
        },
        {
          type: "written",
          kind: "Schreiben · Participles",
          title: "Participles",
          intro:
            "In the test they turn up here. Replace each participle with a clause using and, while, because or when. Example: Walking into the hall, she saw the posters. = When she walked into the hall, she saw the posters.",
          starters: [
            "Leaving the hall, Amira saw the posters. → When …",
            "Not knowing anybody, the new student sat down. → Because …",
            "The council voted, laughing about the cards. → The council voted and …",
            "Standing in the queue, we talked. → While …",
          ],
        },
        {
          type: "written",
          kind: "Revision · Lernplan",
          title: "Your revision plan",
          intro: "Tick only the sheets you really still need to look at before the test.",
          lines: REVISION_PLAN,
          checklist: true,
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
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Be the examiner",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Projekt · Challenge",
          title: "Write the test yourself",
          intro:
            "You know this unit well enough to test it. Write one good question for three different competences — and the answer — the kind of question that really shows whether someone understood. Then try them on a partner.",
          starters: [
            "Vocabulary question (+ answer): …",
            "Grammar question — reported speech (+ answer): …",
            "Reading or Listening question (+ answer): …",
          ],
          help: "Eine gute Frage hat genau eine richtige Antwort — und prüft Verstehen, nicht Auswendiglernen.",
        },
      ],
    },
  ],
};
