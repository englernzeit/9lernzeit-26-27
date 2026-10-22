/**
 * Respect & Community (Unit 2) — Mediation: "Pass It On".
 *
 * Built from the LE / G-Kurs / E-Kurs source (04_Mediation_*). A podcast
 * ("School Matters" — Daniel's Open Page Project) that the learner relays:
 * answer the (German-speaking) brother in German with only what he asked
 * for, and ask Daniel a question in English when the brother says "frag
 * mal…". The podcast transcript doubles as a read-aloud player.
 *
 * Step 1 LE (short podcast, sentence starters) · Step 2 G-Kurs · Step 3
 * E-Kurs (full podcast, 11 points) · Step 4 challenge: be the interpreter.
 */

const PODCAST_FULL = [
  "Host: You are listening to School Matters. I am sitting in the library of a school in Leeds with Daniel Okafor, who is seventeen, and who started something called the Open Page Project. Daniel, what is it?",
  "Daniel: It is a competition for schools. Every class makes one piece of work against racism. A poster, a song, a short film, a poem — anything. We collect them and we show them in the town hall for a week in May.",
  "Host: Why a competition? Why not just a lesson?",
  "Daniel: Because a lesson lasts forty-five minutes and then it is over. A poster on a wall is still there in July. And the people who make it remember every word of it, because they wrote it themselves.",
  "Host: How many schools are taking part this year?",
  "Daniel: Twenty-two. Last year it was nine. The biggest change is that six of them are primary schools now, so the children are seven and eight years old.",
  "Host: And what do the winners get?",
  "Daniel: That is the question everybody asks. There is no money. The winning class spends a day with a journalist from the local paper and makes a page of the newspaper themselves. Last year's class wrote about their own street.",
  "Host: Can a school from outside Leeds take part?",
  "Daniel: Yes. Anybody can. Write to openpage at leedsschools dot org before the first of March. One piece of work per class, and a line that says who made it.",
  "Host: Daniel Okafor. Thank you very much.",
];

const PODCAST_SHORT = [
  "Host: This is School Matters. Daniel is seventeen. He started the Open Page Project.",
  "Host: Daniel, what is the Open Page Project?",
  "Daniel: It is a competition for schools. Every class makes one piece of work against racism. A poster, a song, a film or a poem. In May we show all of them in the town hall.",
  "Host: How many schools are taking part?",
  "Daniel: Twenty-two schools this year. Last year it was nine.",
  "Host: What do the winners get?",
  "Daniel: No money. The winning class works with a journalist for one day and makes a page of the local newspaper.",
  "Host: Can other schools take part?",
  "Daniel: Yes, anybody can. Write an email before the first of March.",
];

const GLOSS_INTRO = [
  "Your brother does not speak English — your job is to ",
  { w: "explain", de: "erklären" },
  " what Daniel says in your own words, not word for word. Say only what was asked, and ",
  { w: "make sure that", de: "dafür sorgen, dass" },
  " you leave out the rest. When the podcast gives an example to ",
  { w: "illustrate", de: "veranschaulichen" },
  " the idea, you do not need every ",
  { w: "further", de: "weitere" },
  " detail. And ",
  { w: "except for", de: "außer, bis auf" },
  " the email address, keep it short — ",
  { w: "make an effort", de: "sich Mühe geben" },
  " to be clear. If a word is new, a dictionary ",
  { w: "entry", de: "der Eintrag" },
  " can help, and at the end you can ",
  { w: "thank sb. for sth.", de: "sich bei jmdm. für etw. bedanken" },
  ": thank Daniel for his time.",
];

const MED_RULES =
  "Die 5 Regeln: 1) Was will die Person wissen? 2) Wo steht das — die eine Stelle. 3) Sag es in eigenen Worten. 4) Schau auf die Punkte: (2 P) = zwei Infos. 5) Steht da „frag mal…“? Dann antwortest du auf Englisch.";

