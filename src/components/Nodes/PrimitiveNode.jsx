import { Handle, Position } from "@xyflow/react";
import toast from "react-hot-toast";
import { BsCopy, BsHash } from "react-icons/bs";

const PrimitiveNode = ({ data }) => {
  const isHighlighted = data.isHighlighted;

  const copyPath = () => {
    navigator.clipboard.writeText(data.path);
    toast.success("Path copied to clipboard!");
  };
  return (
    <div
      className={`group relative px-5 py-4 rounded-xl border-2 transition-all duration-300 min-w-[160px] cursor-pointer ${
        isHighlighted
          ? "border-node-highlight bg-node-highlight-light shadow-xl shadow-node-highlight/50 scale-110"
          : "border-node-primitive bg-node-primitive-light hover:shadow-xl hover:scale-105 hover:border-node-primitive/80"
      }`}
      onClick={copyPath}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-node-primitive border-2 border-white transition-all hover:scale-150"
      />

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-node-primitive/10">
          <BsHash className="w-5 h-5 text-node-primitive" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-foreground flex items-center gap-2 truncate">
            {data.label}
            <BsCopy className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity flex-shrink-0" />
          </div>
          <div className="text-xs text-node-primitive font-semibold mt-1 truncate">
            {String(data.value)}
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-mono truncate">
            {data.path}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimitiveNode;
