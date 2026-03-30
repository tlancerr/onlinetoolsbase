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

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_280px] gap-6">
        <div className="space-y-6 min-w-0">
          {input}
          {output}
        </div>

        <aside className="min-w-0">
          {sidebar ?? (
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Tool tips
              </h3>
              <ul className="space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <li>Use clear input for better results.</li>
                <li>Give enough context.</li>
                <li>Review output before publishing.</li>
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
