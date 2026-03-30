export interface AiToolItem {
  title: string
  slug: string
  category: string
  description: string
  seoTitleTemplate: string
  seoDescriptionTemplate: string
  longDescription: string
  faqs?: { q: string; a: string }[]
  howtoSteps?: string[]
  popular?: boolean
}

export const aiToolsData: AiToolItem[] = [
  {
    title: "AI Internal Linking Tool",
    slug: "internal-linking",
    category: "AI SEO Tools",
    popular: true,
    description:
      "Generate internal linking suggestions, anchor text ideas, and placement recommendations for your articles.",
    seoTitleTemplate:
      "AI Internal Linking Tool — Generate Smart Internal Links",
    seoDescriptionTemplate:
      "Use this AI Internal Linking Tool to generate smart anchor text, internal link opportunities, and placement suggestions for SEO.",
    longDescription: `The AI Internal Linking Tool helps you discover relevant internal linking opportunities inside your article content. Internal links improve crawlability, topic relevance, user navigation, and ranking strength when used properly.

Paste your article content along with a list of target URLs, and the tool will suggest where to place links, which anchor text to use, and how to keep the linking structure natural. This is useful for bloggers, affiliate marketers, agencies, publishers, and SEO teams managing content at scale.

If you also want to optimize titles and descriptions, use the <a href="/ai/meta-generator" title="AI Meta Generator">AI Meta Generator</a>. To create structured data for the same page, use the <a href="/ai/schema-generator" title="AI Schema Generator">AI Schema Generator</a>.`,
    faqs: [
      {
        q: "How does the AI Internal Linking Tool work?",
        a: "It analyzes your article content and target URLs, then suggests relevant anchor text and placement ideas for internal links.",
      },
      {
        q: "Are the internal link suggestions SEO-friendly?",
        a: "Yes. The tool is designed to suggest contextual, natural internal linking opportunities rather than forced anchors.",
      },
      {
        q: "Can I use this for blog posts and landing pages?",
        a: "Yes. It works well for blog posts, SEO landing pages, affiliate content, and informational articles.",
      },
    ],
    howtoSteps: [
      "Paste your full article content into the input box.",
      "Paste your target URLs, one per line.",
      "Click Generate Internal Links.",
      "Review the suggested anchors and placements before publishing.",
    ],
  },
  {
    title: "AI Meta Generator",
    slug: "meta-generator",
    category: "AI SEO Tools",
    popular: true,
    description:
      "Generate SEO title tags, meta descriptions, and H1 ideas instantly.",
    seoTitleTemplate:
      "AI Meta Generator — Generate SEO Titles and Meta Descriptions",
    seoDescriptionTemplate:
      "Generate SEO-friendly title tags, meta descriptions, and H1 variations instantly with this AI Meta Generator.",
    longDescription: `The AI Meta Generator helps you create SEO-friendly meta titles, meta descriptions, and H1 variations for articles, landing pages, and product pages. Well-written metadata improves click-through rate and helps search engines understand page intent.

Enter your target keyword and optional page context to generate multiple optimized title and description options instantly. This is useful for SEO writers, agencies, bloggers, SaaS teams, and site owners who want faster content optimization.

If you are also improving page structure and internal links, use the <a href="/ai/internal-linking" title="AI Internal Linking Tool">AI Internal Linking Tool</a>. If you need structured data output, use the <a href="/ai/schema-generator" title="AI Schema Generator">AI Schema Generator</a>.`,
    faqs: [
      {
        q: "What does the AI Meta Generator create?",
        a: "It generates title tags, meta descriptions, and H1 heading ideas based on your keyword and content context.",
      },
      {
        q: "Are the generated titles within SEO length limits?",
        a: "Yes. The prompts are designed to produce titles and descriptions close to recommended SEO length limits.",
      },
      {
        q: "Can I use it for homepage, blog, and service pages?",
        a: "Yes. It works for blog posts, product pages, service pages, category pages, and more.",
      },
    ],
    howtoSteps: [
      "Enter your primary target keyword.",
      "Optionally paste content context or page summary.",
      "Click Generate SEO Meta.",
      "Choose the best version and adapt it if needed.",
    ],
  },
  {
    title: "AI Schema Generator",
    slug: "schema-generator",
    category: "AI SEO Tools",
    description:
      "Generate JSON-LD structured data for FAQ, Article, Product, and more.",
    seoTitleTemplate:
      "AI Schema Generator — Generate JSON-LD Structured Data",
    seoDescriptionTemplate:
      "Generate valid JSON-LD schema for FAQ, Article, Product, and Local Business pages instantly with AI.",
    longDescription: `The AI Schema Generator helps you create structured data in JSON-LD format for common SEO use cases such as FAQ, Article, Product, and Local Business pages. Schema markup helps search engines better understand your content and may improve rich result eligibility.

Choose the schema type, paste your content, and generate structured data instantly. This is especially useful for SEO professionals, publishers, local businesses, agencies, and site owners implementing markup without writing JSON-LD manually.

To optimize metadata for the same page, use the <a href="/ai/meta-generator" title="AI Meta Generator">AI Meta Generator</a>. If you want better internal linking for that page too, use the <a href="/ai/internal-linking" title="AI Internal Linking Tool">AI Internal Linking Tool</a>.`,
    faqs: [
      {
        q: "Which schema types are supported?",
        a: "The tool can generate structured data for FAQ, Article, Product, Local Business, and other common page types.",
      },
      {
        q: "Does the tool return JSON-LD format?",
        a: "Yes. It is designed to produce JSON-LD markup that can be added to your page.",
      },
      {
        q: "Should I validate the schema after generating?",
        a: "Yes. It is always best to validate the output before publishing.",
      },
    ],
    howtoSteps: [
      "Choose the schema type you want to generate.",
      "Paste the relevant page content or data.",
      "Click Generate Schema.",
      "Review and validate the JSON-LD before adding it to your site.",
    ],
  },
]

export default aiToolsData
