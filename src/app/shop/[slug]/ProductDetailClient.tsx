"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  Check,
  Package,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Breadcrumb */}
      <div className="pt-20 bg-[#FAFAF7] border-b border-[#E8E8E8]">
        <div className="container-premium py-3">
          <nav className="flex items-center gap-2 text-xs text-[#8A8A8A]">
            <Link href="/" className="hover:text-[#C4956A] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-[#C4956A] transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A1A]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product */}
      <div className="container-premium py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main image */}
            <div
              className={cn(
                "aspect-square rounded-2xl overflow-hidden relative shadow-lg",
                product.imageClass
              )}
            >
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded bg-[#1A1A1A] text-[#FAFAF7] shadow">
                    {product.badge}
                  </span>
                </div>
              )}
              {/* Material label overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-3">
                <p className="text-xs text-[#8A8A8A] font-medium uppercase tracking-wider">Material</p>
                <p className="text-sm font-bold text-[#1A1A1A]">{product.material}</p>
              </div>
            </div>

            {/* Thumbnail row (visual placeholder) */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                    i === 0 ? "border-[#C4956A]" : "border-transparent hover:border-[#C4956A]/40",
                    product.imageClass
                  )}
                  style={{ opacity: i === 0 ? 1 : 0.7 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <p className="text-xs text-[#C4956A] uppercase tracking-[0.2em] font-semibold mb-2">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-[#C4956A] text-[#C4956A]"
                        : "text-[#D0D0D0]"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-[#1A1A1A] font-medium">{product.rating}</span>
              <span className="text-sm text-[#8A8A8A]">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-5">
              <span className="text-3xl font-bold text-[#1A1A1A]">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#8A8A8A] line-through mb-0.5">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm text-[#8FAF8A] font-semibold mb-0.5">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-[#4A4A4A] leading-relaxed mb-6">{product.description}</p>

            <div className="separator mb-6" style={{ margin: "0 0 1.5rem 0" }} />

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                    <Check className="w-4 h-4 text-[#8FAF8A] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dimensions & Care */}
            {(product.dimensions || product.care) && (
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-[#F0EDE8]">
                {product.dimensions && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#8A8A8A] font-medium mb-1">
                      Dimensions
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-medium">{product.dimensions}</p>
                  </div>
                )}
                {product.care && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#8A8A8A] font-medium mb-1">
                      Care
                    </p>
                    <p className="text-sm text-[#1A1A1A]">{product.care}</p>
                  </div>
                )}
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Qty selector */}
              <div className="flex items-center border border-[#E8E8E8] rounded h-12 w-28 shrink-0">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center hover:bg-[#F0EDE8] transition-colors rounded-l text-[#1A1A1A]"
                >
                  −
                </button>
                <span className="flex-1 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-full flex items-center justify-center hover:bg-[#F0EDE8] transition-colors rounded-r text-[#1A1A1A]"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 h-12 rounded flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 active:scale-[0.99]",
                  addedToCart
                    ? "bg-[#8FAF8A] text-white"
                    : "bg-[#1A1A1A] text-[#FAFAF7] hover:bg-[#2D2D2D]"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "h-12 w-12 rounded border flex items-center justify-center transition-all shrink-0",
                  inWishlist
                    ? "bg-[#C4956A] border-[#C4956A] text-white"
                    : "border-[#E8E8E8] text-[#8A8A8A] hover:border-[#C4956A] hover:text-[#C4956A]"
                )}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: "Free shipping over $75" },
                { icon: RotateCcw, text: "60-day returns" },
                { icon: Shield, text: "Lifetime warranty" },
                { icon: Package, text: "Plastic-free packaging" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-[#8A8A8A]">
                  <Icon className="w-3.5 h-3.5 text-[#C4956A] shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Long description */}
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">About This Product</h2>
          <p className="text-[#4A4A4A] leading-relaxed">{product.longDescription}</p>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="bg-[#F0EDE8] py-16">
          <div className="container-premium">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">You May Also Like</h2>
              <Link
                href="/shop"
                className="text-sm text-[#C4956A] hover:text-[#A47850] font-medium transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
