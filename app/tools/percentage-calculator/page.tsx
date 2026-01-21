"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function PercentageCalculator() {
  // States for 3 calculators
  const [a, setA] = useState(""); // X% of Y
  const [b, setB] = useState("");
  const [result1, setResult1] = useState("");

  const [c, setC] = useState(""); // X is what percent of Y
  const [d, setD] = useState("");
  const [result2, setResult2] = useState("");

  const [e, setE] = useState(""); // % increase/decrease
  const [f, setF] = useState("");
  const [result3, setResult3] = useState("");

  // 1. X% of Y
  function calc1() {
    if (!a || !b) return setResult1("Please enter both numbers.");
    const res = (parseFloat(a) / 100) * parseFloat(b);
    setResult1(`${a}% of ${b} = ${res.toFixed(2)}`);
  }

  // 2. X is what percent of Y
  function calc2() {
    if (!c || !d) return setResult2("Please enter both numbers.");
    const res = (parseFloat(c) / parseFloat(d)) * 100;
    setResult2(`${c} is ${res.toFixed(2)}% of ${d}`);
  }

  // 3. Percentage increase/decrease
  function calc3() {
    if (!e || !f) return setResult3("Please enter both numbers.");
    const oldVal = parseFloat(e);
    const newVal = parseFloat(f);
    const diff = newVal - oldVal;
    const percent = (diff / oldVal) * 100;
    const type = percent >= 0 ? "increase" : "decrease";

    setResult3(`Change: ${percent.toFixed(2)}% (${type})`);
  }

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentage values, percentage change, and what percent one number is of another."
      category="Math Tools"
    >
      <div className="space-y-10">

        {/* 1. X% of Y */}
        <div className="p-4 border border-slate-700 rounded-xl bg-slate-900">
          <h2 className="text-lg mb-3 text-emerald-300">1. What is X% of Y?</h2>

          <input type="number" className="tool-input mb-2" placeholder="X (percentage)"
            value={a} onChange={e => setA(e.target.value)} />
          <input type="number" className="tool-input mb-2" placeholder="Y (number)"
            value={b} onChange={e => setB(e.target.value)} />

          <button className="btn-primary" onClick={calc1}>Calculate</button>

          {result1 && (
            <div className="mt-3 text-emerald-300">{result1}</div>
          )}
        </div>

        {/* 2. X is what percent of Y */}
        <div className="p-4 border border-slate-700 rounded-xl bg-slate-900">
          <h2 className="text-lg mb-3 text-emerald-300">2. X is what percent of Y?</h2>

          <input type="number" className="tool-input mb-2" placeholder="X (part)"
            value={c} onChange={e => setC(e.target.value)} />
          <input type="number" className="tool-input mb-2" placeholder="Y (whole)"
            value={d} onChange={e => setD(e.target.value)} />

          <button className="btn-primary" onClick={calc2}>Calculate</button>

          {result2 && (
            <div className="mt-3 text-emerald-300">{result2}</div>
          )}
        </div>

        {/* 3. Percentage Increase/Decrease */}
        <div className="p-4 border border-slate-700 rounded-xl bg-slate-900">
          <h2 className="text-lg mb-3 text-emerald-300">3. Percentage Increase or Decrease</h2>

          <input type="number" className="tool-input mb-2" placeholder="Old value"
            value={e} onChange={ev => setE(ev.target.value)} />
          <input type="number" className="tool-input mb-2" placeholder="New value"
            value={f} onChange={ev => setF(ev.target.value)} />

          <button className="btn-primary" onClick={calc3}>Calculate</button>

          {result3 && (
            <div className="mt-3 text-emerald-300">{result3}</div>
          )}
        </div>

      </div>
    </ToolLayout>
  );
}
