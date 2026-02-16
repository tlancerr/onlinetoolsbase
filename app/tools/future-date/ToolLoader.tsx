"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [days, setDays] = useState("");
  const [weeks, setWeeks] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateFutureDate() {
    const today = new Date();
    const future = new Date(today);

    const d = parseInt(days || "0");
    const w = parseInt(weeks || "0");
    const m = parseInt(months || "0");
    const y = parseInt(years || "0");

    if (d === 0 && w === 0 && m === 0 && y === 0) {
      setResult("Please enter at least one value.");
      return;
    }

    future.setDate(future.getDate() + d + w * 7);
    future.setMonth(future.getMonth() + m);
    future.setFullYear(future.getFullYear() + y);

    setResult(`Future Date: ${future.toDateString()}`);
  }

  return (
    
      <div className="space-y-4">

        <div>
          <label className="tool-label">Add Days</label>
          <input
            type="number"
            className="tool-input"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Add Weeks</label>
          <input
            type="number"
            className="tool-input"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Add Months</label>
          <input
            type="number"
            className="tool-input"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Add Years</label>
          <input
            type="number"
            className="tool-input"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateFutureDate} className="btn-primary">
          Calculate Future Date
        </button>

        {result && (
          <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
    
  );
}
