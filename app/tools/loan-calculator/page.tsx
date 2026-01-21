"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculateLoan() {
    if (!amount || !rate || !years) {
      setResult("Please fill all fields.");
      return;
    }

    const P = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;

    const n = parseInt(years) * 12;

    if (monthlyRate === 0) {
      // interest-free loan
      const emi = P / n;
      setResult(
        `Monthly Payment: ${emi.toFixed(2)}
Total Payment: ${P.toFixed(2)}
Total Interest: 0`
      );
      return;
    }

    const emi =
      (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult(
      `Monthly Payment (EMI): ${emi.toFixed(2)} 
      
Total Payment: ${totalPayment.toFixed(2)}
Total Interest: ${totalInterest.toFixed(2)}`
    );
  }

  return (
    <ToolLayout
      title="Loan Calculator"
      description="Calculate monthly EMI, total interest, and total payment for home, auto, or personal loans."
      category="Finance Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Loan Amount</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 100000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Interest Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 7.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Loan Term (years)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Example: 5"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <button onClick={calculateLoan} className="btn-primary">
          Calculate EMI
        </button>

        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-emerald-300">
            {result}
          </pre>
        )}
      </div>
    </ToolLayout>
  );
}
