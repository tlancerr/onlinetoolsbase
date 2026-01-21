"use client";

export default function ToolSchema({
  title,
  description,
  category,
  slug
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
          url: `https://onlinetoolsbase.com/tools/${slug}`,
          description: description,
          applicationCategory: category,
          operatingSystem: "All"
        })
      }}
    />
  );
}
