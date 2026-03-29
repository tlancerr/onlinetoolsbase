type ToolOutputProps = {
  title?: string
  result: string
  loading?: boolean
}

export default function ToolOutput({
  title = "Output",
  result,
  loading = false,
}: ToolOutputProps) {
  return (
    <section className="border rounded-2xl p-5 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {loading && (
          <span className="text-sm text-gray-500">Generating...</span>
        )}
      </div>

      <div className="min-h-[180px] rounded-xl bg-gray-50 border p-4 whitespace-pre-wrap text-sm leading-7 text-gray-800">
        {loading ? "Please wait while the AI generates your result..." : result || "Your output will appear here."}
      </div>
    </section>
  )
}
