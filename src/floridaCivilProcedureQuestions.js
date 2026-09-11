// Original recall drills organized around the user's Allen handout (2025).
// Chapter/page references refer to FL.Allen.CivilProcedure.pdf, not the linked
// rule compilation. The handout itself is not redistributed with the app.
const rulesUrl = "https://www-media.floridabar.org/uploads/2026/04/Civil-Procedure-Rules-04-01-26.pdf";
const appellateUrl = "https://www-media.floridabar.org/uploads/2026/06/Appellate-Court-Rules-07-01-26.pdf";
const smallClaimsUrl = "https://www-media.floridabar.org/uploads/2026/08/2026_01-JUL-Small-Claims-Rules-7-1-2026-1.pdf";

function column(id, title, rows) {
  return {
    id,
    title,
    answers: rows.map(([key, indicator, answer, ...acceptedAnswers]) => ({
      id: `fl-civpro-${id}-${key}`,
      indicator,
      answer,
      acceptedAnswers,
    })),
  };
}

function drill(id, title, chapter, pages, focus, columns, reference = {}) {
  return {
    id: `fl-civpro-${id}`,
    type: "sporcle-grid",
    clueLayout: "above",
    title: `Florida Civil Procedure: ${title}`,
    prompt: `${focus} Based on FL.Allen.CivilProcedure.pdf, Chapter ${chapter}, pp. ${pages}.`,
    outlineSource: { file: "FL.Allen.CivilProcedure.pdf", chapter, pages },
    sourceUrl: rulesUrl,
    sourceLabel: "Supplemental rule reference: Florida Rules of Civil Procedure (April 2026)",
    ...reference,
    columns,
  };
}

