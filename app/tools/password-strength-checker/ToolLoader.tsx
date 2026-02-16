"use client";

import { useState } from "react";


function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return { label: "Enter a password", color: "text-slate-300" };
  if (score <= 2) return { label: "Weak", color: "text-red-400" };
  if (score <= 4) return { label: "Medium", color: "text-yellow-300" };
  return { label: "Strong", color: "text-emerald-400" };
}

export default function ToolLoader() {
  const [password, setPassword] = useState("");

  const strength = getStrength(password);

  return (
   
      <div className="space-y-4">

        <input
          type="password"
          className="tool-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className={`font-semibold ${strength.color}`}>
          Strength: {strength.label}
        </p>

        <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
          <li>Use at least 12 characters</li>
          <li>Mix uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid common words or personal information</li>
        </ul>
      </div>
    
  );
}
