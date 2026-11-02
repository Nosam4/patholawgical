import { evidenceDrill as drill, group as g, recall as r } from "./evidenceStudyHelpers.js";

const master = "MASTER CASE LIST FOR EVIDENCE EXAM Final.docx: all 13 entries. The document supplies names only; facts and principles below are study summaries of the linked judicial opinions.";
const scope = "Full-exam list. Old Chief, Daubert, and Huddleston appear in the supplied pre-midterm decks. The remaining cases concern later syllabus topics; their inclusion here does not establish midterm coverage.";

// Preserve every source-list entry, including its spelling, separately from the canonical case name.
export const evidenceCases = [
  {
    key: "old-chief", listedName: "Old Chief", name: "Old Chief v. United States", short: "Old Chief", midterm: true,
    citation: "519 U.S. 172 (1997)", topic: "Relevance and Rule 403", aliases: ["old chief v us", "old chief v united states"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/95-6556.ZO.html",
    facts: "An accused offered to concede felony status to keep the name and nature of a prior assault conviction from the jury in a firearm-possession case.",
    rows: [
      r("rule", "Which rule controls comparison with less prejudicial alternative proof?", "403", ["rule 403"]),
      r("relevance", "Does the concession eliminate the conviction evidence's relevance?", "No", ["still relevant", "relevance survives"]),
      r("holding", "Given the status concession and prejudice, admitting the name/nature of the prior crime was an…", "Abuse of discretion", ["abuse", "error"], "The alternative proved the status element without the same propensity danger."),
      r("limit", "Does this let a defendant generally stipulate away the prosecution's whole narrative?", "No", ["limited to status proof", "not generally"]),
    ],
  },
  {
    key: "crawford", listedName: "Crawford", name: "Crawford v. Washington", short: "Crawford", midterm: false,
    citation: "541 U.S. 36 (2004)", topic: "Testimonial hearsay", aliases: ["crawford v washington"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/02-9410.ZO.html",
    facts: "The prosecution used an absent wife's recorded police interrogation against her husband, although he had no opportunity to cross-examine her.",
    rows: [
      r("clause", "Which constitutional protection governs?", "Confrontation Clause", ["sixth amendment", "confrontation"]),
      r("type", "The formal police interrogation was what kind of statement?", "Testimonial", ["testimonial hearsay"]),
      r("conditions", "Ordinary admission of an absent declarant's testimonial statement for truth requires unavailability and…", "Prior opportunity to cross-examine", ["prior cross examination", "prior opportunity for cross examination"], "This is the ordinary confrontation rule; a reliability finding alone cannot substitute for confrontation."),
      r("reliability", "Does a judge's finding that the statement is trustworthy suffice?", "No", ["reliability is insufficient"]),
    ],
  },
  {
    key: "hammon", listedName: "Hammon", name: "Hammon v. Indiana", short: "Hammon", midterm: false,
    citation: "Decided with Davis, 547 U.S. 813 (2006)", topic: "Past events versus an emergency", aliases: ["hammon v indiana"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/05-5224.ZO.html",
    facts: "After a domestic disturbance had ended and the parties were separated, police questioned the wife about past events and obtained an affidavit.",
    rows: [
      r("classification", "Were these investigative statements testimonial?", "Yes", ["testimonial"]),
      r("purpose", "The interrogation's primary purpose was to establish…", "Past events for prosecution", ["past events", "prove past events", "investigate past events"]),
      r("emergency", "Was there an ongoing emergency during this account?", "No", ["no ongoing emergency"]),
      r("comparison", "Which companion case involved an emergency 911 call?", "Davis", ["davis v washington"], "Compare circumstances and purpose, not merely whether the listener was a police officer."),
    ],
  },
  {
    key: "davis", listedName: "Davis", name: "Davis v. Washington", short: "Davis", midterm: false,
    citation: "547 U.S. 813 (2006)", topic: "Primary purpose and ongoing emergency", aliases: ["davis v washington"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/05-5224.ZO.html",
    facts: "A woman identified her assailant to a 911 operator while describing an assault as it happened and seeking help.",
    rows: [
      r("classification", "The initial emergency statements were…", "Nontestimonial", ["non testimonial"]),
      r("purpose", "Their primary purpose was assistance with an…", "Ongoing emergency", ["emergency"]),
      r("perspective", "Primary purpose is assessed subjectively or objectively?", "Objectively", ["objective"]),
      r("shift", "Can an initially emergency conversation later become testimonial?", "Yes", ["purpose can change"], "Reassess when danger ends and questions turn to establishing past events. A 911 call is not categorically nontestimonial."),
    ],
  },
  {
    key: "bryant", listedName: "Bryant", name: "Michigan v. Bryant", short: "Bryant", midterm: false,
    citation: "562 U.S. 344 (2011)", topic: "Context of the ongoing emergency", aliases: ["michigan v bryant"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/09-150.ZO.html",
    facts: "Police found a mortally wounded shooting victim at a gas station and asked who shot him and where; the armed shooter's location was unknown.",
    rows: [
      r("classification", "The victim's statements in this encounter were…", "Nontestimonial", ["non testimonial"]),
      r("public", "The emergency could threaten the victim, police, and…", "Public", ["the public", "public at large"]),
      r("test", "Primary purpose requires an objective assessment of…", "The total circumstances", ["context", "all circumstances", "totality of circumstances"], "Consider the participants' words and actions, the threat, weapon, injuries, and informality."),
      r("past", "Does the fact that the shooting already occurred automatically end the emergency?", "No", ["ongoing danger may remain"]),
    ],
  },
  {
    key: "williams", listedName: "Williams", name: "Williams v. Illinois", short: "Williams", midterm: false,
    citation: "567 U.S. 50 (2012)", topic: "Expert basis testimony and confrontation", aliases: ["williams v illinois"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/10-8505",
    facts: "At a bench trial, a DNA expert compared a defendant's profile with a profile produced by an outside laboratory whose analyst did not testify.",
    notes: ["The master list gives only 'Williams'; this entry identifies it as Williams v. Illinois in the context of the surrounding confrontation cases.", "Current-law clarification: Smith v. Arizona, 602 U.S. 779 (2024), https://www.supremecourt.gov/opinions/23pdf/22-899_97be.pdf. Williams did not produce a majority for the plurality's not-for-truth theory."],
    rows: [
      r("result", "Was the conviction affirmed or reversed?", "Affirmed", ["affirm"]),
      r("majority", "Did a majority adopt the plurality's claim that the basis statements were not offered for truth?", "No", ["fractured decision", "no majority"], "Four Justices used that rationale; Justice Thomas concurred on lack of sufficient formality. Five rejected the not-for-truth rationale."),
      r("smith", "Later case rejecting a not-for-truth label when an absent analyst's statements support the opinion only if true", "Smith v. Arizona", ["smith", "smith v arizona"]),
      r("remaining", "After Smith's truth analysis, what confrontation classification must still be assessed?", "Testimonial", ["whether testimonial", "testimonial status"], "Smith remanded that question. Reliance under an evidence rule cannot by itself avoid confrontation requirements."),
    ],
  },
  {
    key: "owens", listedName: "Owens", name: "United States v. Owens", short: "Owens", midterm: false,
    citation: "484 U.S. 554 (1988)", topic: "Prior identification and memory loss", aliases: ["us v owens", "united states v owens"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/484/554",
    facts: "An injured correctional counselor remembered identifying his attacker but, at trial, could not recall seeing the attacker's face or the basis for the identification.",
    rows: [
      r("rule", "Which rule covers the prior identification?", "801(d)(1)(C)", ["801 d 1 c", "801d1c"]),
      r("cross", "Did the memory loss by itself defeat being subject to cross-examination?", "No", ["still subject to cross"]),
      r("guarantee", "Confrontation guarantees an opportunity for cross, not a guarantee of…", "Successful cross-examination", ["successful cross", "desired answers", "success"], "The defense could expose memory problems before the jury; the witness took the oath and responded to questions."),
      r("availability", "Can Rule 804 memory-loss unavailability coexist with being subject to cross under 801(d)(1)?", "Yes", ["different purposes"], "The provisions use these concepts for different purposes."),
    ],
  },
  {
    key: "hillmon", listedName: "Hillman", name: "Mutual Life Insurance Co. v. Hillmon", short: "Hillmon", midterm: false,
    citation: "145 U.S. 285 (1892)", topic: "Intent and subsequent conduct", aliases: ["hillman", "mutual life v hillmon", "mutual life insurance co v hillmon"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/145/285",
    facts: "In a dispute over the identity of a body and life-insurance proceeds, letters expressed the writer's intention to leave Wichita and travel with another man.",
    notes: ["The source list spells this 'Hillman.' EVIDENCE OUTLINE - Quinn.docx identifies Hillmon in its discussion of intent and subsequent acts. Both spellings are accepted."],
    rows: [
      r("state", "What then-existing state of mind did the letters express?", "Intent", ["intention", "plan"]),
      r("direction", "The intent was relevant to infer conduct in the past or future?", "Future", ["future conduct", "subsequent conduct"]),
      r("rule", "Modern FRE provision associated with this state-of-mind principle", "803(3)", ["803 3", "8033"]),
      r("limit", "Does this generally admit memories of past events to prove those events?", "No", ["not past memory", "no backward inference"], "The core course principle concerns the declarant's subsequent conduct. Do not automatically extend it to prove another person's conduct; that is a separate, contested scope question."),
    ],
  },
  {
    key: "bruton", listedName: "Bruton", name: "Bruton v. United States", short: "Bruton", midterm: false,
    citation: "391 U.S. 123 (1968)", topic: "Joint trials and codefendant confessions", aliases: ["bruton v united states", "bruton v us"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/391/123",
    facts: "At a joint trial, a postal inspector recounted a nontestifying codefendant's confession expressly naming the other defendant as an accomplice.",
    rows: [
      r("problem", "The directly implicated defendant could not do what to the confessing codefendant?", "Cross-examine", ["cross examine", "cross examination"]),
      r("instruction", "Did an instruction to consider the confession only against its maker cure the violation?", "No", ["limiting instruction insufficient"]),
      r("right", "The violated right was…", "Confrontation", ["confrontation clause", "sixth amendment"]),
      r("scope", "Does Bruton automatically forbid every redacted codefendant statement?", "No", ["redaction requires separate analysis"], "The core holding concerns a directly incriminating confession by a nontestifying codefendant. Later redaction cases require separate analysis."),
    ],
  },
  {
    key: "daubert", listedName: "Daubert", name: "Daubert v. Merrell Dow Pharmaceuticals", short: "Daubert", midterm: true,
    citation: "509 U.S. 579 (1993)", topic: "Expert reliability", aliases: ["daubert v merrell dow", "daubert v merrell dow pharmaceuticals inc"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/509/579",
    facts: "Children alleging that Bendectin caused birth defects challenged exclusion of their scientific experts under a general-acceptance-only standard.",
    rows: [
      r("rule", "Governing Federal Rule", "702", ["rule 702"]),
      r("role", "The trial judge's reliability-screening role", "Gatekeeper", ["gatekeeping"]),
      r("frye", "Is Frye general acceptance the exclusive federal admissibility test?", "No", ["one factor", "not exclusive"]),
      r("factors", "Are testability, peer review, error rates, standards, and acceptance an exhaustive checklist?", "No", ["flexible", "nonexclusive"], "Use flexible reliability analysis plus fit to the disputed issue. The Midterm: Slide Applications section separately drills each factor."),
    ],
  },
  {
    key: "melendez-diaz", listedName: "Melendez-Diaz", name: "Melendez-Diaz v. Massachusetts", short: "Melendez-Diaz", midterm: false,
    citation: "557 U.S. 305 (2009)", topic: "Forensic certificates", aliases: ["melendez diaz", "melendez diaz v massachusetts"],
    sourceUrl: "https://www.law.cornell.edu/supct/html/07-591.ZO.html",
    facts: "The prosecution introduced sworn laboratory certificates identifying seized material as cocaine without producing the analysts for cross-examination.",
    rows: [
      r("type", "The sworn forensic certificates were…", "Testimonial", ["testimonial statements"]),
      r("substitute", "Were the certificates a substitute for in-court analyst testimony?", "Yes", ["affidavits as testimony"]),
      r("burden", "Could the prosecution cure the problem simply by saying the defendant could subpoena the analysts?", "No", ["prosecution burden", "subpoena not substitute"]),
      r("limit", "Must every person who ever handled a sample necessarily testify?", "No", ["not every chain witness"], "The decision does not require every chain-of-custody participant to appear. Ordinary confrontation requirements apply to the testimonial statements offered."),
    ],
  },
  {
    key: "upjohn", listedName: "Upjohn", name: "Upjohn Co. v. United States", short: "Upjohn", midterm: false,
    citation: "449 U.S. 383 (1981)", topic: "Corporate attorney-client privilege", aliases: ["upjohn v united states", "upjohn co v united states", "upjohn v us"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/449/383",
    facts: "Corporate lawyers investigated questionable payments through employee questionnaires and interviews; the IRS sought the internal communications.",
    rows: [
      r("test", "Which restrictive corporate-privilege test did the Court reject?", "Control group", ["control group test"]),
      r("employees", "Can qualifying communications with lower-level employees receive privilege?", "Yes", ["not limited to executives"], "The communications concerned employment matters, supplied information for legal advice at corporate direction, and were confidential."),
      r("facts", "Privilege protects communications, but does it conceal the underlying facts themselves?", "No", ["facts not privileged", "communications not facts"]),
      r("all", "Is every workplace message copied to a lawyer automatically privileged?", "No", ["legal advice and confidentiality required"], "Apply the privilege's requirements; the holding is not a blanket shield for corporate information."),
    ],
  },
  {
    key: "huddleston", listedName: "Huddleston (stolen videotapes case)", name: "Huddleston v. United States", short: "Huddleston", midterm: true,
    citation: "485 U.S. 681 (1988)", topic: "Other acts and conditional relevance", aliases: ["huddleston v united states", "huddleston v us", "huddleston stolen videotapes case"],
    sourceUrl: "https://www.law.cornell.edu/supremecourt/text/485/681",
    facts: "In a stolen-videotape prosecution, evidence about a separate suspicious television sale was offered to show knowledge that the goods were stolen.",
    rows: [
      r("purpose", "Permitted 404(b) purpose in this case", "Knowledge", ["knowledge goods were stolen"]),
      r("rule", "Which preliminary-fact provision governed whether the televisions were stolen?", "104(b)", ["104b", "104 b"]),
      r("judge", "Must the judge independently find the other act proved by a preponderance?", "No", ["screen only", "no independent finding"]),
      r("jury", "The judge asks whether a reasonable jury could find the conditional fact by a…", "Preponderance", ["preponderance of the evidence", "more likely than not"], "A proper purpose, Rule 403 review, and a requested limiting instruction remain important safeguards."),
    ],
  },
];

function identifyCases(key, title, cases) {
  return drill(`cases-identify-${key}`, title,
    "Read each fact pattern and name the case. Surnames are enough. Answer or reveal to see the citation and principle.",
    [g("names", "Name the Case", ...cases.map(item => r(item.key, item.facts, item.short,
      [item.name, item.listedName, ...item.aliases], `${item.name}, ${item.citation}. Topic: ${item.topic}.`)))],
    [master, scope, "For holdings and direct opinion links, select the individual case drills in this section."]);
}

export const evidenceCaseSubject = {
  id: "evidence-master-cases",
  title: "Master Case List",
  questions: [
    identifyCases("midterm", "Name the Case: Three in the Midterm Slides", evidenceCases.filter(item => item.midterm)),
    identifyCases("all", "Name the Case: All 13 Master-List Cases", evidenceCases),
    ...evidenceCases.map(item => drill(`case-${item.key}`, `${item.short}: ${item.topic}${item.midterm ? " · Midterm slides" : " · Later topics"}`,
      `${item.facts} Recall the short answer for each issue; explanations appear after answering or revealing.`,
      [g("principles", "Recall the Principle", ...item.rows)],
      [master, scope, `${item.name}, ${item.citation}.`, ...(item.notes ?? [])], item.sourceUrl, `${item.name} — Supreme Court opinion`)),
  ],
};
