"use client";

import dynamic from "next/dynamic";

const ToolClient = dynamic(() => import("./ToolClient"), {
  ssr: false,
  loading: () => (
  <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-2 min-h-[160px]">
    <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
      <div className="h-2 bg-blue-500" style={{ width: "35%" }} />
    </div>
    <p className="text-xs text-slate-400">Loading tool…</p>
  </div>
),

});

export default function ToolLoader() {
  return <ToolClient />;
}
