"use client";

import { useState } from "react";

export default function AgeDifferenceClient() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateDifference() {
    if (!date1 || !date2) {
      setResult("Please select both dates.");
      return;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (d1 > d2) {
      setResult("First date cannot be after second date.");
      return;
    }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult(`Difference: ${years} years, ${months} months, and ${days} days`);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">First Date</label>
        <input
          type="date"
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
          className="tool-input"
        />
      </div>

      <div>
        <label className="tool-label">Second Date</label>
        <input
          type="date"
          value={date2}
          onChange={(e) => setDate2(e.target.value)}
          className="tool-input"
        />
      </div>

      <button onClick={calculateDifference} className="btn-primary">
        Calculate Difference
      </button>

      {result && (
        <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
          {result}
        </div>
      )}
    </div>
  );
}
