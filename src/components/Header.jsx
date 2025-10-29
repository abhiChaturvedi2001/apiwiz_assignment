import React from "react";
import { BsMoonFill } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { useTheme } from "./theme-provider";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex items-center gap-3">
        <VscJson className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
        <div>
          <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
            JSON Tree Visualizer
          </h5>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Interactive hierarchical JSON visualization
          </p>
        </div>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        title="Toggle Dark Mode"
      >
        <BsMoonFill
          className={`w-5 h-5 ${
            theme === "dark" ? "text-yellow-400" : "text-gray-700"
          }`}
        />
      </button>
    </header>
  );
};

export default Header;
