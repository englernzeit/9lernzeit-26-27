/**
 * Respect & Community (Unit 2) — Vocabulary: the eight words of Theme 2.
 *
 * Built from the user's LE / G-Kurs / E-Kurs source worksheets
 * (01_Vocabulary_*). The eight words carry the whole unit; the class test
 * asks learners to EXPLAIN a word in English using one of three patterns,
 * so that skill runs through every step.
 *
 * Universal 4-Step model:
 *   Step 1 (LE)      — words in context + word-box tasks, German support
 *   Step 2 (G-Kurs)  — same tasks, type the word, lighter support
 *   Step 3 (E-Kurs)  — recall without a word box + explain four words
 *   Step 4 (Challenge)— design the class "Respect Agreement" poster
 *
 * Above the steps: "New words" postcards (wordCards). Steps 1–3 each carry
 * the Word Master — eight German sentences to translate (LE with hints).
 */

// New words — postcard pile at the top of the page (stamps cut from the
// user's watercolour stamp sheet)
const STAMPS = "assets/images/unit2/stamps";
const WORD_CARDS = {
  subtitle: "Die acht Wörter der Unit — wisch dich durch die Karten, tippe 🔊 zum Anhören",
  stampLabel: "RESPECT",
  words: [
    { en: "victim", pos: "noun", de: "das Opfer", ex: "The victim of the rumour didn't want to come to school for a week.", image: `${STAMPS}/victim.webp` },
    { en: "bystander", pos: "noun", de: "der Zuschauer / die Zuschauerin", ex: "A bystander who films the fight on their phone is part of the problem.", image: `${STAMPS}/bystander.webp` },
    { en: "bully", pos: "noun / verb", de: "der Mobber · mobben", ex: "The bully only stopped when the whole class stood up to him.", image: `${STAMPS}/bully.webp` },
    { en: "cyberbullying", pos: "noun", de: "das Cybermobbing", ex: "Cyberbullying follows you home, because your phone is always with you.", image: `${STAMPS}/cyberbullying.webp` },
    { en: "tease", pos: "verb", de: "jemanden hänseln", ex: "Friends tease each other, but it stops being fun when only one person is laughing.", image: `${STAMPS}/tease.webp` },
    { en: "horrible", pos: "adjective", de: "schrecklich, gemein", ex: "Someone posted a horrible comment under her new profile picture.", image: `${STAMPS}/horrible.webp` },
    { en: "support", pos: "noun / verb", de: "die Unterstützung · unterstützen", ex: "When Lina was new, two buddies gave her real support.", image: `${STAMPS}/support.webp` },
    { en: "delete", pos: "verb", de: "löschen", ex: "If you get a mean photo of a classmate, delete it and don't send it on.", image: `${STAMPS}/delete.webp` },
  ],
};

// Word Master — eight sentences to translate, one per word, in a different
// order from the cards. `en` is an answer pattern: (a|b) = either, [x] =
// optional; case, punctuation and short forms never count.
const WORD_MASTER = [
  { de: "Lösch das Foto sofort!", en: "Delete (the|this|that) (photo|picture) (immediately|right now|now|at once|straight away|right away)", le: "löschen = delete · sofort = immediately / right now" },
  { de: "Ein Zuschauer, der nichts sagt, hilft dem Mobber.", en: "(A|One) bystander (who|that) (says nothing|does not say anything) (helps|is helping) the bully", le: "der Zuschauer = bystander · der Mobber = bully" },
  { de: "Neue Schüler brauchen unsere Unterstützung.", en: "New (students|pupils|kids) need our support", le: "die Unterstützung = support" },
  { de: "Das war ein schrecklicher Kommentar.", en: "(That|It) was a horrible comment", le: "schrecklich = horrible" },
  { de: "Das Opfer brauchte Hilfe.", en: "The victim needed [some] help", le: "das Opfer = victim · brauchte = needed" },
  { de: "Hör auf, ihn zu hänseln!", en: "[Please] stop teasing him[ please]", le: "hänseln = tease · Hör auf … = Stop …-ing" },
  { de: "Cybermobbing hört nicht am Schultor auf.", en: "Cyberbullying does not stop at the school (gate|gates)", le: "Cybermobbing = cyberbullying · das Schultor = the school gate" },
  { de: "Der Mobber hat sich entschuldigt.", en: "The bully (apologised|apologized|said sorry|has apologised|has apologized|has said sorry)", le: "der Mobber = bully · sich entschuldigen = apologise / say sorry" },
];

