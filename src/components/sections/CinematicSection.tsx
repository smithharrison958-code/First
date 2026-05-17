'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

export default function CinematicSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08])
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const lines = ['EVERY', 'SECOND', 'COUNTS']

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <motion.div style={{ position: 'absolute', inset: '-10%', y, scale }}>
        <Image
          src="/images/dillon-studio-pointing.jpg"
          alt="Dillon Smith"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 75%, #000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, transparent 35%, transparent 65%, #000 100%)' }} />

      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: '8vw',
          y: textY,
        }}
      >
        {lines.map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.span
              style={{
                display: 'block',
                fontFamily: 'var(--font-oswald)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 14vw, 13rem)',
                lineHeight: 0.87,
                color: i === 1 ? 'transparent' : '#fff',
                WebkitTextStroke: i === 1 ? '1px rgba(255,255,255,0.38)' : undefined,
              }}
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.12 }}
            >
              {line}
            </motion.span>
          </div>
        ))}

        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div style={{ width: 48, height: 1, background: '#00D4FF' }} />
          <span style={{ fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)' }}>
            800 METERS · CORPUS CHRISTI
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
