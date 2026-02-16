"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState("decimal");
  const [result, setResult] = useState("");

  function convert() {
    try {
      let decimal = 0;

      if (fromBase === "decimal") decimal = parseInt(input, 10);
      if (fromBase === "binary") decimal = parseInt(input, 2);
      if (fromBase === "hex") decimal = parseInt(input, 16);

      const binary = decimal.toString(2);
      const hex = decimal.toString(16).toUpperCase();

      setResult(`Decimal: ${decimal}
Binary: ${binary}
Hexadecimal: ${hex}`);
    } catch {
      setResult("Invalid input.");
    }
  }

  return (
   
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter number"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <select
          className="tool-input"
          value={fromBase}
          onChange={e => setFromBase(e.target.value)}
        >
          <option value="decimal">Decimal</option>
          <option value="binary">Binary</option>
          <option value="hex">Hexadecimal</option>
        </select>

        <button className="btn-primary" onClick={convert}>
          Convert
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap text-emerald-300 text-sm bg-slate-900 border border-slate-700 rounded-lg p-3">
            {result}
          </pre>
        )}
      </div>
    
  );
}
