import { createClient } from '@supabase/supabase-js'
import type { Machine, Alarm, TrendPoint } from './constants'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// ============================================================
// DATA SIMULATION (no Supabase needed)
// ============================================================

const machineConfigs = [
  { id: 'M01', name: 'Enchedor Principal', baseTemp: 72, baseSpeed: 1240, basePressure: 4.2, baseCount: 14820 },
  { id: 'M02', name: 'Capsulador', baseTemp: 68, baseSpeed: 1220, basePressure: 3.8, baseCount: 14780 },
  { id: 'M03', name: 'Rotulador', baseTemp: 65, baseSpeed: 1200, basePressure: 3.5, baseCount: 14750 },
  { id: 'M04', name: 'Paletizador', baseTemp: 60, baseSpeed: 800, basePressure: 2.8, baseCount: 3690 },
]

let simulatedMachines: Machine[] = machineConfigs.map(cfg => ({
  id: cfg.id,
  name: cfg.name,
  status: 'running' as const,
  speed_rpm: cfg.baseSpeed,
  temperature_c: cfg.baseTemp,
  pressure_bar: cfg.basePressure,
  production_count: cfg.baseCount,
  timestamp: new Date().toISOString(),
}))

let simulatedAlarms: Alarm[] = [
  {
    id: 'ALM001',
    machine_id: 'M03',
    alarm_code: 'TEMP_HIGH',
    description: 'Temperatura acima do limite configurado: 85.2°C',
    severity: 'critical',
    acknowledged: false,
    created_at: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'ALM002',
    machine_id: 'M02',
    alarm_code: 'VIB_WARN',
    description: 'Vibração elevada detectada no rolamento #3',
    severity: 'warning',
    acknowledged: false,
    created_at: new Date(Date.now() - 225000).toISOString(),
  },
  {
    id: 'ALM003',
    machine_id: 'M01',
    alarm_code: 'MAINT_DUE',
    description: 'Manutenção preventiva programada em 48h',
    severity: 'info',
    acknowledged: true,
    created_at: new Date(Date.now() - 2700000).toISOString(),
  },
]

let productionCount = 14823
let trendHistory: Record<string, TrendPoint[]> = {
  M01_temp: [],
  M01_speed: [],
  M02_temp: [],
  M03_temp: [],
}

function randomVariation(base: number, pct: number): number {
  const delta = base * (pct / 100)
  return base + (Math.random() * delta * 2) - delta
}

export function generateMachineData(): Machine[] {
  const now = new Date().toISOString()
  productionCount += Math.floor(Math.random() * 5) + 1

  simulatedMachines = machineConfigs.map((cfg, i) => {
    const prev = simulatedMachines[i]
    const isM03 = cfg.id === 'M03'
    const isM02 = cfg.id === 'M02'

    let status: Machine['status'] = 'running'
    let temp = randomVariation(cfg.baseTemp, 2)
    let speed = randomVariation(cfg.baseSpeed, 1.5)
    let pressure = randomVariation(cfg.basePressure, 3)

    // M03 tem comportamento de fault intermitente
    if (isM03) {
      const faultRoll = Math.random()
      if (faultRoll < 0.15) {
        status = 'fault'
        temp = randomVariation(85, 2)
        speed = 0
      } else if (faultRoll < 0.3) {
        status = 'warning'
        temp = randomVariation(78, 3)
      }
    }

    // M02 pode ter warning
    if (isM02 && Math.random() < 0.1) {
      status = 'warning'
    }

    // Suaviza transições
    const smoothTemp = prev ? prev.temperature_c * 0.7 + temp * 0.3 : temp
    const smoothSpeed = prev ? prev.speed_rpm * 0.8 + speed * 0.2 : speed
    const smoothPressure = prev ? prev.pressure_bar * 0.8 + pressure * 0.2 : pressure

    return {
      id: cfg.id,
      name: cfg.name,
      status,
      speed_rpm: Math.round(smoothSpeed * 10) / 10,
      temperature_c: Math.round(smoothTemp * 10) / 10,
      pressure_bar: Math.round(smoothPressure * 100) / 100,
      production_count: productionCount - (machineConfigs.length - 1 - i) * 10,
      timestamp: now,
    }
  })

  // Auto-generate alarms based on thresholds
  simulatedMachines.forEach(m => {
    if (m.status === 'fault' && !simulatedAlarms.find(a => a.machine_id === m.id && a.severity === 'critical' && !a.acknowledged)) {
      const newAlarm: Alarm = {
        id: `ALM${Date.now()}`,
        machine_id: m.id,
        alarm_code: 'TEMP_HIGH',
        description: `Temperatura crítica: ${m.temperature_c.toFixed(1)}°C`,
        severity: 'critical',
        acknowledged: false,
        created_at: now,
      }
      simulatedAlarms = [newAlarm, ...simulatedAlarms].slice(0, 20)
    }
  })

  return simulatedMachines
}

export function getMachineData(): Machine[] {
  return simulatedMachines
}

export function getAlarms(): Alarm[] {
  return simulatedAlarms
}

export function acknowledgeAlarm(alarmId: string): void {
  simulatedAlarms = simulatedAlarms.map(a =>
    a.id === alarmId ? { ...a, acknowledged: true } : a
  )
}

export function acknowledgeAllAlarms(): void {
  simulatedAlarms = simulatedAlarms.map(a => ({ ...a, acknowledged: true }))
}

export function getTrendData(machineId: string, tag: string): TrendPoint[] {
  const key = `${machineId}_${tag}`
  return trendHistory[key] || []
}

export function updateTrendHistory(machines: Machine[]): void {
  const now = new Date().toISOString()
  machines.forEach(m => {
    const keys: Record<string, number> = {
      [`${m.id}_temp`]: m.temperature_c,
      [`${m.id}_speed`]: m.speed_rpm,
      [`${m.id}_pressure`]: m.pressure_bar,
    }
    Object.entries(keys).forEach(([key, value]) => {
      if (!trendHistory[key]) trendHistory[key] = []
      trendHistory[key] = [...trendHistory[key], { timestamp: now, value }].slice(-60)
    })
  })
}
