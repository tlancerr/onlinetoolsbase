import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ToolLayout from "@/components/ToolLayout";
import { toolsData } from "@/components/toolsData";

// Tool UI component (kept inside same folder)

import ToolLoader from "./ToolLoader";

export async function generateMetadata(): Promise<Metadata> {
  const tool = toolsData.find((t) => t.slug === "pdf-extract-images");
  if (!tool) return {};

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://onlinetoolsbase.com";

  const title = tool.seoTitleTemplate?.includes("{title}")
    ? tool.seoTitleTemplate.replace("{title}", tool.title)
    : tool.seoTitleTemplate || `${tool.title} — OnlineToolsBase`;

  const description = tool.seoDescriptionTemplate?.includes("{title}")
    ? tool.seoDescriptionTemplate.replace("{title}", tool.title)
    : tool.seoDescriptionTemplate || tool.description;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/tools/${tool.slug}` },
  };
}

export default function Page() {
  const tool = toolsData.find((t) => t.slug === "pdf-extract-images");
  if (!tool) return notFound();

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
      slug={tool.slug}
    >
      <ToolLoader />
    </ToolLayout>
  );
}
