/**
 * Grammar Station (Australia · Unit 1) — Grammar:
 * "can / must / be able to + revision of the 4 tenses".
 *
 * Built from the user's three level drafts (Unit1_Grammar_step1/2/3.pdf,
 * "Ben's Day in Sydney") as a DIRECTION and mapped onto our four Steps:
 *   Step 1 (LE)      = the Foundation worksheet — modals present/past.
 *   Step 2 (G-Kurs)  = fuller text with must / have to / don't have to.
 *   Step 3 (E-Kurs)  = revision of the 4 tenses (sort, mixed gap-fill,
 *                      Simple Past vs Present Perfect, while + Past Prog).
 *   Step 4 (Challenge, on us) = a creative diary that pulls the modals AND
 *                      all four tenses together.
 *
 * A shared guide at the top gives the modal reference cards (numbered:
 * false) plus a 4-tenses revision table. Self-checking widgets
 * (group-sort, match-up, inline-choice, gap-fill) plus written tasks.
 */

export default {
  title: "Modals & Tense Revision",

  guide: {
    label: "Your grammar toolkit",
    subtitle: "Modal verbs · forms, German & example — and the 4 tenses",
    numbered: false,
    types: [
      {
        name: "can / can't",
        tag: "Ability · Possibility",
        accent: "olive",
        formula: "now: can / can't · past: could / couldn't",
        de: "können / nicht können",
        example: "She can swim, but she can't dive.",
      },
      {
        name: "must / have to",
        tag: "Necessity · Rules",
        accent: "ochre",
        formula: "now: must / have to · past: had to (never “musted”!)",
        de: "müssen",
        example: "I must finish my homework today.",
      },
      {
        name: "be able to",
        tag: "= Managed to",
        accent: "coral",
        formula: "now: am/is/are able to · past: was/were able to",
        de: "in der Lage sein · (es) schaffen",
        example: "He was able to fix the car.",
      },
      {
        name: "should",
        tag: "Advice · Recommendation",
        accent: "slate",
        formula: "now: should · past: should have + 3rd form",
        de: "sollen / sollte",
        example: "You should see a doctor.",
      },
      {
        name: "may",
        tag: "Permission · Politeness",
        accent: "violet",
        formula: "now: may · past: was/were allowed to",
        de: "dürfen · (Möglichkeit) können",
        example: "May I open the window, please?",
      },
      {
        name: "be allowed to",
        tag: "Permission",
        accent: "teal",
        formula: "now: am/is/are allowed to · past: was/were allowed to",
        de: "dürfen · die Erlaubnis haben",
        example: "We are allowed to leave early today.",
      },
    ],
    tensesLabel: "The 4 tenses — quick revision",
    tenses: [
      { tense: "Simple Present", use: "habits, facts and rules", example: "Ben lives in Sydney.", accent: "olive", signals: "every day, usually, often, always" },
      { tense: "Simple Past", use: "finished actions; a chain of events", example: "Yesterday they played volleyball.", accent: "ochre", signals: "yesterday, last week, ago, in 2020" },
      { tense: "Present Perfect", use: "a past action with a result now", example: "Ben has just finished breakfast.", accent: "coral", signals: "just, already, ever, yet, since, for" },
      { tense: "Past Progressive", use: "a longer background action in the past", example: "They were waiting on the beach.", accent: "progressive", signals: "while, when, at 9 a.m. yesterday" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · can, must, be able to — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Text · Ben's Day in Sydney",
          title: "Ben's Day in Sydney",
          highlight: {
            hint: "Wähle eine Farbe und markiere jede Zeitform im Text. · Choose a colour, then tap each verb form.",
            colors: [
              { label: "Simple Present", key: "present" },
              { label: "Simple Past", key: "past" },
              { label: "Present Perfect", key: "perfect" },
              { label: "Past Progressive", key: "progressive" },
            ],
          },
          paragraphs: [
            [
              "Ben lives in Sydney. Every morning he must get up at seven o'clock. He can see the ",
              { w: "harbour", de: "der Hafen" },
              " from his window. Today is Saturday, and Ben has just finished his breakfast.",
            ],
            [
              "Now he can meet his friends at the beach. Ben can swim very well, but his little sister can't, so she must stay near the ",
              { w: "lifeguards", de: "die Rettungsschwimmer" },
              ".",
            ],
            [
              "Yesterday the friends wanted to surf, but they couldn't, because the ",
              { w: "waves", de: "die Wellen" },
              " were too big. They had to wait for two hours. While they were waiting, they played beach volleyball.",
            ],
            [
              "At four o'clock the water was ",
              { w: "calm", de: "ruhig" },
              " again. Then Ben was able to catch his first wave. It was a great day!",
            ],
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Match the modals",
          intro: "Tap a modal verb, then tap its German meaning. Then Check.",
          options: ["können", "müssen", "sollen / sollte", "dürfen (höflich)", "(es) schaffen", "die Erlaubnis haben"],
          items: [
            { left: "can / can't", answer: "können" },
            { left: "must / have to", answer: "müssen" },
            { left: "should", answer: "sollen / sollte" },
            { left: "may", answer: "dürfen (höflich)" },
            { left: "be able to", answer: "(es) schaffen" },
            { left: "be allowed to", answer: "die Erlaubnis haben" },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Today or yesterday?",
          intro: "Sort each modal form: does it talk about TODAY (present) or YESTERDAY (past)? Check when you are ready.",
          groups: [
            { label: "🟢 TODAY (present)", items: ["can", "can't", "must", "am able to", "have to"] },
            { label: "🔵 YESTERDAY (past)", items: ["could", "couldn't", "had to", "was able to", "were able to"] },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Auswählen",
          title: "Today or yesterday? Choose!",
          intro: "Tap the correct form in each sentence, then Check.",
          layout: "dialogue",
          lines: [
            { speaker: "1.", segments: ["Every morning Ben ", { gap: 0 }, " get up at seven."] },
            { speaker: "2.", segments: ["Yesterday the friends ", { gap: 1 }, " surf."] },
            { speaker: "3.", segments: ["Yesterday they ", { gap: 2 }, " wait for two hours."] },
            { speaker: "4.", segments: ["Ben ", { gap: 3 }, " swim very well — he is a good swimmer."] },
            { speaker: "5.", segments: ["Yesterday Ben ", { gap: 4 }, " catch his first wave."] },
          ],
          gaps: [
            { options: ["must", "had to"], answer: "must" },
            { options: ["can't", "couldn't"], answer: "couldn't" },
            { options: ["must", "had to"], answer: "had to" },
            { options: ["can", "could"], answer: "can" },
            { options: ["is able to", "was able to"], answer: "was able to" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Fill in the right form",
          intro: "Complete each sentence. Word box: can · can't · must · had to · was able to",
          items: [
            { hint: "sie ist zu klein", segments: ["Ben's sister is small. She ", { answer: "can't", size: 8 }, " swim in the deep water."] },
            { hint: "es ist eine Regel", segments: ["At the beach you ", { answer: "must", size: 7 }, " stay near the lifeguards."] },
            { hint: "Fähigkeit jetzt", segments: ["Ben ", { answer: "can", size: 6 }, " see the harbour from his window."] },
            { hint: "Vergangenheit (müssen)", segments: ["Yesterday they ", { answer: "had to", size: 8 }, " wait for two hours."] },
            { hint: "Vergangenheit (schaffen)", segments: ["In the end Ben ", { answer: "was able to", size: 13 }, " catch his first wave. Super!"] },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Zeitform",
          title: "Which tense is it?",
          intro: "Choose the correct tense for each sentence from the text, then Check.",
          layout: "dialogue",
          lines: [
            { speaker: "1.", segments: ["Ben lives in Sydney. → ", { gap: 0 }] },
            { speaker: "2.", segments: ["Ben has just finished his breakfast. → ", { gap: 1 }] },
            { speaker: "3.", segments: ["While they were waiting … → ", { gap: 2 }] },
            { speaker: "4.", segments: ["It was a great day! → ", { gap: 3 }] },
          ],
          gaps: [
            { options: ["Simple Present", "Simple Past", "Present Perfect", "Past Progressive"], answer: "Simple Present" },
            { options: ["Simple Present", "Simple Past", "Present Perfect", "Past Progressive"], answer: "Present Perfect" },
            { options: ["Simple Present", "Simple Past", "Present Perfect", "Past Progressive"], answer: "Past Progressive" },
            { options: ["Simple Present", "Simple Past", "Present Perfect", "Past Progressive"], answer: "Simple Past" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Today → yesterday",
          intro: "Write each sentence in the Simple Past, starting with “Yesterday …”.",
          starters: [
            "Today Ben can meet his friends. → Yesterday Ben …",
            "Today he must get up at seven. → Yesterday he …",
            "Today they can't surf. → Yesterday they …",
          ],
          help: "Denk an: can → could · must → had to · can't → couldn't",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · can, must / have to, be able to — positiv und negativ",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Text · Ben's Day in Sydney",
          title: "Ben's Day in Sydney",
          highlight: {
            hint: "Wähle eine Farbe und markiere jede Zeitform im Text. · Choose a colour, then tap each verb form.",
            colors: [
              { label: "Simple Present", key: "present" },
              { label: "Simple Past", key: "past" },
              { label: "Present Perfect", key: "perfect" },
              { label: "Past Progressive", key: "progressive" },
            ],
          },
          paragraphs: [
            [
              "Ben lives with his family in Sydney, Australia. On school days he must get up at half past six. From his room he can see the famous Harbour Bridge. Today is Saturday, so he doesn't have to ",
              { w: "hurry", de: "sich beeilen" },
              ". He has just eaten breakfast on the balcony.",
            ],
            [
              "Now he can spend the whole day at Bondi Beach. Ben can surf quite well, but he can't ",
              { w: "dive", de: "tauchen" },
              ". At the beach everybody must follow the lifeguards' rules: you must swim between the red and yellow flags.",
            ],
            [
              "Yesterday Ben and his friends couldn't go into the water in the morning. The lifeguards had to close the beach because of a ",
              { w: "shark alarm", de: "der Hai-Alarm" },
              ". The boys had to wait on the sand. While they were waiting, a helicopter was circling over the bay.",
            ],
            [
              "After two hours the lifeguards were able to open the beach again. In the end, Ben was able to catch the best wave of his life.",
            ],
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Present & past partners",
          intro: "Match each present form to its past partner, then Check.",
          options: ["could", "couldn't", "had to", "didn't have to", "was / were able to"],
          items: [
            { left: "can", answer: "could" },
            { left: "can't", answer: "couldn't" },
            { left: "must / have to", answer: "had to" },
            { left: "doesn't have to", answer: "didn't have to" },
            { left: "be able to", answer: "was / were able to" },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Auswählen",
          title: "Choose the correct form",
          intro: "Tap the correct form in each sentence, then Check.",
          layout: "dialogue",
          lines: [
            { speaker: "1.", segments: ["On school days Ben ", { gap: 0 }, " get up at half past six."] },
            { speaker: "2.", segments: ["Yesterday the lifeguards ", { gap: 1 }, " close the beach."] },
            { speaker: "3.", segments: ["Ben ", { gap: 2 }, " surf quite well, but he ", { gap: 3 }, " dive."] },
            { speaker: "4.", segments: ["In the morning the boys ", { gap: 4 }, " go into the water."] },
            { speaker: "5.", segments: ["After two hours they ", { gap: 5 }, " surf again."] },
            { speaker: "6.", segments: ["It's Saturday, so Ben ", { gap: 6 }, " hurry today."] },
          ],
          gaps: [
            { options: ["must", "had to"], answer: "must" },
            { options: ["must", "had to"], answer: "had to" },
            { options: ["can", "could"], answer: "can" },
            { options: ["can't", "couldn't"], answer: "can't" },
            { options: ["can't", "couldn't"], answer: "couldn't" },
            { options: ["are able to", "were able to"], answer: "were able to" },
            { options: ["doesn't have to", "didn't have to"], answer: "doesn't have to" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Fill in the correct modal form",
          intro: "Complete the beach rules and the story. Use: can · can't · must · had to · couldn't · was/were able to",
          items: [
            { hint: "the most important rule", segments: ["Everybody ", { answer: "must", size: 7 }, " swim between the flags."] },
            { hint: "too dangerous — forbidden", segments: ["You ", { answer: "can't", accept: ["must not", "mustn't"], size: 9 }, " swim alone at night."] },
            { hint: "it is allowed", segments: ["Small children ", { answer: "can", size: 6 }, " play in the shallow water near their parents."] },
            { hint: "past necessity", segments: ["Last Sunday there was a storm, so we ", { answer: "had to", size: 8 }, " leave the beach early."] },
            { hint: "nobody managed it", segments: ["The waves were huge — nobody ", { answer: "couldn't", accept: ["could not", "was able to"], size: 9 }, " surf."] },
            { hint: "one day later — success", segments: ["Luckily, one day later we ", { answer: "were able to", accept: ["was able to"], size: 13 }, " surf again."] },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zeitform",
          title: "Tense detective",
          intro: "Match each tense to an example from the text, then Check.",
          options: [
            "Ben lives with his family in Sydney. (1)",
            "The lifeguards had to close the beach. (11)",
            "He has just eaten breakfast on the balcony. (5)",
            "…a helicopter was circling over the bay. (13)",
          ],
          items: [
            { left: "Simple Present", answer: "Ben lives with his family in Sydney. (1)" },
            { left: "Simple Past", answer: "The lifeguards had to close the beach. (11)" },
            { left: "Present Perfect", answer: "He has just eaten breakfast on the balcony. (5)" },
            { left: "Past Progressive", answer: "…a helicopter was circling over the bay. (13)" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Umschreiben",
          title: "Rewrite: last Saturday",
          intro: "This is what Ben does EVERY Saturday. Rewrite it about LAST Saturday — change every verb and modal into the past. Start: “Last Saturday Ben didn't have to go to school. He could …”",
          lines: [
            "Every Saturday Ben doesn't have to go to school. He can sleep until nine o'clock. After breakfast he must clean his room. Then he can cycle to the beach, but he can't stay after sunset.",
          ],
          answer: true,
          help: "doesn't have to → didn't have to · can → could · must → had to · can't → couldn't",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Revision of the 4 tenses",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Text · Ben's Day in Sydney",
          title: "Ben's Day in Sydney",
          highlight: {
            hint: "Wähle eine Farbe und markiere jede Zeitform im Text. · Choose a colour, then tap each verb form.",
            colors: [
              { label: "Simple Present", key: "present" },
              { label: "Simple Past", key: "past" },
              { label: "Present Perfect", key: "perfect" },
              { label: "Past Progressive", key: "progressive" },
            ],
          },
          paragraphs: [
            [
              "Ben has lived in Sydney for three years, but he still discovers something new every week. On weekdays he gets up early because his school is on the other side of the harbour. He usually takes the ferry, and from the deck he watches the Opera House in the morning sun. Today, however, is Saturday.",
            ],
            [
              "Ben has just finished his surf training at Bondi Beach. He trains there every weekend because the waves are perfect. Yesterday, however, the beach was closed because of a shark alarm. Ben and his friends waited on the sand for two hours.",
            ],
            [
              "While they were waiting, a rescue helicopter was circling over the bay. Suddenly the loudspeakers ",
              { w: "crackled", de: "knisterten / knackten" },
              ", and everyone looked at the water. A dark ",
              { w: "shadow", de: "der Schatten" },
              " was moving slowly through the bay. After two long hours, the lifeguards opened the beach again.",
            ],
            [
              "Ben ",
              { w: "paddled out", de: "paddelte hinaus" },
              " immediately and caught the biggest wave of the season. He has told this story about five times since yesterday. His friends have already heard enough of it!",
            ],
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Sort the verb forms",
          intro: "Sort each verb form from the text into its tense, then Check.",
          groups: [
            { label: "Simple Present", items: ["discovers", "takes"] },
            { label: "Simple Past", items: ["waited", "opened"] },
            { label: "Present Perfect", items: ["has lived", "has told"] },
            { label: "Past Progressive", items: ["were waiting", "was circling"] },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Mixed gap fill",
          intro: "Put the verb in brackets into the correct tense, then Check.",
          items: [
            { hint: "since 2023 → still true", segments: ["Ben ", { answer: "has lived", accept: ["has been living"], size: 12 }, " (live) in Sydney since 2023."] },
            { hint: "a general fact", segments: ["Sharks ", { answer: "are", size: 6 }, " (be) a natural part of Australian waters — that is a fact."] },
            { hint: "just → result now", segments: ["Look, the flags are up! The lifeguards ", { answer: "have just opened", size: 17 }, " (just / open) the beach."] },
            { hint: "yesterday at noon", segments: ["Yesterday at noon Ben ", { answer: "paddled", size: 9 }, " (paddle) out and ", { answer: "caught", size: 8 }, " (catch) a huge wave."] },
            { hint: "long background + short action", segments: ["While the helicopter ", { answer: "was circling", size: 13 }, " (circle) over the bay, the boys ", { answer: "were playing", size: 13 }, " (play) volleyball."] },
            { hint: "never … in her life", segments: ["Emma ", { answer: "has never seen", size: 15 }, " (never / see) a koala in the wild — maybe next year!"] },
            { hint: "last Sunday", segments: ["The water ", { answer: "was", size: 6 }, " (be) ice-cold when we ", { answer: "jumped", size: 8 }, " (jump) in last Sunday."] },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Auswählen",
          title: "Simple Past or Present Perfect?",
          intro: "Tap the correct form. The signal word or time expression will help you. Then Check.",
          layout: "dialogue",
          lines: [
            { speaker: "1.", segments: ["Ben ", { gap: 0 }, " his first wave three years ago."] },
            { speaker: "2.", segments: ["Ben ", { gap: 1 }, " this story five times since yesterday."] },
            { speaker: "3.", segments: ["I ", { gap: 2 }, " kangaroo meat in my life."] },
            { speaker: "4.", segments: ["We ", { gap: 3 }, " the Opera House last summer."] },
            { speaker: "5.", segments: ["Hurry up! The ferry ", { gap: 4 }, "."] },
            { speaker: "6.", segments: ["Captain Cook ", { gap: 5 }, " Australia in 1770."] },
          ],
          gaps: [
            { options: ["caught", "has caught"], answer: "caught" },
            { options: ["told", "has told"], answer: "has told" },
            { options: ["never ate", "have never eaten"], answer: "have never eaten" },
            { options: ["visited", "have visited"], answer: "visited" },
            { options: ["just arrived", "has just arrived"], answer: "has just arrived" },
            { options: ["reached", "has reached"], answer: "reached" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Satzbau",
          title: "Background and interruption",
          intro: "Make ONE sentence from each pair. Use while + Past Progressive for the longer action and Simple Past for the shorter one.",
          starters: [
            "Ben / surf + a dolphin / appear next to him → While Ben …",
            "the tourists / take photos + a seagull / steal their chips → While …",
            "the helicopter / circle over the bay + the lifeguards / clear the beach → While …",
          ],
          help: "Longer action = while + was/were + -ing; shorter action = Simple Past.",
        },
        {
          type: "written",
          kind: "Schreiben · Verbessern",
          title: "Edit the tourist review",
          intro: "This review of Bondi Beach has SIX tense mistakes. Find them and rewrite the whole review correctly.",
          lines: [
            "I have visited Bondi Beach last Sunday. The weather was perfect, and an hour later I swim in the ocean. While we waited for the surf lesson, a helicopter circles over the bay because of a shark alarm. We were surprised, but the lifeguards knew exactly what to do — they have closed the beach in only five minutes. I visit this beach three times so far, and I will definitely come back!",
          ],
          answer: true,
          help: "Watch for: Simple Past with 'last Sunday' / Present Perfect with 'so far', and Past Progressive for the background action.",
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Put it all together",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "My unforgettable day Down Under",
          intro:
            "Imagine one amazing day in Australia and write a diary entry about it (100–140 words). Use modals AND all four tenses — tick each requirement off as you go.",
          chips: [
            { n: "01", label: "can / could (ability)" },
            { n: "02", label: "had to (a rule)" },
            { n: "03", label: "was/were able to (success)" },
            { n: "04", label: "while + Past Progressive" },
            { n: "05", label: "Present Perfect ending" },
          ],
          min: 100,
          max: 140,
          placeholder: "Write your diary entry here…",
          checklist: [
            "I used can or could (an ability).",
            "I used had to (a rule or necessity in the past).",
            "I used was/were able to (something I finally managed).",
            "I wrote one while + Past Progressive sentence.",
            "I finished with a Present Perfect sentence (e.g. “What a day it has been!”).",
            "My text is about 100–140 words.",
          ],
          help: "Tip: start “Dear diary,” and tell the story as if it really happened today.",
        },
      ],
    },
  ],
};
