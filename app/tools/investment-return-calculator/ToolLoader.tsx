"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [initial, setInitial] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateROI() {
    if (!initial || !finalValue || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(initial);
    const F = parseFloat(finalValue);
    const T = parseFloat(years);

    const profit = F - P;
    const roiPercent = (profit / P) * 100;

    // Annualized ROI (CAGR)
    const cagr = (Math.pow(F / P, 1 / T) - 1) * 100;

    setResult(
      `Total Profit: ${profit.toFixed(2)}
ROI Percentage: ${roiPercent.toFixed(2)}%

Annualized Return (CAGR): ${cagr.toFixed(2)}%`
    );
  }

  return (
    
      <div className="space-y-4">

        <div>
          <label className="tool-label">Initial Investment Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 10000"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Final Investment Value</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 15000"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Time Period (years)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 3"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateROI} className="btn-primary">
          Calculate ROI
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}

      </div>
 
  );
}
