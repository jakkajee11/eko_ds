import React, { useState } from "react";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes } from "../data/makeData";
import AvailableRoute from "./AvailableRoute";
import { renderRoute } from "../utils/routeRenderer";

const routes = fakeRoutes();

const PossibleDeliveryRoute: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<Matrix>(
    graphCalculator.buildMatrix(routes)
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cost, setCost] = useState();

  const numberRef = React.createRef<HTMLInputElement>();

  const handleInputChange = (input: string) => {
    setInputRoutes(input);
  };

  const handleSumbit = () => {
    let count = 0;
    const max = numberRef.current ? parseInt(numberRef.current.value) : 0;
    if (max > 0)
      for (let i = max; i > 0; i--) {
        count += graphCalculator.calculateWalks(
          hashRoutes,
          inputRoutes[0],
          inputRoutes[1],
          i
        );
      }

    setCost(count);
  };

  return (
    <div>
      <h4>Possible delivey route calculation</h4>
      <input
        type="text"
        placeholder="Input routes..."
        value={inputRoutes}
        onChange={e => handleInputChange(e.target.value.toUpperCase())}
        className="capitalize"
      />
      <input type="number" ref={numberRef} defaultValue={0} min={0} />
      <button type="submit" onClick={() => handleSumbit()}>
        Submit
      </button>
      <hr />
      <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          <AvailableRoute />
        </div>
        <div>
          {inputRoutes && cost && (
            <table>
              <thead>
                <tr>
                  <th>From-To</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{renderRoute(inputRoutes)}</td>
                  <td>{cost}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PossibleDeliveryRoute;
