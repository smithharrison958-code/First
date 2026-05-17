'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const propositions = [
  {
    num: '01',
    title: 'ELITE PERFORMANCE',
    body: 'Top-tier NCAA competitor with a 1:47.3 personal best and consistent podium finishes at major collegiate meets across the nation.',
  },
  {
    num: '02',
    title: 'AUTHENTIC REACH',
    body: 'Growing platform with a core audience of 18–35 sports and fitness enthusiasts who actively seek and trust athlete-led brand recommendations.',
  },
  {
    num: '03',
    title: 'BRAND ALIGNMENT',
    body: "Every race, every post, every appearance reflects dedication, discipline, and relentless pursuit of excellence — the same values great brands are built on.",
  },
]

function HeroImageBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80])

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/dillon-studio-pointing.jpg"
          alt="Dillon Smith"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'top center', scale: '1.15' }}
        />
      </motion.div>
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.48)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 65%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 45%)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center" style={{ paddingLeft: '8vw', maxWidth: '55vw' }}>
        <SponsorContent />
      </div>
    </div>
  )
}

function SponsorContent() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div ref={ref}>
      <motion.p
        className="text-[10px] tracking-[0.45em] mb-8"
        style={{ color: '#00D4FF' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        PARTNERSHIP
      </motion.p>

      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <span style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 7vw, 7rem)',
          color: '#fff',
          display: 'block',
          lineHeight: 0.9,
        }}>INVEST IN</span>
        <span style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 7vw, 7rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.55)',
          display: 'block',
          lineHeight: 0.9,
        }}>THE FUTURE</span>
      </motion.div>

      <motion.p
        className="text-sm leading-relaxed mt-8 mb-10"
        style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '340px' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        Dillon Smith represents the next generation of elite NCAA middle-distance running. Align your brand with discipline, speed, and authentic athletic excellence.
      </motion.p>

      <motion.a
        href="#contact"
        onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="inline-block text-[11px] tracking-[0.3em] pb-1"
        style={{ color: '#00D4FF', borderBottom: '1px solid #00D4FF' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ letterSpacing: '0.4em' }}
      >
        REQUEST MEDIA KIT →
      </motion.a>
    </div>
  )
}

function PropositionItem({ num, title, body, delay }: { num: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-16 py-14 group"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingLeft: '8vw', paddingRight: '8vw' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {/* Ghost number */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(5rem, 12vw, 11rem)',
          color: 'rgba(255,255,255,0.035)',
          paddingLeft: '6vw',
          lineHeight: 1,
        }}
      >
        {num}
      </div>

      {/* Left: number + title */}
      <div className="relative z-10 flex-shrink-0">
        <p className="text-[10px] tracking-[0.3em] mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>{num}</p>
        <h3 style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
          color: '#fff',
          letterSpacing: '0.08em',
        }}>{title}</h3>
      </div>

      {/* Right: body */}
      <p className="relative z-10 text-sm leading-relaxed md:max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {body}
      </p>

      {/* Hover accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: '#00D4FF' }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function SponsorshipSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <section id="sponsorship" style={{ background: '#000' }}>
      {/* Part A — Full-screen image moment */}
      <HeroImageBlock />

      {/* Part B — Three value propositions */}
      <div style={{ background: '#000' }}>
        {propositions.map((p, i) => (
          <PropositionItem key={p.num} {...p} delay={i * 0.1} />
        ))}
      </div>

      {/* Part C — Giant contact CTA */}
      <div
        ref={ctaRef}
        className="text-center py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <motion.p
          className="text-[10px] tracking-[0.4em] mb-5"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          READY TO COLLABORATE?
        </motion.p>
        <motion.a
          href="#contact"
          onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            color: '#fff',
            display: 'block',
            lineHeight: 1,
            textDecoration: 'none',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          whileHover={{ color: '#00D4FF' }}
        >
          LET&apos;S TALK
        </motion.a>
        <motion.p
          className="text-xs tracking-[0.2em] mt-5"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          dillonsmith.athlete@gmail.com
        </motion.p>
      </div>
    </section>
  )
}
