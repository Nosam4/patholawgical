// Bias Work Human Judgment.pptx · 14 slides and speaker notes.
// Focus on the seminar's main distinctions, not changing numerical forecasts.
const deck = "Bias Work Human Judgment.pptx · Bias, Work & Human Judgment";
const biasReading = "https://www.mckinsey.com/featured-insights/artificial-intelligence/tackling-bias-in-artificial-intelligence-and-in-humans";
const laborReading = "https://www.chicagobooth.edu/review/ai-is-going-disrupt-labor-market-it-doesnt-have-destroy-it";
const floridaOpinion = "https://flcourts-media.flcourts.gov/content/download/2489374/opinion/Opinion_SC2026-0673.pdf";
const floridaOrder = "https://flcourts-media.flcourts.gov/content/download/2489379/29182858";
const magnifica = "https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html";
const row = (key, indicator, answer, ...acceptedAnswers) => ({ key, indicator, answer, acceptedAnswers });
const note = (entry, explanation) => ({ ...entry, explanation });

function drill(key, title, prompt, slides, rows, sourceUrl, sourceLabel, ...references) {
  const id = `ai-quiz5-${key}`;
  return {
    id,
    type: "sporcle-grid",
    clueLayout: "above",
    answerMatching: "active",
    title,
    prompt,
    courseSources: [`${deck} · slides ${slides} and speaker notes`, ...references],
    sourceUrl,
    sourceLabel,
    columns: [{
      id: `${id}-answers`,
      title: "Main Points",
      answers: rows.map(({ key: answerKey, ...entry }) => ({ id: `${id}-${answerKey}`, ...entry })),
    }],
  };
}

