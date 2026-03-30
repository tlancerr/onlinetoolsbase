'use client'

import { useState } from "react"
import ToolLayout from "@/components/ai/ToolLayout"
import ToolHeader from "@/components/ai/ToolHeader"
import ToolInput from "@/components/ai/ToolInput"
import ToolOutput from "@/components/ai/ToolOutput"

export default function SchemaGeneratorPage() {

  const [type, setType] = useState("faq")
  const [content, setContent] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    if (!content.trim()) {
      setResult("Please enter content.")
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
You are a structured data expert.

Generate valid JSON-LD schema.

Schema type: ${type}

Content:
${content}

Return only JSON-LD code.
          `
        }),
      })

      const data = await res.json()
      setResult(data.result || "No schema generated.")
    } catch {
      setResult("Error generating schema.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Schema Generator"
          description="Generate JSON-LD structured data for SEO, including FAQ, Article, Product, and more."
        />
      }
      input={
        <ToolInput title="Schema Input">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="faq">FAQ Schema</option>
            <option value="article">Article Schema</option>
            <option value="product">Product Schema</option>
            <option value="localbusiness">Local Business</option>
          </select>

          <textarea
            placeholder="Enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-xl p-3 min-h-[160px]"
          />

          <button
            onClick={runAI}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate Schema"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="JSON-LD Output"
          result={result}
          loading={loading}
        />
      }
    />
  )
}
