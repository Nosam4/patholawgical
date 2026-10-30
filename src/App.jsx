import { useEffect, useMemo, useRef, useState } from "react";
import { courseCatalog } from "./courseData.js";
import FlowchartStage from "./FlowchartStage.jsx";
import CompletionConfetti from "./CompletionConfetti.jsx";
import {
  findMatchingAnswer,
  findNextFieldAnswerId,
  findPreviousFieldAnswerId,
  getColumnMnemonicClues,
  getNextActiveAnswerIdAfterMatch,
  getQuestionAnswers,
  normalizeAnswer,
  questionHasMnemonic,
} from "./quizLogic.js";

import { latestResumableRun, missedAnswerIds, questionRevision, savedRunFor } from "./studyProgress.js";
import { createProgressStore, createRunId } from "./progressStore.js";
import { OVERVIEW_COURSE_ID, OVERVIEW_REVIEW_LEVELS, getOverviewQuestionLevel, getOverviewSubjects } from "./overviewReview.js";
import { nextRandomQuestion } from "./randomPractice.js";

function firstSubjectFor(course) {
  return course?.subjects[0] ?? null;
}

function firstQuestionFor(subject) {
  return subject?.questions[0] ?? null;
}

function questionTypeLabel(question) {
  if (question?.recallMode === "list") return "List recall";
  return question?.type === "sporcle-grid" ? "Sporcle-style" : "Flowchart";
}

function CourseSources({ question }) {
  if (!question.courseSources?.length) return null;
  return (
    <details className="source-line course-sources">
      <summary>Course material</summary>
      <ul>{question.courseSources.map((reference) => <li key={reference}>{reference}</li>)}</ul>
    </details>
  );
}

function ListRecall({
  question,
  guessedIds,
  revealed,
  contextIds,
  draft,
  onDraftChange,
  onSubmit,
  runClosed,
  showMnemonics,
  focusVersion,
}) {
  const inputRef = useRef(null);
  const entries = question.columns.flatMap((column) => {
    const mnemonicClues = getColumnMnemonicClues(column);
    return column.answers.map((answer, index) => ({ answer, mnemonic: mnemonicClues[index] }));
  });

  useEffect(() => {
    if (!runClosed) inputRef.current?.focus();
  }, [question.id, runClosed, focusVersion]);

  return (
    <section className="panel list-recall-panel" aria-label="List recall answers">
      {question.sourceUrl ? (
        <p className="source-line">
          Source:{" "}
          <a href={question.sourceUrl} target="_blank" rel="noreferrer">
            {question.sourceLabel ?? question.sourceUrl}
          </a>
        </p>
      ) : null}
      <CourseSources question={question} />

      <form className="list-entry-form" onSubmit={(event) => {
        onSubmit(event);
        inputRef.current?.focus();
      }}>
        <label htmlFor="listAnswer">List answer</label>
        <div className="guess-row">
          <input
            ref={inputRef}
            id="listAnswer"
            type="text"
            autoComplete="off"
            aria-describedby="listEntryHint"
            placeholder="Recall an item from the list"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            disabled={runClosed}
          />
          <button type="submit" disabled={runClosed}>Submit answer</button>
        </div>
        <p className="keyboard-hint" id="listEntryHint">Enter one item at a time, in any order. Press Enter to submit.</p>
      </form>

      <ol className="list-recall-answers" id="listRecallAnswers">
        {entries.map(({ answer, mnemonic }, index) => {
          const isContext = answer.quiz === false || contextIds.has(answer.id);
          const solved = !isContext && guessedIds.has(answer.id);
          const missed = !isContext && !solved && revealed;
          const showAnswer = isContext || solved || revealed;
          return (
            <li
              key={answer.id}
              data-answer-id={answer.id}
              className={`list-recall-item${solved ? " correct" : ""}${missed ? " revealed" : ""}${isContext ? " context" : ""}`}
            >
              <span className="list-item-number" aria-hidden="true">{index + 1}</span>
              {showMnemonics && mnemonic ? (
                <span className="list-item-mnemonic" aria-label={`Mnemonic ${mnemonic}${answer.mnemonicLabel ? `: ${answer.mnemonicLabel}` : ""}`} title={answer.mnemonicLabel}>{mnemonic}</span>
              ) : null}
              <div className="list-item-content">
                {showAnswer ? (
                  <>
                    <span className="list-item-answer">{answer.answer}</span>
                    {runClosed && answer.explanation ? <p className="list-item-explanation">{answer.explanation}</p> : null}
                  </>
                ) : (
                  <span className="list-item-blank" aria-label={`Unrecalled item ${index + 1}`} />
                )}
              </div>
              {solved || missed || isContext ? (
                <span className="list-item-status">{solved ? "Recalled" : missed ? "Missed" : "Previously recalled"}</span>
              ) : null}
            </li>
          );
        })}
      </ol>
      {runClosed && question.listExplanation ? <p className="list-explanation">{question.listExplanation}</p> : null}
    </section>
  );
}

