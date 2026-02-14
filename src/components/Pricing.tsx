"use client";

import { motion } from "framer-motion";
import { Check, Flame, Zap, Crown } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Simple <span className="text-fire-gradient">pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Cheaper than lunch. More useful than that $5k agency audit collecting dust in your Google Drive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Single Roast */}
          <motion.div
            className="relative bg-ash/80 border-2 border-flame rounded-2xl p-8 glow-flame"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="bg-flame text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3" /> MOST POPULAR
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Zap className="w-5 h-5 text-ember" />
                Single Roast
              </h3>
              <p className="text-sm text-gray-400">
                One page. One roast. Zero mercy.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-fire-gradient">
                  &euro;9
                </span>
                <span className="text-gray-500">/roast</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Scored across 8 categories",
                "Overall conversion score",
                "A headline roast you'll want to screenshot",
                "Concrete fixes, not vague advice",
                "Quick wins you can ship today",
                "Shareable link (for bragging or crying)",
                "Screenshot of your page included",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="w-4 h-4 text-flame flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#submit"
              className="block w-full bg-flame hover:bg-flame-dark text-white text-center font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Get Roasted
            </a>
          </motion.div>

          {/* Fix It For Me */}
          <motion.div
            className="relative bg-ash/80 border border-charcoal rounded-2xl p-8 hover:border-charcoal/80 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Fix It For Me
              </h3>
              <p className="text-sm text-gray-400">
                We rewrite your page so it actually works
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-foreground">
                  &euro;149
                </span>
                <span className="text-gray-500">/page</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Everything in Single Roast",
                "Full copy rewrite, top to bottom",
                "CTAs that people actually click",
                "Annotated layout mockup",
                "3 headline variants to A/B test",
                "Priority email support",
                "Conversion tracking setup guide",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#submit"
              className="block w-full bg-charcoal hover:bg-smoke text-white text-center font-bold py-3 px-6 rounded-xl transition-colors border border-charcoal"
            >
              Get the Full Fix
            </a>
          </motion.div>
        </div>

        {/* Money back guarantee */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-gray-500">
            <span className="text-foreground font-semibold">
              100% money-back guarantee
            </span>{" "}
            — If your roast isn&apos;t useful, we&apos;ll refund you. No
            questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
