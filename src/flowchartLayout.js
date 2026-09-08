function wrappedLines(text, capacity) {
  let lines = 1;
  let used = 0;
  for (const word of (text ?? "").split(/\s+/)) {
    if (used && used + word.length + 1 > capacity) { lines += 1; used = 0; }
    used += word.length + (used ? 1 : 0);
    while (used > capacity) { lines += 1; used -= capacity; }
  }
  return lines;
}

// Reserve space for the revealed answer before the run starts, so solving a
// blank doesn't move the chart. Keep generous room for font differences.
export function readableFlowchartLayout(nodes) {
  const rows = [...new Set(nodes.map((node) => node.y))].sort((a, b) => a - b);
  const positioned = [];
  let bottom = 0;
  let originalBottom = 0;
  for (const y of rows) {
    const row = nodes.filter((node) => node.y === y);
    const top = positioned.length ? bottom + Math.max(60, y - originalBottom) : y;
    const sized = row.map((node) => {
      const textLines = wrappedLines(node.label ?? node.answer, Math.max(10, Math.floor((node.width - 28) / 8.3)));
      const clueLines = node.clue ? wrappedLines(node.clue, Math.max(10, Math.floor((node.width - 28) / 7.5))) : 0;
      return { ...node, y: top, height: Math.max(node.height, textLines * 20 + clueLines * 16 + 34) };
    });
    positioned.push(...sized);
    bottom = Math.max(...sized.map((node) => node.y + node.height));
    originalBottom = Math.max(...row.map((node) => node.y + node.height));
  }
  const byId = new Map(positioned.map((node) => [node.id, node]));
  return { nodes: nodes.map((node) => byId.get(node.id)), height: bottom + 35 };
}
