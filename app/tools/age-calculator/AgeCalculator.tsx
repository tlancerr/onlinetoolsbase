"use client";

import { useState } from "react";

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateAge() {
    if (!birthdate) return setResult("Please select your birthdate.");

    const birth = new Date(birthdate);
    const today = new Date();

    if (birth > today) {
      setResult("Birthdate cannot be in the future.");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult(`You are ${years} years, ${months} months, and ${days} days old.`);
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

      <button onClick={calculateAge} className="btn-primary">Calculate Age</button>

      {result && (
        <div className="mt-3 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
          {result}
        </div>
      )}
    </div>
  );
}
