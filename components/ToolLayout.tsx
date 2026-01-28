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

  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  slug?: string;

};

export default function ToolLayout({
  
  title,
  description,
  category,
  children,
}: Props) {
  const tool = toolsData.find((t) => t.title === title);

  const pathname = usePathname();
const canonical = `https://onlinetoolsbase.com${pathname}`;
const slug = pathname.split("/").pop() || "";


  // RELATED TOOLS
const related = toolsData
  .filter(
    (t) =>
      t.category === category &&     // same category
      t.title !== title               // not the same tool
  )
  .slice(0, 6);                       // limit 6 tools

// POPULAR TOOLS
const popular = toolsData
  .filter((t) => t.popular === true)  // only tools marked "popular: true"
  .slice(0, 8);                       // limit 8


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
    ? tool.seoTitleTemplate.replace("{title}", title)
    : `${title} — OnlineToolsBase`}
</title>

      <meta
  name="description"
  content={
    tool?.seoDescriptionTemplate
      ? tool.seoDescriptionTemplate.replace("{title}", title)
      : description || `${title} — free online tool`
  }
/>



      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* OG Tags */}
      <meta property="og:title" content={`${title} — OnlineToolsBase`} />
      <meta
  property="og:description"
  content={
    tool?.seoDescriptionTemplate
      ? tool.seoDescriptionTemplate.replace("{title}", title)
      : description || `${title} — free online tool`
  }
/>

      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`https://onlinetoolsbase.com/api/og/${title.toLowerCase().replace(/\s+/g, "-")}`} />


      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} — OnlineToolsBase`} />
      <meta name="twitter:description" content={
    tool?.seoDescriptionTemplate
      ? tool.seoDescriptionTemplate.replace("{title}", title)
      : description || `${title} — free online tool`
  }
/>
      <meta name="twitter:image" content={`https://onlinetoolsbase.com/api/og/${title.toLowerCase().replace(/\s+/g, "-")}`} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: title,
            description: description,
            url: canonical,
            applicationCategory: category,
            operatingSystem: "All"
          })
        }}
      />
       
    </Head>

     
    
{/* Breadcrumb Schema JSON-LD */}
<BreadcrumbSchema title={title} category={category} slug={slug} />
<ToolSchema
  title={title}
  description={tool?.description || description}
  category={category}
  slug={slug}
/>

<FAQSchema faqs={tool?.faqs || []} />
<HowToSchema
  title={title}
  steps={tool?.howtoSteps || []}
  slug={slug}
/>


    <div className="main-container py-8 lg:py-10">
      <div className="mb-6 space-y-2">
        <span className="badge">{category}</span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-slate-300">
            {description}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        {/* Main tool area */}
        <section className="card">
          {children}
         <AdSlot
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW_BOX || "7182705926"}
  minHeight={280}
/>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related tools */}
          <div className="card sidebar-card mt-6">

            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Related tools
            </h2>
            <ul className="space-y-2 text-sm">
              {related.length === 0 && (
                <li className="text-slate-100 text-xs">
                  No direct related tools yet.
                </li>
              )}
              {related.map((tool) => (
                <li key={tool.slug}>
                  <a
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between hover:text-blue-400"
                  >
                    <span>{tool.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {tool.category}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
  
</div>
          </div>

          {/* Popular / all tools */}
          <div className="card sidebar-card">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Popular tools
            </h2>
            <ul className="space-y-2 text-sm max-h-[260px] overflow-auto pr-1">
              {popular.map((tool) => (
                <li key={tool.slug}>
                  <a
                    href={`/tools/${tool.slug}`}
                    className="hover:text-blue-400"
                  >
                    {tool.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {/* Visible How-To Section */}
     <AdSlot
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BEFORE_FAQ || "8471736863"}
  minHeight={280}
/>
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
      <div className="mt-10">
   

  <SupportSection />
</div>

    </div>
      </>


  );

  
}
 
