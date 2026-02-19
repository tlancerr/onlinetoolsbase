"use client";

import { useEffect, useMemo, useState } from "react";

type RatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

export default function ToolLoader() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingConvert, setLoadingConvert] = useState(false);

  // Load supported currencies once
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingCurrencies(true);
        const r = await fetch("https://api.frankfurter.dev/v1/currencies");
        const data = (await r.json()) as Record<string, string>;
        const list = Object.keys(data).sort();

        if (!alive) return;

        setCurrencies(list);

        // keep defaults valid
        if (!list.includes("USD")) setFrom(list[0] || "EUR");
        if (!list.includes("EUR")) setTo(list[1] || list[0] || "USD");
      } catch {
        if (!alive) return;
        setCurrencies([]);
      } finally {
        if (!alive) return;
        setLoadingCurrencies(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const canConvert = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 && from && to && from !== to;
  }, [amount, from, to]);

  async function convert() {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) {
      setResult("Please enter a valid amount.");
      return;
    }
    if (!from || !to) {
      setResult("Please select both currencies.");
      return;
    }
    if (from === to) {
      setResult(`${n.toFixed(2)} ${from} = ${n.toFixed(2)} ${to}`);
      return;
    }

    setLoadingConvert(true);
    setResult(null);

    try {
      const r = await fetch(
        `/api/finance/rates?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`,
        { method: "GET" }
      );

      const data = (await r.json()) as any;

      if (!r.ok) throw new Error(data?.error || "Failed to load rates.");

      const rr = data as RatesResponse;
      const rate = rr?.rates?.[to];

      if (!rate || typeof rate !== "number") {
        throw new Error("Rate not available for selected pair.");
      }

      const converted = n * rate;
      setResult(`${n.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`);
    } catch (e: any) {
      setResult(e?.message || "Conversion failed.");
    } finally {
      setLoadingConvert(false);
    }
  }

  return (
    <div className="space-y-4">
      {loadingCurrencies && (
        <p className="text-yellow-400 text-sm">Loading currencies...</p>
      )}

      {!loadingCurrencies && currencies.length === 0 && (
        <p className="text-red-300 text-sm">
          Could not load currencies. Please try again later.
        </p>
      )}

      <div>
        <label className="tool-label">Amount</label>
        <input
          type="number"
          className="tool-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
        />
      </div>

      <div>
        <label className="tool-label">From</label>
        <select
          className="tool-input"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          disabled={!currencies.length}
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="tool-label">To</label>
        <select
          className="tool-input"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={!currencies.length}
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={convert}
        className="btn-primary"
        disabled={loadingConvert || !currencies.length || !canConvert}
      >
        {loadingConvert ? "Converting..." : "Convert"}
      </button>

      {result && (
        <div className="mt-4 rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-emerald-300 text-sm">
          {result}
        </div>
      )}
    </div>
  );
}
