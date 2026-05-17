'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const YOUTUBE_URL = '' // Set a real YouTube embed URL when available

export default function VideoSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [played, setPlayed] = useState(false)

  return (
    <section id="highlights" ref={ref} style={{ position: 'relative', background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

      {/* Full-bleed race photo as atmosphere */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ scale: 1.05 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/dillon-relay-team.jpg"
            alt="Relay team"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </motion.div>
        {/* Heavy dark overlay — editorial, not full black */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.75) 40%, rgba(8,8,8,0.45) 70%, rgba(8,8,8,0.25) 100%)' }} />
      </div>

      {/* Content — bottom left */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 7vw 10vh' }}>

        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3vh' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div style={{ width: 24, height: '1px', background: 'rgba(255,255,255,0.35)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.6)' }}>RACE FILM</span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: '6vh' }}>
          <motion.div
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-oswald)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              lineHeight: 0.9,
              color: '#fff',
              letterSpacing: '-0.01em',
            }}>
              WATCH<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.55)' }}>DILLON RUN</span>
            </h2>
          </motion.div>
        </div>

        {/* Play area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        >
          {played && YOUTUBE_URL ? (
            <div style={{ position: 'relative', width: 'min(720px, 82vw)', aspectRatio: '16/9' }}>
              <iframe
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                src={`${YOUTUBE_URL}?autoplay=1`}
                title="Dillon Smith highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              onClick={() => YOUTUBE_URL ? setPlayed(true) : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: YOUTUBE_URL ? 'none' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: 0,
              }}
            >
              {/* Circle play icon */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: '17px solid rgba(255,255,255,0.9)',
                  marginLeft: '4px',
                }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
                  {YOUTUBE_URL ? '2025 SEASON HIGHLIGHTS' : 'HIGHLIGHTS COMING SOON'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>
                  {YOUTUBE_URL ? '2025 Conference Championships · 800M Final' : 'Full season race footage in progress'}
                </p>
              </div>
            </button>
          )}
        </motion.div>
      </div>

      {/* Thin top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
    </section>
  )
}
