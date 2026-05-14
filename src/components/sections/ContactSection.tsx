'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

/* ─────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function TwitterXIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number], delay },
  }),
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

/* ─────────────────────────────────────────────
   Success Checkmark
───────────────────────────────────────────── */

function SuccessState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full py-16 text-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Animated check circle */}
      <motion.div
        className="relative flex items-center justify-center w-20 h-20 rounded-full mb-6"
        style={{ border: '2px solid rgba(0,212,255,0.4)', background: 'rgba(0,212,255,0.06)' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            stroke="#00D4FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 30px rgba(0,212,255,0.25)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </motion.div>

      <motion.h3
        className="text-2xl font-bold uppercase mb-2"
        style={{ fontFamily: 'var(--font-oswald)', color: '#E8E8F0' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Message Sent
      </motion.h3>
      <motion.p
        className="text-sm leading-relaxed max-w-xs"
        style={{ color: '#9090A8' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Thanks for reaching out. Dillon will get back to you within 24–48 hours.
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   ContactSection
───────────────────────────────────────────── */

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Copy-to-clipboard state
  const [copied, setCopied] = useState(false)

  // Form state
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  /* ── Handlers ── */
  function handleCopy() {
    navigator.clipboard.writeText('dillonsmith.athlete@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  function validate(): boolean {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) {
      next.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.subject) next.subject = 'Please select a subject.'
    if (!form.message.trim()) next.message = 'Message is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Mock async submit
    await new Promise((res) => setTimeout(res, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  /* ── Shared input styles ── */
  const inputBase: React.CSSProperties = {
    background: '#0D0D14',
    border: '1px solid rgba(0,212,255,0.2)',
    color: '#E8E8F0',
    outline: 'none',
    width: '100%',
  }

  const inputClassName =
    'block w-full px-4 py-3 rounded-sm text-sm transition-all duration-200 placeholder-[#9090A8] focus:ring-0'

  function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.border = '1px solid rgba(0,212,255,0.75)'
    e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.1)'
  }
  function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.border = '1px solid rgba(0,212,255,0.2)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Corner glow — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(0,212,255,0.055) 0%, transparent 65%)',
        }}
      />
      {/* Corner glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(0,212,255,0.035) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4 font-semibold"
            style={{ color: '#00D4FF' }}
          >
            Get In Touch
          </p>
          <h2
            className="font-bold uppercase leading-[1.05]"
            style={{
              fontFamily: 'var(--font-oswald)',
              color: '#E8E8F0',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            }}
          >
            Let&apos;s Build
            <br />
            <span style={{ color: '#00D4FF' }}>Something Great</span>
          </h2>
          <div
            className="mt-5 mx-auto w-16 h-px"
            style={{ background: 'rgba(0,212,255,0.5)' }}
          />
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Contact Info ── */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="flex flex-col gap-8"
          >
            {/* Intro copy */}
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: '#9090A8' }}
            >
              For NIL partnerships, sponsorship inquiries, brand collaborations, and media requests — reach out directly.
            </p>

            {/* Email — copy on click */}
            <div className="flex flex-col gap-2">
              <p
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: '#00D4FF' }}
              >
                Email
              </p>
              <button
                onClick={handleCopy}
                className="group flex items-center gap-3 text-left transition-colors duration-200"
                aria-label="Copy email address to clipboard"
              >
                <span
                  className="text-base font-medium"
                  style={{ color: '#E8E8F0' }}
                >
                  dillonsmith.athlete@gmail.com
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm transition-all duration-200"
                  style={{
                    color: copied ? '#00D4FF' : '#9090A8',
                    border: copied ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    background: copied ? 'rgba(0,212,255,0.06)' : 'transparent',
                  }}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Instagram handle */}
            <div className="flex flex-col gap-2">
              <p
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: '#00D4FF' }}
              >
                Instagram
              </p>
              <a
                href="https://instagram.com/dillonsmith_runs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium transition-colors duration-200 hover:underline"
                style={{ color: '#E8E8F0' }}
              >
                @dillonsmith_runs
              </a>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <p
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: '#00D4FF' }}
              >
                Follow Along
              </p>
              <div className="flex items-center gap-4">
                {[
                  { href: 'https://instagram.com/dillonsmith_runs', label: 'Instagram', Icon: InstagramIcon },
                  { href: 'https://x.com/dillonsmith_runs', label: 'X / Twitter', Icon: TwitterXIcon },
                  { href: 'https://youtube.com/@dillonsmith_runs', label: 'YouTube', Icon: YoutubeIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-200"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#9090A8',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = '#00D4FF'
                      el.style.border = '1px solid rgba(0,212,255,0.45)'
                      el.style.boxShadow = '0 0 12px rgba(0,212,255,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.color = '#9090A8'
                      el.style.border = '1px solid rgba(255,255,255,0.1)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Response time note */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-sm"
              style={{
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.12)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#00D4FF', boxShadow: '0 0 6px rgba(0,212,255,0.6)' }}
              />
              <p className="text-xs tracking-wide" style={{ color: '#9090A8' }}>
                Response time:{' '}
                <span style={{ color: '#C8C8D8' }}>within 24–48 hours</span>
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            custom={0.18}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <div
              className="relative p-8 rounded-sm"
              style={{
                background: 'rgba(10,10,20,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Top electric-blue accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }}
              />

              {submitted ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: '#9090A8' }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      placeholder="Your full name"
                      className={inputClassName}
                      style={inputBase}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs" style={{ color: '#FF6B6B' }}>{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: '#9090A8' }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      placeholder="your@email.com"
                      className={inputClassName}
                      style={inputBase}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs" style={{ color: '#FF6B6B' }}>{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: '#9090A8' }}
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                      className={inputClassName}
                      style={{
                        ...inputBase,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        cursor: 'pointer',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239090A8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: '36px',
                      }}
                    >
                      <option value="" disabled style={{ color: '#9090A8', background: '#0D0D14' }}>
                        Select inquiry type
                      </option>
                      {['Sponsorship Inquiry', 'Media Request', 'NIL Opportunity', 'General'].map((opt) => (
                        <option key={opt} value={opt} style={{ background: '#0D0D14' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs" style={{ color: '#FF6B6B' }}>{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs tracking-widest uppercase mb-2 font-semibold"
                      style={{ color: '#9090A8' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={focusStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                      onBlur={blurStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                      placeholder="Tell Dillon about your proposal or inquiry…"
                      rows={5}
                      className={`${inputClassName} resize-none`}
                      style={inputBase}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs" style={{ color: '#FF6B6B' }}>{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative w-full py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm overflow-hidden"
                    style={{
                      fontFamily: 'var(--font-oswald)',
                      background: submitting ? 'rgba(0,212,255,0.7)' : '#00D4FF',
                      color: '#050505',
                      cursor: submitting ? 'wait' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting) {
                        const el = e.currentTarget
                        el.style.boxShadow = '0 0 28px rgba(0,212,255,0.45), 0 0 60px rgba(0,212,255,0.15)'
                        el.style.background = '#33DDFF'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = 'none'
                      el.style.background = submitting ? 'rgba(0,212,255,0.7)' : '#00D4FF'
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" stroke="rgba(5,5,5,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0110 10" stroke="#050505" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
