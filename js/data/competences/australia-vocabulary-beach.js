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
          type: "image-match",
          kind: "Interaktiv · Bilder",
          title: "The dangerous ones",
          intro: "Tap a picture, then tap the name that matches it. Correct pairs lock in green.",
          pairs: [
            { word: "Box Jellyfish", image: `${CRE}/box-jellyfish.jpg` },
            { word: "Saltwater Crocodile", image: `${CRE}/saltwater-crocodile.jpg` },
            { word: "Funnel-web Spider", image: `${CRE}/funnel-web-spider.jpg` },
            { word: "Blue-ringed Octopus", image: `${CRE}/blue-ringed-octopus.jpg` },
            { word: "Tiger Snake", image: `${CRE}/tiger-snake.jpg` },
            { word: "Great White Shark", image: `${CRE}/great-white-shark.jpg` },
            { word: "Cassowary", image: `${CRE}/cassowary.jpg` },
            { word: "Cone Snail", image: `${CRE}/cone-snail.jpg` },
          ],
        },
        {
          type: "image-match",
          kind: "Interaktiv · Bilder",
          title: "The friendly ones",
          intro: "Same again — match each harmless animal to its name.",
          pairs: [
            { word: "Koala", image: `${CRE}/koala.jpg` },
            { word: "Kangaroo", image: `${CRE}/kangaroo.jpg` },
            { word: "Wombat", image: `${CRE}/wombat.jpg` },
            { word: "Quokka", image: `${CRE}/quokka.jpg` },
            { word: "Kookaburra", image: `${CRE}/kookaburra.jpg` },
            { word: "Platypus", image: `${CRE}/platypus.jpg` },
            { word: "Wallaby", image: `${CRE}/wallaby.jpg` },
            { word: "Echidna", image: `${CRE}/echidna.jpg` },
            { word: "Possum", image: `${CRE}/possum.jpg` },
            { word: "Blue-tongue Lizard", image: `${CRE}/blue-tongue-lizard.jpg` },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Deadly or safe?",
          intro: "Sort each creature into the right box, then Check.",
          groups: [
            { label: "☠️ Deadly", items: ["Box Jellyfish", "Saltwater Crocodile", "Funnel-web Spider", "Tiger Snake", "Great White Shark", "Cone Snail"] },
            { label: "🧸 Safe", items: ["Koala", "Wombat", "Quokka", "Kookaburra", "Wallaby", "Blue-tongue Lizard"] },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Creature quiz",
          intro: "How much do you know about these animals? Choose the best answer.",
          questions: [
            { q: "Which is the only bird here that can seriously hurt a human?", options: ["Cassowary", "Kookaburra", "Quokka", "Possum", "Wombat"], correct: 0 },
            { q: "Which small, brightly-patterned sea animal is extremely venomous?", options: ["Blue-ringed Octopus", "Koala", "Wallaby", "Wombat", "Quokka"], correct: 0 },
            { q: "Which egg-laying mammal has a duck-like bill?", options: ["Platypus", "Possum", "Koala", "Quokka", "Echidna"], correct: 0 },
            { q: "Which reptile shows a bright blue tongue to frighten enemies?", options: ["Blue-tongue Lizard", "Tiger Snake", "Cone Snail", "Cassowary", "Saltwater Crocodile"], correct: 0 },
            { q: "Which spider's bite needs urgent medical help?", options: ["Funnel-web Spider", "Kookaburra", "Quokka", "Koala", "Wombat"], correct: 0 },
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
          intro: "Use the poster to choose the correct answer.",
          image: POSTER,
          imageAlt: POSTER_ALT,
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
          image: POSTER,
          imageAlt: POSTER_ALT,
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
          image: POSTER,
          imageAlt: POSTER_ALT,
          items: [
            { hint: "drinnen", segments: ["Keep pets ", { answer: "indoors", size: 9 }, " and secure when it's unsafe outside."] },
            { hint: "close doors and …", segments: ["Close doors and ", { answer: "windows", size: 9 }, "."] },
            { hint: "nass", segments: ["Block gaps with ", { answer: "wet", size: 6 }, " towels."] },
            { hint: "der Schlauch", segments: ["Have a ", { answer: "hose", size: 7 }, ", buckets or a portable pump ready."] },
            { hint: "kurz", segments: ["Keep lawns ", { answer: "short", size: 7 }, " and gardens well watered."] },
          ],
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
          intro: "Your grandmother asks these questions in German. Answer her in your own words (English or German) using the poster.",
          image: POSTER,
          imageAlt: POSTER_ALT,
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
          kind: "Mediation · Schreiben",
          title: "Five rules in your own words",
          intro: "A friend in Germany is moving to Brisbane. Using the poster, write them FIVE key bushfire rules as full English sentences.",
          image: POSTER,
          imageAlt: POSTER_ALT,
          starters: [
            "1. Before the fire season, you should …",
            "2. Always keep an emergency kit with …",
            "3. If you have to leave, remember to …",
            "4. If you stay inside, make sure you …",
            "5. After the fire, do not … until …",
          ],
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
