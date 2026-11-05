// Eight-step study framework for cumulative Evidence review.
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
      "Eight-step study checklist for the cumulative final. This is a study sequence, not a mandatory order prescribed by the rules.",
      "At the applicable-rule step, consider character, witnesses, opinions, hearsay, privileges, authentication, and contents as the facts require. In a criminal case, consider the Confrontation Clause as well. Apply FRE 105 when a limiting instruction is appropriate.",
      "FRE 401–403: https://www.law.cornell.edu/rules/fre/rule_401 ; https://www.law.cornell.edu/rules/fre/rule_402 ; https://www.law.cornell.edu/rules/fre/rule_403",
      "FRE 105: https://www.law.cornell.edu/rules/fre/rule_105",
      "Criminal/civil distinctions: the linked examples illustrate differences in particular rules; they are not an exhaustive list for the cumulative final. Check every applicable rule and its exceptions.",
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
    drill("condensed", "Basic Analysis: Eight-Step Checklist",
      "Recall the eight steps for each item of evidence. Short headings and rule numbers work. Use Reveal to read the checklist, then Start Fresh to practice. Specific rules are limited to topics covered in class; apply FRE 105 when a limiting instruction is appropriate.", [
        column("sequence", "Eight-Step Checklist",
          caseTypeRow("case", "1", "Criminal vs. civil case", "criminal vs civil", "criminal or civil", "case type"),
          row("purpose", "2", "Purpose of the evidence", "purpose", "offered to prove"),
          row("relevance", "3", "Relevance — FRE 401", "relevance", "401", "FRE 401"),
          row("admissibility", "4", "General admissibility — FRE 402", "general admissibility", "402", "FRE 402"),
          row("specific-rule", "5", "Applicable specific rule, exceptions, and permitted purposes", "applicable rule", "specific rule", "applicable specific rule"),
          row("balancing", "6", "Balancing — FRE 403", "balancing", "403", "FRE 403"),
          row("limiting", "7", "Limiting instruction — FRE 105", "limiting instruction", "105", "FRE 105"),
          row("conclusion", "8", "Conclude: admit, exclude, or admit for a limited purpose", "conclusion", "conclude", "admit exclude or limit")),
      ]),
  ],
};
