import React from "react";
import _ from "lodash";

interface AvailableRouteProps {
  routes: string[];
}

const AvailableRoute: React.FC<AvailableRouteProps> = ({ routes }) => (
  <div>
    <h4>Available Routes</h4>
    <p>{_.toString(routes)}</p>
  </div>
);

export default AvailableRoute;
