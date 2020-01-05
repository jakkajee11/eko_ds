import { GraphData } from "../data/types";
import { Graph } from "../models/Graph";
import _ from "lodash";

const graphBuilder = {
  loadGraph(key?: string) {
    let data: GraphData = { nodes: [], links: [] };
    const graph_data = localStorage.getItem(key || "graph-data");
    if (graph_data) {
      data = JSON.parse(graph_data);
    }

    return data;
  },

  initGraph(graph: Graph) {
    const jsonData = this.loadGraph();
    if (jsonData) {
      jsonData.nodes.map(n => {
        graph.addNode(n.id);
      });
      jsonData.links.map(l => {
        graph.addEdge(l.source, l.target, l.weight);
      });
    }
  },

  initExampleGraph() {
    let graph = new Graph();
    ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"].map(
      d => {
        graph.addNode(d[0]);
        graph.addNode(d[1]);
        // add
        graph.addEdge(d[0], d[1], parseInt(d.substring(2)));
      }
    );

    let data: GraphData = { nodes: [], links: [] };
    const adjLists = graph.getAdjacencyLists();
    graph.getNodes().map(n => {
      data.nodes.push({ id: n });
      _.forIn(adjLists[n], (weight, node) => {
        data.links.push({ source: n, target: node, weight });
      });
    });

    localStorage.setItem("graph-data", JSON.stringify(data));
  }
};

export default graphBuilder;
