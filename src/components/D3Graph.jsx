import React from "react";
import { Graph } from "react-d3-graph";

const myConfig = {
  automaticRearrangeAfterDropNode: true,
  nodeHighlightBehavior: true,
  directed: true,
  height: 320,
  node: {
    color: "lightgreen",
    size: 150,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "lightblue",
    labelProperty: "weight",
    renderLabel: true
  }
};

const D3Graph = ({ data }) => (
  <div style={{ height: "vh100", width: "100%" }}>
    {data && data.nodes && data.nodes.length > 0 && (
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
        // onClickNode={onClickNode}
        // onRightClickNode={onRightClickNode}
        // onClickGraph={onClickGraph}
        // onClickLink={onClickLink}
        // onRightClickLink={onRightClickLink}
        // onMouseOverNode={onMouseOverNode}
        // onMouseOutNode={onMouseOutNode}
        // onMouseOverLink={onMouseOverLink}
        // onMouseOutLink={onMouseOutLink}
        // onNodePositionChange={onNodePositionChange}
      />
    )}
  </div>
);

export default D3Graph;
