"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export default function FeaturedProducts() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const featured = getFeaturedProducts();

  return (
    <section ref={ref} className="section-padding bg-[#FAFAF7]">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
                Featured
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
              Our Bestselling
              <br />
              <span className="text-gradient-wood">Essentials</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#C4956A] transition-colors group shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-8 bg-[#1A1A1A] text-[#FAFAF7] rounded text-sm font-semibold hover:bg-[#2D2D2D] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              Shop All 12 Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="separator hidden sm:block w-px h-8 bg-[#E8E8E8]" />
            <p className="text-sm text-[#8A8A8A]">Free shipping over $75</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
