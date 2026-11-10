// Original recall prompts scoped to the user's FL.Rose.EvidDist.pdf.
// Page references use the PDF page counter. Statutes and current federal rules
// qualify the lecture's shorthand; the proprietary handout is not redistributed.
const statute = (section) => `https://www.flsenate.gov/Laws/Statutes/2026/${section}`;
const federalRules = "https://www.uscourts.gov/sites/default/files/document/federal-rules-of-evidence.pdf";
const politeOpinion = "https://library.law.fsu.edu/Digital-Collections/flsupct/dockets/sc10-1812/op-sc10-1812.pdf";

function column(id, title, rows) {
  return {
    id,
    title,
    answers: rows.map(([key, indicator, answer, ...extras]) => ({
      id: `fl-evid-dist-${id}-${key}`,
      indicator,
      answer,
      acceptedAnswers: extras.filter((value) => typeof value === "string"),
    })),
  };
}

function drill(id, title, pages, prompt, columns, section, references, clarification) {
  return {
    id: `fl-evid-dist-${id}`,
    type: "sporcle-grid",
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    title: `Florida Evidence: ${title}`,
    prompt,
    sourceUrl: statute(section),
    sourceLabel: `Florida Statutes § ${section} and related evidence provisions`,
    courseSources: [
      `FL.Rose.EvidDist.pdf — PDF pp. ${pages}.`,
      `Legal reference: ${references}. Florida statutory text checked November 9, 2026.`,
      `Federal comparison: current Federal Rules of Evidence, last amended December 1, 2024: ${federalRules}`,
      ...(clarification ? [`Source clarification: ${clarification}`] : []),
    ],
    columns,
  };
}

