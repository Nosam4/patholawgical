// Week_8-9_Readings.docx · October 6 and 13, 2026 · Intellectual Property.
// The handout supplies the topics; linked primary authorities supply the rules.
const readings = "Week 8–9 Readings · AI and the Law · Fall 2026 · October 6 and 13";
const copyrightBasics = "https://www.copyright.gov/what-is-copyright/";
const copyrightAi = "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf";
const fairUse = "https://www.copyright.gov/title17/92chap1.html#107";
const inventorship = "https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions";
const eligibility = "https://www.federalregister.gov/documents/2024/07/17/2024-15377/2024-guidance-update-on-patent-subject-matter-eligibility-including-on-artificial-intelligence";
const tradeSecrets = "https://www.uspto.gov/ip-policy/trade-secret-policy";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const note = (entry, explanation) => ({ ...entry, explanation });

function drill(key, title, prompt, rows, references, sourceUrl, sourceLabel) {
  const id = `ai-weeks8-9-${key}`;
  return {
    id, type: "sporcle-grid", clueLayout: "above", title, prompt,
    courseSources: [readings, ...references], sourceUrl, sourceLabel,
    columns: [{
      id: `${id}-steps`, title: "Main Points",
      answers: rows.map(({ key: answerKey, ...entry }) => ({ id: `${id}-${answerKey}`, ...entry })),
    }],
  };
}

