"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const beforeItems = [
  { label: "PTFE non-stick coatings", detail: "Flakes off into food when heated or scratched" },
  { label: "PFAS 'forever chemicals'", detail: "Accumulate in body — linked to cancer & hormonal disruption" },
  { label: "Plastic cutting boards", detail: "Shed 50mg microplastics/year directly into your meals" },
  { label: "Plastic spatulas & utensils", detail: "Melt at cooking temperatures, releasing particles" },
  { label: "Plastic food containers", detail: "Leach BPA and phthalates, especially when heated" },
];

const afterItems = [
  { label: "Stainless 18/10 cookware", detail: "Completely inert at all temperatures — proven food-safe" },
  { label: "Cast iron skillets", detail: "Natural non-stick that improves with every use" },
  { label: "Oak & maple cutting boards", detail: "Naturally antimicrobial, zero plastic particles" },
  { label: "Walnut wood utensils", detail: "Safe at all cooking temperatures, self-healing surface" },
  { label: "Borosilicate glass storage", detail: "Inert, non-reactive — from freezer to oven" },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-[#F0EDE8]">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
              The Switch
            </span>
            <span className="w-6 h-px bg-[#C4956A]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
            Before & After
          </h2>
          <p className="text-[#8A8A8A] mt-3 max-w-xl mx-auto">
            Make the switch once. Your health — and your food — will thank you for decades.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-red-200"
          >
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-sm font-bold text-red-700 uppercase tracking-wider">
                  Before: Conventional Kitchen
                </span>
              </div>
            </div>
            <div className="bg-white p-6 space-y-4">
              {beforeItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 shrink-0">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-[#8FAF8A]/40"
          >
            <div className="px-6 py-4 border-b border-[#8FAF8A]/20" style={{ background: "#8FAF8A15" }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#8FAF8A25" }}>
                  <Check className="w-3.5 h-3.5" style={{ color: "#6A8F65" }} />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "#4D6B48" }}>
                  After: PureLife Kitchen
                </span>
              </div>
            </div>
            <div className="bg-white p-6 space-y-4">
              {afterItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                    style={{ background: "#8FAF8A25" }}
                  >
                    <Check className="w-3 h-3" style={{ color: "#6A8F65" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-[#8A8A8A] mt-10 max-w-lg mx-auto"
        >
          Every product we carry has been independently verified as free from PFAS, BPA, phthalates,
          and synthetic coatings. Our promise is your kitchen is a health asset, not a liability.
        </motion.p>
      </div>
    </section>
  );
}
