'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface RaceDayContextValue {
  /** Whether Race Day mode (high-energy state) is active */
  isRaceDay: boolean
  /** Toggle Race Day mode on / off */
  toggleRaceDay: () => void
  /** Enable Race Day mode explicitly */
  enableRaceDay: () => void
  /** Disable Race Day mode explicitly */
  disableRaceDay: () => void
}

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */

const RaceDayContext = createContext<RaceDayContextValue | null>(null)

/* ─────────────────────────────────────────────
   Provider
───────────────────────────────────────────── */

interface RaceDayProviderProps {
  children: React.ReactNode
  /** Initial state — defaults to false */
  defaultActive?: boolean
}

export function RaceDayProvider({
  children,
  defaultActive = false,
}: RaceDayProviderProps) {
  const [isRaceDay, setIsRaceDay] = useState<boolean>(defaultActive)

  const toggleRaceDay = useCallback(() => {
    setIsRaceDay((prev) => !prev)
  }, [])

  const enableRaceDay = useCallback(() => {
    setIsRaceDay(true)
  }, [])

  const disableRaceDay = useCallback(() => {
    setIsRaceDay(false)
  }, [])

  const value: RaceDayContextValue = {
    isRaceDay,
    toggleRaceDay,
    enableRaceDay,
    disableRaceDay,
  }

  return (
    <RaceDayContext.Provider value={value}>
      {children}
    </RaceDayContext.Provider>
  )
}

/* ─────────────────────────────────────────────
   Hook
───────────────────────────────────────────── */

export function useRaceDay(): RaceDayContextValue {
  const context = useContext(RaceDayContext)
  if (!context) {
    throw new Error('useRaceDay must be used within a RaceDayProvider')
  }
  return context
}
