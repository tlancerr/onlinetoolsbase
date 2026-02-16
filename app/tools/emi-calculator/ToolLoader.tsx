"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateEMI() {
    if (!amount || !rate || !months) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const r = annualRate / 12; // monthly interest rate
    const n = parseInt(months);

    let emi = 0;

    if (r === 0) {
      emi = P / n;
    } else {
      emi =
        (P * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult(
      `Monthly EMI: ${emi.toFixed(2)}
      
Total Payment: ${totalPayment.toFixed(2)}
Total Interest: ${totalInterest.toFixed(2)}`
    );
  }

  return (
    
      <div className="space-y-4">

        <div>
          <label className="tool-label">Loan Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 500000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Interest Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 8.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Loan Duration (months)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 60"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>

        <button onClick={calculateEMI} className="btn-primary">
          Calculate EMI
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}
      </div>
    
  );
}
