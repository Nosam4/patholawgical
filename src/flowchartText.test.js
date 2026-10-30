import test from "node:test";
import assert from "node:assert/strict";
import { buildTextConnections, flowchartNodeState } from "./flowchartText.js";

test("text branches preserve labels and shared junctions without including answer text", () => {
  const chart = {
    nodes: [{ id: "start", answer: "hidden start" }, { id: "end", answer: "hidden end" }],
    arrows: [
      { from: "start", toPoint: { x: 100, y: 200 }, label: "No", markerEnd: false },
      { fromPoint: { x: 100, y: 200 }, to: "end" },
      { from: "missing", to: "end" },
    ],
  };
  assert.deepEqual(buildTextConnections(chart), [
    { from: { nodeId: "start" }, to: { junction: 1 }, label: "No", directed: false },
    { from: { junction: 1 }, to: { nodeId: "end" }, label: undefined, directed: true },
  ]);
  assert.doesNotMatch(JSON.stringify(buildTextConnections(chart)), /hidden/);
});

test("text node visibility and states follow recall, reveal, and missed practice", () => {
  const node = { id: "answer" };
  assert.deepEqual(flowchartNodeState(node, new Set(), false, new Set()), { visible: false, label: "Not yet recalled" });
  assert.deepEqual(flowchartNodeState(node, new Set(["answer"]), false, new Set()), { visible: true, label: "Recalled" });
  assert.deepEqual(flowchartNodeState(node, new Set(), true, new Set()), { visible: true, label: "Missed" });
  assert.deepEqual(flowchartNodeState(node, new Set(), false, new Set(["answer"])), { visible: true, label: "Previously recalled" });
  assert.deepEqual(flowchartNodeState({ ...node, quiz: false }, new Set(), false, new Set()), { visible: true, label: "Context" });
});