const wordMasterCard = (withHints) => ({
  type: "translate",
  kind: "Word Master · Übersetzen",
  title: "Word Master",
  intro: withHints
    ? "Übersetze ins Englische — mit den neuen Wörtern. Dann Check."
    : "Translate into English with the new words, then Check.",
  items: WORD_MASTER.map(({ de, en, le }) => (withHints ? { de, en, hint: le } : { de, en })),
});

export default {
  title: "Respect — the eight words",

  wordCards: WORD_CARDS,

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Die acht Wörter — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · LE",
          title: "The words of this unit",
          paragraphs: [
            [
              "Imagine a class group chat with 29 people. Somebody posts a mean photo of a classmate. The person in the photo is the ",
              { w: "victim", de: "das Opfer" },
              ". The twenty people who read it and say nothing are ",
              { w: "bystanders", de: "die Zuschauer / Zuschauerinnen" },
              ". This is ",
              { w: "cyberbullying", de: "das Cybermobbing" },
              " — it does not stop at the school gate; on a phone it follows you home.",
            ],
            [
              "Real ",
              { w: "support", de: "die Unterstützung; unterstützen" },
              " is a buddy who sits down next to you. If a ",
              { w: "bully", de: "der Mobber / mobben" },
              " likes to ",
              { w: "tease", de: "jemanden hänseln" },
              " others, we do not laugh with them. And if a ",
              { w: "horrible", de: "schrecklich, gemein" },
              " photo turns up, we ",
              { w: "delete", de: "löschen" },
              " it and do not send it on.",
            ],
          ],
          highlight: true,
          help:
            "So erklärst du ein Wort auf Englisch (3 Muster): a person who … · something that … · to … so that …",
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Which word is described?",
          intro: "Match each description to the right word. Pick from the list, then Check.",
          options: ["victim", "bystander", "cyberbullying", "bully", "tease", "support", "delete", "horrible"],
          items: [
            { left: "a person who gets the mean messages", answer: "victim" },
            { left: "a person who sees it and says nothing", answer: "bystander" },
            { left: "bullying on the phone and on the internet", answer: "cyberbullying" },
            { left: "a person who is mean to the same person again and again", answer: "bully" },
            { left: "to make jokes about a person who does not laugh", answer: "tease" },
            { left: "to sit down next to somebody who is alone", answer: "support" },
            { left: "to take a message off your phone", answer: "delete" },
            { left: "very bad and hard to live with", answer: "horrible" },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Auswählen",
          title: "Our class agreement",
          intro: "Our class wrote a class agreement. Tap the word that fits in each rule, then Check.",
          layout: "dialogue",
          lines: [
            { speaker: "1.", segments: ["Nobody should feel ", { gap: 0 }, " on the way to school."] },
            { speaker: "2.", segments: ["Bad messages follow you home on your phone. That is called ", { gap: 1 }, "."] },
            { speaker: "3.", segments: ["Twenty people read it and said nothing. Those twenty are ", { gap: 2 }, "."] },
            { speaker: "4.", segments: ["The person in the photo is the ", { gap: 3 }, "."] },
            { speaker: "5.", segments: ["Nobody has to be afraid of a person who likes to ", { gap: 4 }, " others."] },
            { speaker: "6.", segments: ["We do not ", { gap: 5 }, " anybody about their clothes."] },
            { speaker: "7.", segments: ["If a photo of a classmate is in our group chat, we ", { gap: 6 }, " it."] },
            { speaker: "8.", segments: ["Every new student gets a buddy for two weeks. That is real ", { gap: 7 }, "."] },
          ],
          gaps: [
            { options: ["famous", "horrible", "quiet"], answer: "horrible" },
            { options: ["cyberbullying", "homework", "a campaign"], answer: "cyberbullying" },
            { options: ["teachers", "parents", "bystanders"], answer: "bystanders" },
            { options: ["winner", "victim", "stranger"], answer: "victim" },
            { options: ["thank", "help", "bully"], answer: "bully" },
            { options: ["thank", "tease", "copy"], answer: "tease" },
            { options: ["print", "delete", "send"], answer: "delete" },
            { options: ["pressure", "silence", "support"], answer: "support" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Explain two words yourself",
          intro: "This is the class-test task. Finish each sentence with the pattern from the top of Step 1.",
          starters: [
            "A bystander is a person who …",
            "Support is help that …",
          ],
          help: "Hilfe: a person who … (für Personen) · something that … (für Dinge) · to … so that … (für Verben).",
        },
        wordMasterCard(true),
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Bewerte jede Idee, wähle die beste — und schreib, warum.",
          situation: "Somebody posts a photo of a classmate with a joke under it. Four people send a laughing face; nobody else writes anything.",
          ideas: [
            "write “Take that down, it is not funny.”",
            "say nothing, but sit next to that classmate tomorrow.",
            "show it to your class teacher.",
          ],
          starters: ["Idea ___ is best, because …"],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Die Wörter selbst schreiben",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Which word is described?",
          intro: "Match each description to the right word. Careful — three words are not needed. Then Check.",
          options: [
            "victim", "bystander", "cyberbullying", "bully", "tease", "support", "delete", "horrible",
            "campaign", "prejudice", "shocked",
          ],
          items: [
            { left: "the person that the unkind words are aimed at", answer: "victim" },
            { left: "you see it, you say nothing, you walk on", answer: "bystander" },
            { left: "it happens in group chats and under photos, not on the playground", answer: "cyberbullying" },
            { left: "this person makes somebody else small to feel big", answer: "bully" },
            { left: "you call it a joke, but the other person is not laughing", answer: "tease" },
            { left: "somebody sits down next to you when nobody else does", answer: "support" },
            { left: "you hold the message for two seconds and it is gone", answer: "delete" },
            { left: "you would not want one single day of it", answer: "horrible" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Our class agreement",
          intro:
            "Fill each gap with one word, then Check. Word box: bully · bystanders · cyberbullying · delete · horrible · support · tease · victim (three extra words: campaign · society · prejudice).",
          items: [
            { hint: "wie fühlt man sich?", segments: ["Nobody should have to feel ", { answer: "horrible", size: 10 }, " on the way to school."] },
            { hint: "auf dem Handy", segments: ["Bad messages follow you home — that is ", { answer: "cyberbullying", size: 14 }, "."] },
            { hint: "die Zuschauer", segments: ["Twenty people read it and say nothing; those twenty are ", { answer: "bystanders", accept: ["bystander"], size: 12 }, "."] },
            { hint: "das Opfer von …", segments: ["A ", { answer: "victim", size: 8 }, " of unkind words needs one of them to stand up."] },
            { hint: "mobben", segments: ["Nobody has to be afraid of a loud person who likes to ", { answer: "bully", size: 8 }, " others."] },
            { hint: "hänseln", segments: ["We do not ", { answer: "tease", size: 8 }, " anybody about their clothes or their marks."] },
            { hint: "löschen", segments: ["If a photo turns up in our group chat, we ", { answer: "delete", size: 8 }, " it and do not send it on."] },
            { hint: "die Unterstützung", segments: ["Every new student gets a buddy, because ", { answer: "support", size: 9 }, " is a person who sits down next to you."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Explain three words yourself",
          intro: "The class-test task. Write one complete English sentence for each word, using a pattern.",
          starters: [
            "A bystander is a person who …",
            "Support is help that …",
            "To tease somebody means to … so that …",
          ],
          help: "Patterns: a person who … · something that … · to … so that …",
        },
        wordMasterCard(false),
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Which idea is best?",
          intro: "Rate every idea, pick the best one, then say why it beats the others.",
          situation: "Somebody posts a photo of a classmate with a joke under it; four people send a laughing face and nobody else writes anything.",
          ideas: [
            "write “Take that down, it is not funny.”",
            "say nothing, but sit next to that classmate tomorrow.",
            "show it to your class teacher.",
          ],
          starters: ["Idea ___ is best, because …", "The other ideas are not as good, because …"],
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Ohne Wortspeicher — und selbst erklären",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "gap-fill",
          kind: "Interaktiv · Ohne Wortspeicher",
          title: "Which word is described?",
          intro: "No word box this time — write the word that fits each description, then Check.",
          items: [
            { segments: ["The person that the unkind words are aimed at → ", { answer: "victim", size: 12 }] },
            { segments: ["You see it, you say nothing, you walk on → ", { answer: "bystander", size: 13 }] },
            { segments: ["It happens in group chats and under photos → ", { answer: "cyberbullying", size: 15 }] },
            { segments: ["This person makes somebody else small to feel big → ", { answer: "bully", size: 10 }] },
            { segments: ["You call it a joke, but the other person is not laughing → ", { answer: "tease", size: 10 }] },
            { segments: ["Somebody sits down next to you when nobody else does → ", { answer: "support", size: 11 }] },
            { segments: ["You hold the message for two seconds and it is gone → ", { answer: "delete", size: 10 }] },
            { segments: ["You would not want one single day of it → ", { answer: "horrible", size: 11 }] },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Our class agreement",
          intro:
            "Fill each gap with one word, then Check. The word box has more words than you need: bully · bystanders · campaign · cyberbullying · delete · horrible · prejudice · society · support · tease · victim.",
          items: [
            { hint: "feeling", segments: ["Nobody should have to feel ", { answer: "horrible", size: 10 }, " on the way to school."] },
            { hint: "it follows you home", segments: ["Bad messages do not stop at the school gate — that is ", { answer: "cyberbullying", size: 14 }, "."] },
            { hint: "the silent twenty", segments: ["The problem is the twenty people who read it and say nothing; those twenty are ", { answer: "bystanders", accept: ["bystander"], size: 12 }, "."] },
            { hint: "needs a bystander to stand up", segments: ["A ", { answer: "victim", size: 8 }, " of unkind words needs one of them to stand up."] },
            { hint: "a loud person likes to …", segments: ["Nobody has to be afraid of a loud person who likes to ", { answer: "bully", size: 8 }, " others."] },
            { hint: "about clothes, marks, family", segments: ["We do not ", { answer: "tease", size: 8 }, " anybody about their clothes, their marks or their family."] },
            { hint: "and do not send it on", segments: ["If a photo of a classmate turns up in our group chat, we ", { answer: "delete", size: 8 }, " it."] },
            { hint: "a person, not a poster word", segments: ["Every new student gets a buddy, because ", { answer: "support", size: 9 }, " is a person who sits down next to you."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Analyse",
          title: "Explain four words yourself",
          intro: "The class-test task. Write one complete English sentence for each word, using a pattern.",
          starters: [
            "bystander — …",
            "cyberbullying — …",
            "support — …",
            "tease — …",
          ],
          help: "Patterns: a person who … · something that … · to … so that …",
        },
        wordMasterCard(false),
        {
          type: "idea-pick",
          kind: "Problem solving",
          title: "Choose — and defend your choice",
          intro: "Rate every idea, pick the best AND the weakest, then defend your choice.",
          situation: "A photo of a classmate with a joke under it is in a 29-person chat; four laughing faces, nobody else writes anything.",
          ideas: [
            "write “Take that down, it is not funny.”",
            "say nothing, but sit next to that classmate tomorrow.",
            "show it to your class teacher.",
          ],
          starters: ["Idea ___ is best, because …", "Idea ___ is worse, because …"],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Our Respect Agreement",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "poster-builder",
          kind: "Projekt · Challenge",
          title: "Design your class's Respect Agreement",
          intro:
            "Make a poster your class could really sign. Give it a title and a one-line promise, then write three rules — use at least three of the eight words (victim, bystander, bully, cyberbullying, tease, support, delete, horrible). Finish with a line to the bystanders. Your poster updates as you type.",
          prompts: {
            headline: { label: "Poster title", placeholder: "RESPECT @ OUR SCHOOL" },
            subhead: { label: "One-line promise", placeholder: "A place where everyone belongs" },
            tip1: { label: "Rule 1 (use a unit word)", placeholder: "Nobody has to feel horrible on the way to school." },
            tip2: { label: "Rule 2 (use a unit word)", placeholder: "If a mean photo turns up, we delete it and do not send it on." },
            tip3: { label: "Rule 3 (use a unit word)", placeholder: "Every new student gets a buddy — that is real support." },
            emergency: { label: "A line to the bystanders", placeholder: "Don't just watch — sit down next to them." },
          },
          help: "Tipp: Mit „a person who …“ oder „to … so that …“ kannst du ein Wort auch kurz erklären.",
        },
      ],
    },
  ],
};
