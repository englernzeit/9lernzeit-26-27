/**
 * Respect & Community (Unit 2) — Listening: "Fairfield Live" (school radio).
 *
 * Built from the LE / G-Kurs / E-Kurs source (03_Listening_*). Audio:
 * assets/audio/u2-fairfield-{short,full}.mp3 — two-voice recordings of the
 * transcripts below (mono 64k), with a "Show text" transcript toggle.
 *
 * Step 1 LE (short programme) · Step 2 G-Kurs · Step 3 E-Kurs (full
 * programme) · Step 4 challenge: write your own radio spot.
 */

// Two speakers only (Presenter + Grace): the source's third voice, Mehmet,
// is folded into Grace and only mentioned, so "whose idea?" keeps its
// distractor. Every fact the tasks ask about is unchanged.
const FAIRFIELD_FULL = [
  "Presenter: Good morning, Fairfield. It is Tuesday, it is twenty past eight, and this is Fairfield Live. Today: the buddy system is one year old, and Grace is here in the studio. Grace, a lot of people think it was Mehmet's idea. Was it?",
  "Grace: No, it was mine, really. Mehmet joined later — now we run it together. Last September we got fourteen new students in one week. Three of them left again before Christmas. I said in the school council that nobody had asked them a single question.",
  "Presenter: Why did you say that?",
  "Grace: I asked one of them why she was leaving, and she told me that she had eaten lunch alone for eleven weeks. Eleven weeks. That was the moment.",
  "Presenter: So how does it work now?",
  "Grace: Every new student gets two buddies, not one. One from their own year and one from the year above. Two, because one person can be ill, or move house, or simply forget.",
  "Presenter: And what do the buddies actually do?",
  "Grace: They have three jobs in the first two weeks. Show them where everything is. Eat lunch with them at least twice. And send them a message on the first Friday.",
  "Presenter: A message?",
  "Grace: Just 'how was your week'. It takes eight seconds. It is the part that people forget, and it is the part that works.",
  "Presenter: Does it work? Be honest.",
  "Grace: Partly. Twenty-six new students this year, twenty-six buddy pairs. Nineteen of them still meet. Seven pairs stopped after the two weeks. I am not going to pretend that seven is a good number. But last year three students left our school. This year nobody has left.",
  "Presenter: What do you need now?",
  "Grace: Buddies from Year 11. We have almost none, and the new students in Year 10 need them most. If you are in Year 11, come to room B14 on Thursday at half past one.",
  "Presenter: Room B14, Thursday, half past one. Grace, thank you. After the break: why the canteen is closed on Friday.",
];

const FAIRFIELD_SHORT = [
  "Presenter: Good morning. This is Fairfield Live, your school radio. Today: the buddy system. Grace is here in the studio.",
  "Presenter: Grace, was the buddy system Mehmet's idea?",
  "Grace: No, it was mine. Mehmet helps me now. Last September fourteen new students came to our school. One girl told me that she had eaten lunch alone for eleven weeks.",
  "Presenter: How does the buddy system work?",
  "Grace: Every new student gets two buddies. The buddies show them the school. They eat lunch with them two times. And they send them a message on the first Friday. That takes eight seconds.",
  "Presenter: Does it work?",
  "Grace: This year twenty-six new students got a buddy. Nineteen of them still meet.",
  "Presenter: What do you need now?",
  "Grace: More buddies from Year 11. Come to room B14 on Thursday.",
  "Presenter: Thank you, Grace.",
];

const AUD = "assets/audio";
const LISTEN_FULL = { src: `${AUD}/u2-fairfield-full.mp3`, label: "Fairfield Live — the school radio", transcript: FAIRFIELD_FULL };
const LISTEN_SHORT = { src: `${AUD}/u2-fairfield-short.mp3`, label: "Fairfield Live — short version", transcript: FAIRFIELD_SHORT };

const HOW_TO_LISTEN = [
  [
    "A radio show is going to ",
    { w: "report on", de: "über etwas berichten" },
    " a school buddy system. Before you listen, get ready: read the questions and underline the ",
    { w: "keyword", de: "das Schlüsselwort" },
    " in each one — the one thing you listen for.",
  ],
  [
    "Write down every number, name and place you hear. Don't be ",
    { w: "frightened of", de: "Angst haben vor" },
    " them. It can feel ",
    { w: "frustrating", de: "frustrierend" },
    " at first, but the ",
    { w: "solution", de: "die Lösung" },
    " is in there, and your ",
    { w: "reaction to", de: "die Reaktion auf" },
    " the show is your own. You will hear how the smallest thing — the ",
    { w: "least", de: "am wenigsten" },
    " anyone does — ",
    { w: "shocked", de: "schockiert" },
    " everyone by working.",
  ],
  ["Listen the first time for the whole story. Listen the second time to fill in what is still missing."],
];

