"use client";

import { useState } from "react";


function parseFraction(str: string) {
  const parts = str.split("/");
  if (parts.length === 1) return { num: parseFloat(parts[0]), den: 1 };
  return { num: parseFloat(parts[0]), den: parseFloat(parts[1]) };
}

export default function ToolLoader() {
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");

  function calculate() {
    if (!f1 || !f2) return setResult("Enter both fractions.");

    const A = parseFraction(f1);
    const B = parseFraction(f2);

    let num = 0, den = 1;

    switch (operation) {
      case "add":
        num = A.num * B.den + B.num * A.den;
        den = A.den * B.den;
        break;

      case "sub":
        num = A.num * B.den - B.num * A.den;
        den = A.den * B.den;
        break;

      case "mul":
        num = A.num * B.num;
        den = A.den * B.den;
        break;

      case "div":
        num = A.num * B.den;
        den = A.den * B.num;
        break;
    }

    // simplify
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const g = gcd(num, den);

    setResult(`Result: ${num / g} / ${den / g}`);
  }

  return (
   
      <div className="space-y-4">

        <input className="tool-input" placeholder="Fraction 1 (e.g. 3/4)" value={f1} onChange={e => setF1(e.target.value)} />
        <input className="tool-input" placeholder="Fraction 2 (e.g. 2/5)" value={f2} onChange={e => setF2(e.target.value)} />

        <select className="tool-input" value={operation} onChange={e => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="sub">Subtract</option>
          <option value="mul">Multiply</option>
          <option value="div">Divide</option>
        </select>

        <button className="btn-primary" onClick={calculate}>Calculate</button>

        {result && <div className="mt-4 text-emerald-300">{result}</div>}
      </div>
    
  );
}
