'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useSpring, type Variants } from 'framer-motion'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface Particle {
  id: number
  top: string
  left: string
  size: number
  opacity: number
  delay: string
  duration: string
  color: string
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */

const ROTATING_WORDS = ['SPEED', 'DISCIPLINE', 'ELITE', 'FOCUSED', 'UNSTOPPABLE']

const DILLON_LETTERS = 'DILLON'.split('')
const SMITH_LETTERS = 'SMITH'.split('')

const SPEED_LINES = [
  { top: '22%', delay: '0s', duration: '3.2s', opacity: 0.5, width: '40%' },
  { top: '48%', delay: '1.1s', duration: '2.8s', opacity: 0.35, width: '55%' },
  { top: '67%', delay: '2s', duration: '3.6s', opacity: 0.45, width: '35%' },
  { top: '81%', delay: '0.6s', duration: '4s', opacity: 0.3, width: '50%' },
]

/* ─────────────────────────────────────────────
   Framer variants
───────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const wordVariants: Variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' as const } },
}

const buttonsVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 1.2 },
  },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)

  /* Framer-motion spring values for parallax */
  const parallaxX = useSpring(0, { stiffness: 50, damping: 20 })
  const parallaxY = useSpring(0, { stiffness: 50, damping: 20 })

  /* Mouse parallax — update spring targets */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2  // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2  // -1 to 1
      parallaxX.set(nx * 20)
      parallaxY.set(ny * 20)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [parallaxX, parallaxY])

  /* Rotating words */
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2000
    )
    return () => clearInterval(id)
  }, [])

  /* Particles — stable across renders */
  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: `${Math.round(5 + (i * 4.5) % 90)}%`,
        left: `${Math.round((i * 5.1 + 3) % 95)}%`,
        size: 1 + (i % 3),
        opacity: 0.3 + (i % 5) * 0.08,
        delay: `${(i * 0.4) % 5}s`,
        duration: `${5 + (i % 4)}s`,
        color: i % 3 === 0 ? '#00D4FF' : '#ffffff',
      })),
    []
  )

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* ── Background layer 1: race photo with parallax ── */}
      <motion.div
        aria-hidden
        className="absolute inset-[-40px]"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <Image
          src="/images/dillon-race.jpg"
          fill
          alt=""
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </motion.div>

      {/* ── Background layer 2: cinematic gradient overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.85) 100%)',
        }}
      />

      {/* ── Background layer 3: vignette ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      {/* ── Speed lines ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPEED_LINES.map((line, i) => (
          <div
            key={i}
            className="speed-line absolute"
            style={{
              top: line.top,
              left: 0,
              width: line.width,
              opacity: line.opacity,
              animationDelay: line.delay,
              animationDuration: line.duration,
            }}
          />
        ))}
      </div>

      {/* ── Particles ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              animation: `particle-float ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="tracking-widest text-xs mb-8 font-medium uppercase"
          style={{ color: '#00D4FF', letterSpacing: '0.3em' }}
        >
          CORPUS CHRISTI ISLANDERS · 2026
        </motion.p>

        {/* Name — DILLON */}
        <motion.div
          className="flex overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {DILLON_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-oswald), Impact, Arial Narrow, sans-serif',
                fontSize: 'clamp(4rem, 14vw, 12rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                display: 'block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Name — SMITH */}
        <motion.div
          className="flex overflow-hidden -mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {SMITH_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-oswald), Impact, Arial Narrow, sans-serif',
                fontSize: 'clamp(4rem, 14vw, 12rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                display: 'block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Discipline label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4 text-sm tracking-widest font-light uppercase"
          style={{ color: '#9090A8', letterSpacing: '0.35em' }}
        >
          800M RUNNER
        </motion.p>

        {/* Rotating words */}
        <div
          className="mt-6 h-8 flex items-center justify-center overflow-hidden"
          style={{ minWidth: '260px' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_WORDS[wordIndex]}
              variants={wordVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-sm font-medium tracking-widest"
              style={{ color: '#00D4FF', letterSpacing: '0.3em' }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          variants={buttonsVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Outlined button */}
          <motion.a
            href="#highlights"
            className="group relative px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              border: '1px solid #00D4FF',
              color: '#ffffff',
              letterSpacing: '0.2em',
            }}
            whileHover={{ backgroundColor: '#00D4FF', color: '#050505' }}
            whileTap={{ scale: 0.97 }}
          >
            View Highlights
          </motion.a>

          {/* Solid button */}
          <motion.a
            href="#sponsor"
            className="relative px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: '#00D4FF',
              color: '#050505',
              letterSpacing: '0.2em',
            }}
            whileHover={{
              boxShadow: '0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.25)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsor Dillon
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest"
            style={{
              color: '#9090A8',
              writingMode: 'vertical-rl',
              letterSpacing: '0.25em',
            }}
          >
            SCROLL
          </span>
          <motion.div
            className="w-px"
            style={{ backgroundColor: '#00D4FF', height: '40px' }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
