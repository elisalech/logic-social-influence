import { useState } from "react";
import { OPINIONS, START_MODEL, TRUST_EDGES } from "../../config";

const Controls = ({ setInitialModel, canUpdate, handleClickUpdate }) => {
  const [nodes, setNodes] = useState(START_MODEL.nodes);
  const [edges, setEdges] = useState(TRUST_EDGES);
  const [started, setStarted] = useState(false);

  const handleSelectOption = (e, id) => {
    const opinion = e.target.value;
    const newNodes = nodes.map((n) => {
      if (n.id === id) {
        return { ...n, opinion, label: `${n.id}: ${opinion}` };
      } else {
        return n;
      }
    });
    setNodes(newNodes);
  };

  const handleChangeEdgePercent = (e, from, to) => {
    const newEdges = edges.map((edge) => {
      if (edge.from === from && edge.to === to) {
        return { ...edge, label: e.target.value.toString() };
      } else return edge;
    });
    setEdges(newEdges);
  };

  const handleSubmit = () => {
    const graph = { nodes, edges: [...START_MODEL.edges, ...edges] };
    setInitialModel(graph);
    setStarted(true);
  };

  const renderSelectEdges = () => (
    <div>
      {edges.map((edge, i) => (
        <div key={i}>
          <span>
            агент {edge.from} верит {edge.to} как:{" "}
          </span>
          <input
            type="number"
            value={edge.label}
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => handleChangeEdgePercent(e, edge.from, edge.to)}
          />
        </div>
      ))}
    </div>
  );

  const renderSelectNodes = () => (
    <div>
      {nodes.map((node) => (
        <div>
          <span>aгент {node.id} верит, что: </span>
          <select
            value={node.opinion}
            onChange={(e) => handleSelectOption(e, node.id)}
          >
            {OPINIONS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );

  const renderButtons = () => (
    <div>
      <button onClick={handleSubmit}>
        {started ? "Перезапустить" : "Начать"}
      </button>
      <button
        disabled={started ? canUpdate !== true : true}
        onClick={handleClickUpdate}
      >
        Обновить сеть
      </button>
    </div>
  );

  return (
    <div className="controls-container">
      {renderSelectNodes()}
      {renderSelectEdges()}
      {renderButtons()}
    </div>
  );
};

export default Controls;
