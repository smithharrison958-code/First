'use client'

import { useEffect } from 'react'
import { useRaceDay } from '@/lib/context'

export default function RaceDayEffect() {
  const { isRaceDay } = useRaceDay()

  useEffect(() => {
    if (isRaceDay) {
      document.documentElement.classList.add('race-day')
    } else {
      document.documentElement.classList.remove('race-day')
    }
  }, [isRaceDay])

  return null
}
