/**
 * Vocabulary Beach (Australia · Unit 1) — Vocabulary & Mediation.
 *
 * Two content strands, built from the user's material as a DIRECTION:
 *   • Step 1  — Deadly or safe? Australian creatures. Learn and quiz the
 *     animals from the two stamp sheets (artwork cut out; names corrected:
 *     Kangoroo→Kangaroo, Kookabnn→Kookaburra, "Cohkks"→Platypus, "Cone
 *     Shair"→Cone Snail; the "Redback Spider" stamp actually shows a
 *     blue-ringed octopus, so it is labelled accordingly).
 *   • Steps 2–3 — Understanding a real bushfire-safety info poster
 *     (Queensland Government, "PREPARE · ACT · SURVIVE"). Step 2 is
 *     comprehension (G-Kurs), Step 3 is Mediation (E-Kurs): passing the
 *     poster's information on to German-speaking family.
 *   • Step 4  — a creative mediation challenge: warn a friend by message.
 *
 * No newWords postcard section here — the creature images and the poster
 * are the vocabulary. Images: assets/images/unit1/creatures/*.jpg and
 * assets/images/unit1/bushfire-poster.jpg.
 */

const CRE = "assets/images/unit1/creatures";
const POSTER = "assets/images/unit1/bushfire-poster.jpg";
const POSTER_ALT = "Queensland Government bushfire-safety poster: Prepare, Act, Survive";

