"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function RatioCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  function simplify() {
    if (!a || !b) return setResult("Enter both numbers.");

    let x = parseFloat(a);
    let y = parseFloat(b);

    const gcd = (p: number, q: number): number =>
      q === 0 ? p : gcd(q, p % q);

    const g = gcd(x, y);

    setResult(`Simplified Ratio: ${x / g} : ${y / g}`);
  }

  return (
    <ToolLayout
      title="Ratio Calculator"
      description="Simplify and calculate ratios easily."
      category="Math Tools"
    >
      <div className="space-y-4">

        <input className="tool-input" type="number" placeholder="First number" value={a} onChange={e => setA(e.target.value)} />
        <input className="tool-input" type="number" placeholder="Second number" value={b} onChange={e => setB(e.target.value)} />

        <button className="btn-primary" onClick={simplify}>
          Simplify Ratio
        </button>

        {result && <div className="mt-4 text-emerald-300">{result}</div>}
      </div>
    </ToolLayout>
  );
}
