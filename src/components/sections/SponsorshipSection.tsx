"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const featureCards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Elite Performance",
    desc: "Top-12 nationally ranked, conference champion, and NCAA qualifier with a 1:47.3 personal best in the 800m.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Brand Alignment",
    desc: "Dillon's story of discipline, hard work, and breakthrough performance resonates with audiences across sports, fitness, and lifestyle sectors.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Social Reach",
    desc: "Growing audience across Instagram, TikTok, and YouTube. Prime audience: 18-35 sports enthusiasts, college students, fitness community.",
  },
];

const audienceStats = [
  { value: "5K+", label: "Instagram Followers" },
  { value: "20K+", label: "Monthly Video Views" },
  { value: "18-35", label: "Core Audience Age" },
  { value: "85%", label: "Engagement Rate" },
];

const tiers = [
  {
    name: "TITLE SPONSOR",
    theme: "gold",
    perks: [
      "Custom kit branding",
      "Logo placement on all competition apparel",
      "Dedicated social posts (4/month)",
      "Meet appearance presence",
      "Exclusive content rights",
      "Athlete ambassador contract",
    ],
    cta: "Inquire About Title",
    border: "rgba(255,200,50,0.5)",
    glow: "rgba(255,200,50,0.12)",
    accent: "#FFD84D",
    bg: "rgba(20,16,4,0.95)",
    badge: "Most Exclusive",
    showTeamImage: true,
  },
  {
    name: "OFFICIAL PARTNER",
    theme: "blue",
    perks: [
      "Logo on training apparel",
      "Website feature & bio mention",
      "2 dedicated social posts/month",
      "Event access pass",
      "Co-branded content",
    ],
    cta: "Become a Partner",
    border: "rgba(0,212,255,0.5)",
    glow: "rgba(0,212,255,0.1)",
    accent: "#00D4FF",
    bg: "rgba(4,12,20,0.95)",
    badge: "Most Popular",
    showTeamImage: false,
  },
  {
    name: "BRAND AMBASSADOR",
    theme: "silver",
    perks: [
      "Social mentions (1/month)",
      "Product featuring in training content",
      "Event access",
      "Story tags & highlights",
    ],
    cta: "Start Conversation",
    border: "rgba(180,180,200,0.35)",
    glow: "rgba(180,180,200,0.07)",
    accent: "#B4B4C8",
    bg: "rgba(10,10,16,0.95)",
    badge: null,
    showTeamImage: false,
  },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function HeroSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row mb-20 min-h-[500px] lg:min-h-[600px]"
      style={{ overflow: "hidden" }}
    >
      {/* ── Left: Text header ── */}
      <div
        ref={headerRef}
        className="lg:w-1/2 flex flex-col justify-center py-12 lg:py-16 pr-0 lg:pr-12 z-10 relative"
      >
        <motion.p
          className="text-xs uppercase tracking-widest mb-4 font-semibold"
          style={{ color: "#00D4FF" }}
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Partnership Opportunities
        </motion.p>

        <motion.h2
          className="font-bold text-white leading-[0.9] mb-6"
          style={{ fontFamily: "var(--font-oswald)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          <span className="block text-5xl md:text-7xl">INVEST IN</span>
          <span
            className="block text-5xl md:text-7xl"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff 0%, #00D4FF 50%, #ffffff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "text-shimmer 4s linear infinite",
            }}
          >
            EXCELLENCE
          </span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-white/55 leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
        >
          Align your brand with an elite NCAA athlete who embodies speed, discipline,
          and the American sports dream.
        </motion.p>
      </div>

      {/* ── Right: Image ── */}
      <div className="lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden">
        {/* Gradient overlay blending left edge into section bg */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #050505 0%, transparent 40%)",
          }}
        />

        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          whileHover={{ scale: 1.02 }}
          style={{ transformOrigin: "center" }}
        >
          <Image
            src="/images/dillon-studio-pointing.jpg"
            alt="Dillon Smith pointing at camera"
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({
  card,
  index,
}: {
  card: (typeof featureCards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <motion.div
      ref={ref}
      className="card-dark p-7 flex flex-col gap-4"
      style={{
        background: "rgba(8,8,16,0.9)",
        borderTop: "2px solid rgba(0,212,255,0.35)",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.13, ease }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 50px rgba(0,212,255,0.12)",
        transition: { duration: 0.25 },
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
      >
        {card.icon}
      </div>
      <div>
        <h3
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {card.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed">{card.desc}</p>
      </div>
    </motion.div>
  );
}

function AudienceCard({
  stat,
  index,
}: {
  stat: (typeof audienceStats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.12)",
        borderRadius: "4px",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
    >
      <p
        className="text-3xl md:text-4xl font-bold mb-1"
        style={{ fontFamily: "var(--font-oswald)", color: "#00D4FF" }}
      >
        {stat.value}
      </p>
      <p className="text-xs uppercase tracking-widest text-white/45 font-medium">{stat.label}</p>
    </motion.div>
  );
}

function TierCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col p-7 md:p-8"
      style={{
        background: tier.bg,
        border: `1px solid ${tier.border}`,
        borderRadius: "4px",
        boxShadow: `0 0 40px ${tier.glow}, inset 0 0 40px ${tier.glow}`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease }}
      whileHover={{
        boxShadow: `0 0 60px ${tier.glow}, 0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px ${tier.glow}`,
        y: -4,
        transition: { duration: 0.3 },
      }}
    >
      {tier.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
          style={{
            background: tier.accent,
            color: "#050505",
          }}
        >
          {tier.badge}
        </div>
      )}

      {/* Tier name */}
      <p
        className="text-xs uppercase tracking-widest font-bold mb-1"
        style={{ color: tier.accent }}
      >
        {tier.name}
      </p>
      <div
        className="h-px mb-5 mt-1"
        style={{ background: tier.border }}
      />

      {/* Team image thumbnail — Title Sponsor only */}
      {tier.showTeamImage && (
        <div className="relative w-full h-28 mb-5 overflow-hidden rounded-sm">
          <Image
            src="/images/dillon-relay-team.jpg"
            alt="Dillon Smith relay team"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20,16,4,0.85) 0%, rgba(20,16,4,0.2) 60%, transparent 100%)",
            }}
          />
          <p
            className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest font-bold"
            style={{ color: tier.accent }}
          >
            Team Presence Included
          </p>
        </div>
      )}

      {/* Perks */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5 text-sm text-white/70">
            <svg
              className="flex-shrink-0 mt-0.5"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="7" cy="7" r="6" stroke={tier.accent} strokeWidth="1.5" />
              <path d="M4.5 7L6.5 9L9.5 5.5" stroke={tier.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="mailto:dillonsmith@athlete.com"
        className="block text-center py-3 px-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-200"
        style={{
          border: `1px solid ${tier.border}`,
          color: tier.accent,
          background: `${tier.glow}`,
        }}
        whileHover={{
          background: tier.accent,
          color: "#050505",
          transition: { duration: 0.2 },
        }}
      >
        {tier.cta}
      </motion.a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */

export default function SponsorshipSection() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaInView = useInView(mediaRef, { once: true, amount: 0.4 });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.4 });

  return (
    <section
      id="sponsorship"
      className="relative overflow-hidden section-padding"
      style={{ background: "#050505" }}
    >
      {/* Radial glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.07) 0%, rgba(0,212,255,0.02) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Subtle bottom glow */}
      <div
        className="absolute -bottom-20 left-1/3 w-[500px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-athlete relative z-10">

        {/* ── Hero Split Layout ── */}
        <HeroSplit />

        {/* ── Why Sponsor Dillon ── */}
        <div className="mb-20">
          <motion.h3
            className="text-center text-xs uppercase tracking-widest text-white/35 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Sponsor Dillon
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featureCards.map((card, i) => (
              <FeatureCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* ── Audience Stats ── */}
        <div className="mb-20">
          <motion.h3
            className="text-center text-xs uppercase tracking-widest text-white/35 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Audience Reach
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {audienceStats.map((stat, i) => (
              <AudienceCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>

        {/* ── Partnership Tiers ── */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-xs uppercase tracking-widest text-white/35 mb-2">
              Partnership Tiers
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Choose Your Level
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>

        {/* ── Media Kit ── */}
        <motion.div
          ref={mediaRef}
          className="mb-16 card-dark p-8 md:p-12 text-center"
          style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.12)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={mediaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          <p className="text-xs uppercase tracking-widest text-white/35 mb-3">Media Kit</p>
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Get the Full Picture
          </h3>
          <p className="text-sm md:text-base text-white/55 max-w-xl mx-auto mb-8 leading-relaxed">
            Download our full athlete media kit for detailed statistics, audience demographics,
            and brand partnership rates.
          </p>
          <motion.a
            href="/media-kit.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-sm rounded-sm"
            style={{
              background: "#00D4FF",
              color: "#050505",
              boxShadow: "0 0 30px rgba(0,212,255,0.3)",
            }}
            whileHover={{
              boxShadow: "0 0 50px rgba(0,212,255,0.55)",
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Download icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Media Kit
          </motion.a>
        </motion.div>

        {/* ── Final CTA ── */}
        <motion.div
          ref={ctaRef}
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          <div
            className="h-px mb-12 mx-auto max-w-xs"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)" }}
          />

          <p className="text-xs uppercase tracking-widest text-white/35 mb-4">Get in Touch</p>
          <h3
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Ready to partner with Dillon?
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Email CTA */}
            <motion.a
              href="mailto:dillonsmith@athlete.com"
              className="inline-flex items-center gap-2.5 px-7 py-4 font-bold text-sm uppercase tracking-wider rounded-sm"
              style={{
                background: "#00D4FF",
                color: "#050505",
                boxShadow: "0 0 24px rgba(0,212,255,0.28)",
              }}
              whileHover={{
                boxShadow: "0 0 44px rgba(0,212,255,0.5)",
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              dillonsmith@athlete.com
            </motion.a>

            {/* Schedule call CTA */}
            <motion.a
              href="mailto:dillonsmith@athlete.com?subject=Schedule%20a%20Call"
              className="inline-flex items-center gap-2.5 px-7 py-4 font-bold text-sm uppercase tracking-wider rounded-sm"
              style={{
                border: "1px solid rgba(0,212,255,0.45)",
                color: "#00D4FF",
                background: "transparent",
              }}
              whileHover={{
                background: "rgba(0,212,255,0.08)",
                borderColor: "#00D4FF",
                boxShadow: "0 0 24px rgba(0,212,255,0.15)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.61 16z" />
              </svg>
              Schedule a Call
            </motion.a>
          </div>

          <p className="mt-8 text-xs text-white/25 tracking-wider">
            All partnership inquiries receive a response within 48 hours
          </p>
        </motion.div>

      </div>
    </section>
  );
}
