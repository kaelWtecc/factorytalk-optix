import { type ClassValue, clsx } from 'clsx'
import type { MachineStatus, AlarmSeverity } from './constants'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour12: false })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { hour12: false })
}

export function statusLabel(status: MachineStatus): string {
  const map: Record<MachineStatus, string> = {
    running: 'RODANDO',
    stopped: 'PARADO',
    fault: 'FALHA',
    warning: 'ALERTA',
  }
  return map[status]
}

export function statusClass(status: MachineStatus): string {
  const map: Record<MachineStatus, string> = {
    running: 'status-running',
    stopped: 'status-stopped',
    fault: 'status-fault',
    warning: 'status-warning',
  }
  return map[status]
}

export function ledClass(status: MachineStatus): string {
  const map: Record<MachineStatus, string> = {
    running: 'led-green',
    stopped: 'led-gray',
    fault: 'led-red',
    warning: 'led-orange',
  }
  return map[status]
}

export function severityColor(severity: AlarmSeverity): string {
  const map: Record<AlarmSeverity, string> = {
    critical: 'text-danger',
    warning: 'text-orange',
    info: 'text-cyan',
  }
  return map[severity]
}

export function severityLabel(severity: AlarmSeverity): string {
  const map: Record<AlarmSeverity, string> = {
    critical: 'CRIT',
    warning: 'WARN',
    info: 'INFO',
  }
  return map[severity]
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin)
}

export function formatValue(val: number, decimals = 1, unit = ''): string {
  return `${val.toFixed(decimals)}${unit}`
}
