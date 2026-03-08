export async function getBlogCategories() {
  const res = await fetch(
    "https://cms.onlinetoolsbase.com/wp-json/wp/v2/categories?per_page=100",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data.map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
  }));
}
