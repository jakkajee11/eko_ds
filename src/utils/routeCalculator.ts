import _ from "lodash";
import { HashRoutes } from "../data/types";

const routeCalculator = {
  buildHashRoutes(routes: string[]): HashRoutes {
    let hashRoutes: HashRoutes = {};
    routes.map((route: string) => {
      const key = route[0];
      const value = route.substr(1);
      if (!_.has(hashRoutes, key)) hashRoutes[key] = [value];
      else hashRoutes[key].push(value);
    });

    console.log(["hashRoutes", hashRoutes]);
    return hashRoutes;
  },
  calculateCost(routes: string[], searchRoutes: string): number | undefined {
    const hashRoutes = this.buildHashRoutes(routes);
    const _points = _.toArray(searchRoutes);
    let cost = 0;
    for (let i = 0; i < _points.length - 1; i++) {
      if (_.has(hashRoutes, _points[i])) {
        // find value match to next point
        const nextPoint = hashRoutes[_points[i]].find(
          (v: string) => v[0] === _points[i + 1]
        );
        if (nextPoint) cost += parseInt(nextPoint.substring(1));
        else return undefined;
      }
    }

    return cost;
  },
  findAllPossibleRoutes(
    routes: string[],
    routeToFind: string
  ): number | undefined {
    return undefined;
  },
  calculateCheapestRoute(routes: string[]): number | undefined {
    return undefined;
  }
};

export default routeCalculator;
