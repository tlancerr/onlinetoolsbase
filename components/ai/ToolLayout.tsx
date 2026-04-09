import type { ReactNode } from "react";

type ToolLayoutProps = {
  header: ReactNode;
  input: ReactNode;
  output: ReactNode;
  sidebar?: ReactNode;
};

export default function ToolLayout({
  header,
  input,
  output,
  sidebar,
}: ToolLayoutProps) {
  return (
    <div>
      {header}

      <div className="ai-tool-inner-grid mt-6">
        <div className="ai-stack min-w-0">
          {input}
          {output}
        </div>

        <aside className="min-w-0">
          {sidebar ?? (
            <div className="ai-side-card">
              <h3 className="ai-side-title">Tool tips</h3>
              <div className="ai-side-list">
                <div className="ai-side-link">Use clear input for better results.</div>
                <div className="ai-side-link">Give enough context.</div>
                <div className="ai-side-link">Review output before publishing.</div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
