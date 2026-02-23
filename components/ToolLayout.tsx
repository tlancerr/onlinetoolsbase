"use client";

import React, { ReactNode, useMemo } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

import ToolSchema from "./ToolSchema";
import FAQSchema from "./FAQSchema";
import HowToSchema from "./HowToSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

import AdSlot from "./AdSlot";
import { toolsData } from "./toolsData";
import SupportSection from "./SupportSection";

type Props = {
  title: string;
  description: string;
  category: string;
  slug?: string;
  children: ReactNode;
};

export default function ToolLayout({
  title,
  description,
  category,
  slug,
  children,
}: Props) {
  const pathname = usePathname();

  // Infer slug if not provided
  const inferredSlug = useMemo(() => {
    if (slug && slug.trim()) return slug.trim();

    const parts = (pathname || "").split("/").filter(Boolean);
    // expected: /tools/<slug>
    if (parts.length >= 2 && parts[0] === "tools") return parts[1];

    return "";
  }, [slug, pathname]);

  const tool = useMemo(() => {
    return toolsData.find((t) => t.slug === inferredSlug);
  }, [inferredSlug]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  const canonical =
    inferredSlug && inferredSlug.length > 0
      ? `${siteUrl}/tools/${inferredSlug}`
      : `${siteUrl}${pathname || "/"}`;

  const longDescription =
    (tool as any)?.longDescription ||
    (tool?.description ?? description ?? "Use this free online tool instantly.");

  const howToSteps: string[] = tool?.howtoSteps || [];
  const faqs: { q: string; a: string }[] = tool?.faqs || [];

  const relatedTools = useMemo(() => {
    return toolsData
      .filter((t) => t.category === category)
      .filter((t) => t.slug !== inferredSlug)
      .slice(0, 10);
  }, [category, inferredSlug]);

  const popularTools = useMemo(() => {
    const popular = toolsData.filter((t) => !!t.popular).slice(0, 12);
    return popular.length > 0 ? popular : toolsData.slice(0, 12);
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      {/* Schemas (non-visual) */}
      <BreadcrumbSchema title={title} category={category} slug={inferredSlug} />
      <ToolSchema
        title={title}
        description={tool?.description || description}
        category={category}
        slug={inferredSlug}
      />
      <HowToSchema title={title} steps={howToSteps} slug={inferredSlug} />
      <FAQSchema faqs={faqs} />

      {/* ✅ MOBILE OVERFLOW FIX: clamp width + hide horizontal overflow */}
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="main-container py-8 lg:py-10 w-full max-w-full overflow-x-hidden">
          {/* Header */}
          <div className="mb-6 space-y-2 max-w-full overflow-x-hidden">
            <span className="badge">{category}</span>

            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              {title}
            </h1>

            <p className="text-sm md:text-base text-slate-300 break-words">
              {description}
            </p>
          </div>

          {/* ✅ LONG DESCRIPTION ABOVE TOOL (AdSense-safe publisher content) */}
          <section className="mt-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700 max-w-full overflow-x-hidden">
            <h2 className="text-lg font-semibold mb-2">About this tool</h2>
            <div
  className="text-sm opacity-90 leading-6 break-words whitespace-pre-line"
  dangerouslySetInnerHTML={{ __html: longDescription }}
/>
          </section>

          {/* ✅ AdSlot #1 AFTER content, BEFORE tool UI (best for approval) */}
          <div className="mt-6 max-w-full overflow-x-hidden">
            <AdSlot
              slot={
                process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP || "7182705926"
              }
              minHeight={280}
            />
          </div>

          {/* Tool + Sidebar */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] max-w-full">
            {/* Tool box */}
            <section className="card min-w-0 max-w-full overflow-x-hidden">
              {/* ✅ CHILD WRAP: prevents any tool component from forcing horizontal scroll */}
              <div className="min-w-0 w-full max-w-full overflow-x-hidden">
                {children}
              </div>

              {/* ✅ SECOND AD SLOT — COMMENTED OUT UNTIL ADSENSE APPROVAL */}
              
              <div className="mt-6 max-w-full overflow-x-hidden">
                <AdSlot
                  slot={
                    process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM || "8471736863"
                  }
                  minHeight={280}
                />
              </div>
              
            </section>

            {/* Sidebar */}
            <aside className="space-y-6 min-w-0 max-w-full overflow-x-hidden">
              <div className="card sidebar-card min-w-0 max-w-full overflow-x-hidden">
                <h2 className="text-sm font-semibold text-slate-100 mb-3">
                  Related tools
                </h2>

                {relatedTools.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No related tools found.
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {relatedTools.map((t) => (
                      <li key={t.slug} className="min-w-0">
                        <a
                          href={`/tools/${t.slug}`}
                          className="flex items-center justify-between gap-3 hover:text-blue-400 min-w-0"
                        >
                          <span className="min-w-0 flex-1 truncate">
                            {t.title}
                          </span>
                          <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            {t.category}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="card sidebar-card min-w-0 max-w-full overflow-x-hidden">
                <h2 className="text-sm font-semibold text-slate-100 mb-3">
                  Popular tools
                </h2>

                <ul className="space-y-2 text-sm max-h-[260px] overflow-auto pr-1">
                  {popularTools.map((t) => (
                    <li key={t.slug} className="min-w-0">
                      <a
                        href={`/tools/${t.slug}`}
                        className="hover:text-blue-400 block truncate"
                      >
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* How-To (below tool) */}
          {howToSteps.length > 0 && (
            <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700 max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
              <ol className="list-decimal list-inside space-y-1 text-sm opacity-90 break-words">
                {howToSteps.map((step, idx) => (
                  <li key={idx} className="break-words">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ (below tool) */}
          {faqs.length > 0 && (
            <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700 max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold mb-3">
                Frequently Asked Questions
              </h2>

              <div className="space-y-2">
                {faqs.map((item, idx) => (
                  <details
                    key={idx}
                    className="rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-3 max-w-full overflow-x-hidden"
                  >
                    <summary className="cursor-pointer text-sm font-semibold text-slate-100 break-words">
                      {item.q}
                    </summary>
                    <div className="mt-2 text-sm text-slate-300 leading-6 break-words">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Support */}
          <div className="mt-10 max-w-full overflow-x-hidden">
            <SupportSection />
          </div>
        </div>
      </div>
    </>
  );
}
