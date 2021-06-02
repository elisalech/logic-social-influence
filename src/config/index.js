export const TRUST_EDGE = { width: 0.7, color: "#cccccc", dashes: true };

export const DEFAULT_OPTIONS = {
  layout: {
    hierarchical: false,
  },
  physics: {
    stabilization: false,
    barnesHut: {
      gravitationalConstant: -8000,
      springConstant: 0.001,
      springLength: 300,
    },
  },
  edges: {
    smooth: true,
    length: 350,
    width: 0.9,
    color: "#007296",
    arrows: {
      to: {
        enabled: false,
        scaleFactor: 0.5,
      },
    },
  },
};

export const TRUST_EDGES = [
  { from: "a", to: "a", arrows: "to", label: "0.1", ...TRUST_EDGE },
  { from: "a", to: "b", arrows: "to", label: "0.8", ...TRUST_EDGE },
  { from: "a", to: "c", arrows: "to", label: "0.1", ...TRUST_EDGE },
  { from: "b", to: "a", arrows: "to", label: "0.3", ...TRUST_EDGE },
  { from: "b", to: "b", arrows: "to", label: "0.4", ...TRUST_EDGE },
  { from: "b", to: "c", arrows: "to", label: "0.3", ...TRUST_EDGE },
  { from: "c", to: "a", arrows: "to", label: "0.2", ...TRUST_EDGE },
  { from: "c", to: "b", arrows: "to", label: "0.2", ...TRUST_EDGE },
  { from: "c", to: "c", arrows: "to", label: "0.6", ...TRUST_EDGE },
];

export const START_MODEL = {
  nodes: [
    { id: "a", label: "a: p↑", opinion: "p↑" },
    { id: "b", label: "b: p↓", opinion: "p↓" },
    { id: "c", label: "c: p-", opinion: "p-" },
  ],
  edges: [
    { from: "a", to: "b" },
    { from: "a", to: "c" },
    { from: "b", to: "c" },
  ],
};

export const OPINIONS = ["p↑", "p-", "p↓"];
