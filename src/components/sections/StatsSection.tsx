'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '1:47.3', label: 'PERSONAL BEST · 800M', side: 'left' as const, outline: false },
  { value: '3×', label: 'CONFERENCE CHAMPION', side: 'right' as const, outline: true },
  { value: '14', label: 'CAREER VICTORIES', side: 'left' as const, outline: false },
  { value: '2', label: 'NCAA APPEARANCES', side: 'right' as const, outline: true },
]

function StatRow({ value, label, side, outline }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
        padding: `3vh ${side === 'right' ? '7vw' : '0'} 3vh ${side === 'left' ? '7vw' : '0'}`,
      }}
    >
      <div style={{ textAlign: side }}>
        <motion.div
          style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 16vw, 14rem)',
            lineHeight: 0.88,
            color: outline ? 'transparent' : '#0A0A0A',
            WebkitTextStroke: outline ? '1px rgba(0,0,0,0.15)' : undefined,
          }}
          initial={{ clipPath: side === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={inView ? { clipPath: side === 'left' ? 'inset(0 0% 0 0)' : 'inset(0 0 0 0%)' } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.div>
        <motion.p
          style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#bbb', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {label}
        </motion.p>
      </div>
    </div>
  )
}

function RaceMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <div ref={ref} style={{ position: 'relative', height: '55vh', overflow: 'hidden' }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/dillon-race.jpg"
          alt="Dillon racing"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
        />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F2F2EF 0%, transparent 22%, transparent 78%, #F2F2EF 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F2F2EF 0%, transparent 28%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F2F2EF 0%, transparent 22%)' }} />

      <motion.p
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px',
          letterSpacing: '0.45em',
          color: 'rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        NCAA QUALIFIER · TEXAS RELAYS 2025
      </motion.p>
    </div>
  )
}

export default function StatsSection() {
  const headerRef = useRef<HTMLElement>(null)
  const headerIn = useInView(headerRef, { once: true, amount: 0.1 })

  return (
    <section id="performance" ref={headerRef} style={{ background: '#F2F2EF' }}>

      {/* Section header */}
      <motion.div
        style={{ padding: '12vh 7vw 6vh', display: 'flex', alignItems: 'center', gap: '1rem' }}
        initial={{ opacity: 0 }}
        animate={headerIn ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
        <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#aaa' }}>BY THE NUMBERS</span>
      </motion.div>

      {/* Stats — alternating left/right, full edge-to-edge */}
      {stats.map(s => <StatRow key={s.label} {...s} />)}

      {/* Race photo interlude */}
      <RaceMoment />

      <div style={{ height: '10vh' }} />
    </section>
  )
}
