'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const ITEMS = [
  { src: '/images/dillon-studio-pointing.jpg', label: 'The Brand · 2026', pos: 'top center', tall: true },
  { src: '/images/dillon-race.jpg', label: 'Texas Relays · 800M', pos: 'center 20%', tall: false },
  { src: '/images/dillon-relay-team.jpg', label: '4×400 · Texas Relays', pos: 'center', tall: false },
  { src: '/images/dillon-studio-thumbsup.jpg', label: 'Ready · 2026 Season', pos: 'top center', tall: true },
  { src: '/images/dillon-team-pyramid.jpg', label: 'Islanders Track & Field', pos: 'center top', tall: false },
]

function GalleryItem({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-25, 25])

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group"
      style={{ height: item.tall ? '70vh' : '45vh' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={item.src}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover', objectPosition: item.pos, scale: '1.08' }}
        />
      </motion.div>
      {/* Default overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
      {/* Hover overlay */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Label */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.6)' }}>{item.label}</p>
      </div>
      {/* Hover border */}
      <motion.div
        style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,212,255,0)', pointerEvents: 'none' }}
        whileHover={{ borderColor: 'rgba(0,212,255,0.4)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={ref} style={{ background: '#000' }}>
      {/* Header */}
      <motion.div
        style={{ paddingTop: '12vh', paddingBottom: '6vh', paddingLeft: '8vw' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#00D4FF', marginBottom: '1rem' }}>ACTION PHOTOGRAPHY</p>
        <h2 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 5rem)', color: '#fff', lineHeight: 0.9 }}>
          THE MOMENTS<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>THAT DEFINE</span>
        </h2>
      </motion.div>

      {/* Masonry-style grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3px', padding: '0 3px 3px' }}
        className="grid-cols-1 sm:grid-cols-2">
        {ITEMS.map((item, i) => <GalleryItem key={item.src} item={item} index={i} />)}
      </div>

      <div style={{ height: '6vh' }} />
    </section>
  )
}
