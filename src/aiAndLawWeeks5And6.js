// Based on the September 15 and 22, 2026 course assignments and Week 5 slides.
// Short answers test the main distinctions; clues retain important qualifications.
const slides = "Week 5 slides: Which Law Applies? (extended edition)";
const readings = "Week 5–6 Readings · AI and the Law · Fall 2026";
const ftcPrivacy = "https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/01/ai-companies-uphold-your-privacy-confidentiality-commitments";
const ftcTerms = "https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/02/ai-other-companies-quietly-changing-your-terms-service-could-be-unfair-or-deceptive";
const eu = "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai";
const eo = "https://www.whitehouse.gov/presidential-actions/2025/12/eliminating-state-law-obstruction-of-national-artificial-intelligence-policy/";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });

function drill(week, key, title, prompt, rows, references, sourceUrl, sourceLabel) {
  const id = `ai-week${week}-${key}`;
  return {
    id, type: "sporcle-grid", clueLayout: "above", title, prompt,
    courseSources: [readings, ...references],
    ...(sourceUrl ? { sourceUrl, sourceLabel } : {}),
    columns: [{
      id: `${id}-steps`, title: "Main Points",
      answers: rows.map(({ key: answerKey, ...entry }) => ({ id: `${id}-${answerKey}`, ...entry })),
    }],
  };
}

