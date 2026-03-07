async function getPost(slug: string) {
  const res = await fetch(
  `https://cms.onlinetoolsbase.com/wp-json/wp/v2/posts?slug=${slug}&_embed=1`,
  { cache: "no-store" }
);

  const data = await res.json();
  return data[0];
}

export default async function BlogPost({ params }: any) {

  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">

      <h1
        className="text-4xl font-bold mb-6"
        dangerouslySetInnerHTML={{
          __html: post.title.rendered,
        }}
      />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />

    </div>
  );
}
