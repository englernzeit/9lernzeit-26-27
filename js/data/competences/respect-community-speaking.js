/**
 * Respect & Community (Unit 2) — Speaking: "Keep Talking".
 *
 * Built from the LE / G-Kurs / E-Kurs source (06_Speaking_*). Getting
 * ready for the speaking test: the four moves that keep a conversation
 * going (react · give a reason · ask back · disagree politely), turning
 * one-word answers into real ones, planning your own project part, and
 * saying it out loud with a self-check (no recording in the app — the
 * learner records on their phone and ticks the list).
 *
 * Step 1 LE · Step 2 G-Kurs (+ plan) · Step 3 E-Kurs (+ say it, problem) ·
 * Step 4 challenge: your 60-second project pitch.
 */

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

const FOUR_MOVES = {
  sections: [
    { label: "React — show you heard it", accent: "coral", pairs: [["That's a good point.", "Guter Punkt."], ["I hadn't thought of that.", "Daran hatte ich nicht gedacht."]] },
    { label: "Give a reason — never just yes or no", accent: "olive", pairs: [["… because …", "… weil …"], ["The main reason is …", "Der Hauptgrund ist …"]] },
    { label: "Ask back — give the ball back", accent: "teal", pairs: [["What do you think?", "Was denkst du?"], ["Would that work for you?", "Würde das für dich passen?"]] },
    { label: "Disagree politely — say no, keep talking", accent: "slate", pairs: [["I see what you mean, but …", "Ich sehe, was du meinst, aber …"], ["That may be true, but …", "Das mag stimmen, aber …"]] },
  ],
};

const WHICH_MOVE = {
  options: ["React", "Give a reason", "Ask back", "Disagree politely"],
  items: [
    { left: "“What do you think about that?”", answer: "Ask back" },
    { left: "“I see what you mean, but we only have four lessons.”", answer: "Disagree politely" },
    { left: "“That's a good point.”", answer: "React" },
    { left: "“I'd rather do a poster, because it stays on the wall.”", answer: "Give a reason" },
    { left: "“Would Friday work for you?”", answer: "Ask back" },
    { left: "“I hadn't thought of that.”", answer: "React" },
  ],
};

const MAKE_LONGER = {
  intro:
    "Your partner asks: “Which project should our class do?” Rewrite each short answer so it has a reason AND a question back. Example: “Yes.” → Yes, I like that idea, because everybody can join in. What would you do first?",
  starters: [
    "“No.” → …",
    "“A poster.” → …",
    "“I don't know.” → …",
    "“Maybe.” → …",
  ],
};

const PLAN = {
  intro:
    "Your school is planning a project week against discrimination. Choose a topic (where prejudice comes from · a campaign for our school · interviews with people who moved here · a survey in our year · the story of one word) and a way to do it (a poster · a 60-second film · a song or rap · a survey with a graph · a photo series · an interview). Then fill in your plan.",
  starters: [
    "My idea: …",
    "Why this one? (two reasons): …",
    "What we need: …",
    "Who does what: …",
    "How long it takes: …",
  ],
};

const SAY_IT = {
  intro:
    "Record yourself on your phone. Talk about your plan for about three minutes without stopping. Then listen to the recording once and tick the list.",
  lines: [
    "I gave a reason for every idea.",
    "I asked my partner something at least twice.",
    "I used at least two phrases from the four moves.",
    "I spoke for the whole time with no long pause.",
    "I said what I think, not only what the box says.",
  ],
};

const PROBLEM_INTRO =
  "In the speaking test your partner says almost nothing — four minutes, and they have answered “yes” three times. Idea 1: keep talking yourself so there is no silence. · Idea 2: ask short open questions — and then wait. · Idea 3: agree before the test that you take two topics and your partner takes the other two.";

export default {
  title: "Keep Talking",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Die vier Züge eines Gesprächs",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Sprechen · LE",
          title: "Keep the conversation going",
          paragraphs: [GLOSS_INTRO],
          highlight: true,
          help: "Faustregel: nie nur „yes“ oder „no“ — immer ein Grund und eine Rückfrage. „Yes – and we could even film it.“",
        },
        {
          type: "phrase-reference",
          kind: "Words · Die vier Züge",
          title: "The four moves",
          sections: FOUR_MOVES.sections,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Match each sentence to the move it makes, then Check.",
          options: WHICH_MOVE.options,
          items: WHICH_MOVE.items,
        },
        {
          type: "written",
          kind: "Sprechen · leicht",
          title: "Make it longer",
          intro: MAKE_LONGER.intro,
          starters: MAKE_LONGER.starters.slice(0, 3),
          help: "Ein Wort ist keine Antwort. Grund + Rückfrage.",
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
          type: "phrase-reference",
          kind: "Words · Die vier Züge",
          title: "The four moves",
          sections: FOUR_MOVES.sections,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Match each sentence to the move it makes, then Check.",
          options: WHICH_MOVE.options,
          items: WHICH_MOVE.items,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: MAKE_LONGER.intro,
          starters: MAKE_LONGER.starters,
        },
        {
          type: "written",
          kind: "Sprechen · Planen",
          title: "Plan your own part",
          intro: PLAN.intro,
          starters: PLAN.starters,
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
          type: "phrase-reference",
          kind: "Words · Die vier Züge",
          title: "The four moves",
          sections: FOUR_MOVES.sections,
        },
        {
          type: "match-up",
          kind: "Interaktiv · Welcher Zug?",
          title: "Which move is it?",
          intro: "Match each sentence to the move it makes, then Check.",
          options: WHICH_MOVE.options,
          items: WHICH_MOVE.items,
        },
        {
          type: "written",
          kind: "Sprechen · Ausbauen",
          title: "Make it longer",
          intro: MAKE_LONGER.intro,
          starters: MAKE_LONGER.starters,
        },
        {
          type: "written",
          kind: "Sprechen · Planen",
          title: "Plan your own part",
          intro: PLAN.intro,
          starters: PLAN.starters,
        },
        {
          type: "written",
          kind: "Sprechen · Selbstcheck",
          title: "Now say it — three minutes, out loud",
          intro: SAY_IT.intro,
          lines: SAY_IT.lines,
          checklist: true,
        },
        {
          type: "written",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: PROBLEM_INTRO,
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
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
          kind: "Projekt · Challenge",
          title: "Pitch your project in 60 seconds",
          intro:
            "You have one minute to convince the class to pick YOUR project. Write the five sentences you would say — open strong, give two reasons, use one of the four moves to bring your partner in, and finish with a clear ask. Then say it out loud and time yourself.",
          starters: [
            "Open strong: …",
            "Reason 1: … because …",
            "Reason 2: … because …",
            "Bring your partner in: …",
            "The ask: So I think we should …",
          ],
          help: "Danach laut sprechen und stoppen: Schaffst du es in 60 Sekunden, ohne lange Pause?",
        },
      ],
    },
  ],
};