const PROBLEM = {
  situation: "Seven of the twenty-six buddy pairs stopped meeting after the first two weeks. Grace wants to change something before September.",
  ideas: [
    "give those seven new students a different buddy.",
    "ask the seven pairs what went wrong before changing anything.",
    "make the buddy time longer — six weeks instead of two.",
  ],
};

export default {
  title: "Fairfield Live",

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Die kurze Sendung — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Hören · LE",
          title: "Before you listen",
          paragraphs: HOW_TO_LISTEN,
          highlight: true,
          help: "Tipp: In die Lücke gehören nur die fehlenden Wörter (1–5), kein ganzer Satz.",
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Hören & wählen",
          title: "First listening — a, b or c?",
          intro: "Listen to the short programme, then choose the right answer. You hear it twice.",
          audio: LISTEN_SHORT,
          questions: [
            { q: "The idea for the buddy system came from …", options: ["Mehmet.", "Grace.", "the head teacher."], correct: 1 },
            { q: "Last September the school got …", options: ["four new students.", "fourteen new students.", "forty new students."], correct: 1 },
            { q: "Every new student gets …", options: ["one buddy.", "two buddies.", "three buddies."], correct: 1 },
            { q: "On the first Friday the buddies …", options: ["phone the new student.", "send a message.", "meet in the canteen."], correct: 1 },
            { q: "Grace needs more buddies from …", options: ["Year 9.", "Year 10.", "Year 11."], correct: 2 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Second listening — complete the sentences",
          intro:
            "Listen again and fill each gap. Word box (two are left over): eight seconds · eleven weeks · fourteen days · Monday · Thursday · two buddies.",
          audio: LISTEN_SHORT,
          items: [
            { hint: "wie viele?", segments: ["Every new student gets ", { answer: "two buddies", accept: ["2 buddies"], size: 14 }, "."] },
            { hint: "wie lange allein?", segments: ["One girl had eaten lunch alone for ", { answer: "eleven weeks", accept: ["11 weeks"], size: 14 }, "."] },
            { hint: "wie lange dauert es?", segments: ["The message takes ", { answer: "eight seconds", accept: ["8 seconds"], size: 14 }, "."] },
            { hint: "welcher Tag?", segments: ["The meeting for Year 11 is on ", { answer: "Thursday", size: 12 }, "."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "In your own words",
          intro: "Somebody at home asks you what a buddy is. Finish the sentence.",
          starters: ["A buddy is a student who …"],
          help: "Hilfe: a buddy = ein Pate / eine Patin für neue Schüler.",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "A buddy for you",
          intro: "Would you like to be a buddy for a new student? Write one or two sentences.",
          starters: ["I would / would not like to be a buddy, because …"],
          help: "Hilfe: a buddy = ein Pate / eine Patin · because = weil",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Die ganze Sendung",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Hören · G-Kurs",
          title: "Before you listen",
          paragraphs: HOW_TO_LISTEN,
          help: "Tipp: Schreib schon beim ersten Hören alle Zahlen, Namen und Orte mit.",
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig / Falsch",
          title: "First listening — true or false?",
          intro: "Listen to the whole programme (twice), then choose True or False.",
          audio: LISTEN_FULL,
          columns: 2,
          questions: [
            { q: "The buddy system was Mehmet's idea.", options: ["True", "False"], correct: 1 },
            { q: "Last September fourteen new students came in one week.", options: ["True", "False"], correct: 0 },
            { q: "One student had eaten lunch alone for eleven weeks.", options: ["True", "False"], correct: 0 },
            { q: "Every new student gets one buddy.", options: ["True", "False"], correct: 1 },
            { q: "The buddies send a message on the first Friday.", options: ["True", "False"], correct: 0 },
            { q: "All twenty-six buddy pairs still meet.", options: ["True", "False"], correct: 1 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Second listening — complete the sentences",
          intro: "Fill each gap with one to five words — only the missing words. Then Check.",
          audio: LISTEN_FULL,
          items: [
            { hint: "wie alt ist das System?", segments: ["Grace is in the studio because the buddy system is ", { answer: "one year old", accept: ["a year old"], size: 14 }, "."] },
            { hint: "wann gingen drei?", segments: ["Three of the new students left again ", { answer: "before Christmas", size: 16 }, "."] },
            { hint: "eat lunch …", segments: ["In the first two weeks the buddies eat lunch with the new student ", { answer: "at least twice", accept: ["twice", "two times"], size: 14 }, "."] },
            { hint: "wie lange?", segments: ["The message on the first Friday takes ", { answer: "eight seconds", accept: ["8 seconds"], size: 14 }, "."] },
            { hint: "wohin sollen Year 11 kommen?", segments: ["Year 11 students should come to ", { answer: "room B14", accept: ["b14", "room b 14"], size: 12 }, "."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "In your own words",
          intro: "Explain the buddy system to someone who did not hear the show. Two sentences.",
          starters: ["The buddy system is …", "The buddies have to …"],
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "Your first day",
          intro: "Think of a first day somewhere new. What helped you — or what would have helped? Write two sentences.",
          starters: ["On my first day …", "It would have helped if …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Zahlen und Details heraushören",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "multiple-choice",
          kind: "Interaktiv · Richtig / Falsch",
          title: "First listening — true or false?",
          intro: "Listen to the whole programme (twice), then choose True or False.",
          audio: LISTEN_FULL,
          columns: 2,
          questions: [
            { q: "The buddy system was Mehmet's idea.", options: ["True", "False"], correct: 1 },
            { q: "Last September fourteen new students came in one week.", options: ["True", "False"], correct: 0 },
            { q: "One student had eaten lunch alone for eleven weeks.", options: ["True", "False"], correct: 0 },
            { q: "Every new student gets one buddy.", options: ["True", "False"], correct: 1 },
            { q: "The buddies send a message on the first Friday.", options: ["True", "False"], correct: 0 },
            { q: "All twenty-six buddy pairs still meet.", options: ["True", "False"], correct: 1 },
            { q: "This year three students have left the school.", options: ["True", "False"], correct: 1 },
            { q: "Grace is looking for buddies from Year 11.", options: ["True", "False"], correct: 0 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Second listening — complete the sentences",
          intro: "Fill each gap with one to five words — write only the missing words. Then Check.",
          audio: LISTEN_FULL,
          items: [
            { hint: "the buddy system is …", segments: ["Grace is in the studio because the buddy system is ", { answer: "one year old", accept: ["a year old"], size: 14 }, "."] },
            { hint: "when did three leave?", segments: ["Three of the new students left again ", { answer: "before Christmas", size: 16 }, "."] },
            { hint: "ill, move house or …", segments: ["A new student gets two buddies because one person can be ill, move house or ", { answer: "simply forget", accept: ["forget"], size: 14 }, "."] },
            { hint: "eat lunch …", segments: ["In the first two weeks the buddies eat lunch with the new student ", { answer: "at least twice", accept: ["twice", "two times"], size: 14 }, "."] },
            { hint: "how long?", segments: ["The message on the first Friday takes ", { answer: "eight seconds", accept: ["8 seconds"], size: 14 }, "."] },
            { hint: "where?", segments: ["Year 11 students should come to ", { answer: "room B14", accept: ["b14", "room b 14"], size: 12 }, "."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · eigene Worte",
          title: "In your own words",
          intro: "Not copied — said again. Write two sentences: what the buddy system is, and what its weakest point is.",
          starters: ["The buddy system …", "Its weakest point is …"],
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
          title: "Eight seconds",
          intro: "Grace says the eight-second message “is the part that works”. Why could such a small thing matter so much? Write two sentences.",
          starters: ["A small message matters, because …", "For a new student, …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Your own radio spot",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Projekt · Challenge",
          title: "You are on Fairfield Live",
          intro:
            "Write a short radio spot (about 30 seconds when read aloud) that asks Year 11 students to become buddies. Open like a presenter, say why buddies matter in one honest line, tell listeners exactly what to do, and end with where and when to come. Read it aloud to check it sounds like radio.",
          starters: [
            "Opening line: “This is Fairfield Live, and …”",
            "Why it matters: …",
            "What to do: …",
            "Where and when: …",
          ],
          help: "Tipp: Kurze Sätze, eine echte Zahl und ein klarer Aufruf machen einen guten Radiospot.",
        },
        {
          type: "written",
          kind: "Offene Frage",
          title: "On air",
          intro: "Would you like to speak on your school radio? Write one or two sentences.",
          starters: ["I would / would not like to speak on the radio, because …"],
        },
      ],
    },
  ],
};
