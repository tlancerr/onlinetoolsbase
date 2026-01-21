"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

function toRoman(num: number) {
  const map: any = {
    M:1000, CM:900, D:500, CD:400, C:100,
    XC:90, L:50, XL:40, X:10, IX:9,
    V:5, IV:4, I:1
  };
  let res = "";
  for (const key in map) {
    while (num >= map[key]) {
      res += key;
      num -= map[key];
    }
  }
  return res;
}

function fromRoman(str: string) {
  const map: any = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  let total = 0;
  for (let i=0; i<str.length; i++) {
    const curr = map[str[i]];
    const next = map[str[i+1]] || 0;
    total += curr < next ? -curr : curr;
  }
  return total;
}

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  return (
    <ToolLayout
      title="Roman Numeral Converter"
      description="Convert numbers to Roman numerals and Roman numerals to numbers."
      category="Math Tools"
    >

      <div className="space-y-6">

        {/* Number → Roman */}
        <div>
          <label className="tool-label">Number to Roman</label>
          <input
            className="tool-input"
            type="number"
            value={number}
            onChange={e => {
              setNumber(e.target.value);
              const n = parseInt(e.target.value);
              setRoman(n ? toRoman(n) : "");
            }}
          />
          {roman && (
            <div className="mt-2 text-emerald-300 text-sm">Roman: {roman}</div>
          )}
        </div>

        {/* Roman → Number */}
        <div>
          <label className="tool-label">Roman to Number</label>
          <input
            className="tool-input uppercase"
            type="text"
            onChange={e => setNumber(fromRoman(e.target.value.toUpperCase()).toString())}
          />
          {number && (
            <div className="mt-2 text-emerald-300 text-sm">Number: {number}</div>
          )}
        </div>

      </div>

    </ToolLayout>
  );
}
