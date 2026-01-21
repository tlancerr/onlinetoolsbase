"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateDueDate() {
    if (!lmp) {
      setResult("Please select the first day of your last menstrual period (LMP).");
      return;
    }

    const start = new Date(lmp);
    const dueDate = new Date(start);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks

    // Calculate pregnancy week
    const today = new Date();
    const diffMs = today.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(totalDays / 7);

    // Trimester
    let trimester = "";
    if (currentWeek < 13) trimester = "1st Trimester";
    else if (currentWeek < 27) trimester = "2nd Trimester";
    else trimester = "3rd Trimester";

    // Conception estimate = LMP + 14 days
    const conception = new Date(start);
    conception.setDate(conception.getDate() + 14);

    setResult(
      `Estimated Due Date: ${dueDate.toDateString()}
      
Current Pregnancy: Week ${currentWeek}
Trimester: ${trimester}

Estimated Conception Date: ${conception.toDateString()}`
    );
  }

  return (
    <ToolLayout
      title="Pregnancy Due Date Calculator"
      description="Calculate your baby's estimated due date, current pregnancy week, trimester, and estimated conception date."
      category="Health and Fitness Tools"
    >
      <div className="space-y-4">
        
        <div>
          <label className="tool-label">Last Menstrual Period (LMP)</label>
          <input
            type="date"
            className="tool-input"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
          />
        </div>

        <button onClick={calculateDueDate} className="btn-primary">
          Calculate Due Date
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
