"use client";

import ToolSchema from "./ToolSchema";
import FAQSchema from "./FAQSchema";
import HowToSchema from "./HowToSchema";
import AdSlot from "@/components/AdSlot";
import BreadcrumbSchema from "./BreadcrumbSchema";

import React, { ReactNode } from "react";
import toolsData from "./toolsData";
import SupportSection from "./SupportSection";
import Head from "next/head";
import { usePathname } from "next/navigation";

type Props = {
  slug?: string;
  title: string;
  description: string;
  category: string;
  children: ReactNode;
};

export default function ToolLayout({
  slug,
  title,
  description,
  category,
  children,
}: Props) {
  const pathname = usePathname();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";
 const canonical = `${siteUrl}${pathname || `/tools/${inferredSlug}`}`;


  const inferredSlug =
  slug ||
  (pathname?.startsWith("/tools/")
    ? pathname.replace("/tools/", "").split("/")[0]
    : "");

const tool = toolsData.find((t) => t.slug === inferredSlug);


  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      {/* SEO / Schema */}
      <BreadcrumbSchema
        category={category}
        title={title}
        url={canonical}
        categorySlug={tool?.categorySlug}
      />
      <ToolSchema
        title={title}
        description={description}
        url={canonical}
        category={category}
      />
      {tool?.faqs?.length ? <FAQSchema faqs={tool.faqs} /> : null}
      {tool?.howtoSteps?.length ? (
        <HowToSchema title={title} steps={tool.howtoSteps} url={canonical} />
      ) : null}

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
          <section className="card">
            {children}

            {/*
              AdSlot (ABOVE THE FOLD) — commented out intentionally.
              Reason: for AdSense approval + UX, reduce ad density near the tool UI.
              Keep the "before FAQ" ad instead (below), which is less intrusive.
            */}
            {/*
            <AdSlot
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX || ""}
              minHeight={280}
            />
            */}
          </section>

          <aside className="space-y-6">
            <div className="card sidebar-card mt-6">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Related tools
              </h2>

              <ul className="space-y-2 text-sm">
                {tool?.related?.map((r) => (
                  <li key={r.slug}>
                    <a
                      href={`/tools/${r.slug}`}
                      className="flex items-center justify-between hover:text-blue-400"
                    >
                      <span>{r.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {category}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8" />
            </div>

            <div className="card sidebar-card">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Popular tools
              </h2>

              <ul className="space-y-2 text-sm max-h-[260px] overflow-auto pr-1">
                {toolsData.slice(0, 25).map((t) => (
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

        {/* About (visible content pulled from toolsData) */}
        {tool?.description ? (
          <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">About this tool</h2>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              {tool.description}
            </p>
          </section>
        ) : null}

        {/* Ad: before FAQ (keep this one) */}
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BEFORE_FAQ || ""}
          minHeight={280}
          className="my-6"
        />

        {/* FAQ (visible content pulled from toolsData) */}
        {tool?.faqs?.length ? (
          <section className="my-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">
              Frequently Asked Questions
            </h2>

            <div className="space-y-2">
              {tool.faqs.map((f, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-slate-700 bg-slate-950/30 px-4 py-3"
                >
                  <summary className="cursor-pointer select-none text-sm md:text-base font-medium text-slate-100">
                    {f.q}
                  </summary>
                  <div className="mt-2 text-sm md:text-base text-slate-200 leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* How to use (visible content pulled from toolsData) */}
        {tool?.howtoSteps?.length ? (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              {tool.howtoSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}

        <SupportSection />
      </div>
    </>
  );
}
