'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'

/* ─────────────────────────────────────────────
   Quote lines — each animates in staggered
───────────────────────────────────────────── */

const QUOTE_LINES = [
  'THE TRACK IS WHERE',
  'I BECOME SOMETHING',
  'GREATER.',
]

/* ─────────────────────────────────────────────
   CinematicSection
───────────────────────────────────────────── */

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /* InView — triggers text reveals */
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const lineInView = useInView(contentRef, { once: true, margin: '-5%' })

  /* Scroll-based parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Ken Burns: image scales 1.0 → 1.08 as section scrolls through */
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08])

  /* Parallax: quote text drifts up −40px across scroll range */
  const quoteY = useTransform(scrollYProgress, [0, 1], [0, -40])

  /* Speed-line sweeps in when section enters view */
  const speedLineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 },
    },
  }

  /* Staggered line reveal */
  const lineContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  }

  return (
    <section
      id="cinematic-poster"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', background: '#000' }}
    >
      {/* ── Background Photo with Ken Burns ── */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale }}
      >
        <Image
          src="/images/dillon-studio-pointing.jpg"
          alt="Dillon Smith — cinematic poster"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </motion.div>

      {/* ── Primary dark overlay — transforms white-bg to dramatic ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 50%, rgba(5,5,5,0.85) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Blue radial accent overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(0,212,255,0.12) 0%, transparent 60%)',
        }}
      />

      {/* ── Vignette at edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Content — left-aligned ── */}
      <div className="relative flex items-center min-h-[100svh] px-6 sm:px-10 lg:pl-24 lg:pr-12">
        <motion.div
          ref={contentRef}
          className="max-w-2xl"
          style={{ y: quoteY }}
        >
          {/* Small label */}
          <motion.p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-6"
            style={{ color: '#00D4FF' }}
            initial={{ opacity: 0, y: 16 }}
            animate={lineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            ELITE · DRIVEN · UNSTOPPABLE
          </motion.p>

          {/* Electric blue rule above quote */}
          <motion.div
            className="mb-6"
            style={{ width: '60px', height: '1px', background: '#00D4FF' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Staggered quote lines */}
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            animate={lineInView ? 'visible' : 'hidden'}
            variants={lineContainerVariants}
          >
            {QUOTE_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  variants={lineVariants}
                  className="font-bold uppercase leading-[1.05] tracking-tight"
                  style={{
                    fontFamily: 'var(--font-oswald)',
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    color: '#F0F0F8',
                    textShadow: '0 2px 24px rgba(0,0,0,0.6)',
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Attribution */}
          <motion.p
            className="mt-5 text-sm tracking-[0.22em] uppercase"
            style={{ color: 'rgba(180,180,200,0.7)' }}
            initial={{ opacity: 0 }}
            animate={lineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            — DILLON SMITH, 800M
          </motion.p>
        </motion.div>
      </div>

      {/* ── Bottom Speed-Line Divider ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '3px' }}>
        <motion.div
          className="h-full w-full origin-left"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={speedLineVariants}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #00D4FF 20%, #ffffff 50%, #00D4FF 80%, transparent 100%)',
          }}
        />
      </div>
    </section>
  )
}
