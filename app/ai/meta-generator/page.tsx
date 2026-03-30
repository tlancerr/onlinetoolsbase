'use client'

import { useState } from "react"
import ToolLayout from "@/components/ai/ToolLayout"
import ToolHeader from "@/components/ai/ToolHeader"
import ToolInput from "@/components/ai/ToolInput"
import ToolOutput from "@/components/ai/ToolOutput"

export default function MetaGeneratorPage() {

  const [keyword, setKeyword] = useState("")
  const [content, setContent] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    if (!keyword.trim()) {
      setResult("Please enter a target keyword.")
      return
    }

    try {
      setLoading(true)
      setResult("")

      const res = await fetch("/api/ai/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
You are an expert SEO specialist.

Generate:
1. 5 SEO optimized title tags (max 60 characters)
2. 5 meta descriptions (max 155 characters)
3. 3 H1 variations

Keyword: ${keyword}

Context (optional):
${content}
          `
        }),
      })

      const data = await res.json()
      setResult(data.result || "No result.")
    } catch (error) {
      setResult("Error generating meta tags.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Meta Title & Description Generator"
          description="Generate SEO-optimized title tags, meta descriptions, and H1 headings instantly."
        />
      }
      input={
        <ToolInput title="SEO Input">
          <input
            type="text"
            placeholder="Enter target keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            placeholder="Optional content context..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-xl p-3 min-h-[120px]"
          />

          <button
            onClick={runAI}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate SEO Meta"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="Generated Meta Tags"
          result={result}
          loading={loading}
        />
      }
    />
  )
}
