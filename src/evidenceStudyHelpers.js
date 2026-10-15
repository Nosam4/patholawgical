// Short recall answers with explanations shown only after answering or revealing.
export const recall = (key, indicator, answer, acceptedAnswers = [], explanation = "") => ({
  key, indicator, answer, acceptedAnswers, ...(explanation ? { explanation } : {}),
});

export const group = (key, title, ...answers) => ({ key, title, answers });

export function evidenceDrill(key, title, prompt, columns, courseSources, sourceUrl = "https://www.law.cornell.edu/rules/fre", sourceLabel = "Federal Rules of Evidence") {
  const id = `evidence-${key}`;
  return {
    id, title, prompt, type: "sporcle-grid", clueLayout: "above", answerMatching: "active", courseSources, sourceUrl, sourceLabel,
    columns: columns.map(({ key: columnKey, title: columnTitle, answers }) => ({
      id: `${id}-${columnKey}`, title: columnTitle,
      answers: answers.map(({ key: answerKey, ...answer }) => ({ id: `${id}-${answerKey}`, ...answer })),
    })),
  };
}
