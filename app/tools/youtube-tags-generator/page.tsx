"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function YouTubeTagsGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState("");

  function generate() {
    if (!keyword.trim()) return;

    const base = keyword
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ");

    const output = [
      keyword,
      `${keyword} tutorial`,
      `${keyword} guide`,
      `${keyword} tips`,
      `${keyword} explained`,
      `${base[0]} tips`,
      `${base[0]} tutorial`,
      `${base.join(" ")} review`,
      `${base.join(" ")} beginners`,
      `${base[0]} hacks`,
      `${base[0]} ideas`,
      `${base[0]} 2025`,
    ].join(", ");

    setTags(output);
  }

  return (
    <ToolLayout
      title="YouTube Tags Generator"
      description="Generate optimized YouTube tags using your keyword."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (example: digital marketing)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Tags
        </button>

        {tags && (
          <textarea
            className="tool-input min-h-[200px]"
            value={tags}
            readOnly
          />
        )}
      </div>
    </ToolLayout>
  );
}
