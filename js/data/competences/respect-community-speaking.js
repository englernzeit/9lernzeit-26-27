/**
 * Respect & Community (Unit 2) — Speaking: "Keep Talking".
 *
 * Built from the LE / G-Kurs / E-Kurs source (06_Speaking_*). The exam
 * task: "Your school is planning a project week against discrimination."
 * Every student chooses a topic and a way to do it, plans their own part
 * and finds arguments; then two partners talk, try to convince each other
 * and decide together which project the school should do.
 *
 * The week leads there step by step (same path on every level, more
 * support in LE):
 *   Start — what the speaking week is (picture, the 8 lesson words, the path)
 *   1. ideas → choose: topic tiles with a concrete example + a way to do it
 *   2. plan + arguments: my plan, my reasons, convince & decide phrases
 *   3. practise: the four moves, "make it longer", present my idea out loud
 *      (LE 1 min · G 2 min · E 3 min, as in the source)
 *   Step 4 — partner work: write a two-minute dialogue, listen, rehearse,
 *   present.
 */

const SCENE = "assets/images/unit2/speaking/scene.webp";

// The eight words of the lesson (same list on every level in the source)
const LESSON_WORDS = [
  { icon: "💬", en: "conversation", de: "das Gespräch" },
  { icon: "✅", en: "dos and don'ts", de: "was man tun und lassen sollte" },
  { icon: "🤝", en: "shake hands", de: "sich die Hand geben" },
  { icon: "🏆", en: "successful", de: "erfolgreich" },
  { icon: "🧍‍♂️🧍‍♀️", en: "queue", de: "die Warteschlange" },
  { icon: "👍", en: "agree on sth.", de: "sich auf etwas einigen" },
  { icon: "💡", en: "suggest sth.", de: "etwas vorschlagen" },
  { icon: "👫", en: "the two of us", de: "wir beide" },
];

// The path of the week — shown on the Start card of every level
const WEEK_PATH = [
  { icon: "💡", en: "Choose an idea.", de: "Wähle eine Idee." },
  { icon: "📝", en: "Find your reasons.", de: "Finde deine Gründe." },
  { icon: "🗣️", en: "Practise out loud.", de: "Übe laut." },
  { icon: "🎭", en: "With a partner: write and act out a dialogue.", de: "Zu zweit: Dialog schreiben und vorspielen." },
]

const START = (de) => ({
  type: "listen-prep",
  kind: "Sprechen · Start",
  title: "Your speaking week",
  picture: SCENE,
  pictureAlt: "Two teenagers talking in a town square",
  show: "Speaking test",
  topic: "Your school plans a project week. You and a partner choose ONE project — in English!",
  ...(de && { topicDe: "Eure Schule plant eine Projektwoche. Du und dein Partner wählt EIN Projekt — auf Englisch!" }),
  plan: WEEK_PATH.map((p) => (de ? p : { icon: p.icon, en: p.en })),
  labels: { who: ["", ""], plan: ["Your week", ""] },
});

const WORDS = (de) => ({
  type: "listen-prep",
  kind: "Sprechen · Wörter",
  title: "The words of this lesson",
  words: LESSON_WORDS,
  labels: { words: ["Tap a card", de ? "Du hörst das Wort und siehst es auf Deutsch." : ""] },
});

// The four moves — picture cards; phrases are read aloud when tapped.
const MOVES = [
  {
    key: "react",
    icon: "👂",
    tone: "coral",
    name: "React",
    nameDe: "Reagieren",
    tip: "Show that you listened.",
    tipDe: "Zeig, dass du zugehört hast.",
    phrases: [["That's a good point.", "Guter Punkt."], ["Oh, really? Cool!", "Ach, wirklich? Cool!"], ["I hadn't thought of that.", "Daran hatte ich nicht gedacht."]],
  },
  {
    key: "reason",
    icon: "💡",
    tone: "olive",
    name: "Give a reason",
    nameDe: "Einen Grund nennen",
    tip: "Never just yes or no — say why.",
    tipDe: "Nie nur ja oder nein — sag, warum.",
    phrases: [["… because …", "… weil …"], ["The main reason is …", "Der Hauptgrund ist …"]],
  },
  {
    key: "ask",
    icon: "🏓",
    tone: "teal",
    name: "Ask back",
    nameDe: "Zurückfragen",
    tip: "Give the ball back to your partner.",
    tipDe: "Gib den Ball an deinen Partner zurück.",
    phrases: [["What do you think?", "Was denkst du?"], ["And you?", "Und du?"], ["Would that work for you?", "Würde das für dich passen?"]],
  },
  {
    key: "disagree",
    icon: "🤚",
    tone: "slate",
    name: "Disagree politely",
    nameDe: "Höflich widersprechen",
    tip: "Say no — but stay friendly and keep talking.",
    tipDe: "Sag nein — aber bleib freundlich und red weiter.",
    phrases: [["I see what you mean, but …", "Ich verstehe, was du meinst, aber …"], ["That may be true, but …", "Das mag stimmen, aber …"]],
  },
];
const MOVES_SHORT = MOVES.map((m) => ({ ...m, phrases: m.phrases.slice(0, 2) }));
const MOVE_BUTTONS = MOVES.map(({ key, icon, image, tone, name, nameDe }) => ({ key, icon, image, tone, name, nameDe }));

