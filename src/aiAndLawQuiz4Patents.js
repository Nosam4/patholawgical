// Quiz #4 source: Patenting AI: The GC's Go/No-Go (43-page PDF).
// Keystone, TetherTune, people, claims, and performance figures are teaching hypotheticals.
// Page references use PDF positions: printed slide numbers skip 32 after PDF page 31.
// Legal checks: official USPTO, Federal Circuit, Supreme Court, EPO, and Congress sources.
const deck = "Patenting AI: The GC's Go/No-Go · Week 8, Class 1";
const canvasUrl = "https://stetson.instructure.com/courses/48504/files/2508080?wrap=1";
const inventorship = "https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions";
const eligibility = "https://www.uspto.gov/web/offices/pac/mpep/s2106.html";
const patentStatutes = "https://www.uspto.gov/web/offices/pac/mpep/mpep-9015-appx-l.html";
const aiExamples = "https://www.uspto.gov/sites/default/files/documents/2024-AI-SMEUpdateExamples47-49.pdf";
const recentive = "https://www.cafc.uscourts.gov/opinions-orders/23-2437.OPINION.4-18-2025_2500790.pdf";
const desjardins = "https://www.uspto.gov/sites/default/files/documents/memo-desjardins.pdf";
const dentalMonitoring = "https://www.cafc.uscourts.gov/opinions-orders/24-2270.OPINION.7-7-2026_2719362.pdf";
const declarations = "https://www.uspto.gov/sites/default/files/documents/smeds-memo-20260929.pdf";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const note = (entry, explanation) => ({ ...entry, explanation });
const column = (key, title, rows) => ({ key, title, rows });

function drill(key, title, prompt, pages, references, columns, answerMatching) {
  const id = `ai-quiz4-patent-${key}`;
  return {
    id,
    type: "sporcle-grid",
    clueLayout: "above",
    title,
    prompt,
    ...(answerMatching ? { answerMatching } : {}),
    courseSources: [`${deck} · PDF pages ${pages}`, ...references],
    sourceUrl: canvasUrl,
    sourceLabel: "Canvas · Patenting AI: The GC's Go/No-Go",
    columns: columns.map(({ key: columnKey, title: columnTitle, rows }) => ({
      id: `${id}-${columnKey}`,
      title: columnTitle,
      answers: rows.map(({ key: answerKey, ...entry }) => ({
        id: `${id}-${columnKey}-${answerKey}`,
        ...entry,
      })),
    })),
  };
}

