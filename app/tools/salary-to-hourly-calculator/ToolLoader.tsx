"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("year");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<string | null>(null);

  function calculateHourly() {
    if (!salary || !hoursPerWeek || !weeksPerYear) {
      setResult("Please fill all fields.");
      return;
    }

    const s = parseFloat(salary);
    const hpw = parseFloat(hoursPerWeek);
    const wpy = parseFloat(weeksPerYear);

    let annualSalary = 0;

    if (period === "year") annualSalary = s;
    if (period === "month") annualSalary = s * 12;
    if (period === "week") annualSalary = s * wpy;
    if (period === "day") annualSalary = s * wpy * 5; // assuming 5-day weeks

    const totalHours = hpw * wpy;
    const hourlyRate = annualSalary / totalHours;

    setResult(
      `Estimated Hourly Rate: $${hourlyRate.toFixed(2)}

Annual Salary: $${annualSalary.toFixed(2)}
Monthly Salary: $${(annualSalary / 12).toFixed(2)}
Weekly Salary: $${(annualSalary / wpy).toFixed(2)}`
    );
  }

  return (
   
      <div className="space-y-4">

        {/* Salary input */}
        <div>
          <label className="tool-label">Salary Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 50000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        {/* Salary Period */}
        <div>
          <label className="tool-label">Salary Period</label>
          <select
            className="tool-input"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="year">Per Year</option>
            <option value="month">Per Month</option>
            <option value="week">Per Week</option>
            <option value="day">Per Day (5-day week)</option>
          </select>
        </div>

        {/* Hours per week */}
        <div>
          <label className="tool-label">Hours Worked Per Week</label>
          <input
            type="number"
            className="tool-input"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
          />
        </div>

        {/* Weeks per year */}
        <div>
          <label className="tool-label">Weeks Worked Per Year</label>
          <input
            type="number"
            className="tool-input"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(e.target.value)}
          />
        </div>

        {/* Button */}
        <button onClick={calculateHourly} className="btn-primary">
          Convert Salary
        </button>

        {/* Result */}
        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-emerald-300 text-sm">
            {result}
          </pre>
        )}

      </div>
    
  );
}
