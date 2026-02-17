"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  function generate() {
    if (!keyword.trim()) return;

    const template = `
🎬 **About This Video**
Welcome to this video about ${keyword}! In today’s content, we explore valuable tips, insights, and information to help you understand everything about ${keyword} in a simple and engaging way.

⭐ **What You Will Learn**
- What is ${keyword}
- Why ${keyword} matters
- Best tips for ${keyword}
- Common mistakes to avoid
- Real examples of ${keyword}

📌 **Chapters**
00:00 – Introduction  
00:30 – What is ${keyword}?  
02:15 – Tips & Strategies  
05:40 – Real Examples  
08:10 – Summary & Final Thoughts  

🔔 Don’t forget to LIKE, SHARE & SUBSCRIBE if you enjoyed this video!

👇 **FOLLOW US**
Instagram: https://instagram.com  
Facebook: https://facebook.com  
Website: https://onlinetoolsbase.com
`;

    setResult(template.trim());
  }

  return (
   
      <div className="space-y-4">
        <input
          className="tool-input"
          value={keyword}
          placeholder="Enter keyword (example: travel vlog)"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Description
        </button>

        {result && (
          <textarea
            className="tool-input min-h-[300px]"
            value={result}
            readOnly
          />
        )}
      </div>
  );
}
