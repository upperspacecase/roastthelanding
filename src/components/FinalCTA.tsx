"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-flame/5 via-transparent to-transparent" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          Still reading?
          <br />
          <span className="text-fire-gradient">Your page isn&apos;t fixing itself.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          You&apos;ve read this far, which means you know your page could be better.
          Nine euros and 60 seconds is all it takes to find out how much better.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#submit"
            className="group bg-flame hover:bg-flame-dark text-white text-lg font-bold px-8 py-4 rounded-xl transition-all animate-pulse-flame hover:animate-none flex items-center gap-2"
          >
            <Flame className="w-5 h-5" />
            Get Roasted Now — &euro;9
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 text-ember" />
            100% money-back guarantee
          </div>
        </div>
      </motion.div>
    </section>
  );
}
