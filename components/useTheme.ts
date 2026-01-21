"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Read from localStorage on first load
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("otb-theme") as Theme | null;
      const initial: Theme = stored === "light" || stored === "dark" ? stored : "dark";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem("otb-theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  }

  return { theme, toggleTheme };
}
