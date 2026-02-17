"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [days, setDays] = useState("");
  const [weeks, setWeeks] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function convertDaysToWeeks() {
    if (!days) return setResult("Please enter number of days.");

    const d = parseInt(days);
    const w = (d / 7).toFixed(2);

    setResult(`${d} days = ${w} weeks`);
  }

  function convertWeeksToDays() {
    if (!weeks) return setResult("Please enter number of weeks.");

    const w = parseFloat(weeks);
    const d = Math.round(w * 7);

    setResult(`${w} weeks = ${d} days`);
  }

  function calculateWeeksBetweenDates() {
    if (!startDate || !endDate) {
      return setResult("Please select both dates.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return setResult("Start date cannot be after end date.");
    }

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = (totalDays / 7).toFixed(2);

    setResult(
      `${totalWeeks} weeks (${totalDays} days) between the selected dates.`
    );
  }

  return (
    
      <div className="space-y-6">

        {/* Days → Weeks */}
        <div className="tool-card">
          <h3 className="text-sm font-semibold mb-2 text-slate-50">Convert Days to Weeks</h3>

          <input
            type="number"
            className="tool-input mb-3"
            placeholder="Enter days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <button onClick={convertDaysToWeeks} className="btn-primary">
            Convert
          </button>
        </div>

        {/* Weeks → Days */}
        <div className="tool-card">
          <h3 className="text-sm font-semibold mb-2 text-slate-50">Convert Weeks to Days</h3>

          <input
            type="number"
            className="tool-input mb-3"
            placeholder="Enter weeks"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
          />

          <button onClick={convertWeeksToDays} className="btn-primary">
            Convert
          </button>
        </div>

        {/* Weeks Between Dates */}
        <div className="tool-card">
          <h3 className="text-sm font-semibold mb-2 text-slate-50">
            Weeks Between Two Dates
          </h3>

          <label className="tool-label">Start Date</label>
          <input
            type="date"
            className="tool-input mb-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="tool-label">End Date</label>
          <input
            type="date"
            className="tool-input mb-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={calculateWeeksBetweenDates} className="btn-primary">
            Calculate
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
   
  );
}
