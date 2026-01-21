"use client";

import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export function ToolCard({ title, description, href, tag }: ToolCardProps) {
  return (
    <Link href={href} className="group">
      <div className="tool-card h-full flex flex-col justify-between transition-transform duration-150 group-hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm sm:text-base text-slate-50">
              {title}
            </h3>
            {tag && (
              <span className="rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                {tag}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-3 text-[11px] text-emerald-300 flex items-center gap-1">
          Open tool
          <span>↗</span>
        </div>
      </div>
    </Link>
  );
}
