"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("kg");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid number.");

    const toKg: any = {
      kg: v,
      grams: v / 1000,
      pounds: v * 0.45359237,
      ounces: v * 0.0283495,
      stones: v * 6.35029,
    };

    const kg = toKg[unit];

    const conversions = {
      Kilograms: kg,
      Grams: kg * 1000,
      Pounds: kg / 0.45359237,
      Ounces: kg / 0.0283495,
      Stones: kg / 6.35029,
    };

    let output = "";
    for (const key of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${key}: ${conversions[key].toFixed(4)}\n`;
}


    setResult(output);
  }

  return (
    <ToolLayout
      title="Weight Converter"
      description="Convert between kilograms, pounds, grams, ounces, and stones."
      category="Converter Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <select
          className="tool-input"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="kg">Kilograms</option>
          <option value="grams">Grams</option>
          <option value="pounds">Pounds (lbs)</option>
          <option value="ounces">Ounces (oz)</option>
          <option value="stones">Stones</option>
        </select>

        <button className="btn-primary" onClick={convert}>
          Convert
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap text-emerald-300 bg-slate-900 border border-slate-700 rounded-lg p-3">
            {result}
          </pre>
        )}
      </div>
    </ToolLayout>
  );
}
