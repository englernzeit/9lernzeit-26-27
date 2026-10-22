/**
 * Respect & Community (Unit 2) — Reading: "Mix-It-Up Day".
 *
 * Built from the LE / G-Kurs / E-Kurs source (02_Reading_*). A school
 * newspaper article about a day when nobody sits where they normally sit.
 * The class-test skills — decide true/false (and give the line), choose
 * from four answers, find the line that says the same — become self-
 * checking widgets here (true/false → multiple-choice, paraphrase →
 * match-up); the "give the line" skill is flagged in each help note.
 *
 * Step 1 LE (short article) · Step 2 G-Kurs · Step 3 E-Kurs (full article)
 * · Step 4 challenge: write the school-newspaper report.
 */

// Eight theme words of this lesson, woven into one framing paragraph so
// every level meets them with German support.
const THEME_INTRO = [
  "Theme 2 is about respect. A school newspaper reported on a ",
  { w: "campaign", de: "die Kampagne" },
  " against ",
  { w: "prejudice", de: "das Vorurteil" },
  " — a plan to make the school more ",
  { w: "equal", de: "gleichberechtigt" },
  ", where your ",
  { w: "origin", de: "die Herkunft" },
  " does not decide where you belong. In a fair ",
  { w: "society", de: "die Gesellschaft" },
  ", ",
  { w: "discrimination", de: "die Diskriminierung" },
  " has no place — so students ",
  { w: "take action", de: "etwas unternehmen" },
  " on the things that ",
  { w: "matter", de: "von Bedeutung sein" },
  ".",
];

// LE article — the harder words carry a German gloss (tap to see it).
const ARTICLE_LE = [
  [
    "Fairfield High has 800 students. At lunch they ",
    { w: "always", de: "immer" },
    " sit in the same places. The football players sit ",
    { w: "together", de: "zusammen" },
    ". The gamers sit together. The students who came this year sit at the ",
    { w: "end", de: "das Ende" },
    " of the room.",
  ],
  [
    "Amira is in Year 10. She had an idea. For one ",
    { w: "lunch break", de: "die Mittagspause" },
    ", ",
    { w: "nobody", de: "niemand" },
    " sits in their normal place. At the door every student takes a ",
    { w: "coloured card", de: "eine farbige Karte" },
    ". The card says which table you sit at.",
  ],
  [
    "Not everybody liked the idea. Leon said that he did not want to eat with people he does not know. The ",
    { w: "school council", de: "die Schülervertretung" },
    " talked about it for two weeks. Then they ",
    { w: "voted", de: "stimmten ab" },
    ": 22 said yes, 9 said no.",
  ],
  [
    "On the day, nobody ",
    { w: "spoke", de: "sprach" },
    " for ten minutes. Then a boy asked about the football ",
    { w: "match", de: "das Spiel" },
    ", and the room got ",
    { w: "loud", de: "laut" },
    ". At table eleven a boy from Year 7 ",
    { w: "found", de: "fand" },
    " a girl who plays his online game. Two tables did not talk ",
    { w: "at all", de: "überhaupt nicht" },
    ".",
  ],
  "Amira says: “I know eleven new names now.”",
];

const ARTICLE_FULL = [
  "For one lunch break in March, nobody at Fairfield High sat where they normally sit. The teachers took the chairs out of the canteen and put them back in a different order. At the door every student pulled a coloured card out of a box, and the card decided the table. Red went to table one, blue to table two, and so on. Our head teacher called it Mix-It-Up Day. Most of us called it the longest forty minutes of the year.",
  "The idea came from Amira, who is in Year 10. She had read about a school in Birmingham that does it every term. “In our canteen you can see the whole school in one picture,” she said. “The football people sit here, the gamers sit there, and the students who came this year sit at the end by the window. Nobody plans it. It just happens, and then nobody changes it.”",
  "Not everybody liked the plan. Leon from Year 9 told the school council that he did not want to spend his free time with people he has nothing in common with. Others said the same, and for two weeks it looked as if the day would be cancelled. In the end the council voted: twenty-two for, nine against.",
  "So what happened? For the first ten minutes almost nobody spoke. Then somebody at table five asked whether anybody had seen the match on Saturday, and after that it got loud. At table eleven a boy from Year 7 found out that the girl next to him plays the same online game as he does. Two tables did not work at all; the students there ate quickly and left.",
  "Amira is honest about it. “One lunch break does not make a school kind,” she says. “But I know eleven names now that I did not know in February. That is not nothing.”",
  "Ms Obi, who organised the day together with Amira, wants to do it again in June. This time the cards will not be in a box at the door. Every student writes their own name on a card, and somebody else pulls it out.",
];

