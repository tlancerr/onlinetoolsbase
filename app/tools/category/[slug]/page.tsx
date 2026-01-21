import toolsData from "@/components/toolsData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  const categoryName = categorySlug.replace(/-/g, " ");

  return {
    title: `${categoryName} — OnlineToolsBase`,
    description: `Explore free online ${categoryName} on OnlineToolsBase. Fast, clean, mobile-friendly tools.`,
    alternates: {
      canonical: `https://onlinetoolsbase.com/tools/category/${categorySlug}`,
    },
  };
}


export default async function CategoryPage({ params }: Props) {

  const resolvedParams = await params;
const categorySlug = resolvedParams.slug;

  const categoryName = categorySlug.replace(/-/g, " ");

  const tools = toolsData.filter(
    (t) => t.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  return (
    <main className="main-container py-10">
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        title={categoryName}
        category={categoryName}
        slug={`category/${categorySlug}`}
      />

      <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
      <p className="text-slate-100 mb-6 text-sm">
        Free online tools under: {categoryName}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card hover:border-blue-500/70 transition p-4"
          >
            <h2 className="font-semibold text-lg">{tool.title}</h2>
            <p className="text-sm text-slate-100 mt-1">{tool.description}</p>
          </a>
        ))}

        {tools.length === 0 && (
          <p className="text-slate-400 text-sm">No tools found in this category.</p>
        )}
      </div>
    </main>
  );
}
