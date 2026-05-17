'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const photoIn = useInView(photoRef, { once: true, amount: 0.2 })
  const storyIn = useInView(storyRef, { once: true, amount: 0.2 })

  return (
    <div id="about" style={{ background: '#F8F8F5' }}>

      {/* Full-bleed photo — pointing photo dissolves into page */}
      <div ref={photoRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ scale: 1.06 }}
          animate={photoIn ? { scale: 1 } : {}}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/dillon-studio-pointing.jpg"
            alt="Dillon Smith"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </motion.div>

        {/* Dissolve into page — top and bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F8F8F5 0%, rgba(248,248,245,0.3) 12%, transparent 30%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, rgba(248,248,245,0.5) 18%, transparent 45%)' }} />

        {/* Eyebrow — bottom left */}
        <motion.div
          style={{ position: 'absolute', bottom: '8vh', left: '7vw' }}
          initial={{ opacity: 0, y: 12 }}
          animate={photoIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(0,0,0,0.35)' }}>THE ATHLETE · CORPUS CHRISTI</p>
        </motion.div>

        {/* Large editorial label — bottom right */}
        <motion.div
          style={{ position: 'absolute', bottom: '6vh', right: '7vw', textAlign: 'right' }}
          initial={{ opacity: 0 }}
          animate={photoIn ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            lineHeight: 0.85,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,0,0,0.1)',
          }}>2026</p>
        </motion.div>
      </div>

      {/* Story — editorial split, generous white space */}
      <div ref={storyRef} style={{ padding: '14vh 7vw 16vh' }}>

        {/* Section label */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8vh' }}
          initial={{ opacity: 0 }}
          animate={storyIn ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.2)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#999' }}>ORIGIN STORY</span>
        </motion.div>

        {/* Asymmetric grid — wide quote left, caption right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '10vw', alignItems: 'start' }}>

          {/* Left — the quote, big and editorial */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={storyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <blockquote style={{
              fontFamily: 'var(--font-oswald)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              color: '#0A0A0A',
              lineHeight: 1.2,
              marginBottom: '5vh',
              letterSpacing: '-0.01em',
            }}>
              &ldquo;I don&apos;t run to<br />
              win races. I run to<br />
              find out what I&apos;m<br />
              capable of.&rdquo;
            </blockquote>

            <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 2.1, maxWidth: '480px' }}>
              Born with a fire for competition, Dillon Smith arrived at Corpus Christi University with one goal: compete at the highest level. A 1:47.3 personal best, back-to-back NCAA appearances, and conference titles earned — Dillon represents the character and drive that makes brands take notice.
            </p>
          </motion.div>

          {/* Right — editorial stack: relay team photo + stat callout */}
          <motion.div
            style={{ paddingTop: '4vh' }}
            initial={{ opacity: 0, y: 24 }}
            animate={storyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            {/* Photo — relay team */}
            <div style={{ position: 'relative', height: '50vh', overflow: 'hidden', marginBottom: '2px' }}>
              <Image
                src="/images/dillon-relay-team.jpg"
                alt="Dillon with relay team"
                fill
                sizes="40vw"
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(248,248,245,0.6) 0%, transparent 40%)' }} />
            </div>

            {/* Caption below photo */}
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#bbb', marginTop: '1rem' }}>
              4×400 RELAY · TEXAS RELAYS 2025
            </p>

            {/* Small stat callout */}
            <div style={{ marginTop: '5vh', paddingTop: '3vh', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#0A0A0A',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>1:47.3</p>
              <p style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#999' }}>PERSONAL BEST · 800M</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