const PROBLEM = {
  situation: "Your class wants to try Mix-It-Up Day. Seven people say they will not come to the canteen that day.",
  ideas: [
    "do it anyway — seven out of 28 is not a reason to stop.",
    "ask the seven what would make them come, and change that one thing.",
    "make it shorter — mixed tables for the first fifteen minutes, then everybody sits where they want.",
  ],
};

// Paraphrase → the line of the article that means the same.
const PARAPHRASE = {
  options: [
    "In our canteen you can see the whole school in one picture.",
    "For two weeks it looked as if the day would be cancelled.",
    "I know eleven names now that I did not know in February.",
    "Two tables did not work at all; the students ate quickly and left.",
  ],
  items: [
    { left: "Where people sit in the canteen tells you what the school is like.", answer: "In our canteen you can see the whole school in one picture." },
    { left: "For a while the whole plan was in danger.", answer: "For two weeks it looked as if the day would be cancelled." },
    { left: "It is a small result, but it is still a result.", answer: "I know eleven names now that I did not know in February." },
  ],
};

export default {
  title: "Mix-It-Up Day",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Der Artikel — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Lesetext · LE",
          title: "Mix-It-Up Day — forty minutes at the wrong table",
          paragraphs: [THEME_INTRO, ...ARTICLE_LE],
          highlight: true,
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig / Falsch",
          title: "True or false?",
          introDe: "Lies den Artikel noch einmal und wähle True (richtig) oder False (falsch). Dann Check.",
          intro: "Read the article again, then choose True or False. Check when you are ready.",
          columns: 2,
          questions: [
            { q: "At lunch the students at Fairfield High always sit in the same places.", de: "Beim Mittagessen sitzen die Schüler immer an denselben Plätzen.", options: ["True", "False"], correct: 0 },
            { q: "The card tells you which table you sit at.", de: "Die Karte sagt dir, an welchem Tisch du sitzt.", options: ["True", "False"], correct: 0 },
            { q: "Leon liked the idea.", de: "Leon fand die Idee gut.", options: ["True", "False"], correct: 1 },
            { q: "All the tables talked to each other.", de: "An allen Tischen wurde miteinander geredet.", options: ["True", "False"], correct: 1 },
          ],
          help: "Klassenarbeit-Tipp: Dort musst du bei „richtig / falsch“ auch die Zeile angeben, z. B. l. 1.",
        },
        {
          type: "event-order",
          kind: "Interaktiv · Reihenfolge",
          title: "What happened first?",
          introDe: "Bring die vier Momente in die richtige Reihenfolge — 1 ist, was zuerst passiert ist. Dann Check.",
          intro: "Put the four moments in order — 1 is what happened first. Then Check.",
          events: [
            { text: "Amira has an idea for Mix-It-Up Day.", de: "Amira hat eine Idee für den Mix-It-Up Day." },
            { text: "The school council votes: 22 yes, 9 no.", de: "Die Schülervertretung stimmt ab: 22 ja, 9 nein." },
            { text: "On the day, nobody speaks for ten minutes.", de: "An dem Tag spricht zehn Minuten lang niemand." },
            { text: "A boy asks about the football match and the room gets loud.", de: "Ein Junge fragt nach dem Fußballspiel, und es wird laut." },
          ],
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Bewerte jede Idee, wähle die beste — und schreib, warum.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …"],
          help: "Hilfe: Sieben aus deiner Klasse wollen nicht mitmachen. Idee 1 = trotzdem machen · Idee 2 = die sieben fragen, was sie brauchen · Idee 3 = kürzer machen (nur 15 Minuten gemischt). because = weil",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Mix-It-Up Day at your school?",
          introDe: "Hättest du gern einen Mix-It-Up Day an deiner Schule? Schreib ein oder zwei Sätze.",
          intro: "Would you like a Mix-It-Up Day at your school? Write one or two sentences.",
          starters: ["I would / would not like a Mix-It-Up Day, because …"],
          help: "Hilfe: I would like = Ich würde gern · new people = neue Leute · because = weil",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Den ganzen Artikel lesen",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · G-Kurs",
          title: "Mix-It-Up Day — forty minutes at the wrong table",
          paragraphs: [THEME_INTRO, ...ARTICLE_FULL],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig / Falsch",
          title: "True or false?",
          intro: "Choose True or False for each sentence, then Check.",
          columns: 2,
          questions: [
            { q: "On Mix-It-Up Day the students chose their tables themselves.", options: ["True", "False"], correct: 1 },
            { q: "The idea for the day came from a teacher.", options: ["True", "False"], correct: 1 },
            { q: "Amira knew another school that does the same thing.", options: ["True", "False"], correct: 0 },
            { q: "For a while it was not clear whether the day would take place.", options: ["True", "False"], correct: 0 },
            { q: "At every table the students started talking.", options: ["True", "False"], correct: 1 },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Auswählen",
          title: "Choose the right answer",
          intro: "Only one answer is right. Then Check.",
          questions: [
            { q: "On Mix-It-Up Day the colour of your card decided …", options: ["what you had for lunch.", "where you sat.", "who spoke first at your table.", "how long your break was."], correct: 1 },
            { q: "Leon was against the day because …", options: ["the canteen food was bad.", "he had football training.", "he did not want to spend his break with people he does not know.", "he had already done it at another school."], correct: 2 },
            { q: "The first ten minutes at the tables were …", options: ["loud.", "funny.", "silent.", "cancelled."], correct: 2 },
            { q: "In June the day will be different because …", options: ["the teachers will choose the tables.", "the students will pull each other's names out.", "it will take place outside.", "only Year 10 will take part."], correct: 1 },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Gleiche Aussage",
          title: "Which line says the same?",
          intro: "Match each sentence to the line of the article that means the same. One line is not needed. Then Check.",
          options: PARAPHRASE.options,
          items: PARAPHRASE.items,
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Rate every idea, pick the best one, then say why it beats the others.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …", "The other ideas are not as good, because …"],
          help: "Klassenarbeit-Tipp: Bei „richtig / falsch“ und „gleiche Aussage“ immer die Zeile angeben (l. 7 / ll. 7–8).",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "What does Amira mean?",
          intro: "Amira says: “One lunch break does not make a school kind.” What does she mean? Write two sentences in your own words.",
          starters: ["Amira means that …", "I think she is right / wrong, because …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Zwischen den Zeilen lesen",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · E-Kurs",
          title: "Mix-It-Up Day — forty minutes at the wrong table",
          paragraphs: [THEME_INTRO, ...ARTICLE_FULL],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig / Falsch",
          title: "True or false?",
          intro: "Choose True or False for each sentence, then Check.",
          columns: 2,
          questions: [
            { q: "On Mix-It-Up Day the students chose their tables themselves.", options: ["True", "False"], correct: 1 },
            { q: "The idea for the day came from a teacher.", options: ["True", "False"], correct: 1 },
            { q: "Amira knew another school that does the same thing.", options: ["True", "False"], correct: 0 },
            { q: "For a while it was not clear whether the day would take place.", options: ["True", "False"], correct: 0 },
            { q: "At every table the students started talking.", options: ["True", "False"], correct: 1 },
            { q: "Amira believes that one day like this changes a whole school.", options: ["True", "False"], correct: 1 },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Auswählen",
          title: "Choose the right answer",
          intro: "Four close options — only one is right. Then Check.",
          questions: [
            { q: "On Mix-It-Up Day the colour of your card decided …", options: ["what you had for lunch.", "where you sat.", "who spoke first at your table.", "how long your break was."], correct: 1 },
            { q: "Leon was against the day because …", options: ["the canteen food was bad.", "he had football training.", "he did not want to spend his break with people he does not know.", "he had already done it at another school."], correct: 2 },
            { q: "The first ten minutes at the tables were …", options: ["loud.", "funny.", "silent.", "cancelled."], correct: 2 },
            { q: "In June the day will be different because …", options: ["the teachers will choose the tables.", "the students will pull each other's names out.", "it will take place outside.", "only Year 10 will take part."], correct: 1 },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Gleiche Aussage",
          title: "Which line says the same?",
          intro: "Match each sentence to the line that says the same in different words. One line is not needed. Then Check.",
          options: PARAPHRASE.options,
          items: PARAPHRASE.items,
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: "Rate every idea, pick the best AND the weakest, then defend your choice.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
          help: "Klassenarbeit-Tipp: Belege jede Antwort mit der genauen Zeile (l. 12 / ll. 12–13).",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Answer Leon",
          intro: "Leon did not want to spend his free time with people he has nothing in common with. Answer him in two sentences: what could he miss?",
          starters: ["Leon, I understand that … , but …", "If you sit with new people, you might …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Write the school-newspaper report",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Projekt · Challenge",
          title: "You are the school reporter",
          intro:
            "Your class has just held its own Mix-It-Up Day. Write a short report for the school newspaper, like the one you read. Give it a headline, say what happened, add one real-sounding quote from a classmate, and end — like Amira — with an honest result.",
          starters: [
            "Headline: …",
            "What we did: On our Mix-It-Up Day, …",
            "One table that worked: …",
            "A quote from a classmate: “…”",
            "The honest result: …",
          ],
          help: "Tipp: Schreib wie eine Zeitung — kurze, klare Sätze und ein Zitat machen den Bericht lebendig.",
        },
      ],
    },
  ],
};
