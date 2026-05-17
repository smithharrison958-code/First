'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const props = [
  { n: '01', title: 'ELITE PERFORMANCE', body: 'A 1:47.3 personal best and consistent podium finishes at major collegiate meets — Dillon competes at the level brands want to be seen at.' },
  { n: '02', title: 'AUTHENTIC REACH', body: 'A growing audience of 18–35 sports and fitness enthusiasts who actively seek out and trust athlete-led brand recommendations.' },
  { n: '03', title: 'BRAND ALIGNMENT', body: 'Every race, every post, every appearance reflects dedication, discipline, and relentless pursuit of excellence — the same values great brands are built on.' },
]

export default function SponsorshipSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const heroIn = useInView(heroRef, { once: true, amount: 0.25 })
  const propsIn = useInView(propsRef, { once: true, amount: 0.15 })
  const ctaIn = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <section id="sponsorship" style={{ background: '#F8F8F5' }}>

      {/* ── Hero split ── */}
      <div ref={heroRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh', alignItems: 'stretch' }}>
        {/* Left — text */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vh 6vw 8vh 7vw' }}
          initial={{ opacity: 0, x: -30 }}
          animate={heroIn ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#666', marginBottom: '2.5rem' }}>PARTNERSHIP</p>
          <div>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 6rem)', color: '#0A0A0A', display: 'block', lineHeight: 0.9 }}>INVEST IN</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 6rem)', color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.45)', display: 'block', lineHeight: 0.9 }}>THE FUTURE</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.9, marginTop: '2.5rem', maxWidth: '340px' }}>
            Dillon Smith represents the next generation of elite NCAA middle-distance running. Align your brand with discipline, speed, and authentic athletic excellence.
          </p>
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ display: 'inline-block', fontSize: '9px', letterSpacing: '0.35em', color: '#0A0A0A', borderBottom: '1px solid rgba(0,0,0,0.4)', paddingBottom: '3px', textDecoration: 'none', marginTop: '2.5rem' }}
            whileHover={{ letterSpacing: '0.5em' }}
          >
            REQUEST MEDIA KIT →
          </motion.a>
        </motion.div>

        {/* Right — photo blending into bg */}
        <motion.div
          style={{ position: 'relative', overflow: 'hidden', background: '#F0F0ED' }}
          initial={{ opacity: 0 }}
          animate={heroIn ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <Image src="/images/dillon-studio-pointing.jpg" alt="Dillon Smith" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
          {/* Blend left edge into section bg */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F8F8F5 0%, transparent 20%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #F8F8F5 0%, transparent 20%)' }} />
        </motion.div>
      </div>

      {/* ── Value propositions ── */}
      <div ref={propsRef} style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        {props.map((p, i) => (
          <motion.div key={p.n}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6vw', padding: '5vh 7vw', borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)' : undefined, position: 'relative' }}
            initial={{ opacity: 0, y: 20 }}
            animate={propsIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            {/* Ghost number */}
            <div style={{ position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(5rem, 12vw, 10rem)', color: 'rgba(0,0,0,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
              {p.n}
            </div>
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#777', marginBottom: '0.5rem' }}>{p.n}</p>
              <h3 style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#0A0A0A', letterSpacing: '0.06em' }}>{p.title}</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.9, maxWidth: '400px' }}>{p.body}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Giant CTA ── */}
      <div ref={ctaRef} style={{ padding: '14vh 7vw 16vh', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5vh' }}
          initial={{ opacity: 0 }} animate={ctaIn ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
          <div style={{ width: 24, height: '1px', background: 'rgba(0,0,0,0.18)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: '#777' }}>READY TO COLLABORATE?</span>
        </motion.div>
        <motion.a
          href="#contact"
          onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 11vw, 10rem)',
            color: '#0A0A0A',
            display: 'block',
            lineHeight: 0.88,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          whileHover={{ opacity: 0.45 }}
        >
          LET&apos;S<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.45)' }}>TALK</span>
        </motion.a>
        <motion.p
          style={{ fontSize: '11px', color: '#666', letterSpacing: '0.22em', marginTop: '3vh' }}
          initial={{ opacity: 0 }} animate={ctaIn ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }}>
          dillonsmith.athlete@gmail.com
        </motion.p>
      </div>
    </section>
  )
}
