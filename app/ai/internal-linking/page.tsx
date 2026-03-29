'use client'

import { useState } from "react"

export default function InternalLinkingTool() {

  const [content, setContent] = useState("")
  const [urls, setUrls] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    setLoading(true)

    const res = await fetch("/api/ai/run", {
      method: "POST",
      body: JSON.stringify({
        prompt: `
        Analyze the following content and suggest internal linking opportunities.
        
        CONTENT:
        ${content}
        
        TARGET URLS:
        ${urls}
        
        Return anchor text suggestions and where to place them.
        `
      })
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        AI Internal Linking Tool
      </h1>

      {/* INPUT */}
      <div className="grid gap-4 mb-6">

        <textarea
          placeholder="Paste your article content..."
          className="border p-3 rounded-md h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <textarea
          placeholder="Paste target URLs (one per line)..."
          className="border p-3 rounded-md h-24"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />

        <button
          onClick={runAI}
          className="bg-black text-white py-2 rounded-md"
        >
          {loading ? "Processing..." : "Generate Internal Links"}
        </button>

      </div>

      {/* OUTPUT */}
      {result && (
        <div className="border p-4 rounded-md bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  )
}
