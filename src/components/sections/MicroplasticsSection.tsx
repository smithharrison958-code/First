"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { AlertTriangle, Activity, FlaskConical, ShieldX } from "lucide-react";
import { microplasticStats } from "@/lib/data";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  // Extract numeric part for animation
  const numMatch = target.match(/[\d.]+/);
  const prefix = target.match(/^[^0-9]*/)?.[0] ?? "";
  const numStr = numMatch?.[0] ?? "0";
  const num = parseFloat(numStr);

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 15 });
  const display = useTransform(spring, (v) => {
    if (numStr.includes(".")) return `${prefix}${v.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    if (isInView) mv.set(num);
  }, [isInView, mv, num]);

  return <motion.span ref={ref}>{isInView ? display : `${prefix}0${suffix}`}</motion.span>;
}

const icons = [AlertTriangle, Activity, FlaskConical, ShieldX];
const iconColors = ["#E8A820", "#E85050", "#C4956A", "#8FAF8A"];

export default function MicroplasticsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-[#1A1A1A] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(196,149,106,0.15) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #C4956A40, transparent)",
        }}
      />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
              The Invisible Threat
            </span>
            <span className="w-6 h-px bg-[#C4956A]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAFAF7] mb-4 leading-tight">
            You Are What You Cook With
          </h2>
          <p className="text-[#8A8A8A] max-w-2xl mx-auto text-base leading-relaxed">
            The average person ingests microplastics equivalent to a credit card every single week.
            Your kitchen is the primary source. The science is clear — and so is the solution.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {microplasticStats.map((stat, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-dark rounded-xl p-6 border border-white/5 hover:border-[#C4956A]/30 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${iconColors[i]}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: iconColors[i] }} />
                </div>
                <div className="text-3xl font-bold text-[#FAFAF7] mb-1 tabular-nums">
                  <AnimatedCounter
                    target={stat.value.replace(/[^\d.]/g, "")}
                    suffix={stat.value.replace(/[\d.]/g, "")}
                  />
                </div>
                <p className="text-sm font-semibold text-[#C4956A] mb-2">{stat.label}</p>
                <p className="text-xs text-[#8A8A8A] leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* Problem */}
          <div className="rounded-xl p-6 border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">
                The Problem
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#FAFAF7] mb-3">Plastic Kitchen Products</h3>
            <ul className="space-y-2">
              {[
                "Non-stick pans release PFAS and PTFE particles when heated",
                "Plastic cutting boards shed 50mg+ of microplastics per year",
                "Plastic spatulas melt into food at high temperatures",
                "PFAS are linked to cancer, hormone disruption, and immune dysfunction",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#8A8A8A]">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="rounded-xl p-6 border border-[#8FAF8A]/20 bg-[#8FAF8A]/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#8FAF8A]" />
              <span className="text-xs uppercase tracking-wider text-[#8FAF8A] font-semibold">
                The Solution
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#FAFAF7] mb-3">PureLife Kitchen</h3>
            <ul className="space-y-2">
              {[
                "Stainless steel is completely inert at all cooking temperatures",
                "Wood cutting boards are naturally antimicrobial — proven by science",
                "Borosilicate glass won't absorb, leach, or shed any compounds",
                "Cast iron builds a natural non-stick surface that improves with use",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#8A8A8A]">
                  <span className="text-[#8FAF8A] mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
