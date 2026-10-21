function shuffle(ids, random) {
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
  }

  return ids;
}

// Keep the returned bag for the next call; null begins a session and [] begins a new cycle.
export function nextRandomQuestion(
  questions,
  currentQuestionId,
  remainingIds = null,
  random = Math.random,
) {
  const questionIds = [...new Set(
    questions.map((question) => question.id).filter((id) => typeof id === "string"),
  )];
  const validIds = new Set(questionIds);
  let bag = remainingIds === null
    ? shuffle(questionIds.filter((id) => id !== currentQuestionId), random)
    : [...new Set(remainingIds)].filter(
      (id) => validIds.has(id) && id !== currentQuestionId,
    );

  if (bag.length === 0) {
    bag = shuffle([...questionIds], random);

    // Preserve every question in the new cycle while preventing an immediate repeat.
    if (bag.length > 1 && bag[0] === currentQuestionId) {
      [bag[0], bag[1]] = [bag[1], bag[0]];
    }
  }

  return {
    questionId: bag[0] ?? null,
    remainingIds: bag.slice(1),
  };
}
