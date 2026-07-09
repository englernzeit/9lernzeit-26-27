/**
 * Generation Like (Unit 4) — Grammar: "If-Clauses" (conditionals).
 *
 * Adapted from the Unit 4 teaching material (Week 3 Grammar) as a
 * DIRECTION, rebuilt in our watercolor-journal design and mapped onto
 * our four language-level Steps (LE · G-Kurs · E-Kurs · Challenge).
 * See memory: unit4-material-is-direction-not-spec.
 *
 * A shared "3 Types" guide (with the hand-drawn Typ-3 infographic) sits
 * at the top for every level; each Step then drills the conditionals at
 * an appropriate difficulty using self-checking widgets (group-sort,
 * multiple-choice, gap-fill, sentence-build) plus written tasks.
 */

const IMG = "assets/images/unit4/grammar";

export default {
  title: "If-Clauses",

  guide: {
    label: "The 3 Types",
    subtitle: "Your reference card for the whole page",
    video: {
      src: "assets/videos/if-clauses.mp4",
      poster: `${IMG}/if-clauses-poster.jpg`,
      caption: "Watch first — If-Clauses explained (8 min)",
    },
    types: [
      {
        n: 1,
        name: "Real Possibility",
        tag: "Possible",
        accent: "olive",
        formula: "if + present simple → will + infinitive",
        example: "If it rains, we will stay inside.",
      },
      {
        n: 2,
        name: "Imaginary Situation",
        tag: "Imaginary",
        accent: "ochre",
        formula: "if + past simple → would + infinitive",
        example: "If I were taller, I would play basketball better.",
      },
      {
        n: 3,
        name: "Past Regret",
        tag: "Too Late",
        accent: "coral",
        formula: "if + past perfect → would have + past participle",
        example: "If Sara had charged her phone, it would not have died.",
      },
    ],
    infographic: {
      src: `${IMG}/if-clauses-typ3.jpg`,
      alt: "If-Clauses Type 3: the 'Too Late' sentence — formula, golden rule and comma flip",
      caption: "Type 3 — the “Too Late” sentence",
    },
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Mit Beispielen und Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Grammatik · LE",
          title: "What is an if-clause?",
          paragraphs: [
            [
              "An if-clause has two parts. The if-part is the ",
              { w: "condition", de: "die Bedingung" },
              ". The other part is the ",
              { w: "result", de: "das Ergebnis / die Folge" },
              ". Example: If it rains, we stay inside.",
            ],
            [
              "Type 1 is about ",
              { w: "real", de: "echt / wirklich" },
              " things that can happen. Use: if + present, then will + verb. Example: If I study, I will pass the test.",
            ],
            [
              "Type 2 is about a ",
              { w: "dream", de: "der Traum" },
              " — not real now. Use: if + past, then would + verb. Example: If I were rich, I would buy a big house.",
            ],
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Type 1 or Type 2?",
          intro: "Tap a sentence, then tap a box. Sort all six. Check when you are ready.",
          groups: [
            {
              label: "① Type 1 — real",
              items: [
                "If it rains, we will stay in.",
                "If I study, I will pass.",
                "If she calls, I will answer.",
              ],
            },
            {
              label: "② Type 2 — dream",
              items: [
                "If I were a bird, I would fly.",
                "If I had a car, I would drive.",
                "If I won the lottery, I would travel.",
              ],
            },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Choose the correct form",
          intro: "Pick the right verb form. You see at once if it is correct.",
          questions: [
            { q: "If it rains, we ___ inside.", options: ["will stay", "would stay", "stayed", "will stayed", "staying"], correct: 0 },
            { q: "If I ___ rich, I would buy a big house.", options: ["were", "will be", "am", "would be", "being"], correct: 0 },
            { q: "If you study, you ___ the test.", options: ["will pass", "would pass", "passed", "will passed", "passing"], correct: 0 },
            { q: "If I had wings, I ___ fly.", options: ["would", "will", "had", "would have", "am"], correct: 0 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Fill in — Type 1",
          intro: "Type the correct verb form in each gap, then press Check.",
          items: [
            {
              hint: "Typ 1: if + Präsens → will + Verb",
              segments: ["If it ", { answer: "rains", size: 8 }, " (rain), we ", { answer: "will stay", accept: ["'ll stay"], size: 12 }, " (stay) inside."],
            },
            {
              hint: "Typ 1: if + Präsens → will + Verb",
              segments: ["If I ", { answer: "study", size: 8 }, " (study), I ", { answer: "will pass", accept: ["'ll pass"], size: 12 }, " (pass) the test."],
            },
            {
              hint: "Typ 1: if + Präsens → will + Verb",
              segments: ["If she ", { answer: "calls", size: 8 }, " (call), I ", { answer: "will answer", accept: ["'ll answer"], size: 12 }, " (answer)."],
            },
            {
              hint: "Typ 1: if + Präsens → will + Verb",
              segments: ["If we ", { answer: "are", size: 8 }, " (be) late, the teacher ", { answer: "will be", accept: ["'ll be"], size: 12 }, " (be) angry."],
            },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Your real plans",
          intro: "Finish each sentence about YOU. Use will + verb.",
          starters: [
            "If I have time tonight, I will …",
            "If it is sunny tomorrow, I will …",
            "If I pass my next test, I will …",
            "If my friend calls me, I will …",
            "If it rains at the weekend, I will …",
          ],
          help: "Hilfe: will = werde · verb = Grundform (go, play, watch …)",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Grammatik · G-Kurs",
          title: "The three conditionals",
          paragraphs: [
            "Conditional sentences describe what happens if a condition is true. English has three main types, and each one talks about a different kind of situation.",
            "Type 1 describes a real possibility in the future: if + present simple, then will + infinitive — “If Tom studies this weekend, he will do well in the test.” Type 2 describes an imaginary or unlikely situation now: if + past simple, then would + infinitive — “If I had more free time, I would go to the gym more often.”",
            "Type 3 looks back at the past and imagines a different result — but it is too late to change anything: if + past perfect, then would have + past participle — “If they had left earlier, they would have caught the train.”",
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Sort into Type 1, 2 or 3",
          intro: "Read each sentence and drop it in the right box, then Check.",
          groups: [
            {
              label: "Type 1 · possible",
              items: [
                "If I study tonight, I will do well tomorrow.",
                "If it rains this afternoon, we will stay inside.",
              ],
            },
            {
              label: "Type 2 · imaginary",
              items: [
                "If I had more free time, I would play football every day.",
                "If I were taller, I would play basketball better.",
              ],
            },
            {
              label: "Type 3 · too late",
              items: [
                "If we had left earlier, we would have caught the train.",
                "If Sara had charged her phone, it would not have died.",
              ],
            },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Type 1 or Type 2?",
          intro: "Decide which type fits, then type the correct verb form.",
          items: [
            {
              hint: "Real future plan → Type 1 (will + infinitive)",
              segments: ["If you throw a party while your parents are gone, you ", { answer: "will be", accept: ["'ll be", "will get"], size: 12 }, " (be) in big trouble."],
            },
            {
              hint: "Imaginary now → Type 2 (would + infinitive)",
              segments: ["If you read books all night long, you ", { answer: "would not be", accept: ["wouldn't be"], size: 16 }, " (not be) able to get up early."],
            },
            {
              hint: "Imaginary now → Type 2 (past simple in the if-part)",
              segments: ["If I ", { answer: "had", size: 8 }, " (have) more time, I would travel the world."],
            },
            {
              hint: "Real future → Type 1",
              segments: ["If it ", { answer: "snows", size: 8 }, " (snow) tomorrow, the school ", { answer: "will close", accept: ["'ll close"], size: 12 }, " (close)."],
            },
          ],
        },
        {
          type: "sentence-build",
          kind: "Interaktiv · Sätze bauen",
          title: "Build the Type 1 sentence",
          intro: "Tap the words in the right order. Watch the comma and the verb forms.",
          sentences: [
            { tokens: ["If", "Max", "keeps", "the music down,", "the neighbours", "will not call", "the police."] },
            { tokens: ["If", "I", "see", "Sarah tomorrow,", "I", "will tell", "her."] },
            { tokens: ["If", "Peter", "talks", "to his parents,", "they", "will not be", "angry."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Your weekend",
          intro: "Write two Type 1 sentences about your real plans for next weekend (If …, I will …).",
          answer: true,
          help: "Remember: no 'will' in the if-part — if + present simple.",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Grammatik · E-Kurs",
          title: "Getting Type 3 right",
          paragraphs: [
            "Type 3 conditionals are the trickiest, because they describe something that can no longer be changed — a past regret. The formula is if + past perfect, then would have + past participle: “If Peter had not thrown the party, his parents would not have been angry.”",
            "Two rules cause most mistakes. First, the golden rule: never put ‘would’ inside the if-part — it only belongs in the main clause. Write “If I had studied, I would have passed”, never “If I would have studied…”. Second, the comma flip: use a comma when the if-part comes first (“If it had rained, we would have stayed in”), but drop it when the if-part comes second (“We would have stayed in if it had rained”).",
            "Before you write a conditional, always ask yourself: is this a real possibility (Type 1), an imaginary situation now (Type 2), or a regret about the past (Type 3)? The answer tells you which verb forms to use.",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Which sentence is correct?",
          intro: "Only one option follows the rules. You see at once if you are right.",
          questions: [
            {
              q: "Type 2 — the golden rule:",
              options: [
                "If I saw him, I would tell him.",
                "If I would see him, I would tell him.",
                "If I see him, I would tell him.",
                "If I saw him, I will tell him.",
                "If I would saw him, I would tell him.",
              ],
              correct: 0,
            },
            {
              q: "Type 3 — past regret:",
              options: [
                "If I had studied, I would have passed.",
                "If I would have studied, I would have passed.",
                "If I had studied, I would passed.",
                "If I studied, I would have passed.",
                "If I have studied, I would have passed.",
              ],
              correct: 0,
            },
            {
              q: "Type 3 — correct forms:",
              options: [
                "If she had called, I would have helped.",
                "If she had called, I would helped.",
                "If she would call, I would have helped.",
                "If she called, I would have helped.",
                "If she has called, I would have helped.",
              ],
              correct: 0,
            },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "The Party Story — give advice",
          intro:
            "Peter threw a party while his parents were away. Candles burnt the rug, the neighbours called the police, and his parents came home early and furious. Complete his friend's advice.",
          items: [
            {
              hint: "Type 2: were / would + infinitive",
              segments: ["If I ", { answer: "were", size: 7 }, " (be) you, I ", { answer: "would talk", accept: ["'d talk"], size: 13 }, " (talk) to your parents."],
            },
            {
              hint: "Type 3: had + 3rd form / would not have + 3rd form",
              segments: ["If you ", { answer: "had talked", size: 12 }, " (talk) to them first, you ", { answer: "would not have got", accept: ["wouldn't have got", "would not have gotten", "wouldn't have gotten"], size: 20 }, " (not get) into so much trouble."],
            },
            {
              hint: "Type 2: past simple / would + infinitive",
              segments: ["If you ", { answer: "offered", size: 10 }, " (offer) to pay for the rug, your parents ", { answer: "would be", accept: ["'d be"], size: 12 }, " (be) happier."],
            },
            {
              hint: "Type 3: had not + 3rd form / would still be",
              segments: ["If you ", { answer: "had not put", accept: ["hadn't put"], size: 13 }, " (not put) candles everywhere, the rug ", { answer: "would still be", accept: ["'d still be"], size: 16 }, " (still be) fine."],
            },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Regel",
          title: "Complete the rule",
          intro: "Fill in the grammar terms that complete the Type 3 formula.",
          items: [
            {
              hint: "Think about the tense in each part of a Type 3 sentence.",
              segments: ["Type 3:  if + ", { answer: "past perfect", size: 16 }, "  →  would have + ", { answer: "past participle", accept: ["3rd form", "third form"], size: 18 }, "."],
            },
            {
              hint: "The comma rule when the if-part comes first.",
              segments: ["Use a ", { answer: "comma", size: 9 }, " when the ‘if’ part starts the sentence."],
            },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Explain the golden rule",
          intro:
            "In your own words, explain why you can never use ‘would’ in the if-part. Give one correct example and one wrong example to show the difference.",
          answer: true,
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Kreativ · Challenge",
          title: "Peter's regrets",
          intro:
            "It is the morning after the party. Poor Peter is full of regrets. Finish each sentence with a Type 3 conditional (if + past perfect → would have + past participle).",
          starters: [
            "If Peter had not thrown the party, …",
            "If he had blown out the candles, …",
            "If the music had not been so loud, …",
            "If he had asked his parents first, …",
          ],
          help: "Formel: If + had + 3. Form … , … would have + 3. Form.",
        },
      ],
    },
  ],
};
