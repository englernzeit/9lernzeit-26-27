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

// ----- LE: the same task in short, simple sentences -----
const BLOG_POST_LE = {
  from: "School council · 14 March",
  subject: "A project for every class?",
  body: [
    "From September, every class makes one project against discrimination. It can be a poster, a short film or a song. It takes four lessons.",
    "Some students say: “Four lessons is too much time.” Other students say: “A project is good. We remember it.”",
    "What do you think? Write a comment!",
  ],
};

const WORDS_LE = [
  "Words for the post: ",
  { w: "project", de: "das Projekt" },
  " · ",
  { w: "discrimination", de: "die Diskriminierung (jemanden unfair behandeln)" },
  " · ",
  { w: "lesson", de: "die Unterrichtsstunde" },
  " · ",
  { w: "remember", de: "sich erinnern" },
  " · ",
  { w: "comment", de: "der Kommentar" },
  " · ",
  { w: "for", de: "dafür" },
  " · ",
  { w: "against", de: "dagegen" },
];

const FOR_AGAINST_LE = {
  groups: [
    { label: "👍 FOR", items: ["You remember a poster for a long time.", "Everybody learns about respect."] },
    { label: "👎 AGAINST", items: ["Four lessons is a lot of time.", "Some students don't want to do it."] },
  ],
};

const LINKING_LE = {
  options: ["In my opinion", "Firstly", "For example", "To sum up"],
  items: [
    { left: "___, every class should do a project.", answer: "In my opinion" },
    { left: "___, you remember a poster for a long time.", answer: "Firstly" },
    { left: "___, our poster from Year 7 is still on the wall.", answer: "For example" },
    { left: "___, the project is a good idea.", answer: "To sum up" },
  ],
};

