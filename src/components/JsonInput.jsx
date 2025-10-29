import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import toast from "react-hot-toast";

const JsonInput = ({ onVisualize, onClear }) => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify({ sample: "data" }, null, 2)
  );
  const [error, setError] = useState(null);

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError(null);
      onVisualize(parsed);
    } catch (e) {
      toast.error("Invalid JSON:" + e.message);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setError(null);
    onClear();
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaCode className="w-6 h-6 text-gray-700 dark:text-white " />
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white ">
                JSON Input
              </h5>
              <p className="text-xs text-gray-500 dark:text-white ">
                Paste or edit your JSON
              </p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <CiTrash size={25} className="cursor-pointer " />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <TextArea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="flex-1 "
        />
        <PrimaryButton
          styles="w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          btnName={"Visualize Tree"}
          handleClick={handleVisualize}
        />
      </div>
    </div>
  );
};

export default JsonInput;
