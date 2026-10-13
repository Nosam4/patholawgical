// Week_8-9_Readings.docx · October 6 and 13, 2026 · Intellectual Property.
// The reading list and Week 9 Class 2 slides supply the topics and hypotheticals.
// Linked primary authorities supply the rules; launch advice is course application.
const readings = "Week 8–9 Readings · AI and the Law · Fall 2026 · October 6 and 13";
const slides = "Week 9 · Class 2 · Can We Ship It? The GC's IP Go/No-Go";
const slideSource = (pages) => `${slides} · slides ${pages}`;
const copyrightBasics = "https://www.copyright.gov/what-is-copyright/";
const copyrightAi = "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf";
const fairUse = "https://www.copyright.gov/title17/92chap1.html#107";
const inventorship = "https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions";
const eligibility = "https://www.federalregister.gov/documents/2024/07/17/2024-15377/2024-guidance-update-on-patent-subject-matter-eligibility-including-on-artificial-intelligence";
const tradeSecrets = "https://www.uspto.gov/ip-policy/trade-secret-policy";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const note = (entry, explanation) => ({ ...entry, explanation });

function drill(key, title, prompt, rows, references, sourceUrl, sourceLabel, extraColumns = [], answerMatching) {
  const id = `ai-weeks8-9-${key}`;
  return {
    id, type: "sporcle-grid", clueLayout: "above", title, prompt,
    ...(answerMatching ? { answerMatching } : {}),
    courseSources: [readings, ...references], sourceUrl, sourceLabel,
    columns: [{
      id: `${id}-steps`, title: "Main Points",
      answers: rows.map(({ key: answerKey, ...entry }) => ({ id: `${id}-${answerKey}`, ...entry })),
    }, ...extraColumns.map(({ key: columnKey, title: columnTitle, rows: entries }) => ({
      id: `${id}-${columnKey}`, title: columnTitle,
      answers: entries.map(({ key: answerKey, ...entry }) => ({ id: `${id}-${columnKey}-${answerKey}`, ...entry })),
    }))],
  };
}

