'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const photoIn = useInView(photoRef, { once: true, amount: 0.2 })
  const storyIn = useInView(storyRef, { once: true, amount: 0.15 })

  return (
    <div id="about" style={{ background: '#F8F8F5' }}>

      {/* ── Scene 1: Campaign poster — photo IS the scene, text sits ON it ── */}
      <div ref={photoRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Photo: raw, full coverage, slow Ken Burns */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ scale: 1.05 }}
          animate={photoIn ? { scale: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/dillon-studio-pointing.jpg"
            alt="Dillon Smith"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </motion.div>

        {/* Top: fade from previous section (very subtle) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F8F8F5 0%, transparent 16%)' }} />

        {/* Bottom: editorial dark gradient — makes text legible */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)' }} />

        {/* Overlaid text — bottom left, campaign poster layout */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6vh 7vw 6vh' }}>

          {/* "THE" — editorial scale, white solid */}
          <div style={{ overflow: 'hidden' }}>
            <motion.span
              style={{
                display: 'block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 9.5rem)',
                lineHeight: 0.88,
                color: '#F8F8F5',
                letterSpacing: '-0.01em',
              }}
              initial={{ y: '106%' }}
              animate={photoIn ? { y: '0%' } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              THE
            </motion.span>
          </div>

          {/* "ATHLETE" — outline, slightly offset for depth */}
          <div style={{ overflow: 'hidden' }}>
            <motion.span
              style={{
                display: 'block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 10vw, 9.5rem)',
                lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(248,248,245,0.55)',
                letterSpacing: '-0.01em',
              }}
              initial={{ y: '106%' }}
              animate={photoIn ? { y: '0%' } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
            >
              ATHLETE
            </motion.span>
          </div>

          {/* Rule + name — below the headline block */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}
            initial={{ opacity: 0 }}
            animate={photoIn ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <div style={{ width: 28, height: '1px', background: 'rgba(248,248,245,0.3)' }} />
            <p style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(248,248,245,0.5)' }}>
              DILLON SMITH&nbsp;&nbsp;·&nbsp;&nbsp;800M
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Scene 2: The story — quiet moment, dramatic type contrast ── */}
      <div ref={storyRef} style={{ padding: '16vh 7vw 18vh', background: '#F8F8F5' }}>

        {/* Asymmetric grid: big quote left, tiny bio right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10vw', alignItems: 'start' }}>

          {/* Left — quote at editorial scale */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={storyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Very small label — stark contrast with what follows */}
            <p style={{ fontSize: '9px', letterSpacing: '0.44em', color: '#777', marginBottom: '3vh' }}>
              IN HIS OWN WORDS
            </p>

            {/* Quote — large, editorial, thin weight */}
            <blockquote style={{
              fontFamily: 'var(--font-oswald)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              color: '#0A0A0A',
              lineHeight: 1.18,
              letterSpacing: '-0.01em',
            }}>
              &ldquo;I don&apos;t run<br />
              to win races.<br />
              I run to find out<br />
              what I&apos;m<br />
              capable of.&rdquo;
            </blockquote>
          </motion.div>

          {/* Right — bio in tiny scale, extreme contrast with the quote */}
          <motion.div
            style={{ paddingTop: '8vh' }}
            initial={{ opacity: 0, y: 24 }}
            animate={storyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <p style={{ fontSize: '0.78rem', color: '#555', lineHeight: 2.1, marginBottom: '4vh' }}>
              Born with a fire for competition, Dillon Smith arrived at Corpus Christi University with one goal: compete at the highest level. A 1:47.3 personal best, back-to-back NCAA appearances, and conference titles earned — Dillon represents the character and drive that makes brands take notice.
            </p>

            {/* Stat callout — drops below bio, tiny and precise */}
            <div style={{ paddingTop: '3vh', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#0A0A0A',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                1:47.3
              </p>
              <p style={{ fontSize: '9px', letterSpacing: '0.38em', color: '#777' }}>
                PERSONAL BEST · 800M
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
