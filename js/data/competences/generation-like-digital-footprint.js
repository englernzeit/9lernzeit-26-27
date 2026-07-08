/**
 * Generation Like (Unit 4) — Reading: "Your Digital Footprint".
 *
 * Follows the fixed Reading page structure (see memory:
 * reading-competence-page-structure): 15 new words, then the text in
 * three difficulty variants (one per level-step), with interactive
 * self-checking tasks, written tasks, and a hangman game on Step 1.
 *
 * DEMO content — texts are adapted from the Unit 4 material as a
 * direction. The 15 words are drawn from the text for now; later a
 * dedicated formatted word file will replace this list.
 */

const IMG = "assets/images/unit4/vocab";

export default {
  title: "Digital Footprint",

  newWords: {
    subtitle: "15 words for this text",
    stampLabel: "SAFE NET",
    words: [
      { en: "footprint", de: "der Fußabdruck", ex: "Your digital footprint reveals where you've been.", image: `${IMG}/vocab-footprint.jpg` },
      { en: "identity", de: "die Identität", ex: "Protect your identity online.", image: `${IMG}/vocab-identity.jpg` },
      { en: "password", de: "das Passwort", ex: "Make your password complex.", image: `${IMG}/vocab-password.jpg` },
      { en: "nickname", de: "der Spitzname", ex: "Invent a nickname when you post.", image: `${IMG}/vocab-nickname.jpg` },
      { en: "email", de: "die E-Mail", ex: "Think twice before sharing your email.", image: `${IMG}/vocab-email.jpg` },
      { en: "adult", de: "der/die Erwachsene", ex: "Tell an adult if something worries you.", image: `${IMG}/vocab-adult.jpg` },
      { en: "trail", de: "die Spur", ex: "You leave a trail every time you go online." },
      { en: "to register", de: "sich anmelden", ex: "You register for an online service." },
      { en: "to download", de: "herunterladen", ex: "He downloads a video." },
      { en: "to upload", de: "hochladen", ex: "She uploads a photo." },
      { en: "browser history", de: "der Browserverlauf", ex: "Clear your browser history regularly." },
      { en: "bookmark", de: "das Lesezeichen", ex: "Use bookmarks to find favourite sites." },
      { en: "recruiter", de: "der Personalvermittler", ex: "A recruiter checks your online profile." },
      { en: "candidate", de: "der/die Bewerber/in", ex: "Employers check the profiles of candidates." },
      { en: "punctuation", de: "die Satzzeichen", ex: "Add punctuation to make a password complex." },
    ],
  },

  // Word Master — 15 gap-fill sentences on this text's vocabulary.
  // German prompt (bold word) → type the missing English word.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Dein digitaler **Fußabdruck** zeigt, wo du warst.", en: "Your digital ___ shows where you have been.", answer: "footprint" },
      { de: "Schütze deine **Identität** im Internet.", en: "Protect your ___ online.", answer: "identity" },
      { de: "Verrate niemandem dein **Passwort**.", en: "Never tell anyone your ___.", answer: "password" },
      { de: "Benutze einen **Spitznamen**, wenn du Kommentare postest.", en: "Use a ___ when you post comments.", answer: "nickname" },
      { de: "Überlege zweimal, bevor du deine **E-Mail** teilst.", en: "Think twice before you share your ___.", answer: "email", accept: ["e-mail"] },
      { de: "Sag einem **Erwachsenen** Bescheid, wenn dich etwas beunruhigt.", en: "Tell an ___ if something worries you.", answer: "adult" },
      { de: "Jedes Mal online hinterlässt du eine **Spur**.", en: "Every time you go online you leave a ___.", answer: "trail" },
      { de: "Du musst dich für den Dienst **anmelden**.", en: "You have to ___ for the service.", answer: "register" },
      { de: "Er lädt ein Video **herunter**.", en: "He ___s a video.", answer: "download" },
      { de: "Sie lädt ein Foto **hoch**.", en: "She ___s a photo.", answer: "upload" },
      { de: "Lösche regelmäßig deinen **Browserverlauf**.", en: "Clear your ___ regularly.", answer: "browser history", accept: ["browsing history", "history"] },
      { de: "Benutze ein **Lesezeichen**, um deine Lieblingsseite zu finden.", en: "Use a ___ to find your favourite site.", answer: "bookmark" },
      { de: "Ein **Personalvermittler** prüft dein Onlineprofil.", en: "A ___ checks your online profile.", answer: "recruiter" },
      { de: "Arbeitgeber prüfen die Profile von **Bewerbern**.", en: "Employers check the profiles of ___s.", answer: "candidate" },
      { de: "Füge **Satzzeichen** hinzu, um ein Passwort komplex zu machen.", en: "Add ___ to make a password complex.", answer: "punctuation" },
    ],
  },

  steps: [
    {
      step: 1,
      subtitle: "Mit Bildern und Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Lesetext · LE",
          title: "Your digital footprint",
          paragraphs: [
            [
              "You go online every day. Every time, you leave a ",
              { w: "trail", de: "die Spur" },
              ". This is your digital ",
              { w: "footprint", de: "der Fußabdruck" },
              ". It shows what you do online, and other people can see it.",
            ],
            [
              "So be safe. Do not share your ",
              { w: "password", de: "das Passwort" },
              ". Use a ",
              { w: "nickname", de: "der Spitzname" },
              ", not your real name. Keep your ",
              { w: "identity", de: "die Identität" },
              " safe, and do not give your ",
              { w: "email", de: "die E-Mail" },
              " to strangers.",
            ],
            [
              "Is something wrong or scary? Then ask an ",
              { w: "adult", de: "der/die Erwachsene" },
              " for help. Be smart and be safe online.",
            ],
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Safe or risky?",
          intro: "Tap a card, then tap a box. Sort all ten. Check when you are ready.",
          groups: [
            {
              label: "✅ Safe",
              items: ["Use a nickname", "Log off", "Ask an adult", "Keep your password secret", "Clear your history"],
            },
            {
              label: "⚠️ Risky",
              items: ["Share your password", "Post your address", "Use your real photo", "Give your email away", "Show your real name"],
            },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Read and choose",
          intro: "Choose the correct answer. You get the result at once.",
          questions: [
            { q: "What do you leave every time you go online?", options: ["A trail", "A password", "A photo", "A sandwich", "A shoe"], correct: 0 },
            { q: "What is your digital footprint?", options: ["A shoe", "What you do online", "A game", "A song", "A password"], correct: 1 },
            { q: "What should you use instead of your real name?", options: ["Your email", "A nickname", "Your address", "Your password", "Your photo"], correct: 1 },
            { q: "What should you keep secret?", options: ["Your password", "Your nickname", "Your hobby", "Your favourite colour", "Your school"], correct: 0 },
            { q: "Who can you ask for help?", options: ["A stranger", "Nobody", "An adult", "A robot", "No one"], correct: 2 },
            { q: "What do you do before you leave a website?", options: ["Log off", "Share it", "Upload a photo", "Download a game", "Post your address"], correct: 0 },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Five safety sentences",
          intro: "Write five sentences about staying safe online. Finish each sentence starter.",
          starters: [
            "Online, I always …",
            "I never share my …",
            "My nickname is …",
            "If I feel worried, I …",
            "To stay safe, I …",
          ],
          help: "Hilfe: I always = ich immer · I never = ich nie",
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the vocabulary word, letter by letter — and save the hero from the monster!",
          words: [
            { word: "FOOTPRINT", hint: "The trail you leave online" },
            { word: "PASSWORD", hint: "Keep it secret and complex" },
            { word: "NICKNAME", hint: "A name that is not your real name" },
            { word: "IDENTITY", hint: "Who you are — protect it" },
            { word: "EMAIL", hint: "Do not give it to strangers" },
            { word: "ADULT", hint: "Ask this person for help" },
            { word: "TRAIL", hint: "What you leave when you go online" },
            { word: "DOWNLOAD", hint: "Get a file from the internet" },
            { word: "UPLOAD", hint: "Put a photo on the internet" },
            { word: "BOOKMARK", hint: "Save a favourite website" },
            { word: "RECRUITER", hint: "Checks your profile for a job" },
            { word: "ONLINE", hint: "On the internet" },
            { word: "WEBSITE", hint: "You visit it in a browser" },
            { word: "SAFE", hint: "Not in danger" },
          ],
        },
      ],
    },

    {
      step: 2,
      subtitle: "G-Kurs",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · G-Kurs",
          title: "Your digital footprint",
          paragraphs: [
            "Think about everything you do on your phone in one single day. You wake up and check your messages. On the bus you watch videos and like a few posts. At break you send photos to your friends and play a quick game. In the evening you shop for new trainers, search for song lyrics and text in three different group chats. Every one of these actions leaves a tiny mark on the internet. Put all of these marks together and you get your digital footprint.",
            "Your digital footprint is the trail of information you leave behind online. It shows which websites you visit, what you buy, where you are and who your friends are. Some of this trail you create on purpose, for example when you post a photo or write a comment. But a lot of it is created automatically, without you even noticing. Apps collect your location, shops remember what you looked at, and search engines save what you typed.",
            "The tricky thing is that this trail almost never disappears. You can delete a post from your own profile, but a friend may already have taken a screenshot. A funny video that felt like a joke at thirteen can still be found when you are seventeen. In other words, the internet has a very long memory.",
            "Why does this matter to you? Because more and more people look at your footprint. Older students, coaches, part-time employers and even schools sometimes check what young people share online. They want to know what kind of person you are before they meet you. A single rude comment or an embarrassing photo can give them the wrong idea about you.",
            "The good news is that you are in control. You do not have to stop using the internet — you just have to use it cleverly. Choose strong passwords and keep them secret. Use a nickname instead of your full name in public chats. And think for two seconds before you post: “Would I be happy if my gran, my teacher and my future boss all saw this?” If the answer is no, don't post it. Your footprint is like a photo of you that never fades, so make it show the best version of who you are.",
          ],
        },
        {
          type: "sentence-build",
          kind: "Interaktiv · Sätze bauen",
          title: "Build the safety rules",
          intro: "Tap the words in the right order. Then check.",
          sentences: [
            { tokens: ["Always", "log", "off", "on", "a", "shared", "computer"] },
            { tokens: ["Never", "share", "your", "password", "with", "others"] },
            { tokens: ["Think", "before", "you", "post", "a", "photo"] },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Check the facts",
          intro: "Choose the correct answer for each question.",
          questions: [
            { q: "What is a digital footprint?", options: ["The trail of information you leave online", "A photo of your shoe", "A type of password", "A new social media app", "A game on the bus"], correct: 0 },
            { q: "Which part of your footprint is created automatically?", options: ["A comment you write", "Your location collected by apps", "A photo you choose to post", "A message you send a friend", "A video you film yourself"], correct: 1 },
            { q: "Why is it hard to remove something from the internet?", options: ["Phones cannot delete files", "Someone may already have a screenshot", "The internet charges money to delete", "Only teachers can delete posts", "Posts turn into passwords"], correct: 1 },
            { q: "Who might check what you share online?", options: ["Only strangers abroad", "Nobody is interested", "Part-time employers and schools", "Just your parents", "Only your best friends"], correct: 2 },
            { q: "What is the writer's main advice?", options: ["Stop using the internet completely", "Share everything as fast as you can", "Think before you post and protect your details", "Only post late at night", "Give your password to close friends"], correct: 2 },
          ],
        },
        { type: "written", kind: "Schreiben · leicht", title: "My footprint today", intro: "Name three things you did online today — a video, a chat, a game… Write one short sentence about each.", answer: true, help: "Start each line with: Today I …" },
        { type: "written", kind: "Schreiben · leicht", title: "Delete one thing", intro: "If you could delete one thing from the internet forever, what would it be — and why? Write 2–3 sentences.", answer: true },
      ],
    },

    {
      step: 3,
      subtitle: "E-Kurs",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Lesetext · E-Kurs",
          title: "Your digital footprint",
          paragraphs: [
            "Every time you go online you leave a trail, just like a real footprint pressed into wet sand. It records where you have been, how long you stayed and what you did while you were there. Whenever you register for a new service, send an email, download a film or upload a photo, a little more information is added to the picture. Individually these details seem harmless; together they form a surprisingly complete portrait of your life.",
            "This portrait is what we call your digital footprint, and it comes in two forms. Your active footprint is the material you share on purpose: the posts you publish, the comments you write, the profiles you fill in. Your passive footprint is the data that is gathered quietly in the background — the location stored by an app, the products a shop remembers you viewing, the search terms a browser records. Most people are aware of the first kind but forget about the second, which is often far larger.",
            "What makes a digital footprint so powerful is that it is permanent and searchable. A printed diary can be locked in a drawer, but information online can be copied, shared and stored on servers all over the world in seconds. Deleting your own copy does not delete the copies other people have already saved. As a result, a thoughtless message or an unflattering photo can resurface years later, long after you have forgotten it existed.",
            "This is not necessarily something to worry about, but it is definitely something to be aware of. A growing number of people take an interest in what you leave behind. Colleges, universities and employers frequently examine the online profiles of candidates before offering them a place or a job. Some applicants have missed opportunities they really wanted because their footprint gave a poor impression — an aggressive comment, a photo taken at the wrong moment, or simply a profile that looked careless. Recruiters rarely explain why they said no, so the candidate never even learns what went wrong.",
            "None of this means you should abandon the internet or live in fear of it. The web is one of the most useful tools you will ever have, and a positive footprint can actually work in your favour: a thoughtful blog, a creative project or evidence of a genuine hobby can impress the very people who are checking. The goal is not to disappear, but to be deliberate. Protect your identity with strong, complex passwords that mix letters, numbers and punctuation. Use a nickname in public spaces, share personal details sparingly, and review your privacy settings from time to time.",
            "Above all, get into the habit of asking yourself one simple question before you post anything: “Would I be completely happy for absolutely everyone — my family, my teachers and a future employer — to see this?” If any part of you hesitates, that hesitation is worth listening to. Your footprint will follow you for the rest of your life, so it is worth making sure it tells the story you actually want to tell.",
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Read between the lines",
          intro: "Choose the answer the text implies.",
          questions: [
            { q: "What is the difference between an active and a passive footprint?", options: ["Active is shared on purpose; passive is gathered in the background", "Active is online; passive is on paper", "Active belongs to adults; passive to teens", "Active is legal; passive is illegal", "There is no real difference"], correct: 0 },
            { q: "Why does the writer compare a footprint to a mark in wet sand?", options: ["Because both are made at the beach", "Because both record where you have been", "Because both wash away instantly", "Because both are impossible to see", "Because both are made of data"], correct: 1 },
            { q: "Why can deleting your own post fail to remove the information?", options: ["Deleting costs money", "Others may already have copied or saved it", "Only servers can delete posts", "The post becomes a password", "Phones delete the wrong files"], correct: 1 },
            { q: "Why might a recruiter's decision be especially frustrating?", options: ["Recruiters explain every reason in detail", "Candidates are told to reapply at once", "Recruiters rarely say why, so you never learn what went wrong", "The job is given to a robot", "You must pay to see your footprint"], correct: 2 },
            { q: "What does the writer say a positive footprint can do?", options: ["Nothing — all footprints are bad", "Actually impress the people checking it", "Replace the need for passwords", "Automatically delete old posts", "Make the internet run faster"], correct: 1 },
          ],
        },
        {
          type: "group-sort",
          kind: "Interaktiv · Sortieren",
          title: "Reveal or protect?",
          intro: "Sort each action: does it reveal your footprint, or protect it?",
          groups: [
            { label: "Reveals your footprint", items: ["Uploading a photo", "Registering with your real name", "Posting your location"] },
            { label: "Protects your footprint", items: ["Using a nickname", "Logging off", "Clearing your history"] },
          ],
        },
        { type: "written", kind: "Schreiben", title: "Your future self", intro: "It's five years from now and someone googles your name. Write down two things you'd love them to find — and one thing you'd hate them to see.", answer: true },
        { type: "written", kind: "Schreiben", title: "Advice to a friend", intro: "Your younger cousin just got their first phone. Give them your three best rules for staying safe online, and say why each one matters.", answer: true },
      ],
    },

    {
      step: 4,
      subtitle: "Challenge",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "written",
          kind: "Kreativ · Challenge",
          title: "Design your dream profile",
          intro:
            "You're building a brand-new profile you'd be proud of for the next ten years. Describe it: your username, your bio, the first three things you'd post, and one thing you'd NEVER share. Explain your choices.",
          answer: true,
          help: "Tip: make it 'you' — your real hobbies and interests, not a fake perfect person.",
        },
      ],
    },
  ],
};
