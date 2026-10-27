// Original list-recall prompts checked against the October 1, 2026 criminal
// rules and the 2026 Florida Statutes. Course checklists retain their scope;
// current-rule qualifications appear with the answers, rather than as clues.
const criminalRulesUrl =
  "https://www-media.floridabar.org/uploads/2026/10/2027_04-Oct-Criminal-Procedure-Rules-10-1-2026.pdf";

function answer(id, answerText, acceptedAnswers = [], explanation) {
  return {
    id: `fl-lists-${id}`,
    answer: answerText,
    acceptedAnswers,
    ...(explanation ? { explanation } : {}),
  };
}

function list({ id, subjectId, title, prompt, sourceUrl, sourceLabel,
  courseSources, answers, listExplanation }) {
  return {
    id: `fl-lists-${id}`,
    subjectId,
    type: "sporcle-grid",
    recallMode: "list",
    answerMatching: "column",
    title,
    prompt,
    sourceUrl,
    sourceLabel,
    courseSources,
    listExplanation,
    columns: [{ id: `fl-lists-${id}-items`, title: "Recall the list", answers }],
  };
}

const warrantCourseSources = [
  "FL.Flowers.CriminalProcedure.pdf — PDF p. 2, Chapter 1.B.2 (Form).",
  "Speechify/FL.Flowers.CriminalProcedure.Speechify.txt — Chapter 1, Arrest Warrants, Form (six completed course items).",
];

const warrantCourseContents = list({
  id: "arrest-warrant-course-contents",
  subjectId: "florida-criminal-procedure",
  title: "Arrest Warrant: Six Course Contents",
  prompt: "Recall the six contents in the Flowers course checklist, in any order. This course checklist is not an exhaustive statement of Rule 3.121(a).",
  sourceUrl: criminalRulesUrl,
  sourceLabel: "Fla. R. Crim. P. 3.121(a) — current-rule comparison (October 1, 2026)",
  courseSources: warrantCourseSources,
  answers: [
    answer("warrant-course-defendant-name", "Name of the defendant, if known", [
      "name of defendant", "defendant name", "defendants name", "name of the defendant",
      "name of defendant if known", "defendant identification", "name or description",
    ], "The course adds a photograph if available or a good description. The current rule requires reasonably certain identification if the name is unknown and a photograph if reasonably available."),
    answer("warrant-course-offense", "Nature of the offense", [
      "offense", "nature of offense", "offense charged", "description of offense",
    ]),
    answer("warrant-course-date", "Date the warrant is issued", [
      "date of issuance", "issuance date", "date issued", "date of issue", "warrant date",
    ]),
    answer("warrant-course-county", "County where it is issued", [
      "county of issuance", "county issued", "issuing county", "county where issued",
    ]),
    answer("warrant-course-bail", "Amount of bail", [
      "bail amount", "amount of bond", "bond amount", "bail",
    ], "Rule 3.121(a)(7) applies when a right to bail exists and calls for bail or other release conditions, plus a return date."),
    answer("warrant-course-signature", "Signature of the judge", [
      "judge signature", "judges signature", "signature of judge", "signed by the judge",
      "signed by judge", "judicial signature",
    ]),
  ],
  listExplanation: "These six course items are a memory checklist. The companion seven-group Rule 3.121(a) drill also covers the written State-of-Florida form and arrest-and-bring command; it groups date with county and includes identification, judicial-signature, and release qualifications. Completing this checklist does not establish compliance with the entire rule.",
});

