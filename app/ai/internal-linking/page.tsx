'use client'

import { useState } from "react"
import ToolLayout from "@/components/ai/ToolLayout"
import ToolHeader from "@/components/ai/ToolHeader"
import ToolInput from "@/components/ai/ToolInput"
import ToolOutput from "@/components/ai/ToolOutput"

export default function InternalLinkingToolPage() {
  const [content, setContent] = useState("")
  const [urls, setUrls] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    if (!content.trim() || !urls.trim()) {
      setResult("Please enter article content and at least one target URL.")
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
You are an SEO internal linking specialist.

Analyze the article content below and the target URLs list.

Your task:
1. Suggest the best internal linking opportunities.
2. Recommend anchor text for each suggestion.
3. Explain where in the content the link should be inserted.
4. Keep suggestions practical and SEO-friendly.

ARTICLE CONTENT:
${content}

TARGET URLS:
${urls}
          `,
        }),
      })

      const data = await res.json()
      setResult(data.result || "No result returned.")
    } catch (error) {
      console.error(error)
      setResult("Something went wrong while generating internal link suggestions.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Internal Linking Tool"
          description="Generate smart internal linking suggestions, anchor text ideas, and placement recommendations for your articles."
        />
      }
      input={
        <ToolInput title="Article Input">
          <div>
            <label className="block text-sm font-medium mb-2">
              Article Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article content here..."
              className="w-full border rounded-xl p-3 min-h-[220px] outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Target URLs
            </label>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="Paste one target URL per line..."
              className="w-full border rounded-xl p-3 min-h-[120px] outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            onClick={runAI}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Internal Links"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="Internal Linking Suggestions"
          result={result}
          loading={loading}
        />
      }
      sidebar={
        <div className="space-y-4">
          <div className="border rounded-2xl p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Best Results</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Use full article text, not just one paragraph.</li>
              <li>Add only URLs that are closely relevant.</li>
              <li>Review suggested anchors before publishing.</li>
            </ul>
          </div>

          <div className="border rounded-2xl p-5 bg-white">
            <h3 className="text-lg font-semibold mb-3">Coming Next</h3>
            <p className="text-sm text-gray-600 leading-6">
              We will reuse this exact layout for the Meta Generator and Schema Generator.
            </p>
          </div>
        </div>
      }
    />
  )
}
