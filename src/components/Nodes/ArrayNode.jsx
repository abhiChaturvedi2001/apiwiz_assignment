import { Handle, Position } from "@xyflow/react";
import { BsCopy } from "react-icons/bs";
import { CgBrackets } from "react-icons/cg";

const ArrayNode = ({ data }) => {
  const isHighlighted = data.isHighlighted;

  const copyPath = () => {
    navigator.clipboard.writeText(data.path);
  };

  return (
    <div
      className={`group relative px-4 py-3 rounded-lg border-2 transition-all duration-200 min-w-[180px] cursor-pointer ${
        isHighlighted
          ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
          : "border-green-400 bg-green-50 hover:shadow-md hover:scale-102"
      }`}
      onClick={copyPath}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 !bg-green-500 border-2 border-white"
      />

      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded bg-green-100">
          <CgBrackets className="w-4 h-4 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-800 flex items-center gap-2 truncate">
            {data.label}
            <BsCopy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
          </div>
          <div className="text-xs text-green-600 font-medium mt-0.5">Array</div>
          <div className="text-xs text-gray-500 mt-0.5 font-mono truncate">
            {data.path}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 !bg-green-500 border-2 border-white"
      />
    </div>
  );
};

export default ArrayNode;
