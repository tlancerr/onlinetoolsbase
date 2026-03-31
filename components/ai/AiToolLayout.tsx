"use client";

import React, { ReactNode, useMemo } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

import FAQSchema from "@/components/FAQSchema";
import HowToSchema from "@/components/HowToSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SupportSection from "@/components/SupportSection";
import AdSlot from "@/components/AdSlot";

import aiToolsData from "@/components/aiToolsData";
import AiToolSchema from "@/components/ai/AiToolSchema";

type Props = {
  title: string;
  description: string;
  category: string;
  slug?: string;
  children: ReactNode;
};

const TOOL_BENEFITS: Record<string, string[]> = {
  "internal-linking": [
    "Find contextual internal links faster",
    "Improve topical relevance and crawl paths",
    "Get copy-ready anchor suggestions",
  ],
  "meta-generator": [
    "Generate titles and descriptions faster",
    "Reduce manual SEO drafting time",
    "Create copy-ready search snippets",
  ],
  "schema-generator": [
    "Generate JSON-LD without writing code manually",
    "Speed up SEO implementation",
    "Create markup-ready structured data",
  ],
};

export default function AiToolLayout({
  title,
  description,
  category,
  slug,
  children,
}: Props) {
  const pathname = usePathname();

  const inferredSlug = useMemo(() => {
    if (slug && slug.trim()) return slug.trim();

    const parts = (pathname || "").split("/").filter(Boolean);
    if (parts.length >= 2 && parts[0] === "ai") return parts[1];

    return "";
  }, [slug, pathname]);

  const tool = useMemo(() => {
    return aiToolsData.find((t) => t.slug === inferredSlug);
  }, [inferredSlug]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  const canonical =
    inferredSlug && inferredSlug.length > 0
      ? `${siteUrl}/ai/${inferredSlug}`
      : `${siteUrl}${pathname || "/"}`;

  const longDescription =
    tool?.longDescription ||
    tool?.description ||
    description ||
    "Use this AI tool instantly online.";

  const howToSteps: string[] = tool?.howtoSteps || [];
  const faqs: { q: string; a: string }[] = tool?.faqs || [];

  const relatedTools = useMemo(() => {
    return aiToolsData
      .filter((t) => t.category === category)
      .filter((t) => t.slug !== inferredSlug)
      .slice(0, 6);
  }, [category, inferredSlug]);

  const popularTools = useMemo(() => {
    const popular = aiToolsData.filter((t) => !!t.popular).slice(0, 8);
    return popular.length > 0 ? popular : aiToolsData.slice(0, 8);
  }, []);

  const benefits = TOOL_BENEFITS[inferredSlug] || [
    "Fast AI output",
    "Beginner-friendly workflow",
    "Copy-ready results",
  ];

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>

      <BreadcrumbSchema title={title} category={category} slug={inferredSlug} />
      <AiToolSchema
        title={title}
        description={tool?.description || description}
        category={category}
        slug={inferredSlug}
      />
      <HowToSchema title={title} steps={howToSteps} slug={inferredSlug} />
      <FAQSchema faqs={faqs} />

      <div className="w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="main-container py-8 lg:py-10 w-full max-w-full overflow-x-hidden">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 md:px-8 md:py-10">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_30%),radial-gradient(circle_at_left,rgba(6,182,212,0.10),transparent_25%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(6,182,212,0.14),transparent_25%)]" />

            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/50 dark:text-violet-300">
                {category}
              </span>

              <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>

              <p className="mt-4 max-w-3xl text-base md:text-lg leading-8 text-slate-600 dark:text-slate-300">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  No signup required
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  Fast AI output
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  SEO-friendly results
                </span>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              About this tool
            </h2>

            <div
              className="mt-4 prose prose-slate max-w-none dark:prose-invert prose-a:text-violet-600 hover:prose-a:text-violet-700 dark:prose-a:text-violet-400"
              dangerouslySetInnerHTML={{ __html: longDescription }}
            />
          </section>

          <div className="mt-6">
            <AdSlot
              slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP || "7182705926"}
              minHeight={280}
            />
          </div>

          {/* MAIN GRID */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.9fr)_320px]">
            <section className="min-w-0">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900 md:p-6">
                {children}
              </div>

              <div className="mt-6">
                <AdSlot
                  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM || "8471736863"}
                  minHeight={280}
                />
              </div>
            </section>

            <aside className="space-y-6 min-w-0">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Why use this tool
                </h2>

                <ul className="mt-4 space-y-3">
                  {benefits.map((item, idx) => (
                    <li
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Related AI tools
                </h2>

                {relatedTools.length === 0 ? (
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    No related AI tools found yet.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {relatedTools.map((t) => (
                      <li key={t.slug}>
                        <a
                          href={`/ai/${t.slug}`}
                          className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-violet-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          {t.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Popular AI tools
                </h2>

                <ul className="mt-4 space-y-3">
                  {popularTools.map((t) => (
                    <li key={t.slug}>
                      <a
                        href={`/ai/${t.slug}`}
                        className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* HOW TO */}
          {howToSteps.length > 0 && (
            <section className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                How to use this tool
              </h2>

              <ol className="mt-4 space-y-3 list-decimal list-inside text-slate-700 dark:text-slate-300">
                {howToSteps.map((step, idx) => (
                  <li key={idx} className="leading-7">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Frequently asked questions
              </h2>

              <div className="mt-4 space-y-3">
                {faqs.map((item, idx) => (
                  <details
                    key={idx}
                    className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition open:border-violet-300 open:bg-violet-50/40 dark:border-slate-800 dark:bg-slate-900 dark:open:border-violet-700 dark:open:bg-slate-800"
                  >
                    <summary className="cursor-pointer list-none font-medium text-slate-900 dark:text-white">
                      {item.q}
                    </summary>
                    <div className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10">
            <SupportSection />
          </div>
        </div>
      </div>
    </>
  );
}