function SporcleGrid({
  question,
  guessedIds,
  revealed,
  activeAnswerId,
  draft,
  onActivate,
  onDraftChange,
  onFieldKeyDown,
  onSubmit,
  showMnemonics,
  contextIds,
}) {
  return (
    <section className={`panel sporcle-panel${question.clueLayout === "above" ? " stacked-clues" : ""}${question.answerLayout === "stacked" ? " stacked-answers" : ""}`}>
      {question.sourceUrl ? (
        <p className="source-line">
          Source:{" "}
          <a href={question.sourceUrl} target="_blank" rel="noreferrer">
            {question.sourceLabel ?? question.sourceUrl}
          </a>
        </p>
      ) : null}

      <CourseSources question={question} />

      <div className="sporcle-grid" id="sporcleGrid">
        {question.columns.map((column) => {
          const mnemonicClues = getColumnMnemonicClues(column);
          const showColumnMnemonic = showMnemonics && mnemonicClues.some(Boolean);

          return (
            <section className="sporcle-column" key={column.id}>
              <h3>{column.title}</h3>
              <ol className="answer-list">
                {column.answers.map((answer, answerIndex) => {
                  const isStatic = answer.quiz === false || contextIds.has(answer.id);
                  const solved = !isStatic && guessedIds.has(answer.id);
                  const showAnswer = isStatic || solved || revealed;
                  const active = activeAnswerId === answer.id;

                  return (
                    <li
                      data-answer-id={answer.id}
                      className={[
                        "answer-row",
                        answer.indicator ? "has-indicator" : "",
                        solved ? "correct" : "",
                        !isStatic && !solved && revealed ? "revealed" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={answer.id}
                    >
                      {answer.indicator ? (
                        <div className={`answer-indicator${answer.indicatorDetails?.length ? " has-details" : ""}`}>
                          <span id={`answer-clue-${answer.id}`}>{answer.indicator}</span>
                          {answer.indicatorDetails?.length ? (
                            <ul className="indicator-details">
                              {answer.indicatorDetails.map((detail) => (
                                <li key={detail.rule}>
                                  <a href={detail.sourceUrl} target="_blank" rel="noreferrer">FRE {detail.rule}</a>
                                  {" — "}{detail.text}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ) : null}
                      {showColumnMnemonic ? (
                        <span
                          aria-label={`Mnemonic ${mnemonicClues[answerIndex] ?? ""}${answer.mnemonicLabel ? `: ${answer.mnemonicLabel}` : ""}`}
                          className="mnemonic-clue"
                          title={answer.mnemonicLabel}
                        >
                          {mnemonicClues[answerIndex] ?? ""}
                        </span>
                      ) : null}
                      <div className="answer-slot">
                        {showAnswer ? (
                          <>
                            <span className="answer-value">{answer.answer}</span>
                            {answer.explanation ? <p className="answer-explanation">{answer.explanation}</p> : null}
                          </>
                        ) : active ? (
                          <form onSubmit={(event) => onSubmit(event, column, answer)}>
                            <input
                              aria-label={`Answer ${answerIndex + 1} for ${column.title}`}
                              aria-describedby={answer.indicator ? `answer-clue-${answer.id} gridKeyboardHint` : "gridKeyboardHint"}
                              autoComplete="off"
                              autoFocus
                              onChange={(event) => onDraftChange(event.target.value)}
                              onKeyDown={(event) => onFieldKeyDown(event, column, answer)}
                              value={draft}
                            />
                          </form>
                        ) : (
                          <button
                            aria-label={`Blank answer ${answerIndex + 1} for ${column.title}`}
                            aria-describedby={answer.indicator ? `answer-clue-${answer.id}` : undefined}
                            className="blank-answer"
                            onClick={() => onActivate(answer.id)}
                            type="button"
                          >
                            <span />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}

export default function App() {
  const firstCourse = courseCatalog[0] ?? null;
  const firstSubject = firstSubjectFor(firstCourse);
  const firstQuestion = firstQuestionFor(firstSubject);

  const [progressStore] = useState(() => createProgressStore());
  const [progressMap, setProgressMap] = useState(() => progressStore.read());
  const [storageError, setStorageError] = useState(false);
  const [pendingSaves, setPendingSaves] = useState(0);
  const activeSessionRef = useRef({ questionId: firstQuestion?.id, runId: null });
  const [targetIds, setTargetIds] = useState(null);
  const [practice, setPractice] = useState(false);
  const [runStarted, setRunStarted] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const controlsRef = useRef(null);
  const randomBagsRef = useRef(new Map());

  const [courseId, setCourseId] = useState(firstCourse?.id ?? "");
  const [overviewReviewLevel, setOverviewReviewLevel] = useState("core");
  const [subjectId, setSubjectId] = useState(firstSubject?.id ?? "");
  const [questionId, setQuestionId] = useState(firstQuestion?.id ?? "");
  const [guessedIds, setGuessedIds] = useState(() => new Set());
  const [revealed, setRevealed] = useState(false);
  const [flowchartGuess, setFlowchartGuess] = useState("");
  const [activeAnswerId, setActiveAnswerId] = useState("");
  const [sporcleDraft, setSporcleDraft] = useState("");
  const [showMnemonics, setShowMnemonics] = useState(false);
  const [listFocusVersion, setListFocusVersion] = useState(0);
  const [message, setMessage] = useState("Choose a blank and start filling from memory.");
  const flowchartInputRef = useRef(null);

  const course = useMemo(
    () => courseCatalog.find((item) => item.id === courseId) ?? null,
    [courseId],
  );
  const subjects = useMemo(
    () => getOverviewSubjects(course, overviewReviewLevel),
    [course, overviewReviewLevel],
  );
  const isOverview = course?.id === OVERVIEW_COURSE_ID;
  const reviewLevel = OVERVIEW_REVIEW_LEVELS.find((level) => level.id === overviewReviewLevel);
  const subject = useMemo(
    () => subjects.find((item) => item.id === subjectId) ?? null,
    [subjects, subjectId],
  );
  const question = useMemo(
    () => subject?.questions.find((item) => item.id === questionId) ?? null,
    [subject, questionId],
  );
  const isListRecall = question?.recallMode === "list";
  const answers = getQuestionAnswers(question);
  const targets = targetIds ?? answers.map((answer) => answer.id);
  const totalBlanks = targets.length;
  const contextIds = new Set(answers.filter((answer) => !targets.includes(answer.id)).map((answer) => answer.id));
  const navigationQuestion = question?.type === "sporcle-grid" ? {
    ...question, columns: question.columns.map((column) => ({ ...column,
      answers: column.answers.filter((answer) => targets.includes(answer.id)),
    })),
  } : question;
  const runClosed = revealed || (totalBlanks > 0 && guessedIds.size === totalBlanks);
  const entry = progressMap[questionId];
  const currentProgress = question && entry?.revision === questionRevision(question) ? entry : null;
  const missedIds = question ? missedAnswerIds(question, entry) : [];
  const resumable = latestResumableRun(courseCatalog, progressMap);

  useEffect(() => progressStore.subscribe(setProgressMap), [progressStore]);

  async function persistRun(nextGuesses, closed = false, nextTargets = targets, nextPractice = practice, newRun = false) {
    const session = activeSessionRef.current;
    const sequence = session.saveSequence = (session.saveSequence ?? 0) + 1;
    if (newRun) session.runId = createRunId();
    setRunStarted(true);
    setPendingSaves((count) => count + 1);
    try {
      const saving = progressStore.save({ question, targetIds: [...nextTargets],
        guessedIds: new Set(nextGuesses), practice: nextPractice, closed,
        runId: session.runId, newRun });
      const stagedProgress = progressStore.read();
      setProgressMap(stagedProgress);
      session.runId ??= stagedProgress[question.id]?.run?.id ?? null;
      const result = await saving;
      setProgressMap(progressStore.read());
      setStorageError(!result.saved);
      // A save may finish after the student switches drills or starts again.
      if (activeSessionRef.current !== session || session.saveSequence !== sequence) return;
      session.runId = result.runId;
      const run = result.entry.run;
      setTargetIds(run.targetIds);
      setGuessedIds(new Set(run.guessedIds));
      setPractice(run.practice);
      setRevealed(run.closed && run.guessedIds.length < run.targetIds.length);
      setActiveAnswerId((id) => run.closed || run.guessedIds.includes(id) ? "" : id);
      if (result.conflict) {
        setConfettiBurst(0);
        setFlowchartGuess("");
        setSporcleDraft("");
        setMessage("Another tab changed this drill. Its latest saved run is now shown.");
      } else if (run.closed && !closed && run.guessedIds.length === run.targetIds.length) {
        setMessage("Complete. All blanks filled.");
        setConfettiBurst((burst) => burst + 1);
      }
    } catch {
      setStorageError(true);
    } finally {
      setPendingSaves((count) => count - 1);
    }
  }

  function resumeRun() {
    if (!resumable) return;
    const { course: nextCourse, subject: nextSubject, question: nextQuestion, run } = resumable;
    if (nextCourse.id === OVERVIEW_COURSE_ID &&
        !getOverviewSubjects(nextCourse, overviewReviewLevel)
          .some((item) => item.questions.some((question) => question.id === nextQuestion.id))) {
      setOverviewReviewLevel(getOverviewQuestionLevel(nextQuestion.id));
    }
    setCourseId(nextCourse.id);
    setSubjectId(nextSubject.id);
    setQuestionId(nextQuestion.id);
    resetRun("Saved run resumed.", nextQuestion.id);
    activeSessionRef.current.runId = progressMap[nextQuestion.id]?.run?.id ?? null;
    setTargetIds(run.targetIds);
    setGuessedIds(new Set(run.guessedIds));
    setPractice(run.practice);
    setRunStarted(true);
  }

  function startFresh() {
    resetRun("New run started.");
    persistRun(new Set(), false, answers.map((answer) => answer.id), false, true);
  }

  function practiceMissed() {
    if (!missedIds.length) return;
    resetRun("Practice the missed blanks. Previously correct answers are shown as context.");
    setTargetIds(missedIds);
    setPractice(true);
    persistRun(new Set(), false, missedIds, true, true);
  }
  const hasMnemonic = questionHasMnemonic(question);

  useEffect(() => {
    if (question?.type === "flowchart") {
      flowchartInputRef.current?.focus();
    }
  }, [question?.id, question?.type]);

  useEffect(() => {
    setShowMnemonics(false);
  }, [question?.id]);

  function resetRun(nextMessage = "Fresh run started.", nextQuestionId = questionId) {
    activeSessionRef.current = { questionId: nextQuestionId, runId: null };
    setConfettiBurst(0);
    setTargetIds(null);
    setPractice(false);
    setRunStarted(false);
    setGuessedIds(new Set());
    setRevealed(false);
    setFlowchartGuess("");
    setActiveAnswerId("");
    setSporcleDraft("");
    if (isListRecall) {
      setShowMnemonics(false);
      setListFocusVersion((version) => version + 1);
    }
    setMessage(nextMessage);
  }

  function chooseCourse(nextCourseId) {
    const nextCourse = courseCatalog.find((item) => item.id === nextCourseId);
    const nextSubject = getOverviewSubjects(nextCourse, overviewReviewLevel)[0];
    const nextQuestion = firstQuestionFor(nextSubject);

    setCourseId(nextCourse?.id ?? "");
    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    loadQuestionRun(nextQuestion, "Class switched.");
  }

  function chooseSubject(nextSubjectId) {
    const nextSubject = subjects.find((item) => item.id === nextSubjectId);
    const nextQuestion = firstQuestionFor(nextSubject);

    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    loadQuestionRun(nextQuestion, "Subject switched.");
  }

  function chooseReviewLevel(nextLevel) {
    const nextSubjects = getOverviewSubjects(course, nextLevel);
    const nextSubject = nextSubjects.find((item) => item.id === subjectId) ?? nextSubjects[0];
    const nextQuestion = nextSubject?.questions.find((item) => item.id === questionId)
      ?? firstQuestionFor(nextSubject);
    setOverviewReviewLevel(nextLevel);
    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    if (nextQuestion?.id !== questionId) {
      loadQuestionRun(nextQuestion, "Review depth switched.");
    }
  }

  function chooseQuestion(nextQuestionId, nextMessage = "Question switched.") {
    setQuestionId(nextQuestionId);
    loadQuestionRun(subject?.questions.find((item) => item.id === nextQuestionId), nextMessage);
  }

  function randomizeQuestion() {
    if (!subject || subject.questions.length < 2) return;
    const scope = JSON.stringify([courseId, subjectId, isOverview ? overviewReviewLevel : "all"]);
    const next = nextRandomQuestion(subject.questions, questionId, randomBagsRef.current.get(scope));
    randomBagsRef.current.set(scope, next.remainingIds);
    const nextQuestion = subject.questions.find((item) => item.id === next.questionId);
    chooseQuestion(next.questionId, `Random drill: ${nextQuestion.title}.`);
  }

  function loadQuestionRun(nextQuestion, nextMessage) {
    resetRun(nextMessage, nextQuestion?.id);
    const latestProgress = progressStore.read();
    setProgressMap(latestProgress);
    const run = nextQuestion && savedRunFor(nextQuestion, latestProgress[nextQuestion.id]);
    if (!run) return;
    activeSessionRef.current.runId = latestProgress[nextQuestion.id]?.run?.id ?? null;
    setTargetIds(run.targetIds);
    setGuessedIds(new Set(run.guessedIds));
    setPractice(run.practice);
    setRunStarted(true);
    setMessage(`${nextQuestion.title}. Saved run resumed.`);
  }

  function markCorrect(answerEntry) {
    const nextGuessedIds = new Set(guessedIds);
    nextGuessedIds.add(answerEntry.id);
    setGuessedIds(nextGuessedIds);
    persistRun(nextGuessedIds, nextGuessedIds.size === totalBlanks);

    if (nextGuessedIds.size === totalBlanks) {
      setMessage("Complete. All blanks filled.");
      setConfettiBurst((burst) => burst + 1);
    } else {
      setMessage(`Correct: ${answerEntry.answer}`);
    }

    return nextGuessedIds;
  }

  function handleFlowchartSubmit(event) {
    event.preventDefault();

    if (!question || runClosed) {
      setMessage("This run is locked. Start a fresh run to keep guessing.");
      return;
    }

    const normalizedGuess = normalizeAnswer(flowchartGuess);

    if (!normalizedGuess) {
      setMessage("Type a phrase before submitting.");
      return;
    }

    const matchedNode = findMatchingAnswer(
      answers.filter((answer) => targets.includes(answer.id)),
      guessedIds,
      normalizedGuess,
    );

    if (!matchedNode) {
      setMessage("No match yet.");
      return;
    }

    markCorrect(matchedNode);
    setFlowchartGuess("");
  }

  function handleSporcleSubmit(event, column, activeAnswer) {
    event.preventDefault();

    if (!question || runClosed) {
      setMessage("This run is locked. Start a fresh run to keep guessing.");
      return;
    }

    const normalizedGuess = normalizeAnswer(sporcleDraft);

    if (!normalizedGuess) {
      setMessage("Type an answer before submitting.");
      return;
    }

    const matchedAnswer = findMatchingAnswer(
      [activeAnswer].filter((answer) => targets.includes(answer.id)),
      guessedIds,
      normalizedGuess,
    );

    if (!matchedAnswer) {
      setMessage("No match for this blank yet.");
      return;
    }

    const nextGuessedIds = markCorrect(matchedAnswer);
    setActiveAnswerId(
      getNextActiveAnswerIdAfterMatch({
        question: navigationQuestion,
        columnId: column.id,
        activeAnswerId: activeAnswer.id,
        matchedAnswerId: matchedAnswer.id,
        guessedIds: nextGuessedIds,
      }),
    );
    setSporcleDraft("");
  }

  function handleListSubmit(event) {
    event.preventDefault();
    if (!question || runClosed) return;

    const normalizedGuess = normalizeAnswer(sporcleDraft);
    if (!normalizedGuess) {
      setMessage("Type a list item before submitting.");
      return;
    }

    const targetedAnswers = answers.filter((answer) => targets.includes(answer.id));
    const matchedAnswer = findMatchingAnswer(targetedAnswers, guessedIds, normalizedGuess);
    if (!matchedAnswer) {
      const alreadyRecalled = findMatchingAnswer(
        targetedAnswers.filter((answer) => guessedIds.has(answer.id)),
        new Set(),
        normalizedGuess,
      );
      setMessage(alreadyRecalled ? "You already recalled that item. Try another." : "No match yet. Try another wording or recall another item.");
      return;
    }

    markCorrect(matchedAnswer);
    setSporcleDraft("");
  }

  function handleSporcleFieldKeyDown(event, column, activeAnswer) {
    if (event.key === "Escape") {
      event.preventDefault();
      controlsRef.current?.focus();
      return;
    }

    // Leave Tab/Shift+Tab to the browser so every control remains reachable.
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    const moveBackward = event.key === "ArrowUp";
    const nextAnswerId = moveBackward
      ? findPreviousFieldAnswerId(navigationQuestion, column.id, activeAnswer.id, guessedIds)
      : findNextFieldAnswerId(navigationQuestion, column.id, activeAnswer.id, guessedIds);

    setActiveAnswerId(
      nextAnswerId,
    );
    setSporcleDraft("");
  }

  function handleReveal() {
    if (runClosed) return;
    persistRun(guessedIds, true);
    setRevealed(true);
    setActiveAnswerId("");
    setSporcleDraft("");
    setMessage("Missed answers are now revealed.");
  }

  if (!course || !subject || !question) {
    return (
      <main className="app-shell">
        <header className="app-header">
          <p className="eyebrow">Fall 2026 Memory Trainer</p>
          <h1>RulePath</h1>
        </header>
        <section className="panel">
          <p>Add class, subject, and question data in src/courseData.js.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      {confettiBurst > 0 ? <CompletionConfetti key={confettiBurst} /> : null}
      <header className="app-header">
        <p className="eyebrow">{course.term} Memory Trainer</p>
        <h1>RulePath</h1>
        <p className="subtitle">
          Switch by class and subject, then fill the blanks from memory.
        </p>
      </header>

      <section className="panel controls-panel">
        <div className="control-group">
          <label htmlFor="courseSelect">Class</label>
          <select
            ref={controlsRef}
            id="courseSelect"
            aria-label="Select class"
            onChange={(event) => chooseCourse(event.target.value)}
            value={course.id}
          >
            {courseCatalog.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {isOverview ? (
          <div className="control-group">
            <label htmlFor="reviewDepthSelect">Review depth</label>
            <select
              id="reviewDepthSelect"
              aria-label="Select review depth"
              aria-describedby="overviewReviewDescription"
              onChange={(event) => chooseReviewLevel(event.target.value)}
              value={overviewReviewLevel}
            >
              {OVERVIEW_REVIEW_LEVELS.map((level) => (
                <option key={level.id} value={level.id}>{level.label}</option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="control-group">
          <label htmlFor="subjectSelect">Subject</label>
          <select
            id="subjectSelect"
            aria-label="Select subject"
            onChange={(event) => chooseSubject(event.target.value)}
            value={subject.id}
          >
            {subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="questionSelect">Question</label>
          <div className="question-picker">
            <select
              id="questionSelect"
              aria-label="Select question"
              onChange={(event) => chooseQuestion(event.target.value)}
              value={question.id}
            >
              {subject.questions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button
              className="randomize-action"
              type="button"
              onClick={randomizeQuestion}
              disabled={subject.questions.length < 2}
              aria-describedby="randomizeDescription"
            >
              Randomize
            </button>
          </div>
          <p className="control-hint" id="randomizeDescription">
            {subject.questions.length < 2
              ? "Only one drill in this subject."
              : `Explore all ${subject.questions.length} drills in this subject${isOverview ? ` at ${reviewLevel.label.toLowerCase()} depth` : ""}. No repeats until the set is covered this session.`}
          </p>
        </div>
        {isOverview ? (
          <p className="review-depth-description" id="overviewReviewDescription">
            <strong>{reviewLevel.label}:</strong> {reviewLevel.description}
            {" "}{subjects.reduce((count, item) => count + item.questions.length, 0)} of{" "}
            {course.subjects.reduce((count, item) => count + item.questions.length, 0)} Overview drills.
          </p>
        ) : null}
        {Number.isInteger(course.listLimit) ? (
          <p className="list-bank-description">
            {course.subjects.reduce((count, item) => count + item.questions.length, 0)} focused lists across {course.subjects.length} subjects.
            {" "}Limited to {course.listLimit} to keep review manageable.
          </p>
        ) : null}
      </section>

      {resumable && (!runStarted || resumable.question.id !== questionId) ? (
        <section className="panel resume-panel">
          <p>Saved run: {resumable.question.title}</p>
          <button type="button" onClick={resumeRun}>Resume saved run</button>
        </section>
      ) : null}

      <section className="panel quiz-panel">
        <div className="quiz-heading">
          <div>
            <p className="mode-label">{questionTypeLabel(question)}</p>
            <h2>{question.title}</h2>
            <p className="meta">
              {course.title} / {subject.title}
            </p>
          </div>
          <p className="completion-indicator">
            {isListRecall ? `${practice ? "Practice: " : ""}Recalled ` : practice ? "Practice: " : "Filled "}{guessedIds.size} of {totalBlanks}
          </p>
        </div>

        {question.prompt ? <p className="prompt-text">{question.prompt}</p> : null}

        {question.type === "flowchart" ? (
          <form className="guess-row" onSubmit={handleFlowchartSubmit}>
            <input
              ref={flowchartInputRef}
              type="text"
              autoComplete="off"
              placeholder="Type a rule phrase"
              aria-label="Type a rule phrase"
              onChange={(event) => setFlowchartGuess(event.target.value)}
              value={flowchartGuess}
              disabled={runClosed}
            />
            <button type="submit" disabled={runClosed}>Submit Guess</button>
          </form>
        ) : null}

        <div className="action-row">
          <button type="button" onClick={handleReveal} disabled={runClosed}>
            Reveal Missed Answers
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={startFresh}
          >
            Start Fresh
          </button>
          {missedIds.length > 0 ? (
            <button type="button" className="secondary-action" onClick={practiceMissed}>
              Practice missed answers ({missedIds.length})
            </button>
          ) : null}
          {hasMnemonic ? (
            <button
              aria-controls={isListRecall ? "listRecallAnswers" : "sporcleGrid"}
              aria-pressed={showMnemonics}
              className="mnemonic-action"
              onClick={() => setShowMnemonics((isShowing) => !isShowing)}
              type="button"
            >
              {showMnemonics ? "Hide Mnemonic" : "Show Mnemonic"}
            </button>
          ) : null}
        </div>

        <p id="messageText" role="status">{message}</p>
        {question.type === "sporcle-grid" && !isListRecall ? (
          <p className="keyboard-hint" id="gridKeyboardHint">Use ↓ or ↑ to move between unanswered blanks. Tab and Shift+Tab move between controls. Escape returns to study controls.</p>
        ) : null}
        <p className="study-summary">
          Full attempts: {currentProgress?.attempts ?? 0} · Best: {currentProgress?.bestScore ?? 0}/{answers.length}
          {currentProgress?.lastAttempted ? ` · Last studied: ${currentProgress.lastAttempted}` : ""}
          {currentProgress?.practiceAttempts ? ` · Practice attempts: ${currentProgress.practiceAttempts}` : ""}
        </p>
        {pendingSaves > 0 ? <p className="save-state">Saving progress…</p>
          : runStarted && !storageError ? <p className="save-state">Progress saved in this browser.</p> : null}
        {storageError ? <p role="alert">Progress could not be saved safely in this browser. Keep this tab open to continue this session.</p> : null}
      </section>

      {isListRecall ? (
        <ListRecall
          question={question}
          guessedIds={guessedIds}
          revealed={revealed}
          contextIds={contextIds}
          draft={sporcleDraft}
          onDraftChange={setSporcleDraft}
          onSubmit={handleListSubmit}
          runClosed={runClosed}
          showMnemonics={showMnemonics}
          focusVersion={listFocusVersion}
        />
      ) : question.type === "sporcle-grid" ? (
        <SporcleGrid
          activeAnswerId={activeAnswerId}
          draft={sporcleDraft}
          guessedIds={guessedIds}
          contextIds={contextIds}
          onActivate={(answerId) => {
            setActiveAnswerId(answerId);
            setSporcleDraft("");
          }}
          onDraftChange={setSporcleDraft}
          onFieldKeyDown={handleSporcleFieldKeyDown}
          onSubmit={handleSporcleSubmit}
          question={question}
          revealed={revealed}
          showMnemonics={showMnemonics}
        />
      ) : (
        <FlowchartStage
          flowchart={question}
          guessedIds={guessedIds}
          contextIds={contextIds}
          revealed={revealed}
        />
      )}
      <button className="back-to-controls" type="button" onClick={() => controlsRef.current?.focus()}>
        Back to study controls
      </button>
    </main>
  );
}
