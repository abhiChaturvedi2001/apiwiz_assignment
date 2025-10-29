import { toggleTheme } from "@/Slice/themeSlice";
import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "./PrimaryButton";

const Header = ({ onExport }) => {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme.themeToggle);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex items-center gap-3">
        <VscJson className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
        <div>
          <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
            JSON Tree Visualizer
          </h5>
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:block hidden ">
            Interactive hierarchical JSON visualization
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {theme === "dark" ? (
          <BsSunFill
            size={40}
            onClick={() => dispatch(toggleTheme())}
            title="Toggle Light Mode"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          />
        ) : (
          <BsMoonFill
            size={40}
            onClick={() => dispatch(toggleTheme())}
            title="Toggle Dark Mode"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          />
        )}
        <PrimaryButton
          styles="border px-2 py-1 rounded-md cursor-pointer"
          btnName={"Export PNG"}
          handleClick={onExport}
        />
      </div>
    </header>
  );
};

export default Header;
