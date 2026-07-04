import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ToolLayout from "@/components/ToolLayout";
import { toolsData } from "@/components/toolsData";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. ADD THIS FUNCTION: Forces Next.js to pre-render every tool as static HTML files at build time
export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

// 2. ADD THIS VARIABLE: Stops crawlers from hitting randomly generated rogue URLs or old ad loops
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    // FORCE positive indexing instructions directly in your main metadata output loop
    robots: {
      index: true,
      follow: true,
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

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;

  const tool = toolsData.find((t) => t.slug === slug);

  if (!tool) notFound();

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
      slug={tool.slug}
    >
      <div className="w-full">Tool UI goes here</div>
    </ToolLayout>
  );
}