export const aiAndLawQuiz4PatentQuestions = [
  drill("gc-roadmap", "The GC's Six-Step Patent Decision",
    "Move from ownership to the business call in the deck's order. A patent's issuance, survival in court, and commercial value are separate questions.",
    "2, 7–8, 38, 41–43", ["Course framework · own it, get it, keep it, want it"], [
      column("steps", "Six Steps", [
        row("ownership", "1. Identify the human inventors and check that the company owns their rights.", "Inventorship and ownership", "inventorship ownership", "who invented it and do we own it", "ownership", "inventorship"),
        row("eligibility", "2. Apply Alice/Mayo and § 101 to the claimed subject matter.", "Eligibility", "patent eligibility", "subject matter eligibility", "section 101", "101"),
        row("prior-art", "3. Check whether §§ 102–103 allow the claim in light of earlier disclosures and combinations.", "Novelty and nonobviousness", "novelty nonobviousness", "novelty and obviousness", "new and nonobvious", "102 and 103"),
        row("disclosure", "4. Ask whether § 112's specification and claim requirements are satisfied.", "Disclosure", "description and enablement", "written description and enablement", "section 112", "112"),
        row("enforcement", "5. Ask whether infringement can be detected, attributed to an actor, and reached territorially.", "Enforceability", "enforcement", "can we enforce it"),
        note(row("strategy", "6. Weigh patent versus secrecy, budget, timing, and business value before the final call.", "Strategy", "patent strategy", "business strategy", "should we patent it", "go or no go"),
          "Ownership establishes what Keystone can obtain; enforcement asks whether an issued right would be useful. The board presentation states the ask, maps issues to these steps, gives rules/authority/application/risk, makes a call, and assigns next steps with owners and timing."),
      ]),
    ]),

  drill("tethertune", "TetherTune: What Is the Technical Improvement?",
    "Recall the invented technique and evidence. These figures describe Keystone's classroom hypothetical, not a real product or a statutory threshold.",
    "4–6, 27, 33, 38", ["Keystone Cognition/TetherTune teaching hypothetical · performance and mechanism"], [
      column("mechanism", "The Mechanism", [
        row("forgetting", "Learning new tasks causes the model to lose performance on old tasks. Name the problem.", "Catastrophic forgetting", "forgetting", "catastrophic model forgetting"),
        row("importance", "First, calculate each adapter parameter's ____ to previous tasks.", "Importance score", "importance", "parameter importance", "importance scoring"),
        row("freeze", "High-importance parameters are held fixed. Which operation is this?", "Freeze", "freezing", "freeze parameters", "parameter freezing"),
        row("replay", "Interleave new-task data with compressed prior-task embeddings: compressed ____.", "Replay", "compressed replay", "replay set", "replay buffer"),
        row("delta", "Store only the small updated portion instead of another whole model: a ____ adapter.", "Delta", "delta adapter", "small delta adapter"),
      ]),
      column("evidence", "Claimed Results", [
        row("two-percent", "Claim B caps replay embeddings at this percentage of prior-task examples.", "2%", "2", "2 percent", "two percent", "no more than 2 percent", "at most 2 percent"),
        row("retention", "The hypothetical retains this percentage of prior-task accuracy, compared with 71%.", "97%", "97", "97 percent", "ninety seven percent"),
        row("storage", "The hypothetical uses this percentage less storage.", "60%", "60", "60 percent", "sixty percent"),
        note(row("gpu", "The hypothetical uses this percentage fewer GPU hours.", "35%", "35", "35 percent", "thirty five percent"),
          "The six-week paper/arXiv deadline makes the filing decision urgent; the budget permits one new patent family. Benchmarks support the claimed improvement, but eligibility and nonobviousness remain distinct inquiries."),
      ]),
    ]),

  drill("human-inventorship", "AI Inventorship: The Current Human Standard",
    "The deck uses the November 2025 revised USPTO guidance. Its February 2024 Pannu-based AI approach is historical and rescinded.",
    "9–13, 40, 43", [`USPTO · revised inventorship guidance, §§ II–IV · ${inventorship}`], [
      column("rules", "Human Conception", [
        row("persons", "Under Thaler v. Vidal, only these human individuals may be named as inventors.", "Natural persons", "natural person", "humans", "human beings", "human inventors"),
        row("conception", "The traditional touchstone is forming the complete operative invention in the mind: ____.", "Conception", "human conception", "conceiving the invention"),
        row("tool", "The 2025 guidance treats AI as the inventor's ____ rather than as another inventor.", "Tool", "tools", "assistive tool", "instrument"),
        row("rescinded", "The February 2024 AI inventorship guidance was ____ in its entirety in November 2025.", "Rescinded", "withdrawn", "replaced", "rescinds", "withdraws"),
        note(row("pannu", "These factors remain relevant to joint inventorship among multiple humans, not to comparing one human against AI.", "Pannu factors", "pannu", "pannu test"),
          "The same conception standard applies with or without AI: a definite, settled solution rather than a general goal. Pannu assesses significant contributions among human joint inventors; AI assistance alone neither establishes nor defeats human inventorship."),
        note(row("confirmation", "Changed fact A: AI supplied the whole method; Priya merely confirmed it worked. Does that fact alone establish her conception?", "No", "not alone", "insufficient", "no human conception shown"),
          "Investigate what Priya actually conceived. Merely verifying a tool's result does not establish the required intellectual contribution; do not name AI as a substitute inventor."),
      ]),
    ]),

  drill("contributors-ownership", "Keystone's Inventors and Chain of Title",
    "Apply the deck's facts. Naming an inventor and obtaining that person's ownership share are separate tasks.",
    "5, 12–13, 38–39", [
      `35 U.S.C. §§ 116 and 261 · ${patentStatutes}`,
      "Stanford v. Roche, 563 U.S. 776 (2011) · ownership begins with inventors; deck's assignment-language application",
    ], [
      column("people", "Who Did What?", [
        row("priya", "She conceived freeze-and-replay and rewrote an AI-suggested loss term into the importance score.", "Priya Raman", "priya", "raman", "dr priya raman"),
        note(row("ito", "She proposed compressed replay, a significant claimed contribution making her a likely joint inventor.", "Lena Ito", "ito", "prof ito", "professor ito", "professor lena ito"),
          "Section 116 does not require every joint inventor to contribute to every claim. Contributing one claimed element is not automatically sufficient: apply the significance and joint-inventorship requirements to the facts."),
        note(row("dev", "He coded and benchmarked to Priya's specifications; on these facts the deck likely excludes him.", "Dev Okafor", "dev", "okafor"),
          "Routine implementation/testing alone does not establish conception. A new fact showing Dev conceived a significant claimed feature could change the result."),
        row("assistant", "This contributor proposed candidate loss terms but can never be named as a human inventor.", "AI assistant", "ai", "coding assistant", "ai coding assistant"),
      ]),
      column("title", "Fix Ownership and Evidence", [
        note(row("assignment", "Ito only 'agrees to assign.' Obtain this completed transfer before treating her share as Keystone's.", "Executed assignment", "assignment", "signed assignment", "present assignment", "execute an assignment"),
          "The deck treats 'agrees to assign' as a promise of a future transfer. Review the actual contract and chain of title; employment or payment alone does not resolve ownership."),
        row("university", "Because Ito is a university consultant, check the university's ____ policy for competing rights.", "IP", "intellectual property", "university ip", "university intellectual property"),
        row("records", "Preserve dated invention records and AI ____ to document the human's conception.", "Prompt logs", "prompts", "prompt log", "ai prompt logs", "chat logs"),
      ]),
    ]),

  drill("eligibility-checklist", "Section 101: Categories, Exceptions, and Four Boxes",
    "Congress supplies statutory categories; courts supply judicial exceptions. The USPTO divides Alice step one into Step 2A's two prongs and uses Step 2B for Alice step two.",
    "15–17, 21, 30", [`USPTO · MPEP § 2106 · ${eligibility}`], [
      column("categories", "Statutory Categories", [
        row("process", "A method such as Claim B belongs to this § 101 category.", "Process", "processes", "method"),
        row("machine", "A physical system such as Claim C belongs to this § 101 category.", "Machine", "machines", "system"),
        row("manufacture", "An article made by human manufacture belongs to the category called ____.", "Manufacture", "manufactures", "article of manufacture"),
        row("composition", "The category covering qualifying chemical mixtures or compounds is composition of ____.", "Matter", "composition of matter", "compositions of matter"),
      ]),
      column("exceptions", "Judicial Exceptions", [
        row("nature", "Gravity illustrates the judicial exception for laws of ____.", "Nature", "laws of nature", "law of nature"),
        row("phenomena", "An unmodified mineral found in the wild illustrates natural ____.", "Phenomena", "natural phenomena", "natural phenomenon"),
        row("abstract", "Mathematical concepts or certain mental processes may fall within this exception.", "Abstract ideas", "abstract idea", "abstractions"),
      ]),
      column("boxes", "USPTO Examination Steps", [
        row("step-one", "Which step asks whether the claim fits a statutory category?", "Step 1", "1", "one", "step one"),
        row("prong-one", "Which Step 2A prong asks whether the claim recites a judicial exception?", "Prong 1", "1", "prong one", "step 2a prong 1", "2a1", "2a 1"),
        row("prong-two", "Which Step 2A prong asks whether the exception is integrated into a practical application?", "Prong 2", "2", "prong two", "step 2a prong 2", "2a2", "2a 2"),
        note(row("step-two-b", "Which step asks whether additional elements provide significantly more—an inventive concept?", "Step 2B", "2b", "step two b", "two b"),
          "No exception at 2A-1 or a practical application at 2A-2 can end the inquiry favorably. Otherwise examine 2B. Generic computer use alone is insufficient. Well-understood/routine/conventional analysis belongs at 2B, not 2A-2."),
      ]),
    ], "active"),

  drill("software-cases", "Eligibility Cases: Improve Technology or Use It?",
    "Identify the authority from the claimed improvement or defect. The question is how the claim works, not simply the field where AI is used.",
    "19–20, 24, 27, 29–31", [
      `Recentive v. Fox · Federal Circuit, April 18, 2025 · ${recentive}`,
      `USPTO · Ex parte Desjardins/MPEP memorandum, December 5, 2025 · ${desjardins}`,
      `USPTO · MPEP § 2106, discussing Enfish, McRO, Electric Power Group, and field-of-use limitations · ${eligibility}`,
    ], [
      column("authorities", "Match the Authority", [
        row("enfish", "Eligible: a self-referential database table improved how the computer itself operates.", "Enfish v. Microsoft", "enfish", "enfish v microsoft"),
        row("mcro", "Eligible: specific rules supplied a particular method of automated lip-sync animation.", "McRO v. Bandai", "mcro", "mcro v bandai", "mcro v bandai namco"),
        row("electric", "Abstract: collecting, analyzing, and displaying information on a computer.", "Electric Power Group v. Alstom", "electric power group", "electric power", "electric power group v alstom", "epg"),
        row("iv", "A field-of-use restriction did not rescue abstract financial/budgeting concepts.", "Intellectual Ventures v. Capital One", "intellectual ventures", "iv v capital one", "iv", "capital one"),
        note(row("recentive", "2025 Federal Circuit: generic ML for TV schedules/network maps failed; iterative training and a new data environment were insufficient.", "Recentive v. Fox", "recentive", "recentive analytics", "recentive analytics v fox", "recentive v fox corp"),
          "The court distinguished claims that improve the ML model from generic ML applied in another setting. Merely automating a human task faster or more efficiently did not supply eligibility."),
        note(row("desjardins", "2025 USPTO Appeals Review Panel: a model-training improvement reduced catastrophic forgetting and storage; eligible at Step 2A, Prong 2.", "Ex parte Desjardins", "desjardins", "ex parte desjardins et al"),
          "Designated precedential November 4, 2025. The claim recited mathematical subject matter but improved model operation; eligibility did not resolve the separate § 103 rejection. Courts are not bound by USPTO guidance."),
      ]),
    ]),

  drill("claim-applications", "Example 47 and Keystone's Three Draft Claims",
    "Apply the USPTO framework to each claim as a whole. The Keystone outcomes are the deck's proposed analysis, not a judicial ruling.",
    "6, 18, 27, 30–31", [
      `USPTO · July 2024 Example 47, claims 1–3 · ${aiExamples}`,
      `Alice framework · MPEP § 2106 · ${eligibility}`,
    ], [
      column("example", "USPTO Example 47", [
        row("asic", "Claim 1's specially arranged hardware recites no abstract idea. Name the chip type.", "ASIC", "application specific integrated circuit", "asic chip", "application specific integrated circuit chip"),
        row("training", "Claim 2's mathematical/mental operations on a generic computer fail practical-application and inventive-concept analysis. What method is it?", "Training method", "training", "neural network training", "ann training"),
        note(row("packets", "Claim 3 detects malicious packets and drops/blocks traffic, concretely improving ____.", "Network security", "security", "computer network security"),
          "It is eligible at Step 2A, Prong 2: the exception is integrated into a technical application. Anomaly detection alone is not the whole claimed improvement."),
      ]),
      column("keystone", "Keystone's Claim Analysis", [
        row("a", "Generic customer-data training and periodic retraining; high eligibility risk under Recentive. Which claim?", "Claim A", "a", "broad claim", "claim a broad"),
        row("b", "Specific importance scoring, freezing, compressed replay, and delta storage; the deck finds a model improvement at 2A-2. Which claim?", "Claim B", "b", "technique claim", "claim b the technique"),
        note(row("c", "GPU-and-memory system performing Claim B; the deck says it rises or falls with B. Which claim?", "Claim C", "c", "system claim", "claim c system"),
          "Adding generic GPUs is not an independent eligibility cure. B and C are plausible USPTO successes, with residual court risk. Put the actual technical mechanism in claims and explain it in the specification."),
      ]),
      column("drafting", "Drafting Tradeoffs", [
        note(row("mechanism", "To rescue 'do it with AI,' claim a specific technical ____ rather than only a desired outcome.", "Mechanism", "technical mechanism", "how", "specific technical improvement", "technical improvement"),
          "A network-security action may improve another technology; freeze-and-replay may improve AI itself. A proposed improvement still needs original disclosure, eligibility analysis, and commercial value."),
        note(row("scope", "Adding '97% retention' can strengthen specificity but narrow claim ____ and ease design-around.", "Scope", "claim scope", "coverage", "claim coverage"),
          "A number is not a magic eligibility requirement. Assess measurement/support, enablement, proof of infringement, and whether competitors can avoid the limitation."),
      ]),
    ]),

  drill("dental-monitoring", "Dental Monitoring: Why Dental AI Claims Failed",
    "The Federal Circuit affirmed § 101 ineligibility on July 7, 2026. Study its reasoning while preserving the opinion's limited precedential status.",
    "25–27, 30–31", [`Dental Monitoring v. Align · No. 24-2270, July 7, 2026, pp. 1, 9–13 · ${dentalMonitoring}`], [
      column("holding", "Holding and Drafting Lessons", [
        row("nonprecedential", "The official opinion labels this disposition ____; it is not binding Federal Circuit precedent.", "Nonprecedential", "non precedential", "not precedential", "not binding precedent"),
        row("images", "The claims analyzed dental-arch ____ to assess fit or guide image acquisition.", "Images", "image", "photographs", "photos", "dental images"),
        row("dataset", "Training on over 1,000 labeled images merely specified a training ____; that alone did not improve ML technology.", "Dataset", "data set", "training dataset", "training data", "subset of data"),
        row("claim", "The argument of superior precision failed because the alleged improvement was absent from the ____ language.", "Claim", "claims", "claim language", "claimed limitations"),
        row("generic", "The specifications admitted that available neural networks could perform the work, undermining an inventive concept. They described the model as ____.", "Generic", "conventional", "off the shelf", "well known", "widely available"),
        note(row("automation", "Greater speed or efficiency at the same human task is ____ alone to establish a technical improvement.", "Insufficient", "not enough", "inadequate", "insufficient by itself"),
          "A declaration cannot replace a missing claimed limitation or repair an unsupported specification. The dental-data limitation and generic implementation did not supply the claimed technological solution."),
      ]),
    ]),

  drill("evidence-institutions", "Eligibility Evidence and Institutional Risk",
    "Distinguish factual evidence, examination policy, court authority, and proposed legislation. Optional evidence does not guarantee allowance or validity.",
    "28–30, 43", [
      `USPTO · Rule 132 SMED guidance, September 29, 2026 (addendum to April 30 memorandum) · ${declarations}`,
      "In re Rudy, 956 F.3d 1379 (Fed. Cir. 2020) · courts do not defer to USPTO eligibility guidance",
      "Congress · S. 1546, Patent Eligibility Restoration Act of 2025 · https://www.congress.gov/bill/119th-congress/senate-bill/1546",
    ], [
      column("evidence", "Rule 132 Declarations", [
        row("rule", "An oath/declaration supplying evidence against an eligibility rejection uses which rule?", "Rule 132", "132", "37 cfr 1 132", "1 132", "subject matter eligibility declaration", "smed"),
        row("nexus", "Benchmarks must connect the asserted improvement to the claimed invention; name that connection.", "Nexus", "claim nexus", "nexus to the claims", "connection to the claims"),
        row("knowledge", "A signer such as an inventor or expert needs factual ____ of the improvement and comparisons.", "Knowledge", "factual knowledge", "personal knowledge", "knowledge of the facts"),
        note(row("new-matter", "A declaration may supply evidence but cannot add ____ to the application.", "New matter", "new subject matter", "unsupported new matter"),
          "The December 2025 practice is voluntary. April 30, 2026 best practices superseded the original practitioner memo; September 29 added a flowchart and further practices. Declarations should give objective support, not merely repeat legal conclusions."),
      ]),
      column("institutions", "Who Decides What?", [
        row("office", "The deck's warmer institution: Desjardins and eligibility declarations guide examination here.", "USPTO", "patent office", "us patent and trademark office", "united states patent and trademark office"),
        note(row("court", "Recentive and Dental Monitoring illustrate litigation risk in this specialized federal appellate court.", "Federal Circuit", "court of appeals for the federal circuit", "cafc", "fed cir"),
          "An issued patent is presumed valid, but issuance does not guarantee survival in court. USPTO guidance is examination policy and does not bind a court's interpretation of § 101."),
        note(row("pera", "The deck's S. 1546 proposal to change § 101 is the Patent Eligibility Restoration Act, abbreviated ____.", "PERA", "patent eligibility restoration act", "patent eligibility restoration act of 2025"),
          "This is a legislative proposal, not the governing eligibility test. The deck's risk assessment should not assume Congress will enact a rescue before a patent is challenged."),
      ]),
    ]),

  drill("novelty-obviousness", "Novelty, Obviousness, and Disclosure Timing",
    "Eligibility is one gate. Apply §§ 102–103 and evaluate whether a disclosure actually qualifies as prior art and whether a statutory exception applies.",
    "21–23, 33, 39–40", [
      `35 U.S.C. §§ 102–103 · ${patentStatutes}`,
      "KSR v. Teleflex, 550 U.S. 398 (2007) · predictable combinations and flexible obviousness inquiry",
      "EPO · limited Article 55 exceptions, no general inventor-publication grace period · https://link.epo.org/web/the_european_patent_system_and_the_grace_period_study_en.pdf",
    ], [
      column("requirements", "Prior Art and Combinations", [
        row("novelty", "Section 102 asks whether the claimed invention is new: ____.", "Novelty", "newness", "novel"),
        row("nonobviousness", "Section 103 asks whether the invention as a whole would have been obvious to the skilled person: ____.", "Nonobviousness", "non obviousness", "not obvious", "nonobvious"),
        note(row("ksr", "Which Supreme Court case rejects a rigid teaching/suggestion/motivation test and permits common-sense analysis of predictable combinations?", "KSR v. Teleflex", "ksr", "ksr international v teleflex", "teleflex"),
          "Known importance scoring, replay, and low-rank adapters may create a combination argument. Keystone points to unexpected retention/storage results tied to the claimed combination; those results are evidence, not automatic patentability."),
        row("unexpected", "Better-than-predicted benchmarks may rebut obviousness as ____ results.", "Unexpected", "unexpected results", "unanticipated", "surprising results"),
      ]),
      column("timing", "Section 102 Details", [
        note(row("year", "The U.S. § 102(b)(1) exception can protect qualifying inventor-originated disclosures made no more than ____ before filing.", "One year", "1 year", "a year", "12 months", "twelve months"),
          "It is not a universal extension against every intervening disclosure. § 102(b)(1)(B) and (b)(2)(B) concern previously publicly disclosed subject matter; § 102(b)(2) also covers derivation and qualifying common ownership."),
        note(row("first", "The practical order for the conference paper/arXiv posting is file ____ and publish second.", "First", "file first", "before publication", "before publishing", "before the paper"),
          "A voluntary prefiling arXiv post can destroy European novelty. Article 55 has narrow abuse/exhibition exceptions, not a general U.S.-style grace period. Publicly accessible preprints, code, talks, and launches may be prior art depending on their disclosure and dates."),
        note(row("jra", "Section 102(c) can treat qualifying research partners as a common owner under a written joint ____ agreement.", "Research", "joint research", "joint research agreement", "research agreement", "jra"),
          "The agreement must exist by the effective filing date, the invention must arise within its scope, and the application must identify the parties. This supports the § 102(b)(2)(C) exception, not blanket immunity from public prior art."),
        note(row("priority", "Under § 102(d), an earlier patent reference may count from its earliest qualifying ____ date that supports the subject matter.", "Priority", "effective filing", "earliest effective filing", "earliest priority", "priority filing"),
          "A supporting provisional can matter once the reference qualifies under § 102(a)(2). Do not use the later publication date automatically or assume every provisional supports every later disclosure."),
      ]),
    ]),

  drill("section112", "Section 112: Describe, Enable, and Define",
    "The specification must support the invention actually claimed. Broad functional results do not remove the need to disclose how the invention works.",
    "21, 34, 38–39", [
      `35 U.S.C. § 112 · ${patentStatutes}`,
      "Amgen v. Sanofi, 598 U.S. 594 (2023) · https://www.supremecourt.gov/opinions/22pdf/21-757_2d8f.pdf",
      "Williamson v. Citrix, 792 F.3d 1339 (Fed. Cir. 2015) · https://www.cafc.uscourts.gov/opinions-orders/13-1130.opinion.6-11-2015.1.pdf",
    ], [
      column("requirements", "Disclosure and Claim Boundaries", [
        row("description", "Section 112(a)'s account showing possession of the invention is a written ____.", "Description", "written description", "description of the invention"),
        row("enablement", "Teaching a skilled person to make and use the invention without undue experimentation satisfies ____.", "Enablement", "enabling disclosure", "enable", "enable the invention"),
        row("scope", "Amgen: the disclosure must enable the ____ scope of the claimed invention.", "Full", "full scope", "entire", "entire scope", "whole"),
        row("amgen", "Which 2023 Supreme Court case rejected broad antibody claims supported by limited examples and a trial-and-error roadmap?", "Amgen v. Sanofi", "amgen", "amgen v sanofi", "sanofi"),
        note(row("williamson", "Which Federal Circuit case treated a functional 'distributed learning control module' under § 112(f) and found the required algorithm missing?", "Williamson v. Citrix", "williamson", "williamson v citrix online", "citrix"),
          "A nonce word such as 'module' may invoke means-plus-function treatment when it supplies no sufficiently definite structure. That is a claim-construction inquiry, not an automatic rule that every neural-network module is indefinite."),
        row("definiteness", "Section 112(b) requires reasonably certain claim boundaries: ____.", "Definiteness", "definite claims", "definite", "claim definiteness"),
      ]),
      column("application", "Keystone's Disclosure Bargain", [
        row("formula", "To support Claim B's importance-scoring mechanism, disclose the scoring ____ and how the threshold is chosen.", "Formula", "scoring formula", "importance scoring formula", "algorithm"),
        note(row("secrecy", "Disclosing the operative method helps §§ 101/112 but sacrifices ____ for the disclosed information.", "Secrecy", "confidentiality", "trade secret protection", "trade secrecy"),
          "Disclose the replay compression and supporting benchmarks too. The deck proposes keeping data, weights, and thresholds secret; a hybrid may keep only details that are not required for adequate description, enablement, and best-mode disclosure. A necessary threshold-selection method cannot simply be withheld."),
      ]),
    ]),

  drill("enforcement", "Enforcement: Detect It, Attribute It, Locate It",
    "Keystone's training runs inside servers. A useful patent needs provable infringement as well as patentability.",
    "5, 35, 38–39, 43", [
      `35 U.S.C. § 271(a) · ${patentStatutes}`,
      "Akamai v. Limelight · en banc, August 2015 · https://www.cafc.uscourts.gov/opinions-orders/9-1372.opinion.8-11-2015.1.pdf",
      "Fed. R. Civ. P. 11(b)(3) · factual support following reasonable inquiry, including specifically identified likely support after discovery",
    ], [
      column("questions", "Four Enforcement Questions", [
        note(row("detectability", "Can outside evidence establish that the hidden training method is being used? Name this practical problem.", "Detectability", "detection", "detecting infringement", "proof of infringement", "observability"),
          "Look for product documentation, adapter sizes, API behavior, and available code. Rule 11 requires a reasonable prefiling inquiry; allegations specifically identified as likely to gain evidentiary support after discovery are permitted. Discovery is not a substitute for any factual basis."),
        row("single", "For direct method infringement, all steps must be performed by or legally attributable to a ____ entity.", "Single", "one", "single entity", "one entity", "single actor", "one actor"),
        note(row("divided", "Customers perform some steps while Brightline performs others: a potential ____ infringement issue.", "Divided", "divided infringement", "joint infringement", "multiple actor"),
          "Akamai permits attribution through direction/control or joint enterprise. Conditioning participation or a benefit on performance and setting manner/timing can establish direction/control. Dividing steps does not automatically avoid infringement."),
        note(row("territory", "For domestic direct infringement of a method under § 271(a), every step must occur within the ____.", "United States", "us", "u s", "usa", "u s a"),
          "Offshore training can create a method-claim territorial gap even if outputs reach U.S. users. Other statutory theories require their own facts and analysis; serving U.S. customers alone does not perform every training step domestically."),
        note(row("system", "Claim C illustrates this claim form, which may reach an actor making or using the claimed arrangement.", "System", "system claim", "apparatus", "apparatus claim", "machine claim"),
          "The deck also suggests computer-readable-medium claims. Each form requires proof of all limitations and the relevant territorial act; changing the label does not automatically create infringement."),
        row("observable", "Improve practical proof by claiming externally ____ features such as delta-adapter artifacts.", "Observable", "detectable", "visible", "externally observable", "externally detectable"),
      ]),
    ]),

  drill("patent-or-secret", "Patent, Trade Secret, or a Hybrid?",
    "Compare the tools before publishing the paper. Distinguish normal utility-patent timing from exceptions and trade-secret protection from ownership of an idea.",
    "2, 5, 34, 36, 38–40, 43", [
      `35 U.S.C. §§ 122 and 154 · ${patentStatutes}`,
      "USPTO · trade-secret policy · https://www.uspto.gov/ip-policy/trade-secret-policy",
      "Apache Software Foundation · Apache License 2.0, § 3 patent grant · https://www.apache.org/licenses/LICENSE-2.0",
    ], [
      column("comparison", "Protection Tradeoffs", [
        note(row("publication", "A nonprovisional U.S. application normally publishes this many months from the earliest benefit/priority date.", "18 months", "18", "eighteen months"),
          "The slide's 'public at 18 months' is the usual rule, not universal: exceptions include qualifying nonpublication requests. A provisional alone is not published as a nonprovisional application."),
        note(row("term", "The ordinary utility-patent term generally ends this many years from the relevant nonprovisional filing date.", "20 years", "20", "twenty years"),
          "Priority/benefit rules, term adjustments/extensions, disclaimers, and maintenance can affect the result. A provisional's filing date normally does not start this twenty-year term."),
        row("duration", "Trade-secret protection may last as long as the information retains qualifying ____ and safeguards.", "Secrecy", "secret status", "confidentiality", "trade secrecy"),
        note(row("independent", "A trade secret does not block a rival's proper ____ invention, while a patent may reach independently developed activity within its claims.", "Independent", "independent invention", "independent development", "independently developed"),
          "A patent requires infringement and survives only if valid/enforceable. A trade secret requires qualifying information, reasonable protective measures, and misappropriation; it is not a monopoly against proper development or reverse engineering."),
        row("misappropriation", "Instead of patent infringement, a trade-secret plaintiff must prove improper acquisition, use, or disclosure: ____.", "Misappropriation", "trade secret misappropriation", "misappropriating"),
        note(row("hybrid", "Patent the adequately disclosed method while retaining qualifying undisclosed data/know-how: a ____ strategy.", "Hybrid", "hybrid strategy", "patent and trade secret", "patent plus trade secret"),
          "Do not publish details intended to remain secret or withhold material § 112 requires. Assess what the consumer chatbot retained, who could access it, contractual terms, and remediation; pasting into a chatbot is a confidentiality issue requiring facts, not automatic proof of public disclosure."),
        note(row("apache", "Changed fact D: open-sourcing under Apache 2.0 calls for review of § 3's contributor patent ____.", "Grant", "patent grant", "patent license", "license grant", "licence grant"),
          "Apache 2.0 licenses necessarily infringed contributor patent claims within its scope. Publishing also removes secrecy for disclosed material. Open source does not automatically invalidate every patent; reassess exclusivity, licensing goals, and retained secrets."),
      ]),
    ]),

  drill("board-call", "Keystone's Go/No-Go and Changed Facts",
    "Give the class's proposed recommendation with concrete conditions. Changed facts require a fresh application of the relevant step, not memorizing a universal launch answer.",
    "5, 30–31, 38–43", [
      "Course hypothetical · Keystone's six-row scorecard and five-condition board memo",
      `35 U.S.C. §§ 102, 111, and 112 · ${patentStatutes}`,
      `USPTO · revised inventorship guidance · ${inventorship}`,
    ], [
      column("conditions", "The Board Memo", [
        row("call", "The deck's overall recommendation for filing on TetherTune is ____.", "Go with conditions", "conditional go", "go subject to conditions", "go with five conditions"),
        note(row("provisional", "Before the paper, the memo recommends filing this U.S. application on supported Claims B and C.", "Provisional", "provisional application", "us provisional", "u s provisional", "provisional patent application"),
          "A provisional secures priority only for adequately disclosed subject matter; it is not an issued patent or permission to skip § 112. Drop generic Claim A, consider observable-feature claims, name Priya/Ito, obtain Ito's assignment, and preserve conception evidence."),
        row("pct", "After the first filing, decide on a PCT application within this priority period.", "12 months", "12", "twelve months", "one year", "1 year"),
        note(row("policy", "The fifth condition responds to Priya's consumer-chatbot disclosure: adopt an AI-tool ____ and assess exposure.", "Policy", "ai tool policy", "ai use policy", "ai policy"),
          "The memo's secrecy condition covers data/weights and other know-how only when consistent with the patent's disclosure duties. The scorecard rates hidden infringement as high risk and proposes observable features/system claims as mitigation."),
      ]),
      column("changes", "What Changes the Call?", [
        note(row("four-months", "Changed fact B: the inventor's arXiv post is four months old. U.S. rights may remain under the one-year exception, but ordinary European rights face loss of ____.", "Novelty", "novelty rights", "absolute novelty", "european novelty"),
          "File promptly and analyze the exact disclosed subject matter and dates. The U.S. exception does not restore ordinary European novelty or excuse unrelated third-party prior art."),
        row("fraud", "Changed fact C: the only claim uses a trained model to flag insurance fraud. The threatened gate is § 101 ____.", "Eligibility", "subject matter eligibility", "patent eligibility", "abstract idea", "abstractness"),
        note(row("brightline", "The memo flips toward no-go if Brightline disclosed the claimed technique ____ than Keystone's effective filing date, with no applicable exception.", "Earlier", "first", "before", "previously", "prior"),
          "A broad rival product announcement is not automatically an anticipating disclosure of this method. Search what Brightline actually disclosed/filed and compare claim limitations, dates, and exceptions."),
        row("funding", "Even a patentable invention may become a no-go if the board will not fund ____ against infringement.", "Enforcement", "litigation", "patent enforcement", "lawsuits", "enforcing the patent"),
        note(row("secret-only", "If leadership cancels publication and the invention can stay confidential, the memo says trade secret ____ may be preferable.", "Alone", "only", "trade secret alone", "trade secret only", "secrecy alone"),
          "The decision depends on detectability, value, cost, remaining secrecy, and business goals. Finish the board pitch with the call, decisive authority/application, remaining uncertainty, and mitigations assigned to owners and dates."),
      ]),
    ]),
];
