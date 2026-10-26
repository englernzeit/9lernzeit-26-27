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
  { icon: "💡", en: "Choose a project idea for your school.", de: "Wähle eine Projektidee für deine Schule." },
  { icon: "📝", en: "Plan it and find good reasons.", de: "Plane sie und finde gute Gründe." },
  { icon: "🗣️", en: "Practise: present your idea out loud.", de: "Übe: Stell deine Idee laut vor." },
  { icon: "🎭", en: "Step 4: with a partner, write and present a 2-minute dialogue — decide together!", de: "Step 4: Schreibt zu zweit einen 2-Minuten-Dialog, präsentiert ihn — und entscheidet gemeinsam!" },
];

const START = (de) => ({
  type: "listen-prep",
  kind: "Sprechen · Vorbereitung",
  title: "Your speaking week",
  intro: "Your school is planning a project week against discrimination. Which project should it be? You and a partner decide — in English!",
  ...(de && { introDe: "Eure Schule plant eine Projektwoche gegen Diskriminierung. Welches Projekt soll es werden? Du und dein Partner entscheidet — auf Englisch!" }),
  picture: SCENE,
  pictureAlt: "Two teenagers talking in a town square",
  show: "Speaking test",
  ...(de && { showDe: "Im Sprechtest sprecht ihr zu zweit 4–6 Minuten." }),
  speakers: [
    { icon: "🙋‍♀️", name: "You", role: "bring your own project idea", ...(de && { roleDe: "du bringst deine eigene Projektidee mit" }) },
    { icon: "🙋‍♂️", name: "Your partner", role: "brings a different idea", ...(de && { roleDe: "dein Partner bringt eine andere Idee mit" }) },
  ],
  topic: "You talk, try to convince each other — and agree on ONE project for your school.",
  ...(de && { topicDe: "Ihr sprecht, versucht euch zu überzeugen — und einigt euch auf EIN Projekt für eure Schule." }),
  words: LESSON_WORDS,
  plan: WEEK_PATH.map((p) => (de ? p : { icon: p.icon, en: p.en })),
  labels: {
    who: ["What is the speaking test?", de ? "Was ist der Sprechtest?" : ""],
    words: ["The words of this lesson", de ? "Tippe auf eine Karte: Du hörst das Wort und siehst es auf Deutsch." : "Tap a card to hear the word and see it in German."],
    plan: ["Your way through the week", de ? "So läuft die Woche" : ""],
  },
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
const MOVES_LE = MOVES.map((m) => ({ ...m, phrases: m.phrases.slice(0, 2) }));
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
  { icon: "🧠", en: "Where prejudice comes from", de: "Woher Vorurteile kommen", idea: "e.g. Why do people judge others by their name, clothes or accent?" },
  { icon: "📣", en: "A campaign for our school", de: "Eine Kampagne für unsere Schule", idea: "e.g. a “Nobody eats alone” week with posters and buddies" },
  { icon: "🌍", en: "Interviews with people who moved here", de: "Interviews mit Zugezogenen", idea: "e.g. ask a neighbour or a teacher about their first months here" },
  { icon: "📋", en: "A survey in our year", de: "Eine Umfrage im Jahrgang", idea: "e.g. “Have you ever felt left out?” — show the answers in a graph" },
  { icon: "🔤", en: "The story of one word", de: "Die Geschichte eines Wortes", idea: "e.g. a word that hurts: where it comes from and why we stop using it" },
];
const FORMATS = [
  { icon: "🖼️", en: "A poster for the main corridor", de: "ein Poster für den Flur" },
  { icon: "🎬", en: "A 60-second film", de: "ein 60-Sekunden-Film" },
  { icon: "🎤", en: "A song or a rap", de: "ein Song oder Rap" },
  { icon: "📊", en: "A survey with a graph", de: "eine Umfrage mit Grafik" },
  { icon: "📷", en: "A photo series", de: "eine Fotoserie" },
  { icon: "🎙️", en: "An interview with somebody from outside school", de: "ein Interview mit jemandem von außerhalb" },
];
const TOPICS_EN = TOPICS.map(({ de, ...t }) => t);
const FORMATS_EN = FORMATS.map(({ de, ...f }) => f);

const PLAN_INTRO =
  "Your school is planning a project week against discrimination. Choose ONE topic and ONE way of doing it — look at the examples for ideas. Then fill in your plan. This is YOUR idea for the talk with your partner.";

const SAY_IT_LINES = [
  "I gave a reason for every idea.",
  "I asked my partner something at least twice.",
  "I used at least two phrases from the four moves.",
  "I spoke for the whole time with no long pause.",
  "I said what I think, not only what the box says.",
];

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
  { who: "A", stage: "Start the talk", hint: "Say hello and ask for B's idea.", hintDe: "Begrüße B und frag nach der Idee.", phrases: ["Hi! Our school is planning a project week.", "What's your idea?"] },
  { who: "B", stage: "Present your idea", hint: "Your project + one reason.", hintDe: "Dein Projekt + ein Grund.", phrases: ["I'd like to make …", "I think we should …, because …"] },
  { who: "A", stage: "React and present your idea", hint: "React, then your project + one reason.", hintDe: "Reagiere, dann dein Projekt + ein Grund.", phrases: ["That's a good point.", "My idea is …", "The best thing about my idea is …"] },
  { who: "B", stage: "Ask back", hint: "Ask A a question about the idea.", hintDe: "Stell A eine Frage zur Idee.", phrases: ["What do you need for that?", "Who would do what?", "How long would it take?"] },
  { who: "A", stage: "Answer and give another reason", hint: "Answer the question — then one more reason.", hintDe: "Beantworte die Frage — dann noch ein Grund.", phrases: ["We need …", "And there is one more thing: …"] },
  { who: "B", stage: "Disagree politely", hint: "Say what you don't like — and your best argument.", hintDe: "Sag, was dir nicht gefällt — und dein bestes Argument.", phrases: ["I see what you mean, but …", "That may be true, but …", "The main reason is …"] },
  { who: "A", stage: "Try to convince B", hint: "Make your idea sound great.", hintDe: "Lass deine Idee toll klingen.", phrases: ["Imagine …", "Everybody could …", "What do you think?"] },
  { who: "B", stage: "Suggest a decision", hint: "Choose one idea — or combine both.", hintDe: "Wähle eine Idee — oder verbindet beide.", phrases: ["How about …?", "Let's combine our ideas: …", "OK, you have convinced me."] },
  { who: "A", stage: "Agree together", hint: "Say what you both decided.", hintDe: "Sag, was ihr entschieden habt.", phrases: ["Great! So we agree on …", "That's a deal!"] },
  { who: "B", stage: "Close the talk", hint: "The first step — and goodbye.", hintDe: "Der erste Schritt — und Tschüss.", phrases: ["Let's start on …", "I'll …, and you …", "See you!"] },
];

