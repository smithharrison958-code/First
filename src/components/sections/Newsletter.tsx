"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Leaf, ShieldCheck, Gift } from "lucide-react";

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #C4956A 0%, #A47850 40%, #8FAF8A 100%)",
      }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-premium relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-6">
              <Leaf className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Join 50,000+ Health-Conscious Cooks
            </h2>
            <p className="text-white/80 text-base mb-8 leading-relaxed">
              Get science-backed guides on microplastic-free living, exclusive first access to new
              products, and a{" "}
              <span className="text-white font-semibold">10% discount on your first order</span>.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {[
                { icon: ShieldCheck, text: "No spam, ever" },
                { icon: Gift, text: "10% off your first order" },
                { icon: Leaf, text: "Unsubscribe anytime" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Icon className="w-4 h-4 text-white/90" />
                  {text}
                </div>
              ))}
            </div>

            {/* Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-white/15 rounded-lg px-6 py-4"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <p className="text-white font-medium">
                  You&apos;re in! Check your email for your 10% discount code.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 h-12 px-4 rounded bg-white/15 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/60 text-sm backdrop-blur-sm transition-colors"
                />
                <button
                  type="submit"
                  className="h-12 px-6 bg-[#1A1A1A] text-[#FAFAF7] rounded text-sm font-semibold hover:bg-[#2D2D2D] transition-colors inline-flex items-center gap-2 justify-center whitespace-nowrap active:scale-[0.98]"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
