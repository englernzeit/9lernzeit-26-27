/**
 * Generation Like (Unit 4) — Vocabulary: "Your Word Bank".
 *
 * The Vocabulary section consolidates the whole unit's words. Adapted
 * from the Unit 4 material's Vocabulary page + VocabMatch / VocabImageMatch
 * (the EKurs/GKurs flashcard decks and the verb→definition drill) as a
 * DIRECTION and rebuilt in our watercolor-journal design across the four
 * language-level Steps. See memory: unit4-material-is-direction-not-spec.
 *
 * Steps climb the difficulty of the word bank itself:
 *  1 LE     — the most concrete words, with pictures and German support.
 *  2 G-Kurs — the G-Kurs test words (topic vocabulary of the unit).
 *  3 E-Kurs — the E-Kurs test words (abstract adjectives + verb definitions).
 *  4 Chall. — put the words to work in your own short text.
 */

const IMG = "assets/images/unit4/vocab";

export default {
  title: "Vocabulary",

  newWords: {
    subtitle: "15 key words for this unit",
    stampLabel: "WORD BANK",
    words: [
      { en: "media", de: "die Medien", ex: "Social media are part of daily life." },
      { en: "digital", de: "digital", ex: "We live in a digital world." },
      { en: "generation", de: "die Generation", ex: "Every generation has its own habits." },
      { en: "average", de: "der Durchschnitt", ex: "On average, teens spend hours online." },
      { en: "habit", de: "die (An-)Gewohnheit", ex: "Checking your phone can become a habit." },
      { en: "addicted to", de: "süchtig (nach)", ex: "Some people are addicted to their phones." },
      { en: "to post", de: "posten / hochladen", ex: "She posts a photo every day.", image: `${IMG}/vocab2-post.jpg` },
      { en: "to follow", de: "folgen", ex: "I follow my favourite band online.", image: `${IMG}/vocab2-follow.jpg` },
      { en: "to subscribe to", de: "abonnieren", ex: "Subscribe to the channel for more.", image: `${IMG}/vocab2-subscribe.jpg` },
      { en: "to share", de: "teilen", ex: "I always share funny clips with friends." },
      { en: "advertising", de: "die Werbung", ex: "Advertising tries to make us buy things." },
      { en: "to influence", de: "beeinflussen", ex: "Ads influence what we want." },
      { en: "to convince", de: "überzeugen", ex: "The advert tried to convince me to buy it." },
      { en: "the pros and cons", de: "das Für und Wider", ex: "Let's look at the pros and cons." },
      { en: "self-portrait", de: "das Selbstporträt", ex: "A selfie is a modern self-portrait." },
    ],
  },

  // Word Master — 15 gap-fill sentences on this unit's vocabulary.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Soziale **Medien** gehören zum Alltag.", en: "Social ___ are part of everyday life.", answer: "media" },
      { de: "Wir leben in einer **digitalen** Welt.", en: "We live in a ___ world.", answer: "digital" },
      { de: "Jede **Generation** hat eigene Gewohnheiten.", en: "Every ___ has its own habits.", answer: "generation" },
      { de: "Im **Durchschnitt** sind Teenager Stunden online.", en: "On ___, teenagers spend hours online.", answer: "average" },
      { de: "Das ständige Checken wird zur **Gewohnheit**.", en: "Constant checking becomes a ___.", answer: "habit" },
      { de: "Manche sind **süchtig nach** ihrem Handy.", en: "Some people are ___ to their phones.", answer: "addicted" },
      { de: "Sie **postet** jeden Tag ein Foto.", en: "She ___s a photo every day.", answer: "post" },
      { de: "Ich **folge** meiner Lieblingsband online.", en: "I ___ my favourite band online.", answer: "follow" },
      { de: "**Abonniere** den Kanal für mehr Videos.", en: "___ to the channel for more videos.", answer: "subscribe" },
      { de: "Ich **teile** lustige Clips mit Freunden.", en: "I ___ funny clips with my friends.", answer: "share" },
      { de: "**Werbung** will uns zum Kaufen bringen.", en: "___ tries to make us buy things.", answer: "advertising" },
      { de: "Anzeigen **beeinflussen**, was wir wollen.", en: "Ads ___ what we want.", answer: "influence" },
      { de: "Die Anzeige wollte mich **überzeugen**.", en: "The advert tried to ___ me.", answer: "convince" },
      { de: "Schauen wir uns das **Für und Wider** an.", en: "Let's look at the pros and ___.", answer: "cons" },
      { de: "Ein Selfie ist ein modernes **Selbstporträt**.", en: "A selfie is a modern ___.", answer: "self-portrait", accept: ["self portrait"] },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Die wichtigsten Wörter — mit Bildern und Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · LE",
          title: "Your Generation Like word bank",
          paragraphs: [
            [
              "This unit is about how young people live ",
              { w: "online", de: "online" },
              ". On this page you collect and practise the most important words from the whole unit.",
            ],
            [
              "Start here with the easiest words. Many of them come with a ",
              { w: "picture", de: "das Bild" },
              " and the German meaning, so you can learn them step by step.",
            ],
          ],
        },
        {
          type: "image-match",
          kind: "Interaktiv · Bild & Wort",
          title: "Match the online words",
          intro: "Tap a picture, then tap its English word. Match all six.",
          pairs: [
            { word: "footprint", image: `${IMG}/vocab-footprint.jpg` },
            { word: "identity", image: `${IMG}/vocab-identity.jpg` },
            { word: "password", image: `${IMG}/vocab-password.jpg` },
            { word: "nickname", image: `${IMG}/vocab-nickname.jpg` },
            { word: "email", image: `${IMG}/vocab-email.jpg` },
            { word: "adult", image: `${IMG}/vocab-adult.jpg` },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Naming words or action words?",
          intro: "Sort each word: is it a thing (noun) or an action (verb)? Check when ready.",
          groups: [
            { label: "🏷️ Naming word (noun)", items: ["media", "habit", "generation", "advertising", "footprint"] },
            { label: "⚡ Action word (verb)", items: ["to post", "to follow", "to share", "to influence", "to convince"] },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Match the German meaning",
          intro: "Choose the correct German translation for each word, then Check.",
          options: ["die Medien", "die Gewohnheit", "posten", "teilen", "die Werbung", "beeinflussen"],
          items: [
            { left: "media", answer: "die Medien" },
            { left: "habit", answer: "die Gewohnheit" },
            { left: "to post", answer: "posten" },
            { left: "to share", answer: "teilen" },
            { left: "advertising", answer: "die Werbung" },
            { left: "to influence", answer: "beeinflussen" },
          ],
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the vocabulary word, letter by letter — and save the hero from the monster!",
          words: [
            { word: "MEDIA", hint: "TV, internet, newspapers — all together" },
            { word: "DIGITAL", hint: "Not on paper — on a screen" },
            { word: "HABIT", hint: "Something you do again and again" },
            { word: "AVERAGE", hint: "The normal amount, in the middle" },
            { word: "FOLLOW", hint: "See everything someone posts online" },
            { word: "SHARE", hint: "Send something to your friends too" },
            { word: "POST", hint: "Put a photo or message online" },
            { word: "GENERATION", hint: "All the people of about the same age" },
            { word: "INFLUENCE", hint: "Change what someone thinks or does" },
            { word: "ADVERTISING", hint: "It tries to make you buy things" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Das Themenvokabular der Unit",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · G-Kurs",
          title: "Words about our digital lives",
          paragraphs: [
            "These are the G-Kurs test words for this unit. They describe how our generation uses technology every day: the media we use, the habits we build, and how much time we spend online.",
            "Read each word carefully and learn the German meaning. Then use the exercises below to check that the words really stick.",
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Vocabulary Test — G-Kurs",
          intro: "Match each English word to its German meaning, then Check.",
          options: ["die Generation", "der Durchschnitt", "gleichzeitig", "süchtig nach", "verbinden mit", "wenigstens", "die Gewohnheit", "teilen"],
          items: [
            { left: "generation", answer: "die Generation" },
            { left: "average", answer: "der Durchschnitt" },
            { left: "at the same time", answer: "gleichzeitig" },
            { left: "addicted to", answer: "süchtig nach" },
            { left: "connect to", answer: "verbinden mit" },
            { left: "at least", answer: "wenigstens" },
            { left: "habit", answer: "die Gewohnheit" },
            { left: "share", answer: "teilen" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Use the words in a sentence",
          intro: "Type the missing English word in each gap. Use the German hint to help you.",
          items: [
            { segments: ["My little brother is completely ", { answer: "addicted" }, " to his phone."], hint: "süchtig" },
            { segments: ["On ", { answer: "average" }, ", teenagers spend about three hours a day online."], hint: "im Durchschnitt" },
            { segments: ["Every ", { answer: "generation" }, " uses technology in a different way."], hint: "Generation" },
            { segments: ["Social ", { answer: "media" }, " are a huge part of daily life."], hint: "Medien" },
            { segments: ["I always ", { answer: "share" }, " funny videos with my friends."], hint: "teilen" },
            { segments: ["Checking my phone first thing is a bad ", { answer: "habit" }, "."], hint: "Gewohnheit" },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "What does it mean?",
          intro: "Choose the correct meaning for each word.",
          questions: [
            { q: "addicted to", options: ["süchtig nach", "gelangweilt von", "stolz auf", "böse auf", "müde von"], correct: 0 },
            { q: "average", options: ["der Rekord", "der Durchschnitt", "das Ende", "der Anfang", "die Ausnahme"], correct: 1 },
            { q: "to connect to", options: ["trennen von", "verbinden mit", "löschen", "verstecken", "verkaufen"], correct: 1 },
            { q: "at the same time", options: ["nie", "später", "gleichzeitig", "gestern", "zuerst"], correct: 2 },
            { q: "the pros and cons", options: ["die Regeln", "die Preise", "die Freunde", "das Für und Wider", "die Fotos"], correct: 3 },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Your own examples",
          intro: "Write one sentence for each word so you remember it.",
          starters: [
            "One habit I have is …",
            "On social media I like to …",
            "My generation is really good at …",
          ],
          help: "Hilfe: habit = Gewohnheit · generation = Generation",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Abstract words & precise meanings",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · E-Kurs",
          title: "The tricky words",
          paragraphs: [
            "The E-Kurs word list goes further. It contains abstract adjectives (like vain, imaginative or depressing) and precise verbs (like convince or influence) that you need to talk about advertising, art and opinions.",
            "It also includes the online action verbs from the unit. In the exercises below you match each verb to its English definition, then choose the exact right word for each context — no German this time.",
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Definitionen",
          title: "Match the verb to its definition",
          intro: "Read each definition and choose the verb it describes, then Check.",
          options: ["subscribe to", "post", "follow", "vlog", "comment on", "delete", "build up", "shut down"],
          items: [
            { left: "agree to regularly receive an online service", answer: "subscribe to" },
            { left: "put a message or image on social media", answer: "post" },
            { left: "choose to see everything someone uploads", answer: "follow" },
            { left: "make and share videos online", answer: "vlog" },
            { left: "write your opinion under something online", answer: "comment on" },
            { left: "remove something completely", answer: "delete" },
            { left: "slowly increase the number of something", answer: "build up" },
            { left: "close something down so it stops working", answer: "shut down" },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Wort wählen",
          title: "Choose the exact word",
          intro: "Tap the word that fits each sentence best, then Check.",
          layout: "prose",
          segments: [
            "She takes a hundred selfies a day — some people think she is a bit ",
            { gap: 0 },
            ". Her friend, however, is really ",
            { gap: 1 },
            " and paints amazing pictures full of new ideas. The advert tried hard to ",
            { gap: 2 },
            " us to buy the new phone. A professional ",
            { gap: 3 },
            " later wrote a review and judged the design. Reading only bad news online can feel quite ",
            { gap: 4 },
            ".",
          ],
          gaps: [
            { options: ["vain", "average"], answer: "vain" },
            { options: ["imaginative", "standard"], answer: "imaginative" },
            { options: ["convince", "delete"], answer: "convince" },
            { options: ["critic", "follower"], answer: "critic" },
            { options: ["depressing", "creative"], answer: "depressing" },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Word meanings in English",
          intro: "Choose the best English definition for each word.",
          questions: [
            { q: "vain", options: ["very shy and quiet", "too proud of how you look", "extremely tired", "good at maths", "afraid of the dark"], correct: 1 },
            { q: "imaginative", options: ["full of new and creative ideas", "very boring and ordinary", "always angry", "made of metal", "very cheap"], correct: 0 },
            { q: "to convince", options: ["to delete something", "to make someone believe or agree", "to fall asleep", "to run away", "to switch off"], correct: 1 },
            { q: "a critic", options: ["a person who judges and reviews work", "a type of camera", "a social media app", "a young child", "an advert"], correct: 0 },
            { q: "savvy", options: ["clever and well-informed", "wet and cold", "very loud", "completely new", "extremely slow"], correct: 0 },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Explain it yourself",
          intro: "Choose three of the tricky words above and write your own English example sentence for each — one that clearly shows the meaning.",
          answer: true,
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Put the words to work",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "The word artist",
          intro:
            "Write a short text (60–90 words) about how your generation uses social media. The challenge: use at least SIX words from this unit's word bank. Tick them off as you go!",
          min: 60,
          max: 90,
          placeholder: "My generation lives online. Every day we …",
          checklist: [
            "I used the word “media”.",
            "I used “generation” or “average”.",
            "I used a verb like post / follow / share / subscribe.",
            "I used “advertising” or “influence”.",
            "I used at least six word-bank words in total.",
            "I checked my spelling.",
          ],
          help: "Tip: open the Word Master or scroll up if you need to remember a word.",
        },
      ],
    },
  ],
};
