"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");

  function generate() {
    let chars = "";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()-_=+[]{};:,.<>/?";

    if (!chars) {
      setPassword("Select at least one character type.");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      pass += chars[idx];
    }
    setPassword(pass);
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords with customizable length and character sets."
      category="Security Tools"
    >
      <div className="space-y-4">

        <div>
          <label className="tool-label">Password Length</label>
          <input
            type="number"
            className="tool-input"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="flex flex-col gap-1 text-sm text-slate-200">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={useLower}
              onChange={() => setUseLower(!useLower)}
            />
            Include lowercase letters (a–z)
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={useUpper}
              onChange={() => setUseUpper(!useUpper)}
            />
            Include uppercase letters (A–Z)
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
            />
            Include numbers (0–9)
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
            />
            Include symbols (!@#$%)
          </label>
        </div>

        <button className="btn-primary" onClick={generate}>
          Generate Password
        </button>

        {password && (
          <textarea
            className="tool-input mt-3 text-emerald-300"
            readOnly
            value={password}
          />
        )}
      </div>
    </ToolLayout>
  );
}
