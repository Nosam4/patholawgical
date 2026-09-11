import { useEffect, useMemo, useRef, useState } from "react";
import { courseCatalog } from "./courseData.js";
import { buildArrows } from "./flowchartRouting.js";
import {
  findMatchingAnswer,
  findNextFieldAnswerId,
  findPreviousFieldAnswerId,
  getColumnMnemonicClues,
  getNextActiveAnswerIdAfterMatch,
  getQuestionAnswers,
  normalizeAnswer,
  questionHasMnemonic,
  readProgressMap,
  writeProgressMap,
} from "./quizLogic.js";

import { latestResumableRun, missedAnswerIds, questionRevision, saveRun, savedRunFor } from "./studyProgress.js";

function firstSubjectFor(course) {
  return course?.subjects[0] ?? null;
}

function firstQuestionFor(subject) {
  return subject?.questions[0] ?? null;
}

function questionTypeLabel(question) {
  return question?.type === "sporcle-grid" ? "Sporcle-style" : "Flowchart";
}

function FlowchartStage({ flowchart, guessedIds, revealed, contextIds }) {
  const arrows = useMemo(() => buildArrows(flowchart), [flowchart]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef.current;

    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
    }
  }, [flowchart.id]);

  return (
    <section className="panel chart-panel">
      {flowchart.sourceUrl ? (
        <p className="source-line">
          Source:{" "}
          <a href={flowchart.sourceUrl} target="_blank" rel="noreferrer">
            {flowchart.sourceLabel ?? flowchart.sourceUrl}
          </a>
        </p>
      ) : null}
      <div className="chart-scroll" ref={scrollRef}>
        <div
          className="flowchart-stage"
          style={{ width: flowchart.width, height: flowchart.height }}
        >
          <svg
            className="flowchart-canvas"
            viewBox={`0 0 ${flowchart.width} ${flowchart.height}`}
            width={flowchart.width}
            height={flowchart.height}
            aria-label={`${flowchart.title} flowchart`}
            role="img"
          >
            <defs>
              <marker
                id="arrowhead"
                markerUnits="userSpaceOnUse"
                markerWidth="10"
                markerHeight="8"
                refX="8"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 10 4, 0 8" />
              </marker>
            </defs>

            <g className="flowchart-arrows">
              {arrows.map((arrow) => (
                <g key={arrow.id}>
                  <path
                    className="arrow-line"
                    d={arrow.path}
                    markerEnd={arrow.markerEnd === false ? undefined : "url(#arrowhead)"}
                  />
                  {arrow.label ? (
                    <text
                      className="arrow-label"
                      x={arrow.labelX}
                      y={arrow.labelY}
                    >
                      {arrow.label}
                    </text>
                  ) : null}
                </g>
              ))}
            </g>

            <g className="flowchart-nodes">
              {flowchart.nodes.map((node) => {
                const isStatic = node.quiz === false || contextIds.has(node.id);
                const solved = !isStatic && guessedIds.has(node.id);
                const showAnswer = isStatic || solved || revealed;
                const className = [
                  "flow-node",
                  node.kind ? `flow-node-${node.kind}` : "",
                  isStatic ? "static" : "",
                  solved ? "correct" : "",
                  !isStatic && !solved && revealed ? "revealed" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <foreignObject
                    className="flowchart-node-wrapper"
                    key={node.id}
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                  >
                    <article className={className}>
                      {node.clue ? <p className="node-clue">{node.clue}</p> : null}
                      {showAnswer ? (
                        <p className="node-answer">{node.label ?? node.answer}</p>
                      ) : (
                        <div className="node-blank" aria-label="Unanswered blank">
                          <span />
                          <span />
                        </div>
                      )}
                    </article>
                  </foreignObject>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
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
    <section className={`panel sporcle-panel${question.clueLayout === "above" ? " stacked-clues" : ""}`}>
      {question.sourceUrl ? (
        <p className="source-line">
          Source:{" "}
          <a href={question.sourceUrl} target="_blank" rel="noreferrer">
            {question.sourceLabel ?? question.sourceUrl}
          </a>
        </p>
      ) : null}

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
                        <span className="answer-indicator">{answer.indicator}</span>
                      ) : null}
                      {showColumnMnemonic ? (
                        <span
                          aria-label={`Mnemonic ${mnemonicClues[answerIndex] ?? ""}`}
                          className="mnemonic-clue"
                        >
                          {mnemonicClues[answerIndex] ?? ""}
                        </span>
                      ) : null}
                      <div className="answer-slot">
                        {showAnswer ? (
                          <span className="answer-value">{answer.answer}</span>
                        ) : active ? (
                          <form onSubmit={(event) => onSubmit(event, column, answer)}>
                            <input
                              aria-label={`Answer ${answerIndex + 1} for ${column.title}`}
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

  const [progressMap, setProgressMap] = useState(() => readProgressMap());
  const [storageError, setStorageError] = useState(false);
  const [targetIds, setTargetIds] = useState(null);
  const [practice, setPractice] = useState(false);
  const [runStarted, setRunStarted] = useState(false);
  const controlsRef = useRef(null);

  const [courseId, setCourseId] = useState(firstCourse?.id ?? "");
  const [subjectId, setSubjectId] = useState(firstSubject?.id ?? "");
  const [questionId, setQuestionId] = useState(firstQuestion?.id ?? "");
  const [guessedIds, setGuessedIds] = useState(() => new Set());
  const [revealed, setRevealed] = useState(false);
  const [flowchartGuess, setFlowchartGuess] = useState("");
  const [activeAnswerId, setActiveAnswerId] = useState("");
  const [sporcleDraft, setSporcleDraft] = useState("");
  const [showMnemonics, setShowMnemonics] = useState(false);
  const [message, setMessage] = useState("Choose a blank and start filling from memory.");
  const flowchartInputRef = useRef(null);

  const course = useMemo(
    () => courseCatalog.find((item) => item.id === courseId) ?? null,
    [courseId],
  );
  const subject = useMemo(
    () => course?.subjects.find((item) => item.id === subjectId) ?? null,
    [course, subjectId],
  );
  const question = useMemo(
    () => subject?.questions.find((item) => item.id === questionId) ?? null,
    [subject, questionId],
  );
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

  function persistRun(nextGuesses, closed = false, nextTargets = targets, nextPractice = practice) {
    const nextMap = saveRun({ progressMap, question, targetIds: nextTargets,
      guessedIds: nextGuesses, practice: nextPractice, closed });
    setProgressMap(nextMap);
    setStorageError(!writeProgressMap(nextMap));
    setRunStarted(true);
  }

  function resumeRun() {
    if (!resumable) return;
    const { course: nextCourse, subject: nextSubject, question: nextQuestion, run } = resumable;
    setCourseId(nextCourse.id);
    setSubjectId(nextSubject.id);
    setQuestionId(nextQuestion.id);
    resetRun("Saved run resumed.");
    setTargetIds(run.targetIds);
    setGuessedIds(new Set(run.guessedIds));
    setPractice(run.practice);
    setRunStarted(true);
  }

  function startFresh() {
    resetRun("New run started.");
    persistRun(new Set(), false, answers.map((answer) => answer.id), false);
  }

  function practiceMissed() {
    if (!missedIds.length) return;
    resetRun("Practice the missed blanks. Previously correct answers are shown as context.");
    setTargetIds(missedIds);
    setPractice(true);
    persistRun(new Set(), false, missedIds, true);
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

  function resetRun(nextMessage = "Fresh run started.") {
    setTargetIds(null);
    setPractice(false);
    setRunStarted(false);
    setGuessedIds(new Set());
    setRevealed(false);
    setFlowchartGuess("");
    setActiveAnswerId("");
    setSporcleDraft("");
    setMessage(nextMessage);
  }

  function chooseCourse(nextCourseId) {
    const nextCourse = courseCatalog.find((item) => item.id === nextCourseId);
    const nextSubject = firstSubjectFor(nextCourse);
    const nextQuestion = firstQuestionFor(nextSubject);

    setCourseId(nextCourse?.id ?? "");
    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    loadQuestionRun(nextQuestion, "Class switched.");
  }

  function chooseSubject(nextSubjectId) {
    const nextSubject = course?.subjects.find((item) => item.id === nextSubjectId);
    const nextQuestion = firstQuestionFor(nextSubject);

    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    loadQuestionRun(nextQuestion, "Subject switched.");
  }

  function chooseQuestion(nextQuestionId) {
    setQuestionId(nextQuestionId);
    loadQuestionRun(subject?.questions.find((item) => item.id === nextQuestionId), "Question switched.");
  }

  function loadQuestionRun(nextQuestion, nextMessage) {
    resetRun(nextMessage);
    const run = nextQuestion && savedRunFor(nextQuestion, progressMap[nextQuestion.id]);
    if (!run) return;
    setTargetIds(run.targetIds);
    setGuessedIds(new Set(run.guessedIds));
    setPractice(run.practice);
    setRunStarted(true);
    setMessage("Saved run resumed.");
  }

  function markCorrect(answerEntry) {
    const nextGuessedIds = new Set(guessedIds);
    nextGuessedIds.add(answerEntry.id);
    setGuessedIds(nextGuessedIds);
    persistRun(nextGuessedIds, nextGuessedIds.size === totalBlanks);

    if (nextGuessedIds.size === totalBlanks) {
      setMessage("Complete. All blanks filled.");
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
      column.answers.filter((answer) => targets.includes(answer.id)),
      guessedIds,
      normalizedGuess,
    );

    if (!matchedAnswer) {
      setMessage(`No match in ${column.title} yet.`);
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

  function handleSporcleFieldKeyDown(event, column, activeAnswer) {
    if (event.key !== "Tab" && event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    const moveBackward = event.key === "ArrowUp" || (event.key === "Tab" && event.shiftKey);
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

        <div className="control-group">
          <label htmlFor="subjectSelect">Subject</label>
          <select
            id="subjectSelect"
            aria-label="Select subject"
            onChange={(event) => chooseSubject(event.target.value)}
            value={subject.id}
          >
            {course.subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="questionSelect">Question</label>
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
        </div>
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
            {practice ? "Practice: " : "Filled "}{guessedIds.size} of {totalBlanks}
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
              aria-controls="sporcleGrid"
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
        {question.type === "sporcle-grid" ? (
          <p className="keyboard-hint">Use Tab or ↓ for the next blank, and Shift+Tab or ↑ for the previous blank.</p>
        ) : null}
        <p className="study-summary">
          Full attempts: {currentProgress?.attempts ?? 0} · Best: {currentProgress?.bestScore ?? 0}/{answers.length}
          {currentProgress?.lastAttempted ? ` · Last studied: ${currentProgress.lastAttempted}` : ""}
          {currentProgress?.practiceAttempts ? ` · Practice attempts: ${currentProgress.practiceAttempts}` : ""}
        </p>
        {storageError ? <p role="alert">Progress could not be saved in this browser. Keep this tab open to continue this session.</p> : null}
      </section>

      {question.type === "sporcle-grid" ? (
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
