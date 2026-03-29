"use client";

import Link from "next/link";
import toolsData from "./toolsData";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTheme } from "./useTheme";
import Image from "next/image";
import { getBlogCategories } from "../lib/getBlogCategories";

/* ---------- debounce hook (local, lightweight) ---------- */
function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export default function SiteHeader() {
  const [blogCategories, setBlogCategories] = useState<
    { name: string; slug: string }[]
  >([]);

  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // Category panel state (CLICK-based, not hover)
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  // Blog dropdown state
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const blogMenuRef = useRef<HTMLDivElement>(null);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string>("");

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Container ref for chips + overlay panel, used to detect outside clicks
  const categoryRef = useRef<HTMLDivElement>(null);

  // Mobile panel ref to detect outside clicks
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebouncedValue(query, 300);

  /* ---------- close search dropdown on outside click ---------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setQuery("");
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- ESC key closes search dropdown + category panel + mobile panel + blog menu ---------- */
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Search
        setQuery("");
        setActiveIndex(-1);
        inputRef.current?.blur();

        // Tool category panel
        setPanelOpen(false);
        setActiveCategory(null);
        setHoverCategory(null);

        // Blog menu
        setBlogMenuOpen(false);

        // Mobile menu
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* --------- blog categories pull from wordpress -------- */
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getBlogCategories();
        setBlogCategories(cats);
      } catch (err) {
        console.error("Failed to load blog categories", err);
      }
    }

    loadCategories();
  }, []);

  /* ---------- close category panel on outside click ---------- */
  useEffect(() => {
    function handleOutsideCategoryClick(e: MouseEvent) {
      if (!panelOpen) return;
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
        setActiveCategory(null);
        setHoverCategory(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideCategoryClick);
    return () => document.removeEventListener("mousedown", handleOutsideCategoryClick);
  }, [panelOpen]);

  /* ---------- close blog menu on outside click ---------- */
  useEffect(() => {
    function handleOutsideBlogMenuClick(e: MouseEvent) {
      if (!blogMenuOpen) return;
      if (blogMenuRef.current && !blogMenuRef.current.contains(e.target as Node)) {
        setBlogMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideBlogMenuClick);
    return () => document.removeEventListener("mousedown", handleOutsideBlogMenuClick);
  }, [blogMenuOpen]);

  /* ---------- close mobile panel on outside click ---------- */
  useEffect(() => {
    function handleOutsideMobileClick(e: MouseEvent) {
      if (!mobileOpen) return;
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideMobileClick);
    return () => document.removeEventListener("mousedown", handleOutsideMobileClick);
  }, [mobileOpen]);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const approvedCategories = [
    "Time and Age Tools",
    "Finance Tools",
    "Text Tools",
    "Image Tools",
    "Social Media Tools",
    "PDF Tools",
    "SEO Tools",
    "Converter Tools",
    "Math Tools",
    "Health and Fitness Tools",
    "Security Tools",
  ];

  const allCategories = Array.from(
    new Set(
      toolsData
        .map((t) => t.category.trim())
        .filter((c) => approvedCategories.includes(c))
    )
  );

  /* ---------- FILTERED RESULTS (debounced) ---------- */
  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase();
    return toolsData
      .filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [debouncedQuery]);

  const toolsByCategory = useMemo(() => {
    const map = new Map<string, { title: string; slug: string }[]>();
    for (const t of toolsData) {
      const cat = t.category?.trim();
      if (!cat || !allCategories.includes(cat)) continue;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push({ title: t.title, slug: t.slug });
    }
    return map;
  }, [allCategories]);

  /* ---------- KEYBOARD NAVIGATION ---------- */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!filtered.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/tools/${filtered[activeIndex].slug}`;
    }
  }

  // Click-to-open behavior for tool category panel
  function toggleCategory(cat: string) {
    if (panelOpen && activeCategory === cat) {
      setPanelOpen(false);
      setActiveCategory(null);
      setHoverCategory(null);
      return;
    }
    setActiveCategory(cat);
    setPanelOpen(true);
  }

  const panelCategory = activeCategory;
  const categorySlug = (c: string) => c.toLowerCase().replace(/\s+/g, "-");

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="main-container flex items-center justify-between py-3 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div>
            <Image
              src="/otb-logo160-160.svg"
              alt="OnlineToolsBase"
              width={190}
              height={190}
              priority
              className="rounded"
            />
            <span className="text-[12px] text-slate-400">
              <center>Free online tools & calculators</center>
            </span>
          </div>
        </Link>

        {/* Search (desktop only) */}
        <div
          ref={searchRef}
          className="relative hidden md:block min-w-[260px] max-w-sm"
        >
          <input
            ref={inputRef}
            className="tool-input text-xs pr-7"
            placeholder="Search tools (PDF, images, Instagram, loan...)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIndex(-1);
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
              aria-label="Clear search"
            >
              ✖
            </button>
          )}

          {/* Search Dropdown */}
          {filtered.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md border border-slate-700 bg-slate-900 max-h-64 overflow-auto z-20">
              {filtered.map((tool, i) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className={`search-item block px-3 py-2 text-xs ${
                    i === activeIndex ? "bg-[#64c1ff] text-white" : ""
                  }`}
                  onClick={() => {
                    setQuery("");
                    setActiveIndex(-1);
                  }}
                >
                  <div className="font-medium">{tool.title}</div>
                  <div className="text-[10px] opacity-80">{tool.category}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Tool category chips + overlay panel */}
          <div ref={categoryRef} className="mt-1 relative">
            <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
              {allCategories.map((cat) => {
                const isActive = panelOpen && activeCategory === cat;
                const isHover = hoverCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    onMouseEnter={() => setHoverCategory(cat)}
                    onMouseLeave={() => setHoverCategory(null)}
                    className={`rounded-full border px-2 py-0.5 transition-colors ${
                      isActive
                        ? "border-[#64c1ff] text-white"
                        : isHover
                        ? "border-slate-500"
                        : "border-slate-700"
                    }`}
                    aria-expanded={isActive}
                    aria-controls="category-panel"
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Overlay panel: absolute so header does NOT resize */}
            {panelOpen && panelCategory && (
              <div
                id="category-panel"
                className="absolute left-0 right-0 top-full mt-2 z-50 rounded-md border border-slate-800 bg-slate-950 shadow-lg"
                style={{ pointerEvents: "auto" }}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-white">
                      {panelCategory}
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/tools/category/${categorySlug(panelCategory)}`}
                        className="text-[11px] text-[#64c1ff] hover:underline"
                        onClick={() => {
                          setPanelOpen(false);
                          setActiveCategory(null);
                          setHoverCategory(null);
                        }}
                      >
                        View all
                      </Link>

                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-200 text-xs"
                        aria-label="Close category panel"
                        onClick={() => {
                          setPanelOpen(false);
                          setActiveCategory(null);
                          setHoverCategory(null);
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(toolsByCategory.get(panelCategory) ?? [])
                      .slice(0, 12)
                      .map((t) => (
                        <Link
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          className="rounded-md border border-slate-800 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-600 hover:bg-slate-900"
                          onClick={() => {
                            setPanelOpen(false);
                            setActiveCategory(null);
                            setHoverCategory(null);
                          }}
                        >
                          {t.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Desktop Blog dropdown */}
<div className="flex items-center gap-2">
  <div ref={blogMenuRef} className="relative hidden md:block">
    <button
      type="button"
      onClick={() => setBlogMenuOpen((v) => !v)}
      className="btn-secondary inline-flex h-9 items-center justify-center px-3 text-sm leading-none"
      aria-expanded={blogMenuOpen}
      aria-haspopup="menu"
    >
      Blog
    </button>

    {blogMenuOpen && (
      <div className="absolute right-0 top-full z-50 mt-2">
        <div className="min-w-[220px] w-max max-w-[280px] rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          <div className="py-2">
            <Link
              prefetch
              href="/blog"
              className="block w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-900 whitespace-nowrap"
              onClick={() => setBlogMenuOpen(false)}
            >
              All Articles
            </Link>

            {blogCategories.map((cat) => (
              <Link
                prefetch
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="block w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-900 whitespace-nowrap"
                onClick={() => setBlogMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>

  <Link
    href="/contact"
    className="hidden md:inline-flex btn-secondary h-9 items-center justify-center px-3 text-sm leading-none"
  >
    Contact
  </Link>
</div>

          {/* Mobile 3-dot menu */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((v) => !v);
              if (!mobileCategory && allCategories.length) {
                setMobileCategory(allCategories[0]);
              }
              setTimeout(() => mobileInputRef.current?.focus(), 50);
            }}
            className="md:hidden btn-secondary text-[13px] px-3 py-2"
            aria-label="Open tools menu"
            aria-expanded={mobileOpen}
          >
            ⋮
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-secondary text-[11px] px-2 py-1"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[999]">
          {/* dim background */}
          <div className="absolute inset-0 bg-black/40" />

          {/* panel */}
          <div
            ref={mobileRef}
            className="absolute top-16 left-1/2 -translate-x-1/2 w-[92vw] max-w-md rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="text-sm font-semibold text-white">Find tools</div>
              <button
                type="button"
                className="text-slate-300 hover:text-white text-lg leading-none"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Top quick links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/blog"
                  className="btn-secondary text-xs px-4 py-2 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  className="btn-secondary text-xs px-4 py-2 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Blog categories */}
              {blogCategories.length > 0 && (
                <div>
                  <div className="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
                    Blog Categories
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {blogCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/blog/category/${cat.slug}`}
                        className="rounded-md border border-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-900 text-center"
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Search */}
              <div className="relative">
                <input
                  ref={mobileInputRef}
                  className="tool-input text-xs pr-7 w-full"
                  placeholder="Search tools..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveIndex(-1);
                      mobileInputRef.current?.focus();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                    aria-label="Clear search"
                  >
                    ✖
                  </button>
                )}

                {filtered.length > 0 && (
                  <div className="mt-2 w-full rounded-md border border-slate-800 bg-slate-950 max-h-56 overflow-auto">
                    {filtered.map((tool, i) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className={`block px-3 py-2 text-xs ${
                          i === activeIndex
                            ? "bg-[#64c1ff] text-white"
                            : "text-slate-200"
                        }`}
                        onClick={() => {
                          setQuery("");
                          setActiveIndex(-1);
                          setMobileOpen(false);
                        }}
                      >
                        <div className="font-medium">{tool.title}</div>
                        <div className="text-[10px] opacity-80">{tool.category}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Tool category select + go */}
              <div className="flex gap-2 items-center">
                <select
                  className="tool-input text-xs w-full"
                  value={mobileCategory || (allCategories[0] ?? "")}
                  onChange={(e) => setMobileCategory(e.target.value)}
                >
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <Link
                  href={`/tools/category/${categorySlug(
                    mobileCategory || allCategories[0] || ""
                  )}`}
                  className="btn-secondary text-xs px-4 py-2 whitespace-nowrap"
                  onClick={() => setMobileOpen(false)}
                >
                  Go
                </Link>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Tip: Use search to jump directly to a tool, browse tool categories,
                or explore blog topics.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
