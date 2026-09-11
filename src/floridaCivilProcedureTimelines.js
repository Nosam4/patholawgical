// Timelines from Allen's handout, with related rule details checked against
// the official compilations on 2026-09-11. Each clock is explicit: deadlines,
// minimum waiting periods, advance notice, and disposition targets differ.
const civil = "https://www-media.floridabar.org/uploads/2026/04/Civil-Procedure-Rules-04-01-26.pdf";
const admin = "https://www-media.floridabar.org/uploads/2026/08/2027_01-JULY-Florida-Rules-of-General-Practice-and-Judicial-Administration-7-1-2026.pdf";
const appeals = "https://www-media.floridabar.org/uploads/2026/06/Appellate-Court-Rules-07-01-26.pdf";
const small = "https://www-media.floridabar.org/uploads/2026/08/2026_01-JUL-Small-Claims-Rules-7-1-2026-1.pdf";
const nursing = "https://www.flsenate.gov/Laws/Statutes/2026/400.0233";
const venue = "https://flsenate.gov/Laws/Statutes/2026/0047.101";

// A single source of truth generates both duration recall and procedure recall.
function timeline(id, period, action, clock, rule, aliases = [], sourceUrl = civil) {
  return { id, period, action, clock, rule, aliases, sourceUrl };
}

