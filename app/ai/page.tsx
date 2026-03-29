export default function AiToolsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        AI Tools Hub
      </h2>

      <p className="text-gray-600 mb-10 max-w-2xl">
        Explore our growing collection of AI-powered tools designed for SEO, content creation, and automation.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {/* TOOL CARD */}
        <a href="/ai/internal-linking" className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">
            AI Internal Linking Tool
          </h3>
          <p className="text-sm text-gray-500">
            Automatically generate internal links and anchor text suggestions.
          </p>
        </a>

        <a href="/ai/meta-generator" className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">
            AI Meta Generator
          </h3>
          <p className="text-sm text-gray-500">
            Generate SEO titles and meta descriptions instantly.
          </p>
        </a>

        <a href="/ai/schema-generator" className="border rounded-xl p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-2">
            AI Schema Generator
          </h3>
          <p className="text-sm text-gray-500">
            Create JSON-LD structured data for your pages.
          </p>
        </a>

      </div>
    </div>
  )
}
