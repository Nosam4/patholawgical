import { evidenceDrill as drill, group as g, recall as r } from "./evidenceStudyHelpers.js";

const class20 = "Class 20. Presence Sense Impressions, Excited Utterances, and State of Mind - Fall 2026.pptx";
const class21Medical = "Class 21. Medical Records, Recorded Recollection, and Hearsay in Hearsay - Fall 2026.pptx";
const class21Business = "Class 21. Business Records - Fall 2026.pptx";
const rulesPdf = "https://www.uscourts.gov/sites/default/files/document/federal-rules-of-evidence.pdf";
const source = (deck, pages) => `Evidence PowerPoints: ${deck}, slides ${pages}.`;

function elementList(key, title, prompt, answers, courseSources, listExplanation, page = 33) {
  return {
    ...drill(`hearsay-${key}`, title, prompt, [g("elements", "Elements", ...answers)], courseSources,
      `${rulesPdf}#page=${page}`, "FRE 803 — official rule text"),
    recallMode: "list",
    answerMatching: "column",
    answerLayout: "stacked",
    listExplanation,
  };
}

export const evidenceHearsayQuestions = [
  elementList("803-1", "FRE 803(1): Present Sense Impression — Two Requirements",
    "Recall the professor's two requirements for a present sense impression. Enter one requirement at a time, in any order. Short phrases work.", [
      r("description", "1", "Description or explanation of an event or condition", [
        "description of event or condition", "description of an event or condition", "describes or explains an event or condition", "description", "description or explanation",
      ], "The declarant must perceive the event or condition. The course contrasts description with analysis of the situation."),
      r("timing", "2", "Made while perceiving the event or immediately thereafter", [
        "while perceiving or immediately thereafter", "while or immediately after perceiving", "while or immediately after", "while perceiving event or immediately thereafter", "contemporaneous or immediately after",
      ], "A later narrative does not qualify merely because it describes the event. Apply the while-or-immediately-after requirement."),
    ], [source(class20, "2–3, 9")],
    "Declarant availability does not matter under Rule 803. For 803(1), the slides emphasize description without analysis and a statement made while perceiving the event or immediately afterward. Excited utterance instead turns on continuing stress."),

  elementList("803-2", "FRE 803(2): Excited Utterance — Two Requirements",
    "Recall the professor's two requirements for an excited utterance. Enter one requirement at a time, in any order. Short phrases work.", [
      r("stress", "1", "Declarant spoke under the stress of excitement caused by a startling event", [
        "stress of excitement caused by a startling event", "under stress from startling event", "under the stress of excitement", "stress of excitement", "continuing stress from a startling event",
      ], "The startling event must cause the stress, and that stress must persist when the declarant speaks. The clock alone does not decide this requirement."),
      r("related", "2", "Statement relates to the startling event", [
        "related to the startling event", "relates to startling event", "statement is related to the startling event", "related statement",
      ], "The statement need only relate to the startling event. Unlike the course's present-sense-impression formulation, it may include analysis."),
    ], [source(class20, "2, 7, 9")],
    "No fixed elapsed-time cutoff replaces the stress requirement. A statement can qualify while the excitement continues even if it was not made immediately after the event. Declarant availability does not matter."),

  elementList("803-3", "FRE 803(3): Then-Existing State of Mind — Scope and Limit",
    "Recall what 803(3) covers and its memory-or-belief limitation. Enter each item in any order. Short phrases work.", [
      r("condition", "Scope", "Declarant's then-existing mental, emotional, sensory, or physical condition", [
        "then existing condition", "then existing state of mind", "then existing mental emotional sensory or physical condition", "current state of mind or condition", "present condition",
      ], "Includes present motive, intent, plan, feeling, pain, and bodily health. A present intent may support an inference about the declarant's later conduct."),
      r("memory-limit", "Limit", "No memory or belief to prove the remembered or believed fact, except the validity or terms of the declarant's will", [
        "memory or belief limitation", "no memory or belief to prove the remembered or believed fact except wills", "memory or belief offered to prove past facts excluded except wills", "memory or belief to prove remembered fact excluded except validity or terms of will",
      ], "'I'm angry because Tim stole $20' may show current anger, but 803(3) does not thereby prove Tim stole the money. The will exception concerns the declarant's will."),
    ], [source(class20, "18–20, 26–27, 34, 36, 38")],
    "The slides do not assign a numbered element count to 803(3). A current condition differs from a backward-looking report of a past condition. A present condition may support a relevant inference about an earlier condition. Hillmon concerns intent as evidence of later conduct; using it to prove another person's conduct raises separate limits."),

  elementList("803-4", "FRE 803(4): Medical Diagnosis or Treatment",
    "Recall the statement's purpose, reasonable pertinence, and permitted subject matter. Enter each requirement in any order. Short phrases work.", [
      r("purpose", "Purpose", "Made for medical diagnosis or treatment", [
        "for medical diagnosis or treatment", "medical diagnosis or treatment purpose", "medical purpose", "subjective purpose", "made for diagnosis or treatment",
      ], "This is the slide's subjective requirement: the declarant makes the statement to obtain diagnosis or treatment."),
      r("pertinence", "Pertinence", "Reasonably pertinent to medical diagnosis or treatment", [
        "reasonably pertinent", "reasonable pertinence", "objective pertinence", "pertinent to diagnosis or treatment", "reasonably pertinent to diagnosis or treatment",
      ], "This is the objective requirement. General cause may matter to care, while ordinary attribution of fault usually does not. Identity in abuse cases may matter to treatment or protection from the abuser."),
      r("subject", "Subject matter", "Describes medical history, past or present symptoms or sensations, their inception, or general cause", [
        "medical history symptoms sensations inception or general cause", "medical history symptoms or general cause", "history symptoms inception or cause", "medical history past or present symptoms or sensations their inception or their general cause", "permitted medical subject matter",
      ], "Past symptoms may qualify here. Unlike 803(3), the exception is not confined to a then-existing condition."),
    ], [source(class21Medical, "2–3, 6, 8, 10")],
    "The declarant need not be the patient, and the listener need not be a medical professional. Each statement must still satisfy purpose, reasonable pertinence, and subject matter. A patient's repetition of a surgeon's advice does not automatically become a statement made for diagnosis or treatment."),

  elementList("803-5", "FRE 803(5): Recorded Recollection — Six Elements",
    "Recall all six elements from the professor's recorded-recollection checklist. Enter one element at a time, in any order. Short phrases work.", [
      r("knowledge", "1", "Witness once had personal knowledge", [
        "personal knowledge", "once had personal knowledge", "witness once knew", "once knew", "firsthand knowledge",
      ], "The record must concern a matter the witness once knew about."),
      r("forgotten", "2", "Witness has forgotten", [
        "forgotten", "witness forgot", "insufficient present recollection", "cannot recall well enough", "cannot recall fully and accurately", "lack of present recollection",
      ], "The rule requires inability to recall well enough to testify fully and accurately. Total amnesia is unnecessary."),
      r("record", "3", "There is a record", [
        "record", "a record", "record exists", "existence of a record", "there must be a record",
      ], "There must be a record of the matter, rather than merely an unsupported account of lost memory."),
      r("made-adopted", "4", "Witness made or adopted that record", [
        "made or adopted", "witness made or adopted the record", "made or adopted the record", "made or adopted by witness", "witness made or adopted",
      ], "Another person's unadopted diary may refresh memory under 612, but it does not satisfy this witness's made-or-adopted requirement under 803(5)."),
      r("fresh", "5", "Witness made or adopted the record when that knowledge was fresh", [
        "fresh", "while fresh", "when fresh", "fresh in memory", "made or adopted while fresh", "made or adopted when knowledge was fresh", "made or adopted while memory was fresh",
      ], "Freshness matters when the witness makes or adopts the record. Creation need not be simultaneous with the event."),
      r("accurate", "6", "Witness testifies that info in record was accurate", [
        "accurate", "accuracy", "witness testifies record was accurate", "witness testifies that information in the record was accurate", "accurately reflects knowledge", "accurately reflects the witness's knowledge",
      ], "The record must accurately reflect the witness's knowledge at the time it was made or adopted."),
    ], [source(class21Medical, "11–19 (six-element checklist on slides 12 and 18)")],
    "If admitted under 803(5), the record may be read into evidence. It may be received as an exhibit only if the adverse party offers it. Under 612, the witness instead testifies from refreshed memory after setting the aid aside. Using an aid to refresh does not itself admit that aid.", 34),

  elementList("803-6-steps", "FRE 803(6): Business Records — Four Steps",
    "Recall the professor's four overall steps for business records. The four facts within the foundation step have a separate drill. Enter each step in any order.", [
      r("business-records", "1", "Need a business and some records", [
        "business and records", "business and some records", "a business and some records", "business records",
      ], "A business includes an organization, occupation, or calling, whether or not operated for profit. Records may concern acts, events, conditions, opinions, or diagnoses."),
      r("witness-certification", "2", "Need a qualified witness or written certification", [
        "qualified witness or written certification", "qualified witness or certification", "custodian qualified witness or certification", "custodian or qualified witness or certification",
      ], "A custodian or other qualified witness must know the recordkeeping procedures but need not have made the record. A certification must comply with 902(11), 902(12), or an authorizing statute."),
      r("foundation", "3", "Need to lay the foundation", [
        "lay the foundation", "foundation", "lay foundation", "establish foundation",
      ], "The separate foundation drill recalls knowledge, timing, regular practice, and keeping the record in the course of the activity."),
      r("trustworthiness", "4", "Need to rebut any showing of a lack of trustworthiness", [
        "rebut lack of trustworthiness", "rebut any showing of a lack of trustworthiness", "rebut untrustworthiness", "trustworthiness", "rebut showing of untrustworthiness",
      ], "Under 803(6)(E), the opponent bears the burden of showing that the information source, preparation method, or circumstances indicate untrustworthiness. The course's rebuttal step responds to such a showing."),
    ], [source(class21Business, "3–9")],
    "Step three contains the four foundation facts in the next drill. Step four does not shift the initial burden of showing untrustworthiness away from the opponent. Records prepared in anticipation of litigation can raise trustworthiness concerns.", 34),

  elementList("803-6-foundation", "FRE 803(6): Business Records — Four Foundation Facts",
    "Recall the four foundation facts within step three of the professor's business-records analysis. Enter each fact in any order. Short phrases work.", [
      r("knowledge", "1", "Made by, or from information supplied by, a person with knowledge", [
        "person with knowledge", "made by a person with knowledge", "made by person with knowledge", "someone with knowledge", "knowledge", "by or from someone with knowledge",
      ], "The slide says 'Made by a person with knowledge.' The rule also covers information transmitted by someone with knowledge. An outsider's embedded statement may still need its own hearsay route."),
      r("time", "2", "Made at or near the time the activity occurred", [
        "at or near the time", "at or near the time activity occurred", "at or near the time of the activity", "timely record", "made at or near the time",
      ], "This is the timing requirement for the business record."),
      r("practice", "3", "Making the record was the business's regular practice", [
        "regular practice to make the record", "regular practice to make record", "regular practice", "regular practice of making records", "regular practice to create records",
      ], "Regularly making this kind of record is a separate foundation fact from keeping it in the course of the business activity."),
      r("course", "4", "Kept in the course of a regularly conducted business activity", [
        "kept in the course of a regularly conducted activity", "kept in ordinary course of business", "regular course of business", "ordinary course of business", "regularly conducted business activity",
      ], "The record must be kept in the course of the activity. Mere possession by a business does not establish the exception."),
    ], [source(class21Business, "7, 11")],
    "These are the four facts inside the foundation step, rather than the entire 803(6) analysis. The separate four-step drill includes the qualified-witness/certification requirement and the response to a showing of untrustworthiness.", 34),

  drill("hearsay-805", "FRE 805: Hearsay Within Hearsay",
    "Apply a separate hearsay analysis to every layer offered for its truth. Answer or reveal a blank to read the explanation.", [
      g("layers", "Separate Each Statement",
        r("each", "How many hearsay layers offered for their truth need an admissible route?", "Every layer", ["each layer", "all layers", "every one"], "Identify each declarant, listener, and purpose. Each hearsay layer needs an exception; a layer may instead qualify as nonhearsay or an exclusion."),
        r("automatic", "A report qualifies as a business record. Does that automatically cover a customer's embedded statement for its truth?", "No", ["no each layer needs its own route"], "803(6) can cover the business record while the outsider's statement still needs another admissible route."),
        r("hotline", "Contemporaneous customer hotline description: which 803(1) exception might cover the inner statement?", "Present sense impression", ["803(1)", "803 1", "present sense"], "Business-records slide 11 uses contemporaneous hotline reports. The customer's description must independently satisfy 803(1); the business-record foundation addresses the outer record."),
        r("notice", "Customer complaints offered to show the recipient knew of a problem, rather than that the complaints were true", "Notice", ["effect on listener", "effect on the listener", "nonhearsay notice", "nonhearsay purpose"], "A notice purpose may avoid a hearsay problem for the complaints. Analyze the outer report independently and check relevance and any needed limiting instruction.")),
    ], [source(class21Medical, "20–23"), source(class21Business, "11")],
    `${rulesPdf}#page=38`, "FRE 805 — official rule text"),
];

export const evidenceHearsaySubject = {
  id: "evidence-hearsay-exception-elements",
  title: "Hearsay Exception Elements",
  questions: evidenceHearsayQuestions,
};
