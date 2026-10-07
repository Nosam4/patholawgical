export const OVERVIEW_COURSE_ID = "overview-of-florida-law-fall-2026";

export const OVERVIEW_REVIEW_LEVELS = Object.freeze([
  Object.freeze({
    id: "core",
    label: "Core",
    description: "Foundational rules and Numbers to Know.",
  }),
  Object.freeze({
    id: "standard",
    label: "Standard",
    description: "Core plus broader topics and deadline practice.",
  }),
  Object.freeze({
    id: "comprehensive",
    label: "Comprehensive",
    description: "The full bank, including specialized and mixed review.",
  }),
]);

// Minimum review level for each whole drill. Selections are based on the existing
// drill content, not exam predictions. Keep this list explicit so catalog changes
// require a coverage decision; see docs/overview-review-levels.md for rationale.
export const OVERVIEW_QUESTION_LEVELS = Object.freeze({
  // UCC 3: negotiability, transfer, and defenses form the Core foundation.
  "ucc-3-is-the-note-cash": "core",
  "ucc-3-no-unauthorized-undertakings": "core",
  "ucc-3-commercial-paper-issues": "core",
  "ucc-3-instruments-and-parties": "core",
  "ucc-3-negotiation": "core",
  "ucc-3-holder-in-due-course": "core",
  "ucc-3-defenses": "core",
  "ucc-3-liability-sequence": "standard",
  "ucc-3-indorser-liability": "standard",
  "ucc-3-transfer-warranties": "standard",

  // UCC 9 is already a compact chain; retain its prerequisites and PMSI context.
  "ucc-9-analysis-order": "core",
  "ucc-9-collateral-types": "core",
  "ucc-9-attachment-requirements": "core",
  "ucc-9-methods-of-perfection": "core",
  "ucc-9-pmsi-creation-and-perfection": "core",
  "ucc-9-priority-hierarchy": "core",
  "ucc-9-default-remedies": "core",

  // Florida civil procedure: Core follows starting, defending, and resolving a
  // suit; Standard expands discovery, parties, management, and later remedies.
  "fl-civpro-jurisdiction": "core",
  "fl-civpro-service-and-waiver": "core",
  "fl-civpro-formal-service": "core",
  "fl-civpro-venue": "core",
  "fl-civpro-pleadings": "core",
  "fl-civpro-answers-and-amendments": "core",
  "fl-civpro-pre-answer-motions": "core",
  "fl-civpro-counterclaims-and-crossclaims": "standard",
  "fl-civpro-parties": "standard",
  "fl-civpro-intervention-and-impleader": "comprehensive",
  "fl-civpro-class-actions": "comprehensive",
  "fl-civpro-initial-disclosures": "standard",
  "fl-civpro-discovery-scope": "core",
  "fl-civpro-depositions": "standard",
  "fl-civpro-discovery-devices": "standard",
  "fl-civpro-document-discovery": "standard",
  "fl-civpro-federal-rfp-comparison": "comprehensive",
  "fl-civpro-federal-subpoena-comparison": "comprehensive",
  "fl-civpro-case-management": "standard",
  "fl-civpro-defaults-and-dismissals": "core",
  "fl-civpro-summary-judgment": "core",
  "fl-civpro-trial": "core",
  "fl-civpro-post-trial": "standard",
  "fl-civpro-appeals-and-execution": "standard",
  "fl-civpro-small-claims": "comprehensive",
  "fl-civpro-remedies": "standard",

  // Florida criminal procedure: Core follows the main pretrial and trial path;
  // Standard adds release, depositions, and courtroom details. Comprehensive
  // retains the Flowers supplements and broader discovery/remedy coverage.
  "fl-crimpro-courts-and-process": "core",
  "fl-crimpro-warrants": "comprehensive",
  "fl-crimpro-counsel": "core",
  "fl-crimpro-first-appearance": "core",
  "fl-crimpro-pretrial-release": "standard",
  "fl-crimpro-probable-cause": "core",
  "fl-crimpro-preliminary-hearing-and-charges": "core",
  "fl-crimpro-charging-documents": "core",
  "fl-crimpro-charging-sufficiency": "comprehensive",
  "fl-crimpro-pleas": "core",
  "fl-crimpro-dismissal": "core",
  "fl-crimpro-suppression-and-venue": "comprehensive",
  "fl-crimpro-joinder-and-severance": "comprehensive",
  "fl-crimpro-speedy-default": "core",
  "fl-crimpro-speedy-demand": "core",
  "fl-crimpro-speedy-expiration": "core",
  "fl-crimpro-speedy-extensions": "standard",
  "fl-crimpro-insanity": "core",
  "fl-crimpro-competency": "core",
  "fl-crimpro-alibi": "core",
  "fl-crimpro-discovery": "comprehensive",
  "fl-crimpro-depositions": "standard",
  "fl-crimpro-jury-selection": "core",
  "fl-crimpro-jury-waiver-and-alternates": "standard",
  "fl-crimpro-witnesses-and-jury-view": "standard",
  "fl-crimpro-instructions-and-deliberations": "standard",
  "fl-crimpro-verdict-and-juror-inquiries": "core",
  "fl-crimpro-presentence-report": "standard",
  "fl-crimpro-judgment-of-acquittal": "core",
  "fl-crimpro-new-trial": "core",
  "fl-crimpro-arrest-of-judgment": "standard",
  "fl-crimpro-sentence-and-postconviction": "comprehensive",
  "fl-crimpro-judicial-disqualification-and-contempt": "comprehensive",

  // Timelines: retain the focused handout drill and clock rules in Core.
  // Repeated mixed/reverse formats and specialized clocks stay available in full.
  "fl-civpro-numbers-to-know": "core",
  "fl-civpro-timelines-mixed": "comprehensive",
  "fl-civpro-timelines-clock-rules": "core",
  "fl-civpro-timelines-service": "standard",
  "fl-civpro-timelines-pleadings": "standard",
  "fl-civpro-timelines-discovery": "standard",
  "fl-civpro-timelines-management": "comprehensive",
  "fl-civpro-timelines-resolution": "standard",
  "fl-civpro-timelines-trial": "standard",
  "fl-civpro-timelines-special": "comprehensive",
  "fl-civpro-timelines-counting": "comprehensive",
  "fl-civpro-timelines-targets": "comprehensive",
  "fl-civpro-timelines-period-48-hours": "comprehensive",
  "fl-civpro-timelines-period-5-days": "comprehensive",
  "fl-civpro-timelines-period-10-days": "comprehensive",
  "fl-civpro-timelines-period-14-days": "comprehensive",
  "fl-civpro-timelines-period-15-days": "comprehensive",
  "fl-civpro-timelines-period-20-days": "comprehensive",
  "fl-civpro-timelines-period-30-days": "comprehensive",
  "fl-civpro-timelines-period-40-days": "comprehensive",
  "fl-civpro-timelines-period-45-days": "comprehensive",
  "fl-civpro-timelines-period-50-days": "comprehensive",
  "fl-civpro-timelines-period-60-days": "comprehensive",
  "fl-civpro-timelines-period-75-days": "comprehensive",
  "fl-civpro-timelines-period-90-days": "comprehensive",
  "fl-civpro-timelines-period-95-days": "comprehensive",
  "fl-civpro-timelines-period-120-days": "comprehensive",
  "fl-civpro-timelines-period-2-months": "comprehensive",
  "fl-civpro-timelines-period-6-months": "comprehensive",
  "fl-civpro-timelines-period-10-months": "comprehensive",
  "fl-civpro-timelines-period-12-months": "comprehensive",
  "fl-civpro-timelines-period-18-months": "comprehensive",
  "fl-civpro-timelines-period-24-months": "comprehensive",
  "fl-civpro-timelines-period-30-months": "comprehensive",
});

export function getOverviewQuestionLevel(questionId) {
  return Object.hasOwn(OVERVIEW_QUESTION_LEVELS, questionId)
    ? OVERVIEW_QUESTION_LEVELS[questionId]
    : "comprehensive";
}

export function getOverviewSubjects(course, level = "core") {
  if (!course) return [];
  if (course.id !== OVERVIEW_COURSE_ID) return course.subjects;

  const requestedIndex = OVERVIEW_REVIEW_LEVELS.findIndex((item) => item.id === level);
  const levelIndex = requestedIndex < 0 ? 0 : requestedIndex;
  const includedLevels = new Set(
    OVERVIEW_REVIEW_LEVELS.slice(0, levelIndex + 1).map((item) => item.id),
  );

  return course.subjects.map((subject) => ({
    ...subject,
    questions: subject.questions.filter((question) =>
      includedLevels.has(getOverviewQuestionLevel(question.id)),
    ),
  }));
}
