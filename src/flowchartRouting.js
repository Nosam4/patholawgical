import { routeAroundNodes, segmentCrossesNode } from "./obstacleRouting.js";

const ANCHORS = {
  top: { x: 0.5, y: 0, side: "top" },
  "top-left": { x: 0.25, y: 0, side: "top" },
  "top-right": { x: 0.75, y: 0, side: "top" },
  right: { x: 1, y: 0.5, side: "right" },
  "right-top": { x: 1, y: 0.25, side: "right" },
  "right-bottom": { x: 1, y: 0.75, side: "right" },
  bottom: { x: 0.5, y: 1, side: "bottom" },
  "bottom-left": { x: 0.25, y: 1, side: "bottom" },
  "bottom-right": { x: 0.75, y: 1, side: "bottom" },
  left: { x: 0, y: 0.5, side: "left" },
  "left-top": { x: 0, y: 0.25, side: "left" },
  "left-bottom": { x: 0, y: 0.75, side: "left" },
};

function centerOf(target) {
  if ("width" in target && "height" in target) {
    return {
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    };
  }

  return { x: target.x, y: target.y };
}

function inferAnchor(fromNode, toTarget) {
  const fromCx = fromNode.x + fromNode.width / 2;
  const fromCy = fromNode.y + fromNode.height / 2;
  const { x: toCx, y: toCy } = centerOf(toTarget);
  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "right" : "left";
  }

  return dy > 0 ? "bottom" : "top";
}

function anchorPoint(node, anchorName, otherNode) {
  const resolvedAnchor = anchorName && anchorName !== "auto"
    ? anchorName
    : inferAnchor(node, otherNode);
  const anchor = ANCHORS[resolvedAnchor] ?? ANCHORS[inferAnchor(node, otherNode)];

  return {
    x: node.x + node.width * anchor.x,
    y: node.y + node.height * anchor.y,
    side: anchor.side,
  };
}

export function buildDefaultRoute(start, end) {
  const verticalStart = start.side === "top" || start.side === "bottom";
  const verticalEnd = end.side === "top" || end.side === "bottom";

  if (start.x === end.x || start.y === end.y) {
    return [start, end];
  }

  if (verticalStart && verticalEnd) {
    const midY = (start.y + end.y) / 2;
    return [start, { x: start.x, y: midY }, { x: end.x, y: midY }, end];
  }

  if (!verticalStart && !verticalEnd) {
    const midX = (start.x + end.x) / 2;
    return [start, { x: midX, y: start.y }, { x: midX, y: end.y }, end];
  }

  if (verticalStart) {
    return [start, { x: start.x, y: end.y }, end];
  }

  return [start, { x: end.x, y: start.y }, end];
}

function pointsToPath(points) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function getLabelPoint(points, arrow) {
  if (arrow.labelPosition) {
    return arrow.labelPosition;
  }

  const lengths = [];
  let totalLength = 0;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const length = Math.hypot(current.x - previous.x, current.y - previous.y);
    lengths.push(length);
    totalLength += length;
  }

  let remaining = totalLength / 2;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segmentLength = lengths[index - 1];

    if (remaining <= segmentLength) {
      const ratio = segmentLength === 0 ? 0 : remaining / segmentLength;
      return {
        x: previous.x + (current.x - previous.x) * ratio + (arrow.labelOffsetX ?? 0),
        y: previous.y + (current.y - previous.y) * ratio + (arrow.labelOffsetY ?? -8),
      };
    }

    remaining -= segmentLength;
  }

  const fallback = points[Math.floor(points.length / 2)] ?? points[0];
  return {
    x: fallback.x + (arrow.labelOffsetX ?? 0),
    y: fallback.y + (arrow.labelOffsetY ?? -8),
  };
}

function buildArrowId(arrow, index) {
  if (arrow.id) {
    return arrow.id;
  }

  const startId = arrow.from
    ?? `point-${arrow.fromPoint?.x ?? "unknown"}-${arrow.fromPoint?.y ?? "unknown"}`;
  const endId = arrow.to
    ?? `point-${arrow.toPoint?.x ?? "unknown"}-${arrow.toPoint?.y ?? "unknown"}`;
  return `${startId}-${endId}-${index}`;
}

export function buildArrows(flowchart) {
  const nodeMap = new Map(flowchart.nodes.map((node) => [node.id, node]));

  return (flowchart.arrows ?? []).flatMap((arrow, index) => {
    const fromNode = arrow.from ? nodeMap.get(arrow.from) : null;
    const toNode = arrow.to ? nodeMap.get(arrow.to) : null;

    if ((arrow.from && !fromNode) || (arrow.to && !toNode)) {
      return [];
    }

    if (!fromNode && !arrow.fromPoint) {
      return [];
    }

    if (!toNode && !arrow.toPoint) {
      return [];
    }

    const start = arrow.fromPoint
      ? { ...arrow.fromPoint, side: arrow.fromSide ?? "point" }
      : anchorPoint(fromNode, arrow.fromAnchor, toNode ?? arrow.toPoint);
    const end = arrow.toPoint
      ? { ...arrow.toPoint, side: arrow.toSide ?? "point" }
      : anchorPoint(toNode, arrow.toAnchor, fromNode ?? arrow.fromPoint);
    let points = arrow.waypoints?.length
      ? [start, ...arrow.waypoints, end]
      : buildDefaultRoute(start, end);
    if (flowchart.avoidNodes && !arrow.waypoints?.length
      && points.some((p, i) => i > 0 && flowchart.nodes.some((node) =>
        segmentCrossesNode(points[i - 1], p, node)))) {
      points = routeAroundNodes(start, end, flowchart.nodes);
    }
    const labelPoint = getLabelPoint(points, arrow);

    return [
      {
        ...arrow,
        id: buildArrowId(arrow, index),
        labelX: labelPoint.x,
        labelY: labelPoint.y,
        path: pointsToPath(points),
      },
    ];
  });
}
