export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import aiToolsData from "@/components/aiToolsData";
import { aiToolRegistry } from "@/components/aiToolRegistry";
import AiToolLayout from "@/components/ai/AiToolLayout";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return aiToolsData.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = aiToolsData.find((t) => t.slug === slug);

  if (!tool) return {};

  return {
    title: tool.seoTitleTemplate || `${tool.title} — OnlineToolsBase`,
    description: tool.seoDescriptionTemplate || tool.description,
    alternates: {
      canonical: `https://onlinetoolsbase.com/ai/${tool.slug}`,
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
