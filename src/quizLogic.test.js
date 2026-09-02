import assert from "node:assert/strict";
import { test } from "node:test";
import {
  STORAGE_KEY,
  buildUpdatedProgressMap,
  findMatchingAnswer,
  findNextFieldAnswerId,
  findNextUnansweredAnswerId,
  findPreviousFieldAnswerId,
  getColumnMnemonicClues,
  getNextActiveAnswerIdAfterMatch,
  getQuestionAnswerCount,
  isNodeMatch,
  localISODate,
  normalizeAnswer,
  readProgressMap,
  questionHasMnemonic,
  writeProgressMap,
} from "./quizLogic.js";

function createStorage(initialValues = {}) {
  const values = new Map(Object.entries(initialValues));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("normalizeAnswer lowercases and strips punctuation consistently", () => {
  assert.equal(
    normalizeAnswer(" Plaintiff's \u201cNotice\u201d: Voluntary-Dismissal! "),
    "plaintiffs notice voluntary dismissal",
  );
});

test("isNodeMatch accepts canonical and alternate answers", () => {
  const node = {
    answer: "Actual cause (but-for causation)?",
    acceptedAnswers: ["cause in fact", "but for causation"],
  };

  assert.equal(isNodeMatch(node, normalizeAnswer("Cause-in-fact")), true);
  assert.equal(isNodeMatch(node, normalizeAnswer("proximate cause")), false);
  assert.equal(isNodeMatch(node, ""), false);
});

test("isNodeMatch accepts simple singular and plural differences", () => {
  const node = {
    answer: "United States district courts",
    acceptedAnswers: ["district courts"],
  };

  assert.equal(isNodeMatch(node, normalizeAnswer("district court")), true);
});

test("findMatchingAnswer searches unanswered answers only", () => {
  const answers = [
    {
      id: "district-courts",
      answer: "United States district courts",
      acceptedAnswers: ["district courts"],
    },
    {
      id: "courts-of-appeals",
      answer: "United States courts of appeals",
      acceptedAnswers: ["courts of appeals"],
    },
  ];

  assert.equal(
    findMatchingAnswer(answers, new Set(), normalizeAnswer("district court")).id,
    "district-courts",
  );
  assert.equal(
    findMatchingAnswer(
      answers,
      new Set(["district-courts"]),
      normalizeAnswer("district court"),
    ),
    null,
  );
});

test("findNextUnansweredAnswerId advances within the current column first", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
      },
      {
        id: "two",
        answers: [{ id: "d" }],
      },
    ],
  };

  assert.equal(
    findNextUnansweredAnswerId(question, "one", "a", new Set(["a"])),
    "b",
  );
});

test("findNextUnansweredAnswerId moves to the next column when the current column is done", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
      {
        id: "two",
        answers: [{ id: "c" }, { id: "d" }],
      },
    ],
  };

  assert.equal(
    findNextUnansweredAnswerId(question, "one", "b", new Set(["a", "b"])),
    "c",
  );
});

test("findNextUnansweredAnswerId returns empty when every answer is filled", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }],
      },
    ],
  };

  assert.equal(findNextUnansweredAnswerId(question, "one", "a", new Set(["a"])), "");
});

test("findNextFieldAnswerId moves down to the next unanswered row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
      },
      {
        id: "two",
        answers: [{ id: "d" }],
      },
    ],
  };

  assert.equal(findNextFieldAnswerId(question, "one", "a", new Set()), "b");
});

test("findNextFieldAnswerId moves to the next column after the last row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
      {
        id: "two",
        answers: [{ id: "c" }, { id: "d" }],
      },
    ],
  };

  assert.equal(findNextFieldAnswerId(question, "one", "b", new Set()), "c");
});

test("findNextFieldAnswerId keeps the current row when it is the only unanswered row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
    ],
  };

  assert.equal(findNextFieldAnswerId(question, "one", "b", new Set(["a"])), "b");
});

test("findPreviousFieldAnswerId moves up to the previous unanswered row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
      },
    ],
  };

  assert.equal(findPreviousFieldAnswerId(question, "one", "c", new Set()), "b");
});

test("findPreviousFieldAnswerId moves to the previous column from the first row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
      {
        id: "two",
        answers: [{ id: "c" }, { id: "d" }],
      },
    ],
  };

  assert.equal(findPreviousFieldAnswerId(question, "two", "c", new Set()), "b");
});

