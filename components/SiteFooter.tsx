import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-slate-950">
      <div className="main-container py-6 text-xs text-slate-400 flex flex-col md:flex-row justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/otb-logo160-160.svg"
              alt="OnlineToolsBase"
              width={75}
              height={75}
            />
            <span>
              © {new Date().getFullYear()} OnlineToolsBase.com — All rights reserved.
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
