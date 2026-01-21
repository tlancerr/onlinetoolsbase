"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function BMRCalculator() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<string | null>(null);

  function calculateBMR() {
    if (!age || !height || !weight) {
      setResult("Please fill all fields.");
      return;
    }

    const a = parseInt(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);

    let BMR = 0;

    // Mifflin–St Jeor Equation
    if (gender === "male") {
      BMR = 88.36 + (13.4 * w) + (4.8 * h) - (5.7 * a);
    } else {
      BMR = 447.6 + (9.2 * w) + (3.1 * h) - (4.3 * a);
    }

    setResult(`Your Basal Metabolic Rate (BMR) is ${Math.round(BMR)} calories/day.`);
  }

  return (
    <ToolLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) to know how many calories your body burns at rest."
      category="Health and Fitness Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Age (years)</label>
          <input
            type="number"
            className="tool-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Height (cm)</label>
          <input
            type="number"
            className="tool-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Weight (kg)</label>
          <input
            type="number"
            className="tool-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Gender</label>
          <select
            className="tool-input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button onClick={calculateBMR} className="btn-primary">
          Calculate BMR
        </button>

        {result && (
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
