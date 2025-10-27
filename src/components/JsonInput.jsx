import React from "react";
import { FaCode } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const JsonInput = () => {
  const handleClick = () => {};
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
              <CiTrash />
              <span>clear</span>
            </div>
          </div>
          <TextArea className="w-[25rem] mx-auto my-2 " />
          <PrimaryButton
            styles="border px-2 py-1 mt-2 mx-auto block w-full"
            btnName={"Visualize Tree"}
            handleClick={handleClick}
          />
        </div>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow />
        </div>
      </div>
    </>
  );
};

export default JsonInput;
