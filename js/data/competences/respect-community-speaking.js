/**
 * Respect & Community (Unit 2) — Speaking: "Keep Talking".
 *
 * Built from the LE / G-Kurs / E-Kurs source (06_Speaking_*). Getting
 * ready for the speaking test: the four moves that keep a conversation
 * going (react · give a reason · ask back · disagree politely), turning
 * one-word answers into real ones, planning your own project part, and
 * saying it out loud (practice timer; no recording in the app).
 *
 * Every level is visual: picture move cards with read-aloud phrases, a
 * picture "which move?", a tile-based project planner and stopwatches.
 * Step 1 LE starts with a picture warm-up instead of a text.
 *
 * Step 1 LE · Step 2 G-Kurs (+ plan) · Step 3 E-Kurs (+ say it, problem) ·
 * Step 4 challenge: your 60-second project pitch.
 */

const SCENE = "assets/images/unit2/speaking/scene.webp";

const GLOSS_INTRO = [
  "The speaking test is a four-to-six-minute ",
  { w: "conversation", de: "das Gespräch" },
  " with a partner. Learn the ",
  { w: "dos and don'ts", de: "das, was man tun und lassen sollte" },
  ": a ",
  { w: "successful", de: "erfolgreich" },
  " talk is not a ",
  { w: "queue", de: "die Warteschlange" },
  " of yes/no answers. ",
  { w: "Suggest", de: "vorschlagen" },
  " an idea, ",
  { w: "agree on", de: "sich einigen auf" },
  " a plan, and remember it is ",
  { w: "the two of us", de: "wir beide" },
  " — give the ball back. You don't even need to ",
  { w: "shake hands", de: "sich die Hand geben" },
  "; you just need to keep it going.",
];

// The four moves — a picture card each (icon now; an illustration can be
// added later as `image`). Phrases are read aloud when tapped.
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
  text: "“Yes.” → Yes, I like that idea, because everybody can join in. What do you think?",
};

const MAKE_LONGER = {
  intro:
    "Your partner asks: “Which project should our class do?” Make each short answer longer — with a reason AND a question back.",
  starters: ["“No.” → …", "“A poster.” → …", "“I don't know.” → …", "“Maybe.” → …"],
};

const PLAN = {
  intro:
    "Your school is planning a project week against discrimination. Choose a topic and a way to do it — then fill in your plan. You will talk about it with your partner.",
  topics: [
    { icon: "🧠", en: "Where prejudice comes from", de: "Woher Vorurteile kommen" },
    { icon: "📣", en: "A campaign for our school", de: "Eine Kampagne für unsere Schule" },
    { icon: "🌍", en: "Interviews with people who moved here", de: "Interviews mit Zugezogenen" },
    { icon: "📋", en: "A survey in our year", de: "Eine Umfrage im Jahrgang" },
    { icon: "🔤", en: "The story of one word", de: "Die Geschichte eines Wortes" },
  ],
  formats: [
    { icon: "🖼️", en: "A poster", de: "ein Poster" },
    { icon: "🎬", en: "A 60-second film", de: "ein 60-Sekunden-Film" },
    { icon: "🎤", en: "A song or rap", de: "ein Song oder Rap" },
    { icon: "📊", en: "A survey with a graph", de: "eine Umfrage mit Grafik" },
    { icon: "📷", en: "A photo series", de: "eine Fotoserie" },
    { icon: "🎙️", en: "An interview", de: "ein Interview" },
  ],
  starters: ["Why this one? (two reasons):", "What we need:", "Who does what:", "How long it takes:"],
};

const SAY_IT = {
  intro:
    "Talk about your plan for three minutes without stopping — start the timer, record yourself on your phone if you like, then tick the list.",
  lines: [
    "I gave a reason for every idea.",
    "I asked my partner something at least twice.",
    "I used at least two phrases from the four moves.",
    "I spoke for the whole time with no long pause.",
    "I said what I think, not only what the box says.",
  ],
};

const PROBLEM = {
  situation: "In the speaking test your partner says almost nothing — four minutes, and they have answered “yes” three times.",
  ideas: [
    "keep talking yourself so there is no silence.",
    "ask short open questions — and then wait.",
    "agree before the test that you take two topics and your partner takes the other two.",
  ],
};