// Convince your partner — and decide together
const CONVINCE = [
  {
    key: "convince",
    icon: "📣",
    tone: "coral",
    name: "Convince",
    nameDe: "Überzeugen",
    tip: "Say why YOUR idea is the best one.",
    tipDe: "Sag, warum DEINE Idee die beste ist.",
    phrases: [["I think we should …, because …", "Ich finde, wir sollten …, weil …"], ["The best thing about my idea is …", "Das Beste an meiner Idee ist …"], ["Imagine …", "Stell dir vor …"], ["And there is one more thing: …", "Und noch etwas: …"]],
  },
  {
    key: "decide",
    icon: "🤝",
    tone: "teal",
    name: "Decide together",
    nameDe: "Gemeinsam entscheiden",
    tip: "Find ONE plan you both like.",
    tipDe: "Findet EINEN Plan, den ihr beide gut findet.",
    phrases: [["How about …?", "Wie wäre es mit …?"], ["Let's combine our ideas: …", "Lass uns unsere Ideen verbinden: …"], ["OK, you have convinced me.", "Okay, du hast mich überzeugt."], ["So we agree on …", "Also einigen wir uns auf …"]],
  },
];

const CONVINCE_SHORT = CONVINCE.map((m) => ({ ...m, phrases: m.phrases.slice(0, 3) }));

const WHICH_MOVE_LE = [
  { say: "What do you think?", de: "Was denkst du?", answer: "ask" },
  { say: "That's a good point.", de: "Guter Punkt.", answer: "react" },
  { say: "I like the poster, because it stays on the wall.", de: "Ich mag das Poster, weil es an der Wand bleibt.", answer: "reason" },
  { say: "I see what you mean, but it takes a lot of time.", de: "Ich verstehe, was du meinst, aber es braucht viel Zeit.", answer: "disagree" },
];

const WHICH_MOVE = [
  { say: "What do you think about that?", answer: "ask" },
  { say: "I see what you mean, but we only have four lessons.", answer: "disagree" },
  { say: "That's a good point.", answer: "react" },
  { say: "I'd rather do a poster, because it stays on the wall.", answer: "reason" },
  { say: "Would Friday work for you?", answer: "ask" },
  { say: "I hadn't thought of that.", answer: "react" },
];

const LONGER_EXAMPLE = {
  title: "Example",
  text: "“Yes.” → Yes, I like that idea, because everybody can join in. What would you do first?",
};

// Topics with a concrete example each, so learners can picture the project
const TOPICS = [
  { icon: "🧠", en: "Where prejudice comes from", de: "Woher Vorurteile kommen", idea: "e.g. Why do we judge people by their clothes?" },
  { icon: "📣", en: "A campaign for our school", de: "Eine Kampagne für unsere Schule", idea: "e.g. a “Nobody eats alone” week" },
  { icon: "🌍", en: "Interviews with people who moved here", de: "Interviews mit Zugezogenen", idea: "e.g. ask a teacher about their first weeks here" },
  { icon: "📋", en: "A survey in our year", de: "Eine Umfrage im Jahrgang", idea: "e.g. “Have you ever felt left out?”" },
  { icon: "🔤", en: "The story of one word", de: "Die Geschichte eines Wortes", idea: "e.g. a word that hurts — and why we stop using it" },
];
const FORMATS = [
  { icon: "🖼️", en: "A poster", de: "ein Poster" },
  { icon: "🎬", en: "A 60-second film", de: "ein 60-Sekunden-Film" },
  { icon: "🎤", en: "A song or a rap", de: "ein Song oder Rap" },
  { icon: "📊", en: "A survey with a graph", de: "eine Umfrage mit Grafik" },
  { icon: "📷", en: "A photo series", de: "eine Fotoserie" },
  { icon: "🎙️", en: "An interview", de: "ein Interview" },
];
const TOPICS_EN = TOPICS.map(({ de, ...t }) => t);
const FORMATS_EN = FORMATS.map(({ de, ...f }) => f);

