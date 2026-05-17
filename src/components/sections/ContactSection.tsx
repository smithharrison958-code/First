'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const subjects = ['Sponsorship Inquiry', 'NIL Opportunity', 'Media Request', 'Brand Collaboration', 'General']

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.25)',
  color: 'rgba(255,255,255,0.9)',
  fontSize: '0.85rem',
  padding: '0.85rem 0',
  outline: 'none',
  letterSpacing: '0.04em',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  letterSpacing: '0.35em',
  color: 'rgba(255,255,255,0.5)',
  display: 'block',
  marginBottom: '0.4rem',
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setErr('All fields required.'); return }
    setErr(''); setSent(true)
  }

  return (
    <section id="contact" ref={ref} style={{ background: '#080808', minHeight: '100vh', paddingTop: '14vh', paddingBottom: '14vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '7vw', paddingRight: '7vw' }}>

        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5vh' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          <div style={{ width: 24, height: '1px', background: 'rgba(255,255,255,0.35)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.55)' }}>GET IN TOUCH</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{ marginBottom: '10vh', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-oswald)',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
          }}>
            <span style={{ color: '#F8F8F5', display: 'block' }}>LET&apos;S BUILD</span>
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.5)', display: 'block' }}>SOMETHING</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12vw', alignItems: 'start' }}>

          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 2, marginBottom: '5vh' }}>
              For NIL partnerships, sponsorship inquiries, brand collaborations, and media requests. Response within 24–48 hours.
            </p>

            <div style={{ marginBottom: '2.5rem' }}>
              <p style={labelStyle}>EMAIL</p>
              <a
                href="mailto:dillonsmith.athlete@gmail.com"
                style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.04em' }}
              >
                dillonsmith.athlete@gmail.com
              </a>
            </div>

            <div>
              <p style={labelStyle}>INSTAGRAM</p>
              <a
                href="#"
                style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.04em' }}
              >
                @dillonsmith_runs
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ paddingTop: '2rem' }}
                >
                  <div style={{ width: 32, height: '1px', background: 'rgba(255,255,255,0.35)', marginBottom: '2.5rem' }} />
                  <p style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.75)', marginBottom: '1rem' }}>MESSAGE SENT</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{"Dillon's team will be in touch within 24–48 hours."}</p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                    <div>
                      <label style={labelStyle}>NAME</label>
                      <input name="name" value={form.name} onChange={change} style={inputStyle} placeholder="Your name" required />
                    </div>
                    <div>
                      <label style={labelStyle}>EMAIL</label>
                      <input name="email" type="email" value={form.email} onChange={change} style={inputStyle} placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>SUBJECT</label>
                    <select name="subject" value={form.subject} onChange={change} style={{ ...inputStyle, appearance: 'none', cursor: 'none' }}>
                      {subjects.map(s => <option key={s} value={s} style={{ background: '#111', color: '#fff' }}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>MESSAGE</label>
                    <textarea name="message" value={form.message} onChange={change} rows={4}
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.8 }}
                      placeholder="Tell us about your project..." required />
                  </div>

                  {err && <p style={{ fontSize: '11px', color: 'rgba(255,80,80,0.7)', letterSpacing: '0.1em', marginTop: '-1.5rem' }}>{err}</p>}

                  <motion.button
                    type="submit"
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '10px',
                      letterSpacing: '0.38em',
                      color: 'rgba(255,255,255,0.88)',
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.45)',
                      paddingBottom: '4px',
                      cursor: 'none',
                      transition: 'color 0.2s ease, border-color 0.2s ease',
                    }}
                    whileHover={{ color: '#fff', borderBottomColor: 'rgba(255,255,255,0.5)' }}
                  >
                    SEND MESSAGE →
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
