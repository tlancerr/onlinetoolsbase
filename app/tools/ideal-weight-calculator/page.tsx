"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<string | null>(null);

  function calculateIdealWeight() {
    if (!height) {
      setResult("Please enter your height.");
      return;
    }

    const h = parseFloat(height);

    let devine = 0;
    let robinson = 0;
    let miller = 0;
    let hamwi = 0;

    if (gender === "male") {
      devine = 50 + 2.3 * ((h / 2.54) - 60);
      robinson = 52 + 1.9 * ((h / 2.54) - 60);
      miller = 56.2 + 1.41 * ((h / 2.54) - 60);
      hamwi = 48 + 2.7 * ((h / 2.54) - 60);
    } else {
      devine = 45.5 + 2.3 * ((h / 2.54) - 60);
      robinson = 49 + 1.7 * ((h / 2.54) - 60);
      miller = 53.1 + 1.36 * ((h / 2.54) - 60);
      hamwi = 45.5 + 2.2 * ((h / 2.54) - 60);
    }

    setResult(
      `Ideal Weight (based on different formulas):
      
Devine Formula: ${devine.toFixed(1)} kg
Robinson Formula: ${robinson.toFixed(1)} kg
Miller Formula: ${miller.toFixed(1)} kg
Hamwi Formula: ${hamwi.toFixed(1)} kg`
    );
  }

  return (
    <ToolLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight using scientifically recognized formulas such as Devine, Robinson, Miller, and Hamwi."
      category="Health and Fitness Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Height (cm)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
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

        <button onClick={calculateIdealWeight} className="btn-primary">
          Calculate Ideal Weight
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