export const aiAndLawQuiz5Subject = {
  id: "quiz-5",
  title: "Quiz #5",
  questions: [
    drill("bias-baseline", "Bias: Compare AI with the Actual Human Process",
      "Recall both sides of the deck's comparison. Human bias and model bias both require scrutiny.", "4–5", [
        note(row("baseline", "The appropriate practical comparator is the ____ the model replaces.", "Actual human process", "human process", "actual human baseline", "human baseline", "existing human decision-making", "existing human process"),
          "Compare Aperture with the real recruiting process, including its biases. This is the seminar's practical baseline, not a complete statement of the legal test for disparate impact."),
        row("auditability", "A potential advantage: model decisions can be examined and interrogated. Name this quality.", "Auditability", "auditable", "interrogability", "ability to audit", "inspectability"),
        row("scale", "A biased model can spread the same error across many decisions. It deploys bias at ____.", "Scale", "large scale", "at scale"),
        row("humans", "A biased model trained on past hiring can also reveal bias in the underlying ____.", "Human decisions", "human decision-making", "past human decisions", "human behavior", "human behaviour", "hiring decisions"),
      ], biasReading, "McKinsey · assigned bias reading"),

    drill("bias-sources", "Bias: Four Sources in the Data",
      "Identify the four mechanisms illustrated by the deck. A model can learn discriminatory patterns without anyone explicitly coding a protected trait.", "5", [
        row("past", "A hiring model learns stereotypes from earlier hiring choices.", "Past human decisions", "past decisions", "historical decisions", "historical bias", "biased training data"),
        row("collection", "Over-policing or an unrepresentative résumé sample changes what enters the training set.", "Data collection", "collection bias", "sampling bias", "data selection", "biased sampling", "how data was collected"),
        note(row("feedback", "Recruiter clicks become new training data and reinforce the model's earlier choices.", "Feedback loops", "feedback loop", "user feedback", "user-generated feedback loops"),
          "For Aperture, first ask whether recruiter clicks actually retrain the model. The hypothetical does not establish that they do."),
        note(row("proxies", "Schools or locations stand in for protected characteristics even when the trait itself is omitted.", "Proxies", "proxy variables", "proxy", "proxy discrimination", "protected-class proxies"),
          "A proxy can create a discrimination concern. The legal conclusion depends on the governing law and facts; correlation alone does not resolve every claim."),
      ], biasReading, "McKinsey · sources of bias"),

    drill("fairness", "Fairness: COMPAS and Competing Measures",
      "Recall why the developer and ProPublica could reach different conclusions about the same scores.", "6", [
        note(row("parity", "The developer's fairness measure: comparable reoffending rates among people labeled high-risk across groups.", "Predictive parity", "predictive value parity", "positive predictive value parity", "equal positive predictive value"),
          "Predictive parity concerns positive predictive value among people classified positive. The deck's notes also describe score-level calibration, where a given score corresponds to the same outcome likelihood across groups. These are related but distinct measures."),
        row("false-positives", "Equal likelihood that a person who will not reoffend is wrongly flagged high-risk.", "Balance for false positives", "false-positive balance", "equal false positive rates", "false positive parity", "false positive rate parity"),
        note(row("base-rates", "Different underlying outcome frequencies across groups are different ____.", "Base rates", "base rate", "underlying base rates"),
          "With differing base rates, calibration and equal error rates generally conflict outside special cases, such as perfect prediction. This is not a claim that every fairness measure is always incompatible with every other one."),
        row("tradeoffs", "Improving one fairness measure can worsen another. The measures involve ____.", "Trade-offs", "tradeoffs", "trade offs", "competing objectives", "fairness tradeoffs"),
        note(row("judgment", "Deciding which fairness standard should govern requires human ____ beyond optimization.", "Judgment", "human judgment", "normative judgment", "legal and ethical judgment", "value judgment"),
          "The seminar asks who should decide when bias is sufficiently minimized. It leaves that institutional and ethical question open; one metric cannot settle it for every use."),
      ], biasReading, "McKinsey · definitions and trade-offs in fairness"),

    drill("audit-response", "Aperture: Responding to the Bias Audit",
      "Recall the issues Claire must investigate in the fictional hiring-tool problem. These are analytical questions, not a prescribed order or a single required moral answer.", "3, 5–7", [
        row("training", "To trace learned hiring patterns, inspect the ____ data and whose decisions it records.", "Training", "training data", "training set", "training dataset"),
        row("root", "Switching the model off may return customers to biased recruiters. Also examine the underlying ____.", "Human behavior", "human behaviour", "human decisions", "human decision-making", "hiring practices", "human hiring practices"),
        row("jurisdiction", "Because Aperture operates in multiple states and Germany, identify the applicable ____ before stating a legal duty.", "Jurisdiction", "jurisdictions", "law", "governing law", "applicable law"),
        note(row("transparency", "Published audits and model documentation serve this governance value, which can create tension with confidentiality.", "Transparency", "openness", "disclosure"),
          "The deck asks what to document, who needs notice, and what privilege protects. Commissioning an audit through counsel does not automatically make all facts or reports privileged. The deck's state-law shorthand is not a substitute for checking current law."),
      ], biasReading, "McKinsey · auditing and improving human and AI decisions"),

    drill("labor-evidence", "Work: Read the Evidence Before the Headline",
      "Distinguish what labor-market measures actually count. Exact dated forecasts and percentages are context rather than recall targets.", "8", [
        note(row("exposure", "Tasks could be affected by AI, even if the job continues. This measures ____.", "Exposure", "AI exposure", "task exposure", "occupational exposure"),
          "An exposure estimate is not a count of eliminated jobs. Tasks can change, workers can become more productive, and demand can also change."),
        row("displacement", "Workers lose positions as work is replaced. This measures ____.", "Displacement", "worker displacement", "job displacement"),
        row("forecasts", "Projected future job losses or gains are ____ rather than observed outcomes.", "Forecasts", "forecast", "projections", "predictions", "estimates"),
        note(row("announcements", "The deck's Challenger series counts employer job-cut ____ citing AI, rather than independently proving AI caused completed layoffs.", "Announcements", "announced cuts", "announced job cuts", "layoff announcements", "announced plans"),
          "Employer-stated reasons and announced plans have limits. The recall task does not require the deck's changing annual totals."),
        note(row("net", "Jobs created minus jobs lost is the ____ change; it can hide substantial churn.", "Net", "net change", "net employment change", "net job change"),
          "A positive aggregate forecast can coexist with serious losses for particular workers and occupations. Gross creation and displacement show more of that movement."),
      ], laborReading, "Chicago Booth Review · assigned labor reading", "Slide 8 distinguishes the 2023 readings from later, dated comparisons; numerical updates are not tested."),

    drill("beginners", "Work: Productivity and Entry-Level Opportunity",
      "Recall how the deck puts benefits for beginners beside possible risks to entry-level hiring.", "8", [
        row("novices", "In the customer-support study discussed in class, the largest productivity gains went to ____ workers.", "Novice", "novices", "novice workers", "beginners", "less experienced", "inexperienced", "less experienced workers"),
        note(row("hiring", "Entry-level employment can fall because firms do less ____ even without broadly firing existing workers.", "Hiring", "new hiring", "entry-level hiring", "recruitment"),
          "Improved performance per worker and fewer openings for beginners can coexist. The deck raises this mechanism as a question for first-year associates, not a universal prediction about every occupation."),
        note(row("causation", "A descriptive employment association does not by itself establish ____.", "Causation", "causality", "a causal effect", "cause and effect"),
          "The slide notes expressly describe the employment comparison as descriptive and sensitive to controls and the sample. No numerical result or causal claim from the later updates is required here."),
      ], laborReading, "Chicago Booth Review · productivity and work", "Slide 8 and speaker notes · novice productivity versus entry-level hiring; descriptive evidence and its limits"),

    drill("worker-policy", "Work: Four Policy Responses",
      "Recall the four ways the deck proposes shaping the transition. These are policy options, not requirements imposed on every employer.", "9", [
        row("tax", "Rebalance labor-versus-capital costs or pair an automation levy with retraining subsidies.", "Tax incentives", "tax policy", "tax reform", "taxes", "taxation"),
        row("skills", "Help displaced people acquire skills for new work rather than providing income alone.", "Upskilling", "retraining", "reskilling", "skills training", "worker training"),
        row("education", "Support lifelong learning, community colleges, and labor-market counseling.", "Education", "lifelong education", "lifelong learning", "educational support"),
        row("voice", "Give workers a role in setting AI terms through bargaining or representation.", "Worker voice", "worker representation", "collective bargaining", "unions", "employee voice"),
      ], laborReading, "Chicago Booth Review · worker policy responses"),

    drill("worker-obligations", "Work: Duties Beyond the Legal Minimum",
      "Name the deck's examples of support Claire could consider for displaced recruiters. Which support is owed, and who should pay, remain open ethical questions.", "9, 14", [
        row("notice", "Give people time to plan before the change takes effect.", "Notice", "advance notice", "early notice"),
        row("severance", "Provide financial support on termination.", "Severance", "severance pay", "severance package"),
        row("retraining", "Help affected recruiters develop skills for other jobs.", "Retraining", "reskilling", "upskilling", "training"),
        note(row("new-roles", "Give affected staff a first opportunity to move into new AI-adjacent positions.", "Priority for new roles", "first shot at new roles", "redeployment", "reassignment", "priority for new jobs", "internal mobility"),
          "The notes also emphasize honesty about the reason for cuts. These examples do not establish universal statutory duties; notice, bargaining, and other obligations depend on the facts and governing law."),
      ], laborReading, "Chicago Booth Review · shaping the transition"),

    drill("florida-filings", "Judgment: Florida's Signer Responsibility",
      "Recall the technology-neutral filing rule and the companion order. Responsibility stays with the human signer even when AI assists with drafting.", "10", [
        row("rule", "Florida's amended signing rule is Rule ____ (d)(2), including subparagraph (D).", "2.515", "rule 2.515", "2.515(d)(2)", "2.515(d)(2)(D)", "rule 2.515(d)(2)(D)"),
        note(row("signer", "Who makes the filing representations: the tool, only the drafting associate, or each ____?", "Signer", "each signer", "every signer", "the signer", "signing person"),
          "The rule covers attorneys and unrepresented parties. A lawyer cannot transfer these representations to the drafting software or assume another person's check eliminates the signer's responsibility."),
        row("exist", "The identified legal authorities must actually ____.", "Exist", "existence", "be real", "actually exist"),
        row("accuracy", "Those authorities must also be accurately ____.", "Cited", "accurately cited", "citation", "cited accurately"),
        row("process", "Before sanctions, the court must provide notice and an opportunity to be ____.", "Heard", "opportunity to be heard"),
        note(row("disclosure", "Does this amendment impose a general requirement to disclose that AI assisted with the filing?", "No", "no disclosure requirement", "no AI disclosure requirement"),
          `AOSC26-12 bars local orders, policies, or practices requiring AI-use disclosure or accuracy certifications. It permits education, warnings, and internal court-employee policies. Official order: ${floridaOrder}`),
        note(row("judgment", "The deck's professional lesson: AI assistance cannot substitute for professional ____.", "Judgment", "professional judgment", "human judgment"),
          "The amendment took effect June 15, 2026. Verifying that a case exists and is accurately cited does not by itself establish that the lawyer has accurately characterized its holding or completed sound legal analysis."),
      ], floridaOpinion, "Florida Supreme Court · Rule 2.515 amendment", "SC2026-0673 · May 28, 2026 · effective June 15, 2026", `AOSC26-12 · statewide limits on local AI-disclosure and certification requirements · ${floridaOrder}`),

    drill("reliance-risks", "Judgment: Three Risks of Everyday AI Use",
      "Recall the assigned Magnifica Humanitas discussion as presented in the deck, plus its environmental costs.", "11", [
        row("reliance", "Fast, easy answers can weaken creativity and independent judgment through excessive ____.", "Reliance", "overreliance", "over-reliance", "dependence", "dependency"),
        row("objectivity", "Outputs can hide designers' cultural assumptions behind an impression of ____.", "Objectivity", "neutrality", "apparent objectivity", "false objectivity"),
        note(row("simulation", "AI can imitate care while offering only the appearance of a relationship: ____ communication.", "Simulated", "simulated communication", "simulation", "simulated empathy"),
          "The text questions what simulated interaction can replace. The seminar invites application to clients and candidates without treating the moral discussion as a settled legal prohibition."),
        row("energy", "Alongside social effects, the text calls attention to consumption of ____ and water.", "Energy", "electricity", "power"),
        row("water", "The other environmental resource paired with energy consumption.", "Water", "water resources"),
      ], magnifica, "Magnifica Humanitas · chapter 3", "Assigned sections · paragraphs 100–101 and 118–121"),

    drill("governance-comparison", "Judgment: McKinsey and Magnifica Humanitas",
      "Recall where the two readings meet and where the deck distinguishes their reasons for human oversight.", "11–12", [
        row("neutral", "Both readings reject the assumption that AI is automatically ____.", "Neutral", "objective", "unbiased", "value neutral"),
        row("humans", "Both retain ____ in the loop, although they give different reasons.", "Humans", "human beings", "people", "human oversight", "human judgment"),
        note(row("limits", "The sharp comparison: McKinsey emphasizes measuring bias and opacity; Leo also sees growth and relationship within human ____.", "Limits", "limitations", "human limits", "human limitations"),
          "This is the deck's comparison, not a claim that McKinsey denies human dignity. The assigned encyclical sections describe compassion and generosity as goods that can develop within vulnerability."),
        row("instrumental", "Trust and fair outcomes that help AI reach its potential illustrate an ____ justification for oversight.", "Instrumental", "instrumental justification", "instrumental value", "means to an end"),
        note(row("intrinsic", "Preserving judgment, relationships, and care as goods in themselves illustrates ____ value.", "Intrinsic", "intrinsic value", "inherent", "inherent value", "an end in itself"),
          "Agreement that humans should stay involved does not settle why they belong there or what the oversight is meant to preserve."),
      ], magnifica, "Magnifica Humanitas · human limits and relationships", "Slide 12 · comparison with Silberg & Manyika, McKinsey (2019)", `McKinsey assigned reading · ${biasReading}`),

    drill("delegation", "Judgment: Different in Kind or in Degree?",
      "Recall the concepts the final discussion asks you to test. The deck leaves their ultimate classification and the moral boundary open.", "13–14", [
        row("degree", "A difference in scale, speed, or cost is ordinarily framed as a difference in ____.", "Degree", "a matter of degree"),
        row("kind", "A proposed categorical difference in moral agency is framed as a difference in ____.", "Kind", "a difference in kind", "nature"),
        row("accountability", "The question 'Who must answer for this decision?' concerns ____.", "Accountability", "responsibility", "human accountability"),
        row("deskilling", "A nominal human reviewer gradually loses the competence to check the system. Name the risk.", "Deskilling", "de-skilling", "skill erosion", "loss of skills", "loss of competence"),
        note(row("certification", "Florida illustrates a legal response that names a responsible human through the signer's filing ____.", "Certification", "representation", "representations", "personal certification", "signer certification"),
          "The seminar also compares bans, process duties, and liability for harmful effects. Its central question remains open: which tool fits the reason a particular use of AI is troubling? A human's presence alone does not guarantee meaningful oversight."),
      ], floridaOpinion, "Florida Supreme Court · human filing responsibility", "Slides 13–14 · open discussion of accountability, conscience, empathy, and deskilling"),
  ],
};
