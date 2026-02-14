"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is this actually useful or just mean?",
    a: "Both. The tone is harsh on purpose (it makes the feedback stick, and it's way more fun to share). But every category comes with real fixes you can implement the same day.",
  },
  {
    q: "What if my page is actually good?",
    a: "You'll score high and probably find 2-3 things to improve anyway. Nobody's page is perfect. And a high score is great Twitter content.",
  },
  {
    q: "How does the analysis work?",
    a: "We screenshot your page and run it through AI that scores you on 8 things: headline, visual hierarchy, CTAs, trust signals, speed, layout, copy, and value prop. You get a score for each one plus specific advice on what to change.",
  },
  {
    q: "Can I roast a competitor's page?",
    a: "Yes. People do this constantly. Roast theirs, post it in Slack, then quietly make sure yours isn't just as bad.",
  },
  {
    q: "What's the 'Fix It For Me' thing?",
    a: "If you see your roast and think \"I don't want to fix this myself\" — we'll do it. Our team rewrites your copy, fixes your CTAs, and gives you an annotated layout with headline variants to test. It's the lazy (smart) option.",
  },
  {
    q: "Do you store my data?",
    a: "We keep the roast so your share link works. We don't sell anything or use your page for training. Your roast is yours.",
  },
  {
    q: "Can I get a refund?",
    a: "Yeah. If the roast isn't useful, email us. Full refund, no questions.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-charcoal/50 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-gray-200 group-hover:text-foreground transition-colors pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Frequently <span className="text-fire-gradient">asked</span>
          </h2>
          <p className="text-gray-400 text-lg">
            The stuff people ask before they commit
          </p>
        </motion.div>

        <div className="bg-ash/50 border border-charcoal/50 rounded-2xl px-6">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
