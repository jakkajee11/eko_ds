import React from "react";
import graphBuilder from "../utils/graphBuilder";
import D3Graph from "../components/D3Graph";
import { Box, Text } from "@chakra-ui/core";
import { renderGraphLinks } from "../utils/routeRenderer";

interface AvailableRouteProps {
  searchRoutes?: string[];
}

const AvailableRoute: React.FC<AvailableRouteProps> = ({ searchRoutes }) => {
  const data = graphBuilder.loadGraph();
  if (searchRoutes) {
    data.nodes = data.nodes.map(n => {
      return {
        ...n,
        color: searchRoutes.includes(n.id) ? "red" : ""
      };
    });

    let hashLinks: { [key: string]: boolean } = {};
    for (let i = 0; i < searchRoutes.length - 1; i++) {
      data.links
        .filter(
          l => l.source === searchRoutes[i] && l.target === searchRoutes[i + 1]
        )
        .map(d => {
          hashLinks[`${d.source}${d.target}`] = true;
        });
    }
    data.links = data.links.map(l => {
      return {
        ...l,
        color: hashLinks[`${l.source}${l.target}`] ? "red" : ""
      };
    });
  }

  return (
    <Box>
      <Text as="i" fontSize="lg">
        Available Routes
      </Text>
      <D3Graph data={data} />
      <Box>{renderGraphLinks(data.links)}</Box>
    </Box>
  );
};

export default AvailableRoute;
