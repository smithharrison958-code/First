'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const WORDS = ['SPEED', 'DISCIPLINE', 'ELITE', 'FOCUSED', 'RELENTLESS']

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  // Parallax layers
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.88])

  // Rotating word
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2200)
    return () => clearInterval(t)
  }, [])

  // Mouse parallax on bg
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const [mp, setMp] = useState({ x: 0, y: 0 })
  useEffect(() => {
    let raf = 0
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 20
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 12
    }
    const tick = () => {
      setMp(p => ({
        x: p.x + (mouseX.current - p.x) * 0.06,
        y: p.y + (mouseY.current - p.y) * 0.06,
      }))
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section ref={containerRef} id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

      {/* Background image with parallax */}
      <motion.div
        style={{ position: 'absolute', inset: '-8%', y: imgY, x: mp.x, top: '-8%' }}
      >
        <Image
          src="/images/dillon-race.jpg"
          alt="Dillon Smith racing"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#000', opacity: overlayOpacity }}
      />
      {/* Bottom fade */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 40%)' }} />
      {/* Side vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Content */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', paddingBottom: '10vh',
          paddingLeft: '6vw', paddingRight: '6vw',
          y: textY,
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#00D4FF', marginBottom: '2rem' }}
        >
          CORPUS CHRISTI ISLANDERS · 800M
        </motion.p>

        {/* Name */}
        <div style={{ overflow: 'hidden' }}>
          {'DILLON'.split('').map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.04 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 13vw, 13rem)',
                lineHeight: 0.88,
                color: '#fff',
              }}
            >{l}</motion.span>
          ))}
        </div>
        <div style={{ overflow: 'hidden' }}>
          {'SMITH'.split('').map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 + i * 0.04 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 13vw, 13rem)',
                lineHeight: 0.88,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.5)',
              }}
            >{l}</motion.span>
          ))}
        </div>

        {/* Rotating word + CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ height: '1.4rem', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'block', fontSize: '11px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.45)' }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}
          >
            <a
              href="#about"
              onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                fontSize: '10px', letterSpacing: '0.35em', color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '3px', textDecoration: 'none',
              }}
            >
              EXPLORE
            </a>
            <a
              href="#sponsorship"
              onClick={e => { e.preventDefault(); document.querySelector('#sponsorship')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                fontSize: '10px', letterSpacing: '0.35em', color: '#00D4FF',
                border: '1px solid #00D4FF', padding: '0.5rem 1.25rem', textDecoration: 'none',
              }}
            >
              SPONSOR DILLON
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', writingMode: 'vertical-rl' }}>SCROLL</span>
        <motion.div
          style={{ width: 1, background: 'rgba(255,255,255,0.2)', height: 60 }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
