"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Leaf, Globe, X, Video, ArrowRight } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Cookware", href: "/shop?category=Cookware" },
    { label: "Cutting Boards", href: "/shop?category=Cutting+Boards" },
    { label: "Food Storage", href: "/shop?category=Food+Storage" },
    { label: "Utensils", href: "/shop?category=Utensils" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "The Journal", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer ref={ref} className="bg-[#1A1A1A] text-[#FAFAF7]">
      {/* Main footer */}
      <div className="container-premium py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-full bg-[#C4956A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-light tracking-[0.2em] uppercase text-[#FAFAF7]">PureLife</span>
                <span className="text-sm font-bold tracking-[0.1em] uppercase text-[#C4956A]">Kitchen</span>
              </div>
            </Link>
            <p className="text-sm text-[#8A8A8A] leading-relaxed mb-6 max-w-xs">
              We believe your kitchen should nourish, not harm. Every product we offer is
              microplastic-free, non-toxic, and built to last a lifetime.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-8">
              {[
                { icon: Globe, label: "Instagram", href: "#" },
                { icon: X, label: "Twitter / X", href: "#" },
                { icon: Video, label: "YouTube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#8A8A8A] hover:text-[#FAFAF7] hover:border-[#C4956A] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAFAF7] mb-3">
                Join the movement
              </p>
              {subscribed ? (
                <p className="text-sm text-[#8FAF8A]">
                  Thank you! You&apos;re on the list.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 h-9 px-3 bg-white/6 border border-white/10 rounded text-sm text-[#FAFAF7] placeholder-[#8A8A8A] focus:outline-none focus:border-[#C4956A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="h-9 w-9 bg-[#C4956A] rounded flex items-center justify-center hover:bg-[#A47850] transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAFAF7] mb-4">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8A8A8A] hover:text-[#C4956A] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container-premium py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#8A8A8A]">
            © {new Date().getFullYear()} PureLife Kitchen. All rights reserved.
          </p>
          <p className="text-xs text-[#8A8A8A] flex items-center gap-1">
            <Leaf className="w-3 h-3 text-[#8FAF8A]" />
            Certified plastic-free packaging
          </p>
        </div>
      </div>
    </footer>
  );
}
