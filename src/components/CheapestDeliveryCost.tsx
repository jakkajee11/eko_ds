import React, { useState, useEffect } from "react";
import { Matrix, ShortestPath } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes } from "../data/makeData";

import AvailableRoute from "./AvailableRoute";
import { renderRoute, renderArray } from "../utils/routeRenderer";
import { Flex, Text, Stack, Input, Divider, Box } from "@chakra-ui/core";
import { Graph } from "../models/Graph";
import graphBuilder from "../utils/graphBuilder";

const CheapestDeliveryRoute: React.FC = () => {
  const [graph] = useState(new Graph());
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cheapestCost, setCheapestCost] = useState<ShortestPath>();

  const handleInputChange = (input: string) => {
    if (input.length === 2) {
      setCheapestCost(
        //graphCalculator.calculateShotestPath2(hashRoutes, input[0], input[1])
        graph.findShortestPath(input[0], input[1])
      );
    }

    setInputRoutes(input);
  };

  useEffect(() => {
    graphBuilder.initGraph(graph);
  }, []);

  return (
    <Flex direction="column" marginTop={10} padding={5}>
      <Text as="i" fontSize="lg">
        Cheapest delivey cost calculation
      </Text>
      <Stack>
        <Input
          type="text"
          placeholder="Input routes..."
          value={inputRoutes}
          minLength={2}
          maxLength={2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value.toUpperCase())
          }
          className="capitalize"
        />

        <Divider />
        {inputRoutes.length >= 2 && (
          <Stack direction="row">
            <Box>Path: {renderArray(cheapestCost?.path || [])}</Box>
            <Divider orientation="vertical" />
            <Box>
              <Text>Cost: {cheapestCost?.cost}</Text>
            </Box>
          </Stack>
        )}

        <AvailableRoute searchRoutes={cheapestCost?.path} />
        {/* <div>
        <div style={{ width: "45%", float: "left", padding: "10px" }}>
          <AvailableRoute />
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
      </div> */}
      </Stack>
    </Flex>
  );
};

export default CheapestDeliveryRoute;
