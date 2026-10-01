function lines(id, title, phrases) {
  return {
    id,
    title,
    answers: phrases.map((phrase, index) => ({
      id: `${id}-${index + 1}`,
      indicator: String(index + 1),
      answer: phrase,
    })),
  };
}

export const trialAdvocacyLitanyWordsSubject = {
  id: "litanies-words",
  title: "Litanies (words)",
  questions: [
    {
      id: "trial-litanies-words-admitting-evidence",
      type: "sporcle-grid",
      title: "Admitting Evidence",
      prompt: "Recite each line in order. Keep BLANK as the placeholder when typing your answer.",
      columns: [
        lines("trial-litany-words-admitting", "Admitting Evidence", [
          "Showing opposing counsel what has been pre-marked for identification as Exhibit 1.",
          "Your honor, would you like a courtesy copy?",
          "Permission to approach the witness with the same?",
          "Do you recognize the BLANK?",
          "What is it?",
          "How do you recognize BLANK?",
          "Does the BLANK fairly and accurately represent the BLANK?",
          "State offers Exhibit 1 into evidence.",
          "Your honor, permission to publish the same to the jury?",
        ]),
      ],
    },
    {
      id: "trial-litanies-words-refreshing-recollection",
      type: "sporcle-grid",
      title: "Refreshing Recollection",
      prompt: "Recite each line in order. Keep BLANK as the placeholder when typing your answer.",
      columns: [
        lines("trial-litany-words-refreshing", "Refreshing Recollection", [
          "Do you not remember BLANK?",
          "Was there a time you did remember?",
          "Would it help you to remember if you looked at your BLANK?",
          "I'm showing opposing counsel BLANK.",
          "Your Honor, may I approach the witness in order to refresh their recollection?",
          "Directing your attention to page BLANK, line BLANK. Please read those lines to yourself and look up when you are done.",
          "Do you now remember?",
          "Let me ask that question again?",
        ]),
      ],
    },
    {
      id: "trial-litanies-words-impeachments",
      type: "sporcle-grid",
      title: "Impeachments (The Three C's)",
      prompt: "Recite the Confirm, Credit, and Confront lines in order. Keep BLANK as the placeholder when typing your answer.",
      columns: [
        lines("trial-litany-words-confirm", "Confirm", [
          "Is it your testimony that BLANK?",
        ]),
        lines("trial-litany-words-credit", "Credit", [
          "You BLANK in this case, correct?",
          "When you gave that BLANK it was under oath?",
          "An oath to tell the truth?",
          "The whole truth?",
          "The same oath you took today?",
          "Your BLANK was complete?",
          "Accurate?",
          "Thorough?",
          "In fact, you reviewed your BLANK after writing it, correct?",
          "And you signed the BLANK attesting to its accuracy?",
          "And its completeness?",
        ]),
        lines("trial-litany-words-confront", "Confront", [
          "Directing court and counsel's attention to page BLANK, line BLANK of witness's prior statement.",
          "Those were your words, correct?",
        ]),
      ],
    },
  ],
};
