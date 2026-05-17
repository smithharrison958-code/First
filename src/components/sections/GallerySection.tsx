'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const ITEMS = [
  { src: '/images/dillon-studio-pointing.jpg', label: 'The Brand · 2026', tall: true, pos: 'top center' },
  { src: '/images/dillon-race.jpg', label: 'Texas Relays · 800M', tall: false, pos: 'center 20%' },
  { src: '/images/dillon-relay-team.jpg', label: '4×400 · Texas Relays', tall: false, pos: 'center' },
  { src: '/images/dillon-studio-thumbsup.jpg', label: 'Ready · 2026', tall: true, pos: 'top center' },
  { src: '/images/dillon-team-pyramid.jpg', label: 'Islanders 2025', tall: false, pos: 'center top' },
]

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={ref} style={{ background: '#F8F8F5' }}>
      {/* Header */}
      <motion.div
        style={{ padding: '10vh 7vw 4vh' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#999', marginBottom: '1.25rem' }}>ACTION PHOTOGRAPHY</p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 5rem)', color: '#0A0A0A', lineHeight: 0.9 }}>
          THE MOMENTS<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.2)' }}>THAT DEFINE</span>
        </h2>
      </motion.div>

      {/* Grid — 2 col, borderless */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', padding: '0 2px 2px' }}>
        {ITEMS.map((item, i) => {
          const ref2 = useRef<HTMLDivElement>(null)
          const iv = useInView(ref2, { once: true, amount: 0.2 })
          return (
            <motion.div
              key={item.src}
              ref={ref2}
              style={{ position: 'relative', overflow: 'hidden', height: item.tall ? '70vh' : '42vh' }}
              initial={{ opacity: 0 }}
              animate={iv ? { opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
            >
              <motion.div
                style={{ position: 'absolute', inset: 0 }}
                initial={{ scale: 1.04 }}
                animate={iv ? { scale: 1 } : {}}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={item.src} alt={item.label} fill sizes="50vw"
                  style={{ objectFit: 'cover', objectPosition: item.pos }} />
              </motion.div>
              {/* Bottom label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem 1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}>
                <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)' }}>{item.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div style={{ height: '8vh' }} />
    </section>
  )
}
