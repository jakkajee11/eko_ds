import React, { useState, useEffect } from "react";
import _ from "lodash";

import routeCalculator from "../utils/routeCalculator";
import DeliveryCost from "./DeliveryCost";
import PossibleDeliveryRoute from "./PossibleDeliveryRoute";
import CheapestDeliveryCost from "./CheapestDeliveryCost";
import { HashRoutes } from "../data/types";

const fakeRoutes = () => {
  return [
    //"AB1",
    //"BA2",
    "AC4",
    "AD10",
    //"BE3",
    "CD4",
    //"CF2",
    //"DE1",
    "EB3",
    "EA2"
    //"FD1"
  ];
};

routeCalculator.buildRoutesMatrix(fakeRoutes());

const Main: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<HashRoutes>(
    routeCalculator.buildRoutesMatrix(fakeRoutes())
  );
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [inputCheapestRoutes, setInputCheapestRoutes] = useState<string>("");
  const [inputPossibleRoutes, setInputPossibleRoutes] = useState<string>("");
  const [cost, setCost] = useState<number | undefined>(undefined);

  const renderCost = () => {
    if (!inputRoutes) return "";
    if (cost) return `Cost: ${cost}`;

    return "No Such Route";
  };

  const handleInputChange = (route: string) => {
    setInputRoutes(route);
    setCost(routeCalculator.calculateCost(hashRoutes, route));
  };

  const handleInputPossibleRouteChange = (route: string) => {
    setInputPossibleRoutes(route);
    //setCost(routeCalculator.calculateCost(hashRoutes, route));
  };

  const handleInputCheapestRouteChange = (route: string) => {
    setInputCheapestRoutes(route);
    //setCost(routeCalculator.calculateCost(hashRoutes, route));
  };

  const handleOnSubmit = (route: string) => {
    setCost(routeCalculator.calculateCost(hashRoutes, route));
  };

  const calculateCheapestCost = (from: string, to: string) => {
    console.log([from, to]);
    //routeCalculator.calculateCheapestRoute(hashRoutes, from, to);
    setCost(routeCalculator.calculateCheapestRoute(hashRoutes, from, to));
  };

  const findShotestPath = (from: string, to: string, k: number) => {
    const result = routeCalculator.countWalks(hashRoutes, from, to, k);
    console.log([from, to, k, result]);
    //setCost(routeCalculator.findShortestRoutes(hashRoutes, from, to, k));
  };

  return (
    <>
      <div>
        <div>
          Predefined routes
          <p>{_.toString(fakeRoutes())}</p>
          {/* <DeliveryCost
            inputRoutes={inputRoutes}
            onChange={handleInputChange}
            onSubmit={handleOnSubmit}
          /> */}
          {/* <PossibleDeliveryRoute
            inputRoutes={inputPossibleRoutes}
            onChange={handleInputPossibleRouteChange}
            onSubmit={findShotestPath}
          />
          <CheapestDeliveryCost
            inputRoutes={inputCheapestRoutes}
            onChange={handleInputCheapestRouteChange}
            onSubmit={calculateCheapestCost}
          /> */}
          <hr />
          <div>{renderCost()}</div>
          <div style={{ padding: "10px" }}>
            Hashed routes
            <>
              {/* {_.keys(hashRoutes).map((key: string) => (
                <p key={key} style={{ textAlign: "left" }}>
                  {key}: {_.toString(hashRoutes[key])}
                </p>
              ))} */}
              {_.keys(hashRoutes).map((key: string) => (
                <p key={key} style={{ textAlign: "left" }}>
                  {key}: {JSON.stringify(hashRoutes[key])}
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
