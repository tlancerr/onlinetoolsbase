"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function PastDateCalculator() {
  const [days, setDays] = useState("");
  const [weeks, setWeeks] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculatePastDate() {
    const today = new Date();
    const past = new Date(today);

    const d = parseInt(days || "0");
    const w = parseInt(weeks || "0");
    const m = parseInt(months || "0");
    const y = parseInt(years || "0");

    if (d === 0 && w === 0 && m === 0 && y === 0) {
      setResult("Please enter at least one value.");
      return;
    }

    past.setDate(past.getDate() - (d + w * 7));
    past.setMonth(past.getMonth() - m);
    past.setFullYear(past.getFullYear() - y);

    setResult(`Past Date: ${past.toDateString()}`);
  }

  return (
    <ToolLayout
      title="Past Date Calculator"
      description="Find the exact date in the past by subtracting days, weeks, months, or years from today."
      category="Time & Age Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Subtract Days</label>
          <input
            type="number"
            className="tool-input"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Subtract Weeks</label>
          <input
            type="number"
            className="tool-input"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Subtract Months</label>
          <input
            type="number"
            className="tool-input"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Subtract Years</label>
          <input
            type="number"
            className="tool-input"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculatePastDate} className="btn-primary">
          Calculate Past Date
        </button>

        {result && (
          <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
