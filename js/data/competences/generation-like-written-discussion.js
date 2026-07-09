/**
 * Generation Like (Unit 4) — Writing: "Written Discussion".
 *
 * Adapted from the Unit 4 material (Week 4 Vocab & Writing) as a
 * DIRECTION and rebuilt in our watercolor-journal design across the four
 * language-level Steps. See memory: unit4-material-is-direction-not-spec.
 *
 * The material lets the learner pick one of three debate topics; we build
 * the full scaffold around the on-theme topic "Should social media be
 * banned for children under 15?" (the essay challenge invites a free
 * topic too). Steps move from the language of discussion → planning
 * arguments → building paragraphs sentence-by-sentence → the full essay.
 */

export default {
  title: "Written Discussion",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Die Sprache der Erörterung — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Schreiben · LE",
          title: "What is a written discussion?",
          paragraphs: [
            [
              "A written discussion looks at a ",
              { w: "topic", de: "das Thema" },
              " from two sides. You give ",
              { w: "arguments", de: "Argumente" },
              " for and against, and then your own ",
              { w: "opinion", de: "die Meinung" },
              ".",
            ],
            [
              "It has four paragraphs: an introduction, the arguments ",
              { w: "for", de: "dafür" },
              ", the arguments ",
              { w: "against", de: "dagegen" },
              ", and a conclusion. This page teaches you the words and phrases you need for each part.",
            ],
          ],
        },
        {
          type: "phrase-reference",
          kind: "Wortschatz · Redemittel",
          title: "Discussion phrases",
          intro: "Keep this reference card open while you write. Each phrase has its German meaning.",
          sections: [
            { label: "Introduction", accent: "blue", pairs: [["topic", "das Thema"], ["opinion", "die Meinung"], ["discussion", "die Erörterung"], ["“Nowadays, …”", "Heutzutage…"], ["“Many people think that…”", "Viele Menschen denken…"]] },
            { label: "Arguments FOR", accent: "green", pairs: [["advantage", "der Vorteil"], ["useful", "nützlich"], ["“Firstly,…”", "Erstens…"], ["“Another advantage is…”", "Ein weiterer Vorteil ist…"], ["“In addition,…”", "Außerdem…"]] },
            { label: "Arguments AGAINST", accent: "red", pairs: [["disadvantage", "der Nachteil"], ["problem", "das Problem"], ["“However,…”", "Allerdings…"], ["“On the other hand,…”", "Andererseits…"], ["“Another disadvantage is…”", "Ein weiterer Nachteil ist…"]] },
            { label: "Your opinion", accent: "orange", pairs: [["“In my opinion,…”", "Meiner Meinung nach…"], ["“I believe that…”", "Ich glaube, dass…"], ["“I think that…”", "Ich denke, dass…"]] },
            { label: "Conclusion", accent: "slate", pairs: [["“To sum up,…”", "Zusammenfassend…"], ["“In conclusion,…”", "Abschließend…"], ["“All in all,…”", "Alles in allem…"]] },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Match the words",
          intro: "Choose the correct German translation for each word, then Check.",
          options: ["Ablenkung", "recherchieren", "Meinung", "Regel"],
          items: [
            { left: "distraction", answer: "Ablenkung" },
            { left: "research", answer: "recherchieren" },
            { left: "opinion", answer: "Meinung" },
            { left: "rule", answer: "Regel" },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "What does each starter do?",
          intro: "Match each sentence starter to its job in a discussion, then Check.",
          options: ["a first argument", "the opposite side", "a second point on one side", "the conclusion"],
          items: [
            { left: "“Firstly, …”", answer: "a first argument" },
            { left: "“However, …”", answer: "the opposite side" },
            { left: "“On the other hand, …”", answer: "a second point on one side" },
            { left: "“To sum up, …”", answer: "the conclusion" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Your opinion",
          intro: "Finish these sentences with your own ideas.",
          starters: [
            "In my opinion, the internet is …",
            "I think that young people should …",
            "One advantage of social media is …",
          ],
          help: "Hilfe: In my opinion = Meiner Meinung nach · advantage = Vorteil",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Plan your arguments",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Schreiben · G-Kurs",
          title: "Our topic",
          paragraphs: [
            "For the rest of this page you will write a discussion about one question: “Should social media be banned for children under 15?”",
            "Every discussion needs good arguments on both sides. Some arguments are strong and relevant; others are silly or off-topic. In the next two tasks, decide which arguments are actually worth using.",
          ],
        },
        {
          type: "argument-pick",
          kind: "Interaktiv · Argumente FOR",
          title: "Arguments FOR a ban",
          intro: "Which reasons really support banning social media for under-15s?",
          args: [
            { text: "It protects children from cyberbullying and harmful content.", hint: "schützt vor Cybermobbing", correct: true },
            { text: "Children could use the extra time to learn the capitals of every country.", hint: "", correct: false },
            { text: "Children would spend more time on education and hobbies.", hint: "mehr Zeit für Schule und Hobbys", correct: true },
            { text: "Phone companies would have to design special phones for adults only.", hint: "", correct: false },
            { text: "It could improve children's mental health and sleep.", hint: "bessere psychische Gesundheit", correct: true },
            { text: "Children would sleep exactly 12 hours every night without social media.", hint: "", correct: false },
          ],
        },
        {
          type: "argument-pick",
          kind: "Interaktiv · Argumente AGAINST",
          title: "Arguments AGAINST a ban",
          intro: "Which reasons really argue against a ban?",
          args: [
            { text: "It would be unfair, especially for 13- and 14-year-olds.", hint: "ungerecht für Ältere", correct: true },
            { text: "Without social media, children would forget how to read and write.", hint: "", correct: false },
            { text: "It would be very difficult to control or enforce.", hint: "schwer durchzusetzen", correct: true },
            { text: "A ban would make social media more exciting and desirable for adults.", hint: "", correct: false },
            { text: "Children might lose contact with friends and miss important information.", hint: "Kontaktverlust zu Freunden", correct: true },
            { text: "Children use social media mainly to remind each other about homework.", hint: "", correct: false },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "One sentence for each side",
          intro: "Use a good argument from the tasks above to finish each sentence.",
          starters: [
            "Firstly, one reason FOR a ban is that …",
            "However, one reason AGAINST a ban is that …",
          ],
          help: "Tip: no “will” after “if” — and start each sentence with a capital letter.",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Build your paragraphs",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "paragraph-builder",
          kind: "Schreiben · Absatz 1",
          title: "Paragraph 1 — Introduction",
          intro: "Complete each sentence. Tap “Show example” if you need a model.",
          paragraph: {
            title: "Introduction",
            goal: "Introduce the topic and say there are two sides.",
            sentences: [
              { label: "Sentence 1 — Set the scene", starter: "Nowadays,", placeholder: "how is social media used by young people today…", hint: "Heutzutage…", example: "Nowadays, social media platforms are used by millions of children every day." },
              { label: "Sentence 2 — The FOR side", starter: "Some people think that", placeholder: "why some support a ban…", hint: "Manche Menschen denken, dass…", example: "Some people think that banning social media could protect children from harmful content." },
              { label: "Sentence 3 — The AGAINST side", starter: "However, others argue that", placeholder: "why others are against a ban…", hint: "Andere sind der Meinung, dass…", example: "However, others argue that a ban would be unfair and very difficult to enforce." },
              { label: "Sentence 4 — The question", starter: "So, should", placeholder: "write the topic as a question…", hint: "Also, sollte…?", example: "So, should social media be banned for children under 15?" },
            ],
          },
        },
        {
          type: "paragraph-builder",
          kind: "Schreiben · Absatz 2",
          title: "Paragraph 2 — Arguments For",
          intro: "Give two or three reasons why a ban could be a good idea.",
          paragraph: {
            title: "Arguments For",
            goal: "Give 2–3 reasons why a ban could be a good idea.",
            sentences: [
              { label: "Sentence 1 — First argument", starter: "Firstly,", placeholder: "your first reason FOR a ban…", hint: "Erstens,…", example: "Firstly, a ban would protect children from cyberbullying and inappropriate content online." },
              { label: "Sentence 2 — Explain / example", starter: "This means that", placeholder: "explain why this matters…", hint: "Das bedeutet, dass…", example: "This means that children would be safer and less likely to be harmed by strangers." },
              { label: "Sentence 3 — Second argument", starter: "In addition,", placeholder: "another reason FOR a ban…", hint: "Außerdem,…", example: "In addition, children would have more time for schoolwork, reading, and outdoor activities." },
            ],
          },
        },
        {
          type: "paragraph-builder",
          kind: "Schreiben · Absatz 3",
          title: "Paragraph 3 — Arguments Against",
          intro: "Give two or three reasons why a ban might not be a good idea.",
          paragraph: {
            title: "Arguments Against",
            goal: "Give 2–3 reasons why a ban might not be a good idea.",
            sentences: [
              { label: "Sentence 1 — First counter-argument", starter: "However,", placeholder: "your first reason AGAINST a ban…", hint: "Allerdings,…", example: "However, a complete ban would be very difficult to enforce, as children could use other devices." },
              { label: "Sentence 2 — Explain / example", starter: "Furthermore,", placeholder: "add more detail or an example…", hint: "Außerdem / Darüber hinaus,…", example: "Furthermore, many teenagers use social media to stay in contact with friends and family." },
              { label: "Sentence 3 — Second counter-argument", starter: "On the other hand,", placeholder: "another reason against…", hint: "Andererseits,…", example: "On the other hand, a ban could be seen as unfair to 13- and 14-year-olds who are almost adults." },
            ],
          },
        },
        {
          type: "paragraph-builder",
          kind: "Schreiben · Absatz 4",
          title: "Paragraph 4 — Conclusion",
          intro: "Sum up both sides and give your own clear opinion.",
          paragraph: {
            title: "Conclusion",
            goal: "Sum up both sides and give your own clear opinion.",
            sentences: [
              { label: "Sentence 1 — Sum up", starter: "To sum up,", placeholder: "briefly mention both sides…", hint: "Zusammenfassend,…", example: "To sum up, there are strong arguments both for and against banning social media for children." },
              { label: "Sentence 2 — Your opinion", starter: "In my opinion,", placeholder: "what YOU think is best…", hint: "Meiner Meinung nach,…", example: "In my opinion, a complete ban is too extreme, but stricter rules and parental controls are needed." },
              { label: "Sentence 3 — Final statement", starter: "I believe that", placeholder: "a confident final thought…", hint: "Ich glaube, dass…", example: "I believe that educating children about online safety is more effective than a total ban." },
            ],
          },
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Write it all",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Your written discussion",
          intro:
            "Now put it all together into one written discussion of 120–150 words, in four clear paragraphs. Use your sentences from Step 3 as a guide.",
          min: 120,
          max: 150,
          placeholder:
            "Should social media be banned for children under 15?\n\nNowadays, …",
          checklist: [
            "I wrote 4 paragraphs.",
            "I gave arguments for and against.",
            "I used linking words (Firstly, However, …).",
            "I wrote my own opinion.",
            "I checked my spelling.",
            "My discussion has about 120–150 words.",
          ],
          help: "Prefer a different topic? You may also write about AI for homework or later school start times.",
        },
      ],
    },
  ],
};
