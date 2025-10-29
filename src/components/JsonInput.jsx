import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

const JsonInput = ({ onVisualize, onClear, loading, setLoading }) => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify({ sample: "data" }, null, 2)
  );
  const [error, setError] = useState(null);

  const handleVisualize = () => {
    try {
      setLoading(true);
      const parsed = JSON.parse(jsonInput);
      setError(null);
      onVisualize(parsed);
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setError(null);
    onClear();
  };

  return (
    <div className="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FaCode className="w-6 h-6 text-gray-700" />
            <div>
              <h5 className="text-sm font-semibold text-gray-900">
                JSON Input
              </h5>
              <p className="text-xs text-gray-500">Paste or edit your JSON</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <CiTrash className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
            {error}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <TextArea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="flex-1"
        />
        <PrimaryButton
          styles="w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          btnName={loading ? "Generating..." : "Visualize Tree"}
          handleClick={handleVisualize}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default JsonInput;
