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

function GalleryItem({ src, label, tall, pos, index }: typeof ITEMS[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden', height: tall ? '72vh' : '44vh' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.05 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={label} fill sizes="50vw"
          style={{ objectFit: 'cover', objectPosition: pos }} />
      </motion.div>
      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '3rem 1.75rem 1.25rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
      }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.6)' }}>{label}</p>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const headerRef = useRef<HTMLElement>(null)
  const headerIn = useInView(headerRef, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={headerRef} style={{ background: '#F8F8F5' }}>

      {/* Header */}
      <motion.div
        style={{ padding: '12vh 7vw 5vh' }}
        initial={{ opacity: 0, y: 20 }}
        animate={headerIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#aaa' }}>ACTION PHOTOGRAPHY</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          color: '#0A0A0A',
          lineHeight: 0.88,
        }}>
          THE MOMENTS<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.18)' }}>THAT DEFINE</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', padding: '0 2px 2px' }}>
        {ITEMS.map((item, i) => (
          <GalleryItem key={item.src} {...item} index={i} />
        ))}
      </div>

      <div style={{ height: '10vh' }} />
    </section>
  )
}
