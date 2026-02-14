"use client";

import { motion } from "framer-motion";
import { Link, Search, Flame, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Drop your URL",
    description:
      "Paste any live landing page link. That's it.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Search,
    title: "We screenshot & scan",
    description:
      "Layout, copy, CTAs, trust signals, page speed — we look at all of it.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Flame,
    title: "Get wrecked",
    description:
      "You get a score across 8 categories, a roast that doesn't hold back, and the fixes you actually need.",
    color: "text-flame",
    bgColor: "bg-flame/10",
  },
  {
    icon: BarChart3,
    title: "Fix it, ship it",
    description:
      "Apply the fixes. Watch your conversion rate stop embarrassing you.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            How the <span className="text-fire-gradient">roasting</span> works
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Four steps. Minimal emotional damage. (We can&apos;t promise that last part.)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative bg-ash/50 border border-charcoal/50 rounded-2xl p-6 hover:border-charcoal transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-smoke border border-charcoal rounded-full flex items-center justify-center text-sm font-bold text-gray-400">
                {index + 1}
              </div>

              <div
                className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-charcoal" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
