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
      { en: "topic", de: "das Thema", ex: "Choose a topic for your discussion." },
      { en: "opinion", de: "die Meinung", ex: "Give your own opinion at the end." },
      { en: "discussion", de: "die Erörterung", ex: "A written discussion has four paragraphs." },
      { en: "argument", de: "das Argument", ex: "Each side needs a strong argument." },
      { en: "advantage", de: "der Vorteil", ex: "One advantage is more free time." },
      { en: "disadvantage", de: "der Nachteil", ex: "The main disadvantage is the cost." },
      { en: "useful", de: "nützlich", ex: "Social media can be useful for school." },
      { en: "problem", de: "das Problem", ex: "Cyberbullying is a serious problem." },
      { en: "reason", de: "der Grund", ex: "Give a reason for your opinion." },
      { en: "to agree", de: "zustimmen", ex: "I agree with the first argument." },
      { en: "to disagree", de: "widersprechen / nicht zustimmen", ex: "Many teenagers disagree with a ban." },
      { en: "to ban", de: "verbieten", ex: "Some people want to ban social media." },
      { en: "to enforce", de: "durchsetzen", ex: "A ban is hard to enforce." },
      { en: "to protect", de: "schützen", ex: "Rules can protect young users." },
      { en: "to compare", de: "vergleichen", ex: "Compare both sides before you decide." },
    ],
  },

  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Wähle ein **Thema** für deine Erörterung.", en: "Choose a ___ for your discussion.", answer: "topic" },
      { de: "Gib am Ende deine eigene **Meinung**.", en: "Give your own ___ at the end.", answer: "opinion" },
      { de: "Eine schriftliche **Erörterung** hat vier Absätze.", en: "A written ___ has four paragraphs.", answer: "discussion" },
      { de: "Jede Seite braucht ein starkes **Argument**.", en: "Each side needs a strong ___.", answer: "argument" },
      { de: "Ein **Vorteil** ist mehr Freizeit.", en: "One ___ is more free time.", answer: "advantage" },
      { de: "Der größte **Nachteil** sind die Kosten.", en: "The main ___ is the cost.", answer: "disadvantage" },
      { de: "Soziale Medien können für die Schule **nützlich** sein.", en: "Social media can be ___ for school.", answer: "useful" },
      { de: "Cybermobbing ist ein ernstes **Problem**.", en: "Cyberbullying is a serious ___.", answer: "problem" },
      { de: "Nenne einen **Grund** für deine Meinung.", en: "Give a ___ for your opinion.", answer: "reason" },
      { de: "Ich **stimme** dem ersten Argument **zu**.", en: "I ___ with the first argument.", answer: "agree" },
      { de: "Viele Jugendliche **stimmen** einem Verbot **nicht zu**.", en: "Many teenagers ___ with a ban.", answer: "disagree" },
      { de: "Manche wollen soziale Medien **verbieten**.", en: "Some people want to ___ social media.", answer: "ban" },
      { de: "Ein Verbot ist schwer **durchzusetzen**.", en: "A ban is hard to ___.", answer: "enforce" },
      { de: "Regeln können junge Nutzer **schützen**.", en: "Rules can ___ young users.", answer: "protect" },
      { de: "**Vergleiche** beide Seiten, bevor du entscheidest.", en: "___ both sides before you decide.", answer: "compare" },
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
          intro: "Read this example (about 140 words, four paragraphs). Notice the linking words and how it ends with an opinion — yours should look like this.",
          paragraphs: [
            "Nowadays, social media is part of daily life for millions of children. Some people think that it should be banned for children under 15, while others strongly disagree. So, should social media be banned for young people?",
            "On the one hand, a ban could protect children from cyberbullying and harmful content. Firstly, they would be safer online. In addition, they would have more time for school, hobbies and sleep.",
            "On the other hand, a ban would be very difficult to enforce, because children could simply use other devices. Furthermore, many teenagers use social media to stay in contact with their friends, so a ban might make them feel isolated.",
            "To sum up, there are good arguments on both sides. In my opinion, a total ban is too extreme; clear rules and better education about online safety would work much better.",
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
            "Now write your own written discussion (120–150 words, four paragraphs) about a NEW question: “Should social media apps have a daily time limit for teenagers?” Use everything you practised above.",
          min: 120,
          max: 150,
          placeholder:
            "Should social media apps have a daily time limit for teenagers?\n\nNowadays, …",
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
