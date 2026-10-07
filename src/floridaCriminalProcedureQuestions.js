// Original recall drills drawn from the user's criminal-procedure course PDFs.
// PDF page references identify the source pages, not the individual slide numbers.
// Current rules control where a course summary is incomplete or outdated.
const rulesUrl = "https://www-media.floridabar.org/uploads/2026/10/2027_04-Oct-Criminal-Procedure-Rules-10-1-2026.pdf";
const notesFile = "Florida Criminal Procedure Slide Notes.pdf";
const outlineFile = "Florida Criminal Procedure Slide Outline.pdf";
const flowersFile = "FL.Flowers.CriminalProcedure.pdf";

function column(id, title, rows) {
  return {
    id,
    title,
    answers: rows.map(([key, indicator, answer, ...extras]) => {
      const details = extras.find((value) => typeof value === "object") || {};
      return {
        id: `fl-crimpro-${id}-${key}`,
        indicator,
        answer,
        acceptedAnswers: extras.filter((value) => typeof value === "string"),
        ...details,
      };
    }),
  };
}

function drill(id, title, pages, focus, columns, rules, clarification) {
  const [notes, outline, flowers] = pages;
  return {
    id: `fl-crimpro-${id}`,
    type: "sporcle-grid",
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    title: `Florida Criminal Procedure: ${title}`,
    prompt: focus,
    sourceUrl: rulesUrl,
    sourceLabel: "Florida Rules of Criminal Procedure — October 1, 2026 compilation",
    courseSources: [
      ...(notes ? [`${notesFile} — PDF pp. ${notes}.`] : []),
      ...(outline ? [`${outlineFile} — PDF pp. ${outline}.`] : []),
      ...(flowers ? [`${flowersFile} — PDF pp. ${flowers}${notes ? " (supplemental course coverage)" : " (Flowers supplement)"}.`] : []),
      `Current-rule reference: ${rules}.`,
      ...(clarification ? [`Current-rule clarification: ${clarification}`] : []),
    ],
    columns,
  };
}