const PLAN_INTRO = "Choose ONE topic and ONE way to do it. The examples help you.";

const SAY_IT_LINES = ["I gave a reason for every idea.", "I asked a question back.", "I spoke with no long pause."];

const PROBLEM = {
  situation: "In the speaking test your partner says almost nothing — four minutes, and they have answered “yes” three times.",
  ideas: [
    "keep talking yourself so there is no silence.",
    "ask short open questions — and then wait.",
    "agree before the test that you take two topics and your partner takes the other two.",
  ],
};

// Step 4 — the dialogue, turn by turn
const DIALOGUE_TURNS = [
  { who: "A", stage: "Start", stageDe: "Anfangen", hint: "Say hello and ask for B's idea.", phrases: ["Hi! Our school is planning a project week.", "What's your idea?"] },
  { who: "B", stage: "Your idea", stageDe: "Deine Idee", hint: "Your project + one reason.", phrases: ["I'd like to make …", "… because …"] },
  { who: "A", stage: "React + your idea", stageDe: "Reagieren + deine Idee", hint: "React, then your project + a reason.", phrases: ["That's a good point.", "My idea is …"] },
  { who: "B", stage: "Ask back", stageDe: "Zurückfragen", hint: "Ask A a question about the idea.", phrases: ["What do you need for that?", "How long would it take?"] },
  { who: "A", stage: "Answer", stageDe: "Antworten", hint: "Answer — and give one more reason.", phrases: ["We need …", "And there is one more thing: …"] },
  { who: "B", stage: "Disagree politely", stageDe: "Höflich widersprechen", hint: "What don't you like? Your best argument.", phrases: ["I see what you mean, but …", "The main reason is …"] },
  { who: "A", stage: "Convince", stageDe: "Überzeugen", hint: "Make your idea sound great.", phrases: ["Imagine …", "What do you think?"] },
  { who: "B", stage: "Decide", stageDe: "Entscheiden", hint: "One idea — or combine both.", phrases: ["How about …?", "Let's combine our ideas: …"] },
  { who: "A", stage: "Agree", stageDe: "Zustimmen", hint: "Say what you both decided.", phrases: ["Great! So we agree on …", "That's a deal!"] },
  { who: "B", stage: "Close", stageDe: "Abschließen", hint: "The first step — and goodbye.", phrases: ["Let's start on …", "See you!"] },
]

