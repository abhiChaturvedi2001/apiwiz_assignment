import { useEffect, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { VscJson } from "react-icons/vsc";
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import JsonTreeVisualization from "./components/JsonTreeVisualization";
import { generateTree } from "./utils/jsonTotree";
import { useSelector } from "react-redux";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [exportFn, setExportFn] = useState(null);
  const theme = useSelector((store) => store.theme.themeToggle);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

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
      <Header onExport={exportFn} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <JsonInput onVisualize={handleVisualize} onClear={handleClear} />
        <div className="flex-1 bg-gray-50 dark:bg-gray-900">
          {nodes.length > 0 ? (
            <ReactFlowProvider>
              <JsonTreeVisualization
                initialNodes={nodes}
                initialEdges={edges}
                onExport={setExportFn}
              />
            </ReactFlowProvider>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
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
