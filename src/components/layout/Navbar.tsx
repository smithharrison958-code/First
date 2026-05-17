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
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { isRaceDay, toggleRaceDay } = useRaceDay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          /* Apple-style: frosted glass always present, denser on scroll */
          backgroundColor: scrolled ? "rgba(248,248,245,0.96)" : "rgba(248,248,245,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(0,0,0,0.05)",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4.25rem",
        }}>

          {/* DS Monogram — solid, clean */}
          <button
            onClick={() => smoothScrollTo("body")}
            aria-label="Back to top"
            style={{ background: "none", border: "none", padding: 0, cursor: "none" }}
          >
            <span style={{
              fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "#0A0A0A",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}>
              DS
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center" style={{ gap: "2.5rem" }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                active={activeLink === link.href}
                onClick={() => { setActiveLink(link.href); handleNavClick(link.href); }}
              />
            ))}
          </nav>

          {/* Right side — CTA + race day + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="#sponsorship"
              onClick={(e) => { e.preventDefault(); handleNavClick("#sponsorship"); }}
              className="hidden md:flex items-center"
              style={{
                padding: "0.45rem 1.1rem",
                border: "1px solid rgba(0,0,0,0.55)",
                color: "#0A0A0A",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#0A0A0A";
                el.style.color = "#F8F8F5";
                el.style.borderColor = "#0A0A0A";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "transparent";
                el.style.color = "#0A0A0A";
                el.style.borderColor = "rgba(0,0,0,0.55)";
              }}
            >
              Sponsor Dillon
            </a>

            {/* Race Day toggle — subtle */}
            <button
              onClick={toggleRaceDay}
              title={isRaceDay ? "Exit Race Day Mode" : "Race Day Mode"}
              aria-label="Toggle Race Day Mode"
              style={{
                background: isRaceDay ? "#0A0A0A" : "transparent",
                border: "1px solid rgba(0,0,0,0.15)",
                color: isRaceDay ? "#F8F8F5" : "rgba(0,0,0,0.45)",
                padding: "0.3rem 0.6rem",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                fontFamily: "'Oswald', sans-serif",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "all 0.2s ease",
                cursor: "none",
              }}
            >
              {isRaceDay ? "⚡ ON" : "⚡"}
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                width: 32,
                height: 32,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                style={{ position: "absolute", height: 1.5, width: 22, backgroundColor: "#0A0A0A", borderRadius: 2 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                style={{ position: "absolute", height: 1.5, width: 22, backgroundColor: "#0A0A0A", borderRadius: 2 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay — dark, full-screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 49,
              backgroundColor: "#0A0A0A",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.75rem",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.32, delay: 0.05 + i * 0.055 }}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: 700,
                  color: "rgba(248,248,245,0.85)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00D4FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(248,248,245,0.85)"; }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.a
              href="#sponsorship"
              onClick={(e) => { e.preventDefault(); handleNavClick("#sponsorship"); }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, delay: 0.33 }}
              style={{
                marginTop: "0.75rem",
                padding: "0.7rem 2rem",
                border: "1px solid rgba(248,248,245,0.25)",
                color: "rgba(248,248,245,0.8)",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.75rem",
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
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        /* Dark text — readable over the light frosted glass nav */
        color: active || hovered ? "#0A0A0A" : "rgba(10,10,10,0.52)",
        transition: "color 0.18s ease",
      }}
      aria-label={`Navigate to ${label}`}
    >
      {label}
      <motion.span
        animate={{ scaleX: hovered || active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#0A0A0A",
          transformOrigin: "left center",
          display: "block",
        }}
      />
    </button>
  );
}
