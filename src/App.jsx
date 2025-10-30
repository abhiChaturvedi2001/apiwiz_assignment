import { useEffect, useRef, useState } from "react";
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
import AiChatModal from "./components/AiChatModal";
import PrimaryButton from "./components/PrimaryButton";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const exportFnRef = useRef(null);
  const theme = useSelector((store) => store.theme.themeToggle);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleExportFn = (exportObj) => {
    exportFnRef.current = exportObj.fn;
  };

  const handleExport = () => {
    if (exportFnRef.current) {
      exportFnRef.current();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header onExport={handleExport} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <JsonInput onVisualize={handleVisualize} onClear={handleClear} />
        <div className="flex-1 bg-gray-50 dark:bg-gray-900">
          {nodes.length > 0 ? (
            <ReactFlowProvider>
              <JsonTreeVisualization
                initialNodes={nodes}
                initialEdges={edges}
                onExport={handleExportFn}
              />
            </ReactFlowProvider>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <PrimaryButton
        btnName={" 💬"}
        handleClick={() => setIsModalOpen(true)}
        styles="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
      />
      <AiChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
