'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['SPEED', 'DISCIPLINE', 'ELITE', 'FOCUSED', 'RELENTLESS']

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    const w = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2400)
    return () => { clearTimeout(t); clearInterval(w) }
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#F8F8F5' }}>

      {/* Photo — right half, blending into bg */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '52%', height: '100%', overflow: 'hidden' }}>
        <Image
          src="/images/dillon-studio-thumbsup.jpg"
          alt="Dillon Smith"
          fill
          priority
          sizes="52vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Blend left edge into page bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F8F8F5 0%, rgba(248,248,245,0.3) 25%, transparent 55%)' }} />
        {/* Blend bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, transparent 30%)' }} />
      </div>

      {/* Left content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8vh', paddingLeft: '7vw', maxWidth: '60%' }}>

        <motion.p
          style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#999', marginBottom: '2rem' }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          CORPUS CHRISTI ISLANDERS · 800M RUNNER
        </motion.p>

        {/* Name */}
        <div style={{ overflow: 'hidden' }}>
          {'DILLON'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '110%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.04 }}
              style={{ display: 'inline-block', fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: 0.88, color: '#0A0A0A' }}
            >{l}</motion.span>
          ))}
        </div>
        <div style={{ overflow: 'hidden' }}>
          {'SMITH'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '110%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.04 }}
              style={{ display: 'inline-block', fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: 0.88, color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.22)' }}
            >{l}</motion.span>
          ))}
        </div>

        {/* Bottom row */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Rotating word */}
          <div style={{ height: '1.2rem', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.span key={wordIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', fontSize: '9px', letterSpacing: '0.4em', color: '#999' }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#about" onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#0A0A0A', borderBottom: '1px solid rgba(0,0,0,0.3)', paddingBottom: '3px', textDecoration: 'none' }}>
              EXPLORE
            </a>
            <a href="#sponsorship" onClick={e => { e.preventDefault(); document.querySelector('#sponsorship')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{ fontSize: '9px', letterSpacing: '0.35em', color: '#0A0A0A', border: '1px solid rgba(0,0,0,0.5)', padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
              SPONSOR DILLON
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: 'absolute', right: '2rem', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
      >
        <motion.div style={{ width: 1, background: '#0A0A0A', height: 48, opacity: 0.2 }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
        <span style={{ fontSize: '8px', letterSpacing: '0.3em', color: '#999', writingMode: 'vertical-rl' }}>SCROLL</span>
      </motion.div>
    </section>
  )
}
