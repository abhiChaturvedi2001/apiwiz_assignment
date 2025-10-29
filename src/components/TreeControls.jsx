import { useReactFlow } from "@xyflow/react";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { MdOutlineFullscreen } from "react-icons/md";

const TreeControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-4 left-4 flex gap-2 z-10">
      <button
        onClick={() => zoomIn()}
        className="bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <AiOutlineZoomIn className="w-4 h-4" />
        <span className="hidden sm:inline">Zoom In</span>
      </button>
      <button
        onClick={() => zoomOut()}
        className="bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <AiOutlineZoomOut className="w-4 h-4" />
        <span className="hidden sm:inline">Zoom Out</span>
      </button>
      <button
        onClick={() => fitView({ padding: 0.2, duration: 800 })}
        className="bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <MdOutlineFullscreen className="w-4 h-4" />
        <span className="hidden sm:inline">Fit View</span>
      </button>
    </div>
  );
};

export default TreeControls;
