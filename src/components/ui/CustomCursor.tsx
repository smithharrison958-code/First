"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  // Exact position for the small dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Raw position values fed into springs for the ring
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const ringX = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.8 });
  const ringY = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.8 });

  const [hovered, setHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const isInteractive = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false;
      return !!(
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("[data-cursor-hover]")
      );
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovered(true);
    };
    const onMouseOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovered(false);
    };

    const tick = () => {
      dotX.set(posRef.current.x);
      dotY.set(posRef.current.y);
      rawX.set(posRef.current.x);
      rawY.set(posRef.current.y);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [dotX, dotY, rawX, rawY]);

  return (
    <>
      {/* Small white dot — exact tracking */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Lagging ring with spring physics */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          pointerEvents: "none",
          borderRadius: "50%",
          borderStyle: "solid",
        }}
        animate={{
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          borderWidth: 1.5,
          borderColor: "#00D4FF",
          backgroundColor: hovered ? "rgba(0,212,255,0.14)" : "rgba(0,212,255,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
