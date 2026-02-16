"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [lmp, setLmp] = useState("");
  const [cycle, setCycle] = useState("28");
  const [result, setResult] = useState<string | null>(null);

  function calculateOvulation() {
    if (!lmp || !cycle) {
      setResult("Please enter last period date and cycle length.");
      return;
    }

    const cycleLength = parseInt(cycle);
    const start = new Date(lmp);

    // Ovulation = LMP + (cycleLength - 14)
    const ovulation = new Date(start);
    ovulation.setDate(ovulation.getDate() + (cycleLength - 14));

    // Fertile window = ovulation day - 5 days
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Next period = LMP + cycle length
    const nextPeriod = new Date(start);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    setResult(
      `Estimated Ovulation Day: ${ovulation.toDateString()}
Fertile Window: ${fertileStart.toDateString()} ➝ ${fertileEnd.toDateString()}
Next Expected Period: ${nextPeriod.toDateString()}`
    );
  }

  return (
    
      <div className="space-y-4">

        {/* LMP */}
        <div>
          <label className="tool-label">Last Menstrual Period (LMP)</label>
          <input
            type="date"
            className="tool-input"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
          />
        </div>

        {/* Cycle Length */}
        <div>
          <label className="tool-label">Cycle Length (days)</label>
          <input
            type="number"
            className="tool-input"
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            min={21}
            max={40}
          />
        </div>

        {/* Button */}
        <button onClick={calculateOvulation} className="btn-primary">
          Calculate Ovulation
        </button>

        {/* Result */}
        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}
      </div>
    
  );
}
