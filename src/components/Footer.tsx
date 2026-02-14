"use client";

import { Flame } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-flame" />
            <span className="text-sm font-bold">
              <span className="text-fire-gradient">Roast</span>
              <span className="text-foreground">MyLanding</span>
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hover:text-gray-300 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-gray-300 transition-colors">
              FAQ
            </a>
          </div>

          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} RoastMyLanding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
