'use client'

import React, { useId } from 'react'

/* ─────────────────────────────────────────────
   GrainOverlay
   Fixed-position film grain texture rendered via
   an SVG feTurbulence filter.  The element sits at
   z-50 with pointer-events-none so it never blocks
   interaction.  The CSS `grain` keyframe (defined
   in globals.css) randomly shifts the element's
   transform at 0.4 s steps to give organic flicker.
───────────────────────────────────────────── */

interface GrainOverlayProps {
  /** 0–1  — defaults to 0.035 for a subtle luxury finish */
  opacity?: number
  /** SVG feTurbulence baseFrequency — defaults to 0.65 */
  baseFrequency?: number
  /** Number of turbulence octaves — defaults to 4 */
  numOctaves?: number
}

export default function GrainOverlay({
  opacity = 0.035,
  baseFrequency = 0.65,
  numOctaves = 4,
}: GrainOverlayProps) {
  // Stable unique id so the SVG filter ref stays collision-free
  // even when multiple instances are server-rendered.
  const uid = useId().replace(/:/g, '')
  const filterId = `grain-filter-${uid}`

  return (
    <>
      {/* SVG that hosts the feTurbulence filter definition.
          Rendered at 0 × 0 so it takes no layout space. */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="linearRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              stitchTiles="stitch"
              result="noiseOut"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noiseOut"
              result="greyNoise"
            />
            <feBlend
              in="SourceGraphic"
              in2="greyNoise"
              mode="multiply"
              result="blended"
            />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Overlay div — fills the viewport and applies the grain filter */}
      <div
        aria-hidden="true"
        className="grain-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 50,
          opacity,
          // Use the SVG filter for richness; the CSS `grain` animation
          // (translate steps) adds temporal flicker on top.
          filter: `url(#${filterId})`,
          // Slightly oversized so the shifted translate never shows an edge
          transform: 'scale(1.05)',
          willChange: 'transform',
          // Animation defined in globals.css: grain 0.4s steps(1) infinite
          animation: 'grain 0.4s steps(1) infinite',
          // Fallback background for browsers without SVG filter support
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  )
}
