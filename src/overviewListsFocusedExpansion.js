// Two bounded additions to the Overview list collection. Official law and the
// cited course pages were checked October 24, 2026; existing drills stay intact.
const criminalRulesUrl =
  "https://www-media.floridabar.org/uploads/2026/10/2027_04-Oct-Criminal-Procedure-Rules-10-1-2026.pdf";

function item(listId, key, answer, acceptedAnswers, explanation) {
  return {
    id: `fl-lists-${listId}-${key}`,
    answer,
    acceptedAnswers,
    ...(explanation ? { explanation } : {}),
  };
}

const firstAppearanceAdvice = {
  id: "fl-lists-first-appearance-advice",
  subjectId: "florida-criminal-procedure",
  type: "sporcle-grid",
  recallMode: "list",
  answerMatching: "column",
  answerLayout: "stacked",
  title: "First Appearance: Four Advice Groups",
  prompt: "Recall the four advice groups under Florida Rule 3.130(b)(1), in any order. This list covers advice to the defendant, rather than every first-appearance procedure.",
  sourceUrl: criminalRulesUrl,
  sourceLabel: "Fla. R. Crim. P. 3.130(b)(1) — October 1, 2026 compilation, pp. 54–55",
  courseSources: [
    "Florida Criminal Procedure Slide Notes.pdf — PDF p. 4, Advice to Defendant at First Appearance.",
    "Official reference: Fla. R. Crim. P. 3.130(b)(1)(A)–(C), with the introductory charge-and-complaint requirement. Verified October 24, 2026.",
  ],
  listExplanation: "The four groups combine notice of the charge with the three rights in (A)–(C); conditions remain inside each group. If prerecorded video provides the rights advice, Rule 3.130(b)(2) also requires individual confirmation that the defendant could view and understands it. Hearing timing and other counsel procedures are separate from this advice list.",
  columns: [{
    id: "fl-lists-first-appearance-advice-items",
    title: "Recall the list",
    answers: [
      item("first-appearance-advice", "charge-complaint", "Notice of the charge and a copy of the complaint", [
        "charge and complaint", "charges and complaint", "charges and copy of complaint",
        "notice of charges", "advised of charges", "charges", "explain charges",
      ], "The judge must immediately inform the defendant of the charge, including any alleged probation or community-control violation, and supply a copy of the complaint."),
      item("first-appearance-advice", "silence-warning", "Right to remain silent; statements may be used against the defendant", [
        "right to remain silent", "remain silent", "right to silence", "silence",
        "silence and use warning", "not required to say anything",
        "anything said may be used against defendant",
      ]),
      item("first-appearance-advice", "counsel", "If unrepresented: right to counsel, appointed if unable to afford counsel", [
        "right to counsel", "counsel", "appointed counsel", "appointment of counsel",
        "right to an attorney", "right to a lawyer", "counsel if indigent",
      ], "The advice addresses an unrepresented defendant's right to counsel and appointment when financially unable to afford counsel."),
      item("first-appearance-advice", "communication", "Right to communicate with counsel, family, or friends; reasonable means if necessary", [
        "right to communicate", "communication rights", "right of communication",
        "communicate with counsel family or friends", "communicate with counsel family and friends",
        "communication with counsel family or friends", "communicate with family or friends",
      ]),
    ],
  }],
};

const financingStatementContents = {
  id: "fl-lists-financing-statement-contents",
  subjectId: "ucc-9-secured-transactions",
  type: "sporcle-grid",
  recallMode: "list",
  answerMatching: "column",
  answerLayout: "stacked",
  title: "Financing Statement: Three General Contents",
  prompt: "Recall the three general content requirements under Florida section 679.5021(1), in any order. Special real-property-related filings may require additional information.",
  sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/679.5021",
  sourceLabel: "Fla. Stat. § 679.5021(1)(a)–(c), subject to (2) — 2026",
  courseSources: [
    "UCC9 Secured Transaction Slides.pdf — PDF p. 12, Financing Statement (UCC1).",
    "Official reference: Fla. Stat. § 679.5021(1)–(2), 2026 Florida Statutes. Verified October 24, 2026.",
  ],
  listExplanation: "These three general contents are cumulative. Section 679.5021(2) adds requirements for as-extracted collateral, timber to be cut, and fixture filings, subject to its exception. Filing authorization and the proper filing office are separate issues. The slide's debtor-signature wording is not one of the three statutory contents in subsection (1).",
  columns: [{
    id: "fl-lists-financing-statement-contents-items",
    title: "Recall the list",
    answers: [
      item("financing-statement-contents", "debtor-name", "Name of the debtor", [
        "debtor name", "debtors name", "name of debtor", "debtor identification",
      ]),
      item("financing-statement-contents", "secured-party-name", "Name of the secured party or its representative", [
        "secured party name", "secured partys name", "name of secured party",
        "secured creditor name", "name of secured party or representative",
        "secured party or representative name", "representative of secured party name",
      ]),
      item("financing-statement-contents", "collateral-indication", "Indication of the collateral covered", [
        "collateral indication", "indicate collateral", "collateral description",
        "description of collateral", "collateral covered", "indication of collateral",
      ]),
    ],
  }],
};

export const overviewListsFocusedExpansionQuestions = [
  firstAppearanceAdvice,
  financingStatementContents,
];