const warrantRuleRequirements = list({
  id: "arrest-warrant-rule-requirements",
  subjectId: "florida-criminal-procedure",
  title: "Arrest Warrant: Seven Rule Requirements",
  prompt: "Recall all seven numbered requirement groups in Rule 3.121(a), in any order. Keep alternatives and conditional requirements within their group.",
  sourceUrl: criminalRulesUrl,
  sourceLabel: "Fla. R. Crim. P. 3.121(a)(1)–(7) — October 1, 2026 compilation, p. 43",
  courseSources: [
    ...warrantCourseSources,
    "Current-rule companion: expands the six-item course checklist to all seven numbered groups in Rule 3.121(a).",
  ],
  answers: [
    answer("warrant-rule-writing-state", "Written and in the name of the State of Florida", [
      "writing and state of florida", "in writing and in the name of the state of florida",
      "written in the name of the state of florida", "written state of florida warrant",
    ]),
    answer("warrant-rule-offense", "Substantially describe the nature of the offense", [
      "nature of the offense", "nature of offense", "substantially state the offense",
      "describe the offense", "offense description",
    ]),
    answer("warrant-rule-arrest-command", "Command arrest and appearance before a judge", [
      "arrest and bring before a judge", "command arrest and bring before a judge",
      "arrest and bring before judge", "arrest and appearance before judge",
      "arrest and presentment", "arrest command",
    ], "The command concerns the person against whom the complaint was made."),
    answer("warrant-rule-identification", "Name, or reasonably certain identification if unknown; photograph if reasonably available", [
      "defendant identification", "name or description", "name or identifying description",
      "name or description and photograph", "name and photograph if available",
    ]),
    answer("warrant-rule-date-county", "Date issued and county of issuance", [
      "date and county", "date and county of issuance", "issuance date and county",
      "county and date", "date issued and county issued",
    ]),
    answer("warrant-rule-judicial-signature", "Judge's signature and office title, including a qualified electronic signature", [
      "judge signature and title", "judges signature and title", "signature and title of judge",
      "judicial signature and title", "judge signature", "judges signature",
    ], "Electronic signing requires the affiant's signature, a lawfully administered oath or affirmation, and reliable electronic means if submitted electronically."),
    answer("warrant-rule-bail-return", "If a right to bail exists: bail or other release conditions, and a return date", [
      "bail or conditions and return date", "bail or release conditions and return date",
      "bail and return date", "release conditions and return date",
      "bail or other conditions of release and return date",
    ]),
  ],
  listExplanation: "These are seven cumulative rule groups; alternatives stay within their group. The six-item course checklist separates date from county and omits two formal groups. Bail or other release conditions and the return date are required for offenses carrying a right to bail.",
});

const negotiabilityRequirements = list({
  id: "negotiable-instrument-requirements",
  subjectId: "ucc-3",
  title: "Negotiable Instrument: Six Requirements",
  prompt: "Recall six grouped general negotiability requirements for ordinary non-check notes and drafts under Florida Article 3, in any order. Statutory qualifications appear with the completed list.",
  sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/673.1041",
  sourceLabel: "Fla. Stat. §§ 673.1041(1), 673.1031(1)(f), (i) — 2026",
  courseSources: [
    "UCC3 Commercial Paper Slides.pdf — PDF p. 7, Negotiability Defined; pp. 8–9, Unconditional and Fixed Amount of Money.",
    "Overview Commercial Paper Outline.docx — Negotiability of Instrument (signed writing).",
    "Current definitions of written, signed promises and orders: https://m.flsenate.gov/Statutes/673.1031 .",
  ],
  answers: [
    answer("negotiability-unconditional", "Unconditional", [
      "unconditional promise or order", "unconditional promise", "unconditional order",
      "unconditional payment obligation",
    ]),
    answer("negotiability-signed-writing", "Written promise or order to pay, signed by its maker or drawer", [
      "signed promise or order to pay", "signed promise or order", "signed writing",
      "written and signed promise or order", "written signed promise or order to pay",
      "promise or order to pay",
    ]),
    answer("negotiability-fixed-money", "A fixed amount of money, with or without stated interest or charges", [
      "fixed amount of money", "fixed sum of money", "fixed principal amount",
      "fixed amount", "fixed monetary amount",
    ]),
    answer("negotiability-order-bearer", "Payable to order or bearer when issued or first held", [
      "payable to order or bearer", "payable to bearer or order", "order or bearer",
      "bearer or order", "order or bearer paper",
    ]),
    answer("negotiability-time", "Payable on demand or at a definite time", [
      "on demand or at a definite time", "demand or definite time",
      "payable on demand or definite time", "definite time or demand",
    ]),
    answer("negotiability-no-extra-undertaking", "No additional undertaking or instruction except those authorized by statute", [
      "no unauthorized undertakings", "no unauthorized undertaking or instruction",
      "no other undertaking or instruction", "no additional undertaking",
      "no unauthorized undertakings or instructions",
    ], "Section 673.1041(1)(c) permits collateral protection, confession of judgment or collateral realization, waivers of an obligor's legal protections, governing-law terms, and specified-forum dispute terms."),
  ],
  listExplanation: "The six groups are cumulative; promise OR order, order OR bearer, and demand OR definite time are alternatives within groups. A qualifying check can lack order/bearer wording. A conspicuous nonnegotiability statement can exclude a non-check; a Florida state warrant is excluded. The writing and signature requirements come from the definitions of promise and order.",
});