export default {
  title: "Keep Talking",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Idee wählen, Gründe finden, sprechen — mit Hilfe",
      accent: "coral",
      layout: "slide",
      cards: [
        START(true),
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          introDe: "Eure Schule plant eine Projektwoche gegen Diskriminierung. Wähle EIN Thema und EINE Umsetzung — die Beispiele helfen dir. Dann füll deinen Plan aus. Das ist DEINE Idee für das Gespräch.",
          topics: TOPICS,
          formats: FORMATS,
          starters: ["Why this one? Because …", "We need …", "It takes … (days / lessons)"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          prefix: "Tool",
          intro: "With these phrases you convince your partner and decide together. Tap a phrase to hear it.",
          introDe: "Mit diesen Sätzen überzeugst du deinen Partner und ihr entscheidet gemeinsam. Tippe auf einen Satz — du hörst ihn.",
          moves: CONVINCE.map((m) => ({ ...m, phrases: m.phrases.slice(0, 3) })),
        },
        {
          type: "written",
          kind: "Sprechen · Argumente",
          title: "My reasons",
          intro: "Why is YOUR project good for your school? Write two reasons.",
          introDe: "Warum ist DEIN Projekt gut für eure Schule? Schreib zwei Gründe.",
          example: { title: "Example", text: "Our school needs my project, because new students often feel alone. Another reason is that a poster stays on the wall all year." },
          starters: ["Our school needs my project, because …", "Another reason is …"],
          help: "Hilfe: need = brauchen · because = weil · another reason = ein weiterer Grund",
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "These four moves keep a conversation going. Tap a phrase to hear it.",
          introDe: "Mit diesen vier Zügen läuft ein Gespräch weiter. Tippe auf einen Satz — du hörst ihn.",
          moves: MOVES_LE,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Read (or tap to hear) each sentence. Which move is it? Tap the right picture.",
          introDe: "Lies jeden Satz (oder tippe darauf und hör ihn). Welcher Zug ist das? Tippe auf das richtige Bild.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE_LE,
        },
        {
          type: "written",
          kind: "Sprechen · leicht",
          title: "Make it longer",
          intro: "Your partner asks: “Which project should our class do?” Make each short answer longer: add because + a reason.",
          introDe: "Dein Partner fragt: „Welches Projekt soll unsere Klasse machen?“ Mach jede kurze Antwort länger: because (weil) + ein Grund.",
          example: LONGER_EXAMPLE,
          starters: ["“Yes.” → Yes, I like it, because …", "“No.” → No, I don't think so, because …", "“A poster.” → A poster is a good idea, because …"],
          help: "Und dann zurückfragen: What do you think? · And you? — Hilfe: I like it = ich finde es gut · I don't think so = das glaube ich nicht",
        },
        {
          type: "written",
          kind: "Sprechen · Selbstcheck",
          title: "Now say it — 1 minute",
          intro: "Present YOUR idea out loud for one minute — to a partner or to the mirror. Then tick the list.",
          introDe: "Stell DEINE Idee eine Minute lang laut vor — einem Partner oder vor dem Spiegel. Dann hake die Liste ab.",
          lines: ["I said my idea.", "I gave two reasons.", "I asked a question: What do you think?"],
          checklist: true,
          timer: { seconds: 60, label: "Talk for one minute", labelDe: "Sprich eine Minute am Stück." },
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Bewerte jede Idee, wähle die beste — und schreib, warum.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …"],
          help: "Hilfe: Dein Partner sagt im Test fast nichts. Idee 1 = selbst weiterreden · Idee 2 = kurze offene Fragen stellen und warten · Idee 3 = vorher die Themen aufteilen.",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Talking to you",
          introDe: "Mit wem kannst du leicht reden — und warum? Schreib ein oder zwei Sätze.",
          intro: "Who is easy for you to talk to — and why? Write one or two sentences.",
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
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          topics: TOPICS_EN,
          formats: FORMATS_EN,
          starters: ["Why this one? (two reasons):", "What we need:", "Who does what:", "How long it takes:"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          prefix: "Tool",
          intro: "Use these phrases to convince your partner and to agree on one project. Tap a phrase to hear it.",
          moves: CONVINCE,
        },
        {
          type: "written",
          kind: "Sprechen · Argumente",
          title: "My arguments",
          intro: "Why should the school choose YOUR project? Write three arguments for the talk with your partner.",
          starters: ["Our school needs this project, because …", "Another reason is …", "Imagine …"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "Tap a phrase to hear it. Use at least one phrase from every move in your talk.",
          moves: MOVES,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Which move does each sentence make? Tap the right picture.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: "Your partner asks: “Which project should our class do?” Make each short answer longer — with a reason AND a question back.",
          example: LONGER_EXAMPLE,
          starters: ["“No.” → …", "“A poster.” → …", "“I don't know.” → …", "“Maybe.” → …"],
        },
        {
          type: "written",
          kind: "Sprechen · Selbstcheck",
          title: "Now say it — 2 minutes",
          intro: "Present your plan out loud for two minutes without stopping — record yourself on your phone if you like. Then tick the list.",
          lines: SAY_IT_LINES,
          checklist: true,
          timer: { seconds: 120, label: "Talk for two minutes", labelDe: "Sprich zwei Minuten am Stück." },
        },
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Rate every idea, pick the best one, then say why it beats the others.",
          situation: PROBLEM.situation,
          ideas: PROBLEM.ideas,
          starters: ["Idea ___ is best, because …", "The other ideas are not as good, because …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "When a talk stops",
          intro: "What do you do when a conversation suddenly stops? Write two sentences.",
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
        {
          type: "plan-builder",
          kind: "Sprechen · Deine Idee",
          title: "Choose your project",
          intro: PLAN_INTRO,
          topics: TOPICS_EN,
          formats: FORMATS_EN,
          starters: ["Why this one? (two reasons):", "What we need:", "Who does what:", "How long it takes:", "What could go wrong — and what we do then:"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Überzeugen",
          title: "Convince — and decide together",
          prefix: "Tool",
          intro: "Use these phrases to convince your partner and to agree on one project. Tap a phrase to hear it.",
          moves: CONVINCE,
        },
        {
          type: "written",
          kind: "Sprechen · Argumente",
          title: "My arguments — and the other side",
          intro: "Write three arguments for YOUR project — and answer one argument your partner might use against it.",
          starters: ["Our school needs this project, because …", "Another reason is …", "Imagine …", "Some people might say … , but …"],
        },
        {
          type: "talk-moves",
          kind: "Sprechen · Die vier Züge",
          title: "The four moves",
          intro: "Tap a phrase to hear it. In the test, use every move at least once.",
          moves: MOVES,
        },
        {
          type: "move-pick",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Which move does each sentence make? Tap the right picture.",
          moves: MOVE_BUTTONS,
          items: WHICH_MOVE,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: "Your partner asks: “Which project should our class do?” Make each short answer longer — with a reason AND a question back.",
          example: LONGER_EXAMPLE,
          starters: ["“No.” → …", "“A poster.” → …", "“I don't know.” → …", "“Maybe.” → …"],
        },
        {
          type: "written",
          kind: "Sprechen · Selbstcheck",
          title: "Now say it — 3 minutes",
          intro: "Present your plan out loud for three minutes without stopping — record yourself on your phone if you like. Then tick the list.",
          lines: SAY_IT_LINES,
          checklist: true,
          timer: { seconds: 180, label: "Talk for three minutes", labelDe: "Sprich drei Minuten am Stück — ohne lange Pause." },
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
          title: "A good talk",
          intro: "What makes a conversation really good? Write two sentences with an example.",
          starters: ["A conversation is good when …", "For example, …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge (partner work) ============ */
    {
      step: 4,
      subtitle: "Challenge · Partnerarbeit: euer 2-Minuten-Dialog",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "dialogue-writer",
          kind: "Partnerarbeit · Challenge",
          title: "Which project should our school do?",
          intro:
            "Work with a partner. You each bring your own project idea from Steps 1–3. Write a dialogue of about two minutes: present both ideas, ask questions, try to convince each other — and decide together. Then listen to it, rehearse it and present it.",
          introDe:
            "Arbeitet zu zweit. Jeder bringt seine eigene Projektidee aus Step 1–3 mit. Schreibt einen Dialog von ca. 2 Minuten: Stellt beide Ideen vor, fragt nach, versucht euch zu überzeugen — und entscheidet gemeinsam. Dann hört ihn euch an, übt ihn und präsentiert ihn.",
          turns: DIALOGUE_TURNS,
          targetWords: [180, 260],
          seconds: 120,
          help: "Tipp: Beim Präsentieren nicht ablesen — schaut euch an! Jeder Satz hat einen Grund oder eine Frage.",
        },
      ],
    },
  ],
};
