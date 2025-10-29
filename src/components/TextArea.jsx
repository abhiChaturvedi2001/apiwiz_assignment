import React from "react";

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
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-2"
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
        className={`w-full h-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono text-sm ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"
        }`}
      />
    </div>
  );
};

export default TextArea;
