"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("sqm");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid area value.");

    const toSqM: any = {
      sqm: v,
      sqft: v / 10.7639,
      acre: v * 4046.856,
      hectare: v * 10000,
      sqkm: v * 1_000_000,
    };

    const sqM = toSqM[unit];

    const conversions = {
      "Square meters (m²)": sqM,
      "Square feet (ft²)": sqM * 10.7639,
      "Acres": sqM / 4046.856,
      "Hectares": sqM / 10000,
      "Square kilometers (km²)": sqM / 1_000_000,
    };

    let output = "";
    for (const x of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${x}: ${conversions[x].toFixed(6)}\n`;
}


    setResult(output);
  }

  return (
   
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter area value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <select
          className="tool-input"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="sqm">Square meters (m²)</option>
          <option value="sqft">Square feet (ft²)</option>
          <option value="acre">Acres</option>
          <option value="hectare">Hectares</option>
          <option value="sqkm">Square kilometers (km²)</option>
        </select>

        <button className="btn-primary" onClick={convert}>Convert</button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap bg-slate-900 text-emerald-300 p-3 rounded-lg border border-slate-700">
            {result}
          </pre>
        )}
      </div>
    
  );
}
