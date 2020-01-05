import { Graph } from "../models/Graph";

const data = [
  ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"],
  //["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"],
  [
    "AB1",
    "BA2",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1"
  ],
  ["AB1", "BE3", "EB3", "EA2"],
  ["AB1", "AD10", "BE3", "DE1", "EA2"],
  ["AB1", "AC4", "AD10", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"]
];
export const fakeRoutes = (index: number = 0): string[] => data[index];

export const fakeGraphs = () => {
  let graph = new Graph();
  fakeRoutes().map(r => {
    graph.addNode(r[0]);
    graph.addNode(r[1]);

    graph.addEdge(r[0], r[1], parseInt(r.substring(2)));
  });

  return graph;
};

export const fakeMatrix = () => {
  let graph = new Graph();
  fakeRoutes().map(r => {
    graph.addNode(r[0]);
    graph.addNode(r[1]);

    graph.addEdge(r[0], r[1], parseInt(r.substring(2)));
  });

  return graph;
};
