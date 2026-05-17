'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

/* One dark, high-contrast section for visual rhythm — the sole dark moment */
export default function CinematicSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}>
      {/* Photo — slow Ken Burns on enter */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/dillon-race.jpg"
          alt="Dillon Smith mid-race"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 25%, transparent 70%, #0A0A0A 100%)' }} />

      {/* Text */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '8vw' }}>
        {['EVERY', 'SECOND', 'COUNTS'].map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.span
              style={{
                display: 'block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 13vw, 12rem)',
                lineHeight: 0.88,
                color: i === 1 ? 'transparent' : '#fff',
                WebkitTextStroke: i === 1 ? '1px rgba(255,255,255,0.35)' : undefined,
              }}
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {line}
            </motion.span>
          </div>
        ))}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.4)' }}>800M · CORPUS CHRISTI ISLANDERS</span>
        </motion.div>
      </div>
    </section>
  )
}
