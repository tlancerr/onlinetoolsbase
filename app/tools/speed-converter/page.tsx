"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function SpeedConverter() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("kmh");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid speed value.");

    const toMS: any = {
      kmh: v / 3.6,
      mph: v * 0.44704,
      ms: v,
      knots: v * 0.514444,
    };

    const ms = toMS[unit];

    const conversions = {
      "Meters / second (m/s)": ms,
      "Kilometers / hour (km/h)": ms * 3.6,
      "Miles / hour (mph)": ms / 0.44704,
      "Knots (nautical mph)": ms / 0.514444,
    };

    let output = "";
    for (const x of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${x}: ${conversions[x].toFixed(4)}\n`;
}


    setResult(output);
  }

  return (
    <ToolLayout
      title="Speed Converter"
      description="Convert between km/h, mph, m/s, and knots."
      category="Converter Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter speed"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <select
          className="tool-input"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="kmh">Kilometers/hour (km/h)</option>
          <option value="mph">Miles/hour (mph)</option>
          <option value="ms">Meters/second (m/s)</option>
          <option value="knots">Knots</option>
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
