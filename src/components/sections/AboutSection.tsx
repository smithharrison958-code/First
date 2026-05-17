'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const fade = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }

export default function AboutSection() {
  const storyRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const storyIn = useInView(storyRef, { once: true, amount: 0.3 })
  const photoIn = useInView(photoRef, { once: true, amount: 0.25 })

  return (
    <div id="about" style={{ background: '#F8F8F5' }}>

      {/* ── Full-bleed editorial photo moment ── */}
      <div ref={photoRef} style={{ position: 'relative', height: '95vh', overflow: 'hidden', background: '#F2F2EF' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ scale: 1.04 }}
          animate={photoIn ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/dillon-studio-pointing.jpg"
            alt="Dillon Smith"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </motion.div>
        {/* Soft bottom fade to next section colour */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, transparent 35%)' }} />
        {/* Subtle top */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #F8F8F5 0%, transparent 18%)' }} />

        {/* Floating label */}
        <motion.div
          style={{ position: 'absolute', bottom: '6vh', left: '7vw' }}
          initial={{ opacity: 0, y: 16 }}
          animate={photoIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(0,0,0,0.4)', marginBottom: '0.4rem' }}>THE ATHLETE</p>
          <div style={{ width: 32, height: 1, background: 'rgba(0,0,0,0.25)' }} />
        </motion.div>
      </div>

      {/* ── Story section ── */}
      <div ref={storyRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', padding: '10vh 7vw', alignItems: 'start' }}>

        {/* Left — quote + bio */}
        <motion.div variants={fade} initial="hidden" animate={storyIn ? 'show' : 'hidden'} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <p style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#999', marginBottom: '2.5rem' }}>DILLON SMITH · 800M</p>
          <blockquote style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#0A0A0A', lineHeight: 1.75, fontWeight: 300, marginBottom: '2.5rem', borderLeft: '2px solid #0A0A0A', paddingLeft: '1.5rem' }}>
            &ldquo;I don&apos;t run to win races. I run to find out what I&apos;m capable of.&rdquo;
          </blockquote>
          <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 2, fontWeight: 400 }}>
            Born with a fire for competition, Dillon Smith arrived at Corpus Christi University with one goal: compete at the highest level. A 1:47.3 personal best, back-to-back NCAA appearances, and conference titles earned — Dillon represents the character and drive that makes brands take notice.
          </p>
        </motion.div>

        {/* Right — asymmetric team photos */}
        <motion.div
          style={{ position: 'relative', height: '60vh' }}
          variants={fade} initial="hidden" animate={storyIn ? 'show' : 'hidden'}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Main image */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '75%', height: '78%', overflow: 'hidden' }}>
            <Image src="/images/dillon-relay-team.jpg" alt="Relay team" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          {/* Offset image */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', overflow: 'hidden', outline: '1px solid rgba(0,0,0,0.08)' }}>
            <Image src="/images/dillon-team-pyramid.jpg" alt="Team" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          {/* Thin accent line */}
          <div style={{ position: 'absolute', right: '-2vw', top: '15%', width: 1, height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.15), transparent)' }} />
        </motion.div>
      </div>
    </div>
  )
}
