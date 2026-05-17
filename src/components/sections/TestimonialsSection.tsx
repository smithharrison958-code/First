'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  { q: "Dillon's work ethic is unlike anything I've seen in 20 years of coaching.", name: 'Coach Marcus Williams', role: 'Head Track Coach' },
  { q: "His mental resilience truly sets Dillon apart from his peers.", name: 'Dr. Sarah Chen', role: 'Sports Performance Director' },
  { q: "Watch this name — Dillon Smith will be competing at the highest levels within two years.", name: 'Alex Morgan', role: 'Sports Journalist' },
  { q: "He runs every rep like it's a championship race.", name: 'Coach Linda Park', role: 'Assistant Coach' },
]

function QuoteRow({ q, name, role, index }: typeof quotes[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const even = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{
        padding: `7vh 7vw`,
        paddingLeft: even ? '7vw' : '18vw',
        paddingRight: even ? '18vw' : '7vw',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <p style={{
        fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)',
        color: '#0A0A0A',
        lineHeight: 1.65,
        fontWeight: 300,
        marginBottom: '2.5rem',
        letterSpacing: '-0.01em',
      }}>
        &ldquo;{q}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ width: 20, height: '1px', background: 'rgba(0,0,0,0.2)' }} />
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.22em', color: '#0A0A0A', fontWeight: 600 }}>{name}</p>
          <p style={{ fontSize: '9px', letterSpacing: '0.16em', color: '#bbb', marginTop: '3px' }}>{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const headerRef = useRef<HTMLElement>(null)
  const headerIn = useInView(headerRef, { once: true, amount: 0.1 })

  return (
    <section ref={headerRef} style={{ background: '#F2F2EF' }}>

      {/* Header */}
      <motion.div
        style={{ padding: '12vh 7vw 4vh', display: 'flex', alignItems: 'center', gap: '1rem' }}
        initial={{ opacity: 0 }}
        animate={headerIn ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
        <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#aaa' }}>VOICES OF THE TRACK</span>
      </motion.div>

      {quotes.map((q, i) => (
        <QuoteRow key={i} {...q} index={i} />
      ))}

      <div style={{ height: '8vh' }} />
    </section>
  )
}
