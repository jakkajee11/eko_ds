import React, { useState } from "react";
import _ from "lodash";
import AvailableRoute from "./AvailableRoute";
import { fakeRoutes } from "../data/makeData";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { renderRoute } from "../utils/routeRenderer";

const routes = fakeRoutes();

const renderCost = (input: string, cost: number) => {
  if (!input) return "";
  if (cost !== Infinity) return cost;

  return "No Such Route";
};

const DeliveryCost: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<Matrix>(
    graphCalculator.buildMatrix(routes)
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cost, setCost] = useState();

  return (
    <div>
      <h4>Delivery cost calculation</h4>
      <input
        type="text"
        placeholder="Put your route here..."
        value={inputRoutes}
        onChange={e => {
          setInputRoutes(e.target.value.toUpperCase());
          setCost(
            graphCalculator.calculateCost(
              hashRoutes,
              e.target.value.toUpperCase()
            )
          );
        }}
        style={{ textTransform: "capitalize" }}
      />

      <hr />
      <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          <AvailableRoute routes={routes} />
        </div>
        <div>
          {inputRoutes && (
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
                  <td>{renderCost(inputRoutes, cost)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCost;
