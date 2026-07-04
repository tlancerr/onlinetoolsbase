import { MetadataRoute } from "next";
import { toolsData } from "../components/toolsData";

// Helper function to safely force any string/date into clean W3C YYYY-MM-DD format
function formatW3CDate(dateInput: any): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toISOString().split("T")[0]; // Fallback to current date
    }
    return d.toISOString().split("T")[0]; // Outputs clean "YYYY-MM-DD"
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

async function getBlogPosts() {
  const res = await fetch(
    "https://onlinetoolsbase.com",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://onlinetoolsbase.com";
  
  // Clean baseline date string
  const todayFormatted = formatW3CDate(new Date());

  const uniqueCategories = Array.from(
    new Set(toolsData.map((t) => t.category))
  );

  const categoryPages = uniqueCategories.map((cat) => ({
    url: `${domain}/tools/category/${cat.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: todayFormatted,
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
  ].map((path) => ({
    url: `${domain}${path}`,
    lastModified: todayFormatted,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolPages = toolsData.map((tool) => ({
    url: `${domain}/tools/${tool.slug}`,
    lastModified: todayFormatted,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const posts = await getBlogPosts();

  const blogPages = posts.map((post: any) => ({
    url: `${domain}/blog/${post.slug}`,
    // FIXED: Safely sanitize the WordPress modification string to protect against Line 743 errors
    lastModified: formatW3CDate(post.modified || post.date || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...blogPages,
  ];
}
