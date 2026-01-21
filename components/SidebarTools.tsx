"use client";

import Link from "next/link";
import toolsData from "./toolsData";

import { usePathname } from "next/navigation";

export default function SidebarTools() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const currentTool = toolsData.find((t) => t.slug === slug);
  const currentCategory = currentTool?.category || null;

  const relatedTools = toolsData.filter(
    (t) => t.category === currentCategory && t.slug !== slug
  );

  const otherTools = toolsData.filter((t) => t.slug !== slug);

  return (
    <aside className="hidden lg:block w-64 shrink-0 pl-6">

      {/* CATEGORY TOOLS */}
      {currentCategory && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">
            {currentCategory} Tools
          </h3>

          <div className="space-y-1">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block text-sm text-slate-300 hover:text-emerald-400"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ALL TOOLS */}
      <div>
        <h3 className="text-sm font-semibold text-slate-400 mb-2">
          All Tools
        </h3>

        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
          {otherTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className={`block text-sm ${
                tool.slug === slug
                  ? "text-emerald-400 font-semibold"
                  : "text-slate-300 hover:text-emerald-400"
              }`}
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
