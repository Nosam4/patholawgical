import { evidenceDrill as drill, group as g, recall as r } from "./evidenceStudyHelpers.js";

const slides = (...references) => references.map(reference => `Evidence PowerPoints, Fall 2026: ${reference}`);
const prompt = "Recall the short answer for each distinction. Short phrases or rule numbers work. Answer or reveal a blank to read the explanation.";
const q = (key, title, columns, references, notes = []) => drill(`slides-${key}`, title, prompt, columns, [...slides(...references), ...notes]);

// Retain these foundational topics in the regular rule subjects.
// Existing drill and answer IDs preserve saved progress after the move.
export const evidenceAidsAndSummariesQuestion = q("aids-summaries", "107 vs. 1006: Illustrative Aids and Evidence", [
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
], ["Class 1. Introduction to Evidence, the Rules, & Trials, slide 16", "Class 8. Liability Insurance & Best Evidence, slide 14"], ["Current Rules 107 and 1006 distinguish an aid used only to illustrate from a summary admitted to prove content."]);

export const evidenceWitnessFoundationsQuestion = q("witness-foundations", "Witness Foundations: 603, 605, 606, and 614", [
  g("testify", "Who May Testify?",
    r("oath", "603 requires an oath or affirmation to…", "Testify truthfully", ["tell the truth", "truthfulness"], "No prescribed religious wording is required; it must impress the duty of truthfulness on the witness's conscience."),
    r("age", "Does 601 impose a blanket minimum age?", "No", ["no age limit"], "Competence does not remove the need for personal knowledge and an appropriate oath or affirmation."),
    r("judge", "605: may the presiding judge testify as a witness in that trial?", "No", ["judge cannot testify"], "A party need not object to preserve this issue."),
    r("juror", "606(a): may a juror testify before the other jurors in the trial?", "No", ["juror cannot testify"], "If called, parties must have an opportunity to object outside the jury's presence. This is distinct from post-verdict inquiries under 606(b).")),
  g("court", "Court-Called Witnesses — 614",
    r("call", "May the judge call or examine witnesses?", "Yes", ["may call and examine"]),
    r("cross", "If the court calls a witness, who may cross-examine?", "Each party", ["all parties", "both parties"]),
    r("object", "Besides objecting immediately, counsel may object at the next opportunity…", "Outside the jury's presence", ["outside jury presence", "outside the hearing of the jury"])),
], ["Class 2. Objections & Witnesses, slides 15–19, 26"]);
