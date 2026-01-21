"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateRate() {
    if (!principal || !finalAmount || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(principal);
    const A = parseFloat(finalAmount);
    const T = parseFloat(years);

    if (A < P) {
      setResult("Final amount cannot be less than principal.");
      return;
    }

    const interest = A - P;
    const rate = (interest * 100) / (P * T);

    const monthlyRate = rate / 12;
    const dailyRate = rate / 365;

    setResult(
      `Estimated Interest Rate: ${rate.toFixed(2)}%
      
Total Interest: ${interest.toFixed(2)}
Annual Rate: ${rate.toFixed(2)}%
Monthly Rate: ${monthlyRate.toFixed(4)}%
Daily Rate: ${dailyRate.toFixed(6)}%`
    );
  }

  return (
    <ToolLayout
      title="Interest Rate Calculator"
      description="Calculate the interest rate based on principal, final amount, and time period."
      category="Finance Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Principal Amount</label>
          <input
            type="number"
            className="tool-input"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Final Amount</label>
          <input
            type="number"
            className="tool-input"
            value={finalAmount}
            onChange={(e) => setFinalAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Time (years)</label>
          <input
            type="number"
            className="tool-input"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateRate} className="btn-primary">
          Calculate Interest Rate
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}
      </div>
    </ToolLayout>
  );
}
