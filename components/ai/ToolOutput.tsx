"use client";

import { useEffect, useState } from "react";

type ToolOutputProps = {
  title?: string;
  result: string;
  loading?: boolean;
  onSave?: () => void;
  canSave?: boolean;
};

const loadingSteps = [
  "Analyzing your input...",
  "Generating AI output...",
  "Optimizing the result...",
];

export default function ToolOutput({
  title = "Output",
  result,
  loading = false,
  onSave,
  canSave = false,
}: ToolOutputProps) {
  const [loadingStep, setLoadingStep] = useState(loadingSteps[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(loadingSteps[0]);
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingSteps.length;
      setLoadingStep(loadingSteps[index]);
    }, 1800);

    return () => clearInterval(interval);
  }, [loading]);

  const handleCopy = async () => {
    if (!result.trim()) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <section className="ai-panel">
      <h2 className="ai-panel-title">{title}</h2>

      {loading && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-800">
          {loadingStep}
        </div>
      )}

      {!loading && result && (
        <>
          <pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800">
            {result}
          </pre>

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={handleCopy} className="ai-side-link">
              {copied ? "Copied" : "Copy"}
            </button>

            {onSave && (
              <button
                type="button"
                onClick={onSave}
                className="ai-btn-primary"
                disabled={!canSave}
                title={!canSave ? "Sign in to save outputs" : "Save output"}
              >
                Save Output
              </button>
            )}
          </div>
        </>
      )}

      {!loading && !result && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Your generated output will appear here.
        </div>
      )}
    </section>
  );
}