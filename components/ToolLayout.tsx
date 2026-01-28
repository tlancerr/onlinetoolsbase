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
  title: string;
  category: string;
  description: string;
  slug: string;
  children: React.ReactNode;
};

export default function ToolLayout({
  title,
  category,
  description,
  slug,
  children,
}: Props) {
  const tool: ToolItem | undefined = toolsData.find((t) => t.slug === slug);

  const faqs = tool?.faqs ?? [];
  const howtoSteps = tool?.howtoSteps ?? [];

  return (
    <>
      {/* Schemas (already good for SEO, but we will ALSO show visible content below) */}
      <BreadcrumbSchema category={category} title={title} slug={slug} />
      <ToolSchema
        name={title}
        description={description}
        category={category}
        slug={slug}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
      {howtoSteps.length > 0 && <HowToSchema title={title} steps={howtoSteps} slug={slug} />}

      <div className="main-container py-8 lg:py-10">
        {/* Title block */}
        <div className="mb-6 space-y-2">
          <span className="badge">{category}</span>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            {title}
          </h1>
          <p className="text-sm md:text-base text-slate-300">{description}</p>
        </div>

        {/* Tool + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <section className="card">
            {children}

            {/* Ad inside tool card (KEEP this one for now) */}
            <div className="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950/40 mt-6" style={{ minHeight: 280 }}>
              <AdSlot slotEnvKey="NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX" />
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card sidebar-card mt-6">
              <h2 className="text-sm font-semibold text-slate-100 mb-3">
                Related tools
              </h2>

              <ul className="space-y-2 text-sm">
                {toolsData
                  .filter((t) => t.category === category && t.slug !== slug)
                  .slice(0, 6)
                  .map((t) => (
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
                {toolsData
                  .filter((t) => t.popular)
                  .slice(0, 12)
                  .map((t) => (
                    <li key={t.slug}>
                      <a
                        href={`/tools/${t.slug}`}
                        className="hover:text-blue-400"
                      >
                        {t.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* IMPORTANT: comment out this second ad unit until AdSense approval */}
        {/*
        <div className="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950/40 mt-8" style={{ minHeight: 280 }}>
          <AdSlot slotEnvKey="NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BEFORE_FAQ" />
        </div>
        */}

        {/* Visible About / Description section (pulled from toolsData.description) */}
        <section className="my-8 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">
            About {title}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {tool?.description ?? description}
          </p>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            This tool is designed to be fast, simple, and mobile-friendly — no login required.
          </p>
        </section>

        {/* How to use (visible) */}
        {howtoSteps.length > 0 && (
          <section className="my-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              {howtoSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Visible FAQ section (pulled from toolsData.faqs) */}
        {faqs.length > 0 && (
          <section className="my-8 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-lg font-semibold mb-4 text-slate-100">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-950/30 px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm md:text-base font-medium text-slate-100">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Support section */}
        <div className="mt-10">
          <div className="support-section card my-10 py-8 text-center">
            <p className="text-lg font-semibold mb-4">Want to support?</p>
            <a
              href="https://www.buymeacoffee.com/onlinetoolsbase"
              target="_blank"
              rel="noopener noreferrer"
              className="support-svg-btn inline-block"
            >
              <img
                src="/coffee111.svg"
                alt="Buy me a coffee"
                className="support-svg"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
