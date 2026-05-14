"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const NAME_LETTERS = "DILLON SMITH".split("");

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#050505" }}
        >
          {/* DS Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Glow bloom behind the letters */}
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
                fontSize: "clamp(7rem, 18vw, 11rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: "2px #00D4FF",
                filter: "blur(22px)",
                opacity: 0.4,
              }}
            >
              DS
            </span>
            {/* Crisp outlined monogram */}
            <span
              style={{
                fontFamily: "'Oswald', 'Impact', 'Arial Black', sans-serif",
                fontSize: "clamp(7rem, 18vw, 11rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: "2px #00D4FF",
                textShadow:
                  "0 0 30px rgba(0,212,255,0.65), 0 0 70px rgba(0,212,255,0.3), 0 0 120px rgba(0,212,255,0.15)",
                position: "relative",
              }}
            >
              DS
            </span>
          </motion.div>

          {/* DILLON SMITH — staggered letter reveal */}
          <div
            className="flex mt-5 overflow-hidden"
            aria-label="Dillon Smith"
          >
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.45 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  color: "#FFFFFF",
                  fontFamily: "'Oswald', 'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* 800M · CORPUS CHRISTI */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            style={{
              marginTop: "0.6rem",
              color: "rgba(0,212,255,0.72)",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
            }}
          >
            800M · CORPUS CHRISTI
          </motion.p>

          {/* Progress bar */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden"
            style={{
              width: "12rem",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 2.3,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "left center",
                height: "100%",
                width: "100%",
                background: "linear-gradient(90deg, #00D4FF 0%, rgba(0,212,255,0.4) 100%)",
                boxShadow: "0 0 10px rgba(0,212,255,0.9)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
