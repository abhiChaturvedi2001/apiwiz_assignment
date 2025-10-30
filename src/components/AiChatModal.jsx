import React, { useState } from "react";
import { generateAISummary } from "@/utils/ai.service";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import toast from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AiChatModal = ({ isOpen, onClose }) => {
  const myJsonInput = useSelector((store) => store.jsonInputValue.jsonInput);
  const [prompt, setPrompt] = useState(myJsonInput);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await generateAISummary(prompt);
      setResponse(res);
    } catch (error) {
      toast.error("Error while fetching AI response");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-[90%] max-w-lg p-6 relative transition-all duration-300">
        <CgClose
          size={40}
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        />

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          💬 Chat with AI
        </h2>

        <div className="space-y-4">
          <TextArea
            rows="3"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything about your JSON..."
          />

          <PrimaryButton
            btnName={loading ? "Generating Please Wait !" : "Ask AI"}
            handleClick={handleSend}
            styles="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          />
        </div>
        {!response ? <div className="text-center my-10">
          <h4>Hi i am a JSON GPT ...</h4>
          <p>I am here to assist you ! Please Ask Anything About JSON </p>
        </div> : (
  <div className="mt-5 rounded-lg max-h-60 overflow-y-auto text-sm">
    <SyntaxHighlighter
      language="json"
      style={oneDark}
      customStyle={{
        margin: 0,
        padding: "1rem",
        backgroundColor: "transparent",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {typeof response === "string"
        ? (() => {
            try {
              return JSON.stringify(JSON.parse(response), null, 2);
            } catch {
              return response;
            }
          })()
        : JSON.stringify(response, null, 2)}
    </SyntaxHighlighter>
  </div>
)}
      </div>
    </div>
  );
};

export default AiChatModal;
