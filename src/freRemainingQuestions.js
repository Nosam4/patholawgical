function entry(id, answer, acceptedAnswers = [], indicator = null) {
  return {
    id,
    answer,
    acceptedAnswers,
    ...(indicator ? { indicator } : {}),
  };
}

function question(ruleNumber, slug, title, prompt, columns) {
  return {
    id: `fre-rule-${ruleNumber}-${slug}`,
    type: "sporcle-grid",
    title: `FRE Rule ${ruleNumber}: ${title}`,
    prompt,
    sourceUrl: `https://www.law.cornell.edu/rules/fre/rule_${ruleNumber}`,
    sourceLabel: `FRE Rule ${ruleNumber}`,
    columns,
  };
}

export const freRule404Question = question(
  "404",
  "character-and-other-acts",
  "Character Evidence; Other Crimes, Wrongs, or Acts",
  "Fill the propensity prohibitions, criminal-case exceptions, permitted other-act purposes, and notice rules.",
  [
    {
      id: "character-evidence",
      title: "Character Evidence",
      answers: [
        entry("rule-404-propensity-ban", "character evidence is not admissible to prove conduct in accordance with character", ["no propensity evidence", "character to prove conduct"], "General rule"),
        entry("rule-404-defendant-trait", "defendant may offer the defendant's pertinent trait", ["defendants pertinent trait"], "Defendant"),
        entry("rule-404-victim-trait", "defendant may offer the alleged victim's pertinent trait", ["victims pertinent trait"], "Victim"),
        entry("rule-404-same-trait", "prosecutor may offer the defendant's same trait", ["defendants same trait"], "Rebuttal"),
        entry("rule-404-peacefulness", "victim's trait of peacefulness", ["peacefulness"], "Homicide"),
        entry("rule-404-witness-rules", "Rules 607, 608, and 609", ["607 608 and 609"], "Witness"),
      ],
    },
    {
      id: "other-act-purposes",
      title: "Other-Act Purposes",
      mnemonic: "LIMPOKAPI",
      answers: [
        entry("rule-404-accident", "lack of accident", ["absence of accident", "no accident"], "1"),
        entry("rule-404-intent", "intent", [], "2"),
        entry("rule-404-motive", "motive", [], "3"),
        entry("rule-404-preparation", "preparation", [], "4"),
        entry("rule-404-opportunity", "opportunity", [], "5"),
        entry("rule-404-knowledge", "knowledge", [], "6"),
        entry("rule-404-mistake", "absence of mistake", ["no mistake"], "7"),
        entry("rule-404-plan", "plan", [], "8"),
        entry("rule-404-identity", "identity", [], "9"),
      ],
    },
    {
      id: "criminal-notice",
      title: "Criminal-Case Notice",
      answers: [
        entry("rule-404-reasonable-notice", "reasonable notice", [], "Timing"),
        entry("rule-404-fair-opportunity", "fair opportunity to meet the evidence", ["fair opportunity"], "Purpose"),
        entry("rule-404-articulate-purpose", "permitted purpose and supporting reasoning", ["purpose and reasoning"], "Content"),
        entry("rule-404-writing", "in writing before trial", ["written before trial"], "Form"),
        entry("rule-404-good-cause", "any form during trial for good cause", ["during trial for good cause"], "Exception"),
      ],
    },
  ],
);

export const freRule405Question = question(
  "405",
  "proving-character",
  "Methods of Proving Character",
  "Fill the permitted methods of proving character and when specific instances are available.",
  [
    {
      id: "reputation-opinion",
      title: "Reputation or Opinion",
      answers: [
        entry("rule-405-reputation", "testimony about reputation", ["reputation testimony"], "Direct"),
        entry("rule-405-opinion", "testimony in the form of an opinion", ["opinion testimony"], "Direct"),
        entry(
          "rule-405-cross-specific-acts",
          "judge may allow inquiry into relevant specific instances of conduct",
          [
            "court may allow inquiry into relevant specific instances of conduct",
            "inquiry into relevant specific instances of conduct",
            "relevant specific instances",
          ],
          "Cross",
        ),
      ],
    },
    {
      id: "specific-instances",
      title: "Specific Instances",
      answers: [
        entry("rule-405-essential-element", "character is an essential element of a charge, claim, or defense", ["essential element"], "Trigger"),
        entry("rule-405-relevant-instances", "relevant specific instances of conduct", ["specific instances of conduct"], "Method"),
      ],
    },
  ],
);

export const freRule406Question = question(
  "406",
  "habit-routine-practice",
  "Habit; Routine Practice",
  "Fill what habit or routine-practice evidence may prove and what corroboration is unnecessary.",
  [
    {
      id: "permitted-proof",
      title: "Permitted Proof",
      answers: [
        entry("rule-406-person-habit", "a person's habit", ["habit"], "Person"),
        entry("rule-406-organization-routine", "an organization's routine practice", ["routine practice"], "Organization"),
        entry("rule-406-conforming-conduct", "acted in accordance with the habit or routine practice", ["conduct in accordance with habit"], "Inference"),
      ],
    },
    {
      id: "not-required",
      title: "Not Required",
      answers: [
        entry("rule-406-corroboration", "corroboration", ["corroborated"], "1"),
        entry("rule-406-eyewitness", "an eyewitness", ["eyewitness testimony"], "2"),
      ],
    },
  ],
);

export const freRule407Question = question(
  "407",
  "subsequent-remedial-measures",
  "Subsequent Remedial Measures",
  "Fill the prohibited and permitted purposes for subsequent remedial measures.",
  [
    {
      id: "prohibited-purposes",
      title: "Not Admissible to Prove",
      answers: [
        entry("rule-407-negligence", "negligence", [], "1"),
        entry("rule-407-culpable-conduct", "culpable conduct", [], "2"),
        entry("rule-407-product-defect", "a defect in a product or its design", ["product or design defect"], "3"),
        entry("rule-407-warning", "a need for a warning or instruction", ["need for warning or instruction"], "4"),
      ],
    },
    {
      id: "permitted-purposes",
      title: "May Be Admitted to Prove",
      answers: [
        entry("rule-407-impeachment", "impeachment", [], "1"),
        entry("rule-407-ownership", "ownership", [], "2 (if disputed)"),
        entry("rule-407-control", "control", [], "3 (if disputed)"),
        entry("rule-407-feasibility", "feasibility of precautionary measures", ["feasibility"], "4 (if disputed)"),
      ],
    },
  ],
);

export const freRule408Question = question(
  "408",
  "compromise-offers",
  "Compromise Offers and Negotiations",
  "Fill what compromise evidence cannot prove and the rule's listed alternative purposes.",
  [
    {
      id: "covered-evidence",
      title: "Covered Evidence",
      answers: [
        entry("rule-408-consideration", "valuable consideration offered or accepted to compromise a claim", ["offer or acceptance of valuable consideration"], "Offers"),
        entry("rule-408-negotiation-statements", "conduct or statements during compromise negotiations", ["compromise negotiation conduct or statements"], "Negotiations"),
      ],
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      answers: [
        entry("rule-408-validity", "validity of a disputed claim", ["claim validity"], "1"),
        entry("rule-408-amount", "amount of a disputed claim", ["claim amount"], "2"),
        entry("rule-408-impeachment", "impeachment by prior inconsistent statement or contradiction", ["impeachment"], "3"),
      ],
    },
    {
      id: "permitted-purposes",
      title: "Other Purposes",
      answers: [
        entry("rule-408-bias", "witness bias or prejudice", ["bias or prejudice"], "1"),
        entry("rule-408-delay", "negating a contention of undue delay", ["negating undue delay"], "2"),
        entry("rule-408-obstruction", "effort to obstruct a criminal investigation or prosecution", ["obstruction"], "3"),
      ],
    },
  ],
);

