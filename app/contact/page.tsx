import type { Metadata } from "next";
import SupportSection from "../../components/SupportSection";

export const metadata: Metadata = {
  title: "Contact | OnlineToolsBase",
  description:
    "Contact the creator of OnlineToolsBase to report a bug, suggest a tool or discuss collaboration.",
};

export default function ContactPage() {
  return (
    <main className="main-shell">
      <div className="main-container py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-sm text-slate-400 mb-6">
          Found a bug? Have an idea for a new tool? I&apos;d love to hear from
          you.
        </p>

        <div className="card p-6 space-y-4">
          <p className="text-sm">
            The quickest way to reach me is by email. Please include as much
            detail as possible (tool name, what you were trying to do, any error
            messages, etc.).
          </p>

          <p className="text-sm">
            <span className="font-semibold">Email: </span>
            <a
              href="mailto:contact@onlinetoolsbase.com"
              className="text-blue-400 underline underline-offset-2"
            >
              contact@onlineotoolsbase.com
            </a>
          </p>

          <p className="text-xs text-slate-400">
            Best Of Luck!.
          </p>
        </div>
      </div>
     <SupportSection />

    </main>
  );
}
