export async function getNewsCategories() {
  try {
    const res = await fetch(
      "https://real.cottagestore.pk/wp-json/wp/v2/categories?per_page=100",
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.map((cat: any) => ({
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch news categories:", error);
    return [];
  }
}
