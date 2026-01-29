"use client";

import Link from "next/link";
import toolsData from "./toolsData";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTheme } from "./useTheme";
import Image from "next/image";

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
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  // Category panel state (CLICK-based, not hover)
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  // Mobile menu (3-dots)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string>("");

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Container ref for chips + overlay panel, used to detect outside clicks
  const categoryRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebouncedValue(query, 300);

  /* ---------- close search dropdown on outside click ---------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // Desktop search
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setQuery("");
        setActiveIndex(-1);
      }
      // Mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- ESC key closes search dropdown + category panel + mobile menu ---------- */
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Search
        setQuery("");
        setActiveIndex(-1);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();

        // Category panel
        setPanelOpen(false);
        setActiveCategory(null);
        setHoverCategory(null);

        // Mobile menu
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* ---------- close category panel on outside click ---------- */
  useEffect(() => {
    function handleOutsideCategoryClick(e: MouseEvent) {
      if (!panelOpen) return;
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setPanelOpen(false);
        setActiveCategory(null);
        setHoverCategory(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideCategoryClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideCategoryClick);
  }, [panelOpen]);

  // IMPORTANT: category names must match toolsData EXACTLY
  const approvedCategories = [
    "Time and Age Tools",
    "Finance Tools",
    "Text Tools",
    "Image Tools",
    "Social Media Tools",
    "PDF Tools",
    "SEO Tools", // ✅ FIXED (was "Seo Tools")
    "Converter Tools",
    "Math Tools",
    "Health and Fitness Tools",
    "Security Tools",
  ];

  const allCategories = Array.from(
    new Set(
      toolsData
        .map((t) => (t.category || "").trim())
        .filter((c) => approvedCategories.includes(c))
    )
  );

  // initialize mobile category (first available)
  useEffect(() => {
    if (!mobileCategory && allCategories.length) {
      setMobileCategory(allCategories[0]);
    }
  }, [allCategories, mobileCategory]);

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

  // Click-to-open behavior for category panel
  function toggleCategory(cat: string) {
    // If clicking same active category, toggle open/close
    if (panelOpen && activeCategory === cat) {
      setPanelOpen(false);
      setActiveCategory(null);
      setHoverCategory(null);
      return;
    }
    setActiveCategory(cat);
    setPanelOpen(true);
  }

  const panelCategory = activeCategory; // single source of truth for panel content

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

        {/* Desktop Search + Categories */}
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

          {/* Category chips + overlay panel (CLICK-based) */}
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
                        href={`/tools/category/${panelCategory
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
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

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Mobile 3-dots menu */}
          <div ref={mobileMenuRef} className="relative md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="btn-secondary text-[14px] px-3 py-2"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              ⋮
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-[92vw] max-w-[360px] rounded-md border border-slate-800 bg-slate-950 shadow-lg z-50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-white">Tools</div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-200 text-xs"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✖
                  </button>
                </div>

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
                    <div className="mt-2 w-full rounded-md border border-slate-800 bg-slate-900 max-h-56 overflow-auto">
                      {filtered.map((tool, i) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className={`block px-3 py-2 text-xs ${
                            i === activeIndex ? "bg-[#64c1ff] text-white" : ""
                          }`}
                          onClick={() => {
                            setQuery("");
                            setActiveIndex(-1);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <div className="font-medium">{tool.title}</div>
                          <div className="text-[10px] opacity-80">
                            {tool.category}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Category Dropdown */}
                <div className="mt-3">
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Category
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="tool-input text-xs w-full"
                      value={mobileCategory}
                      onChange={(e) => setMobileCategory(e.target.value)}
                    >
                      {allCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="btn-primary text-xs px-3"
                      onClick={() => {
                        if (!mobileCategory) return;
                        const path = `/tools/category/${mobileCategory
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        window.location.href = path;
                      }}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
    </header>
  );
}
