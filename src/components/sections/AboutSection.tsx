'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface StatItem {
  value: string
  numericValue: number | null
  /** For non-numeric stats, just reveal the text */
  isText: boolean
  label: string
  suffix?: string
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const STATS: StatItem[] = [
  { value: '1:47.3', numericValue: null, isText: true, label: 'Personal Best 800M' },
  { value: '3×', numericValue: 3, isText: false, label: 'Conference Champion', suffix: '×' },
  { value: '14', numericValue: 14, isText: false, label: 'Race Wins' },
  { value: '2', numericValue: 2, isText: false, label: 'NCAA Appearances' },
]

/* ─────────────────────────────────────────────
   CountUp hook
───────────────────────────────────────────── */

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])

  return count
}

/* ─────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────── */

function StatCard({ stat, index, sectionActive }: { stat: StatItem; index: number; sectionActive: boolean }) {
  const count = useCountUp(stat.numericValue ?? 0, 1400, !stat.isText && sectionActive)

  const displayValue = stat.isText
    ? stat.value
    : `${count}${stat.suffix ?? ''}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={sectionActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: 'rgba(13, 13, 20, 0.8)',
        border: '1px solid rgba(0, 212, 255, 0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="text-4xl font-bold leading-none mb-2"
        style={{
          fontFamily: 'var(--font-oswald), Impact, Arial Narrow, sans-serif',
          color: '#00D4FF',
        }}
      >
        {displayValue}
      </span>
      <span
        className="text-xs tracking-widest uppercase font-medium"
        style={{ color: '#9090A8', letterSpacing: '0.2em' }}
      >
        {stat.label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })
  const accentInView = useInView(accentRef, { once: true, amount: 0.3 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* ── Left-side blue gradient accent ── */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,212,255,0.05) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Real photo column ── */}
          <div className="relative">
            {/* Primary portrait */}
            <motion.div
              ref={leftRef}
              initial={{ opacity: 0, x: -56 }}
              animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -56 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full overflow-hidden lg:h-[600px] aspect-[3/4] lg:aspect-auto"
              style={{ backgroundColor: '#0D0D14' }}
            >
              {/* Actual photo with slow zoom-in reveal */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                animate={leftInView ? { scale: 1.0 } : { scale: 1.08 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/dillon-headshot.jpg"
                  fill
                  alt="Dillon Smith — Corpus Christi Islanders athlete portrait"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </motion.div>

              {/* Bottom gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.4) 40%, transparent 70%)',
                }}
              />

              {/* Corner accents — top-left */}
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: '#00D4FF',
                  top: '20px',
                  left: '20px',
                }}
              />
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#00D4FF',
                  top: '20px',
                  left: '20px',
                }}
              />

              {/* Corner accents — bottom-right */}
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: '#00D4FF',
                  bottom: '20px',
                  right: '20px',
                }}
              />
              <span
                aria-hidden
                className="absolute pointer-events-none"
                style={{
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#00D4FF',
                  bottom: '20px',
                  right: '20px',
                }}
              />

              {/* Overlaid name text — slides up on reveal */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 px-6 pb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={leftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-bold leading-none mb-1"
                  style={{
                    fontFamily: 'var(--font-oswald), Impact, Arial Narrow, sans-serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                  }}
                >
                  DILLON SMITH
                </p>
                <p
                  className="text-xs tracking-widest font-medium uppercase"
                  style={{ color: '#00D4FF', letterSpacing: '0.22em' }}
                >
                  800M · CORPUS CHRISTI UNIVERSITY
                </p>
              </motion.div>
            </motion.div>

            {/* Secondary accent photo */}
            <motion.div
              ref={accentRef}
              initial={{ opacity: 0, x: 40 }}
              animate={accentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-4 ml-auto w-1/2 aspect-[3/4] overflow-hidden"
              style={{
                border: '1px solid rgba(0,212,255,0.25)',
                boxShadow: '0 0 30px rgba(0,212,255,0.12), 0 0 60px rgba(0,212,255,0.06)',
                backgroundColor: '#0D0D14',
              }}
            >
              <Image
                src="/images/dillon-studio-pointing.jpg"
                fill
                alt="Dillon Smith — studio portrait pointing at camera"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              {/* Subtle dark tint to tie into dark theme */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'rgba(5,5,5,0.15)' }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 56 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 56 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Section label */}
            <p
              className="text-xs tracking-widest font-medium uppercase"
              style={{ color: '#00D4FF', letterSpacing: '0.3em' }}
            >
              The Athlete
            </p>

            {/* Heading */}
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-oswald), Impact, Arial Narrow, sans-serif',
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                color: '#ffffff',
              }}
            >
              Born to Run.
              <br />
              Built to Win.
            </h2>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: '#9090A8' }}>
                Growing up in Corpus Christi, Texas, Dillon Smith discovered his love for
                running at age 12. What began as a neighborhood chase became a lifelong
                pursuit of excellence — a hunger that no finish line could fully satisfy.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9090A8' }}>
                Now competing at the NCAA level for Corpus Christi University, Dillon
                brings the same raw intensity from those early days to every race, every
                practice, every moment on the track. When the gun fires, everything else
                disappears.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9090A8' }}>
                His relentless training regimen — 70 miles per week, ice baths, film
                study — reflects a mind as sharp as his stride. Dillon doesn&apos;t just
                train to be fast. He trains to be unbeatable.
              </p>
            </div>

            {/* Quote block */}
            <div
              className="mt-2 pl-5 relative"
              style={{ borderLeft: '2px solid rgba(0,212,255,0.4)' }}
            >
              <span
                aria-hidden
                className="absolute -top-3 -left-2 font-bold leading-none select-none"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '4rem',
                  color: '#00D4FF',
                  opacity: 0.5,
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </span>
              <p
                className="italic text-base leading-relaxed pt-4"
                style={{ color: '#C8C8D8' }}
              >
                I don&apos;t run to compete. I run to become something greater.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <div ref={statsRef} className="mt-16 lg:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
                sectionActive={statsInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
