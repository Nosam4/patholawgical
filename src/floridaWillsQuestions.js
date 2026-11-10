// Original recall prompts from the user's Kramer handout, with Florida statutory
// qualifications. PDF references use the file's page counter, not lesson numbers.
const statute = (section) => `https://www.flsenate.gov/Laws/Statutes/2026/${section}`;

function drill(id, title, pages, section, prompt, rows, references, clarification) {
  return {
    id: `fl-wills-${id}`,
    type: "sporcle-grid",
    title: `Florida Wills: ${title}`,
    clueLayout: "above",
    answerLayout: "stacked",
    answerMatching: "active",
    prompt,
    sourceUrl: statute(section),
    sourceLabel: `Florida Statutes § ${section} and related provisions`,
    courseSources: [
      `FL.Kramer.Wills.pdf — PDF pp. ${pages}.`,
      `Official reference: Florida Statutes ${references}. Checked November 9, 2026.`,
      ...(clarification ? [`Source clarification: ${clarification}`] : []),
    ],
    columns: [{
      id: `fl-wills-${id}-column`,
      title,
      answers: rows.map(([key, indicator, answer, ...acceptedAnswers]) => ({
        id: `fl-wills-${id}-${key}`, indicator, answer, acceptedAnswers,
      })),
    }],
  };
}