export const floridaEvidenceDistinctionsQuestions = [
  drill("judicial-role", "The Judge's Role", "1", "Recall who decides preliminary admissibility and the limits on judicial commentary in Florida.", [
    column("judge", "Gatekeeping and the Jury", [
      ["preliminary", "Who ordinarily decides witness qualification, privileges, and admissibility?", "Court", "judge", "trial judge"],
      ["conditional", "Conditional relevance under § 90.105(2) requires sufficient evidence to support a finding of the preliminary fact. Name the statutory threshold.", "Prima facie evidence", "prima facie"],
      ["summary", "May a Florida judge summarize the evidence to the jury?", "No"],
      ["credibility", "Along with weight and guilt, the judge may not comment to the jury on witness ____", "Credibility", "credibility of witnesses"],
      ["confessions", "A hearing on confession admissibility must occur outside the hearing of whom?", "Jury", "the jury"],
    ]),
  ], "90.105", "§§ 90.105–90.106; FRE 104", "The prima facie conditional-relevance rule is distinct from the heightened proof required for certain collateral-crime evidence. Section 90.105 does not reproduce FRE 104(a)'s express exemption from evidence rules; that textual difference is not a universal ban on all otherwise inadmissible material at every Florida hearing."),

  drill("judicial-notice", "Judicial Notice", "1–2", "Distinguish mandatory notice of law from requested notice of other eligible matters.", [
    column("notice", "Florida Notice Rules", [
      ["law", "Must or may the court notice Florida and federal public statutory law under § 90.201?", "Must", "shall", "mandatory"],
      ["statewide", "Florida court rules subject to mandatory notice must have what geographic application?", "Statewide", "statewide application"],
      ["other", "Without a qualifying request, § 90.202 generally makes notice of its listed matters mandatory or discretionary?", "Discretionary", "may", "permissive"],
      ["notice", "A compulsory request under § 90.203 requires timely ____ notice to adverse parties", "Written", "written notice"],
      ["information", "The requester must supply the court with sufficient ____ to take notice", "Information"],
      ["jury", "Section 90.206 says the court ____ instruct the jury to accept a noticed matter as fact", "May"],
    ]),
  ], "90.203", "§§ 90.201–90.206; FRE 201", "Section 90.206 uses discretionary wording. In a criminal case, judicial notice cannot conclusively remove an element from the jury. FRE 201 governs adjudicative facts; its civil/criminal jury-instruction rules should not be substituted word for word for Florida's statute."),

  drill("witness-exclusion", "Witness Exclusion", "2–3", "Identify Florida's sequestration rule and the protected attendees.", [
    column("exclusion", "Who May Remain?", [
      ["request", "At a party's request, exclusion of nonexempt witnesses is mandatory or discretionary?", "Mandatory", "shall", "must"],
      ["party", "A party who is a natural person may be excluded under § 90.616: yes or no?", "No"],
      ["representative", "In a civil case, counsel may designate an officer or ____ as an entity party's representative", "Employee"],
      ["essential", "A nonparty witness may remain if shown to be ____ to presenting the cause", "Essential", "necessary"],
      ["victim", "In a criminal case, the crime's ____ and specified family or representatives ordinarily may remain", "Victim"],
      ["prejudice", "The statutory victim/family exception can be overcome upon motion and a finding that presence is what?", "Prejudicial", "prejudice", "prejudicial to the accused"],
    ]),
  ], "90.616", "§ 90.616; FRE 615; Florida Constitution art. I, § 16", "Read statutory victim-attendance provisions with constitutional victims' rights and the accused's constitutional rights. FRE 615 also protects natural-person parties; that federal exception is omitted from the handout's abbreviated list."),

  drill("presumptions", "Civil Presumptions", "3–4", "Separate Florida's two rebuttable-presumption mechanisms.", [
    column("presumptions", "What Burden Changes?", [
      ["conclusive", "A presumption that contrary evidence cannot rebut", "Conclusive", "conclusive presumption", "irrebuttable"],
      ["production", "A bursting-bubble presumption shifts the burden of ____ evidence", "Producing", "production", "producing evidence"],
      ["burst", "After sufficient credible contrary evidence, a production presumption does what?", "Disappears", "bursts", "ceases to operate"],
      ["proof", "The other Florida rebuttable category shifts the burden of ____", "Proof", "persuasion"],
      ["federal", "FRE 301's default civil presumption shifts production, but not this ultimate burden", "Persuasion", "proof", "burden of persuasion"],
    ]),
  ], "90.302", "§§ 90.301–90.304; FRE 301–302", "The federal production rule is a default, subject to federal statute or other rules. FRE 302 applies state law to presumptions concerning a claim or defense for which state law supplies the rule of decision; the handout's statement that all federal presumptions are bursting-bubble or conclusive is too broad."),

  drill("character", "Character Proof and Opening the Door", "4–5", "Recall Florida's method of character proof and the separate doors for the accused and victim.", [
    column("character", "Florida Character Rules", [
      ["method", "When proving character through a character witness, Florida ordinarily permits this community-based method", "Reputation", "reputation testimony", "reputation evidence"],
      ["opinion", "Does § 90.405 generally authorize personal-opinion character testimony as FRE 405 does?", "No"],
      ["accused", "The accused's pertinent trait may be offered by the accused or by the prosecution to do what to that trait?", "Rebut", "rebut it", "rebut the trait"],
      ["victim", "Attacking the victim's trait alone automatically opens the accused's same trait in Florida: yes or no?", "No"],
      ["essential", "Specific acts can prove character when character is an ____ element of a charge, claim, or defense", "Essential"],
      ["homicide", "In homicide, evidence that the victim was the aggressor permits prosecution evidence of the victim's ____", "Peacefulness", "peaceful character"],
    ]),
  ], "90.405", "§§ 90.404(1), 90.405; FRE 404(a), 405", "Reputation-only describes ordinary character-witness proof, not the essential-element exception for specific acts. The homicide peacefulness provision does not require the defendant first to introduce a character witness."),

  drill("other-acts", "Other Acts and Williams Evidence", "5–6", "Distinguish a permitted material-fact use from propensity and recall notice safeguards.", [
    column("other-acts", "Purpose and Safeguards", [
      ["propensity", "Under ordinary § 90.404(2)(a), other acts cannot be relevant solely to bad character or ____", "Propensity", "action in conformity"],
      ["purpose", "MIMIC's I can identify the material issue of who committed the offense. Name it.", "Identity"],
      ["notice", "Minimum pretrial written-notice period for the state's qualifying other-offense evidence", "10 days", "10", "ten days"],
      ["rebuttal", "Besides impeachment, what use is expressly exempt from that notice requirement?", "Rebuttal", "rebuttal evidence"],
      ["proof", "Florida collateral-crime proof uses this heightened evidentiary standard", "Clear and convincing evidence", "clear and convincing"],
      ["balance", "Section 90.403 excludes evidence when unfair-prejudice danger ____ outweighs probative value", "Substantially"],
    ]),
  ], "90.404", "§§ 90.404(2), 90.403; McLean v. State, 934 So. 2d 1248 (Fla. 2006); FRE 404(b), 413–415", "Current § 90.404(2)(b)–(c) separately permits defined child-molestation and sexual-offense evidence for any relevant matter, subject to safeguards; it is not limited to sexual battery alone. Reverse-Williams identity evidence requires sufficiently distinctive similarity, rather than treating mere relevance as enough. The general § 90.105 prima facie standard is not displaced for all other-act questions."),

  drill("routine-practice", "Routine Practice and Personal Habit", "6", "Identify the narrower wording of Florida's routine-practice statute.", [
    column("routine", "Routine and Corroboration", [
      ["entity", "Section 90.406 expressly addresses the routine practice of what kind of actor?", "Organization", "an organization"],
      ["corroboration", "Does organizational routine practice require corroboration under that statute?", "No"],
      ["eyewitness", "Does organizational routine practice require an eyewitness to the particular occasion?", "No"],
      ["federal", "In addition to organizations, FRE 406 expressly covers a ____'s habit", "Person", "individual"],
    ]),
  ], "90.406", "§ 90.406; FRE 406", "The handout discusses Florida case-law admission of personal habit to corroborate evidence of conduct. Do not transfer § 90.406's express no-corroboration rule for organizations into a broad assertion that every person's uncorroborated habit is admissible in Florida."),

  drill("competence", "Competence, Children, and Interpreters", "6–7", "Recall the core Florida witness qualifications and communication accommodations.", [
    column("competence", "Testifying Truthfully", [
      ["default", "Under § 90.601, every person is presumed what unless a statute provides otherwise?", "Competent", "competent to testify"],
      ["communication", "One disqualification is inability to communicate so as to be ____ directly or through interpretation", "Understood"],
      ["truth", "The other disqualification is inability to understand the duty to tell the ____", "Truth"],
      ["knowledge", "Except for applicable expert rules, the witness needs ____ knowledge", "Personal", "personal knowledge"],
      ["child", "A child who understands truth-telling may testify without an oath in whose discretion?", "Court", "judge", "trial court"],
      ["interpreter", "Florida interpreter assistance is limited to foreign-language speakers: yes or no?", "No"],
    ]),
  ], "90.603", "§§ 90.601, 90.603–90.606; FRE 601–604", "Section 90.605(2) describes a child understanding the duty to tell the truth or not to lie. The federal interpreter rule is not itself limited to foreign languages either; the handout's federal statement is an ordinary-use description, not an absolute limit."),

  drill("truthfulness", "Truthfulness Impeachment", "7", "Separate Florida character impeachment from other reasons to challenge a witness.", [
    column("truthfulness", "Character for Truth", [
      ["method", "Florida's character-for-truthfulness method uses ____ testimony", "Reputation", "reputation evidence"],
      ["opinion", "May a witness give a personal opinion of another witness's honesty under § 90.609?", "No"],
      ["bolster", "Evidence of truthful character ordinarily follows an ____ on that character", "Attack", "attack on truthfulness"],
      ["acts", "May counsel ask the primary witness about unconvicted dishonest acts solely to prove untruthful character as under FRE 608(b)?", "No"],
      ["conviction", "A qualifying prior criminal ____ has its own Florida impeachment provision", "Conviction"],
    ]),
  ], "90.609", "§§ 90.608–90.610; FRE 608–609", "The specific-act restriction concerns character for truthfulness; it does not bar otherwise proper proof of bias, contradiction, or other independently admissible evidence. A reputation witness may face good-faith testing of the reputation testimony under § 90.405."),

  drill("convictions", "Conviction Impeachment", "8–9", "Recall qualifying crimes and Florida's different treatment of age, pardons, and juvenile adjudications.", [
    column("convictions", "Qualifying Convictions", [
      ["felony", "Apart from crimes involving dishonesty, the statutory punishment threshold is death or imprisonment exceeding how long?", "1 year", "one year", "a year"],
      ["misdemeanor", "A crime qualifies regardless of punishment if it involves dishonesty or a ____ statement", "False", "false statement"],
      ["civil", "In a civil trial, a conviction is excluded if too ____ to bear on present character", "Remote", "remote in time"],
      ["fixed", "Does Florida impose FRE 609(b)'s fixed ten-year trigger?", "No"],
      ["juvenile", "Juvenile adjudications are admissible under § 90.610: yes or no?", "No"],
      ["pardon", "Does a pardon alone make a qualifying conviction inadmissible under § 90.610?", "No"],
      ["details", "If the witness truthfully admits the qualifying convictions and number, may counsel ordinarily name the crimes solely for this impeachment?", "No"],
    ]),
  ], "90.610", "§§ 90.610, 90.403; FRE 609", "Section 90.403 remains applicable. FRE 609's old-conviction provision is a heightened balancing-and-notice rule, not an absolute ten-year ban; federal pardons also have specific rehabilitation/innocence conditions. Denial or misstatement of convictions can permit corrective proof."),

  drill("prior-statements", "Prior Inconsistent Statements", "9", "Recall Florida disclosure and foundation requirements, with the current federal comparison.", [
    column("prior-statements", "Disclosure and Extrinsic Proof", [
      ["motion", "On whose motion must a written prior statement be shown to the witness or its contents disclosed?", "Adverse party", "opposing party"],
      ["before", "Ordinarily, Florida gives a witness a chance to explain or deny before or after admission of extrinsic inconsistent-statement evidence?", "Before"],
      ["opposing", "The opposing party must also have an opportunity to ____ the witness about it", "Interrogate", "question", "examine"],
      ["admit", "The statute permits extrinsic proof if the witness denies making or does not distinctly ____ making the statement", "Admit"],
      ["justice", "The ordinary foundation rule may yield when the interests of ____ otherwise require", "Justice"],
      ["party", "The extrinsic-proof foundation subsection does not apply to admissions of a ____ opponent", "Party", "party opponent"],
    ]),
  ], "90.614", "§ 90.614; FRE 613, as amended December 1, 2024", "The handout's federal timing comparison is outdated. Current FRE 613(b) also ordinarily requires the opportunity to explain or deny before extrinsic admission, unless the court orders otherwise. FRE 613(a) requires disclosure to adverse counsel on request; Florida's provision concerns disclosure to the witness on adverse-party motion."),

  drill("opinions", "Lay and Expert Opinions", "9–10", "Recall Florida's lay-opinion conditions and the limits of ultimate-issue testimony.", [
    column("opinions", "Opinion Foundations", [
      ["perception", "Lay opinion must concern what the witness personally ____", "Perceived", "observed"],
      ["necessity", "The witness cannot communicate the perception equally accurately and adequately without using an ____", "Opinion", "inference", "inference or opinion"],
      ["mislead", "Lay opinion must not ____ the factfinder to the objecting party's prejudice", "Mislead"],
      ["special", "Lay opinions may not require ____ knowledge, skill, experience, or training", "Special", "specialized"],
      ["ultimate", "Is an otherwise admissible opinion excluded merely because it reaches an ultimate issue in Florida?", "No"],
      ["legal", "An expert still may not simply instruct the jury through an impermissible ____ conclusion", "Legal", "legal conclusion"],
    ]),
  ], "90.701", "§§ 90.701–90.703; FRE 701, 704", "Florida has no direct counterpart to FRE 704(b)'s criminal-defendant mental-state bar. That does not dispense with qualification, reliability, helpfulness, or the prohibition on inappropriate legal conclusions; an ultimate-issue label alone neither admits nor excludes an opinion."),

  drill("tangible-evidence", "Tangible Evidence and Theft Photographs", "10", "Recall the course foundation mnemonic and Florida's photograph documentation.", [
    column("tangible", "Foundation and Identification", [
      ["competence", "CRIT's C: the sponsoring witness must have this ability to testify", "Competence", "competency"],
      ["relevance", "CRIT's R: the item must matter to an issue in the case", "Relevance", "relevancy"],
      ["identity", "CRIT's I: the object is what its proponent claims it is", "Identity", "identification", "authentication"],
      ["truth", "CRIT's T: a depiction accurately represents what it purports to show", "Truth", "truthfulness", "accuracy"],
      ["owner", "A theft photograph's sworn written description must identify the property's ____", "Owner"],
      ["oath", "Who makes the accompanying writing under oath?", "Investigating law enforcement officer", "investigating officer", "law enforcement officer"],
      ["signature", "Whose signature identifies the photograph?", "Photographer", "the photographer"],
    ]),
  ], "90.91", "§§ 90.91, 90.901; course CRIT foundation mnemonic", "The statutory writing also lists the property description, taking location, investigating officer, photograph date, and photographer's name. CRIT is course shorthand; its exact foundation depends on the type and purpose of the exhibit."),

  drill("duplicates", "Originals and Duplicates", "10", "Recall the limits on Florida's ordinary duplicate-admissibility rule.", [
    column("duplicates", "When the Ordinary Rule Fails", [
      ["default", "Ordinarily, a duplicate is admissible to the same extent as an ____", "Original"],
      ["negotiable", "Section 90.953(1) identifies a ____ instrument as one special category", "Negotiable"],
      ["security", "Another special category is a security or a qualifying right-to-payment ____", "Writing", "document"],
      ["authenticity", "The ordinary duplicate rule also fails if a genuine question concerns the original's ____", "Authenticity"],
      ["fairness", "The court may reject a duplicate if substituting it for the original would be what?", "Unfair"],
    ]),
  ], "90.953", "§§ 90.951–90.954; FRE 1001–1004", "The payment-writing category excludes a security agreement or lease and requires ordinary-course transfer by delivery with any necessary endorsement or assignment. Failure of automatic duplicate admissibility is not an absolute prohibition: separately analyze § 90.954 or another applicable route to proving contents."),

  drill("business-records", "Certified Records and Recorded Opinions", "11, 17", "Distinguish self-authentication from the hearsay and opinion requirements.", [
    column("business-records", "Records Without a Live Custodian", [
      ["person", "A compliant certification may come from the custodian or another ____ person", "Qualified"],
      ["notice", "The proponent must give reasonable written ____ of using certification", "Notice"],
      ["inspection", "The record must be made available sufficiently in advance for ____ and challenge", "Inspection", "review"],
      ["opinion", "A recorded opinion must be admissible as though its maker were testifying ____", "Directly", "in person", "live"],
      ["layers", "Each additional embedded hearsay level requires its own exception: yes or no?", "Yes"],
    ]),
  ], "90.902", "§§ 90.902(11), 90.803(6), 90.805; FRE 803(6), 902(11)–(12)", "A qualifying certification or declaration is broader than the handout's affidavit shorthand. Authentication does not by itself establish every hearsay, opinion, trustworthiness, or constitutional requirement."),

  drill("marital-privilege", "Marital Communications", "11", "Distinguish confidential marital communications from a blanket right not to testify against a spouse.", [
    column("marital", "Florida Husband-Wife Privilege", [
      ["immunity", "Does Florida recognize a general adverse-spousal-testimony immunity merely because the witness is married to the accused?", "No"],
      ["confidential", "The communication privilege requires an intention that the communication remain ____", "Confidential", "in confidence", "private"],
      ["time", "The protected communication must have been made during the ____", "Marriage", "marital relationship"],
      ["holder", "Which spouse may claim the communication privilege?", "Either spouse", "either", "both spouses"],
      ["divorce", "Does later divorce alone destroy protection for earlier confidential marital communications?", "No"],
      ["suit", "Does the privilege apply in a proceeding brought by one spouse against the other?", "No"],
      ["defense", "In a criminal case, the communication may be offered by the ____ spouse", "Defendant", "defendant spouse"],
    ]),
  ], "90.504", "§ 90.504; § 90.501", "The criminal exception also covers charges against the person or property of the other spouse or a child of either spouse. Protection for communications is not a blanket privilege for everything a spouse observed."),

  drill("lawyer-privilege", "Lawyer-Client Communications", "11–12", "Recall the special Florida relationships and limited exceptions identified in the course.", [
    column("lawyer", "Relationships and Exceptions", [
      ["holder", "The lawyer ordinarily asserts the privilege on behalf of whom?", "Client", "the client"],
      ["decedent", "An exception covers relevant disputes between parties claiming through the same ____ client", "Deceased", "dead"],
      ["attesting", "An intention/competence exception can apply when the lawyer was an ____ witness to the document", "Attesting", "attesting witness"],
      ["program", "Special protection covers communications to the Department of Revenue's attorney in its child ____ enforcement program", "Support", "child support"],
      ["fiduciary", "Under § 90.5021, a lawyer's client is the fiduciary rather than the beneficiaries solely because they benefit: yes or no?", "Yes"],
    ]),
  ], "90.502", "§§ 90.502–90.5021", "Exceptions reach communications relevant to the specified issue; being a deceased client's lawyer does not alone eliminate privilege. The fiduciary statute treats the fiduciary as client for this purpose, rather than creating an automatic beneficiary entitlement to the communications."),

  drill("health-privileges", "Medical Confidentiality and Psychotherapy", "12", "Separate statutory medical confidentiality from Florida's psychotherapist privilege.", [
    column("health", "Confidential Health Information", [
      ["general", "Does Florida recognize a general common-law physician-patient evidentiary privilege?", "No"],
      ["statute", "Ordinary medical records and treatment information are protected by statutory ____", "Confidentiality", "medical confidentiality"],
      ["mental", "Section 90.503 protects confidential diagnosis or treatment of a mental or ____ condition", "Emotional"],
      ["addiction", "The psychotherapy definition includes alcoholism and other drug ____", "Addiction"],
      ["holder", "Who holds the psychotherapist-patient privilege?", "Patient", "the patient"],
      ["claim", "May a party rely on the mental condition as an element of a claim or defense while invoking § 90.503 to block relevant communications?", "No"],
    ]),
  ], "90.503", "§ 90.503; § 456.057(7)", "The handout's common-law physician-privilege description is inaccurate. Section 456.057 governs confidentiality and specified disclosure routes, including properly noticed compulsory process and medical-negligence provisions. Psychotherapist exceptions separately include qualifying commitment proceedings and court-ordered examinations; diagnosis alone is not an automatic waiver."),

  drill("other-privileges", "Other Confidential Relationships", "11–13", "Identify the Florida privilege that fits each protected relationship.", [
    column("other-privileges", "Match the Relationship", [
      ["clergy", "Private communications seeking spiritual counsel and advice", "Clergy privilege", "clergy penitent", "clergy penitent privilege", "clergy"],
      ["accountant", "Confidential communications made while obtaining professional accounting services", "Accountant-client privilege", "accountant client", "accountant"],
      ["sexual", "Qualifying communications for counseling after sexual assault", "Sexual assault counselor-victim privilege", "sexual assault counselor victim", "sexual assault counselor"],
      ["domestic", "Qualifying confidential communications to an advocate about domestic violence", "Domestic violence advocate-victim privilege", "domestic violence advocate victim", "domestic violence advocate"],
      ["trafficking", "Qualifying communications to a human-trafficking victim advocate", "Human trafficking victim advocate-victim privilege", "human trafficking advocate", "human trafficking privilege"],
      ["secret", "Privilege protecting commercially valuable confidential business information", "Trade secret privilege", "trade secret", "trade secrets"],
    ]),
  ], "90.5037", "§§ 90.5035–90.5037, 90.505–90.506", "Each statute defines the covered professional or advocate, confidentiality, holders, and exceptions. This is identification practice, not a claim that every conversation with someone bearing the listed title is privileged."),

  drill("journalists", "Journalist's Qualified Privilege", "13", "Recall the statutory balancing test and what publication does to the privilege.", [
    column("journalist", "Qualification and Disclosure", [
      ["type", "Is the professional-journalist privilege absolute or qualified?", "Qualified"],
      ["source", "Protected information includes the ____ of a news source", "Identity", "name"],
      ["material", "The requesting party must show relevance and ____ to unresolved issues", "Materiality", "material"],
      ["alternative", "The information must be unavailable from ____ sources", "Alternative", "other"],
      ["interest", "The requesting party must establish a ____ interest in disclosure", "Compelling"],
      ["publish", "Does publishing or broadcasting information alone waive this statutory privilege?", "No"],
    ]),
  ], "90.5015", "§ 90.5015", "The definition requires professional newsgathering for gain or livelihood in specified media employment or contracting. The privilege excludes physical evidence, eyewitness observations, and recordings of crimes. A court orders only the justified disclosure after a hearing and clear, specific findings; a generic assertion of state interest does not replace the three-part showing."),

  drill("policy-exclusions", "Sympathy, Mediation, and Crash Reporting", "13", "Keep the protected communication separate from independently admissible evidence.", [
    column("policy", "Public-Policy Boundaries", [
      ["sympathy", "In a civil action, § 90.4026 protects the portion expressing ____ following an accident", "Sympathy", "compassion", "benevolence"],
      ["fault", "That sympathy provision does not exclude a separate statement of ____", "Fault", "responsibility"],
      ["mediation", "A signed written settlement reached in mediation is ordinarily privileged merely because reached there: yes or no?", "No"],
      ["report", "Section 316.066 protects a participant's required crash-report statement in civil and ____ trials", "Criminal"],
      ["observations", "Does the crash-report privilege categorically exclude an officer's independent observations?", "No"],
    ]),
  ], "90.4026", "§ 90.4026; § 44.405; § 316.066(4)", "Mediation confidentiality has statutory exceptions beyond waiver. The crash-report protection concerns participant reports and reporting statements, not every fact collected during an investigation; § 316.066(4) contains exceptions, including qualifying criminal-trial use that preserves self-incrimination rights. Admissibility still requires the usual evidence foundations."),

  drill("rape-shield", "Florida Rape Shield", "13", "Recall the limited routes for another person's prior consensual activity in covered prosecutions.", [
    column("rape-shield", "Prior Sexual Conduct", [
      ["default", "Prior consensual sexual activity with someone other than the offender is generally admissible or inadmissible?", "Inadmissible", "excluded"],
      ["hearing", "Before an exception is used, the court holds what private proceeding?", "In camera proceeding", "in camera", "in camera hearing"],
      ["source", "An exception can show that the defendant was not the source of semen, pregnancy, injury, or ____", "Disease"],
      ["consent", "A sufficiently similar pattern can be relevant when what defense issue is raised?", "Consent"],
      ["reputation", "Is reputation evidence of the victim's prior sexual conduct admitted under § 794.022?", "No"],
    ]),
  ], "794.022", "§ 794.022(2)–(5); FRE 412", "The statute applies to prosecutions under §§ 787.06, 794.011, and 800.04. The listed exceptions do not admit every past encounter; the court must find the specified relevance in camera. Manner-of-dress evidence offered to suggest the victim incited sexual battery is also excluded."),

  drill("admissions", "Party Admissions and Coconspirators", "14", "Recall the Florida classification and the conspiracy foundation.", [
    column("admissions", "Offered Against a Party", [
      ["classification", "Florida places qualifying party admissions in a hearsay ____", "Exception"],
      ["federal", "FRE 801(d)(2) instead classifies opposing-party statements as not ____", "Hearsay"],
      ["against", "A party's statement must be offered against that party, not simply by its maker: yes or no?", "Yes"],
      ["agency", "An agent's statement must concern the scope of agency and be made during the ____", "Relationship", "agency relationship", "employment"],
      ["furtherance", "A coconspirator's qualifying statement is made during and in ____ of the conspiracy", "Furtherance"],
      ["independent", "Florida requires proof of conspiracy and participation by ____ evidence", "Independent"],
    ]),
  ], "90.803", "§ 90.803(18); FRE 801(d)(2)", "Government-agent admissions require the applicable authority or agency foundation; the handout's blanket federal prohibition is not a universally settled federal rule. In Florida, a coconspirator's hearsay statement cannot alone supply the independent conspiracy proof; a defendant's own independently admissible statement is a distinct foundation question."),

  drill("former-testimony", "Former Testimony", "15", "Distinguish the unavailable-witness exception from the broader statutory provision.", [
    column("former", "Opportunity and Similar Motive", [
      ["unavailable", "Section 90.804(2)(a) requires the declarant to be what?", "Unavailable"],
      ["opportunity", "The relevant party must previously have had an ____ to develop the testimony", "Opportunity"],
      ["motive", "That party must also have had a similar ____ to develop it", "Motive"],
      ["civil", "The statutory § 90.803(22) reference to a person with similar interest is a broader route discussed for ____ proceedings", "Civil"],
      ["confrontation", "Prior testimony against a criminal defendant additionally triggers the ____ Clause", "Confrontation"],
    ]),
  ], "90.804", "§§ 90.804(2)(a), 90.803(22); State v. Abreu, 837 So. 2d 400 (Fla. 2003); FRE 804(b)(1)", "Do not read § 90.803(22) as automatic permission to replace live testimony. The Florida Supreme Court declined procedural adoption of its expansion, and Abreu bars prosecution use without constitutionally required unavailability. The broader civil statutory text remains in the code; its application requires attention to governing procedural and due-process decisions."),

  drill("unavailable-declarants", "Dying and Deceased Declarants", "15–16", "Recall the Florida dying-declaration scope and the narrow estate-response exception.", [
    column("unavailable", "Unavailable Declarants", [
      ["civil", "Florida's dying-declaration exception applies in criminal and ____ trials", "Civil"],
      ["criminal", "Unlike FRE 804(b)(2)'s homicide limit, Florida permits the exception in ____ criminal trials", "All", "any"],
      ["belief", "At the time of speaking, the declarant must reasonably believe death is ____", "Imminent", "impending"],
      ["death", "Must the declarant actually die, rather than otherwise be unavailable?", "No"],
      ["response", "When qualifying deceased/ill-declarant statements come in, another party may offer ____ statements on the same subject", "Contradictory or similar", "similar or contradictory", "contradictory", "similar"],
      ["estate", "Does admitting the will itself automatically open the estate-response exception?", "No"],
    ]),
  ], "90.804", "§ 90.804(2)(b), (e); FRE 804(b)(2)", "The statement must concern the cause, instrumentalities, or circumstances of the believed impending death. Section 90.804(2)(e) covers a proceeding against a decedent's personal representative, heir, assignee, legatee, devisee, or survivor, or an assignee or guardian of a mentally incompetent person; use its statutory scope rather than a general right to answer any dead person's statement."),

  drill("spontaneous-state", "Spontaneous Statements and State of Mind", "16", "Recall timing, trustworthiness, and whose later conduct the state-of-mind exception reaches.", [
    column("spontaneous", "Timing and Reliability", [
      ["label", "Florida's name for the exception corresponding to present sense impression", "Spontaneous statement", "spontaneous statements"],
      ["time", "The statement describes an event during perception or ____ thereafter", "Immediately", "immediately after"],
      ["trust", "Florida expressly excludes spontaneous statements made under circumstances indicating a lack of ____", "Trustworthiness"],
      ["state", "The mental/physical-condition exception concerns the declarant's ____ condition", "Then-existing", "then existing", "current"],
      ["actor", "A plan or intent statement can explain the subsequent conduct of whom under Florida's statute?", "Declarant", "the declarant", "speaker"],
      ["memory", "A statement of memory ordinarily may not prove the fact remembered, with a specific exception involving the declarant's ____", "Will"],
    ]),
  ], "90.803", "§ 90.803(1), (3); FRE 803(1), (3)", "Florida expressly includes a trustworthiness limitation in these provisions. Neither exception converts a declarant's unsupported inference about an earlier event into personal knowledge, and the will-related memory exception has its own statutory scope."),

  drill("medical-statements", "Statements for Diagnosis or Treatment", "16–17", "Recall Florida's conjunctive test for a third person speaking for a patient who cannot communicate.", [
    column("medical", "Who May Speak for the Patient?", [
      ["purpose", "The statement must be reasonably pertinent to diagnosis or ____", "Treatment"],
      ["responsibility", "A substitute speaker must be ____ responsible for the patient", "Legally", "legally responsible"],
      ["knowledge", "That speaker must also have ____ of the facts", "Knowledge", "personal knowledge"],
      ["communication", "The substitute-speaker route requires the patient to be unable to ____ the facts", "Communicate"],
      ["conjunction", "Are legal responsibility and factual knowledge alternatives, or are both required?", "Both required", "both", "and"],
    ]),
  ], "90.803", "§ 90.803(4); FRE 803(4)", "This incorporates the handout's editorial correction from 'or' to 'and.' A child's identification of an abuser is not automatically admitted merely by labeling the conversation medical; analyze the content's treatment relevance, applicable child-victim exceptions, and constitutional limits."),

  drill("recorded-recollection", "Recorded Recollection", "17", "Recall Florida's accuracy foundation and distinguish a record from refreshed present memory.", [
    column("recollection", "The Witness's Earlier Knowledge", [
      ["memory", "The witness once knew the matter but now has ____ recollection to testify fully and accurately", "Insufficient", "inadequate"],
      ["fresh", "The record must have been made while the matter was ____ in memory", "Fresh"],
      ["accuracy", "Florida requires the witness to vouch for the record's ____", "Accuracy", "correctness"],
      ["reading", "Once admitted, the record ordinarily is ____ into evidence", "Read"],
      ["exhibit", "Who may offer the recorded recollection itself as an exhibit?", "Adverse party", "opposing party", "opponent"],
    ]),
  ], "90.803", "§ 90.803(5); Polite v. State, 116 So. 3d 270 (Fla. 2013); FRE 803(5)", `The statute says 'made' while FRE 803(5) says 'made or adopted.' Polite describes the exceptions as substantively the same and requires the witness to attest to accuracy; do not turn the handout's categorical adoption shorthand into a rule barring every record transcribed by another person. A signature or corroborating circumstances alone cannot replace Florida's accuracy foundation. Opinion: ${politeOpinion}`),

  drill("public-records-publications", "Public Records and Publications", "17–18", "Recall Florida's special record qualifications and the limited use of learned treatises.", [
    column("publications", "Records and Expert Literature", [
      ["police", "Ordinary police observations are excluded from the public-records exception in ____ cases", "Criminal"],
      ["affidavit", "The DUI/BUI statutory carveout concerns an otherwise admissible testing ____", "Affidavit"],
      ["treatise", "Does Florida have FRE 803(18)'s substantive learned-treatise hearsay exception?", "No"],
      ["cross", "An authoritative publication can be used under § 90.706 during ____ examination of an expert", "Cross", "cross examination"],
      ["court", "If the expert does not recognize authority, who may find the publication authoritative and relevant?", "Trial court", "court", "judge"],
      ["market", "For market compilations, the court must assess information sources and method of ____", "Preparation"],
    ]),
  ], "90.706", "§§ 90.706, 90.803(8), (17); §§ 316.1934, 327.354; FRE 803(8), (17)–(18)", "The DUI/BUI carveout is not a blanket admission of the officer's whole police report. A hearsay exception does not override confrontation rights. Section 90.706 allows a trial-court finding of authority and relevance; it is not confined to formal judicial notice."),

  drill("victim-statements", "Child and Vulnerable-Adult Statements", "18", "Distinguish the child exception from the narrower current elderly/disabled-adult provision.", [
    column("victim-statements", "Reliability and Availability", [
      ["age", "Maximum physical, mental, emotional, or developmental age stated in § 90.803(23)", "17", "seventeen", "17 years", "seventeen years"],
      ["hearing", "The court must evaluate reliability outside the presence of whom?", "Jury", "the jury"],
      ["child", "The child either testifies or is ____ with other corroborating evidence", "Unavailable"],
      ["adult", "Under current § 90.803(24), an elderly/disabled-adult declarant must be what?", "Unavailable"],
      ["corroboration", "For the adult exception, evidence beyond the statement must ____ the abuse or offense", "Corroborate", "corroboration", "corroborative evidence"],
      ["notice", "The criminal defendant must receive notice no later than how many days before trial under these provisions?", "10 days", "10", "ten days"],
      ["findings", "The court must state specific factual ____ supporting admission on the record", "Findings", "findings of fact"],
    ]),
  ], "90.803", "§ 90.803(23)–(24)", "The handout incorrectly gives the adult exception a 'testifies or unavailable' alternative. The current adult provision requires unavailability and corroboration. Each exception has a defined offense scope and specific reliability findings; testimonial statements against a criminal accused still require a separate confrontation analysis."),

  drill("corpus-delicti", "Corpus Delicti and Sexual-Abuse Confessions", "19", "Recall independent crime proof and the safeguards in Florida's sexual-abuse exception.", [
    column("corpus", "Before Using the Confession", [
      ["independent", "The ordinary corpus-delicti rule requires crime evidence ____ of the defendant's confession", "Independent"],
      ["exception", "Section 92.565 supplies a special route in cases involving what kind of abuse?", "Sexual abuse", "sexual"],
      ["record", "For that statutory route, the confession or admission must be what?", "Memorialized", "recorded", "documented"],
      ["hearing", "The court makes the required findings outside the presence of whom?", "Jury", "the jury"],
      ["trust", "The court must find the statement what after the state's showing?", "Trustworthy", "reliable"],
      ["burden", "The state must establish sufficient corroborating trustworthiness evidence by what proof standard?", "Preponderance of the evidence", "preponderance"],
    ]),
  ], "92.565", "§ 92.565", "This is not an automatic sexual-case waiver. The court must first find the state unable to show each element, then find trustworthiness with the statutory corroboration showing. Corroboration may include the defendant's statements, and hearsay is permitted at the hearing."),

  drill("constitutional-limits", "Confrontation and the Absence of a Catch-All", "19", "Complete the separate constitutional review after finding a hearsay exception.", [
    column("constitutional", "Beyond the Hearsay Exception", [
      ["accused", "The Confrontation Clause concerns evidence offered against a ____ defendant", "Criminal"],
      ["statement", "The core Crawford restriction concerns an out-of-court statement that is what?", "Testimonial"],
      ["unavailable", "For an absent testimonial declarant, ordinarily the prosecution must establish what status?", "Unavailability", "unavailable"],
      ["prior", "Ordinarily, the accused must also have had a prior opportunity for ____ examination", "Cross", "cross examination"],
      ["exception", "Does satisfying a Florida hearsay exception automatically satisfy the Confrontation Clause?", "No"],
      ["residual", "Has Florida adopted a general residual hearsay exception corresponding to FRE 807?", "No"],
    ]),
  ], "90.802", "§§ 90.802–90.804; U.S. Constitution amend. VI; Crawford v. Washington, 541 U.S. 36 (2004); FRE 807", "Apply recognized constitutional doctrines, including forfeiture by wrongdoing and any applicable historic exception, rather than treating this short checklist as exhaustive. If the declarant testifies and is subject to cross-examination, the absent-witness rule differs."),

  drill("supported-testimony", "Video Testimony and Vulnerable Witnesses", "19", "Recall the statutory findings before using special testimony arrangements.", [
    column("video", "Protecting Testimony and Defense Rights", [
      ["age", "The age-based route in §§ 92.53–92.54 covers witnesses younger than what age?", "18", "eighteen", "18 years"],
      ["disability", "An alternative covered category is a witness with an ____ disability", "Intellectual"],
      ["hearing", "The court considers the motion at what kind of private hearing?", "In camera", "in camera hearing"],
      ["harm", "One statutory ground is a substantial likelihood of at least ____ emotional or mental harm due to the defendant's presence", "Moderate"],
      ["findings", "The court must record specific factual ____ supporting the arrangement", "Findings", "findings of fact"],
      ["counsel", "Remote viewing must preserve the defendant's immediate and direct communication with ____", "Counsel", "attorney", "lawyer"],
    ]),
  ], "92.54", "§§ 92.53–92.54; U.S. Constitution amend. VI", "The statutory grounds also include unavailability as defined in § 90.804(1). Statutory compliance does not eliminate the separate constitutional inquiry; special procedures must protect assistance of counsel and applicable confrontation rights. The current statutory term is intellectual disability, rather than a blanket reference to all developmental disabilities."),
];

