'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '1:47.3', label: 'PERSONAL BEST · 800M', align: 'left' as const, outline: false },
  { value: '3×', label: 'CONFERENCE CHAMPION', align: 'right' as const, outline: true },
  { value: '14', label: 'CAREER VICTORIES', align: 'center' as const, outline: false },
  { value: '2', label: 'NCAA APPEARANCES', align: 'left' as const, outline: false },
]

function Stat({ value, label, align, outline, delay = 0 }: typeof stats[0] & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const alignment = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <motion.div
      ref={ref}
      className={alignment}
      style={{
        padding: `4vw ${align === 'right' ? '7vw' : align === 'center' ? '7vw' : '7vw'}`,
        paddingRight: align === 'right' ? '7vw' : align === 'center' ? '7vw' : '20vw',
        paddingLeft: align === 'left' ? '7vw' : align === 'center' ? '7vw' : '20vw',
        borderTop: '1px solid rgba(0,0,0,0.07)',
        position: 'relative',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {align === 'left' && (
        <motion.div style={{ position: 'absolute', left: '5.5vw', top: '50%', transform: 'translateY(-50%)', width: 1, height: 48, background: '#0A0A0A', opacity: 0.15 }}
          initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 0.6, delay: delay + 0.2 }} />
      )}
      <motion.div
        style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 15vw, 13rem)',
          lineHeight: 0.88,
          color: outline ? 'transparent' : '#0A0A0A',
          WebkitTextStroke: outline ? '1px rgba(0,0,0,0.18)' : undefined,
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.05 }}
      >
        {value}
      </motion.div>
      <motion.p
        style={{ fontSize: '9px', letterSpacing: '0.38em', color: '#999', marginTop: '0.75rem' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

function RaceMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <div ref={ref} style={{ position: 'relative', height: '50vh', overflow: 'hidden', margin: '0' }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.06 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/images/dillon-race.jpg" alt="Dillon racing" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
      </motion.div>
      {/* Blend edges */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F2F2EF 0%, transparent 20%, transparent 80%, #F2F2EF 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F2F2EF 0%, transparent 30%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F2F2EF 0%, transparent 25%)' }} />
      <motion.p
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(0,0,0,0.45)', whiteSpace: 'nowrap' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        NCAA QUALIFIER · 2025
      </motion.p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="performance" ref={ref} style={{ background: '#F2F2EF' }}>
      <motion.div
        style={{ textAlign: 'center', paddingTop: '10vh', paddingBottom: '4vh' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#999' }}>BY THE NUMBERS</p>
        <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.2)', margin: '1rem auto 0' }} />
      </motion.div>

      {stats.map((s, i) => <Stat key={s.label} {...s} delay={0} />)}

      <RaceMoment />

      <div style={{ height: '8vh' }} />
    </section>
  )
}
