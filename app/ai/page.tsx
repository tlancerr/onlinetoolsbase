import Link from "next/link"
import aiToolsData from "@/components/aiToolsData"

export default function AiToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">AI Tools Hub</h1>

      <p className="text-gray-600 mb-10 max-w-2xl">
        Explore our growing collection of AI-powered tools for SEO, content creation, and automation.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {aiToolsData.map((tool) => (
          <Link
            key={tool.slug}
            href={`/ai/${tool.slug}`}
            className="border rounded-xl p-6 hover:shadow-md transition bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{tool.title}</h2>
              {tool.popular && (
                <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
