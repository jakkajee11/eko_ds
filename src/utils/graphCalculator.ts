import _ from "lodash";
import { Matrix } from "../data/types";

const graphCalculator = {
  buildMatrix(routes: string[]) {
    let sets = new Set<string>();
    routes.map((route: string) => {
      sets.add(route[0]);
      sets.add(route[1]);
    });

    let matrices: Matrix = {};

    // Initialize graph
    sets.forEach(key => {
      if (!matrices[key]) matrices[key] = {};
      sets.forEach(adjKey => {
        matrices[key] = {
          ...matrices[key],
          [adjKey]: key === adjKey ? 0 : Infinity
        };
      });
    });
    // set weight
    routes.map((route: string) => {
      if (matrices[route[0]][route[1]])
        matrices[route[0]][route[1]] = parseInt(route.substring(2));
    });

    //console.log(["matrices", sets, matrices]);
    return matrices;
  },
  calculateCost(routeMatrices: Matrix, searchRoutes: string): number {
    const points = _.toArray(searchRoutes);
    let cost = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (_.has(routeMatrices, points[i])) {
        // find value match to next point
        if (_.has(routeMatrices[points[i]], points[i + 1])) {
          if (
            routeMatrices[points[i]][points[i + 1]] !== Infinity &&
            routeMatrices[points[i]][points[i + 1]] !== NaN
          )
            cost += routeMatrices[points[i]][points[i + 1]];
          else return Infinity;
        } else return Infinity;
      } else return Infinity;
    }

    return cost;
  },

  calculateWalks(
    routesMatrices: Matrix,
    start: string,
    end: string,
    k: number
  ): number {
    if (k === 0 && start === end) return 1;
    if (k === 1 && routesMatrices[start][end] !== Infinity) return 1;
    if (routesMatrices[start][end] === undefined) return 0;
    if (k <= 0) return 0;

    let count = 0;
    _.keys(routesMatrices).forEach(key => {
      if (
        routesMatrices[start][key] !== Infinity &&
        start !== key &&
        end !== key
      ) {
        count += this.calculateWalks(routesMatrices, key, end, k - 1);
      }
    });
    return count;
  },
  minDistance(
    distances: { [key: string]: number },
    visitedRoutes: { [key: string]: boolean }
  ): string {
    let min = Infinity;
    let minNode = "";
    _.forIn(distances, (weight: number, key: string) => {
      if (!visitedRoutes[key] && weight <= min) {
        min = weight;
        minNode = key;
      }
    });
    return minNode;
  },
  calculateShotestPath(routes: Matrix, start: string, end: string): number {
    let distances: { [key: string]: number } = {};
    let visitedNodes: { [key: string]: boolean } = {};
    // initialize data;
    _.keys(routes).map(key => {
      distances[key] = Infinity;
      visitedNodes[key] = false;
    });

    // start node distance always be 0
    distances[start] = 0;

    _.keys(routes).map(x => {
      // find start node (minimum distance)
      const startNode = this.minDistance(distances, visitedNodes);
      // mark startNode as visited
      visitedNodes[startNode] = true;

      // adjacent
      // loop through all adjacent nodes
      _.forIn(routes[startNode], (weight: number, nextNode: string) => {
        if (
          !visitedNodes[nextNode] &&
          nextNode !== startNode &&
          weight !== 0 &&
          weight !== Infinity &&
          distances[startNode] !== Infinity &&
          distances[startNode] + weight < distances[nextNode]
        )
          distances[nextNode] = distances[startNode] + weight;
      });
    });

    return distances[end];
  }
};

export default graphCalculator;