// Whole-drill classifications are cumulative through the Overview selector.
export const floridaEvidenceDistinctionsLevels = Object.freeze({
  "fl-evid-dist-judicial-role": "core",
  "fl-evid-dist-judicial-notice": "standard",
  "fl-evid-dist-witness-exclusion": "standard",
  "fl-evid-dist-presumptions": "standard",
  "fl-evid-dist-character": "core",
  "fl-evid-dist-other-acts": "core",
  "fl-evid-dist-routine-practice": "comprehensive",
  "fl-evid-dist-competence": "core",
  "fl-evid-dist-truthfulness": "core",
  "fl-evid-dist-convictions": "core",
  "fl-evid-dist-prior-statements": "core",
  "fl-evid-dist-opinions": "core",
  "fl-evid-dist-tangible-evidence": "standard",
  "fl-evid-dist-duplicates": "standard",
  "fl-evid-dist-business-records": "core",
  "fl-evid-dist-marital-privilege": "core",
  "fl-evid-dist-lawyer-privilege": "standard",
  "fl-evid-dist-health-privileges": "standard",
  "fl-evid-dist-other-privileges": "standard",
  "fl-evid-dist-journalists": "comprehensive",
  "fl-evid-dist-policy-exclusions": "standard",
  "fl-evid-dist-rape-shield": "standard",
  "fl-evid-dist-admissions": "core",
  "fl-evid-dist-former-testimony": "comprehensive",
  "fl-evid-dist-unavailable-declarants": "standard",
  "fl-evid-dist-spontaneous-state": "core",
  "fl-evid-dist-medical-statements": "core",
  "fl-evid-dist-recorded-recollection": "core",
  "fl-evid-dist-public-records-publications": "standard",
  "fl-evid-dist-victim-statements": "standard",
  "fl-evid-dist-corpus-delicti": "comprehensive",
  "fl-evid-dist-constitutional-limits": "core",
  "fl-evid-dist-supported-testimony": "comprehensive",
});
