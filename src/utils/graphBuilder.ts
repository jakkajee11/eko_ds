import { GraphData } from "../data/types";
import { Graph } from "../models/Graph";
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
  }
};

export default graphBuilder;
