"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAFAF7] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E8]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C4956A]" />
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  Your Cart
                  {cart.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-[#8A8A8A]">
                      ({cart.length} {cart.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1A1A1A]/6 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-[#F0EDE8] flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7 text-[#C4956A]" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-semibold mb-1">Your cart is empty</p>
                    <p className="text-sm text-[#8A8A8A]">
                      Discover our microplastic-free kitchen essentials.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-sm font-medium text-[#C4956A] hover:text-[#A47850] underline underline-offset-2 transition-colors"
                  >
                    Explore the shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 py-4 border-b border-[#E8E8E8] last:border-0"
                      >
                        {/* Product image */}
                        <div
                          className={cn(
                            "w-20 h-20 rounded-lg shrink-0 relative overflow-hidden",
                            item.product.imageClass
                          )}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-sm font-semibold text-[#1A1A1A] hover:text-[#C4956A] transition-colors line-clamp-2 leading-snug"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">{item.product.material}</p>

                          <div className="flex items-center justify-between mt-3">
                            {/* Qty */}
                            <div className="flex items-center gap-2 border border-[#E8E8E8] rounded h-7">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="w-7 h-full flex items-center justify-center hover:bg-[#F0EDE8] transition-colors rounded-l"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-medium w-5 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="w-7 h-full flex items-center justify-center hover:bg-[#F0EDE8] transition-colors rounded-r"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price + delete */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[#1A1A1A]">
                                ${(item.product.price * item.quantity).toFixed(0)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-[#8A8A8A] hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E8E8E8] space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#8A8A8A]">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#8A8A8A]">
                    <span>Shipping</span>
                    <span className="text-[#8FAF8A] font-medium">
                      {cartTotal >= 75 ? "Free" : "$9"}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#1A1A1A] pt-2 border-t border-[#E8E8E8]">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal >= 75 ? 0 : 9)).toFixed(0)}</span>
                  </div>
                </div>

                {cartTotal < 75 && (
                  <p className="text-xs text-[#8A8A8A] text-center">
                    Add ${(75 - cartTotal).toFixed(0)} more for{" "}
                    <span className="text-[#8FAF8A] font-medium">free shipping</span>
                  </p>
                )}

                {/* CTA */}
                <button className="w-full h-12 bg-[#1A1A1A] text-[#FAFAF7] rounded flex items-center justify-center gap-2 font-medium text-sm hover:bg-[#2D2D2D] transition-colors active:scale-[0.99]">
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={closeCart}
                  className="w-full text-sm text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors text-center"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
