'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  { q: "Dillon's work ethic is unlike anything I've seen in 20 years of coaching.", name: 'Coach Marcus Williams', role: 'Head Track Coach' },
  { q: "His mental resilience truly sets Dillon apart from his peers.", name: 'Dr. Sarah Chen', role: 'Sports Performance Director' },
  { q: "Watch this name — Dillon Smith will be competing at the highest levels within two years.", name: 'Alex Morgan', role: 'Sports Journalist' },
  { q: "He runs every rep like it's a championship race.", name: 'Coach Linda Park', role: 'Assistant Coach' },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} style={{ background: '#F2F2EF' }}>
      <motion.div
        style={{ textAlign: 'center', paddingTop: '10vh', paddingBottom: '5vh' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#999' }}>VOICES OF THE TRACK</p>
        <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.15)', margin: '1rem auto 0' }} />
      </motion.div>

      {quotes.map((q, i) => {
        const ref2 = useRef<HTMLDivElement>(null)
        const iv = useInView(ref2, { once: true, amount: 0.5 })
        const even = i % 2 === 0
        return (
          <motion.div
            key={i}
            ref={ref2}
            style={{
              padding: `5vh ${even ? '7vw' : '17vw'} 5vh ${even ? '7vw' : '17vw'}`,
              paddingLeft: even ? '7vw' : '16vw',
              paddingRight: even ? '16vw' : '7vw',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={iv ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.6rem)', color: '#0A0A0A', lineHeight: 1.6, fontWeight: 300, marginBottom: '1.5rem' }}>
              &ldquo;{q.q}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 24, height: 1, background: 'rgba(0,0,0,0.2)' }} />
              <div>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#0A0A0A', fontWeight: 600 }}>{q.name}</p>
                <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#999', marginTop: '2px' }}>{q.role}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
      <div style={{ height: '6vh' }} />
    </section>
  )
}
