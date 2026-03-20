'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Machine, Alarm } from '@/lib/constants'
import {
  generateMachineData,
  getMachineData,
  getAlarms,
  acknowledgeAlarm as ackAlarm,
  acknowledgeAllAlarms as ackAll,
  updateTrendHistory,
} from '@/lib/supabase'

export interface HMIState {
  machines: Machine[]
  alarms: Alarm[]
  isRunning: boolean
  tick: number
}

export function useHMIData(intervalMs = 2000) {
  const [state, setState] = useState<HMIState>({
    machines: getMachineData(),
    alarms: getAlarms(),
    isRunning: true,
    tick: 0,
  })

  useEffect(() => {
    // Initial generation
    const initial = generateMachineData()
    updateTrendHistory(initial)
    setState(s => ({ ...s, machines: initial, alarms: getAlarms() }))

    const interval = setInterval(() => {
      const newMachines = generateMachineData()
      updateTrendHistory(newMachines)
      setState(s => ({
        ...s,
        machines: newMachines,
        alarms: getAlarms(),
        tick: s.tick + 1,
      }))
    }, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs])

  const acknowledgeAlarm = useCallback((id: string) => {
    ackAlarm(id)
    setState(s => ({ ...s, alarms: getAlarms() }))
  }, [])

  const acknowledgeAll = useCallback(() => {
    ackAll()
    setState(s => ({ ...s, alarms: getAlarms() }))
  }, [])

  return { ...state, acknowledgeAlarm, acknowledgeAll }
}
