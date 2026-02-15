"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function ToolLoader() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (!birthdate) {
      setResult("Please select your birthdate.");
      return;
    }

    const birth = new Date(birthdate);
    const today = new Date();

    if (birth > today) {
      setResult("Birthdate cannot be in the future.");
      return;
    }

    const diff = today.getTime() - birth.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    const months =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());

    setResult(
      `You are ${weeks} weeks, ${months} months, and ${days} days old.`
    );
  }

  return (
    
      <div className="space-y-4">
        <div>
          <label className="tool-label">Birthdate</label>
          <input
            type="date"
            className="tool-input"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <button onClick={calculate} className="btn-primary">
          Calculate
        </button>

        {result && (
          <div className="mt-3 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
    
  );
}
