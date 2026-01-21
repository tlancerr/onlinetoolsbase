"use client";

export default function SupportSection() {
  return (
    <div className="support-section card my-10 py-8 text-center">
      <p className="text-lg font-semibold mb-4">Want to support?</p>

      <a
        href="https://www.buymeacoffee.com/onlinetoolsbase"
        target="_blank"
        rel="noopener noreferrer"
        className="support-svg-btn inline-block"
      >
        <img
          src="/coffee111.svg"
          alt="Buy me a coffee"
          className="support-svg"
        />
      </a>
    </div>
  );
}
