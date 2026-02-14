"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Crown,
  ArrowRight,
  ExternalLink,
  Eye,
  Type,
  MousePointer,
  Shield,
  Gauge,
  Layout,
  MessageSquare,
  Target,
} from "lucide-react";
import Link from "next/link";
import { RoastResult } from "@/lib/types";

const categoryIcons: Record<string, typeof Flame> = {
  Headline: Type,
  "Visual Hierarchy": Eye,
  "CTA Clarity": MousePointer,
  "Trust Signals": Shield,
  "Page Speed": Gauge,
  "Layout/UX": Layout,
  "Copy Quality": MessageSquare,
  "Value Proposition": Target,
};

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s <= 20) return "#ff2200";
    if (s <= 40) return "#ff6600";
    if (s <= 60) return "#ffaa00";
    if (s <= 80) return "#88cc00";
    return "#00cc44";
  };

  const getLabel = (s: number) => {
    if (s <= 20) return "Brutal";
    if (s <= 40) return "Rough";
    if (s <= 60) return "Meh";
    if (s <= 80) return "Decent";
    return "Fire";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="8"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-4xl font-black"
          style={{ color: getColor(score) }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          {getLabel(score)}
        </span>
      </div>
    </div>
  );
}

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
      <div className="flex-1 h-2.5 bg-charcoal rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor(score)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-sm font-mono font-bold w-10 text-right">
        {score}/10
      </span>
    </div>
  );
}

export default function RoastResults({ roast }: { roast: RoastResult }) {
  const [copied, setCopied] = useState(false);
  const [showAdvice, setShowAdvice] = useState<Record<number, boolean>>({});

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/roast/${roast.shareSlug}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const twitterText = encodeURIComponent(
    `My landing page just got ROASTED. Score: ${roast.overallScore}/100 💀\n\n"${roast.headline}"\n\nGet yours roasted:`
  );

  const linkedinText = encodeURIComponent(
    `I just got my landing page roasted by AI and scored ${roast.overallScore}/100. The feedback was brutally honest but incredibly actionable. Highly recommend for anyone serious about conversion optimization.`
  );

  const domain = (() => {
    try {
      return new URL(roast.url).hostname;
    } catch {
      return roast.url;
    }
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-soot/80 backdrop-blur-md border-b border-charcoal/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-flame" />
            <span className="text-lg font-bold">
              <span className="text-fire-gradient">Roast</span>
              <span className="text-foreground">MyLanding</span>
            </span>
          </Link>
          <Link
            href="/#submit"
            className="bg-flame hover:bg-flame-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Roast Another
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero section */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-smoke/80 border border-charcoal rounded-full px-4 py-1.5 mb-6">
            <Flame className="w-4 h-4 text-flame" />
            <span className="text-sm text-gray-300">Roast complete</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-500">
            <ExternalLink className="w-4 h-4" />
            <span className="font-mono">{domain}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 max-w-3xl mx-auto leading-tight">
            &ldquo;{roast.headline}&rdquo;
          </h1>

          <ScoreRing score={roast.overallScore} />

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {roast.summary}
          </p>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-sm text-gray-500 mr-2">
            <Share2 className="w-4 h-4 inline mr-1" />
            Share:
          </span>
          <a
            href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-smoke hover:bg-charcoal text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Twitter className="w-4 h-4" />
            Twitter/X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${linkedinText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-smoke hover:bg-charcoal text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 bg-smoke hover:bg-charcoal text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          className="bg-ash/80 border border-charcoal rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-smoke/50 border-b border-charcoal px-6 py-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Flame className="w-5 h-5 text-flame" />
              Full Breakdown
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {roast.categories.map((cat, index) => {
              const Icon = categoryIcons[cat.name] || Flame;
              const isExpanded = showAdvice[index];

              return (
                <motion.div
                  key={cat.name}
                  className="border-b border-charcoal/30 last:border-0 pb-6 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-charcoal/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">{cat.name}</span>
                        <span className="text-lg">{cat.emoji}</span>
                      </div>
                      <ScoreBar score={cat.score} />
                      <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                        {cat.roast}
                      </p>

                      <button
                        onClick={() =>
                          setShowAdvice((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                        className="mt-3 text-sm text-flame hover:text-ember transition-colors flex items-center gap-1"
                      >
                        {isExpanded ? "Hide advice" : "Show fix"}
                        <ArrowRight
                          className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <motion.div
                          className="mt-3 bg-smoke/50 border border-charcoal/50 rounded-xl p-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-sm text-green-300 leading-relaxed flex items-start gap-2">
                            <span className="text-green-400 font-bold mt-px">+</span>
                            {cat.advice}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick wins */}
        <motion.div
          className="bg-ash/80 border border-charcoal rounded-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-smoke/50 border-b border-charcoal px-6 py-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-ember">
              <Flame className="w-5 h-5" />
              Quick Wins — Do These ASAP
            </h2>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {roast.quickWins.map((win, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{win}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Fix It For Me upsell */}
        <motion.div
          className="bg-gradient-to-br from-flame/10 via-ash to-ember/10 border-2 border-flame/30 rounded-2xl p-8 text-center glow-flame"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Crown className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black mb-2">
            Want us to <span className="text-fire-gradient">fix it</span> for you?
          </h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Our team will rewrite your copy, optimize your CTAs, redesign your layout,
            and give you A/B test variants. Go from roasted to converting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:hello@roastmylanding.com?subject=Fix It For Me — ${domain}&body=I just got my landing page roasted (${roast.url}) and scored ${roast.overallScore}/100. I'd like to get the "Fix It For Me" package.`}
              className="bg-flame hover:bg-flame-dark text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Fix It For Me — &euro;149
            </a>
            <span className="text-sm text-gray-500">
              Complete copy + CTA + layout overhaul
            </span>
          </div>
        </motion.div>

        {/* Share CTA at bottom */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-gray-500 mb-4">
            Enjoyed the roast? Share it with your team (or enemies).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-smoke hover:bg-charcoal text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Share on Twitter/X
            </a>
            <Link
              href="/#submit"
              className="flex items-center gap-1.5 bg-flame hover:bg-flame-dark text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Flame className="w-4 h-4" />
              Roast Another Page
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