export const floridaWillsQuestions = [
  drill("foundations", "Estate Terms and Probate Property", "1, 23–24", "732.101",
    "Identify the document, recipient, and distribution system.", [
      ["decedent", "Person whose death gives rise to estate administration", "Decedent"],
      ["intestate", "Dying without an effective will disposing of the property", "Intestate", "intestacy"],
      ["heir", "Person entitled to property through intestate succession", "Heir"],
      ["devisee", "Recipient designated in a will", "Devisee", "beneficiary"],
      ["codicil", "Testamentary instrument amending, explaining, or revoking a will", "Codicil"],
      ["probate", "Judicial estate-administration process", "Probate", "probate administration"],
    ], "§§ 731.201, 732.101, 733.103",
    "A valid residuary clause can dispose of property not specifically devised. Intestacy applies to property not effectively disposed of by the will, not to every asset lacking a specific gift."),

  drill("spouse-intestacy", "Intestacy: Surviving Spouse", "1–2", "732.102",
    "Give the surviving spouse's share of the intestate estate in each family structure.", [
      ["no-descendants", "Decedent leaves a spouse and no descendants", "Entire estate", "all", "100%", "whole estate", "entire intestate estate"],
      ["shared-only", "All decedent's descendants are also spouse's descendants, and spouse has no other descendants", "Entire estate", "all", "100%", "whole estate", "entire intestate estate"],
      ["decedent-other", "At least one of decedent's descendants is not the surviving spouse's descendant", "One half", "half", "1/2", "50%"],
      ["spouse-other", "All decedent's descendants are shared, but spouse also has another descendant", "One half", "half", "1/2", "50%"],
      ["separation", "Does separation without dissolution alone disqualify a legally married spouse?", "No"],
    ], "§§ 732.102, 732.507(2)"),

  drill("descendants", "Intestacy: Children and Representation", "3–6", "732.104",
    "Recall Florida's branch-based distribution and parent-child rules.", [
      ["system", "Florida's statutory method of representation", "Per stirpes"],
      ["branches", "Begin by making a share for each surviving child and each deceased child leaving surviving whom?", "Descendants", "issue", "lineal descendants"],
      ["adoption", "An adopted child ordinarily inherits through the adoptive parent like which other child?", "Biological child", "natural child", "genetic child"],
      ["stepparent", "Does adoption by a natural parent's spouse automatically cut off inheritance through that natural parent?", "No"],
      ["conceived", "An afterborn heir protected by § 732.106 was conceived before or after the decedent's death?", "Before", "before death"],
    ], "§§ 732.104, 732.106, 732.108",
    "The statute contains specific adoption exceptions, including adoption by a natural parent's spouse. Afterborn heirs conceived before death inherit as if born during the decedent's lifetime. A mere informal relationship does not itself establish virtual adoption."),

  drill("other-heirs", "Intestacy Beyond Descendants and Survival", "1–3", "732.103",
    "Identify the next takers and the rule when there is insufficient evidence of survival.", [
      ["parents", "After descendants, the next statutory family category", "Parents", "father and mother", "mother and father"],
      ["siblings", "After parents, the next category includes brothers and sisters and descendants of deceased whom?", "Siblings", "brothers and sisters"],
      ["escheat", "Name the process by which an estate passes to the state for lack of an eligible taker", "Escheat"],
      ["simultaneous", "When survival order cannot be established sufficiently, each person's property is distributed as if that person had done what to the other?", "Survived", "survived the other"],
      ["120hours", "Does Florida impose the UPC's general 120-hour intestacy survivorship requirement?", "No"],
    ], "§§ 732.103, 732.107, 732.601",
    "The complete intestacy ladder continues through paternal/maternal kindred and other statutory takers before escheat. Section 732.601 applies when evidence is insufficient that persons died otherwise than simultaneously; instruments can provide otherwise."),

  drill("execution", "Execution of an Ordinary Written Will", "6–8", "732.502",
    "Recall the statutory signature and witness sequence for a paper will.", [
      ["writing", "An ordinary will must be in what form?", "Writing", "written", "in writing"],
      ["end", "Required location of the testator's signature", "End", "at the end", "end of the will"],
      ["number", "Minimum number of attesting witnesses", "Two", "2"],
      ["acknowledgment", "Instead of signing in front of the witnesses, the testator may do what concerning an existing signature?", "Acknowledge", "acknowledge the signature", "acknowledgment"],
      ["mutual", "Besides the testator, the witnesses must sign in whose presence?", "Each other", "one another", "each other's presence"],
      ["codicil", "Does a codicil require the same execution formalities as a will?", "Yes"],
    ], "§ 732.502; separate electronic-will requirements in §§ 732.521–732.526",
    "Another person may subscribe the testator's name at the end in the testator's presence and at the testator's direction. The statutory alternatives are part of strict compliance; the ordinary-paper-will drill does not replace the electronic-will rules."),

  drill("capacity-and-witnesses", "Capacity, Intent, and Witness Competency", "6–8, 20", "732.501",
    "Separate testator eligibility, timing, testamentary intent, and witness interest.", [
      ["age", "Ordinary minimum testator age, unless an emancipated minor", "18", "eighteen", "18 years", "18 years old"],
      ["mind", "A testator must be of sound what?", "Mind", "sound mind"],
      ["time", "Capacity and testamentary intent are tested at the time of what?", "Execution", "execution of the will", "signing"],
      ["present", "The intent to make a testamentary disposition must be future-only or what?", "Present", "present intent", "present testamentary intent"],
      ["competency", "Florida permits any person competent to serve in which role to attest a will?", "Witness", "a witness"],
      ["interested", "Does a witness's beneficial interest alone invalidate the will or the gift to that witness?", "No"],
    ], "§§ 732.501–732.504",
    "Section 732.501 also permits an emancipated minor to make a will. Section 732.504 does not prescribe a separate minimum age for a witness; competency is required."),

  drill("capacity-elements", "Testamentary Capacity: Four Abilities", "20–21", "732.501",
    "Recall what the testator must have the ability to understand at execution.", [
      ["act", "The testator must understand the nature of which present activity?", "Making a will", "executing a will", "testamentary act", "making the will"],
      ["property", "The testator must understand the nature and extent of what holdings?", "Property", "assets", "estate", "the property"],
      ["people", "People whose relationship to the testator must be understood, ordinarily including expected family beneficiaries", "Natural objects of bounty", "natural objects of the testator's bounty", "natural objects of his bounty", "natural objects of her bounty"],
      ["effect", "The testator must understand the practical effect of the proposed what?", "Disposition", "testamentary disposition", "distribution", "estate plan"],
      ["later", "Does later mental incapacity by itself invalidate a will validly executed earlier?", "No"],
    ], "§ 732.501; Florida common-law testamentary-capacity standard",
    "The inquiry is the ability to understand at execution, rather than proof that the testator could recite every asset or relative perfectly. A delusion must causally affect the challenged disposition to support that distinct ground."),

  drill("forms", "Handwritten Wills, Foreign Wills, and Proof", "8–9", "732.502",
    "Distinguish an unwitnessed holograph from a properly attested handwritten will.", [
      ["holograph", "Is a merely handwritten and signed but unwitnessed holographic will ordinarily valid in Florida?", "No"],
      ["attested", "Can a handwritten document validly serve as a will if it satisfies ordinary Florida execution formalities?", "Yes"],
      ["oral", "Does Florida ordinarily recognize an oral or nuncupative will?", "No"],
      ["foreign", "A nonresident's nonholographic, nonnuncupative will can be valid if it complied with the law where it was what?", "Executed", "made", "signed"],
      ["selfproof", "Affidavit mechanism allowing formal execution to be proved without ordinarily locating attesting witnesses", "Self-proof", "self proving affidavit", "self-proving affidavit", "self proving"],
    ], "§§ 732.502–732.503, 733.201",
    "The handout's suggestion that an unwitnessed holographic codicil can amend a Florida will is inapplicable here. A codicil must satisfy § 732.502(5). The self-proof target is an identified statutory supplement: it assists proof and does not substitute for valid execution."),

  drill("nonprobate", "Nonprobate Transfers and Pour-Over Wills", "9, 23–24", "732.513",
    "Classify transfer mechanisms and preserve the distinction between trust funding and a devise by will.", [
      ["survivorship", "Feature allowing jointly owned property to pass automatically to the surviving owner", "Right of survivorship", "survivorship"],
      ["beneficiary", "A life policy payable to a named individual ordinarily passes by beneficiary designation rather than what process?", "Probate"],
      ["funded", "Trust type that can be changed during life and ordinarily avoids probate for property already transferred to it", "Revocable trust", "revocable living trust", "living trust"],
      ["pour-over", "Will directing property to an identified trust", "Pour-over will", "pour over will"],
      ["probate-needed", "Does a pour-over will itself eliminate probate for assets still individually owned at death?", "No"],
    ], "§§ 732.513, 733.103, 733.808; account designations in § 655.82",
    "The handout's statement that a pour-over will avoids probate is misleading. Property passing under that will ordinarily goes through estate administration before funding the trust. Trust property can remain liable for estate obligations under applicable statutes."),

  drill("revocation", "Revocation by Writing or Physical Act", "9–12", "732.506",
    "Recall the recognized routes for revoking an ordinary written will.", [
      ["later", "An inconsistent provision in a later valid will or codicil revokes the earlier provision to what extent?", "Extent of inconsistency", "to the extent inconsistent", "inconsistency"],
      ["writing", "A separate writing declaring revocation must satisfy the formalities for execution of what?", "Will", "a will"],
      ["oral", "Is an oral instruction to revoke by itself sufficient?", "No"],
      ["intent", "Burning or tearing is revocation only if accompanied by revocatory what?", "Intent", "intention", "intent to revoke"],
      ["partial", "May an ordinary Florida paper will be partially revoked merely by crossing out one devise?", "No"],
      ["agent", "Another person's physical destruction must occur at the testator's direction and in the testator's what?", "Presence", "physical presence"],
    ], "§§ 732.505–732.507",
    "Section 732.506's physical-act route revokes an ordinary paper will, not an individual provision. Electronic wills have a distinct statutory deletion/obliteration revocation rule. The signature/direction/presence alternatives must be evaluated under the governing statute."),

  drill("lost-wills", "Lost Wills and Copies", "10–11", "733.207",
    "Recall the proof needed to establish the contents of a lost or destroyed will.", [
      ["presumption", "An original last held by the testator and missing at death can support a rebuttable presumption of what?", "Revocation", "intentional revocation"],
      ["without-copy", "Without a correct copy, the will's specific content must be proved by how many disinterested witnesses?", "Two", "2"],
      ["with-copy", "With a correct copy, how many disinterested witnesses suffice for the statutory content proof?", "One", "1"],
      ["photocopy", "Can a correct photocopy qualify as the statutory correct copy?", "Yes"],
    ], "§ 733.207; § 733.201 and Florida lost-will common law",
    "This content-proof rule does not eliminate other requirements to establish and probate a lost will, including overcoming any applicable revocation presumption. The handout's editorial correction permits a correct photocopy rather than categorically rejecting it."),

  drill("revival", "Codicils, Revival, and Mistaken Revocation", "11–13", "732.508",
    "Separate statutory revival from a revocation conditioned on a failed assumption.", [
      ["automatic", "Does revoking the later revoking will automatically revive the earlier will?", "No"],
      ["reexecution", "A revoked will can be revived by executing it again, called what?", "Reexecution", "re-execution", "re execution"],
      ["republication", "A duly executed codicil can revive a revoked will through what process?", "Republication", "republication by codicil"],
      ["drr", "Doctrine addressing revocation dependent on a mistaken premise", "Dependent relative revocation", "DRR"],
      ["condition", "For DRR, the failed assumption must have been material to the testator's decision to do what?", "Revoke", "revoke the will", "revocation"],
    ], "§§ 732.508–732.509; common-law dependent relative revocation",
    "DRR concerns whether the revocation was conditional and ineffective when its premise failed; it is not automatic revival whenever a later will is invalid. Revocation of a codicil does not automatically revoke the underlying will."),

  drill("family-changes", "Divorce and Pretermitted Family Members", "11", "732.301",
    "Recall the default protection for family members added after execution.", [
      ["divorce", "For will provisions benefiting a former spouse, dissolution ordinarily treats the former spouse as having done what?", "Died", "predeceased", "died at dissolution"],
      ["marriage", "Does a later marriage itself revoke the will?", "No"],
      ["spouse-share", "An eligible pretermitted spouse ordinarily receives the share that would pass under what succession system?", "Intestacy", "intestate succession"],
      ["child-share", "An eligible child born or adopted after execution ordinarily receives which hypothetical share?", "Intestate share", "share under intestacy", "intestate"],
      ["intentional", "An afterborn child's statutory protection can be defeated by an omission shown to be what?", "Intentional", "intentionally omitted"],
    ], "§§ 732.301–732.302, 732.507(2), 732.702",
    "Pretermitted-spouse exceptions include a marriage agreement, provision in contemplation of the marriage, or disclosed contrary intent. The child statute also has the substantially-all-to-the-other-parent and advancement exceptions. Divorce treatment yields to contrary will or dissolution-judgment provisions."),

  drill("construction", "Incorporation and Independent Significance", "13", "732.512",
    "Distinguish incorporating an existing document from using an independently significant act.", [
      ["existing", "An incorporated writing ordinarily must be in existence when the will is what?", "Executed", "made", "signed"],
      ["intent", "The will must manifest an intention to do what to that writing?", "Incorporate", "incorporate it", "incorporation"],
      ["identify", "The will must describe the writing sufficiently to permit its what?", "Identification", "identification of the writing"],
      ["independent", "A later event can affect a devise when it has significance apart from its effect on what document?", "Will", "the will", "testamentary disposition"],
      ["list", "A signed separate list may dispose of permitted tangible personal property even if created after the will: yes or no?", "Yes"],
    ], "§§ 732.5105, 732.512, 732.515",
    "The separate-list statute is a specific exception to the ordinary incorporation timing rule. The list must identify items and recipients with reasonable certainty and cannot dispose of money, securities, title documents, debt evidence, or business property."),

  drill("antilapse", "Lapse, Anti-Lapse, and Residue", "13–14", "732.603",
    "Identify substitute takers and the destination of a failed devise.", [
      ["failure", "Name for failure of an ordinary gift because the intended devisee predeceased the testator", "Lapse"],
      ["relationship", "Florida anti-lapse protects a grandparent and descendants of a what?", "Grandparent", "testator's grandparent"],
      ["issue", "The protected deceased devisee must leave surviving whom for the substitute gift?", "Descendants", "issue", "lineal descendants"],
      ["residue", "A failed nonresiduary devise ordinarily falls into which estate portion if anti-lapse or a different direction does not apply?", "Residue", "residuary estate"],
      ["co-residue", "A failed share of a multi-devisee residue ordinarily passes proportionately to the other residuary whom?", "Devisees", "beneficiaries", "residuary devisees"],
      ["class", "Can the anti-lapse statute protect a qualifying member of a class gift?", "Yes"],
    ], "§§ 732.6005, 732.603–732.604",
    "The will's controlling intent and statutory exceptions matter. Do not assume that a spouse or unrelated friend is in the protected grandparent/descendant-of-grandparent relationship. Class and residue rules yield where the anti-lapse statute supplies substitute takers."),

  drill("gifts-and-abatement", "Gift Types and Abatement Order", "14–15", "733.805",
    "Classify devises and recall the default order in which shares bear a shortfall.", [
      ["specific", "Devise of an identified asset such as a particular painting", "Specific devise", "specific", "specific gift"],
      ["general", "Fixed-dollar devise payable from estate assets generally", "General devise", "general", "general gift"],
      ["demonstrative", "Dollar devise charged primarily to a specified fund", "Demonstrative devise", "demonstrative", "demonstrative gift"],
      ["first", "First abatement category: property passing by what system?", "Intestacy", "intestate succession", "intestate property"],
      ["second", "Second abatement category, before general devises", "Residuary devises", "residue", "residuary", "residuary gifts"],
      ["last", "Last category ordinarily to abate: specific and what other devises?", "Demonstrative", "demonstrative devises", "demonstrative gifts"],
    ], "§ 733.805",
    "Default order: intestate property, residuary devises, general devises, then specific and demonstrative devises, subject to the will and statutory exceptions. A demonstrative devise becomes general to the extent its designated fund is insufficient and the deficiency is payable from general assets."),

  drill("ademption", "Extinction and Satisfaction", "15–16", "732.606",
    "Distinguish a missing specific asset from a lifetime gift credited against a devise.", [
      ["extinction", "Doctrine implicated when specifically devised property is absent at death", "Ademption by extinction", "extinction", "ademption"],
      ["balance", "The specific devisee can receive unpaid purchase-price amounts remaining due from the property's what?", "Sale", "sale of the property"],
      ["insurance", "Unpaid casualty proceeds tied to specifically devised property can come from which type of coverage?", "Insurance", "casualty insurance"],
      ["satisfaction", "A lifetime gift credited against a devise implicates ademption by what?", "Satisfaction", "ademption by satisfaction"],
      ["writing", "Absent a will direction, a testator's satisfaction declaration must be in a contemporaneous what?", "Writing", "written declaration"],
      ["recipient", "Alternatively, which person may acknowledge in writing that the lifetime gift satisfies the devise?", "Devisee", "recipient", "beneficiary", "donee"],
    ], "§§ 732.606, 732.609",
    "Section 732.606 specifies remaining property, unpaid amounts, and special guardian/agent-sale rules. It does not grant every specific devisee all traceable proceeds of any voluntary sale merely because the testator once intended the gift."),

  drill("elective-share", "Elective Share: Amount and Election", "16–17", "732.2135",
    "Recall the elective-share percentage and the two competing filing deadlines.", [
      ["amount", "Percentage of the elective estate constituting the elective share", "30%", "30", "thirty percent", "30 percent"],
      ["notice", "Ordinary election period after service of notice of administration", "6 months", "six months", "6"],
      ["death", "Ordinary outer election period after death", "2 years", "two years", "2"],
      ["earlier", "Use the earlier or later of the notice-based and death-based deadlines?", "Earlier", "earlier of the two"],
      ["homestead", "Does electing automatically forfeit protected homestead, exempt property, and family allowance?", "No"],
      ["base", "Is the elective estate necessarily limited to probate assets?", "No"],
    ], "§§ 732.201, 732.2035–732.2045, 732.2065, 732.2105, 732.2125–732.2135",
    "The handout's statement that election disclaims every other estate interest is overbroad: § 732.2105 preserves homestead, exempt property, and allowances. Existing spousal benefits may satisfy the share; the spouse does not necessarily collect 30% again on top. Statutory extensions and withdrawal rules require separate analysis."),

  drill("waiver", "Waiving Spousal Estate Rights", "17–18", "732.702",
    "Recall the form and disclosure requirements for an effective spousal waiver.", [
      ["time", "May covered estate rights be waived both before and after marriage?", "Yes"],
      ["written", "The waiver must be an agreement, contract, or waiver in what form?", "Writing", "written", "in writing"],
      ["witnesses", "Number of subscribing witnesses for the waiving spouse's signature", "Two", "2"],
      ["after", "A postmarital waiver requires each spouse to make fair disclosure of that spouse's what?", "Estate", "assets", "property", "financial estate"],
      ["before", "Does § 732.702 require the same disclosure for a waiver executed before marriage?", "No"],
    ], "§§ 732.702–732.7025",
    "A fair-disclosure requirement attaches to execution after marriage under § 732.702(2). Waiver scope depends on the agreement and statute; a homestead conveyance waiver under § 732.7025 is a separate route with its own requirements."),

  drill("homestead", "Homestead Devise and Descent", "17–18", "732.401",
    "Recall the protected family interests when homestead is not validly devised.", [
      ["minor", "Even a devise to the spouse is constitutionally restricted if the owner is survived by what kind of child?", "Minor child", "minor", "a minor child"],
      ["spouse", "Absent a minor child, homestead can be devised to whom despite the surviving-spouse restriction?", "Spouse", "surviving spouse"],
      ["life", "If the owner leaves a spouse and descendants and homestead is not validly devised, the spouse ordinarily takes what estate?", "Life estate"],
      ["remainder", "The descendants in being at death take a vested what, per stirpes?", "Remainder", "vested remainder"],
      ["alternative", "The spouse can instead elect an undivided fractional tenant-in-common interest of what size?", "One half", "half", "1/2", "50%"],
      ["deadline", "Ordinary time after death to make that homestead election during the spouse's lifetime", "6 months", "six months", "6"],
      ["irrevocable", "Once made, is the homestead election revocable?", "No"],
    ], "§§ 732.401–732.4015; Florida Constitution art. X, § 4(c)",
    "This descent rule assumes homestead not devised as authorized by law and constitution. Section 732.401 excludes survivorship ownership. A timely petition by an agent or guardian can trigger a statutory extension to the election period; waiver and valid spousal trust dispositions need separate analysis."),

  drill("set-asides", "Exempt Property and Family Allowance", "18", "732.402",
    "Recall Florida's property set-aside and support allowance for a Florida domiciliary's estate.", [
      ["furniture", "Maximum net value of qualifying household furniture, furnishings, and appliances", "$20,000", "20000", "20,000", "twenty thousand dollars"],
      ["vehicles", "Number of qualifying family-use motor vehicles", "Two", "2"],
      ["priority", "Person entitled to exempt property before the decedent's children", "Surviving spouse", "spouse"],
      ["allowance", "Maximum total family allowance", "$18,000", "18000", "18,000", "eighteen thousand dollars"],
      ["heirs", "Eligible supported or entitled-to-support lineal heirs include descendants and which other lineal category?", "Ascendants", "ancestors", "lineal ascendants"],
      ["charge", "Is the allowance ordinarily charged against the recipient's other share unless the will directs otherwise?", "No"],
    ], "§§ 732.402–732.403",
    "Vehicle eligibility includes title, personal use, and a 15,000-pound limit for each vehicle. Exempt property has petition deadlines and exclusions for specifically/demonstratively devised property. The allowance protects qualifying family support during administration, not every financially independent adult heir."),

  drill("slayer-and-disclaimer", "Slayer Rule and Disclaimer", "19", "732.802",
    "Separate forfeiture for wrongful killing from a voluntary rejection of an interest.", [
      ["intent", "Disqualifying killing must be unlawful and what?", "Intentional", "intentional killing"],
      ["predeceased", "The killer is treated as having done what to the victim?", "Predeceased", "predeceased the victim", "died before"],
      ["conviction", "Final conviction of which crime in any degree is conclusive under the statute?", "Murder"],
      ["civil", "Absent a conclusive murder conviction, civil proof uses the greater weight of what?", "Evidence", "the evidence", "preponderance of evidence"],
      ["disclaimer", "Instrument voluntarily rejecting an interest or power", "Disclaimer"],
      ["acceptance", "Can acceptance or a prior transfer bar a later disclaimer?", "Yes"],
    ], "§ 732.802; §§ 739.104, 739.301, 739.402",
    "The killer's descendants are not automatically disqualified solely because of that relationship. A disclaimer must meet chapter 739's form and delivery/filing rules; creditor, insolvency, acceptance, and tax rules prevent treating disclaimers as universally effective creditor avoidance. Federal qualified-disclaimer timing is distinct from Florida's civil rules."),

  drill("contests", "Capacity and Undue Influence Contests", "19–22", "733.107",
    "Recall the burden sequence and the facts underlying an undue-influence presumption.", [
      ["proponent", "Party initially establishing prima facie formal execution and attestation", "Proponent", "will proponent"],
      ["contestant", "Party ordinarily proving incapacity or another ground after prima facie execution is established", "Contestant", "will contestant"],
      ["benefit", "A beneficiary invoking the undue-influence presumption received a substantial what?", "Benefit", "benefit under the will"],
      ["relationship", "That beneficiary stood in what kind of relationship with the testator?", "Confidential relationship", "confidential"],
      ["procurement", "The beneficiary also actively participated in obtaining the will, called active what?", "Procurement", "active procurement"],
      ["burden", "The statutory undue-influence presumption shifts the burden of what?", "Proof", "burden of proof"],
    ], "§§ 732.501, 732.5165, 733.107; In re Estate of Carpenter, 253 So. 2d 697 (Fla. 1971), as to presumption predicates; Swiss v. Flanagan (Fla. 3d DCA 2021), https://flcourts-media.flcourts.gov/content/download/794965/opinion/Opinion_20-1500.pdf",
    "Weakened mentality can be relevant evidence, but it is not a substitute for active procurement in the Carpenter presumption's three-part formulation. Section 733.107(2) makes the applicable presumption shift the burden of proof. A will or provision procured by undue influence is void under § 732.5165; the handout's automatic intestate-share cap is not the statute's rule."),

  drill("fraud-and-mistake", "Fraud, Delusion, and Reformation", "21–23", "732.5165",
    "Distinguish misconduct, a causative false belief, and correction of a mistaken expression.", [
      ["execution", "Deceiving the signer about the character or contents of the document is fraud in the what?", "Execution", "fraud in the execution"],
      ["inducement", "A lie causing an otherwise understood will to make a different disposition is fraud in the what?", "Inducement", "fraud in the inducement"],
      ["causation", "For an insane-delusion challenge, the delusion must cause the challenged what?", "Disposition", "testamentary disposition", "gift", "provision"],
      ["reform", "Statutory remedy to conform a mistaken will's terms to the testator's intent", "Reformation", "reform the will"],
      ["standard", "Evidence standard for statutory reformation", "Clear and convincing evidence", "clear and convincing"],
      ["penalty", "Are Florida will clauses penalizing a beneficiary for contesting the will enforceable?", "No"],
    ], "§§ 732.5165, 732.517, 732.615",
    "Section 732.615 can reform even unambiguous terms upon the required proof of intent and mistake. Invalidation should track the provision procured by fraud or undue influence; the remainder can remain valid when the statute's conditions are satisfied."),

  drill("administration", "Probate Venue and Personal Representative", "23–24", "733.302",
    "Recall the court, ordinary venue, and core qualifications and duties of the estate fiduciary.", [
      ["court", "Florida trial court exercising probate jurisdiction", "Circuit court", "circuit"],
      ["venue", "For a Florida domiciliary, ordinary probate venue is the county of the decedent's what?", "Domicile", "domicile at death"],
      ["age", "Minimum age for an individual personal representative", "18", "eighteen", "18 years", "18 years old"],
      ["felony", "A person convicted of what category of crime is disqualified?", "Felony", "a felony"],
      ["nonresident", "Can a qualifying relative living outside Florida serve under the statutory exception?", "Yes"],
      ["standard", "The personal representative is a fiduciary owing care and what duty against self-interested administration?", "Loyalty", "duty of loyalty"],
    ], "§§ 26.012(2)(b), 733.101, 733.302–733.304, 733.602, 733.617",
    "The handout's Florida-residency rule omits qualifying nonresident relatives under § 733.304. Additional statutory disqualifications apply. The handout's five-year probate-filing assertion is not used as a categorical bar; § 733.103's effect of probate must not be confused with creditor deadlines."),

  drill("creditor-priority", "Estate Payment Priorities", "24–25", "733.707",
    "Recall the eight statutory priority classes in order.", [
      ["one", "Class 1: costs, administration expenses, and fiduciary/attorney what?", "Compensation", "fees", "compensation and fees"],
      ["two", "Class 2: qualifying funeral, interment, and grave marker expenses, capped at what amount?", "$6,000", "6000", "6,000", "six thousand dollars"],
      ["three", "Class 3 includes debts and taxes having preference under which sovereign's law?", "Federal", "federal law", "United States"],
      ["four", "Class 4: medical expenses of the final illness's last how many days?", "60 days", "sixty days", "60"],
      ["five", "Class 5 priority", "Family allowance"],
      ["six", "Class 6: arrearage from court-ordered what?", "Child support", "court ordered child support"],
      ["seven", "Class 7: qualifying post-death debts from continuation of decedent's what?", "Business", "decedent's business"],
      ["eight", "Class 8: all what claims?", "Other", "other claims", "remaining"],
    ], "§ 733.707",
    "Class 3 also includes specified state claims and unpaid court costs, fees, and fines. Class 7 is limited to the continued business's assets. Within an underfunded class, claims share ratably after prior classes are paid; excess amounts can fall in Class 8."),

  drill("creditor-deadlines", "Creditor Claims: Notice and Outer Bar", "25", "733.702",
    "Distinguish the notice-based filing period from the ordinary death-based bar.", [
      ["publication", "Claims period measured from first publication of notice to creditors", "3 months", "three months", "3"],
      ["service", "Claims period for a creditor required to be served, measured from service", "30 days", "thirty days", "30"],
      ["comparison", "Use the earlier or later of those applicable notice-based periods?", "Later", "later of the two"],
      ["outer", "Ordinary outer bar measured from the decedent's death", "2 years", "two years", "2"],
      ["extension", "Along with estoppel and insufficient notice, what misconduct can support an extension under § 733.702?", "Fraud"],
    ], "§§ 733.702, 733.710",
    "The two-year statute is subject to its stated exceptions, including timely claims, qualifying liens, and specified liability-insurance recovery. An extension under § 733.702 does not erase § 733.710's independent bar. This is not a universal two-year deadline to open probate."),

  drill("appointment-powers", "Powers of Appointment", "25–26", "709.02",
    "Distinguish the creator, holder, scope, and release of a power of appointment.", [
      ["donor", "Person creating the appointment power", "Donor"],
      ["donee", "Person authorized to select who receives the appointive property", "Donee", "powerholder", "holder"],
      ["general", "Power exercisable for the holder, holder's estate, or their creditors", "General power", "general power of appointment", "general"],
      ["special", "Power limited to specified permissible objects excluding those general-power categories", "Special power", "limited power", "special power of appointment", "nongeneral power"],
      ["release", "A power may be wholly or partly surrendered through a signed written what?", "Release", "instrument of release"],
      ["witnesses", "Number of witnesses required for a release under § 709.02", "Two", "2"],
    ], "§§ 709.02–709.04; appointment construction in § 732.607; perpetuities in § 689.225",
    "The instrument's terms govern permissible appointees and any default takers. Failure to exercise does not invariably return property to the donor's estate. Exclusive versus nonexclusive describes whether permissible objects can be excluded, not simply whether the donee's family can receive property."),
];

