import type { Line } from '@/lib/hexagram/hexagramTypes'

const SYMBOLS: Record<number, string> = {
  6: '━━x━━',
  7: '━━━━━',
  8: '━━ ━━',
  9: '━━o━━',
}

export function buildSafeLines(lines?: Line[], hexagramRaw?: string): Line[] {
  if (lines?.length === 6) return lines // ReadingDisplay usa as linhas e os tosses
  if (!hexagramRaw) return [] //

  // ArchiveReadingItem cria linhas com sum + symbol (tosses ficam vazios)
  return hexagramRaw.split('').map((v) => {
    const sum = Number(v)
    return {
      tosses: [],
      sum,
      symbol: SYMBOLS[sum] ?? '?',
    }
  })
}

// lib/readings/readingUtils.ts
export function isMovingLine(sum: number): boolean {
  return sum === 6 || sum === 9
}