export default {
  title: "Keep Talking",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Die vier Züge eines Gesprächs — mit Bildern",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "listen-prep",
          kind: "Sprechen · LE · Vorbereitung",
          title: "The speaking test",
          intro: "Look, tap and listen — then you know what to do.",
          introDe: "Schau, tippe und hör zu — dann weißt du, was du im Sprechtest machst.",
          picture: SCENE,
          pictureAlt: "Two teenagers talking in a town square",
          show: "Speaking test",
          showDe: "Im Sprechtest sprichst du 4–6 Minuten mit einem Partner oder einer Partnerin.",
          speakers: [
            { icon: "🙋‍♀️", name: "You", role: "you talk and you listen", roleDe: "du sprichst und hörst zu" },
            { icon: "🙋‍♂️", name: "Your partner", role: "talks with you — like ping-pong 🏓", roleDe: "spricht mit dir — wie beim Tischtennis" },
          ],
          topic: "Together you plan a class project against discrimination.",
          topicDe: "Ihr plant zusammen ein Klassenprojekt gegen Diskriminierung.",
          words: [
            { icon: "💬", en: "conversation", de: "das Gespräch" },
            { icon: "🧑‍🤝‍🧑", en: "partner", de: "der Partner / die Partnerin" },
            { icon: "💡", en: "idea", de: "die Idee" },
            { icon: "🤔", en: "reason", de: "der Grund" },
            { icon: "👍", en: "agree", de: "zustimmen" },
            { icon: "👎", en: "disagree", de: "widersprechen" },
            { icon: "❓", en: "question", de: "die Frage" },
            { icon: "🎨", en: "project", de: "das Projekt" },
          ],
          plan: [
            { icon: "🏓", en: "Never only “yes” or “no”.", de: "Nie nur „ja“ oder „nein“." },
            { icon: "💡", en: "Always give a reason: … because …", de: "Nenn immer einen Grund: … weil …" },
            { icon: "↩️", en: "Ask back: What do you think?", de: "Frag zurück: Was denkst du?" },
          ],
          labels: {
            who: ["What is the speaking test?", "Was ist der Sprechtest?"],
            words: ["Words for talking", "Tippe auf eine Karte: Du hörst das Wort und siehst es auf Deutsch."],
            plan: ["Three golden rules", "Drei goldene Regeln"],
          },
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
      subtitle: "G-Kurs · Reagieren, begründen, zurückfragen",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Sprechen · G-Kurs",
          title: "The speaking test",
          image: SCENE,
          imageAlt: "Two teenagers talking in a town square",
          paragraphs: [GLOSS_INTRO],
          help: "Faustregel: nie nur „yes“ oder „no“ — immer ein Grund und eine Rückfrage.",
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
          intro: MAKE_LONGER.intro,
          example: LONGER_EXAMPLE,
          starters: MAKE_LONGER.starters,
        },
        {
          type: "plan-builder",
          kind: "Sprechen · Planen",
          title: "Plan your own part",
          intro: PLAN.intro,
          topics: PLAN.topics,
          formats: PLAN.formats,
          starters: PLAN.starters,
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
      subtitle: "E-Kurs · Planen, sprechen, am Laufen halten",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Sprechen · E-Kurs",
          title: "The speaking test",
          image: SCENE,
          imageAlt: "Two teenagers talking in a town square",
          paragraphs: [GLOSS_INTRO],
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
          intro: MAKE_LONGER.intro,
          example: LONGER_EXAMPLE,
          starters: MAKE_LONGER.starters,
        },
        {
          type: "plan-builder",
          kind: "Sprechen · Planen",
          title: "Plan your own part",
          intro: PLAN.intro,
          topics: PLAN.topics,
          formats: PLAN.formats,
          starters: [...PLAN.starters, "What could go wrong — and what we do then:"],
        },
        {
          type: "written",
          kind: "Sprechen · Selbstcheck",
          title: "Now say it — three minutes, out loud",
          intro: SAY_IT.intro,
          lines: SAY_IT.lines,
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

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Your 60-second pitch",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Kreativ · Challenge",
          title: "Pitch your project in 60 seconds",
          intro:
            "You have one minute to convince your class to choose YOUR project. Write five short sentences, then say them out loud with the timer.",
          introDe:
            "Du hast eine Minute, um deine Klasse von DEINEM Projekt zu überzeugen. Schreib fünf kurze Sätze — dann sprich sie laut und stopp die Zeit.",
          example: {
            title: "Example pitch",
            text: "Who wants a school where nobody eats lunch alone? Let's make a photo series! Firstly, it is quick, because everybody has a phone. Secondly, a photo stays on the wall all year. What do you think? So I think we should start on Monday!",
          },
          starters: [
            "1 · Start with a question: Who wants …?",
            "2 · Reason 1: Firstly, … because …",
            "3 · Reason 2: Secondly, …",
            "4 · Ask back: What do you think?",
            "5 · The end: So I think we should …",
          ],
          timer: { seconds: 60, label: "Now say it — 60 seconds", labelDe: "Jetzt laut sprechen — schaffst du es in 60 Sekunden?" },
          help: "Hilfe: Who wants …? = Wer will …? · Firstly = Erstens · Secondly = Zweitens · So I think we should … = Also finde ich, wir sollten …",
        },
      ],
    },
  ],
};
