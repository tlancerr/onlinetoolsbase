type ToolHeaderProps = {
  title: string
  description: string
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-gray-600 max-w-2xl leading-7">
        {description}
      </p>
    </div>
  )
}
