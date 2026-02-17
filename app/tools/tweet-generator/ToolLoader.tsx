"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [avatar, setAvatar] = useState("");
  const [content, setContent] = useState("This is a fake tweet generated on onlinetoolsbase.com 😄");
  const [likes, setLikes] = useState("123");
  const [retweets, setRetweets] = useState("45");
  const [replies, setReplies] = useState("6");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-3">
          <input
            className="tool-input"
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="tool-input"
            placeholder="Username (without @)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="tool-input"
            placeholder="Avatar URL (optional)"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <textarea
            className="tool-input min-h-[100px]"
            placeholder="Tweet content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              className="tool-input"
              placeholder="Replies"
              value={replies}
              onChange={(e) => setReplies(e.target.value)}
            />
            <input
              className="tool-input"
              placeholder="Retweets"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
            <input
              className="tool-input"
              placeholder="Likes"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              className={`btn-primary flex-1 ${
                theme === "light" ? "" : "opacity-50"
              }`}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              className={`btn-primary flex-1 ${
                theme === "dark" ? "" : "opacity-50"
              }`}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Tip: Use your computer’s screenshot tool to save the tweet as an
            image.
          </p>
        </div>

        {/* Preview */}
        <div className="flex items-start justify-center">
          <div
            className={`w-full max-w-md rounded-2xl border ${
              theme === "dark"
                ? "bg-[#000000] border-slate-700 text-white"
                : "bg-white border-slate-300 text-black"
            } p-4 space-y-3`}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-500 overflow-hidden flex items-center justify-center text-white text-sm">
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold leading-tight">{name}</span>
                <span className="text-xs text-slate-400">@{username}</span>
              </div>
            </div>

            <div className="text-sm whitespace-pre-wrap break-words">
              {content}
            </div>

            <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-700/40">
              <span>{replies} Replies</span>
              <span>{retweets} Retweets</span>
              <span>{likes} Likes</span>
            </div>
          </div>
        </div>
      </div>
  );
}
