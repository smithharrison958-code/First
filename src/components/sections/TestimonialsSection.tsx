'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Dillon's work ethic is unlike anything I've seen in 20 years of coaching. He runs every rep like it's a championship race.",
    name: 'Coach Marcus Williams',
    role: 'Head Track Coach',
  },
  {
    id: 2,
    quote: 'Training next to Dillon pushes me to my limits. He has a gift for making everyone around him better.',
    name: 'Jamie Torres',
    role: 'Teammate',
  },
  {
    id: 3,
    quote: 'His physical metrics are elite, but it\'s his mental resilience that truly sets Dillon apart from his peers.',
    name: 'Dr. Sarah Chen',
    role: 'Sports Performance Director',
  },
  {
    id: 4,
    quote: "I've competed against Dillon twice. Both times he surprised me. He's the future of middle-distance running.",
    name: 'Roberto Vega',
    role: 'Former Conference Champion',
  },
  {
    id: 5,
    quote: 'Dillon shows up early, stays late, and never makes excuses. That\'s championship mentality.',
    name: 'Coach Linda Park',
    role: 'Assistant Coach',
  },
  {
    id: 6,
    quote: 'Watch this name — Dillon Smith will be competing at the highest levels of track and field within two years.',
    name: 'Alex Morgan',
    role: 'Sports Journalist',
  },
  {
    id: 7,
    quote: 'His strength-to-weight ratio is exceptional. The training adaptations we\'ve seen this year are remarkable.',
    name: 'Tyler Brooks',
    role: 'Strength & Conditioning Coach',
  },
  {
    id: 8,
    quote: 'Dillon represents everything we want in a student-athlete: excellence, character, and competitive fire.',
    name: 'Maria Santos',
    role: 'Athletic Director',
  },
]

/* ─────────────────────────────────────────────
   TestimonialCard
───────────────────────────────────────────── */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 relative mx-3 p-6 rounded-sm"
      style={{
        width: '300px',
        background: 'rgba(10,10,20,0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
        style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.8) 0%, rgba(0,212,255,0.2) 100%)' }}
      />

      {/* Decorative quotation mark */}
      <div
        className="text-5xl font-bold leading-none mb-3 select-none"
        style={{
          color: '#00D4FF',
          fontFamily: 'Georgia, serif',
          opacity: 0.7,
          lineHeight: 1,
        }}
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-relaxed mb-5 italic"
        style={{ color: '#C8C8D8' }}
      >
        {testimonial.quote}
      </p>

      {/* Author */}
      <div>
        <p
          className="text-sm font-bold tracking-wide"
          style={{ color: '#E8E8F0' }}
        >
          {testimonial.name}
        </p>
        <p
          className="text-xs mt-0.5 tracking-wider uppercase"
          style={{ color: '#9090A8' }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ScrollRow
───────────────────────────────────────────── */

interface ScrollRowProps {
  items: Testimonial[]
  direction: 'left' | 'right'
  duration: number
}

function ScrollRow({ items, direction, duration }: ScrollRowProps) {
  // Duplicate for seamless loop
  const allItems = [...items, ...items]
  const totalCards = allItems.length
  // Each card is 300px + 24px margin = 324px
  const totalWidth = totalCards * 324

  const xStart = direction === 'left' ? 0 : -(totalWidth / 2)
  const xEnd = direction === 'left' ? -(totalWidth / 2) : 0

  const controls = useAnimationControls()
  const [running, setRunning] = useState(true)

  function startAnim() {
    controls.start({
      x: [xStart, xEnd],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      },
    })
    setRunning(true)
  }

  function handleMouseEnter() {
    controls.stop()
    setRunning(false)
  }

  function handleMouseLeave() {
    startAnim()
  }

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex"
        animate={controls}
        initial={{ x: xStart }}
        onViewportEnter={() => { if (running) startAnim() }}
        style={{ width: `${totalWidth}px` }}
      >
        {allItems.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TestimonialsSection
───────────────────────────────────────────── */

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Split testimonials into two rows of 4
  const row1 = TESTIMONIALS.slice(0, 4)
  const row2 = TESTIMONIALS.slice(4)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4 font-semibold"
            style={{ color: '#00D4FF' }}
          >
            Voices of the Track
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold uppercase leading-tight"
            style={{ fontFamily: 'var(--font-oswald)', color: '#E8E8F0' }}
          >
            What They Say
          </h2>
          <div
            className="mt-4 mx-auto w-16 h-px"
            style={{ background: 'rgba(0,212,255,0.5)' }}
          />
        </motion.div>
      </div>

      {/* ── Scrolling Rows — full bleed ── */}
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Row 1: scrolls left */}
        <div
          className="relative"
          style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}
        >
          <ScrollRow items={row1} direction="left" duration={32} />
        </div>

        {/* Row 2: scrolls right */}
        <div
          className="relative"
          style={{ maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}
        >
          <ScrollRow items={row2} direction="right" duration={28} />
        </div>
      </motion.div>

      {/* Bottom fade separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(10,10,15,1) 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
