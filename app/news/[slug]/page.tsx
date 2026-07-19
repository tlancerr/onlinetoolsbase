import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown"; // 1. Import the markdown component

async function getPost(slug: string) {
  const res = await fetch(
    `https://real.cottagestore.pk/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    { 
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      next: { revalidate: 300 } 
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
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
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "News Article Not Found | OnlineToolsBase",
    };
  }

  return {
    title: `${stripHtml(post.title.rendered)} | OnlineToolsBase News`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    alternates: {
      canonical: `https://www.onlinetoolsbase.com/news/${post.slug}`,
    },
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const featuredImage =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered),
    datePublished: post.date,
    dateModified: post.modified,
    image: featuredImage ? [featuredImage] : [],
    author: {
      "@type": "Organization",
      name: "OnlineToolsBase",
    },
    publisher: {
      "@type": "Organization",
      name: "OnlineToolsBase",
    },
    mainEntityOfPage: `https://www.onlinetoolsbase.com/news/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mb-6">
        <Link href="/news" className="text-sm hover:underline text-gray-600">
          ← Back to News
        </Link>
      </div>

      {featuredImage && (
        <img
          src={featuredImage}
          alt={stripHtml(post.title.rendered)}
          className="mb-6 h-auto w-full rounded-xl object-cover"
        />
      )}

      <h1 className="text-4xl font-bold">
        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </h1>

      <p className="mt-3 text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {/* 2. Replaced raw HTML wrapper with the ReactMarkdown parser component */}
      <article className="wp-content mt-8 prose max-w-none text-slate-200 space-y-4">
        <ReactMarkdown>{stripHtml(post.content.rendered)}</ReactMarkdown>
      </article>
    </main>
  );
}
