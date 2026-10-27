// One complete legal list per question. List members keep their statutory or
// rule grouping; aliases are recall labels, with qualifications preserved below.
// Verified October 23, 2026 against the official sources linked by each drill.
const civilRulesUrl = "https://www-media.floridabar.org/uploads/2026/10/Civil-Procedure-Rules-10-01-26-1.pdf";
const disclosureAmendmentUrl = "https://flcourts-media.ccplatform.net/content/download/2496486/opinion/Opinion_SC2025-1497.pdf";

function item(listId, key, answer, acceptedAnswers, explanation) {
  return {
    id: `fl-lists-${listId}-${key}`,
    answer,
    acceptedAnswers,
    ...(explanation ? { explanation } : {}),
  };
}

function civilList(id, title, prompt, columnTitle, answers, chapter, pages, rule, listExplanation) {
  return {
    id: `fl-lists-${id}`,
    subjectId: "florida-civil-procedure",
    type: "sporcle-grid",
    recallMode: "list",
    answerMatching: "column",
    answerLayout: "stacked",
    title,
    prompt,
    sourceUrl: civilRulesUrl,
    sourceLabel: `Florida Rule of Civil Procedure ${rule} — October 1, 2026 compilation`,
    courseSources: [
      `FL.Allen.CivilProcedure.pdf — Chapter ${chapter}, pp. ${pages}.`,
      `Official reference: Florida Rule of Civil Procedure ${rule}. Verified October 23, 2026.`,
    ],
    listExplanation,
    columns: [{ id: `fl-lists-${id}-items`, title: columnTitle, answers }],
  };
}

