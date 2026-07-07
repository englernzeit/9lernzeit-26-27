/**
 * Reading Reef (Australia) — competence page content.
 *
 * NOTE: all task texts, vocab words and step subtitles are DEMO copy
 * from the design handoff — replace with real lesson content.
 * Illustration slots (`art: null`) render striped placeholders until
 * watercolor artwork is supplied.
 */

export default {
  newWords: {
    subtitle: "Vocabulary warm-up",
    stampLabel: "REEF MAIL",
    words: [
      { en: "the reef", de: "das Riff", ex: "Fish live in the reef." },
      { en: "the coast", de: "die Küste", ex: "The reef lies off the coast." },
      { en: "the species", de: "die Art", ex: "Many species live here." },
      { en: "the shell", de: "die Muschel", ex: "She finds a shell on the beach." },
      { en: "the current", de: "die Strömung", ex: "The current is strong today." },
      { en: "the tide", de: "die Gezeiten", ex: "The tide comes in the evening." },
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
          kind: "Lesen · Text",
          title: "Meet the Reef",
          intro: "Read the short text.",
          lines: [
            "The Great Barrier Reef lies off the coast of Australia.",
            "It is so big that astronauts can see it from space.",
            "More than 1,500 kinds of fish live between its corals.",
          ],
          help: "Hilfe: the reef = das Riff · coral = die Koralle",
        },
        {
          kind: "Aufgabe · True / False",
          title: "Check the facts",
          intro: "Mark each sentence T (true) or F (false).",
          lines: [
            "The reef is near Australia.  —  T / F",
            "Only ten kinds of fish live there.  —  T / F",
            "You can see the reef from space.  —  T / F",
          ],
          help: "Hilfe: true = wahr · false = falsch",
        },
        {
          kind: "Wörter · Vocabulary",
          title: "Word beach",
          intro: "Match English and German.",
          lines: [
            "the coast  —  die Küste",
            "space  —  der Weltraum",
            "kinds of  —  Arten von",
          ],
          help: "Hilfe: Verbinde die Paare mit einem Stift.",
        },
        {
          kind: "Logbuch · Writing",
          title: "Your logbook",
          intro: "What would you like to see at the reef? Write one sentence.",
          lines: [
            "I would like to see . . . . . . . . . . . . . . . . . . . . . . . .",
            "because . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .",
          ],
          help: "Hilfe: I would like to see … = Ich würde gern … sehen",
        },
        {
          kind: "Bilder · Pictures",
          title: "Picture hunt",
          intro: "Match the words to the pictures.",
          lines: [
            "the kangaroo  —  Bild __",
            "the lighthouse  —  Bild __",
            "the surfboard  —  Bild __",
          ],
          help: "Hilfe: das Bild = the picture",
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
          kind: "Lesen · Text",
          title: "Life in the lagoon",
          intro: "Read the text carefully.",
          lines: [
            "Turtles come to the lagoon in summer.",
            "They lay their eggs in the warm sand.",
            "At night the small turtles run to the sea.",
          ],
          help: "Hilfe: the turtle = die Schildkröte",
        },
        {
          kind: "Aufgabe · Fragen",
          title: "Answer the questions",
          intro: "Write short answers.",
          lines: [
            "When do the turtles come?",
            "Where do they lay their eggs?",
            "What happens at night?",
          ],
          help: "Hilfe: Antworte in ganzen Sätzen.",
        },
        {
          kind: "Aufgabe · Reihenfolge",
          title: "Put it in order",
          intro: "Number the sentences 1–3.",
          lines: [
            "__ The small turtles run to the sea.",
            "__ Turtles come to the lagoon.",
            "__ They lay their eggs in the sand.",
          ],
          help: "Hilfe: die Reihenfolge = the order",
        },
        {
          kind: "Wörter · Suche",
          title: "Word diving",
          intro: "Find these words in the text and underline them.",
          lines: [
            "warm  ·  eggs  ·  night  ·  sea",
            "Write one sentence with each word.",
          ],
          help: "Hilfe: unterstreichen = to underline",
        },
        {
          kind: "Schreiben · Writing",
          title: "Postcard home",
          intro: "Write two sentences about the lagoon.",
          lines: [
            "Dear . . . . . . . . ,",
            "Today I saw . . . . . . . . . . . . . . . . . . . . . . .",
            "It was . . . . . . . . . . . . . . . . . . . . . . . . . . .",
          ],
          help: "Hilfe: Ich habe … gesehen = I saw …",
        },
      ],
    },
    {
      step: 3,
      subtitle: "E-Kurs",
      accent: "slate",
      layout: "spread",
      cards: [
        {
          kind: "Lesen · Text",
          title: "Guardians of the Reef",
          intro: "Read the text on your worksheet.",
          lines: [
            "Scientists watch the reef from boats and from space.",
            "Warm water can make the corals turn white.",
            "Divers plant young corals to help the reef grow.",
          ],
          help: "Hilfe: the scientist = der Wissenschaftler",
        },
        {
          kind: "Aufgabe · Fragen",
          title: "Think and answer",
          intro: "Answer in your own words.",
          lines: [
            "Why do scientists watch the reef?",
            "What happens when the water gets warm?",
            "How do divers help the reef?",
          ],
          help: "Hilfe: mit eigenen Worten = in your own words",
        },
        {
          kind: "Aufgabe · Detektiv",
          title: "Text detective",
          intro: "Find the sentence in the text that proves it.",
          lines: [
            "People can help the reef.  →  line __",
            "The reef is in danger.  →  line __",
          ],
          help: "Hilfe: beweisen = to prove",
        },
        {
          kind: "Wörter · Synonyme",
          title: "Say it another way",
          intro: "Find a word in the text that means the same.",
          lines: [
            "to observe  =  . . . . . . . . .",
            "young  =  . . . . . . . . .",
            "to assist  =  . . . . . . . . .",
          ],
          help: "Hilfe: das Synonym = a word with the same meaning",
        },
        {
          kind: "Schreiben · Writing",
          title: "Reef report",
          intro:
            "Write a short paragraph (3–4 sentences): How can we protect the reef?",
          lines: [
            "We can protect the reef by . . . . . . . . . . . . . .",
            ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .",
          ],
          help: "Hilfe: schützen = to protect",
        },
      ],
    },
    {
      step: 4,
      subtitle: "Check-out",
      accent: "ochre",
      layout: "single",
      cards: [
        {
          kind: "Check-out · Selbstcheck",
          title: "My reef logbook",
          intro: "Look back at your journey. Tick what you can do now.",
          checklist: true,
          lines: [
            "I can read a short text in English.",
            "I can answer questions about a text.",
            "I can use five new words about the reef.",
          ],
          help: "Hilfe: Ich kann … = I can …",
        },
      ],
    },
  ],
};
