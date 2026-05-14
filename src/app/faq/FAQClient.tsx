"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";
import Link from "next/link";

const faqCategories = ["All", "Health", "Cookware", "Materials", "Care", "Orders", "Sustainability"];

export default function FAQClient() {
  const [open, setOpen] = useState<string | null>(null);
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? faqs : faqs.filter((f) => f.category === category);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div className="bg-[#1A1A1A] pt-24 pb-16">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
                Support
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAF7] mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-[#8A8A8A] max-w-lg">
              Everything you need to know about our products, materials, and our mission.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-premium py-12 max-w-3xl">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`h-8 px-4 rounded-full text-xs font-medium transition-all ${
                category === cat
                  ? "bg-[#1A1A1A] text-[#FAFAF7]"
                  : "bg-[#F0EDE8] text-[#4A4A4A] hover:bg-[#E8E4DC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border border-[#E8E8E8] rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-[#1A1A1A] leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    open === faq.id
                      ? "bg-[#C4956A] text-white"
                      : "bg-[#F0EDE8] text-[#8A8A8A]"
                  }`}
                >
                  {open === faq.id ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === faq.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className="w-full h-px bg-[#E8E8E8] mb-4" />
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
                      <div className="mt-3">
                        <span className="text-xs bg-[#F0EDE8] text-[#8A8A8A] px-2 py-0.5 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-14 text-center p-8 rounded-2xl bg-[#F0EDE8] border border-[#E8E4DC]">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Still Have Questions?</h2>
          <p className="text-sm text-[#8A8A8A] mb-5">
            Our team typically responds within 4 business hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-10 px-6 bg-[#1A1A1A] text-[#FAFAF7] rounded text-sm font-medium hover:bg-[#2D2D2D] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
