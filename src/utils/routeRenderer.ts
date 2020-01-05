import _ from "lodash";
import { HashMap, GraphLink } from "../data/types";
export const renderRoute = (routes: string) => {
  return _.join(
    _.toArray(routes).map(r => r),
    " -> "
  );
};

export const renderArray = (routes: string[]) => {
  return _.join(
    routes.map(r => r),
    " -> "
  );
};

export const renderHashMap = (hashMap: HashMap) => {
  let maps: string[] = [];
  _.keys(hashMap).map(key => {
    _.forIn(hashMap[key], (weight, neighbor) => {
      maps.push(`${key}${neighbor}${weight}`);
    });
  });
  return _.join(
    maps.map(m => m),
    ", "
  );
};

export const renderGraphLinks = (links: GraphLink[]) => {
  return _.join(
    links.map(l => `${l.source}${l.target}${l.weight}`),
    ", "
  );
};
