/**
 * Respect & Community (Unit 2) — Writing: a comment on a school blog.
 *
 * Built from the LE / G-Kurs / E-Kurs source (05_Writing_*). The school
 * council asks whether every class should have to do one project against
 * discrimination. The learner collects arguments, sorts them, joins them
 * with six linking words, and writes a comment with a checklist.
 *
 * Step 1 LE (short, scaffolded) · Step 2 G-Kurs · Step 3 E-Kurs (180
 * words, full checklist) · Step 4 challenge: argue the other side.
 */

const BLOG_POST = {
  from: "School council · 14 March",
  subject: "One project for every class — or one lesson lost?",
  body: [
    "From September every class has to do one project against discrimination: a poster, a short film, a song, a survey — the class decides. It takes four lessons.",
    "Some of you say four lessons are four lessons too many, and that respect cannot be taught in a project week. Others say that nothing in school has ever changed without one.",
    "Tell us what you think. We read every comment before the vote on 2 May.",
  ],
};

const GLOSS_INTRO = [
  "The school council wants every class to make a project against discrimination. Some say it only fights ",
  { w: "peer pressure", de: "der Gruppenzwang" },
  " and the ",
  { w: "influence", de: "der Einfluss" },
  " of a few loud voices. Be ",
  { w: "honest", de: "ehrlich" },
  " about what you think — don't ",
  { w: "be ashamed of", de: "sich schämen für" },
  " your opinion or ",
  { w: "be embarrassed", de: "verlegen sein" },
  " to disagree with a ",
  { w: "peer", de: "Gleichaltrige/r" },
  " or a ",
  { w: "classmate", de: "Mitschüler/in" },
  ". Just say it politely, so you do not ",
  { w: "fall out with", de: "sich zerstreiten mit" },
  " anybody.",
];

const FOR_AGAINST = {
  groups: [
    {
      label: "👍 FOR the project",
      items: [
        "You remember what you made yourself far longer than what you were told.",
        "A poster on the wall still speaks in July; a lesson is over at 9.45.",
        "Everybody does it, so nobody can say “that does not concern me”.",
        "Younger students see that the older ones take it seriously.",
      ],
    },
    {
      label: "👎 AGAINST the project",
      items: [
        "Four lessons are four lessons that are missing somewhere else.",
        "Classes that do not want to do it will hand in something they do not mean.",
      ],
    },
  ],
};

const LINKING = {
  options: ["In my opinion", "On the one hand", "On the other hand", "Firstly", "For example", "To sum up"],
  items: [
    { left: "___, every class should do the project.", answer: "In my opinion" },
    { left: "___, four lessons really are a lot of time.", answer: "On the one hand" },
    { left: "___, those four lessons are the only ones all year about how we treat each other.", answer: "On the other hand" },
    { left: "___, I have an argument that nobody can answer: you remember what you made yourself.", answer: "Firstly" },
    { left: "___, our class made a poster in Year 7 and it is still on the wall by room 114.", answer: "For example" },
    { left: "___, the project costs little and it stays.", answer: "To sum up" },
  ],
};

const PHRASES = {
  sections: [
    { label: "Say what you think", accent: "coral", pairs: [["In my opinion, …", "Meiner Meinung nach …"], ["I (definitely) think that …", "Ich denke (auf jeden Fall), dass …"], ["I really don't think that …", "Ich denke wirklich nicht, dass …"]] },
    { label: "Weigh it up", accent: "olive", pairs: [["On the one hand, …", "Einerseits …"], ["On the other hand, …", "Andererseits …"], ["That may be true, but …", "Das mag stimmen, aber …"]] },
    { label: "Order your reasons", accent: "slate", pairs: [["Firstly, … Secondly, …", "Erstens … Zweitens …"], ["And there is one more thing: …", "Und da ist noch etwas: …"]] },
    { label: "Give an example", accent: "teal", pairs: [["For example, …", "Zum Beispiel …"], ["In my experience, …", "Meiner Erfahrung nach …"], ["Last year in our class, …", "Letztes Jahr in unserer Klasse …"]] },
    { label: "Finish", accent: "ochre", pairs: [["To sum up, …", "Zusammenfassend …"], ["That is why I think …", "Deshalb denke ich …"], ["So my answer is …", "Meine Antwort lautet also …"]] },
  ],
};

const LINK_CHIPS = [
  { n: "01", label: "In my opinion, …" },
  { n: "02", label: "On the one hand, …" },
  { n: "03", label: "On the other hand, …" },
  { n: "04", label: "Firstly, … Secondly, …" },
  { n: "05", label: "For example, …" },
  { n: "06", label: "To sum up, …" },
];

const PROBLEM = {
  situation: "Your class has to decide on its project. Half want to make a film; the other half say nobody will watch a school film.",
  ideas: [
    "make the film anyway and show it in assembly, not on a website.",
    "make something that stays on a wall instead — a poster or a photo series.",
    "make a 60-second film, short enough that people really watch it.",
  ],
};

