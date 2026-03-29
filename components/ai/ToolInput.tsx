import type { ReactNode } from "react"

type ToolInputProps = {
  title?: string
  children: ReactNode
}

export default function ToolInput({ title = "Input", children }: ToolInputProps) {
  return (
    <section className="border rounded-2xl p-5 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}
