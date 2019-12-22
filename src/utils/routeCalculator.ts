import _ from "lodash";
import { HashRoutes } from "../data/types";

const routeCalculator = {
  buildHashRoutes(routes: string[]): HashRoutes {
    let hashRoutes: HashRoutes = {};
    routes.map((route: string) => {
      const key = route[0];
      const value = route.substring(1);
      if (!_.has(hashRoutes, key))
        hashRoutes[key] = { [value[0]]: parseInt(value.substring(1)) };
      else
        hashRoutes[key] = {
          ...hashRoutes[key],
          [value[0]]: parseInt(value.substring(1))
        };
    });

    console.log(["hashRoutes", hashRoutes]);
    return hashRoutes;
  },
  buildRoutesMatrix(routes: string[]) {
    let sets = new Set<string>();
    routes.map((route: string) => {
      sets.add(route[0]);
      sets.add(route[1]);
    });

    let hashRoutes: HashRoutes = {};

    sets.forEach(v => {
      console.log(v);
      hashRoutes[v] = {};
      routes.map((route: string) => {
        //console.log(["route", route]);
        const key = route[0];
        const value = route.substring(1);
        //if (v === key)
        if (!hashRoutes[key])
          hashRoutes[key] = { [route[1]]: parseInt(value.substring(1)) };
        else
          hashRoutes[key] = {
            ...hashRoutes[key],
            [route[1]]: parseInt(value.substring(1))
          };
      });
    });

    console.log(["routeMatrix", hashRoutes]);
    return hashRoutes;
    //console.log(["nodeSets", sets, hashRoutes]);
  },
  calculateCost(
    hashRoutes: HashRoutes,
    searchRoutes: string
  ): number | undefined {
    const points = _.toArray(searchRoutes);
    let cost = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (_.has(hashRoutes, points[i])) {
        // find value match to next point
        if (_.has(hashRoutes[points[i]], points[i + 1]))
          cost += hashRoutes[points[i]][points[i + 1]];
        else return undefined;
      }
    }

    return cost;
  },
  findShortestRoutes(
    hashRoutes: HashRoutes,
    from: string,
    to: string,
    k: number
  ): number {
    // base cases
    if (k === 0 && from === to) return 0;
    // if (k === 1 && _.has(hashRoutes, `${from}.${to}`))
    //   return hashRoutes[from][to];
    if (k === 1 && hashRoutes[from][to]) return hashRoutes[from][to];
    if (!_.has(hashRoutes, from) || !_.has(hashRoutes, to)) return Infinity;
    if (k <= 0) return Infinity;

    let res = Infinity;
    let count = 0;
    //_.keys(hashRoutes).map(key => {
    //console.log(["key", key]);
    // _.forIn(hashRoutes[from], (cost: number, subkey: string) => {
    //   if (_.has(hashRoutes[from], subkey)) {
    //     //console.log(["key:subkey", key, subkey]);
    //     const rec_res = this.findShortestRoutes(hashRoutes, subkey, to, k - 1);
    //     console.log(["rec_res", rec_res, "key", from, "subkey", subkey, cost]);
    //     if (rec_res !== Infinity) res = Math.min(...[res, cost + rec_res]);
    //   }
    // });
    //});

    _.forIn(hashRoutes[from], (cost: number, subkey: string) => {
      //if (_.has(hashRoutes[from], subkey)) {
      console.log(["key:subkey:to", from, subkey, to]);
      const rec_res = this.findShortestRoutes(hashRoutes, subkey, to, k - 1);
      console.log(["rec_res", rec_res, "key", from, "subkey", subkey, cost]);
      if (rec_res !== Infinity) res = Math.min(...[res, cost + rec_res]);
      //}
      //count += cost + rec_res;
    });

    return res;
  },
  countWalks(
    hashRoutes: HashRoutes,
    from: string,
    to: string,
    k: number
  ): number {
    // base cases
    if (k === 0 && from === to) return 1;
    if (k === 1 && _.has(hashRoutes, `${from}.${to}`)) {
      console.log([`return 1 (k: ${k})`]);
      return 1;
    }
    if (k === 1 && hashRoutes[from][to]) return 1;
    //if (!_.has(hashRoutes, from) || !_.has(hashRoutes, to)) return 0;
    if (k <= 0) return 0;

    let count = 0;
    const keys = _.keys(hashRoutes);

    // console.log(["keys", keys]);
    // for (let i = 0; i < keys.length; i++) {
    //   console.log(`********** MAIN (key: ${keys[i]}) *********`);
    //   console.log([
    //     k,
    //     "key",
    //     keys[i],
    //     `hashRoutes[${from}][${keys[i]}]]`,
    //     hashRoutes[from][keys[i]]
    //   ]);
    //   if (hashRoutes[from][keys[i]]) {
    //     //count += 1;
    //     count += this.countWalks(hashRoutes, keys[i], to, k - 1);
    //   }
    // }
    let visitedRoutes: string[] = [];
    keys.forEach(key => {
      console.log(`********** MAIN (key: ${key}) *********`);
      console.log([
        k,
        "key",
        key,
        `hashRoutes[${from}][${key}]]`,
        hashRoutes[from][key]
      ]);
      if (hashRoutes[from][key]) {
        //count += 1;
        _.keys(hashRoutes[from]).map(childKey => {
          if (hashRoutes[from][childKey])
            count += this.countWalks(hashRoutes, childKey, to, k - 1);
        });
        //count += this.countWalks(hashRoutes, key, to, k - 1);
      }
    });

    return count;
  },
  // from & to must be existed
  calculateCheapestRoute(
    hashRoutes: HashRoutes,
    from: string,
    to: string
  ): number | undefined {
    let visitedRoutes: string[] = [];
    let stepRoutes: string[] = [];
    // set costs value to Infinity except from node
    let costs: { [key: string]: number } = {};
    _.keys(hashRoutes).map(key => {
      costs[key] = key === from ? 0 : Infinity;
    });
    let node = from;
    // add node to visitedRoutes
    visitedRoutes.push(node);
    stepRoutes.push(node);
    let pairs: string[] = [];
    while (stepRoutes.length > 0) {
      let currentNode = stepRoutes.shift();
      // loop through children of current node
      // debugger;
      if (currentNode) {
        _.forIn(hashRoutes[currentNode], (value: number, key: string) => {
          let cost = costs[currentNode || ""] + value;
          console.log(["cost", cost, key, value]);
          if (cost < costs[key]) {
            costs[key] = cost;
          }

          if (!visitedRoutes.includes(key)) {
            visitedRoutes.push(key);
            stepRoutes.push(key);
          } else {
            if (key === to) {
              costs[key] = cost;
              visitedRoutes.push(key);
            }
            // else {
            //   costs[key] = cost;
            //   stepRoutes = [];
            // }
          }
          console.log(["stepRoutes", stepRoutes]);
          // clear if target node has found
          //if (visitedRoutes.includes(to)) stepRoutes = [];
          //if (visitedRoutes.includes())
          //pairs.push(`${currentNode}${key}`);
          // let keyPair = `${currentNode}${key}`;
          // //pairs.push(keyPair);
          // pairs.push(keyPair);
          // if (pairs.filter(v => v === keyPair).length > 1) {
          //   console.log(["Circular detected", keyPair]);

          //   // let cost = costs[currentNode || ""] + value;
          //   // console.log(["cost2", cost, key, value]);
          //   // if (cost < costs2[key]) {
          //   //   costs2[key] = cost;
          //   // }
          //   stepRoutes = [];
          // }
        });
      }
      console.log(["pairs", pairs]);
      console.log(["currentNode", currentNode]);
      //if(visitedRoutes.filter(k => k ))
      //currentNode = stepRoutes.shift();
    }

    console.log(["costs", costs, costs[to]]);
    console.log(["visitedNodes", visitedRoutes]);

    return costs[to];
  }
};

export default routeCalculator;
