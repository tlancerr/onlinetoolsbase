import { Metadata } from "next";
import { notFound } from "next/navigation";

import aiToolsData from "@/components/aiToolsData";
import { aiToolRegistry } from "@/components/aiToolRegistry";
import AiToolLayout from "@/components/ai/AiToolLayout";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. FIXED: Removed force-dynamic conflict. While under construction, let's keep it static.
export async function generateStaticParams() {
  return aiToolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

// 2. FIXED: Disable dynamic params fallback so random crawler links throw clean 404s
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = aiToolsData.find((t) => t.slug === slug);

  if (!tool) {
    return {
      robots: { index: false, follow: false }, // Prevent indexation on broken URLs
    };
  }

  return {
    title: tool.seoTitleTemplate || `${tool.title} — OnlineToolsBase`,
    description: tool.seoDescriptionTemplate || tool.description,
    alternates: {
      canonical: `https://onlinetoolsbase.com/ai/${tool.slug}`,
    },
    // 3. CRITICAL: Tells Googlebot NOT to index these pages while they are under construction!
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AiToolPage({ params }: Props) {
  const { slug } = await params;

  const tool = aiToolsData.find((t) => t.slug === slug);
  if (!tool) return notFound();

  const ToolComponent = aiToolRegistry[slug as keyof typeof aiToolRegistry];
  if (!ToolComponent) return notFound();

  return (
    <AiToolLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
      slug={tool.slug}
    >
      <ToolComponent />
    </AiToolLayout>
  );
}
