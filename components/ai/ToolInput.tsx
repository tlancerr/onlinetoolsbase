import type { ReactNode } from "react";

type ToolInputProps = {
  title?: string;
  children: ReactNode;
};

export default function ToolInput({
  title = "Input",
  children,
}: ToolInputProps) {
  return (
    <section className="ai-panel">
      <h2 className="ai-panel-title">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
