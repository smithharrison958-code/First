"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#1A1A1A" }}
        >
          {/* Animated logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Icon mark */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="relative w-16 h-16"
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="32" cy="32" r="30" stroke="#C4956A" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="32" cy="32" r="20" stroke="#C4956A" strokeWidth="0.75" opacity="0.5" />
                <path
                  d="M32 12 L35 29 L52 32 L35 35 L32 52 L29 35 L12 32 L29 29 Z"
                  fill="#C4956A"
                  opacity="0.9"
                />
              </svg>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-2xl font-light tracking-[0.3em] uppercase"
                  style={{ color: "#FAFAF7" }}
                >
                  PureLife
                </span>
                <span
                  className="text-2xl font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#C4956A" }}
                >
                  Kitchen
                </span>
              </div>
              <p
                className="text-xs tracking-[0.25em] uppercase font-light"
                style={{ color: "#8A8A8A" }}
              >
                Cook Without Compromise
              </p>
            </motion.div>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40"
          >
            <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.3,
                }}
                className="absolute inset-y-0 left-0 right-0 loading-bar"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
