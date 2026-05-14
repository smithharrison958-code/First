"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!(
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("input") ||
        el.closest("textarea") ||
        el.closest("select")
      );
      if (interactive !== hoveredRef.current) {
        hoveredRef.current = interactive;
        setHovered(interactive);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const dot = dotRef.current;
      const ringEl = ringRef.current;

      if (dot) {
        dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }

      if (ringEl) {
        ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
        ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
        const size = hoveredRef.current ? 44 : 28;
        ringEl.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
        ringEl.style.width = `${size}px`;
        ringEl.style.height = `${size}px`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      {/* Outer ring — lerp lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1.5px solid #00D4FF`,
          backgroundColor: hovered ? "rgba(0,212,255,0.15)" : "transparent",
          boxShadow: "0 0 8px rgba(0,212,255,0.4)",
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform",
          transition: "background-color 0.2s ease, width 0.2s ease, height 0.2s ease",
        }}
      />
    </>
  );
}
