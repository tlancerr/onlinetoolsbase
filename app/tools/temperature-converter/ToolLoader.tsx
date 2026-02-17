"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [result, setResult] = useState("");

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) return setResult("Enter a valid temperature.");

    let C = 0;

    if (unit === "celsius") C = v;
    if (unit === "fahrenheit") C = (v - 32) * (5 / 9);
    if (unit === "kelvin") C = v - 273.15;

    const conversions = {
      Celsius: C,
      Fahrenheit: (C * 9) / 5 + 32,
      Kelvin: C + 273.15,
    };

    let output = "";
    for (const key of Object.keys(conversions) as (keyof typeof conversions)[]) {
  output += `${key}: ${conversions[key].toFixed(4)}\n`;
}


    setResult(output);
  }

  return (
    
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter temperature"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <select
          className="tool-input"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="celsius">Celsius (°C)</option>
          <option value="fahrenheit">Fahrenheit (°F)</option>
          <option value="kelvin">Kelvin (K)</option>
        </select>

        <button className="btn-primary" onClick={convert}>
          Convert Temperature
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap text-emerald-300 bg-slate-900 border border-slate-700 rounded-lg p-3">
            {result}
          </pre>
        )}
      </div>
    
  );
}
