"use client";

export default function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }),
      }}
    />
  );
}
