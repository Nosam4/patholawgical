import { overviewListsCommercialAndCriminalQuestions } from "./overviewListsCommercialAndCriminal.js";
import { overviewListsCivilAndBusinessQuestions } from "./overviewListsCivilAndBusiness.js";
import { overviewListsFocusedExpansionQuestions } from "./overviewListsFocusedExpansion.js";
import { overviewListsBusinessEssentialsQuestions } from "./overviewListsBusinessEssentials.js";

export const OVERVIEW_LISTS_COURSE_ID = "overview-lists-fall-2026";
// This is a ceiling, not a target. New lists must earn a place in the small bank.
export const OVERVIEW_LIST_LIMIT = 15;

export const overviewListQuestions = [
  ...overviewListsCommercialAndCriminalQuestions,
  ...overviewListsCivilAndBusinessQuestions,
  ...overviewListsFocusedExpansionQuestions,
  ...overviewListsBusinessEssentialsQuestions,
];

const subjectTitles = [
  ["florida-criminal-procedure", "Florida Criminal Procedure"],
  ["florida-civil-procedure", "Florida Civil Procedure"],
  ["florida-business-entities", "Business Entities"],
  ["ucc-3", "UCC 3"],
  ["ucc-9-secured-transactions", "UCC 9: Secured Transactions"],
];

export const overviewListsCourse = {
  id: OVERVIEW_LISTS_COURSE_ID,
  title: "Overview | Lists",
  term: "Fall 2026",
  listLimit: OVERVIEW_LIST_LIMIT,
  subjects: subjectTitles.map(([id, title]) => ({
    id,
    title,
    questions: overviewListQuestions.filter((question) => question.subjectId === id),
  })),
};
