import type { Metadata } from "next";
import SupportSection from "../../components/SupportSection";

export const metadata: Metadata = {
  title: "Privacy Policy | OnlineToolsBase",
  description:
    "Read how OnlineToolsBase handles cookies, analytics, advertising and your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="main-shell">
      <div className="main-container py-10 max-w-3xl text-sm leading-relaxed">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400 text-xs mb-6">
          Last updated: {new Date().getFullYear()}
        </p>

        <p className="mb-4">
          This Privacy Policy explains how OnlineToolsBase (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;) collects, uses and protects
          information when you use our website and tools.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">1. Information we collect</h2>
        <p className="mb-2">
          OnlineToolsBase does not require you to create an account or submit
          personal information to use the tools.
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>
            <span className="font-semibold">Usage data:</span> anonymized data
            about how the site and tools are used (pages visited, buttons
            clicked, approximate location, device type, etc.), typically
            collected via third-party analytics.
          </li>
          <li>
            <span className="font-semibold">Log data:</span> standard server
            logs that may include IP address, browser type, and timestamps.
          </li>
          <li>
            <span className="font-semibold">Contact messages:</span> if you send
            us a message via the contact form, we store the information you
            provide (name, email, message) to reply.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-2">2. Cookies &amp; analytics</h2>
        <p className="mb-4">
          We may use cookies or similar technologies to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>remember basic preferences (theme, language, etc.);</li>
          <li>measure anonymous statistics about traffic and usage;</li>
          <li>help detect errors and improve performance.</li>
        </ul>
        <p className="mb-4">
          Third-party analytics providers may set their own cookies and process
          data according to their privacy policies.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">3. Advertising</h2>
        <p className="mb-4">
          OnlineToolsBase may display ads from networks such as Google AdSense.
          These partners may use cookies and similar technologies to show
          relevant advertising and to measure performance. You can control
          personalized advertising through your Google account or your browser
          settings.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">4. Third-party services</h2>
        <p className="mb-4">
          Some tools may rely on external APIs or services (for example,
          currency exchange providers, file conversion APIs, social media
          platforms). These services have their own terms and privacy policies,
          which apply in addition to this one.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">
          5. Data retention &amp; security
        </h2>
        <p className="mb-4">
          We retain logs and analytics data for as long as reasonably necessary
          to operate and improve the site. We use technical measures to help
          protect data, but no system can be 100% secure.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">
          6. Children&apos;s privacy
        </h2>
        <p className="mb-4">
          OnlineToolsBase is intended for general use and not specifically
          targeted at children. We do not knowingly collect personal information
          from children under 13. If you believe we have such data, please
          contact us and we will delete it.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">
          7. Changes to this policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. The &quot;Last
          updated&quot; date at the top will always show the current version.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">8. Contact</h2>
        <p className="mb-2">
          If you have questions about this policy, you can contact us via the{" "}
          <a href="/contact" className="text-blue-400 underline underline-offset-2">
            contact page
          </a>
          .
        </p>

        <p className="text-xs text-slate-500 mt-6">
          This Privacy Policy is for general informational purposes and does not
          constitute legal advice.
        </p>
      </div>
      <SupportSection />

    </main>
  );
}
