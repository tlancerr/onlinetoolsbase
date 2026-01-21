"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateSIP() {
    if (!monthly || !rate || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(monthly);
    const annualRate = parseFloat(rate) / 100;
    const r = annualRate / 12; // monthly rate
    const n = parseInt(years) * 12; // total months

    const FV = P * ((Math.pow(1 + r, n) - 1) * (1 + r)) / r;
    const invested = P * n;
    const gain = FV - invested;

    setResult(
      `Final Maturity Amount: ₹${FV.toFixed(2)}
Total Invested: ₹${invested.toFixed(2)}
Total Gain: ₹${gain.toFixed(2)}`
    );
  }

  return (
    <ToolLayout
      title="SIP Calculator"
      description="Calculate SIP maturity amount, total invested amount, and total gains based on expected annual return."
      category="Finance Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Monthly Investment (₹)</label>
          <input
            type="number"
            className="tool-input"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Expected Return Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Duration (years)</label>
          <input
            type="number"
            className="tool-input"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateSIP} className="btn-primary">
          Calculate SIP Returns
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
