export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* HEADER */}
      <div className="border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          AI Tools Hub
        </h1>

        <div className="flex gap-4 text-sm">
          <a href="/ai" className="hover:underline">All Tools</a>
          <a href="/pricing" className="hover:underline">Pricing</a>
          <a href="/dashboard" className="hover:underline">Dashboard</a>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>

    </div>
  )
}
