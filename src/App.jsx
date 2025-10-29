import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { VscJson } from "react-icons/vsc";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import JsonTreeVisualization from "./components/JsonTreeVisualization";
import { generateTree } from "./utils/jsonTotree";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleVisualize = (parsedJson) => {
    const { nodes: newNodes, edges: newEdges } = generateTree(parsedJson);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <JsonInput
          onVisualize={handleVisualize}
          onClear={handleClear}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="flex-1 bg-gray-50">
          {nodes.length > 0 ? (
            <ReactFlowProvider>
              <JsonTreeVisualization
                initialNodes={nodes}
                initialEdges={edges}
              />
            </ReactFlowProvider>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <VscJson className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Enter JSON and click "Visualize Tree"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
