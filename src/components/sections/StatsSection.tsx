"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const raceEvents = [
  {
    year: "2023",
    event: "Conference Championship",
    time: "1:49.2",
    result: "Bronze Medal",
  },
  {
    year: "2023",
    event: "Regional Qualifier",
    time: "1:48.8",
    result: "Top 8 Finish",
  },
  {
    year: "2024",
    event: "Conference Championship",
    time: "1:47.9",
    result: "Silver Medal",
  },
  {
    year: "2024",
    event: "NCAA Qualifier",
    time: "1:48.1",
    result: "Qualified for Nationals",
  },
  {
    year: "2025",
    event: "Conference Championship",
    time: "1:47.3",
    result: "Gold Medal — Personal Best",
  },
  {
    year: "2025",
    event: "NCAA Championship",
    time: "1:47.6",
    result: "Top 12 Nationally",
  },
];

const statCards = [
  { value: "800M", label: "Primary Distance" },
  { value: "1:47.3", label: "Personal Best" },
  { value: "70 mi/wk", label: "Training Volume" },
  { value: "Top 12", label: "National Ranking" },
];

const splits = [
  { label: "First 400M", time: "53.1s", pct: 49.5 },
  { label: "Second 400M", time: "54.2s", pct: 50.5 },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function SplitBar({
  label,
  time,
  pct,
  delay,
}: {
  label: string;
  time: string;
  pct: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/60 uppercase tracking-wider font-medium">
          {label}
        </span>
        <span
          className="text-sm font-bold"
          style={{ color: "#00D4FF" }}
        >
          {time}
        </span>
      </div>
      <div
        className="relative h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #00D4FF, #0099CC)",
            boxShadow: "0 0 16px rgba(0,212,255,0.55)",
          }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : { width: "0%" }}
          transition={{
            duration: 1.1,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}

function TimelineEvent({
  item,
  index,
  isLast,
  horizontal,
}: {
  item: (typeof raceEvents)[0];
  index: number;
  isLast: boolean;
  horizontal: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={
        horizontal
          ? "flex flex-col items-center relative flex-1"
          : "flex items-start gap-4 relative"
      }
      initial={{ opacity: 0, y: horizontal ? 20 : 0, x: horizontal ? 0 : -16 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dot */}
      <div
        className={`relative z-10 flex-shrink-0 ${horizontal ? "mb-3" : "mt-1"}`}
      >
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: "#00D4FF",
            background: "#050505",
            boxShadow: "0 0 10px rgba(0,212,255,0.5)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#00D4FF" }}
          />
        </div>
      </div>

      {/* Text */}
      <div className={`${horizontal ? "text-center px-1" : "pb-8"} min-w-0`}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-0.5"
          style={{ color: "#00D4FF" }}
        >
          {item.year}
        </p>
        <p className="text-xs text-white/50 mb-1 leading-tight">{item.event}</p>
        <p
          className="text-lg font-bold mb-0.5"
          style={{ fontFamily: "var(--font-oswald)", color: "#00D4FF" }}
        >
          {item.time}
        </p>
        <p className="text-xs text-white/40 leading-tight">{item.result}</p>
      </div>

      {/* Connector line (vertical) rendered inside non-last items */}
      {!horizontal && !isLast && (
        <div
          className="absolute left-[7px] top-5 bottom-0 w-px"
          style={{ background: "rgba(0,212,255,0.2)" }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Animated horizontal line (desktop)
───────────────────────────────────────────── */

function HorizontalLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="relative h-px mx-8 mb-0" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #00D4FF, rgba(0,212,255,0.3))",
          boxShadow: "0 0 8px rgba(0,212,255,0.4)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */

export default function StatsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section
      id="performance"
      className="relative overflow-hidden section-padding"
      style={{ background: "#050505" }}
    >
      {/* Diagonal blue stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(0,212,255,0.05) 50%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-athlete relative z-10">
        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16 text-center">
          <motion.p
            className="text-xs uppercase tracking-widest mb-3 font-semibold"
            style={{ color: "#00D4FF" }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            By the Numbers
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Race. Perform. Dominate.
          </motion.h2>
          <motion.div
            className="track-line mt-6 mx-auto"
            style={{ maxWidth: 120 }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

        {/* ── Race Timeline ── */}
        <div className="mb-20">
          {/* Desktop: horizontal */}
          <div className="hidden md:block">
            <HorizontalLine />
            <div className="flex items-start mt-0 gap-0">
              {raceEvents.map((ev, i) => (
                <TimelineEvent
                  key={i}
                  item={ev}
                  index={i}
                  isLast={i === raceEvents.length - 1}
                  horizontal
                />
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col">
            {raceEvents.map((ev, i) => (
              <TimelineEvent
                key={i}
                item={ev}
                index={i}
                isLast={i === raceEvents.length - 1}
                horizontal={false}
              />
            ))}
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {statCards.map((card, i) => (
            <StatCard key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* ── Split Visualization ── */}
        <SplitSection />
      </div>
    </section>
  );
}

function StatCard({
  card,
  index,
}: {
  card: { value: string; label: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="card-dark hover-lift p-6 flex flex-col items-center text-center"
      style={{
        borderTop: "2px solid #00D4FF",
        background: "rgba(13,13,20,0.9)",
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 60px rgba(0,212,255,0.15)",
        transition: { duration: 0.25 },
      }}
    >
      <p
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{
          fontFamily: "var(--font-oswald)",
          color: "#00D4FF",
        }}
      >
        {card.value}
      </p>
      <p className="text-xs uppercase tracking-widest text-white/50 font-medium">
        {card.label}
      </p>
    </motion.div>
  );
}

function SplitSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="card-dark p-8 md:p-10"
      style={{ background: "rgba(13,13,20,0.9)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 rounded-full" style={{ background: "#00D4FF" }} />
        <h3
          className="text-xl md:text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Split Time Breakdown
        </h3>
        <span className="text-xs text-white/30 ml-2">(800M Personal Best · 1:47.3)</span>
      </div>
      {splits.map((s, i) => (
        <SplitBar
          key={s.label}
          label={s.label}
          time={s.time}
          pct={s.pct}
          delay={i * 0.2}
        />
      ))}
      <p className="text-xs text-white/30 mt-4 text-center">
        Combined: 107.3s &nbsp;·&nbsp; Even split strategy
      </p>
    </motion.div>
  );
}
