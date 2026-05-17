'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

/* ─── Editorial sequence layout.
   Each row is a distinct compositional moment.
   Focal points chosen to keep subjects fully visible.

   Row 1: Full-bleed portrait 85vh — pointing (identity)
   Row 2: 55/45 split 56vh — relay team (needs width) + race (single subject)
   Row 3: Full-bleed 80vh — thumbsup (confidence)
   Row 4: Full-bleed 55vh — team pyramid (group, needs full width)
─── */

function FullBleedFrame({
  src, label, height = '82vh', pos = 'top center',
  textSide = 'left', delay = 0,
}: {
  src: string; label: string; height?: string; pos?: string;
  textSide?: 'left' | 'right'; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.04 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={label} fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: pos }} />
      </motion.div>
      <div style={{
        position: 'absolute', bottom: 0,
        left: textSide === 'left' ? 0 : 'auto',
        right: textSide === 'right' ? 0 : 'auto',
        padding: '4rem 2rem 1.5rem',
        background: `linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 100%)`,
        width: '100%',
      }}>
        <p style={{
          fontSize: '9px', letterSpacing: '0.32em',
          color: 'rgba(255,255,255,0.78)',
          textAlign: textSide,
        }}>{label}</p>
      </div>
    </motion.div>
  )
}

function SplitRow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  const frames = [
    {
      src: '/images/dillon-relay-team.jpg',
      label: '4×400 · Texas Relays',
      width: '55%',
      pos: 'center 35%',  // show athletes from mid-torso up, all four visible
    },
    {
      src: '/images/dillon-race.jpg',
      label: 'Texas Relays · 800M',
      width: '45%',
      pos: 'center 25%',  // runner's face and upper body centred
    },
  ]

  return (
    <div ref={ref} style={{ display: 'flex', gap: '2px' }}>
      {frames.map((f, i) => (
        <motion.div
          key={f.src}
          style={{ position: 'relative', width: f.width, height: '56vh', overflow: 'hidden', flexShrink: 0 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
        >
          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            initial={{ scale: 1.04 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          >
            <Image src={f.src} alt={f.label} fill sizes="60vw"
              style={{ objectFit: 'cover', objectPosition: f.pos }} />
          </motion.div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '3rem 1.5rem 1.25rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 100%)',
          }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.78)' }}>
              {f.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TeamRow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative', width: '100%', height: '58vh', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.04 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/dillon-team-pyramid.jpg"
          alt="Islanders 2025"
          fill sizes="100vw"
          // center 45% shows full pyramid — not too high (cuts tops) or low (cuts base)
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
      </motion.div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 45%)',
      }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.82)' }}>
          ISLANDERS 2025
        </p>
        <p style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.5)' }}>
          CORPUS CHRISTI
        </p>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const headerRef = useRef<HTMLElement>(null)
  const headerIn = useInView(headerRef, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={headerRef} style={{ background: '#F8F8F5' }}>

      {/* Section label */}
      <motion.div
        style={{ padding: '10vh 7vw 4vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        initial={{ opacity: 0 }}
        animate={headerIn ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.46em', color: '#777' }}>EDITORIAL</span>
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#888' }}>2024 – 2026</span>
      </motion.div>

      {/* Row 1: Full-bleed portrait — THE BRAND (pointing, full body visible at top center) */}
      <div style={{ padding: '0 2px 2px' }}>
        <FullBleedFrame
          src="/images/dillon-studio-pointing.jpg"
          label="The Brand · 2026"
          height="85vh"
          pos="top center"
        />
      </div>

      {/* Row 2: Split — relay team (55%) gets enough width to show all 4 athletes */}
      <div style={{ padding: '2px 2px 0' }}>
        <SplitRow />
      </div>

      {/* Row 3: Full-bleed — identity (thumbsup, top center keeps full body) */}
      <div style={{ padding: '2px 2px 0' }}>
        <FullBleedFrame
          src="/images/dillon-studio-thumbsup.jpg"
          label="Ready · 2026"
          height="80vh"
          pos="top center"
          textSide="right"
        />
      </div>

      {/* Row 4: Full-bleed team pyramid — needs full width and enough height */}
      <div style={{ padding: '2px 2px 0' }}>
        <TeamRow />
      </div>

      <div style={{ height: '10vh' }} />
    </section>
  )
}
