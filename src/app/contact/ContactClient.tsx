"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle, Send } from "lucide-react";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div className="bg-[#1A1A1A] pt-24 pb-16">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAF7] mb-3">Contact Us</h1>
            <p className="text-[#8A8A8A] max-w-md">
              Questions about products, orders, or just want to chat about non-toxic living? We&apos;re here.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-premium py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {[
              {
                icon: Mail,
                title: "Email Us",
                lines: ["hello@purelifekitchen.com", "support@purelifekitchen.com"],
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                lines: ["Available Mon–Fri", "9am – 6pm EST"],
              },
              {
                icon: Clock,
                title: "Response Time",
                lines: ["We typically reply", "within 4 business hours"],
              },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C4956A]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#C4956A]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-[#8A8A8A]">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* FAQ prompt */}
            <div className="p-4 rounded-xl bg-[#F0EDE8] border border-[#E8E8E8]">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Before you write…</p>
              <p className="text-xs text-[#8A8A8A] mb-2">
                Many common questions are answered in our FAQ section.
              </p>
              <a href="/faq" className="text-xs text-[#C4956A] hover:text-[#A47850] font-medium">
                Visit FAQ →
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#8FAF8A]/15 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#8FAF8A]" />
                </div>
                <h2 className="text-xl font-bold text-[#1A1A1A]">Message Received!</h2>
                <p className="text-[#8A8A8A] max-w-sm">
                  Thank you for reaching out. We&apos;ll get back to you within 4 business hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-sm text-[#C4956A] hover:text-[#A47850] font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="input-premium"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="input-premium bg-transparent"
                  >
                    <option value="">Select a topic…</option>
                    <option value="order">Order inquiry</option>
                    <option value="product">Product question</option>
                    <option value="return">Return or exchange</option>
                    <option value="wholesale">Wholesale inquiry</option>
                    <option value="press">Press or media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help?"
                    className="input-premium resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 h-12 px-8 bg-[#1A1A1A] text-[#FAFAF7] rounded text-sm font-semibold hover:bg-[#2D2D2D] disabled:opacity-60 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
