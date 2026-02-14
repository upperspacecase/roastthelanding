"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Got roasted. Cried a little. Fixed my headline and CTAs. Conversion rate went up 34% in two weeks. Worth every cent.",
    author: "Sarah K.",
    role: "Founder, SaaSlytics",
    score: "Score: 28/100 → Fixed to 76",
  },
  {
    quote:
      "I sent my roast to my entire marketing team. We fixed everything in a sprint. Best €9 I've ever spent on CRO.",
    author: "Marcus D.",
    role: "Head of Growth, Finbit",
    score: "Score: 41/100 → Fixed to 82",
  },
  {
    quote:
      "Roasted my competitor's page and shared it in our Slack. Then we made sure ours didn't have the same problems. Genius.",
    author: "Priya L.",
    role: "CMO, DevToolkit",
    score: "Used it on 3 competitor pages",
  },
  {
    quote:
      "The 'Fix It For Me' package paid for itself in the first week. Our sign-up rate doubled after implementing the recommendations.",
    author: "Jake T.",
    role: "CEO, LaunchPad",
    score: "Score: 33/100 → Pro fix to 89",
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
            And lived to tell the (profitable) tale
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
