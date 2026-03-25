import Link from "next/link";

async function getPosts() {
  const res = await fetch(
    "https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?per_page=12&_embed=1&_fields=id,slug,title,excerpt,date,_embedded",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">OnlineToolsBase Blog</h1>
        <p className="mt-2 text-gray-600">
          Articles, guides, and updates from OnlineToolsBase.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post: any) => {
            const image =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <article
                key={post.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                {image && (
                  <Link href={`/blog/${post.slug}`}>
                    <img
                      src={image}
                      alt={post.title?.rendered || "Blog image"}
                      className="mb-4 h-56 w-full rounded-lg object-cover"
                    />
                  </Link>
                )}

                <h2 className="text-2xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
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
