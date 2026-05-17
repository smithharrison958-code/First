'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['SPEED', 'DISCIPLINE', 'ELITE', 'RELENTLESS']

export default function HeroSection() {
  const [ready, setReady] = useState(false)
  const [word, setWord] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    const w = setInterval(() => setWord(i => (i + 1) % WORDS.length), 2800)
    return () => { clearTimeout(t); clearInterval(w) }
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      background: '#F8F8F5',
    }}>

      {/* Photo — 62% wide, raw, almost no left dissolve */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0,
        width: '62%', height: '100%',
        zIndex: 1,
      }}>
        <Image
          src="/images/dillon-studio-thumbsup.jpg"
          alt="Dillon Smith"
          fill priority sizes="62vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Very narrow left dissolve — 12% only, so type overlaps raw photo */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F8F8F5 0%, transparent 14%)' }} />
        {/* Bottom dissolve */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, rgba(248,248,245,0.5) 16%, transparent 38%)' }} />
      </div>

      {/* Type block — full width, bottom-anchored, DILLON reaches into photo zone */}
      <div style={{
        position: 'absolute',
        bottom: '7vh',
        left: 0, right: 0,
        zIndex: 3,
        paddingLeft: '5vw',
      }}>
        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.22)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.48em', color: '#999' }}>CORPUS CHRISTI ISLANDERS</span>
        </motion.div>

        {/* DILLON — solid, spans into photo zone */}
        <div style={{ overflow: 'hidden', lineHeight: 0.82 }}>
          {'DILLON'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '106%', opacity: 0 }}
              animate={ready ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.22 + i * 0.032 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 22vw, 20rem)',
                color: '#0A0A0A',
              }}
            >{l}</motion.span>
          ))}
        </div>

        {/* SMITH — outline, extends further into photo */}
        <div style={{ overflow: 'hidden', lineHeight: 0.82 }}>
          {'SMITH'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '106%', opacity: 0 }}
              animate={ready ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.36 + i * 0.032 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 22vw, 20rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(0,0,0,0.14)',
              }}
            >{l}</motion.span>
          ))}
        </div>

        {/* Bottom row */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '1.75rem' }}
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <div style={{ overflow: 'hidden', height: '13px' }}>
            <AnimatePresence mode="wait">
              <motion.span key={word}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', fontSize: '9px', letterSpacing: '0.44em', color: '#bbb' }}
              >
                {WORDS[word]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div style={{ width: '1px', height: '11px', background: 'rgba(0,0,0,0.15)' }} />
          <a href="#sponsorship"
            onClick={e => { e.preventDefault(); document.querySelector('#sponsorship')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ fontSize: '9px', letterSpacing: '0.38em', color: '#0A0A0A', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', paddingBottom: '2px' }}>
            SPONSOR DILLON
          </a>
        </motion.div>
      </div>

      {/* 800M — vertical right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, delay: 1.3 }}
        style={{
          position: 'absolute', right: '1.5rem', bottom: '3rem',
          writingMode: 'vertical-rl',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          zIndex: 4,
        }}
      >
        <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.55)' }}>800M</span>
        <motion.div
          style={{ width: '1px', height: 48, background: 'rgba(255,255,255,0.3)' }}
          animate={{ scaleY: [1, 0.2, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
