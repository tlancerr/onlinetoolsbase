import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ToolLayout from "@/components/ToolLayout";
import { toolsData } from "@/components/toolsData";

// If your tool components are in /app/tools/<slug>/Something.tsx,
// you can import them conditionally OR use a registry mapping.
// For now, this page assumes you already render the tool UI elsewhere.
// Replace <div>Tool UI</div> with your actual tool component.

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const tool = toolsData.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool not found — OnlineToolsBase",
      description: "This tool page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  const title =
    tool.seoTitleTemplate?.includes("{title}")
      ? tool.seoTitleTemplate.replace("{title}", tool.title)
      : tool.seoTitleTemplate || `${tool.title} — OnlineToolsBase`;

  const description =
    tool.seoDescriptionTemplate?.includes("{title}")
      ? tool.seoDescriptionTemplate.replace("{title}", tool.title)
      : tool.seoDescriptionTemplate || tool.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/tools/${tool.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/tools/${tool.slug}`,
      siteName: "OnlineToolsBase",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ToolPage({ params }: Props) {
  const tool = toolsData.find((t) => t.slug === params.slug);

  if (!tool) notFound();

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
      slug={tool.slug}
    >
      {/* IMPORTANT:
          Render your actual tool component here.
          Example: <AgeCalculator /> for "age-calculator"
          If you already have per-tool folders under /app/tools/<slug>/page.tsx,
          keep those and still use generateMetadata there.
      */}
      <div className="w-full">Tool UI goes here</div>
    </ToolLayout>
  );
}
