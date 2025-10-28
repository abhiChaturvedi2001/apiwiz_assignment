import React, { useState } from "react";
import { FaCode } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";

const JsonInput = ({ onVisualize, onClear }) => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify("paste your code", null, 2)
  );
  const [error, setError] = useState(null);

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError(null);
      onVisualize(parsed);
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setError(null);
    onClear();
  };

  return (
    <>
      <div className="flex">
        <div className="w-[30rem] shadow p-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <FaCode size={50} />
              <div>
                <h5 className="text-sm">JSON Input</h5>
                <p className="text-xs">Paste or edit your JSON</p>
              </div>
            </div>
            <div className="flex items-center">
              <CiTrash onClick={handleClear} />
              <span>clear</span>
            </div>
          </div>
          {error && <p>{error}</p>}
          <TextArea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-[25rem] mx-auto my-2 "
          />
          <PrimaryButton
            styles="border px-2 py-1 mt-2 mx-auto block w-full"
            btnName={"Visualize Tree"}
            handleClick={handleVisualize}
          />
        </div>
      </div>
    </>
  );
};

export default JsonInput;
