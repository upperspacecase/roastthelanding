"use client";

import { Flame } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-soot/80 backdrop-blur-md border-b border-charcoal/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Flame className="w-7 h-7 text-flame group-hover:text-ember transition-colors" />
          <span className="text-lg font-bold">
            <span className="text-fire-gradient">Roast</span>
            <span className="text-foreground">MyLanding</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="text-sm text-gray-400 hover:text-foreground transition-colors hidden sm:block"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-sm text-gray-400 hover:text-foreground transition-colors hidden sm:block"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-gray-400 hover:text-foreground transition-colors hidden sm:block"
          >
            FAQ
          </a>
          <a
            href="#submit"
            className="bg-flame hover:bg-flame-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Roasted
          </a>
        </nav>
      </div>
    </header>
  );
}
