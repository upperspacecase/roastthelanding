"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Scored 28. Ouch. But honestly the headline feedback alone was worth it — rewrote it that afternoon and our demo requests went up 34% that same week. Not even kidding.",
    author: "Sarah K.",
    role: "Founder, SaaSlytics",
    score: "28 → 76 after fixes",
  },
  {
    quote:
      "Dropped this in our marketing Slack channel and we turned it into a whole sprint. Nine euro well spent.",
    author: "Marcus D.",
    role: "Growth, Finbit",
    score: "41 → 82 after fixes",
  },
  {
    quote:
      "Roasted three competitor pages before I roasted ours. Found out we had the same problems. Awkward but useful.",
    author: "Priya L.",
    role: "CMO, DevToolkit",
    score: "Roasted 4 pages total",
  },
  {
    quote:
      "Got the Fix It For Me package because I'm lazy. They rewrote our hero section and CTAs. Sign-ups doubled in a week. Wish I was exaggerating.",
    author: "Jake T.",
    role: "CEO, LaunchPad",
    score: "33 → 89 with pro fix",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            They got <span className="text-fire-gradient">roasted</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Then they fixed their pages and made more money
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              className="bg-ash/50 border border-charcoal/50 rounded-2xl p-6 hover:border-charcoal transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-ember text-ember"
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
                <div className="text-xs text-flame font-mono bg-flame/10 px-2 py-1 rounded">
                  {t.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
