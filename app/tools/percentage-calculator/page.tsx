import { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolsData } from "@/components/toolsData";
import ToolLayout from "@/components/ToolLayout";

// import your tool UI component (stays where it is)
import ToolLoader from "./ToolLoader";

type Props = { params: {} };

export async function generateMetadata(): Promise<Metadata> {
  const tool = toolsData.find((t) => t.slug === "percentage-calculator");
  if (!tool) return {};

  return {
    title: tool.seoTitleTemplate || `${tool.title} — OnlineToolsBase`,
    description: tool.seoDescriptionTemplate || tool.description,
    alternates: {
      canonical: `https://onlinetoolsbase.com/tools/${tool.slug}`,
    },
  };
}

export default function Page() {
  const tool = toolsData.find((t) => t.slug === "percentage-calculator");
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
