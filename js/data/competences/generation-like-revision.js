/**
 * Generation Like (Unit 4) — Revision: "Bring it all together".
 *
 * A mixed review that revisits every page of the unit. Instead of one
 * skill, each Step revisits a cluster of the unit's work:
 *  1 — Words & Reading (digital footprint)
 *  2 — Grammar (if-clauses)
 *  3 — Listening & Speaking (influencers, picture description)
 *  4 — Writing & a can-do challenge
 *
 * No new words section: revision recycles the vocabulary already learnt.
 */

export default {
  title: "Revision",

  steps: [
    /* ============ STEP 1 — Words & Reading ============ */
    {
      step: 1,
      subtitle: "Wörter & Lesen — Digital Footprint",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Wiederholung",
          title: "Welcome to your Unit 4 revision",
          paragraphs: [
            [
              "Time to bring everything together! In this section you revisit every page of ",
              { w: "Generation Like", de: "die Unit 4" },
              ": the words, the reading text, the grammar, the listening, and your speaking and writing skills.",
            ],
            [
              "Work through the four Steps. If something feels hard, go back to that page and look again — then come back and try once more.",
            ],
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Key words from the whole unit",
          intro: "Match each English word to its German meaning, then Check.",
          options: ["der Fußabdruck", "die Werbung", "süchtig (nach)", "überzeugen", "die Generation", "die Gewohnheit", "abonnieren", "der Einfluss"],
          items: [
            { left: "footprint", answer: "der Fußabdruck" },
            { left: "advertising", answer: "die Werbung" },
            { left: "addicted to", answer: "süchtig (nach)" },
            { left: "to convince", answer: "überzeugen" },
            { left: "generation", answer: "die Generation" },
            { left: "habit", answer: "die Gewohnheit" },
            { left: "to subscribe", answer: "abonnieren" },
            { left: "influence", answer: "der Einfluss" },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Reading recap — your digital footprint",
          intro: "Remember the reading text? Choose the correct answer.",
          questions: [
            { q: "What is a digital footprint?", options: ["A type of shoe", "The trail of information you leave online", "A password app", "A social media star", "A school subject"], correct: 1 },
            { q: "Why is it hard to delete something from the internet?", options: ["Deleting costs money", "Someone may already have a copy or screenshot", "Only adults can delete", "Posts turn into games", "The internet is offline"], correct: 1 },
            { q: "What should you use instead of your real name in public chats?", options: ["Your email", "A nickname", "Your address", "Your phone number", "Your password"], correct: 1 },
            { q: "Who might check your online profile?", options: ["Nobody at all", "Only strangers abroad", "Employers, coaches and schools", "Only your best friend", "A robot"], correct: 2 },
            { q: "What is the best advice from the text?", options: ["Stop using the internet", "Share everything quickly", "Think before you post and protect your details", "Give your password to friends", "Only post at night"], correct: 2 },
          ],
        },
      ],
    },

    /* ============ STEP 2 — Grammar ============ */
    {
      step: 2,
      subtitle: "Grammatik — If-Clauses",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Wiederholung · Grammatik",
          title: "The three if-clauses in a nutshell",
          paragraphs: [
            "Type 1 (real): If + present, … will + verb. → If you post that photo, everyone will see it.",
            "Type 2 (unreal now): If + past, … would + verb. → If I were famous, I would start a channel.",
            "Type 3 (unreal past): If + past perfect, … would have + past participle. → If she had logged off, nobody would have used her account.",
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Complete the conditional",
          intro: "Write the correct form of the verb in brackets. Watch the type!",
          items: [
            { segments: ["If you post that video, your friends ", { answer: "will see", accept: ["'ll see"] }, " it. (see)"], hint: "Typ 1: if + present, will + Verb" },
            { segments: ["If I ", { answer: "were", accept: ["was"] }, " you, I would use a nickname. (be)"], hint: "Typ 2: if + Simple Past" },
            { segments: ["If she had logged off, nobody ", { answer: "would have used", accept: ["would've used"] }, " her account. (use)"], hint: "Typ 3: would have + Partizip" },
            { segments: ["If we ", { answer: "protect" }, " our passwords, our data stays safe. (protect)"], hint: "Typ 1 / allgemeingültig: Simple Present" },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Which sentence is correct?",
          intro: "Choose the grammatically correct if-clause.",
          questions: [
            { q: "Type 1 (real possibility):", options: ["If it rains, we will stay home.", "If it rains, we would stay home.", "If it will rain, we stay home.", "If it rained, we will stay home.", "If it rains, we stayed home."], correct: 0 },
            { q: "Type 2 (unreal / imaginary):", options: ["If I am rich, I would travel.", "If I were rich, I would travel.", "If I were rich, I will travel.", "If I was rich, I travel.", "If I am rich, I will travelled."], correct: 1 },
            { q: "Type 3 (unreal past):", options: ["If he studied, he would have passed.", "If he had studied, he would have passed.", "If he has studied, he will pass.", "If he had studied, he will pass.", "If he studies, he would have passed."], correct: 1 },
            { q: "Complete: “If you ___ your phone off, you would sleep better.”", options: ["switch", "will switch", "switched", "had switched", "switches"], correct: 2 },
          ],
        },
      ],
    },

    /* ============ STEP 3 — Listening & Speaking ============ */
    {
      step: 3,
      subtitle: "Hören & Sprechen — Influencer & Bildbeschreibung",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Listening recap — influencers & advertising",
          intro: "Think back to Jerome and the advert. Choose the best answer.",
          questions: [
            { q: "An influencer is someone who …", options: ["fixes computers", "can change what their followers think or buy", "works only on TV", "never uses the internet", "sells phones in a shop"], correct: 1 },
            { q: "Why do companies pay influencers?", options: ["To repair their products", "To reach and convince young customers", "To delete bad comments", "To teach maths", "To design billboards only"], correct: 1 },
            { q: "To 'subscribe to' a channel means to …", options: ["delete it", "agree to regularly receive its videos", "switch off your phone", "report it", "buy the company"], correct: 1 },
            { q: "Advertising often works by making you feel …", options: ["that you are missing out", "sleepy", "hungry for maths", "afraid of adults", "bored of phones"], correct: 0 },
            { q: "A 'follower' is a person who …", options: ["walks behind you", "regularly sees what someone posts", "writes the news", "owns the app", "deletes accounts"], correct: 1 },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Describing or giving an opinion?",
          intro: "Sort each speaking phrase: is it for describing a picture, or for giving your opinion? Check when ready.",
          groups: [
            { label: "🖼️ Describing", items: ["In the foreground …", "On the left there is …", "In the background …", "The people are …-ing"] },
            { label: "💬 Opinion / guessing", items: ["I think …", "In my opinion …", "They might be …", "Perhaps …"] },
          ],
        },
        {
          type: "written",
          kind: "Sprechen",
          title: "Quick picture talk",
          intro: "Think of the last photo you took or saw today. Describe it in 3–4 sentences using the phrases you revised, then say it out loud.",
          answer: true,
          help: "Use: This is a picture of … / In the foreground … / I think …",
        },
      ],
    },

    /* ============ STEP 4 — Writing & Can-do ============ */
    {
      step: 4,
      subtitle: "Schreiben & Selbstcheck — Show what you can do",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Generation Like — your final word",
          intro:
            "Write a short text (70–100 words): What does “Generation Like” mean to you? Use at least four words from the unit, one if-clause, and your own opinion. Then tick off everything you can now do.",
          min: 70,
          max: 100,
          placeholder: "For my generation, social media is …",
          checklist: [
            "I can use the unit's key words (footprint, influence, habit …).",
            "I can understand the reading text about digital footprints.",
            "I can form all three types of if-clause.",
            "I can understand influencers and advertising in the listening.",
            "I can describe a picture and give my opinion.",
            "I can write a short discussion with my own opinion.",
          ],
          help: "This checklist is your Unit 4 progress — anything unticked shows you what to revise next.",
        },
      ],
    },
  ],
};
