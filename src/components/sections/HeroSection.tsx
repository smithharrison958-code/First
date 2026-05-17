'use client'

import { useEffect, useState, useRef } from 'react'
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
      position: 'relative', height: '100vh', overflow: 'hidden',
      background: '#F8F8F5', display: 'flex', alignItems: 'flex-end',
    }}>

      {/* Photo — sits right, bleeds to top/right, dissolves left & bottom */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0,
        width: '58%', height: '100%',
      }}>
        <Image
          src="/images/dillon-studio-thumbsup.jpg"
          alt="Dillon Smith"
          fill priority sizes="58vw"
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Dissolve into page on left */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F8F8F5 0%, rgba(248,248,245,0.6) 18%, transparent 45%)' }} />
        {/* Dissolve at bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, rgba(248,248,245,0.4) 15%, transparent 38%)' }} />
      </div>

      {/* Typography — bottom left, reads vertically */}
      <div style={{ position: 'relative', zIndex: 2, paddingLeft: '6vw', paddingBottom: '7vh', paddingRight: '42vw' }}>

        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.25)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#888', fontWeight: 400 }}>
            CORPUS CHRISTI ISLANDERS
          </span>
        </motion.div>

        {/* Name — two lines, different weights */}
        <div style={{ overflow: 'hidden', lineHeight: 0.82 }}>
          {'DILLON'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '105%', opacity: 0 }}
              animate={ready ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.035 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                color: '#0A0A0A',
              }}
            >{l}</motion.span>
          ))}
        </div>
        <div style={{ overflow: 'hidden', lineHeight: 0.82 }}>
          {'SMITH'.split('').map((l, i) => (
            <motion.span key={i}
              initial={{ y: '105%', opacity: 0 }}
              animate={ready ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.035 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(0,0,0,0.15)',
              }}
            >{l}</motion.span>
          ))}
        </div>

        {/* Bottom row — discipline + CTA */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginTop: '2rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.95 }}
        >
          <div style={{ overflow: 'hidden', height: '14px' }}>
            <AnimatePresence mode="wait">
              <motion.span key={word}
                initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', fontSize: '9px', letterSpacing: '0.42em', color: '#aaa' }}
              >
                {WORDS[word]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div style={{ width: '1px', height: '12px', background: 'rgba(0,0,0,0.18)' }} />

          <a href="#sponsorship"
            onClick={e => { e.preventDefault(); document.querySelector('#sponsorship')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ fontSize: '9px', letterSpacing: '0.38em', color: '#0A0A0A', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.35)', paddingBottom: '2px' }}>
            SPONSOR DILLON
          </a>
        </motion.div>
      </div>

      {/* 800M label — vertical, far right */}
      <motion.div
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 1.2 }}
        style={{ position: 'absolute', right: '1.75rem', bottom: '3rem', writingMode: 'vertical-rl', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}
      >
        <span style={{ fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.3)' }}>800M</span>
        <motion.div style={{ width: '1px', height: 52, background: 'rgba(0,0,0,0.15)' }}
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
    </section>
  )
}
