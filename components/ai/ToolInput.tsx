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
    <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
