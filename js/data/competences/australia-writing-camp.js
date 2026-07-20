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

  pictureVocab: {
    base: "assets/images/picvocab",
    courses: [
      { key: "gkurs", dir: "GKurs/Writing", name: "Grundkurs", tag: "GKurs · Writing", count: 0 },
      { key: "ekurs", dir: "EKurs/Writing", name: "Erweiterungskurs", tag: "EKurs · Writing", count: 15 },
    ],
  },

  // Word Master — the words of the Picture Vocabulary cards, one gap-fill
  // per card. EKurs only for now (GKurs Writing cards to come).
  wordMaster: {
    courses: [
      {
        key: "ekurs",
        name: "Erweiterungskurs",
        tag: "EKurs · Writing",
        subtitle: "Complete each sentence with the right English word.",
        items: [
          { de: "Der **Rettungsschwimmer** beobachtet den Strand.", en: "The ___ watches the beach.", answer: "lifeguard" },
          { de: "Diese Stadt ist sehr **lebenswert**.", en: "This city is very ___.", answer: "liveable", accept: ["liveable"] },
          { de: "Behandle das Glas mit **Vorsicht**.", en: "Handle the glass with ___.", answer: "care" },
          { de: "Wir **sammeln** Holz für das Feuer.", en: "We ___ wood for the fire.", answer: "gather" },
          { de: "Der Hund **gräbt** ein tiefes Loch.", en: "The dog ___ a deep hole.", answer: "digs", accept: ["dig"] },
          { de: "Mein Finger **blutet**.", en: "My finger is ___.", answer: "bleeding", accept: ["bleed"] },
          { de: "Er **leidet an** Kopfschmerzen.", en: "He ___ from headaches.", answer: "suffers", accept: ["suffer"] },
          { de: "**Keine** der beiden Antworten ist richtig.", en: "___ answer is right.", answer: "neither" },
          { de: "Wir sind **landeinwärts** gereist.", en: "We travelled ___.", answer: "inland" },
          { de: "Sie leben in einem **abgelegenen** Dorf.", en: "They live in a ___ village.", answer: "remote" },
          { de: "Der Fluss ist sehr **breit**.", en: "The river is very ___.", answer: "wide" },
          { de: "Mama **misst Fieber** bei mir.", en: "Mum takes my ___.", answer: "temperature" },
          { de: "Der **Handel** zwischen Ländern ist wichtig.", en: "___ between countries is important.", answer: "trade" },
          { de: "Wir **kühlen uns** im See **ab**.", en: "We ___ in the lake.", answer: "cool down", accept: ["cool-down"] },
          { de: "Wir **stehen vor** einem Problem.", en: "We ___ a big problem.", answer: "face" },
        ],
      },
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
          type: "video",
          kind: "Video · Email Survival Guide",
          title: "Watch first: the Email Survival Guide",
          intro: "Schau dir das Video an — es zeigt dir alle Teile einer formellen E-Mail.",
          video: { src: "assets/videos/writing-email-step1.mp4" },
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
          type: "video",
          kind: "Video · Email Survival Guide",
          title: "Watch first: the six parts in detail",
          intro: "Dieses Video erklärt die sechs Teile und die formelle Sprache Schritt für Schritt.",
          video: { src: "assets/videos/writing-email-step2.mp4" },
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
          type: "image",
          kind: "Beispiel · Modelltext",
          title: "A strong official email",
          intro: "Read this real example carefully — a well-organised, polite email. Then do the tasks below.",
          image: "assets/images/unit1/writing-model-email.jpg",
          imageAlt: "Model email: Hannah Weber to Australia Zoo about school group visits",
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
          type: "email-fixer",
          kind: "Schreiben · Verbessern",
          title: "Fix Ben's email",
          intro:
            "Ben's email to the zoo has at least eight problems — wrong register, poor structure, spelling and punctuation mistakes. Tap every problem you can find on the left, then rewrite the whole email correctly and formally on the right.",
          to: "info@australiazoo.com.au",
          draft: {
            from: "Ben Fischer",
            initial: "B",
            time: "14 Jul · 21:47",
            lines: [
              "Hi,",
              "My name is Ben and i am 15 years old and i live in Hamburg.",
              "I want lots of informations about your zoo because me and my friends we want to come next month maybe.",
              "Tell me the prices for kids and also for the adults and is there a group discount???",
              "Send me the opening times and the adress too, and can we come on a sunday.",
              "Also we want to know if we can bring our own food or if there is a restaurant, because we get hungry.",
              "I need the answer very fast because we book the trip soon, so hurry pls.",
              "Bye,",
              "Ben",
            ],
          },
          subjectPlaceholder: "Add a subject",
          bodyPlaceholder: "Write your email here…",
          help: "Watch out for: the greeting · spelling (informations, adress) · capital letters (i, sunday) · too many questions in one sentence · the tone (hurry pls) · the closing.",
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
            "You want to spend your holidays helping an organisation that protects Australian wildlife. Write a full official email (100–130 words). Cover every point in the checklist below and finish with an appropriate closing.",
          subject: "Enquiry about volunteer opportunities",
          chips: [
            { n: "01", label: "Volunteer opportunities" },
            { n: "02", label: "Age requirements" },
            { n: "03", label: "Accommodation" },
            { n: "04", label: "Daily activities" },
            { n: "05", label: "Appropriate closing" },
          ],
          min: 100,
          max: 130,
          placeholder: "Write your email here…",
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