export const floridaWillsLevels = Object.freeze({
  "fl-wills-foundations": "core",
  "fl-wills-spouse-intestacy": "core",
  "fl-wills-descendants": "core",
  "fl-wills-other-heirs": "standard",
  "fl-wills-execution": "core",
  "fl-wills-capacity-and-witnesses": "core",
  "fl-wills-capacity-elements": "core",
  "fl-wills-forms": "standard",
  "fl-wills-nonprobate": "core",
  "fl-wills-revocation": "core",
  "fl-wills-lost-wills": "comprehensive",
  "fl-wills-revival": "standard",
  "fl-wills-family-changes": "core",
  "fl-wills-construction": "standard",
  "fl-wills-antilapse": "core",
  "fl-wills-gifts-and-abatement": "standard",
  "fl-wills-ademption": "standard",
  "fl-wills-elective-share": "core",
  "fl-wills-waiver": "standard",
  "fl-wills-homestead": "core",
  "fl-wills-set-asides": "standard",
  "fl-wills-slayer-and-disclaimer": "standard",
  "fl-wills-contests": "core",
  "fl-wills-fraud-and-mistake": "standard",
  "fl-wills-administration": "standard",
  "fl-wills-creditor-priority": "comprehensive",
  "fl-wills-creditor-deadlines": "standard",
  "fl-wills-appointment-powers": "comprehensive",
});
