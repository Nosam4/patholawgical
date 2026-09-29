// Course-scoped recall framework requested in chat, not a complete admissibility outline.
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const column = (key, title, ...answers) => ({ key, title, answers });

const caseDistinctions = [
  { rule: "104(c)(2), (d)", text: "Criminal defendant testifying on a preliminary question: on request, the hearing must be outside the jury's hearing; that testimony does not open cross-examination on other issues.", source: "104" },
  { rule: "404(a)(2)", text: "Criminal only: defendant/victim character exceptions and prosecution rebuttal; homicide cases also allow victim peacefulness to rebut first-aggressor evidence. These exceptions do not apply in civil cases.", source: "404" },
  { rule: "404(b)(3)", text: "Criminal only: prosecution must give reasonable notice of other-act evidence, its permitted purpose, and supporting reasoning, in writing before trial unless good cause excuses pretrial notice. Nonpropensity uses under 404(b)(2) apply in both case types.", source: "404" },
  { rule: "408(a)(2)", text: "Criminal exception: negotiation statements or conduct concerning a public office's regulatory, investigative, or enforcement claim may be used despite 408(a)(2). This exception does not extend to the settlement offer/payment itself under 408(a)(1).", source: "408" },
  { rule: "410(a), (b)(2)", text: "Protected pleas and plea statements are excluded against the participating defendant in BOTH civil and criminal cases. The perjury/false-statement exception requires a criminal proceeding and a statement under oath, on the record, with counsel present.", source: "410" },
  { rule: "601", text: "Civil: state competency law governs a claim or defense for which state law supplies the rule of decision. Criminal: the federal competency rule applies.", source: "601" },
  { rule: "609(a)(1)(A)–(B)", text: "Felony impeachment: civil witnesses and criminal witnesses other than the defendant use 403; for a testifying criminal defendant, probative value must outweigh prejudice to that defendant. Check 609's other provisions, including the separate over-10-year standard.", source: "609" },
  { rule: "609(d)", text: "Juvenile adjudications: criminal only, against a witness other than the defendant; an adult conviction must be admissible for impeachment, and admission must be necessary to fairly determine guilt or innocence.", source: "609" },
  { rule: "612(b)–(c)", text: "Refreshing memory: criminal cases are subject to the statutory production exception in 18 U.S.C. § 3500. If the prosecution fails to produce as ordered, the court must strike testimony or, if justice requires, declare a mistrial; otherwise it may issue any appropriate order.", source: "612" },
  { rule: "704(b)", text: "Criminal only: an expert cannot opine whether the defendant had the mental state or condition constituting an element of the charge or a defense. Civil opinions remain subject to the other opinion rules.", source: "704" },
  { rule: "902(12)", text: "Civil only: this self-authentication route covers certified foreign records of regularly conducted activity. It does not itself supply the criminal-case route.", source: "902" },
].map(({ source, ...detail }) => ({ ...detail, sourceUrl: `https://www.law.cornell.edu/rules/fre/rule_${source}` }));

const caseTypeRow = (key, indicator, answer, ...acceptedAnswers) => ({
  ...row(key, indicator, answer, ...acceptedAnswers),
  indicatorDetails: caseDistinctions,
});

function drill(key, title, prompt, columns) {
  const id = `evidence-analysis-${key}`;
  return {
    id,
    title,
    prompt,
    type: "sporcle-grid",
    clueLayout: "above",
    sourceUrl: "https://www.law.cornell.edu/rules/fre",
    sourceLabel: "Federal Rules of Evidence",
    courseSources: [
      "Study checklist adapted from our Evidence discussion on September 29, 2026. This is a study sequence, not a mandatory order prescribed by the rules.",
      "Scope: the current checklist omits privilege (FRE 501–502). Apply only specific rules covered in class; include FRE 105 if covered. The full checklist expands this same framework rather than adding unconfirmed course topics.",
      "FRE 401–403: https://www.law.cornell.edu/rules/fre/rule_401 ; https://www.law.cornell.edu/rules/fre/rule_402 ; https://www.law.cornell.edu/rules/fre/rule_403",
      "FRE 105: https://www.law.cornell.edu/rules/fre/rule_105",
      "Criminal/civil distinctions: pre-midterm assignments through September 29 (Class 13), Evidence Syllabus Fall 2026, plus FRE 704 in the Class 10 expert-opinion slides. Rule links appear beside each distinction. Later rape-shield, hearsay, and privilege units are outside this list.",
    ],
    columns: columns.map(({ key: columnKey, title: columnTitle, answers }) => ({
      id: `${id}-${columnKey}`,
      title: columnTitle,
      answers: answers.map(({ key: answerKey, ...answer }) => ({
        id: `${id}-${answerKey}`,
        ...answer,
      })),
    })),
  };
}

