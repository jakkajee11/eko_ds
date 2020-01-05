export type Matrix = {
  [key: string]: { [subkey: string]: number };
};

export type HashMap = {
  [key: string]: { [subkey: string]: number };
};

export type ShortestPath = {
  path: string[];
  cost: number;
};

export type Node = {
  node: string;
  weight: number;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export type GraphNode = {
  id: string;
  color?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  weight: number;
  color?: string;
};
