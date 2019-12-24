import _ from "lodash";
export const renderRoute = (routes: string) => {
  return _.join(
    _.toArray(routes).map(r => r),
    "->"
  );
};