export const floridaTimelineTopics = [
  {
    id: "service", title: "Service and Venue", pages: "4–11",
    timelines: [
      timeline("serve-process", "120 days", "Serve initial process and pleading", "Deadline after filing the initial pleading directed to that defendant; extensions may apply.", "1.070(j)", ["service of process", "serve process", "serve complaint"]),
      timeline("waiver-us", "20 days", "Return a U.S. service waiver", "Time allowed after receipt of the waiver request at a U.S. address.", "1.070(i)(2)(F)", ["domestic waiver", "return domestic waiver", "waive service in US"]),
      timeline("waiver-abroad", "30 days", "Return a service waiver from outside the U.S.", "Time allowed after receipt of the waiver request at an address outside the U.S.", "1.070(i)(2)(F)", ["foreign waiver", "international waiver", "waive service abroad"]),
      timeline("waived-answer", "60 days", "Respond to complaint after timely waiver", "Deadline measured from receipt of the waiver request, if waiver is timely returned before formal service.", "1.070(i)(4)", ["answer after waiver", "waiver answer", "waived service answer"]),
      timeline("forum-non-conveniens", "60 days", "Move to dismiss for forum non conveniens", "Serve motion no later than this period after service of process on the moving party.", "1.061(g)", ["forum non conveniens", "FNC"]),
      timeline("venue-fair-trial", "10 days", "Move for a fair-trial change of venue", "Statutory wording: file NOT LESS THAN this period after the action is at issue, unless good cause excuses failure. Allen p. 10 uses different timing language; this asks the statute's wording.", "§ 47.101(2)", ["change of venue", "fair trial venue motion"], venue),
    ],
  },
  {
    id: "pleadings", title: "Pleadings and Parties", pages: "12–17, 23",
    timelines: [
      timeline("answer", "20 days", "Respond to an ordinarily served complaint", "Default period after original process and initial pleading are served; respond by answer or an authorized pre-answer motion.", "1.140(a)(1)", ["answer", "answer complaint", "pre answer motion"]),
      timeline("state-answer", "40 days", "State's ordinary responsive pleading", "After service on the state, a state agency, or an official-capacity officer/employee; excludes the § 768.28 exception.", "1.140(a)(2)(A)", ["state answer", "state agency answer"]),
      timeline("state-tort-answer", "30 days", "State agency's § 768.28 responsive pleading", "After service on the Department of Financial Services or defendant state agency when sued under § 768.28.", "1.140(a)(2)(B)", ["state tort answer", "768.28 answer"]),
      timeline("counterclaim-answer", "20 days", "Answer a counterclaim", "Ordinary deadline after service of the counterclaim.", "1.140(a)(1)", ["counterclaim answer"]),
      timeline("crossclaim-answer", "20 days", "Answer a crossclaim", "Ordinary deadline after service of the crossclaim.", "1.140(a)(1)", ["crossclaim answer"]),
      timeline("reply", "20 days", "Serve a required reply", "After service of the answer requiring a reply.", "1.140(a)(1)", ["reply", "reply to affirmative defense"]),
      timeline("denied-motion", "10 days", "Respond after denial of a Rule 1.140 motion", "After filing of the denial order, or order postponing disposition until trial; unless court sets another period. Excludes motions that do not alter response time.", "1.140(a)(3)", ["answer after denied motion", "answer after denial"]),
      timeline("definite-response", "10 days", "Respond to a more definite statement", "After service of the more definite statement, unless the court fixes another period.", "1.140(a)(3)", ["answer more definite statement", "response to more definite statement"]),
      timeline("amend-no-response", "20 days", "Amend once when no responsive pleading is permitted", "After service of that pleading, provided the action has not been placed on the trial calendar.", "1.190(a)", ["amend answer", "amend as of right", "amendment as of right"]),
      timeline("amended-answer", "10 days", "Respond to an amended pleading", "After service of the amended pleading, unless court orders otherwise.", "1.190(a)", ["answer amended complaint", "amended pleading response"]),
      timeline("impleader", "20 days", "File third-party complaint without leave", "No later than this period after the defendant serves the original answer.", "1.180(a)", ["impleader", "third party complaint"]),
    ],
  },
  {
    id: "discovery", title: "Discovery", pages: "26–33",
    timelines: [
      timeline("disclosures", "60 days", "Make initial discovery disclosures", "After service of the complaint or joinder; exemptions and a different court-ordered time may apply.", "1.280(a)(3)", ["initial disclosures", "discovery disclosures"]),
      timeline("early-deposition", "30 days", "Plaintiff's early-deposition leave period", "After process and initial pleading are served on any defendant: plaintiff generally needs leave to depose during this period. Rule exceptions and initial-disclosure obligations also apply.", "1.310(a)", ["early deposition", "plaintiff deposition leave"]),
      timeline("interrogatories", "30 days", "Answer or object to interrogatories", "Ordinary response period after service of the interrogatories.", "1.340(a)(9)", ["interrogatories", "interrogatory response"]),
      timeline("interrogatories-initial", "45 days", "Defendant's initial interrogatory protection", "Defendant need not respond before this period after service of process and the initial pleading, unless court shortens the time; compare the ordinary request-based period.", "1.340(a)(9)", ["initial interrogatories", "interrogatories with complaint"]),
      timeline("production", "30 days", "Respond to a party's production request", "Ordinary response period after service of a request for documents, things, or entry on land.", "1.350(b)", ["production request", "request for production", "RFP"]),
      timeline("production-initial", "45 days", "Defendant's initial production-response protection", "Defendant need not respond before this period after service of process and initial pleading, unless the court orders otherwise.", "1.350(b)", ["initial production", "production with complaint"]),
      timeline("examination", "30 days", "Respond to a physical-examination request", "Ordinary response period after service of the examination request.", "1.360(a)(1)(A)", ["physical exam response", "examination response"]),
      timeline("examination-initial", "45 days", "Defendant's initial examination-response protection", "Defendant need not respond before this period after process and initial pleading, subject to court adjustment.", "1.360(a)(1)(A)", ["initial examination", "exam with complaint"]),
      timeline("admissions", "30 days", "Answer or object to requests for admission", "Ordinary response period after service; silence can result in admission.", "1.370(a)(6)", ["admissions", "requests for admission", "RFA"]),
      timeline("admissions-initial", "45 days", "Defendant's initial admission-response protection", "Defendant need not respond before this period after process and initial pleading, unless court shortens the time.", "1.370(a)(6)", ["initial admissions", "admissions with complaint"]),
      timeline("subpoena-delivery", "10 days", "Nonparty document subpoena: delivered or emailed notice", "Minimum wait after notice to every other party before issuing subpoena without deposition; timely objection prevents production pending resolution.", "1.351(b)", ["nonparty subpoena delivered notice", "subpoena email notice"]),
      timeline("subpoena-mail", "15 days", "Nonparty document subpoena: mailed notice", "Minimum wait after mailed notice to every other party before issuing subpoena without deposition; this rule supplies its own mail period.", "1.351(b)", ["nonparty subpoena mailed notice", "subpoena mail notice"]),
      timeline("subpoena-initial", "45 days", "Nonparty document subpoena: notice with original process", "Do not issue earlier than this period after service on the last-served party.", "1.351(b)", ["subpoena notice with complaint", "initial subpoena notice"]),
    ],
  },
  {
    id: "management", title: "Case Management", pages: "34–39",
    timelines: [
      timeline("track", "120 days", "Assign the case management track", "No later than this period after commencement, for nonexempt civil actions.", "1.200(b)", ["track assignment", "assign track"]),
      timeline("cmo", "120 days", "Issue general or streamlined case management order", "No later than this period after commencement.", "1.200(d)(4)", ["general CMO", "streamlined CMO", "case management order"]),
      timeline("complex-conference", "60 days", "Hold initial complex case management conference", "Within this period from the order declaring the action complex.", "1.201(b)", ["initial complex conference", "complex initial CMC"]),
      timeline("complex-confer", "20 days", "Confer before initial complex conference", "At least this far BEFORE the initial complex case management conference; prepare a joint statement.", "1.201(b)(1)", ["initial complex conferral", "complex preconference conferral"]),
      timeline("complex-statement", "14 days", "File initial complex joint statement", "No later than this far BEFORE the initial complex case management conference.", "1.201(b)(1)", ["complex joint statement", "file joint statement"]),
      timeline("complex-cmo", "10 days", "Enter complex case management order", "Within this period AFTER completion of the initial complex conference.", "1.201(c)", ["complex CMO", "complex case management order"]),
      timeline("complex-earliest-trial", "6 months", "Earliest usual complex-case trial setting", "Measured AFTER the initial case management conference; good cause can justify an earlier setting.", "1.201(b)(3)", ["earliest complex trial", "complex trial minimum"]),
      timeline("complex-latest-trial", "24 months", "Latest usual complex-case trial setting", "Measured AFTER the initial case management conference; good cause can justify a later setting.", "1.201(b)(3)", ["latest complex trial", "complex trial maximum"]),
      timeline("complex-jurors", "2 months", "Arrange sufficient jurors for complex trial", "Court must arrange jurors no later than this far BEFORE scheduled jury selection.", "1.201(b)(3)", ["complex jury arrangements", "arrange jurors"]),
      timeline("complex-later-confer", "15 days", "Confer before later complex conferences or lengthy-motion hearings", "No later than this far BEFORE each conference or hearing under the complex CMO provision.", "1.201(c)(4)", ["later complex conferral", "periodic conference conferral"]),
      timeline("complex-final-conference", "90 days", "Hold final complex case management conference", "Not less than this far BEFORE the date set for trial.", "1.201(d)", ["final complex conference", "final CMC"]),
      timeline("complex-final-confer", "10 days", "Confer to prepare final complex status report", "At least this far BEFORE the final case management conference.", "1.201(d)", ["final complex conferral", "final status report conferral"]),
      timeline("complex-lists", "48 hours", "File complex witness and exhibit lists", "At least this far BEFORE the date and time of the final case management conference.", "1.201(d)(6)", ["complex witness exhibit lists", "witness and exhibit lists"]),
    ],
  },
  {
    id: "resolution", title: "Summary Judgment, Settlement, and Dismissal", pages: "40–44",
    timelines: [
      timeline("inactivity", "10 months", "Trigger ordinary civil failure-to-prosecute notice", "No record activity for this period, with no applicable stay; this is the notice trigger, not automatic dismissal.", "1.420(e)", ["civil inactivity notice", "failure to prosecute notice"]),
      timeline("inactivity-cure", "60 days", "Resume record activity after inactivity notice", "Period AFTER service of the ordinary civil inactivity notice; activity or a stay may prevent dismissal, and written good cause may also apply.", "1.420(e)", ["inactivity cure", "resume prosecution", "failure to prosecute cure"]),
      timeline("inactivity-cause", "5 days", "Show written good cause against dismissal for inactivity", "At least this far BEFORE the dismissal hearing.", "1.420(e)", ["written good cause", "good cause against dismissal"]),
      timeline("summary-earliest", "20 days", "Earliest ordinary summary-judgment motion", "After expiration of this period from commencement, or after the adverse party serves a summary-judgment motion; comply with court deadlines.", "1.510(b)", ["move summary judgment", "earliest summary judgment"]),
      timeline("summary-response", "40 days", "Respond to summary judgment with factual support", "No later than this period AFTER service of the motion.", "1.510(c)(5)", ["summary judgment response", "nonmovant response"]),
      timeline("summary-hearing", "10 days", "Earliest ordinary summary-judgment hearing", "At least this long AFTER the response deadline; stipulation or court order may alter timing.", "1.510(c)(6)", ["summary judgment hearing", "hearing gap"]),
      timeline("proposal-to-defendant", "90 days", "Earliest settlement proposal to defendant", "No earlier than this period AFTER service of process on that defendant.", "1.442(b)", ["proposal to defendant", "plaintiff settlement offer"]),
      timeline("proposal-to-plaintiff", "90 days", "Earliest settlement proposal to plaintiff", "No earlier than this period AFTER commencement of the action.", "1.442(b)", ["proposal to plaintiff", "defendant settlement offer"]),
      timeline("proposal-cutoff", "45 days", "Last opportunity to serve settlement proposal", "At least this far BEFORE trial or first day of the trial docket, whichever is earlier.", "1.442(b)", ["proposal cutoff", "settlement offer cutoff"]),
      timeline("proposal-accept", "30 days", "Accept an ordinary proposal for settlement", "Deliver written acceptance within this period AFTER service; Rule 2.514(b)'s mail extension does not apply. Class-certification exception excluded here.", "1.442(f)(1)", ["accept settlement proposal", "accept proposal"]),
      timeline("binding-decision", "10 days", "Serve and file binding arbitration decision", "Within this period AFTER final adjournment of the voluntary binding arbitration hearing.", "1.830(c)(1)", ["binding arbitration decision", "arbitration award"]),
      timeline("binding-appeal", "30 days", "Appeal voluntary binding arbitration decision", "Within this period AFTER service of the decision; review is limited to statutory grounds.", "1.830(c)(2)", ["binding arbitration appeal", "appeal arbitration"]),
      timeline("nonbinding-rejection", "20 days", "Reject nonbinding arbitration and request trial", "File notice of rejection and request for trial within this period AFTER service of the written decision.", "1.820(h)", ["reject nonbinding arbitration", "request trial after arbitration"]),
    ],
  },
  {
    id: "trial", title: "Trial, Post-Trial, and Appeal", pages: "45–52",
    timelines: [
      timeline("jury-demand", "10 days", "Demand ordinary civil jury trial", "No later than this period AFTER service of the last pleading directed to the issue.", "1.430(b)", ["jury demand", "demand jury trial"]),
      timeline("trial-notice", "30 days", "Minimum notice from trial-setting order", "Trial period begins at least this long AFTER court service of the order, unless all parties agree otherwise.", "1.440(c)(4)", ["trial setting notice", "notice of trial"]),
      timeline("disqualify", "20 days", "Move to disqualify a judge", "File within a reasonable time not exceeding this period after discovery of grounds by party or counsel, whichever is earlier.", "2.330(g)", ["judge disqualification", "disqualify judge", "recusal motion"], admin),
      timeline("renew-directed", "15 days", "Renew directed-verdict motion after verdict", "Serve within this period AFTER return of the verdict, having made the required earlier directed-verdict motion.", "1.480(b)", ["renew directed verdict", "set aside verdict"]),
      timeline("new-trial", "15 days", "Serve motion for new trial or rehearing", "Seek a fresh trial or rehearing after return of verdict in jury action or filing of judgment in nonjury action.", "1.530(b)", ["new trial", "rehearing", "new trial motion"]),
      timeline("court-new-trial", "15 days", "Court orders new trial on its own initiative", "Ordinary period AFTER filing of judgment; court may also act within the time of ruling on a timely party motion under Rule 1.530(d).", "1.530(d)", ["sua sponte new trial", "court initiated new trial"]),
      timeline("remittitur", "15 days", "Serve motion for remittitur or additur", "Seek a decrease or increase in damages after return of verdict in jury action or filing of judgment in nonjury action.", "1.530(h)(1)", ["remittitur", "additur", "remittitur or additur"]),
      timeline("damages-election", "15 days", "Elect damages retrial after remittitur or additur", "File written election within this period AFTER the order is filed, if adversely affected.", "1.530(h)(3)", ["damages retrial election", "reject remittitur", "reject additur"]),
      timeline("fees", "30 days", "Serve motion for costs and attorney fees", "No later than this period AFTER filing of the judgment (including dismissal judgment) or service of voluntary-dismissal notice concluding the action as to that party.", "1.525", ["attorney fees motion", "costs motion", "fees and costs"]),
      timeline("judgment-relief", "12 months", "Outer limit for mistake, new evidence, or fraud relief", "Within a reasonable time, no more than this period AFTER the judgment, decree, order, or proceeding was entered or taken.", "1.540(b)(1)–(3)", ["relief from judgment", "fraud relief", "rule 1.540 relief"]),
      timeline("appeal", "30 days", "File ordinary final-order notice of appeal", "Within this period AFTER rendition; only authorized, timely motions delay rendition. A Rule 1.540 motion does not automatically toll it.", "App. 9.110(b); 9.020(h)", ["notice of appeal", "appeal final judgment"], appeals),
      timeline("asset-sheet", "45 days", "Serve ordered judgment-debtor fact information sheet", "Period in Rule 1.560(c)'s model order measured AFTER final judgment; unless satisfied or postjudgment discovery stayed.", "1.560(c)", ["fact information sheet", "debtor asset sheet"]),
    ],
  },
  {
    id: "special", title: "Small Claims and Nursing-Home Presuit", pages: "52–54",
    timelines: [
      timeline("small-pretrial", "50 days", "Hold small-claims pretrial conference", "Usual maximum period AFTER filing the action; service-related exceptions apply.", "Small Claims 7.090(b)", ["small claims pretrial", "small claims conference"], small),
      timeline("small-trial", "60 days", "Set small-claims trial after pretrial conference", "Usual maximum period AFTER the pretrial conference; court-approved stipulation may alter it.", "Small Claims 7.090(d)", ["small claims trial", "small claims trial setting"], small),
      timeline("small-notice", "10 days", "Give small-claims trial notice", "Usual minimum notice BEFORE the time of trial.", "Small Claims 7.090(d)", ["small claims trial notice"], small),
      timeline("small-inactivity", "6 months", "Small-claims inactivity period for dismissal", "No record activity for this period; separate advance notice, stay, and written-good-cause safeguards apply.", "Small Claims 7.110(e)", ["small claims inactivity", "small claims failure to prosecute"], small),
      timeline("small-dismissal-notice", "30 days", "Give small-claims inactivity-dismissal notice", "Advance notice to the parties BEFORE dismissal for failure to prosecute.", "Small Claims 7.110(e)(2)", ["small claims dismissal notice"], small),
      timeline("nursing-investigation", "75 days", "Nursing-home presuit investigation/no-suit period", "Measured AFTER presuit notice is mailed; no suit during this period and defendant must respond by its end. Extensions may be stipulated.", "§ 400.0233(3)–(4)", ["nursing home presuit", "nursing home investigation"], nursing),
      timeline("nursing-accept", "15 days", "Accept nursing-home presuit settlement offer", "Deliver written acceptance within this period AFTER receipt of the offer.", "§ 400.0233(9)", ["nursing home offer acceptance", "accept nursing offer"], nursing),
      timeline("nursing-mediation", "30 days", "Meet for nursing-home presuit mediation", "Within this period AFTER claimant receives defendant's response; parties may stipulate to an extension.", "§ 400.0233(11)", ["nursing home mediation", "presuit mediation"], nursing),
      timeline("nursing-suit", "60 days", "Minimum postmediation nursing-home filing window", "AFTER mediation concludes: this period OR the remaining statute of limitations, whichever is greater.", "§ 400.0233(11)", ["nursing home filing window", "sue after nursing mediation"], nursing),
    ],
  },
  {
    id: "counting", title: "Mail and Records", pages: "13–14, 52",
    timelines: [
      timeline("mail-extension", "5 days", "Add time for qualifying mail-only service", "Additional time when a period runs AFTER service made ONLY by mail, unless an exception applies; not an automatic addition to every deadline.", "2.514(b)", ["mail extension", "mail only service extension"], admin),
      timeline("records-hearing", "30 days", "Hear nonparty motion to unseal civil court records", "As soon as practicable, no later than this period AFTER filing the Rule 2.420(e)(6) motion, unless all parties and affected nonparties agree to the relief.", "2.420(e)(6)", ["unsealing hearing", "records access hearing"], admin),
      timeline("records-ruling", "30 days", "Rule on nonparty civil-record unsealing motion", "Deadline AFTER the hearing on the Rule 2.420(e)(6) motion.", "2.420(e)(6)", ["unsealing ruling", "records access ruling"], admin),
    ],
  },
  {
    id: "targets", title: "Court Disposition Targets", pages: "35, 38–39",
    timelines: [
      timeline("target-complex", "30 months", "Complex civil case disposition target", "To final disposition from service on last defendant OR 120 days after commencement, whichever occurs first. These are court time standards, not automatic dismissal deadlines.", "2.250(a)(1)(B)(i)", ["complex disposition target", "complex case target"], admin),
      timeline("target-jury", "18 months", "Other civil jury case disposition target", "To final disposition from service on last defendant or 120 days after commencement, whichever occurs first; court time standard.", "2.250(a)(1)(B)(ii)", ["jury disposition target", "jury case target"], admin),
      timeline("target-nonjury", "12 months", "Other civil nonjury case disposition target", "To final disposition from service on last defendant or 120 days after commencement, whichever occurs first; court time standard.", "2.250(a)(1)(B)(iii)", ["nonjury disposition target", "nonjury case target"], admin),
      timeline("target-small", "95 days", "Small-claims disposition target", "From commencement to final disposition; different standards apply if invoked civil rules eliminate the small-claims trial deadline.", "2.250(a)(1)(B)(iv)", ["small claims disposition target", "small claims case target"], admin),
    ],
  },
];

