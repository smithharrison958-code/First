"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Search, Menu, X, Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, toggleCart, toggleSearch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled || !isHome
            ? "bg-[#FAFAF7]/90 backdrop-blur-md shadow-sm border-b border-[#E8E8E8]/60"
            : "bg-transparent"
        )}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#C4956A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "text-xs font-light tracking-[0.2em] uppercase transition-colors",
                    scrolled || !isHome ? "text-[#1A1A1A]" : "text-[#FAFAF7]"
                  )}
                >
                  PureLife
                </span>
                <span
                  className={cn(
                    "text-sm font-bold tracking-[0.1em] uppercase transition-colors",
                    scrolled || !isHome ? "text-[#C4956A]" : "text-[#C4956A]"
                  )}
                >
                  Kitchen
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide animated-underline transition-colors duration-200",
                    pathname === link.href
                      ? "text-[#C4956A]"
                      : scrolled || !isHome
                      ? "text-[#1A1A1A] hover:text-[#C4956A]"
                      : "text-[#FAFAF7]/80 hover:text-[#FAFAF7]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={toggleSearch}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                  scrolled || !isHome
                    ? "text-[#1A1A1A] hover:bg-[#1A1A1A]/6"
                    : "text-[#FAFAF7] hover:bg-white/10"
                )}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center relative transition-colors",
                  scrolled || !isHome
                    ? "text-[#1A1A1A] hover:bg-[#1A1A1A]/6"
                    : "text-[#FAFAF7] hover:bg-white/10"
                )}
                aria-label="Open cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C4956A] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "md:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                  scrolled || !isHome
                    ? "text-[#1A1A1A] hover:bg-[#1A1A1A]/6"
                    : "text-[#FAFAF7] hover:bg-white/10"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden md:hidden bg-[#FAFAF7]/95 backdrop-blur-md border-t border-[#E8E8E8]/60"
        >
          <nav className="container-premium py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-[#E8E8E8]/60 transition-colors",
                  pathname === link.href
                    ? "text-[#C4956A]"
                    : "text-[#1A1A1A] hover:text-[#C4956A]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="mt-2 h-11 bg-[#1A1A1A] text-[#FAFAF7] rounded flex items-center justify-center text-sm font-medium"
            >
              Shop Now
            </Link>
          </nav>
        </motion.div>
      </motion.header>

      {/* Search overlay */}
      <SearchOverlay />
    </>
  );
}

function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSearchOpen]);

  return (
    <>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="relative w-full max-w-xl bg-[#FAFAF7] rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E8E8]">
              <Search className="w-4 h-4 text-[#8A8A8A] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, articles…"
                className="flex-1 bg-transparent text-[#1A1A1A] placeholder-[#8A8A8A] text-sm focus:outline-none"
              />
              <button onClick={closeSearch} className="text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-4">
              <p className="text-xs text-[#8A8A8A] mb-3 uppercase tracking-wider font-medium">
                Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Cast Iron", "Cutting Board", "Glass Storage", "Stainless Steel"].map((term) => (
                  <Link
                    key={term}
                    href={`/shop?q=${encodeURIComponent(term)}`}
                    onClick={closeSearch}
                    className="text-xs px-3 py-1.5 border border-[#E8E8E8] rounded-full text-[#1A1A1A] hover:border-[#C4956A] hover:text-[#C4956A] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
