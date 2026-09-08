import { buildUpdatedProgressMap, getQuestionAnswers, localISODate } from "./quizLogic.js";

export function questionRevision(question) {
  // Invalidate saved answers when the doctrine or recall targets change.
  return JSON.stringify(getQuestionAnswers(question).map(({ id, answer }) => [id, answer]));
}

export function validAnswerIds(question, ids) {
  const valid = new Set(getQuestionAnswers(question).map((answer) => answer.id));
  return [...new Set(Array.isArray(ids) ? ids.filter((id) => valid.has(id)) : [])];
}

export function savedRunFor(question, entry) {
  if (!entry?.run || entry.revision !== questionRevision(question)) return null;
  const targetIds = validAnswerIds(question, entry.run.targetIds);
  const guessedIds = validAnswerIds(question, entry.run.guessedIds)
    .filter((id) => targetIds.includes(id));
  if (!targetIds.length || entry.run.closed || guessedIds.length === targetIds.length) return null;
  return { targetIds, guessedIds, practice: entry.run.practice === true };
}

export function missedAnswerIds(question, entry) {
  return entry?.revision === questionRevision(question)
    ? validAnswerIds(question, entry.missedIds)
    : [];
}

export function saveRun({ progressMap, question, targetIds, guessedIds, practice = false,
  closed = false, now = Date.now() }) {
  const revision = questionRevision(question);
  const previous = progressMap[question.id];
  const current = previous?.revision === revision ? previous : {};
  const targets = validAnswerIds(question, targetIds);
  const guesses = validAnswerIds(question, [...guessedIds]).filter((id) => targets.includes(id));
  const run = { targetIds: targets, guessedIds: guesses, practice, closed, updatedAt: now };
  let entry = { ...current, revision, run };
  if (closed) {
    const missedIds = targets.filter((id) => !guesses.includes(id));
    if (practice) {
      // Practice scores never replace a full-drill best score.
      entry.practiceAttempts = (current.practiceAttempts || 0) + 1;
      entry.lastAttempted = localISODate(new Date(now));
      entry.missedIds = [...new Set([
        ...missedAnswerIds(question, current).filter((id) => !targets.includes(id)), ...missedIds,
      ])];
    } else {
      entry = {
        ...entry,
        ...buildUpdatedProgressMap({ progressMap: { [question.id]: current }, question,
          score: guesses.length, attemptedOn: localISODate(new Date(now)) })[question.id],
        lastScore: guesses.length, missedIds,
      };
    }
  }
  return { ...progressMap, [question.id]: entry };
}

export function latestResumableRun(catalog, progressMap) {
  const candidates = [];
  for (const course of catalog) for (const subject of course.subjects) {
    for (const question of subject.questions) {
      const entry = progressMap[question.id];
      const run = savedRunFor(question, entry);
      if (run) candidates.push({ course, subject, question, run,
        updatedAt: Number.isFinite(entry.run.updatedAt) ? entry.run.updatedAt : 0 });
    }
  }
  return candidates.sort((a, b) => b.updatedAt - a.updatedAt)[0] ?? null;
}
