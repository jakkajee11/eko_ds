import React, { useState } from "react";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes } from "../data/makeData";

import AvailableRoute from "./AvailableRoute";
import { renderRoute } from "../utils/routeRenderer";

const routes = fakeRoutes();

const CheapestDeliveryRoute: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<Matrix>(
    graphCalculator.buildMatrix(routes)
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cheapestCost, setCheapestCost] = useState();

  const handleInputChange = (input: string) => {
    if (input.length === 2) {
      setCheapestCost(
        graphCalculator.calculateShotestPath(hashRoutes, input[0], input[1])
      );
    }

    setInputRoutes(input);
  };

  return (
    <div>
      <h4>Cheapest delivey cost calculation</h4>
      <input
        type="text"
        placeholder="Input routes..."
        value={inputRoutes}
        minLength={2}
        maxLength={2}
        onChange={e => handleInputChange(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />

      <hr />
      <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          <AvailableRoute routes={routes} />
        </div>
        <div style={{ width: "45%", float: "right", padding: "10px" }}>
          {inputRoutes.length === 2 && (
            <table>
              <thead>
                <tr>
                  <th>From-To</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{renderRoute(inputRoutes)}</td>
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
