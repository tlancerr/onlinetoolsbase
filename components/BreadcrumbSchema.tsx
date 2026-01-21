"use client";

export default function BreadcrumbSchema({
  title,
  category,
  slug
}: {
  title: string;
  category: string;
  slug: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://onlinetoolsbase.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": category,
              "item": `https://onlinetoolsbase.com/tools/category/${category
                .toLowerCase()
                .replace(/\s+/g, "-")}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": title,
              "item": `https://onlinetoolsbase.com/tools/${slug}`
            }
          ]
        })
      }}
    />
  );
}
