import React, { useState } from "react";
import { BsClipboard2Fill } from "react-icons/bs";
import { LuCopyCheck } from "react-icons/lu";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Paste your JSON here...",
  rows = 4,
  maxLength,
  className = "",
  required = false,
  disabled = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`flex flex-col relative ${className}`}>
       <button
        type="button"
        onClick={handleCopy}
        disabled={!value}
        className={`absolute top-2 right-3 text-xs px-2 py-1 rounded-md border ${
          copied
            ? "bg-gray-500 text-white border-gray-300"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
        } transition-all duration-200`}
      >
        {copied ? <LuCopyCheck />  : <BsClipboard2Fill title="copy to clipboard"/>}
      </button>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-2 dark:text-white"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full h-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono text-sm ${
          disabled
            ? "bg-gray-100 cursor-not-allowed dark:text-white dark:bg-gray-900"
            : "bg-gray-50 dark:text-white dark:bg-gray-900"
        }`}
      />
    </div>
  );
};

export default TextArea;
