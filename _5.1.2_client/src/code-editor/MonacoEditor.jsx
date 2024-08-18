import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const MonacoCodeEditor = () => {
  const [code, setCode] = useState("// Write your code here in Javascript");
  const [output, setOutput] = useState("");

  // Function to execute the code and capture the output
  const runCode = () => {
    // Create a variable to capture logs
    let logs = "";

    // Override console.log to capture logs in the logs variable
    const customConsole = {
      log: (...args) => {
        logs += args.join(" ") + "\n";
      },
    };

    try {
      // Use new Function to create a safe environment for code execution
      const result = func(customConsole);
      logs += result !== undefined ? result.toString() : "";
      setOutput(logs);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "600px",
        width: "80%",
        margin: "auto",
      }}
    >
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={runCode}
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Run Code
      </button>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          minHeight: "100px",
        }}
      >
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default MonacoCodeEditor;
