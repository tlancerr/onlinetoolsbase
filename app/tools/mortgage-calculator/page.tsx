"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [tax, setTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");

  const [result, setResult] = useState<string | null>(null);

  function calculateMortgage() {
    if (!homePrice || !downPayment || !rate || !years) {
      setResult("Please fill all required fields.");
      return;
    }

    const P = parseFloat(homePrice) - parseFloat(downPayment);
    const r = parseFloat(rate) / 100 / 12; // monthly interest rate
    const n = parseInt(years) * 12; // number of months

    let emi = 0;

    if (r === 0) {
      emi = P / n;
    } else {
      emi =
        (P * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);
    }

    // Optional fields
    const taxMonthly = tax ? parseFloat(tax) / 12 : 0;
    const insuranceMonthly = insurance ? parseFloat(insurance) / 12 : 0;
    const hoaFee = hoa ? parseFloat(hoa) : 0;

    const totalMonthly =
      emi + taxMonthly + insuranceMonthly + hoaFee;

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult(
      `Mortgage Payment Results:

Monthly Mortgage Payment: $${emi.toFixed(2)}
Total Monthly Payment (with extras): $${totalMonthly.toFixed(2)}

Loan Amount: $${P.toFixed(2)}
Total Interest Paid: $${totalInterest.toFixed(2)}
Total Payment Over ${years} Years: $${totalPayment.toFixed(2)}

Included Monthly:
Property Tax: $${taxMonthly.toFixed(2)}
Home Insurance: $${insuranceMonthly.toFixed(2)}
HOA Fees: $${hoaFee.toFixed(2)}`
    );
  }

  return (
    <ToolLayout
      title="Mortgage Calculator"
      description="Calculate mortgage payments including principal, interest, taxes, insurance, and HOA fees."
      category="Finance Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Home Price ($)</label>
          <input
            type="number"
            className="tool-input"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Down Payment ($)</label>
          <input
            type="number"
            className="tool-input"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Interest Rate (%)</label>
          <input
            type="number"
            className="tool-input"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Loan Term (years)</label>
          <input
            type="number"
            className="tool-input"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <hr className="border-slate-700 my-4" />

        <p className="text-slate-400 text-sm">Optional (recommended)</p>

        <div>
          <label className="tool-label">Annual Property Tax ($)</label>
          <input
            type="number"
            className="tool-input"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Annual Home Insurance ($)</label>
          <input
            type="number"
            className="tool-input"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">Monthly HOA Fees ($)</label>
          <input
            type="number"
            className="tool-input"
            value={hoa}
            onChange={(e) => setHoa(e.target.value)}
          />
        </div>

        <button onClick={calculateMortgage} className="btn-primary">
          Calculate Mortgage
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
