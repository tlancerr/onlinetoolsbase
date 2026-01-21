"use client";

import { useEffect, useRef } from "react";

type Props = {
  slot: string;
  minHeight?: number;
  className?: string;
};

export default function AdSlot({
  slot,
  minHeight = 280,
  className = "",
}: Props) {
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // AdSense requires pushing after script loads
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore
    }
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950/40 ${className}`}
      style={{ minHeight }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}