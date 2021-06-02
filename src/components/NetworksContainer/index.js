import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

import { START_MODEL } from "../../config";
import Network from "./Network";

const NetworksContainer = ({ initialModel, setCanUpdate, counter }) => {
  const [graphs, setGraphs] = useState(null);

  useEffect(() => {
    if (initialModel && counter > 1) {
      addModel();
    }
  }, [counter]);

  useEffect(() => {
    console.log("@initialModel", initialModel);
    initialModel && setGraphs([initialModel]);
  }, [initialModel]);

  useEffect(() => {
    initialModel && graphs && setCanUpdate(!!checkCanUpdate());
  }, [graphs, initialModel]);

  const getNextNodes = () => {
    const last = graphs[graphs.length - 1];
    console.log("@@@graphs", graphs);
    const { nodes: lastNodes, edges } = last;

    const opinionEdges = edges.filter((edge) => !!edge.label);
    const dynamics = lastNodes.reduce(
      (ac, cur) => ({ ...ac, [cur.id]: {} }),
      {}
    );

    lastNodes.forEach((node) => {
      const { id } = node;
      const trustEdges = opinionEdges.filter((edge) => edge.from === id);

      trustEdges.forEach((edge) => {
        const { to, label } = edge;
        const trustLevel = parseFloat(label);
        const { opinion } = lastNodes.find((node) => node.id === to);
        dynamics[id][opinion] =
          dynamics[id][opinion] !== undefined
            ? dynamics[opinion] + trustLevel
            : trustLevel;
      });
    });
    const nextNodes = Object.entries(dynamics).map(([id, delta]) => {
      const [opinion, _percent] = Object.entries(delta).reduce(
        (prev, current) => (prev[1] > current[1] ? prev : current)
      );
      return { id, label: `${id}: ${opinion}`, opinion };
    });

    return { nextNodes, lastNodes, edges };
  };

  const checkCanUpdate = () => {
    const { nextNodes, lastNodes, edges } = getNextNodes();

    return JSON.stringify(nextNodes) !== JSON.stringify(lastNodes)
      ? { nextNodes, lastNodes, edges }
      : false;
  };

  const addModel = () => {
    const res = checkCanUpdate();

    if (res) {
      const { nextNodes, edges } = res;
      setGraphs((prev) => [...prev, { nodes: nextNodes, edges }]);
    } else {
      setCanUpdate(false);
    }
  };

  return (
    <div className="networks-container">
      {initialModel && graphs && (
        <Carousel
          showArrows={true}
          centerMode={true}
          selectedItem={graphs.length - 1}
          autoPlay={false}
          showStatus={false}
        >
          {graphs.map((g, i) => (
            <Network key={i} graph={g} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default NetworksContainer;
