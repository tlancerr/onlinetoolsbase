"use client";

import { useState } from "react";


// ----------------------------------------------------
//  TAX BRACKETS FOR MULTIPLE COUNTRIES
// ----------------------------------------------------
const taxBrackets: any = {
  global: [
    { upTo: 10000, rate: 0.1 },
    { upTo: 30000, rate: 0.15 },
    { upTo: 60000, rate: 0.20 },
    { upTo: 100000, rate: 0.25 },
    { upTo: Infinity, rate: 0.30 },
  ],

  usa: [
    { upTo: 11000, rate: 0.10 },
    { upTo: 44725, rate: 0.12 },
    { upTo: 95375, rate: 0.22 },
    { upTo: 182100, rate: 0.24 },
    { upTo: Infinity, rate: 0.32 },
  ],

  uk: [
    { upTo: 12570, rate: 0 },
    { upTo: 50270, rate: 0.20 },
    { upTo: 125140, rate: 0.40 },
    { upTo: Infinity, rate: 0.45 },
  ],

  canada: [
    { upTo: 55867, rate: 0.15 },
    { upTo: 111733, rate: 0.205 },
    { upTo: 173205, rate: 0.26 },
    { upTo: Infinity, rate: 0.29 },
  ],

  australia: [
    { upTo: 18200, rate: 0 },
    { upTo: 45000, rate: 0.19 },
    { upTo: 120000, rate: 0.325 },
    { upTo: 180000, rate: 0.37 },
    { upTo: Infinity, rate: 0.45 },
  ],

  india: [
    { upTo: 300000, rate: 0 },
    { upTo: 600000, rate: 0.05 },
    { upTo: 900000, rate: 0.10 },
    { upTo: 1200000, rate: 0.15 },
    { upTo: 1500000, rate: 0.20 },
    { upTo: Infinity, rate: 0.30 },
  ],

  pakistan: [
    { upTo: 600000, rate: 0 },
    { upTo: 1200000, rate: 0.05 },
    { upTo: 2400000, rate: 0.125 },
    { upTo: 3600000, rate: 0.20 },
    { upTo: 6000000, rate: 0.25 },
    { upTo: Infinity, rate: 0.35 },
  ],

  uae: [
    { upTo: Infinity, rate: 0 },
  ],
};

// ----------------------------------------------------
//  MAIN COMPONENT
// ----------------------------------------------------
export default function ToolLoader() {
  const [salary, setSalary] = useState("");
  const [country, setCountry] = useState("global");
  const [result, setResult] = useState<string | null>(null);

  function calculateTax() {
    if (!salary) {
      setResult("Please enter salary.");
      return;
    }

    const income = parseFloat(salary);
    const brackets = taxBrackets[country];

    let tax = 0;
let lastLimit = 0;

for (const bracket of brackets) {
  if (income > lastLimit) {
    const taxable = Math.min(income, bracket.upTo) - lastLimit;
    tax += taxable * bracket.rate;
    lastLimit = bracket.upTo;
  }
}


    const netSalary = income - tax;
    const effectiveRate = (tax / income) * 100;

    setResult(`
Country: ${country.toUpperCase()}
Gross Salary: ${income.toFixed(2)}
Total Tax: ${tax.toFixed(2)}
Net Salary (Take-Home): ${netSalary.toFixed(2)}
Effective Tax Rate: ${effectiveRate.toFixed(2)}%
    `);
  }

  return (
    
      <div className="space-y-4">

        {/* Salary Input */}
        <div>
          <label className="tool-label">Annual Salary</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        {/* Country Selector */}
        <div>
          <label className="tool-label">Select Country</label>
          <select
            className="tool-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="global">Global (Simple)</option>
            <option value="usa">USA</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="india">India</option>
            <option value="pakistan">Pakistan</option>
            <option value="uae">UAE (0% tax)</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button onClick={calculateTax} className="btn-primary">
          Calculate Tax
        </button>

        {/* Result */}
        {result && (
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-900 border border-slate-700 px-4 py-4 text-sm text-emerald-300">
            {result}
          </pre>
        )}

      </div>
    
  );
}
