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

  newWords: {
    subtitle: "15 words for this unit",
    stampLabel: "DEBATE",
    words: [
      { en: "clean-up", de: "das Aufräumen / der Hausputz", ex: "Deleting all those old posts felt like a huge digital clean-up." },
      { en: "fault", de: "der Fehler / die Schuld", ex: "She insisted the argument wasn't her fault, even though she had sent the first message." },
      { en: "to message", de: "Nachrichten schicken / austauschen", ex: "They message each other hundreds of times a day, even when they're in the same room." },
      { en: "to crash (into)", de: "zusammenstoßen (mit) / einen Unfall haben", ex: "He was so busy staring at his phone that he almost crashed into a lamppost." },
      { en: "unwanted", de: "unerwünscht", ex: "Her inbox was full of unwanted messages from strangers she had never met." },
      { en: "killer", de: "der Mörder / die Mörderin", ex: "In the film, the killer tracks his victims through their own social media posts." },
      { en: "virus", de: "der Virus", ex: "One careless download and a virus had spread across every device in the house." },
      { en: "to go crazy", de: "verrückt werden", ex: "Fans went crazy when the singer finally replied to a comment." },
      { en: "to catch sth.", de: "sich anstecken / etwas einfangen", ex: "Be careful what you click, or you might catch a virus from a fake link." },
      { en: "torture", de: "die Folter", ex: "For some teenagers, a whole day without their phone feels like pure torture." },
      { en: "to return", de: "zurückkehren / zurückkommen", ex: "After deleting the app for a month, she finally decided not to return to it." },
      { en: "to step", de: "treten (einen Schritt tun)", ex: "Sometimes you just need to step away from the screen and go outside." },
      { en: "weapon", de: "die Waffe", ex: "In the wrong hands, a smartphone camera can become a real weapon." },
      { en: "fear (of)", de: "die Angst (vor)", ex: "Many young people share a constant fear of missing out on what their friends are doing." },
      { en: "addicted (to)", de: "süchtig (nach) / abhängig (von)", ex: "He didn't believe he was addicted to his phone until he tried to switch it off." },
    ],
  },

  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    // Higher level + SHUFFLED (order ≠ the word cards) so it isn't guessable.
    items: [
      { de: "Im Film findet der **Mörder** seine Opfer über deren eigene Posts.", en: "In the film, the ___ finds his victims through their own posts.", answer: "killer" },
      { de: "In den falschen Händen wird eine Handykamera zur echten **Waffe**.", en: "In the wrong hands, a phone camera becomes a real ___.", answer: "weapon" },
      { de: "Alte Posts zu löschen fühlte sich an wie ein riesiger digitaler **Hausputz**.", en: "Deleting old posts felt like a huge digital ___.", answer: "clean-up", accept: ["cleanup"] },
      { de: "Die Fans **wurden verrückt**, als der Sänger endlich antwortete.", en: "The fans went ___ when the singer finally replied.", answer: "crazy" },
      { de: "Er glaubte nicht, dass er nach seinem Handy **süchtig** war, bis er es ausschalten wollte.", en: "He didn't believe he was ___ to his phone until he tried to switch it off.", answer: "addicted" },
      { de: "Sie **schreiben** sich hundertmal am Tag, sogar im selben Raum.", en: "They ___ each other a hundred times a day, even in the same room.", answer: "message" },
      { de: "Ein ganzer Tag ohne Handy fühlt sich für manche wie reine **Folter** an.", en: "A whole day without a phone feels like pure ___ for some teens.", answer: "torture" },
      { de: "Er starrte so aufs Handy, dass er fast gegen einen Laternenpfahl **stieß**.", en: "He stared at his phone so hard that he almost ___ed into a lamppost.", answer: "crash" },
      { de: "Viele Jugendliche teilen die ständige **Angst**, etwas zu verpassen.", en: "Many young people share a constant ___ of missing out.", answer: "fear" },
      { de: "Sie behauptete, der Streit sei nicht ihre **Schuld**.", en: "She insisted the argument wasn't her ___.", answer: "fault" },
      { de: "Ein unvorsichtiger Download und ein **Virus** hatte sich überall verbreitet.", en: "One careless download and a ___ had spread everywhere.", answer: "virus" },
      { de: "Nach einem Monat ohne die App beschloss sie, nicht mehr **zurückzukehren**.", en: "After a month without the app, she decided not to ___ to it.", answer: "return" },
      { de: "Ihr Postfach war voller **unerwünschter** Nachrichten von Fremden.", en: "Her inbox was full of ___ messages from strangers.", answer: "unwanted" },
      { de: "Pass auf, was du anklickst, sonst **fängst** du dir einen Virus **ein**.", en: "Be careful what you click, or you might ___ a virus from a fake link.", answer: "catch" },
      { de: "Manchmal muss man vom Bildschirm **wegtreten** und rausgehen.", en: "Sometimes you need to ___ away from the screen and go outside.", answer: "step" },
    ],
  },

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
          kind: "Beispiel · Modelltext",
          title: "A model written discussion",
          intro: "Should schools ban mobile phones in lessons?",
          paragraphs: [
            "Nowadays, almost every student brings a mobile phone to school. Some people think that phones should be banned during lessons, while others believe they can help learning. So, should schools ban mobile phones in the classroom?",
            "On the one hand, a ban could help students concentrate. Firstly, phones are a big distraction, because messages and games pull attention away from the lesson. In addition, students would talk to each other more during the breaks.",
            "On the other hand, phones can also be useful for school. Furthermore, students can quickly look up words, take photos of the board or use learning apps. In an emergency, they can also contact their parents.",
            "To sum up, there are good arguments on both sides. In my opinion, phones should be switched off during lessons but allowed in the breaks, so that they help learning without disturbing it.",
          ],
        },
        {
          type: "text",
          kind: "Sprache · Linking words",
          title: "What are linking words?",
          intro: "The small words that were underlined in the example are called linking words (Bindewörter).",
          paragraphs: [
            [
              "Linking words join your sentences and ideas together. They make a discussion easy to follow, because they show the reader what comes next — another reason, the opposite side, or your ",
              { w: "conclusion", de: "das Fazit" },
              ".",
            ],
            [
              "Use them for different jobs:",
            ],
            [
              "• To add a reason on the SAME side: ",
              { w: "Firstly", de: "Erstens" },
              ", ",
              { w: "In addition", de: "Außerdem" },
              ", ",
              { w: "Furthermore", de: "Darüber hinaus" },
              ".",
            ],
            [
              "• To show the OPPOSITE side: ",
              { w: "However", de: "Allerdings" },
              ", ",
              { w: "On the other hand", de: "Andererseits" },
              ".",
            ],
            [
              "• To CONCLUDE and give your opinion: ",
              { w: "To sum up", de: "Zusammenfassend" },
              ", ",
              { w: "In my opinion", de: "Meiner Meinung nach" },
              ".",
            ],
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Linking words",
          title: "Choose the right linking word",
          intro: "Tap the linking word that fits each gap, then Check. Think about its job: adding, contrasting or concluding.",
          layout: "prose",
          segments: [
            "Mobile phones are a big distraction in class. ",
            { gap: 0 },
            ", students would concentrate better without them. ",
            { gap: 1 },
            ", they would talk to each other more in the breaks. ",
            { gap: 2 },
            ", phones can also be useful, because students can look up words or use learning apps. ",
            { gap: 3 },
            ", in an emergency they can contact their parents. ",
            { gap: 4 },
            ", there are good arguments on both sides. ",
            { gap: 5 },
            ", phones should be switched off in lessons but allowed in the breaks.",
          ],
          gaps: [
            { options: ["Firstly", "However"], answer: "Firstly" },
            { options: ["In addition", "On the other hand"], answer: "In addition" },
            { options: ["However", "Firstly"], answer: "However" },
            { options: ["Furthermore", "To sum up"], answer: "Furthermore" },
            { options: ["To sum up", "In addition"], answer: "To sum up" },
            { options: ["In my opinion", "Firstly"], answer: "In my opinion" },
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
          title: "Write the whole discussion",
          intro: "Finish every sentence. Together they make one complete written discussion about the ban.",
          starters: [
            "Nowadays, social media …",
            "Some people think that …",
            "However, others argue that …",
            "So, should …?",
            "Firstly, …",
            "In addition, …",
            "However, …",
            "On the other hand, …",
            "To sum up, …",
            "In my opinion, …",
          ],
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
          title: "Your own written discussion",
          intro:
            "Now write your own written discussion (120–150 words, four paragraphs) about a NEW question: “Should students be allowed to use AI like ChatGPT for their homework?” Use everything you practised above.",
          min: 120,
          max: 150,
          placeholder:
            "Should students be allowed to use AI like ChatGPT for their homework?\n\nNowadays, …",
          checklist: [
            "I wrote 4 paragraphs.",
            "I gave arguments for and against.",
            "I used linking words (Firstly, However, …).",
            "I wrote my own opinion.",
            "I checked my spelling.",
            "My discussion has about 120–150 words.",
          ],
          help: "Remember the four parts: introduction · arguments for · arguments against · your opinion.",
        },
      ],
    },
  ],
};
