import { useEffect, useMemo, useRef, useState } from "react";
import { courseCatalog } from "./courseData.js";
import { buildArrows } from "./flowchartRouting.js";
import {
  findMatchingAnswer,
  findNextFieldAnswerId,
  findPreviousFieldAnswerId,
  getColumnMnemonicClues,
  getNextActiveAnswerIdAfterMatch,
  getQuestionAnswerCount,
  normalizeAnswer,
  questionHasMnemonic,
} from "./quizLogic.js";

function firstSubjectFor(course) {
  return course?.subjects[0] ?? null;
}

function firstQuestionFor(subject) {
  return subject?.questions[0] ?? null;
}

function questionTypeLabel(question) {
  return question?.type === "sporcle-grid" ? "Sporcle-style" : "Flowchart";
}

function FlowchartStage({ flowchart, guessedIds, revealed }) {
  const arrows = useMemo(() => buildArrows(flowchart), [flowchart]);

  return (
    <section className="panel chart-panel">
      <div className="chart-scroll">
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
                const solved = guessedIds.has(node.id);
                const showAnswer = solved || revealed;
                const className = [
                  "flow-node",
                  solved ? "correct" : "",
                  !solved && revealed ? "revealed" : "",
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
                      {showAnswer ? (
                        <p className="node-answer">{node.answer}</p>
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
}) {
  return (
    <section className="panel sporcle-panel">
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
                  const solved = guessedIds.has(answer.id);
                  const showAnswer = solved || revealed;
                  const active = activeAnswerId === answer.id;

                  return (
                    <li
                      className={[
                        "answer-row",
                        answer.indicator ? "has-indicator" : "",
                        solved ? "correct" : "",
                        !solved && revealed ? "revealed" : "",
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
                              aria-label={`Answer for ${column.title}`}
                              autoComplete="off"
                              autoFocus
                              onChange={(event) => onDraftChange(event.target.value)}
                              onKeyDown={(event) => onFieldKeyDown(event, column, answer)}
                              value={draft}
                            />
                          </form>
                        ) : (
                          <button
                            aria-label={`Blank answer for ${column.title}`}
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
  const totalBlanks = getQuestionAnswerCount(question);
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
    resetRun("Class switched.");
  }

  function chooseSubject(nextSubjectId) {
    const nextSubject = course?.subjects.find((item) => item.id === nextSubjectId);
    const nextQuestion = firstQuestionFor(nextSubject);

    setSubjectId(nextSubject?.id ?? "");
    setQuestionId(nextQuestion?.id ?? "");
    resetRun("Subject switched.");
  }

  function chooseQuestion(nextQuestionId) {
    setQuestionId(nextQuestionId);
    resetRun("Question switched.");
  }

  function markCorrect(answerEntry) {
    const nextGuessedIds = new Set(guessedIds);
    nextGuessedIds.add(answerEntry.id);
    setGuessedIds(nextGuessedIds);

    if (nextGuessedIds.size === totalBlanks) {
      setMessage("Complete. All blanks filled.");
    } else {
      setMessage(`Correct: ${answerEntry.answer}`);
    }

    return nextGuessedIds;
  }

  function handleFlowchartSubmit(event) {
    event.preventDefault();

    if (!question || revealed) {
      setMessage("This run is locked. Start a fresh run to keep guessing.");
      return;
    }

    const normalizedGuess = normalizeAnswer(flowchartGuess);

    if (!normalizedGuess) {
      setMessage("Type a phrase before submitting.");
      return;
    }

    const matchedNode = findMatchingAnswer(question.nodes, guessedIds, normalizedGuess);

    if (!matchedNode) {
      setMessage("No match yet.");
      return;
    }

    markCorrect(matchedNode);
    setFlowchartGuess("");
  }

  function handleSporcleSubmit(event, column, activeAnswer) {
    event.preventDefault();

    if (!question || revealed) {
      setMessage("This run is locked. Start a fresh run to keep guessing.");
      return;
    }

    const normalizedGuess = normalizeAnswer(sporcleDraft);

    if (!normalizedGuess) {
      setMessage("Type an answer before submitting.");
      return;
    }

    const matchedAnswer = findMatchingAnswer(
      column.answers,
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
        question,
        columnId: column.id,
        activeAnswerId: activeAnswer.id,
        matchedAnswerId: matchedAnswer.id,
        guessedIds: nextGuessedIds,
      }),
    );
    setSporcleDraft("");
  }

  function handleSporcleFieldKeyDown(event, column, activeAnswer) {
    if (event.key !== "Tab") {
      return;
    }

    event.preventDefault();
    const nextAnswerId = event.shiftKey
      ? findPreviousFieldAnswerId(question, column.id, activeAnswer.id, guessedIds)
      : findNextFieldAnswerId(question, column.id, activeAnswer.id, guessedIds);

    setActiveAnswerId(
      nextAnswerId,
    );
    setSporcleDraft("");
  }

  function handleReveal() {
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
            Filled {guessedIds.size} of {totalBlanks}
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
            />
            <button type="submit">Submit Guess</button>
          </form>
        ) : null}

        <div className="action-row">
          <button type="button" onClick={handleReveal}>
            Reveal Missed Answers
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => resetRun("New run started.")}
          >
            Start Fresh
          </button>
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

        <p id="messageText">{message}</p>
      </section>

      {question.type === "sporcle-grid" ? (
        <SporcleGrid
          activeAnswerId={activeAnswerId}
          draft={sporcleDraft}
          guessedIds={guessedIds}
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
          revealed={revealed}
        />
      )}
    </main>
  );
}
