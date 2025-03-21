"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Copy, Check } from "lucide-react";
import { TestCase } from "@/data/quizzes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
  testCases?: TestCase[];
}

export function CodeEditor({
  value = "",
  onChange,
  language = "javascript",
  height = "300px",
  readOnly = false,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // In the future or in the next update, this would use a proper code editor like Monaco or CodeMirror
  // For this starter, we're using a styled textarea

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(value || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
      setError("Failed to copy code to clipboard");
    }
  };

  const runCode = () => {
    try {
      // Reset previous output and errors
      setOutput(null);
      setError(null);

      // This is first feature - in the next update, you'd use a sandboxed environment
      // or send the code to a backend for execution
      const codeToRun = value || "";

      const result = new Function(`
        try {
          ${codeToRun}
          // For demonstration, we'll assume the last function is the one to test
          if (typeof sum === 'function') {
            return "Result: " + sum(5, 10);
          } else if (typeof isPalindrome === 'function') {
            return "Result: " + isPalindrome("racecar");
          }
          return "Code executed successfully";
        } catch (error) {
          return "Error: " + error.message;
        }
      `)();

      setOutput(result);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange && typeof onChange === "function") {
      onChange(newValue);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex justify-between items-center border-b">
        <div className="text-sm font-medium">{language}</div>
        <div className="flex gap-2">
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={runCode}
              className="h-8 px-2 text-xs"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              Run
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="relative" style={{ height }}>
        <textarea
          value={value || ""}
          onChange={handleChange}
          className="font-mono text-sm p-4 w-full h-full resize-none focus:outline-none bg-black text-white dark:bg-black dark:text-white"
          style={{
            tabSize: 2,
            caretColor: "white",
          }}
          readOnly={readOnly}
          spellCheck="false"
        />
      </div>
      {error && (
        <div className="p-3 border-t bg-red-50 dark:bg-red-950/20">
          <div className="text-xs font-medium mb-1 text-red-600">Error:</div>
          <div className="p-2 bg-black text-white rounded text-sm font-mono overflow-auto max-h-[100px]">
            {error}
          </div>
        </div>
      )}
      {output && (
        <div className="p-3 border-t bg-muted/50">
          <div className="text-xs font-medium mb-1">Output:</div>
          <div className="p-2 bg-black text-white rounded text-sm font-mono overflow-auto max-h-[100px]">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
