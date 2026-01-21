"use client";

import dynamic from "next/dynamic";

const ImageBlurClient = dynamic(() => import("./ImageBlurClient"), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
        <div className="h-2 w-1/3 bg-[#64c1ff]" />
      </div>
      <p className="mt-2 text-xs text-slate-400">Loading tool…</p>
    </div>
  ),
});

export default function ImageBlurLoader() {
  return <ImageBlurClient />;
}
