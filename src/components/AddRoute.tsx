import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Graph } from "../models/Graph";
import {
  renderRoute,
  renderArray,
  renderHashMap
} from "../utils/routeRenderer";
import graphBuilder from "../utils/graphBuilder";
import D3Graph from "./D3Graph";
import { GraphData } from "../data/types";
import { Button, Input, Stack, Flex, Text } from "@chakra-ui/core";

const AddRoute: React.FC = () => {
  const [route, setRoute] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [graph] = useState(new Graph());
  const [changedAt, setChangedAt] = useState();
  const [data, setData] = useState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    setRoute(input);
    if (input.length >= 3 && /[a-zA-Z]{2}\d+$/.test(input)) setIsValid(true);
    else setIsValid(false);
  };

  const handleAddButtonClick = (e: React.MouseEvent) => {
    // add node to the graph
    graph.addNode(route[0]);
    graph.addNode(route[1]);
    // add egde to the graph
    graph.addEdge(route[0], route[1], parseInt(route.substring(2)));

    buildGraphData();
    // force UI render
    setChangedAt(new Date());
  };

  const handleSaveButtonClick = () => {
    localStorage.setItem("graph-data", JSON.stringify(data));
  };

  const buildGraphData = () => {
    let _data: GraphData = { nodes: [], links: [] };
    const adjLists = graph.getAdjacencyLists();
    graph.getNodes().map(n => {
      _data.nodes.push({ id: n });
      _.forIn(adjLists[n], (weight, node) => {
        _data.links.push({ source: n, target: node, weight });
      });
    });

    setData(_data);
  };

  useEffect(() => {
    graphBuilder.initGraph(graph);
    setData(graphBuilder.loadGraph());
    setChangedAt(new Date());
  }, []);

  return (
    <Flex direction="column" marginTop={10}>
      <Text as="i" fontSize="lg">
        Add new routes
      </Text>
      <Stack direction="row" spacing={2}>
        <Input
          placeholder="Add new route..."
          min={3}
          max={10}
          size="md"
          value={route}
          onChange={handleInputChange}
          className="capitalize"
          isInvalid={!isValid}
        />
        <Button
          variantColor="teal"
          variant="solid"
          type="submit"
          isDisabled={!isValid}
          onClick={handleAddButtonClick}
        >
          Add
        </Button>
        <Button
          variantColor="red"
          variant="solid"
          isDisabled={!data}
          onClick={handleSaveButtonClick}
        >
          Save
        </Button>
      </Stack>

      <p>{changedAt && renderHashMap(graph.getAdjacencyLists())}</p>

      <D3Graph data={data} />
    </Flex>
  );
};

export default AddRoute;
