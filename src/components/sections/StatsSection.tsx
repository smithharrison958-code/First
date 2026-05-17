'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

/* Each stat is its own cinematic beat — no intro, no wrapper.
   Numbers hit like punches, alternating left and right edges. */

const stats = [
  { value: '1:47.3', label: 'PERSONAL BEST · 800M', side: 'left' as const, outline: false },
  { value: '3×', label: 'CONFERENCE CHAMPION', side: 'right' as const, outline: true },
  { value: '14', label: 'CAREER VICTORIES', side: 'left' as const, outline: false },
  { value: '2', label: 'NCAA APPEARANCES', side: 'right' as const, outline: true },
]

function StatBeat({ value, label, side, outline }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: `4.5vh 7vw`,
        display: 'flex',
        justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <div>
        {/* Stat number — clips in from the side it lives on */}
        <motion.div
          style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(4.5rem, 18vw, 16rem)',
            lineHeight: 0.85,
            color: outline ? 'transparent' : '#0A0A0A',
            WebkitTextStroke: outline ? '1.5px rgba(0,0,0,0.5)' : undefined,
            letterSpacing: '-0.02em',
          }}
          initial={{ clipPath: side === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
          animate={inView ? { clipPath: side === 'left' ? 'inset(0 0% 0 0)' : 'inset(0 0 0 0%)' } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.div>

        {/* Label — fades in after number lands */}
        <motion.p
          style={{
            fontSize: '9px',
            letterSpacing: '0.42em',
            color: '#777',
            marginTop: '1.25rem',
            textAlign: side,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          {label}
        </motion.p>
      </div>
    </div>
  )
}

function RaceInterlude() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} style={{ position: 'relative', height: '52vh', overflow: 'hidden' }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.07 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/dillon-race.jpg"
          alt="Dillon racing"
          fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </motion.div>
      {/* Bleeds into section colour on all sides */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F2F2EF 0%, transparent 20%, transparent 80%, #F2F2EF 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F2F2EF 0%, transparent 32%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F2F2EF 0%, transparent 28%)' }} />

      <motion.p
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px', letterSpacing: '0.46em', color: 'rgba(0,0,0,0.38)',
          whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        NCAA QUALIFIER · TEXAS RELAYS 2025
      </motion.p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section id="performance" style={{ background: '#F2F2EF' }}>
      {/* No intro heading — first number hits immediately */}
      <div style={{ paddingTop: '8vh' }} />
      {stats.map(s => <StatBeat key={s.label} {...s} />)}
      <RaceInterlude />
      <div style={{ height: '8vh' }} />
    </section>
  )
}
