/**
 * Writing Camp (Australia · Unit 1) — Writing: "Writing an Official Email".
 *
 * Built from the user's draft (9 LZ Writing.pdf) as a DIRECTION and mapped
 * onto our four language-level Steps: LE learns the parts of an official
 * email with heavy scaffolding, G-Kurs drills the six-part structure and
 * formal language, E-Kurs analyses and upgrades emails, and the Challenge
 * is a free official email to a wildlife volunteer organisation.
 *
 * Step 1 (LE) mirrors the user's interactive mockup ("Writing Official
 * Emails.dc.html"): basics → find the 5 parts → OK/not-OK → match EN/DE →
 * fill the email → a live-preview email builder.
 *
 * Vocabulary (newWords + Word Master) comes from the user's Unit 1 Writing
 * word table (the road-trip / hitchhiker story words).
 */

export default {
  title: "Writing an Official Email",

  newWords: {
    subtitle: "15 words for this unit",
    stampLabel: "ROAD TRIP",
    words: [
      { en: "upside down", de: "verkehrt herum / kopfüber", ex: "The koala hung upside down from the branch.", image: "assets/images/unit1/writing-stamps/postcard-01.jpg" },
      { en: "tyre", de: "der Reifen", ex: "Halfway to Alice Springs they had to change a flat tyre.", image: "assets/images/unit1/writing-stamps/postcard-02.jpg" },
      { en: "to stick with sth.", de: "bei etwas bleiben", ex: "Plans can change fast on a road trip, but we decided to stick with our route.", image: "assets/images/unit1/writing-stamps/postcard-03.jpg" },
      { en: "to swerve", de: "ausweichen (mit dem Auto)", ex: "He had to swerve suddenly when a kangaroo jumped onto the road.", image: "assets/images/unit1/writing-stamps/postcard-04.jpg" },
      { en: "ponytail", de: "der Pferdeschwanz (Frisur)", ex: "The hitchhiker wore her hair in a long ponytail.", image: "assets/images/unit1/writing-stamps/postcard-05.jpg" },
      { en: "waistcoat", de: "die Weste", ex: "The old man at the roadhouse wore a dusty leather waistcoat.", image: "assets/images/unit1/writing-stamps/postcard-06.jpg" },
      { en: "to turn up", de: "auftauchen, erscheinen", ex: "Nobody expected him, but he turned up at the campsite at midnight.", image: "assets/images/unit1/writing-stamps/postcard-07.jpg" },
      { en: "chin", de: "das Kinn", ex: "He rubbed his chin and studied the map in silence.", image: "assets/images/unit1/writing-stamps/postcard-08.jpg" },
      { en: "to threaten", de: "bedrohen", ex: "Dark storm clouds threatened the travellers on the horizon.", image: "assets/images/unit1/writing-stamps/postcard-09.jpg" },
      { en: "to be up for sth.", de: "bei etwas dabei sein", ex: "Are you up for a night drive through the outback?", image: "assets/images/unit1/writing-stamps/postcard-10.jpg" },
      { en: "clearing", de: "die Lichtung", ex: "They set up their tent in a small clearing between the gum trees.", image: "assets/images/unit1/writing-stamps/postcard-11.jpg" },
      { en: "boot", de: "der Kofferraum", ex: "They packed the spare tyre and the water cans into the boot.", image: "assets/images/unit1/writing-stamps/postcard-12.jpg" },
      { en: "to overtake", de: "überholen", ex: "A road train is far too long to overtake safely.", image: "assets/images/unit1/writing-stamps/postcard-13.jpg" },
      { en: "to pull over", de: "anhalten (am Straßenrand)", ex: "The police officer signalled the driver to pull over.", image: "assets/images/unit1/writing-stamps/postcard-14.jpg" },
      { en: "hitchhiker", de: "der Anhalter / die Anhalterin", ex: "They stopped to pick up a hitchhiker with a heavy backpack.", image: "assets/images/unit1/writing-stamps/postcard-15.jpg" },
    ],
  },

  // Word Master — 15 gap-fills. Higher level + SHUFFLED (order ≠ the word
  // cards) so it isn't guessable, with non-give-away gaps.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Sie packten den Ersatzreifen in den **Kofferraum**.", en: "They packed the spare tyre into the ___.", answer: "boot" },
      { de: "Er musste **ausweichen**, als ein Känguru auf die Straße sprang.", en: "He had to ___ when a kangaroo jumped onto the road.", answer: "swerve" },
      { de: "Sie hielten an, um einen **Anhalter** mitzunehmen.", en: "They stopped to pick up a ___.", answer: "hitchhiker", accept: ["hitch-hiker"] },
      { de: "Niemand erwartete ihn, aber er **tauchte** um Mitternacht **auf**.", en: "Nobody expected him, but he ___ed up at midnight.", answer: "turn" },
      { de: "Auf halbem Weg mussten sie einen platten **Reifen** wechseln.", en: "Halfway there they had to change a flat ___.", answer: "tyre", accept: ["tire"] },
      { de: "Dunkle Wolken **bedrohten** die Reisenden am Horizont.", en: "Dark clouds ___ed the travellers on the horizon.", answer: "threaten" },
      { de: "Der Koala hing **kopfüber** am Ast.", en: "The koala hung ___ from the branch.", answer: "upside down", accept: ["upside-down"] },
      { de: "Ein Road Train ist viel zu lang, um ihn sicher zu **überholen**.", en: "A road train is far too long to ___ safely.", answer: "overtake" },
      { de: "Die Anhalterin trug ihr Haar in einem langen **Pferdeschwanz**.", en: "The hitchhiker wore her hair in a long ___.", answer: "ponytail" },
      { de: "Sie schlugen ihr Zelt auf einer kleinen **Lichtung** auf.", en: "They put up their tent in a small ___.", answer: "clearing" },
      { de: "Wir beschlossen, bei unserer Route zu **bleiben**.", en: "We decided to ___ with our route.", answer: "stick" },
      { de: "Der Polizist gab dem Fahrer ein Zeichen **anzuhalten**.", en: "The police officer signalled the driver to ___ over.", answer: "pull" },
      { de: "Er rieb sich das **Kinn** und studierte die Karte.", en: "He rubbed his ___ and studied the map.", answer: "chin" },
      { de: "Der alte Mann trug eine staubige **Weste** aus Leder.", en: "The old man wore a dusty leather ___.", answer: "waistcoat" },
      { de: "Bist du für eine Nachtfahrt durchs Outback **zu haben**?", en: "Are you ___ for a night drive through the outback?", answer: "up" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Die formelle E-Mail — Schritt für Schritt, mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Schreiben · LE",
          title: "The basics",
          intro: "Grundlagen — lies das zuerst.",
          paragraphs: [
            [
              "An ",
              { w: "official email", de: "die formelle E-Mail" },
              " is a ",
              { w: "polite", de: "höflich" },
              " message to someone you do not know well — a hotel, a surf school, a museum or a zoo. It always has FIVE parts.",
            ],
            [
              "1) ",
              { w: "Subject", de: "der Betreff" },
              " — a short title (\"Question about a surf course\"). 2) ",
              { w: "Salutation", de: "die Anrede" },
              " — \"Dear Sir or Madam,\". 3) First sentence — \"I am writing because …\". 4) Your ",
              { w: "questions", de: "die Fragen" },
              " (polite!) — \"Could you please tell me …?\". 5) Ending + your full name — \"Yours sincerely, Lena Wagner\".",
            ],
            [
              "Model email — Lena to a surf school: \"Subject: Question about a surf course. Dear Sir or Madam, I am writing because I am interested in a surf course for beginners. Could you please tell me the price of one week? Thank you very much. Yours sincerely, Lena Wagner.\"",
            ],
            [
              "Golden rules: NO \"Hi!\" or \"Hey!\" → use \"Dear …\". NO smileys or !!! → use please and thank you. NO short forms (I'm, can't) → write I am, cannot. And ALWAYS sign with your ",
              { w: "full name", de: "der volle Name" },
              " at the end.",
            ],
          ],
        },
        {
          type: "event-order",
          kind: "Interaktiv · Reihenfolge",
          title: "Find the 5 parts",
          intro: "Number the five lines of Lena's email from 1 to 5, then Check.",
          events: [
            { text: "Subject: Question about a surf course" },
            { text: "Dear Sir or Madam," },
            { text: "I am writing because I am interested in a surf course for beginners." },
            { text: "Could you please tell me the price of one week?" },
            { text: "Thank you very much. Yours sincerely, Lena Wagner" },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · OK?",
          title: "OK in an official email?",
          intro: "Sort each line: is it OK in a formal email, or too informal? Check when you are ready.",
          groups: [
            { label: "✅ OK — formal", items: ["Dear Sir or Madam,", "Could you please tell me …?", "I would like some information.", "Yours sincerely, Lena Wagner"] },
            { label: "❌ Not OK — too informal", items: ["Hi Tom!!! :-)", "I can't come, sorry!!!", "See ya! – L.", "Gimme the price."] },
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Match English & German",
          intro: "Choose the correct German phrase for each English one, then Check.",
          options: ["Sehr geehrte Damen und Herren,", "Ich schreibe, weil …", "Könnten Sie mir bitte sagen …?", "Vielen Dank.", "Mit freundlichen Grüßen"],
          items: [
            { left: "Dear Sir or Madam,", answer: "Sehr geehrte Damen und Herren," },
            { left: "I am writing because …", answer: "Ich schreibe, weil …" },
            { left: "Could you please tell me …?", answer: "Könnten Sie mir bitte sagen …?" },
            { left: "Thank you very much.", answer: "Vielen Dank." },
            { left: "Yours sincerely,", answer: "Mit freundlichen Grüßen" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Fill in the email",
          intro: "Complete Jonas's email to Sydney Zoo. Word box: Dear · writing · Could · Thank · sincerely",
          items: [
            { segments: [{ answer: "Dear", size: 8 }, " Sir or Madam,"], hint: "die Anrede" },
            { segments: ["I am ", { answer: "writing" }, " because my class wants to visit Sydney Zoo."], hint: "Ich schreibe, weil …" },
            { segments: [{ answer: "Could", size: 8 }, " you please tell me the price for a group of 25 students?"], hint: "Könnten Sie …?" },
            { segments: [{ answer: "Thank", size: 8 }, " you very much."], hint: "danken" },
            { segments: ["Yours ", { answer: "sincerely" }, ", Jonas Berger"], hint: "Mit freundlichen Grüßen" },
          ],
        },
        {
          type: "email-builder",
          kind: "Kreativ · Deine E-Mail",
          title: "Be creative: your own email",
          intro:
            "Write to the Blue Gum Koala Park in Brisbane. Fill in every part on the right — your email builds itself in the live preview.",
          to: "info@bluegum-koalapark.com.au",
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Die sechs Teile einer formellen E-Mail",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Schreiben · G-Kurs",
          title: "The structure of an official email",
          paragraphs: [
            "An official email always follows the same plan. 1 — Subject: a short title that explains your email (Subject: School Trip to Australia). 2 — Greeting: always begin politely (Dear Sir or Madam, / Dear Mr Brown,). 3 — Introduction: say who you are and why you are writing (My name is Julia Meyer, and I am a student from Germany. I am writing because …). 4 — Main part: ask your questions politely, one at a time (Could you please tell me …? I would also like to know …). 5 — Closing: thank the reader (Thank you very much for your help. I look forward to your reply.). 6 — Ending: Kind regards, + your full name.",
            "Formal language makes the difference. Instead of 'I want information' write 'I would like some information'. Instead of 'Tell me the price' write 'Could you please tell me the price?'. Instead of 'Bye' write 'Kind regards'. Read this model email and find all six parts:",
            "Subject: English Course in Sydney — Dear Sir or Madam, — My name is Emma Fischer, and I am a student from Germany. I am writing because I would like to learn English in Australia during my summer holidays. — Could you please tell me when your English courses start? I would also like to know how much the course costs and if accommodation is available for students. — Thank you very much for your help. I look forward to your reply. — Kind regards, Emma Fischer",
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Informal → formal",
          intro: "Match each informal phrase to its formal partner, then Check.",
          options: ["Dear Sir or Madam,", "I would like …", "Could you please tell me …", "Could you please send me …", "Thank you very much for your help.", "Kind regards,"],
          items: [
            { left: "Hi!", answer: "Dear Sir or Madam," },
            { left: "I want …", answer: "I would like …" },
            { left: "Tell me …", answer: "Could you please tell me …" },
            { left: "Send me …", answer: "Could you please send me …" },
            { left: "Thanks.", answer: "Thank you very much for your help." },
            { left: "Bye", answer: "Kind regards," },
          ],
        },
        {
          type: "event-order",
          kind: "Interaktiv · Reihenfolge",
          title: "Rebuild the whole email",
          intro: "Number all eight lines of this email from 1 to 8, then Check.",
          events: [
            { text: "Subject: School Trip to Australia" },
            { text: "Dear Sir or Madam," },
            { text: "My name is Julia Meyer, and I am a student from Germany." },
            { text: "I am writing because my class is planning a trip to Australia." },
            { text: "Could you please tell me the price for a school group?" },
            { text: "I would also like to know if breakfast is included." },
            { text: "Thank you very much for your help." },
            { text: "Kind regards, Julia Meyer" },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Complete Lukas's email",
          intro: "Fill in the missing words — small words matter in formal English!",
          items: [
            { segments: ["Dear ", { answer: "Sir or Madam", size: 14 }, ","], hint: "die Anrede" },
            { segments: ["My name ", { answer: "is" }, " Lukas Weber."] },
            { segments: ["I am ", { answer: "writing" }, " because I would like ", { answer: "some" }, " information about your English camp in Melbourne."] },
            { segments: ["Could you please ", { answer: "tell" }, " me when the camp starts?"] },
            { segments: ["Thank you very much ", { answer: "for" }, " your help."] },
            { segments: ["I look forward ", { answer: "to" }, " your reply."] },
          ],
        },
        {
          type: "essay-editor",
          kind: "Schreiben · G-Kurs",
          title: "Your email to Australia Zoo",
          intro:
            "Your class wants to visit Australia Zoo during your school trip and you need more information. Write an official email (100–120 words): introduce yourself, explain why you are writing, ask THREE questions, thank the reader and finish politely.",
          min: 100,
          max: 120,
          placeholder: "Subject: …\n\nDear Sir or Madam,\n\n…",
          checklist: [
            "I wrote a subject and a polite greeting.",
            "I introduced myself and explained why I am writing.",
            "I asked three polite questions.",
            "I used formal language (would like, Could you please …).",
            "I thanked the reader and finished with 'Kind regards,'.",
            "My email has about 100–120 words.",
          ],
          help: "Ideas for questions: ticket prices for school groups · opening times · guided tours · lunch options.",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Analyse and upgrade formal emails",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Schreiben · E-Kurs",
          title: "A strong official email",
          paragraphs: [
            "At this level your email should not only be polite — it should be well organised and sound natural. Study this model. Notice the precise subject, the paragraph for each idea, the variety of question forms, and the confident closing:",
            "Subject: Information about School Group Visits — Dear Sir or Madam, — My name is Hannah Weber, and I am a Year 9 student from Germany. I am writing because my class is planning a school trip to Australia next spring. We are very interested in visiting Australia Zoo and would like to learn more about your programme for school groups. — Could you please tell me whether guided tours are available for international students? I would also like to know the entrance fee for school classes and whether educational workshops are offered. Finally, could you tell me if students can book lunch at the zoo? — Thank you very much for your time and support. I look forward to your reply. — Kind regards, Hannah Weber",
            "Strong writers also upgrade their phrases: 'I would like to enquire about …' instead of 'I want to ask about …'; 'Would it be possible to …?' for careful requests; 'I would appreciate some information about …' for very polite questions; and linking words (First, In addition, Finally) to organise the main part.",
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "What does each phrase do?",
          intro: "Match each advanced phrase to its job in a formal email, then Check.",
          options: ["ask about something formally", "make a careful request", "ask very politely for information", "say you are waiting for an answer", "thank the reader formally"],
          items: [
            { left: "“I would like to enquire about …”", answer: "ask about something formally" },
            { left: "“Would it be possible to …?”", answer: "make a careful request" },
            { left: "“I would appreciate some information about …”", answer: "ask very politely for information" },
            { left: "“I look forward to your reply.”", answer: "say you are waiting for an answer" },
            { left: "“Thank you for considering my request.”", answer: "thank the reader formally" },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Stil wählen",
          title: "Choose the most formal option",
          intro: "Three options — only one sounds right in an official email. Tap it, then Check.",
          layout: "prose",
          segments: [
            "I am writing because I ",
            { gap: 0 },
            " your volunteer programme. ",
            { gap: 1 },
            " send me the application form? I ",
            { gap: 2 },
            " the accommodation for volunteers. ",
            { gap: 3 },
          ],
          gaps: [
            { options: ["would like to enquire about", "want to know about", "wanna ask about"], answer: "would like to enquire about" },
            { options: ["Would it be possible to", "Can you maybe", "You must"], answer: "Would it be possible to" },
            { options: ["would also appreciate some information about", "also want to hear about", "need info on"], answer: "would also appreciate some information about" },
            { options: ["I look forward to your reply.", "Write back fast.", "See ya."], answer: "I look forward to your reply." },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Analyse",
          title: "Analyse the model",
          intro: "Look at Hannah's email in the first card and finish each sentence.",
          starters: [
            "The subject is important because …",
            "The writer introduces herself with the sentence …",
            "I can find … polite questions. They start with …",
            "The email ends politely with …",
          ],
        },
        {
          type: "written",
          kind: "Schreiben · Verbessern",
          title: "Fix Ben's email",
          intro: "Ben's email has at least five problems. Find them and rewrite the whole email correctly and formally.",
          lines: [
            "Hi,",
            "My name is Ben.",
            "I want information about your zoo.",
            "Tell me the prices.",
            "Send me the opening times.",
            "Bye, Ben",
          ],
          answer: true,
          help: "Think about: greeting · 'I want' · 'Tell me' · 'Send me' · the ending.",
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Write to a wildlife organisation",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Volunteer project down under",
          intro:
            "You want to spend your holidays helping an organisation that protects Australian wildlife. Write a full official email (100–130 words): enquire about volunteer opportunities, age requirements, accommodation and daily activities — and finish with an appropriate closing.",
          min: 100,
          max: 130,
          placeholder: "Subject: Enquiry about volunteer opportunities\n\nDear Sir or Madam,\n\n…",
          checklist: [
            "I introduced myself and explained why I am writing.",
            "I asked about volunteer opportunities and age requirements.",
            "I asked about accommodation and daily activities.",
            "I used advanced phrases (enquire about, Would it be possible …).",
            "I used linking words (First, In addition, Finally).",
            "I closed formally and signed with my full name.",
          ],
          help: "Tip: one paragraph per idea — and one question at a time.",
        },
      ],
    },
  ],
};
