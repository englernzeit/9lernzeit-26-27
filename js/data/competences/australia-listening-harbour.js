/**
 * Listening Harbour (Australia · Unit 1) — Listening:
 * "Are Australian teenagers different?"
 *
 * Built from the user's draft (a phone-in radio show with two callers,
 * Charlene and Oscar) as a DIRECTION and mapped onto our four
 * language-level Steps. The draft is an exam-style task (fact-file
 * completion + a single-answer multiple choice) — that is E-Kurs, so it
 * lives in Step 3. Step 1 (LE) and Step 2 (G-Kurs) are the same listening
 * differentiated DOWN with more support, and Step 4 is a creative task.
 *
 * Audio: assets/audio/au-teens.mp3 (the full radio phone-in, re-encoded to
 * mono 64k). Because carousels show one card at a time, every card that
 * needs the track carries its own `audio` player.
 *
 * Vocabulary (newWords + Word Master) comes from the user's Unit 1
 * Listening word table; sentences are written a level up and the Word
 * Master is SHUFFLED so the order never matches the cards.
 */

const AUD = "assets/audio";

export default {
  title: "Are Australian Teenagers Different?",

  newWords: {
    subtitle: "15 words for this unit",
    stampLabel: "ON AIR",
    words: [
      { en: "to face sth.", de: "vor etwas stehen (Problem)", ex: "Many outback towns face a serious shortage of doctors and teachers." },
      { en: "to dig", de: "graben", ex: "During the gold rush thousands of hopeful miners came to dig for their fortune." },
      { en: "trade", de: "der Handel", ex: "For over a century the wool and wheat trade made Australia's coastal cities rich." },
      { en: "liveable", de: "lebenswert", ex: "Melbourne is regularly voted one of the most liveable cities in the world." },
      { en: "neither", de: "keine/r/s (von beiden)", ex: "Neither Charlene nor Oscar believes that Australian teenagers are truly different." },
      { en: "remote", de: "entlegen, abgelegen", ex: "Some families live on stations so remote that the nearest neighbour is hours away." },
      { en: "to suffer (from)", de: "leiden (an), erleiden", ex: "The dry interior often suffers from long droughts and dangerous bushfires." },
      { en: "to cool down", de: "sich abkühlen; sich beruhigen", ex: "After a scorching day the desert cools down fast once the sun has set." },
      { en: "care", de: "die Sorgfalt / Vorsicht", ex: "Treat a jellyfish sting with care, or you may make the pain even worse." },
      { en: "to bleed", de: "bluten", ex: "Press hard on the cut so that it does not bleed too much." },
      { en: "to take sb.'s temperature", de: "(bei jm.) Fieber messen", ex: "The school nurse took his temperature before sending him home." },
      { en: "lifeguard", de: "der/die Rettungsschwimmer/in", ex: "A watchful lifeguard rescued two swimmers who had drifted past the flags." },
      { en: "wide", de: "breit, weit", ex: "The Nullarbor stretches across a wide, treeless plain of red earth." },
      { en: "inland", de: "landeinwärts, im Landesinneren", ex: "The further you travel inland, the hotter and drier the landscape becomes." },
      { en: "to gather", de: "sammeln; (sich) versammeln", ex: "Every evening the whole family would gather around the radio to listen to the show." },
    ],
  },

  // Word Master — 15 gap-fills, one level up and SHUFFLED (order ≠ the
  // word cards) with non-give-away gaps.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Manche Familien leben auf sehr **entlegenen** Farmen.", en: "Some families live on very ___ farms.", answer: "remote" },
      { de: "Jeden Abend **versammelte** sich die ganze Familie am Radio.", en: "Every evening the whole family ___ed around the radio.", answer: "gather" },
      { de: "Eine tiefe Wunde kann stark **bluten**.", en: "A deep wound can ___ heavily.", answer: "bleed" },
      { de: "Melbourne gilt als eine der **lebenswertesten** Städte der Welt.", en: "Melbourne is seen as one of the most ___ cities in the world.", answer: "liveable" },
      { de: "Die Bergleute kamen, um nach Gold zu **graben**.", en: "The miners came to ___ for gold.", answer: "dig" },
      { de: "Behandle einen Quallenstich mit **Vorsicht**.", en: "Treat a jellyfish sting with ___.", answer: "care" },
      { de: "Je weiter man **landeinwärts** fährt, desto heißer wird es.", en: "The further you travel ___, the hotter it gets.", answer: "inland" },
      { de: "**Weder** Charlene **noch** Oscar hält sich für anders.", en: "___ Charlene nor Oscar thinks she or he is different.", answer: "neither" },
      { de: "Ein aufmerksamer **Rettungsschwimmer** rettete zwei Schwimmer.", en: "A watchful ___ rescued two swimmers.", answer: "lifeguard" },
      { de: "Das Landesinnere **leidet** oft **unter** langer Dürre.", en: "The interior often ___s from long droughts.", answer: "suffer" },
      { de: "Die Ebene erstreckt sich über eine **weite**, baumlose Fläche.", en: "The plain stretches over a ___, treeless area.", answer: "wide" },
      { de: "Der Woll- und Weizen**handel** machte viele Städte reich.", en: "The wool and wheat ___ made many cities rich.", answer: "trade" },
      { de: "Nach einem heißen Tag **kühlt** die Wüste schnell **ab**.", en: "After a hot day the desert ___s down quickly.", answer: "cool" },
      { de: "Viele Outback-Städte **stehen vor** einem Ärztemangel.", en: "Many outback towns ___ a shortage of doctors.", answer: "face" },
      { de: "Die Krankenschwester **maß** ihm **Fieber**.", en: "The nurse took his ___.", answer: "temperature" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "LE · Meet the two callers — with help on German",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Hören · LE",
          title: "A phone-in radio show",
          paragraphs: [
            [
              "On this radio show, young people ",
              { w: "phone in", de: "anrufen (in eine Sendung)" },
              " and talk about their lives. Today two teenagers call: ",
              { w: "Charlene", de: "(ein Mädchen)" },
              " from a small town, and ",
              { w: "Oscar", de: "(ein Junge)" },
              " from a big city.",
            ],
            [
              "The host asks them about their age, their family, their ",
              { w: "hobbies", de: "Hobbys" },
              " and their plans. Listen well — you will fill in facts about both of them.",
            ],
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Listen and choose",
          intro: "Listen to the show, then choose the right answer. You see at once if you are right.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          questions: [
            { q: "How old is Charlene?", options: ["13", "14", "15", "16", "17"], correct: 2 },
            { q: "Where does Charlene live?", options: ["Donnybrook, Western Australia", "Sydney", "Melbourne", "London", "Hong Kong"], correct: 0 },
            { q: "Which sport does Charlene play?", options: ["Tennis", "Football", "Cricket", "Basketball", "Golf"], correct: 0 },
            { q: "Where does Oscar live?", options: ["Melbourne", "Donnybrook", "Perth", "Brisbane", "Cairns"], correct: 0 },
            { q: "Which band does Charlene love?", options: ["ABBA", "The Beatles", "Coldplay", "Queen", "ACDC"], correct: 0 },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Wer ist das?",
          title: "Charlene or Oscar?",
          intro: "Listen again, then sort each fact under the right caller. Check when you are ready.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          groups: [
            { label: "👧 Charlene", items: ["Lives in Donnybrook", "Her parents are fruit farmers", "Loves tennis and swimming", "Wants to study biology", "Is a big ABBA fan"] },
            { label: "👦 Oscar", items: ["Lives in Melbourne", "His dad is a doctor", "Loves debating and the internet", "Wants to study Chinese and Japanese", "Chats with kids in Hong Kong"] },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "The basic facts",
          intro: "Type the missing word or number, then press Check.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          items: [
            { hint: "wie alt?", segments: ["Charlene is ", { answer: "15", accept: ["fifteen"], size: 6 }, " years old."] },
            { hint: "die kleine Stadt", segments: ["Charlene lives in ", { answer: "Donnybrook", size: 12 }, "."] },
            { hint: "die große Stadt", segments: ["Oscar lives in ", { answer: "Melbourne", size: 11 }, "."] },
            { hint: "Beruf des Vaters", segments: ["Oscar's father is a ", { answer: "doctor", size: 9 }, "."] },
            { hint: "die Lieblingsband", segments: ["Charlene loves the band ", { answer: "ABBA", accept: ["abba"], size: 7 }, "."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Use it — about you",
          intro: "Finish each sentence so it is true for you.",
          starters: [
            "My favourite hobby is …",
            "When I finish school I want to …",
            "A song I would request on the radio is …",
          ],
          help: "Hilfe: hobby = Hobby · to finish school = die Schule beenden · to request a song = ein Lied wünschen",
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the word from this unit, letter by letter — and save the hero!",
          words: [
            { word: "REMOTE", hint: "Far away, hard to reach" },
            { word: "LIFEGUARD", hint: "Keeps swimmers safe at the beach" },
            { word: "INLAND", hint: "Away from the coast, towards the centre" },
            { word: "TRADE", hint: "Buying and selling goods" },
            { word: "GATHER", hint: "Come together in one place" },
            { word: "LIVEABLE", hint: "Pleasant and comfortable to live in" },
            { word: "BLEED", hint: "What a deep cut does" },
            { word: "NEITHER", hint: "Not the one and not the other" },
            { word: "WIDE", hint: "The opposite of narrow" },
            { word: "SUFFER", hint: "To feel pain or hardship" },
            { word: "CARE", hint: "Doing something with attention, not carelessly" },
            { word: "DIG", hint: "Make a hole in the ground" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · The fact file — with support",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "event-order",
          kind: "Interaktiv · Reihenfolge",
          title: "Put the show in order",
          intro: "Listen to the whole show, then number the six moments 1–6 in the right order and Check.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          events: [
            { text: "Charlene tells the host she is 15 and lives in Donnybrook." },
            { text: "Charlene talks about reading, music and tennis." },
            { text: "Charlene says she wants to study biology and travel around Europe." },
            { text: "Oscar calls in from Melbourne and describes his parents' jobs." },
            { text: "Oscar explains that he loves debating but hates sport." },
            { text: "Oscar says he wants to study Chinese and Japanese at university." },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Listen and understand",
          intro: "Listen again if you need to, then choose the best answer.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          questions: [
            { q: "What do Charlene's parents do?", options: ["They own a fruit farm", "They run a restaurant", "They are both teachers", "They work in a shop", "They are lifeguards"], correct: 0 },
            { q: "Why can Oscar make the phone call?", options: ["His parents are at work", "It is a school holiday", "He is at the radio station", "His teacher allowed it", "He is ill at home"], correct: 0 },
            { q: "Where does Oscar's mother work?", options: ["At the University of Melbourne", "At a hospital", "On a fruit farm", "At a radio station", "At a tennis club"], correct: 0 },
            { q: "How does Oscar feel about sport?", options: ["He doesn't like it", "He loves cricket", "He plays every day", "He wants to be a coach", "He only likes swimming"], correct: 0 },
            { q: "Where is Oscar going in his next holidays?", options: ["To Hong Kong", "To Europe", "To India", "To the beach", "To Donnybrook"], correct: 0 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Complete the summary",
          intro: "Fill each gap with one word or number from the show, then Check.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          items: [
            { hint: "welche Art von Farm?", segments: ["Charlene's parents own a ", { answer: "fruit", size: 8 }, " farm."] },
            { hint: "die Entfernung zum Strand", segments: ["The nearest beach is about ", { answer: "40", accept: ["forty"], size: 6 }, " kilometres away."] },
            { hint: "Oscars Mutter unterrichtet English ___", segments: ["Oscar's mother teaches English ", { answer: "literature", size: 12 }, " at university."] },
            { hint: "online spricht er in ___ rooms", segments: ["Oscar spends a lot of time in ", { answer: "chat", size: 7 }, " rooms online."] },
            { hint: "diese Sprache lernt er schon", segments: ["Oscar already learns ", { answer: "Chinese", size: 9 }, " at school."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "In full sentences",
          intro: "Answer in complete sentences.",
          starters: [
            "Charlene and Oscar are similar because …",
            "One big difference between them is …",
            "The caller I would rather meet is … because …",
          ],
          help: "Write full sentences — begin with a capital letter and end with a full stop.",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · The exam task — complete both fact files",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "gap-fill",
          kind: "Interaktiv · Fact file",
          title: "Fact file — the facts",
          intro: "Listen carefully and complete each fact file in 1–5 words or numbers, then Check.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          items: [
            { hint: "Charlene · age", segments: ["Charlene is ", { answer: "15", accept: ["fifteen"], size: 6 }, " years old."] },
            { hint: "Charlene · her family's farm", segments: ["Her family owns a ", { answer: "fruit", size: 8 }, " farm."] },
            { hint: "Charlene · plans (subject)", segments: ["She would like to study ", { answer: "biology", size: 10 }, " at university."] },
            { hint: "Charlene · music request (band)", segments: ["Her music request is a song by ", { answer: "ABBA", accept: ["abba"], size: 7 }, "."] },
            { hint: "Oscar · place of living", segments: ["Oscar lives in ", { answer: "Melbourne", size: 11 }, "."] },
            { hint: "Oscar · dad's job", segments: ["His father is a ", { answer: "doctor", size: 9 }, " at the Royal Children's Hospital."] },
            { hint: "Oscar · mum's job", segments: ["His mother is a ", { answer: "teacher", accept: ["lecturer"], size: 10 }, " of English literature."] },
            { hint: "Oscar · plans (the other language)", segments: ["Oscar wants to study Chinese and ", { answer: "Japanese", size: 10 }, " at university."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Fact file",
          title: "Fact file — the lists",
          intro: "Some rows of the fact file need more than one answer. Listen again and write the lists.",
          audio: { src: `${AUD}/au-teens.mp3`, label: "Radio phone-in · Charlene & Oscar" },
          starters: [
            "Charlene — name THREE hobbies: …",
            "Charlene — name TWO plans for the future: …",
            "Charlene — sends greetings to (two): …",
            "Oscar — name TWO hobbies: …",
            "Oscar — name TWO plans for the future: …",
            "Oscar — sends greetings to (two): …",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Are Australian teenagers different?",
          intro: "Only one answer is correct. Then choose the reason each caller gives.",
          questions: [
            {
              q: "What do Charlene and Oscar think about Australian teenagers?",
              options: [
                "They are not sure whether Australian teenagers are different.",
                "Teenagers like the same music but have very different attitudes to school.",
                "Teenagers are almost the same everywhere in the world.",
                "Australian teenagers are completely different because of the climate.",
                "Only teenagers who use the internet are similar.",
              ],
              correct: 2,
            },
            {
              q: "Which reason does Charlene give?",
              options: [
                "Teenagers everywhere like the same music, fashions and stars.",
                "All teenagers hate sport.",
                "Everyone in the world lives near a beach.",
                "Teenagers everywhere study biology.",
                "Everyone wants to see snow in winter.",
              ],
              correct: 0,
            },
            {
              q: "Which reason does Oscar give?",
              options: [
                "He chats online with young people all over the world who share his interests.",
                "He has already visited every country in Asia.",
                "He believes Australians are completely unique.",
                "He only ever talks to people in Melbourne.",
                "He dislikes the internet and never uses it.",
              ],
              correct: 0,
            },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Belege",
          title: "Find the evidence",
          intro: "Use what the callers say to finish each sentence, then add your own opinion.",
          starters: [
            "Charlene thinks teenagers are the same everywhere because …",
            "Oscar thinks so because …",
            "In my opinion teenagers around the world are (not) really the same because …",
          ],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Design your radio show",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "poster-builder",
          kind: "Projekt · Challenge",
          title: "Your own radio show",
          intro:
            "Your project: design a promo poster for your own teen radio show, inspired by the phone-in you heard. Fill each line on the right and watch the poster build on the left.",
          prompts: {
            headline: { label: "Show name", placeholder: "TEEN WAVES FM" },
            subhead: { label: "Slogan", placeholder: "Made by teenagers, for teenagers" },
            tip1: { label: "We talk about", placeholder: "School, hobbies and the future." },
            tip2: { label: "Call in about", placeholder: "Anything on your mind." },
            tip3: { label: "Every show", placeholder: "One song chosen by a caller." },
            emergency: { label: "Catchphrase", placeholder: "Turn it up — this is your wave!" },
          },
          help: "Tip: think about what Charlene and Oscar talked about on the show, then make it your own.",
        },
      ],
    },
  ],
};
