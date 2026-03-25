import Link from "next/link";
import { notFound } from "next/navigation";

async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `https://cms.onlinetoolsbase.com/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function getPostsByCategory(categoryId: number) {
  const res = await fetch(
    `https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20&_embed=1`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) return [];
  return res.json();
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | OnlineToolsBase",
    };
  }

  return {
    title: `${category.name} Articles | OnlineToolsBase`,
    description: `Browse the latest ${category.name} articles on OnlineToolsBase.`,
    alternates: {
      canonical: `https://onlinetoolsbase.com/blog/category/${category.slug}`,
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <Link href="/blog" className="text-sm hover:underline">
          ← Back to Blog
        </Link>

        <h1 className="mt-3 text-3xl font-bold">{category.name}</h1>

        {category.description ? (
          <p className="mt-2 text-gray-600">
            {stripHtml(category.description)}
          </p>
        ) : null}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found in this category yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post: any) => {
            const featuredImage =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <article
                key={post.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                {featuredImage ? (
                  <Link href={`/blog/${post.slug}`}>
                    <img
                      src={featuredImage}
                      alt={post.title?.rendered || "Blog image"}
                      className="mb-4 h-52 w-full rounded-lg object-cover"
                    />
                  </Link>
                ) : null}

                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>

                <p className="mt-3 text-gray-700">
                  {stripHtml(post.excerpt.rendered).slice(0, 180)}...
                </p>

                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
