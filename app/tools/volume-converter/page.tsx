"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function VolumeConverter() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("liters");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid volume.");

    const toLiters: any = {
      liters: v,
      ml: v / 1000,
      gallons: v * 3.78541,
      cubicm: v * 1000,
    };

    const liters = toLiters[unit];

    const conversions = {
      "Liters": liters,
      "Milliliters (ml)": liters * 1000,
      "Gallons (US)": liters / 3.78541,
      "Cubic meters (m³)": liters / 1000,
    };

    let output = "";
    for (const x of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${x}: ${conversions[x].toFixed(4)}\n`;
}


    setResult(output);
  }

  return (
    <ToolLayout
      title="Volume Converter"
      description="Convert between liters, milliliters, gallons, and cubic meters."
      category="Converter Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter volume"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <select
          className="tool-input"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="liters">Liters</option>
          <option value="ml">Milliliters (ml)</option>
          <option value="gallons">Gallons (US)</option>
          <option value="cubicm">Cubic meters (m³)</option>
        </select>

        <button className="btn-primary" onClick={convert}>Convert</button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-700">
            {result}
          </pre>
        )}
      </div>
    </ToolLayout>
  );
}
