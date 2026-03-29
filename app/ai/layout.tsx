
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

       
      </div>
     <SupportSection />

    </main>
  );
}