export const freRule409Question = question(
  "409",
  "medical-expenses",
  "Offers to Pay Medical and Similar Expenses",
  "Fill the covered offers and the prohibited inference.",
  [
    {
      id: "covered-offers",
      title: "Covered Offers",
      answers: [
        entry("rule-409-furnishing", "furnishing medical, hospital, or similar expenses", ["furnishing medical expenses"], "1"),
        entry("rule-409-promising", "promising to pay medical, hospital, or similar expenses", ["promising to pay medical expenses"], "2"),
        entry("rule-409-offering", "offering to pay medical, hospital, or similar expenses", ["offering to pay medical expenses"], "3"),
      ],
    },
    {
      id: "prohibited-inference",
      title: "Not Admissible to Prove",
      answers: [
        entry("rule-409-liability", "liability for the injury", ["liability"], "Purpose"),
      ],
    },
  ],
);

export const freRule410Question = question(
  "410",
  "pleas-and-discussions",
  "Pleas, Plea Discussions, and Related Statements",
  "Fill the protected plea evidence and the two exceptions for qualifying statements.",
  [
    {
      id: "prohibited-evidence",
      title: "Not Admissible Against Defendant",
      answers: [
        entry("rule-410-withdrawn-guilty", "a guilty plea later withdrawn", ["withdrawn guilty plea"], "1"),
        entry("rule-410-nolo", "a nolo contendere plea", ["nolo plea", "no contest plea"], "2"),
        entry("rule-410-plea-proceeding", "statement during a proceeding on either plea", ["plea proceeding statement"], "3"),
        entry("rule-410-plea-discussion", "statement during plea discussions with a prosecuting attorney", ["plea discussion statement"], "4"),
      ],
    },
    {
      id: "exceptions",
      title: "Statement Exceptions",
      answers: [
        entry("rule-410-completeness", "fairness requires statements from the same plea discussion to be considered together", ["rule of completeness", "fairness"], "1"),
        entry("rule-410-perjury", "criminal proceeding for perjury or false statement", ["perjury or false statement"], "2"),
        entry("rule-410-under-oath", "under oath", [], "Perjury condition"),
        entry("rule-410-on-record", "on the record", [], "Perjury condition"),
        entry("rule-410-counsel", "with counsel present", [], "Perjury condition"),
      ],
    },
  ],
);

export const freRule411Question = question(
  "411",
  "liability-insurance",
  "Liability Insurance",
  "Fill the forbidden negligence inference and the listed other purposes for liability-insurance evidence.",
  [
    {
      id: "prohibited-use",
      title: "Not Admissible to Prove",
      answers: [
        entry("rule-411-negligence", "the person acted negligently or otherwise wrongfully", ["negligence or wrongful conduct"], "Purpose"),
      ],
    },
    {
      id: "other-purposes",
      title: "Other Purposes",
      answers: [
        entry("rule-411-bias", "witness bias or prejudice", ["bias or prejudice"], "1"),
        entry("rule-411-agency", "agency", [], "2"),
        entry("rule-411-ownership", "ownership", [], "3"),
        entry("rule-411-control", "control", [], "4"),
      ],
    },
  ],
);

export const freRule412Question = question(
  "412",
  "sex-offense-victim-evidence",
  "Sex-Offense Cases: The Victim's Sexual Behavior or Predisposition",
  "Fill the rape-shield prohibitions, criminal and civil exceptions, and admissibility procedure.",
  [
    {
      id: "prohibitions-and-criminal-exceptions",
      title: "Prohibitions / Criminal Exceptions",
      answers: [
        entry("rule-412-other-behavior", "victim engaged in other sexual behavior", ["other sexual behavior"], "Prohibited"),
        entry("rule-412-predisposition", "victim's sexual predisposition", ["sexual predisposition"], "Prohibited"),
        entry("rule-412-other-source", "someone other than the defendant was the source of physical evidence", ["other source of semen injury or physical evidence"], "Exception 1"),
        entry("rule-412-consent", "specific instances with the accused offered to prove consent", ["sexual behavior with accused to prove consent", "consent"], "Exception 2"),
        entry("rule-412-prosecution", "specific instances with the accused offered by the prosecutor", ["offered by prosecutor"], "Exception 3"),
        entry("rule-412-constitution", "evidence whose exclusion would violate the defendant's constitutional rights", ["constitutional rights"], "Exception 4"),
      ],
    },
    {
      id: "civil-cases",
      title: "Civil Cases",
      answers: [
        entry("rule-412-reverse-403", "probative value substantially outweighs harm and unfair prejudice", ["reverse 403", "probative value substantially outweighs prejudice"], "Standard"),
        entry("rule-412-reputation", "reputation evidence only if the victim placed it in controversy", ["victim placed reputation in controversy"], "Reputation"),
      ],
    },
    {
      id: "procedure",
      title: "Procedure",
      answers: [
        entry("rule-412-motion", "motion describing the evidence and its purpose", ["motion with evidence and purpose"], "Motion"),
        entry("rule-412-fourteen-days", "at least 14 days before trial", ["14 days before trial"], "Deadline"),
        entry("rule-412-service", "serve all parties and notify the victim", ["serve parties and notify victim"], "Notice"),
        entry("rule-412-in-camera", "in camera hearing", ["private hearing"], "Hearing"),
        entry("rule-412-right-heard", "victim and parties have a right to attend and be heard", ["right to attend and be heard"], "Participation"),
        entry("rule-412-sealed", "motion, materials, and hearing record remain sealed", ["record remains sealed"], "Record"),
      ],
    },
  ],
);

export const freRule413Question = question(
  "413",
  "similar-sexual-assault-crimes",
  "Similar Crimes in Sexual-Assault Cases",
  "Fill the permitted use, disclosure requirements, and definition of sexual assault.",
  [
    {
      id: "use-and-disclosure",
      title: "Use and Disclosure",
      answers: [
        entry("rule-413-other-assault", "evidence of any other sexual assault", ["other sexual assault"], "Permitted"),
        entry("rule-413-any-relevant-matter", "any matter to which it is relevant", ["any relevant matter"], "Use"),
        entry("rule-413-statements-summary", "witness statements or a summary of expected testimony", ["witness statements or testimony summary"], "Disclosure"),
        entry("rule-413-fifteen-days", "at least 15 days before trial", ["15 days before trial"], "Deadline"),
        entry("rule-413-good-cause", "later time allowed for good cause", ["later for good cause"], "Exception"),
      ],
    },
    {
      id: "sexual-assault-definition",
      title: "Sexual Assault Includes",
      answers: [
        entry("rule-413-chapter-109a", "conduct prohibited by 18 U.S.C. chapter 109A", ["chapter 109A conduct"], "1"),
        entry("rule-413-nonconsensual-contact-object", "nonconsensual contact by the defendant's body or an object with another's genitals or anus", ["nonconsensual contact with genitals or anus"], "2"),
        entry("rule-413-nonconsensual-contact-genitals", "nonconsensual contact by the defendant's genitals or anus with another's body", ["defendants genitals or anus contact"], "3"),
        entry("rule-413-gratification", "sexual gratification from inflicting death, bodily injury, or physical pain", ["gratification from death injury or pain"], "4"),
        entry("rule-413-attempt", "attempt or conspiracy to engage in covered conduct", ["attempt or conspiracy"], "5"),
      ],
    },
  ],
);

