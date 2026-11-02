import { evidenceDrill as drill, group as g, recall as r } from "./evidenceStudyHelpers.js";

const slides = (...references) => references.map(reference => `Evidence PowerPoints, Fall 2026: ${reference}`);
const prompt = "Recall the short answer for each distinction. Short phrases or rule numbers work. Answer or reveal a blank to read the explanation.";
const q = (key, title, columns, references, notes = []) => drill(`slides-${key}`, title, prompt, columns, [...slides(...references), ...notes]);

export const evidenceSlideQuestions = [
  q("preliminary-facts", "104(a) vs. 104(b): Who Decides?", [
    g("standards", "Decision and Burden",
      r("a-decider", "104(a): Who resolves preliminary admissibility facts?", "Judge", ["court"], "The judge decides facts bearing on qualification, privilege, and admissibility, ordinarily by a preponderance."),
      r("a-burden", "104(a): Ordinary factual burden", "Preponderance of the evidence", ["preponderance", "more likely than not"]),
      r("b-screen", "104(b): What must the judge find about the jury?", "A reasonable jury could find the conditional fact", ["reasonable jury could find", "prima facie screening", "sufficient evidence"], "The judge screens whether a reasonable jury could find the fact by a preponderance; the judge does not independently resolve its truth or weigh credibility."),
      r("b-decider", "104(b): Who ultimately evaluates the conditional fact?", "Jury", ["jurors"], "After the screening, jurors evaluate the fact and the weight of the evidence."),
      r("privilege", "104(a): Which evidence rules still bind the judge?", "Privilege", ["privilege rules"], "Do not extend 104(a)'s freedom from evidence rules wholesale to 104(b).")),
    g("applications", "Choose 104(a) or 104(b)",
      r("expert", "Whether an expert's method is reliable", "104(a)", ["104a", "rule 104 a", "702"], "Expert admissibility is a gatekeeping decision, with Rule 702's more-likely-than-not burden."),
      r("knowledge", "Whether an eyewitness could have seen the event", "104(b)", ["104b", "rule 104 b", "602"], "Personal knowledge requires evidence sufficient to support a finding that the witness perceived the event."),
      r("stolen", "Whether the televisions in Huddleston were stolen", "104(b)", ["104b", "rule 104 b"], "The other transaction bears on knowledge only if the televisions were stolen.")),
  ], ["Class 4. Preliminary Questions, slides 5–16"]),

  q("extrinsic", "Impeachment: When May You Use Outside Proof?", [
    g("routes", "Extrinsic Evidence by Purpose",
      r("definition", "Documents, recordings, or another witness used to prove the impeaching fact", "Extrinsic evidence", ["extrinsic", "outside proof"]),
      r("collateral", "A contradiction matters solely because it contradicts this witness", "Collateral", ["collateral matter"], "The course treats collateral contradictions as a reason to limit inquiry to questions rather than outside proof; Rules 403 and 611 control."),
      r("material", "Prior inconsistent statement about the traffic light controlling liability", "Extrinsic proof permitted", ["permitted", "yes", "noncollateral", "non collateral"], "It concerns a fact of consequence. Satisfy Rule 613's foundation and other applicable restrictions."),
      r("bias", "Outside proof of a witness's financial interest or relationship", "Extrinsic proof permitted", ["permitted", "yes", "noncollateral"], "Bias is not collateral for this purpose. It is different from proving generally untruthful character under 608(b)."),
      r("sensory", "Outside proof of a witness's inability to see or hear", "Extrinsic proof permitted", ["permitted", "yes", "noncollateral"], "Perception and memory defects are not collateral for this purpose; other admissibility limits still apply."),
      r("dishonesty", "Teacher's testimony offered solely to prove that another witness cheated and has dishonest character", "No extrinsic proof under 608(b)", ["no", "excluded", "608 b", "608b"], "The examiner may have permission to ask about cheating on cross, but cannot prove the act with the teacher merely to attack character for truthfulness."),
      r("conviction", "Qualifying conviction offered to impeach truthfulness", "Rule 609", ["609"], "Rule 608(b)'s extrinsic-evidence prohibition expressly excepts convictions governed by 609.")),
  ], ["Class 11. Refreshing and Impeaching Witnesses with Prior Statements, slides 8–21", "Class 12 - Impeachment by Bias & Sensory Defect, slide 13", "Class 14. Impeaching with Character and Prior Convictions, slides 5–19"]),

  q("statements", "Prior Statements: Impeachment, Truth, and Rehabilitation", [
    g("purposes", "Identify the Permitted Use",
      r("impeach", "Witness says red at trial but previously told a friend green; use under 613 alone", "Impeachment", ["credibility", "inconsistency"], "This shows inconsistent stories. Rule 613 alone does not establish that the light was green."),
      r("truth", "Does Rule 613 alone make the earlier account substantive proof?", "No", ["not for truth"], "A separate route is needed for substantive use. Under Rule 801(d)(1)(A), as amended effective December 1, 2026, the statement must be inconsistent with the declarant's testimony, and the declarant must testify and be subject to cross-examination about the prior statement. The prior statement need not be sworn or made in a proceeding or deposition. Authentication remains required under Rule 901 or an applicable self-authentication provision of Rule 902."),
      r("timing", "Before outside proof under 613(b), ordinarily give the witness an opportunity to…", "Explain or deny", ["explain or deny the statement"], "The adverse party must also have an opportunity to examine the witness. The court may order otherwise; 801(d)(2) statements are excepted."),
      r("counsel", "Who must see the prior statement on request?", "Adverse counsel", ["opposing counsel", "opponent"], "You need not first show it to the witness under 613(a)."),
      r("premotive", "A prior consistent statement rebuts an alleged new motive to fabricate most directly when made…", "Before the motive arose", ["before motive", "before motive to lie", "premotive"], "The snitch example compares a statement made before arrest with a later plea incentive. Rehabilitation must respond to the actual attack; do not treat every consistent statement as automatically admissible.")),
  ], ["Class 11. Refreshing and Impeaching Witnesses with Prior Statements, slides 5–28"]),

  q("bias-perception", "Bias, Perception, Memory, and Religion", [
    g("identify", "Identify the Attack",
      r("relationship", "Witness is the party's business partner or romantic partner", "Bias", ["interest", "motive"], "Ask what the witness stands to gain or lose, or how the relationship could affect the account."),
      r("perception", "Poor lighting, blocked view, bad eyesight, or background noise", "Perception", ["sensory defect", "ability to observe"]),
      r("retention", "Long delay and repeated discussions with other witnesses", "Memory retention", ["memory", "retention", "contamination"], "Distinguish inability to perceive the original event from later loss or contamination of memory."),
      r("religion-credit", "Witness attends church, offered to prove the witness is honest", "Excluded under 610", ["610", "exclude", "no"], "Religious belief cannot establish general credibility."),
      r("religion-bias", "Shared religious organization with a party, offered to establish a relevant relationship", "May show bias", ["bias", "permitted", "yes"], "Rule 610 does not foreclose a relevant bias inquiry simply because the relationship is religious. Apply 403 and other limits.")),
  ], ["Class 12 - Impeachment by Bias & Sensory Defect, slides 5–13", "Class 12. Religion & Completeness, slides 2–4"]),

  q("608-controls", "608(b): Dishonesty and Judicial Control", [
    g("limits", "Limits on Specific-Act Questions",
      r("quality", "What quality must the act bear on?", "Truthfulness", ["untruthfulness", "character for truthfulness", "honesty"], "Cheating or knowingly writing a bad check bears on honesty. Violence or drinking alone does not."),
      r("basis", "An examiner needs this factual basis before asking an accusatory question", "Good faith basis", ["good faith", "good faith belief"], "A question cannot be a vehicle for an unsupported accusation."),
      r("608", "Which rule makes permission to ask discretionary?", "608(b)", ["608", "608b"]),
      r("611", "Which rule protects against harassment and undue embarrassment?", "611", ["611a", "611(a)"] ),
      r("403", "Which rule supplies ordinary unfair-prejudice balancing?", "403", ["rule 403"]),
      r("deny", "Witness denies the dishonest act; offer a document solely to prove untruthful character?", "No", ["no extrinsic evidence", "excluded"], "The examiner is bound by the answer for this purpose, subject to the separate Rule 609 conviction route.")),
  ], ["Class 14. Impeaching with Character and Prior Convictions, slides 5–16"]),

  q("character-doors", "404(a)(2): Opening the Door and Rebuttal", [
    g("doors", "Whose Trait and Which Response?",
      r("case", "The defendant/victim mercy-rule exceptions apply in which type of case?", "Criminal", ["criminal case"]),
      r("defendant", "Defendant introduces peaceful character; prosecution may offer…", "Rebuttal of that trait", ["same trait", "violent character", "rebuttal"], "It may rebut the defendant's pertinent trait, not initiate an unrestricted character attack."),
      r("victim", "Defendant introduces the victim's violent character; prosecution may rebut the victim evidence and offer…", "Defendant's same trait", ["defendants same trait", "defendants violence", "same trait of defendant"]),
      r("homicide", "Homicide: what triggers prosecution evidence of the victim's peacefulness?", "Evidence the victim was the first aggressor", ["first aggressor", "victim first aggressor"], "The trigger need not itself be character testimony. Do not apply this homicide exception to every self-defense case."),
      r("pertinent", "Honesty offered against an assault charge is not enough merely because it is a good trait; it must be…", "Pertinent", ["pertinent trait", "relevant to the charge"])),
    g("methods", "Proving the Trait",
      r("direct", "Ordinary 404(a)(2) character testimony on direct", "Reputation or opinion", ["reputation and opinion", "r and o"]),
      r("cross", "Relevant specific acts may be asked about on cross of whom?", "Character witness", ["the character witness"]),
      r("video", "Character witness denies knowing of a contrary act; introduce a video just to prove it?", "No", ["no extrinsic evidence", "excluded"], "Rule 405(a) permits inquiry, not outside proof of the act for this character-witness testing purpose.")),
  ], ["Class 5. Character Evidence - Defendant Opens the Door, slides 5–7, 15–30"]),

  q("character-element", "405: Character as an Essential Element", [
    g("elements", "Character Is Itself at Issue",
      r("trigger", "What must character be before 405(b) permits specific-act proof?", "Essential element of a charge, claim, or defense", ["essential element", "character as element"]),
      r("methods", "Methods available when character is an essential element", "Reputation, opinion, and specific acts", ["reputation opinion specific acts", "r o sa", "all three"], "Specific acts and outside proof are available here, unlike the ordinary propensity-character route under 404(a)(2)."),
      r("defamation", "A defamation claim puts whose allegedly defamed trait in issue?", "Plaintiff's", ["plaintiff", "defamed person"], "Check the particular claim and defense; not every defamation case puts every trait in issue."),
      r("entrustment", "Negligent entrustment/hiring focuses on whose relevant character?", "Entrustee or employee", ["entrustee", "employee"], "The slide examples also include parental fitness in custody and predisposition in an entrapment defense."),
      r("permission", "Does Rule 405 by itself make all character evidence admissible?", "No", ["no it governs methods"], "First establish a permissible use of character; then choose the permitted method.")),
  ], ["Class 4. Introduction to Character Evidence - Character as an Element, slides 11–21"]),

  q("other-acts", "404(b): Explain the Nonpropensity Inference", [
    g("scope", "Other Acts",
      r("civil", "404(b) applies to criminal cases and…", "Civil cases", ["civil"]),
      r("good", "Can a good act also raise a propensity problem?", "Yes", ["good acts too"]),
      r("conviction", "Must the other act have produced a conviction?", "No", ["no conviction required"]),
      r("later", "An act after the charged offense but before trial is automatically disqualified?", "No", ["later acts can qualify"], "Explain its proper relevance; chronology alone does not exclude it."),
      r("identity", "Modus operandi identity requires similarities that are…", "Distinctive and unique", ["distinctive", "unique", "signature"], "Generic similarity is not enough to identify the same perpetrator.")),
    g("reasoning", "Purpose and Safeguards",
      r("motive", "Victim was to testify about defendant's embezzlement; why is that other act relevant?", "Motive", ["silencing a witness"]),
      r("bad-chain", "He committed a crime before, so he probably committed this one", "Propensity", ["forbidden propensity", "impermissible propensity"]),
      r("balance", "A permissible purpose still requires what ordinary balancing?", "403", ["rule 403"]),
      r("notice", "Must a criminal defendant request 404(b) notice to trigger the prosecutor's duty?", "No", ["automatic duty", "no request required"], "Current 404(b)(3) requires notice without a defense request; the slide's older request wording is not used here.")),
  ], ["Class 6. Character Evidence - Other Acts & Subsequent Remedial Measures, slides 3–27"], ["404(b)(3): notice must state the permitted purpose and supporting reasoning, in writing before trial unless good cause excuses timing. Naming a purpose is not a substitute for explaining the inference."]),

  q("remedial", "407: Timing, Measures, and Narrow Impeachment", [
    g("timing", "Trigger and Purpose",
      r("after", "A measure is subsequent to what event?", "The injury or harm", ["injury", "harm", "the injury"], "A change after purchase but before the injury is not subsequent to that injury for Rule 407."),
      r("measures", "Firing an employee, recalling a product, changing safety policy: can all qualify?", "Yes", ["all", "all of the above"]),
      r("dispute", "Ownership, control, or feasibility offered under 407 must be…", "Disputed", ["controverted", "in dispute"]),
      r("impeachment", "Is any general denial of negligence enough to invoke the impeachment exception?", "No", ["narrow exception"], "A broad exception would swallow the exclusion. Slides emphasize a specific inconsistent representation, an absolute safety claim, and personal involvement in the measure as relevant considerations."),
      r("all-rules", "Passing a 407 exception ends admissibility analysis?", "No", ["apply other rules", "403"], "Still test relevance, Rule 403, and other applicable restrictions.")),
  ], ["Class 6. Character Evidence - Other Acts & Subsequent Remedial Measures, slides 29–36"]),

  q("settlement-medical", "408 vs. 409: Separate the Offer from the Admission", [
    g("408", "Settlement Negotiations",
      r("dispute", "408 requires a claim disputed as to…", "Validity or amount", ["liability or amount", "responsibility or damages"]),
      r("negotiation", "Do protected negotiations have to be formal or filed in court?", "No", ["informal negotiations qualify"], "Use context: dispute, concrete proposals, attorneys, and compromise language. An apology or unilateral admission alone is not necessarily a negotiation."),
      r("statements", "408 potentially covers the offer plus…", "Negotiation statements and conduct", ["statements and conduct", "supporting statements"]),
      r("contradiction", "Use a protected settlement admission solely to contradict trial testimony?", "No", ["no impeachment by contradiction", "excluded"], "408 specifically bars impeachment by inconsistency or contradiction, while a distinct purpose such as bias can be allowed.")),
    g("409", "Medical-Payment Example",
      r("medical", "We will pay your hospital bill: protection against proving liability comes from…", "409", ["rule 409"]),
      r("fault", "It was our fault: automatically protected by 409 when said with the offer?", "No", ["not protected", "admission not protected"], "409 protects the payment or offer, not the accompanying fault admission; another exclusion could still apply."),
      r("wages", "We will replace your wages: medical expenses under 409?", "No", ["not medical expenses", "wages not covered"])),
  ], ["Class 7. Settlement Offers, slides 2–8", "Class 7. Offers to Pay Medicals & Plea Bargins, slides 2–8"], ["The Settlement Offers deck, slide 9, expressly labels the public-office/criminal-case exception NOT ON EXAM. It is not a recall target here."]),

  q("pleas", "410: Negotiation, Plea Outcome, and Exceptions", [
    g("negotiation", "Is This Plea Bargaining?",
      r("subjective", "First part of the course's plea-negotiation test", "Actual subjective expectation of negotiating a plea", ["subjective expectation", "actual expectation"]),
      r("objective", "Second part of the test", "Objectively reasonable expectation", ["reasonable expectation", "objective reasonableness"], "Evaluate the total circumstances: prosecutor and defense-counsel involvement, charges, specific terms, government interest, and caveats."),
      r("interrogation", "Is a police interrogation automatically plea bargaining?", "No", ["interrogation is not plea bargaining"], "410(a)(4) addresses discussions with a prosecuting attorney; authorized intermediaries and context require care.")),
    g("outcome", "What Does Rule 410 Protect?",
      r("withdrawn", "Withdrawn guilty plea offered against its maker", "Excluded", ["exclude", "protected", "no"]),
      r("nolo", "Nolo contendere plea offered against its maker", "Excluded", ["exclude", "protected", "no"]),
      r("final", "Accepted, unwithdrawn guilty plea automatically barred by 410?", "No", ["not barred", "not protected"], "The protection for negotiations in 410(a)(4) applies if no guilty plea results or the plea is later withdrawn. Other admissibility rules still matter."),
      r("civil", "Does protection against the plea-maker also apply in a civil case?", "Yes", ["civil and criminal"]),
      r("perjury", "Perjury exception: statement under oath, on the record, and…", "With counsel present", ["counsel present", "with counsel"]),
      r("waiver", "Can a defendant waive Rule 410 protection?", "Yes", ["waiver possible"], "Check the validity and scope of the actual waiver; do not assume every waiver authorizes every use.")),
  ], ["Class 7. Offers to Pay Medicals & Plea Bargins, slides 10–27"]),

  q("609-balances", "609: Select the Correct Balancing Standard", [
    g("standards", "Choose the Route",
      r("ordinary", "Recent qualifying felony of a civil witness or a criminal witness other than the accused", "Ordinary 403", ["403", "rule 403"], "This includes a civil defendant. The ordinary exclusion threshold is substantial outweighing by unfair prejudice or another 403 danger."),
      r("accused", "Recent nondishonesty felony of a criminal defendant who testifies", "Probative value outweighs prejudice", ["pv outweighs prejudice", "outweighs", "609(a)(1)(B)"], "Balance impeachment value against prejudicial effect to that defendant. This is not ordinary 403."),
      r("dishonesty", "Recent conviction requiring a dishonest act or false statement", "Must admit under 609(a)(2)", ["must admit", "mandatory", "609(a)(2)"], "No ordinary 403 balancing for this route. Punishment need not exceed one year. Check the separate age and other 609 limitations."),
      r("old", "Conviction outside the ten-year period", "Probative value substantially outweighs prejudice", ["substantially outweighs", "reverse 403", "609(b)"], "Specific facts and circumstances must support the probative value, and reasonable written notice is required."),
      r("clock", "Measure the ten years from conviction or release from confinement, whichever is…", "Later", ["whichever is later"]),
      r("purpose", "609 authorizes conviction evidence for what purpose?", "Impeaching truthfulness", ["credibility", "truthfulness", "impeachment"], "It applies to witnesses. It does not itself authorize using convictions to prove guilt or conduct in conformity.")),
  ], ["Class 14. Impeaching with Character and Prior Convictions, slides 18–27, 42"]),

  q("609-factors", "609(a)(1)(B): Five Factors", [
    g("factors", "Criminal Defendant's Felony Conviction",
      r("value", "How strongly does this crime bear on veracity?", "Impeachment value", ["value for truthfulness"]),
      r("time", "How recent is the conviction?", "Timing", ["age", "recency", "time"]),
      r("similarity", "How closely does it resemble the charged crime?", "Similarity", ["similarity of crimes"], "Greater similarity weighs against admission because it increases the risk of a forbidden propensity inference."),
      r("importance", "How much would the defense lose if the accused did not testify?", "Importance of defendant's testimony", ["importance of testimony", "importance"]),
      r("centrality", "How much does resolution turn on believing the witness?", "Centrality of credibility", ["credibility centrality", "centrality"])),
  ], ["Class 14. Impeaching with Character and Prior Convictions, slide 23"]),

  q("609-practice", "609: Conviction and Release-Date Practice", [
    g("scenarios", "Identify the Controlling Route",
      r("assault", "Accused testifies; assault punishable by five years; conviction nine years ago; suspended sentence", "609(a)(1)(B)", ["probative value outweighs prejudice", "outweighs", "609 a 1 b"], "Use the criminal-defendant felony balance. Punishable imprisonment, not time actually served, defines the threshold."),
      r("embezzlement", "Embezzlement requiring dishonesty; convicted two years ago; served six months", "609(a)(2)", ["must admit", "dishonesty", "609 a 2"], "The short actual sentence does not prevent admission under the dishonest-act route."),
      r("eight", "Same dishonesty offense: convicted fifteen years ago, released eight years ago", "609(a)(2)", ["must admit", "within ten years", "609 a 2"], "The later release date controls; this is within ten years."),
      r("eleven", "Same offense: convicted fifteen years ago, released eleven years ago", "609(b)", ["older conviction", "substantially outweighs", "609 b"], "Even a dishonesty conviction must satisfy the older-conviction balance and written notice."),
      r("misdemeanor", "Recent misdemeanor public drunkenness; no dishonest act or false statement element", "Not admissible under 609", ["exclude", "excluded", "no"], "Neither the felony route nor the dishonesty route is satisfied.")),
  ], ["Class 14. Impeaching with Character and Prior Convictions, slides 28–41"]),

  q("daubert", "Daubert: Reliability Factors and Kumho Tire", [
    g("factors", "Five Nonexclusive Factors",
      r("test", "Can the theory or technique be checked empirically?", "Testability", ["testing", "can be tested"]),
      r("peer", "Has the work been examined and disseminated by others in the field?", "Peer review and publication", ["peer review", "publication"]),
      r("error", "How often does the technique produce a wrong result?", "Known or potential error rate", ["error rate", "known error rate"]),
      r("standards", "What governs the technique's operation?", "Standards", ["operational standards", "standards and controls"]),
      r("acceptance", "The former Frye criterion remains one factor", "General acceptance", ["acceptance"])),
    g("limits", "Flexible Gatekeeping",
      r("checklist", "Must every factor fit every kind of expertise?", "No", ["flexible", "nonexclusive"], "These are considerations, not a mandatory five-element checklist."),
      r("kumho", "Case extending reliability gatekeeping to technical and other specialized expertise", "Kumho Tire", ["kumho", "kumho tire co v carmichael"]),
      r("application", "A valid speed formula used outside the speeds for which it works fails what requirement?", "Reliable application", ["application", "702(d)", "702d"], "Sound principles alone do not establish a reliable opinion on the actual facts.")),
  ], ["Class 9. Lay Opinions and Subjects Appropriate for Expert Testimony, slides 12–23"]),

  q("opinions", "Lay vs. Expert; Reliance vs. Disclosure", [
    g("qualification", "Expertise and Helpfulness",
      r("lay", "Witness describes intoxication based on observed staggering and slurred speech", "Lay opinion", ["lay", "701"], "Perception, helpfulness, and lack of specialized technical analysis support Rule 701 treatment."),
      r("source", "Drug-code opinion: what matters besides the witness's job title?", "Source of knowledge", ["how knowledge was acquired", "where knowledge came from"], "Personal participation differs from specialized training used to interpret a transaction. Police testimony is not automatically lay opinion."),
      r("degree", "Does lack of an academic degree automatically disqualify an experienced electrician?", "No", ["experience may qualify", "no degree required"]),
      r("field", "Extensive personal-finance credentials automatically qualify someone on municipal investment rules?", "No", ["field specific", "specific expertise required"], "Match qualifications to the precise subject of the proposed opinion.")),
    g("bases", "703 and 705",
      r("rely", "An expert may rely on inadmissible material if experts in the field…", "Reasonably rely on that kind of material", ["reasonably rely", "reasonable reliance"]),
      r("disclose", "Reliance makes disclosure of the inadmissible basis to the jury automatic?", "No", ["reverse 403 required"], "For disclosure by the proponent under 703, value in evaluating the opinion must substantially outweigh prejudicial effect."),
      r("purpose", "Material disclosed only under 703 is used to…", "Evaluate the opinion", ["evaluate expert opinion", "evaluate the opinion not prove truth"], "It is not independently substantive proof just because the expert relied on it. The master-list Williams drill separately explains the criminal confrontation issue."),
      r("sequence", "705: must the expert always state all underlying data before giving an opinion?", "No", ["opinion first"], "Unless the court orders otherwise, the opinion may come first; underlying data may be required on cross.")),
  ], ["Class 9. Lay Opinions and Subjects Appropriate for Expert Testimony, slides 2–10", "Class 10. Qualifying Experts - Bases of Expert Opinion - Rules 702, 703, 704 & 705, slides 12–28"]),

  q("authentication", "Authentication: Practical Foundations", [
    g("methods", "What Foundation Works?",
      r("threshold", "901 asks whether a reasonable jury could find the item is…", "What the proponent claims", ["what it is claimed to be", "authentic"], "Authentication is a low threshold, not a final determination of credibility or of all admissibility issues."),
      r("handwriting", "Lay handwriting familiarity must not have been acquired for…", "The current litigation", ["litigation", "purposes of litigation"]),
      r("voice", "Voice familiarity can be acquired when?", "Any time", ["anytime", "before or after"]),
      r("photographer", "Must the authenticating witness be the photographer?", "No", ["no photographer required"], "A knowledgeable witness may establish that the image fairly and accurately depicts the scene. Other authentication methods may also work."),
      r("texts", "Known number, nickname, customary emoji, and writing style support which route?", "Distinctive characteristics", ["901(b)(4)", "901 b 4", "distinctive features"]),
      r("chain", "A missing link in custody raises a question about the item's…", "Identity or integrity", ["identity", "integrity", "authenticity"], "Assess whether the remaining evidence meets the threshold; a gap is not automatically fatal."),
      r("enough", "Self-authentication resolves hearsay and 403 objections too?", "No", ["authentication is not everything"])),
  ], ["Class 8. Authentication, slides 2–12"]),

  q("best-evidence", "Best Evidence: Content vs. the Underlying Event", [
    g("triggers", "What Is the Party Proving?",
      r("content", "The original-writing rule is triggered by proving…", "Content of a writing, recording, or photograph", ["contents", "content", "document content"]),
      r("eyewitness", "A witness independently saw a collision that was also recorded; must the video be produced for that testimony?", "No", ["independent knowledge", "no content proof"], "The testimony describes the perceived event rather than the recording's contents."),
      r("gps", "Officer knows the route only by reading a GPS backtrack display; does describing it prove content?", "Yes", ["content", "best evidence applies"], "The Bennett example triggers the rule because the source is the display, not independent observation of the trip."),
      r("original", "An accurate printout of electronically stored information can be an…", "Original", ["original under 1001"]),
      r("duplicate", "A genuine challenge to the original's authenticity defeats automatic reliance on which rule?", "1003", ["duplicate rule", "rule 1003"]),
      r("badfaith", "Proponent deliberately destroys originals; may it invoke the lost-original exception?", "No", ["bad faith", "excluded"], "Rule 1004(a) requires absence of the proponent's bad faith, illustrated by Seiler.")),
  ], ["Class 8. Liability Insurance & Best Evidence, slides 5–13"]),

  q("aids-summaries", "107 vs. 1006: Illustrative Aids and Evidence", [
    g("107", "Illustrative Aids — 107",
      r("purpose", "An aid helps the fact finder understand evidence or…", "Argument", ["an argument"]),
      r("status", "Is an illustrative aid itself evidence?", "No", ["not evidence"]),
      r("jury", "May it ordinarily go to deliberations without party consent or good cause?", "No", ["not ordinarily"], "Rule 107 permits this only if all parties consent or the court finds good cause. On request, instruct that the aid is not evidence or proof of any fact."),
      r("balance", "The aid's assistance must not be substantially outweighed by unfair prejudice and other listed dangers: who has discretion?", "Court", ["judge"]),
      r("record", "Whenever practicable, the aid should be entered into the…", "Record", ["trial record"])),
    g("1006", "Summaries of Voluminous Materials — 1006",
      r("evidence", "A qualifying summary offered to prove voluminous content may be admitted as…", "Evidence", ["substantive evidence"]),
      r("underlying", "Underlying writings, recordings, or photos must be…", "Admissible", ["admissible materials"], "They need not themselves have been introduced. They must be too voluminous for convenient courtroom examination."),
      r("available", "Make the underlying originals or duplicates available to…", "Other parties", ["opponent", "opposing parties"], "Permit examination or copying at a reasonable time and place; the court may order production in court.")),
  ], ["Class 1. Introduction to Evidence, the Rules, & Trials, slide 16", "Class 8. Liability Insurance & Best Evidence, slide 14"], ["Current Rules 107 and 1006 distinguish an aid used only to illustrate from a summary admitted to prove content."]),

  q("review", "103: Preservation and Appellate Review", [
    g("preserve", "Preserve the Ruling",
      r("object", "Evidence already reached the record: request a…", "Motion to strike", ["strike", "move to strike"]),
      r("offer", "Your evidence is excluded: demonstrate its substance through an…", "Offer of proof", ["proffer"]),
      r("renew", "Must you renew after a definitive ruling on the record?", "No", ["no renewal required"], "If the ruling is tentative or its scope unclear, do not assume preservation.")),
    g("appeal", "Standards Emphasized in Class",
      r("discretion", "Ordinary review of discretionary evidentiary rulings", "Abuse of discretion", ["abuse"]),
      r("law", "Misinterpretation of a rule or the legal standard", "De novo", ["de novo review"]),
      r("right", "Reversal also requires an error affecting a…", "Substantial right", ["substantial rights"], "The course describes a reasonable probability of a different outcome if the ruling had been correct."),
      r("unpreserved", "Unpreserved error: the court may notice…", "Plain error", ["plain error affecting substantial rights"], "Rule 103(e) permits notice of plain error affecting a substantial right; this is not ordinary preserved-error review.")),
  ], ["Class 2. Objections & Witnesses, slides 3–13"]),

  q("witness-foundations", "Witness Foundations: 603, 605, 606, and 614", [
    g("testify", "Who May Testify?",
      r("oath", "603 requires an oath or affirmation to…", "Testify truthfully", ["tell the truth", "truthfulness"], "No prescribed religious wording is required; it must impress the duty of truthfulness on the witness's conscience."),
      r("age", "Does 601 impose a blanket minimum age?", "No", ["no age limit"], "Competence does not remove the need for personal knowledge and an appropriate oath or affirmation."),
      r("judge", "605: may the presiding judge testify as a witness in that trial?", "No", ["judge cannot testify"], "A party need not object to preserve this issue."),
      r("juror", "606(a): may a juror testify before the other jurors in the trial?", "No", ["juror cannot testify"], "If called, parties must have an opportunity to object outside the jury's presence. This is distinct from post-verdict inquiries under 606(b).")),
    g("court", "Court-Called Witnesses — 614",
      r("call", "May the judge call or examine witnesses?", "Yes", ["may call and examine"]),
      r("cross", "If the court calls a witness, who may cross-examine?", "Each party", ["all parties", "both parties"]),
      r("object", "Besides objecting immediately, counsel may object at the next opportunity…", "Outside the jury's presence", ["outside jury presence", "outside the hearing of the jury"])),
  ], ["Class 2. Objections & Witnesses, slides 15–19, 26"]),

  q("old-chief", "Old Chief: Relevance Survives a Stipulation", [
    g("analysis", "Separate 401 from 403",
      r("relevant", "A defendant admits a fact. Does that automatically make other proof of it irrelevant?", "No", ["still relevant", "relevance survives"]),
      r("route", "Which rule considers the less prejudicial evidentiary alternative?", "403", ["rule 403"]),
      r("setting", "The special stipulation problem arose in a prosecution for…", "Felon in possession", ["felon in possession of a firearm", "firearm possession"]),
      r("detail", "The stipulation can make what details of the prior conviction unnecessary and unfairly prejudicial?", "Name and nature of the offense", ["name and nature", "nature and name", "details of prior offense"]),
      r("generalize", "May defendants generally force prosecutors to replace the entire narrative with stipulations?", "No", ["no general right"], "Old Chief's result concerns proof of conviction status; it does not eliminate the ordinary interest in a coherent evidentiary narrative.")),
  ], ["Class 3. Relevance and 403, slides 17–19"]),

  q("refreshing", "Refreshing Memory: Use, Admission, and Existing Litany", [
    g("distinctions", "612 in Application",
      r("source", "Must the refreshing aid be the witness's own prior statement?", "No", ["anything may refresh", "no own statement required"]),
      r("testimony", "After reviewing the aid and putting it aside, the witness testifies from…", "Refreshed memory", ["memory", "present memory"], "The witness should answer from recollection, not simply read the aid into evidence."),
      r("automatic", "Does using an aid to refresh automatically admit it as substantive evidence?", "No", ["not automatically admitted"]),
      r("opponent", "Who has 612 rights to inspect, cross-examine, and introduce related portions of a writing?", "Adverse party", ["opposing party", "opponent"], "Separate the refreshing process from an independent basis for admitting the writing.")),
  ], ["Class 11. Refreshing and Impeaching Witnesses with Prior Statements, slides 2–3"], ["For the existing step-by-step courtroom sequence, choose Trial Advocacy → Litanies → Refreshing Recollection Litany. This drill tests evidentiary distinctions rather than duplicating that sequence."]),
];

export const evidenceSlidesSubject = {
  id: "evidence-slide-applications",
  title: "Midterm: Slide Applications",
  questions: evidenceSlideQuestions,
};
