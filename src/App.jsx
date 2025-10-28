import React, { useState } from "react";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import { ReactFlowProvider } from "@xyflow/react";
import JsonTreeVisualization from "./components/JsonTreeVisualization";
import { BsBraces } from "react-icons/bs";
import { jsonToTree } from "./utils/jsonTotree";
import toast from "react-hot-toast";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  const handleVisualize = (data) => {
    setJsonData(data);
    const { nodes: newNodes, edges: newEdges } = jsonToTree(data);
    setNodes(newNodes);
    setEdges(newEdges);
    toast.success("Tree visualized successfully!");
  };

  const handleSearch = (searchPath) => {
    if (!jsonData) {
      toast.error("Please visualize JSON first");
      return;
    }

    if (!searchPath) {
      // Clear search - re-render without highlights
      const { nodes: newNodes, edges: newEdges } = jsonToTree(jsonData);
      setNodes(newNodes);
      setEdges(newEdges);
      return;
    }

    const result = searchNodeByPath(jsonData, searchPath);

    if (result.found) {
      const { nodes: newNodes, edges: newEdges } = jsonToTree(
        jsonData,
        result.path
      );
      setNodes(newNodes);
      setEdges(newEdges);
      toast.success("Match found!");
    } else {
      toast.error("No match found");
    }
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setJsonData(null);
  };
  return (
    <div>
      <Header />
      <div className="flex">
        <JsonInput onVisualize={handleVisualize} onClear={handleClear} />

        <ReactFlowProvider>
          <div className="flex-1 flex flex-col">
            {/* Search and Controls Bar
          <div className="bg-card border-b border-border p-4 shadow-md">
            <div className="flex gap-4 items-center">
              <SearchBar onSearch={handleSearch} />
              {nodes.length > 0 && <TreeControls />}
            </div>
          </div> */}
            {/* Tree Visualization */}
            <div className="flex-1 relative">
              {nodes.length > 0 ? (
                <JsonTreeVisualization
                  initialNodes={nodes}
                  initialEdges={edges}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center animate-float">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
                      <BsBraces className="w-24 h-24 mx-auto mb-6 text-primary/30 relative" />
                    </div>
                    <p className="text-xl font-medium mb-2">
                      Ready to Visualize
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Paste your JSON in the left panel and click{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;
