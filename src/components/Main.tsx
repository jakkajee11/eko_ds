import React, { useState, useEffect } from "react";
import _ from "lodash";

import routeCalculator from "../utils/routeCalculator";
import DeliveryCost from "./DeliveryCost";
import PossibleDeliveryRoute from "./PossibleDeliveryRoute";
import CheapestDeliveryCost from "./CheapestDeliveryCost";
import { HashRoutes } from "../data/types";

const fakeRoutes = () => {
  return [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1"
  ];
};

const Main: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<HashRoutes>(
    //buildHashRoutes(fakeRoutes())
    routeCalculator.buildHashRoutes(fakeRoutes())
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cost, setCost] = useState<number | undefined>(undefined);

  const renderCost = () => {
    if (!inputRoutes) return "";
    if (cost) return `Cost: ${cost}`;

    return "No Such Route";
  };

  const handleInputChange = (route: string) => {
    setInputRoutes(route);
    setCost(routeCalculator.calculateCost(fakeRoutes(), route));
  };

  const handleOnSubmit = (route: string) => {
    setCost(routeCalculator.calculateCost(fakeRoutes(), route));
  };

  return (
    <>
      <div>
        <div>
          Predefined routes
          <p>{_.toString(fakeRoutes())}</p>
          {/* <div>
            <input
              type="text"
              placeholder="Put route to find here..."
              value={inputRoutes}
              onChange={e => handleInputChange(e.target.value.toUpperCase())}
              style={{ textTransform: "capitalize" }}
            />
            <button
              type="submit"
              onClick={() => setCost(calculateCost(inputRoutes))}
            >
              Submit
            </button>            
          </div> */}
          <DeliveryCost
            inputRoutes={inputRoutes}
            onChange={handleInputChange}
            onSubmit={handleOnSubmit}
          />
          <PossibleDeliveryRoute
          //inputRoutes={inputRoutes}
          //onChange={handleInputChange}
          //onSubmit={handleOnSubmit}
          />
          <CheapestDeliveryCost
          //inputRoutes={inputRoutes}
          //onChange={handleInputChange}
          //onSubmit={handleOnSubmit}
          />
          <hr />
          <div>{renderCost()}</div>
          <div style={{ padding: "10px" }}>
            Hashed routes
            <>
              {_.keys(hashRoutes).map((key: string) => (
                <p key={key} style={{ textAlign: "left" }}>
                  {key}: {_.toString(hashRoutes[key])}
                </p>
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
