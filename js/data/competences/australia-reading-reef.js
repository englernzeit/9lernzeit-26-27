/**
 * Reading Reef (Australia · Unit 1) — Reading: "The Flying Doctors".
 *
 * Follows the fixed Reading page structure (see memory:
 * reading-competence-page-structure): 15 new words + Word Master, then the
 * text in three difficulty variants (LE / G-Kurs / E-Kurs), each as the
 * first card of its level-step, with substantial self-checking tasks
 * (enough for ~45 min of independent group work), written tasks, and the
 * Monster's Lunch game on Step 1.
 *
 * Topic: the Royal Flying Doctor Service — medical help across the remote
 * Australian outback. Vocabulary supplied by the user's word table.
 */

export default {
  title: "The Flying Doctors",

  newWords: {
    subtitle: "15 words for this text",
    stampLabel: "OUTBACK",
    words: [
      { en: "the outback", de: "das Hinterland Australiens", ex: "The outback covers most of Australia, yet almost no one lives there.", image: "assets/images/unit1/stamps/uluru.jpg" },
      { en: "human", de: "der Mensch", ex: "In the vast outback, you can drive for hours without seeing another human.", image: "assets/images/unit1/stamps/sydney-opera-house.jpg" },
      { en: "to break down", de: "eine Panne haben", ex: "If your car breaks down in the desert, staying with the vehicle is much safer than walking.", image: "assets/images/unit1/stamps/kakadu.jpg" },
      { en: "vehicle", de: "das Fahrzeug", ex: "Rangers found the empty vehicle, but the driver had already walked off into the heat.", image: "assets/images/unit1/stamps/flinders-street-station.jpg" },
      { en: "shade", de: "der Schatten", ex: "With temperatures above 45°C, finding shade can be the difference between life and death.", image: "assets/images/unit1/stamps/daintree-rainforest.jpg" },
      { en: "torch", de: "die Taschenlampe", ex: "At night she signalled the rescue plane with a torch.", image: "assets/images/unit1/stamps/tasmanian-devil.jpg" },
      { en: "nickname", de: "der Spitzname", ex: "The Royal Flying Doctor Service soon earned the nickname 'the Flying Doctors'.", image: "assets/images/unit1/stamps/koala.jpg" },
      { en: "citizen", de: "der Bürger / die Bürgerin", ex: "The Flying Doctors treat every citizen for free, no matter how remote their home.", image: "assets/images/unit1/stamps/red-kangaroo.jpg" },
      { en: "road trip", de: "die Autoreise", ex: "Every year tourists set off on a road trip across the outback, often underestimating the distances.", image: "assets/images/unit1/stamps/twelve-apostles.jpg" },
      { en: "according to", de: "laut / gemäß", ex: "According to the service, its planes fly far enough each year to reach the moon and back.", image: "assets/images/unit1/stamps/emu.jpg" },
      { en: "jellyfish", de: "die Qualle", ex: "During the wet season, deadly box jellyfish drift close to the northern beaches.", image: "assets/images/unit1/stamps/great-barrier-reef.jpg" },
      { en: "to sting", de: "stechen", ex: "A single sting from a box jellyfish can stop a swimmer's heart within minutes.", image: "assets/images/unit1/stamps/platypus.jpg" },
      { en: "shark", de: "der Hai", ex: "A surfer bitten by a shark was flown to hospital in under an hour.", image: "assets/images/unit1/stamps/sea-lion.jpg" },
      { en: "ban (on)", de: "das Verbot (von)", ex: "During stinger season there is a ban on swimming at many unprotected beaches.", image: "assets/images/unit1/stamps/fraser-island.jpg" },
      { en: "honey", de: "der Honig", ex: "A beekeeper collecting honey was stung so badly that the Flying Doctors had to fly out to him.", image: "assets/images/unit1/stamps/wombat.jpg" },
    ],
  },

  // Picture Vocabulary — hand-painted flashcard deck (English word +
  // German + example, painted into each image), split by course. Drop
  // images into assets/images/picvocab/<Course>/<Competence>/ (named
  // NN.jpg) and bump `count` for that course.
  pictureVocab: {
    base: "assets/images/picvocab",
    courses: [
      { key: "gkurs", dir: "GKurs/Reading", name: "Grundkurs", tag: "GKurs · Reading", count: 15 },
      { key: "ekurs", dir: "EKurs/Reading", name: "Erweiterungskurs", tag: "EKurs · Reading", count: 15 },
    ],
  },

  // Word Master — 15 gap-fills. Higher level + SHUFFLED (order ≠ the word
  // cards) so it isn't guessable, with non-give-away gaps.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Das **Hinterland** bedeckt den größten Teil Australiens.", en: "The ___ covers most of Australia.", answer: "outback", accept: ["the outback"] },
      { de: "**Laut** dem Dienst fliegen seine Flugzeuge jedes Jahr bis zum Mond und zurück.", en: "___ the service, its planes fly to the moon and back each year.", answer: "according to" },
      { de: "Wenn dein Auto in der Wüste eine **Panne hat**, bleib beim Fahrzeug.", en: "If your car ___ in the desert, stay with the vehicle.", answer: "breaks down", accept: ["break down", "breaks down"] },
      { de: "Tödliche Würfel**quallen** treiben zur Regenzeit an die Strände.", en: "Deadly box ___ drift towards the beaches in the wet season.", answer: "jellyfish" },
      { de: "Der Dienst bekam bald den **Spitznamen** 'the Flying Doctors'.", en: "The service soon got the ___ 'the Flying Doctors'.", answer: "nickname" },
      { de: "Bei über 45°C kann **Schatten** über Leben und Tod entscheiden.", en: "At over 45°C, ___ can decide between life and death.", answer: "shade" },
      { de: "Ein Surfer, den ein **Hai** gebissen hatte, wurde ins Krankenhaus geflogen.", en: "A surfer bitten by a ___ was flown to hospital.", answer: "shark" },
      { de: "Im weiten Outback fährt man stundenlang, ohne einen **Menschen** zu sehen.", en: "In the vast outback you can drive for hours without seeing another ___.", answer: "human" },
      { de: "In der Quallensaison gibt es an vielen Stränden ein **Verbot** zu schwimmen.", en: "During stinger season there is a ___ on swimming at many beaches.", answer: "ban" },
      { de: "Nachts gab sie dem Rettungsflugzeug mit einer **Taschenlampe** ein Signal.", en: "At night she signalled the rescue plane with a ___.", answer: "torch" },
      { de: "Ein einziger **Stich** einer Würfelqualle kann tödlich sein.", en: "A single ___ from a box jellyfish can be deadly.", answer: "sting" },
      { de: "Die Flying Doctors behandeln jeden **Bürger** kostenlos.", en: "The Flying Doctors treat every ___ for free.", answer: "citizen" },
      { de: "Die Ranger fanden das leere **Fahrzeug**, aber der Fahrer war weg.", en: "The rangers found the empty ___, but the driver was gone.", answer: "vehicle" },
      { de: "Jedes Jahr brechen Touristen zu einer **Autoreise** durchs Outback auf.", en: "Every year tourists set off on a ___ across the outback.", answer: "road trip" },
      { de: "Ein Imker, der **Honig** sammelte, wurde so schlimm gestochen, dass er Hilfe brauchte.", en: "A beekeeper collecting ___ was stung so badly that he needed help.", answer: "honey" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Mit Hilfe auf Deutsch — die wichtigsten Fakten",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Lesetext · LE",
          title: "The Flying Doctors",
          paragraphs: [
            [
              "Australia is very big. Far from the cities is the ",
              { w: "outback", de: "das Hinterland Australiens" },
              ". Not many ",
              { w: "humans", de: "Menschen" },
              " live there. The next town can be hundreds of kilometres away, so a hospital is very far, too.",
            ],
            [
              "But there is help. Doctors and nurses fly in small planes. People call them by a ",
              { w: "nickname", de: "der Spitzname" },
              ": 'the Flying Doctors'. Every ",
              { w: "citizen", de: "der Bürger" },
              " can call them, and the help is free.",
            ],
            [
              "The outback can be dangerous. A car can ",
              { w: "break down", de: "eine Panne haben" },
              ". Then you must stay with your ",
              { w: "vehicle", de: "das Fahrzeug" },
              ". You must find ",
              { w: "shade", de: "der Schatten" },
              " and drink water. At night you can use a ",
              { w: "torch", de: "die Taschenlampe" },
              " to show the plane where you are.",
            ],
            [
              "Near the sea there are other dangers. A ",
              { w: "jellyfish", de: "die Qualle" },
              " can ",
              { w: "sting", de: "stechen" },
              " you. A ",
              { w: "shark", de: "der Hai" },
              " can bite. Then the Flying Doctors come fast and fly you to a hospital.",
            ],
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Where is the danger?",
          intro: "Tap a card, then tap a box. Sort all ten dangers. Check when you are ready.",
          groups: [
            { label: "🏜️ On land (outback)", items: ["Your car breaks down", "There is no shade", "You have no water", "You get lost in the desert", "A long walk in the heat"] },
            { label: "🌊 In or near the sea", items: ["A jellyfish stings you", "A shark bites", "Dangerous currents", "Swimming at a banned beach", "Stepping on something sharp"] },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Read and choose",
          intro: "Choose the correct answer for each question.",
          questions: [
            { q: "Where is the outback?", options: ["On the coast near the cities", "Far from the cities, in the middle of Australia", "In New Zealand", "Under the sea", "In a big city"], correct: 1 },
            { q: "Who are the 'Flying Doctors'?", options: ["Pilots who race planes", "Doctors and nurses who fly to help people", "Astronauts", "Teachers", "Firefighters"], correct: 1 },
            { q: "Your car breaks down in the desert. What is best?", options: ["Walk away to find a town", "Stay with your vehicle", "Go for a swim", "Turn off your phone", "Drive faster"], correct: 1 },
            { q: "How can you show a plane where you are at night?", options: ["Shout very loudly", "Use a torch", "Close your eyes", "Dig a hole", "Hide in the shade"], correct: 1 },
            { q: "What can a box jellyfish do to you?", options: ["Give you honey", "Sting you", "Drive a car", "Fly a plane", "Read a map"], correct: 1 },
            { q: "How much does the help of the Flying Doctors cost?", options: ["Nothing — it is free", "A thousand dollars", "One kangaroo", "A new car", "You must pay with honey"], correct: 0 },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Five sentences about the outback",
          intro: "Finish each sentence with your own ideas.",
          starters: [
            "The outback is …",
            "The Flying Doctors help people who …",
            "If my car broke down in the desert, I would …",
            "One dangerous animal in Australia is …",
            "I think the Flying Doctors are … because …",
          ],
          help: "Hilfe: I would … = Ich würde … · dangerous = gefährlich",
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the word, letter by letter — and save the hero from the monster!",
          words: [
            { word: "OUTBACK", hint: "The dry middle of Australia" },
            { word: "JELLYFISH", hint: "It can sting you in the sea" },
            { word: "SHARK", hint: "A dangerous fish with big teeth" },
            { word: "VEHICLE", hint: "Stay with it if it breaks down" },
            { word: "TORCH", hint: "Use it to signal a plane at night" },
            { word: "SHADE", hint: "Get out of the sun and into the …" },
            { word: "NICKNAME", hint: "A friendly, informal name" },
            { word: "CITIZEN", hint: "A person who belongs to a country" },
            { word: "HONEY", hint: "Bees make it — sweet and golden" },
            { word: "STING", hint: "What a jellyfish or a bee does" },
            { word: "HUMAN", hint: "A person" },
            { word: "RESCUE", hint: "To save someone in danger" },
            { word: "DESERT", hint: "A very dry, hot place with sand" },
            { word: "RADIO", hint: "Outback families used it to call for help" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · G-Kurs",
          title: "The Flying Doctors",
          paragraphs: [
            "Imagine living on a farm so far from town that the nearest doctor is five hundred kilometres away. For many families in the Australian outback, this is normal life. The outback is the huge, dry interior of the country. According to some estimates, it covers about seventy percent of Australia, yet only a tiny number of people live there. If someone falls ill or has an accident, an ordinary ambulance would take far too long — or could never reach them at all.",
            "This is why the Royal Flying Doctor Service was created in 1928. Its idea was simple but brilliant: if patients cannot reach a hospital, then the hospital must come to the patients. Doctors and nurses fly in small planes to remote farms, mines and communities. Australians quickly gave the service a warm nickname — 'the Flying Doctors' — and today almost every citizen knows it. Best of all, the service is free and paid for mostly by donations.",
            "The outback is beautiful but dangerous. On a long road trip, a car can break down hundreds of kilometres from the nearest town. The golden rule is to stay with your vehicle, because it is much easier to spot from the air than a single person. You should find shade, drink plenty of water and wait. At night, a simple torch can help a rescue plane find you in the dark.",
            "Australia's dangers are not only in the desert. Along the coast, a box jellyfish can sting a swimmer so badly that there is often a ban on swimming during certain months. Sharks, snakes and spiders can all cause emergencies, and even a beekeeper collecting honey can suffer a serious reaction to a sting. In all of these cases, one phone or radio call brings the Flying Doctors.",
            "Every year the service treats hundreds of thousands of people and flies an enormous distance — far enough, according to the RFDS, to travel to the moon and back many times. For people in the outback, the sound of a small plane in the sky is the sound of safety. What began as one man's dream has become one of the things Australians are most proud of.",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Check the facts",
          intro: "Choose the correct answer for each question.",
          questions: [
            { q: "Why was the Royal Flying Doctor Service created?", options: ["To give tourists plane rides", "Because patients in the outback could not reach a hospital in time", "To deliver honey to farms", "To race cars in the desert", "To build new cities"], correct: 1 },
            { q: "How is the service mainly paid for?", options: ["By donations", "By selling its planes", "By charging patients a lot of money", "By a special jellyfish tax", "It is not paid for at all"], correct: 0 },
            { q: "Why should you stay with your vehicle if it breaks down?", options: ["It is warm inside", "It is much easier to see from the air than a person", "It can still drive itself", "It has a swimming pool", "The law forces you to"], correct: 1 },
            { q: "Why is there sometimes a ban on swimming at certain beaches?", options: ["The water is too clean", "Box jellyfish can sting swimmers", "There are too many boats", "The sea is too cold", "Sharks get lonely"], correct: 1 },
            { q: "According to the text, how far do the planes fly each year?", options: ["Just a few kilometres", "Far enough to reach the moon and back many times", "Only around one farm", "They almost never fly", "All the way to the sun"], correct: 1 },
            { q: "What is the writer's main message about the service?", options: ["It is a waste of money", "It began as one man's dream and became a national treasure", "Only rich people may use it", "It works only near the sea", "It has now closed down"], correct: 1 },
          ],
        },
        {
          type: "sentence-build",
          kind: "Interaktiv · Sätze bauen",
          title: "Build the survival rules",
          intro: "Tap the words in the right order to make a correct sentence. Then check.",
          sentences: [
            { tokens: ["Stay", "with", "your", "vehicle", "and", "wait", "for", "help"] },
            { tokens: ["The", "service", "is", "free", "for", "every", "citizen"] },
            { tokens: ["Always", "carry", "more", "water", "than", "you", "need"] },
            { tokens: ["A", "box", "jellyfish", "can", "sting", "a", "swimmer"] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Dangers and what to do",
          intro: "Name three dangers of the Australian outback. For each one, write what you should do to stay safe.",
          answer: true,
          help: "Start like this: One danger is … You should …",
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Outback road-trip diary",
          intro: "You are on a road trip across the outback with your family. Write a short diary entry (4–5 sentences) about a day when something went wrong — and how you stayed safe.",
          answer: true,
          help: "Try: Today was scary because … / In the end …",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · E-Kurs",
          title: "The Flying Doctors",
          paragraphs: [
            "To understand the Royal Flying Doctor Service, you first have to understand the sheer scale of the Australian outback. This vast, sun-baked interior stretches for millions of square kilometres, and in many areas there is not a single human being for a hundred kilometres in any direction. For the people who farm this land or work in its distant mines, isolation is not an adventure but a daily reality — and, in a medical emergency, a potentially deadly one.",
            "The man who changed this was a minister called John Flynn. Travelling through the outback in the early twentieth century, he was haunted by stories of people who had died simply because help could not reach them in time. He dreamed of throwing a 'mantle of safety' across the outback. In 1928 his dream took flight — quite literally — when the first aerial medical service carried a doctor to a patient hundreds of kilometres away.",
            "One enormous problem remained: how could isolated families call for help at all, when there were no telephones? The answer was the pedal radio, a clever device powered by the user's own feet. Suddenly a farmer's wife could describe her husband's symptoms to a doctor far away and, according to those instructions, give basic care until the plane arrived. This combination of aircraft and radio turned Flynn's vision into a working reality.",
            "Today the service operates around the clock. Its aircraft respond to heart attacks, difficult births and the many hazards of the Australian environment. A tourist whose vehicle breaks down on a lonely road, a swimmer stung by a jellyfish, a surfer bitten by a shark, a child who has stepped on a snake — all of them may owe their lives to a plane on the horizon. Every citizen is treated equally and without charge, whether they are a wealthy farmer or a backpacker on a road trip.",
            "The Flying Doctors also teach people how to stay alive long enough to be rescued. Their advice is refreshingly practical: never leave your vehicle, since it offers shade and is far easier to see from above; carry more water than you think you could ever need; and pack a torch to signal at night. During the dangerous 'stinger season', they support the ban on swimming at certain beaches, knowing that prevention is always better than rescue.",
            "Almost a century after it began, the service has become woven into Australia's identity, so familiar that it is known everywhere by its affectionate nickname. It is more than a fleet of planes; it is a promise that no matter how remote your corner of this enormous country, you have not been forgotten. For millions of outback Australians, that promise is priceless.",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Read between the lines",
          intro: "Choose the answer the text suggests.",
          questions: [
            { q: "What problem haunted John Flynn?", options: ["People died because help could not reach them in time", "There were too many hospitals", "Planes were too cheap", "The outback was too crowded", "Doctors refused to work"], correct: 0 },
            { q: "Why was the pedal radio so important?", options: ["It played music on lonely farms", "It let isolated families call for help without telephones", "It powered the aeroplanes", "It cooled down the houses", "It completely replaced doctors"], correct: 1 },
            { q: "What does 'a mantle of safety' suggest about Flynn's idea?", options: ["A special coat for pilots", "Protection stretched across the whole outback", "A new type of aircraft", "A radio station", "A single hospital building"], correct: 1 },
            { q: "How does the service treat a rich farmer and a backpacker?", options: ["The farmer pays, the backpacker does not", "Both are treated equally and for free", "Only citizens are ever helped", "Only tourists are helped", "Neither of them is helped"], correct: 1 },
            { q: "Why does the writer call the promise 'priceless'?", options: ["The planes are very expensive to buy", "No amount of money matches knowing help will always come", "Tickets cost a great deal", "The radio was very cheap", "Donations are always small"], correct: 1 },
            { q: "Which word best describes the writer's attitude to the service?", options: ["Bored", "Proud and admiring", "Angry", "Frightened", "Uninterested"], correct: 1 },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Lückentext",
          title: "Summarise the text",
          intro: "Tap the word that best fits each gap, then Check.",
          layout: "prose",
          segments: [
            "John Flynn wanted to throw a ",
            { gap: 0 },
            " of safety across the outback. Because there were no telephones, families used a pedal ",
            { gap: 1 },
            " to call for help. Today the service works around the ",
            { gap: 2 },
            ", treating every ",
            { gap: 3 },
            " for free. If your car breaks down, you should stay in the ",
            { gap: 4 },
            " and wait. The Flying Doctors are known everywhere by their ",
            { gap: 5 },
            ".",
          ],
          gaps: [
            { options: ["mantle", "blanket", "roof"], answer: "mantle" },
            { options: ["radio", "phone", "engine"], answer: "radio" },
            { options: ["clock", "corner", "world"], answer: "clock" },
            { options: ["citizen", "tourist", "doctor"], answer: "citizen" },
            { options: ["shade", "water", "sun"], answer: "shade" },
            { options: ["nickname", "uniform", "song"], answer: "nickname" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Explain it in your own words",
          intro: "In 3–4 sentences, explain how John Flynn's idea and the pedal radio changed life in the outback.",
          answer: true,
          help: "Use linking words: Before …, After …, As a result …",
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Your opinion",
          intro: "Some people say the government, not donations, should pay for the Flying Doctors. What do you think? Give at least two reasons for your opinion.",
          answer: true,
          help: "In my opinion … Firstly … Secondly …",
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "A day as a Flying Doctor",
          intro:
            "You are a Flying Doctor for one day. Write the story of your most dramatic call-out (120–180 words). Where did you fly? What was the emergency? How did it end? Use everything you have learnt.",
          min: 120,
          max: 180,
          placeholder: "The radio call came in just after sunrise …",
          checklist: [
            "I said where in the outback I had to fly.",
            "I described the emergency (an accident, a sting, a bite …).",
            "I explained how I reached the patient by plane.",
            "I said what I did to help them.",
            "I gave the story an ending.",
            "I used at least six of this unit's new words.",
          ],
          help: "Tip: write it like a diary or a short adventure story — make it exciting!",
        },
      ],
    },
  ],
};
