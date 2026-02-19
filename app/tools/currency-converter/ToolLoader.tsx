"use client";

import { useEffect, useMemo, useState } from "react";

type SymbolsResponse = {
  success?: boolean;
  symbols?: Record<string, { description: string; code: string }>;
};

type LatestResponse = {
  success?: boolean;
  base?: string;
  rates?: Record<string, number>;
};

const API_BASE = "https://api.exchangerate.host"; // (their API host)

const POPULAR = ["USD", "EUR", "GBP", "PKR", "AED", "SAR", "TRY", "CAD", "AUD", "INR"];

const FLAG_MAP: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  PKR: "🇵🇰",
  AED: "🇦🇪",
  SAR: "🇸🇦",
  TRY: "🇹🇷",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  INR: "🇮🇳",
};

export default function ToolLoader() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [symbols, setSymbols] = useState<Record<string, { description: string; code: string }>>({});

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setResult(null);

      try {
        const [symRes, latestRes] = await Promise.all([
          fetch(`${API_BASE}/symbols`, { cache: "no-store" }),
          fetch(`${API_BASE}/latest`, { cache: "no-store" }),
        ]);

        const symJson = (await symRes.json()) as SymbolsResponse;
        const latestJson = (await latestRes.json()) as LatestResponse;

        if (!alive) return;

        setSymbols(symJson.symbols || {});
        setRates(latestJson.rates || {});
      } catch {
        if (!alive) return;
        setSymbols({});
        setRates({});
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const currencyList = useMemo(() => {
    const all = Object.keys(symbols);
    const popular = POPULAR.filter((c) => all.includes(c));
    const rest = all.filter((c) => !POPULAR.includes(c)).sort();
    return [...popular, ...rest];
  }, [symbols]);

  function convert() {
    if (!amount) {
      setResult("Please enter an amount.");
      return;
    }
    if (!rates[from] || !rates[to]) {
      setResult("Rates not loaded for selected currencies yet.");
      return;
    }

    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum)) {
      setResult("Invalid amount.");
      return;
    }

    const converted = (amountNum / rates[from]) * rates[to];
    setResult(`${amountNum} ${from} = ${converted.toFixed(2)} ${to}`);
  }

  return (
    <div className="space-y-4">
      {loading && (
        <p className="text-yellow-400 text-sm">Loading exchange rates...</p>
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
        <select className="tool-input" value={from} onChange={(e) => setFrom(e.target.value)}>
          {currencyList.map((c) => (
            <option key={c} value={c}>
              {(FLAG_MAP[c] ? `${FLAG_MAP[c]} ` : "")}{c} — {symbols[c]?.description || c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="tool-label">To</label>
        <select className="tool-input" value={to} onChange={(e) => setTo(e.target.value)}>
          {currencyList.map((c) => (
            <option key={c} value={c}>
              {(FLAG_MAP[c] ? `${FLAG_MAP[c]} ` : "")}{c} — {symbols[c]?.description || c}
            </option>
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
  );
}
