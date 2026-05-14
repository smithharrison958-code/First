"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Inline SVG social icons — no external icon library required
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.743l7.733-8.835L2.083 2.25h6.962l4.264 5.633 5.935-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    Icon: XIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    Icon: YouTubeIcon,
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <footer
      ref={ref}
      style={{ backgroundColor: "#050505", position: "relative" }}
    >
      {/* Animated top line */}
      <div
        style={{
          overflow: "hidden",
          height: 1,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.04)",
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "left center",
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, #00D4FF 40%, rgba(0,212,255,0.4) 70%, transparent 100%)",
            boxShadow: "0 0 12px rgba(0,212,255,0.5)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4.5rem 1.5rem 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Large DS Monogram with pulsing glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", display: "inline-block" }}
        >
          {/* Animated glow bloom */}
          <motion.span
            aria-hidden
            animate={{
              opacity: [0.25, 0.5, 0.25],
              filter: ["blur(28px)", "blur(38px)", "blur(28px)"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(4rem, 12vw, 6.5rem)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "2px #00D4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            DS
          </motion.span>
          {/* Crisp monogram */}
          <span
            style={{
              fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
              fontSize: "clamp(4rem, 12vw, 6.5rem)",
              fontWeight: 900,
              color: "transparent",
              WebkitTextStroke: "1.5px #00D4FF",
              textShadow:
                "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
              lineHeight: 1,
              display: "block",
              position: "relative",
            }}
          >
            DS
          </span>
        </motion.div>

        {/* Name & Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{
            marginTop: "1.25rem",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
          }}
        >
          Dillon Smith&nbsp;&nbsp;·&nbsp;&nbsp;800M Runner&nbsp;&nbsp;·&nbsp;&nbsp;Corpus Christi University
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <SocialButton key={label} label={label} href={href}>
              <Icon />
            </SocialButton>
          ))}
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "2rem",
            color: "rgba(0,212,255,0.45)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <LocationPinIcon />
          Corpus Christi, Texas
        </motion.p>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.05)",
            margin: "2rem 0",
          }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          style={{
            color: "rgba(255,255,255,0.22)",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
          }}
        >
          &copy; 2026 Dillon Smith. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

interface SocialButtonProps {
  label: string;
  href: string;
  children: React.ReactNode;
}

function SocialButton({ label, href, children }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        transition: "border-color 0.22s ease, color 0.22s ease, box-shadow 0.22s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "#00D4FF";
        el.style.color = "#00D4FF";
        el.style.boxShadow = "0 0 14px rgba(0,212,255,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(255,255,255,0.12)";
        el.style.color = "rgba(255,255,255,0.45)";
        el.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}
