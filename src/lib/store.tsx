"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { Product } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  isCartOpen: boolean;
  isSearchOpen: boolean;
}

type StoreAction =
  | { type: "ADD_TO_CART"; product: Product; quantity?: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_SEARCH" }
  | { type: "CLOSE_SEARCH" };

// ─── Reducer ──────────────────────────────────────────────────────────────────

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  isCartOpen: false,
  isSearchOpen: false,
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
          isCartOpen: true,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: action.quantity ?? 1 }],
        isCartOpen: true,
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i.product.id !== action.productId),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "TOGGLE_WISHLIST": {
      const inWishlist = state.wishlist.includes(action.productId);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    }

    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };

    case "OPEN_CART":
      return { ...state, isCartOpen: true };

    case "CLOSE_CART":
      return { ...state, isCartOpen: false };

    case "TOGGLE_SEARCH":
      return { ...state, isSearchOpen: !state.isSearchOpen };

    case "CLOSE_SEARCH":
      return { ...state, isSearchOpen: false };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface StoreContextValue extends StoreState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", product, quantity });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: "TOGGLE_WISHLIST", productId });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleSearch = useCallback(() => dispatch({ type: "TOGGLE_SEARCH" }), []);
  const closeSearch = useCallback(() => dispatch({ type: "CLOSE_SEARCH" }), []);

  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCart,
        openCart,
        closeCart,
        toggleSearch,
        closeSearch,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within CartProvider");
  return ctx;
}
