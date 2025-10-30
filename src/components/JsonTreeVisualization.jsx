import { useEffect, useRef } from "react";

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  BackgroundVariant,
  Panel,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodeSearch } from "./node-search";
import { toPng } from "html-to-image";

// Components
import ObjectNode from "./Nodes/ObjectNode";
import ArrayNode from "./Nodes/ArrayNode";
import PrimitiveNode from "./Nodes/PrimitiveNode";
import TreeControls from "./TreeControls";
import { downloadImage } from "@/utils/jsonTotree";

const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  primitive: PrimitiveNode,
};

const JsonTreeVisualization = ({ initialNodes, initialEdges, onExport }) => {
  const ref = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView, getNodes } = useReactFlow();

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

    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 50);

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

  const handleExport = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = document.querySelector(".react-flow__viewport");

    toPng(viewport, {
      backgroundColor: "#fff",
      width: nodesBounds.width,
      height: nodesBounds.height,
      pixelRatio: 2,
    }).then(downloadImage);
  };

  useEffect(() => {
    if (onExport) {
      onExport({ fn: handleExport });
    }
  }, [nodes]);

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