export default {
  title: "Blog Comment",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Sammeln, ordnen, schreiben — mit Hilfe",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Schreiben · LE",
          title: "The blog post you answer",
          paragraphs: [GLOSS_INTRO],
          incoming: BLOG_POST,
          highlight: true,
          help: "Reihenfolge: erst sammeln, dann ordnen, dann mit Verbindungswörtern verbinden — und dann schreiben.",
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "For or against?",
          intro: "Sort each argument under FOR or AGAINST the project, then Check.",
          groups: FOR_AGAINST.groups,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Verbindungswörter",
          title: "Linking words",
          intro: "Match each linking word to the sentence where it fits. Each word is used once. Then Check.",
          options: LINKING.options,
          items: LINKING.items,
        },
        {
          type: "essay-editor",
          kind: "Schreiben · leicht",
          title: "Write your comment",
          intro: "Write your comment on the blog (about 80 words). Start with the sentence below and give at least two reasons.",
          min: 70,
          max: 120,
          placeholder: "Hi, I have read your post and I think …",
          chips: LINK_CHIPS,
          checklist: [
            "I started with “Hi, I have read your post and I think …”.",
            "I give at least two reasons.",
            "I used at least two different linking words.",
            "My last sentence says what I think.",
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Argumente ordnen und verbinden",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Schreiben · G-Kurs",
          title: "The blog post you answer",
          paragraphs: [GLOSS_INTRO],
          incoming: BLOG_POST,
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "For or against?",
          intro: "Sort each argument under FOR or AGAINST, then Check. Think of one reason of your own too.",
          groups: FOR_AGAINST.groups,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Verbindungswörter",
          title: "Linking words — the same six every time",
          intro: "Match each linking word to its sentence. Each word is used once. Then Check.",
          options: LINKING.options,
          items: LINKING.items,
        },
        {
          type: "phrase-reference",
          kind: "Words · Useful phrases",
          title: "Useful phrases — take them into your text",
          sections: PHRASES.sections,
        },
        {
          type: "essay-editor",
          kind: "Schreiben · G-Kurs",
          title: "Write your comment",
          intro: "Write your comment on the blog (120–150 words). Start with the given sentence, give two reasons with one example, and finish with your opinion.",
          min: 120,
          max: 170,
          placeholder: "Hi, I have read your post and I think …",
          chips: LINK_CHIPS,
          checklist: [
            "I wrote the opening sentence you were given.",
            "I give at least two reasons, not one reason twice.",
            "One of my reasons has an example.",
            "I used at least four different linking words.",
            "My last sentence says what I think, not something new.",
          ],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Ein Kommentar ab 180 Wörtern",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Schreiben · E-Kurs",
          title: "The blog post you answer",
          paragraphs: [GLOSS_INTRO],
          incoming: BLOG_POST,
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "For or against?",
          intro: "Sort each argument, then Check. For the test, add one strong reason of your own.",
          groups: FOR_AGAINST.groups,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Verbindungswörter",
          title: "Linking words — the same six every time",
          intro: "Match each linking word to its sentence. Each word is used once. Then Check.",
          options: LINKING.options,
          items: LINKING.items,
        },
        {
          type: "phrase-reference",
          kind: "Words · Useful phrases",
          title: "Useful phrases — take them into your text",
          sections: PHRASES.sections,
        },
        {
          type: "essay-editor",
          kind: "Schreiben · E-Kurs",
          title: "Write your comment",
          intro: "Write your comment on the blog — at least 180 words. Start with the given sentence, weigh the arguments, use linking words, and answer the strongest argument against your own position.",
          min: 180,
          max: 260,
          placeholder: "Hi, I have read your post and I think …",
          chips: LINK_CHIPS,
          checklist: [
            "I wrote the opening sentence you were given.",
            "I have at least 180 words. I counted them.",
            "I give at least two reasons, not one reason twice.",
            "One of my reasons has an example.",
            "I used at least four different linking words.",
            "My last sentence says what I think, not something new.",
            "I answer the strongest argument against me.",
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
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Argue the other side",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Now argue the other side",
          intro:
            "You have written your own opinion. Now write a second, shorter comment (about 100 words) that argues the OPPOSITE — as honestly and as convincingly as you can. Writing the side you disagree with is the best way to find the weak spot in your own.",
          min: 80,
          max: 140,
          placeholder: "Actually, there is a strong case for the other side. …",
          chips: LINK_CHIPS,
          checklist: [
            "I argue the opposite of my first comment.",
            "I give at least two reasons for this side.",
            "I used linking words to join my ideas.",
            "I stayed polite — I did not attack anybody.",
          ],
          help: "Tipp: „That may be true, but …“ und „On the other hand, …“ helfen dir, die andere Seite stark zu machen.",
        },
      ],
    },
  ],
};
