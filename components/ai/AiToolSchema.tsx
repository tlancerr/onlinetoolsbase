"use client";

export default function AiToolSchema({
  title,
  description,
  category,
  slug,
}: {
  title: string;
  description: string;
  category: string;
  slug: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["WebApplication", "Tool"],
          name: title,
          url: `https://onlinetoolsbase.com/ai/${slug}`,
          description,
          applicationCategory: category,
          operatingSystem: "All",
        }),
      }}
    />
  );
}