test("findPreviousFieldAnswerId keeps the current row when it is the only unanswered row", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
    ],
  };

  assert.equal(findPreviousFieldAnswerId(question, "one", "a", new Set(["b"])), "a");
});

test("getNextActiveAnswerIdAfterMatch keeps the active blank when another row matched", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }, { id: "c" }],
      },
    ],
  };

  assert.equal(
    getNextActiveAnswerIdAfterMatch({
      question,
      columnId: "one",
      activeAnswerId: "a",
      matchedAnswerId: "b",
      guessedIds: new Set(["b"]),
    }),
    "a",
  );
});

test("getNextActiveAnswerIdAfterMatch advances when the active blank matched", () => {
  const question = {
    type: "sporcle-grid",
    columns: [
      {
        id: "one",
        answers: [{ id: "a" }, { id: "b" }],
      },
    ],
  };

  assert.equal(
    getNextActiveAnswerIdAfterMatch({
      question,
      columnId: "one",
      activeAnswerId: "a",
      matchedAnswerId: "a",
      guessedIds: new Set(["a"]),
    }),
    "b",
  );
});

test("getQuestionAnswerCount counts flowchart nodes and sporcle grid answers", () => {
  assert.equal(
    getQuestionAnswerCount({
      type: "flowchart",
      nodes: [{ id: "one" }, { id: "two" }],
    }),
    2,
  );
  assert.equal(
    getQuestionAnswerCount({
      type: "sporcle-grid",
      columns: [
        { id: "a", answers: [{ id: "one" }] },
        { id: "b", answers: [{ id: "two" }, { id: "three" }] },
      ],
    }),
    3,
  );
});

test("mnemonic helpers map string characters and array clues by answer position", () => {
  assert.deepEqual(getColumnMnemonicClues({ mnemonic: "USF POS" }), [
    "U", "S", "F", "P", "O", "S",
  ]);
  assert.deepEqual(getColumnMnemonicClues({ mnemonic: ["First", " Second "] }), [
    "First", "Second",
  ]);
  assert.deepEqual(getColumnMnemonicClues({}), []);

  assert.equal(
    questionHasMnemonic({
      type: "sporcle-grid",
      columns: [{ answers: [{}] }, { mnemonic: "A", answers: [{}] }],
    }),
    true,
  );
  assert.equal(
    questionHasMnemonic({ type: "sporcle-grid", columns: [{ answers: [{}] }] }),
    false,
  );
});

test("readProgressMap tolerates missing or corrupt storage values", () => {
  assert.deepEqual(readProgressMap(createStorage()), {});
  assert.deepEqual(readProgressMap(createStorage({ [STORAGE_KEY]: "not json" })), {});
  assert.deepEqual(readProgressMap(createStorage({ [STORAGE_KEY]: "[]" })), {});
});

test("writeProgressMap serializes progress under the app storage key", () => {
  const storage = createStorage();
  const progress = { chart: { attempts: 1, bestScore: 2 } };

  writeProgressMap(progress, storage);

  assert.deepEqual(readProgressMap(storage), progress);
});

test("localISODate formats a local date as yyyy-mm-dd", () => {
  assert.equal(localISODate(new Date(2026, 6, 16)), "2026-07-16");
});

test("buildUpdatedProgressMap immutably records attempts and preserves best score", () => {
  const flowchart = {
    id: "chart-a",
    nodes: [{ id: "one" }, { id: "two" }, { id: "three" }],
  };
  const existingProgress = {
    "chart-a": {
      attempts: 2,
      bestScore: 3,
      lastAttempted: "2026-07-01",
      lastTotal: 3,
    },
    "chart-b": {
      attempts: 1,
      bestScore: 1,
      lastAttempted: "2026-07-02",
      lastTotal: 2,
    },
  };

  const nextProgress = buildUpdatedProgressMap({
    progressMap: existingProgress,
    flowchart,
    score: 2,
    attemptedOn: "2026-07-16",
  });

  assert.notEqual(nextProgress, existingProgress);
  assert.deepEqual(nextProgress["chart-a"], {
    attempts: 3,
    bestScore: 3,
    lastAttempted: "2026-07-16",
    lastTotal: 3,
  });
  assert.deepEqual(nextProgress["chart-b"], existingProgress["chart-b"]);
});
