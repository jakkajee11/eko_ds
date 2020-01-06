import React, { useState } from "react";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes, fakeGraphs, fakeMatrix } from "../data/makeData";

import AvailableRoute from "./AvailableRoute";
import { renderRoute, renderArray } from "../utils/routeRenderer";
import { Graph } from "../models/Graph";
import { Button, Input } from "@chakra-ui/core";

//const graph = fakeGraphs();

const theGraph = new Graph();
// theGraph.addNode("A");
// theGraph.addNode("B");
// theGraph.addNode("C");
// theGraph.addNode("D");
// theGraph.addNode("E");
// theGraph.addNode("F");

// theGraph.addEdge("A", "B", 1);
// theGraph.addEdge("E", "B", 3);
// theGraph.addEdge("B", "E", 3);
// theGraph.addEdge("E", "A", 2);
// theGraph.addEdge("A", "C", 4);
// theGraph.addEdge("A", "D", 10);
// theGraph.addEdge("C", "D", 4);
// theGraph.addEdge("C", "F", 2);
// theGraph.addEdge("F", "D", 1);
// theGraph.addEdge("D", "E", 1);

// console.log(["graph", theGraph]);

const TestGraph: React.FC = () => {
  //const [graph, setGraph] = useState<Graph>(fakeGraphs());
  const [graph, setGraph] = useState<Graph>(theGraph);
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cheapestCost, setCheapestCost] = useState();
  const [deliveryCost, setDeliveryCost] = useState();
  const [walks, setWalks] = useState();

  const numRef = React.createRef<HTMLInputElement>();

  const handleInputChange = (input: string) => {
    if (input.length >= 2) {
      setCheapestCost(graph.findShortestPath(input[0], input[1]));
      const costOfDelivery = graph.calculateCost(input);
      if (costOfDelivery !== Infinity) setDeliveryCost(costOfDelivery);
      else setDeliveryCost("No Such Route");
    }

    setInputRoutes(input);
  };

  const handleSubmit = () => {
    const max = parseInt(numRef.current?.value ?? "0");
    const numWalks = graph.findPossibleWalks(
      inputRoutes[0],
      inputRoutes[1],
      max
    );
    //console.log(["numWalks", numWalks]);
    setWalks(numWalks);
  };

  return (
    <div>
      <h4>Cheapest delivey cost calculation</h4>
      <input
        type="text"
        placeholder="Input routes..."
        value={inputRoutes}
        minLength={2}
        maxLength={10}
        onChange={e => handleInputChange(e.target.value.toUpperCase())}
        style={{ textTransform: "capitalize" }}
      />
      <input type="number" ref={numRef} />
      <Input placeholder="Chakra UI" />
      <Button variantColor="teal" variant="solid">
        Button
      </Button>
      <button onClick={handleSubmit}>Submit</button>
      <hr />
      <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          {/* <AvailableRoute routes={routes} /> */}
        </div>
        <div style={{ width: "45%", float: "right", padding: "10px" }}>
          {inputRoutes.length >= 2 && (
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
                  <td>
                    Shortest path is {renderArray(cheapestCost.path)}, cost:{" "}
                    {cheapestCost.cost}
                  </td>
                </tr>
                <tr>
                  <td>{renderRoute(inputRoutes)}</td>
                  <td>
                    Delivery cost of path {renderRoute(inputRoutes)} is{" "}
                    {deliveryCost}
                  </td>
                </tr>
                <tr>
                  <td>{renderRoute(inputRoutes)}</td>
                  <td>
                    Possibility walks path {renderRoute(inputRoutes)} is {walks}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestGraph;
