"use client";

import { motion } from "framer-motion";
import { ArrowDown, Flame, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-soot via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-flame/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-smoke/80 border border-charcoal rounded-full px-4 py-1.5 mb-8">
            <Flame className="w-4 h-4 text-flame" />
            <span className="text-sm text-gray-300">
              No feelings were spared in the making of this tool
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your landing page
          <br />
          <span className="text-fire-gradient">sucks.</span>
          <br />
          <span className="text-gray-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Let us prove it.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Submit your URL. Our AI will{" "}
          <span className="text-flame font-semibold">brutally analyze</span>{" "}
          every pixel, word, and CTA. You get a savage roast with{" "}
          <span className="text-ember font-semibold">
            specific, actionable advice
          </span>{" "}
          to actually convert visitors into customers.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#submit"
            className="group relative bg-flame hover:bg-flame-dark text-white text-lg font-bold px-8 py-4 rounded-xl transition-all animate-pulse-flame hover:animate-none"
          >
            <span className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Roast My Landing Page
              <span className="text-sm font-normal opacity-80">&mdash; &euro;9</span>
            </span>
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 text-ember" />
            Results in under 60 seconds
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-charcoal to-smoke border-2 border-background flex items-center justify-center text-xs"
              >
                {["🔥", "💀", "😭", "🤯", "💪"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="text-foreground font-semibold">2,847+</span>{" "}
            landing pages roasted and counting
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-400 transition-colors">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