export const freRule414Question = question(
  "414",
  "similar-child-molestation-crimes",
  "Similar Crimes in Child-Molestation Cases",
  "Fill the permitted use, disclosure requirements, and definitions governing child-molestation evidence.",
  [
    {
      id: "use-and-disclosure",
      title: "Use and Disclosure",
      answers: [
        entry("rule-414-other-molestation", "evidence of any other child molestation", ["other child molestation"], "Permitted"),
        entry("rule-414-any-relevant-matter", "any matter to which it is relevant", ["any relevant matter"], "Use"),
        entry("rule-414-statements-summary", "witness statements or a summary of expected testimony", ["witness statements or testimony summary"], "Disclosure"),
        entry("rule-414-fifteen-days", "at least 15 days before trial", ["15 days before trial"], "Deadline"),
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      answers: [
        entry("rule-414-child", "person below the age of 14", ["under 14", "below 14"], "Child"),
        entry("rule-414-chapter-109a", "chapter 109A conduct committed with a child", ["109A conduct with a child"], "Molestation 1"),
        entry("rule-414-chapter-110", "conduct prohibited by 18 U.S.C. chapter 110", ["chapter 110 conduct"], "Molestation 2"),
        entry("rule-414-contact-child", "contact by the defendant's body or an object with a child's genitals or anus", ["contact with childs genitals or anus"], "Molestation 3"),
        entry("rule-414-contact-defendant", "contact by the defendant's genitals or anus with a child's body", ["defendants genitals or anus with child"], "Molestation 4"),
        entry("rule-414-gratification", "sexual gratification from inflicting death, bodily injury, or physical pain on a child", ["gratification from death injury or pain to child"], "Molestation 5"),
        entry("rule-414-attempt", "attempt or conspiracy to engage in covered conduct", ["attempt or conspiracy"], "Molestation 6"),
      ],
    },
  ],
);

export const freRule415Question = question(
  "415",
  "similar-civil-sexual-acts",
  "Similar Acts in Civil Cases Involving Sexual Assault or Child Molestation",
  "Fill when similar-act evidence is permitted in civil cases and what disclosure is required.",
  [
    {
      id: "permitted-use",
      title: "Permitted Use",
      answers: [
        entry("rule-415-civil-claim", "civil claim based on alleged sexual assault or child molestation", ["civil sexual assault or child molestation claim"], "Case"),
        entry("rule-415-other-act", "evidence of any other sexual assault or child molestation", ["other sexual assault or child molestation"], "Evidence"),
        entry("rule-415-rules-413-414", "considered as provided in Rules 413 and 414", ["Rules 413 and 414", "413 and 414"], "Use"),
      ],
    },
    {
      id: "disclosure",
      title: "Disclosure",
      answers: [
        entry("rule-415-opponent", "party against whom the evidence will be offered", ["opposing party", "opponent"], "Recipient"),
        entry("rule-415-statements-summary", "witness statements or a summary of expected testimony", ["witness statements or testimony summary"], "Content"),
        entry("rule-415-fifteen-days", "at least 15 days before trial", ["15 days before trial"], "Deadline"),
        entry("rule-415-good-cause", "later time allowed for good cause", ["later for good cause"], "Exception"),
      ],
    },
  ],
);

export const freRule501Question = question(
  "501",
  "privilege-general",
  "Privilege in General",
  "Fill the default source of federal privilege law, the overriding authorities, and the civil state-law rule.",
  [
    {
      id: "federal-default",
      title: "Federal Default",
      answers: [
        entry("rule-501-common-law", "common law interpreted in the light of reason and experience", ["common law", "reason and experience"], "Default"),
        entry("rule-501-constitution", "United States Constitution", ["US Constitution", "Constitution"], "Override 1"),
        entry("rule-501-statute", "federal statute", [], "Override 2"),
        entry("rule-501-supreme-court", "rules prescribed by the Supreme Court", ["Supreme Court rules"], "Override 3"),
      ],
    },
    {
      id: "civil-cases",
      title: "Civil State-Law Rule",
      answers: [
        entry("rule-501-state-privilege", "state law governs privilege", ["state privilege law"], "Rule"),
        entry("rule-501-rule-of-decision", "state law supplies the rule of decision", ["state rule of decision"], "Trigger"),
      ],
    },
  ],
);

export const freRule601Question = question(
  "601",
  "witness-competency",
  "Competency to Testify in General",
  "Fill the general presumption of competency and the civil state-law exception.",
  [
    {
      id: "competency",
      title: "Competency",
      answers: [
        entry("rule-601-every-person", "every person is competent to be a witness", ["everyone is competent", "presumption of competency"], "General rule"),
        entry("rule-601-rules-exception", "unless the Federal Rules of Evidence provide otherwise", ["unless these rules provide otherwise"], "Exception"),
      ],
    },
    {
      id: "civil-state-law",
      title: "Civil State-Law Rule",
      answers: [
        entry("rule-601-state-competency", "state law governs witness competency", ["state competency law"], "Rule"),
        entry("rule-601-rule-of-decision", "state law supplies the rule of decision", ["state rule of decision"], "Trigger"),
      ],
    },
  ],
);

export const freRule602Question = question(
  "602",
  "personal-knowledge",
  "Need for Personal Knowledge",
  "Fill the foundation for personal knowledge and the expert-testimony exception.",
  [
    {
      id: "foundation",
      title: "Foundation",
      answers: [
        entry("rule-602-sufficient-evidence", "evidence sufficient to support a finding", ["sufficient evidence"], "Standard"),
        entry("rule-602-personal-knowledge", "witness has personal knowledge of the matter", ["personal knowledge"], "Finding"),
        entry("rule-602-own-testimony", "witness's own testimony", ["own testimony"], "May prove by"),
      ],
    },
    {
      id: "exception",
      title: "Exception",
      answers: [
        entry("rule-602-expert", "expert testimony under Rule 703", ["Rule 703 expert testimony", "703"], "Does not apply to"),
      ],
    },
  ],
);

export const freRule607Question = question(
  "607",
  "who-may-impeach",
  "Who May Impeach a Witness",
  "Fill who may attack a witness's credibility.",
  [
    {
      id: "who-may-impeach",
      title: "Who May Impeach",
      answers: [
        entry("rule-607-any-party", "any party", [], "General rule"),
        entry("rule-607-calling-party", "the party that called the witness", ["calling party", "party who called the witness"], "Includes"),
      ],
    },
    {
      id: "target",
      title: "Target",
      answers: [
        entry("rule-607-credibility", "witness's credibility", ["credibility"], "Attack"),
      ],
    },
  ],
);

export const freRule608Question = question(
  "608",
  "truthfulness-character",
  "A Witness's Character for Truthfulness or Untruthfulness",
  "Fill the permitted character testimony and the limits on specific-instances evidence.",
  [
    {
      id: "reputation-opinion",
      title: "Reputation or Opinion",
      answers: [
        entry("rule-608-reputation", "reputation for truthfulness or untruthfulness", ["reputation testimony"], "Method 1"),
        entry("rule-608-opinion", "opinion about truthfulness or untruthfulness", ["opinion testimony"], "Method 2"),
        entry("rule-608-truthful-after-attack", "truthful character only after truthfulness has been attacked", ["truthfulness must first be attacked"], "Support limit"),
      ],
    },
    {
      id: "specific-instances",
      title: "Specific Instances",
      answers: [
        entry("rule-608-no-extrinsic", "no extrinsic evidence of specific instances", ["extrinsic evidence prohibited"], "General rule"),
        entry("rule-608-cross-inquiry", "court may allow inquiry on cross-examination", ["inquiry on cross"], "Method"),
        entry("rule-608-probative-truthfulness", "probative of truthfulness or untruthfulness", ["probative of character for truthfulness"], "Requirement"),
        entry("rule-608-witness-or-other", "the witness or another witness whose character was discussed", ["witness or another witness"], "Whose conduct"),
        entry("rule-608-rule-609", "criminal conviction under Rule 609", ["Rule 609 conviction", "609"], "Exception"),
      ],
    },
    {
      id: "privilege",
      title: "Privilege",
      answers: [
        entry("rule-608-no-waiver", "no waiver of privilege against self-incrimination", ["no self incrimination waiver"], "By testifying"),
        entry("rule-608-character-only", "testimony relating only to character for truthfulness", ["character for truthfulness only"], "Scope"),
      ],
    },
  ],
);

export const freRule609Question = question(
  "609",
  "criminal-convictions",
  "Impeachment by Evidence of a Criminal Conviction",
  "Fill the admissibility standards for convictions, older convictions, pardons, juvenile adjudications, and appeals.",
  [
    {
      id: "general-rules",
      title: "General Rules",
      answers: [
        entry("rule-609-felony-threshold", "punishable by death or imprisonment for more than one year", ["more than one year", "felony threshold"], "Serious crime"),
        entry("rule-609-nondefendant-403", "must be admitted subject to Rule 403 for a nondefendant witness", ["Rule 403 for nondefendant"], "Nondefendant"),
        entry("rule-609-defendant-balance", "probative value outweighs prejudicial effect to the defendant", ["probative outweighs prejudice"], "Defendant"),
        entry("rule-609-dishonest-act", "crime required proving a dishonest act or false statement", ["dishonesty or false statement", "crimen falsi"], "Any punishment"),
      ],
    },
    {
      id: "older-and-pardoned",
      title: "Older / Pardoned Convictions",
      answers: [
        entry("rule-609-ten-years", "more than 10 years since conviction or release, whichever is later", ["10 years since conviction or release"], "Older conviction"),
        entry("rule-609-substantially-outweighs", "probative value substantially outweighs prejudicial effect", ["substantially outweighs prejudice"], "Older standard"),
        entry("rule-609-written-notice", "reasonable written notice", ["written notice"], "Older notice"),
        entry("rule-609-rehabilitation", "rehabilitation with no later serious conviction", ["rehabilitated and no later felony"], "Pardon bar 1"),
        entry("rule-609-innocence", "finding of innocence", ["innocence"], "Pardon bar 2"),
      ],
    },
    {
      id: "juvenile-and-appeal",
      title: "Juvenile / Appeal",
      answers: [
        entry("rule-609-criminal-case", "offered in a criminal case", ["criminal case"], "Juvenile 1"),
        entry("rule-609-other-witness", "witness other than the defendant", ["nondefendant witness"], "Juvenile 2"),
        entry("rule-609-adult-admissible", "adult conviction would be admissible", ["admissible if adult"], "Juvenile 3"),
        entry("rule-609-necessary", "necessary to fairly determine guilt or innocence", ["necessary for guilt or innocence"], "Juvenile 4"),
        entry("rule-609-pending-appeal", "admissible even if an appeal is pending", ["pending appeal does not bar admission"], "Appeal"),
      ],
    },
  ],
);

export const freRule610Question = question(
  "610",
  "religious-beliefs",
  "Religious Beliefs or Opinions",
  "Fill the prohibited credibility use of religious beliefs or opinions.",
  [
    {
      id: "prohibition",
      title: "Not Admissible",
      answers: [
        entry("rule-610-religion", "religious beliefs or opinions", ["religion"], "Evidence"),
        entry("rule-610-attack-support", "attack or support the witness's credibility", ["credibility", "attack or support credibility"], "Purpose"),
      ],
    },
  ],
);

export const freRule611Question = question(
  "611",
  "examining-witnesses",
  "Mode and Order of Examining Witnesses and Presenting Evidence",
  "Fill the court's control purposes, scope of cross, and rules for leading questions.",
  [
    {
      id: "court-control",
      title: "Court Control Purposes",
      answers: [
        entry("rule-611-truth", "effective for determining the truth", ["determine truth"], "1"),
        entry("rule-611-time", "avoid wasting time", ["avoid waste of time"], "2"),
        entry("rule-611-protect", "protect witnesses from harassment or undue embarrassment", ["protect from harassment or embarrassment"], "3"),
      ],
    },
    {
      id: "cross-examination",
      title: "Cross-Examination",
      answers: [
        entry("rule-611-direct-scope", "subject matter of direct examination", ["scope of direct"], "Scope 1"),
        entry("rule-611-credibility", "matters affecting witness credibility", ["credibility"], "Scope 2"),
        entry("rule-611-additional", "additional matters as if on direct examination", ["additional matters"], "Court may allow"),
      ],
    },
    {
      id: "leading-questions",
      title: "Leading Questions",
      answers: [
        entry("rule-611-develop", "necessary to develop the witness's testimony", ["develop testimony"], "Direct exception"),
        entry("rule-611-cross", "cross-examination", [], "Ordinarily allowed"),
        entry("rule-611-hostile", "hostile witness", [], "Ordinarily allowed"),
        entry("rule-611-adverse-party", "adverse party", [], "Ordinarily allowed"),
        entry("rule-611-identified", "witness identified with an adverse party", ["witness associated with adverse party"], "Ordinarily allowed"),
      ],
    },
  ],
);

export const freRule612Question = question(
  "612",
  "refreshing-memory",
  "Writing Used to Refresh a Witness's Memory",
  "Fill when the rule applies, the adverse party's options, and remedies for nonproduction.",
  [
    {
      id: "scope",
      title: "Scope",
      answers: [
        entry("rule-612-while", "while testifying", [], "1"),
        entry("rule-612-before", "before testifying if justice requires", ["before testifying"], "2"),
      ],
    },
    {
      id: "adverse-options",
      title: "Adverse Party's Options",
      answers: [
        entry("rule-612-produced", "have the writing produced at the hearing", ["production"], "1"),
        entry("rule-612-inspect", "inspect the writing", ["inspection"], "2"),
        entry("rule-612-cross", "cross-examine the witness about it", ["cross examination"], "3"),
        entry("rule-612-introduce", "introduce related portions into evidence", ["introduce relevant portions"], "4"),
        entry("rule-612-in-camera", "in camera review and deletion of unrelated matter", ["delete unrelated matter"], "Unrelated matter"),
      ],
    },
    {
      id: "nonproduction",
      title: "Failure to Produce",
      answers: [
        entry("rule-612-appropriate-order", "any appropriate order", [], "Generally"),
        entry("rule-612-strike", "strike the witness's testimony", ["strike testimony"], "Prosecution"),
        entry("rule-612-mistrial", "declare a mistrial if justice requires", ["mistrial"], "Prosecution alternative"),
      ],
    },
  ],
);

export const freRule613Question = question(
  "613",
  "prior-statements",
  "Witness's Prior Statement",
  "Fill the disclosure rule and the current timing requirements for extrinsic evidence of a prior inconsistent statement.",
  [
    {
      id: "during-examination",
      title: "During Examination",
      answers: [
        entry("rule-613-no-show-witness", "need not show or disclose the statement to the witness", ["no need to show witness"], "General rule"),
        entry("rule-613-show-adverse", "must show or disclose it to adverse counsel on request", ["show adverse counsel on request"], "Request"),
      ],
    },
    {
      id: "extrinsic-evidence",
      title: "Extrinsic Evidence",
      answers: [
        entry("rule-613-after-opportunity", "only after the witness has an opportunity to explain or deny", ["witness opportunity to explain or deny"], "Witness"),
        entry("rule-613-adverse-examine", "adverse party has an opportunity to examine the witness", ["adverse party opportunity to examine"], "Adverse party"),
        entry("rule-613-court-orders", "unless the court orders otherwise", [], "Exception"),
        entry("rule-613-opposing-party", "does not apply to an opposing party's statement under Rule 801(d)(2)", ["801 d 2 opposing party statement"], "Exclusion"),
      ],
    },
  ],
);

export const freRule615Question = question(
  "615",
  "excluding-witnesses",
  "Excluding Witnesses from the Courtroom; Preventing Access to Trial Testimony",
  "Fill the sequestration rule, the four people who cannot be excluded, and available additional orders.",
  [
    {
      id: "sequestration",
      title: "Sequestration",
      answers: [
        entry("rule-615-must-request", "court must exclude witnesses at a party's request", ["must exclude on request"], "On request"),
        entry("rule-615-own", "court may exclude witnesses on its own", ["sua sponte", "on its own"], "Court"),
      ],
    },
    {
      id: "cannot-exclude",
      title: "Cannot Exclude",
      answers: [
        entry("rule-615-natural-party", "party who is a natural person", ["natural person party"], "1"),
        entry("rule-615-representative", "one designated officer or employee of a non-natural-person party", ["designated representative"], "2"),
        entry("rule-615-essential", "person essential to presenting a claim or defense", ["essential person"], "3"),
        entry("rule-615-statute", "person authorized by statute to be present", ["statutorily authorized person"], "4"),
      ],
    },
    {
      id: "additional-orders",
      title: "Additional Orders",
      answers: [
        entry("rule-615-disclosure", "prohibit disclosure of trial testimony to excluded witnesses", ["no disclosure of testimony"], "1"),
        entry("rule-615-access", "prohibit excluded witnesses from accessing trial testimony", ["no access to testimony"], "2"),
      ],
    },
  ],
);

export const freRule701Question = question(
  "701",
  "lay-opinion",
  "Opinion Testimony by Lay Witnesses",
  "Fill the three limits on lay opinion testimony.",
  [
    {
      id: "lay-opinion-limits",
      title: "Lay Opinion Must Be",
      answers: [
        entry("rule-701-perception", "rationally based on the witness's perception", ["rationally based on perception"], "(a)"),
        entry("rule-701-helpful", "helpful to understanding testimony or determining a fact in issue", ["helpful to the jury", "helpful"], "(b)"),
        entry("rule-701-not-specialized", "not based on scientific, technical, or other specialized knowledge", ["not specialized knowledge"], "(c)"),
      ],
    },
  ],
);

export const freRule702Question = question(
  "702",
  "expert-testimony",
  "Testimony by Expert Witnesses",
  "Fill the expert qualifications, burden, and four admissibility requirements.",
  [
    {
      id: "qualifications",
      title: "Expert Qualification",
      answers: [
        entry("rule-702-knowledge", "knowledge", [], "1"),
        entry("rule-702-skill", "skill", [], "2"),
        entry("rule-702-experience", "experience", [], "3"),
        entry("rule-702-training", "training", [], "4"),
        entry("rule-702-education", "education", [], "5"),
        entry("rule-702-more-likely", "proponent demonstrates to the court that it is more likely than not", ["more likely than not"], "Burden"),
      ],
    },
    {
      id: "requirements",
      title: "Admissibility Requirements",
      answers: [
        entry("rule-702-helpful", "specialized knowledge will help the trier of fact", ["help the trier of fact"], "(a)"),
        entry("rule-702-facts", "based on sufficient facts or data", ["sufficient facts or data"], "(b)"),
        entry("rule-702-methods", "product of reliable principles and methods", ["reliable principles and methods"], "(c)"),
        entry("rule-702-application", "opinion reflects a reliable application to the facts of the case", ["reliable application to the facts"], "(d)"),
      ],
    },
  ],
);

export const freRule703Question = question(
  "703",
  "expert-bases",
  "Bases of an Expert's Opinion Testimony",
  "Fill the permissible bases of expert opinion and the reverse-403 disclosure standard.",
  [
    {
      id: "opinion-bases",
      title: "Opinion Bases",
      answers: [
        entry("rule-703-aware", "facts or data the expert has been made aware of", ["made aware of"], "1"),
        entry("rule-703-observed", "facts or data the expert personally observed", ["personally observed"], "2"),
        entry("rule-703-reasonable-reliance", "experts in the field would reasonably rely on those kinds of facts or data", ["reasonable reliance by experts"], "Inadmissible basis"),
      ],
    },
    {
      id: "jury-disclosure",
      title: "Disclosing Inadmissible Bases",
      answers: [
        entry("rule-703-proponent", "proponent of the opinion", ["proponent"], "Who"),
        entry("rule-703-substantially-outweighs", "probative value substantially outweighs prejudicial effect", ["reverse 403", "probative substantially outweighs prejudice"], "Standard"),
        entry("rule-703-evaluate", "helping the jury evaluate the opinion", ["evaluate the opinion"], "Probative purpose"),
      ],
    },
  ],
);

export const freRule705Question = question(
  "705",
  "expert-underlying-data",
  "Disclosing the Facts or Data Underlying an Expert's Opinion",
  "Fill when an expert may state an opinion and when underlying facts or data must be disclosed.",
  [
    {
      id: "direct-examination",
      title: "Direct Examination",
      answers: [
        entry("rule-705-opinion-reasons", "state an opinion and give the reasons for it", ["opinion and reasons"], "May"),
        entry("rule-705-without-first", "without first testifying to underlying facts or data", ["without underlying facts first"], "Default"),
        entry("rule-705-court", "unless the court orders otherwise", [], "Exception"),
      ],
    },
    {
      id: "cross-examination",
      title: "Cross-Examination",
      answers: [
        entry("rule-705-required", "expert may be required to disclose underlying facts or data", ["disclose underlying facts or data"], "Rule"),
      ],
    },
  ],
);

export const freRule801Question = question(
  "801",
  "hearsay-definitions",
  "Definitions and Exclusions from Hearsay",
  "Fill the hearsay definitions and the categories of statements defined as not hearsay.",
  [
    {
      id: "definitions",
      title: "Definitions",
      answers: [
        entry("rule-801-statement", "oral assertion, written assertion, or intended nonverbal assertion", ["oral written or nonverbal assertion"], "Statement"),
        entry("rule-801-declarant", "person who made the statement", ["statement maker"], "Declarant"),
        entry("rule-801-out-of-court", "not made while testifying at the current trial or hearing", ["out of court statement"], "Hearsay 1"),
        entry("rule-801-truth", "offered to prove the truth of the matter asserted", ["truth of the matter asserted", "TOMA"], "Hearsay 2"),
      ],
    },
    {
      id: "prior-statements",
      title: "Declarant-Witness's Prior Statement",
      answers: [
        entry("rule-801-cross", "declarant testifies and is subject to cross-examination", ["testifies and subject to cross"], "Foundation"),
        entry("rule-801-inconsistent", "inconsistent statement made under penalty of perjury at a proceeding or deposition", ["prior inconsistent statement under oath"], "(A)"),
        entry("rule-801-consistent-fabrication", "consistent statement rebutting recent fabrication or improper influence or motive", ["rebut recent fabrication or improper motive"], "(B)(i)"),
        entry("rule-801-consistent-rehab", "consistent statement rehabilitating credibility after another attack", ["rehabilitate credibility"], "(B)(ii)"),
        entry("rule-801-identification", "prior identification of a person perceived earlier", ["prior identification"], "(C)"),
      ],
    },
    {
      id: "opposing-party",
      title: "Opposing Party's Statement",
      answers: [
        entry("rule-801-individual", "made by the party in an individual or representative capacity", ["partys own statement"], "(A)"),
        entry("rule-801-adoptive", "statement the party adopted or believed true", ["adoptive admission"], "(B)"),
        entry("rule-801-authorized", "statement by a person authorized on the subject", ["authorized statement"], "(C)"),
        entry("rule-801-agent", "agent or employee statement within scope and during the relationship", ["agent statement within scope"], "(D)"),
        entry("rule-801-coconspirator", "coconspirator statement during and in furtherance of the conspiracy", ["coconspirator statement"], "(E)"),
      ],
    },
  ],
);

export const freRule802Question = question(
  "802",
  "rule-against-hearsay",
  "The Rule Against Hearsay",
  "Fill the default rule and the three authorities that can provide otherwise.",
  [
    {
      id: "default",
      title: "Default Rule",
      answers: [
        entry("rule-802-inadmissible", "hearsay is not admissible", ["hearsay inadmissible"], "Rule"),
      ],
    },
    {
      id: "exceptions-authority",
      title: "May Provide Otherwise",
      answers: [
        entry("rule-802-statute", "federal statute", [], "1"),
        entry("rule-802-rules", "Federal Rules of Evidence", ["these rules", "FRE"], "2"),
        entry("rule-802-supreme", "other rules prescribed by the Supreme Court", ["Supreme Court rules"], "3"),
      ],
    },
  ],
);

const rule803ExceptionNames = [
  ["present-sense", "Present Sense Impression", ["present sense"], "(1)"],
  ["excited-utterance", "Excited Utterance", [], "(2)"],
  ["then-existing", "Then-Existing Mental, Emotional, or Physical Condition", ["then existing condition", "state of mind"], "(3)"],
  ["medical", "Statement Made for Medical Diagnosis or Treatment", ["medical diagnosis or treatment"], "(4)"],
  ["recorded-recollection", "Recorded Recollection", [], "(5)"],
  ["regular-activity", "Records of a Regularly Conducted Activity", ["business records", "regularly conducted activity"], "(6)"],
  ["absence-regular", "Absence of a Record of a Regularly Conducted Activity", ["absence of business record"], "(7)"],
  ["public-records", "Public Records", [], "(8)"],
  ["vital-statistics", "Public Records of Vital Statistics", ["vital statistics"], "(9)"],
  ["absence-public", "Absence of a Public Record", [], "(10)"],
  ["religious-records", "Records of Religious Organizations Concerning Personal or Family History", ["religious organization records"], "(11)"],
  ["ceremony-certificates", "Certificates of Marriage, Baptism, and Similar Ceremonies", ["marriage and baptism certificates"], "(12)"],
  ["family-records", "Family Records", [], "(13)"],
  ["property-records", "Records of Documents That Affect an Interest in Property", ["property document records"], "(14)"],
  ["property-statements", "Statements in Documents That Affect an Interest in Property", ["property document statements"], "(15)"],
  ["ancient-documents", "Statements in Ancient Documents", ["ancient documents"], "(16)"],
  ["market-reports", "Market Reports and Similar Commercial Publications", ["market reports"], "(17)"],
  ["learned-treatises", "Statements in Learned Treatises, Periodicals, or Pamphlets", ["learned treatises"], "(18)"],
  ["personal-reputation", "Reputation Concerning Personal or Family History", ["family history reputation"], "(19)"],
  ["boundary-reputation", "Reputation Concerning Boundaries or General History", ["boundaries or general history reputation"], "(20)"],
  ["character-reputation", "Reputation Concerning Character", ["character reputation"], "(21)"],
  ["conviction-judgment", "Judgment of a Previous Conviction", ["prior conviction judgment"], "(22)"],
  ["history-judgment", "Judgments Involving Personal, Family, or General History, or a Boundary", ["history or boundary judgment"], "(23)"],
];

export const freRule803Question = question(
  "803",
  "hearsay-exceptions",
  "Hearsay Exceptions Regardless of Declarant Availability",
  "Use each subsection number as the clue and name all 23 Rule 803 exceptions.",
  [
    {
      id: "exceptions-1-8",
      title: "Exceptions 1-8",
      answers: rule803ExceptionNames.slice(0, 8).map(([id, text, aliases, indicator]) => entry(`rule-803-${id}`, text, aliases, indicator)),
    },
    {
      id: "exceptions-9-16",
      title: "Exceptions 9-16",
      answers: rule803ExceptionNames.slice(8, 16).map(([id, text, aliases, indicator]) => entry(`rule-803-${id}`, text, aliases, indicator)),
    },
    {
      id: "exceptions-17-23",
      title: "Exceptions 17-23",
      answers: rule803ExceptionNames.slice(16).map(([id, text, aliases, indicator]) => entry(`rule-803-${id}`, text, aliases, indicator)),
    },
  ],
);

export const freRule804Question = question(
  "804",
  "declarant-unavailable",
  "Hearsay Exceptions When the Declarant Is Unavailable",
  "Fill the five grounds for unavailability and the five operative Rule 804 exceptions.",
  [
    {
      id: "unavailability",
      title: "Unavailable When",
      answers: [
        entry("rule-804-privilege", "exempted because privilege applies", ["privilege"], "(a)(1)"),
        entry("rule-804-refusal", "refuses to testify despite a court order", ["refusal despite court order"], "(a)(2)"),
        entry("rule-804-memory", "testifies to not remembering the subject matter", ["lack of memory", "does not remember"], "(a)(3)"),
        entry("rule-804-death-illness", "death or then-existing physical or mental illness", ["death illness or infirmity"], "(a)(4)"),
        entry("rule-804-absence", "absent and attendance or testimony cannot be procured by reasonable means", ["absence despite reasonable efforts"], "(a)(5)"),
        entry("rule-804-wrongful-cause", "not if the proponent wrongfully caused unavailability to prevent testimony", ["proponent caused unavailability"], "Limit"),
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions",
      answers: [
        entry("rule-804-former-testimony", "Former Testimony", [], "(b)(1)"),
        entry("rule-804-dying-declaration", "Statement Under the Belief of Imminent Death", ["dying declaration"], "(b)(2)"),
        entry("rule-804-against-interest", "Statement Against Interest", [], "(b)(3)"),
        entry("rule-804-family-history", "Statement of Personal or Family History", ["personal or family history"], "(b)(4)"),
        entry("rule-804-forfeiture", "Statement Offered Against a Party That Wrongfully Caused the Declarant's Unavailability", ["forfeiture by wrongdoing"], "(b)(6)"),
      ],
    },
    {
      id: "key-conditions",
      title: "Key Conditions",
      answers: [
        entry("rule-804-opportunity-motive", "opportunity and similar motive to develop former testimony", ["opportunity and similar motive"], "Former testimony"),
        entry("rule-804-homicide-civil", "homicide prosecution or civil case", ["homicide or civil case"], "Dying declaration"),
        entry("rule-804-corroboration", "corroborating circumstances clearly indicate trustworthiness", ["corroborating circumstances"], "Criminal statement against interest"),
        entry("rule-804-intent", "wrongful causation intended to make the declarant unavailable", ["intent to cause unavailability"], "Forfeiture"),
      ],
    },
  ],
);

export const freRule805Question = question(
  "805",
  "hearsay-within-hearsay",
  "Hearsay Within Hearsay",
  "Fill the condition for admitting hearsay within hearsay.",
  [
    {
      id: "combined-statements",
      title: "Combined Statements",
      answers: [
        entry("rule-805-each-part", "each part of the combined statements", ["each layer", "every layer"], "Coverage"),
        entry("rule-805-exception", "conforms with an exception to the rule against hearsay", ["has a hearsay exception"], "Requirement"),
      ],
    },
  ],
);

export const freRule806Question = question(
  "806",
  "declarant-credibility",
  "Attacking and Supporting the Declarant's Credibility",
  "Fill when declarant credibility may be attacked or supported and the special impeachment rules.",
  [
    {
      id: "trigger-and-method",
      title: "Trigger and Method",
      answers: [
        entry("rule-806-hearsay", "admitted hearsay statement", ["hearsay admitted"], "Trigger 1"),
        entry("rule-806-party-statements", "admitted Rule 801(d)(2)(C), (D), or (E) statement", ["801 d 2 C D or E"], "Trigger 2"),
        entry("rule-806-as-witness", "evidence admissible if the declarant had testified as a witness", ["same evidence as if declarant testified"], "Method"),
      ],
    },
    {
      id: "special-rules",
      title: "Special Rules",
      answers: [
        entry("rule-806-inconsistent", "inconsistent statement or conduct regardless of when it occurred", ["inconsistent statement or conduct"], "Timing"),
        entry("rule-806-no-opportunity", "no opportunity to explain or deny is required", ["need not explain or deny"], "Opportunity"),
        entry("rule-806-cross", "party may examine a called declarant as if on cross-examination", ["examine declarant as on cross"], "Called declarant"),
      ],
    },
  ],
);

export const freRule807Question = question(
  "807",
  "residual-exception",
  "Residual Exception",
  "Fill the trustworthiness, necessity, and notice requirements of the residual hearsay exception.",
  [
    {
      id: "admissibility",
      title: "Admissibility",
      answers: [
        entry("rule-807-outside", "not admissible under Rule 803 or 804", ["outside 803 and 804"], "Starting point"),
        entry("rule-807-trustworthiness", "sufficient guarantees of trustworthiness", ["trustworthiness"], "Requirement 1"),
        entry("rule-807-totality", "totality of the circumstances and corroborating evidence", ["totality and corroboration"], "Consider"),
        entry("rule-807-more-probative", "more probative than other reasonably obtainable evidence", ["more probative than other evidence"], "Requirement 2"),
      ],
    },
    {
      id: "notice",
      title: "Notice",
      answers: [
        entry("rule-807-reasonable", "reasonable notice to an adverse party", ["reasonable notice"], "Timing"),
        entry("rule-807-substance-name", "statement's substance and declarant's name", ["substance and declarant name"], "Content"),
        entry("rule-807-fair-opportunity", "fair opportunity to meet the statement", ["fair opportunity"], "Purpose"),
        entry("rule-807-writing", "in writing before trial or hearing", ["written before trial"], "Form"),
        entry("rule-807-good-cause", "any form during trial or hearing for good cause", ["during trial for good cause"], "Exception"),
      ],
    },
  ],
);

const rule901Examples = [
  ["knowledge", "Testimony of a Witness with Knowledge", ["witness with knowledge"], "(1)"],
  ["handwriting", "Nonexpert Opinion About Handwriting", ["lay handwriting opinion"], "(2)"],
  ["comparison", "Comparison by an Expert Witness or the Trier of Fact", ["authenticated specimen comparison"], "(3)"],
  ["distinctive", "Distinctive Characteristics and the Like", ["distinctive characteristics"], "(4)"],
  ["voice", "Opinion About a Voice", ["voice identification"], "(5)"],
  ["telephone", "Evidence About a Telephone Conversation", ["telephone conversation"], "(6)"],
  ["public-records", "Evidence About Public Records", ["public records"], "(7)"],
  ["ancient", "Evidence About Ancient Documents or Data Compilations", ["ancient documents"], "(8)"],
  ["process", "Evidence About a Process or System", ["process or system"], "(9)"],
  ["statute-rule", "Methods Provided by a Statute or Rule", ["statute or rule"], "(10)"],
];

export const freRule901Question = question(
  "901",
  "authentication",
  "Authenticating or Identifying Evidence",
  "Fill the general authentication standard and the ten nonexclusive examples.",
  [
    {
      id: "general-standard",
      title: "General Standard",
      answers: [
        entry("rule-901-sufficient", "evidence sufficient to support a finding", ["sufficient evidence"], "Quantum"),
        entry("rule-901-what-claimed", "item is what the proponent claims it is", ["what it claims to be"], "Finding"),
      ],
    },
    {
      id: "examples-1-5",
      title: "Examples 1-5",
      answers: rule901Examples.slice(0, 5).map(([id, text, aliases, indicator]) => entry(`rule-901-${id}`, text, aliases, indicator)),
    },
    {
      id: "examples-6-10",
      title: "Examples 6-10",
      answers: rule901Examples.slice(5).map(([id, text, aliases, indicator]) => entry(`rule-901-${id}`, text, aliases, indicator)),
    },
  ],
);

const rule902Items = [
  ["sealed-public", "Domestic Public Documents That Are Sealed and Signed", ["sealed and signed domestic public documents"], "(1)"],
  ["unsealed-public", "Domestic Public Documents That Are Not Sealed but Are Signed and Certified", ["signed and certified domestic public documents"], "(2)"],
  ["foreign-public", "Foreign Public Documents", [], "(3)"],
  ["certified-public", "Certified Copies of Public Records", [], "(4)"],
  ["official-publications", "Official Publications", [], "(5)"],
  ["newspapers", "Newspapers and Periodicals", [], "(6)"],
  ["trade", "Trade Inscriptions and the Like", ["trade inscriptions"], "(7)"],
  ["acknowledged", "Acknowledged Documents", [], "(8)"],
  ["commercial-paper", "Commercial Paper and Related Documents", [], "(9)"],
  ["federal-presumption", "Presumptions Under a Federal Statute", ["federal statutory presumptions"], "(10)"],
  ["domestic-business", "Certified Domestic Records of a Regularly Conducted Activity", ["certified domestic business records"], "(11)"],
  ["foreign-business", "Certified Foreign Records of a Regularly Conducted Activity", ["certified foreign business records"], "(12)"],
  ["electronic-process", "Certified Records Generated by an Electronic Process or System", ["certified electronic process records"], "(13)"],
  ["copied-data", "Certified Data Copied from an Electronic Device, Storage Medium, or File", ["certified copied electronic data"], "(14)"],
];

export const freRule902Question = question(
  "902",
  "self-authentication",
  "Evidence That Is Self-Authenticating",
  "Use each subsection number as the clue and name all 14 categories of self-authenticating evidence.",
  [
    {
      id: "items-1-5",
      title: "Items 1-5",
      answers: rule902Items.slice(0, 5).map(([id, text, aliases, indicator]) => entry(`rule-902-${id}`, text, aliases, indicator)),
    },
    {
      id: "items-6-10",
      title: "Items 6-10",
      answers: rule902Items.slice(5, 10).map(([id, text, aliases, indicator]) => entry(`rule-902-${id}`, text, aliases, indicator)),
    },
    {
      id: "items-11-14",
      title: "Items 11-14",
      answers: rule902Items.slice(10).map(([id, text, aliases, indicator]) => entry(`rule-902-${id}`, text, aliases, indicator)),
    },
  ],
);

export const freRule1001Question = question(
  "1001",
  "contents-definitions",
  "Definitions That Apply to This Article",
  "Fill the five definitions used by the original-writing rules.",
  [
    {
      id: "forms",
      title: "Forms",
      answers: [
        entry("rule-1001-writing", "letters, words, numbers, or their equivalent set down in any form", ["letters words or numbers set down in any form"], "Writing"),
        entry("rule-1001-recording", "letters, words, numbers, or their equivalent recorded in any manner", ["letters words or numbers recorded in any manner"], "Recording"),
        entry("rule-1001-photograph", "photographic image or its equivalent stored in any form", ["photographic image"], "Photograph"),
      ],
    },
    {
      id: "original",
      title: "Original",
      answers: [
        entry("rule-1001-itself", "writing or recording itself", ["itself"], "Writing / recording"),
        entry("rule-1001-counterpart", "counterpart intended to have the same effect", ["intended counterpart"], "Writing / recording"),
        entry("rule-1001-esi", "printout or readable output that accurately reflects electronically stored information", ["accurate ESI printout"], "ESI"),
        entry("rule-1001-photo", "negative or a print from it", ["negative or print"], "Photograph"),
      ],
    },
    {
      id: "duplicate",
      title: "Duplicate",
      answers: [
        entry("rule-1001-process", "counterpart produced by an equivalent process or technique", ["counterpart produced by a process"], "Method"),
        entry("rule-1001-accurate", "accurately reproduces the original", ["accurate reproduction"], "Result"),
      ],
    },
  ],
);

export const freRule1002Question = question(
  "1002",
  "original-required",
  "Requirement of the Original",
  "Fill when an original is required and the authorities that may provide otherwise.",
  [
    {
      id: "requirement",
      title: "Original Required",
      answers: [
        entry("rule-1002-writing", "writing", [], "1"),
        entry("rule-1002-recording", "recording", [], "2"),
        entry("rule-1002-photograph", "photograph", [], "3"),
        entry("rule-1002-content", "to prove its content", ["prove content"], "Purpose"),
      ],
    },
    {
      id: "otherwise",
      title: "May Provide Otherwise",
      answers: [
        entry("rule-1002-rules", "Federal Rules of Evidence", ["these rules", "FRE"], "1"),
        entry("rule-1002-statute", "federal statute", [], "2"),
      ],
    },
  ],
);

export const freRule1003Question = question(
  "1003",
  "duplicates",
  "Admissibility of Duplicates",
  "Fill the default rule for duplicates and its two exceptions.",
  [
    {
      id: "default",
      title: "Default",
      answers: [
        entry("rule-1003-same-extent", "duplicate is admissible to the same extent as the original", ["same extent as original"], "Rule"),
      ],
    },
    {
      id: "exceptions",
      title: "Unless",
      answers: [
        entry("rule-1003-authenticity", "genuine question about the original's authenticity", ["question of authenticity"], "1"),
        entry("rule-1003-unfair", "circumstances make it unfair to admit the duplicate", ["unfair to admit duplicate"], "2"),
      ],
    },
  ],
);

export const freRule1004Question = question(
  "1004",
  "other-content-evidence",
  "Admissibility of Other Evidence of Content",
  "Fill the four situations in which an original is not required.",
  [
    {
      id: "original-unavailable",
      title: "Original Unavailable",
      answers: [
        entry("rule-1004-lost", "all originals are lost or destroyed without proponent bad faith", ["lost or destroyed not in bad faith"], "(a)"),
        entry("rule-1004-process", "original cannot be obtained by available judicial process", ["unobtainable by judicial process"], "(b)"),
      ],
    },
    {
      id: "opponent-control",
      title: "Opponent Had Control",
      answers: [
        entry("rule-1004-control", "opposing party had control of the original", ["opponent controlled original"], "1"),
        entry("rule-1004-notice", "was put on notice that the original would be a subject of proof", ["notice original would be subject of proof"], "2"),
        entry("rule-1004-fails", "fails to produce it at trial or hearing", ["failure to produce"], "3"),
      ],
    },
    {
      id: "collateral",
      title: "Collateral Matter",
      answers: [
        entry("rule-1004-not-controlling", "not closely related to a controlling issue", ["collateral matter", "not a controlling issue"], "(d)"),
      ],
    },
  ],
);

export const freRelevanceQuestions = [
  freRule404Question,
  freRule405Question,
  freRule406Question,
  freRule407Question,
  freRule408Question,
  freRule409Question,
  freRule410Question,
  freRule411Question,
  freRule412Question,
  freRule413Question,
  freRule414Question,
  freRule415Question,
];

export const frePrivilegesAndWitnessesQuestions = [
  freRule501Question,
  freRule601Question,
  freRule602Question,
  freRule607Question,
  freRule608Question,
  freRule609Question,
  freRule610Question,
  freRule611Question,
  freRule612Question,
  freRule613Question,
  freRule615Question,
];

export const freOpinionsAndHearsayQuestions = [
  freRule701Question,
  freRule702Question,
  freRule703Question,
  freRule705Question,
  freRule801Question,
  freRule802Question,
  freRule803Question,
  freRule804Question,
  freRule805Question,
  freRule806Question,
  freRule807Question,
];

export const freAuthenticationAndContentsQuestions = [
  freRule901Question,
  freRule902Question,
  freRule1001Question,
  freRule1002Question,
  freRule1003Question,
  freRule1004Question,
];

export const freRemainingQuestions = [
  ...freRelevanceQuestions,
  ...frePrivilegesAndWitnessesQuestions,
  ...freOpinionsAndHearsayQuestions,
  ...freAuthenticationAndContentsQuestions,
];
