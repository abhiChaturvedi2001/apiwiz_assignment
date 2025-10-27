import React from "react";
import { VscJson } from "react-icons/vsc";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-center my-5 space-x-3.5">
        <VscJson size={50} />
        <div>
          <h5 className="text-sm">JSON Tree Visualizer</h5>
          <p className="text-xs">
            Interactive hierarchical JSON data visualization
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
