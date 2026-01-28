"use client";

import React, { ReactNode, useMemo } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

import ToolSchema from "./ToolSchema";
import FAQSchema from "./FAQSchema";
import HowToSchema from "./HowToSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

import AdSlot from "@/components/AdSlot";
import toolsData from "./toolsData";
import SupportSection from "./SupportSection";

type Props = {
  title: string;
  description: string;
  category: string;
  slug?: string; // ✅ optional (fixes your page.tsx errors)
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

  // ✅ Infer slug if not provided (fixes missing slug compile error)
  const inferredSlug = useMemo(() => {
    if (slug && slug.trim()) return slug.trim();

    // Expected paths: /tools/<slug>
    const parts = (pathname || "").split("/").filter(Boolean);
    if (parts.length >= 2 && parts[0] === "tools") return parts[1];

    return ""; // fallback (won't break build)
  }, [slug, pathname]);

  const tool = useMemo(() => {
    return toolsData.find((t: any) => t.slug === inferredSlug);
  }, [inferredSlug]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  const canonical =
    inferredSlug && inferredSlug.length > 0
      ? `${siteUrl}/tools/${inferredSlug}`
      : `${siteUrl}${pathname || "/"}`;

  const visibleDescription =
    tool?.longDescription ||
    tool?.description ||
    description ||
    "Use this free online tool instantly.";

  const howToSteps: string[] = tool?.howtoSteps || [];
  const faqs: { q: string; a: string }[] = tool?.faqs || [];

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      {/* ✅ Schemas (keep exactly like your old working structure, but use inferredSlug) */}
      <BreadcrumbSchema title={title} category={category} slug={inferredSlug} />

      <ToolSchema
        title={title}
        description={tool?.description || description}
        category={category}
        slug={inferredSlug}
      />

      <FAQSchema faqs={faqs} />

      <HowToSchema title={title} steps={howToSteps} slug={inferredSlug} />

      <div className="main-container py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <span className="badge">{category}</span>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-300">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          {/* Main Tool Box */}
          <section className="card">
            {children}

            {/* ✅ Keep this ad: best placement (below tool box) */}
            <AdSlot
              slot={
                process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX ||
                "7182705926"
              }
              minHeight={280}
            />
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card sidebar-card mt-6">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Related tools
              </h2>

              <ul className="space-y-2 text-sm">
                {toolsData
                  .filter((t: any) => t.category === category)
                  .filter((t: any) => t.slug !== inferredSlug)
                  .slice(0, 8)
                  .map((t: any) => (
                    <li key={t.slug}>
                      <a
                        href={`/tools/${t.slug}`}
                        className="flex items-center justify-between hover:text-blue-400"
                      >
                        <span>{t.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {t.category}
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="card sidebar-card">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Popular tools
              </h2>

              <ul className="space-y-2 text-sm max-h-[260px] overflow-auto pr-1">
                {toolsData.slice(0, 12).map((t: any) => (
                  <li key={t.slug}>
                    <a href={`/tools/${t.slug}`} className="hover:text-blue-400">
                      {t.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* =========================
            ✅ Visible content sections
           ========================= */}

        {/* About / Description (pulled from toolsData) */}
        <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">About this tool</h2>
          <p className="text-sm opacity-90 leading-6">{visibleDescription}</p>
        </section>

        {/* Visible How-To (pulled from toolsData) */}
        {howToSteps.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              {howToSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* ✅ SECOND AD SLOT — COMMENTED OUT FOR NOW (Approval-safe)
            Reason: keep ads density lower until AdSense approval.
            After approval, you can enable it if you want. */}
        {/*
        <AdSlot
          slot={
            process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BEFORE_FAQ || "8471736863"
          }
          minHeight={280}
        />
        */}

        {/* FAQ (visible accordion) */}
        {faqs.length > 0 && (
          <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((item, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                    {item.q}
                  </summary>
                  <div className="mt-2 text-sm text-slate-300 leading-6">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Support */}
        <div className="mt-10">
          <SupportSection />
        </div>
      </div>
    </>
  );
}
