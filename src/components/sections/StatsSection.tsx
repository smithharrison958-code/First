'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

function StatLine({ value, label, align = 'left', outline = false, color = 'white', glow = false, delay = 0 }: {
  value: string; label: string; align?: 'left' | 'right' | 'center'
  outline?: boolean; color?: string; glow?: boolean; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const alignClass = align === 'right' ? 'text-right pr-[8vw]' : align === 'center' ? 'text-center' : 'text-left pl-[8vw]'

  return (
    <motion.div
      ref={ref}
      className={`relative ${alignClass} py-10`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {align === 'left' && (
        <motion.div
          className="absolute left-[6.5vw] top-1/2 -translate-y-1/2 w-px h-20"
          style={{ background: '#00D4FF', opacity: 0.5 }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        />
      )}
      <motion.div
        style={{
          fontFamily: 'var(--font-oswald)',
          fontWeight: 900,
          fontSize: 'clamp(4rem, 17vw, 15rem)',
          lineHeight: 0.85,
          color: outline ? 'transparent' : color,
          WebkitTextStroke: outline ? '1px rgba(255,255,255,0.22)' : undefined,
          textShadow: glow ? '0 0 80px rgba(0,212,255,0.5)' : undefined,
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.1 }}
      >
        {value}
      </motion.div>
      <motion.p
        className="text-[10px] tracking-[0.35em] mt-4"
        style={{ color: 'rgba(255,255,255,0.28)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

function RaceBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: '55vh' }}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src="/images/dillon-race.jpg" alt="Dillon racing" fill style={{ objectFit: 'cover', objectPosition: 'center 25%', scale: '1.15' }} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, #000 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 40%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 30%)' }} />
      <motion.p
        className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.5em]"
        style={{ color: 'rgba(255,255,255,0.55)' }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        NCAA QUALIFIER · 2025
      </motion.p>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section id="performance" ref={ref} style={{ background: '#000', minHeight: '100vh' }}>
      <motion.div
        className="flex flex-col items-center pt-28 pb-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <p className="text-[10px] tracking-[0.4em]" style={{ color: '#00D4FF' }}>BY THE NUMBERS</p>
        <div className="mt-4 w-20 h-px" style={{ background: '#00D4FF', opacity: 0.25 }} />
      </motion.div>

      <StatLine value="1:47.3" label="PERSONAL BEST · 800 METERS" align="left" delay={0} />
      <StatLine value="3×" label="CONFERENCE CHAMPION" align="right" outline delay={0.1} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(5rem, 22vw, 20rem)', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>
          VICTORIES
        </div>
        <StatLine value="14" label="CAREER VICTORIES" align="center" delay={0.1} />
      </div>

      <RaceBanner />

      <StatLine value="2" label="NCAA APPEARANCES" align="left" color="#00D4FF" glow delay={0} />

      <div className="h-24" />
    </section>
  )
}
