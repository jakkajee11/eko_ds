import { ShortestPath, HashMap } from "../data/types";
import _ from "lodash";
import { PriorityQueue } from "./PriorityQueue";

export class Graph {
  private nodes: string[] = [];
  private adjacencyLists: HashMap = {};

  addNode(node: string) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
    }
  }

  addEdge(node1: string, node2: string, weight: number) {
    this.adjacencyLists[node1] = {
      ...this.adjacencyLists[node1],
      [node2]: weight
    };
  }

  getNodes() {
    return this.nodes;
  }

  getAdjacencyLists() {
    return this.adjacencyLists;
  }

  calculateCost(searchRoutes: string): number {
    const points = _.toArray(searchRoutes);
    let cost = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (_.has(this.adjacencyLists, `${points[i]}.${points[i + 1]}`)) {
        cost += this.adjacencyLists[points[i]][points[i + 1]];
      } else {
        if (points[i] !== points[i + 1]) return Infinity;
      }
    }

    return cost;
  }

  calculateWalks(start: string, end: string, k: number): number {
    if (k === 0 && start === end) return 1;
    if (k === 1 && this.adjacencyLists[start][end] !== Infinity) return 1;
    if (this.adjacencyLists[start][end] === undefined) return 0;
    if (k <= 0) return 0;

    let count = 0;
    _.keys(this.nodes).forEach(currentNode => {
      if (
        this.adjacencyLists[start][currentNode] !== Infinity &&
        start !== currentNode &&
        end !== currentNode
      ) {
        count += this.calculateWalks(currentNode, end, k - 1);
      }
    });

    return count;
  }

  findPossibleWalks(start: string, end: string, k: number) {
    let count = 0;
    for (let i = k; i > 0; i--) {
      const w = this.calculateWalks(start, end, i);
      console.log(["i", i, w]);
      count += w;
    }

    return count;
  }

  findShortestPath(
    startNode: string,
    endNode: string,
    forceWalk: boolean = true
  ) {
    let costs: { [node: string]: number } = {};
    let backtrace: { [node: string]: string } = {};
    let pq = new PriorityQueue();
    let visitedNodes: { [node: string]: number } = {};

    costs[startNode] = 0;

    this.nodes.forEach(node => {
      if (node !== startNode) {
        costs[node] = Infinity;
      }
      visitedNodes[node] = 0;
    });

    pq.enqueue({ node: startNode, weight: 0 });
    let count = 0;
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();

      let currentNode = shortestStep ? shortestStep.node : "";
      visitedNodes[currentNode] += 1;

      _.forIn(this.adjacencyLists[currentNode], (weight, neighbor) => {
        let cost = costs[currentNode] + weight;
        if (cost < costs[neighbor]) {
          costs[neighbor] = cost;
          backtrace[neighbor] = currentNode;
          pq.enqueue({ node: neighbor, weight: cost });
        }
        if (forceWalk) {
          if (neighbor === endNode) {
            if (cost < costs[endNode] || costs[endNode] === 0) {
              costs[neighbor] = cost;
              backtrace[neighbor] = currentNode;
            }
          }
        }
      });

      count++;

      if (count > this.nodes.length * 2) {
        pq.empty();
      }
    }

    let path = [endNode];
    let endPath = endNode;
    let stop = false;
    while (!stop) {
      path.unshift(backtrace[endPath]);
      endPath = backtrace[endPath];
      // stop when start is equal to end
      if (startNode === endPath) stop = true;
    }

    console.log(`Path is ${path} and time is ${costs[endNode]}`);

    const shortestPath: ShortestPath = {
      path,
      cost: costs[endNode]
    };

    return shortestPath;
  }
}