export const aiAndLawWeeks8And9Questions = [
  drill("ip-toolkit", "GC IP Playbook and Launch Decision",
    "Name the protection, then recall the five-step class playbook. Meridian, Atlas 2, and the launch conditions are teaching hypotheticals.", [
      row("patent", "A qualifying technical invention, such as a new AI implementation, may receive this exclusive right.", "Patent", "patent protection"),
      row("copyright", "Original human-written code or documentation: protection for expression rather than the underlying idea.", "Copyright", "copyright protection"),
      row("trademark", "A product name or logo that identifies the source of an AI service.", "Trademark", "trademark protection", "service mark"),
      note(row("secret", "Valuable nonpublic model know-how kept confidential through reasonable safeguards.", "Trade secret", "trade secret protection"),
        "Slide 38's strategy: consider the technology's lifespan and visibility. A patent can exclude independent inventors within its claims but requires enabling disclosure; trade secret cannot prevent proper independent development. A hybrid cannot withhold details that § 112 requires the patent to disclose."),
    ], [slideSource("7–8, 38, 43–44"), "Discussion questions 1 and 4 · IP considerations and company protection strategies", "USPTO · patent basics, trademarks, and trade secret policy; U.S. Copyright Office · copyright basics"],
    "https://www.uspto.gov/ip-policy", "USPTO · intellectual property protections", [
      { key: "playbook", title: "Five-Step GC Playbook", rows: [
        row("map", "1. Sort the facts into inputs, model, outputs, and deployment.", "Map the facts", "map", "map facts", "lifecycle map", "map the lifecycle"),
        note(row("right", "2. Identify the regime, whose right is involved, and whether Meridian is claimant or accused.", "Name the right", "name right", "identify the right", "identify rights"),
          "Meridian protects its own RecurTune know-how and brand but may be accused over training inputs and FrontierCo's notes. State the posture separately for every issue."),
        row("analysis", "3. Start with the statute's elements, apply the cases, then consider defenses.", "Run the legal analysis", "legal analysis", "analyze", "analyse", "run legal analysis"),
        row("risk", "4. Assess likelihood and severity, distinguishing settled from unsettled law.", "Rate the risk", "rate risk", "risk rating", "risk assessment"),
        row("decide", "5. Give one recommendation and attach an owner and a date to each condition.", "Decide and fix", "decide", "decision and fixes", "decide and fix go or no go"),
      ] },
      { key: "launch", title: "Meridian's Launch Call", rows: [
        note(row("conditions", "The class model answer: blockers can be fixed, with owners and dates before launch. Which recommendation fits?", "Go with conditions", "conditional go", "go subject to conditions"),
          "Slide 44: CTO isolates pirated/rival data under a litigation hold and assesses retraining, and stops prohibited distillation; GC/Security quarantine Dana's notes and investigate; GC/Marketing clear or replace the name; Product adds attribution, watermark, and regurgitation controls. These are recommendations for the hypothetical, not universal statutory duties."),
        note(row("delay", "Required retraining cannot finish within the 90-day deadline. What is the class recommendation for that launch date?", "No-go", "no go on the date", "delay launch", "postpone launch", "delay"),
          "Move the date if a blocker cannot be fixed in time. A 'go' assumes no remaining blockers; the final presentation leads with the call, supports it with analysis, assigns owners/dates, and explains what new facts would change it."),
      ] },
    ]),

  drill("copyright-basics", "Copyright: Protection and Statutory Order",
    "Recall the protection requirements and the class's Q1–Q4 sequence. Assess ownership of a valid copyright and copying of original elements before defenses.", [
      note(row("originality", "Feist: independent creation with at least minimal creativity satisfies this requirement.", "Originality", "original", "original work"),
        "Effort alone ('sweat of the brow') is insufficient. Facts and judicial opinions are distinct from the original editorial expression in headnotes; public availability does not itself eliminate copyright."),
      row("fixation", "The work must be captured in a sufficiently permanent medium. Name the requirement.", "Fixation", "fixed", "fixed in a tangible medium"),
      row("expression", "Copyright protects an author's particular ____ rather than ideas, methods, or facts.", "Expression", "original expression", "creative expression"),
      row("reproduction", "Making copies of protected works implicates this exclusive right, subject to exceptions.", "Reproduction", "reproduction right", "right to reproduce", "copying"),
      row("derivative", "Recasting or adapting protected expression may implicate the right to prepare ____ works.", "Derivative", "derivative works", "adaptations"),
    ], [slideSource("9–19"), "Discussion questions 1 and 2 · copyright considerations", "17 U.S.C. §§ 101–103, 106, 107, and 501; Feist, 499 U.S. 340, 345–49, 356–61 (1991)"],
    copyrightBasics, "Copyright Office · originality, fixation, and exclusive rights", [
      { key: "statutory-order", title: "Copyright Q1–Q4", rows: [
        row("protectable", "Q1. Which section asks whether there is an original, fixed work of human authorship and excludes ideas or methods?", "Section 102", "102", "17 usc 102", "17 u s c 102"),
        row("compilation", "Q2. Which section limits copyright in a compilation to the compiler's qualifying contribution?", "Section 103", "103", "103b", "103 b", "section 103b", "17 usc 103"),
        row("infringement", "Q3. Which two sections grant exclusive rights and define infringement?", "Sections 106 and 501", "106 and 501", "106 501", "section 106 and section 501"),
        row("defense", "Q4. Which section supplies the fair-use defense?", "Section 107", "107", "17 usc 107", "17 u s c 107"),
      ] },
      { key: "datasets", title: "Compilations and Datasets", rows: [
        row("creative", "Under Feist and § 103, a compilation may protect original selection, coordination, or ____.", "Arrangement", "creative arrangement", "selection and arrangement"),
        note(row("facts", "That compilation copyright does not extend to the underlying ____ themselves.", "Facts", "fact", "underlying facts"),
          "Separately copyrighted books and articles remain protected on their own. A factual dataset may also benefit from secrecy or enforceable contract restrictions; § 103 is not permission to copy every constituent work."),
      ] },
    ]),
  drill("human-authorship", "AI Outputs: Human Authorship",
    "Identify what can qualify for protection. Using AI as an assistive tool does not automatically disqualify a work.", [
      note(row("human", "Thaler v. Perlmutter: a work made entirely by a machine lacks the required ____.", "Human authorship", "human author", "human creativity"),
        "The D.C. Circuit affirmed refusal to register a work attributed solely to the Creativity Machine. The Supreme Court denied review on March 2, 2026; denial of review is not a new Supreme Court merits ruling."),
      row("prompts", "Under the Copyright Office's 2025 report, these instructions alone generally do not give sufficient control over generated expression.", "Prompts", "prompt", "prompting", "text prompts"),
      note(row("arrangement", "Creative human selection and ____ of AI material may be protected, even when individual generated elements are not.", "Arrangement", "creative arrangement", "selection and arrangement"),
        "Zarya of the Dawn (Copyright Office, February 2023): the human text and creative organization of text/images were protected; the Midjourney images themselves were excluded."),
      note(row("modifications", "Creative human edits to generated material may be protected as human ____.", "Modifications", "modification", "creative modifications", "edits", "editing"),
        "Meridian's lightly edited video/manual qualify only to the extent of sufficiently creative human expression. AI-drafted RecurTune may contain protected human code or edits, while the underlying training method is excluded by § 102(b)."),
      note(row("scope", "For a mixed human/AI work, protection extends to the qualifying ____ rather than automatically to all generated material.", "Human contributions", "human contribution", "human authored expression", "human expression"),
        "Copyrightability is assessed case by case. A license or ownership clause cannot create statutory copyright without qualifying authorship; enforceable contract obligations may still restrict use."),
      note(row("disclaimer", "When registering the human-authored portions, disclose and ____ AI-generated material that is more than de minimis.", "Exclude", "exclude from the claim", "disclaim", "disclaimer", "exclude ai material"),
        "Document the actual human contributions. Registration of the human portions does not convert excluded AI material into copyrighted expression."),
    ], [slideSource("6, 15, 29"), "Discussion question 2 · purely AI-generated works", "Copyright Office · Part 2 (January 2025); Zarya of the Dawn letter (February 2023); AI registration guidance (March 2023)", "Thaler v. Perlmutter · D.C. Circuit, March 18, 2025; Supreme Court docket 25-449, March 2, 2026"],
    copyrightAi, "Copyright Office · AI and copyrightability"),
  drill("fair-use", "Fair Use: Factors and Controlling Cases",
    "Recall the four § 107 factors and the key Supreme Court lessons. Weigh them together for each particular use; AI training has no automatic exemption.", [
      note(row("purpose", "1. Why and how the work is used, including commerciality and a different purpose.", "Purpose and character", "purpose and character of the use", "purpose", "character", "purpose of use"),
        "The statutory factors trace to Folsom v. Marsh (1841). Campbell's transformative-purpose inquiry and Warhol's focus on the specific use inform factor one; changed appearance or new meaning alone does not decide fair use."),
      row("nature", "2. What kind of copyrighted work is being used, including its factual or creative character.", "Nature of the copyrighted work", "nature", "nature of the work"),
      note(row("amount", "3. How much is taken and how important that portion is relative to the whole work.", "Amount and substantiality", "amount", "amount used", "amount and substantiality of the portion used"),
        "Judge the amount relative to the purpose. Whole-work copying is not automatically disqualifying; output filters may reduce public exposure but do not automatically excuse input copying."),
      note(row("market", "4. How the use affects the work's potential market or value.", "Market effect", "effect on the market", "potential market or value", "market harm", "market", "effect on potential market"),
        "Slides 25–26 distinguish substitution, lost licensing markets, and market dilution. ROSS recognized training-data licensing harm; Kadrey highlighted dilution but found the plaintiffs' evidence lacking. Record-specific results do not create a fixed factor hierarchy."),
    ], [slideSource("20–26, 45"), "Discussion question 2 · fair use in AI litigation", "17 U.S.C. § 107; Campbell (1994); Google v. Oracle (2021); Warhol v. Goldsmith (2023)"],
    fairUse, "Copyright Act · § 107 fair use", [
      { key: "cases", title: "Factor One: Supreme Court Cases", rows: [
        row("campbell", "The 1994 parody case explains transformative use and rejects automatic defeat merely because a use is commercial.", "Campbell v. Acuff-Rose", "campbell", "campbell v acuff rose music", "acuff rose"),
        note(row("google", "The 2021 case found copying Java API declaring code for Android fair use in that functional-code setting.", "Google v. Oracle", "google", "google v oracle america", "oracle"),
          "The Court assumed copyrightability for its analysis. The result does not authorize unrestricted copying of any code or AI training material."),
        note(row("warhol", "The 2023 case found factor one opposed a particular commercial magazine license with a purpose similar to the original photograph.", "Warhol v. Goldsmith", "warhol", "andy warhol foundation v goldsmith", "goldsmith"),
          "The Court evaluated the challenged licensing use, not every use of Warhol's artwork. A new message alone does not establish fair use."),
      ] },
    ]),
  drill("copyright-questions", "Separate the AI Copyright Questions",
    "Map each act separately: acquisition, training, weights, and outputs. Also distinguish protecting Meridian's assets from defending claims over someone else's material.", [
      row("acquisition", "First, examine how copyrighted material was obtained for a dataset: data ____.", "Acquisition", "data acquisition", "dataset acquisition", "obtaining data"),
      row("training", "Next, examine copying or use while the model learns from examples: model ____.", "Training", "model training", "ai training"),
      row("outputs", "Then, examine whether generated ____ reproduce protected expression from existing works.", "Outputs", "output", "generated outputs", "generated content"),
      row("copyrightability", "Whether a new work itself qualifies for copyright protection is a question of ____.", "Copyrightability", "copyright eligibility", "eligibility for copyright"),
      note(row("infringement", "Whether an activity violates someone else's exclusive copyright rights is a question of ____.", "Infringement", "copyright infringement"),
        "For each claim, identify the allegedly copied original expression and relevant exclusive right. Ownership/copyrightability, infringement, defenses, and API contract restrictions are separate questions."),
      note(row("weights", "Between training and outputs, plaintiffs may also challenge the model's ____ as alleged copies or derivative works.", "Weights", "model weights", "parameters"),
        "Slide 19's Getty discussion concerns a UK ruling about secondary copyright liability; it is not controlling U.S. law or a general finding that every model is free of copies. Analyze the claimed stored expression and governing jurisdiction."),
    ], [slideSource("5–8, 18–19, 36"), "Discussion questions 1 and 2 · rights in inputs and outputs", "Copyright Office · Parts 2 and 3 (2025); Part 3 pre-publication report, §§ II.A–D", "Getty Images v. Stability AI · UK High Court, November 4, 2025, §§ 597–603 (secondary copyright claim)"],
    "https://www.copyright.gov/ai/", "Copyright Office · AI reports and guidance"),
  drill("training-cases", "AI Training Cases: Compare the Rulings",
    "Name the case from its dated ruling. Each result depends on the specific use and evidence.", [
      note(row("ross", "September 29, 2026: the Third Circuit affirmed rejection of fair use for protected Westlaw headnotes used in a competing, non-generative legal research tool.", "Thomson Reuters v. ROSS Intelligence", "thomson reuters v ross", "thomson reuters", "ross intelligence", "ross"),
        "The appellate court weighed factors one, three, and four against ROSS, unlike the district court on factor three; factor two slightly favored ROSS. Meridian's DocketWise summaries are the class analogue: license them or remove/retrain. The opinion distinguished generative systems and does not settle all training cases."),
      note(row("bartz", "June 2025: training on books was fair use, but maintaining a library of pirated copies required a separate analysis.", "Bartz v. Anthropic", "bartz", "anthropic"),
        "The June 23, 2025 order distinguished the transformative training use from acquisition and retention of pirated books. The training holding did not excuse that separate copying."),
      note(row("kadrey", "June 2025: Meta prevailed on these plaintiffs' training record; the court emphasized missing evidence of market dilution.", "Kadrey v. Meta", "kadrey", "meta"),
        "The June 25, 2025 summary-judgment ruling rested on the evidence these plaintiffs presented. The court expressly warned against treating the result as a blanket permission for all AI training."),
    ], [slideSource("14, 23–26, 29"), "Assigned case list · Norton Rose Fulbright, AI copyright cases in 2026", "Thomson Reuters v. ROSS Intelligence · Third Circuit, September 29, 2026, pp. 16–27", "Bartz · June 23, 2025 order, pp. 30–32; Kadrey · June 25, 2025 opinion, pp. 1–3, 31–40"],
    "https://www2.ca3.uscourts.gov/opinarch/252153p.pdf", "Third Circuit · ROSS appeal, September 2026"),
  drill("bartz-acquisition", "Bartz: Training, Piracy, and Settlement",
    "Keep the June 2025 fair-use ruling separate from the $1.5 billion settlement approved in July 2026.", [
      note(row("transformative", "The court characterized the training use as highly ____ when weighing fair use.", "Transformative", "transformative use", "transformation"),
        "Bartz weighed all factors. It separately permitted the format shift of purchased print books where originals were destroyed and the replacements retained without distribution. Meridian's bought/scanned books are that class analogue; keep provenance records."),
      note(row("library", "The pirated books were also kept in a permanent central ____, a copying use requiring its own justification.", "Library", "central library", "permanent library"),
        "Meridian's shadow-library e-books are high-risk in the class model. Removing them from a training pipeline does not erase past acquisition or library-copying claims."),
      note(row("settlement", "The later negotiated resolution is a ____, rather than a trial damages award.", "Settlement", "class settlement", "class action settlement"),
        "The July 20, 2026 order approved a $1.5 billion class settlement concerning covered pirated books. A settlement does not create a general statutory training license."),
      note(row("future", "The settlement's release does not cover output claims or ____ conduct.", "Future", "future conduct", "future infringement"),
        "The release preserves output claims and claims concerning conduct on or after August 25, 2025. Covered works are limited to the settlement's Works List."),
    ], [slideSource("19, 23, 27–29, 44"), "Assigned case list · Bartz fair use and settlement", "Bartz · June 23, 2025 fair-use order; July 20, 2026 final-approval order; 17 U.S.C. §§ 412 and 504"],
    "https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2024cv05417/434709/680/", "Bartz · July 2026 final settlement approval", [
      { key: "exposure", title: "Exposure and Immediate Response", rows: [
        note(row("unit", "Section 504(c) generally awards statutory damages per copyrighted ____, rather than for every individual copy.", "Work", "per work", "copyrighted work"),
          "Ordinarily $750–$30,000 per work, with eligibility subject to § 412's registration timing; proven willfulness can raise the maximum to $150,000. Proven innocent infringement can permit reduction to $200. Actual damages/profits are another remedy. Slide 27's totals assume qualifying works and are not automatic awards."),
        row("willfulness", "The enhanced statutory-damages maximum requires a finding of ____.", "Willfulness", "willful infringement", "willful", "wilfulness", "wilful"),
        note(row("hold", "The deck recommends preserving evidence under a ____ while isolating questionable files from use.", "Litigation hold", "legal hold", "preservation hold", "hold", "preserve evidence"),
          "A hold preserves evidence; quarantine stops use. Investigate which model versions used the data and assess licensing or retraining. Purging operational data must respect preservation duties when litigation is reasonably anticipated."),
      ] },
    ]),
  drill("litigation-process", "OpenAI and Midjourney: Litigation Issues",
    "Identify the procedural device and the challenged activity. These clues describe filings, not final liability findings.", [
      note(row("mdl", "The OpenAI copyright cases were centralized using this procedure, often abbreviated MDL.", "Multidistrict litigation", "mdl", "multi district litigation"),
        "Meridian's paywalled-news training raises unsettled issues in the class framework. Consider licenses and provenance, contractual/access restrictions, and anti-regurgitation controls; filters alone do not resolve allegedly unlawful input acquisition."),
      row("pretrial", "MDL coordinates ____ proceedings; centralization does not itself decide the merits.", "Pretrial", "pretrial proceedings", "pre trial"),
      row("district", "The April 2025 OpenAI transfer order sent the cases to this federal district in New York.", "Southern District of New York", "sdny", "s d n y", "southern district"),
      note(row("outputs", "Disney and Universal's June 2025 Midjourney complaint challenges generated images: AI ____ as well as training.", "Outputs", "output", "generated outputs", "generated images"),
        "The complaint asserts infringement involving protected characters and images. An allegation or asserted fair-use defense is not a judicial finding of liability or a successful defense."),
    ], [slideSource("5–6, 19, 25–29, 45"), "Assigned case list · In re OpenAI Copyright Litigation and Disney v. Midjourney", "JPML · April 3, 2025 transfer order, MDL No. 3143", "Disney and Universal v. Midjourney · complaint filed June 11, 2025"],
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

  drill("trademarks", "AI Brands: Confusion, Comparisons, and Outputs",
    "Apply the trademark framework to Meridian's name, comparison tagline, and publisher attribution. Assess priority and the governing circuit's law.", [
      row("source", "A trademark identifies the ____ of goods or services.", "Source", "commercial source", "source of goods or services"),
      note(row("confusion", "Similar marks on related goods can make buyers mistakenly believe they come from the same source. Name the problem.", "Likelihood of confusion", "consumer confusion", "confusion"),
        "ATLAS 2 and AtlasLaw serve overlapping legal-research buyers. The deck rates the name high-risk if AtlasLaw has senior rights. Apply the circuit's factors (Sleekcraft in the Ninth Circuit; Polaroid in the Second) rather than treating registration alone as conclusive."),
      note(row("clearance", "Before adopting an AI-generated product name, conduct a comprehensive ____ search for conflicting marks.", "Clearance", "clearance search", "trademark clearance", "trademark search"),
        "The class recommendation is to clear, rename, or negotiate before launch. An AI-generated name is not automatically available for commercial use."),
      row("general", "Does trademark ownership give a company ownership of a word for every possible use?", "No", "not for every use"),
    ], [slideSource("6, 40–41, 44"), "Discussion question 4 · protecting an AI company's brand", "15 U.S.C. §§ 1114 and 1125(a); New Kids, 971 F.2d 302 (9th Cir. 1992)", "Advance Local v. Cohere · November 13, 2025 opinion (motion to dismiss); USPTO · likelihood of confusion"],
    "https://www.uspto.gov/trademarks/search/likelihood-confusion", "USPTO · related goods and confusing marks", [
      { key: "elements", title: "Trademark Analysis", rows: [
        row("rights", "1. Check enforceable trademark rights and who made the relevant use first: a valid mark and ____.", "Priority", "priority of use", "seniority", "senior rights", "first use"),
        row("commerce", "2. Check the defendant's unauthorized use of the mark in ____.", "Commerce", "use in commerce", "commercial use"),
        row("confusion", "3. Assess whether consumers are likely to mistake the source, sponsorship, or affiliation.", "Likelihood of confusion", "confusion", "consumer confusion"),
      ] },
      { key: "applied", title: "Meridian's Tagline and Outputs", rows: [
        note(row("comparison", "Identifying ChatGPT by name for comparison may qualify as this kind of fair use under the Ninth Circuit's New Kids test.", "Nominative", "nominative fair use", "nominative use"),
          "The mark must be needed to identify the product, only as much as reasonably necessary may be used, and sponsorship/endorsement must not be suggested. Separately assess false or misleading factual claims; substantiate objective superiority claims. Vague puffery may be nonactionable. 'No logos' is a conservative course recommendation, not an absolute legal rule."),
        note(row("attribution", "Fabricated articles labeled as coming from Metro Ledger can raise Lanham Act concerns over false ____ of origin.", "Designation", "false designation", "false designation of origin", "designation of origin", "passing off"),
          "Cohere allowed the relevant trademark claims to proceed in November 2025; it did not decide final liability. Attribution controls and takedowns address the hypothetical's output risk. StockVault watermarks also require review; the UK Getty decision is not controlling U.S. law."),
      ] },
    ]),
  drill("trade-secrets", "AI Know-How: Trade Secret Protection",
    "Run the deck's four questions: secret qualification, reasonable measures, improper acquisition/use, and people. Then apply them to Meridian's assets and FrontierCo's information.", [
      note(row("value", "Q1. The information must have independent economic ____ because it is not generally known or readily ascertainable through proper means.", "Value", "economic value", "independent economic value"),
        "Slide 32's six analytical aids: how widely known outside and inside, protective measures, value, development effort, and ease of proper duplication. They are not six mandatory statutory elements. A confidential valuable compilation can qualify even if some pieces are public."),
      note(row("efforts", "Q2. The owner must make ____ efforts to keep the information secret, such as access controls and confidentiality agreements.", "Reasonable", "reasonable efforts", "reasonable measures"),
        "Assess the whole program: NDAs, policies, restrictive licenses, labeling, cybersecurity, and employee/offboarding controls. LivePerson's algorithm allegations survived dismissal with confidentiality restrictions. For AI tools, review input training/retention terms and control access; a label or NDA alone is not a guaranteed sufficient program."),
      note(row("misappropriation", "Q3. Obtaining a secret by improper means, or improperly using or disclosing it, is called ____.", "Misappropriation", "trade secret misappropriation"),
        "Q4 asks about people: analyze actual acquisition, disclosure, or use and the required knowledge/reason to know of improper provenance. Waymo's departing-engineer dispute illustrates onboarding risk; recruiting or passive receipt alone does not automatically establish liability."),
      note(row("proper", "Reverse engineering and independent derivation are examples of ____ means under federal trade secret law.", "Proper", "proper means", "lawful means"),
        "Proper means under § 1839 does not resolve separate enforceable contract restrictions. Paid API access does not automatically make all outputs public or nonsecret; check confidentiality and access conditions."),
      row("duration", "Protection can continue as long as the legal requirements, including ____, remain satisfied.", "Secrecy", "confidentiality", "secret status"),
    ], [slideSource("30–39, 44"), "Discussion question 4 · confidential data, methods, and know-how", "18 U.S.C. § 1839(3)–(6); LivePerson, 83 F. Supp. 3d 501 (S.D.N.Y. 2015)", "xAI v. OpenAI · June 15, 2026 dismissal order; USPTO · Trade secret policy"],
    tradeSecrets, "USPTO · trade secret requirements", [
      { key: "applied", title: "Meridian: AI Assets and People", rows: [
        note(row("authorship", "Does trade secret law impose copyright's human-authorship requirement on the confidential synthetic dataset?", "No", "no human authorship requirement", "not required"),
          "This follows from the statutory information-based definition. Secrecy, independent economic value, reasonable measures, and rightful ownership still matter. AI-generated data is not automatically a trade secret or free of third-party rights."),
        note(row("contract", "Distillation contrary to binding FrontierCo API restrictions raises a separate ____ issue even if the delivered answers are not trade secrets.", "Contract", "breach of contract", "contract breach", "api contract", "contract law"),
          "The hypothetical prohibits using outputs to build competing models. Assess assent, enforceability, and the actual use; do not assume every API has this restriction. The class recommends stopping the use and auditing/retraining as needed."),
        note(row("knowledge", "For continued unauthorized use of Dana's notes, ask whether Meridian had ____ or reason to know the secrets were disclosed through a confidentiality breach.", "Knowledge", "knowledge of improper provenance", "notice", "knew"),
          "The June 2026 xAI dismissal did not treat passive receipt as enough. Dana's sharing calls for quarantine, forensic review, and clean onboarding; it does not by itself establish every liability element."),
        note(row("leak", "Does a single paste of RecurTune code into a consumer chatbot automatically destroy trade secret protection?", "Not automatically", "no", "not necessarily", "depends", "fact dependent"),
          "Examine provider terms, retention, dissemination, and the entire secrecy program. Prompt incident response and approved enterprise tools are recommendations; quick action creates no statutory safe harbor."),
      ] },
    ], "active"),
];
