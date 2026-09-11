import { flowcharts } from "./flowcharts.js";
import {
  freAuthenticationAndContentsQuestions,
  freOpinionsAndHearsayQuestions,
  frePrivilegesAndWitnessesQuestions,
  freRelevanceQuestions,
} from "./freRemainingQuestions.js";
import { securedTransactionsQuestions } from "./securedTransactionsQuestions.js";
import { commercialPaperQuestions } from "./commercialPaperQuestions.js";
import { floridaCivilProcedureQuestions } from "./floridaCivilProcedureQuestions.js";
import { professionalResponsibilitySubjects } from "./professionalResponsibilityQuestions.js";
import { jordanPeytonDirectExaminationQuestion } from "./directExaminationQuestions.js";

const [
  twoDismissalRule,
  negligenceCoreElements,
  predominantPurposeTest,
  gravamenOfTheAction,
  ucc2022Amendments,
] = flowcharts;

function ruleNameAnswer(ruleNumber, answer, acceptedAnswers = []) {
  return {
    id: `fre-rule-${ruleNumber}`,
    indicator: `Rule ${ruleNumber}`,
    answer,
    acceptedAnswers,
  };
}

function answer(id, answerText, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer: answerText,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

const freRuleNamesQuestion = {
  id: "fre-rule-names-from-syllabus",
  type: "sporcle-grid",
  title: "FRE Rule Names Listed on the Evidence Syllabus",
  prompt: "Use the rule number as the clue and fill in the official Federal Rules of Evidence rule title.",
  sourceUrl: "https://www.uscourts.gov/sites/default/files/document/federal-rules-of-evidence.pdf",
  sourceLabel: "U.S. Courts Federal Rules of Evidence PDF",
  columns: [
    {
      id: "general-provisions",
      title: "General Provisions",
      answers: [
        ruleNameAnswer("101", "Scope; Definitions", ["scope definitions", "scope and definitions"]),
        ruleNameAnswer("102", "Purpose"),
        ruleNameAnswer("103", "Rulings on Evidence", ["evidence rulings"]),
        ruleNameAnswer("104", "Preliminary Questions"),
        ruleNameAnswer(
          "105",
          "Limiting Evidence That Is Not Admissible Against Other Parties or for Other Purposes",
          ["limiting evidence", "limited admissibility"],
        ),
        ruleNameAnswer("106", "Remainder of or Related Statements", ["rule of completeness"]),
        ruleNameAnswer(
          "1101",
          "Applicability of the Rules",
          ["applicability", "applicability of rules"],
        ),
      ],
    },
    {
      id: "relevance-and-policy",
      title: "Relevance and Policy Exclusions",
      answers: [
        ruleNameAnswer("401", "Test for Relevant Evidence", ["relevant evidence"]),
        ruleNameAnswer("402", "General Admissibility of Relevant Evidence"),
        ruleNameAnswer(
          "403",
          "Excluding Relevant Evidence for Prejudice, Confusion, Waste of Time, or Other Reasons",
          ["unfair prejudice", "prejudice confusion waste of time"],
        ),
        ruleNameAnswer(
          "404",
          "Character Evidence; Other Crimes, Wrongs, or Acts",
          ["character evidence", "other crimes wrongs or acts"],
        ),
        ruleNameAnswer("405", "Methods of Proving Character"),
        ruleNameAnswer("406", "Habit; Routine Practice", ["habit", "routine practice"]),
        ruleNameAnswer("407", "Subsequent Remedial Measures"),
        ruleNameAnswer("408", "Compromise Offers and Negotiations"),
        ruleNameAnswer("409", "Offers to Pay Medical and Similar Expenses"),
        ruleNameAnswer("410", "Pleas, Plea Discussions, and Related Statements"),
        ruleNameAnswer("411", "Liability Insurance"),
        ruleNameAnswer(
          "412",
          "Sex-Offense Cases: The Victim's Sexual Behavior or Predisposition",
          ["rape shield", "victims sexual behavior or predisposition"],
        ),
        ruleNameAnswer("413", "Similar Crimes in Sexual-Assault Cases"),
        ruleNameAnswer("414", "Similar Crimes in Child Molestation Cases"),
        ruleNameAnswer(
          "415",
          "Similar Acts in Civil Cases Involving Sexual Assault or Child Molestation",
          ["similar acts in civil sexual assault or child molestation cases"],
        ),
      ],
    },
    {
      id: "privileges-and-witnesses",
      title: "Privileges and Witnesses",
      answers: [
        ruleNameAnswer("501", "Privilege in General"),
        ruleNameAnswer("601", "Competency to Testify in General"),
        ruleNameAnswer("602", "Need for Personal Knowledge", ["personal knowledge"]),
        ruleNameAnswer("607", "Who May Impeach a Witness"),
        ruleNameAnswer(
          "608",
          "A Witness's Character for Truthfulness or Untruthfulness",
          ["truthfulness or untruthfulness", "witness character for truthfulness"],
        ),
        ruleNameAnswer("609", "Impeachment by Evidence of a Criminal Conviction"),
        ruleNameAnswer("610", "Religious Beliefs or Opinions"),
        ruleNameAnswer(
          "611",
          "Mode and Order of Examining Witnesses and Presenting Evidence",
          ["mode and order", "examining witnesses and presenting evidence"],
        ),
        ruleNameAnswer("612", "Writing Used to Refresh a Witness's Memory"),
        ruleNameAnswer("613", "Witness's Prior Statement", ["prior statement"]),
        ruleNameAnswer(
          "615",
          "Excluding Witnesses from the Courtroom; Preventing an Excluded Witness's Access to Trial Testimony",
          ["excluding witnesses", "witness exclusion", "sequestration"],
        ),
      ],
    },
    {
      id: "opinions-and-hearsay",
      title: "Opinions and Hearsay",
      answers: [
        ruleNameAnswer("701", "Opinion Testimony by Lay Witnesses", ["lay opinion"]),
        ruleNameAnswer("702", "Testimony by Expert Witnesses", ["expert testimony"]),
        ruleNameAnswer("703", "Bases of an Expert's Opinion Testimony", ["bases of expert opinion"]),
        ruleNameAnswer("705", "Disclosing the Facts or Data Underlying an Expert's Opinion"),
        ruleNameAnswer(
          "801",
          "Definitions That Apply to This Article; Exclusions from Hearsay",
          ["hearsay definitions", "definitions and exclusions from hearsay"],
        ),
        ruleNameAnswer("802", "The Rule Against Hearsay", ["rule against hearsay"]),
        ruleNameAnswer(
          "803",
          "Exceptions to the Rule Against Hearsay - Regardless of Whether the Declarant Is Available as a Witness",
          ["hearsay exceptions regardless of availability", "803 exceptions"],
        ),
        ruleNameAnswer(
          "804",
          "Exceptions to the Rule Against Hearsay - When the Declarant Is Unavailable as a Witness",
          ["declarant unavailable", "hearsay exceptions when declarant unavailable"],
        ),
        ruleNameAnswer("805", "Hearsay Within Hearsay"),
        ruleNameAnswer("806", "Attacking and Supporting the Declarant's Credibility"),
        ruleNameAnswer("807", "Residual Exception"),
      ],
    },
    {
      id: "authentication-and-contents",
      title: "Authentication and Contents",
      answers: [
        ruleNameAnswer("901", "Authenticating or Identifying Evidence", ["authentication"]),
        ruleNameAnswer("902", "Evidence That Is Self-Authenticating", ["self authenticating evidence"]),
        ruleNameAnswer("1001", "Definitions That Apply to This Article"),
        ruleNameAnswer("1002", "Requirement of the Original", ["best evidence rule", "original writing rule"]),
        ruleNameAnswer("1003", "Admissibility of Duplicates", ["duplicates"]),
        ruleNameAnswer("1004", "Admissibility of Other Evidence of Content"),
      ],
    },
  ],
};

const freRule101Question = {
  id: "fre-rule-101-scope-definitions",
  type: "sporcle-grid",
  title: "FRE Rule 101: Scope; Definitions",
  prompt: "Fill the scope rule and the definitions used across the Federal Rules of Evidence.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_101",
  sourceLabel: "FRE Rule 101",
  columns: [
    {
      id: "scope",
      title: "Scope",
      answers: [
        answer("rule-101-united-states-courts", "proceedings in United States courts", [
          "United States court proceedings",
          "proceedings in US courts",
        ]),
        answer("rule-101-rule-1101-cross-reference", "Rule 1101", [
          "specific courts and proceedings are set out in Rule 1101",
          "exceptions are set out in Rule 1101",
        ]),
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      answers: [
        answer("rule-101-civil-case", "civil action or proceeding", [], "civil case"),
        answer("rule-101-criminal-case", "criminal proceeding", [], "criminal case"),
        answer("rule-101-public-office", "public agency", [], "public office"),
        answer(
          "rule-101-record",
          "memorandum, report, or data compilation",
          ["memorandum report or data compilation"],
          "record",
        ),
        answer(
          "rule-101-supreme-court-rule",
          "rule adopted by the Supreme Court under statutory authority",
          ["adopted by the Supreme Court under statutory authority"],
          "Supreme Court rule",
        ),
        answer(
          "rule-101-electronic-material",
          "electronically stored information",
          ["ESI"],
          "written material or medium",
        ),
      ],
    },
  ],
};

const freRule102Question = {
  id: "fre-rule-102-purpose",
  type: "sporcle-grid",
  title: "FRE Rule 102: Purpose",
  prompt: "Fill the construction goals and end goals of the Federal Rules of Evidence.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_102",
  sourceLabel: "FRE Rule 102",
  columns: [
    {
      id: "construction-goals",
      title: "Construction Goals",
      answers: [
        answer("rule-102-fair-proceeding", "administer every proceeding fairly", [
          "fairly administer every proceeding",
        ]),
        answer("rule-102-expense-delay", "eliminate unjustifiable expense and delay", [
          "eliminate expense and delay",
        ]),
        answer("rule-102-evidence-law", "promote the development of evidence law", [
          "develop evidence law",
        ]),
      ],
    },
    {
      id: "end-goals",
      title: "End Goals",
      answers: [
        answer("rule-102-truth", "ascertain the truth", ["truth"]),
        answer("rule-102-just-determination", "secure a just determination", [
          "just determination",
        ]),
      ],
    },
  ],
};

const freRule103Question = {
  id: "fre-rule-103-rulings-on-evidence",
  type: "sporcle-grid",
  title: "FRE Rule 103: Rulings on Evidence",
  prompt: "Fill the preservation requirements and trial-court safeguards for evidentiary rulings.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_103",
  sourceLabel: "FRE Rule 103",
  columns: [
    {
      id: "preserving-error",
      title: "Preserving Error",
      answers: [
        answer("rule-103-substantial-right", "substantial right", [
          "affects a substantial right",
        ]),
        answer("rule-103-timely-objection", "timely objection or motion to strike", [
          "object or move to strike",
          "timely objection",
          "motion to strike",
        ]),
        answer("rule-103-specific-ground", "specific ground", [
          "state the specific ground",
        ]),
        answer("rule-103-offer-of-proof", "offer of proof", [
          "inform the court of the substance",
        ]),
      ],
    },
    {
      id: "definitive-rulings",
      title: "Definitive Rulings and Court Role",
      answers: [
        answer("rule-103-no-renewal", "no need to renew an objection or offer of proof", [
          "do not need to renew objection",
          "no renewal required",
        ]),
        answer("rule-103-statement-about-ruling", "court's statement about the ruling", [
          "statement about the ruling",
        ]),
        answer("rule-103-question-answer-offer", "question-and-answer offer of proof", [
          "offer of proof in question and answer form",
          "Q and A offer of proof",
        ]),
      ],
    },
    {
      id: "jury-and-plain-error",
      title: "Jury and Plain Error",
      answers: [
        answer("rule-103-inadmissible-from-jury", "prevent the jury from hearing inadmissible evidence", [
          "keep inadmissible evidence from the jury",
        ]),
        answer("rule-103-plain-error", "plain error affecting a substantial right", [
          "plain error",
        ]),
      ],
    },
  ],
};

const freRule104Question = {
  id: "fre-rule-104-preliminary-questions",
  type: "sporcle-grid",
  title: "FRE Rule 104: Preliminary Questions",
  prompt: "Fill who decides preliminary matters and how conditional relevance and hearings work.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_104",
  sourceLabel: "FRE Rule 104",
  columns: [
    {
      id: "court-decides",
      title: "Court Decides",
      answers: [
        answer("rule-104-witness-qualified", "whether a witness is qualified", [
          "witness qualification",
          "qualified witness",
        ]),
        answer("rule-104-privilege-exists", "whether a privilege exists", [
          "privilege exists",
        ]),
        answer("rule-104-evidence-admissible", "whether evidence is admissible", [
          "evidence admissibility",
          "admissibility",
        ]),
        answer("rule-104-privilege-exception", "not bound by evidence rules except privilege", [
          "except privilege",
          "not bound by evidence rules",
        ]),
      ],
    },
    {
      id: "conditional-relevance",
      title: "Conditional Relevance",
      answers: [
        answer("rule-104-relevance-depends-on-fact", "relevance depends on whether a fact exists", [
          "conditional relevance",
          "relevance depends on a fact",
        ]),
        answer("rule-104-sufficient-proof", "proof sufficient to support a finding", [
          "sufficient proof",
        ]),
        answer("rule-104-later-proof", "admit on the condition that proof comes later", [
          "conditional admission",
          "proof introduced later",
        ]),
      ],
    },
    {
      id: "hearings-defendant-jury",
      title: "Hearings, Defendant, and Jury",
      answers: [
        answer("rule-104-confession", "admissibility of a confession", [
          "confession",
        ]),
        answer("rule-104-defendant-request", "defendant in a criminal case is a witness and requests it", [
          "criminal defendant is a witness and requests it",
          "defendant is a witness and requests it",
        ]),
        answer("rule-104-justice-requires", "justice so requires", [
          "justice requires",
        ]),
        answer("rule-104-cross-exam-limited", "no cross-examination on other issues", [
          "cross examination limited to preliminary question",
        ]),
        answer("rule-104-weight-credibility", "weight or credibility", [
          "evidence relevant to weight and credibility",
        ]),
      ],
    },
  ],
};

const freRule105Question = {
  id: "fre-rule-105-limiting-evidence",
  type: "sporcle-grid",
  title: "FRE Rule 105: Limiting Evidence",
  prompt: "Fill when a limiting instruction is triggered and what the court must do.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_105",
  sourceLabel: "FRE Rule 105",
  columns: [
    {
      id: "trigger",
      title: "Trigger",
      answers: [
        answer("rule-105-admissible-party", "admissible against one party but not another", [
          "one party but not another",
        ]),
        answer("rule-105-admissible-purpose", "admissible for one purpose but not another", [
          "one purpose but not another",
        ]),
        answer("rule-105-timely-request", "timely request", [
          "upon timely request",
        ]),
      ],
    },
    {
      id: "court-response",
      title: "Court Response",
      answers: [
        answer("rule-105-proper-scope", "restrict the evidence to its proper scope", [
          "proper scope",
          "limit to proper scope",
        ]),
        answer("rule-105-instruct-jury", "instruct the jury accordingly", [
          "limiting instruction",
          "jury instruction",
        ]),
      ],
    },
  ],
};

const freRule106Question = {
  id: "fre-rule-106-completeness",
  type: "sporcle-grid",
  title: "FRE Rule 106: Remainder of or Related Statements",
  prompt: "Fill the rule-of-completeness trigger and what the adverse party may require.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_106",
  sourceLabel: "FRE Rule 106",
  columns: [
    {
      id: "trigger",
      title: "Trigger",
      answers: [
        answer("rule-106-party-introduces", "party introduces all or part of a statement", [
          "introduces all or part of a statement",
        ]),
        answer("rule-106-adverse-party", "adverse party", [
          "opposing party",
        ]),
      ],
    },
    {
      id: "completing-material",
      title: "Completing Material",
      answers: [
        answer("rule-106-other-part", "any other part", [
          "remainder",
          "other part",
        ]),
        answer("rule-106-other-statement", "any other statement", [
          "related statement",
        ]),
        answer("rule-106-fairness", "fairness requires consideration at the same time", [
          "fairness",
          "considered at the same time",
        ]),
        answer("rule-106-hearsay-objection", "over a hearsay objection", [
          "hearsay objection",
        ]),
      ],
    },
  ],
};

const freRule401Question = {
  id: "fre-rule-401-relevant-evidence",
  type: "sporcle-grid",
  title: "FRE Rule 401: Test for Relevant Evidence",
  prompt: "Fill the two-part relevance test.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_401",
  sourceLabel: "FRE Rule 401",
  columns: [
    {
      id: "tendency",
      title: "Probative Tendency",
      answers: [
        answer("rule-401-any-tendency", "any tendency", [
          "tendency",
        ]),
        answer("rule-401-more-probable", "make a fact more probable", [
          "more probable",
        ]),
        answer("rule-401-less-probable", "make a fact less probable", [
          "less probable",
        ]),
        answer("rule-401-without-evidence", "than it would be without the evidence", [
          "without the evidence",
        ]),
      ],
    },
    {
      id: "consequence",
      title: "Consequence",
      answers: [
        answer("rule-401-fact-of-consequence", "fact of consequence", [
          "consequential fact",
        ]),
        answer("rule-401-determining-action", "determining the action", [
          "determine the action",
        ]),
      ],
    },
  ],
};

const freRule402Question = {
  id: "fre-rule-402-admissibility",
  type: "sporcle-grid",
  title: "FRE Rule 402: General Admissibility of Relevant Evidence",
  prompt: "Fill the default admissibility rule and the sources that can override it.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_402",
  sourceLabel: "FRE Rule 402",
  columns: [
    {
      id: "default-rule",
      title: "Default Rule",
      answers: [
        answer("rule-402-relevant-admissible", "relevant evidence is admissible", [
          "relevant evidence admissible",
        ]),
        answer("rule-402-irrelevant-not-admissible", "irrelevant evidence is not admissible", [
          "irrelevant evidence inadmissible",
        ]),
      ],
    },
    {
      id: "override-sources",
      title: "Override Sources",
      answers: [
        answer("rule-402-constitution", "United States Constitution", [
          "US Constitution",
          "Constitution",
        ]),
        answer("rule-402-federal-statute", "federal statute", [
          "federal statutes",
        ]),
        answer("rule-402-evidence-rules", "Federal Rules of Evidence", [
          "these rules",
          "FRE",
        ]),
        answer("rule-402-supreme-court-rules", "other rules prescribed by the Supreme Court", [
          "Supreme Court rules",
        ]),
      ],
    },
  ],
};

const freRule403Question = {
  id: "fre-rule-403-balancing",
  type: "sporcle-grid",
  title: "FRE Rule 403: Excluding Relevant Evidence",
  prompt: "Fill the Rule 403 balancing standard and the listed dangers.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_403",
  sourceLabel: "FRE Rule 403",
  columns: [
    {
      id: "balancing-standard",
      title: "Balancing Standard",
      answers: [
        answer("rule-403-court-may-exclude", "court may exclude relevant evidence", [
          "may exclude relevant evidence",
        ]),
        answer("rule-403-probative-value", "probative value", [
          "probative worth",
        ]),
        answer("rule-403-substantially-outweighed", "substantially outweighed", [
          "substantially outweighs",
        ]),
      ],
    },
    {
      id: "dangers",
      title: "Dangers",
      mnemonic: "UCMNUW",
      answers: [
        answer("rule-403-unfair-prejudice", "unfair prejudice"),
        answer("rule-403-confusing-issues", "confusing the issues", [
          "confusion of the issues",
        ]),
        answer("rule-403-misleading-jury", "misleading the jury"),
        answer("rule-403-cumulative-evidence", "needlessly presenting cumulative evidence", [
          "cumulative evidence",
        ]),
        answer("rule-403-undue-delay", "undue delay"),
        answer("rule-403-wasting-time", "wasting time", [
          "waste of time",
        ]),
      ],
    },
    {
      id: "factors-influence-judges",
      title: "Judicial Factors",
      answers: [
        answer(
          "rule-403-emotions-irrational-prejudice",
          "risk of emotional or irrational prejudice",
          [
            "extent to which the evidence will arouse emotions or irrational prejudice among the jurors",
            "arouse emotions or irrational prejudice among jurors",
            "emotional or irrational prejudice",
          ],
        ),
        answer(
          "rule-403-jury-overvalue",
          "risk the jury will overvalue the evidence",
          ["extent to which the jury might overvalue the evidence", "jury might overvalue the evidence"],
        ),
        answer(
          "rule-403-connection-to-elements",
          "strength of connection to the case elements",
          [
            "strength of the connection between the evidence and the elements of the case",
            "connection between the evidence and the elements",
            "strength of connection to the elements",
          ],
        ),
        answer(
          "rule-403-less-prejudicial-alternatives",
          "less prejudicial or confusing alternatives",
          [
            "alternatives to present the same facts by less prejudicial or confusing means",
            "alternative means to present the same facts",
          ],
        ),
        answer(
          "rule-403-redaction",
          "ability to redact and reduce harm",
          [
            "possibility of redaction to reduce prejudice or other harm",
            "redact to reduce prejudice",
            "possibility to redact and reduce harm",
          ],
        ),
      ],
    },
  ],
};

const freRule1101Question = {
  id: "fre-rule-1101-applicability",
  type: "sporcle-grid",
  title: "FRE Rule 1101: Applicability of the Rules",
  prompt: "Fill the categories where the Federal Rules of Evidence apply, plus the listed exceptions.",
  sourceUrl: "https://www.law.cornell.edu/rules/fre/rule_1101",
  sourceLabel: "FRE Rule 1101",
  columns: [
    {
      id: "courts-and-judges",
      title: "To Courts and Judges",
      answers: [
        {
          id: "us-district-courts",
          answer: "United States district courts",
          acceptedAnswers: ["US district courts", "district courts"],
        },
        {
          id: "bankruptcy-magistrate-judges",
          answer: "United States bankruptcy and magistrate judges",
          acceptedAnswers: [
            "US bankruptcy and magistrate judges",
            "bankruptcy and magistrate judges",
          ],
        },
        {
          id: "courts-of-appeals",
          answer: "United States courts of appeals",
          acceptedAnswers: ["US courts of appeals", "courts of appeals"],
        },
        {
          id: "court-of-federal-claims",
          answer: "the United States Court of Federal Claims",
          acceptedAnswers: [
            "United States Court of Federal Claims",
            "Court of Federal Claims",
          ],
        },
        {
          id: "territorial-district-courts",
          answer: "the district courts of Guam, the Virgin Islands, and the Northern Mariana Islands",
          acceptedAnswers: [
            "district courts of Guam the Virgin Islands and the Northern Mariana Islands",
            "Guam Virgin Islands and Northern Mariana Islands district courts",
          ],
        },
      ],
    },
    {
      id: "cases-and-proceedings",
      title: "To Cases and Proceedings",
      answers: [
        {
          id: "civil-cases",
          answer: "civil cases and proceedings, including bankruptcy, admiralty, and maritime cases",
          acceptedAnswers: [
            "civil cases and proceedings",
            "civil cases including bankruptcy admiralty and maritime cases",
          ],
        },
        {
          id: "criminal-cases",
          answer: "criminal cases and proceedings",
          acceptedAnswers: ["criminal cases"],
        },
        {
          id: "contempt-proceedings",
          answer: "contempt proceedings, except those in which the court may act summarily",
          acceptedAnswers: [
            "contempt proceedings except summary contempt",
            "contempt proceedings",
          ],
        },
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions",
      answers: [
        {
          id: "rule-104-preliminary-question",
          answer: "the court's determination, under Rule 104(a), on a preliminary question of fact governing admissibility",
          acceptedAnswers: [
            "court determination under rule 104a on a preliminary question of fact governing admissibility",
            "Rule 104(a) preliminary question of fact governing admissibility",
            "preliminary question of fact governing admissibility",
          ],
        },
        {
          id: "grand-jury-proceedings",
          answer: "grand-jury proceedings",
          acceptedAnswers: ["grand jury proceedings"],
        },
        {
          id: "extradition-rendition",
          answer: "extradition or rendition",
          acceptedAnswers: ["extradition", "rendition"],
        },
        {
          id: "warrants-and-summons",
          answer: "issuing an arrest warrant, criminal summons, or search warrant",
          acceptedAnswers: [
            "issuing an arrest warrant criminal summons or search warrant",
            "arrest warrant criminal summons or search warrant",
            "search warrant",
          ],
        },
        {
          id: "preliminary-examination",
          answer: "a preliminary examination in a criminal case",
          acceptedAnswers: [
            "preliminary examination in a criminal case",
            "preliminary examination",
          ],
        },
        {
          id: "sentencing",
          answer: "sentencing",
        },
        {
          id: "probation-supervised-release",
          answer: "granting or revoking probation or supervised release",
          acceptedAnswers: [
            "probation or supervised release",
            "revoking probation or supervised release",
          ],
        },
        {
          id: "bail-release",
          answer: "considering whether to release on bail or otherwise",
          acceptedAnswers: ["release on bail or otherwise", "bail or otherwise"],
        },
      ],
    },
  ],
};

const ucc3NegotiableNoteQuestion = {
  id: "ucc-3-is-the-note-cash",
  type: "sporcle-grid",
  title: "Is the Note Cash? (Valid Negotiable Instrument)",
  prompt: "Fill all six requirements for a note to qualify as a negotiable instrument.",
  sourceUrl:
    "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0673/Sections/0673.1041.html",
  sourceLabel: "Florida Statutes § 673.1041",
  columns: [
    {
      id: "negotiability-requirements",
      title: "Is the Note Cash?",
      mnemonic: "USFPOS",
      answers: [
        answer("ucc-3-unconditional", "Unconditional", [
          "unconditional promise or order",
        ], "1"),
        answer(
          "ucc-3-signed-promise-or-order",
          "Signed promise or order to pay",
          [
            "signed promise or order to pay with or without interest",
            "signed promise or order to pay",
            "signed promise to pay",
            "signed order to pay",
            "promise or order to pay",
          ],
          "2",
        ),
        answer("ucc-3-with-or-without-interest", "Fixed amount of money (with or without interest)", [
          "fixed amount of money with or without interest",
          "with or without interest",
          "a fixed amount of money",
          "fixed amount",
        ], "3"),
        answer("ucc-3-order-or-bearer", "Payable to order or bearer", [
          "payable to bearer or order",
          "order or bearer",
          "bearer or order",
        ], "4"),
        answer("ucc-3-demand-or-definite-time", "Payable on demand or at a definite time", [
          "on demand or at a definite time",
          "demand or definite time",
        ], "5"),
        answer(
          "ucc-3-no-unauthorized-undertakings",
          "No unauthorized undertaking or instruction by the party ordering payment",
          [
            "no unauthorized undertakings or instructions by the party ordering payment",
            "no other undertaking or instruction",
            "does not state any other undertaking or instruction",
            "no additional undertaking or instruction",
          ],
          "6",
        ),
      ],
    },
  ],
};

const turingNineArgumentsQuestion = {
  id: "turing-nine-arguments-against-machine-thinking",
  type: "sporcle-grid",
  title: "Nine Arguments Against Machines Can “Think”",
  prompt: "Recall the objections in THC MC LIVE order. Use Show Mnemonic for letter clues.",
  columns: [
    {
      id: "thc-group",
      title: "THC",
      mnemonic: "THC",
      answers: [
        answer("turing-argument-theological", "Theological", [
          "theological objection",
          "the theological argument",
        ], "Argument 1"),
        answer("turing-argument-heads-in-sand", "Heads in Sand", [
          "heads in the sand",
          "heads in the sand objection",
          "heads in the sand argument",
        ], "Argument 2"),
        answer("turing-argument-consciousness", "Consciousness", [
          "from consciousness",
          "consciousness objection",
          "argument from consciousness",
        ], "Argument 4"),
      ],
    },
    {
      id: "mc-group",
      title: "MC",
      mnemonic: "MC",
      answers: [
        answer("turing-argument-mathematical", "Mathematical", [
          "mathematical objection",
          "mathematical argument",
          "godel",
          "godels incompleteness theorem",
        ], "Argument 3"),
        answer("turing-argument-continuity", "Continuity Argument", [
          "continuity",
          "continuity objection",
        ], "Argument 7"),
      ],
    },
    {
      id: "live-group",
      title: "LIVE",
      mnemonic: "LIVE",
      answers: [
        answer("turing-argument-lovelace", "Lady Lovelace", [
          "lady lovelaces",
          "lady lovelaces objection",
          "lovelace objection",
        ], "Argument 6"),
        answer("turing-argument-informal-behavior", "Informal Behavior", [
          "informality of behavior",
          "informality of behavior argument",
          "informal behavior argument",
        ], "Argument 8"),
        answer("turing-argument-disabilities", "Various Disabilities", [
          "various disabilities objection",
          "disabilities",
        ], "Argument 5"),
        answer("turing-argument-esp", "ESP Argument", [
          "esp",
          "extrasensory perception",
          "extrasensory perception argument",
        ], "Argument 9"),
      ],
    },
  ],
};

const consciousnessFiveViewsQuestion = {
  id: "consciousness-five-views",
  type: "sporcle-grid",
  title: "What Explains Consciousness? Five Views",
  prompt: "Use each short thesis as the clue and name the view of consciousness.",
  columns: [
    {
      id: "substance-and-identity",
      title: "Substance and Identity",
      answers: [
        answer("consciousness-dualism", "Dualism", [
          "substance dualism",
        ], "Mind ≠ matter"),
        answer("consciousness-physicalism", "Physicalism", [
          "materialism",
        ], "Brain activity"),
      ],
    },
    {
      id: "role-and-awareness",
      title: "Role and Awareness",
      answers: [
        answer("consciousness-functionalism", "Functionalism", [], "Functional role"),
        answer("consciousness-higher-order", "Higher-Order Theories", [
          "higher order theory",
          "higher order theories",
          "higher order",
        ], "Self-monitoring"),
      ],
    },
    {
      id: "explanatory-gap",
      title: "Explanatory Gap",
      answers: [
        answer("consciousness-hard-problem", "The Hard Problem", [
          "hard problem",
          "chalmers hard problem",
          "the hard problem of consciousness",
        ], "Why does it feel?"),
      ],
    },
  ],
};

const aiHistoryTimelineQuestion = {
  id: "ai-history-1943-2022",
  type: "sporcle-grid",
  title: "AI History: 1943–2022",
  prompt: "Use each date in the left column as the clue and name the AI history event.",
  columns: [
    {
      id: "ai-history-foundations",
      title: "Foundations: 1943–1958",
      answers: [
        answer(
          "ai-history-1943-neural-network",
          "First neural-network model",
          [
            "first mathematical model of a neural network",
            "mcculloch and pitts neural network model",
            "mcculloch pitts neural network",
          ],
          "1943",
        ),
        answer(
          "ai-history-1946-eniac",
          "ENIAC completed",
          [
            "eniac is completed",
            "eniac completed",
            "first programmable general purpose computer",
          ],
          "1946",
        ),
        answer(
          "ai-history-1950-turing",
          "Turing: Computing Machinery and Intelligence",
          [
            "turing publishes computing machinery and intelligence",
            "computing machinery and intelligence",
            "alan turing paper",
          ],
          "1950",
        ),
        answer(
          "ai-history-1956-dartmouth",
          "AI coined; Dartmouth Conference",
          [
            "mccarthy coins artificial intelligence",
            "dartmouth conference",
            "john mccarthy dartmouth conference",
            "artificial intelligence coined",
          ],
          "1956",
        ),
        answer(
          "ai-history-1958-perceptron",
          "Perceptron",
          [
            "rosenblatt publishes the perceptron",
            "perceptron",
            "first artificial neuron",
          ],
          "1958",
        ),
      ],
    },
    {
      id: "ai-history-boom-bust",
      title: "Boom, Bust, and Two Winters",
      answers: [
        answer(
          "ai-history-1960-adaline",
          "ADALINE",
          ["adaline", "widrow and hoff develop adaline", "adaline gradient descent"],
          "1960",
        ),
        answer(
          "ai-history-1965-multilayer",
          "Multilayer models",
          [
            "first multilayer models",
            "multilayer models",
            "ivakhnenko and lapa multilayer models",
          ],
          "1965",
        ),
        answer(
          "ai-history-1966-eliza",
          "ELIZA",
          [
            "eliza",
            "weizenbaum creates eliza",
            "first chatbot",
            "eliza effect",
          ],
          "1966",
        ),
        answer(
          "ai-history-1969-perceptrons",
          "Perceptrons; XOR limitation",
          [
            "minsky and papert publish perceptrons",
            "perceptrons",
            "xor problem",
            "xor limitation",
          ],
          "1969",
        ),
        answer(
          "ai-history-1970s-first-winter",
          "First AI winter",
          ["the first ai winter", "ai winter"],
          "1970s",
        ),
        answer(
          "ai-history-1980s-resurgence",
          "Expert-systems resurgence",
          [
            "ai resurgence",
            "neural networks and expert systems",
            "expert systems resurgence",
          ],
          "1980s",
        ),
        answer(
          "ai-history-1986-backpropagation",
          "Backpropagation",
          [
            "backpropagation",
            "backprop",
            "learning representations by back propagating errors",
            "rumelhart hinton and williams",
          ],
          "1986",
        ),
        answer(
          "ai-history-1990s-second-winter",
          "Second AI winter",
          [
            "the second ai winter",
            "second ai winter",
            "not enough data or compute",
          ],
          "1990s",
        ),
      ],
    },
    {
      id: "ai-history-breakthroughs",
      title: "Breakthroughs to ChatGPT",
      answers: [
        answer(
          "ai-history-1997-deep-blue",
          "Deep Blue defeats Kasparov",
          [
            "deep blue defeats garry kasparov",
            "deep blue defeats kasparov",
            "ibm deep blue",
          ],
          "1997",
        ),
        answer(
          "ai-history-2006-deep-learning-imagenet",
          "Deep-learning advances; ImageNet begins",
          [
            "hinton and salakhutdinov publish faster deep learning methods and fei fei li begins imagenet",
            "deep learning methods and imagenet",
            "imagenet begins",
            "fei fei li begins imagenet",
          ],
          "2006",
        ),
        answer(
          "ai-history-2010-ilsvrc",
          "ImageNet Challenge launches",
          [
            "imagenet challenge launches",
            "ilsvrc launches",
            "imagenet large scale visual recognition challenge",
          ],
          "2010",
        ),
        answer(
          "ai-history-2011-watson",
          "Watson wins Jeopardy!",
          [
            "watson wins jeopardy",
            "watson defeats jeopardy champions",
            "ibm watson",
          ],
          "2011",
        ),
        answer(
          "ai-history-2012-alexnet",
          "AlexNet wins ImageNet",
          [
            "alexnet wins imagenet",
            "alexnet",
            "alexnet uses gpus",
          ],
          "2012",
        ),
        answer(
          "ai-history-2022-chatgpt",
          "ChatGPT released (GPT-3.5)",
          [
            "openai releases chatgpt",
            "chatgpt released",
            "chatgpt gpt 3.5",
            "openai releases chatgpt gpt 3.5",
          ],
          "2022",
        ),
      ],
    },
  ],
};

const openingStatementStructureQuestion = {
  id: "opening-statements-structure",
  type: "sporcle-grid",
  title: "Structure",
  prompt: "Recite the seven parts of an opening statement in order.",
  columns: [
    {
      id: "opening-statement-structure",
      title: "Opening Statement Structure",
      mnemonic: "TSRIRFC",
      answers: [
        answer("opening-structure-theme", "Theme"),
        answer("opening-structure-story", "Short, Compelling Story", [
          "short compelling story",
        ]),
        answer("opening-structure-repeat-theme", "Repeat the Theme"),
        answer("opening-structure-introduction", "Introduction Paragraph", [
          "introduction",
          "intro paragraph",
        ]),
        answer("opening-structure-roadmap", "Roadmap Paragraph", ["roadmap"]),
        answer("opening-structure-follow-roadmap", "Follow the Roadmap"),
        answer("opening-structure-conclusion", "Concluding Paragraph", [
          "conclusion",
          "conclusion paragraph",
        ]),
      ],
    },
  ],
};

const openingStatementIntroductionParagraphQuestion = {
  id: "opening-statements-introduction-paragraph",
  type: "sporcle-grid",
  title: "Introduction Paragraph",
  prompt: "Fill in the first words of each sentence in order.",
  columns: [
    {
      id: "introduction-paragraph-sentence-openings",
      title: "Sentence Openings",
      answers: [
        answer("opening-introduction-members-jury", "Members of the Jury"),
        answer("opening-introduction-prosecution", "As the prosecution"),
        answer("opening-introduction-end-trial", "At the end of trial"),
        answer("opening-introduction-shot", "Shot the victim with a gun"),
        answer("opening-introduction-intended", "Intended to kill"),
        answer("opening-introduction-premeditation", "Acted with Premeditation"),
        answer("opening-introduction-caused-death", "caused the victim's death"),
        answer("opening-introduction-lets-talk", "So, let's talk about"),
      ],
    },
  ],
};

const freObjectionCadencesQuestion = {
  id: "fre-objection-response-cadences",
  type: "sporcle-grid",
  title: "Responses to FRE Objections",
  prompt:
    "Use the objection as the clue and recite the response stem. Replace bracketed text with the facts and theory of your case.",
  sourceUrl:
    "https://www.uscourts.gov/forms-rules/current-rules-practice-procedure/federal-rules-evidence",
  sourceLabel: "Current Federal Rules of Evidence",
  columns: [
    {
      id: "relevance-character-policy",
      title: "Relevance, Character & Policy",
      answers: [
        answer(
          "objection-cadence-relevance",
          "Your Honor, this evidence is relevant because it tends to make [fact of consequence] more or less probable.",
          [
            "this evidence is relevant because it makes a fact of consequence more or less probable",
            "relevant because",
          ],
          "Rules 401-402",
        ),
        answer(
          "objection-cadence-403",
          "Your Honor, this evidence is relevant because . . .",
          [
            "your honor this evidence is relevant because",
            "the probative value is not substantially outweighed by the identified danger",
          ],
          "Rule 403",
        ),
        answer(
          "objection-cadence-404",
          "Your Honor, this is not offered to prove propensity; it is offered to prove [permitted purpose].",
          [
            "not offered for propensity",
            "offered to prove a permitted purpose",
          ],
          "Rule 404",
        ),
        answer(
          "objection-cadence-405",
          "Your Honor, the character evidence is admissible, and this is a permitted method of proving it because [foundation].",
          [
            "this is a permitted method of proving character",
            "permitted method of proving character because",
          ],
          "Rule 405",
        ),
        answer(
          "objection-cadence-406",
          "Your Honor, this is habit evidence: a regular response to a repeated situation offered to show conforming conduct.",
          ["this is habit evidence", "regular response to a repeated situation"],
          "Rule 406",
        ),
        answer(
          "objection-cadence-407",
          "Your Honor, this is not offered to prove negligence; it is offered to prove [permitted disputed purpose].",
          [
            "not offered to prove negligence",
            "offered for a permitted purpose under rule 407",
          ],
          "Rule 407",
        ),
        answer(
          "objection-cadence-408",
          "Your Honor, this is not offered to prove the validity or amount of the claim; it is offered to prove [other purpose].",
          [
            "not offered to prove validity or amount",
            "offered for another purpose under rule 408",
          ],
          "Rule 408",
        ),
        answer(
          "objection-cadence-411",
          "Your Honor, this is not offered to prove negligence; it is offered to prove [bias, agency, ownership, or control].",
          [
            "insurance is not offered to prove negligence",
            "offered to prove bias agency ownership or control",
          ],
          "Rule 411",
        ),
      ],
    },
    {
      id: "witnesses-opinions",
      title: "Witnesses & Opinions",
      answers: [
        answer(
          "objection-cadence-602",
          "Your Honor, the witness has personal knowledge because [state what the witness perceived].",
          ["the witness has personal knowledge because", "personal knowledge"],
          "Rule 602",
        ),
        answer(
          "objection-cadence-608",
          "Your Honor, on cross-examination this conduct is probative of the witness's character for truthfulness.",
          [
            "conduct is probative of truthfulness",
            "probative of the witnesss character for truthfulness",
          ],
          "Rule 608",
        ),
        answer(
          "objection-cadence-609",
          "Your Honor, the conviction is admissible to attack the witness's character for truthfulness under Rule 609.",
          ["conviction is admissible under rule 609", "impeachment by conviction"],
          "Rule 609",
        ),
        answer(
          "objection-cadence-leading",
          "Your Honor, leading is permitted here because [cross-examination, hostility, adversity, or necessity].",
          ["leading is permitted because", "rule 611 permits leading"],
          "Leading - 611(c)",
        ),
        answer(
          "objection-cadence-scope",
          "Your Honor, this concerns the subject of direct examination or the witness's credibility.",
          ["within the scope of direct or credibility", "subject of direct or credibility"],
          "Scope - 611(b)",
        ),
        answer(
          "objection-cadence-701",
          "Your Honor, this opinion is rationally based on perception, helpful, and not based on specialized knowledge.",
          ["rationally based helpful and not specialized", "proper lay opinion"],
          "Rule 701",
        ),
        answer(
          "objection-cadence-702",
          "Your Honor, the witness is qualified, and the opinion rests on sufficient facts, reliable methods, and reliable application.",
          [
            "qualified expert with sufficient facts reliable methods and reliable application",
            "proper expert opinion",
          ],
          "Rule 702",
        ),
      ],
    },
    {
      id: "hearsay-documents",
      title: "Hearsay & Documents",
      answers: [
        answer(
          "objection-cadence-not-for-truth",
          "Your Honor, the statement is not offered for its truth; it is offered to show [nonhearsay purpose].",
          ["not offered for the truth", "offered for a nonhearsay purpose"],
          "Rules 801-802",
        ),
        answer(
          "objection-cadence-hearsay-exception",
          "Your Honor, the statement is admissible under Rule [number] because [state each element of the exception].",
          ["admissible under a hearsay exception because", "rule 803 or 804 exception"],
          "Rules 803-804",
        ),
        answer(
          "objection-cadence-805",
          "Your Honor, each layer is admissible: the outer statement under [rule] and the inner statement under [rule].",
          ["each layer has a hearsay exception", "outer and inner statements are admissible"],
          "Rule 805",
        ),
        answer(
          "objection-cadence-901",
          "Your Honor, this foundation is sufficient for a finding that the item is what we claim it is.",
          ["the item is what we claim it is", "sufficient authentication foundation"],
          "Rule 901",
        ),
        answer(
          "objection-cadence-1002",
          "Your Honor, [the original is before the court / an exception permits other evidence / we are not proving content].",
          [
            "the original is before the court",
            "an exception permits other evidence",
            "we are not proving content",
          ],
          "Rule 1002",
        ),
      ],
    },
  ],
};

const freCannedObjectionsQuestion = {
  id: "fre-canned-objections",
  type: "sporcle-grid",
  title: "Making FRE Objections",
  prompt:
    "Use the rule as the clue and recite the objection. Replace bracketed language with the specific defect or danger.",
  sourceUrl:
    "https://www.uscourts.gov/forms-rules/current-rules-practice-procedure/federal-rules-evidence",
  sourceLabel: "Current Federal Rules of Evidence",
  columns: [
    {
      id: "relevance-character-policy-objections",
      title: "Relevance, Character & Policy",
      answers: [
        answer(
          "canned-objection-relevance",
          "Objection, relevance. This evidence does not make a fact of consequence more or less probable.",
          ["objection relevance", "does not make a fact of consequence more or less probable"],
          "Rules 401-402",
        ),
        answer(
          "canned-objection-403",
          "Objection, Rule 403. This evidence's probative value is substantially outweighed by [unfair prejudice, confusion, misleading the jury, undue delay, wasting time, or cumulative evidence].",
          [
            "objection 403 this evidences probative value is substantially outweighed",
            "probative value is substantially outweighed by unfair prejudice confusion wasting time or other reasons",
          ],
          "Rule 403",
        ),
        answer(
          "canned-objection-404",
          "Objection, Rule 404. This is character or other-act evidence offered to prove propensity.",
          ["objection 404 propensity", "character evidence offered to prove propensity"],
          "Rule 404",
        ),
        answer(
          "canned-objection-405",
          "Objection, Rule 405. Counsel is using an improper method to prove character.",
          ["objection 405 improper method of proving character", "improper character method"],
          "Rule 405",
        ),
        answer(
          "canned-objection-406",
          "Objection, Rule 406. This is general character evidence, not a specific and regular habit or routine practice.",
          ["objection 406 not habit", "character evidence not habit or routine practice"],
          "Rule 406",
        ),
        answer(
          "canned-objection-407",
          "Objection, Rule 407. This subsequent remedial measure is offered to prove negligence or another prohibited purpose.",
          ["objection 407 subsequent remedial measure", "remedial measure offered to prove negligence"],
          "Rule 407",
        ),
        answer(
          "canned-objection-408",
          "Objection, Rule 408. This compromise evidence is offered to prove the validity or amount of a disputed claim.",
          ["objection 408 compromise evidence", "settlement offered to prove validity or amount"],
          "Rule 408",
        ),
        answer(
          "canned-objection-411",
          "Objection, Rule 411. Liability-insurance evidence is being offered to prove negligence or wrongful conduct.",
          ["objection 411 liability insurance", "insurance offered to prove negligence"],
          "Rule 411",
        ),
      ],
    },
    {
      id: "witness-opinion-objections",
      title: "Witnesses & Opinions",
      answers: [
        answer(
          "canned-objection-602",
          "Objection, Rule 602. No foundation establishes this witness's personal knowledge.",
          ["objection lack of personal knowledge", "no personal knowledge foundation"],
          "Rule 602",
        ),
        answer(
          "canned-objection-608",
          "Objection, Rule 608. This is improper extrinsic evidence of specific conduct offered to prove character for truthfulness.",
          ["objection 608 improper extrinsic evidence", "extrinsic evidence of specific conduct"],
          "Rule 608",
        ),
        answer(
          "canned-objection-609",
          "Objection, Rule 609. The conviction does not satisfy the rule's crime, balancing, timing, or notice requirements.",
          ["objection 609 improper conviction impeachment", "conviction does not satisfy rule 609"],
          "Rule 609",
        ),
        answer(
          "canned-objection-leading",
          "Objection, leading. Counsel is suggesting the answer on direct examination, and no exception applies.",
          ["objection leading", "suggesting the answer on direct"],
          "Rule 611(c)",
        ),
        answer(
          "canned-objection-scope",
          "Objection, beyond the scope. This does not concern direct examination or the witness's credibility.",
          ["objection beyond scope", "outside direct examination and credibility"],
          "Rule 611(b)",
        ),
        answer(
          "canned-objection-701",
          "Objection, Rule 701. This lay opinion is not based on perception, is not helpful, or depends on specialized knowledge.",
          ["objection improper lay opinion", "objection rule 701"],
          "Rule 701",
        ),
        answer(
          "canned-objection-702",
          "Objection, Rule 702. The proponent has not established qualification, sufficient facts, reliable methods, and reliable application.",
          ["objection improper expert opinion", "objection rule 702 reliability"],
          "Rule 702",
        ),
      ],
    },
    {
      id: "hearsay-document-objections",
      title: "Hearsay & Documents",
      answers: [
        answer(
          "canned-objection-hearsay",
          "Objection, hearsay. This out-of-court statement is offered to prove the truth of the matter asserted.",
          ["objection hearsay", "out of court statement offered for its truth"],
          "Rules 801-802",
        ),
        answer(
          "canned-objection-exception-foundation",
          "Objection. The proponent has not established each element of the claimed hearsay exception.",
          ["no foundation for the hearsay exception", "hearsay exception elements not established"],
          "Rules 803-804",
        ),
        answer(
          "canned-objection-805",
          "Objection, hearsay within hearsay. At least one layer lacks an exclusion or exception.",
          ["objection double hearsay", "one hearsay layer lacks an exception"],
          "Rule 805",
        ),
        answer(
          "canned-objection-901",
          "Objection, lack of authentication. The proponent has not shown that the item is what it is claimed to be.",
          ["objection lack of authentication", "item not shown to be what it is claimed"],
          "Rule 901",
        ),
        answer(
          "canned-objection-1002",
          "Objection, best evidence. An original is required to prove the content, and no exception has been established.",
          ["objection best evidence", "original required to prove content"],
          "Rule 1002",
        ),
      ],
    },
  ],
};

const formObjectionCadencesQuestion = {
  id: "form-objection-response-cadences",
  type: "sporcle-grid",
  title: "Responses to Form Objections",
  prompt:
    "Use the form objection as the clue and recite a concise response or cure. Adapt the bracketed language to the examination.",
  columns: [
    {
      id: "rephrase",
      title: "Rephrase or Narrow",
      answers: [
        answer("form-cadence-leading", "Your Honor, I'll rephrase without leading.", ["ill rephrase", "I will rephrase"], "Leading"),
        answer("form-cadence-compound", "Your Honor, I'll separate the questions.", ["ill separate the question", "I will separate the questions"], "Compound"),
        answer("form-cadence-vague", "Your Honor, I'll clarify [the time, person, or term].", ["ill clarify", "I will clarify"], "Vague / ambiguous"),
        answer("form-cadence-narrative", "Your Honor, I'll narrow the question to a specific fact.", ["ill narrow the question", "I will narrow the question"], "Narrative"),
        answer("form-cadence-argumentative", "Your Honor, I'll rephrase as a nonargumentative question.", ["ill rephrase as nonargumentative", "I will rephrase"], "Argumentative"),
      ],
    },
    {
      id: "foundation-perception",
      title: "Foundation or Perception",
      answers: [
        answer("form-cadence-foundation", "Your Honor, I'll lay the foundation first.", ["ill lay the foundation", "I will lay foundation"], "Lack of foundation"),
        answer("form-cadence-assumes-facts", "Your Honor, the fact is already in evidence at [identify the testimony or exhibit].", ["the fact is already in evidence", "ill lay the foundation"], "Assumes facts"),
        answer("form-cadence-speculation", "Your Honor, I'm asking only what the witness personally perceived.", ["asking what the witness perceived", "personal perception"], "Speculation"),
        answer("form-cadence-no-personal-knowledge", "Your Honor, the witness perceived this through [sight, hearing, or other sense].", ["the witness personally perceived this", "personal knowledge foundation"], "No personal knowledge"),
      ],
    },
    {
      id: "explain-or-move",
      title: "Explain or Move",
      answers: [
        answer("form-cadence-asked-answered", "Your Honor, this question addresses [new fact] that has not been answered.", ["this has not been answered", "addresses a new fact"], "Asked and answered"),
        answer("form-cadence-beyond-scope", "Your Honor, this concerns [direct testimony or credibility].", ["within scope of direct or credibility", "concerns direct testimony"], "Beyond scope"),
        answer("form-cadence-misstates", "Your Honor, the record reflects [state the testimony accurately].", ["the record reflects", "accurate statement of testimony"], "Misstates evidence"),
        answer("form-cadence-nonresponsive", "Your Honor, I move to strike only the nonresponsive portion.", ["move to strike the nonresponsive portion", "strike as nonresponsive"], "Nonresponsive"),
      ],
    },
  ],
};

const formCannedObjectionsQuestion = {
  id: "form-canned-objections",
  type: "sporcle-grid",
  title: "Making Form Objections",
  prompt:
    "Use the defect as the clue and recite a concise objection suitable for the examination.",
  columns: [
    {
      id: "question-form-objections",
      title: "Question Form",
      answers: [
        answer("canned-form-leading", "Objection, leading.", ["leading"], "Suggests the answer"),
        answer("canned-form-compound", "Objection, compound question.", ["compound"], "Multiple questions"),
        answer("canned-form-vague", "Objection, vague and ambiguous.", ["vague", "ambiguous"], "Unclear term"),
        answer("canned-form-narrative", "Objection, calls for a narrative.", ["narrative"], "Overbroad account"),
        answer("canned-form-argumentative", "Objection, argumentative.", ["argumentative"], "Argues with witness"),
      ],
    },
    {
      id: "foundation-perception-objections",
      title: "Foundation & Perception",
      answers: [
        answer("canned-form-foundation", "Objection, lack of foundation.", ["foundation"], "Missing predicate"),
        answer("canned-form-assumes", "Objection, assumes facts not in evidence.", ["assumes facts"], "Unproved premise"),
        answer("canned-form-speculation", "Objection, calls for speculation.", ["speculation"], "Guess required"),
        answer("canned-form-personal-knowledge", "Objection, lack of personal knowledge.", ["no personal knowledge"], "No perception"),
      ],
    },
    {
      id: "record-scope-objections",
      title: "Record & Scope",
      answers: [
        answer("canned-form-asked-answered", "Objection, asked and answered.", ["asked and answered"], "Repeated question"),
        answer("canned-form-beyond-scope", "Objection, beyond the scope of direct examination.", ["beyond scope"], "Cross exceeds direct"),
        answer("canned-form-misstates", "Objection, misstates the evidence.", ["misstates evidence"], "Inaccurate premise"),
        answer("canned-form-nonresponsive", "Objection, nonresponsive; move to strike.", ["nonresponsive", "move to strike nonresponsive"], "Answer exceeds question"),
      ],
    },
  ],
};

export const courseCatalog = [
  {
    id: "professional-responsibility-mpre",
    title: "Professional Responsibility",
    term: "MPRE",
    subjects: professionalResponsibilitySubjects,
  },
  {
    id: "evidence-fall-2026",
    title: "Evidence",
    term: "Fall 2026",
    subjects: [
      {
        id: "rule-names",
        title: "Rule Names",
        questions: [freRuleNamesQuestion],
      },
      {
        id: "general-provisions",
        title: "General Provisions",
        questions: [
          freRule101Question,
          freRule102Question,
          freRule103Question,
          freRule104Question,
          freRule105Question,
          freRule106Question,
          freRule1101Question,
        ],
      },
      {
        id: "relevance-and-policy-exclusions",
        title: "Relevance & Policy Exclusions",
        questions: [
          freRule401Question,
          freRule402Question,
          freRule403Question,
          ...freRelevanceQuestions,
        ],
      },
      {
        id: "privileges-and-witnesses",
        title: "Privileges & Witnesses",
        questions: frePrivilegesAndWitnessesQuestions,
      },
      {
        id: "opinions-and-hearsay",
        title: "Opinions & Hearsay",
        questions: freOpinionsAndHearsayQuestions,
      },
      {
        id: "authentication-and-contents",
        title: "Authentication & Contents",
        questions: freAuthenticationAndContentsQuestions,
      },
      {
        id: "objections",
        title: "Objections",
        questions: [
          freCannedObjectionsQuestion,
          freObjectionCadencesQuestion,
          formCannedObjectionsQuestion,
          formObjectionCadencesQuestion,
        ],
      },
    ],
  },
  {
    id: "civil-procedure-fall-2026",
    title: "Civil Procedure",
    term: "Fall 2026",
    subjects: [
      {
        id: "dismissals",
        title: "Dismissals",
        questions: [{ ...twoDismissalRule, type: "flowchart" }],
      },
    ],
  },
  {
    id: "torts-fall-2026",
    title: "Torts",
    term: "Fall 2026",
    subjects: [
      {
        id: "negligence",
        title: "Negligence",
        questions: [{ ...negligenceCoreElements, type: "flowchart" }],
      },
    ],
  },
  {
    id: "sales-and-leases-fall-2026",
    title: "Sales & Leases",
    term: "Fall 2026",
    subjects: [
      {
        id: "hybrid-transactions",
        title: "Hybrid Transactions",
        questions: [
          { ...predominantPurposeTest, type: "flowchart" },
          { ...gravamenOfTheAction, type: "flowchart" },
          { ...ucc2022Amendments, type: "flowchart" },
        ],
      },
    ],
  },
  {
    id: "overview-of-florida-law-fall-2026",
    title: "Overview of Florida Law",
    term: "Fall 2026",
    subjects: [
      {
        id: "ucc-3",
        title: "UCC 3",
        questions: [ucc3NegotiableNoteQuestion, ...commercialPaperQuestions],
      },
      {
        id: "ucc-9-secured-transactions",
        title: "UCC 9: Secured Transactions",
        questions: securedTransactionsQuestions,
      },
      {
        id: "florida-civil-procedure",
        title: "Florida Civil Procedure",
        questions: floridaCivilProcedureQuestions,
      },
    ],
  },
  {
    id: "ai-and-law-fall-2026",
    title: "AI and the Law",
    term: "Fall 2026",
    subjects: [
      {
        id: "week-1-thinking-and-consciousness",
        title: "Week 1: Thinking and Consciousness",
        questions: [turingNineArgumentsQuestion, consciousnessFiveViewsQuestion],
      },
      {
        id: "week-2-ai-history",
        title: "Week 2: AI History",
        questions: [aiHistoryTimelineQuestion],
      },
    ],
  },
  {
    id: "trial-advocacy-fall-2026",
    title: "Trial Advocacy",
    term: "Fall 2026",
    subjects: [
      {
        id: "opening-statements",
        title: "Opening Statements",
        questions: [
          openingStatementStructureQuestion,
          openingStatementIntroductionParagraphQuestion,
        ],
      },
      {
        id: "direct-examination",
        title: "Direct Examination",
        questions: [jordanPeytonDirectExaminationQuestion],
      },
    ],
  },
];