export default {
  title: "Keep Talking",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Idee wählen, Gründe finden, sprechen",
      accent: "coral",
      layout: "slide",
      cards: [
        START(true),
        WORDS(true),
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          introDe: "Wähle EIN Thema und EINE Umsetzung. Die Beispiele helfen dir.",
          topics: TOPICS,
          formats: FORMATS,
        },
        {
          type: "written",
          kind: "Sprechen · Gründe",
          title: "My reasons",
          intro: "Why is your project good for your school?",
          introDe: "Warum ist dein Projekt gut für eure Schule?",
          starters: ["Our school needs my project, because …", "Another reason is …"],
          help: "Hilfe: need = brauchen · because = weil",
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          intro: "Tap a phrase to hear it.",
          introDe: "Tippe auf einen Satz — du hörst ihn.",
          moves: CONVINCE_SHORT,
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "Tap a phrase to hear it.",
          introDe: "Tippe auf einen Satz — du hörst ihn.",
          moves: MOVES_SHORT,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Tap the right picture.",
          introDe: "Tippe auf das richtige Bild.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE_LE,
        },
        {
          type: "written",
          kind: "Sprechen · leicht",
          title: "Make it longer",
          intro: "Add because + a reason.",
          introDe: "Mach die Antwort länger: because (weil) + ein Grund.",
          starters: ["“Yes.” → Yes, I like it, because …", "“No.” → No, I don't think so, because …"],
          help: "Hilfe: I like it = ich finde es gut · I don't think so = das glaube ich nicht",
        },
        {
          type: "written",
          kind: "Sprechen · Üben",
          title: "Now say it — 1 minute",
          intro: "Say your idea out loud. Then tick.",
          introDe: "Sag deine Idee laut. Dann abhaken.",
          lines: ["I said my idea.", "I gave two reasons.", "I asked: What do you think?"],
          checklist: true,
          timer: { seconds: 60, label: "1 minute", labelDe: "Sprich eine Minute." },
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Bewerte jede Idee und wähle die beste.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …"],
          help: "Hilfe: Dein Partner sagt fast nichts. Was machst du?",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Talking to you",
          intro: "Who is easy for you to talk to — and why?",
          introDe: "Mit wem kannst du leicht reden — und warum?",
          starters: ["It is easy to talk to … , because …"],
          help: "Hilfe: easy = leicht · to talk to = sprechen mit",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Planen, begründen, überzeugen",
      accent: "olive",
      layout: "spread",
      cards: [
        START(false),
        WORDS(false),
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          topics: TOPICS_EN,
          formats: FORMATS_EN,
        },
        {
          type: "written",
          kind: "Sprechen · Plan",
          title: "My plan",
          intro: "Plan your project in a few words.",
          starters: ["What we need:", "Who does what:", "How long it takes:"],
        },
        {
          type: "written",
          kind: "Sprechen · Argumente",
          title: "My arguments",
          intro: "Why should the school choose YOUR project?",
          starters: ["Our school needs this project, because …", "Another reason is …", "Imagine …"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          intro: "Tap a phrase to hear it.",
          moves: CONVINCE_SHORT,
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "Tap a phrase to hear it.",
          moves: MOVES_SHORT,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Tap the right picture.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: "Add a reason AND a question back.",
          example: LONGER_EXAMPLE,
          starters: ["“No.” → …", "“A poster.” → …", "“Maybe.” → …"],
        },
        {
          type: "written",
          kind: "Sprechen · Üben",
          title: "Now say it — 2 minutes",
          intro: "Present your idea out loud. Then tick.",
          lines: SAY_IT_LINES,
          checklist: true,
          timer: { seconds: 120, label: "2 minutes", labelDe: "" },
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Rate every idea and pick the best one.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "When a talk stops",
          intro: "What do you do when a conversation suddenly stops?",
          starters: ["When a conversation stops, I …", "Another good idea is …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Überzeugen und gemeinsam entscheiden",
      accent: "slate",
      layout: "spread",
      cards: [
        START(false),
        WORDS(false),
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          topics: TOPICS_EN,
          formats: FORMATS_EN,
        },
        {
          type: "written",
          kind: "Sprechen · Plan",
          title: "My plan",
          intro: "Plan your project in a few words.",
          starters: ["What we need:", "Who does what:", "How long it takes:", "What could go wrong:"],
        },
        {
          type: "written",
          kind: "Sprechen · Argumente",
          title: "My arguments",
          intro: "Three arguments — and an answer to the other side.",
          starters: ["Our school needs this project, because …", "Another reason is …", "Imagine …", "Some people might say … , but …"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          intro: "Tap a phrase to hear it.",
          moves: CONVINCE_SHORT,
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "Tap a phrase to hear it.",
          moves: MOVES_SHORT,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Tap the right picture.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: "Add a reason AND a question back.",
          example: LONGER_EXAMPLE,
          starters: ["“No.” → …", "“A poster.” → …", "“I don't know.” → …", "“Maybe.” → …"],
        },
        {
          type: "written",
          kind: "Sprechen · Üben",
          title: "Now say it — 3 minutes",
          intro: "Present your plan out loud. Then tick.",
          lines: SAY_IT_LINES,
          checklist: true,
          timer: { seconds: 180, label: "3 minutes", labelDe: "" },
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: "Pick the best AND the weakest idea.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "A good talk",
          intro: "What makes a conversation really good?",
          starters: ["A conversation is good when …", "For example, …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge (partner work) ============ */
    {
      step: 4,
      subtitle: "Challenge · Partnerarbeit: euer Dialog",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "dialogue-writer",
          kind: "Partnerarbeit · Challenge",
          title: "Which project should our school do?",
          intro: "With a partner: present your two ideas, convince each other — and decide. About 2 minutes.",
          introDe: "Zu zweit: Stellt eure zwei Ideen vor, überzeugt euch — und entscheidet. Ca. 2 Minuten.",
          turns: DIALOGUE_TURNS,
          targetWords: [180, 260],
          seconds: 120,
        },
      ],
    },
  ],
};
