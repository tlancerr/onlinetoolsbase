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
  children: ReactNode;
  slug?: string; // ✅ optional (fixes your page.tsx error)
};

export default function ToolLayout({
  title,
  description,
  category,
  children,
  slug,
}: Props) {
  const pathname = usePathname();

  // ✅ infer slug from URL if not provided
  const inferredSlug = useMemo(() => {
    if (slug) return slug;
    const parts = (pathname || "").split("/").filter(Boolean);
    // expected: /tools/<slug>
    const last = parts[parts.length - 1] || "";
    return last;
  }, [pathname, slug]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  // ✅ canonical AFTER inferredSlug exists (fixes “used before declaration”)
  const canonical = `${siteUrl}${
    pathname || (inferredSlug ? `/tools/${inferredSlug}` : "")
  }`;

  const tool = useMemo(() => {
    // primary match by slug
    const bySlug = toolsData.find((t) => t.slug === inferredSlug);
    if (bySlug) return bySlug;

    // fallback match by title (in case slug mismatch)
    const byTitle = toolsData.find(
      (t) => t.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    return byTitle || null;
  }, [inferredSlug, title]);

  const faqs = tool?.faqs || [];
  const howtoSteps = tool?.howtoSteps || [];

  const seoTitle =
    tool?.seoTitleTemplate?.replace("{tool}", title) ||
    `${title} — OnlineToolsBase`;

  const seoDesc =
    tool?.seoDescriptionTemplate?.replace("{tool}", title) ||
    description ||
    "Free online tool.";

  const related = useMemo(() => {
    // same category, exclude current
    return toolsData
      .filter((t) => t.category === category && t.slug !== inferredSlug)
      .slice(0, 8);
  }, [category, inferredSlug]);

  const popular = useMemo(() => {
    // simple “popular” list: first N tools
    return toolsData.slice(0, 25);
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />
      </Head>

      {/* Schemas */}
      <BreadcrumbSchema />
      <ToolSchema />
      <HowToSchema />
      <FAQSchema />

      <div className="main-container py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <span className="badge">{category}</span>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-300">{description}</p>
        </div>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          {/* Tool box */}
          <section className="card">
            {children}

            {/* ✅ Ad #1 (keep only one above-the-fold for approval) */}
            <div className="w-full mt-6">
              <AdSlot
                slot={
                  process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX ||
                  "7182705926"
                }
                minHeight={280}
              />
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card sidebar-card mt-6">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Related tools
              </h2>
              <ul className="space-y-2 text-sm">
                {related.map((t) => (
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
                {popular.map((t) => (
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

        {/* ✅ Visible “About / Description” section (publisher content) */}
        <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">About this tool</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            {tool?.description || description}
          </p>
        </section>

        {/* ✅ Visible How-To from toolsData */}
        {howtoSteps.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              {howtoSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>
        )}

        {/* ✅ Visible FAQ from toolsData */}
        {faqs.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-3">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-slate-700 bg-slate-950/30 p-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                    {f.q}
                  </summary>
                  <div className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/*
          ✅ Ad #2 (COMMENTED ON PURPOSE for AdSense approval)
          Reason: your rejection says “Google-served ads on screens without publisher-content”.
          During approval, keep ads minimal. After approval, you can enable this.

          <AdSlot
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BEFORE_FAQ || "8471736863"}
            minHeight={280}
          />
        */}

        <div className="mt-10">
          <SupportSection />
        </div>
      </div>
    </>
  );
}
