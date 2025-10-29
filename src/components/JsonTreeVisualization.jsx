import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import ObjectNode from "./Nodes/ObjectNode";
import ArrayNode from "./Nodes/ArrayNode";
import PrimitiveNode from "./Nodes/PrimitiveNode";
import TreeControls from "./TreeControls";
import { NodeSearch } from "./node-search";

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
          stroke: "#9ca3af",
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
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#d1d5db"
        />
        <Controls />
        <TreeControls />
      </ReactFlow>
      <Panel
        className="flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground"
        position="top-left"
      >
        <NodeSearch />
      </Panel>
    </div>
  );
};

export default JsonTreeVisualization;
