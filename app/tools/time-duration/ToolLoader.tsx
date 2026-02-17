"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (!start || !end) {
      setResult("Please select both start and end date/time.");
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate > endDate) {
      setResult("Start date/time cannot be after end date/time.");
      return;
    }

    let diff = endDate.getTime() - startDate.getTime();

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    setResult(
      `Duration: ${days} days, ${hours} hours, and ${minutes} minutes\n` +
      `Total Hours: ${totalHours} hours\n` +
      `Total Minutes: ${totalMinutes} minutes`
    );
  }

  return (
   
      <div className="space-y-4">

        <div>
          <label className="tool-label">Start Date & Time</label>
          <input
            type="datetime-local"
            className="tool-input"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">End Date & Time</label>
          <input
            type="datetime-local"
            className="tool-input"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button onClick={calculate} className="btn-primary">
          Calculate Duration
        </button>

        {result && (
          <div className="mt-4 whitespace-pre-line rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
  );
}
