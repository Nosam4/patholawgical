// Text connections use neutral step numbers so unrecalled answers never leak
// through a branch label or an accessible link name.
export function buildTextConnections(flowchart) {
  const nodeIds = new Set(flowchart.nodes.map((node) => node.id));
  const junctions = new Map();

  function endpoint(nodeId, point) {
    if (point && Number.isFinite(point.x) && Number.isFinite(point.y)) {
      const key = JSON.stringify([point.x, point.y]);
      if (!junctions.has(key)) junctions.set(key, junctions.size + 1);
      return { junction: junctions.get(key) };
    }
    return nodeIds.has(nodeId) ? { nodeId } : null;
  }

  return (flowchart.arrows ?? []).flatMap((arrow) => {
    if ((arrow.from && !nodeIds.has(arrow.from)) || (arrow.to && !nodeIds.has(arrow.to))) return [];
    const from = endpoint(arrow.from, arrow.fromPoint);
    const to = endpoint(arrow.to, arrow.toPoint);
    return from && to ? [{ from, to, label: arrow.label, directed: arrow.markerEnd !== false }] : [];
  });
}

export function flowchartNodeState(node, guessedIds, revealed, contextIds) {
  if (node.quiz === false) return { visible: true, label: "Context" };
  if (contextIds.has(node.id)) return { visible: true, label: "Previously recalled" };
  if (guessedIds.has(node.id)) return { visible: true, label: "Recalled" };
  if (revealed) return { visible: true, label: "Missed" };
  return { visible: false, label: "Not yet recalled" };
}
