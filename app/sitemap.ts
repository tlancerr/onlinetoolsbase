import { MetadataRoute } from "next";
import { toolsData } from "../components/toolsData";

// Safe date formatter that will NEVER fail or crash the compilation build
function safeDate(dateInput: any): string {
  try {
    if (!dateInput) return new Date().toISOString().split("T")[0];
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split("T")[0];
    }
    return d.toISOString().split("T")[0]; // Outputs clean "YYYY-MM-DD" standard for GSC
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

// Fetch posts from Blog CMS (cms.cottagecore.pk)
async function getBlogPosts() {
  try {
    const res = await fetch(
      "https://cms.cottagecore.pk/wp-json/wp/v2/posts?per_page=100",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return [];
    }

    return await res.json();
  } catch (error) {
    return [];
  }
}

// Fetch posts from News CMS (real.cottagecore.pk)
async function getNewsPosts() {
  try {
    const res = await fetch(
      "https://real.cottagecore.pk/wp-json/wp/v2/posts?per_page=100",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return [];
    }

    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://onlinetoolsbase.com";
  const now = safeDate(new Date());

  const uniqueCategories = Array.from(
    new Set(toolsData.map((t) => t.category))
  );

  const categoryPages = uniqueCategories.map((cat) => ({
    url: `${domain}/tools/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/blog",
    "/news", // Added static /news page
  ].map((path) => ({
    url: `${domain}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolPages = toolsData.map((tool) => ({
    url: `${domain}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Fetch both Blog and News posts concurrently
  const [blogPosts, newsPosts] = await Promise.all([
    getBlogPosts(),
    getNewsPosts(),
  ]);

  // Dynamic Blog URLs
  const blogPages = Array.isArray(blogPosts)
    ? blogPosts.map((post: any) => ({
        url: `${domain}/blog/${post.slug}`,
        lastModified: safeDate(post.modified || post.date || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    : [];

  // Dynamic News URLs
  const newsPages = Array.isArray(newsPosts)
    ? newsPosts.map((post: any) => ({
        url: `${domain}/news/${post.slug}`,
        lastModified: safeDate(post.modified || post.date || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    : [];

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
    ...newsPages,
  ];
}
