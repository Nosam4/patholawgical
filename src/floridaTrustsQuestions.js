// Original recall prompts based on the user's Kramer handout. PDF page numbers
// refer to the file's page counter. Statutory qualifications control the targets.
const statute = (section) => `https://www.flsenate.gov/Laws/Statutes/2026/${section}`;

function drill(id, title, pages, section, prompt, rows, references, clarification) {
  return {
    id: `fl-trusts-${id}`,
    type: "sporcle-grid",
    title: `Florida Trusts: ${title}`,
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    prompt,
    sourceUrl: statute(section),
    sourceLabel: `Florida Statutes § ${section} and related provisions`,
    courseSources: [
      `FL.Kramer.Trusts.pdf — PDF pp. ${pages}.`,
      `Official reference: Florida Statutes ${references}. Checked November 9, 2026.`,
      ...(clarification ? [`Source clarification: ${clarification}`] : []),
    ],
    columns: [{
      id: `fl-trusts-${id}-column`,
      title,
      answers: rows.map(([key, indicator, answer, ...acceptedAnswers]) => ({
        id: `fl-trusts-${id}-${key}`, indicator, answer, acceptedAnswers,
      })),
    }],
  };
}

export const floridaTrustsQuestions = [
  drill("structure", "People, Title, and Distributions", "1–2", "736.0103",
    "Identify the trust roles and the division between ownership and beneficial enjoyment.", [
      ["creator", "Person who creates or contributes property to the trust", "Settlor", "grantor", "trustor"],
      ["manager", "Fiduciary who manages the trust property", "Trustee"],
      ["legal", "Type of title ordinarily held by the trustee", "Legal title", "legal"],
      ["equitable", "Type of interest ordinarily held by the beneficiary", "Equitable interest", "equitable title", "beneficial interest", "equitable"],
      ["corpus", "Another name for the trust's principal or original property", "Corpus", "res", "trust res"],
      ["discretion", "Trust in which the trustee chooses whether to make authorized distributions", "Discretionary trust", "discretionary"],
    ], "§§ 736.0103, 736.0402, 736.0814"),

  drill("creation", "Express-Trust Requirements", "3–6", "736.0402",
    "Recall the statutory requirements for a private express trust.", [
      ["capacity", "The settlor must possess legal what?", "Capacity", "legal capacity"],
      ["intent", "The settlor must indicate an intention to create what relationship?", "Trust", "a trust"],
      ["property", "Identifiable property subjected to the trust is called the trust what?", "Res", "corpus", "property", "trust property"],
      ["beneficiary", "A private trust ordinarily must have a definite what?", "Beneficiary", "definite beneficiary"],
      ["duties", "The trustee must have actual responsibilities, called what?", "Duties", "duties to perform"],
      ["merger", "May one person be both sole trustee and sole beneficiary?", "No"],
    ], "§§ 736.0401–736.0404, 736.0601",
    "Revocable-trust capacity is the capacity to make a will. A beneficiary can be ascertainable in the future; charitable and authorized purpose trusts have statutory exceptions to the definite-beneficiary requirement."),

  drill("formalities", "Intent, Writings, and Creation Methods", "3–6", "736.0403",
    "Distinguish an ordinary oral trust from Florida's additional writing and execution requirements.", [
      ["precatory", "Words expressing only a hope or wish, without imposing an obligation, are called what?", "Precatory", "precatory language"],
      ["oral", "Absent another law requiring writing, may an oral trust be established?", "Yes"],
      ["proof", "Evidence required to prove an oral trust's creation and terms", "Clear and convincing evidence", "clear and convincing"],
      ["realty", "A trust of land generally implicates which writing doctrine?", "Statute of Frauds", "statute of fraud"],
      ["testamentary", "A Florida domiciliary's revocable-trust provisions disposing of property at death require the execution formalities of what?", "Will", "a will"],
      ["declaration", "Creation method in which the owner declares that the owner holds property as trustee", "Declaration of trust", "declaration"],
    ], "§§ 736.0401, 736.0403, 736.0407; 689.05",
    "The handout's oral-trust discussion needs § 736.0403(2)(b): testamentary aspects of a Florida domiciliary's revocable trust generally require Florida will formalities. A completed outright gift is not freely revocable merely because it is a gift."),

  drill("purpose-and-beneficiaries", "Purpose and Special Beneficiaries", "4–6", "736.0402",
    "Identify the permissible purpose and beneficiary rules.", [
      ["lawful", "A trust purpose must be possible, consistent with public policy, and what?", "Lawful", "legal"],
      ["future", "Must every private beneficiary already be living when the trust is created?", "No"],
      ["pet", "Authorized trust for an animal alive during the settlor's lifetime", "Pet trust", "animal trust", "trust for care of an animal"],
      ["last-animal", "A pet trust for multiple animals terminates at the death of which animal?", "Last surviving animal", "last animal", "last survivor"],
      ["charity", "Trust category permitted to serve a charitable purpose without a definite individual beneficiary", "Charitable trust", "charitable"],
    ], "§§ 736.0402, 736.0404–736.0405, 736.0408",
    "The animal is the object of an authorized statutory trust; enforcement is by a designated or court-appointed person, rather than by the animal personally."),

  drill("charity", "Charitable Trusts and Cy Pres", "6–7", "736.0413",
    "Recall charitable purposes, enforcement, and the response when the original charitable use fails.", [
      ["poverty", "Providing aid to those in financial need is the relief of what?", "Poverty"],
      ["education", "Scholarships advance which recognized charitable purpose?", "Education"],
      ["doctrine", "Doctrine permitting a court to redirect a failed charitable purpose consistently with the settlor's charitable purposes", "Cy pres", "cy près"],
      ["trigger", "Along with illegality, impossibility, and wastefulness, a purpose may qualify for cy pres when it becomes what?", "Impracticable", "impracticability"],
      ["standing", "May the settlor maintain a proceeding to enforce a charitable trust?", "Yes"],
    ], "§§ 736.0405, 736.0413; 689.225(5)(f)",
    "Apply the statutory cy pres standard, consistent with the settlor's charitable purposes. Do not assume failure of a particular institution automatically returns the property. A charity-to-charity nonvested interest has a statutory perpetuities exception; a gift over to a private person requires separate analysis."),

  drill("remedial", "Resulting and Constructive Trusts", "7–9", "736.0102",
    "Distinguish equitable remedies from a trust deliberately created by a settlor.", [
      ["resulting", "Remedy associated with a failed beneficial disposition and return to the transferor or estate", "Resulting trust", "resulting"],
      ["constructive", "Equitable remedy preventing a wrongdoer from retaining unjustly obtained property", "Constructive trust", "constructive"],
      ["enrichment", "Both remedies can prevent unjust what?", "Enrichment", "unjust enrichment"],
      ["proof", "Proof standard for imposing a constructive trust", "Clear and convincing evidence", "clear and convincing"],
      ["code", "Does the Florida Trust Code itself generally govern resulting and constructive trusts?", "No"],
    ], "§ 736.0102(2); common-law and equitable remedies preserved by § 736.0106",
    "These are equitable remedies rather than express trusts governed generally by chapter 736. A constructive trustee holds for the person equitably entitled to the property; the recipient need not always be the settlor's estate."),

  drill("future-interests", "Survival, Anti-Lapse, and Divorce", "9–10", "736.1106",
    "Recall the default survival rule and protections for substitute takers.", [
      ["date", "A future-interest beneficiary ordinarily must survive which event?", "Distribution date", "date of distribution"],
      ["relative", "For a future interest subject to § 736.1106(2), must the deceased beneficiary be related to the settlor to leave a substitute gift?", "No"],
      ["outright-relative", "For an outright devise vesting at death, subsection (5) instead limits protection to a grandparent or descendants of a what?", "Grandparent", "settlor's grandparent", "testator's grandparent"],
      ["substitutes", "Protected deceased beneficiaries ordinarily leave a substitute gift for their surviving whom?", "Descendants", "issue", "lineal descendants"],
      ["intent", "A substitute gift can be displaced by a contrary what in the instrument?", "Intent", "intention", "contrary intent", "contrary intention"],
      ["survivorship", "For a trust future interest, are attached words of survivorship sufficient to show contrary intent under subsection (3)?", "Yes"],
      ["divorce", "A revocable trust's gift for a former spouse is ordinarily treated as if that spouse did what at dissolution?", "Died", "predeceased", "died at dissolution"],
    ], "§§ 736.1105–736.1106",
    "Section 736.1106(2) does not generally impose kinship to the settlor for future-interest substitute gifts; subsection (5) separately limits outright devises vesting at death. Trust survivorship words suffice to show contrary intent under subsection (3); § 732.603(3)(a) likewise recognizes survivorship words for outright will devises. Effective-date rules and contrary provisions apply. Divorce treatment has separate statutory exceptions."),

  drill("spendthrift", "Spendthrift and Discretionary Interests", "10–11", "736.0502",
    "Identify what a spendthrift clause restricts and what ordinary creditors cannot demand.", [
      ["both", "A valid spendthrift clause restrains voluntary transfer and what other type of transfer?", "Involuntary transfer", "involuntary"],
      ["receipt", "Ordinary creditors generally cannot reach protected distributions before the beneficiary does what?", "Receives them", "receives", "receipt", "receives the distribution"],
      ["discretion", "May a beneficiary's creditor ordinarily compel a distribution subject to trustee discretion?", "No"],
      ["beneficiary", "Does creditor protection eliminate the beneficiary's own right to sue for abuse of discretion?", "No"],
      ["overdue", "A mandatory distribution can be reachable after the trustee fails to distribute within a reasonable time after its designated what?", "Distribution date", "date", "required distribution date"],
    ], "§§ 736.0502, 736.0504, 736.0506",
    "Spendthrift protection is not immunity after receipt. Discretionary distributions receive separate protection under § 736.0504, and an overdue mandatory distribution is governed by § 736.0506."),

  drill("creditor-exceptions", "Exceptions to Spendthrift Protection", "10–11", "736.0503",
    "Recall the qualified statutory exceptions; do not treat them as unlimited access to principal.", [
      ["support", "A child, spouse, or former spouse must hold a judgment or court order for support or what?", "Maintenance", "support or maintenance"],
      ["services", "A qualifying judgment creditor provided services protecting the beneficiary's interest in what?", "Trust", "the trust"],
      ["government", "A government claim defeats the restriction only to the extent authorized by applicable what?", "Law", "state or federal law", "statute"],
      ["remedy", "The statutory attachment remedy concerns present or future what to or for the beneficiary?", "Distributions", "trust distributions"],
      ["resort", "Support and protective-services remedies require traditional collection methods to be insufficient, making attachment a last what?", "Resort", "last resort"],
    ], "§§ 736.0503–736.0504",
    "The course list omits judgment/order, last-resort, and discretionary-trust qualifications. Section 736.0503 ordinarily attaches distributions; it does not automatically permit seizure of all trust principal."),

  drill("revocation", "Revoking or Amending a Revocable Trust", "1, 11", "736.0602",
    "Recall the modern Florida default and the statutory revocation methods.", [
      ["default", "Unless expressly made irrevocable, a trust under the modern code is presumed what?", "Revocable"],
      ["method", "Required degree of compliance with a revocation method stated in the trust", "Substantial compliance", "substantial"],
      ["silent", "Alternative statutory methods apply when the trust supplies no what?", "Method", "revocation method"],
      ["will", "A later will or codicil must expressly refer to the trust or specifically devise the trust's what?", "Property", "trust property"],
      ["proof", "Other permitted methods must manifest intent by what evidentiary standard?", "Clear and convincing evidence", "clear and convincing"],
      ["contribution", "For noncommunity property contributed by multiple settlors, each may ordinarily revoke only that settlor's what?", "Contribution", "portion", "contributed portion"],
    ], "§§ 736.0403(2), 736.0601–736.0602",
    "The revocability presumption does not apply to instruments executed before the Trust Code's effective date. Community property has separate rules: either spouse can revoke, while amendment requires joint action. Testamentary-aspect execution requirements still apply."),

  drill("modification", "Modification and Termination Routes", "11–13", "736.0412",
    "Separate automatic termination, nonjudicial modification, and judicial relief.", [
      ["term", "A trust may end when its stated period does what?", "Expires", "ends"],
      ["death", "The statutory nonjudicial route under § 736.0412 operates after whose death?", "Settlor", "settlor's", "the settlor"],
      ["agreement", "Required degree of agreement among the trustee and all qualified beneficiaries for that route", "Unanimous", "unanimous agreement", "unanimity"],
      ["trustee", "Are beneficiaries alone sufficient for the statutory nonjudicial route?", "No"],
      ["spendthrift", "Does a spendthrift clause alone prohibit modification under § 736.0412?", "No"],
    ], "§§ 736.0410, 736.04113, 736.04115, 736.0412",
    "The handout's beneficiaries-can-agree shorthand omits the trustee and qualified-beneficiary requirements, statutory date/vesting limits, and the duty to protect a beneficiary who is not a qualified beneficiary. Common-law modification remains separately available."),

  drill("judicial-relief", "Judicial Modification and Correction", "12–13", "736.04113",
    "Identify the judicial tools and their limits.", [
      ["purpose", "Unanticipated circumstances must defeat or substantially impair a material what?", "Purpose", "trust purpose"],
      ["best", "Section 736.04115 addresses compliance no longer in the beneficiaries' best what?", "Interests", "interest"],
      ["termination", "Does statutory modification include ending the trust?", "Yes"],
      ["mistake", "Reformation can correct a mistake in fact or what?", "Law", "law or fact"],
      ["proof", "Proof standard for reformation to conform to the settlor's intent", "Clear and convincing evidence", "clear and convincing"],
      ["tax", "Section 736.0416 permits modification to achieve the settlor's objectives concerning what?", "Taxes", "tax", "taxation", "tax objectives"],
    ], "§§ 736.04113–736.04115, 736.0414–736.0416",
    "Best-interests modification has statutory exclusions tied to creation dates and trust terms; it is not available merely whenever beneficiaries prefer a change. Judicial modification must respect statutory protections of the settlor's intent and beneficiary interests."),

  drill("trustee-office", "Acceptance, Resignation, and Replacement", "4–5, 13", "736.0705",
    "Recall how a trustee takes office, leaves office, or is replaced.", [
      ["decline", "May a designated trustee decline before accepting the office?", "Yes"],
      ["notice", "Minimum advance notice for resignation without court approval", "30 days", "thirty days", "30"],
      ["first", "First priority for filling a required noncharitable-trust vacancy: successor named in what?", "Trust terms", "trust instrument", "trust document", "the trust"],
      ["second", "Next priority: a successor unanimously selected by which beneficiaries?", "Qualified beneficiaries", "all qualified beneficiaries"],
      ["last", "If those routes fail, which institution appoints a successor?", "Court", "the court"],
      ["removal", "A serious breach of trust is a statutory ground for what action against the trustee?", "Removal", "removal of trustee"],
    ], "§§ 736.0701, 736.0704–736.0706",
    "Resignation notice goes to the qualified beneficiaries, living settlor, and cotrustees. Court approval is an alternative to notice. A vacancy need not be filled when a cotrustee remains unless the terms require it."),

  drill("cotrustees", "Cotrustee Decision Making", "13", "736.0703",
    "Apply Florida's statutory default when cotrustees disagree.", [
      ["vote", "When unanimity cannot be reached, cotrustees may act by what decision?", "Majority", "majority decision", "majority vote"],
      ["participate", "An available cotrustee ordinarily must do what in performance of the trust function?", "Participate", "participate in the function"],
      ["prevent", "Each cotrustee must exercise reasonable care to prevent another's serious what?", "Breach of trust", "breach"],
      ["redress", "Reasonable care must also be used to compel correction of a serious breach, called obtaining what?", "Redress", "remedy", "a remedy"],
    ], "§§ 736.0105, 736.0703; directed-trust provisions in § 736.1412",
    "The handout's unanimity-only statement is too broad. Section 736.0703(1) allows majority action when unanimous agreement cannot be reached, subject to governing trust terms and directed-trust rules."),

  drill("loyalty", "Loyalty and Conflicted Transactions", "14", "736.0802",
    "Recall the loyalty standard and why fair pricing alone does not cure self-dealing.", [
      ["benefit", "A trustee administers solely in whose interests?", "Beneficiaries", "the beneficiaries", "beneficiary"],
      ["rule", "Traditional label for treating self-dealing as presumptively improper without evaluating its fairness", "No further inquiry", "no further inquiry rule"],
      ["voidable", "A conflicted transaction is ordinarily void or what at the affected beneficiary's election?", "Voidable"],
      ["authorization", "Express authorization in the trust terms can be a statutory exception: yes or no?", "Yes"],
      ["court", "Approval by which institution can also bring the transaction within an exception?", "Court", "the court"],
    ], "§ 736.0802; beneficiary consent, release, and ratification under § 736.1012",
    "Fair-market value alone does not eliminate a loyalty conflict. The statute has express authorization, approval, consent/ratification, timing, and other exceptions; not every transaction between trustee and trust is automatically an uncurable breach."),

  drill("administration", "Impartiality, Care, and Records", "14–15", "736.0803",
    "Recall the trustee's continuing administration duties.", [
      ["impartial", "When multiple beneficiaries exist, administration must be what with respect to their differing interests?", "Impartial", "impartiality"],
      ["care", "The standard of administration asks how what kind of person would act?", "Prudent person", "prudent"],
      ["skills", "Must a trustee who has special skills use them?", "Yes"],
      ["separate", "Trust property must be kept separate from the trustee's own what?", "Property", "assets", "personal property"],
      ["records", "The trustee must keep adequate records of what activity?", "Administration", "trust administration"],
    ], "§§ 736.0803–736.0806, 736.0810",
    "Impartiality takes account of each beneficiary's interests; it does not require equal distributions. The trust's purposes, terms, distribution requirements, and circumstances inform prudent administration."),

  drill("investment", "Prudent Investment and Delegation", "15", "518.11",
    "Evaluate investments in context and recall the trustee's duties when delegating.", [
      ["portfolio", "Investment prudence is assessed across the trust's whole what?", "Portfolio", "investment portfolio"],
      ["diversify", "Ordinarily reduce concentration risk by doing what to investments?", "Diversifying", "diversify", "diversification"],
      ["select", "Before delegating, use reasonable care to choose whom?", "Agent", "delegate", "investment agent"],
      ["scope", "The trustee must define the delegation's scope and what?", "Terms", "terms of delegation"],
      ["monitor", "The trustee must periodically do what to the agent's performance?", "Review", "monitor", "review and monitor"],
    ], "§§ 518.11, 736.0807, 736.0901",
    "Diversification is the default unless the fiduciary reasonably determines that special circumstances make nondiversification better serve the beneficiaries. Proper delegation does not require the trustee personally to choose every investment."),

  drill("information", "Information and Accounting", "15", "736.0813",
    "Recall the ordinary reporting duties for an irrevocable trust.", [
      ["recipients", "Beneficiary category ordinarily entitled to reasonably current administration information", "Qualified beneficiaries", "qualified beneficiary"],
      ["instrument", "Upon reasonable request, a qualified beneficiary ordinarily receives a complete copy of which governing document?", "Trust instrument", "trust document", "trust"],
      ["frequency", "Ordinary minimum accounting frequency for a nonrevocable trust", "Annually", "annual", "yearly", "every year", "once a year"],
      ["end", "An accounting is also ordinarily due on a trustee change and on trust what?", "Termination", "termination of the trust"],
    ], "§§ 736.0603, 736.0813–736.08135",
    "The accounting rule has statutory exceptions and permissible waivers. While a trust is revocable, trustee duties are generally owed exclusively to the settlor under § 736.0603; not every beneficiary of every trust receives identical reports."),

  drill("liability", "Breach Remedies and Third-Party Liability", "15–16", "736.1002",
    "Distinguish restoration and disgorgement from the trustee's liability to outsiders.", [
      ["comparison", "Damages use the greater or lesser of restoration loss and trustee profit?", "Greater", "greater of the two"],
      ["profit", "The trustee can be required to surrender any what made through the breach?", "Profit", "profits", "gain"],
      ["compel", "A court can order performance or an accounting and can suspend or do what to the trustee?", "Remove", "remove the trustee"],
      ["contract", "For a properly made fiduciary contract, avoiding personal liability ordinarily requires disclosure of fiduciary what?", "Capacity", "fiduciary capacity"],
      ["tort", "Personal tort liability ordinarily depends on the trustee being personally at what?", "Fault", "at fault"],
    ], "§§ 736.1001–736.1002, 736.1013",
    "Contract protection assumes a properly entered fiduciary contract and disclosure of fiduciary capacity, absent contrary contract terms. Claims can be brought against the trustee in fiduciary capacity without making the trustee personally liable."),

  drill("limitations", "Breach-Claim Limitation Triggers", "16", "736.1008",
    "Avoid applying a single limitations clock to every breach of trust.", [
      ["short", "Limitations period after receipt of adequate disclosure plus a compliant limitation notice", "6 months", "six months", "6"],
      ["disclosure", "The short period requires the claim matter to be adequately what?", "Disclosed", "adequately disclosed"],
      ["notice", "Adequate disclosure alone is not enough for the special six-month bar; what additional document or statement is required?", "Limitation notice", "limitations notice", "notice of limitations"],
    ], "§ 736.1008; otherwise applicable periods and accrual rules in chapter 95",
    "The handout's one-number-from-breach formulation is incomplete. Section 736.1008 distinguishes adequately disclosed matters, limitation notices, final accountings, knowledge, and undisclosed matters; chapter 95 and statutory tolling/long-stop provisions also matter."),

  drill("substitutes", "Will Substitutes and Pour-Over Devises", "16", "732.513",
    "Separate property already in a trust from property transferred to it by a will.", [
      ["funded", "Property already validly transferred into a revocable trust during life ordinarily avoids what judicial estate process?", "Probate"],
      ["pourover", "Will provision directing estate property into an identified trust", "Pour-over devise", "pour over devise", "pour-over will", "pour over will"],
      ["probate", "Does a pour-over will itself bypass probate for property still owned individually at death?", "No"],
      ["timing", "The written trust instrument must exist before or be subscribed when relative to making the will?", "Concurrently", "at the same time", "simultaneously"],
      ["unfunded", "Can a qualifying pour-over trust be valid even if its only expected res is the future devise?", "Yes"],
      ["pod", "Account designation that pays a named beneficiary at death is abbreviated what?", "POD", "payable on death", "pay on death"],
    ], "§§ 732.513, 655.82; UTMA custodial transfers in §§ 710.104, 710.123",
    "A pour-over trust is not necessarily created by the will: the will can add assets to an existing trust. POD designation does not necessarily create a jointly owned account. UTMA termination depends on the transfer route and may be extended; the handout's blanket age-21 rule is incomplete."),

  drill("power-of-attorney", "Power of Attorney: Creation and Authority", "17", "709.2105",
    "Recall the ordinary current Florida execution and agency requirements.", [
      ["principal", "Person granting authority to act", "Principal"],
      ["agent", "Person authorized to act for the principal", "Agent", "attorney in fact", "attorney-in-fact"],
      ["witnesses", "Number of subscribing witnesses ordinarily required", "Two", "2"],
      ["acknowledge", "The principal must acknowledge execution before which official, absent another authorized acknowledgment method?", "Notary public", "notary"],
      ["age", "Minimum age for a natural-person agent", "18", "eighteen", "18 years", "18 years old"],
      ["durable", "A power intended to continue despite subsequent incapacity is called what?", "Durable", "durable power of attorney"],
    ], "§§ 709.2104–709.2106, 709.2114, 709.2201–709.2202",
    "Execution generally requires the principal's signature, two subscribing witnesses, and acknowledgment. Durability requires appropriate language and is not automatic. Certain high-impact powers require a separate signed or initialed enumeration under § 709.2202."),

  drill("agency-termination", "Power of Attorney: Termination", "17", "709.2109",
    "Separate durability from survival after death or automatic revocation by a new document.", [
      ["death", "Does a durable power of attorney continue after the principal's death?", "No"],
      ["incapacity", "Principal incapacity ordinarily terminates a power that is not what?", "Durable"],
      ["later", "Does executing a later power of attorney alone automatically revoke the earlier one?", "No"],
      ["marriage", "Unless otherwise provided, filing a dissolution or annulment action terminates authority of an agent who is the principal's whom?", "Spouse", "husband", "wife"],
      ["writing", "The principal generally revokes through a later power expressly revoking or another signed what?", "Writing", "written instrument"],
    ], "§§ 709.2109–709.2110",
    "A later power does not revoke a prior one unless it so states. Agent-spouse authority ordinarily ends on filing the dissolution/annulment action or legal separation, rather than waiting for a final divorce, unless the document provides otherwise."),

  drill("perpetuities", "Florida Trust Perpetuities Periods", "1–2, 6", "689.225",
    "Recall the creation-date distinction in Florida's statutory wait-and-see period.", [
      ["new", "Alternative vesting period for interests in trusts created on or after July 1, 2022", "1,000 years", "1000 years", "one thousand years", "1000"],
      ["earlier", "Alternative period for covered trust interests created after December 31, 2000 and before July 1, 2022", "360 years", "three hundred sixty years", "360"],
      ["doctrine", "Rule regulating remoteness of nonvested interests and certain powers", "Rule Against Perpetuities", "RAP"],
    ], "§ 689.225(2), (5), (7)",
    "These are statutory alternative vesting periods for the specified interests, not a statement that every trust must last that long or is invalid if it lasts longer. Statutory exclusions, including qualifying charity-to-charity interests, require separate analysis."),
];

export const floridaTrustsLevels = Object.freeze({
  "fl-trusts-structure": "core",
  "fl-trusts-creation": "core",
  "fl-trusts-formalities": "core",
  "fl-trusts-purpose-and-beneficiaries": "core",
  "fl-trusts-charity": "standard",
  "fl-trusts-remedial": "standard",
  "fl-trusts-future-interests": "standard",
  "fl-trusts-spendthrift": "core",
  "fl-trusts-creditor-exceptions": "standard",
  "fl-trusts-revocation": "core",
  "fl-trusts-modification": "standard",
  "fl-trusts-judicial-relief": "comprehensive",
  "fl-trusts-trustee-office": "standard",
  "fl-trusts-cotrustees": "standard",
  "fl-trusts-loyalty": "core",
  "fl-trusts-administration": "core",
  "fl-trusts-investment": "core",
  "fl-trusts-information": "standard",
  "fl-trusts-liability": "standard",
  "fl-trusts-limitations": "comprehensive",
  "fl-trusts-substitutes": "core",
  "fl-trusts-power-of-attorney": "core",
  "fl-trusts-agency-termination": "standard",
  "fl-trusts-perpetuities": "comprehensive",
});
