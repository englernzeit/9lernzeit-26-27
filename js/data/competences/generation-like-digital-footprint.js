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

export default {
  title: "Digital Footprint",

  newWords: {
    subtitle: "15 words for this text",
    stampLabel: "ME ONLINE",
    words: [
      { en: "average", de: "durchschnittlich", ex: "The average teenager checks their phone over a hundred times a day." },
      { en: "at the same time", de: "zur selben Zeit / gleichzeitig", ex: "She was texting, watching a video and doing homework all at the same time." },
      { en: "habit", de: "die (An-)Gewohnheit", ex: "Scrolling before sleep had become a habit he just couldn't break." },
      { en: "to convince", de: "überzeugen", ex: "It took three influencers to convince me that I really needed those trainers." },
      { en: "imaginative", de: "einfallsreich / kreativ", ex: "Her feed is so imaginative that every photo looks like a tiny piece of art." },
      { en: "in other words", de: "mit anderen Worten", ex: "He never likes, never comments — in other words, he's basically a ghost online." },
      { en: "although", de: "obwohl", ex: "Although the photo looked perfect, it had taken fifty tries to get right." },
      { en: "be a drifter", de: "sich treiben lassen", ex: "Online he's a bit of a drifter, jumping from trend to trend without ever settling." },
      { en: "arty", de: "(gewollt) künstlerisch", ex: "The black-and-white filter gives her selfies a deliberately arty look." },
      { en: "pair", de: "das Paar", ex: "In the picture a pair of friends are sharing one set of earphones." },
      { en: "depressing", de: "deprimierend", ex: "Comparing yourself to perfect online lives can be really depressing." },
      { en: "put sth. up (on social media)", de: "etwas (in sozialen Medien) (ein)stellen", ex: "Think twice before you put a photo up on social media — it never truly disappears." },
      { en: "argument", de: "der Streit", ex: "A silly comment online turned into a huge argument between the two of them." },
      { en: "the pros and cons", de: "das Für und Wider", ex: "Before deleting her account, she wrote down all the pros and cons." },
      { en: "vain", de: "eitel", ex: "Posting a hundred selfies a week, he slowly started to seem a little vain." },
    ],
  },

  // Word Master — 15 gap-fill sentences on this text's vocabulary.
  // German prompt (bold word) → type the missing English word.
  // Deliberately SHUFFLED (order ≠ the word-card order) so it isn't
  // guessable, and the gaps don't give the answer away.
  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Er liked nie und kommentiert nie — **mit anderen Worten**, online existiert er kaum.", en: "He never likes and never comments — ___, he barely exists online.", answer: "in other words" },
      { de: "Aus einem dummen Kommentar wurde ein riesiger **Streit**.", en: "A stupid comment grew into a huge ___.", answer: "argument" },
      { de: "Der **durchschnittliche** Teenager schaut hundertmal am Tag aufs Handy.", en: "The ___ teenager looks at their phone a hundred times a day.", answer: "average" },
      { de: "Der Schwarz-Weiß-Filter gibt ihren Selfies einen gewollt **künstlerischen** Touch.", en: "The black-and-white filter gives her selfies a deliberately ___ look.", answer: "arty" },
      { de: "Drei Influencer mussten mich erst **überzeugen**, dass ich die Schuhe brauche.", en: "It took three influencers to ___ me that I needed the shoes.", answer: "convince" },
      { de: "Mit hundert Selfies pro Woche wirkte er langsam ziemlich **eitel**.", en: "With a hundred selfies a week, he slowly seemed rather ___.", answer: "vain" },
      { de: "Sie textete, sah ein Video und lernte — alles **gleichzeitig**.", en: "She was texting, watching a video and studying — all ___.", answer: "at the same time" },
      { de: "Sich ständig mit perfekten Online-Leben zu vergleichen, ist oft **deprimierend**.", en: "Constantly comparing yourself to perfect online lives is often ___.", answer: "depressing" },
      { de: "Online lässt er sich einfach **treiben** und springt von Trend zu Trend.", en: "Online he's a real ___, jumping from trend to trend.", answer: "drifter" },
      { de: "Vor dem Löschen ihres Accounts notierte sie das ganze **Für und Wider**.", en: "Before deleting her account, she listed all the pros and ___.", answer: "cons" },
      { de: "Vor dem Schlafen zu scrollen war zur festen **Gewohnheit** geworden.", en: "Scrolling before sleep had become a fixed ___.", answer: "habit" },
      { de: "Überlege gut, bevor du ein Foto in sozialen Medien **einstellst**.", en: "Think carefully before you ___ a photo up on social media.", answer: "put" },
      { de: "Ihr Feed ist so **einfallsreich**, dass jedes Foto wie kleine Kunst wirkt.", en: "Her feed is so ___ that every photo looks like a tiny piece of art.", answer: "imaginative" },
      { de: "Auf dem Bild teilt sich ein **Paar** Freunde die Kopfhörer.", en: "In the picture, a ___ of friends are sharing earphones.", answer: "pair" },
      { de: "**Obwohl** das Foto perfekt aussah, hatte es fünfzig Versuche gebraucht.", en: "___ the photo looked perfect, it had taken fifty tries.", answer: "although" },
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
          type: "profile-builder",
          kind: "Kreativ · Challenge",
          title: "Design your dream profile",
          intro:
            "You're building a brand-new profile you'd be proud of for the next ten years. Fill it in below — username, bio, your first three posts, and one thing you'd NEVER share.",
          help: "Tip: make it 'you' — your real hobbies and interests, not a fake perfect person.",
        },
      ],
    },
  ],
};