export const floridaCivilProcedureTimelines = floridaTimelineTopics.flatMap((topic) =>
  topic.timelines.map((item) => ({ ...item, topicId: topic.id, topicTitle: topic.title, outlinePages: topic.pages })),
);

function periodAliases(period) {
  const [number, unit] = period.split(" ");
  const words = { 2: "two", 5: "five", 6: "six", 10: "ten", 12: "twelve", 14: "fourteen", 15: "fifteen", 18: "eighteen", 20: "twenty", 24: "twenty four", 30: "thirty", 40: "forty", 45: "forty five", 48: "forty eight", 50: "fifty", 60: "sixty", 75: "seventy five", 90: "ninety", 95: "ninety five", 120: "one hundred twenty" };
  const aliases = [number, `${number} ${unit.slice(0, -1)}`, `${words[number]} ${unit}`];
  if (period === "12 months") aliases.push("1 year", "one year");
  if (period === "24 months") aliases.push("2 years", "two years");
  // Do not equate calendar months with a fixed number of days.
  return aliases;
}

function makeQuestion(id, title, prompt, items, reverse = false) {
  const questionId = `fl-civpro-timelines-${id}`;
  return {
    id: questionId,
    type: "sporcle-grid",
    clueLayout: "above",
    answerMatching: "active",
    title: `Timelines: ${title}`,
    prompt: `${prompt} Check the selected blank only. Periods are the stated defaults or limits; each clue identifies the clock and qualifications. Based on FL.Allen.CivilProcedure.pdf plus the cited rules, checked September 11, 2026.`,
    sourceUrl: "https://www.floridabar.org/rules/ctproc/",
    sourceLabel: "Official Florida rule compilations; specific rules and outline pages appear in each clue",
    columns: Array.from({ length: Math.ceil(items.length / 8) }, (_, index) => ({
      id: `${questionId}-set-${index + 1}`,
      title: reverse ? `Name the Procedure${items.length > 8 ? ` · Set ${index + 1}` : ""}` : `Supply the Time${items.length > 8 ? ` · Set ${index + 1}` : ""}`,
      answers: items.slice(index * 8, index * 8 + 8).map((item) => ({
        id: `${questionId}-${item.id}`,
        timelineId: item.id,
        indicator: `${reverse ? item.topicTitle : item.action} — ${item.clock} [${item.rule}; Allen pp. ${item.outlinePages}]`,
        answer: reverse ? item.action : item.period,
        acceptedAnswers: reverse ? item.aliases : periodAliases(item.period),
        sourceUrl: item.sourceUrl,
        sourceLabel: item.rule,
      })),
    })),
  };
}

