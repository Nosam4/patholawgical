import { professionalResponsibilitySources } from "./professionalResponsibilitySources.js";
import { readableFlowchartLayout } from "./flowchartLayout.js";

const ABA_MODEL_RULES_URL =
  "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/model_rules_of_professional_conduct_table_of_contents/";

const SOURCE_LABEL = "ABA Model Rules of Professional Conduct";

function ruleKey(ruleNumber) {
  return String(ruleNumber).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

function ruleGrid(ruleNumber, title, columnDefinitions, prompt) {
  const key = ruleKey(ruleNumber);

  return {
    id: `pr-rule-${key}`,
    type: "sporcle-grid",
    title: `Rule ${ruleNumber}: ${title}`,
    prompt: prompt ?? `Use the labels as clues and recall the core requirements of Model Rule ${ruleNumber}.`,
    sourceUrl: professionalResponsibilitySources[ruleNumber] ?? ABA_MODEL_RULES_URL,
    sourceLabel: SOURCE_LABEL,
    columns: columnDefinitions.map((column, columnIndex) => ({
      id: `pr-${key}-column-${columnIndex + 1}`,
      title: column.title,
      ...(column.mnemonic ? { mnemonic: column.mnemonic } : {}),
      answers: column.items.map((item, answerIndex) => {
        const [answer, acceptedAnswers = [], indicator = null] = typeof item === "string"
          ? [item]
          : item;

        return {
          id: `pr-${key}-${columnIndex + 1}-${answerIndex + 1}`,
          answer,
          acceptedAnswers,
          ...(indicator ? { indicator } : {}),
        };
      }),
    })),
  };
}

function quizNode(id, x, y, width, height, answer, options = {}) {
  return {
    id,
    x,
    y,
    width,
    height,
    answer,
    acceptedAnswers: options.acceptedAnswers ?? [],
    clue: options.clue,
    kind: options.kind ?? "note",
  };
}

function staticNode(id, x, y, width, height, label, kind = "rule") {
  return { id, x, y, width, height, label, kind, quiz: false };
}

function ruleFlow(ruleNumber, title, prompt, width, height, nodes, arrows) {
  const key = ruleKey(ruleNumber);
  const prefix = `pr-${key}-`;
  const layout = readableFlowchartLayout(nodes);

  return {
    id: `pr-rule-${key}`,
    type: "flowchart",
    title: `Rule ${ruleNumber}: ${title}`,
    prompt,
    sourceUrl: professionalResponsibilitySources[ruleNumber] ?? ABA_MODEL_RULES_URL,
    sourceLabel: SOURCE_LABEL,
    width,
    height: Math.max(height, layout.height),
    avoidNodes: true,
    nodes: layout.nodes.map((node) => ({ ...node, id: `${prefix}${node.id}` })),
    arrows: arrows.map((arrow) => ({
      ...arrow,
      ...(arrow.id ? { id: `${prefix}${arrow.id}` } : {}),
      ...(arrow.from ? { from: `${prefix}${arrow.from}` } : {}),
      ...(arrow.to ? { to: `${prefix}${arrow.to}` } : {}),
    })),
  };
}

const conflictsOverview = ruleFlow(
  "1.7–1.18",
  "Conflicts Big Picture",
  "Identify which conflict rule governs before applying its detailed test.",
  1060,
  560,
  [
    staticNode("conflict-root", 410, 20, 240, 70, "Conflict of interest"),
    quizNode("current", 40, 150, 180, 95, "Rule 1.7: current clients", { acceptedAnswers: ["current client conflicts", "rule 1.7"], clue: "Concurrent conflict", kind: "decision" }),
    quizNode("specific", 240, 150, 180, 95, "Rule 1.8: specific current-client conflicts", { acceptedAnswers: ["specific conflicts", "rule 1.8"], clue: "Special transactions", kind: "decision" }),
    quizNode("former", 440, 150, 180, 95, "Rule 1.9: former clients", { acceptedAnswers: ["former client conflicts", "rule 1.9"], clue: "Prior representation", kind: "decision" }),
    quizNode("imputation", 640, 150, 180, 95, "Rule 1.10: imputation", { acceptedAnswers: ["imputed conflicts", "rule 1.10"], clue: "Firm-wide effect", kind: "decision" }),
    quizNode("prospective", 840, 150, 180, 95, "Rule 1.18: prospective clients", { acceptedAnswers: ["prospective client conflicts", "rule 1.18"], clue: "Consultation", kind: "decision" }),
    quizNode("waiver", 40, 350, 280, 100, "competence, legality, no opposing clients in one proceeding, and informed written consent", { acceptedAnswers: ["rule 1.7 b waiver requirements", "informed consent confirmed in writing"], clue: "General waiver — Rule 1.7(b)", kind: "exception" }),
    quizNode("personal", 390, 350, 280, 100, "a purely personal-interest conflict ordinarily is not imputed without a significant material-limitation risk", { acceptedAnswers: ["personal interest conflict not imputed", "personal conflicts ordinarily do not impute"], clue: "Imputation exception", kind: "exception" }),
    quizNode("screening", 740, 350, 280, 100, "timely screening, no fee, and prompt written notice", { acceptedAnswers: ["screen no fee written notice", "screening no fee and notice"], clue: "Screening pattern", kind: "exception" }),
  ],
  [
    ...["current", "specific", "former", "imputation", "prospective"].map((to) => ({ from: "conflict-root", to, fromAnchor: "bottom", toAnchor: "top" })),
    { from: "current", to: "waiver", fromAnchor: "bottom", toAnchor: "top" },
    { from: "imputation", to: "personal", fromAnchor: "bottom", toAnchor: "top" },
    { from: "prospective", to: "screening", fromAnchor: "bottom", toAnchor: "top" },
  ],
);

const rule17 = ruleFlow(
  "1.7",
  "Conflict of Interest: Current Clients",
  "Work from conflict identification through consentability and informed consent.",
  1060,
  730,
  [
    staticNode("start", 390, 20, 280, 70, "Proposed or continuing representation"),
    quizNode("direct", 90, 150, 330, 90, "representation is directly adverse to another current client", { acceptedAnswers: ["direct adversity", "directly adverse current clients"], clue: "Rule 1.7(a)(1)", kind: "decision" }),
    quizNode("limited", 640, 150, 330, 90, "significant risk the representation will be materially limited", { acceptedAnswers: ["material limitation", "significant risk of material limitation"], clue: "Rule 1.7(a)(2)", kind: "decision" }),
    quizNode("conflict", 390, 300, 280, 75, "a concurrent conflict exists", { acceptedAnswers: ["concurrent conflict", "conflict"], clue: "If either branch is true", kind: "outcome" }),
    quizNode("belief", 40, 460, 220, 95, "lawyer reasonably believes competent and diligent representation is possible", { acceptedAnswers: ["reasonable belief in competent diligent representation"], clue: "Rule 1.7(b)(1)", kind: "exception" }),
    quizNode("law", 290, 460, 220, 95, "representation is not prohibited by law", { acceptedAnswers: ["not prohibited by law"], clue: "Rule 1.7(b)(2)", kind: "exception" }),
    quizNode("same-case", 540, 460, 220, 95, "no claim by one represented client against another in the same proceeding", { acceptedAnswers: ["no opposing represented clients in same case", "not adverse clients in same litigation"], clue: "Rule 1.7(b)(3)", kind: "exception" }),
    quizNode("consent", 790, 460, 220, 95, "each affected client gives informed consent confirmed in writing", { acceptedAnswers: ["informed consent confirmed in writing", "written informed consent"], clue: "Rule 1.7(b)(4)", kind: "exception" }),
    quizNode("permitted", 220, 625, 260, 75, "representation is permitted", { acceptedAnswers: ["may represent", "permitted"], clue: "All four satisfied", kind: "outcome" }),
    quizNode("barred", 580, 625, 260, 75, "representation is prohibited", { acceptedAnswers: ["may not represent", "prohibited"], clue: "Any requirement fails", kind: "outcome" }),
  ],
  [
    { from: "start", to: "direct", fromAnchor: "bottom", toAnchor: "top" },
    { from: "start", to: "limited", fromAnchor: "bottom", toAnchor: "top", label: "or" },
    { from: "direct", to: "conflict", fromAnchor: "bottom", toAnchor: "top", label: "Yes" },
    { from: "limited", to: "conflict", fromAnchor: "bottom", toAnchor: "top", label: "Yes" },
    ...["belief", "law", "same-case", "consent"].map((to) => ({ from: "conflict", to, fromAnchor: "bottom", toAnchor: "top" })),
    { from: "belief", to: "permitted", fromAnchor: "bottom", toAnchor: "top", label: "All four" },
    { from: "consent", to: "barred", fromAnchor: "bottom", toAnchor: "top", label: "Any fails" },
  ],
);

const rule19 = ruleFlow(
  "1.9",
  "Duties to Former Clients",
  "Distinguish a lawyer's former client, a former firm's client, and continuing information duties.",
  1040,
  650,
  [
    staticNode("start", 390, 20, 260, 70, "Former-client problem"),
    quizNode("own-client", 80, 150, 260, 90, "the lawyer formerly represented the client", { acceptedAnswers: ["lawyers own former client"], clue: "Rule 1.9(a)", kind: "decision" }),
    quizNode("firm-client", 700, 150, 260, 90, "the lawyer's former firm represented the client", { acceptedAnswers: ["former firms client"], clue: "Rule 1.9(b)", kind: "decision" }),
    quizNode("same-matter", 80, 310, 260, 90, "same or substantially related matter with materially adverse interests", { acceptedAnswers: ["same substantially related materially adverse"], clue: "Rule 1.9(a)", kind: "decision" }),
    quizNode("material-info", 700, 310, 260, 90, "same or substantially related matter, materially adverse interests, and material protected information acquired by the lawyer", { acceptedAnswers: ["same or related matter adverse interests and material protected information", "same substantially related materially adverse material information"], clue: "Rule 1.9(b)", kind: "decision" }),
    quizNode("consent", 390, 450, 260, 85, "former client gives informed consent confirmed in writing", { acceptedAnswers: ["written informed consent", "informed consent confirmed in writing"], clue: "Exception", kind: "exception" }),
    quizNode("information", 40, 550, 440, 75, "do not use information to the former client's disadvantage unless permitted or generally known", { acceptedAnswers: ["do not use former client information", "no disadvantageous use"], clue: "Rule 1.9(c)(1)", kind: "outcome" }),
    quizNode("reveal", 560, 550, 440, 75, "do not reveal information except as the Rules permit or require", { acceptedAnswers: ["do not reveal former client information", "no revelation"], clue: "Rule 1.9(c)(2)", kind: "outcome" }),
  ],
  [
    { from: "start", to: "own-client" }, { from: "start", to: "firm-client" },
    { from: "own-client", to: "same-matter" }, { from: "firm-client", to: "material-info" },
    { from: "same-matter", to: "consent" }, { from: "material-info", to: "consent" },
    { from: "consent", to: "information" }, { from: "consent", to: "reveal" },
  ],
);

const rule110 = ruleFlow(
  "1.10",
  "Imputation of Conflicts of Interest",
  "Determine when one lawyer's Rule 1.7 or 1.9 conflict disqualifies the firm and when an exception applies.",
  1080,
  720,
  [
    staticNode("start", 410, 20, 260, 70, "A lawyer in the firm is conflicted"),
    quizNode("default", 390, 130, 300, 85, "the conflict is ordinarily imputed to every lawyer in the firm", { acceptedAnswers: ["conflict imputed to firm", "firm is disqualified"], clue: "Rule 1.10(a)", kind: "outcome" }),
    quizNode("personal", 40, 300, 300, 95, "conflict is based on the disqualified lawyer's personal interest", { acceptedAnswers: ["personal interest conflict"], clue: "Exception one", kind: "decision" }),
    quizNode("risk", 40, 460, 300, 95, "no significant risk of materially limiting the remaining lawyers", { acceptedAnswers: ["no material limitation risk"], clue: "Rule 1.10(a)(1)", kind: "exception" }),
    quizNode("prior-firm", 390, 300, 300, 95, "Rule 1.9 conflict arose from association with a prior firm", { acceptedAnswers: ["prior firm rule 1.9 conflict"], clue: "Exception two", kind: "decision" }),
    quizNode("screen", 390, 460, 300, 95, "timely screen the lawyer and give no part of the fee", { acceptedAnswers: ["timely screening and no fee", "screened with no fee"], clue: "Rule 1.10(a)(2)(i)", kind: "exception" }),
    quizNode("notice", 740, 460, 300, 95, "promptly give the former client detailed written notice and compliance certifications", { acceptedAnswers: ["written notice and certifications", "prompt notice to former client"], clue: "Rules 1.10(a)(2)(ii)–(iii)", kind: "exception" }),
    quizNode("departed", 740, 300, 300, 95, "after a lawyer leaves, the firm is barred only if the matter is substantially related and a remaining lawyer has material protected information", { acceptedAnswers: ["substantially related and remaining lawyer has material information"], clue: "Rule 1.10(b)", kind: "decision" }),
    quizNode("waiver", 390, 620, 300, 70, "affected client may waive under Rule 1.7", { acceptedAnswers: ["waiver under rule 1.7", "client waiver"], clue: "Rule 1.10(c)", kind: "outcome" }),
  ],
  [
    { from: "start", to: "default" },
    { from: "default", to: "personal" }, { from: "default", to: "prior-firm" }, { from: "default", to: "departed" },
    { from: "personal", to: "risk" }, { from: "prior-firm", to: "screen" }, { from: "screen", to: "notice" },
    { from: "risk", to: "waiver" }, { from: "notice", to: "waiver" }, { from: "departed", to: "waiver" },
  ],
);

const rule116 = ruleFlow(
  "1.16",
  "Declining or Terminating Representation",
  "Sort mandatory withdrawal, permissive withdrawal, tribunal control, and exit duties.",
  1080,
  1160,
  [
    staticNode("start", 410, 20, 260, 70, "Should the lawyer withdraw?"),
    quizNode("mandatory", 120, 130, 300, 75, "withdrawal is mandatory", { acceptedAnswers: ["must withdraw"], clue: "Rule 1.16(a)", kind: "decision" }),
    quizNode("permissive", 660, 130, 300, 75, "withdrawal is permissive", { acceptedAnswers: ["may withdraw"], clue: "Rule 1.16(b)", kind: "decision" }),
    quizNode("violation", 20, 260, 230, 90, "representation will violate the Rules or other law", { acceptedAnswers: ["violates rules or law"], clue: "Mandatory", kind: "note" }),
    quizNode("impairment", 280, 260, 230, 90, "physical or mental condition materially impairs representation", { acceptedAnswers: ["material physical or mental impairment"], clue: "Mandatory", kind: "note" }),
    quizNode("discharged", 20, 390, 230, 90, "the lawyer is discharged", { acceptedAnswers: ["client fires lawyer", "discharged"], clue: "Mandatory", kind: "note" }),
    quizNode("crime", 280, 390, 230, 90, "client seeks to use the lawyer's services for crime or fraud despite counseling", { acceptedAnswers: ["client seeks lawyer services for crime or fraud"], clue: "Mandatory", kind: "note" }),
    quizNode("no-harm", 560, 260, 230, 90, "withdrawal can occur without material adverse effect", { acceptedAnswers: ["no material adverse effect"], clue: "Permissive", kind: "note" }),
    quizNode("misuse", 820, 260, 230, 90, "client persists in crime, fraud, repugnant action, or misuse of services", { acceptedAnswers: ["client crime fraud or repugnant conduct"], clue: "Permissive", kind: "note" }),
    quizNode("burden", 560, 390, 230, 115, "substantial failure of an obligation regarding the lawyer's services after reasonable warning of withdrawal", { acceptedAnswers: ["substantial failure after reasonable warning", "substantial breach and reasonable warning"], clue: "Permissive", kind: "note" }),
    quizNode("financial-burden", 820, 520, 230, 100, "unreasonable financial burden or representation made unreasonably difficult by the client", { acceptedAnswers: ["unreasonable financial burden or client makes representation unreasonably difficult"], clue: "Rule 1.16(b)(6)", kind: "note" }),
    quizNode("good-cause", 820, 390, 230, 90, "other good cause exists", { acceptedAnswers: ["good cause"], clue: "Permissive", kind: "note" }),
    quizNode("tribunal", 170, 700, 320, 110, "obtain required tribunal permission or give required notice; continue if ordered", { acceptedAnswers: ["tribunal notice or permission and continue if ordered"], clue: "Rule 1.16(c)", kind: "exception" }),
    quizNode("protect", 590, 850, 320, 90, "protect the client's interests on termination", { acceptedAnswers: ["protect client interests", "reasonable steps to protect client"], clue: "Rule 1.16(d)", kind: "outcome" }),
    quizNode("exit", 380, 990, 320, 130, "reasonable notice, time for new counsel, client papers and property, and refund of unearned fees or unused expenses", { acceptedAnswers: ["notice new counsel papers property refund fees and expenses"], clue: "Exit duties", kind: "outcome" }),
  ],
  [
    { from: "start", to: "mandatory" }, { from: "start", to: "permissive" },
    ...["violation", "impairment", "discharged", "crime"].map((to) => ({ from: "mandatory", to })),
    ...["no-harm", "misuse", "burden", "financial-burden", "good-cause"].map((to) => ({ from: "permissive", to })),
    { from: "mandatory", to: "tribunal" }, { from: "permissive", to: "tribunal" },
    { from: "tribunal", to: "protect" },
    { from: "tribunal", to: "exit" }, { from: "protect", to: "exit" },
  ],
);

const rule118 = ruleFlow(
  "1.18",
  "Duties to Prospective Client",
  "Identify a prospective client, the information duties owed, and the consent or screening routes around disqualification.",
  1040,
  680,
  [
    staticNode("start", 390, 20, 260, 70, "Person consults about possible representation"),
    quizNode("prospective", 390, 130, 260, 80, "the person is a prospective client", { acceptedAnswers: ["prospective client"], clue: "Rule 1.18(a)", kind: "decision" }),
    quizNode("information", 80, 270, 300, 90, "do not use or reveal learned information as Rule 1.9 would protect it", { acceptedAnswers: ["do not use or reveal prospective client information"], clue: "Rule 1.18(b)", kind: "outcome" }),
    quizNode("harmful", 660, 270, 300, 90, "same or substantially related matter, materially adverse interests, and potentially significantly harmful information", { acceptedAnswers: ["same related materially adverse significantly harmful information"], clue: "Rule 1.18(c)", kind: "decision" }),
    quizNode("consent", 80, 450, 300, 95, "affected client and prospective client give informed consent confirmed in writing", { acceptedAnswers: ["both clients give written informed consent"], clue: "Rule 1.18(d)(1)", kind: "exception" }),
    quizNode("reasonable", 400, 450, 260, 95, "lawyer took reasonable measures to avoid unnecessary disqualifying information", { acceptedAnswers: ["reasonable measures to limit information"], clue: "Rule 1.18(d)(2)", kind: "exception" }),
    quizNode("screen", 680, 450, 280, 95, "lawyer is timely screened, receives no fee, and prospective client gets prompt written notice", { acceptedAnswers: ["screen no fee prompt written notice"], clue: "Rule 1.18(d)(2)", kind: "exception" }),
    quizNode("allowed", 390, 590, 260, 70, "representation may proceed", { acceptedAnswers: ["representation permitted", "may represent"], clue: "Exception satisfied", kind: "outcome" }),
  ],
  [
    { from: "start", to: "prospective" }, { from: "prospective", to: "information" }, { from: "prospective", to: "harmful" },
    { from: "harmful", to: "consent" }, { from: "harmful", to: "reasonable" }, { from: "reasonable", to: "screen" },
    { from: "consent", to: "allowed" }, { from: "screen", to: "allowed" },
  ],
);

const rule33 = ruleFlow(
  "3.3",
  "Candor Toward the Tribunal",
  "Recall the lawyer's duties when statements, authority, evidence, or client fraud threaten the tribunal's truth-seeking function.",
  1080,
  700,
  [
    staticNode("start", 410, 20, 260, 70, "Lawyer appears before a tribunal"),
    quizNode("false-law", 30, 150, 240, 95, "do not knowingly make a false statement of fact or law, and correct prior material false statements", { acceptedAnswers: ["no false statements and correct prior false statements"], clue: "Rule 3.3(a)(1)", kind: "decision" }),
    quizNode("authority", 290, 150, 240, 95, "disclose controlling adverse authority not disclosed by opposing counsel", { acceptedAnswers: ["disclose controlling adverse authority"], clue: "Rule 3.3(a)(2)", kind: "decision" }),
    quizNode("evidence", 550, 150, 240, 95, "do not offer evidence known to be false", { acceptedAnswers: ["do not offer false evidence"], clue: "Rule 3.3(a)(3)", kind: "decision" }),
    quizNode("crime-fraud", 810, 150, 240, 95, "take reasonable remedial measures when a person has engaged or will engage in crime or fraud related to the proceeding", { acceptedAnswers: ["remedy crime or fraud related to proceeding"], clue: "Rule 3.3(b)", kind: "decision" }),
    quizNode("remonstrate", 160, 340, 300, 90, "first remonstrate with the client and seek cooperation", { acceptedAnswers: ["remonstrate with client", "ask client to correct"], clue: "Remedial sequence", kind: "note" }),
    quizNode("withdraw", 390, 470, 300, 90, "seek withdrawal if necessary and permitted", { acceptedAnswers: ["seek withdrawal"], clue: "Remedial sequence", kind: "note" }),
    quizNode("disclose", 620, 340, 300, 90, "disclose to the tribunal if necessary, even if Rule 1.6 otherwise applies", { acceptedAnswers: ["disclose to tribunal even despite confidentiality"], clue: "Rules 3.3(a)(3), (b), and (c)", kind: "outcome" }),
    quizNode("duration", 390, 610, 300, 70, "duties continue to the conclusion of the proceeding", { acceptedAnswers: ["continue through conclusion of proceeding"], clue: "Rule 3.3(c)", kind: "outcome" }),
  ],
  [
    ...["false-law", "authority", "evidence", "crime-fraud"].map((to) => ({ from: "start", to })),
    { from: "evidence", to: "remonstrate" }, { from: "crime-fraud", to: "disclose" },
    { from: "remonstrate", to: "withdraw" }, { from: "withdraw", to: "disclose" }, { from: "disclose", to: "duration" },
  ],
);

const rule42 = ruleFlow(
  "4.2",
  "Communication with Person Represented by Counsel",
  "Apply the no-contact rule and its consent, law, and court-order exceptions.",
  980,
  610,
  [
    staticNode("start", 350, 20, 280, 70, "Lawyer wants to communicate about a matter"),
    quizNode("knowledge", 350, 130, 280, 80, "lawyer knows the person is represented in the matter", { acceptedAnswers: ["knows person is represented"], clue: "Knowledge", kind: "decision" }),
    quizNode("about", 350, 260, 280, 80, "communication concerns the subject of the representation", { acceptedAnswers: ["about subject of representation"], clue: "Scope", kind: "decision" }),
    quizNode("consent", 30, 400, 260, 90, "the other lawyer consents", { acceptedAnswers: ["consent of other lawyer"], clue: "Exception", kind: "exception" }),
    quizNode("law", 360, 400, 260, 90, "communication is authorized by law", { acceptedAnswers: ["authorized by law"], clue: "Exception", kind: "exception" }),
    quizNode("court", 690, 400, 260, 90, "communication is authorized by court order", { acceptedAnswers: ["authorized by court order"], clue: "Exception", kind: "exception" }),
    quizNode("barred", 190, 535, 260, 60, "direct communication is prohibited", { acceptedAnswers: ["no contact", "communication prohibited"], clue: "No exception", kind: "outcome" }),
    quizNode("allowed", 530, 535, 260, 60, "communication is permitted", { acceptedAnswers: ["contact allowed", "communication permitted"], clue: "Exception applies", kind: "outcome" }),
  ],
  [
    { from: "start", to: "knowledge" }, { from: "knowledge", to: "about", label: "Yes" },
    ...["consent", "law", "court"].map((to) => ({ from: "about", to })),
    { from: "about", to: "barred", label: "No exception" },
    { from: "consent", to: "allowed" }, { from: "law", to: "allowed" }, { from: "court", to: "allowed" },
  ],
);

const rule51 = ruleFlow(
  "5.1",
  "Responsibilities of Partners, Managers, and Supervisory Lawyers",
  "Separate system-wide duties, direct supervision, and responsibility for another lawyer's violation.",
  1040,
  650,
  [
    staticNode("start", 390, 20, 260, 70, "Lawyers work in a firm"),
    quizNode("systems", 40, 150, 280, 95, "partners and managers make reasonable efforts to ensure firm-wide compliance systems", { acceptedAnswers: ["reasonable firm compliance measures"], clue: "Rule 5.1(a)", kind: "decision" }),
    quizNode("supervise", 380, 150, 280, 95, "a direct supervisor makes reasonable efforts to ensure the subordinate conforms", { acceptedAnswers: ["reasonable direct supervision"], clue: "Rule 5.1(b)", kind: "decision" }),
    quizNode("responsible", 720, 150, 280, 95, "a lawyer may be responsible for another lawyer's violation", { acceptedAnswers: ["responsibility for another lawyers violation"], clue: "Rule 5.1(c)", kind: "decision" }),
    quizNode("order", 550, 330, 280, 95, "lawyer orders the conduct or knowingly ratifies it", { acceptedAnswers: ["orders or knowingly ratifies"], clue: "Rule 5.1(c)(1)", kind: "note" }),
    quizNode("remedy", 720, 470, 280, 95, "manager or supervisor knows in time to avoid or mitigate but fails to take reasonable remedial action", { acceptedAnswers: ["fails reasonable remedial action"], clue: "Rule 5.1(c)(2)", kind: "note" }),
    quizNode("liable", 390, 560, 260, 70, "responsibility attaches under either path", { acceptedAnswers: ["supervisory responsibility attaches"], clue: "Result", kind: "outcome" }),
  ],
  [
    { from: "start", to: "systems" }, { from: "start", to: "supervise" }, { from: "start", to: "responsible" },
    { from: "responsible", to: "order" }, { from: "responsible", to: "remedy" },
    { from: "order", to: "liable" }, { from: "remedy", to: "liable" },
  ],
);

const rule73 = ruleFlow(
  "7.3",
  "Solicitation of Clients",
  "Identify a solicitation, apply the live person-to-person ban, then test the exceptions and absolute prohibitions.",
  1060,
  700,
  [
    staticNode("start", 400, 20, 260, 70, "Communication offering legal services"),
    quizNode("solicitation", 380, 130, 300, 90, "a targeted communication initiated for pecuniary gain to a person known to need legal services in a particular matter", { acceptedAnswers: ["targeted contact for pecuniary gain"], clue: "Rule 7.3(a)", kind: "decision" }),
    quizNode("live", 380, 270, 300, 80, "live person-to-person solicitation is generally prohibited", { acceptedAnswers: ["live person to person solicitation prohibited"], clue: "Rule 7.3(b)", kind: "outcome" }),
    quizNode("lawyer", 30, 420, 230, 90, "contact is with a lawyer", { acceptedAnswers: ["soliciting another lawyer"], clue: "Exception", kind: "exception" }),
    quizNode("relationship", 280, 420, 230, 90, "contact is with someone having a family, close personal, or prior professional relationship", { acceptedAnswers: ["family close personal or prior professional relationship"], clue: "Exception", kind: "exception" }),
    quizNode("business", 530, 420, 230, 90, "contact routinely uses the type of legal services offered for business purposes", { acceptedAnswers: ["routinely uses legal services for business"], clue: "Exception", kind: "exception" }),
    quizNode("coercion", 780, 420, 230, 90, "solicitation involves coercion, duress, or harassment", { acceptedAnswers: ["coercion duress or harassment"], clue: "Always prohibited", kind: "decision" }),
    quizNode("declined", 200, 570, 280, 80, "target has made known a desire not to be solicited", { acceptedAnswers: ["person does not want solicitation"], clue: "Always prohibited", kind: "decision" }),
    quizNode("result", 580, 570, 280, 80, "otherwise permitted solicitation must still comply with Rules 7.1 and 7.2", { acceptedAnswers: ["comply with rules 7.1 and 7.2"], clue: "Result", kind: "outcome" }),
  ],
  [
    { from: "start", to: "solicitation" }, { from: "solicitation", to: "live" },
    ...["lawyer", "relationship", "business", "coercion"].map((to) => ({ from: "live", to })),
    { from: "live", to: "declined" }, { from: "lawyer", to: "result" }, { from: "relationship", to: "result" }, { from: "business", to: "result" },
  ],
);

const rule85 = ruleFlow(
  "8.5",
  "Disciplinary Authority; Choice of Law",
  "Choose the governing professional-conduct rules based on tribunal-related and other conduct.",
  980,
  620,
  [
    staticNode("start", 350, 20, 280, 70, "Potential professional misconduct"),
    quizNode("authority", 350, 130, 280, 90, "admitting jurisdiction has disciplinary authority regardless of where conduct occurs", { acceptedAnswers: ["admitting jurisdiction disciplinary authority"], clue: "Rule 8.5(a)", kind: "outcome" }),
    quizNode("services", 40, 280, 280, 90, "a nonadmitted lawyer is subject to authority where legal services are provided or offered", { acceptedAnswers: ["authority where services provided or offered"], clue: "Rule 8.5(a)", kind: "outcome" }),
    quizNode("tribunal", 350, 280, 280, 90, "for tribunal matters, apply the rules of the jurisdiction where the tribunal sits unless its rules provide otherwise", { acceptedAnswers: ["rules where tribunal sits"], clue: "Rule 8.5(b)(1)", kind: "decision" }),
    quizNode("other", 660, 280, 280, 90, "for other conduct, apply the rules where conduct occurred or where its predominant effect occurred", { acceptedAnswers: ["conduct location or predominant effect"], clue: "Rule 8.5(b)(2)", kind: "decision" }),
    quizNode("safe", 350, 450, 280, 100, "no discipline when conduct conforms to rules of a jurisdiction where the lawyer reasonably believes the predominant effect will occur", { acceptedAnswers: ["reasonable belief predominant effect safe harbor"], clue: "Safe harbor", kind: "exception" }),
    quizNode("multiple", 350, 570, 280, 40, "more than one jurisdiction may discipline the same conduct", { acceptedAnswers: ["multiple jurisdictions may discipline"], clue: "Concurrent authority", kind: "outcome" }),
  ],
  [
    { from: "start", to: "authority" }, { from: "authority", to: "services" }, { from: "authority", to: "tribunal" }, { from: "authority", to: "other" },
    { from: "tribunal", to: "safe" }, { from: "other", to: "safe" }, { from: "safe", to: "multiple" },
  ],
);

const fundamentalsQuestions = [
  ruleGrid("1.1", "Competence", [
    { title: "Required for Competence", mnemonic: "KSTP", items: [
      ["legal knowledge", ["knowledge"], "K"],
      ["legal skill", ["skill"], "S"],
      ["thoroughness", [], "T"],
      ["preparation reasonably necessary for the representation", ["reasonable preparation", "preparation"], "P"],
    ] },
  ]),
  ruleGrid("1.2", "Scope of Representation and Allocation of Authority", [
    { title: "Allocation", items: [
      ["client decides the objectives of representation", ["client decides objectives"], "Objectives"],
      ["lawyer consults with the client about the means", ["consult about means"], "Means"],
      ["client decides whether to settle", ["client decides settlement"], "Civil case"],
      ["client decides plea, jury waiver, and whether to testify", ["client decides plea jury and testimony"], "Criminal case"],
    ] },
    { title: "Limits", items: [
      ["representation does not endorse the client's views or activities", ["no endorsement"], "Rule 1.2(b)"],
      ["scope may be limited if reasonable and the client gives informed consent", ["reasonable limitation with informed consent"], "Rule 1.2(c)"],
      ["lawyer must not counsel or assist crime or fraud", ["no assistance of crime or fraud"], "Rule 1.2(d)"],
    ] },
  ]),
  ruleGrid("1.3", "Diligence", [
    { title: "Core Duty", items: [
      ["reasonable diligence", ["diligence"], "Conduct"],
      ["reasonable promptness", ["promptness"], "Timing"],
    ] },
  ]),
  ruleGrid("1.4", "Communication", [
    { title: "Keep the Client Informed", items: [
      ["promptly inform the client of decisions requiring informed consent", ["inform decisions requiring consent"], "Consent"],
      ["reasonably consult about the means of accomplishing objectives", ["consult about means"], "Means"],
      ["keep the client reasonably informed about status", ["keep client informed"], "Status"],
      ["promptly comply with reasonable requests for information", ["respond to information requests"], "Requests"],
      ["consult when the client expects assistance the Rules do not permit", ["explain legal or ethical limits"], "Limits"],
    ] },
    { title: "Explain", items: [
      ["explain the matter enough to permit informed decisions", ["sufficient explanation for informed decisions"], "Rule 1.4(b)"],
    ] },
  ]),
  ruleGrid("1.5", "Fees", [
    { title: "Reasonableness Factors", mnemonic: "TLFCETEN", items: [
      ["time and labor, novelty, difficulty, and skill", ["time labor novelty difficulty skill"], "1"],
      ["likelihood the work will preclude other employment", ["preclusion of other employment"], "2"],
      ["fee customarily charged in the locality", ["customary local fee"], "3"],
      ["amount involved and results obtained", ["amount and results"], "4"],
      ["time limitations", [], "5"],
      ["nature and length of the professional relationship", ["relationship with client"], "6"],
      ["experience, reputation, and ability of the lawyers", ["lawyer experience reputation ability"], "7"],
      ["whether the fee is fixed or contingent", ["fixed or contingent"], "8"],
    ] },
    { title: "Agreements", items: [
      ["communicate the scope and basis or rate of the fee and expenses", ["communicate fee basis and expenses"], "Rule 1.5(b)"],
      ["contingent-fee agreements must be in a writing signed by the client", ["signed written contingent fee"], "Rule 1.5(c)"],
      ["no contingent fee in criminal defense or specified domestic-relations matters", ["no criminal or domestic relations contingent fee"], "Rule 1.5(d)"],
    ] },
    { title: "Fee Division", items: [
      ["division is proportional or each lawyer assumes joint responsibility", ["proportional division or joint responsibility"], "Rule 1.5(e)(1)"],
      ["client agrees to the arrangement and each lawyer's share in writing", ["client written agreement to shares"], "Rule 1.5(e)(2)"],
      ["total fee is reasonable", ["reasonable total fee"], "Rule 1.5(e)(3)"],
    ] },
  ]),
  ruleGrid("1.6", "Confidentiality of Information", [
    { title: "Default and Permission", items: [
      ["do not reveal information relating to the representation", ["confidentiality", "no revelation"], "Default"],
      ["client gives informed consent", ["informed consent"], "Permission"],
      ["disclosure is impliedly authorized to carry out the representation", ["implied authorization"], "Permission"],
    ] },
    { title: "Permissive Disclosures", mnemonic: "HFFACOC", items: [
      ["prevent reasonably certain death or substantial bodily harm", ["prevent death or bodily harm"], "1"],
      ["prevent client crime or fraud causing substantial financial or property injury", ["prevent client financial crime or fraud"], "2"],
      ["prevent, mitigate, or rectify financial or property injury from client crime or fraud using the lawyer's services", ["mitigate client fraud injury"], "3"],
      ["secure legal advice about the lawyer's compliance", ["get ethics advice"], "4"],
      ["establish a claim or defense in a lawyer-client controversy or respond to allegations", ["lawyer self defense"], "5"],
      ["comply with other law or a court order", ["comply with law or court order"], "6"],
      ["detect and resolve conflicts arising from changes in employment or firm composition", ["conflict checking during employment change"], "7"],
    ] },
    { title: "Safeguard", items: [
      ["make reasonable efforts to prevent inadvertent or unauthorized disclosure or access", ["reasonable confidentiality safeguards"], "Rule 1.6(c)"],
    ] },
  ]),
];

const conflictQuestions = [
  conflictsOverview,
  rule17,
  ruleGrid("1.8", "Conflict of Interest: Current Clients — Specific Rules", [
    { title: "Transactions and Benefits", items: [
      ["business terms must be fair, reasonable, fully disclosed in writing, independently reviewable, and accepted by signed informed consent", ["fair written terms independent counsel opportunity and signed consent"], "Rule 1.8(a)"],
      ["do not use client information to the client's disadvantage without consent or authorization", ["no disadvantageous use of client information"], "Rule 1.8(b)"],
      ["do not solicit a substantial gift or prepare an instrument giving one unless the recipient is related", ["no substantial gift unless related"], "Rule 1.8(c)"],
      ["do not negotiate literary or media rights before representation ends", ["no literary rights before end"], "Rule 1.8(d)"],
    ] },
    { title: "Money and Control", items: [
      ["financial assistance is generally barred subject to litigation-cost and limited indigent-client exceptions", ["no financial assistance except permitted costs and indigent aid"], "Rule 1.8(e)"],
      ["third-party payment requires informed consent, independent judgment, and confidentiality", ["consent independence confidentiality for third party payor"], "Rule 1.8(f)"],
      ["aggregate settlements require each client's informed consent in a signed writing", ["signed informed consent for aggregate settlement"], "Rule 1.8(g)"],
      ["limits on malpractice liability require independent representation; settling claims requires written advice to seek counsel", ["independent counsel safeguards for malpractice limits or settlements"], "Rule 1.8(h)"],
    ] },
    { title: "Interests and Relationships", items: [
      ["no proprietary interest in the cause except a lien or reasonable contingent fee", ["no proprietary interest except lien or contingent fee"], "Rule 1.8(i)"],
      ["no sexual relationship with a client unless it predates the client-lawyer relationship", ["no sex with client unless preexisting"], "Rule 1.8(j)"],
      ["paragraphs (a) through (i) are imputed to lawyers in the firm", ["specific conflicts imputed to firm"], "Rule 1.8(k)"],
    ] },
  ]),
  rule19,
  rule110,
  ruleGrid("1.11", "Special Conflicts for Former and Current Government Officers and Employees", [
    { title: "Former Government Lawyer", items: [
      ["remains subject to Rule 1.9(c)", ["former client confidentiality"], "Rule 1.11(a)(1)"],
      ["must not represent a private client in a matter personally and substantially participated in", ["no same matter after personal substantial participation"], "Rule 1.11(a)(2)"],
      ["government agency may give informed consent confirmed in writing", ["government written informed consent"], "Consent"],
      ["firm may proceed with timely screening, no fee, and prompt written notice to the agency", ["screen no fee notice to government"], "Rule 1.11(b)"],
    ] },
    { title: "Protected Government Information", items: [
      ["do not represent a private client adverse to a person about whom the lawyer has material confidential government information", ["no adverse use of confidential government information"], "Rule 1.11(c)"],
    ] },
    { title: "Current Government Lawyer", items: [
      ["is subject to Rules 1.7 and 1.9", ["current government lawyer follows 1.7 and 1.9"], "Rule 1.11(d)(1)"],
      ["must not participate in a matter personally and substantially handled in private practice without written agency consent", ["no government participation in former private matter"], "Rule 1.11(d)(2)(i)"],
      ["must not negotiate private employment with a party or lawyer in a matter personally and substantially handled", ["no employment negotiation with matter participant"], "Rule 1.11(d)(2)(ii)"],
    ] },
  ]),
  ruleGrid("1.12", "Former Judge, Arbitrator, Mediator, or Other Third-Party Neutral", [
    { title: "Personal Disqualification", items: [
      ["do not represent anyone in a matter personally and substantially participated in as a neutral", ["no representation in former neutral matter"], "Rule 1.12(a)"],
      ["all parties may give informed consent confirmed in writing", ["all parties written informed consent"], "Exception"],
      ["do not negotiate employment with a party or lawyer while personally and substantially participating", ["no employment negotiation while neutral"], "Rule 1.12(b)"],
    ] },
    { title: "Firm and Fees", items: [
      ["firm may proceed after timely screening, no fee, and prompt written notice", ["screen no fee written notice"], "Rule 1.12(c)"],
      ["partisan arbitrators may later represent the appointing party", ["partisan arbitrator exception"], "Rule 1.12(d)"],
    ] },
  ]),
  rule118,
];

const specialClientQuestions = [
  ruleGrid("1.13", "Organization as Client", [
    { title: "Who Is the Client?", items: [
      ["the lawyer represents the organization acting through authorized constituents", ["organization is the client"], "Rule 1.13(a)"],
      ["explain the identity of the client when organizational interests are adverse to a constituent", ["clarify organization is client"], "Rule 1.13(f)"],
      ["may also represent constituents subject to Rule 1.7", ["dual representation subject to rule 1.7"], "Rule 1.13(g)"],
    ] },
    { title: "Up and Out", items: [
      ["when a constituent violates a legal obligation likely to substantially injure the organization, proceed in the organization's best interest", ["respond to constituent violation threatening organization"], "Rule 1.13(b)"],
      ["ordinarily refer the matter to higher authority within the organization", ["report up"], "Rule 1.13(b)"],
      ["may reveal outside the organization when the highest authority fails to address a clear violation likely to substantially injure it", ["report out after highest authority fails"], "Rule 1.13(c)"],
      ["outside disclosure does not apply to investigating or defending claims arising from alleged violations", ["investigation and defense exception"], "Rule 1.13(d)"],
    ] },
  ]),
  ruleGrid("1.14", "Client with Decision-Making Limitations", [
    { title: "Default", items: [
      ["maintain a normal client-lawyer relationship as far as reasonably possible", ["maintain normal relationship"], "Rule 1.14(a)"],
    ] },
    { title: "Protective Action", items: [
      ["lawyer reasonably believes the client has decision-making limitations", ["client has decision making limitations"], "Trigger"],
      ["client is at risk of substantial physical, financial, or other harm", ["risk of substantial harm"], "Trigger"],
      ["client cannot adequately act in the client's own interest", ["cannot adequately protect own interest"], "Trigger"],
      ["lawyer may take reasonably necessary protective action, including consulting protective entities or seeking appointment", ["reasonably necessary protective action"], "Rule 1.14(b)"],
    ] },
    { title: "Confidentiality", items: [
      ["information remains protected by Rule 1.6, with implied authority only as reasonably necessary to protect the client", ["limited implied disclosure for protection"], "Rule 1.14(c)"],
    ] },
  ]),
  ruleGrid("1.15", "Safekeeping Property", [
    { title: "Hold and Record", items: [
      ["keep client and third-person property separate from the lawyer's property", ["segregate property"], "Rule 1.15(a)"],
      ["keep funds in an appropriate trust account and preserve complete records", ["trust account and records"], "Rule 1.15(a)"],
      ["deposit advance legal fees and expenses in trust until earned or incurred", ["advance fees in trust"], "Rule 1.15(c)"],
    ] },
    { title: "Receive and Deliver", items: [
      ["promptly notify the client or third person upon receiving property", ["prompt notice of receipt"], "Rule 1.15(d)"],
      ["promptly deliver property the person is entitled to receive", ["prompt delivery"], "Rule 1.15(d)"],
      ["promptly render a full accounting on request", ["full accounting"], "Rule 1.15(d)"],
    ] },
    { title: "Disputed Funds", items: [
      ["keep disputed property separate until the dispute is resolved", ["segregate disputed property"], "Rule 1.15(e)"],
      ["promptly distribute undisputed portions", ["distribute undisputed funds"], "Rule 1.15(e)"],
    ] },
  ]),
  rule116,
  ruleGrid("1.17", "Sale of Law Practice", [
    { title: "Sale Requirements", items: [
      ["seller ceases private practice, or the sold area of practice, in the geographic area", ["seller stops practice in area"], "Rule 1.17(a)"],
      ["entire practice or entire area of practice is sold to one or more lawyers or firms", ["sell entire practice or practice area"], "Rule 1.17(b)"],
      ["fees charged to clients do not increase because of the sale", ["no fee increase from sale"], "Rule 1.17(d)"],
    ] },
    { title: "Written Notice", items: [
      ["proposed sale", [], "Notice"],
      ["client's right to retain other counsel or take possession of the file", ["right to other counsel or file"], "Notice"],
      ["consent is presumed if the client does not object within ninety days", ["ninety day presumed consent"], "Notice"],
    ] },
  ]),
];

const counselorQuestions = [
  ruleGrid("2.1", "Advisor", [
    { title: "Professional Judgment", items: [
      ["exercise independent professional judgment", ["independent judgment"], "Duty"],
      ["render candid advice", ["candid advice"], "Duty"],
      ["may refer to moral, economic, social, and political factors relevant to the client", ["consider nonlegal factors"], "Permitted context"],
    ] },
  ]),
  ruleGrid("2.2", "[Deleted]", [
    { title: "Status", items: [["deleted", ["rule deleted"], "Rule 2.2"]] },
  ], "Recall the status of former Model Rule 2.2."),
  ruleGrid("2.3", "Evaluation for Use by Third Persons", [
    { title: "Evaluation", items: [
      ["lawyer may provide an evaluation for someone other than the client", ["third person evaluation"], "Rule 2.3(a)"],
      ["informed consent is required when the evaluation is likely to affect the client's interests materially and adversely", ["consent for material adverse effect"], "Rule 2.3(b)"],
      ["evaluation information remains protected by Rule 1.6 unless disclosure is authorized", ["evaluation confidentiality"], "Rule 2.3(c)"],
    ] },
  ]),
  ruleGrid("2.4", "Lawyer Serving as Third-Party Neutral", [
    { title: "Neutral Role", items: [
      ["a third-party neutral assists nonclients in resolving a dispute or matter", ["assist nonclients resolving dispute"], "Definition"],
      ["includes service as arbitrator, mediator, or another neutral", ["arbitrator mediator neutral"], "Examples"],
      ["explain the difference from client representation when a party may not understand the role", ["clarify neutral role"], "Rule 2.4(b)"],
    ] },
  ]),
];

const advocateQuestions = [
  ruleGrid("3.1", "Meritorious Claims and Contentions", [
    { title: "Nonfrivolous Basis", items: [
      ["do not bring or defend a proceeding or assert an issue without a nonfrivolous basis in law and fact", ["nonfrivolous basis"], "General rule"],
      ["a good-faith argument to extend, modify, or reverse existing law is permitted", ["good faith change in law"], "Permitted"],
      ["criminal defense counsel may require the prosecution to establish every element", ["require proof of every element"], "Defense exception"],
    ] },
  ]),
  ruleGrid("3.2", "Expediting Litigation", [
    { title: "Duty", items: [
      ["make reasonable efforts to expedite litigation consistent with the client's interests", ["reasonable efforts to expedite"], "Rule 3.2"],
    ] },
  ]),
  rule33,
  ruleGrid("3.4", "Fairness to Opposing Party and Counsel", [
    { title: "Evidence and Orders", items: [
      ["do not unlawfully obstruct access to evidence, alter or destroy potential evidence, or assist another to do so", ["no obstruction alteration or destruction of evidence"], "Rule 3.4(a)"],
      ["do not falsify evidence or counsel a witness to testify falsely", ["no false evidence or testimony"], "Rule 3.4(b)"],
      ["do not knowingly disobey tribunal obligations except an open refusal based on a claim no valid obligation exists", ["obey tribunal obligations"], "Rule 3.4(c)"],
      ["do not make frivolous discovery requests or fail to make reasonably diligent discovery compliance", ["no discovery abuse"], "Rule 3.4(d)"],
    ] },
    { title: "Trial and Witnesses", items: [
      ["do not allude to unsupported or irrelevant matters, assert personal knowledge, or state personal opinions at trial", ["no unsupported allusions personal knowledge or opinion"], "Rule 3.4(e)"],
      ["do not request a nonclient to withhold relevant information unless the person is a relative, employee, or agent of the client and will not be adversely affected", ["limited request to withhold information"], "Rule 3.4(f)"],
    ] },
  ]),
  ruleGrid("3.5", "Impartiality and Decorum of the Tribunal", [
    { title: "A Lawyer Shall Not", items: [
      ["seek to influence a judge, juror, prospective juror, or official by prohibited means", ["no improper influence"], "Rule 3.5(a)"],
      ["communicate ex parte during the proceeding unless authorized by law or court order", ["no unauthorized ex parte communication"], "Rule 3.5(b)"],
      ["communicate with a discharged juror when law or court order forbids it, the juror declines, or the contact is improper", ["restricted post verdict juror contact"], "Rule 3.5(c)"],
      ["engage in conduct intended to disrupt a tribunal", ["no disruptive conduct"], "Rule 3.5(d)"],
    ] },
  ]),
  ruleGrid("3.6", "Trial Publicity", [
    { title: "Restriction", items: [
      ["a participating lawyer must not make an extrajudicial statement reasonably expected to materially prejudice the proceeding", ["no materially prejudicial public statement"], "Rule 3.6(a)"],
    ] },
    { title: "Generally Permitted", items: [
      ["claim, offense, or defense and public-record information", ["claim and public record"], "Information"],
      ["investigation status, scheduling, and requests for evidence", ["investigation scheduling and evidence requests"], "Information"],
      ["warnings of danger and limited identifying or apprehension information", ["danger warnings and apprehension information"], "Information"],
    ] },
    { title: "Response", items: [
      ["a lawyer may make a limited statement reasonably necessary to protect a client from substantial undue prejudicial publicity not initiated by the lawyer or client", ["limited corrective publicity"], "Rule 3.6(c)"],
    ] },
  ]),
  ruleGrid("3.7", "Lawyer as Witness", [
    { title: "General Rule", items: [
      ["lawyer must not act as trial advocate when likely to be a necessary witness", ["no advocate as necessary witness"], "Rule 3.7(a)"],
    ] },
    { title: "Exceptions", items: [
      ["testimony concerns an uncontested issue", ["uncontested issue"], "1"],
      ["testimony concerns the nature and value of legal services", ["legal services value"], "2"],
      ["disqualification would work substantial hardship on the client", ["substantial hardship"], "3"],
    ] },
    { title: "Firm", items: [
      ["another lawyer in the firm may act unless Rules 1.7 or 1.9 preclude it", ["firm lawyer may act absent 1.7 or 1.9 conflict"], "Rule 3.7(b)"],
    ] },
  ]),
  ruleGrid("3.8", "Special Responsibilities of a Prosecutor", [
    { title: "Charging and Fairness", items: [
      ["refrain from charges not supported by probable cause", ["probable cause required"], "Rule 3.8(a)"],
      ["make reasonable efforts to assure the accused understands and can obtain counsel", ["assure right to counsel"], "Rule 3.8(b)"],
      ["do not seek waiver of important pretrial rights from an unrepresented accused", ["no waiver from unrepresented accused"], "Rule 3.8(c)"],
      ["timely disclose mitigating and exculpatory evidence", ["disclose exculpatory mitigating evidence"], "Rule 3.8(d)"],
    ] },
    { title: "Process and Innocence", items: [
      ["limit subpoenas to lawyers when information is essential, unprivileged, and unavailable elsewhere", ["limited lawyer subpoenas"], "Rule 3.8(e)"],
      ["exercise reasonable care over investigators' prejudicial public statements", ["control prejudicial statements"], "Rule 3.8(f)"],
      ["investigate new, credible, material evidence creating a reasonable likelihood of wrongful conviction", ["investigate possible wrongful conviction"], "Rule 3.8(g)"],
      ["seek to remedy a conviction known to be wrongful", ["remedy known wrongful conviction"], "Rule 3.8(h)"],
    ] },
  ]),
  ruleGrid("3.9", "Advocate in Nonadjudicative Proceedings", [
    { title: "Legislative or Administrative Appearance", items: [
      ["disclose that the appearance is in a representative capacity", ["disclose representative capacity"], "Rule 3.9"],
      ["conform to Rules 3.3(a)–(c), 3.4(a)–(c), and 3.5", ["follow candor fairness and decorum rules"], "Cross-reference"],
    ] },
  ]),
];

const thirdPersonQuestions = [
  ruleGrid("4.1", "Truthfulness in Statements to Others", [
    { title: "A Lawyer Shall Not Knowingly", items: [
      ["make a false statement of material fact or law to a third person", ["no material false statement"], "Rule 4.1(a)"],
      ["fail to disclose a material fact when necessary to avoid assisting client crime or fraud", ["disclose to avoid assisting client crime or fraud"], "Rule 4.1(b)"],
      ["disclosure is not required when Rule 1.6 prohibits it", ["confidentiality exception"], "Rule 4.1(b)"],
    ] },
  ]),
  rule42,
  ruleGrid("4.3", "Dealing with Unrepresented Person", [
    { title: "Required Boundaries", items: [
      ["do not state or imply that the lawyer is disinterested", ["do not claim disinterest"], "Rule 4.3"],
      ["correct a misunderstanding about the lawyer's role", ["correct role misunderstanding"], "Rule 4.3"],
      ["do not give legal advice other than to secure counsel when interests may conflict with the client", ["only advise to obtain counsel"], "Rule 4.3"],
    ] },
  ]),
  ruleGrid("4.4", "Respect for Rights of Third Persons", [
    { title: "Methods", items: [
      ["do not use means having no substantial purpose other than to embarrass, delay, or burden a third person", ["no embarrassment delay or burden"], "Rule 4.4(a)"],
      ["do not use methods of obtaining evidence that violate a person's legal rights", ["no evidence methods violating rights"], "Rule 4.4(a)"],
    ] },
    { title: "Inadvertently Sent Material", items: [
      ["promptly notify the sender when the lawyer knows a document or electronically stored information was inadvertently sent", ["notify sender of inadvertent transmission"], "Rule 4.4(b)"],
    ] },
  ]),
];

const firmQuestions = [
  rule51,
  ruleGrid("5.2", "Responsibilities of a Subordinate Lawyer", [
    { title: "Subordinate Lawyer", items: [
      ["remains bound by the Rules despite acting at another lawyer's direction", ["no just following orders defense"], "Rule 5.2(a)"],
      ["does not violate the Rules by following a supervisor's reasonable resolution of an arguable professional-duty question", ["reasonable resolution safe harbor"], "Rule 5.2(b)"],
    ] },
  ]),
  ruleGrid("5.3", "Responsibilities Regarding Nonlawyer Assistance", [
    { title: "Reasonable Efforts", items: [
      ["partners and managers establish measures reasonably assuring nonlawyer conduct is compatible with lawyer obligations", ["firm systems for nonlawyers"], "Rule 5.3(a)"],
      ["a direct supervisor reasonably assures compatible conduct", ["supervise nonlawyer"], "Rule 5.3(b)"],
    ] },
    { title: "Responsibility", items: [
      ["lawyer orders or knowingly ratifies the conduct", ["orders or ratifies"], "Rule 5.3(c)(1)"],
      ["manager or supervisor knows in time to avoid or mitigate but fails reasonable remedial action", ["fails to remedy nonlawyer conduct"], "Rule 5.3(c)(2)"],
    ] },
  ]),
  ruleGrid("5.4", "Professional Independence of a Lawyer", [
    { title: "Financial Independence", items: [
      ["do not share legal fees with a nonlawyer except listed death, retirement, purchase, and nonprofit exceptions", ["no nonlawyer fee sharing subject to exceptions"], "Rule 5.4(a)"],
      ["do not form a partnership with a nonlawyer if any activity is the practice of law", ["no law partnership with nonlawyer"], "Rule 5.4(b)"],
    ] },
    { title: "Professional Judgment", items: [
      ["a payor or recommender must not direct or regulate professional judgment", ["no outside control of judgment"], "Rule 5.4(c)"],
      ["do not practice in a for-profit entity with nonlawyer ownership, management, or control", ["no nonlawyer ownership or control"], "Rule 5.4(d)"],
    ] },
  ]),
  ruleGrid("5.5", "Unauthorized Practice of Law; Multijurisdictional Practice", [
    { title: "General Prohibitions", items: [
      ["do not practice where doing so violates that jurisdiction's regulation of the profession", ["no unauthorized practice"], "Rule 5.5(a)"],
      ["do not assist another in unauthorized practice", ["no assisting unauthorized practice"], "Rule 5.5(a)"],
      ["a nonadmitted lawyer must not establish an office or systematically hold out as admitted", ["no local office or false holding out"], "Rule 5.5(b)"],
    ] },
    { title: "Temporary Safe Harbors", mnemonic: "ACPL", items: [
      ["associate with an actively participating local lawyer", ["local counsel association"], "Association"],
      ["services reasonably related to a pending or potential proceeding when authorized or expected to be authorized", ["court proceeding with expected authorization"], "Court"],
      ["services reasonably related to pending or potential arbitration, mediation, or other ADR", ["adr services"], "Proceeding"],
      ["services arising from or reasonably related to the lawyer's home-jurisdiction practice", ["related to home practice"], "Linked practice"],
    ] },
    { title: "Non-Temporary Practice", items: [
      ["services for the lawyer's employer or organizational affiliates, excluding unauthorized court appearances", ["in house counsel services"], "Rule 5.5(d)(1)"],
      ["services authorized by federal or other law", ["federally authorized practice"], "Rule 5.5(d)(2)"],
    ] },
  ]),
  ruleGrid("5.6", "Restrictions on Right to Practice", [
    { title: "Prohibited Agreements", items: [
      ["do not restrict a lawyer's right to practice after termination of a relationship except retirement benefits", ["no post employment practice restriction"], "Rule 5.6(a)"],
      ["do not restrict a lawyer's right to practice as part of settling a client controversy", ["no settlement practice restriction"], "Rule 5.6(b)"],
    ] },
  ]),
  ruleGrid("5.7", "Responsibilities Regarding Law-Related Services", [
    { title: "When the Rules Apply", items: [
      ["services are not distinct from the lawyer's legal services", ["not distinct from legal services"], "Rule 5.7(a)(1)"],
      ["lawyer fails to take reasonable measures to assure the recipient understands client-lawyer protections do not exist", ["no warning that protections do not apply"], "Rule 5.7(a)(2)"],
    ] },
    { title: "Definition", items: [
      ["law-related services are reasonably connected with legal services and might reasonably be performed with them", ["services connected with legal services"], "Rule 5.7(b)"],
    ] },
  ]),
];

const publicServiceQuestions = [
  ruleGrid("6.1", "Voluntary Pro Bono Publico Service", [
    { title: "Aspirational Goal", items: [
      ["at least fifty hours of pro bono legal services per year", ["fifty pro bono hours"], "Annual goal"],
      ["a substantial majority should serve persons of limited means or organizations serving them", ["majority for limited means"], "Priority"],
    ] },
    { title: "Additional Service", items: [
      ["services at no fee or substantially reduced fee to protect rights or serve limited means", ["free or reduced fee public interest service"], "Rule 6.1(b)"],
      ["activities improving law, the legal system, or the profession", ["law improvement activities"], "Rule 6.1(b)"],
      ["voluntary financial support for organizations providing legal services to limited-means persons", ["financial support for legal services"], "Rule 6.1(b)"],
    ] },
  ]),
  ruleGrid("6.2", "Accepting Appointments", [
    { title: "Good Cause to Decline", items: [
      ["representation is likely to violate the Rules or other law", ["would violate rules or law"], "Rule 6.2(a)"],
      ["representation is likely to impose an unreasonable financial burden", ["unreasonable financial burden"], "Rule 6.2(b)"],
      ["client or cause is so repugnant as likely to impair the relationship or representation", ["repugnant client or cause impairs representation"], "Rule 6.2(c)"],
    ] },
  ]),
  ruleGrid("6.3", "Membership in Legal Services Organization", [
    { title: "Permitted Participation", items: [
      ["lawyer may serve despite the organization serving persons adverse to the lawyer's client", ["membership despite adverse clients"], "General rule"],
      ["do not knowingly participate in a decision incompatible with obligations to a client", ["no incompatible decisions"], "Rule 6.3(a)"],
      ["do not knowingly participate in a decision materially adversely affecting the organization's representation of a client", ["no material adverse effect on organization client"], "Rule 6.3(b)"],
    ] },
  ]),
  ruleGrid("6.4", "Law Reform Activities Affecting Client Interests", [
    { title: "Participation", items: [
      ["lawyer may participate in law-reform organizations despite possible effects on client interests", ["law reform participation allowed"], "General rule"],
      ["when a decision may materially benefit a client, disclose that fact without identifying the client", ["disclose material client benefit"], "Rule 6.4"],
    ] },
  ]),
  ruleGrid("6.5", "Nonprofit and Court-Annexed Limited Legal Services Programs", [
    { title: "Relaxed Conflict Rules", items: [
      ["Rules 1.7 and 1.9(a) apply only when the lawyer knows of the conflict", ["actual knowledge required for personal conflict"], "Rule 6.5(a)(1)"],
      ["Rule 1.10 applies only when the lawyer knows another firm lawyer is disqualified", ["actual knowledge required for imputed conflict"], "Rule 6.5(a)(2)"],
      ["otherwise Rule 1.10 is inapplicable to the limited-service representation", ["imputation generally inapplicable"], "Rule 6.5(b)"],
    ] },
  ]),
];

const legalServicesQuestions = [
  ruleGrid("7.1", "Communications Concerning a Lawyer's Services", [
    { title: "False or Misleading", items: [
      ["do not make a false or misleading communication about the lawyer or services", ["no false or misleading communication"], "General rule"],
      ["a material misrepresentation of fact or law is misleading", ["material misrepresentation"], "Rule 7.1"],
      ["omitting a fact necessary to make the communication as a whole not materially misleading is prohibited", ["material misleading omission"], "Rule 7.1"],
    ] },
  ]),
  ruleGrid("7.2", "Communications Concerning a Lawyer's Services — Specific Rules", [
    { title: "Media and Payment", items: [
      ["lawyer may communicate information through any media", ["all media allowed"], "Rule 7.2(a)"],
      ["do not compensate a person for recommending the lawyer's services except listed advertising, plan, purchase, referral, and nominal-gift exceptions", ["no paid recommendations subject to exceptions"], "Rule 7.2(b)"],
      ["reciprocal referral agreements must be nonexclusive and disclosed to the client", ["nonexclusive disclosed referral agreement"], "Rule 7.2(b)(4)"],
    ] },
    { title: "Claims and Attribution", items: [
      ["specialist claims require approval by an authorized organization and clear identification of it", ["certified specialist and certifying organization"], "Rule 7.2(c)"],
      ["communications must include the name and contact information of at least one responsible lawyer or firm", ["responsible lawyer contact information"], "Rule 7.2(d)"],
    ] },
  ]),
  rule73,
  ruleGrid("7.4", "[Deleted]", [{ title: "Status", items: [["deleted", ["rule deleted"], "Rule 7.4"]] }], "Recall the status of former Model Rule 7.4."),
  ruleGrid("7.5", "[Deleted]", [{ title: "Status", items: [["deleted", ["rule deleted"], "Rule 7.5"]] }], "Recall the status of former Model Rule 7.5."),
  ruleGrid("7.6", "Political Contributions to Obtain Government Legal Engagements or Appointments", [
    { title: "Pay-to-Play Prohibition", items: [
      ["do not accept a government engagement or judicial appointment when the lawyer or firm made or solicited a political contribution to obtain it", ["no pay to play government work"], "Rule 7.6"],
    ] },
  ]),
];

const integrityQuestions = [
  ruleGrid("8.1", "Bar Admission and Disciplinary Matters", [
    { title: "Applicant or Lawyer Shall Not Knowingly", items: [
      ["make a false statement of material fact", ["no material false statement"], "Rule 8.1(a)"],
      ["fail to disclose a fact necessary to correct a known misapprehension", ["correct known misapprehension"], "Rule 8.1(b)"],
      ["fail to respond to a lawful demand for information", ["respond to lawful information demand"], "Rule 8.1(b)"],
      ["information protected by Rule 1.6 need not be disclosed", ["confidentiality exception"], "Exception"],
    ] },
  ]),
  ruleGrid("8.2", "Judicial and Legal Officials", [
    { title: "Statements and Candidates", items: [
      ["do not make a statement known to be false or with reckless disregard about a judge's qualifications or integrity", ["no knowing or reckless false judicial statement"], "Rule 8.2(a)"],
      ["a judicial candidate must comply with the applicable judicial-conduct rules", ["judicial candidate follows judicial conduct rules"], "Rule 8.2(b)"],
    ] },
  ]),
  ruleGrid("8.3", "Reporting Professional Misconduct", [
    { title: "Reporting Duties", items: [
      ["report a lawyer violation raising a substantial question about honesty, trustworthiness, or fitness", ["report serious lawyer misconduct"], "Rule 8.3(a)"],
      ["report a judge violation raising a substantial question about fitness for office", ["report serious judicial misconduct"], "Rule 8.3(b)"],
    ] },
    { title: "Exceptions", items: [
      ["no disclosure of information protected by Rule 1.6", ["confidentiality exception"], "Rule 8.3(c)"],
      ["no disclosure of information learned while participating in an approved lawyers-assistance program", ["lawyer assistance program exception"], "Rule 8.3(c)"],
    ] },
  ]),
  ruleGrid("8.4", "Misconduct", [
    { title: "Core Misconduct", mnemonic: "VCDPIJH", items: [
      ["violate, attempt, assist, induce, or use another to violate the Rules", ["violate or assist rule violation"], "Rule 8.4(a)"],
      ["commit a criminal act reflecting adversely on honesty, trustworthiness, or fitness", ["criminal act reflecting on fitness"], "Rule 8.4(b)"],
      ["engage in dishonesty, fraud, deceit, or misrepresentation", ["dishonesty fraud deceit misrepresentation"], "Rule 8.4(c)"],
      ["engage in conduct prejudicial to the administration of justice", ["prejudice to administration of justice"], "Rule 8.4(d)"],
      ["state or imply an ability to influence improperly or achieve results by unlawful means", ["improper influence claim"], "Rule 8.4(e)"],
      ["knowingly assist a judge or judicial officer's misconduct", ["assist judicial misconduct"], "Rule 8.4(f)"],
      ["engage in known or reasonably knowable harassment or discrimination related to law practice", ["harassment or discrimination"], "Rule 8.4(g)"],
    ] },
  ]),
  rule85,
];

export const professionalResponsibilitySubjects = [
  { id: "pr-fundamentals", title: "Fundamentals", questions: fundamentalsQuestions },
  { id: "pr-conflicts", title: "Conflicts & Imputation", questions: conflictQuestions },
  { id: "pr-special-client-relationships", title: "Special Client Relationships", questions: specialClientQuestions },
  { id: "pr-counselor", title: "Counselor", questions: counselorQuestions },
  { id: "pr-advocate", title: "Advocate", questions: advocateQuestions },
  { id: "pr-third-persons", title: "Third Persons", questions: thirdPersonQuestions },
  { id: "pr-firms", title: "Firms & Associations", questions: firmQuestions },
  { id: "pr-public-service", title: "Public Service", questions: publicServiceQuestions },
  { id: "pr-legal-services", title: "Legal Services Information", questions: legalServicesQuestions },
  { id: "pr-integrity", title: "Integrity & Discipline", questions: integrityQuestions },
];