export const floridaCivilProcedureQuestions = [
  drill("jurisdiction", "Courts and Jurisdiction", 1, "1–4",
    "Name the courts and the two checks for jurisdiction over a nonresident.", [
      column("courts", "Court System", [
        ["highest", "Highest state court", "Florida Supreme Court", "supreme court"],
        ["appeals", "Intermediate appellate courts", "District Courts of Appeal", "DCA", "district court of appeal"],
        ["circuit", "Ordinary damages claim above $50,000", "Circuit court", "circuit"],
        ["county", "Ordinary damages claim of $50,000 or less", "County court", "county"],
        ["exclusions", "Excluded from the jurisdictional amount", "Interest, costs, and attorney's fees", "interest costs attorney fees"],
      ]),
      column("jurisdiction", "Power to Hear the Dispute", [
        ["subject", "Power over the category of dispute", "Subject matter jurisdiction", "SMJ"],
        ["property", "Power over property in the litigation", "In rem jurisdiction", "in rem"],
        ["statute", "First check for specific jurisdiction over a nonresident", "Florida long-arm statute", "long arm statute", "long arm"],
        ["constitution", "Constitutional check after statutory authorization", "Due process", "due process clause"],
        ["contacts", "Constitutional connection to the forum", "Minimum contacts", "minimum contacts and fair play"],
      ]),
    ], { sourceUrl: "https://www.flcourts.gov/Florida-Courts/Trial-Courts-Circuit", sourceLabel: "Supplemental reference: Florida Courts — circuit court jurisdiction" }),

  drill("service-and-waiver", "Commencement and Service Waiver", 2, "4–5",
    "Supply the usual Florida deadlines; identify the event that starts each clock.", [
      column("commencement", "Starting the Action", [
        ["filing", "Act that commences the lawsuit", "Filing the complaint", "file complaint", "filing"],
        ["summons", "Paper calling the defendant into court", "Summons"],
        ["service", "Ordinary service limit after filing the initial pleading", "120 days", "120"],
        ["extension", "Showing requiring extension of the service period", "Good cause or excusable neglect", "excusable neglect or good cause"],
      ]),
      column("waiver", "Rule 1.070 Waiver", [
        ["domestic", "Time to return waiver after receiving request in the U.S.", "20 days", "20"],
        ["foreign", "Time to return waiver after receiving request outside the U.S.", "30 days", "30"],
        ["answer", "Answer after receipt of request, if waiver timely returned", "60 days", "60"],
        ["costs", "Consequence of unjustified refusal to waive", "Pay the costs of formal service", "service costs", "costs of service"],
      ]),
    ]),

  drill("formal-service", "Formal Service of Process", 3, "5–8",
    "Distinguish delivery to the defendant, abode service, and constructive service.", [
      column("delivery", "Serving an Individual", [
        ["personal", "Physical delivery directly to the defendant", "Personal service", "personal"],
        ["abode", "Location for ordinary residential substitute delivery", "Usual place of abode", "usual abode", "abode"],
        ["age", "Minimum age of a person receiving abode service", "15 years", "15", "15 years old"],
        ["resident", "Recipient must do this at the defendant's abode", "Reside there", "live there", "reside", "resident"],
        ["explain", "Server must tell the abode recipient this", "The contents of the papers", "contents", "explain the contents"],
      ]),
      column("service-methods", "Other Service Concepts", [
        ["agent", "First service target for a corporation or LLC", "Registered agent"],
        ["publication", "Notice through publication in authorized cases", "Constructive service", "service by publication", "publication"],
        ["statement", "Support for using publication when personal service is unavailable", "Sworn statement", "affidavit"],
      ]),
    ], { sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/48.031", sourceLabel: "Supplemental reference: Florida Statutes § 48.031 — service of process" }),

  drill("venue", "Venue and Forum Non Conveniens", 4, "9–11",
    "Identify the usual venue choices and distinguish transfer from dismissal for a better forum.", [
      column("venue", "Selecting a County", [
        ["local", "Usual venue for an action to quiet title", "County where the property is located", "property location", "where the property is located"],
        ["residence", "Ordinary transitory action: defendant-based venue", "County where the defendant resides", "defendant residence", "where defendant resides"],
        ["accrual", "Ordinary transitory action: claim-based venue", "County where the cause of action accrued", "where the claim accrued", "where cause of action accrued"],
        ["waiver", "Consequence of not timely raising improper venue", "Waiver", "waived"],
      ]),
      column("forum", "Moving the Dispute", [
        ["transfer", "Remedy moving the case to another Florida county", "Transfer of venue", "change of venue", "transfer"],
        ["outside", "Doctrine for a more appropriate forum outside Florida", "Forum non conveniens", "FNC"],
        ["adequate", "Required quality of the alternative forum", "Adequate", "adequate alternative forum"],
        ["interests", "Two groups of convenience factors", "Private and public interests", "private and public interest factors"],
      ]),
    ], { sourceUrl: "https://www.flsenate.gov/Laws/Statutes/2026/47.011", sourceLabel: "Supplemental reference: Florida Statutes § 47.011 — venue" }),

  drill("pleadings", "Pleadings and Claims for Relief", 5, "11–12",
    "Name each pleading and the three parts of a pleading seeking relief.", [
      column("pleading-types", "Opening and Responding", [
        ["complaint", "Plaintiff's initial claim for relief", "Complaint"],
        ["answer", "Defendant's responsive pleading", "Answer"],
        ["reply", "Pleading an avoidance of an affirmative defense", "Reply"],
        ["motion", "Request for a court ruling; not a pleading", "Motion"],
      ]),
      column("claim-content", "Claim Requirements", [
        ["jurisdiction", "Why this court can hear the case, if not already established", "Jurisdictional statement", "statement of jurisdiction", "jurisdiction"],
        ["facts", "Florida pleading standard: state these, not bare legal conclusions", "Ultimate facts", "ultimate fact pleading"],
        ["relief", "What the claimant asks the court to award", "Demand for relief", "demand", "requested relief"],
      ]),
    ]),

  drill("answers-and-amendments", "Answers and Amended Pleadings", 6, "12–15",
    "Fill the response rules and distinguish amendments from supplements.", [
      column("answers", "Responding to Allegations", [
        ["time", "Ordinary answer deadline after formal service", "20 days", "20"],
        ["responses", "Three permitted responses to an allegation", "Admit, deny, or state lack of knowledge", "admit deny lack of knowledge", "admit deny or lack sufficient knowledge"],
        ["silence", "Unanswered allegation when a response is required, except amount of damages", "Admitted", "admission", "deemed admitted"],
        ["defenses", "Defenses that ordinarily must be pleaded to avoid waiver", "Affirmative defenses", "affirmative defense"],
      ]),
      column("amendments", "Changing the Pleadings", [
        ["supplement", "Pleading adding events that occurred after the original pleading", "Supplemental pleading", "supplement"],
        ["right", "One amendment as of right to a complaint: before this is served", "Responsive pleading", "answer"],
        ["permission", "After amendment as of right: two routes", "Written consent or leave of court", "consent or leave of court", "consent or court permission"],
        ["relation", "Doctrine preserving original date for same conduct, transaction, or occurrence", "Relation back", "relate back"],
        ["fraud", "Required specificity for fraud or mistake", "Particularity", "with particularity"],
      ]),
    ]),

  drill("pre-answer-motions", "Pre-Answer Motions and Waiver", 7, "16–17",
    "Recall which defenses expire if omitted from the first permitted response.", [
      column("waivable-defenses", "Raise in First Rule 1.140 Motion, or Answer if None", [
        ["personal", "Objection to power over the defendant", "Lack of personal jurisdiction", "personal jurisdiction"],
        ["venue", "Objection to the county selected", "Improper venue", "venue"],
        ["process", "Objection to the summons itself", "Insufficiency of process", "insufficient process"],
        ["service", "Objection to how process was delivered", "Insufficiency of service of process", "insufficient service", "service of process"],
      ]),
      column("preserved-defenses", "Longer-Lived Defenses and Other Motions", [
        ["claim", "Legal sufficiency defense that can still be raised at trial", "Failure to state a cause of action", "failure to state a claim"],
        ["party", "Missing-party defense that can still be raised at trial", "Failure to join an indispensable party", "indispensable party"],
        ["subject", "Jurisdictional defense that cannot be waived", "Lack of subject matter jurisdiction", "subject matter jurisdiction", "SMJ"],
        ["definite", "Motion when a pleading is too vague to answer", "Motion for a more definite statement", "more definite statement"],
        ["strike", "Motion to remove scandalous or immaterial matter", "Motion to strike", "strike"],
      ]),
    ]),

  drill("counterclaims-and-crossclaims", "Counterclaims and Crossclaims", 8, "18–19",
    "Classify the claim by the relationship between parties and the underlying transaction.", [
      column("counterclaims", "Against an Opposing Party", [
        ["name", "Claim against an existing opposing party", "Counterclaim"],
        ["compulsory", "Same transaction or occurrence, absent a rule exception", "Compulsory counterclaim", "compulsory"],
        ["omitted", "Ordinary consequence of omitting a compulsory counterclaim", "Waiver", "waived", "barred"],
        ["permissive", "Unrelated claim against the opposing party", "Permissive counterclaim", "permissive"],
      ]),
      column("crossclaims", "Against a Co-Party", [
        ["name", "Claim against a co-party", "Crossclaim", "cross claim"],
        ["required", "Are crossclaims compulsory or permissive?", "Permissive", "optional"],
        ["connection", "Usual link to the original action or a counterclaim", "Same transaction or occurrence", "same transaction", "same occurrence"],
      ]),
    ]),

  drill("parties", "Capacity and Required Parties", 9, "19–21",
    "Identify party status and what happens when an essential party cannot be joined.", [
      column("party-capacity", "Who May Litigate", [
        ["capacity", "Legal ability to sue or be sued", "Capacity"],
        ["minor", "Minor without a duly appointed representative may sue through this person", "Next friend or guardian ad litem", "next friend", "guardian ad litem"],
        ["trustee", "Express-trust representative permitted to sue in own name", "Trustee", "trustee of an express trust"],
        ["substitute", "Procedure replacing a party after death when the claim survives", "Substitution", "substitution of parties"],
      ]),
      column("required-parties", "Necessary and Indispensable Parties", [
        ["necessary", "Party whose material interest may be affected", "Necessary party", "necessary"],
        ["indispensable", "Party without whom the action cannot fairly proceed", "Indispensable party", "indispensable"],
        ["dismissal", "Effect if an indispensable party cannot be joined", "Dismissal without prejudice", "without prejudice"],
      ]),
    ]),

  drill("intervention-and-impleader", "Intervention, Interpleader, and Impleader", 10, "21–23",
    "Distinguish these similar names by who enters the lawsuit and why.", [
      column("joining", "Entry into an Existing Dispute", [
        ["intervention", "An outsider seeks to enter to protect an interest", "Intervention"],
        ["discretion", "Trial court's authority over whether to allow intervention", "Discretion", "judicial discretion"],
        ["interpleader", "Stakeholder joins rival claimants to the same fund", "Interpleader"],
        ["stakeholder", "Holds disputed property and wants to avoid paying twice", "Stakeholder", "disinterested stakeholder"],
      ]),
      column("impleader", "Third-Party Practice", [
        ["name", "Defending party brings in a person liable over to it", "Impleader", "third party practice"],
        ["basis", "Required relationship to the original defendant's liability", "Derivative liability", "indemnity or contribution"],
        ["time", "After serving original answer: window to implead without leave", "20 days", "20"],
        ["later", "Required after the no-leave window expires", "Leave of court", "court permission"],
      ]),
    ]),

  drill("class-actions", "Class Actions", 11, "23–26",
    "Recall the four class prerequisites and the extra requirements for a damages class.", [
      column("class-prerequisites", "Every Class", [
        ["numerosity", "Too many members for practical joinder", "Numerosity"],
        ["commonality", "Shared question of law or fact", "Commonality"],
        ["typicality", "Representative's claim resembles members' claims", "Typicality"],
        ["adequacy", "Fair protection of members' interests", "Adequacy of representation", "adequacy", "adequate representation"],
      ]),
      column("class-types", "Certification and Settlement", [
        ["predominance", "Rule 1.220(b)(3): common issues outweigh individual ones", "Predominance", "predominate"],
        ["superiority", "Rule 1.220(b)(3): class procedure is the best adjudication method", "Superiority", "superior"],
        ["injunction", "Rule 1.220(b)(2): typical class-wide relief", "Injunctive or declaratory relief", "injunction or declaratory judgment"],
        ["settlement", "Needed to settle or dismiss a certified class action", "Court approval", "court permission"],
      ]),
    ]),

  drill("initial-disclosures", "Initial Discovery Disclosures", 12, "26–27",
    "Recall the default disclosures and timing. Current Rule 1.280 exempts noneconomic damages from computation, but still requires categories and supporting documents.", [
      column("disclosures", "What to Disclose Without a Request", [
        ["witnesses", "People with information you may use to support claims or defenses", "Witness identities and contact information", "witnesses", "witness information"],
        ["documents", "Supporting records and things: copies or category/location descriptions", "Documents, ESI, and tangible things", "documents and ESI", "documents"],
        ["damages", "Economic damages: numbers by category with supporting materials", "Damages computations", "computation of damages", "damages"],
        ["insurance", "Agreements potentially covering a judgment", "Insurance policies", "insurance agreements", "insurance"],
      ]),
      column("disclosure-timing", "Timing and Exceptions", [
        ["deadline", "Default period after service of complaint or joinder", "60 days", "60"],
        ["impeachment", "Sole use that exempts supporting witnesses and documents", "Impeachment", "solely for impeachment"],
        ["prerequisite", "Before seeking discovery, ordinarily satisfy these obligations", "Own initial disclosures", "initial disclosures", "initial disclosure obligations"],
      ]),
    ]),

  drill("discovery-scope", "Discovery Scope and Protection", 13, "27–29",
    "Identify the scope limits and the protections for litigation preparation.", [
      column("scope", "Discoverability", [
        ["relevant", "Information must relate to a party's claim or defense", "Relevant", "relevance"],
        ["proportional", "Discovery must fit the needs of the case", "Proportional", "proportionality"],
        ["privilege", "Protected matter excluded from ordinary discovery", "Privileged matter", "privilege", "privileged"],
        ["admissibility", "Must otherwise discoverable information be admissible at trial?", "No", "not necessarily"],
      ]),
      column("work-product", "Trial Preparation and Experts", [
        ["material", "Materials prepared in anticipation of litigation or for trial", "Work product", "trial preparation materials"],
        ["hardship", "With need shown, obstacle to obtaining the substantial equivalent", "Undue hardship"],
        ["opinion", "Mental impressions and legal theories protected on ordered production", "Opinion work product"],
        ["expert", "Usual showing to discover a retained, nontestifying expert's opinions", "Exceptional circumstances"],
        ["order", "Court mechanism to limit oppressive discovery", "Protective order"],
      ]),
    ]),

  drill("depositions", "Depositions", 14, "29–31",
    "Recall how to compel attendance and when a witness may be instructed not to answer.", [
      column("deposition-attendance", "Taking Testimony", [
        ["party", "Ordinary mechanism to schedule a party's deposition", "Notice of deposition", "deposition notice"],
        ["nonparty", "Compulsory attendance mechanism for a nonparty", "Subpoena"],
        ["corporation", "Organizational notice must describe these with reasonable particularity", "Matters for examination", "topics", "topics for examination"],
        ["oath", "Witness must testify under this", "Oath"],
      ]),
      column("deposition-objections", "Objections and Instructions", [
        ["cure", "Failure to object ordinarily waives defects that could be…", "Cured", "corrected", "cured at the deposition"],
        ["privilege", "May direct no answer to preserve this protection", "Privilege", "a privilege"],
        ["limitation", "May direct no answer to enforce this existing restriction", "Court-ordered limitation", "court order"],
        ["motion", "May direct no answer to present this motion", "Motion to terminate or limit the deposition", "terminate or limit deposition", "motion to limit or terminate"],
      ]),
    ]),

  drill("discovery-devices", "Discovery Devices and Disputes", 15, "31–34",
    "Use Florida's ordinary limits; a court order may alter deadlines or permit additional requests.", [
      column("written-discovery", "Written Discovery", [
        ["interrogatories", "Written questions answered under oath by a party", "Interrogatories"],
        ["limit", "Interrogatory limit, including subparts, absent leave", "30", "30 interrogatories"],
        ["response", "Ordinary interrogatory response period after service", "30 days", "30"],
        ["initial", "Defendant need not answer interrogatories before this period after process/initial pleading", "45 days", "45"],
        ["admissions", "Device conclusively establishing a matter unless withdrawn or amended", "Request for admissions", "requests for admission", "admissions"],
        ["admission-limit", "Admission-request limit including subparts, absent leave or stipulation", "30", "30 requests"],
      ]),
      column("discovery-enforcement", "Examinations and Enforcement", [
        ["condition", "Condition for a compelled examination must be…", "In controversy", "in dispute"],
        ["cause", "Additional showing required for an examination", "Good cause"],
        ["compel", "Motion seeking an order requiring discovery compliance", "Motion to compel", "compel"],
        ["esi", "State of mind for adverse-inference sanctions for lost ESI", "Intent to deprive", "intent to deprive another party of the information"],
      ]),
    ]),

  drill("case-management", "Case Management", 16, "34–38",
    "Recall the tracks and court-controlled deadlines for nonexempt civil cases.", [
      column("tracks", "Three Case Tracks", [
        ["complex", "Extensive judicial management needed", "Complex"],
        ["streamlined", "Limited discovery, established law, and a short trial", "Streamlined"],
        ["general", "Neither of the other two tracks", "General"],
        ["assignment", "Track assignment deadline after commencement", "120 days", "120"],
      ]),
      column("management-orders", "Case Management Orders", [
        ["issuance", "General/streamlined CMO deadline after commencement", "120 days", "120"],
        ["enforcement", "How CMO deadlines are enforced", "Strictly", "strict enforcement"],
        ["changes", "Standard for extending deadlines or changing tracks", "Good cause"],
        ["unavailability", "Does a notice of unavailability change CMO deadlines?", "No"],
      ]),
    ]),

  drill("defaults-and-dismissals", "Defaults and Dismissals", 17, "38–41",
    "Distinguish entry of default from judgment and identify dismissal consequences.", [
      column("defaults", "Default and Judgment", [
        ["clerk", "May enter default if defendant has filed or served no paper", "Clerk", "clerk of court"],
        ["court", "Enters default judgment", "Court", "judge"],
        ["damages", "Must still be proved when not liquidated", "Damages", "unliquidated damages"],
      ]),
      column("dismissals", "Dismissal Rules", [
        ["first", "Usual effect of first voluntary notice of dismissal", "Without prejudice"],
        ["second", "Second notice dismissing the same claim after prior dismissal: effect", "Adjudication on the merits", "with prejudice", "two dismissal rule"],
        ["inactivity", "No record activity: period triggering failure-to-prosecute notice", "10 months", "10"],
        ["grace", "Period after that notice to resume record activity or obtain a stay", "60 days", "60"],
        ["good-cause", "Written good-cause showing due at least this long before dismissal hearing", "5 days", "5"],
        ["prosecution", "Effect of dismissal for failure to prosecute", "Without prejudice"],
      ]),
    ]),

  drill("summary-judgment", "Summary Judgment and Settlement", 18, "41–45",
    "Use Rule 1.510's current timing: the movant serves factual support with the motion. This clarifies the handout's blank on p. 42.", [
      column("summary-judgment", "Rule 1.510", [
        ["standard", "No genuine dispute of this kind of fact", "Material", "material fact"],
        ["entitlement", "Movant must also be entitled to judgment as a matter of…", "Law"],
        ["start", "Ordinary earliest motion: after expiration of this period from commencement", "20 days", "20"],
        ["support", "When movant must serve supporting factual position", "When filing the motion", "with the motion", "at filing", "same time"],
        ["response", "Nonmovant's response deadline after service of the motion", "40 days", "40"],
        ["hearing", "Usual minimum gap after response deadline before hearing", "10 days", "10"],
      ]),
      column("settlement", "Other Ways to Resolve a Case", [
        ["mediation", "Neutral facilitates agreement without imposing a result", "Mediation"],
        ["arbitration", "Neutral hears the dispute and renders a decision", "Arbitration"],
        ["limine", "Pretrial motion to address admissibility outside the jury's presence", "Motion in limine", "in limine"],
        ["proposal", "Formal settlement offer governed by Rule 1.442", "Proposal for settlement", "offer of judgment", "offer and demand for judgment"],
      ]),
    ]),

  drill("trial", "Jury Trial and Directed Verdict", 19, "45–48",
    "Recall jury-demand timing, selection, and the motions testing the sufficiency of proof.", [
      column("jury", "Demand and Selection", [
        ["demand", "Jury demand: no later than this long after last pleading on the issue", "10 days", "10"],
        ["venire", "Pool of potential jurors", "Venire", "jury pool"],
        ["voir-dire", "Questioning prospective jurors", "Voir dire"],
        ["peremptory", "Ordinary peremptory challenges per party, subject to multiparty rules", "3", "three"],
        ["cause", "Numerical limit on challenges for cause", "Unlimited", "no limit"],
      ]),
      column("trial-motions", "Testing the Proof", [
        ["directed", "Jury trial motion when no reasonable jury could find for opponent", "Motion for directed verdict", "directed verdict"],
        ["preserve", "Prior motion required before seeking judgment according to it after verdict", "Motion for directed verdict", "directed verdict motion"],
        ["renewal", "Period after verdict to renew the directed-verdict request", "15 days", "15"],
        ["bench", "Bench-trial counterpart after claimant completes evidence", "Motion for involuntary dismissal", "involuntary dismissal"],
      ]),
    ]),

  drill("post-trial", "Post-Trial Motions", 20, "48–49",
    "Match the remedy to the error and recall its time limit.", [
      column("new-trial", "Verdict and Damages", [
        ["time", "Serve new-trial motion after jury verdict (or judgment filing in nonjury case)", "15 days", "15"],
        ["remittitur", "Reduce an excessive damages award", "Remittitur"],
        ["additur", "Increase an inadequate damages award", "Additur"],
        ["election", "Alternative for party adversely affected by remittitur or additur", "New trial on damages", "new trial on damages only", "damages trial"],
      ]),
      column("judgment-relief", "Rule 1.540 Relief", [
        ["clerical", "Error such as a transcription or arithmetic oversight", "Clerical error", "clerical mistake"],
        ["fraud", "Opposing-party deception as a ground for relief", "Fraud", "fraud or misrepresentation"],
        ["void", "Judgment lacking legal validity", "Void judgment", "void"],
        ["reasonable", "General timing standard for a relief motion", "Reasonable time", "within a reasonable time"],
        ["year", "Outer limit for mistake, newly discovered evidence, or fraud relief", "1 year", "one year", "12 months"],
      ]),
    ]),

  drill("appeals-and-execution", "Appeals and Execution", 21, "49–52",
    "Recall the ordinary final-order appeal process. Only authorized, timely motions toll rendition; a Rule 1.540 motion does not automatically do so.", [
      column("appeals", "Appellate Review", [
        ["final", "Usual prerequisite to an appeal as of right", "Final judgment", "final order"],
        ["notice", "Notice-of-appeal deadline after rendition of reviewable order", "30 days", "30"],
        ["filing", "Where the ordinary final-order notice of appeal is filed", "Lower tribunal", "trial court", "clerk of the lower tribunal"],
        ["certiorari", "Discretionary writ for qualifying nonfinal error and irreparable harm", "Certiorari", "writ of certiorari"],
      ]),
      column("execution", "Collecting a Judgment", [
        ["automatic", "Does filing an ordinary appeal alone stay collection?", "No"],
        ["bond", "Security generally used for an automatic money-judgment stay", "Supersedeas bond", "bond", "appeal bond"],
        ["possession", "Writ to recover real property", "Writ of possession", "possession"],
        ["replevin", "Writ to recover personal property", "Writ of replevin", "replevin"],
        ["assets", "Postjudgment discovery locates these", "Debtor's assets", "assets", "judgment debtor assets"],
      ]),
    ], { sourceUrl: appellateUrl, sourceLabel: "Supplemental reference: Florida Rules of Appellate Procedure (July 2026)" }),

  drill("small-claims", "Small Claims and Public Records", 22, "52–54",
    "Recall the small-claims framework and the presumption for judicial records.", [
      column("small-claims", "Small Claims Procedure", [
        ["limit", "Maximum claim value, excluding costs, interest, and attorney fees", "$8,000", "8000", "8,000"],
        ["court", "Court hearing small claims", "County court", "county"],
        ["claim", "Short initial pleading used instead of a formal complaint", "Statement of claim"],
        ["notice", "Paper served with the statement of claim", "Summons/notice to appear", "notice to appear", "summons"],
        ["answer", "Is an answer ordinarily required before the pretrial conference?", "No"],
        ["pretrial", "Usual pretrial-conference limit after filing", "50 days", "50"],
      ]),
      column("judicial-records", "Judicial Records", [
        ["presumption", "General presumption for access to court records", "Open to the public", "public access", "open", "public"],
        ["exception", "Court order that can protect otherwise public material", "Protective order"],
      ]),
    ], { sourceUrl: smallClaimsUrl, sourceLabel: "Supplemental reference: Florida Small Claims Rules (July 2026)" }),

  drill("remedies", "Damages and Equitable Remedies", 23, "54–55",
    "Distinguish the remedies and recall the special showing for an injunction without notice.", [
      column("remedies", "Choosing Relief", [
        ["compensatory", "Money intended to repair the plaintiff's loss", "Compensatory damages", "compensatory"],
        ["punitive", "Damages intended to punish and deter", "Punitive damages", "punitive"],
        ["injunction", "Order commanding or prohibiting conduct", "Injunction"],
        ["declaration", "Judicial determination of rights in an actual controversy", "Declaratory judgment", "declaratory relief"],
        ["garnishment", "Reach a debt owed to the judgment debtor by a third person", "Garnishment", "writ of garnishment"],
      ]),
      column("temporary-injunction", "Temporary Injunction Without Notice", [
        ["facts", "Affidavit or verified complaint must show immediate injury of this kind", "Irreparable", "irreparable injury", "irreparable harm"],
        ["certification", "Attorney must certify notice efforts and reasons notice is unnecessary in this form", "Writing", "in writing", "written certification"],
        ["security", "Security generally required for temporary injunction, subject to exceptions", "Bond", "injunction bond"],
      ]),
    ]),
];