export const evidenceAnalysisSubject = {
  id: "evidence-basic-analysis",
  title: "Basic Analysis",
  questions: [
    drill("condensed", "Basic Analysis: Condensed Checklist",
      "Recall the eight steps for each item of evidence. Short headings and rule numbers work. Use Reveal to read the checklist, then Start Fresh to practice. Specific rules are limited to topics covered in class; include 105 if covered.", [
        column("sequence", "Eight-Step Checklist",
          caseTypeRow("case", "1", "Criminal vs. civil case", "criminal vs civil", "criminal or civil", "case type"),
          row("purpose", "2", "Purpose of the evidence", "purpose", "offered to prove"),
          row("relevance", "3", "Relevance — FRE 401", "relevance", "401", "FRE 401"),
          row("admissibility", "4", "General admissibility — FRE 402", "general admissibility", "402", "FRE 402"),
          row("specific-rule", "5", "Applicable specific rule, exceptions, and permitted purposes", "applicable rule", "specific rule", "applicable specific rule"),
          row("balancing", "6", "Balancing — FRE 403", "balancing", "403", "FRE 403"),
          row("limiting", "7 · If covered", "Limiting instruction — FRE 105", "limiting instruction", "105", "FRE 105"),
          row("conclusion", "8", "Conclude: admit, exclude, or admit for a limited purpose", "conclusion", "conclude", "admit exclude or limit")),
      ]),
    drill("full", "Basic Analysis: Full Checklist",
      "Work through the same eight steps in detail for each item of evidence. Recall the short answers, then explain how the facts satisfy each requirement. Apply specific rules covered in class and include 105 if covered.", [
        column("case", "1. Criminal vs. Civil",
          caseTypeRow("case-type", "Classify the proceeding", "Criminal or civil", "criminal vs civil", "criminal or civil", "case type"),
          row("governing", "Identify the court and governing law", "Governing evidence rules", "governing rules", "applicable evidence rules"),
          row("parties", "Identify the parties' roles for this item", "Who offers it and against whom", "offering party and opposing party", "proponent and opponent")),
        column("purpose", "2. Purpose of the Evidence",
          row("proposition", "State the precise proposition", "What the evidence is offered to prove", "offered to prove", "purpose", "fact to be proved"),
          row("uses", "The same item may have multiple uses", "Admissibility depends on the purpose", "purpose matters", "permitted vs prohibited purpose")),
        column("relevance", "3. Relevance — FRE 401",
          row("tendency", "How much tendency is required?", "Any tendency", "any"),
          row("probability", "Compare the fact's probability with and without the evidence", "More or less probable", "more probable or less probable"),
          row("consequence", "The fact must matter to deciding the action", "Fact of consequence", "of consequence", "consequential fact"),
          row("connection", "Explain: This makes ___ more likely because ___", "Connect the evidence to the fact", "explain the connection", "logical connection")),
        column("admissibility", "4. General Admissibility — FRE 402",
          row("irrelevant", "If the evidence fails 401", "Irrelevant evidence is inadmissible", "inadmissible", "exclude irrelevant evidence"),
          row("relevant", "If the evidence satisfies 401", "Relevant evidence is generally admissible unless another rule or governing law excludes it", "generally admissible", "admissible unless excluded")),
        column("specific-rule", "5. Applicable Specific Rule",
          row("identify", "Use the facts and the purpose to select rules covered in class", "Identify every applicable rule", "identify applicable rules", "applicable rule", "specific rule"),
          row("elements", "Do more than name the rule", "Apply each requirement to the facts", "apply requirements", "apply the rule", "apply elements"),
          row("exceptions", "Check whether a permitted route applies and satisfy its requirements", "Exceptions and permitted purposes", "exceptions", "permitted purposes", "exception or permitted purpose"),
          row("independent", "Passing one rule does not resolve other objections", "Satisfy all applicable restrictions", "all applicable rules", "independent restrictions")),
        column("balancing", "6. Balancing — FRE 403",
          row("value", "Explain the legitimate evidentiary benefit", "Probative value", "probative worth"),
          row("standard", "The dangers must do this to the probative value for exclusion under 403", "Substantially outweigh", "substantially outweighed", "substantially outweigh the probative value"),
          row("prejudice", "Damage to the opposing party alone is insufficient", "Unfair prejudice", "unfairly prejudicial"),
          row("confusion", "Consider the jury's ability to use the evidence properly", "Confusing the issues or misleading the jury", "confusion or misleading the jury", "confusion and misleading the jury"),
          row("efficiency", "Consider the cost of presenting the evidence", "Undue delay, wasting time, or needless cumulative evidence", "delay waste cumulative", "undue delay wasting time cumulative evidence"),
          row("special-test", "Some specific rules prescribe a different balance", "Use the applicable rule's special balancing standard", "special balancing standard", "special balancing test")),
        column("limiting", "7. Limiting Instruction — FRE 105 (If Covered)",
          row("scope", "Identify the permissible scope of admission", "Limited purpose or particular party", "limited purpose", "particular party", "purpose or party"),
          row("request", "What triggers the court's duty under 105?", "Timely request", "upon timely request"),
          row("instruction", "Upon that request, the court must…", "Restrict the evidence to its proper scope and instruct the jury", "restrict scope and instruct jury", "limit the evidence and instruct the jury")),
        column("conclusion", "8. Conclusion",
          row("result", "State the ruling", "Admit, exclude, or admit for a limited purpose", "admit exclude or limit", "admit exclude or limited purpose"),
          row("reason", "Support the result", "Decisive rule and facts", "explain why", "rule and facts", "reasoned conclusion")),
      ]),
  ],
};
