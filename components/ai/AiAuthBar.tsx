"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

export default function AiAuthBar() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginBottom: "18px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button
              className="ai-side-link"
              style={{ cursor: "pointer" }}
              type="button"
            >
              Sign in
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="ai-btn-primary" type="button">
              Create account
            </button>
          </SignUpButton>
        </>
      ) : (
        <>
          <a href="/ai/dashboard" className="ai-side-link">
            Dashboard
          </a>
          <UserButton />
        </>
      )}
    </div>
  );
}
