import type { ReactNode } from "react"

type ToolLayoutProps = {
  header: ReactNode
  input: ReactNode
  output: ReactNode
  sidebar?: ReactNode
}

export default function ToolLayout({
  header,
  input,
  output,
  sidebar,
}: ToolLayoutProps) {
  return (
    <div>
      {header}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {input}
          {output}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-6">
            {sidebar ?? (
              <div className="border rounded-2xl p-5 bg-gray-50">
                <h3 className="text-lg font-semibold mb-3">Tool Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Use clear input for better results.</li>
                  <li>Keep URLs one per line.</li>
                  <li>Review AI output before publishing.</li>
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
