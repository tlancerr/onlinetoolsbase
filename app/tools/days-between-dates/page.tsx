"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function DaysBetweenDates() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateDays() {
    if (!startDate || !endDate) {
      setResult("Please select both dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setResult("Start date cannot be after the end date.");
      return;
    }

    const diffMs = end.getTime() - start.getTime();
    
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                         (end.getMonth() - start.getMonth());

    setResult(
      `Total Days: ${totalDays} days\n` +
      `Total Weeks: ${totalWeeks} weeks\n` +
      `Approximate Months: ${totalMonths} months`
    );
  }

  return (
    <ToolLayout
      title="Days Between Dates Calculator"
      description="Calculate the total number of days, weeks, and months between two dates."
      category="Time and Age Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Start Date</label>
          <input
            type="date"
            className="tool-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">End Date</label>
          <input
            type="date"
            className="tool-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button onClick={calculateDays} className="btn-primary">
          Calculate
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
