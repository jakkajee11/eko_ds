import React, { useState } from "react";
import { HashRoutes } from "../data/types";
import routeCalculator from "../utils/routeCalculator";
import { fakeRoutes } from "../data/makeData";

import AvailableRoute from "./AvailableRoute";

const routes = fakeRoutes();

const CheapestDeliveryRoute: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<HashRoutes>(
    routeCalculator.buildRoutesMatrix(routes)
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cheapestCost, setCheapestCost] = useState();

  return (
    <div>
      <h4>3. Find cheapest delivey route</h4>
      <input
        type="text"
        placeholder="Put your route here..."
        value={inputRoutes}
        minLength={2}
        maxLength={2}
        onChange={e => setInputRoutes(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />
      <button
        type="submit"
        onClick={() =>
          setCheapestCost(
            routeCalculator.calculateCheapestRoute(
              hashRoutes,
              inputRoutes[0],
              inputRoutes[1]
            )
          )
        }
      >
        Submit
      </button>

      <hr />
      <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          <AvailableRoute routes={routes} />
        </div>
        <div style={{ width: "45%", float: "right", padding: "10px" }}>
          {cheapestCost && (
            <table>
              <thead>
                <tr>
                  <th>From-To</th>
                  <th>Cheapest Routes</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`${inputRoutes[0]}->${inputRoutes[1]}`}</td>
                  <td>A->B</td>
                  <td>{cheapestCost}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheapestDeliveryRoute;
