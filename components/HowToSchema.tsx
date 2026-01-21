"use client";

export default function HowToSchema({
  title,
  steps,
  slug
}: {
  title: string;
  steps: string[];
  slug: string;
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `How to use the ${title}`,
          "step": steps.map((s) => ({
            "@type": "HowToStep",
            "text": s
          })),
          "url": `https://onlinetoolsbase.com/tools/${slug}`
        })
      }}
    />
  );
}
