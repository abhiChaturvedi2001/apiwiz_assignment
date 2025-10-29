import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// React Flow Module Methods
import { ReactFlowProvider } from "@xyflow/react";

// Utils Methods
import { generateTree } from "./utils/jsonTotree";

// components Import
import Header from "./components/Header";
import JsonInput from "./components/JsonInput";
import JsonTreeVisualization from "./components/JsonTreeVisualization";
import Loading from "./components/Loading";

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
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
