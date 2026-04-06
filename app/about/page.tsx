import type { Metadata } from "next";
import Image from "next/image";
import SupportSection from "../../components/SupportSection";

export const metadata: Metadata = {
  title: "About OnlineToolsBase",
  description:
    "Learn more about OnlineToolsBase – a free collection of online tools and calculators for everyday life, finance, text, images and social media.",
};

export default function AboutPage() {
  return (
    <main className="main-shell">
      <div className="main-container py-10 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">About OnlineToolsBase</h1>
        <p className="text-sm text-slate-400 mb-8">
          Simple tools, zero login, always free.
        </p>

        <div className="grid gap-8 md:grid-cols-[220px,1fr] items-start">
          {/* Founder photo / avatar */}
          <div className="flex flex-col items-center gap-3">
            {/* Replace /founder.jpg with your real photo in /public */}
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-slate-700 bg-slate-900">
              <Image
                src="/founder.webp"
                alt="Founder of OnlineToolsBase"
                fill
                className="object-cover"
                loading="lazy"

              />
            </div>
            <div className="text-center">
              <p className="font-semibold">[ ARMAN TARIQ ]</p>
              <p className="text-xs text-slate-400">
                Creator of OnlineToolsBase
              </p>
            </div>
            <p className="text-xs text-slate-400 text-center max-w-xs">
              Helo!.
            </p>
          </div>

          {/* Story */}
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <strong>OnlineToolsBase</strong> was created with a simple idea:{" "}
              <span className="font-semibold">
                everyday tools should be fast, clean and free
              </span>
              . No pop-ups, no confusing menus, no login forms — just useful
              calculators and utilities that work on any device..
            </p>

            <p>
              Over time, the project grew into a collection of tools for{" "}
              <span className="font-semibold">
                time &amp; age, finance, text, images and social media
              </span>
              . Whether you&apos;re calculating a loan EMI, converting PDFs,
              fixing text formatting or downloading a thumbnail, the goal is the
              same: save you time.
            </p>

            <p>
              I build and maintain OnlineToolsBase in my free time, constantly
              improving the UI, accuracy and speed. New tools are added
              gradually based on what people actually use and request.
            </p>

            <p>
              If the site saves you a few minutes or helps with your work,
              you&apos;re always welcome to{" "}
              <a
                href="https://www.buymeacoffee.com/onlinetoolsbase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline underline-offset-2"
              >
                buy me a coffee
              </a>{" "}
              – it genuinely helps me keep everything online and free.
            </p>

            <p>
              Thank you for visiting OnlineToolsBase. If you have suggestions,
              ideas or spot a bug, feel free to reach out from the{" "}
              <a
                href="/contact"
                className="text-blue-400 underline underline-offset-2"
              >
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <SupportSection />

    </main>
  );
}
