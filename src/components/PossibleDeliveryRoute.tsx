import React, { useState, useEffect } from "react";
import { Matrix } from "../data/types";
import graphCalculator from "../utils/graphCalculator";
import { fakeRoutes } from "../data/makeData";
import AvailableRoute from "./AvailableRoute";
import { renderRoute } from "../utils/routeRenderer";
import { Flex, Text, Stack, Input, Button, Divider } from "@chakra-ui/core";
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
      for (let i = max; i > 0; i--) {
        count += graphCalculator.calculateWalks(
          hashRoutes,
          inputRoutes[0],
          inputRoutes[1],
          i
        );
      }
    const w = graph.findPossibleWalks(inputRoutes[0], inputRoutes[1], max);
    console.log(["w", w]);
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
        <Input type="number" ref={numberRef} defaultValue={0} min={0} />
        <Button type="submit" onClick={() => handleSumbit()}>
          Submit
        </Button>
        <Divider />
        <AvailableRoute />
      </Stack>

      {/* <div>
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
      </div> */}
    </Flex>
  );
};

export default PossibleDeliveryRoute;
