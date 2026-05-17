'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface SmoothScrollContextValue {
  /** The Lenis instance, or null before mount */
  lenis: Lenis | null
}

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
})

/* ─────────────────────────────────────────────
   Provider
───────────────────────────────────────────── */

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialise Lenis with smooth defaults appropriate for a cinematic site
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // rAF loop — runs Lenis every frame
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      // Cancel the animation frame loop first
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      // Then destroy the Lenis instance to remove all listeners
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

/* ─────────────────────────────────────────────
   Hook
───────────────────────────────────────────── */

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext)
}
