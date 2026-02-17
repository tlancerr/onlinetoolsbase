"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [input, setInput] = useState("");

  function append(val: string) {
    setInput(input + val);
  }

  function clearAll() {
    setInput("");
  }

  function calculate() {
    try {
      const res = eval(input.replace("^", "**"));
      setInput(res.toString());
    } catch {
      setInput("Error");
    }
  }

  return (
    
      <div className="max-w-sm mx-auto">

        <input
          className="tool-input text-center text-xl"
          value={input}
          readOnly
        />

        <div className="grid grid-cols-4 gap-2 mt-4">

          {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","(",")"].map(btn => (
            <button
              key={btn}
              className="btn-primary py-2"
              onClick={() => append(btn)}
            >
              {btn}
            </button>
          ))}

          <button className="btn-primary col-span-2" onClick={() => append("+")}>+</button>
          <button className="btn-primary col-span-2" onClick={() => append("^")}>^</button>

          <button className="btn-primary bg-red-700" onClick={clearAll}>C</button>
          <button className="btn-primary col-span-3" onClick={calculate}>=</button>
        </div>

      </div>
   
  );
}