export const aiAndLawWeeks8And9Questions = [
  drill("ip-toolkit", "AI Intellectual Property: Four Protections",
    "Choose the form of protection for each AI business asset. Several protections can overlap.", [
      row("patent", "A qualifying technical invention, such as a new AI implementation, may receive this exclusive right.", "Patent", "patent protection"),
      row("copyright", "Original human-written code or documentation: protection for expression rather than the underlying idea.", "Copyright", "copyright protection"),
      row("trademark", "A product name or logo that identifies the source of an AI service.", "Trademark", "trademark protection", "service mark"),
      row("secret", "Valuable nonpublic model know-how kept confidential through reasonable safeguards.", "Trade secret", "trade secret protection"),
    ], ["Discussion questions 1 and 4 · IP considerations and company protection strategies", "USPTO · patent basics, trademarks, and trade secret policy; U.S. Copyright Office · copyright basics"],
    "https://www.uspto.gov/ip-policy", "USPTO · intellectual property protections"),

  drill("copyright-basics", "Copyright: What Is Protected?",
    "Recall the ordinary U.S. copyright requirements before considering how AI changes the facts.", [
      row("originality", "Independent creation with at least minimal creativity satisfies this requirement.", "Originality", "original", "original work"),
      row("fixation", "The work must be captured in a sufficiently permanent medium. Name the requirement.", "Fixation", "fixed", "fixed in a tangible medium"),
      row("expression", "Copyright protects an author's particular ____ rather than ideas, methods, or facts.", "Expression", "original expression", "creative expression"),
      row("reproduction", "Making copies of protected works implicates this exclusive right, subject to exceptions.", "Reproduction", "reproduction right", "right to reproduce", "copying"),
      row("derivative", "Recasting or adapting protected expression may implicate the right to prepare ____ works.", "Derivative", "derivative works", "adaptations"),
    ], ["Discussion questions 1 and 2 · copyright considerations", "U.S. Copyright Office · What is Copyright?; 17 U.S.C. §§ 102 and 106"],
    copyrightBasics, "Copyright Office · originality, fixation, and exclusive rights"),
  drill("human-authorship", "AI Outputs: Human Authorship",
    "Identify what can qualify for protection. Using AI as an assistive tool does not automatically disqualify a work.", [
      note(row("human", "Thaler v. Perlmutter: a work made entirely by a machine lacks the required ____.", "Human authorship", "human author", "human creativity"),
        "The D.C. Circuit affirmed refusal to register a work attributed solely to the Creativity Machine. The Supreme Court denied review on March 2, 2026; denial of review is not a new Supreme Court merits ruling."),
      row("prompts", "Under the Copyright Office's 2025 report, these instructions alone generally do not give sufficient control over generated expression.", "Prompts", "prompt", "prompting", "text prompts"),
      row("arrangement", "Creative human selection and ____ of AI material may be protected, even when individual generated elements are not.", "Arrangement", "creative arrangement", "selection and arrangement"),
      row("modifications", "Creative human edits to generated material may be protected as human ____.", "Modifications", "modification", "creative modifications", "edits", "editing"),
      note(row("scope", "For a mixed human/AI work, protection extends to the qualifying ____ rather than automatically to all generated material.", "Human contributions", "human contribution", "human authored expression", "human expression"),
        "Copyrightability is assessed case by case. A license or ownership clause cannot create statutory copyright in expression that lacks the required human authorship."),
    ], ["Discussion question 2 · purely AI-generated works", "Copyright Office · Copyright and Artificial Intelligence, Part 2 (January 2025), executive summary", "Thaler v. Perlmutter · D.C. Circuit, March 18, 2025; Supreme Court docket 25-449, March 2, 2026"],
    copyrightAi, "Copyright Office · AI and copyrightability"),
  drill("fair-use", "Fair Use: Four Factors",
    "Recall the four § 107 factors in order. They are weighed together in context; AI training has no automatic exemption.", [
      row("purpose", "1. Why and how the work is used, including commerciality and a different purpose.", "Purpose and character", "purpose and character of the use", "purpose", "character", "purpose of use"),
      row("nature", "2. What kind of copyrighted work is being used, including its factual or creative character.", "Nature of the copyrighted work", "nature", "nature of the work"),
      row("amount", "3. How much is taken and how important that portion is relative to the whole work.", "Amount and substantiality", "amount", "amount used", "amount and substantiality of the portion used"),
      row("market", "4. How the use affects the work's potential market or value.", "Market effect", "effect on the market", "potential market or value", "market harm", "market", "effect on potential market"),
    ], ["Discussion question 2 · fair use in AI litigation", "17 U.S.C. § 107 · four statutory factors"],
    fairUse, "Copyright Act · § 107 fair use"),
  drill("copyright-questions", "Separate the AI Copyright Questions",
    "Analyze each activity and legal issue separately, even when they arise in the same product.", [
      row("acquisition", "First, examine how copyrighted material was obtained for a dataset: data ____.", "Acquisition", "data acquisition", "dataset acquisition", "obtaining data"),
      row("training", "Next, examine copying or use while the model learns from examples: model ____.", "Training", "model training", "ai training"),
      row("outputs", "Then, examine whether generated ____ reproduce protected expression from existing works.", "Outputs", "output", "generated outputs", "generated content"),
      row("copyrightability", "Whether a new work itself qualifies for copyright protection is a question of ____.", "Copyrightability", "copyright eligibility", "eligibility for copyright"),
      row("infringement", "Whether an activity violates someone else's exclusive copyright rights is a question of ____.", "Infringement", "copyright infringement"),
    ], ["Discussion questions 1 and 2 · rights in inputs and outputs", "Copyright Office · Copyright and Artificial Intelligence, Parts 2 and 3 (2025); Part 3 pre-publication report, §§ II.A–D"],
    "https://www.copyright.gov/ai/", "Copyright Office · AI reports and guidance"),
  drill("training-cases", "AI Training Cases: Compare the Rulings",
    "Name the case from its dated ruling. Each result depends on the specific use and evidence.", [
      note(row("ross", "February 2025: using Westlaw headnotes for a competing, non-generative legal research tool failed the fair-use defense.", "Thomson Reuters v. ROSS Intelligence", "thomson reuters v ross", "thomson reuters", "ross intelligence", "ross"),
        "The February 11, 2025 partial-summary-judgment opinion favored Thomson Reuters on factors one and four. It does not establish that every generative-AI training use infringes."),
      note(row("bartz", "June 2025: training on books was fair use, but maintaining a library of pirated copies required a separate analysis.", "Bartz v. Anthropic", "bartz", "anthropic"),
        "The June 23, 2025 order distinguished the transformative training use from acquisition and retention of pirated books. The training holding did not excuse that separate copying."),
      note(row("kadrey", "June 2025: Meta prevailed on these plaintiffs' training record; the court emphasized missing evidence of market dilution.", "Kadrey v. Meta", "kadrey", "meta"),
        "The June 25, 2025 summary-judgment ruling rested on the evidence these plaintiffs presented. The court expressly warned against treating the result as a blanket permission for all AI training."),
    ], ["Assigned case list · Norton Rose Fulbright, AI copyright cases in 2026", "Thomson Reuters v. ROSS Intelligence · February 11, 2025 opinion, pp. 16–22", "Bartz v. Anthropic · June 23, 2025 order, pp. 30–32", "Kadrey v. Meta · June 25, 2025 opinion, pp. 1–3, 31–40"],
    "https://www.ded.uscourts.gov/sites/ded/files/opinions/20-613_5.pdf", "District of Delaware · Thomson Reuters v. ROSS opinion"),
  drill("bartz-acquisition", "Bartz: Training, Piracy, and Settlement",
    "Keep the June 2025 fair-use ruling separate from the $1.5 billion settlement approved in July 2026.", [
      row("transformative", "The training use was fair because the court regarded that use as highly ____.", "Transformative", "transformative use", "transformation"),
      row("library", "The pirated books were also kept in a permanent central ____, a copying use requiring its own justification.", "Library", "central library", "permanent library"),
      note(row("settlement", "The later negotiated resolution is a ____, rather than a trial damages award.", "Settlement", "class settlement", "class action settlement"),
        "The July 20, 2026 order approved a $1.5 billion class settlement concerning covered pirated books. A settlement does not create a general statutory training license."),
      note(row("future", "The settlement's release does not cover output claims or ____ conduct.", "Future", "future conduct", "future infringement"),
        "The release preserves output claims and claims concerning conduct on or after August 25, 2025. Covered works are limited to the settlement's Works List."),
    ], ["Assigned case list · Bartz fair use and settlement", "Bartz v. Anthropic · June 23, 2025 fair-use order; July 20, 2026 final-approval order"],
    "https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2024cv05417/434709/680/", "Bartz · July 2026 final settlement approval"),
  drill("litigation-process", "OpenAI and Midjourney: Litigation Issues",
    "Identify the procedural device and the challenged activity. These clues describe filings, not final liability findings.", [
      row("mdl", "The OpenAI copyright cases were centralized using this procedure, often abbreviated MDL.", "Multidistrict litigation", "mdl", "multi district litigation"),
      row("pretrial", "MDL coordinates ____ proceedings; centralization does not itself decide the merits.", "Pretrial", "pretrial proceedings", "pre trial"),
      row("district", "The April 2025 OpenAI transfer order sent the cases to this federal district in New York.", "Southern District of New York", "sdny", "s d n y", "southern district"),
      note(row("outputs", "Disney and Universal's June 2025 Midjourney complaint challenges generated images: AI ____ as well as training.", "Outputs", "output", "generated outputs", "generated images"),
        "The complaint asserts infringement involving protected characters and images. An allegation or asserted fair-use defense is not a judicial finding of liability or a successful defense."),
    ], ["Assigned case list · In re OpenAI Copyright Litigation and Disney v. Midjourney", "JPML · April 3, 2025 transfer order, MDL No. 3143", "Disney and Universal v. Midjourney · complaint filed June 11, 2025"],
    "https://cases.justia.com/federal/district-courts/none/jpml/3%3A2023cv03223/1705358/34/0.pdf", "JPML · OpenAI copyright transfer order"),
  drill("patent-requirements", "What Must an AI Invention Show?",
    "Recall the separate U.S. utility-patent requirements. Eligibility alone does not satisfy every requirement.", [
      row("eligibility", "Section 101: the claimed invention must fall within patent-eligible subject ____.", "Matter", "subject matter", "patent eligible subject matter", "eligibility"),
      row("utility", "Section 101 also requires the invention to be useful: it must have ____.", "Utility", "usefulness", "useful"),
      row("novelty", "Section 102: the claimed invention must be new, satisfying ____.", "Novelty", "novel", "new"),
      row("nonobviousness", "Section 103: differences from prior art must satisfy ____.", "Nonobviousness", "non obviousness", "nonobvious", "not obvious"),
      row("description", "Section 112(a): the specification must contain a written ____ of the invention.", "Description", "written description"),
      row("enablement", "Section 112(a): teaching a skilled person to make and use the invention satisfies ____.", "Enablement", "enable", "enabling disclosure"),
      row("definiteness", "Section 112(b): sufficiently clear claim boundaries satisfy ____.", "Definiteness", "definite", "definite claims"),
    ], ["Discussion question 3 · requirements for obtaining a patent", "35 U.S.C. §§ 101, 102, 103, and 112; USPTO · patent quality metrics"],
    "https://www.uspto.gov/patents/quality-metrics", "USPTO · patentability requirements"),
  drill("ai-inventorship", "AI-Assisted Inventions: Who Is the Inventor?",
    "Apply the revised November 28, 2025 USPTO inventorship guidance.", [
      row("human", "Only these human individuals can be named as U.S. inventors.", "Natural persons", "natural person", "humans", "human beings", "human inventors"),
      row("tool", "For inventorship, AI is treated as a human inventor's ____ rather than as a joint inventor.", "Tool", "tools", "assistive tool"),
      row("same", "AI assistance uses the ____ traditional inventorship standard as other inventions.", "Same", "same standard", "ordinary standard", "traditional standard"),
      note(row("rescinded", "The November 2025 guidance ____ the February 2024 AI inventorship guidance in its entirety.", "Rescinded", "rescinds", "withdrew", "withdrawn", "replaced"),
        "This rescission concerns inventorship. It does not rescind the separate July 2024 AI subject-matter-eligibility update."),
      note(row("joint", "The Pannu factors still apply when multiple humans may be ____ inventors.", "Joint", "joint inventors", "co inventors", "coinventors"),
        "The revised guidance withdraws the use of Pannu to compare one human's contribution with an AI system's contribution. Joint inventorship among humans remains a separate inquiry."),
    ], ["Assigned USPTO · Revised Inventorship Guidance for AI-Assisted Inventions (November 28, 2025), §§ II–IV"],
    inventorship, "USPTO · revised 2025 inventorship guidance"),
  drill("human-conception", "Inventorship: Human Conception",
    "Focus on the human's intellectual contribution to the claimed invention.", [
      row("conception", "The central inventorship inquiry asks whether a human achieved ____ of the invention.", "Conception", "human conception", "conceived the invention"),
      row("settled", "A human must form a definite and ____ idea of the complete and operative invention.", "Permanent", "permanent idea", "settled", "settled idea"),
      row("ordinary", "A sufficiently complete conception permits reduction to practice using ____ skill, without extensive research or experimentation.", "Ordinary", "ordinary skill", "ordinary skill in the art"),
      note(row("goal", "Does merely stating a general goal or research plan, without a specific solution, establish conception?", "No", "not alone", "insufficient"),
        "For sole inventorship, the person's conception must encompass the claimed limitations. Mere ownership or supervision of an AI system does not by itself establish inventorship."),
    ], ["Discussion question 3 · showing human inventorship", "USPTO · revised 2025 inventorship guidance, § III (conception)"],
    inventorship, "USPTO · conception and AI assistance"),
  drill("patent-eligibility", "AI Patent Eligibility: Examination Steps",
    "Use the assigned 2024 AI eligibility update's framework. Reciting an exception requires further analysis, not an automatic rejection.", [
      row("category", "Step 1: is the claim a process, machine, manufacture, or composition of matter—a statutory ____?", "Category", "statutory category", "statutory invention category"),
      row("exception", "Step 2A, Prong One: mathematical concepts can fall within this judicial exception.", "Abstract idea", "abstract ideas", "abstract"),
      row("application", "Step 2A, Prong Two: does the claim as a whole integrate the exception into a ____?", "Practical application", "practical", "practical use"),
      row("more", "Step 2B: do the additional elements supply ____ beyond the judicial exception?", "Significantly more", "inventive concept", "an inventive concept"),
      row("conventional", "Whether additional elements are well-understood, routine, and conventional is considered at this USPTO step.", "Step 2B", "2b", "step two b"),
      note(row("ai", "Whether AI helped develop the invention is ____ to the subject-matter-eligibility inquiry.", "Irrelevant", "not relevant", "immaterial"),
        "Eligibility evaluates the claimed invention; inventorship evaluates human conception. The USPTO still lists the 2024 update with later memoranda through September 2026. The update is examination policy without the force and effect of substantive law."),
    ], ["Assigned USPTO · July 17, 2024 AI subject-matter-eligibility guidance, §§ II–IV", "USPTO · subject-matter-eligibility guidance hub, checked October 7, 2026"],
    eligibility, "USPTO · AI eligibility analysis and examples"),
  drill("squires-policy", "Squires: Patent Policy and AI Innovation",
    "Recall themes in Director Squires's assigned October 2025 Senate statement. These are policy positions, not newly enacted patent requirements.", [
      row("eligibility", "Squires advocates broad patent ____ as a foundation for protecting innovation.", "Eligibility", "patent eligibility", "subject matter eligibility"),
      row("capital", "The statement connects reliable patent rights to attracting venture ____.", "Capital", "venture capital", "investment"),
      row("forgetting", "The Desjardins machine-learning invention addressed catastrophic ____ when learning new tasks.", "Forgetting", "catastrophic forgetting"),
    ], ["Assigned USPTO · Statement by Director Squires before the Senate Subcommittee on Intellectual Property, October 9, 2025, §§ III–VI"],
    "https://www.uspto.gov/about-us/news-updates/statement-director-squires-united-states-senate-subcommittee-intellectual", "USPTO · Squires's Senate statement"),

  drill("trademarks", "AI Brands: Trademark Basics",
    "Apply ordinary trademark rules when naming and marketing an AI product.", [
      row("source", "A trademark identifies the ____ of goods or services.", "Source", "commercial source", "source of goods or services"),
      row("confusion", "Similar marks on related goods can make buyers mistakenly believe they come from the same source. Name the problem.", "Likelihood of confusion", "consumer confusion", "confusion"),
      row("clearance", "Before adopting an AI-generated product name, conduct a comprehensive ____ search for conflicting marks.", "Clearance", "clearance search", "trademark clearance", "trademark search"),
      row("general", "Does trademark ownership give a company ownership of a word for every possible use?", "No", "not for every use"),
    ], ["Discussion question 4 · protecting an AI company's brand", "USPTO · What is a trademark?; Likelihood of confusion"],
    "https://www.uspto.gov/trademarks/search/likelihood-confusion", "USPTO · related goods and confusing marks"),
  drill("trade-secrets", "AI Know-How: Trade Secret Protection",
    "Recall the conditions for secrecy-based protection and the limits of that protection.", [
      row("value", "The information must have independent economic ____ because it is not generally known or readily ascertainable through proper means.", "Value", "economic value", "independent economic value"),
      row("efforts", "The owner must make ____ efforts to keep the information secret, such as access controls and confidentiality agreements.", "Reasonable", "reasonable efforts", "reasonable measures"),
      row("misappropriation", "Obtaining a secret by improper means, or improperly using or disclosing it, is called ____.", "Misappropriation", "trade secret misappropriation"),
      row("proper", "Reverse engineering and independent derivation are examples of ____ means under federal trade secret law.", "Proper", "proper means", "lawful means"),
      row("duration", "Protection can continue as long as the legal requirements, including ____, remain satisfied.", "Secrecy", "confidentiality", "secret status"),
    ], ["Discussion question 4 · confidential data, methods, and know-how", "USPTO · Trade secret policy; 18 U.S.C. § 1839(3), (5), and (6)"],
    tradeSecrets, "USPTO · trade secret requirements"),
];
