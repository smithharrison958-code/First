'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Breathing moment — like a film title card between two scenes ─── */
export default function InterludioSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section ref={ref} style={{
      background: '#F8F8F5',
      height: '38vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost "800" — pure graphic texture, barely visible */}
      <motion.span
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(9rem, 35vw, 30rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,0,0,0.055)',
          lineHeight: 1,
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        800
      </motion.span>

      {/* The actual text — centered, intimate scale */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.4 }}
      >
        <p style={{ fontSize: '9px', letterSpacing: '0.52em', color: '#bbb' }}>
          CORPUS CHRISTI ISLANDERS&nbsp;&nbsp;·&nbsp;&nbsp;800M RUNNER&nbsp;&nbsp;·&nbsp;&nbsp;CLASS OF 2026
        </p>
      </motion.div>
    </section>
  )
}
