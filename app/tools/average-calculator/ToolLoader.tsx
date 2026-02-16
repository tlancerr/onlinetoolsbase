"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateAverage() {
    if (!numbers.trim()) return setResult("Please enter some numbers.");

    const nums = numbers
      .split(/[\s,]+/)
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (nums.length === 0) return setResult("Invalid input.");

    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;

    setResult(`Average: ${avg.toFixed(2)} (from ${nums.length} numbers)`);
  }

  return (
   
      <div className="space-y-4">

        <textarea
          className="tool-input h-28"
          placeholder="Enter numbers separated by spaces or commas"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />

        <button className="btn-primary" onClick={calculateAverage}>
          Calculate Average
        </button>

        {result && (
          <div className="mt-4 text-emerald-300">{result}</div>
        )}
      </div>
    
  );
}
