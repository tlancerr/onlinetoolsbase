"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [futureDate, setFutureDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (!futureDate) {
      setResult("Please select a future date.");
      return;
    }

    const today = new Date();
    const target = new Date(futureDate);

    if (target < today) {
      setResult("The selected date must be in the future.");
      return;
    }

    const diffMs = target.getTime() - today.getTime();
    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const approxMonths =
      (target.getFullYear() - today.getFullYear()) * 12 +
      (target.getMonth() - today.getMonth());

    setResult(
      `Days Until: ${totalDays} days\n` +
      `Weeks Until: ${totalWeeks} weeks\n` +
      `Approx. Months Until: ${approxMonths} months`
    );
  }

  return (
    
      <div className="space-y-4">

        <div>
          <label className="tool-label">Select Future Date</label>
          <input
            type="date"
            className="tool-input"
            value={futureDate}
            onChange={(e) => setFutureDate(e.target.value)}
          />
        </div>

        <button onClick={calculate} className="btn-primary">
          Calculate
        </button>

        {result && (
          <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>

  );
}
