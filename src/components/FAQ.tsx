"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is the roast actually useful or just mean?",
    a: "Both. Every roast comes with specific, actionable advice across 8 categories. The savage tone makes it entertaining (and shareable), but the advice is dead serious. We analyze your headline, CTAs, trust signals, visual hierarchy, copy, page speed, layout, and value proposition.",
  },
  {
    q: "What if my landing page is actually good?",
    a: "Then you'll score high and get a pat on the back (and still find areas to improve). Nobody's perfect, and even a great page has optimization opportunities. Plus, a high score makes for an even better share on social media.",
  },
  {
    q: "How does the AI analyze my page?",
    a: "We take a full screenshot of your page, then analyze it using advanced AI across 8 critical conversion categories. We look at everything from copy quality to visual hierarchy, CTA effectiveness, trust signals, and more. It's like having a CRO expert and a comedian review your page simultaneously.",
  },
  {
    q: "Can I roast a competitor's page?",
    a: "Absolutely. In fact, that's one of the most popular use cases. Roast their page, share it in your team Slack, then make sure your page doesn't have the same problems. Competitive intelligence with entertainment value.",
  },
  {
    q: "What's the 'Fix It For Me' package?",
    a: "After seeing your roast, if you want professional help fixing the issues, our team will rewrite your copy, optimize your CTAs, provide annotated layout recommendations, give you A/B test headline variants, and a 30-day conversion tracking guide. It's the fast track from roasted to toasted (in a good way).",
  },
  {
    q: "Do you store my URL or page data?",
    a: "We keep the roast results so you can share them via your unique link. The screenshot and analysis are stored for your shareable roast page. We don't sell your data or use it for anything other than generating your roast.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If your roast isn't useful, email us and we'll refund you. No questions asked. We're that confident in the value.",
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
            Questions we get before people get roasted
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
