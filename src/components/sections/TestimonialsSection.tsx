'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  { quote: "Dillon's work ethic is unlike anything I've seen in 20 years of coaching.", name: 'Coach Marcus Williams', role: 'Head Track Coach' },
  { quote: "His mental resilience truly sets Dillon apart from his peers.", name: 'Dr. Sarah Chen', role: 'Sports Performance Director' },
  { quote: "Watch this name — Dillon Smith will be competing at the highest levels within two years.", name: 'Alex Morgan', role: 'Sports Journalist' },
  { quote: "He runs every rep like it's a championship race.", name: 'Coach Linda Park', role: 'Assistant Coach' },
]

function QuoteBlock({ quote, name, role, index }: { quote: string; name: string; role: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{
        paddingTop: '8vh', paddingBottom: '8vh',
        paddingLeft: isEven ? '8vw' : '18vw',
        paddingRight: isEven ? '18vw' : '8vw',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ fontSize: '3rem', color: '#00D4FF', lineHeight: 0.6, marginBottom: '1.5rem', opacity: 0.5, fontFamily: 'var(--font-oswald)' }}>
        &ldquo;
      </div>
      <p style={{
        fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
        color: 'rgba(255,255,255,0.82)',
        lineHeight: 1.5,
        fontWeight: 300,
        letterSpacing: '-0.01em',
      }}>
        {quote}
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#fff', fontWeight: 600 }}>{name}</p>
          <p style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} style={{ background: '#000' }}>
      <motion.div
        style={{ paddingTop: '12vh', paddingBottom: '6vh', textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#00D4FF' }}>VOICES OF THE TRACK</p>
        <div style={{ width: 40, height: 1, background: 'rgba(0,212,255,0.3)', margin: '1rem auto 0' }} />
      </motion.div>

      {quotes.map((q, i) => <QuoteBlock key={i} {...q} index={i} />)}

      <div style={{ height: '6vh' }} />
    </section>
  )
}
