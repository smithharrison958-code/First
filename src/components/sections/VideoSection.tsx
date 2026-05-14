"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const clips = [
  {
    title: "Conference 800M – 2024",
    duration: "1:48",
    label: "Silver Medal Race",
  },
  {
    title: "Training Highlights – Summer 2025",
    duration: "3:45",
    label: "Pre-Season",
  },
  {
    title: "Post-Race Interview",
    duration: "0:58",
    label: "2025 Conference Champs",
  },
];

/* ─────────────────────────────────────────────
   Play button
───────────────────────────────────────────── */

function PlayButton({ size = 80 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        border: "2px solid #00D4FF",
        boxShadow: "0 0 0 0 rgba(0,212,255,0.4)",
        animation: "pulse-glow 2s ease-in-out infinite",
      }}
    >
      {/* Triangle */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: `${size * 0.2}px solid transparent`,
          borderBottom: `${size * 0.2}px solid transparent`,
          borderLeft: `${size * 0.33}px solid white`,
          marginLeft: size * 0.06,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Video Card
───────────────────────────────────────────── */

function MainVideoCard() {
  const [played, setPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative w-full cursor-pointer group"
      style={{ aspectRatio: "16/9" }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
      onClick={() => setPlayed(true)}
    >
      {played ? (
        /* YouTube iframe revealed on click */
        <iframe
          className="absolute inset-0 w-full h-full rounded-sm"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="2025 Conference Championships · 800M Final"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        /* Styled placeholder */
        <div
          className="absolute inset-0 rounded-sm overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0A0A14 0%, #080820 40%, #050510 70%, #020208 100%)",
          }}
        >
          {/* Track lane lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top: `${10 + i * 11}%`,
                  height: "1px",
                  background:
                    i === 3
                      ? "rgba(0,212,255,0.3)"
                      : "rgba(255,255,255,0.04)",
                  transform: `perspective(800px) rotateX(60deg) translateY(${i * 6}px)`,
                }}
              />
            ))}
          </div>
          {/* Glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(0,212,255,0.08) 0%, transparent 65%)",
            }}
          />
          {/* Overlay text top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span
              className="text-xs uppercase tracking-widest px-2 py-1 rounded"
              style={{
                color: "#00D4FF",
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              Live Highlights
            </span>
            <span
              className="text-xs font-bold px-2 py-1 rounded"
              style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
            >
              2:34
            </span>
          </div>
          {/* Centre play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <PlayButton size={80} />
          </div>
          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-5 z-10"
            style={{
              background:
                "linear-gradient(transparent, rgba(0,0,0,0.85))",
            }}
          >
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
              2025 Season
            </p>
            <p
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              2025 Conference Championships · 800M Final
            </p>
          </div>
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,212,255,0.04)" }}
          />
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Small Clip Card
───────────────────────────────────────────── */

function ClipCard({
  clip,
  index,
}: {
  clip: (typeof clips)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer group"
      style={{ aspectRatio: "16/9" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 30px rgba(0,212,255,0.2)",
        transition: { duration: 0.25 },
      }}
    >
      <div
        className="absolute inset-0 rounded-sm overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #080814 0%, #0A0A1A 60%, #050510 100%)`,
        }}
      >
        {/* Lane texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,212,255,0.06) 18px, rgba(0,212,255,0.06) 19px)",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayButton size={44} />
        </div>
        {/* Duration badge */}
        <span
          className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.75)", color: "white" }}
        >
          {clip.duration}
        </span>
        {/* Bottom info */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3"
          style={{
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          }}
        >
          <p className="text-white/40 text-[10px] uppercase tracking-wider">
            {clip.label}
          </p>
          <p
            className="text-white text-sm font-medium leading-tight"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {clip.title}
          </p>
        </div>
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,212,255,0.05)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */

export default function VideoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const clipsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="highlights"
      className="relative overflow-hidden section-padding"
      style={{ background: "#000000" }}
    >
      {/* Speed-line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
        }}
      />

      <div className="container-athlete relative z-10">
        {/* ── Kinetic header ── */}
        <div ref={headerRef} className="mb-12 text-left">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="leading-[0.9] font-bold"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              <span className="block text-[3.5rem] sm:text-[7rem] text-white">
                WATCH DILLON
              </span>
              {/* Shimmer word */}
              <span
                className="block text-[3.5rem] sm:text-[7rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ffffff 0%, #00D4FF 40%, #ffffff 70%, #00D4FF 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "text-shimmer 3s linear infinite",
                }}
              >
                COMPETE
              </span>
            </h2>
          </motion.div>

          {/* Sub label */}
          <motion.p
            className="mt-4 text-sm uppercase tracking-widest text-white/40"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Race footage &amp; training highlights
          </motion.p>
        </div>

        {/* ── Main video ── */}
        <div className="mb-6">
          <MainVideoCard />
        </div>

        {/* ── Three clips ── */}
        <div
          ref={clipsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {clips.map((clip, i) => (
            <ClipCard key={clip.title} clip={clip} index={i} />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="track-line mt-12"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
