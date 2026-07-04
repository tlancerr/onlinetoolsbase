import { toolsData } from "@/components/toolsData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. ADD THIS FUNCTION: Compiles your category pages into 100% static HTML at build time
export async function generateStaticParams() {
  // Extract unique categories from toolsData, format them to match your URL slugs
  const uniqueCategories = Array.from(
    new Set(toolsData.map((t) => t.category.toLowerCase().replace(/\s+/g, "-")))
  );
  
  return uniqueCategories.map((slug) => ({
    slug: slug,
  }));
}

// 2. STOPS CRAWLERS from indexing broken, non-existent category strings
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;
  
  // Format the category name neatly (capitalizing words improves indexing authority)
  const categoryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${categoryName} Tools — OnlineToolsBase`,
    description: `Explore free online ${categoryName} tools on OnlineToolsBase. Fast, clean, mobile-friendly tools.`,
    alternates: {
      canonical: `https://onlinetoolsbase.com/tools/category/${categorySlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug;

  // Format name neatly for UI rendering
  const categoryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Filter tools matching this category slug
  const tools = toolsData.filter(
    (t) => t.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  return (
    <main className="main-container py-10">
      <BreadcrumbSchema
        title={categoryName}
        category={categoryName}
        slug={`category/${categorySlug}`}
      />

      <h1 className="text-3xl font-bold mb-2">{categoryName} Tools</h1>
      <p className="text-slate-400 mb-6 text-sm">
        Free online tools under: {categoryName}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card hover:border-blue-500/70 transition p-4 border border-slate-800 rounded bg-slate-900"
          >
            <h2 className="font-semibold text-lg text-white">{tool.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{tool.description}</p>
          </a>
        ))}

        {tools.length === 0 && (
          <p className="text-slate-400 text-sm">No tools found in this category.</p>
        )}
      </div>
    </main>
  );
}
