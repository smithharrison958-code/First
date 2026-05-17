'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

function FullPhotoMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: '100vh' }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/images/dillon-studio-thumbsup.jpg"
          alt="Dillon Smith"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center', scale: '1.1' }}
        />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.3) 50%, #000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000 0%, transparent 30%)' }} />

      {/* Text overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '8vh', paddingLeft: '8vw' }}>
        <motion.p
          style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#00D4FF', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          THE ATHLETE
        </motion.p>
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            color: '#fff',
            display: 'block',
            lineHeight: 0.9,
          }}>BUILT FOR</span>
          <span style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.45)',
            display: 'block',
            lineHeight: 0.9,
          }}>GREATNESS</span>
        </motion.div>
      </div>
    </div>
  )
}

function StoryBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} id="about" style={{ background: '#000', paddingTop: '12vh', paddingBottom: '12vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', paddingLeft: '8vw', paddingRight: '8vw', alignItems: 'start' }}
        className="grid-cols-1 md:grid-cols-2">

        {/* Left — giant quote mark + text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontFamily: 'var(--font-oswald)', fontSize: '8rem', color: '#00D4FF', lineHeight: 0.6, marginBottom: '1.5rem', opacity: 0.6 }}>&ldquo;</div>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontWeight: 300 }}>
            I don&apos;t run to win races. I run to find out what I&apos;m capable of — and every race answers that question differently.
          </p>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '3rem 0' }} />
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.9 }}>
            Born and raised with a fire for competition, Dillon Smith arrived at Corpus Christi University with one goal: to compete at the highest level. Since then, he has posted a 1:47.3 personal best, claimed conference titles, and earned back-to-back NCAA appearances — all while representing the Islanders with the kind of character that makes brands take notice.
          </p>
        </motion.div>

        {/* Right — asymmetric image stack */}
        <motion.div
          className="relative hidden md:block"
          style={{ height: '65vh' }}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Main image */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '72%', height: '80%', overflow: 'hidden' }}>
            <Image src="/images/dillon-relay-team.jpg" alt="Dillon with team" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          </div>
          {/* Offset image */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '52%', height: '55%', overflow: 'hidden', border: '1px solid rgba(0,212,255,0.15)' }}>
            <Image src="/images/dillon-team-pyramid.jpg" alt="Team" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
          </div>
          {/* Blue accent line */}
          <div style={{ position: 'absolute', top: '10%', left: '68%', width: '1px', height: '30%', background: 'linear-gradient(to bottom, transparent, #00D4FF, transparent)' }} />
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutSection() {
  return (
    <>
      <FullPhotoMoment />
      <StoryBlock />
    </>
  )
}