export const overviewListsCivilAndBusinessQuestions = [
  civilList(
    "claim-for-relief",
    "Claims for Relief: Three Required Parts",
    "Recall the three required parts of a pleading claiming relief under Florida Rule 1.110(b).",
    "Required Parts",
    [
      item("claim-for-relief", "jurisdiction", "Short, plain statement of the grounds for the court's jurisdiction", [
        "jurisdictional statement",
        "statement of jurisdiction",
        "grounds for jurisdiction",
      ], "Omit a new jurisdictional statement only when the court already has jurisdiction and the claim needs no new jurisdictional grounds."),
      item("claim-for-relief", "ultimate-facts", "Short, plain statement of ultimate facts showing entitlement to relief", [
        "ultimate facts",
        "statement of ultimate facts",
        "ultimate facts showing entitlement to relief",
      ]),
      item("claim-for-relief", "demand", "Demand for judgment granting the relief claimed", [
        "demand for judgment",
        "demand for relief",
        "prayer for relief",
      ]),
    ],
    5,
    "11–12",
    "1.110(b)",
    "The pleading must state a cause of action. These three parts apply to original claims, counterclaims, crossclaims, and third-party claims. A new jurisdictional statement is unnecessary only if jurisdiction already exists and the claim requires no new grounds. Alternative or different types of relief may be demanded; every complaint is treated as requesting general relief.",
  ),
  civilList(
    "class-prerequisites",
    "Class Actions: Four Prerequisites",
    "Recall the four prerequisites to class representation under Florida Rule 1.220(a).",
    "Prerequisites",
    [
      item("class-prerequisites", "numerosity", "Numerosity", [
        "impracticability of joinder",
        "joinder impracticable",
      ], "The class is large enough that separately joining every member is impracticable."),
      item("class-prerequisites", "commonality", "Commonality", [
        "common questions of law or fact",
        "common question of law or fact",
      ], "The representative's claim or defense raises legal or factual questions common to those raised by each class member's claim or defense."),
      item("class-prerequisites", "typicality", "Typicality", [
        "typical claims or defenses",
        "typical claim or defense",
      ], "The representative's claim or defense is typical of each class member's claim or defense."),
      item("class-prerequisites", "adequacy", "Adequacy of representation", [
        "adequacy",
        "adequate representation",
        "fair and adequate representation",
      ], "The representative can fairly and adequately protect and represent each class member's interests."),
    ],
    11,
    "23–26",
    "1.220(a)",
    "All four prerequisites are required. They do not alone establish that a class action may proceed: the court must also find a basis under Rule 1.220(b). Predominance and superiority belong to the separate subdivision (b)(3) route rather than this four-item list.",
  ),
  {
    ...civilList(
      "initial-disclosures",
      "Initial Disclosures: Four Categories",
      "Recall the four initial disclosure categories under Florida Rule 1.280(a)(1), as effective October 23, 2026.",
      "Disclosure Categories",
      [
        item("initial-disclosures", "individuals", "Individuals with discoverable information, their contact details, and information subjects", [
          "witness information",
          "witness identities and contact information",
          "individuals with discoverable information",
        ], "Identify each individual likely to have discoverable information that the party may use to support a claim or defense, and the subjects of the information. Give the name and, if known, address, telephone number, and email address. Solely impeachment use is excluded."),
        item("initial-disclosures", "records", "Supporting documents, electronically stored information, and tangible things", [
          "documents ESI and tangible things",
          "documents electronically stored information and tangible things",
          "supporting records",
          "supporting records and things",
        ], "For material the party may use to support claims or defenses, provide copies OR descriptions by category and location when in the party's possession, custody, or control. When outside that possession, custody, or control, provide category-and-location descriptions. Solely impeachment use is excluded."),
        item("initial-disclosures", "damages", "Damages categories, required computations, and supporting materials", [
          "damages disclosures",
          "damages computations",
          "damages computations and supporting documents",
          "damages categories computations and supporting materials",
        ], "Provide a computation for each claimed damages category and copies of the nonprivileged, unprotected materials underlying it, including materials about the nature and extent of injuries. Noneconomic damages need no computation, but their categories and supporting documents must still be disclosed under the rule effective on the verification date."),
        item("initial-disclosures", "insurance", "Insurance policies or agreements potentially covering the judgment", [
          "insurance policies or agreements",
          "insurance policies",
          "insurance agreements",
          "insurance coverage",
        ], "Provide a copy of each policy or agreement under which an insurance business may pay all or part of a possible judgment, or indemnify or reimburse payments satisfying it."),
      ],
      12,
      "26–27",
      "1.280(a)(1)",
      "These four categories are disclosed without awaiting a request, subject to privilege or protection, exempt proceedings under Rule 1.280(a)(2), and court orders. The ordinary deadline is 60 days after service of the complaint or joinder unless the court sets another time. The October 8, 2026 amendment in SC2025-1497 takes effect January 1, 2027; it changes the damages-support procedure to availability for inspection and copying under Rule 1.350. This drill retains the rule effective October 23, 2026.",
    ),
    courseSources: [
      "FL.Allen.CivilProcedure.pdf — Chapter 12, pp. 26–27.",
      "Official reference: Florida Rule of Civil Procedure 1.280(a)(1)–(4), October 1, 2026 compilation. Verified October 23, 2026.",
      `Future amendment: SC2025-1497, October 8, 2026, effective January 1, 2027 — ${disclosureAmendmentUrl}`,
    ],
  },
  civilList(
    "waivable-defenses",
    "Pre-Answer Defenses: Four Subject to Early Waiver",
    "Recall the four Rule 1.140(b) defenses subject to early waiver under Florida Rule 1.140(g)–(h).",
    "Defenses",
    [
      item("waivable-defenses", "personal-jurisdiction", "Lack of personal jurisdiction", [
        "lack of jurisdiction over the person",
        "no personal jurisdiction",
        "personal jurisdiction",
      ]),
      item("waivable-defenses", "venue", "Improper venue", [
        "incorrect venue",
        "wrong venue",
      ]),
      item("waivable-defenses", "process", "Insufficiency of process", [
        "insufficient process",
        "defective process",
      ], "This challenges the process itself, such as a defective summons."),
      item("waivable-defenses", "service", "Insufficiency of service of process", [
        "insufficient service of process",
        "insufficient service",
        "defective service of process",
      ], "This challenges how process was served, rather than the contents of the process."),
    ],
    7,
    "16–17",
    "1.140(b), (g)–(h)",
    "Raise these defenses when available in the first motion under Rule 1.140, or in the responsive pleading if no such motion is made. A party cannot reserve a then-available omitted defense for a later motion. Rule 1.140(h)(2) separately preserves failure to state a cause of action or legal defense and failure to join an indispensable party through the permitted later stages; subject matter jurisdiction may be raised at any time.",
  ),
  {
    id: "fl-lists-articles-contents",
    subjectId: "florida-business-entities",
    type: "sporcle-grid",
    recallMode: "list",
    answerMatching: "column",
    answerLayout: "stacked",
    title: "Articles of Incorporation: Five Required Groups",
    prompt: "Recall the five required content groups for a Florida business corporation's articles under section 607.0202(1).",
    sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/607.0202",
    sourceLabel: "2026 Florida Statutes § 607.0202(1); related § 607.0501(3)",
    courseSources: [
      "01 Blank Corporations FL Presentation.pdf — PDF pp. 3, 7–10.",
      "01 Blank Corporations FL Outline.pdf — PDF pp. 1–2.",
      "FL.Geis.Corporations.pdf — PDF pp. 1–6.",
      "Official reference: 2026 Florida Statutes §§ 607.0202(1), 607.0401, and 607.0501(3). Verified October 23, 2026.",
    ],
    listExplanation: "The five entries follow the statutory groups in section 607.0202(1)(a)–(e). The registered-office group combines the office's street address AND the agent's name AND written acceptance; each is required. The principal-office group includes the corporation's mailing address if different. Initial director names and addresses are optional under subsection (2), rather than another required group.",
    columns: [{
      id: "fl-lists-articles-contents-items",
      title: "Required Content Groups",
      answers: [
        item("articles-contents", "name", "Corporate name satisfying section 607.0401", [
          "corporate name",
          "corporation name",
          "name of the corporation",
        ]),
        item("articles-contents", "principal-office", "Initial principal office street address and the corporation's mailing address if different", [
          "principal office street address and mailing address if different",
          "principal office address and mailing address if different",
          "principal office and mailing addresses",
        ]),
        item("articles-contents", "shares", "Number of shares authorized for issuance", [
          "number of authorized shares",
          "authorized share count",
          "authorized shares",
        ]),
        item("articles-contents", "registered-office-agent", "Initial registered office street address, registered agent's name, and written acceptance", [
          "registered office agent and written acceptance",
          "registered office address agent name and acceptance",
          "registered office address and registered agent name and written acceptance",
        ], "Keep this statutory group together: the registered agent is named at that registered office and must file written acceptance under section 607.0501(3)."),
        item("articles-contents", "incorporators", "Name and address of each incorporator", [
          "incorporators names and addresses",
          "names and addresses of incorporators",
          "incorporator names and addresses",
        ]),
      ],
    }],
  },
];
