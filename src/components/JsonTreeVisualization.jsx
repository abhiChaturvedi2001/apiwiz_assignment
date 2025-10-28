import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  useReactFlow,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import ObjectNode from "./Nodes/ObjectNode";
import ArrayNode from "./Nodes/ArrayNode";
import PrimitiveNode from "./Nodes/PrimitiveNode";

const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  primitive: PrimitiveNode,
};

const JsonTreeVisualization = ({ initialNodes, initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(
      initialEdges.map((edge) => ({
        ...edge,
        animated: true,
        style: {
          stroke: "#333",
          strokeWidth: 2,
        },
      }))
    );

    // Fit view with animation after nodes are set
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 50);

    // Auto-center on highlighted node
    const highlightedNode = initialNodes.find((n) => n.data.isHighlighted);
    if (highlightedNode) {
      setTimeout(() => {
        fitView({
          nodes: [highlightedNode],
          padding: 0.5,
          duration: 800,
        });
      }, 100);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      className="bg-gradient-background"
      minZoom={0.1}
      maxZoom={2}
      defaultEdgeOptions={{
        type: "smoothstep",
        animated: true,
      }}
    >
      <Background
        className="bg-background"
        variant={BackgroundVariant.Dots}
        gap={16}
        size={1}
      />
      {/* <MiniMap
        nodeColor={(node) => {
          switch (node.type) {
            case "object":
              return "hsl(var(--node-object))";
            case "array":
              return "hsl(var(--node-array))";
            case "primitive":
              return "hsl(var(--node-primitive))";
            default:
              return "hsl(var(--muted))";
          }
        }}
        className="!bg-card !border-2 !border-border rounded-lg shadow-lg"
        maskColor="hsl(var(--background) / 0.8)"
      /> */}
    </ReactFlow>
  );
};

export default JsonTreeVisualization;
