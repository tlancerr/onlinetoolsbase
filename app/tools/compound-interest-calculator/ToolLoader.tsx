"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("yearly");
  const [result, setResult] = useState<string | null>(null);

  function calculateCompoundInterest() {
    if (!principal || !rate || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    let n = 1;
    if (frequency === "yearly") n = 1;
    if (frequency === "semiannual") n = 2;
    if (frequency === "quarterly") n = 4;
    if (frequency === "monthly") n = 12;
    if (frequency === "daily") n = 365;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    setResult(
      `Final Amount: ${A.toFixed(2)}
Total Interest Earned: ${interest.toFixed(2)}`
    );
  }

  return (
    
      <div className="space-y-4">
        <div>
          <label className="tool-label">Initial Principal Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 10000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Annual Interest Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 8"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Time Period (years)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 10"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Compounding Frequency</label>
          <select
            className="tool-input"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="yearly">Yearly</option>
            <option value="semiannual">Semi-Annual (2× per year)</option>
            <option value="quarterly">Quarterly (4× per year)</option>
            <option value="monthly">Monthly (12× per year)</option>
            <option value="daily">Daily (365× per year)</option>
          </select>
        </div>

        <button onClick={calculateCompoundInterest} className="btn-primary">
          Calculate
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}
      </div>
    
  );
}
