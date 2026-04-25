"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

export default function InternalLinkingTool() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const [content, setContent] = useState("");
  const [urls, setUrls] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageText, setUsageText] = useState(
    "Guest users can try a few free runs."
  );
  const [gateMessage, setGateMessage] = useState("");
  const [showGateModal, setShowGateModal] = useState(false);
  const [gateType, setGateType] = useState<"login" | "upgrade" | null>(null);

  const handleClear = () => {
    setContent("");
    setUrls("");
    setResult("");
    setGateMessage("");
    setShowGateModal(false);
    setGateType(null);
  };

  const handleSave = async () => {
    if (!result.trim()) return;

    const blockedTexts = [
      "fetch failed",
      "request failed",
      "something went wrong",
      "server returned non-json response",
      "missing openrouter_api_key",
      "missing groq_api_key",
    ];

    const lower = result.toLowerCase();

    if (blockedTexts.some((t) => lower.includes(t))) {
      alert("Only successful AI outputs can be saved.");
      return;
    }

    const inputText = `Article Content:\n${content}\n\nTarget URLs:\n${urls}`;

    const res = await fetch("/api/ai/save-output", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toolSlug: "internal-linking",
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
    if (!content.trim() || !urls.trim()) {
      setResult("Please enter article content and at least one target URL.");
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
          toolSlug: "internal-linking",
          prompt: `
You are an SEO internal linking specialist.

Analyze the article content below and the target URLs list.

Your task:
1. Suggest the best internal linking opportunities.
2. Recommend anchor text for each suggestion.
3. Explain where in the content the link should be inserted.
4. Keep suggestions practical and SEO-friendly.

ARTICLE CONTENT:
${content}

TARGET URLS:
${urls}
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

      setResult(data.result || "No result returned.");

      if (
        typeof data.usageCount === "number" &&
        typeof data.limit === "number"
      ) {
        setUsageText(`Used today: ${data.usageCount}/${data.limit}`);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong while generating internal link suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToolLayout
        header={
          <ToolHeader
            title="AI Internal Linking Tool"
            description="Generate smart internal linking suggestions, anchor text ideas, and placement recommendations for your articles."
          />
        }
        input={
          <div className="ai-stack">
            <ToolInput title="Article Input">
              <div>
                <label className="ai-label">Article Content</label>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your article content here..."
                  className="ai-field-textarea ai-field-textarea-lg"
                />
              </div>

              <div>
                <label className="ai-label">Target URLs</label>

                <textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  placeholder="Paste one target URL per line..."
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
                  {loading ? "Generating..." : "Generate Internal Links"}
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
            title="Internal Linking Suggestions"
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
                Use the full article, not only one paragraph.
              </div>
              <div className="ai-side-link">
                Keep target URLs tightly relevant.
              </div>
              <div className="ai-side-link">
                Review suggested anchors before publishing.
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
