/**
 * Generation Like (Unit 4) — Listening: "Jerome the Influencer".
 *
 * Adapted from the Unit 4 material (Week 2 Listening) as a DIRECTION and
 * rebuilt in our watercolor-journal design across the four language-level
 * Steps (LE · G-Kurs · E-Kurs · Challenge). See memory:
 * unit4-material-is-direction-not-spec.
 *
 * Audio-driven: Jerome's story and the grammar/dialogue tracks play from
 * a card-level player. Self-checking widgets (image-match, event-order,
 * multiple-choice, gap-fill, inline-choice) plus written tasks and the
 * "Sell It!" caption builder challenge.
 */

const IMG = "assets/images/unit4/vocab";
const AUD = "assets/audio";

export default {
  title: "Jerome the Influencer",

  newWords: {
    subtitle: "15 words for this unit",
    stampLabel: "ON AIR",
    words: [
      { en: "influencer", de: "der Influencer", ex: "Jerome is a gaming influencer." },
      { en: "follower", de: "der Follower / Abonnent", ex: "He has thousands of followers." },
      { en: "channel", de: "der Kanal", ex: "She started a cooking channel." },
      { en: "account", de: "das Konto / der Account", ex: "Keep your account safe." },
      { en: "review", de: "die Rezension / bewerten", ex: "He writes a review of every new game." },
      { en: "subscribe to", de: "abonnieren", ex: "I subscribe to three channels.", image: `${IMG}/vocab2-subscribe.jpg` },
      { en: "follow", de: "folgen", ex: "Follow me for daily tips!", image: `${IMG}/vocab2-follow.jpg` },
      { en: "post", de: "posten / hochladen", ex: "She posts a photo every day.", image: `${IMG}/vocab2-post.jpg` },
      { en: "comment on", de: "kommentieren", ex: "Fans comment on his videos.", image: `${IMG}/vocab2-comment-on.jpg` },
      { en: "vlog", de: "das Videoblog / vloggen", ex: "He likes to vlog about his day.", image: `${IMG}/vocab2-vlog.jpg` },
      { en: "delete", de: "löschen", ex: "He deleted his first video.", image: `${IMG}/vocab2-delete.jpg` },
      { en: "switch on", de: "einschalten", ex: "Switch on your camera.", image: `${IMG}/vocab2-switch-on.jpg` },
      { en: "switch off", de: "ausschalten", ex: "Switch off your phone at night.", image: `${IMG}/vocab2-switch-off.jpg` },
      { en: "shut down", de: "herunterfahren", ex: "He nearly shut down his account.", image: `${IMG}/vocab2-shut-down.jpg` },
      { en: "build up", de: "aufbauen", ex: "It takes time to build up a channel.", image: `${IMG}/vocab2-build-up.jpg` },
    ],
  },

  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Jerome ist ein Gaming-**Influencer**.", en: "Jerome is a gaming ___.", answer: "influencer" },
      { de: "Er hat tausende **Follower**.", en: "He has thousands of ___s.", answer: "follower" },
      { de: "Sie hat einen Koch-**Kanal** gestartet.", en: "She started a cooking ___.", answer: "channel" },
      { de: "Halte dein **Konto** sicher.", en: "Keep your ___ safe.", answer: "account" },
      { de: "Er schreibt eine **Rezension** zu jedem neuen Spiel.", en: "He writes a ___ of every new game.", answer: "review" },
      { de: "Ich **abonniere** drei Kanäle.", en: "I ___ to three channels.", answer: "subscribe", accept: ["subscribe to"] },
      { de: "**Folge** mir für tägliche Tipps!", en: "___ me for daily tips!", answer: "follow" },
      { de: "Sie **postet** jeden Tag ein Foto.", en: "She ___s a photo every day.", answer: "post" },
      { de: "Fans **kommentieren** seine Videos.", en: "Fans ___ on his videos.", answer: "comment", accept: ["comment on"] },
      { de: "Er **vloggt** gern über seinen Tag.", en: "He likes to ___ about his day.", answer: "vlog" },
      { de: "Er hat sein erstes Video **gelöscht**.", en: "He ___d his first video.", answer: "delete" },
      { de: "**Schalte** deine Kamera **ein**.", en: "___ on your camera.", answer: "switch" },
      { de: "**Schalte** nachts dein Handy **aus**.", en: "___ off your phone at night.", answer: "switch" },
      { de: "Er hat sein Konto fast **heruntergefahren**.", en: "He nearly ___ down his account.", answer: "shut" },
      { de: "Es dauert, einen Kanal **aufzubauen**.", en: "It takes time to ___ up a channel.", answer: "build" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Wortschatz mit Bildern und Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Wortschatz · LE",
          title: "The words of social media",
          paragraphs: [
            [
              "Jerome is an ",
              { w: "influencer", de: "der Influencer" },
              ". He makes videos online and lots of people ",
              { w: "follow", de: "folgen" },
              " him.",
            ],
            [
              "Every day fans ",
              { w: "subscribe to", de: "abonnieren" },
              " his channel, ",
              { w: "comment on", de: "kommentieren" },
              " his videos and ",
              { w: "post", de: "posten / hochladen" },
              " nice messages. This lesson teaches the words you need to talk about social media.",
            ],
          ],
        },
        {
          type: "image-match",
          kind: "Interaktiv · Bilder",
          title: "Match the picture to the word",
          intro: "Listen, then tap a picture and tap the word that matches it.",
          audio: { src: `${AUD}/8_06.mp3`, label: "Audio 1 · the ten words" },
          pairs: [
            { word: "subscribe to", image: `${IMG}/vocab2-subscribe.jpg` },
            { word: "post", image: `${IMG}/vocab2-post.jpg` },
            { word: "switch off", image: `${IMG}/vocab2-switch-off.jpg` },
            { word: "switch on", image: `${IMG}/vocab2-switch-on.jpg` },
            { word: "build up", image: `${IMG}/vocab2-build-up.jpg` },
            { word: "shut down", image: `${IMG}/vocab2-shut-down.jpg` },
            { word: "follow", image: `${IMG}/vocab2-follow.jpg` },
            { word: "vlog", image: `${IMG}/vocab2-vlog.jpg` },
            { word: "comment on", image: `${IMG}/vocab2-comment-on.jpg` },
            { word: "delete", image: `${IMG}/vocab2-delete.jpg` },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "What does it mean?",
          intro: "Choose the correct meaning. You see at once if you are right.",
          questions: [
            { q: "to subscribe to a channel means…", options: ["to agree to receive its videos regularly", "to delete a video", "to switch off your phone", "to write a bad comment", "to lose your password"], correct: 0 },
            { q: "to delete a video means…", options: ["to remove it", "to upload it", "to like it", "to share it", "to watch it again"], correct: 0 },
            { q: "to vlog means…", options: ["to make and share videos online", "to turn off a computer", "to buy a game", "to block a user", "to read a book"], correct: 0 },
            { q: "to follow someone means…", options: ["to choose to see what they post", "to walk behind them", "to delete them", "to pay them money", "to switch them off"], correct: 0 },
            { q: "to comment on a post means…", options: ["to write your opinion under it", "to shut it down", "to build it up", "to subscribe to it", "to switch it on"], correct: 0 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "The right verb",
          intro: "Type the missing social-media verb, then press Check.",
          items: [
            { hint: "= abonnieren", segments: ["I ", { answer: "subscribe", accept: ["subscribe to"], size: 12 }, " to three gaming channels."] },
            { hint: "switch ___ = ausschalten", segments: ["Please ", { answer: "switch", size: 9 }, " off your phone in class."] },
            { hint: "= löschen", segments: ["He wanted to ", { answer: "delete", size: 9 }, " his old video because he did not like it."] },
            { hint: "comment ___ = kommentieren", segments: ["Don't forget to ", { answer: "comment", size: 10 }, " on my new post!"] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben · leicht",
          title: "Use it — about you",
          intro: "Finish each sentence so it is true for you.",
          starters: [
            "Something I have subscribed to: …",
            "Something I have deleted online: …",
            "Someone I follow on social media: …",
          ],
          help: "Hilfe: subscribe = abonnieren · delete = löschen · follow = folgen",
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the social-media word, letter by letter — and save the hero!",
          words: [
            { word: "INFLUENCER", hint: "Someone with many online followers" },
            { word: "FOLLOWER", hint: "A person who subscribes to you" },
            { word: "CHANNEL", hint: "Where a YouTuber posts videos" },
            { word: "SUBSCRIBE", hint: "Agree to get someone's videos" },
            { word: "FOLLOW", hint: "Choose to see what someone posts" },
            { word: "COMMENT", hint: "Write your opinion under a post" },
            { word: "VLOG", hint: "A video diary" },
            { word: "DELETE", hint: "Remove something online" },
            { word: "ACCOUNT", hint: "Your personal profile on an app" },
            { word: "REVIEW", hint: "Say what you think of a new game" },
            { word: "POST", hint: "Put a message or image online" },
            { word: "UPLOAD", hint: "Put a file onto the internet" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Jerome's story",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "event-order",
          kind: "Interaktiv · Reihenfolge",
          title: "Put Jerome's story in order",
          intro: "Listen to Jerome's story, then number the events 1–5 in the right order and Check.",
          audio: { src: `${AUD}/8_07.mp3`, label: "Audio 2 · Jerome's story" },
          events: [
            { text: "Jerome started his YouTube channel about gaming." },
            { text: "He deleted his early videos because he wasn't happy with them." },
            { text: "His followers loved his vlogs and the channel grew." },
            { text: "He nearly shut down his account because of negative comments." },
            { text: "Companies started sending him new games to review." },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Listen and understand",
          intro: "Listen again if you need to, then choose the best answer.",
          audio: { src: `${AUD}/8_07.mp3`, label: "Audio 2 · Jerome's story" },
          questions: [
            { q: "Why did Jerome start his channel?", options: ["He loved gaming and wanted to share it", "His school made him", "He wanted to sell his old games", "He needed a password", "A company paid him first"], correct: 0 },
            { q: "Why did he delete his early videos?", options: ["He wasn't happy with them", "They were too popular", "His phone broke", "A teacher told him to", "They had no sound"], correct: 0 },
            { q: "What did his followers love?", options: ["His vlogs", "His homework", "His silence", "His deleted videos", "His password"], correct: 0 },
            { q: "Why did he nearly shut down his account?", options: ["Because of negative comments", "He ran out of games", "He forgot his login", "He was too famous", "His channel was too small"], correct: 0 },
            { q: "What did companies start doing?", options: ["Sending him new games to review", "Deleting his videos", "Blocking his account", "Charging him money", "Ignoring him"], correct: 0 },
          ],
        },
        {
          type: "gap-fill",
          kind: "Interaktiv · Lücken",
          title: "Complete the summary",
          intro: "Fill each gap with one word from Jerome's story, then Check.",
          audio: { src: `${AUD}/8_07.mp3`, label: "Audio 2 · Jerome's story" },
          items: [
            { hint: "the place where he posts his videos", segments: ["Jerome started a YouTube ", { answer: "channel", size: 10 }, " about gaming."] },
            { hint: "past of 'delete'", segments: ["At first he ", { answer: "deleted", size: 9 }, " his early videos."] },
            { hint: "the people who subscribe to him", segments: ["Later his ", { answer: "followers", size: 11 }, " loved his vlogs."] },
            { hint: "messages people write under a video", segments: ["Negative ", { answer: "comments", size: 11 }, " nearly made him quit, but he kept going."] },
            { hint: "businesses that sell games", segments: ["Now ", { answer: "companies", size: 11 }, " send him new games to review."] },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "In full sentences",
          intro: "Answer about Jerome's story in complete sentences.",
          starters: [
            "Jerome nearly quit because …",
            "He solved the problem by …",
            "His advice to new influencers is …",
          ],
          help: "Write full sentences — begin with a capital letter and end with a full stop.",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Grammar — pronouns",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Grammatik · E-Kurs",
          title: "Two kinds of pronoun",
          paragraphs: [
            "Advertising language is full of pronouns. Indefinite pronouns talk about people or things in general, without saying exactly who or what: everyone, someone, anyone, no one, nobody, everything, something, anything, nothing. Adverts love them because “everyone is buying this” sounds far more powerful than a name.",
            "Reflexive and reciprocal pronouns point back to the subject or between two people: myself, yourself, himself, herself, ourselves, themselves — and each other and one another for two-way actions. Watch how the advert and the dialogue below use them to make you compare yourself to other people.",
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Pronomen",
          title: "Circle the correct pronoun",
          intro: "Listen, then tap the correct pronoun in each gap and Check.",
          audio: { src: `${AUD}/8_08.mp3`, label: "Audio 3 · the advert" },
          layout: "prose",
          segments: [
            "Ads are ",
            { gap: 0 },
            ", but have you ever asked ",
            { gap: 1 },
            " how advertising works? Marketing companies use techniques to make us buy things we don't even want. ",
            { gap: 2 },
            " is more effective than making us think that we are missing out on ",
            { gap: 3 },
            " that ",
            { gap: 4 },
            " else has and that we will be happier if we buy ",
            { gap: 5 },
            " something new. They also make us compare ",
            { gap: 6 },
            " to others. For example, in a typical shampoo ad, two women look at ",
            { gap: 7 },
            ". One of them asks herself, “Why is her hair so beautiful?” When they talk to ",
            { gap: 8 },
            " she discovers the secret: the incredible shampoo!",
          ],
          gaps: [
            { options: ["everywhere", "anywhere"], answer: "everywhere" },
            { options: ["ourself", "yourself"], answer: "yourself" },
            { options: ["Everything", "Nothing"], answer: "Nothing" },
            { options: ["something", "anything"], answer: "something" },
            { options: ["everyone", "no one"], answer: "everyone" },
            { options: ["ourselves", "themselves"], answer: "ourselves" },
            { options: ["myself", "ourselves"], answer: "ourselves" },
            { options: ["themselves", "each other"], answer: "each other" },
            { options: ["one another", "themselves"], answer: "one another" },
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Dialog",
          title: "Recommending an online tool",
          intro: "Listen, then choose the phrase that fits each gap from the box above. Then Check.",
          audio: { src: `${AUD}/8_09.mp3`, label: "Audio 4 · Ginny & Niall" },
          layout: "dialogue",
          bank: [
            "Why don't you...",
            "You could always...",
            "It's really easy...",
            "I don't know where to start",
            "Would it be difficult?",
            "How does it work?",
          ],
          lines: [
            { speaker: "Ginny", segments: ["What's up, Niall?"] },
            { speaker: "Niall", segments: ["I've got to make a video for my technology project to advertise something and I don't have a clue what to do. ", { gap: 0 }, "! Can you think of anything?"] },
            { speaker: "Ginny", segments: [{ gap: 1 }, " use a video creation tool. ", { gap: 2 }, " to make videos. I've used some great ones."] },
            { speaker: "Niall", segments: ["That sounds like a plan. What do I need to know?"] },
            { speaker: "Ginny", segments: ["Well, a video creation tool ", { gap: 3 }, " because it would provide you with a ready-made template."] },
            { speaker: "Niall", segments: [{ gap: 4 }, "?"] },
            { speaker: "Ginny", segments: ["Yeah, you can teach yourself to do it, no problem."] },
            { speaker: "Niall", segments: ["Excellent! So I add my own text and images, do I?"] },
            { speaker: "Ginny", segments: ["Well, you need to write your own text, but most video creation tools have a ready-made image bank, which is handy."] },
            { speaker: "Niall", segments: ["Great, I can use their images."] },
            { speaker: "Ginny", segments: ["Yep, and you can add music and a voiceover. ", { gap: 5 }, "!"] },
            { speaker: "Niall", segments: ["Sounds like a no-brainer. I'll check out the options online. Thanks, Ginny!"] },
          ],
          gaps: [
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "I don't know where to start" },
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "Why don't you..." },
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "It's really easy..." },
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "You could always..." },
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "Would it be difficult?" },
            { options: ["Why don't you...", "You could always...", "It's really easy...", "I don't know where to start", "Would it be difficult?", "How does it work?"], answer: "How does it work?" },
          ],
        },
        {
          type: "written",
          kind: "Schreiben",
          title: "Use it — about you",
          intro: "Complete these sentences so they are true for you. Use the pronouns from this step.",
          starters: [
            "I have taught myself to …",
            "I never go anywhere without …",
            "I compare myself to others when …",
          ],
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Sell It!",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "caption-builder",
          kind: "Kreativ · Challenge",
          title: "Sell It! — your Instagram caption",
          intro:
            "You are a social-media influencer. Pick any product and write a persuasive Instagram caption. The checklist ticks off each requirement automatically as you type.",
          help: "Peer review: swap captions with a partner. Did they use an indefinite pronoun? Did their caption give you FOMO? Tell them one phrase that worked.",
        },
      ],
    },
  ],
};
