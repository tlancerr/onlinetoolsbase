"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

function extractVideoId(url: string) {
  const reg =
    /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(reg);
  return match ? match[1] : null;
}

export default function YouTubeThumbnailTool() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumb, setThumb] = useState("");

  function generate() {
    const id = extractVideoId(videoUrl);
    if (!id) {
      alert("Invalid YouTube URL");
      return;
    }

    setThumb(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  }

  return (
    <ToolLayout
      title="YouTube Thumbnail Preview"
      description="Preview HD YouTube video thumbnails instantly."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Paste YouTube URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Show Thumbnail
        </button>

        {thumb && (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt="Thumbnail" className="rounded-lg" />

            <a
              href={thumb}
              target="_blank"
              className="btn-primary block text-center"
            >
              Open Full Image
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
