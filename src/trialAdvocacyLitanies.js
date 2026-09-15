function answer(id, answerText, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer: answerText,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

const litanySource = "Trial Advocacy Textbook, Chapter IX: Litanies";
const directSource = "Trial Advocacy Direct Exam Bullet Points";

export const trialAdvocacyLitanyQuestions = [
  {
    id: "trial-litanies-exhibit-sequence",
    type: "sporcle-grid",
    title: "Admitting an Exhibit: Eight-Step Litany",
    prompt: "Recite the basic order for introducing an exhibit on direct examination.",
    courseSources: [litanySource],
    columns: [
      {
        id: "exhibit-sequence",
        title: "Eight Steps",
        mnemonic: "SMSAGFOP",
        answers: [
          answer("trial-litany-exhibit-set-up", "Set Up", ["setup"], "1"),
          answer("trial-litany-exhibit-mark", "Mark", ["mark the exhibit", "mark for identification"], "2"),
          answer("trial-litany-exhibit-show", "Show", ["show opposing counsel"], "3"),
          answer("trial-litany-exhibit-approach", "Approach", ["ask to approach"], "4"),
          answer("trial-litany-exhibit-give", "Give", ["give the exhibit to the witness"], "5"),
          answer("trial-litany-exhibit-foundation", "Ask the foundation questions", ["foundation questions", "lay foundation"], "6"),
          answer("trial-litany-exhibit-offer", "Offer", ["offer into evidence"], "7"),
          answer("trial-litany-exhibit-publish", "Publish", ["publish to the jury"], "8"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-exhibit-foundation",
    type: "sporcle-grid",
    title: "Exhibit Foundation Questions",
    prompt: "Fill the foundation question or courtroom form used to authenticate an exhibit.",
    courseSources: [litanySource],
    columns: [
      {
        id: "exhibit-foundation",
        title: "Foundation",
        answers: [
          answer("trial-litany-recognize", "Do you recognize it?", ["recognize it"], "Recognition"),
          answer("trial-litany-how-recognize", "How do you recognize it?", ["how do you recognize"], "Basis for recognition"),
          answer("trial-litany-what-is-it", "What is it?", ["what is this", "identify the exhibit"], "Identification"),
          answer("trial-litany-same-condition", "Same or substantially the same condition", ["same condition", "substantially the same condition"], "Document or physical evidence"),
          answer("trial-litany-fair-accurate", "Fair and accurate depiction", ["fair and accurate", "fair and accurate representation"], "Photo, screenshot, map, or diagram"),
          answer("trial-litany-direct-cross", "Open-ended on direct and leading on cross", ["open ended on direct leading on cross", "open questions direct leading questions cross"], "Form of foundation questions"),
          answer("trial-litany-pre-marked", "Exhibit for Identification", ["for identification", "marked for identification"], "Status before admission"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-refreshing-recollection",
    type: "sporcle-grid",
    title: "Refreshing Recollection Litany",
    prompt: "Recite the steps for refreshing a witness's memory. The witness must say they cannot remember, not give a wrong answer.",
    courseSources: [litanySource],
    columns: [
      {
        id: "refreshing-recollection",
        title: "Refresh the Memory",
        answers: [
          answer("trial-litany-cannot-remember", "Witness says I cannot remember or recall", ["i can't remember", "i can't recall", "cannot remember"], "Trigger"),
          answer("trial-litany-confirm-memory-gap", "Ask what fact the witness does not remember", ["confirm what they don't remember", "ask what they cannot recall"], "Clarify the gap"),
          answer("trial-litany-prior-memory", "Ask whether there was a time the witness did remember", ["was there a time you remembered", "you remembered before"], "Prior memory"),
          answer("trial-litany-aid-help", "Ask whether looking at an aid would help", ["would it help you remember", "ask if the document would help"], "Choose the aid"),
          answer("trial-litany-show-refresh", "Show opposing counsel the refreshing document", ["show opposing counsel the document", "show counsel the item"], "Disclosure"),
          answer("trial-litany-approach-refresh", "Ask permission to approach the witness", ["permission to approach", "may i approach"], "Court permission"),
          answer("trial-litany-direct-location", "Direct the witness to the page, line, or paragraph", ["direct attention to page and line", "tell witness where to look"], "Limit the review"),
          answer("trial-litany-read-silently", "Have the witness read silently and look up", ["read to yourself and look up", "read silently"], "Review"),
          answer("trial-litany-remember-now", "Ask whether the witness now remembers", ["do you now remember", "remember now"], "Confirm refresh"),
          answer("trial-litany-retrieve-reask", "Retrieve the document and re-ask the question", ["retrieve and reask", "ask the question again"], "Return to examination"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-impeachment-three-cs",
    type: "sporcle-grid",
    title: "Prior Inconsistent Statement: The Three Cs",
    prompt: "Recite the three-part impeachment litany and the key limits that keep it effective.",
    courseSources: [litanySource],
    columns: [
      {
        id: "three-cs",
        title: "The Three Cs",
        mnemonic: "CCC",
        answers: [
          answer("trial-litany-confirm", "Confirm", ["confirmation"], "Lock in the exact trial testimony"),
          answer("trial-litany-credit", "Credit", ["credibility foundation"], "Establish the prior statement was sworn, complete, accurate, and reviewed"),
          answer("trial-litany-confront", "Confront", ["confrontation"], "Read the contradictory passage and ask if those were the witness's words"),
        ],
      },
      {
        id: "impeachment-limits",
        title: "Limits and Finish",
        answers: [
          answer("trial-litany-own-statement", "Use the witness's own prior statement", ["own prior statement", "their own prior statement"], "Only proper source"),
          answer("trial-litany-material-change", "Impeach only a material, case-changing inconsistency", ["material inconsistency", "case changing inconsistency", "important inconsistency"], "Worth the courtroom time"),
          answer("trial-litany-no-lying-question", "Do not ask whether the witness was lying then or now", ["never ask were you lying then or now", "do not ask if they were lying"], "After the witness confirms the contradiction"),
          answer("trial-litany-close-change", "Close on the change in story", ["close on the inconsistency", "use the change in closing"], "Explain why credibility matters"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-omission-impeachment",
    type: "sporcle-grid",
    title: "Impeachment by Omission",
    prompt: "Use the Three Cs for a new fact first stated at trial, then identify the precise confrontation question.",
    courseSources: [litanySource],
    columns: [
      {
        id: "omission-three-cs",
        title: "Three Cs Applied",
        answers: [
          answer("trial-litany-omission-confirm", "Confirm the new testimony", ["confirm the new statement", "is it your testimony"], "1. Confirm"),
          answer("trial-litany-omission-credit", "Credit the complete and accurate prior statement", ["credit prior statement", "prior statement was complete and accurate"], "2. Credit"),
          answer("trial-litany-omission-confront", "Confront the witness with what the prior statement omitted", ["confront the omission", "show it was not in the statement"], "3. Confront"),
        ],
      },
      {
        id: "omission-confrontation",
        title: "Confrontation Language",
        answers: [
          answer("trial-litany-nowhere-said", "Nowhere in your prior statement did you say that", ["nowhere in your deposition did you say", "you never said that in your statement"], "Direct omission question"),
          answer("trial-litany-vital-fact", "Use only a vital, undisputed, case-changing fact", ["vital case changing undisputable fact", "only important case changing facts"], "When omission is appropriate"),
          answer("trial-litany-let-go", "Let minor or debatable differences go", ["let it go", "ignore minor differences", "do not impeach minor differences"], "Default judgment"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-courtroom-opening",
    type: "sporcle-grid",
    title: "Courtroom Introduction and Housekeeping Litany",
    prompt: "Fill the courtroom notice or preliminary matter that belongs at the start of a mock trial.",
    courseSources: [litanySource],
    columns: [
      {
        id: "courtroom-introduction",
        title: "Start of Trial",
        answers: [
          answer("trial-litany-good-morning", "Good morning, Your Honor", ["good afternoon your honor", "good evening your honor"], "Greeting"),
          answer("trial-litany-name-cocounsel", "State your name and co-counsel's name", ["names of counsel", "introduce counsel"], "Notice of appearance"),
          answer("trial-litany-represent-party", "Identify the party you represent", ["represent the state", "represent the defendant", "identify your party"], "Representation"),
          answer("trial-litany-approach-notice", "Ask permission to approach the bench and jurors with the notice", ["may i approach the bench and jurors", "approach with notice of appearance"], "Deliver the notice"),
          answer("trial-litany-rule-615", "Invoke Rule 615 to exclude witnesses", ["exclude witnesses", "rule 615"], "Witness sequestration"),
          answer("trial-litany-stand-position", "Ask to argue objections from counsel table", ["remain in position", "argue objections from counsel table"], "Bench approach"),
          answer("trial-litany-admitted-evidence", "Ask where admitted evidence should be kept", ["where should admitted evidence be kept", "clerk's table"], "Evidence location"),
          answer("trial-litany-ready-motions", "State that preliminary matters are complete and counsel is ready for substantive motions", ["ready for substantive motions", "preliminary matters are complete"], "Transition"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-direct-sequence",
    type: "sporcle-grid",
    title: "Direct-Exam Topic Litany",
    prompt: "Use the shorthand from your direct-exam notes to recall the topic sequence.",
    courseSources: [directSource],
    columns: [
      {
        id: "direct-topic-sequence",
        title: "Topic Order",
        mnemonic: "IDOFDSATL",
        answers: [
          answer("trial-direct-litany-intro", "Intro", ["introduction"], "1"),
          answer("trial-direct-litany-date", "Date", [], "2"),
          answer("trial-direct-litany-order", "Order", [], "3"),
          answer("trial-direct-litany-feeling", "Feeling", [], "4"),
          answer("trial-direct-litany-drive", "Drive", [], "5"),
          answer("trial-direct-litany-scratch", "Scratch", ["scratches"], "6"),
          answer("trial-direct-litany-arrive", "Arrive", ["arrival"], "7"),
          answer("trial-direct-litany-test", "Test", ["tests", "exercises"], "8"),
          answer("trial-direct-litany-learn", "Learn", ["learning"], "9"),
        ],
      },
    ],
  },
  {
    id: "trial-litanies-direct-follow-ups",
    type: "sporcle-grid",
    title: "Direct-Exam Testing and Learning Follow-Ups",
    prompt: "Recall the short follow-up prompts listed under Test and Learn in your direct-exam notes.",
    courseSources: [directSource],
    columns: [
      {
        id: "direct-follow-ups",
        title: "Follow-Up Prompts",
        answers: [
          answer("trial-direct-follow-when-learn", "When did you learn?", ["when did you learn"], "1"),
          answer("trial-direct-follow-react", "How did you react?", ["react", "how did you react"], "2"),
          answer("trial-direct-follow-test", "What did you test?", ["test", "what did you test"], "3"),
          answer("trial-direct-follow-legal-limit", "What is the legal limit?", ["legal limit"], "4"),
          answer("trial-direct-follow-bac", "What was the BAC?", ["bac", "blood alcohol concentration"], "5"),
          answer("trial-direct-follow-collision", "Do you remember the collision?", ["remember collision", "did you remember the collision"], "6"),
        ],
      },
    ],
  },
];
