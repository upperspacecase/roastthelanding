"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Loader2, ExternalLink, Lock } from "lucide-react";

export default function SubmitForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: parsedUrl.toString() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.roastId) {
        // Demo mode: skip payment, go directly to roast
        window.location.href = `/roast/${data.roastId}`;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="submit" className="py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-flame/5 rounded-full blur-[120px]" />

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Ready to get <span className="text-fire-gradient">roasted</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Drop your URL below. No mercy will be shown.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-ash/80 border border-charcoal rounded-2xl p-6 sm:p-8 glow-flame"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-6">
            <label
              htmlFor="url"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Your landing page URL
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-landing-page.com"
                className="w-full bg-soot border border-charcoal rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-gray-600 focus:outline-none focus:border-flame focus:ring-1 focus:ring-flame transition-colors"
                disabled={loading}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-flame hover:bg-flame-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Preparing your roast...
              </>
            ) : (
              <>
                <Flame className="w-5 h-5" />
                Roast My Page — &euro;9
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            Secure payment via Stripe. 100% money-back guarantee.
          </div>
        </motion.form>
      </div>
    </section>
  );
}
