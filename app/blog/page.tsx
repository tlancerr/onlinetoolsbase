import Link from "next/link";

async function getPosts() {
  const res = await fetch(
    "https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?per_page=10",
    { next: { revalidate: 3600 } }
  );

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto max-w-4xl py-10">

      <h1 className="text-4xl font-bold mb-8">
        OnlineToolsBase Blog
      </h1>

      <div className="space-y-8">

        {posts.map((post: any) => (
          <article key={post.id}>

            <Link href={`/blog/${post.slug}`}>
              <h2
                className="text-2xl font-semibold hover:text-blue-600"
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
              />
            </Link>

            <div
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />

          </article>
        ))}

      </div>
    </div>
  );
}
