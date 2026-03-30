type ToolOutputProps = {
  title?: string;
  result: string;
  loading?: boolean;
};

export default function ToolOutput({
  title = "Output",
  result,
  loading = false,
}: ToolOutputProps) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        {loading && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Generating...
          </span>
        )}
      </div>

      <div className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-4 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {loading
          ? "Please wait while the AI generates your result..."
          : result || "Your output will appear here."}
      </div>
    </section>
  );
}
