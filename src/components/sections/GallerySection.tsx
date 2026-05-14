'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface GalleryItem {
  id: number
  src: string
  label: string
  colSpan?: string
  rowSpan?: string
  objectPosition?: string
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: '/images/dillon-race.jpg',            label: 'Texas Relays · 800M',           rowSpan: 'row-span-2', objectPosition: 'center' },
  { id: 2, src: '/images/dillon-studio-pointing.jpg', label: 'The Brand · 2026',                colSpan: '',           objectPosition: 'top center' },
  { id: 3, src: '/images/dillon-headshot.jpg',        label: 'Portrait · Islanders',            colSpan: '',           objectPosition: 'top center' },
  { id: 4, src: '/images/dillon-relay-team.jpg',      label: 'Texas Relays · 4×400 Relay',     colSpan: 'col-span-2', objectPosition: 'center' },
  { id: 5, src: '/images/dillon-team-pyramid.jpg',    label: 'Islanders Track & Field',         colSpan: '',           objectPosition: 'center' },
  { id: 6, src: '/images/dillon-studio-thumbsup.jpg', label: 'Ready · 2026 Season',             rowSpan: 'row-span-2', objectPosition: 'top center' },
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
   GalleryCard Component
───────────────────────────────────────────── */

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${item.colSpan ?? ''} ${item.rowSpan ?? ''}`}
      style={{ minHeight: item.rowSpan ? '320px' : '200px' }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Real photo */}
      <Image
        src={item.src}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
          objectPosition: item.objectPosition ?? 'center',
        }}
      />

      {/* Always-visible bottom gradient for label legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
        }}
      />

      {/* Hover overlay — darken + blue border */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'rgba(0,0,0,0.45)',
          border: '1px solid rgba(0,212,255,0.55)',
          boxShadow: 'inset 0 0 32px rgba(0,212,255,0.06)',
        }}
      >
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
          style={{ color: '#00D4FF', fontFamily: 'var(--font-oswald)' }}
        >
          View Photo
        </span>
        <div className="w-8 h-px" style={{ background: '#00D4FF' }} />
      </motion.div>

      {/* Label text — always visible */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 pointer-events-none">
        <p className="text-xs tracking-wider uppercase text-gray-200 font-medium drop-shadow-md">
          {item.label}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Mobile Gallery Card (no row-span)
───────────────────────────────────────────── */

function MobileGalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-sm cursor-pointer"
      style={{ minHeight: '140px' }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        sizes="50vw"
        style={{
          objectFit: 'cover',
          objectPosition: item.objectPosition ?? 'center',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 pointer-events-none">
        <p className="text-[10px] tracking-wider uppercase text-gray-200 drop-shadow-md">
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
          transition={{ duration: 0.6 }}
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
            <MobileGalleryCard key={item.id} item={item} />
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
            className="relative px-10 py-3.5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300"
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