const transferWarranties = list({
  id: "transfer-warranties",
  subjectId: "ucc-3",
  title: "Transfer Warranties: Five Promises",
  prompt: "Recall all five Florida Article 3 transfer warranties made when an instrument is transferred for consideration, in any order.",
  sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/673.4161",
  sourceLabel: "Fla. Stat. § 673.4161(1)(a)–(e) — 2026",
  courseSources: [
    "Overview Commercial Paper Outline.docx — Transfer Warranty Liability (five-item checklist).",
    "Current-rule refinements: authentic AND authorized signatures; claims in recoupment; insolvency proceedings concern the maker or acceptor, or the drawer of an unaccepted draft.",
  ],
  answers: [
    answer("transfer-entitled-enforce", "Transferor is entitled to enforce the instrument", [
      "entitled to enforce", "right to enforce", "transferor entitled to enforce",
      "person entitled to enforce", "i am entitled to enforce",
    ]),
    answer("transfer-signatures", "All signatures are authentic and authorized", [
      "authentic and authorized signatures", "signatures authentic and authorized",
      "genuine and authorized signatures", "signatures are genuine and authorized",
      "valid signatures", "signature authenticity and authorization",
    ]),
    answer("transfer-no-alteration", "The instrument has not been altered", [
      "no alteration", "no alterations", "not altered", "unaltered instrument",
      "no material alteration", "no material alterations",
    ]),
    answer("transfer-no-defenses-recoupment", "No party has a defense or recoupment claim assertable against the transferor", [
      "no defenses or claims in recoupment", "no defenses or recoupment claims",
      "no defense or recoupment against transferor", "no defenses against the transferor",
      "no defense is good against the transferor",
    ]),
    answer("transfer-no-known-insolvency", "No knowledge of insolvency proceedings against maker or acceptor, or drawer of an unaccepted draft", [
      "no knowledge of insolvency proceedings", "no known insolvency proceedings",
      "no knowledge of bankruptcy proceedings", "no insolvency knowledge",
    ]),
  ],
  listExplanation: "All five warranties run to the transferee; an indorsement extends them to subsequent transferees. The last warranty concerns knowledge of commenced insolvency proceedings, not a promise of solvency. The signatures warranty requires both authenticity and authorization.",
});

const attachmentRequirements = list({
  id: "attachment-requirements",
  subjectId: "ucc-9-secured-transactions",
  title: "Attachment: Three Requirement Groups",
  prompt: "Recall the three cumulative general attachment requirement groups under section 679.2031(2), in any order. Keep alternative ways of satisfying a group together.",
  sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/679.2031",
  sourceLabel: "Fla. Stat. § 679.2031(1)–(2) — 2026",
  courseSources: [
    "UCC9 Secured Transaction Slides.pdf — PDF p. 8, Attachment: Rights Against the Debtor.",
    "Current statute expands the course's signed-agreement-or-possession shorthand to five formality routes under § 679.2031(2)(c).",
    "Signing may be electronic: Fla. Stat. § 671.201(42), https://flsenate.gov/Laws/Statutes/2026/Chapter671/All .",
  ],
  answers: [
    answer("attachment-value", "Value has been given", [
      "value", "value given", "for value", "creditor gives value", "value has been provided",
    ]),
    answer("attachment-debtor-rights", "Debtor has rights in the collateral or power to transfer rights to a secured party", [
      "debtor rights in collateral", "debtor has rights in the collateral",
      "debtor has rights or power to transfer", "rights in collateral or power to transfer",
      "rights or power to transfer rights in collateral",
    ]),
    answer("attachment-agreement-formality", "One statutory security-agreement formality: signed description OR a qualifying possession, delivery, control, or chattel-paper route", [
      "security agreement formalities", "security agreement formality", "security agreement",
      "signed security agreement or possession or delivery or control",
      "signed agreement or possession or delivery or control",
      "authenticated security agreement", "signed security agreement",
    ], "Alternatives: debtor-signed agreement describing collateral (and land for timber to be cut); qualifying secured-party possession of collateral other than a certificated security; delivery of a registered certificated security; statutory control of eligible collateral; or possession AND control of chattel paper. The latter four require the debtor's security agreement. Eligible control collateral includes controllable accounts, controllable electronic records, controllable payment intangibles, deposit accounts, electronic documents, electronic money, investment property, and letter-of-credit rights."),
  ],
  listExplanation: "All three groups are required under the general rule, subject to § 679.2031(3)–(10). The third group has alternatives, not five cumulative requirements. Attachment occurs when the interest becomes enforceable unless expressly postponed. Signing can be electronic. Filing a financing statement is not a general attachment requirement.",
});

export const overviewListsCommercialAndCriminalQuestions = [
  warrantCourseContents,
  warrantRuleRequirements,
  negotiabilityRequirements,
  transferWarranties,
  attachmentRequirements,
];
