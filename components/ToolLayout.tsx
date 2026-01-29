"use client";

import ToolSchema from "./ToolSchema";
import FAQSchema from "./FAQSchema";
import HowToSchema from "./HowToSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

import AdSlot from "@/components/AdSlot";
import SupportSection from "./SupportSection";

// KEEP your working default import (your toolsData has export default toolsData at bottom)
import toolsData from "./toolsData";

type Props = {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  slug?: string;
};

export default function ToolLayout({ title, description, category, children }: Props) {
  const pathname = usePathname();
  const canonical = `https://onlinetoolsbase.com${pathname}`;
  const slugFromPath = pathname.split("/").filter(Boolean).pop() || "";

  // ✅ FIX: resolve tool by slug first (stable), then fallback to title
  const tool =
    toolsData.find((t) => t.slug === slugFromPath) ||
    toolsData.find((t) => t.title === title) ||
    toolsData.find((t) => title.startsWith(t.title));

  // Use tool title/desc when available (prevents mismatches)
  const resolvedTitle = tool?.title || title;
  const resolvedDescription = tool?.description || description;

  // RELATED TOOLS (keep your logic, but use resolvedTitle so we don't exclude wrong item)
  const related = toolsData
    .filter((t) => t.category === category && t.title !== resolvedTitle)
    .slice(0, 6);

  // POPULAR TOOLS (keep)
  const popular = toolsData.filter((t) => t.popular === true).slice(0, 8);

  // ✅ Visible longDescription (supports \n\n paragraphs)
  const longRaw = (tool as any)?.longDescription as string | undefined;
  const longParagraphs = longRaw
    ? longRaw
        .split(/\n\s*\n/g)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#0f172a" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <title>
          {tool?.seoTitleTemplate
            ? tool.seoTitleTemplate.replace("{title}", resolvedTitle)
            : `${resolvedTitle} — OnlineToolsBase`}
        </title>

        <meta
          name="description"
          content={
            tool?.seoDescriptionTemplate
              ? tool.seoDescriptionTemplate.replace("{title}", resolvedTitle)
              : resolvedDescription || `${resolvedTitle} — free online tool`
          }
        />

        {/* Canonical */}
        <link rel="canonical" href={canonical} />

        {/* OG Tags */}
        <meta property="og:title" content={`${resolvedTitle} — OnlineToolsBase`} />
        <meta
          property="og:description"
          content={
            tool?.seoDescriptionTemplate
              ? tool.seoDescriptionTemplate.replace("{title}", resolvedTitle)
              : resolvedDescription || `${resolvedTitle} — free online tool`
          }
        />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:image"
          content={`https://onlinetoolsbase.com/api/og/${resolvedTitle
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${resolvedTitle} — OnlineToolsBase`} />
        <meta
          name="twitter:description"
          content={
            tool?.seoDescriptionTemplate
              ? tool.seoDescriptionTemplate.replace("{title}", resolvedTitle)
              : resolvedDescription || `${resolvedTitle} — free online tool`
          }
        />
        <meta
          name="twitter:image"
          content={`https://onlinetoolsbase.com/api/og/${resolvedTitle
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: resolvedTitle,
              description: resolvedDescription,
              url: canonical,
              applicationCategory: category,
              operatingSystem: "All",
            }),
          }}
        />
      </Head>

      {/* Breadcrumb Schema JSON-LD */}
      <BreadcrumbSchema title={resolvedTitle} category={category} slug={slugFromPath} />

      <ToolSchema
        title={resolvedTitle}
        description={resolvedDescription}
        category={category}
        slug={slugFromPath}
      />

      {/* Schemas (safe even if empty arrays) */}
      <FAQSchema faqs={tool?.faqs || []} />
      <HowToSchema title={resolvedTitle} steps={tool?.howtoSteps || []} slug={slugFromPath} />

      <div className="main-container py-8 lg:py-10">
        <div className="mb-6 space-y-2">
          <span className="badge">{category}</span>

          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">{resolvedTitle}</h1>

          {resolvedDescription && (
            <p className="text-sm md:text-base text-slate-300">{resolvedDescription}</p>
          )}

          {/* ✅ Visible publisher content (AdSense-safe) */}
          {longParagraphs.length > 0 && (
            <div className="mt-4 space-y-3">
              {longParagraphs.map((p, i) => (
                <p key={i} className="text-sm md:text-base text-slate-300 leading-7">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          {/* Main tool area */}
          <section className="card">
            {/* ✅ AdSlot #1 BEST for approval: after real content, before tool UI */}
            <div className="mb-6">
              <AdSlot
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX || "7182705926"}
                minHeight={280}
              />
            </div>

            {children}
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Related tools */}
            <div className="card sidebar-card mt-6">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">Related tools</h2>

              <ul className="space-y-2 text-sm">
                {related.length === 0 && (
                  <li className="text-slate-100 text-xs">No direct related tools yet.</li>
                )}

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

              <div className="mt-8"></div>
            </div>

            {/* Popular tools */}
            <div className="card sidebar-card">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">Popular tools</h2>
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

        {/* Visible How-To Section */}
        {tool?.howtoSteps && tool.howtoSteps.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              {tool.howtoSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Visible FAQ Section */}
        {tool?.faqs && tool.faqs.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>

            <div className="mt-3 space-y-3">
              {tool.faqs.map((item, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-slate-700 bg-slate-900/30 px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                    {item.q}
                  </summary>
                  <div className="mt-2 text-sm text-slate-300 leading-6">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ✅ AdSlot #2 DISABLED until AdSense approval */}
        {/*
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
