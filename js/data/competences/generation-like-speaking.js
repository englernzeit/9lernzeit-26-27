/**
 * Generation Like (Unit 4) — Speaking: "Describe the Picture".
 *
 * A picture-description (Bildbeschreibung) page across the four
 * language-level Steps: the language of describing → structuring a full
 * description → speculating and interpreting → a solo challenge.
 *
 * The photos are added later; every picture slot uses `image:` and shows
 * a "Picture coming soon" placeholder until the artwork is dropped into
 * assets/images/unit4/speaking/. Each speaking task keeps a notes field
 * (persisted + in the PDF) so learners prepare before they speak aloud.
 */

const PIC = "assets/images/unit4/speaking";

export default {
  title: "Speaking",

  newWords: {
    subtitle: "15 words for describing pictures",
    stampLabel: "ON STAGE",
    words: [
      { en: "the foreground", de: "der Vordergrund", ex: "In the foreground I can see a girl." },
      { en: "the background", de: "der Hintergrund", ex: "There is a city in the background." },
      { en: "in the middle", de: "in der Mitte", ex: "In the middle there is a table." },
      { en: "on the left", de: "links", ex: "On the left there is a window." },
      { en: "on the right", de: "rechts", ex: "On the right I can see a dog." },
      { en: "at the top", de: "oben", ex: "At the top of the picture there is the sky." },
      { en: "at the bottom", de: "unten", ex: "At the bottom there is some grass." },
      { en: "to show", de: "zeigen", ex: "The picture shows a busy street." },
      { en: "to describe", de: "beschreiben", ex: "Describe what you can see." },
      { en: "the scene", de: "die Szene", ex: "The scene takes place in a park." },
      { en: "to seem", de: "scheinen / wirken", ex: "The man seems tired." },
      { en: "probably", de: "wahrscheinlich", ex: "They are probably friends." },
      { en: "to guess", de: "vermuten / raten", ex: "I guess it is early morning." },
      { en: "in the picture", de: "auf dem Bild", ex: "In the picture there are three people." },
      { en: "there is / there are", de: "es gibt", ex: "There are two children in the picture." },
    ],
  },

  wordMaster: {
    subtitle: "Complete each sentence with the right English word.",
    items: [
      { de: "Im **Vordergrund** sehe ich ein Mädchen.", en: "In the ___ I can see a girl.", answer: "foreground" },
      { de: "Im **Hintergrund** ist eine Stadt.", en: "There is a city in the ___.", answer: "background" },
      { de: "**In der Mitte** steht ein Tisch.", en: "___ the middle there is a table.", answer: "in" },
      { de: "**Links** ist ein Fenster.", en: "On the ___ there is a window.", answer: "left" },
      { de: "**Rechts** sehe ich einen Hund.", en: "On the ___ I can see a dog.", answer: "right" },
      { de: "**Oben** ist der Himmel.", en: "At the ___ there is the sky.", answer: "top" },
      { de: "Das Bild **zeigt** eine belebte Straße.", en: "The picture ___s a busy street.", answer: "show" },
      { de: "**Beschreibe**, was du siehst.", en: "___ what you can see.", answer: "describe" },
      { de: "Die **Szene** spielt in einem Park.", en: "The ___ takes place in a park.", answer: "scene" },
      { de: "Der Mann **wirkt** müde.", en: "The man ___s tired.", answer: "seem" },
      { de: "Sie sind **wahrscheinlich** Freunde.", en: "They are ___ friends.", answer: "probably" },
      { de: "Ich **vermute**, es ist früher Morgen.", en: "I ___ it is early morning.", answer: "guess" },
      { de: "**Auf dem Bild** sind drei Personen.", en: "In the ___ there are three people.", answer: "picture" },
      { de: "**Es gibt** zwei Kinder auf dem Bild.", en: "___ two children in the picture.", answer: "there are", accept: ["there're"] },
      { de: "Die Person scheint zu **lächeln**.", en: "The person seems to be ___.", answer: "smiling" },
    ],
  },

  steps: [
    /* ============ STEP 1 — LE ============ */
    {
      step: 1,
      subtitle: "Die Sprache der Bildbeschreibung — mit Hilfe auf Deutsch",
      accent: "coral",
      layout: "slide",
      cards: [
        {
          type: "text",
          kind: "Sprechen · LE",
          title: "How to describe a picture",
          paragraphs: [
            [
              "When you describe a picture, you say ",
              { w: "what", de: "was" },
              " you can see and ",
              { w: "where", de: "wo" },
              " it is. Start with the middle or the ",
              { w: "foreground", de: "der Vordergrund" },
              ", then move to the ",
              { w: "background", de: "der Hintergrund" },
              ".",
            ],
            [
              "Useful sentence starters: “This is a picture of …”, “I can see …”, “There is / There are …”, “In the foreground …”, “On the left / right …”. Learn these and you can describe almost anything.",
            ],
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "Where is it?",
          intro: "Match each English position word to its German meaning, then Check.",
          options: ["der Vordergrund", "der Hintergrund", "in der Mitte", "links", "rechts", "oben"],
          items: [
            { left: "the foreground", answer: "der Vordergrund" },
            { left: "the background", answer: "der Hintergrund" },
            { left: "in the middle", answer: "in der Mitte" },
            { left: "on the left", answer: "links" },
            { left: "on the right", answer: "rechts" },
            { left: "at the top", answer: "oben" },
          ],
        },
        {
          type: "written",
          kind: "Sprechen · leicht",
          title: "Describe this picture",
          intro: "Look at the picture and finish each sentence. Then say your description out loud.",
          image: `${PIC}/scene-1.jpg`,
          imageAlt: "Speaking picture 1",
          starters: [
            "This is a picture of …",
            "In the foreground I can see …",
            "In the background there is …",
            "On the left there is …",
            "The people are probably …",
          ],
          help: "Hilfe: I can see = Ich kann sehen · there is = es gibt",
        },
        {
          type: "game",
          game: "monster-hangman",
          kind: "Spiel",
          title: "Monster's Lunch",
          intro: "Guess the vocabulary word, letter by letter — and save the hero from the monster!",
          words: [
            { word: "FOREGROUND", hint: "The front part of a picture" },
            { word: "BACKGROUND", hint: "The part far away in a picture" },
            { word: "MIDDLE", hint: "The centre of the picture" },
            { word: "LEFT", hint: "The opposite of right" },
            { word: "RIGHT", hint: "The opposite of left" },
            { word: "DESCRIBE", hint: "Say what you can see" },
            { word: "PICTURE", hint: "You describe this in a speaking task" },
            { word: "SCENE", hint: "What is happening in the photo" },
            { word: "PROBABLY", hint: "Almost sure, but not 100%" },
            { word: "GUESS", hint: "Say what you think without being sure" },
          ],
        },
      ],
    },

    /* ============ STEP 2 — G-Kurs ============ */
    {
      step: 2,
      subtitle: "G-Kurs · Structure a full description",
      accent: "olive",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Sprechen · G-Kurs",
          title: "Give your description an order",
          paragraphs: [
            "A good description follows a clear order, so the listener can picture the scene. First, introduce the picture in one sentence: what is it and where is it? Then describe the foreground, then the background. Add details about the people: what they look like and what they are doing. Finally, say what you think or feel about the picture.",
            "Use linking words to move through the picture: “In the foreground …”, “Behind them …”, “On the right …”, “In the background …”. This makes your description sound organised and confident.",
          ],
        },
        {
          type: "inline-choice",
          kind: "Interaktiv · Lücken",
          title: "Complete the model description",
          intro: "Choose the phrase that fits each gap, then Check.",
          layout: "prose",
          bank: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"],
          segments: [
            { gap: 0 },
            " a group of teenagers in a park. ",
            { gap: 1 },
            " I can see three friends sitting on the grass with their phones. ",
            { gap: 2 },
            " there are tall trees and a few buildings. ",
            { gap: 3 },
            " a boy is taking a selfie. ",
            { gap: 4 },
            " happy and relaxed.",
          ],
          gaps: [
            { options: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"], answer: "This is a picture of" },
            { options: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"], answer: "In the foreground" },
            { options: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"], answer: "In the background" },
            { options: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"], answer: "On the right" },
            { options: ["This is a picture of", "In the foreground", "In the background", "On the right", "They seem to be"], answer: "They seem to be" },
          ],
        },
        {
          type: "written",
          kind: "Sprechen · G-Kurs",
          title: "Describe this picture in order",
          intro: "Prepare a full description in the right order, then say it out loud. Write your notes here.",
          image: `${PIC}/scene-2.jpg`,
          imageAlt: "Speaking picture 2",
          starters: [
            "This is a picture of …",
            "In the foreground …",
            "In the background …",
            "On the left / right …",
            "The people are … (what they look like)",
            "They are … (what they are doing)",
          ],
        },
        {
          type: "written",
          kind: "Sprechen",
          title: "Your opinion",
          intro: "What do you think about this picture? Do you like it? Does it remind you of anything? Prepare 2–3 sentences and say them.",
          answer: true,
          help: "Try: I like this picture because … / It reminds me of …",
        },
      ],
    },

    /* ============ STEP 3 — E-Kurs ============ */
    {
      step: 3,
      subtitle: "E-Kurs · Speculate and interpret",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          type: "text",
          kind: "Sprechen · E-Kurs",
          title: "Speculating about a picture",
          paragraphs: [
            "At the higher level you do more than describe — you interpret. You cannot know everything about a photo, so you speculate: you make careful guesses about the people, the place and the situation. English gives you polite ways to do this without sounding certain.",
            "Useful language: “It looks as if …”, “They might / could be …”, “Perhaps / Maybe …”, “I suppose …”, “It seems that …”, “Judging by their faces, …”. End by interpreting the message or mood of the picture: what is it really about?",
          ],
        },
        {
          type: "match-up",
          kind: "Interaktiv · Zuordnen",
          title: "How sure are you?",
          intro: "Match each speaking phrase to what it does, then Check.",
          options: ["introduce the picture", "describe a position", "make a careful guess", "give your interpretation", "describe an action"],
          items: [
            { left: "“This picture shows …”", answer: "introduce the picture" },
            { left: "“In the background …”", answer: "describe a position" },
            { left: "“They might be … / Perhaps …”", answer: "make a careful guess" },
            { left: "“I think the picture is about …”", answer: "give your interpretation" },
            { left: "“The girl is … -ing …”", answer: "describe an action" },
          ],
        },
        {
          type: "multiple-choice",
          kind: "Interaktiv · Quiz",
          title: "Choose the best speculation",
          intro: "Which sentence speculates politely, without sounding 100% certain?",
          questions: [
            { q: "You are not sure why the boy looks worried. Best sentence?", options: ["The boy is definitely failing school.", "The boy might be worried about a message.", "The boy is worried, that's a fact.", "The boy is never worried.", "The boy hates his phone."], correct: 1 },
            { q: "You want to guess the time of day. Best sentence?", options: ["It is exactly 6 p.m.", "It looks as if it is early evening.", "It is morning, I know it.", "The time is not important at all.", "There is no sky, so no time."], correct: 1 },
            { q: "You interpret the mood. Best sentence?", options: ["Nothing is happening here.", "The picture is just a picture.", "The scene seems calm and friendly.", "I refuse to guess the mood.", "The mood is a colour."], correct: 2 },
            { q: "You guess the relationship between two people. Best sentence?", options: ["They are strangers, obviously.", "They could be close friends, judging by their smiles.", "They are enemies, 100%.", "They have never met, that's certain.", "They are robots."], correct: 1 },
            { q: "You are unsure about the place. Best sentence?", options: ["This is Paris, no doubt.", "Perhaps the scene takes place in a school yard.", "I know exactly where this is.", "The place does not exist.", "There is no place in pictures."], correct: 1 },
          ],
        },
        {
          type: "written",
          kind: "Sprechen · E-Kurs",
          title: "Describe, speculate, interpret",
          intro: "Prepare a full talk about this picture: describe it, speculate about the people, and interpret its message. Then present it out loud. Use the questions as a guide.",
          image: `${PIC}/scene-3.jpg`,
          imageAlt: "Speaking picture 3",
          lines: [
            "What can you see (foreground, background, people)?",
            "Who might the people be and what could they be doing?",
            "How do they seem to feel? How can you tell?",
            "What do you think the picture is really about?",
          ],
          answer: true,
        },
      ],
    },

    /* ============ STEP 4 — Challenge ============ */
    {
      step: 4,
      subtitle: "Challenge · Your solo picture talk",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          type: "essay-editor",
          kind: "Kreativ · Challenge",
          title: "Your own picture talk",
          intro:
            "Prepare a full spoken description of this picture (about 70–110 words). Cover the whole picture, speculate about the people, and give your opinion. Write your script, tick the checklist, then present it out loud.",
          image: `${PIC}/scene-4.jpg`,
          imageAlt: "Speaking challenge picture",
          min: 70,
          max: 110,
          placeholder: "This is a picture of …",
          checklist: [
            "I introduced the picture in one sentence.",
            "I described the foreground and the background.",
            "I used position words (on the left, in the middle …).",
            "I speculated (might, could, perhaps, it looks as if …).",
            "I said what I think the picture is about.",
            "I practised saying it out loud.",
          ],
          help: "Tip: don't read word for word when you present — use your notes as a reminder.",
        },
      ],
    },
  ],
};
