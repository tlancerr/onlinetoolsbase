"use client";

import { useEffect, useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function CurrencyConverter() {
  const [rates, setRates] = useState<any>({});
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);

  // Fetch exchange rates
  useEffect(() => {
    fetch("https://api.exchangerate.host/latest")
      .then(res => res.json())
      .then(data => {
        setRates(data.rates);
      })
      .catch(() => {
        setRates({});
      });
  }, []);

  function convert() {
    if (!amount || !rates[from] || !rates[to]) {
      setResult("Please enter amount and wait for rates to load.");
      return;
    }

    const amountNum = parseFloat(amount);
    const converted = (amountNum / rates[from]) * rates[to];

    setResult(`${amount} ${from} = ${converted.toFixed(2)} ${to}`);
  }

  const currencyList = rates && typeof rates === "object"
  ? Object.keys(rates).sort()
  : [];


  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between currencies using real-time exchange rates."
      category="Finance Tools"
    >
      <div className="space-y-4">

        {!currencyList.length && (
          <p className="text-yellow-400 text-sm">
            Loading exchange rates...
          </p>
        )}

        <div>
          <label className="tool-label">Amount</label>
          <input
            type="number"
            className="tool-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="tool-label">From</label>
          <select
            className="tool-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {currencyList.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="tool-label">To</label>
          <select
            className="tool-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {currencyList.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button onClick={convert} className="btn-primary">
          Convert
        </button>

        {result && (
          <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-emerald-300 text-sm">
            {result}
          </div>
        )}

      </div>
    </ToolLayout>
  );
}
