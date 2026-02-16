"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [gender, setGender] = useState("male");

  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");

  const [result, setResult] = useState<string | null>(null);

  function calculateBodyFat() {
    if (!height || !neck || !waist || (gender === "female" && !hips)) {
      setResult("Please fill all required fields.");
      return;
    }

    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hips);

    let bodyFat = 0;

    if (gender === "male") {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 * Math.log10(w - n) +
            0.15456 * Math.log10(h)) -
        450;
    } else {
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(w + hp - n) +
            0.221 * Math.log10(h)) -
        450;
    }

    setResult(`Estimated Body Fat: ${bodyFat.toFixed(1)}%`);
  }

  return (
    
      <div className="space-y-4">

        {/* Gender */}
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

        {/* Height */}
        <div>
          <label className="tool-label">Height (cm)</label>
          <input
            type="number"
            className="tool-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        {/* Neck */}
        <div>
          <label className="tool-label">Neck circumference (cm)</label>
          <input
            type="number"
            className="tool-input"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </div>

        {/* Waist */}
        <div>
          <label className="tool-label">Waist circumference (cm)</label>
          <input
            type="number"
            className="tool-input"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>

        {/* Hips (only for women) */}
        {gender === "female" && (
          <div>
            <label className="tool-label">Hip circumference (cm)</label>
            <input
              type="number"
              className="tool-input"
              value={hips}
              onChange={(e) => setHips(e.target.value)}
            />
          </div>
        )}

        {/* Button */}
        <button onClick={calculateBodyFat} className="btn-primary">
          Calculate Body Fat
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </div>
        )}
      </div>
  
  );
}
