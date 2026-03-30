"use client"

import { useState } from "react"
import ToolLayout from "@/components/ai/ToolLayout"
import ToolHeader from "@/components/ai/ToolHeader"
import ToolInput from "@/components/ai/ToolInput"
import ToolOutput from "@/components/ai/ToolOutput"

export default function SchemaGeneratorTool() {
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
          `,
        }),
      })

      const data = await res.json()
      setResult(data.result || "No schema generated.")
    } catch (error) {
      console.error(error)
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
          description="Generate JSON-LD structured data for FAQ, Article, Product, and more."
        />
      }
      input={
        <ToolInput title="Schema Input">
          <div>
            <label className="block text-sm font-medium mb-2">
              Schema Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-xl p-3"
            >
              <option value="faq">FAQ Schema</option>
              <option value="article">Article Schema</option>
              <option value="product">Product Schema</option>
              <option value="localbusiness">Local Business Schema</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              placeholder="Enter content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-xl p-3 min-h-[160px]"
            />
          </div>

          <button
            onClick={runAI}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
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
