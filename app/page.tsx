

import toolsData from "../components/toolsData";
import SupportSection from "../components/SupportSection";
import AdSlot from "@/components/AdSlot";

type CategoryMeta = {
  icon: string;
  description: string;
  colorClass: string;
};

const categoryMeta: Record<string, CategoryMeta> = {
  "Time and Age Tools": {
    icon: "⏱️",
    description: "Calculates age, time differences and important dates.",
    colorClass: "bg-purple-500/10 border-purple-500/40 text-purple-100",
  },
  "Finance Tools": {
    icon: "💰",
    description: "Loans, interest, EMIs, SIPs and investment calculators.",
    colorClass: "bg-emerald-500/10 border-emerald-500/40 text-emerald-100",
  },
  "Text Tools": {
    icon: "🔤",
    description: "Format, clean and analyze your text content.",
    colorClass: "bg-sky-500/10 border-sky-500/40 text-sky-100",
  },
  "Image Tools": {
    icon: "🖼️",
    description: "Compress, resize, crop and convert images easily.",
    colorClass: "bg-yellow-500/10 border-yellow-500/40 text-yellow-100",
  },
  "Social Media Tools": {
    icon: "📱",
    description: "Social media downloads, hashtags, previews and more.",
    colorClass: "bg-pink-500/10 border-pink-500/40 text-pink-100",
  },
  "PDF Tools": {
  icon: "📄",
  description: "Convert, compress, extract and edit PDF documents online.",
  colorClass: "bg-red-500/10 border-red-500/40 text-red-100",
},
"SEO Tools": {
  icon: "📈",
  description: "Free SEO tools to analyze, optimize and improve your website rankings.",
  colorClass: "bg-green-500/10 border-green-500/40 text-green-100",
},
 "Converter Tools": {
    icon: "🔁",
    description: "Convert units like length, weight, temperature and more.",
    colorClass: "bg-indigo-500/10 border-indigo-500/40 text-indigo-100",
  },

  "Math Tools": {
    icon: "➗",
    description: "Math calculators for percentages, averages, fractions and more.",
    colorClass: "bg-cyan-500/10 border-cyan-500/40 text-cyan-100",
  },

  "Health and Fitness Tools": {
    icon: "🏃",
    description: "Health, fitness and nutrition calculators for daily tracking.",
    colorClass: "bg-lime-500/10 border-lime-500/40 text-lime-100",
  },

  "Security Tools": {
    icon: "🔐",
    description: "Password, hash and security-related online tools.",
    colorClass: "bg-orange-500/10 border-orange-500/40 text-orange-100",
  },
};

const categories = Array.from(
  new Set(
    toolsData
      .map((t) => t.category.trim())
      .filter((c) =>
        ["Time and Age Tools", "Finance Tools", "Text Tools", "Image Tools", "Social Media Tools", "PDF Tools", "SEO Tools", "Converter Tools", "Math Tools", "Health and Fitness Tools","Security Tools"]
          .includes(c)
      )
  )
);


export default function HomePage() {
  const categories = Array.from(new Set(toolsData.map((t) => t.category)));

  const popularTools = toolsData
    .filter((t) => t.popular)
    .slice(0, 8);

  return (
    <div className="main-container py-10 lg:py-14 space-y-10">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-[1.7fr,1.1fr] items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-50">
            All your{" "}
            <span className="text-blue-400">online tools</span> in one clean
            website.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            OnlineToolsBase helps you convert, calculate, format and optimize —
            for text, images, PDFs, finance, social media and more. Fast, free
            and simple to use on any device.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">

            <span className="badge">No login required</span>
            <span className="badge">Mobile friendly</span>
            <span className="badge">Free forever</span>
          </div>
        </div>

        {/* QUICK ACCESS POPULAR TOOLS */}
        <div className="card quick-access-card space-y-3">

          <p className="text-sm text-slate-100">
            Quick access to popular tools:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {popularTools.map((tool) => (
              <a
  key={tool.slug}
  href={`/tools/${tool.slug}`}
  className="popular-btn rounded-lg border border-slate-700 bg-slate-100 px-3 py-2 hover:border-blue-500/70 hover:text-slate-100"
> 

                {tool.title}
              </a>
            ))}
            {popularTools.length === 0 && (
              <span className="text-[11px] text-slate-400">
                Mark tools with <code>popular: true</code> in toolsData.ts to
                show them here.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* OPTIONAL ADSENSE PLACEHOLDER */
     <section>
       <AdSlot
    slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID || "1769096713"}
    minHeight={280}
  />

      </section> 
 } 
      {/* CATEGORIES */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-slate-50">
          Browse tools by category
        </h2>
        <p className="mb-4">
          Click a category to explore all related tools on OnlineToolsBase.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {categories.map((cat) => {
    const tools = toolsData.filter((t) => t.category === cat);
    const meta =
      categoryMeta[cat] ||
      ({
        icon: "🛠️",
        description: "Useful utilities for everyday tasks.",
        colorClass: "bg-slate-800/60 border-slate-600/60 text-slate-100",
      } as CategoryMeta);

    const categorySlug = cat.toLowerCase().replace(/\s+/g, "-");

    return (
      <a
        key={cat}
        href={`/tools/category/${categorySlug}`}
        className={`category-card rounded-xl border p-4 flex flex-col gap-3 ${meta.colorClass} hover:border-blue-500/70 transition`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{meta.icon}</span>
            <h3 className="text-sm font-semibold">{cat}</h3>
          </div>
          <span className="text-[11px] opacity-80">{tools.length} tools</span>
        </div>

        <p className="text-[11px] opacity-90">{meta.description}</p>

        <div className="flex flex-wrap gap-1 text-[11px]">
          {tools.slice(0, 6).map((tool) => (
            <span
              key={tool.slug}
              className="rounded-full bg-slate-900/50 px-2 py-1"
            >
              {tool.title}
            </span>
          ))}

          {tools.length > 6 && (
            <span className="text-[11px] opacity-90">
              +{tools.length - 6} more
            </span>
          )}
        </div>
      </a>
    );
  })}
</div>

      </section>
      <SupportSection />


    </div>
  );

  
}
