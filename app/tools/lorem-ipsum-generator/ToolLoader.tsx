"use client";

import { useState } from "react";


const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus dui id libero dictum, sed volutpat dolor tristique. In vel dolor nec velit laoreet aliquet. Praesent a nibh nec ipsum hendrerit faucibus.";

export default function ToolLoader() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  function generate() {
    const paragraphs = Array(count)
      .fill(null)
      .map(() => lorem)
      .join("\n\n");

    setOutput(paragraphs);
  }

  return (
    
      <div className="space-y-4">

        <input
          type="number"
          className="tool-input"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Lorem Ipsum
        </button>

        <textarea
          className="tool-input min-h-[200px]"
          readOnly
          value={output}
        />
      </div>
    
  );
}