export const floridaCriminalProcedureQuestions = [
  drill("courts-and-process", "Courts and Compelling Appearance", ["1, 3", "1–2", "4–5, 7–8"],
    "Identify the criminal court or process described in each clue.", [
      column("courts", "Criminal Jurisdiction", [
        ["felony", "Trial court for felonies and misdemeanors joined to them", "Circuit court", "circuit"],
        ["misdemeanor", "Trial court for misdemeanors not joined to a felony", "County court", "county"],
        ["death", "Direct appeal of a final judgment imposing death", "Florida Supreme Court", "supreme court"],
        ["district", "Ordinary intermediate criminal appellate court", "District Court of Appeal", "DCA", "district courts of appeal"],
      ]),
      column("process", "Getting the Defendant to Court", [
        ["warrant", "Judicial command authorizing the defendant's arrest", "Arrest warrant", "warrant"],
        ["summons", "Clerk-issued alternative to an arrest warrant for a misdemeanor", "Summons"],
        ["notice", "Officer-issued written appearance order instead of a misdemeanor arrest", "Notice to appear", "NTA"],
        ["capias", "Court-issued process to take an at-large charged defendant into custody", "Capias", "bench warrant"],
      ]),
    ], "Rules 3.120, 3.121, 3.125, 3.130, 3.150; Florida Constitution art. V, §§ 3–6",
    "The slides' court graphic is shorthand. County-court criminal appeals ordinarily go to a district court of appeal, and mandatory Supreme Court review here concerns judgments imposing death."),

  drill("warrants", "Warrant Foundations", ["3", "1–2", "1–3"],
    "Distinguish an arrest warrant from a search warrant and recall the supporting showing.", [
      column("arrest-warrants", "Arrest Warrant", [
        ["standard", "Required showing that the accused committed an offense", "Probable cause", "PC"],
        ["support", "Sworn factual support submitted to the judge", "Affidavit", "sworn affidavit", "sworn complaint"],
        ["signature", "Official who signs the arrest warrant", "Judge", "judicial officer"],
      ]),
      column("search-warrants", "Search Warrant", [
        ["nexus", "Probable cause must connect evidence to the location to be what?", "Searched", "searched location", "searched place"],
        ["place", "The warrant must particularly describe this search location", "Place to be searched", "place", "premises"],
        ["property", "The warrant must particularly describe the things to be what?", "Seized", "property to be seized", "seized property"],
        ["scope", "The object sought limits the permissible scope of this activity", "Search", "the search"],
      ]),
    ], "Rules 3.120–3.121; Florida Constitution art. I, § 12; Florida Statutes §§ 933.04–933.05",
    "The search-warrant column is a separately identified Flowers supplement. Constitutional investigation topics are not substituted for the slide notes' procedural scope."),

  drill("counsel", "Appointed Counsel and Waiver", ["2", "1", "5, 13–14"],
    "Recall when counsel is appointed and what makes self-representation a valid choice.", [
      column("appointment", "Right to Appointed Counsel", [
        ["need", "Financial status required for ordinary state-funded appointment", "Indigent", "indigency"],
        ["punishment", "Appointed-counsel coverage ordinarily includes offenses punishable by this", "Incarceration", "jail", "imprisonment"],
        ["written", "Form of the misdemeanor or ordinance no-incarceration order", "Written", "in writing", "written order"],
        ["notice", "Default minimum time before trial for that no-incarceration order", "15 days", "15", "fifteen days"],
      ]),
      column("waiver", "Waiving Counsel", [
        ["standard", "Three qualities required of a valid waiver", "Knowing, intelligent, and voluntary", "knowingly intelligently voluntarily", "knowing intelligent voluntary"],
        ["inquiry", "Court procedure testing the defendant's informed choice", "Waiver inquiry", "Faretta inquiry", "Faretta hearing", "colloquy"],
        ["illness", "Severe mental illness may prevent competent performance of this role", "Self-representation", "representing oneself", "self representation"],
      ]),
    ], "Rule 3.111(b), (d)",
    "The 15-day notice for a no-incarceration order may be waived. Severe mental illness can prevent competent self-representation even when the defendant is competent to stand trial."),

  drill("first-appearance", "First Appearance", ["3–4", "2", "5"],
    "Recall the first-appearance deadline, record, and advice to the defendant.", [
      column("appearance", "The Hearing", [
        ["time", "Maximum time from arrest to first appearance unless lawfully released", "24 hours", "24", "twenty four hours"],
        ["officer", "The arrested person must be brought before this official", "Judicial officer", "judge"],
        ["remote", "Authorized remote method for the appearance", "Audiovisual device", "electronic audiovisual device", "audio video", "video conference", "videoconference"],
        ["record", "An official record of the proceeding must be made: yes or no?", "Yes", "required"],
      ]),
      column("advice", "Required Advice", [
        ["charges", "Subject of the explanation and copy supplied to the defendant", "Charges", "the charges", "complaint"],
        ["silence", "Right that protects the defendant from having to speak", "Remain silent", "silence", "right to remain silent"],
        ["counsel", "Right to a lawyer of choice or appointment if indigent", "Counsel", "right to counsel", "attorney", "lawyer"],
        ["communication", "Means must be supplied to communicate with counsel, family, or these people", "Friends", "friends or family"],
      ]),
    ], "Rule 3.130(a)–(c)"),

  drill("pretrial-release", "Pretrial Release and Detention", ["4", "2", "5–6"],
    "Recall the release framework and the purposes that release conditions must protect.", [
      column("release", "Release Framework", [
        ["recognizance", "Release based on the defendant's promise to return", "Own recognizance", "ROR", "recognizance", "release on recognizance"],
        ["nonmonetary", "Preferred conditions when adequate and no statutory exception applies", "Nonmonetary", "non monetary", "nonmonetary conditions"],
        ["exception", "Offense category for the proof-evident/presumption-great exception", "Capital or life offense", "capital or life", "capital and life offenses"],
        ["proof", "For that exception, proof must be evident or the presumption must be what?", "Great", "presumption great"],
      ]),
      column("purposes", "What Conditions Must Protect", [
        ["appearance", "Risk that the defendant will not return to court", "Appearance", "appearance at trial", "court appearance"],
        ["safety", "Risk of harm to people in the community", "Community safety", "public safety", "safety"],
        ["integrity", "Risk of obstructing the judicial process", "Judicial integrity", "integrity of the judicial process", "integrity"],
      ]),
    ], "Rules 3.131–3.132; Florida Constitution art. I, § 14; Florida Statutes § 907.041",
    "The slides' release/detention summaries omit current statutory exceptions. A dangerous-crime probable-cause finding bars nonmonetary release at first appearance under § 907.041(5)(b); detention requires the applicable statutory findings and procedure, not merely a listed charge."),

  drill("probable-cause", "Nonadversary Probable Cause", ["5", "2–3", "7"],
    "Supply the custody deadline and the separate request procedure for substantial release restraints.", [
      column("custody-pc", "Defendant in Custody", [
        ["time", "Ordinary maximum time after arrest for a nonadversary determination", "48 hours", "48", "forty eight hours"],
        ["extension", "Length of each permitted extension", "24 hours", "24", "twenty four hours"],
        ["count", "Maximum number of such extensions", "Two", "2"],
        ["showing", "Showing required for either extension", "Extraordinary circumstances", "extraordinary circumstance"],
      ]),
      column("restraints-pc", "Substantial Restraints on Release", [
        ["request", "Request deadline after arrest for a released defendant with significant restraints", "21 days", "21", "twenty one days"],
        ["response", "Court's determination deadline after the motion, or restraints must be removed", "7 days", "7", "seven days"],
        ["prior", "No repeat determination is needed when this has already been judicially found", "Probable cause", "PC"],
        ["prosecution", "Does release for lack of probable cause itself bar prosecution?", "No", "no prosecution bar", "prosecution may continue"],
      ]),
    ], "Rule 3.133(a)",
    "Both 24-hour extensions require extraordinary circumstances. Release addresses restraint of liberty; it does not dismiss the criminal prosecution."),

  drill("preliminary-hearing-and-charges", "Adversary Hearing and Charging Deadline", ["6", "3", "7–8"],
    "Keep the right to an adversary hearing separate from release for failing to file formal charges.", [
      column("adversary", "Adversary Preliminary Hearing", [
        ["time", "Uncharged felony defendant becomes entitled to the hearing after this period", "21 days", "21", "twenty one days"],
        ["standard", "Issue decided at the preliminary hearing", "Probable cause", "PC"],
        ["witnesses", "Unlike a nonadversary determination, these may be summoned and examined", "Witnesses", "witness testimony"],
      ]),
      column("charging-deadline", "Uncharged Defendant in Custody", [
        ["charge", "Ordinary deadline after arrest for the state to file formal charges", "30 days", "30", "thirty days"],
        ["release", "Automatic release day after the day-30 notice, absent charges or good cause", "33rd day", "33", "33 days", "day 33"],
        ["extension", "Final release day when the state establishes good cause for delay", "40th day", "40", "40 days", "day 40"],
        ["remedy", "Failure to charge within that custody limit produces release on this basis", "Own recognizance", "ROR", "recognizance"],
      ]),
    ], "Rules 3.133(b), 3.134",
    "Entitlement to the felony adversary hearing does not depend on remaining in custody. The 30/33/40-day rule concerns custody release, not dismissal of the case."),

  drill("charging-documents", "Indictments and Informations", ["7", "3–4", "7–9"],
    "Distinguish the charging instruments and the officials responsible for them.", [
      column("instruments", "Formal Charges", [
        ["indictment", "Charging instrument returned by a grand jury", "Indictment"],
        ["information", "Charging instrument filed by the prosecutor", "Information"],
        ["capital", "Instrument required to prosecute a capital offense", "Indictment"],
        ["prosecutor", "Official who signs the information under oath", "State attorney", "prosecutor", "prosecuting attorney"],
      ]),
      column("formalities", "Instrument Requirements", [
        ["foreperson", "Grand-jury official who signs the indictment", "Foreperson", "foreman", "grand jury foreperson", "grand jury foreman"],
        ["witness", "Felony information requires receipt of sworn testimony from at least one of these", "Material witness", "one material witness"],
        ["facts", "Each count must allege these facts establishing the offense", "Essential facts", "essential elements", "facts constituting the offense"],
      ]),
    ], "Rule 3.140(a), (d), (g)"),

  drill("charging-sufficiency", "Charging Sufficiency and Particulars", ["7", "4", "7–9"],
    "Recall how a charging document gives notice and when a defect matters.", [
      column("notice", "Notice of the Offense", [
        ["nature", "Required style of the written facts: plain, concise, and this", "Definite", "definite statement"],
        ["law", "Each count should cite the law allegedly what?", "Violated", "law violated", "statute violated"],
        ["time-place", "Two event details stated as definitely as possible", "Time and place", "place and time"],
      ]),
      column("defects", "Curing or Challenging Vagueness", [
        ["preparation", "Material vagueness matters if it embarrasses preparation of this", "Defense", "the defense"],
        ["repeat", "Material vagueness also matters if it creates risk of this after acquittal", "Double jeopardy", "repeat prosecution", "prosecution for the same offense"],
        ["particulars", "Court-ordered detail when the charge is too indefinite to prepare a defense", "Statement of particulars", "bill of particulars", "particulars"],
      ]),
    ], "Rule 3.140(d), (n), (o)"),

  drill("pleas", "Arraignment, Pleas, and Agreements", ["8–9", "4–5", "8–9"],
    "Identify the available pleas and the findings needed to accept a negotiated plea.", [
      column("plea-types", "At Arraignment", [
        ["admission", "Plea admitting the offense", "Guilty", "guilty plea"],
        ["contest", "Plea putting the state to its proof", "Not guilty", "not guilty plea"],
        ["no-contest", "Plea declining to contest without expressly admitting guilt", "Nolo contendere", "no contest", "nolo"],
        ["mute", "Plea entered by the court if the defendant stands mute", "Not guilty", "not guilty plea"],
        ["written", "Form in which counsel may file a not-guilty plea instead of personal arraignment", "Written", "in writing", "written plea"],
        ["presence", "Default requirement for defendant entering guilty/no-contest plea, subject to authorized exceptions", "Presence", "defendant's presence", "defendant present", "personal presence", "present"],
      ]),
      column("acceptance", "Accepting the Plea", [
        ["choice", "The plea must be entered freely: what quality is required?", "Voluntary", "voluntarily", "voluntariness"],
        ["understanding", "Besides voluntariness, the defendant must have this comprehension of the plea's significance", "Understanding", "understand", "understanding the plea", "understands the plea"],
        ["basis", "The court must find this factual support for the plea", "Factual basis", "basis in fact"],
        ["record", "Plea-agreement conditions must be placed here in open court", "Record", "the record", "on the record"],
      ]),
    ], "Rules 3.160, 3.170, 3.171, 3.172, 3.180"),

  drill("dismissal", "Motions to Dismiss", ["8", "5", "9"],
    "Use the current court-set filing deadline and distinguish an undisputed-facts motion from the state's response.", [
      column("dismissal-timing", "Timing and Character", [
        ["deadline", "Ordinary motion filing must precede this current deadline", "Court-set deadline", "court set deadline", "deadline set by the court", "deadline set by court", "court deadline", { explanation: "Current Rule 3.190(c) uses the deadline specified by the court. The sources' arraignment deadline is superseded; good cause may permit later filing, and sufficiently fundamental grounds may be raised at any time." }],
        ["legal", "A dismissal motion ordinarily raises this kind of defense", "Legal", "legal defense", "legal defenses"],
        ["cause", "The court may permit later filing for this adequate justification", "Good cause", "good cause shown"],
        ["fundamental", "A ground may be raised at any time if it is this essential kind", "Fundamental", "fundamental ground", "fundamental grounds"],
      ]),
      column("undisputed-facts", "Undisputed Facts and the State's Response", [
        ["undisputed", "An undisputed-facts dismissal motion requires no material facts of this kind", "Disputed", "material disputed facts", "disputed facts"],
        ["prima-facie", "Undisputed facts must fail to establish this initial showing of guilt", "Prima facie case", "prima facie", "prima facie case of guilt"],
        ["traverse", "State's sworn response specifically disputing material facts", "Traverse", "sworn traverse"],
      ]),
    ], "Rule 3.190(b)–(d)",
    "The sources' at-or-before-arraignment deadline and blanket anytime list are superseded. Current Rule 3.190(c) uses the court-set deadline, permits later filing for good cause, and preserves sufficiently fundamental grounds. A sworn traverse specifically disputing material facts defeats an undisputed-facts motion."),

  drill("suppression-and-venue", "Suppression, Limine, and Venue", [null, null, "9–10"],
    "Use this Flowers supplement to distinguish evidence motions and venue requirements.", [
      column("evidence-motions", "Different Evidence Challenges", [
        ["suppress", "Motion excluding evidence obtained through a constitutional violation", "Motion to suppress", "suppress", "suppression"],
        ["limine", "Pretrial motion resolving an evidentiary admissibility issue", "Motion in limine", "in limine", "limine"],
        ["timing", "Ordinary time to move to suppress, absent an applicable exception", "Before trial", "pretrial", "prior to trial"],
      ]),
      column("venue", "Change of Venue", [
        ["county", "Ordinary trial county is where the offense was what?", "Committed", "county of the offense", "offense committed"],
        ["deadline", "Default minimum lead time for a change-of-venue motion", "10 days", "10", "ten days"],
        ["reason", "Required showing: inability to obtain a fair and this kind of trial", "Impartial", "impartial trial", "fair and impartial"],
        ["support", "Motion support: movant's affidavit plus affidavits of at least this many others", "Two", "2", "two persons"],
      ]),
    ], "Rules 3.190(g), 3.240",
    "This supplemental venue motion addresses the ability to obtain a fair trial in the county; alleged bias of the judge is addressed through judicial disqualification."),

  drill("joinder-and-severance", "Joinder and Severance", [null, null, "8"],
    "Recall when offenses may be tried together and how fairness may require separate trials.", [
      column("joinder", "Combining Charges", [
        ["name", "Putting connected offenses or defendants in the same prosecution", "Joinder", "join"],
        ["episode", "Offenses may be joined when based on the same act or this", "Transaction", "same transaction"],
        ["connected", "Alternatively, offenses may be joined as connected acts or these", "Transactions", "connected transactions", "connected acts or transactions"],
      ]),
      column("severance", "Separating Trials", [
        ["name", "Procedure separating offenses or defendants for trial", "Severance", "sever"],
        ["fairness", "Severance protects a fair determination of each defendant's guilt or this", "Innocence", "innocence of each defendant"],
        ["confession", "A codefendant's statement may require exclusion, effective redaction, or this remedy", "Separate trials", "severance", "severed trials", "separate trial"],
      ]),
    ], "Rules 3.150–3.153",
    "This Flowers supplement uses the current rule's connected-act/transaction standard; merely similar crimes are not automatically joinable."),

  drill("speedy-default", "Speedy Trial Without Demand", ["10", "6", "11"],
    "Use the current formal-charge trigger and distinguish an initial trial from a retrial.", [
      column("ordinary-speedy", "Initial Trial Without Demand", [
        ["misdemeanor", "Ordinary misdemeanor speedy-trial period", "90 days", "90", "ninety days"],
        ["felony", "Ordinary felony speedy-trial period", "175 days", "175", "one hundred seventy five days"],
        ["trigger", "The 90/175-day periods begin when the defendant is this", "Formally charged", "formal charges", "formal charge", "filing formal charges", { explanation: "Current Rule 3.191(a) starts these periods with formal charges. The arrest-based clock in older summaries was changed effective July 1, 2025." }],
      ]),
      column("commencement-retrial", "Commencement and Retrial", [
        ["jury", "Jury trial commences when the panel is sworn for this examination", "Voir dire", "voir dire examination", "jury selection"],
        ["bench", "Bench trial commences when trial proceedings begin before this person", "Judge", "the judge", "court"],
        ["retrial", "Ordinary retrial period following the applicable new-trial or mistrial trigger", "90 days", "90", "ninety days"],
      ]),
    ], "Rule 3.191(a), (c), (m)",
    "Since July 1, 2025, the ordinary 90/175-day clock runs from formal charges, not arrest. The verdict-phase jury oath is not the commencement event for this rule."),

  drill("speedy-demand", "Demand for Speedy Trial", ["9–10", "5–6", "11–12"],
    "Recall the demand's preparation commitment and the court's current scheduling duties.", [
      column("demand", "The Defendant's Demand", [
        ["charges", "A demand may be filed after these are filed", "Formal charges", "formally charged", "charges", "formal charge"],
        ["readiness", "Demand represents that the defendant will be prepared within this period", "5 days", "5", "five days"],
        ["trial", "Demand ordinarily requires trial within this period", "60 days", "60", "sixty days"],
        ["diligence", "The demand represents a bona fide desire for this kind of trial", "Speedy trial", "speedy"],
      ]),
      column("calendar-call", "Court Scheduling After Demand", [
        ["hearing", "Maximum period after demand to hold the calendar call", "5 days", "5", "five days"],
        ["minimum", "Earliest trial setting measured from the demand under current Rule 3.191(b)(2)", "5 days", "5", "five days"],
        ["maximum", "Latest trial setting measured from the demand under current Rule 3.191(b)(2)", "60 days", "60", "sixty days", { explanation: "The October 1, 2026 compilation provides a 5–60-day trial-setting range measured from demand. Older 5–45-day summaries are superseded." }],
      ]),
    ], "Rule 3.191(b), (g)",
    "The October 2026 compilation permits calendar-call trial settings 5–60 days from demand. Older 5–45-day scheduling summaries in the Flowers materials are superseded."),

  drill("speedy-expiration", "Expiration, Recapture, and Dismissal", ["10–11", "6", "11–13"],
    "Recall the steps after speedy time expires and distinguish the rule remedy from a constitutional violation.", [
      column("expiration", "Invoking the Remedy", [
        ["notice", "Document filed only after the applicable speedy period expires", "Notice of expiration", "notice of expiration of speedy trial time", "notice"],
        ["hearing", "Maximum time after filing the notice to hold the expiration hearing", "5 days", "5", "five days"],
        ["recapture", "Current trial recapture period following the hearing order", "30 days", "30", "thirty days"],
      ]),
      column("remedies", "Consequences and Exceptions", [
        ["rule-only", "Default dismissal on motion after recapture fails through no fault of defendant", "Without prejudice", "dismissal without prejudice"],
        ["constitutional", "Dismissal where the court finds a constitutional speedy-trial violation", "With prejudice", "dismissal with prejudice"],
        ["premature", "Is a notice filed before speedy time expires valid?", "No", "invalid", "premature"],
        ["extension", "An unexpired valid extension prevents this default remedy", "Dismissal", "discharge"],
      ]),
    ], "Rule 3.191(j), (p)",
    "The current recapture period is 30 days. The slides' statement that jeopardy automatically attaches is not used: a constitutional dismissal bars further prosecution without requiring that proposition."),

  drill("speedy-extensions", "Speedy Trial Extensions and Availability", ["11", "6", "12–13"],
    "Distinguish exceptional circumstances from routine delay and remember defendant availability.", [
      column("extensions", "Extending the Period", [
        ["timing", "An extension ordinarily must be ordered before the current period does this", "Expires", "expiration", "expire"],
        ["agreement", "Written agreement of the parties is this extension method", "Stipulation", "written stipulation", "agreement"],
        ["exceptional", "Unexpected, necessary-witness incapacity may be this kind of circumstance", "Exceptional", "exceptional circumstance", "exceptional circumstances"],
      ]),
      column("not-exceptional", "Delay and Availability", [
        ["calendar", "Routine court-calendar congestion qualifies as exceptional: yes or no?", "No", "not exceptional"],
        ["diligence", "Lack of this preparation does not make a delay exceptional", "Diligent", "diligent preparation", "diligence"],
        ["availability", "Defendant must be continuously available for this proceeding", "Trial", "the trial"],
      ]),
    ], "Rule 3.191(e), (i), (l)",
    "An extension by agreement requires the parties' stipulation; the prosecutor's unilateral consent is not substituted for that method. Defendant-caused delay and unavailability have distinct rule consequences."),

  drill("insanity", "Insanity Defense", ["12", "7", "14"],
    "Keep insanity at the time of the offense separate from present competency.", [
      column("insanity-standard", "The Defense", [
        ["time", "Insanity is measured at the time of this event", "Offense", "crime", "criminal act", "incident"],
        ["nature", "Insanity is this kind of defense, which the defendant must establish", "Affirmative defense", "affirmative"],
        ["act", "One route: defendant did not know what the defendant was doing or its what?", "Consequences", "consequence"],
        ["wrong", "Other route: knew the act and consequences but did not know it was this", "Wrong", "wrongful"],
      ]),
      column("insanity-procedure", "Notice and Proof", [
        ["burden", "Defendant's burden of proof for insanity", "Clear and convincing evidence", "clear and convincing", "clear convincing evidence"],
        ["notice", "Ordinary written-notice deadline after arraignment", "15 days", "15", "fifteen days"],
        ["acquittal", "An insanity acquittal may lead to commitment, outpatient treatment, or this", "Discharge", "complete discharge", "release"],
      ]),
    ], "Rules 3.216–3.219; Florida Statutes § 775.027",
    "The insanity-notice deadline can be extended for good cause. An insanity acquittal does not itself promise immediate unconditional release."),

  drill("competency", "Competency to Proceed", ["12", "7", "13–14"],
    "Apply the current competency standard and identify the proceedings that must stop.", [
      column("competency-standard", "Present Ability", [
        ["time", "Competency concerns the defendant's condition at the time of these", "Proceedings", "trial", "current proceedings", "pretrial proceedings"],
        ["consult", "Defendant needs sufficient present ability to consult with this person", "Lawyer", "counsel", "attorney", "defense counsel"],
        ["understanding", "Understanding of proceedings must be factual and this", "Rational", "rational understanding"],
        ["doubt", "Reasonable grounds to doubt competency require the court to order this", "Hearing", "competency hearing", "hearing on competency"],
      ]),
      column("competency-effect", "Effect of Incompetency", [
        ["trial", "May an incompetent defendant be tried while still incompetent?", "No", "trial prohibited", "cannot be tried", { explanation: "Rule 3.210 prohibits material stages while the defendant is incompetent, including trial, entry of a plea, and sentencing. The contrary sentence in the slide notes and outline is incorrect." }],
        ["stages", "Incompetency bars material stages including trial, plea, and this", "Sentencing", "sentence"],
        ["restoration", "If competency is restored, the criminal case may do this", "Proceed", "resume", "continue"],
      ]),
    ], "Rules 3.210–3.213",
    "Slide Notes PDF p. 12 and Slide Outline PDF p. 7 incorrectly say an incompetent person can be tried. Rule 3.210 prohibits material stages while incompetent. Rule 3.213 has several qualified dismissal periods; the source's simplified 5-year/1-year summary is not quizzed as an unconditional rule."),

  drill("alibi", "Notice of Alibi", ["13", "7", "13"],
    "Recall the prosecutor-triggered alibi notice and the reciprocal witness disclosure.", [
      column("alibi-notice", "Defense Notice", [
        ["meaning", "An alibi asserts that the defendant was this at the offense time", "Elsewhere", "somewhere else", "at another place"],
        ["trigger", "The prosecution triggers the notice obligation with this written request", "Demand", "written demand", "demand for notice of alibi"],
        ["deadline", "Default minimum lead time before trial for the defense's notice", "10 days", "10", "ten days"],
      ]),
      column("alibi-details", "Contents and Reciprocal Duty", [
        ["location", "Notice specifies where the defendant claims to have been", "Place", "location", "specific place", "specific location"],
        ["identities", "Notice lists these two contact details for alibi witnesses", "Names and addresses", "name and address", "addresses and names"],
        ["rebuttal", "State's deadline after receipt to disclose alibi rebuttal witnesses", "5 days", "5", "five days"],
        ["ongoing", "Later-discovered alibi or rebuttal witnesses are subject to this duty", "Continuing disclosure", "continuing duty", "continuing", "continuing duty to disclose"],
      ]),
    ], "Rule 3.200",
    "The court may direct another time and may excuse noncompliance for good cause. Noncompliance can support exclusion of an undisclosed witness; the defendant's own testimony is excepted."),

  drill("discovery", "Reciprocal Discovery", ["13–14", "7", "15–16"],
    "Use this Flowers supplement to recall the discovery election, reciprocal deadlines, and continuing disclosure.", [
      column("discovery-election", "Election and Deadlines", [
        ["election", "Defense document electing to participate in reciprocal discovery", "Notice of discovery", "notice"],
        ["state", "Prosecution disclosure deadline after service of the defense election", "15 days", "15", "fifteen days"],
        ["defense", "Defense reciprocal deadline after receipt of the prosecution's discovery exhibit", "15 days", "15", "fifteen days"],
        ["exculpatory", "The prosecution must disclose material favorable to the defendant of this kind", "Exculpatory evidence", "exculpatory", "favorable evidence", "Brady material", "Brady evidence"],
      ]),
      column("discovery-content", "Disclosure and Compliance", [
        ["statements", "Discoverable oral/written/recorded accounts made by the accused", "Defendant's statements", "defendant statements", "statements of defendant", "statements"],
        ["experts", "Disclosures include reports or statements by this type of witness", "Experts", "expert witnesses", "expert"],
        ["continuing", "Newly discovered covered information triggers this duty", "Continuing disclosure", "continuing duty", "continuing duty to disclose"],
        ["sanctions", "Willful discovery violations may be punished as this", "Contempt", "contempt of court"],
      ]),
    ], "Rule 3.220(a)–(d), (j), (n)",
    "The prosecution's disclosure of material exculpatory information does not depend on the defense's discovery election. The court may also compel disclosure, grant a continuance, or impose other authorized sanctions."),

  drill("depositions", "Discovery and Trial Depositions", ["14", "7", "10, 15"],
    "Distinguish discovery depositions from depositions used to preserve material trial testimony.", [
      column("discovery-depositions", "Discovery Depositions", [
        ["felony", "Ordinary case category permitting depositions subject to witness-category rules", "Felony", "felony cases", "felonies"],
        ["lesser", "Depositions in misdemeanor or criminal traffic cases ordinarily require this showing", "Good cause", "good cause shown"],
        ["presence", "Defendant's physical attendance ordinarily requires stipulation or this", "Good cause", "good cause shown", "court permission for good cause"],
        ["impeachment", "Ordinary trial use for inconsistent discovery-deposition testimony", "Impeachment", "impeach"],
        ["telephone", "Stipulation and witness consent permit this recorded alternative to deposition", "Recorded telephone statement", "telephone statement", "recorded telephone conversation", "recorded phone statement"],
        ["oath", "Must that stipulated, witness-consented telephone statement be under oath?", "No", "oath not required", "no oath"],
      ]),
      column("perpetuation", "Perpetuating Trial Testimony", [
        ["order", "Unlike ordinary authorized discovery, perpetuation requires this judicial authorization", "Court order", "order", "leave of court"],
        ["time", "Default minimum lead time before trial for the perpetuation motion", "10 days", "10", "ten days"],
        ["material", "Witness outside the jurisdiction or unable to attend must offer testimony of this quality", "Material", "material testimony", "materiality"],
      ]),
    ], "Rules 3.190(h), 3.220(h)",
    "The prosecution's intent to call a witness is not the sole test for discovery deposition permission. Apply Rule 3.220(h)'s witness categories and special protections. Perpetuation also requires necessity to prevent a failure of justice."),

  drill("jury-selection", "Jury Size and Challenges", ["14–15", "7–8", "16–17"],
    "Recall jury size and the number of ordinary peremptory challenges per party.", [
      column("jury-size", "Jurors and Cause Challenges", [
        ["capital", "Number of jurors in a capital case", "12", "12 jurors", "twelve", "twelve jurors"],
        ["other", "Number of jurors in an ordinary noncapital criminal case", "6", "6 jurors", "six", "six jurors"],
        ["cause", "Numerical limit on challenges for cause", "Unlimited", "no limit", "unlimited challenges"],
      ]),
      column("peremptories", "Peremptory Challenges", [
        ["death-life", "Ordinary per-party allowance for a death- or life-punishable offense", "10", "10 challenges", "ten", "ten challenges", { explanation: "Rule 3.350(a)(1) includes offenses punishable by life imprisonment as well as death. The slide notes' capital-only shorthand is incomplete." }],
        ["felony", "Ordinary per-party allowance for other felonies", "6", "6 challenges", "six", "six challenges"],
        ["misdemeanor", "Ordinary per-party allowance for misdemeanors", "3", "3 challenges", "three", "three challenges"],
        ["state-total", "In a joint trial, the state gets the defendants' combined allowance or only one allowance?", "Combined allowance", "combined", "sum", "sum total", "total of defendants' challenges"],
      ]),
    ], "Rules 3.270, 3.350",
    "The notes say capital cases receive 10 challenges, but Rule 3.350 includes all offenses punishable by death or life imprisonment. Peremptories remain subject to constitutional prohibitions on discrimination."),

  drill("jury-waiver-and-alternates", "Jury Waiver and Alternates", ["15–16", "8", "16–18"],
    "Distinguish a bench-trial waiver from proceeding with a reduced jury and recall alternate-juror practice.", [
      column("jury-waiver", "Waiving Jury Trial", [
        ["form", "Ordinary form of a complete jury-trial waiver", "Written", "in writing", "written waiver"],
        ["consent", "Besides the defendant, this party must consent to a bench trial", "State", "prosecution", "prosecutor"],
        ["reduced", "Reduced-jury waiver after a juror is lost must be knowing, intelligent, and this", "Voluntary", "voluntarily", "voluntariness"],
        ["record", "Reduced-jury waiver must be reflected here", "Record", "the record", "on the record"],
      ]),
      column("alternates", "Alternate Jurors", [
        ["replacement", "Alternates may replace a juror who becomes unable or this to perform duties", "Disqualified", "disqualified juror"],
        ["challenge", "Extra peremptory allowance for each alternate, usable on alternates only", "One", "1", "one challenge"],
        ["deliberations", "Ordinary discharge point for unused noncapital alternates", "Before deliberations", "before the jury retires", "before jury retires to deliberate", "before deliberation"],
      ]),
    ], "Rules 3.260, 3.280, 3.350(d); reduced-jury waiver discussed in the course notes",
    "Capital cases have special alternate-juror provisions for a possible penalty proceeding. The reduced-jury waiver discussed in the notes is distinct from the written, state-consented bench-trial waiver."),

  drill("witnesses-and-jury-view", "Witnesses and Jury View", ["16–17", "9", "17–18"],
    "Recall witness sequestration, victim attendance, juror questions, and a jury view.", [
      column("witnesses", "Courtroom Testimony", [
        ["rule", "Excluding witnesses so they do not hear other witnesses' testimony", "Sequestration", "witness sequestration", "the rule", "sequestering witnesses"],
        ["victim", "This participant ordinarily has a protected right to remain at the proceeding", "Victim", "crime victim"],
        ["minor", "A minor victim's parent, guardian, or lawful representative may also remain: yes or no?", "Yes", "may remain"],
        ["questions", "Juror questions to witnesses must be submitted to the court in this form", "Written", "in writing", "written questions"],
      ]),
      column("jury-view", "Viewing a Relevant Location", [
        ["judge", "This judicial official must be present at the jury view", "Judge", "trial judge"],
        ["defendant", "This person must attend the view unless excused by the court", "Defendant", "the defendant"],
        ["lawyers", "The attorneys' attendance is mandatory or optional under Rule 3.370?", "Optional", "may attend", "not required"],
      ]),
    ], "Rules 3.361, 3.370, 3.371; Florida Statutes § 90.616; Florida Constitution art. I, § 16",
    "Victim attendance is governed by current constitutional and statutory protections. Juror questions are screened by the court; jurors do not question witnesses directly."),

  drill("instructions-and-deliberations", "Instructions and Deliberation Materials", ["17", "9", "18"],
    "Distinguish required written instructions from materials the court may permit in the jury room.", [
      column("instructions", "Jury Instructions", [
        ["subject", "The judge instructs the jury on the law of this", "Case", "the case"],
        ["timing", "Instructions may be given before or after these final lawyer presentations", "Closing arguments", "closings", "closing argument"],
        ["written", "Form of the instruction copy that must go to the jury room", "Written", "in writing", "written copy"],
      ]),
      column("jury-room", "Materials and Further Evidence", [
        ["charge", "The court may allow a copy of this accusation document", "Charging instrument", "indictment or information", "information or indictment", "formal charge"],
        ["forms", "The court may allow these approved papers for recording the decision", "Verdict forms", "verdict form", "forms of verdict"],
        ["excluded", "This recorded sworn testimony is excluded from ordinary jury-room evidence materials", "Depositions", "deposition", "deposition testimony"],
        ["new", "After retirement, may the jury be recalled to hear new evidence?", "No", "no new evidence", "cannot hear new evidence"],
      ]),
    ], "Rules 3.390, 3.400, 3.410, 3.430",
    "Rule 3.400 also restricts removal of certain original public records or private documents from lawful custody. Rehearing evidence already admitted is distinct from receiving new evidence."),

  drill("verdict-and-juror-inquiries", "Verdict, Polling, and Interviews", ["18", "9–10", "18–19"],
    "Recall guilt-verdict requirements and the separate timing of polling and juror interviews.", [
      column("verdict", "Returning the Guilt Verdict", [
        ["agreement", "A guilt-phase jury verdict must have this agreement among jurors", "Unanimity", "unanimous", "unanimous agreement"],
        ["multiple", "Joint-defendant verdicts must state how the verdict applies to each of these", "Defendants", "defendant", "each defendant"],
        ["comment", "May the judge praise or criticize the verdict itself?", "No", "no comment", "cannot praise or criticize"],
      ]),
      column("inquiries", "Polling and Interviewing", [
        ["poll", "Procedure asking individual jurors to confirm agreement with the verdict", "Polling", "poll the jury", "jury polling", "poll"],
        ["time", "Polling must precede verdict recording and this other event", "Jury discharge", "discharge", "jury is discharged", "discharging the jury"],
        ["interview", "Ordinary post-verdict deadline for a motion to interview jurors", "10 days", "10", "ten days"],
      ]),
    ], "Rules 3.440, 3.450, 3.575",
    "The unanimity clue concerns guilt verdicts, not capital sentencing recommendations. Juror interviews require a reason to believe the verdict is subject to challenge and court authorization; the 10-day period may be extended for good cause."),

  drill("presentence-report", "Presentence Investigation", ["18", "10", "19–20"],
    "Recall when a presentence investigation report is required and what it informs.", [
      column("psi", "Presentence Investigation Report", [
        ["agency", "Agency that prepares the ordinary presentence investigation report", "Department of Corrections", "DOC", "Florida Department of Corrections"],
        ["first", "A first-time offender in this offense category triggers the rule's mandatory-report protection", "Felony", "felony offender", "felonies"],
        ["age", "Other protected category: defendant found guilty of a felony while under this age", "18", "18 years", "eighteen", "18 years old", { explanation: "Rule 3.710(a) says found guilty of a felony while under the age of 18 years. The course shorthand about commission of the felony as a minor is not substituted for the rule's wording." }],
        ["discretion", "Mandatory-report rule applies when sentencing is within this judicial authority", "Discretion", "court discretion", "judicial discretion"],
      ]),
      column("sentencing", "Sentencing Procedure", [
        ["life", "The report informs the judge about the defendant's history and these circumstances", "Personal", "personal circumstances", "life circumstances", "background"],
        ["heard", "Before imposing sentence, the defendant must be allowed to present matters in this", "Mitigation", "mitigation of sentence", "mitigation evidence"],
      ]),
    ], "Rules 3.710–3.720",
    "Rule 3.710 says found guilty of a felony while under age 18; the slides' felony-committed-as-a-minor shorthand is not used. Mandatory investigation applies before a sentence other than probation when sentencing discretion exists; capital cases and probation violations have separate provisions."),

  drill("judgment-of-acquittal", "Judgment of Acquittal", ["19", "10", "16"],
    "Identify the motion directed at insufficient evidence and the stages at which it may be made.", [
      column("acquittal-standard", "Testing the Evidence", [
        ["motion", "Motion asserting the evidence cannot sustain a conviction", "Judgment of acquittal", "motion for judgment of acquittal", "JOA"],
        ["standard", "The motion tests whether evidence is legally this to sustain conviction", "Sufficient", "sufficiency", "legally sufficient"],
        ["state", "One trial point for the motion: close of this party's evidence", "State", "prosecution", "state's case", "prosecution's case"],
      ]),
      column("acquittal-procedure", "Timing and Preservation", [
        ["all", "Another trial point: close of all this", "Evidence", "all evidence", "the evidence"],
        ["defense", "If the state-close motion is denied, may the defendant present evidence without waiving it?", "Yes", "may present evidence", "no waiver"],
        ["posttrial", "A posttrial acquittal motion can follow a guilty verdict or this unresolved result", "Mistrial", "jury deadlock", "hung jury"],
      ]),
    ], "Rule 3.380",
    "The slide's instruction that the motion must be made only at the close of the state's case is incomplete. Rule 3.380 also permits it at the close of all evidence, and the court may act on its own motion."),

  drill("new-trial", "New Trial: Grounds and Timing", ["19–20", "10–11", "18–19"],
    "Separate the three direct new-trial grounds from errors requiring prejudice to substantial rights.", [
      column("new-trial-grounds", "Direct Grounds", [
        ["lot", "Verdict reached randomly rather than through deliberation", "By lot", "lot", "decided by lot", "chance"],
        ["weight", "Verdict contrary to law or the weight of this", "Evidence", "the evidence"],
        ["new", "Previously unavailable evidence that probably changes the verdict must be newly what?", "Discovered", "newly discovered", "newly discovered evidence"],
        ["diligence", "Defendant must show the new evidence could not earlier be produced using reasonable what?", "Diligence", "reasonable diligence"],
      ]),
      column("new-trial-prejudice", "Prejudice and Timing", [
        ["rights", "Other listed errors require prejudice to these defendant rights", "Substantial rights", "substantial"],
        ["outside", "Jury receiving evidence outside this proceeding can be a prejudicial ground", "Court", "out of court", "the court"],
        ["ordinary", "Ordinary noncapital new-trial motion deadline after verdict", "10 days", "10", "ten days"],
        ["capital", "Death-penalty-at-issue deadline after filing written conviction judgment and sentence", "10 days", "10", "ten days"],
      ]),
      column("new-trial-errors", "Errors Requiring Prejudice", [
        ["absence", "Defendant missing a required proceeding against the defendant's will", "Involuntary absence", "involuntarily absent", "defendant involuntarily absent"],
        ["separation", "Jurors separate without permission after retiring to deliberate", "Unauthorized separation", "juror separation", "unauthorized juror separation", "separation without permission"],
        ["misconduct", "Improper conduct by a juror or prosecutor", "Misconduct", "juror or prosecutor misconduct", "juror misconduct", "prosecutorial misconduct"],
        ["instructions", "Judge gives an incorrect legal charge to the jury", "Erroneous instructions", "erroneous jury instructions", "incorrect instructions", "wrong jury instructions", "instruction error"],
      ]),
    ], "Rules 3.590, 3.600–3.640",
    "New evidence must be material, probably change the verdict, and have been unavailable despite reasonable diligence. In cases where death is an issue, the 10-day trigger is filing the written judgment of conviction and life/death sentence. Capital cases where the state does not seek death use the ordinary verdict/finding trigger. Other prejudicial grounds include mistaken legal rulings and failure to receive a fair trial for a cause not attributable to the defendant."),

  drill("arrest-of-judgment", "Arrest of Judgment", ["20", "11", "19"],
    "Identify the narrow legal defects supporting arrest of judgment and the ordinary motion deadline.", [
      column("arrest-grounds", "Legal Defects", [
        ["charge", "Charging instrument is too defective to support this result", "Conviction", "a conviction"],
        ["power", "Court lacks this authority over the case", "Jurisdiction", "subject matter jurisdiction"],
        ["uncertain", "Verdict is too uncertain to identify conviction of an offense under this", "Charging instrument", "indictment or information", "information or indictment", "formal charge"],
        ["improper", "Verdict convicts of an offense improper under the charging instrument: valid ground?", "Yes", "valid ground"],
      ]),
      column("arrest-timing", "Timing and Purpose", [
        ["deadline", "Ordinary noncapital filing deadline after verdict", "10 days", "10", "ten days"],
        ["motion", "Name of the motion addressing these defects", "Motion in arrest of judgment", "arrest of judgment", "motion for arrest of judgment"],
      ]),
    ], "Rules 3.590, 3.610",
    "A charging-document defect must satisfy Rule 3.610's narrow conditions; an ordinary technical defect is not enough. Where death is an issue, timing follows filing the written conviction judgment and life/death sentence; capital cases where the state does not seek death use the ordinary verdict/finding trigger."),

  drill("sentence-and-postconviction", "Sentence Corrections and Postconviction Relief", [null, null, "20–21"],
    "Use this Flowers supplement to distinguish sentence correction from a collateral challenge.", [
      column("sentence-correction", "Rule 3.800", [
        ["illegal", "Type of sentence subject to correction under Rule 3.800(a)", "Illegal sentence", "illegal", { explanation: "Rule 3.800(a) permits correction at any time when its procedural requirements are met, but a motion under that provision cannot be filed during the Rule 3.800(b)(1) period or while a direct appeal is pending." }],
        ["record", "Rule 3.800(a) requires entitlement to relief apparent on the face of this", "Record", "the record", "court records", "court record"],
        ["reduce", "Ordinary period to reduce or modify a legal sentence after the applicable trigger", "60 days", "60", "sixty days"],
      ]),
      column("collateral", "Rule 3.850", [
        ["motion", "A postconviction motion may vacate, set aside, or correct this", "Judgment or sentence", "sentence or judgment", "sentence", "judgment"],
        ["constitutional", "Relief may address a judgment violating the state or federal what?", "Constitution", "constitutional rights"],
        ["plea", "A plea entered without voluntary choice is this valid ground", "Involuntary plea", "involuntary", "plea involuntary"],
        ["deadline", "Usual noncapital filing period after judgment and sentence become final", "2 years", "2", "two years", "two"],
        ["new-facts", "Exception may apply to facts previously undiscoverable despite this", "Due diligence", "diligence", "reasonable diligence"],
      ]),
    ], "Rules 3.800(a), (c), 3.850(a)–(b)",
    "The Rule 3.800(c) 60-day window has alternative appellate triggers and exceptions, including death and mandatory-minimum sentences. Death-sentence collateral proceedings are governed by separate Rule 3.851 and are not reduced to an unqualified deadline here."),

  drill("judicial-disqualification-and-contempt", "Disqualification and Criminal Contempt", ["8", "5", "21"],
    "Recall the bias motion from the slides and the Flowers supplement's direct/indirect contempt distinction.", [
      column("disqualification", "Judicial Disqualification", [
        ["bias", "A party's legally sufficient fear of judicial bias is addressed by this motion", "Disqualification", "motion to disqualify", "disqualify judge", "motion for disqualification"],
        ["degree", "Relationship to a party or attorney is a ground within this degree", "Third degree", "3rd degree", "third", "3"],
        ["witness", "A judge who has this role in the case is subject to disqualification", "Material witness", "witness"],
      ]),
      column("contempt", "Criminal Contempt", [
        ["direct", "Contemptuous conduct in the judge's actual presence", "Direct contempt", "direct", "direct criminal contempt"],
        ["indirect", "Contemptuous conduct outside the judge's presence", "Indirect contempt", "indirect", "indirect criminal contempt"],
        ["explain", "Before direct-contempt punishment, the person gets an opportunity to do this", "Explain", "explain the conduct", "show cause", "present explanation and mitigation"],
      ]),
    ], "Rules 3.830–3.840; Florida Rule of General Practice and Judicial Administration 2.330",
    "Disqualification is governed by Rule 2.330, which includes additional procedural requirements. The first motion's legal-sufficiency inquiry differs from the treatment of a successive judge; the slides' shorthand is not used as a blanket bias rule."),
];
