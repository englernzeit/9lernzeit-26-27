/**
 * Respect & Community (Unit 2) — "Monster's Lunch" word games.
 *
 * Steps 1–3 of every Unit 2 competence end with the hangman game; this
 * file holds all the word lists so they can be graded side by side:
 *   Step 1 (LE)        — easy words, simple English hint + German
 *   Step 2 (G-Kurs)    — the competence's key words, English definition
 *   Step 3 (E-Kurs)    — harder words, "a person who … / to … so that …"
 * Step 4 is a single creative challenge and has no game.
 *
 * The game only knows A–Z: every answer is ONE word, no spaces, hyphens
 * or apostrophes (a space would be a slot nobody can fill).
 */

const W =(word, hint) => ({ word, hint });

const GAMES = {
  vocabulary: {
    1: [
      W("VICTIM", "a person who gets hurt (das Opfer)"),
      W("BULLY", "a person who is mean again and again (der Mobber)"),
      W("TEASE", "to make fun of someone (hänseln)"),
      W("DELETE", "to take a message off your phone (löschen)"),
      W("SUPPORT", "to help someone (unterstützen)"),
      W("HORRIBLE", "very, very bad (schrecklich)"),
      W("PHONE", "you send messages with it (das Handy)"),
      W("FRIEND", "a person you like and trust (der Freund)"),
    ],
    2: [
      W("BYSTANDER", "a person who sees it happen and does nothing"),
      W("CYBERBULLYING", "bullying on the phone and on the internet"),
      W("CLASSMATE", "a student in your class"),
      W("AGREEMENT", "rules that everybody in the class says yes to"),
      W("CHAT", "a group conversation on your phone"),
      W("SCREENSHOT", "a picture of what is on your screen"),
      W("BUDDY", "a student who looks after a new student"),
      W("MEAN", "not kind at all"),
    ],
    3: [
      W("INTERVENE", "to step in so that something bad stops"),
      W("WITNESS", "a person who sees something happen"),
      W("HUMILIATE", "to make someone feel stupid in front of others"),
      W("EXCLUDE", "to leave someone out on purpose"),
      W("REPORT", "to tell a teacher so that they can do something"),
      W("ANONYMOUS", "nobody knows who wrote it"),
      W("RESPECT", "treating others the way you want to be treated"),
      W("HARMFUL", "something that hurts or does damage"),
    ],
  },

  reading: {
    1: [
      W("LUNCH", "the meal in the middle of the day (das Mittagessen)"),
      W("TABLE", "you sit at it to eat (der Tisch)"),
      W("CANTEEN", "where students eat at school (die Mensa)"),
      W("CARD", "a small piece of coloured paper (die Karte)"),
      W("SEAT", "a place to sit (der Sitzplatz)"),
      W("EQUAL", "the same for everybody (gleichberechtigt)"),
      W("ORIGIN", "where you come from (die Herkunft)"),
      W("VOTE", "to say yes or no to an idea (abstimmen)"),
    ],
    2: [
      W("CAMPAIGN", "a plan to change something, with posters and actions"),
      W("PREJUDICE", "an opinion about people before you know them"),
      W("SOCIETY", "all the people who live together in a country"),
      W("COUNCIL", "a group of students who decide things for the school"),
      W("ARTICLE", "a text in a newspaper"),
      W("NEWSPAPER", "you read the news in it"),
      W("MATTER", "to be important"),
      W("GAMER", "a person who plays video games"),
    ],
    3: [
      W("DISCRIMINATION", "treating someone worse because of who they are"),
      W("STEREOTYPE", "a fixed idea about what a whole group of people is like"),
      W("INCLUSION", "making sure that everybody belongs"),
      W("ORGANISE", "to plan an event so that it really happens"),
      W("DIVERSE", "with many different kinds of people"),
      W("BELONG", "to feel at home in a group"),
      W("ISOLATED", "alone and cut off from the others"),
      W("CANCELLED", "when a plan will not happen after all"),
    ],
  },

  listening: {
    1: [
      W("RADIO", "you hear music and news on it; Fairfield has its own"),
      W("BUDDY", "a student who helps a new student (der Pate / die Patin)"),
      W("MESSAGE", "you send it on your phone (die Nachricht)"),
      W("FRIDAY", "the last school day of the week (Freitag)"),
      W("SHOW", "a programme on the radio (die Sendung)"),
      W("ALONE", "with nobody else (allein)"),
      W("ROOM", "a part of a building, like B14 (der Raum)"),
      W("LISTEN", "what you do with your ears (zuhören)"),
    ],
    2: [
      W("PRESENTER", "the person who leads a radio show"),
      W("KEYWORD", "the most important word in a question"),
      W("SOLUTION", "the answer to a problem"),
      W("SHOCKED", "very surprised in a bad way"),
      W("FRUSTRATING", "making you angry because it does not work"),
      W("REACTION", "what you do or say after something happens"),
      W("FRIGHTENED", "afraid"),
      W("SECONDS", "sixty of them make one minute"),
    ],
    3: [
      W("INTERVIEW", "a talk where one person asks and the other answers"),
      W("VOLUNTEER", "a person who helps without being paid"),
      W("PARTLY", "not completely — only in some ways"),
      W("PRETEND", "to act as if something is true when it is not"),
      W("BROADCAST", "to send out a programme on radio or TV"),
      W("ANNIVERSARY", "the day exactly one year after something started"),
      W("DETAIL", "a small fact, like a number or a name"),
      W("LEAST", "the smallest amount — the opposite of most"),
    ],
  },

  mediation: {
    1: [
      W("PODCAST", "a show you can listen to on your phone (die Audio-Sendung)"),
      W("POSTER", "a big picture on the wall (das Plakat)"),
      W("SONG", "music with words (das Lied)"),
      W("MONEY", "you pay with it (das Geld)"),
      W("EMAIL", "a message you send on the computer (die E-Mail)"),
      W("MARCH", "the third month of the year (März)"),
      W("BROTHER", "a boy in your family (der Bruder)"),
      W("SCHOOL", "you learn there every day (die Schule)"),
    ],
    2: [
      W("COMPETITION", "a contest where everybody tries to win"),
      W("RACISM", "treating people badly because of their skin colour or origin"),
      W("EXPLAIN", "to make something clear to someone"),
      W("JOURNALIST", "a person who writes for a newspaper"),
      W("WINNER", "the person or class that comes first"),
      W("PRIMARY", "a ___ school is for children from six to ten"),
      W("LIBRARY", "a room full of books"),
      W("EXHIBITION", "a show of art or work for people to look at"),
    ],
    3: [
      W("MEDIATE", "to pass on what someone said into another language"),
      W("ILLUSTRATE", "to show an idea with an example"),
      W("SUMMARY", "a short text with only the main points"),
      W("ENTRY", "one word and its meaning in a dictionary"),
      W("FURTHER", "more, extra — one ___ detail"),
      W("EFFORT", "hard work so that something is done well"),
      W("INTERPRETER", "a person who translates spoken words"),
      W("RELEVANT", "important for the question that was asked"),
    ],
  },

  writing: {
    1: [
      W("BLOG", "a website where people write posts (das Online-Tagebuch)"),
      W("COMMENT", "your opinion under a post (der Kommentar)"),
      W("OPINION", "what you think (die Meinung)"),
      W("HONEST", "telling the truth (ehrlich)"),
      W("CLASSMATE", "a student in your class (der Mitschüler)"),
      W("EXAMPLE", "for ___ = zum Beispiel (das Beispiel)"),
      W("REASON", "why you think something (der Grund)"),
      W("PROJECT", "a piece of work a class does together (das Projekt)"),
    ],
    2: [
      W("ARGUMENT", "a reason for or against something"),
      W("INFLUENCE", "the power to change what others think"),
      W("PEER", "someone of your own age"),
      W("EMBARRASSED", "feeling silly in front of other people"),
      W("ASHAMED", "feeling bad about something you did"),
      W("FIRSTLY", "the linking word for your first reason"),
      W("DISAGREE", "to have a different opinion"),
      W("LESSON", "school time with a teacher, 45 minutes long"),
    ],
    3: [
      W("PERSUADE", "to make someone agree with you"),
      W("CONCLUSION", "the last part of a text, where you sum up"),
      W("CONVINCING", "so good that people believe it"),
      W("PARAGRAPH", "a group of sentences about one idea"),
      W("POLITELY", "in a friendly and respectful way"),
      W("PRESSURE", "peer ___: the feeling that you must do what the group does"),
      W("STRUCTURE", "how a text is ordered: beginning, middle, end"),
      W("CONCERN", "“That does not ___ me” = it is not my business"),
    ],
  },

  speaking: {
    1: [
      W("TALK", "to speak with someone (sprechen)"),
      W("SMILE", "what your face does when you are friendly (lächeln)"),
      W("QUESTION", "you ask it (die Frage)"),
      W("ANSWER", "you give it after a question (die Antwort)"),
      W("AGREE", "to say: yes, I think so too (zustimmen)"),
      W("IDEA", "something you think of (die Idee)"),
      W("QUEUE", "people waiting in a line (die Warteschlange)"),
      W("HANDS", "you shake them to say hello (die Hände)"),
    ],
    2: [
      W("CONVERSATION", "a talk between two or more people"),
      W("SUGGEST", "to say an idea for others to think about"),
      W("SUCCESSFUL", "when something works out well"),
      W("REACT", "to show that you heard what someone said"),
      W("POLITE", "friendly and with good manners"),
      W("RECORD", "to save your voice on your phone"),
      W("PAUSE", "a short stop when you are talking"),
      W("TOPIC", "what a talk or a text is about"),
    ],
    3: [
      W("CONVINCE", "to make someone believe that you are right"),
      W("COMPROMISE", "an agreement where both sides give a little"),
      W("PITCH", "a short talk to sell your idea"),
      W("FLUENT", "speaking easily, without long stops"),
      W("INTERRUPT", "to start talking while someone else is still speaking"),
      W("NEGOTIATE", "to talk until both sides agree"),
      W("ELABORATE", "to say more about an idea, with details"),
      W("RESPOND", "to answer"),
    ],
  },

  grammar: {
    1: [
      W("SAID", "the past of say (sagte)"),
      W("TOLD", "the past of tell (erzählte)"),
      W("ASKED", "the past of ask (fragte)"),
      W("WAS", "the past of is (war)"),
      W("WERE", "the past of are (waren)"),
      W("COULD", "can goes one step back (konnte)"),
      W("WOULD", "will goes one step back (würde)"),
      W("HAD", "the past of have (hatte)"),
    ],
    2: [
      W("WHETHER", "another word for if in a reported question"),
      W("REPORT", "to tell someone what another person said"),
      W("BACKSHIFT", "the verb goes one step back"),
      W("QUESTION", "a sentence that asks something"),
      W("STATEMENT", "a sentence that says something"),
      W("PRONOUN", "a word like I, you, he or she"),
      W("YESTERDAY", "in reported speech it becomes “the day before”"),
      W("TOMORROW", "in reported speech it becomes “the next day”"),
    ],
    3: [
      W("EXPLAINED", "reporting verb: she said how something works"),
      W("PROMISED", "reporting verb: she said she would surely do it"),
      W("ADMITTED", "reporting verb: she said something she did not like to say"),
      W("WARNED", "reporting verb: she told us about a danger"),
      W("ADVISED", "reporting verb: she told us what she thought was best"),
      W("DENIED", "reporting verb: she said that it was not true"),
      W("COMPLAINED", "reporting verb: she said she was unhappy about something"),
      W("INSISTED", "reporting verb: she said it again and would not change her mind"),
    ],
  },

  revision: {
    1: [
      W("TEST", "you write it at the end of the unit (die Klassenarbeit)"),
      W("REVISE", "to learn again before a test (wiederholen)"),
      W("LEARN", "to get new things into your head (lernen)"),
      W("CHECK", "to look again to see if it is right (prüfen)"),
      W("MISTAKE", "something that is wrong (der Fehler)"),
      W("SHEET", "a piece of paper with tasks (das Arbeitsblatt)"),
      W("READY", "prepared, all done (bereit)"),
      W("EVENING", "the time after school before night (der Abend)"),
    ],
    2: [
      W("DEAL", "___ with a problem = take care of it"),
      W("STICK", "___ with someone = stay with them"),
      W("SUFFER", "___ from = leiden unter"),
      W("BREAK", "___ down = stop working"),
      W("TURN", "___ up = arrive, appear"),
      W("BOARD", "___ up windows = close them with wood"),
      W("EYE", "keep an ___ on = watch carefully"),
      W("COMFORTABLE", "feel ___ with = relaxed and happy"),
    ],
    3: [
      W("PARTICIPLE", "a verb form like walking or written"),
      W("CLAUSE", "a part of a sentence with its own verb"),
      W("PREPOSITION", "a small word like with, on or from"),
      W("PHRASAL", "a ___ verb is a verb plus a small word, like turn up"),
      W("PARAPHRASE", "to say the same meaning in other words"),
      W("EVIDENCE", "proof from the text, with the line numbers"),
      W("STRATEGY", "a plan for how to do something well"),
      W("WHILE", "linking word: at the same time as"),
    ],
  },
};

/** The game card for one step of one competence. */
export function gameCard(sectionId, step) {
  return {
    type: "game",
    game: "monster-hangman",
    kind: "Spiel",
    title: "Monster's Lunch", // the game card renders only the game itself
    words: GAMES[sectionId][step],
  };
}

/**
 * Append the step's word game to Steps 1–3 of a competence page.
 * Step 4 stays a single creative challenge — no game there.
 */
export function withGames(sectionId, content) {
  return {
    ...content,
    steps: content.steps.map((s) =>
      s.step === 4 ? s : { ...s, cards: [...s.cards, gameCard(sectionId, s.step)] }),
  };
}
