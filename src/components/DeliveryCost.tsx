import React, { useState, useEffect } from "react";
import _ from "lodash";
import AvailableRoute from "./AvailableRoute";
import { fakeRoutes } from "../data/makeData";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { Graph } from "../models/Graph";
import { renderRoute } from "../utils/routeRenderer";
import graphBuilder from "../utils/graphBuilder";
import D3Graph from "./D3Graph";
import { Flex, Text, Stack, Input, Divider, Box } from "@chakra-ui/core";

const routes = fakeRoutes();

const renderCost = (input: string, cost: number) => {
  if (!input) return "";
  if (cost !== Infinity) return cost;

  return "No Such Route";
};

const DeliveryCost: React.FC = () => {
  const [graph] = useState(new Graph());
  const [inputRoutes, setInputRoutes] = useState<string>("");
  const [cost, setCost] = useState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRoutes(e.target.value.toUpperCase());
    setCost(graph.calculateCost(e.target.value.toUpperCase()));
  };

  useEffect(() => {
    graphBuilder.initGraph(graph);
  }, []);

  return (
    <Flex direction="column" marginTop={10} padding={5}>
      <Text as="i" fontSize="lg">
        Delivery cost calculation
      </Text>
      <Stack>
        <Input
          placeholder="Put your route here..."
          value={inputRoutes}
          onChange={handleInputChange}
          className="capitalize"
        />

        <Divider />
        {inputRoutes.length >= 2 && (
          <Stack direction="row">
            <Box>{renderRoute(inputRoutes)}</Box>
            <Divider orientation="vertical" />
            <Box>{renderCost(inputRoutes, cost)}</Box>
          </Stack>
        )}

        <AvailableRoute searchRoutes={_.toArray(inputRoutes)} />
      </Stack>
    </Flex>
  );
};

export default DeliveryCost;
