"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

export default function MetaGeneratorTool() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageText, setUsageText] = useState(
    "Guest users can try a few free runs."
  );
  const [gateMessage, setGateMessage] = useState("");
  const [showGateModal, setShowGateModal] = useState(false);
  const [gateType, setGateType] = useState<"login" | "upgrade" | null>(null);

  const handleClear = () => {
    setKeyword("");
    setContent("");
    setResult("");
    setGateMessage("");
    setShowGateModal(false);
    setGateType(null);
  };

  const handleSave = async () => {
    if (!result.trim()) return;

    const inputText = `Keyword: ${keyword}\nContext: ${content || "-"}`;

    const res = await fetch("/api/ai/save-output", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toolSlug: "meta-generator",
        input: inputText,
        output: result,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      if (data.code === "LOGIN_REQUIRED") {
        setGateMessage("Create a free account to save outputs.");
        setGateType("login");
        setShowGateModal(true);
        return;
      }

      alert(data.error || "Could not save output.");
      return;
    }

    alert("Output saved successfully.");
  };

  const runAI = async () => {
    if (!keyword.trim()) {
      setResult("Please enter a target keyword.");
      return;
    }

    try {
      setLoading(true);
      setResult("");
      setGateMessage("");
      setShowGateModal(false);
      setGateType(null);

      const res = await fetch("/api/ai/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolSlug: "meta-generator",
          prompt: `
You are an expert SEO specialist.

Generate:
1. 5 SEO optimized title tags (max 60 characters)
2. 5 meta descriptions (max 155 characters)
3. 3 H1 variations

Keyword: ${keyword}

Context (optional):
${content}
          `,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data: any;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response from /api/ai/run:", text);
        setResult("Server returned non-JSON response. Check backend logs.");
        return;
      }

      if (!data.ok) {
        if (data.code === "LOGIN_REQUIRED") {
          setGateMessage(data.message || "Sign in to continue.");
          setUsageText(
            `Guest limit reached: ${data.usageCount ?? 0}/${data.limit ?? 2}`
          );
          setGateType("login");
          setShowGateModal(true);
          setResult("");
          return;
        }

        if (data.code === "UPGRADE_REQUIRED") {
          setGateMessage(data.message || "Upgrade required.");
          setUsageText(
            `Free account limit reached: ${data.usageCount ?? 0}/${data.limit ?? 5}`
          );
          setGateType("upgrade");
          setShowGateModal(true);
          setResult("");
          return;
        }

        setResult(data.error || "Request failed.");
        return;
      }

      setResult(data.result || "No result.");

      if (
        typeof data.usageCount === "number" &&
        typeof data.limit === "number"
      ) {
        setUsageText(`Used today: ${data.usageCount}/${data.limit}`);
      }
    } catch (error) {
      console.error(error);
      setResult("Error generating meta tags.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToolLayout
        header={
          <ToolHeader
            title="AI Meta Generator"
            description="Generate SEO-optimized title tags, meta descriptions, and H1 ideas instantly."
          />
        }
        input={
          <div className="ai-stack">
            <ToolInput title="SEO Input">
              <div>
                <label className="ai-label">Target Keyword</label>

                <input
                  type="text"
                  placeholder="Enter target keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="ai-field"
                />
              </div>

              <div>
                <label className="ai-label">Content Context</label>

                <textarea
                  placeholder="Optional content context..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="ai-field-textarea"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={runAI}
                  disabled={loading}
                  className="ai-btn-primary"
                  type="button"
                >
                  {loading ? "Generating..." : "Generate SEO Meta"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="ai-side-link"
                  style={{
                    cursor: "pointer",
                    padding: "14px 18px",
                    fontWeight: 700,
                  }}
                >
                  Clear
                </button>
              </div>
            </ToolInput>

            <div className="ai-side-card">
              <h3 className="ai-side-title">Usage</h3>

              <div className="ai-side-list">
                <div className="ai-side-link">{usageText}</div>

                {gateMessage ? (
                  <>
                    <div className="ai-side-link">{gateMessage}</div>

                    <a
                      href={`/ai/sign-in?redirect_url=${encodeURIComponent(
                        pathname
                      )}`}
                      className="ai-btn-primary"
                      style={{ textAlign: "center", marginTop: "6px" }}
                    >
                      Sign in to continue
                    </a>

                    <a
                      href={`/ai/sign-up?redirect_url=${encodeURIComponent(
                        pathname
                      )}`}
                      className="ai-side-link"
                      style={{ textAlign: "center" }}
                    >
                      Create free account
                    </a>

                    <a
                      href="/ai/pricing"
                      className="ai-side-link"
                      style={{ textAlign: "center" }}
                    >
                      View pricing
                    </a>
                  </>
                ) : (
                  <div className="ai-side-link">
                    Sign in later for higher limits and saved history.
                  </div>
                )}
              </div>
            </div>
          </div>
        }
        output={
          <ToolOutput
            title="Generated Meta Tags"
            result={result}
            loading={loading}
            onSave={handleSave}
            canSave={!!isSignedIn}
          />
        }
        sidebar={
          <div className="ai-side-card">
            <h3 className="ai-side-title">Tool tips</h3>

            <div className="ai-side-list">
              <div className="ai-side-link">
                Use one clear primary keyword.
              </div>
              <div className="ai-side-link">
                Add page context for better title ideas.
              </div>
              <div className="ai-side-link">
                Review generated copy before publishing.
              </div>
            </div>
          </div>
        }
      />

      {showGateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="ai-side-card"
            style={{
              maxWidth: "460px",
              width: "100%",
              background: "#fff",
            }}
          >
            <h3 className="ai-side-title">
              {gateType === "login"
                ? "Continue with a free account"
                : "Upgrade required"}
            </h3>

            <div className="ai-side-list">
              <div className="ai-side-link">{gateMessage}</div>

              {gateType === "login" ? (
                <>
                  <SignInButton mode="modal">
                    <button className="ai-btn-primary" type="button">
                      Sign in
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button
                      className="ai-side-link"
                      type="button"
                      style={{ cursor: "pointer", textAlign: "center" }}
                    >
                      Create free account
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <a
                  href="/ai/pricing"
                  className="ai-btn-primary"
                  style={{ textAlign: "center" }}
                >
                  View pricing
                </a>
              )}

              <button
                type="button"
                className="ai-side-link"
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={() => setShowGateModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
