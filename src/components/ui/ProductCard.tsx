"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [addedToCart, setAddedToCart] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
          <div
            className={cn(
              "w-full h-full transition-transform duration-500 group-hover:scale-105",
              product.imageClass
            )}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#1A1A1A] text-[#FAFAF7]">
                {product.badge}
              </span>
            </div>
          )}

          {/* Sale badge */}
          {product.originalPrice && (
            <div className="absolute top-3 right-10 z-10">
              <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#C4956A] text-white">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm",
                inWishlist
                  ? "bg-[#C4956A] text-white"
                  : "bg-white/90 text-[#1A1A1A] hover:bg-[#C4956A] hover:text-white"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-3.5 h-3.5", inWishlist && "fill-current")} />
            </button>
            <Link
              href={`/shop/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-white/90 text-[#1A1A1A] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 shadow-sm"
              aria-label="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Add to cart button — slides up */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-full py-2.5 rounded flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 shadow-md",
                addedToCart
                  ? "bg-[#8FAF8A] text-white"
                  : "bg-[#1A1A1A] text-[#FAFAF7] hover:bg-[#2D2D2D]"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <p className="text-xs text-[#8A8A8A] uppercase tracking-wider font-medium">
            {product.category}
          </p>

          <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#C4956A] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-[#C4956A] text-[#C4956A]"
                      : i < product.rating
                      ? "fill-[#C4956A]/50 text-[#C4956A]"
                      : "text-[#D0D0D0]"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-[#8A8A8A]">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-base font-bold text-[#1A1A1A]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#8A8A8A] line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
