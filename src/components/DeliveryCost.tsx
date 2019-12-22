import React, { useState } from "react";
import _ from "lodash";
import AvailableRoute from "./AvailableRoute";
import { fakeRoutes } from "../data/makeData";
import { HashRoutes } from "../data/types";
import routeCalculator from "../utils/routeCalculator";

const routes = fakeRoutes();

const renderCost = (input: string, cost: number) => {
  if (!input) return "";
  if (cost) return cost;

  return "No Such Route";
};

const renderRoute = (routes: string) => {
  return _.join(
    _.toArray(routes).map(r => r),
    "->"
  );
};

const DeliveryCost: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<HashRoutes>(
    routeCalculator.buildRoutesMatrix(routes)
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
            routeCalculator.calculateCost(
              hashRoutes,
              e.target.value.toUpperCase()
            )
          );
        }}
        style={{ textTransform: "capitalize" }}
      />
      {/* <button
        type="submit"
        onClick={() =>
          setCost(routeCalculator.calculateCost(hashRoutes, inputRoutes))
        }
      >
        Submit
      </button> */}
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
