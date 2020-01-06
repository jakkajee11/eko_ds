import React, { useState, useEffect } from "react";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes } from "../data/makeData";
import AvailableRoute from "./AvailableRoute";
import { renderRoute } from "../utils/routeRenderer";
import {
  Flex,
  Text,
  Stack,
  Input,
  Button,
  Divider,
  Box,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputLeftAddon
} from "@chakra-ui/core";
import { Graph } from "../models/Graph";
import graphBuilder from "../utils/graphBuilder";

const routes = fakeRoutes();

const PossibleDeliveryRoute: React.FC = () => {
  const [hashRoutes, setHashRoutes] = useState<Matrix>(
    graphCalculator.buildMatrix(routes)
  );
  const [graph] = useState(new Graph());
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
      count += graph.findPossibleWalks(inputRoutes[0], inputRoutes[1], max);

    setCost(count);
  };

  useEffect(() => {
    graphBuilder.initGraph(graph);
  }, []);

  return (
    <Flex direction="column" marginTop={10} padding={5}>
      <Text as="i" fontSize="lg">
        Possible delivey route calculation
      </Text>
      <Stack>
        <Input
          type="text"
          placeholder="Input routes..."
          value={inputRoutes}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value.toUpperCase())
          }
          className="capitalize"
        />
        <InputGroup>
          <InputLeftAddon children="Maximum walk: " />
          <Input type="number" ref={numberRef} defaultValue={1} min={1} />
          <InputRightElement
            children={<Icon name="up-down" color="gray.300" />}
          />
        </InputGroup>

        <Button
          type="submit"
          variantColor="teal"
          variant="solid"
          onClick={() => handleSumbit()}
        >
          Find
        </Button>
        <Divider />
        {inputRoutes.length >= 2 && (
          <Stack direction="row">
            <Box>Path: {renderRoute(inputRoutes)}</Box>
            <Divider orientation="vertical" />
            <Box>Cost: {cost}</Box>
          </Stack>
        )}
        <AvailableRoute />
      </Stack>
    </Flex>
  );
};

export default PossibleDeliveryRoute;
