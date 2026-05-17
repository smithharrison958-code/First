"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRaceDay } from "@/lib/context";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Performance", href: "#performance" },
  { label: "Highlights", href: "#highlights" },
  { label: "Sponsorship", href: "#sponsorship" },
  { label: "Contact", href: "#contact" },
];

function smoothScrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { isRaceDay, toggleRaceDay } = useRaceDay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled
            ? "rgba(248,248,245,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
          transition:
            "background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.5rem",
          }}
        >
          {/* DS Monogram */}
          <button
            onClick={() => smoothScrollTo("body")}
            aria-label="Back to top"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
                fontSize: "1.75rem",
                fontWeight: 900,
                color: "transparent",
                WebkitTextStroke: "1.5px #0A0A0A",
                textShadow:
                  "0 0 14px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.25)",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              DS
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center"
            style={{ gap: "2.25rem" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                active={activeLink === link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  handleNavClick(link.href);
                }}
              />
            ))}
          </nav>

          {/* Sponsor CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="#sponsorship"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#sponsorship");
              }}
              className="hidden md:flex items-center"
              style={{
                padding: "0.5rem 1.25rem",
                border: "1px solid rgba(0,0,0,0.5)",
                color: "#0A0A0A",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition:
                  "background-color 0.22s ease, color 0.22s ease",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#00D4FF";
                (e.currentTarget as HTMLAnchorElement).style.color = "#050505";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#00D4FF";
              }}
            >
              Sponsor Dillon
            </a>

            {/* Race Day Mode toggle */}
            <button
              onClick={toggleRaceDay}
              title={isRaceDay ? "Exit Race Day Mode" : "Race Day Mode"}
              aria-label="Toggle Race Day Mode"
              style={{
                background: isRaceDay ? "#0A0A0A" : "transparent",
                border: "1px solid rgba(0,0,0,0.2)",
                color: isRaceDay ? "#F8F8F5" : "#0A0A0A",
                padding: "0.35rem 0.65rem",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                fontFamily: "'Oswald', sans-serif",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "all 0.2s ease",
                cursor: "none",
              }}
            >
              {isRaceDay ? "⚡ RACE ON" : "⚡ RACE DAY"}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden flex flex-col justify-center items-center"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                width: 32,
                height: 32,
                position: "relative",
              }}
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 0, opacity: 1 }
                    : { rotate: 0, y: -5, opacity: 1 }
                }
                style={{
                  position: "absolute",
                  height: 1.5,
                  width: 22,
                  backgroundColor: "#0A0A0A",
                  borderRadius: 2,
                  display: "block",
                }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: 0, opacity: 1 }
                    : { rotate: 0, y: 5, opacity: 1 }
                }
                style={{
                  position: "absolute",
                  height: 1.5,
                  width: 22,
                  backgroundColor: "#0A0A0A",
                  borderRadius: 2,
                  display: "block",
                }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 49,
              backgroundColor: "#080808",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {/* Decorative glow */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontFamily: "'Oswald', 'Impact', sans-serif",
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#00D4FF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#0A0A0A";
                }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.a
              href="#sponsorship"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#sponsorship");
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.38 }}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 2rem",
                border: "1px solid rgba(0,0,0,0.5)",
                color: "#0A0A0A",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              Sponsor Dillon
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavLinkProps {
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

function NavLink({ label, href, active, onClick }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "none",
        padding: "0.25rem 0",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: "0.78rem",
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: active || hovered ? "#00D4FF" : "rgba(255,255,255,0.75)",
        transition: "color 0.2s ease",
      }}
      aria-label={`Navigate to ${label}`}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        animate={{ scaleX: hovered || active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: "#00D4FF",
          transformOrigin: "left center",
          display: "block",
          boxShadow: "0 0 6px rgba(0,212,255,0.8)",
        }}
      />
    </button>
  );
}
