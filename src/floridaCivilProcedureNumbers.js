// Scope comes from the professor's FL Civ - Numbers to Know.docx, not the
// comprehensive timeline bank. Rule clarifications are identified below.
const id = "fl-civpro-numbers-to-know";
const rules = "https://www-media.floridabar.org/uploads/2026/04/Civil-Procedure-Rules-04-01-26.pdf";

function item(key, indicator, answer, acceptedAnswers = []) {
  return { id: `${id}-${key}`, indicator, answer, acceptedAnswers };
}

function period(key, indicator, value, unit = "days") {
  const words = { 5: "five", 10: "ten", 15: "fifteen", 20: "twenty", 30: "thirty", 40: "forty", 45: "forty five", 60: "sixty", 120: "one hundred twenty" };
  return item(key, indicator, `${value} ${unit}`, [String(value), `${words[value]} ${unit}`]);
}

export const floridaCivilProcedureNumbersQuestion = {
  id,
  type: "sporcle-grid",
  clueLayout: "above",
  answerMatching: "active",
  title: "Timelines: FL Civ — Numbers to Know (Professor’s Core)",
  prompt: "Start here: your professor’s handout is the core timeline checklist. Work one column at a time, reveal, then practice missed answers. Aim for two accurate recalls on separate days before adding optional mixed review. Enter the time, number, or event requested; bare numbers work. Summary judgment uses the current rule; see Course material for the handout discrepancy and clarifications.",
  sourceUrl: rules,
  sourceLabel: "Rule checks for the professor’s handout — Florida Rules of Civil Procedure (April 2026)",
  courseSources: [
    "Principal source: FL Civ - Numbers to Know.docx, professor-provided course handout. All 12 timing rows and all 3 other-number rows are represented; grouped clocks are separated into individual blanks. This is one core drill, not another comprehensive deadline list.",
    "Summary judgment — confirm the course expectation with your professor: the handout says ‘20 days prior to summary judgement hearing’ for the motion. Current Rule 1.510(c)(5)–(6) instead gives the nonmovant 40 days after motion service to respond and sets the hearing at least 10 days after the response deadline, unless stipulated or ordered otherwise. The two marked blanks test those current clocks, not the handout’s 20-day statement. Checked September 25, 2026.",
    "Amendment clarification: the handout’s 20-day shorthand applies when no responsive pleading is permitted and the case is not on the trial calendar. Otherwise, one amendment is allowed before service of a responsive pleading; later amendment requires leave or written consent. Rule 1.190(a).",
    "Discovery clarification: the handout’s 30-day deposition entry describes the plaintiff’s early-deposition leave period, not a universal waiting period. Rule 1.310(a) has exceptions. Interrogatories may be served on a defendant with or after process and the initial pleading under Rule 1.340(a)(2); applicable initial-disclosure requirements under Rule 1.280(f) also govern discovery.",
    "Post-trial clarification: ‘Interview Jurors’ means moving for permission to interview, not conducting an interview as of right. Rehearing in a nonjury case runs from filing of judgment, not a jury verdict. Rules 1.431(h), 1.480(b), and 1.530(b).",
    "Other numbers: ordinary peremptory challenges exclude alternate-juror and unequal-party adjustments; six jurors is the ordinary civil jury (§ 69.071); the interrogatory cap includes subparts unless the court permits more. Rules 1.431(d), 1.340(a)(3).",
  ],
  columns: [
    {
      id: `${id}-starting`,
      title: "1 · Starting the Case",
      answers: [
        period("answer", "Ordinary answer to a complaint, counterclaim, third-party complaint, or crossclaim — after service on that party (process and initial pleading for a complaint).", 20),
        period("service", "Serve the initial complaint and process — within how long after filing the initial pleading directed to that defendant? Extensions may apply.", 120),
        period("track", "Court assigns the case management track — within how long after commencement of a nonexempt action?", 120),
        period("jury-demand", "Demand a jury — no later than how long after service of the last pleading directed to the issue?", 10),
        period("amendment", "Amend once as of right when NO responsive pleading is permitted and the case is not on the trial calendar — within how long after service of that pleading?", 20),
        period("interrogatories-response", "Answer or object to interrogatories — ordinary period after service of the interrogatories?", 30),
        period("interrogatories-initial", "Interrogatories served with process and the initial pleading on a defendant — response period measured from that service, unless the court changes it?", 45),
      ],
    },
    {
      id: `${id}-discovery`,
      title: "2 · Discovery and Resolution",
      answers: [
        period("deposition", "Plaintiff generally needs leave to take a deposition during what period after process and the initial pleading are served on any defendant? Exceptions and disclosure requirements apply.", 30),
        item("serve-interrogatories", "When may interrogatories be served on a defendant under Rule 1.340(a)(2)? Assume applicable initial-disclosure requirements are satisfied.", "With or after service of process and the initial pleading", ["with or after the complaint", "with or after service of the complaint", "with or after service", "with or after initial pleading", "after service of complaint or with complaint", "with the complaint or after", "with or after process and initial pleading"]),
        period("inactivity", "Failure to prosecute — how long without record activity triggers the ordinary notice procedure (not automatic dismissal)?", 10, "months"),
        period("inactivity-cure", "Failure to prosecute — time after service of the inactivity notice to resume record activity?", 60),
        period("good-cause", "Failure to prosecute — written good cause must be shown at least how long BEFORE the dismissal hearing?", 5),
        period("summary-response", "Current-rule clarification: summary-judgment nonmovant’s response — no later than how long AFTER service of the motion? Rule 1.510(c)(5).", 40),
        period("summary-hearing", "Current-rule clarification: summary-judgment hearing — at least how long AFTER the response deadline, unless stipulated or ordered otherwise? Rule 1.510(c)(6).", 10),
        item("directed-verdict", "Directed verdict — at the close of whose evidence does the handout place the motion?", "The other side’s evidence", ["other side", "opposing party", "opposing party's evidence", "adverse party", "adverse party's evidence", "at the close of the other side's evidence", "close of opposing party's evidence"]),
      ],
    },
    {
      id: `${id}-trial`,
      title: "3 · Trial and Other Numbers",
      answers: [
        item("poll", "Poll the jury — after the verdict, but before what event?", "The jury is discharged", ["jury discharged", "jury discharge", "discharge", "before jury discharged", "before the jury is discharged", "after verdict before jury discharged"]),
        period("renew-directed", "Belated / renewed directed-verdict motion — serve within how long after return of the verdict, after a timely earlier directed-verdict motion?", 15),
        period("new-trial", "New-trial motion in a jury case — serve within how long after return of the verdict?", 15),
        period("juror-interview", "Motion for permission to interview jurors — serve within how long after rendition of the verdict, absent good cause for delay?", 15),
        period("rehearing", "Rehearing motion in a nonjury case — serve within how long after filing of the judgment?", 15),
        item("peremptory", "Ordinary peremptory challenges per party — excluding alternate-juror and unequal-party adjustments?", "3", ["three", "3 challenges", "three challenges"]),
        item("jurors", "Jurors in an ordinary Florida civil jury (excluding alternates)?", "6", ["six", "6 jurors", "six jurors"]),
        item("interrogatory-cap", "Maximum interrogatories, including subparts, unless the court permits more?", "30", ["thirty", "30 interrogatories", "thirty interrogatories"]),
      ],
    },
  ],
};