const ASK_B =
  "Your brother asked: „Was gewinnt man denn?“ (2 P). Which German answer gives him both pieces of information?";
const ASK_OPTS = [
  "Nichts.",
  "Kein Geld. Die Siegerklasse verbringt einen Tag mit einem Journalisten und macht selbst eine Seite der Lokalzeitung.",
  "Daniel sagt, das sei die Frage, die alle stellen.",
];

const PROBLEM_INTRO =
  "Your class wants to take part, but only one piece of work may be sent in. There are four ideas and the vote ends 7 – 7 – 7 – 6. Idea 1: vote again, only between the three ideas with seven votes. · Idea 2: put the three ideas together into one piece of work. · Idea 3: let the four people who had the ideas talk for two minutes each, then vote again.";

export default {
  title: "Pass It On",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Der Podcast — mit Satzanfängen",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Mediation · LE",
          title: "The podcast — School Matters",
          paragraphs: [GLOSS_INTRO, ...PODCAST_SHORT],
          readAloud: { label: "School Matters — the podcast (short)", note: "You may read it, or press play to hear it.", lines: PODCAST_SHORT },
          highlight: true,
          help: MED_RULES,
        },
        {
          type: "written",
          kind: "Mediation · Deutsch & Englisch",
          title: "Help your brother",
          intro: "Your brother asks in German. Answer in German — only what he asked. When he says „frag mal…“, answer in English. The starters help you.",
          starters: [
            "Bruder: „Was macht Daniel genau?“ → Du auf Deutsch (2 Infos): Er hat einen … gegründet, bei dem …",
            "Bruder: „Frag ihn, wo man die Sachen sehen kann.“ → You in English: Where can …?",
            "Bruder: „Wie viele Schulen machen mit?“ → Du auf Deutsch: 22 Schulen, letztes Jahr …",
            "Bruder: „Was gewinnt man denn?“ → Du auf Deutsch (2 Infos): Kein Geld. Die Siegerklasse …",
          ],
        },
        {
          type: "written",
          kind: "Mediation · Nachfragen",
          title: "Ask in English",
          intro: "Your brother wants to know two more things. Write the question in English.",
          starters: [
            "Frag Daniel, wie lange die Ausstellung dauert. → How long …?",
            "Frag Daniel, wer die Arbeiten bewertet. → Who …?",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig dosiert",
          title: "Too much, too little, or right?",
          intro: "Three students answered your brother. Tick the answer that gives exactly the two pieces of information he asked for.",
          questions: [{ q: ASK_B, options: ASK_OPTS, correct: 1 }],
        },
        {
          type: "written",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: PROBLEM_INTRO,
          starters: ["Idea ___ is best, because …"],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Der ganze Podcast",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Mediation · G-Kurs",
          title: "The podcast — School Matters",
          paragraphs: [GLOSS_INTRO, ...PODCAST_FULL],
          readAloud: { label: "School Matters — the podcast", note: "You may read it, or press play to hear it.", lines: PODCAST_FULL },
          help: MED_RULES,
        },
        {
          type: "written",
          kind: "Mediation · Deutsch & Englisch",
          title: "Help your brother",
          intro: "Answer in German with only what was asked. The points tell you how many pieces of information belong in the answer; when he says „frag mal…“, answer in English.",
          starters: [
            "Bruder: „Was macht Daniel genau?“ → Du auf Deutsch (2 P): …",
            "Bruder: „Frag ihn, wo man die Sachen sehen kann.“ → You in English (1 P): …",
            "Bruder: „Warum als Wettbewerb und nicht im Unterricht?“ → Du auf Deutsch (2 P): …",
            "Bruder: „Wie viele Schulen machen mit?“ → Du auf Deutsch (2 P): …",
            "Bruder: „Was gewinnt man denn?“ → Du auf Deutsch (2 P): …",
          ],
        },
        {
          type: "written",
          kind: "Mediation · Nachfragen",
          title: "Ask in English",
          intro: "Your brother wants to know three more things. Write each question in English.",
          starters: [
            "Frag Daniel, wie lange die Ausstellung dauert. → …",
            "Frag Daniel, wer die Arbeiten bewertet. → …",
            "Frag Daniel, ob eine Klasse zwei Arbeiten schicken darf. → …",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig dosiert",
          title: "Too much, too little, or right?",
          intro: "Tick the answer that gives exactly the two pieces of information your brother asked for.",
          questions: [{ q: ASK_B, options: ASK_OPTS, correct: 1 }],
        },
        {
          type: "written",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: PROBLEM_INTRO,
          starters: ["Idea ___ is best, because …", "The other ideas are not as good, because …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Genau dosieren (11 P)",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Mediation · E-Kurs",
          title: "The podcast — School Matters",
          paragraphs: [GLOSS_INTRO, ...PODCAST_FULL],
          readAloud: { label: "School Matters — the podcast", note: "You may read it, or press play to hear it.", lines: PODCAST_FULL },
          help: MED_RULES,
        },
        {
          type: "written",
          kind: "Mediation · Deutsch & Englisch",
          title: "Help your brother (11 P)",
          intro: "Answer in German with only what was asked; the points say how many pieces of information. When he says „frag mal…“, answer in English.",
          starters: [
            "Bruder: „Ich habe nur ‚project‘ verstanden. Was macht Daniel genau?“ → Du (2 P): …",
            "Bruder: „Frag ihn, wo man die Sachen sehen kann.“ → You (1 P): …",
            "Bruder: „Warum macht er das als Wettbewerb und nicht im Unterricht?“ → Du (2 P): …",
            "Bruder: „Wie viele Schulen machen mit?“ → Du (2 P): …",
            "Bruder: „Was gewinnt man denn?“ → Du (2 P): …",
            "Bruder: „Unsere Schule ist nicht in Leeds. Frag mal, ob wir trotzdem mitmachen dürfen.“ → You (1 P): …",
            "Bruder: „Und bis wann muss das weg sein?“ → Du (1 P): …",
          ],
        },
        {
          type: "written",
          kind: "Mediation · Nachfragen",
          title: "Ask in English",
          intro: "Write each question in English.",
          starters: [
            "Frag Daniel, wie lange die Ausstellung dauert. → …",
            "Frag Daniel, wer die Arbeiten bewertet. → …",
            "Frag Daniel, ob eine Klasse zwei Arbeiten schicken darf. → …",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig dosiert",
          title: "Too much, too little, or right?",
          intro: "Tick the answer that gets both points — exactly what your brother asked for.",
          questions: [{ q: ASK_B, options: ASK_OPTS, correct: 1 }],
        },
        {
          type: "written",
          kind: "Schreiben · Begründen",
          title: "What is wrong with the others?",
          intro: "For the two answers you did NOT tick above, write one sentence each: what exactly is wrong with it (too much, too little, or off the point)?",
          starters: [
            "„Nichts.“ is wrong because …",
            "„Daniel sagt, das sei die Frage, die alle stellen.“ is wrong because …",
          ],
        },
        {
          type: "written",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: PROBLEM_INTRO,
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Be the interpreter",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Projekt · Challenge",
          title: "A German friend wants to join in",
          intro:
            "A German-speaking friend heard about the Open Page Project and wants to take part with their class. Mediate for them: write a short German summary of the three things that matter most (what it is, when/where it is shown, how to enter), then write one English email question to Daniel that your friend still needs answered.",
          starters: [
            "Auf Deutsch — Was ist das Projekt? …",
            "Auf Deutsch — Wann und wo? …",
            "Auf Deutsch — Wie macht man mit? …",
            "In English — one question for Daniel: …",
          ],
          help: "Tipp: Nur das Wichtigste auf Deutsch — kurz, in eigenen Worten. Die Frage auf Englisch beginnt mit einem Fragewort.",
        },
      ],
    },
  ],
};
