import type { Metadata } from "next";
import SupportSection from "../../components/SupportSection";

export const metadata: Metadata = {
  title: "Terms of Service | OnlineToolsBase",
  description:
    "Read the terms and conditions for using OnlineToolsBase tools and services.",
};

export default function TermsPage() {
  return (
    <main className="main-shell">
      <div className="main-container py-10 max-w-3xl text-sm leading-relaxed">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-400 text-xs mb-6">
          Last updated: {new Date().getFullYear()}
        </p>

        <p className="mb-4">
          By accessing or using OnlineToolsBase (&quot;the Service&quot;),
          you agree to be bound by these Terms of Service. If you do not agree
          with any part, please do not use the site.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">1. Use of the Service</h2>
        <p className="mb-4">
          OnlineToolsBase provides web-based tools and calculators for personal
          and professional use. You may use the Service only in compliance with
          these Terms and all applicable laws.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">2. No warranty</h2>
        <p className="mb-4">
          We make reasonable efforts to keep the tools accurate and available,
          but the Service is provided on an &quot;as-is&quot; and
          &quot;as-available&quot; basis. We do not give any warranties,
          express or implied, including but not limited to accuracy, fitness for
          a particular purpose or non-infringement.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">3. Limitation of liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, OnlineToolsBase and its owner
          are not liable for any loss or damage arising from your use of the
          Service, including errors in calculations, data loss, or decisions you
          make based on results from our tools.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">4. User responsibility</h2>
        <p className="mb-4">
          You are responsible for:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>checking important results with a trusted source;</li>
          <li>
            using downloaded or converted content in line with copyright and
            platform rules;
          </li>
          <li>complying with local laws when using any tool on this site.</li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-2">
          5. Third-party services &amp; content
        </h2>
        <p className="mb-4">
          Some tools interact with external websites or APIs (for example,
          social media platforms, file conversion services, or financial data
          providers). We do not control these third-party services and are not
          responsible for their content, availability or policies.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">6. Intellectual property</h2>
        <p className="mb-4">
          The OnlineToolsBase brand, design and custom tool logic are owned by
          the site owner. You may not copy, resell or mirror the Service without
          prior written permission.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">7. Changes to the Service</h2>
        <p className="mb-4">
          We may modify, suspend or discontinue any part of the Service at any
          time, with or without notice.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">8. Changes to these Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the
          Service after changes become effective means you accept the new Terms.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">9. Contact</h2>
        <p className="mb-4">
          For questions about these Terms, please contact us via the{" "}
          <a href="/contact" className="text-blue-400 underline underline-offset-2">
            contact page
          </a>
          .
        </p>

        <p className="text-xs text-slate-500 mt-6">
          These Terms are provided for general informational purposes and are
          not legal advice.
        </p>
      </div>
      <SupportSection />

    </main>
  );
}
