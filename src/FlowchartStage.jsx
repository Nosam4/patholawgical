import { useEffect, useMemo, useRef } from "react";
import { buildArrows } from "./flowchartRouting.js";
import { buildTextConnections, flowchartNodeState } from "./flowchartText.js";
import "./FlowchartStage.css";

function CourseSources({ question }) {
  if (!question.courseSources?.length) return null;
  return (
    <details className="source-line course-sources">
      <summary>Course material</summary>
      <ul>{question.courseSources.map((reference) => <li key={reference}>{reference}</li>)}</ul>
    </details>
  );
}

function FlowchartTextView({ flowchart, guessedIds, revealed, contextIds }) {
  const connections = useMemo(() => buildTextConnections(flowchart), [flowchart]);
  const nodeIndex = new Map(flowchart.nodes.map((node, index) => [node.id, index + 1]));
  const stepId = (number) => `flowchart-text-${flowchart.id}-step-${number}`;

  function endpointLabel(endpoint) {
    return endpoint.nodeId ? `Step ${nodeIndex.get(endpoint.nodeId)}` : `Junction ${endpoint.junction}`;
  }

  function Endpoint({ endpoint }) {
    return endpoint.nodeId ? (
      <a href={`#${stepId(nodeIndex.get(endpoint.nodeId))}`}>{endpointLabel(endpoint)}</a>
    ) : endpointLabel(endpoint);
  }

  return (
    <details className="flowchart-text-view">
      <summary>Text view: steps and branches</summary>
      <div className="flowchart-text-content" aria-label={`${flowchart.title} text view`} role="region">
        <p>Step numbers identify the chart boxes. Follow the branch links to move between connected steps.</p>
        <ol className="flowchart-text-steps">
          {flowchart.nodes.map((node, index) => {
            const state = flowchartNodeState(node, guessedIds, revealed, contextIds);
            return (
              <li key={node.id} id={stepId(index + 1)} data-node-id={node.id} tabIndex={-1}>
                <h3>Step {index + 1}{node.clue ? `: ${node.clue}` : ""}</h3>
                <p className="flowchart-text-answer">{state.visible ? node.label ?? node.answer : "Unanswered blank"}</p>
                <p className="flowchart-text-status">{state.label}</p>
              </li>
            );
          })}
        </ol>
        {connections.length ? (
          <>
            <h3>Branches</h3>
            <ul className="flowchart-text-branches">
              {connections.map((connection, index) => (
                <li key={index}>
                  <Endpoint endpoint={connection.from} />
                  {connection.label ? ` — ${connection.label}: ` : ": "}
                  {connection.directed ? "continue to " : "connects to "}
                  <Endpoint endpoint={connection.to} />.
                </li>
              ))}
            </ul>
            {connections.some((connection) => connection.from.junction || connection.to.junction) ? (
              <p>Junctions are connecting points in the chart, with no answer to recall.</p>
            ) : null}
          </>
        ) : null}
      </div>
    </details>
  );
}

export default function FlowchartStage({ flowchart, guessedIds, revealed, contextIds }) {
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
      <CourseSources question={flowchart} />
      <FlowchartTextView
        key={flowchart.id}
        flowchart={flowchart}
        guessedIds={guessedIds}
        revealed={revealed}
        contextIds={contextIds}
      />
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
