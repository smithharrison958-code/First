'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const subjects = ['Sponsorship Inquiry', 'NIL Opportunity', 'Media Request', 'Brand Collaboration', 'General']

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
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

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)',
    color: '#fff', fontSize: '0.875rem', padding: '0.75rem 0',
    outline: 'none', letterSpacing: '0.05em',
  }

  return (
    <section id="contact" ref={ref} style={{ background: '#000', minHeight: '100vh', paddingTop: '14vh', paddingBottom: '14vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '8vw', paddingRight: '8vw' }}>

        {/* Header */}
        <motion.div
          style={{ marginBottom: '8vh' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#00D4FF', marginBottom: '2rem' }}>GET IN TOUCH</p>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.88, color: '#fff' }}>
              LET&apos;S BUILD
            </div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.88, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>
              SOMETHING GREAT
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '10vw', alignItems: 'start' }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, marginBottom: '2.5rem' }}>
              For NIL partnerships, sponsorship inquiries, brand collaborations, and media requests. Response within 24–48 hours.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.4rem' }}>EMAIL</p>
              <a href="mailto:dillonsmith.athlete@gmail.com" style={{ fontSize: '0.85rem', color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}>dillonsmith.athlete@gmail.com</a>
            </div>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.4rem' }}>INSTAGRAM</p>
              <a href="#" style={{ fontSize: '0.85rem', color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}>@dillonsmith_runs</a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ paddingTop: '3rem' }}
                >
                  <div style={{ width: 40, height: 1, background: '#00D4FF', marginBottom: '2rem' }} />
                  <p style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#00D4FF', marginBottom: '0.75rem' }}>MESSAGE SENT</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{"Dillon's team will be in touch within 24–48 hours."}</p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <label style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.5rem' }}>NAME</label>
                      <input name="name" value={form.name} onChange={change} style={inputStyle} placeholder="Your name" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.5rem' }}>EMAIL</label>
                      <input name="email" type="email" value={form.email} onChange={change} style={inputStyle} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.5rem' }}>SUBJECT</label>
                    <select name="subject" value={form.subject} onChange={change} style={{ ...inputStyle, appearance: 'none' }}>
                      {subjects.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '0.5rem' }}>MESSAGE</label>
                    <textarea name="message" value={form.message} onChange={change} rows={4} style={{ ...inputStyle, resize: 'none' }} placeholder="Tell us about your project..." required />
                  </div>
                  {err && <p style={{ fontSize: '11px', color: '#ff4444', letterSpacing: '0.1em' }}>{err}</p>}
                  <motion.button
                    type="submit"
                    style={{ alignSelf: 'flex-start', fontSize: '10px', letterSpacing: '0.35em', color: '#fff', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '4px', cursor: 'none' }}
                    whileHover={{ borderBottomColor: '#00D4FF', color: '#00D4FF' }}
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
