import assert from "node:assert/strict";
import { test } from "node:test";
import { buildArrows, buildDefaultRoute } from "./flowchartRouting.js";

test("buildDefaultRoute uses a direct segment when endpoints align", () => {
  const start = { x: 10, y: 20, side: "right" };
  const end = { x: 100, y: 20, side: "left" };

  assert.deepEqual(buildDefaultRoute(start, end), [start, end]);
});

test("buildDefaultRoute creates orthogonal middle points for vertical anchors", () => {
  const start = { x: 50, y: 50, side: "bottom" };
  const end = { x: 250, y: 100, side: "top" };

  assert.deepEqual(buildDefaultRoute(start, end), [
    start,
    { x: 50, y: 75 },
    { x: 250, y: 75 },
    end,
  ]);
});

test("buildArrows preserves explicit ids and computes label positions", () => {
  const flowchart = {
    nodes: [
      { id: "a", x: 0, y: 0, width: 100, height: 50 },
      { id: "b", x: 200, y: 100, width: 100, height: 50 },
    ],
    arrows: [
      {
        id: "a-to-b",
        from: "a",
        to: "b",
        fromAnchor: "bottom",
        toAnchor: "top",
        label: "Yes",
        labelPosition: { x: 111, y: 222 },
      },
      {
        from: "missing",
        to: "b",
      },
    ],
  };

  assert.deepEqual(buildArrows(flowchart), [
    {
      id: "a-to-b",
      from: "a",
      to: "b",
      fromAnchor: "bottom",
      toAnchor: "top",
      label: "Yes",
      labelPosition: { x: 111, y: 222 },
      labelX: 111,
      labelY: 222,
      path: "M 50 50 L 50 75 L 250 75 L 250 100",
    },
  ]);
});

test("buildArrows supports point-to-node routes", () => {
  const flowchart = {
    nodes: [
      { id: "result", x: 100, y: 100, width: 80, height: 40 },
    ],
    arrows: [
      {
        fromPoint: { x: 20, y: 10 },
        fromSide: "bottom",
        to: "result",
        toAnchor: "top",
      },
    ],
  };

  const [arrow] = buildArrows(flowchart);

  assert.equal(arrow.id, "point-20-10-result-0");
  assert.equal(arrow.path, "M 20 10 L 20 55 L 140 55 L 140 100");
});