export const aiAndLawWeek5Questions = [
  drill(5, "legal-analysis", "Which Law Applies? The Seven Steps",
    "Follow the class framework in order. Give a short phrase for each step.", [
      row("law", "1. Identify the governing statute, regulation, or other authority.", "Applicable law", "law", "which law applies"),
      row("scope", "2. Check who and what the law covers.", "Scope", "coverage", "who is covered"),
      row("duties", "3. Identify required notices, records, audits, and review.", "Compliance duties", "compliance", "requirements", "obligations"),
      row("practices", "4. Consider safeguards beyond the legal minimum.", "Best practices", "safeguards"),
      row("penalties", "5. Check sanctions and who can enforce the law.", "Penalties and enforcement", "penalties", "enforcement"),
      row("overlap", "6. Check privacy, employment, IP, and sector rules too.", "Other laws", "overlapping laws", "overlap"),
      row("strategy", "7. Choose one shared standard or separate local approaches.", "Compliance strategy", "strategy", "highest common denominator or narrowly tailored"),
    ], [slides + " · slide 4"]),
  drill(5, "roles", "Who Builds It? Who Uses It?",
    "Name the role. Always check the definition in the particular law.", [
      row("developer", "Texas: the company builds the hiring tool and supplies it in Texas.", "Developer", "ai developer"),
      row("deployer", "Texas: the customer uses the tool to screen its own applicants.", "Deployer", "ai deployer"),
      row("provider", "EU: a company develops, or has developed, a system and markets it under its own name.", "Provider", "ai provider"),
      row("employer", "Illinois's AI employment amendment directly regulates this party.", "Employer", "the employer"),
    ], [slides + " · slides 9, 11, 21"],
    "https://statutes.capitol.texas.gov/Docs/BC/htm/BC.551.htm", "Texas · AI definitions and scope"),
  drill(5, "state-approaches", "Texas, Illinois, and Colorado",
    "Recall the main approach in each state, rather than statute numbers or fine amounts.", [
      row("intent", "Texas's AI discrimination prohibition requires this mental state; impact alone is insufficient.", "Intent", "intent to discriminate", "intentional discrimination"),
      row("effect", "Illinois asks whether AI use has a discriminatory ____ on a protected class.", "Effect", "effects", "discriminatory effect", "discriminatory effects", "impact"),
      row("transparency", "Colorado's replacement law emphasizes disclosures and consumer rights: its central theme is ____.", "Transparency", "disclosure", "disclosures"),
      row("effective", "Colorado's replacement ADMT duties begin January 1, 2027. For September 2026 class, are they effective yet?", "No", "not yet", "not yet effective"),
    ], [slides + " · slides 9–18", "Colorado Attorney General · ADMT rulemaking; Illinois Public Act 103-0804"],
    "https://coag.gov/ai/", "Colorado AG · replacement law and effective date"),
  drill(5, "hiring-safeguards", "AI Hiring: Basic Safeguards",
    "Name the safeguard described in each clue.", [
      row("audit", "NYC: covered hiring tools need an independent check for bias within the year before use.", "Bias audit", "independent bias audit", "audit"),
      row("summary", "NYC: make this account of the audit results publicly available.", "Audit summary", "summary", "summary of results", "bias audit summary"),
      row("notice", "NYC: tell covered candidates about the tool at least 10 business days before use.", "Notice", "advance notice", "candidate notice"),
      row("correction", "Colorado's replacement law: let consumers fix inaccurate personal data used in a decision.", "Data correction", "correction", "correct data"),
      row("review", "Colorado's replacement law: offer meaningful reconsideration by a person, to the extent commercially reasonable.", "Human review", "human reconsideration", "review"),
    ], [slides + " · slides 15, 17", "NYC DCWP · Automated Employment Decision Tools; Colorado ADMT law (effective January 1, 2027)"],
    "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page", "NYC · bias audit, publication, and notice"),
  drill(5, "eu-risk", "EU AI Act: Four Risk Levels",
    "Name each risk level from the class pyramid. Other laws can still apply.", [
      row("unacceptable", "Banned practices fall into this tier.", "Unacceptable risk", "unacceptable", "prohibited"),
      row("high", "Covered hiring and other sensitive decision systems face substantial safeguards.", "High risk", "high"),
      row("limited", "Transparency duties, such as telling users they are interacting with AI.", "Limited risk", "limited", "transparency risk"),
      row("minimal", "Ordinary spam filters: no additional mandatory AI Act duties for this tier.", "Minimal risk", "minimal", "minimal or no risk", "no risk"),
    ], [slides + " · slides 22–27"], eu, "European Commission · AI Act risk levels"),
  drill(5, "eu-compliance", "EU High-Risk AI: Main Compliance Steps",
    "Recall the core safeguards for covered high-risk systems. Check the applicable phase-in date separately.", [
      row("risk", "Identify, evaluate, and reduce foreseeable harms throughout the system's life.", "Risk management", "risk assessment", "manage risks"),
      row("data", "Check that training and testing data are suitable for the intended use.", "Data quality", "data governance", "quality data"),
      row("records", "Keep technical explanations and operating logs.", "Documentation", "records", "documentation and logging", "record keeping"),
      row("human", "Assign competent people who can monitor and intervene.", "Human oversight", "human supervision", "oversight"),
      row("monitor", "After launch, track performance, respond to risks, and report serious incidents.", "Monitoring", "post market monitoring", "monitor and report"),
    ], [slides + " · slide 25"], eu, "European Commission · high-risk safeguards"),
  drill(5, "preemption", "Federal Preemption: The Main Point",
    "Separate a federal challenge from an actual change in the law.", [
      row("meaning", "The doctrine under which valid federal law can displace conflicting state law.", "Preemption", "federal preemption"),
      row("task-force", "EO 14365 directs an AI litigation task force in which department?", "Department of Justice", "doj", "justice department"),
      row("automatic", "Does EO 14365, by itself, wipe out every state AI law?", "No", "not automatically"),
      row("status", "Before changing compliance advice, verify court orders, effective dates, and the rule's current ____.", "Legal status", "status", "enforceability"),
    ], [slides + " · slide 8", "Executive Order 14365 · sections 3, 7, and 8"], eo, "EO 14365 · federal challenges to state AI laws"),
  drill(5, "strategy", "Choose a Compliance Strategy",
    "Name the two approaches discussed in class. Neither automatically resolves conflicting duties.", [
      row("shared", "Apply the strictest applicable safeguard across markets where compatible.", "Highest common denominator", "strictest standard", "shared standard", "hcd"),
      row("local", "Adjust requirements separately for each jurisdiction.", "Narrowly tailored", "tailored", "local approach", "jurisdiction specific", "tailored compliance"),
    ], [slides + " · slides 32–33"]),
];

