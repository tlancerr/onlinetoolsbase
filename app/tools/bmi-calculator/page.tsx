"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  function calculateBMI() {
    if (!height || !weight) {
      setResult("Please enter both height and weight.");
      setCategory(null);
      return;
    }

    const h = parseFloat(height) / 100; // convert cm → meters
    const w = parseFloat(weight);

    const bmi = w / (h * h);
    const bmiRounded = bmi.toFixed(1);

    let cat = "";

    if (bmi < 18.5) cat = "Underweight";
    else if (bmi >= 18.5 && bmi < 25) cat = "Normal Weight";
    else if (bmi >= 25 && bmi < 30) cat = "Overweight";
    else cat = "Obese";

    setResult(`Your BMI is ${bmiRounded}`);
    setCategory(cat);
  }

  return (
    
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
          <label className="tool-label">Weight (kg)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button onClick={calculateBMI} className="btn-primary">
          Calculate BMI
        </button>

        {result && (
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
            {category && (
              <div className="mt-1 text-slate-300">
                Category: <span className="text-emerald-300">{category}</span>
              </div>
            )}
          </div>
        )}
      </div>
    
  );
}
