function lines(id, title, phrases, direction) {
  return {
    id,
    title,
    answers: [
      ...(direction ? [{ id: `${id}-direction`, indicator: "When / how", answer: direction, quiz: false }] : []),
      ...phrases.map((phrase, index) => ({
        id: `${id}-${index + 1}`,
        indicator: String(index + 1),
        answer: phrase,
      })),
    ],
  };
}

const personalSource = "Trial Advocacy Litanies.docx (personal rehearsal script)";
const handout = (name, pages) => `ClassFiles/Litanies/${name}.pdf, ${pages}`;
const scriptPrompt = "Recite each spoken line in order. Type BLANK for the changing facts; capitalization and punctuation do not matter. Directions stay visible and do not count as blanks.";
const creditPhrases = [
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
];

export const trialAdvocacyLitanyWordsSubject = {
  id: "litanies-words",
  title: "Litanies (Courtroom Scripts)",
  questions: [
    {
      id: "trial-litanies-words-admitting-evidence",
      type: "sporcle-grid",
      title: "Admitting Evidence",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: scriptPrompt,
      courseSources: [personalSource, handout("Admitting Exhibits Litany", "pp. 1–4")],
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
        ], "Set up the exhibit first. This personal script assumes Exhibit 1 is pre-marked. After permission, hand it to the witness; wait for admission before requesting publication. The handout also covers marking and already-admitted exhibits."),
      ],
    },
    {
      id: "trial-litanies-words-refreshing-recollection",
      type: "sporcle-grid",
      title: "Refreshing Recollection",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: scriptPrompt,
      courseSources: [personalSource, handout("Refreshing Recollection Litany", "p. 1")],
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
        ], "Use when the witness cannot remember. Obtain the aid and show counsel before approaching. After the witness reads silently and remembers, ask permission to retrieve the aid before re-asking the original question. The spoken lines preserve the personal script."),
      ],
    },
    {
      id: "trial-litanies-words-impeachments",
      type: "sporcle-grid",
      title: "Impeachments (The Three C's)",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: `Confirm, Credit, Confront. ${scriptPrompt}`,
      courseSources: [personalSource, handout("Impeachment Litanies", "p. 1")],
      columns: [
        lines("trial-litany-words-confirm", "Confirm", [
          "Is it your testimony that BLANK?",
        ]),
        lines("trial-litany-words-credit", "Credit", creditPhrases),
        lines("trial-litany-words-confront", "Confront", [
          "Directing court and counsel's attention to page BLANK, line BLANK of witness's prior statement.",
          "Those were your words, correct?",
        ], "Read the inconsistent passage aloud between these lines. Once the witness confirms the words, stop and move on. If the witness asks to see the statement, use the separate request-to-see drill. Do not ask whether the witness was lying then or now."),
      ],
    },
    {
      id: "trial-litanies-words-refreshing-cross",
      type: "sporcle-grid",
      title: "Refreshing Recollection on Cross",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: scriptPrompt,
      courseSources: [handout("Refreshing Recollection Litany", "p. 1 (cross-examination sequence)")],
      columns: [
        lines("trial-litany-words-refreshing-cross-memory", "Establish the memory gap", [
          "You don’t remember BLANK?",
          "You remembered previously though, right?",
          "Looking at your prior BLANK would help you remember, correct?",
        ]),
        lines("trial-litany-words-refreshing-cross-review", "Show the aid and refresh", [
          "Showing opposing counsel BLANK.",
          "Your Honor, may I approach the witness with the same to refresh their recollection?",
          "Directing your attention to page BLANK, line BLANK of your BLANK. Read those lines to yourself and look up when you’re done.",
          "You remember now, right?",
        ], "Retrieve the aid from co-counsel first. Show counsel, wait for permission, then hand the aid to the witness for silent review."),
        lines("trial-litany-words-refreshing-cross-return", "Retrieve and re-ask", [
          "Your Honor, permission to approach and retrieve the document?",
          "Isn’t it true that BLANK?",
        ], "After permission, retrieve the aid before re-asking the original question. BLANK in the final line stands for the fact originally asked about."),
      ],
    },
    {
      id: "trial-litanies-words-impeachment-request-to-see",
      type: "sporcle-grid",
      title: "Impeachment: Witness Asks to See",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: `Use this branch after Confirm and Credit when the witness asks to see the prior statement. ${scriptPrompt}`,
      courseSources: [handout("Impeachment Litanies", "p. 1")],
      columns: [
        lines("trial-litany-words-impeachment-see", "Show and read the statement", [
          "Of course, Your Honor, may I approach the witness with a copy of their prior BLANK?",
          "Directing your attention to page BLANK, lines BLANK. Please read along to yourself as I read out loud.",
          "I read that correctly, right?",
        ], "Show opposing counsel the statement and wait for permission before approaching. After directing the witness to the passage, read the inconsistent statement aloud, then ask whether you read it correctly. After confirmation, request permission to retrieve the statement and move on."),
        lines("trial-litany-words-impeachment-excuses", "Only if the witness offers excuses", [
          "My question was simply whether I read your prior statement correctly, and I did, didn’t I?",
        ], "Use only if the witness offers excuses. Then stop, request permission to retrieve the statement, and move on. Do not ask whether the witness was lying then or now."),
      ],
    },
    {
      id: "trial-litanies-words-impeachment-omission",
      type: "sporcle-grid",
      title: "Impeachment by Omission",
      answerMatching: "active",
      answerLayout: "stacked",
      prompt: `Confirm, Credit, then confront an important fact omitted from the prior statement. Follow only the branch supported by the witness’s response. ${scriptPrompt}`,
      courseSources: [handout("Impeachment Litanies", "pp. 2–3")],
      columns: [
        lines("trial-litany-words-omission-confirm", "Confirm", [
          "Is it your testimony that BLANK?",
        ]),
        lines("trial-litany-words-omission-credit", "Credit", creditPhrases),
        lines("trial-litany-words-omission-confront", "Confront the omission", [
          "Isn’t it true that nowhere in your BLANK did you ever say BLANK?",
        ], "If the witness admits the omission, move on. The following branches apply only if the witness hedges, asks to see the statement, or says they were not asked."),
        lines("trial-litany-words-omission-review", "If the witness hedges or asks to see", [
          "Your Honor, permission to approach the witness with their BLANK?",
          "I’m handing you your prior statement and a highlighter. Please take a moment sir/ma’am to look through your deposition—it’s only BLANK pages and double spaced. And highlight where you said the words BLANK. And look up when you’re done.",
        ], "Show opposing counsel the statement. After permission, hand it to the witness with a highlighter. The handout’s review language assumes a deposition."),
        lines("trial-litany-words-omission-not-found", "If no words are found", [
          "You haven’t found it, have you?",
          "The witness has finished reading and has not highlighted anything, may I approach and retrieve?",
        ], "The first line is the handout’s follow-up after about 30 seconds. Request retrieval after the witness finishes reading without highlighting anything."),
        lines("trial-litany-words-omission-highlighted", "If different words are highlighted", [
          "You highlighted the words BLANK, but those are not the words BLANK, isn’t that true?",
        ], "Use only if the witness highlights different words. After addressing the mismatch, request permission to retrieve the statement and move on."),
        lines("trial-litany-words-omission-not-asked", "If the witness says they were not asked", [
          "Well you were asked at your deposition about BLANK?",
          "And at your deposition you did not offer those facts?",
          "The first time you offered them is today?",
          "In front of this jury?",
        ], "Use only when supported by the prior deposition. Then move on; address the changed story in closing."),
      ],
    },
  ],
};
