import { notFound } from "next/navigation";
import Link from "next/link";

async function getPost(slug: string) {
  const res = await fetch(
    `https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
    { next: { revalidate: 300 } }
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
      title: "Post Not Found | OnlineToolsBase",
    };
  }

  return {
    title: `${stripHtml(post.title.rendered)} | OnlineToolsBase Blog`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    alternates: {
      canonical: `https://onlinetoolsbase.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
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
    "@type": "BlogPosting",
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
    mainEntityOfPage: `https://onlinetoolsbase.com/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mb-6">
        <Link href="/blog" className="text-sm hover:underline">
          ← Back to Blog
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

      <article
  className="wp-content mt-9"
  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
/>
    </main>
  );
}
