import { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { DEFAULT_OPTIONS } from "../../config";

const Network = ({ graph }) => {
  const [state, setState] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    graph && setState(graph);
  }, [graph]);

  const EVENTS = {
    select: ({ nodes, edges }) => {
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    },
    doubleClick: ({ pointer: { canvas } }) => {},
  };
  return (
    <div className="graph-wrap">
      {state && (
        <Graph
          graph={state}
          options={DEFAULT_OPTIONS}
          events={EVENTS}
          style={{ height: "600px", width: "550px", border: "1px solid #ccc" }}
          getNetwork={(_network) => setNetwork(_network)}
        />
      )}
    </div>
  );
};

export default Network;
