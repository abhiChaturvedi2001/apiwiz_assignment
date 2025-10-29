import React from "react";
// icons Import
import { VscJson } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
      <div className="text-center">
        <VscJson className="w-16 h-16 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Enter JSON and click "Visualize Tree"</p>
      </div>
    </div>
  );
};

export default Loading;
