"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Leaf, Star } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 hero-gradient"
        style={{
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 30%, #3A3228 55%, #2A241E 80%, #1A1A1A 100%)",
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #C4956A 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,149,106,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(143,175,138,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-premium pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-screen">
        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-6 h-px bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
              Microplastic-Free Kitchen
            </span>
            <span className="w-6 h-px bg-[#C4956A]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#FAFAF7] mb-4"
          >
            Cook Without
            <br />
            <span
              className="animated-gradient-text"
              style={{
                background: "linear-gradient(135deg, #C4956A 0%, #D4A97A 40%, #8FAF8A 70%, #C4956A 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Compromise.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base sm:text-lg text-[#FAFAF7]/60 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Microplastic-free. Non-toxic. Beautifully crafted.
            <br />
            Premium kitchen essentials that protect your health
            <br />
            without sacrificing beauty or performance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-8 bg-[#C4956A] text-white rounded text-sm font-semibold hover:bg-[#A47850] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 h-12 px-8 border border-white/20 text-[#FAFAF7] rounded text-sm font-medium hover:bg-white/6 transition-all duration-200 active:scale-[0.98] w-full sm:w-auto justify-center"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10"
          >
            {[
              { icon: ShieldCheck, text: "Zero PFAS" },
              { icon: Leaf, text: "Sustainably Sourced" },
              { icon: Star, text: "4.8★ Average" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-[#FAFAF7]/50 text-xs">
                <Icon className="w-3.5 h-3.5 text-[#C4956A]" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex-1 w-full max-w-sm lg:max-w-none"
        >
          <div className="relative">
            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
              style={{
                background: "linear-gradient(135deg, #D4A97A 0%, #A0714A 25%, #C08050 50%, #8B5E3C 75%, #C4956A 100%)",
              }}
            >
              {/* Wood grain lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    85deg,
                    transparent,
                    transparent 3px,
                    rgba(255,255,255,0.06) 3px,
                    rgba(255,255,255,0.06) 4px
                  )`,
                }}
              />
              {/* Glass panel on top */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8A8A8A] font-medium">Bestseller</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">Solid Oak Cutting Board</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-[#C4956A] text-xs">★</span>
                      ))}
                      <span className="text-xs text-[#8A8A8A] ml-1">(312)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#1A1A1A]">$89</p>
                    <Link
                      href="/shop/solid-oak-cutting-board"
                      className="text-xs text-[#C4956A] hover:text-[#A47850] font-medium"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass rounded-lg px-3 py-2 shadow-xl"
            >
              <p className="text-xs font-bold text-[#1A1A1A]">100% Plastic-Free</p>
              <p className="text-[10px] text-[#8A8A8A]">Certified & Tested</p>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 -left-4 glass rounded-lg px-3 py-2 shadow-xl"
            >
              <p className="text-xs font-bold text-[#1A1A1A]">50k+ Kitchens</p>
              <p className="text-[10px] text-[#8A8A8A]">Already converted</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#FAFAF7]/40"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
