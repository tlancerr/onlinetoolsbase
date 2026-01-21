"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function LengthConverter() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("meters");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid number.");

    // Convert to meters first
    const toMeters: any = {
      meters: v,
      kilometers: v * 1000,
      centimeters: v / 100,
      millimeters: v / 1000,
      miles: v * 1609.344,
      feet: v * 0.3048,
      inches: v * 0.0254,
    };

    const m = toMeters[unit];

    const conversions = {
      Meters: m,
      Kilometers: m / 1000,
      Centimeters: m * 100,
      Millimeters: m * 1000,
      Miles: m / 1609.344,
      Feet: m / 0.3048,
      Inches: m / 0.0254,
    };

    let output = "";
    for (const key of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${key}: ${conversions[key].toFixed(5)}\n`;
}


    setResult(output);
  }

  return (
    <ToolLayout
      title="Length Converter"
      description="Convert between meters, kilometers, miles, feet, inches, and more."
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
          <option value="meters">Meters</option>
          <option value="kilometers">Kilometers</option>
          <option value="centimeters">Centimeters</option>
          <option value="millimeters">Millimeters</option>
          <option value="miles">Miles</option>
          <option value="feet">Feet</option>
          <option value="inches">Inches</option>
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
