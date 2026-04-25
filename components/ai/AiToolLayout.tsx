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
import AiAuthBar from "@/components/ai/AiAuthBar";
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

      <div className="ai-page-wrap">
        <section className="ai-hero">
          <div className="ai-hero-content">
            <span className="ai-pill">{category}</span>

            <h1>{title}</h1>

            <p>{description}</p>

            <div className="ai-meta-row">
              <span className="ai-meta-chip">No signup required</span>
              <span className="ai-meta-chip">Fast AI output</span>
              <span className="ai-meta-chip">SEO-friendly results</span>
            </div>
          </div>
        </section>

        <section className="ai-section-card">
          <h2 className="ai-section-title">About this tool</h2>
          <div
            className="ai-section-body"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />
        </section>

        <div className="mt-6">
          <AdSlot
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP || "7182705926"}
            minHeight={280}
          />
        </div>

        <div className="ai-main-grid">
          <section className="min-w-0">
            <div className="ai-tool-shell">{children}</div>

            <div className="mt-6">
              <AdSlot
                slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM || "8471736863"}
                minHeight={280}
              />
            </div>
          </section>

          <aside className="space-y-6 min-w-0">
            <div className="ai-side-card">
              <h2 className="ai-side-title">Why use this tool</h2>
              <div className="ai-side-list">
                {benefits.map((item, idx) => (
                  <div key={idx} className="ai-side-link">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-side-card">
              <h2 className="ai-side-title">Related AI tools</h2>
              <div className="ai-side-list">
                {relatedTools.length === 0 ? (
                  <div className="ai-side-link">No related AI tools found yet.</div>
                ) : (
                  relatedTools.map((t) => (
                    <a key={t.slug} href={`/ai/${t.slug}`} className="ai-side-link">
                      {t.title}
                    </a>
                  ))
                )}
              </div>
            </div>

            <div className="ai-side-card">
              <h2 className="ai-side-title">Popular AI tools</h2>
              <div className="ai-side-list">
                {popularTools.map((t) => (
                  <a key={t.slug} href={`/ai/${t.slug}`} className="ai-side-link">
                    {t.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {howToSteps.length > 0 && (
          <section className="ai-section-card">
            <h2 className="ai-section-title">How to use this tool</h2>
            <ol className="ai-howto-list">
              {howToSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="ai-section-card">
            <h2 className="ai-section-title">Frequently asked questions</h2>
            <div className="ai-faq-list">
              {faqs.map((item, idx) => (
                <details key={idx} className="ai-faq-item">
                  <summary>{item.q}</summary>
                  <div className="ai-faq-answer">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <SupportSection />
        </div>
      </div>
    </>
  );
}
