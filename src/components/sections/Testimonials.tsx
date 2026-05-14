"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section ref={ref} className="section-padding bg-[#FAFAF7]">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
              Testimonials
            </span>
            <span className="w-6 h-px bg-[#C4956A]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C4956A] text-[#C4956A]" />
            ))}
            <span className="text-sm text-[#8A8A8A] ml-2">4.8 average from 2,500+ reviews</span>
          </div>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 mb-8">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.id}-${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-[#E8E8E8] hover:border-[#C4956A]/30 transition-colors shadow-sm"
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 border border-[#E8E8E8] shadow-sm"
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center hover:border-[#C4956A] hover:text-[#C4956A] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-5 h-2 bg-[#C4956A]"
                    : "w-2 h-2 bg-[#E8E8E8] hover:bg-[#C4956A]/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center hover:border-[#C4956A] hover:text-[#C4956A] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <>
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#C4956A] text-[#C4956A]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-[#1A1A1A]">{testimonial.name}</p>
            {testimonial.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-[#8FAF8A]" />
            )}
          </div>
          <p className="text-xs text-[#8A8A8A]">{testimonial.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#C4956A] font-medium">{testimonial.product}</p>
          <p className="text-xs text-[#8A8A8A]">{testimonial.date}</p>
        </div>
      </div>
    </>
  );
}
