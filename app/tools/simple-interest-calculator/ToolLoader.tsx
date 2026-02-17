"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateSimpleInterest() {
    if (!principal || !rate || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(years);

    const SI = (P * R * T) / 100;
    const total = P + SI;

    setResult(
      `Simple Interest: ${SI.toFixed(2)}
Total Amount: ${total.toFixed(2)}`
    );
  }

  return (
   
      <div className="space-y-4">

        <div>
          <label className="tool-label">Principal Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 5000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Interest Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 10"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Time (years)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 3"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateSimpleInterest} className="btn-primary">
          Calculate Interest
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}

      </div>
   
  );
}