export const aiAndLawWeek6Questions = [
  drill(6, "ftc-basics", "FTC: The Basic Rule",
    "Recall the agency, its authority, and the two consumer-protection concerns.", [
      row("agency", "Federal agency central to this week's consumer-protection readings.", "Federal Trade Commission", "ftc"),
      row("section", "The FTC Act section prohibiting unfair or deceptive acts or practices.", "Section 5", "5", "section five"),
      row("deception", "A material statement or omission likely to mislead a reasonable consumer.", "Deception", "deceptive practice", "deceptive"),
      row("unfairness", "Substantial consumer injury that is not reasonably avoidable and is not outweighed by benefits to consumers or competition.", "Unfairness", "unfair practice", "unfair"),
    ], ["HKLaw · The FTC Is Regulating AI: A Comprehensive Analysis", "FTC · Policy Statements on Deception and Unfairness"],
    "https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business", "FTC · deception and unfairness standards"),
  drill(6, "deception-check", "The Deception Check",
    "Use three short phrases to recall the FTC's deception analysis.", [
      row("misleading", "1. The statement, omission, or practice must be likely to do this.", "Mislead", "mislead consumers", "misleading", "likely to mislead"),
      row("consumer", "2. Evaluate the message from the perspective of a consumer acting ____ in the circumstances.", "Reasonably", "reasonable", "reasonable consumer"),
      row("material", "3. The information must matter to the consumer's choice or conduct: it must be ____.", "Material", "materiality"),
    ], ["FTC · Policy Statement on Deception; assigned privacy and confidentiality reading"],
    "https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception", "FTC · deception analysis"),
  drill(6, "privacy-process", "Before Using Customer Data for AI",
    "Follow these basic steps before a new use of customer data.", [
      row("promises", "1. Review what policies, contracts, and marketing already promised about data use.", "Check commitments", "commitments", "privacy commitments", "check promises", "review promises"),
      row("notice", "2. Explain a proposed material change clearly and conspicuously.", "Notice", "clear notice", "disclosure", "notify users"),
      row("consent", "3. For a new use inconsistent with prior privacy promises, obtain affirmative express ____ before proceeding.", "Consent", "express consent", "affirmative express consent", "permission"),
      row("honor", "4. In actual collection, sharing, and training, continue to honor your privacy ____.", "Commitments", "promises", "privacy commitments"),
    ], ["FTC · AI Companies: Uphold Your Privacy and Confidentiality Commitments"], ftcPrivacy, "FTC · data use and privacy commitments"),
  drill(6, "silent-changes", "Quiet Changes and Missing Facts",
    "Recall the lessons from Gateway Learning, Vitagene, and the privacy readings.", [
      row("retroactive", "Changing a policy to expand use of data already collected is a ____ change.", "Retroactive", "retroactive change"),
      row("enough", "Is quietly posting revised terms enough to undo earlier privacy promises?", "No", "not enough"),
      row("omission", "Leaving out an important fact can mislead even without an express lie. This is a material ____.", "Omission", "material omission"),
      row("remedy", "For unlawfully obtained training data, the FTC has required destruction of affected data and models. Name that remedy.", "Deletion", "delete", "model deletion", "algorithmic disgorgement", "disgorgement"),
    ], ["FTC · Quietly Changing Your Terms of Service Could Be Unfair or Deceptive", "FTC · AI Companies: Uphold Your Privacy and Confidentiality Commitments"], ftcTerms, "FTC · retroactive changes and case examples"),
  drill(6, "investigations", "How the FTC Investigates AI",
    "Recall the process, not the press-release details.", [
      row("cid", "Subpoena-like demand used to obtain documents, information, and testimony.", "Civil investigative demand", "cid", "civil investigative demands"),
      row("process", "The power to require a response, rather than merely ask for cooperation.", "Compulsory process", "compulsory"),
      row("finding", "Does opening an investigation itself establish that a company broke the law?", "No", "not by itself"),
    ], ["FTC · Authorizes Compulsory Process for AI-Related Products and Services (2023)"],
    "https://www.ftc.gov/news-events/news/press-releases/2023/11/ftc-authorizes-compulsory-process-ai-related-products-services", "FTC · AI investigations and CIDs"),
  drill(6, "conflicting-duties", "State Duties and the FTC's Position",
    "Use the July 2026 assigned proposal to separate policy arguments from binding outcomes.", [
      row("status", "The assigned July 1, 2026 FTC document is labeled a ____ policy statement.", "Proposed", "proposal", "proposed policy statement"),
      row("concern", "The proposal addresses suppression of this quality in AI outputs.", "Accuracy", "truthfulness", "accurate outputs"),
      row("preemption", "The argument that the FTC Act displaces a conflicting state requirement invokes ____.", "Preemption", "federal preemption"),
      row("review", "Practical response to an apparent conflict: document it and obtain legal ____ before changing the product.", "Review", "legal review", "counsel review"),
    ], ["FTC · Proposed Policy Statement Concerning the Suppression of Accuracy in AI Systems (July 1, 2026)", "Week 6 discussion questions · state duties and the FTC"],
    "https://www.ftc.gov/legal-library/browse/federal-trade-commissions-proposed-policy-statement-concerning-suppression-accuracy-artificial", "FTC · assigned proposed policy statement"),
];
