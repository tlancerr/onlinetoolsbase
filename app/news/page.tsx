import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 300;

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("WP fetch failed:", res.status, res.statusText, url);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("WP fetch error:", url, error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function getPosts() {
  // Pointing to your automated news subdomain source
  return fetchWithTimeout(
    "https://real.cottagestore.pk/wp-json/wp/v2/posts?per_page=12&_embed=1"
  );
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function NewsPage() {
  const posts = await getPosts() || []; // Added fallback array if fetch fails

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Latest News</h1>
        <p className="mt-2 text-gray-600">
          Stay updated with the latest trends and stories from OnlineToolsBase News.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No news articles found.</p>
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
                  <Link href={`/news/${post.slug}`}>
                    <img
                      src={image}
                      alt={post.title?.rendered || "News image"}
                      className="mb-4 h-56 w-full rounded-lg object-cover"
                    />
                  </Link>
                )}

                <h2 className="text-2xl font-semibold">
                  <Link href={`/news/${post.slug}`} className="hover:underline">
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
                    href={`/news/${post.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    Read full article →
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
