function answer(id, answerText, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer: answerText,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

const permittedTermsQuestion = {
  id: "ucc-3-no-unauthorized-undertakings",
  type: "sporcle-grid",
  title: "No Unauthorized Undertakings: What Is Permitted?",
  prompt: "Fill the five provisions an instrument may contain without losing negotiability. The first three are authorized undertakings; the last two are separately permitted terms.",
  sourceUrl:
    "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0673/Sections/0673.1041.html",
  sourceLabel: "Florida Statutes §§ 673.1041, 673.1081, and 673.1121",
  columns: [
    {
      id: "authorized-undertakings",
      title: "Authorized Undertakings",
      answers: [
        answer("ucc3-permitted-collateral", "Give, maintain, or protect collateral", [
          "to give maintain or protect collateral",
          "undertaking to give maintain or protect collateral",
          "maintain or protect collateral",
        ], "1"),
        answer("ucc3-permitted-confess-judgment", "Authorization to confess judgment", [
          "authorize confession of judgment",
          "authorization or power to confess judgment",
          "confess judgment or realize on or dispose of collateral",
        ], "2"),
        answer("ucc3-permitted-waiver", "Waiver of the benefit of law", [
          "waiver of benefit of law",
          "waive the benefit of law",
        ], "3"),
      ],
    },
    {
      id: "other-permitted-terms",
      title: "Other Permitted Terms",
      answers: [
        answer("ucc3-permitted-acceleration", "Acceleration clause", [
          "right of acceleration",
          "acceleration",
        ], "4"),
        answer("ucc3-permitted-interest", "Interest", [
          "with or without interest",
          "interest provision",
        ], "5"),
      ],
    },
  ],
};

const issueRoadmapQuestion = {
  id: "ucc-3-commercial-paper-issues",
  type: "sporcle-grid",
  title: "Commercial Paper: Five Issues",
  prompt: "Fill the five issues used to analyze a commercial-paper problem.",
  columns: [
    {
      id: "commercial-paper-roadmap",
      title: "Issue Roadmap",
      answers: [
        answer("ucc3-issue-negotiability", "Is it a negotiable instrument?", [
          "negotiability",
          "negotiable instrument",
        ], "1"),
        answer("ucc3-issue-negotiation", "How was it negotiated?", [
          "negotiation",
          "how it was transferred",
          "how is it transferred as cash",
        ], "2"),
        answer("ucc3-issue-holder", "Who is the holder or holder in due course?", [
          "holder or holder in due course",
          "holder or HDC",
          "who has it",
        ], "3"),
        answer("ucc3-issue-defenses", "What defenses apply?", [
          "defenses",
          "payment defenses",
        ], "4"),
        answer("ucc3-issue-liability", "Who else is liable?", [
          "liability",
          "who is liable",
        ], "5"),
      ],
    },
  ],
};

const instrumentsAndPartiesQuestion = {
  id: "ucc-3-instruments-and-parties",
  type: "sporcle-grid",
  title: "Commercial Paper: Instruments and Parties",
  prompt: "Use each description as the clue and identify the instrument or party.",
  columns: [
    {
      id: "instrument-types",
      title: "Two Instruments",
      answers: [
        answer("ucc3-instrument-note", "Note", [
          "promissory note",
        ], "Promise to pay"),
        answer("ucc3-instrument-draft", "Draft", [
          "check",
          "draft or check",
        ], "Order to pay"),
      ],
    },
    {
      id: "note-parties",
      title: "Parties to a Note",
      answers: [
        answer("ucc3-note-maker", "Maker", ["borrower"], "Promises to pay"),
        answer("ucc3-note-payee", "Payee", ["creditor"], "Receives payment"),
      ],
    },
    {
      id: "draft-parties",
      title: "Parties to a Draft",
      answers: [
        answer("ucc3-draft-drawer", "Drawer", [
          "check writer",
          "person who writes the check",
        ], "Orders payment from own account"),
        answer("ucc3-draft-payee", "Payee", [
          "check recipient",
          "person check is written to",
        ], "Receives payment"),
        answer("ucc3-draft-drawee", "Drawee", [
          "bank",
          "drawee bank",
        ], "Bank ordered to pay"),
      ],
    },
  ],
};

const negotiationQuestion = {
  id: "ucc-3-negotiation",
  type: "sporcle-grid",
  title: "Commercial Paper: Issuance and Negotiation",
  prompt: "Fill the transfer rules for issuance, order paper, bearer paper, and indorsements.",
  columns: [
    {
      id: "issuance-and-negotiation",
      title: "Transfer Rules",
      answers: [
        answer("ucc3-issuance", "Issuance", [
          "issue",
          "first transfer",
        ], "Maker or drawer's first transfer"),
        answer("ucc3-order-paper", "Indorsement plus transfer of possession", [
          "indorsement and possession",
          "endorsement and delivery",
          "indorsement and delivery",
        ], "Order paper"),
        answer("ucc3-bearer-paper", "Transfer of possession", [
          "possession",
          "delivery",
          "transfer possession",
        ], "Bearer paper"),
        answer("ucc3-indorsement", "Signing or marking with intent to sign", [
          "signature with intent to sign",
          "signing with intent",
        ], "Indorsement"),
      ],
    },
    {
      id: "indorsement-effects",
      title: "Indorsement Effects",
      answers: [
        answer("ucc3-blank-indorsement", "Blank indorsement converts the instrument to bearer paper", [
          "blank endorsement makes bearer paper",
          "blank indorsement makes bearer paper",
          "becomes bearer paper",
        ], "Blank"),
        answer("ucc3-special-indorsement", "Special indorsement names a new payee and remains order paper", [
          "special endorsement names new payee and remains order paper",
          "names new payee and stays order paper",
          "remains order paper",
        ], "Special"),
      ],
    },
  ],
};

const holderInDueCourseQuestion = {
  id: "ucc-3-holder-in-due-course",
  type: "sporcle-grid",
  title: "Commercial Paper: Holder in Due Course",
  prompt: "Fill the holder rules, HDC requirements, and protections.",
  columns: [
    {
      id: "holder-status",
      title: "Holder",
      answers: [
        answer("ucc3-holder-enforce", "A holder may enforce the instrument", [
          "holder can enforce",
          "may enforce instrument",
        ], "Power"),
        answer("ucc3-holder-acquisition", "The instrument is issued or negotiated to the holder", [
          "issued or negotiated to holder",
          "issuance or negotiation",
        ], "How acquired"),
        answer("ucc3-holder-thief", "A thief cannot become a holder", [
          "thief is not a holder",
          "thief cannot be holder",
        ], "Thief"),
      ],
    },
    {
      id: "hdc-requirements",
      title: "HDC Requirements",
      mnemonic: "VGW",
      answers: [
        answer("ucc3-hdc-value", "Value", [
          "for value",
          "give do or forgive",
        ], "1"),
        answer("ucc3-hdc-good-faith", "Good faith", [
          "honesty in fact and commercial standards of fair dealing",
          "honesty in fact",
        ], "2"),
        answer("ucc3-hdc-without-notice", "Without notice of claims or defenses", [
          "without notice",
          "no notice of claims or defenses",
        ], "3"),
      ],
    },
    {
      id: "hdc-protection",
      title: "HDC Protection",
      answers: [
        answer("ucc3-hdc-personal-defenses", "Takes free of personal defenses", [
          "free of personal defenses",
        ], "Personal defenses"),
        answer("ucc3-hdc-real-defenses", "Takes subject to real defenses", [
          "subject to real defenses",
          "real defenses defeat HDC",
        ], "Real defenses"),
        answer("ucc3-hdc-shelter-rule", "A transferee from an HDC receives the HDC's protection", [
          "shelter rule",
          "transferee takes HDC protection",
          "holder receives HDC protection even by gift",
        ], "Shelter rule"),
      ],
    },
  ],
};

const defensesQuestion = {
  id: "ucc-3-defenses",
  type: "sporcle-grid",
  title: "Commercial Paper: Personal and Real Defenses",
  prompt: "Fill the defenses and keep straight which ones defeat a holder in due course.",
  columns: [
    {
      id: "personal-defenses",
      title: "Personal Defenses: HDC Takes Free",
      answers: [
        answer("ucc3-defense-lack-consideration", "Lack of consideration", [
          "no consideration",
          "absence of consideration",
        ]),
        answer("ucc3-defense-failure-consideration", "Failure of consideration", [
          "failure of consideration defense",
        ], "Contract not fulfilled"),
        answer("ucc3-defense-breach-contract", "Breach of contract", [
          "contract breach",
          "breach",
        ]),
        answer("ucc3-defense-fraud-inducement", "Fraud in the inducement", [
          "fraudulent inducement",
          "normal fraud",
        ], "Knew what was signed; induced by lie"),
      ],
    },
    {
      id: "real-defenses",
      title: "Real Defenses: Defeat an HDC",
      answers: [
        answer("ucc3-defense-fraud-factum", "Fraud in the factum", [
          "fraud in factum",
          "fraud in the execution",
        ], "Did not know what was signed"),
        answer("ucc3-defense-forgery", "Forgery", ["forged signature"]),
        answer("ucc3-defense-alteration", "Alteration", ["material alteration"]),
        answer("ucc3-defense-infancy", "Infancy", ["minority"]),
        answer("ucc3-defense-incapacity", "Incapacity", ["lack of capacity"]),
        answer("ucc3-defense-illegality", "Illegality", ["illegal transaction"]),
        answer("ucc3-defense-duress", "Duress"),
        answer("ucc3-defense-bankruptcy", "Discharge in bankruptcy", [
          "bankruptcy discharge",
          "discharge",
        ]),
        answer("ucc3-defense-limitations", "Statute of limitations", [
          "limitations period",
          "SOL",
        ]),
      ],
    },
  ],
};

const liabilityQuestion = {
  id: "ucc-3-liability-sequence",
  type: "sporcle-grid",
  title: "Commercial Paper: Liability Sequence",
  prompt: "Fill the parties and events that determine primary and secondary liability.",
  columns: [
    {
      id: "primary-liability",
      title: "Primary Liability",
      answers: [
        answer("ucc3-liability-maker", "Maker", [], "Note"),
        answer("ucc3-liability-drawee", "Drawee bank", [
          "drawee",
          "bank",
        ], "Draft"),
      ],
    },
    {
      id: "liability-events",
      title: "Events",
      answers: [
        answer("ucc3-presentment", "Presentment", [
          "demand for payment",
        ], "Holder demands payment"),
        answer("ucc3-dishonor", "Dishonor", [
          "refusal to pay",
        ], "Primary party refuses payment"),
      ],
    },
    {
      id: "secondary-liability",
      title: "Secondary Liability After Dishonor",
      answers: [
        answer("ucc3-liability-drawer", "Drawer", ["drawers"]),
        answer("ucc3-liability-indorsers", "Indorsers", [
          "indorser",
          "endorsers",
          "endorser",
        ]),
      ],
    },
    {
      id: "forgery-effect",
      title: "Forgery",
      answers: [
        answer("ucc3-forgery-ineffective", "The forged signature is ineffective", [
          "forgery is ineffective",
          "ineffective forged signature",
        ], "Signature"),
        answer("ucc3-forgery-forger-liable", "The forgery is effective to make the forger liable", [
          "forger is liable",
          "effective against forger",
        ], "Forger"),
      ],
    },
  ],
};

const indorserLiabilityQuestion = {
  id: "ucc-3-indorser-liability",
  type: "sporcle-grid",
  title: "Commercial Paper: Indorser Liability",
  prompt: "Fill the three conditions for contract indorser liability and the disclaimer that negates it.",
  columns: [
    {
      id: "indorser-conditions",
      title: "Conditions",
      mnemonic: "PDN",
      answers: [
        answer("ucc3-indorser-presentment", "Presentment", [], "1"),
        answer("ucc3-indorser-dishonor", "Dishonor", [], "2"),
        answer("ucc3-indorser-notice", "Notice of dishonor to the indorser", [
          "notice of dishonor",
          "notice to indorser",
        ], "3"),
      ],
    },
    {
      id: "indorser-disclaimer",
      title: "Disclaimer",
      answers: [
        answer("ucc3-without-recourse", "Without recourse", [
          "indorsement without recourse",
          "endorsement without recourse",
        ], "Negates contract liability"),
      ],
    },
  ],
};

const transferWarrantiesQuestion = {
  id: "ucc-3-transfer-warranties",
  type: "sporcle-grid",
  title: "Commercial Paper: Transfer Warranties",
  prompt: "Fill the five warranties made by a person who transfers an instrument for consideration.",
  columns: [
    {
      id: "transfer-warranties",
      title: "Transfer Warranties",
      answers: [
        answer("ucc3-warranty-entitled", "Transferor is entitled to enforce the instrument", [
          "entitled to enforce",
          "I am entitled to enforce",
        ], "1"),
        answer("ucc3-warranty-signatures", "All signatures are genuine", [
          "signatures are genuine",
          "genuine signatures",
        ], "2"),
        answer("ucc3-warranty-alteration", "No material alteration", [
          "no material alterations",
          "instrument has not been altered",
        ], "3"),
        answer("ucc3-warranty-defenses", "No defense is good against the transferor", [
          "no good defenses against transferor",
          "no one before transferor has defenses",
          "no defenses",
        ], "4"),
        answer("ucc3-warranty-insolvency", "No knowledge of insolvency proceedings", [
          "no knowledge of insolvency",
          "no insolvency knowledge",
        ], "5"),
      ],
    },
  ],
};

export const commercialPaperQuestions = [
  permittedTermsQuestion,
  issueRoadmapQuestion,
  instrumentsAndPartiesQuestion,
  negotiationQuestion,
  holderInDueCourseQuestion,
  defensesQuestion,
  liabilityQuestion,
  indorserLiabilityQuestion,
  transferWarrantiesQuestion,
];