export default {
  title: "Vocabulary & Mediation",

  pictureVocab: {
    base: "assets/images/picvocab",
    courses: [
      { key: "gkurs", dir: "GKurs/Vocabulary", name: "Grundkurs", tag: "GKurs · Vocabulary", count: 0 },
      { key: "ekurs", dir: "EKurs/Vocabulary", name: "Erweiterungskurs", tag: "EKurs · Vocabulary", count: 15 },
    ],
  },

  steps: [
    /* ============ STEP 1 — Deadly or safe creatures ============ */
    {
      step: 1,
      subtitle: "Deadly or safe? — Australian creatures",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · LE",
          title: "Deadly or safe?",
          paragraphs: [
            [
              "Australia is famous for its animals. Some are ",
              { w: "deadly", de: "tödlich" },
              " — they can really hurt you — and some are completely ",
              { w: "harmless", de: "harmlos" },
              ".",
            ],
            [
              "In this step you learn the names of 18 creatures and decide which ones are ",
              { w: "dangerous", de: "gefährlich" },
              " and which are safe. Look closely at each picture!",
            ],
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Deadly or safe?",
          intro: "Here are all 18 creatures. Tap a picture, then tap the box it belongs in — is it deadly or harmless? Check when you are ready.",
          groups: [
            {
              label: "☠️ Deadly",
              items: [
                { image: `${CRE}/box-jellyfish.jpg`, label: "Box Jellyfish" },
                { image: `${CRE}/saltwater-crocodile.jpg`, label: "Saltwater Crocodile" },
                { image: `${CRE}/funnel-web-spider.jpg`, label: "Funnel-web Spider" },
                { image: `${CRE}/blue-ringed-octopus.jpg`, label: "Blue-ringed Octopus" },
                { image: `${CRE}/tiger-snake.jpg`, label: "Tiger Snake" },
                { image: `${CRE}/great-white-shark.jpg`, label: "Great White Shark" },
                { image: `${CRE}/cassowary.jpg`, label: "Cassowary" },
                { image: `${CRE}/cone-snail.jpg`, label: "Cone Snail" },
              ],
            },
            {
              label: "🧸 Safe",
              items: [
                { image: `${CRE}/koala.jpg`, label: "Koala" },
                { image: `${CRE}/kangaroo.jpg`, label: "Kangaroo" },
                { image: `${CRE}/wombat.jpg`, label: "Wombat" },
                { image: `${CRE}/quokka.jpg`, label: "Quokka" },
                { image: `${CRE}/kookaburra.jpg`, label: "Kookaburra" },
                { image: `${CRE}/platypus.jpg`, label: "Platypus" },
                { image: `${CRE}/wallaby.jpg`, label: "Wallaby" },
                { image: `${CRE}/echidna.jpg`, label: "Echidna" },
                { image: `${CRE}/possum.jpg`, label: "Possum" },
                { image: `${CRE}/blue-tongue-lizard.jpg`, label: "Blue-tongue Lizard" },
              ],
            },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Creature quiz — amazing facts",
          intro: "Read each fact and choose the animal it is about. Ten questions, ten animals!",
          columns: 2,
          questions: [
            { q: "About twenty swimmers in Australia are killed by this animal every year.", options: ["Cassowary", "Great White Shark", "Koala", "Tiger Snake", "Wombat"], correct: 1 },
            { q: "This spider's venom can kill a person in about fifteen minutes.", options: ["Funnel-web Spider", "Quokka", "Kookaburra", "Possum", "Wallaby"], correct: 0 },
            { q: "This reptile can grow up to five metres long and lurks near the coast.", options: ["Blue-tongue Lizard", "Echidna", "Saltwater Crocodile", "Platypus", "Koala"], correct: 2 },
            { q: "Its sting can stop your heart, so it must be treated at once.", options: ["Wombat", "Cone Snail", "Kangaroo", "Box Jellyfish", "Wallaby"], correct: 3 },
            { q: "This small sea animal flashes bright blue rings and has a venomous bite.", options: ["Quokka", "Possum", "Koala", "Kookaburra", "Blue-ringed Octopus"], correct: 4 },
            { q: "This tall, flightless bird can kick hard enough to injure a person.", options: ["Cassowary", "Kookaburra", "Quokka", "Wombat", "Koala"], correct: 0 },
            { q: "This beautiful shell hides a creature with a deadly harpoon.", options: ["Blue-tongue Lizard", "Echidna", "Cone Snail", "Wombat", "Possum"], correct: 2 },
            { q: "It is one of Australia's most venomous land snakes.", options: ["Tiger Snake", "Platypus", "Quokka", "Wallaby", "Koala"], correct: 0 },
            { q: "This egg-laying mammal has a venomous spur on its back foot.", options: ["Echidna", "Wombat", "Platypus", "Possum", "Koala"], correct: 2 },
            { q: "This spiny, egg-laying animal rolls into a ball to protect itself.", options: ["Quokka", "Echidna", "Wallaby", "Possum", "Kangaroo"], correct: 1 },
          ],
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the Australian creature, letter by letter — and save the hero!",
          words: [
            { word: "KOALA", hint: "Grey, sleepy, lives in gum trees" },
            { word: "WOMBAT", hint: "Round, digging marsupial" },
            { word: "QUOKKA", hint: "The 'happiest animal', loves a selfie" },
            { word: "PLATYPUS", hint: "Egg-laying mammal with a duck bill" },
            { word: "ECHIDNA", hint: "Spiny anteater" },
            { word: "WALLABY", hint: "Like a small kangaroo" },
            { word: "POSSUM", hint: "Night animal with a long tail" },
            { word: "CROCODILE", hint: "Big reptile in northern rivers" },
            { word: "JELLYFISH", hint: "Its tentacles can sting" },
            { word: "CASSOWARY", hint: "Large, dangerous flightless bird" },
            { word: "SNAKE", hint: "Long reptile, some are venomous" },
            { word: "SHARK", hint: "Ocean predator with sharp teeth" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — Bushfire poster: get the facts ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Understand a bushfire-safety poster",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "image",
          kind: "Poster · Bushfire Safety",
          title: "Read the poster first",
          intro: "This is a real safety poster from the Queensland Government for Brisbane. Read all seven sections carefully — the tasks below are all about it.",
          image: POSTER,
          imageAlt: POSTER_ALT,
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "What does the poster say?",
          intro: "Look back at the poster on the first card, then choose the correct answer.",
          questions: [
            { q: "What number do you call for Police, Fire or Ambulance?", options: ["000", "112", "911", "999", "132 500"], correct: 0 },
            { q: "Which number is for SES help with floods, storms and fallen trees?", options: ["132 500", "000", "1800 22 66 77", "911", "112"], correct: 0 },
            { q: "What should you do with gas bottles around your house?", options: ["Move them away from the house", "Open them slightly", "Store them under the deck", "Leave them by the door", "Fill them with water"], correct: 0 },
            { q: "If you stay inside during a bushfire, you should…", options: ["Close doors and windows and block gaps with wet towels", "Open all the windows for fresh air", "Turn on the evaporative air conditioner", "Go outside to watch the fire", "Stand near the windows"], correct: 0 },
            { q: "How can you stay informed about the fire?", options: ["Listen to ABC Local Radio and check the 'QFES Alerts' app", "Wait for a letter in the post", "Ask a neighbour later", "Only trust rumours online", "Do nothing and hope"], correct: 0 },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Before or after the fire?",
          intro: "The poster tells you what to do at different times. Sort each action, then Check.",
          groups: [
            { label: "🔜 BEFORE the fire", items: ["Pack essential documents and medications", "Clear dry leaves from gutters and roof", "Trim trees and shrubs away from the house", "Move gas bottles away from the house"] },
            { label: "✅ AFTER the fire", items: ["Wait for authorities to say it is safe", "Check for gas leaks and fallen power lines", "Document the damage for insurance", "Check your property before entering"] },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Numbers & sources",
          intro: "Match each number or source to what it is for, then Check.",
          options: ["Emergency: Police, Fire, Ambulance", "SES: floods, storms, fallen trees", "Disaster Assistance line", "App for official fire warnings", "Local radio updates"],
          items: [
            { left: "000", answer: "Emergency: Police, Fire, Ambulance" },
            { left: "132 500", answer: "SES: floods, storms, fallen trees" },
            { left: "1800 22 66 77", answer: "Disaster Assistance line" },
            { left: "“QFES Alerts” app", answer: "App for official fire warnings" },
            { left: "ABC Local Radio", answer: "Local radio updates" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Complete the safety advice",
          intro: "Fill each gap with the right word from the poster, then Check.",
          items: [
            { hint: "drinnen", segments: ["Keep pets ", { answer: "indoors", size: 9 }, " and secure when it's unsafe outside."] },
            { hint: "close doors and …", segments: ["Close doors and ", { answer: "windows", size: 9 }, "."] },
            { hint: "nass", segments: ["Block gaps with ", { answer: "wet", size: 6 }, " towels."] },
            { hint: "der Schlauch", segments: ["Have a ", { answer: "hose", size: 7 }, ", buckets or a portable pump ready."] },
            { hint: "kurz", segments: ["Keep lawns ", { answer: "short", size: 7 }, " and gardens well watered."] },
          ],
        },
        {
          type: "written",
          kind: "Mediation · Deutsch",
          title: "Erklär es auf Deutsch",
          intro: "Your little brother doesn't understand the English poster. Look back at it on the first card and explain these parts to him in GERMAN.",
          starters: [
            "Abschnitt 1 – Was soll man einpacken, wenn man das Haus verlassen muss? …",
            "Abschnitt 3 – Was macht man rund ums Haus, um es sicherer zu machen? …",
            "Abschnitt 6 – Wie bleibt man über das Feuer informiert? …",
          ],
          help: "Schreib in ganzen deutschen Sätzen. Du musst nicht jedes Wort übersetzen — sag das Wichtigste.",
        },
      ],
    },

    /* ============ STEP 3 — Bushfire poster: Mediation ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Mediation — pass on the information",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "image",
          kind: "Mediation · Info",
          title: "Help your family understand",
          intro: "Your relatives from Germany are staying with you in Brisbane. They don't read much English, and there is a bushfire warning. Use the poster to help them — this is called mediation (Sprachmittlung).",
          image: POSTER,
          imageAlt: POSTER_ALT,
        },
        {
          type: "written",
          kind: "Mediation · Schreiben",
          title: "Oma asks…",
          intro: "Your grandmother asks these questions in German. Look back at the poster on the first card and answer her in your own words (English or German).",
          starters: [
            "Oma: „Welche Nummer wähle ich im Notfall?“ → …",
            "Oma: „Was soll ich einpacken, wenn wir das Haus verlassen müssen?“ → …",
            "Oma: „Was machen wir mit dem Hund?“ → …",
            "Oma: „Und wenn wir im Haus bleiben — was dann?“ → …",
          ],
          help: "Mediation = give her the important information; you do not have to translate word for word.",
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Warum?",
          title: "Understand the reasons",
          intro: "The poster tells you WHAT to do. Here, choose WHY — the best reason for each rule.",
          questions: [
            { q: "Why close doors and windows and block gaps with wet towels?", options: ["To stop smoke and burning embers getting inside", "To keep the house warm", "To make the rooms darker", "To save electricity", "To keep out insects"], correct: 0 },
            { q: "Why move gas bottles away from the house?", options: ["So they can't catch fire and explode near the house", "So there is more space on the deck", "So they don't get dirty", "So the garden looks tidy", "So you can find them faster"], correct: 0 },
            { q: "Why wait for authorities before returning home?", options: ["Hidden dangers like gas leaks and live wires may remain", "The roads are always closed for a week", "To let the insurance company visit first", "Because it is the law to wait ten days", "So the neighbours can go first"], correct: 0 },
            { q: "Why keep a battery radio and a power bank ready?", options: ["Power and phone networks may fail, but you still need warnings", "To listen to music while you wait", "Because torches are not allowed", "To charge the car", "So the house looks prepared"], correct: 0 },
            { q: "Why trim trees and keep lawns short near the house?", options: ["To reduce fuel so fire spreads less easily to the house", "To give pets more room to play", "To make the garden look bigger", "To save water", "To keep birds away"], correct: 0 },
          ],
        },
        {
          type: "written",
          kind: "Mediation · Deutsch",
          title: "Fünf Regeln auf Deutsch",
          intro: "Your friend in Germany is moving to Brisbane and doesn't read much English. Using the poster from the first card, write them FIVE key bushfire rules in GERMAN so they really understand.",
          starters: [
            "1. Vor der Buschfeuer-Saison solltest du …",
            "2. Halte immer eine Notfalltasche bereit mit …",
            "3. Wenn du das Haus verlassen musst, denk an …",
            "4. Wenn du im Haus bleibst, achte darauf, dass …",
            "5. Nach dem Feuer: Geh erst zurück, wenn …",
          ],
          help: "Schreib in ganzen deutschen Sätzen — dein Freund versteht kaum Englisch.",
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Warn a friend",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Bushfire alert — message a friend",
          intro:
            "A bushfire warning has just been issued for your area in Brisbane. Write a calm, clear message (80–120 words) to a friend who has just arrived from Germany and doesn't know what to do. Use the poster to help them stay safe.",
          chips: [
            { n: "01", label: "Stay calm — what's happening" },
            { n: "02", label: "What to pack" },
            { n: "03", label: "What to do around the house" },
            { n: "04", label: "If you stay inside" },
            { n: "05", label: "Emergency number + stay informed" },
          ],
          min: 80,
          max: 120,
          placeholder: "Write your message here…",
          checklist: [
            "I told my friend calmly what is happening.",
            "I said what to pack if they have to leave.",
            "I gave two things to do around the house.",
            "I explained what to do if they stay inside.",
            "I gave the emergency number and how to stay informed.",
            "My message is about 80–120 words.",
          ],
          help: "Tip: write it like a real text message — short sentences, friendly but clear.",
        },
      ],
    },
  ],
};
