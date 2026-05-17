'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

/* ─── Editorial layout — not a grid.
   Each row is a distinct compositional moment.
   Row 1: Full bleed portrait  (pointing — identity)
   Row 2: 60/40 split          (race + relay team — energy)
   Row 3: Full bleed landscape  (thumbsup — confidence)
   Row 4: Half-width offset     (team pyramid — camaraderie) ─── */

function FullBleedFrame({ src, label, height = '82vh', pos = 'top center', delay = 0 }: {
  src: string; label: string; height?: string; pos?: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

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
        initial={{ scale: 1.05 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={label} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: pos }} />
      </motion.div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '4rem 2.5rem 1.5rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
      }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.55)' }}>{label}</p>
      </div>
    </motion.div>
  )
}

function SplitFrame({ left, right }: {
  left: { src: string; label: string; width: string; height: string; pos?: string };
  right: { src: string; label: string; width: string; height: string; pos?: string };
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div ref={ref} style={{ display: 'flex', gap: '2px' }}>
      {[left, right].map((frame, i) => (
        <motion.div
          key={frame.src}
          style={{ position: 'relative', width: frame.width, height: frame.height, overflow: 'hidden', flexShrink: 0 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
        >
          <motion.div
            style={{ position: 'absolute', inset: 0 }}
            initial={{ scale: 1.05 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            <Image src={frame.src} alt={frame.label} fill sizes="60vw" style={{ objectFit: 'cover', objectPosition: frame.pos || 'center' }} />
          </motion.div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '3rem 1.5rem 1.25rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 100%)',
          }}>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)' }}>{frame.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TeamFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'stretch', gap: '2px' }}>
      {/* Wide team photo */}
      <motion.div
        style={{ position: 'relative', flex: '0 0 72%', height: '48vh', overflow: 'hidden' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ scale: 1.05 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/images/dillon-team-pyramid.jpg" alt="Islanders 2025" fill sizes="72vw"
            style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 50%)' }} />
        <p style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(255,255,255,0.5)' }}>ISLANDERS 2025</p>
      </motion.div>

      {/* Narrow editorial text panel */}
      <motion.div
        style={{
          flex: 1,
          background: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem 1.5rem',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <p style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.2)',
          lineHeight: 0.9,
          marginBottom: '1.25rem',
        }}>
          THE<br />TEAM
        </p>
        <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)' }}>
          CORPUS CHRISTI<br />ISLANDERS
        </p>
      </motion.div>
    </div>
  )
}

export default function GallerySection() {
  const headerRef = useRef<HTMLElement>(null)
  const headerIn = useInView(headerRef, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={headerRef} style={{ background: '#F8F8F5' }}>

      {/* Section label — minimal, floating above the imagery */}
      <motion.div
        style={{ padding: '10vh 7vw 4vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        initial={{ opacity: 0 }}
        animate={headerIn ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.46em', color: '#aaa' }}>EDITORIAL</span>
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#ccc' }}>2024 – 2026</span>
      </motion.div>

      {/* Row 1: Full-bleed portrait — THE BRAND */}
      <div style={{ padding: '0 2px 2px' }}>
        <FullBleedFrame
          src="/images/dillon-studio-pointing.jpg"
          label="The Brand · 2026"
          height="85vh"
          pos="top center"
        />
      </div>

      {/* Row 2: Split — race energy + relay team */}
      <div style={{ padding: '2px 2px 0' }}>
        <SplitFrame
          left={{ src: '/images/dillon-race.jpg', label: 'Texas Relays · 800M', width: '62%', height: '56vh', pos: 'center 20%' }}
          right={{ src: '/images/dillon-relay-team.jpg', label: '4×400 · Texas Relays', width: '38%', height: '56vh', pos: 'center' }}
        />
      </div>

      {/* Row 3: Full-bleed — confidence */}
      <div style={{ padding: '2px 2px 0' }}>
        <FullBleedFrame
          src="/images/dillon-studio-thumbsup.jpg"
          label="Ready · 2026"
          height="80vh"
          pos="top center"
          delay={0}
        />
      </div>

      {/* Row 4: Team frame with editorial text panel */}
      <div style={{ padding: '2px 2px 0' }}>
        <TeamFrame />
      </div>

      <div style={{ height: '10vh' }} />
    </section>
  )
}