// Interleave topics in the mixed review so neighboring answers are less predictable.
const mixedTimelines = [];
for (let row = 0; row < Math.max(...floridaTimelineTopics.map((topic) => topic.timelines.length)); row += 1) {
  for (const topic of floridaTimelineTopics) {
    const item = floridaCivilProcedureTimelines.find((entry) => entry.id === topic.timelines[row]?.id);
    if (item) mixedTimelines.push(item);
  }
}
const unitOrder = { hours: 0, days: 1, months: 2 };
const periods = [...new Set(floridaCivilProcedureTimelines.map((item) => item.period))]
  .sort((a, b) => unitOrder[a.split(" ")[1]] - unitOrder[b.split(" ")[1]] || parseInt(a) - parseInt(b));

export const floridaCivilProcedureTimelineQuestions = [
  makeQuestion("mixed", "All Deadlines — Mixed Review", "Name the period for each procedure. Include days, months, or hours; a bare number also works.", mixedTimelines),
  {
    id: "fl-civpro-timelines-clock-rules",
    type: "sporcle-grid",
    clueLayout: "above",
    answerMatching: "active",
    title: "Timelines: Counting Time and Special Clocks",
    prompt: "Recall how clocks work, including deadlines that are not a fixed number of days. Rule 2.514 controls general computation unless a specific provision supplies another method.",
    sourceUrl: admin,
    sourceLabel: "Florida Rules of General Practice and Judicial Administration, Rule 2.514 (July 2026)",
    columns: [{
      id: "clock-rules",
      title: "How to Count",
      answers: [
        ["start", "For a period of 7 days or longer, begin on which day after the triggering event?", "Next day that is not a weekend or legal holiday", ["next business day", "next nonholiday weekday"]],
        ["middle", "For a period of 7 days or longer, count intervening weekends and holidays?", "Yes", ["count them", "include them"]],
        ["short", "For a day-based period shorter than 7 days, count weekends and legal holidays?", "No", ["exclude them", "skip them"]],
        ["last", "When the final day is a weekend or holiday, move to which day?", "Next nonholiday weekday", ["next business day"]],
        ["backward", "For an advance-notice period measured BEFORE an event, count in which direction?", "Backward", ["backwards"]],
        ["filing", "Default electronic-filing deadline on the last day, in Eastern time?", "11:59:59 p.m.", ["11:59:59 pm eastern", "before midnight", "by midnight", "midnight"]],
        ["support", "Rule 1.510(c)(5): when must the summary-judgment movant serve its supporting factual position?", "When filing the motion", ["with the motion", "at filing", "same time"]],
        ["relief", "Rule 1.540(b): general time standard for relief from judgment, in addition to any applicable outer limit?", "Reasonable time", ["within a reasonable time"]],
      ].map(([id, indicator, answer, acceptedAnswers]) => ({ id: `fl-civpro-clock-${id}`, indicator, answer, acceptedAnswers })),
    }],
  },
  ...floridaTimelineTopics.map((topic) => makeQuestion(topic.id, topic.title, "Name the period for each procedure.", floridaCivilProcedureTimelines.filter((item) => item.topicId === topic.id))),
  ...periods.map((period) => makeQuestion(`period-${period.replace(" ", "-")}`, `${period} — Name the Procedures`, `Every answer uses ${period}. Recall the PROCEDURE that fits each clock; do not enter the duration.`, floridaCivilProcedureTimelines.filter((item) => item.period === period), true)),
];
