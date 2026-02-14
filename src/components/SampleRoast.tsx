"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Eye,
  Type,
  MousePointer,
  Shield,
  Gauge,
  Layout,
  MessageSquare,
  Target,
} from "lucide-react";

const sampleCategories = [
  { name: "Headline", score: 3, emoji: "💀", icon: Type, roast: "\"Welcome to our platform\" — wow, really going for that \"generic SaaS starter template\" energy." },
  { name: "Visual Hierarchy", score: 4, emoji: "😵", icon: Eye, roast: "Everything screams for attention. Nothing gets it. It's a visual mosh pit." },
  { name: "CTA Clarity", score: 2, emoji: "🪦", icon: MousePointer, roast: "Your call-to-action button says \"Get Started\". Get started with WHAT? Existential dread?" },
  { name: "Trust Signals", score: 5, emoji: "😬", icon: Shield, roast: "No testimonials, no logos, no social proof. Visitors have to take a leap of faith." },
  { name: "Page Speed", score: 7, emoji: "🤷", icon: Gauge, roast: "Loads in 2.8s. Not terrible, not great. Like a C+ student coasting through life." },
  { name: "Layout/UX", score: 4, emoji: "🫠", icon: Layout, roast: "The layout feels like a Figma file that was abandoned halfway through a redesign." },
  { name: "Copy Quality", score: 3, emoji: "💀", icon: MessageSquare, roast: "Your copy reads like it was written by someone who's never talked to an actual customer." },
  { name: "Value Proposition", score: 2, emoji: "🔥", icon: Target, roast: "After reading your entire page, I still have no idea what you actually do or why I should care." },
];

function ScoreBar({ score }: { score: number }) {
  const percentage = score * 10;
  const getColor = (s: number) => {
    if (s <= 2) return "bg-red-500";
    if (s <= 4) return "bg-orange-500";
    if (s <= 6) return "bg-yellow-500";
    if (s <= 8) return "bg-lime-500";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-charcoal rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(score)} rounded-full animate-fill-meter`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-mono font-bold w-8 text-right">
        {score}/10
      </span>
    </div>
  );
}

export default function SampleRoast() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-flame/3 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Here&apos;s what a roast{" "}
            <span className="text-fire-gradient">looks like</span>
          </h2>
          <p className="text-gray-400 text-lg">
            This one hurt. It also tripled their sign-ups.
          </p>
        </motion.div>

        <motion.div
          className="bg-ash/80 border border-charcoal rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Roast header */}
          <div className="bg-smoke/50 border-b border-charcoal p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1 font-mono">
                  example-startup.com
                </div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5 text-flame" />
                  &ldquo;This page has the conversion rate of a screen door on a submarine&rdquo;
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-black text-fire-gradient">
                  34
                </div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  /100
                </div>
              </div>
            </div>
          </div>

          {/* Category scores */}
          <div className="p-6 space-y-5">
            {sampleCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                className="group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-charcoal/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <cat.icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{cat.name}</span>
                      <span>{cat.emoji}</span>
                    </div>
                    <ScoreBar score={cat.score} />
                    <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                      {cat.roast}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick wins section */}
          <div className="border-t border-charcoal p-6 bg-smoke/30">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-ember">
              <Flame className="w-4 h-4" />
              Quick Wins (do these ASAP)
            </h4>
            <ul className="space-y-2">
              {[
                "Your headline should answer \"why should I care?\" in under 5 words",
                "Put 3 real customer testimonials above the fold — with faces, not logos",
                "Rename that \"Get Started\" button to literally anything that tells people what they get",
                "Delete half the stuff above the fold. If it's not driving the click, it's blocking it",
              ].map((win) => (
                <li
                  key={win}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="text-green-400 mt-0.5">+</span>
                  {win}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
