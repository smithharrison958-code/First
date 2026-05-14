'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface GalleryItem {
  id: number
  label: string
  colSpan?: string
  rowSpan?: string
  gradient: string
  pattern: string
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    label: 'Race Start Position',
    rowSpan: 'row-span-2',
    gradient: 'linear-gradient(160deg, #0a0a1a 0%, #0d1b3e 40%, #061428 100%)',
    pattern: 'radial-gradient(ellipse at 30% 70%, rgba(0,100,200,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,50,120,0.12) 0%, transparent 50%)',
  },
  {
    id: 2,
    label: 'Mid-Race Push',
    gradient: 'linear-gradient(135deg, #080818 0%, #0f1f40 50%, #050d22 100%)',
    pattern: 'radial-gradient(circle at 60% 40%, rgba(0,80,180,0.15) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(0,20,80,0.2) 0%, transparent 40%)',
  },
  {
    id: 3,
    label: 'Finish Line Sprint',
    gradient: 'linear-gradient(200deg, #060616 0%, #0c1a38 60%, #040c20 100%)',
    pattern: 'radial-gradient(ellipse at 50% 50%, rgba(0,60,160,0.2) 0%, transparent 65%), radial-gradient(ellipse at 90% 10%, rgba(0,30,100,0.15) 0%, transparent 45%)',
  },
  {
    id: 4,
    label: 'Conference Championship Victory',
    colSpan: 'col-span-2',
    gradient: 'linear-gradient(110deg, #09091c 0%, #112040 35%, #0d1830 70%, #060e20 100%)',
    pattern: 'radial-gradient(ellipse at 25% 60%, rgba(0,90,200,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(0,50,140,0.14) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0,20,80,0.1) 0%, transparent 40%)',
  },
  {
    id: 5,
    label: 'Training Track Session',
    gradient: 'linear-gradient(170deg, #070715 0%, #0e1c3c 55%, #050c1e 100%)',
    pattern: 'radial-gradient(circle at 40% 30%, rgba(0,70,170,0.16) 0%, transparent 50%), radial-gradient(ellipse at 70% 75%, rgba(0,40,120,0.12) 0%, transparent 45%)',
  },
  {
    id: 6,
    label: 'Pre-Race Focus',
    rowSpan: 'row-span-2',
    gradient: 'linear-gradient(145deg, #080818 0%, #101e42 45%, #060e28 100%)',
    pattern: 'radial-gradient(ellipse at 60% 40%, rgba(0,80,190,0.2) 0%, transparent 60%), radial-gradient(ellipse at 20% 85%, rgba(0,30,100,0.15) 0%, transparent 40%)',
  },
]

/* ─────────────────────────────────────────────
   Framer variants
───────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/* ─────────────────────────────────────────────
   GalleryItem Component
───────────────────────────────────────────── */

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${item.colSpan ?? ''} ${item.rowSpan ?? ''}`}
      style={{ minHeight: item.rowSpan ? '320px' : '200px' }}
      whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: item.gradient }}
      />
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0"
        style={{ background: item.pattern }}
      />

      {/* Athletic grid lines — decorative */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
        }}
      />

      {/* Diagonal speed-line accent */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: 'repeating-linear-gradient(65deg, transparent, transparent 18px, rgba(0,212,255,0.6) 18px, rgba(0,212,255,0.6) 19px)',
        }}
      />

      {/* Corner electric-blue accent */}
      <div
        className="absolute top-0 left-0 w-8 h-8 opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.5) 0%, transparent 60%)',
        }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          border: '1px solid rgba(0,212,255,0.55)',
        }}
      >
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
          style={{ color: '#00D4FF', fontFamily: 'var(--font-oswald)' }}
        >
          View Photo
        </span>
        <div
          className="w-8 h-px"
          style={{ background: '#00D4FF' }}
        />
      </motion.div>

      {/* Bottom label — always visible */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
        }}
      >
        <p className="text-xs tracking-wider uppercase text-gray-300 font-medium">
          {item.label}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   GallerySection
───────────────────────────────────────────── */

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, transparent 70%)',
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
            Action Photography
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold uppercase leading-tight"
            style={{ fontFamily: 'var(--font-oswald)', color: '#E8E8F0' }}
          >
            The Moments That Define
          </h2>
          <div
            className="mt-4 mx-auto w-16 h-px"
            style={{ background: 'rgba(0,212,255,0.5)' }}
          />
        </motion.div>

        {/* ── Masonry Grid — Desktop ── */}
        <motion.div
          ref={gridRef}
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, 200px)',
          }}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {GALLERY_ITEMS.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ── Mobile Grid — 2 column, no row-span ── */}
        <motion.div
          className="md:hidden grid grid-cols-2 gap-2"
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative overflow-hidden rounded-sm cursor-pointer group"
              style={{ minHeight: '140px' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0" style={{ background: item.gradient }} />
              <div className="absolute inset-0" style={{ background: item.pattern }} />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  background: 'repeating-linear-gradient(65deg, transparent, transparent 18px, rgba(0,212,255,0.6) 18px, rgba(0,212,255,0.6) 19px)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
              >
                <p className="text-[10px] tracking-wider uppercase text-gray-300">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <button
            className="relative px-10 py-3.5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 group"
            style={{
              fontFamily: 'var(--font-oswald)',
              border: '1px solid rgba(0,212,255,0.5)',
              color: '#00D4FF',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(0,212,255,0.08)'
              el.style.boxShadow = '0 0 24px rgba(0,212,255,0.2), inset 0 0 24px rgba(0,212,255,0.04)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.boxShadow = 'none'
            }}
          >
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  )
}
