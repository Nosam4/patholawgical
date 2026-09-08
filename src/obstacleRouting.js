export function segmentCrossesNode(a, b, node) {
  if (a.x === b.x) return a.x > node.x && a.x < node.x + node.width
    && Math.max(a.y, b.y) > node.y && Math.min(a.y, b.y) < node.y + node.height;
  if (a.y === b.y) return a.y > node.y && a.y < node.y + node.height
    && Math.max(a.x, b.x) > node.x && Math.min(a.x, b.x) < node.x + node.width;
  return true;
}

function outside(point) {
  const offset = { top: [0, -8], bottom: [0, 8], left: [-8, 0], right: [8, 0] }[point.side] ?? [0, 0];
  return { x: point.x + offset[0], y: point.y + offset[1] };
}

// Search an orthogonal grid along the edges of expanded node rectangles.
// Only endpoint stubs touch boxes; every other segment has 6px clearance.
export function routeAroundNodes(start, end, nodes) {
  const first = outside(start);
  const last = outside(end);
  const obstacles = nodes.map((node) => ({ x: node.x - 6, y: node.y - 6,
    width: node.width + 12, height: node.height + 12 }));
  const xs = [...new Set([first.x, last.x, ...obstacles.flatMap((n) => [n.x, n.x + n.width])])].sort((a, b) => a - b);
  const ys = [...new Set([first.y, last.y, ...obstacles.flatMap((n) => [n.y, n.y + n.height])])].sort((a, b) => a - b);
  const key = (x, y) => y * xs.length + x;
  const point = (id) => ({ x: xs[id % xs.length], y: ys[Math.floor(id / xs.length)] });
  const origin = key(xs.indexOf(first.x), ys.indexOf(first.y));
  const destination = key(xs.indexOf(last.x), ys.indexOf(last.y));
  const costs = new Map([[origin, 0]]);
  const parents = new Map();
  const open = new Map([[origin, 0]]);
  const heuristic = (p) => Math.abs(p.x - last.x) + Math.abs(p.y - last.y);
  while (open.size) {
    let current; let best = Infinity;
    for (const [id, estimate] of open) if (estimate < best) { current = id; best = estimate; }
    open.delete(current);
    if (current === destination) {
      const path = [];
      for (let id = current; id !== undefined; id = parents.get(id)) path.unshift(point(id));
      const all = [start, ...path, end];
      return all.filter((p, i) => {
        const a = all[i - 1]; const b = all[i + 1];
        return !a || !b || !((a.x === p.x && p.x === b.x) || (a.y === p.y && p.y === b.y));
      });
    }
    const x = current % xs.length; const y = Math.floor(current / xs.length);
    const a = point(current);
    for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
      if (nx < 0 || nx >= xs.length || ny < 0 || ny >= ys.length) continue;
      const next = key(nx, ny); const b = point(next);
      if (obstacles.some((node) => segmentCrossesNode(a, b, node))) continue;
      const cost = costs.get(current) + Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      if (cost >= (costs.get(next) ?? Infinity)) continue;
      costs.set(next, cost); parents.set(next, current); open.set(next, cost + heuristic(b));
    }
  }
  throw new Error("No unobstructed flowchart route exists between the selected anchors.");
}