const COMMENT_LE = {
  title: "My comment",
  goal: "Five sentences: your opinion, two reasons, one example, the end.",
  sentences: [
    { label: "Sentence 1 — Your opinion", starter: "Hi, I have read your post. In my opinion, every class", placeholder: "should / should not do the project.", hint: "Deine Meinung: should = sollte · should not = sollte nicht", example: "Hi, I have read your post. In my opinion, every class should do the project." },
    { label: "Sentence 2 — Reason 1", starter: "Firstly,", placeholder: "your first reason…", hint: "Erstens … (Tipp: Nimm ein Argument aus „For or against?“)", example: "Firstly, you remember a poster for a long time." },
    { label: "Sentence 3 — Reason 2", starter: "Secondly,", placeholder: "your second reason…", hint: "Zweitens …", example: "Secondly, everybody learns about respect." },
    { label: "Sentence 4 — An example", starter: "For example,", placeholder: "something from your class or school…", hint: "Zum Beispiel … (aus deiner Klasse / Schule)", example: "For example, our class made a poster about friendship and it is still in the classroom." },
    { label: "Sentence 5 — The end", starter: "To sum up, I think", placeholder: "say your opinion again…", hint: "Zusammenfassend denke ich … (Sag deine Meinung noch einmal.)", example: "To sum up, I think the project is a good idea." },
  ],
};

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
          intro: "Read the post from the school council. Tap the words if you need help.",
          introDe: "Die Schülervertretung fragt: Soll jede Klasse ein Projekt gegen Diskriminierung machen (z. B. ein Poster)? Du schreibst deine Meinung als Kommentar.",
          paragraphs: [WORDS_LE],
          incoming: BLOG_POST_LE,
          help: "So geht's: 1) sortieren — 2) Verbindungswörter — 3) deinen Kommentar Satz für Satz schreiben.",
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "For or against?",
          introDe: "Ist das ein Argument FÜR (for) oder GEGEN (against) das Projekt? Sortiere, dann Check.",
          intro: "Is it FOR or AGAINST the project? Sort the four sentences, then Check.",
          groups: FOR_AGAINST_LE.groups,
          help: "Hilfe: remember = sich erinnern · a long time = lange · everybody = alle · a lot of time = viel Zeit · want = wollen",
        },
        {
          type: "match-up",
          kind: "Interaktiv · Verbindungswörter",
          title: "Linking words",
          introDe: "Welches Verbindungswort passt in welchen Satz? Jedes Wort nur einmal. Dann Check.",
          intro: "Which linking word fits? Use each word once. Then Check.",
          options: LINKING_LE.options,
          items: LINKING_LE.items,
          help: "Hilfe: In my opinion = Meiner Meinung nach · Firstly = Erstens · For example = Zum Beispiel · To sum up = Zusammenfassend",
        },
        {
          type: "paragraph-builder",
          kind: "Schreiben · Satz für Satz",
          title: "Write your comment",
          introDe: "Schreib deinen Kommentar in fünf Sätzen. Die Satzanfänge stehen schon da. Brauchst du Hilfe? Tippe auf „Show example“.",
          intro: "Write your comment in five sentences. The starters are already there. Tap “Show example” if you need help.",
          paragraph: COMMENT_LE,
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Your class project",
          introDe: "Was würdest du mit deiner Klasse gern machen — ein Poster, einen Film oder ein Lied? Schreib ein oder zwei Sätze.",
          intro: "What would you like to make with your class — a poster, a film or a song? Write one or two sentences.",
          starters: ["I would like to make a … , because …"],
          help: "Hilfe: I would like to = ich würde gern · make = machen · because = weil",
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
        {
          type: "written",
          kind: "Offene Frage",
          title: "Your best argument",
          intro: "Which argument in your comment is the strongest one? Write two sentences.",
          starters: ["My strongest argument is …", "It is strong, because …"],
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
        {
          type: "written",
          kind: "Offene Frage",
          title: "Read it again",
          intro: "Read your comment again. What would you change to make it even better? Write two sentences.",
          starters: ["I would change …", "This makes it better, because …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Make a change!",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "change-writer",
          eyebrow: "Task 1 · Writing challenge",
          title: "Make a change!",
          tagline: "Your idea. Your reasons. Your school.",
          intro:
            "Imagine you could change **one thing** about your school. What would make school life better for students? Choose one improvement and write a short comment (about **80–100 words**) to convince the headteacher that your idea is worth introducing.",
          introDe:
            "Stell dir vor, du könntest eine Sache an deiner Schule ändern. Wähle eine Idee (oder deine eigene) und schreib einen kurzen Kommentar (80–100 Wörter), der die Schulleitung überzeugt.",
          photo: "assets/images/unit2/change/change-school.webp",
          megaphone: "assets/images/unit2/change/change-megaphone.webp",
          sticky: "Small changes make a big difference!",
          corner: ["Your school,", "your voice"],
          ideas: [
            { icon: "assets/images/unit2/change/change-idea-sofa.webp", en: "More comfortable spaces to relax during breaks", de: "gemütliche Pausenräume" },
            { icon: "assets/images/unit2/change/change-idea-trees.webp", en: "More green spaces in the schoolyard", de: "mehr Grün auf dem Schulhof" },
            { icon: "assets/images/unit2/change/change-idea-clock.webp", en: "Longer breaks between lessons", de: "längere Pausen" },
            { icon: "assets/images/unit2/change/change-idea-books.webp", en: "A quieter room for studying", de: "ein ruhiger Lernraum" },
            { icon: "assets/images/unit2/change/change-idea-laptop.webp", en: "More digital learning resources", de: "mehr digitale Lernmittel" },
            { icon: "assets/images/unit2/change/change-idea-bike.webp", en: "Better bike parking", de: "bessere Fahrradständer" },
          ],
          ownIdea: "Or come up with your own idea!",
          min: 80,
          max: 100,
          placeholder: "Write your comment here…",
          side: ["Be clear.", "Be convincing.", "Be yourself."],
          starters: [
            { label: "Your idea", tone: "yellow", items: ["I think our school should …", "I suggest …", "It would be great if …"] },
            { label: "Why we need it", tone: "blue", items: ["This is important because …", "It would help …", "It would solve …"] },
            { label: "Your reasons", tone: "pink", items: ["Firstly, …", "Furthermore, …", "For example, …"] },
            { label: "Conclusion", tone: "green", items: ["To sum up, …", "For these reasons, …", "I hope you will …"] },
          ],
          checks: ["Have you explained your idea?", "Have you given at least two reasons?", "Have you included an example?", "Have you finished with a clear request?"],
          footer: "Your school needs your voice!",
        },
      ],
    },
  ],
};
