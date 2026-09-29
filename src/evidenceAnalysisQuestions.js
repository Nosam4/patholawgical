// Course-scoped recall framework requested in chat, not a complete admissibility outline.
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const column = (key, title, ...answers) => ({ key, title, answers });

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
          row("case", "1", "Criminal vs. civil case", "criminal vs civil", "criminal or civil", "case type"),
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
          row("case-type", "Classify the proceeding", "Criminal or civil", "criminal vs civil", "case type"),
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
