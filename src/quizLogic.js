export const STORAGE_KEY = "rulepath-progress-v1";

export function localISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeAnswer(text) {
  return String(text)
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularizeNormalizedAnswer(text) {
  return text
    .split(" ")
    .map((word) => {
      if (word.length <= 3 || word.endsWith("ss") || !word.endsWith("s")) {
        return word;
      }

      return word.slice(0, -1);
    })
    .join(" ");
}

export function isAnswerMatch(answerEntry, normalizedGuess) {
  if (!normalizedGuess) {
    return false;
  }

  const accepted = [answerEntry.answer, ...(answerEntry.acceptedAnswers ?? [])];
  const singularGuess = singularizeNormalizedAnswer(normalizedGuess);

  return accepted.some((item) => {
    const normalizedAccepted = normalizeAnswer(item);
    return (
      normalizedAccepted === normalizedGuess
      || singularizeNormalizedAnswer(normalizedAccepted) === singularGuess
    );
  });
}

export const isNodeMatch = isAnswerMatch;

export function findMatchingAnswer(answers, guessedIds, normalizedGuess) {
  return (
    answers.find(
      (answer) => !guessedIds.has(answer.id) && isAnswerMatch(answer, normalizedGuess),
    ) ?? null
  );
}

function findFirstUnansweredAnswerId(answers, guessedIds) {
  return answers.find((answer) => !guessedIds.has(answer.id))?.id ?? "";
}

export function findNextUnansweredAnswerId(
  question,
  currentColumnId,
  currentAnswerId,
  guessedIds,
) {
  if (!question || question.type !== "sporcle-grid") {
    return "";
  }

  const columns = question.columns;
  const currentColumnIndex = columns.findIndex((column) => column.id === currentColumnId);

  if (currentColumnIndex === -1) {
    return findFirstUnansweredAnswerId(getQuestionAnswers(question), guessedIds);
  }

  const currentColumn = columns[currentColumnIndex];
  const currentAnswerIndex = currentColumn.answers.findIndex(
    (answer) => answer.id === currentAnswerId,
  );
  const laterInColumn = currentColumn.answers.slice(currentAnswerIndex + 1);
  const nextInCurrentColumn = findFirstUnansweredAnswerId(laterInColumn, guessedIds)
    || findFirstUnansweredAnswerId(currentColumn.answers, guessedIds);

  if (nextInCurrentColumn) {
    return nextInCurrentColumn;
  }

  for (let index = currentColumnIndex + 1; index < columns.length; index += 1) {
    const nextInColumn = findFirstUnansweredAnswerId(columns[index].answers, guessedIds);

    if (nextInColumn) {
      return nextInColumn;
    }
  }

  for (let index = 0; index < currentColumnIndex; index += 1) {
    const nextInColumn = findFirstUnansweredAnswerId(columns[index].answers, guessedIds);

    if (nextInColumn) {
      return nextInColumn;
    }
  }

  return "";
}

export function findNextFieldAnswerId(
  question,
  currentColumnId,
  currentAnswerId,
  guessedIds,
) {
  if (!question || question.type !== "sporcle-grid") {
    return "";
  }

  const columns = question.columns;
  const currentColumnIndex = columns.findIndex((column) => column.id === currentColumnId);

  if (currentColumnIndex === -1) {
    return findFirstUnansweredAnswerId(getQuestionAnswers(question), guessedIds);
  }

  const currentColumn = columns[currentColumnIndex];
  const currentAnswerIndex = currentColumn.answers.findIndex(
    (answer) => answer.id === currentAnswerId,
  );

  if (currentAnswerIndex === -1) {
    return findFirstUnansweredAnswerId(currentColumn.answers, guessedIds)
      || findFirstUnansweredAnswerId(getQuestionAnswers(question), guessedIds);
  }

  const laterInCurrentColumn = currentColumn.answers.slice(currentAnswerIndex + 1);
  const nextInCurrentColumn = findFirstUnansweredAnswerId(
    laterInCurrentColumn,
    guessedIds,
  );

  if (nextInCurrentColumn) {
    return nextInCurrentColumn;
  }

  for (let index = currentColumnIndex + 1; index < columns.length; index += 1) {
    const nextInColumn = findFirstUnansweredAnswerId(columns[index].answers, guessedIds);

    if (nextInColumn) {
      return nextInColumn;
    }
  }

  for (let index = 0; index <= currentColumnIndex; index += 1) {
    const searchAnswers = index === currentColumnIndex
      ? columns[index].answers.slice(0, currentAnswerIndex)
      : columns[index].answers;
    const nextInColumn = findFirstUnansweredAnswerId(searchAnswers, guessedIds);

    if (nextInColumn) {
      return nextInColumn;
    }
  }

  return guessedIds.has(currentAnswerId) ? "" : currentAnswerId;
}

export function findPreviousFieldAnswerId(
  question,
  currentColumnId,
  currentAnswerId,
  guessedIds,
) {
  if (!question || question.type !== "sporcle-grid") {
    return "";
  }

  const columns = question.columns;
  const currentColumnIndex = columns.findIndex((column) => column.id === currentColumnId);

  if (currentColumnIndex === -1) {
    const answers = getQuestionAnswers(question);
    return findFirstUnansweredAnswerId([...answers].reverse(), guessedIds);
  }

  const currentColumn = columns[currentColumnIndex];
  const currentAnswerIndex = currentColumn.answers.findIndex(
    (answer) => answer.id === currentAnswerId,
  );

  if (currentAnswerIndex === -1) {
    return findFirstUnansweredAnswerId([...currentColumn.answers].reverse(), guessedIds)
      || findFirstUnansweredAnswerId([...getQuestionAnswers(question)].reverse(), guessedIds);
  }

  const earlierInCurrentColumn = currentColumn.answers
    .slice(0, currentAnswerIndex)
    .reverse();
  const previousInCurrentColumn = findFirstUnansweredAnswerId(
    earlierInCurrentColumn,
    guessedIds,
  );

  if (previousInCurrentColumn) {
    return previousInCurrentColumn;
  }

  for (let index = currentColumnIndex - 1; index >= 0; index -= 1) {
    const previousInColumn = findFirstUnansweredAnswerId(
      [...columns[index].answers].reverse(),
      guessedIds,
    );

    if (previousInColumn) {
      return previousInColumn;
    }
  }

  for (let index = columns.length - 1; index >= currentColumnIndex; index -= 1) {
    const searchAnswers = index === currentColumnIndex
      ? currentColumn.answers.slice(currentAnswerIndex + 1).reverse()
      : [...columns[index].answers].reverse();
    const previousInColumn = findFirstUnansweredAnswerId(searchAnswers, guessedIds);

    if (previousInColumn) {
      return previousInColumn;
    }
  }

  return guessedIds.has(currentAnswerId) ? "" : currentAnswerId;
}

export function getNextActiveAnswerIdAfterMatch({
  question,
  columnId,
  activeAnswerId,
  matchedAnswerId,
  guessedIds,
}) {
  if (guessedIds.size === getQuestionAnswerCount(question)) {
    return "";
  }

  if (matchedAnswerId !== activeAnswerId) {
    return activeAnswerId;
  }

  return findNextUnansweredAnswerId(question, columnId, activeAnswerId, guessedIds);
}

export function getQuestionAnswers(question) {
  if (!question) {
    return [];
  }

  if (question.type === "sporcle-grid") {
    return question.columns.flatMap((column) => column.answers);
  }

  return question.nodes ?? [];
}

export function getQuestionAnswerCount(question) {
  return getQuestionAnswers(question).length;
}

export function getColumnMnemonicClues(column) {
  if (typeof column?.mnemonic === "string") {
    return Array.from(column.mnemonic.replace(/\s+/g, ""));
  }

  if (Array.isArray(column?.mnemonic)) {
    return column.mnemonic.map((clue) => String(clue ?? "").trim());
  }

  return [];
}

export function questionHasMnemonic(question) {
  return question?.type === "sporcle-grid"
    && question.columns.some((column) => getColumnMnemonicClues(column).some(Boolean));
}

export function readProgressMap(storage = globalThis.localStorage) {
  if (!storage) {
    return {};
  }

  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

export function writeProgressMap(map, storage = globalThis.localStorage) {
  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function numberOrZero(value) {
  return Number.isFinite(value) ? value : 0;
}

export function buildUpdatedProgressMap({
  progressMap,
  question,
  flowchart,
  score,
  attemptedOn = localISODate(),
}) {
  const currentQuestion = question ?? flowchart;
  const current = progressMap?.[currentQuestion.id] ?? {};
  const total = getQuestionAnswerCount(currentQuestion);
  const nextEntry = {
    attempts: numberOrZero(current.attempts) + 1,
    bestScore: Math.max(numberOrZero(current.bestScore), score),
    lastAttempted: attemptedOn,
    lastTotal: total,
  };

  return {
    ...(progressMap ?? {}),
    [currentQuestion.id]: nextEntry,
  };
}
