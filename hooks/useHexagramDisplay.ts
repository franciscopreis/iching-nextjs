'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useHexagramSaver } from './useHexagramSaver'
import { mapHexagramRow } from '@/lib/mappers/mapHexagramRow'
import type { BinaryMatchHexagramRawOutput } from '@/lib/hexagram/hexagramTypes'
import {
  simulateCoinToss,
  generateBinary,
} from '@/lib/divinationMethods/coinMethodLogic/client'
import { getLineSymbol } from '@/lib/divinationMethods/coinMethodLogic/getLineSymbol'
import { useReading } from '@/context/ReadingContext'

/**
 * Hook responsável por gerir a geração e exibição de hexagramas
 * - Gera linhas (lançamento de moedas)
 * - Obtém hexagramas correspondentes via API
 * - Atualiza contexto de leitura
 * - Permite guardar leituras
 */
export function useHexagramDisplay() {
  const {
    question,
    setQuestion,
    notes,
    setNotes,
    lines,
    setLines,
    hexagrams,
    setHexagrams,
    clearReading,
  } = useReading()

  const [error, setError] = useState<string | null>(null)
  const { handleSave } = useHexagramSaver({ hexagrams, question, notes })

  const generateLine = () => {
    const tosses = [simulateCoinToss(), simulateCoinToss(), simulateCoinToss()]
    const sum = tosses.reduce((a, b) => a + b, 0)
    const symbol = getLineSymbol(sum)
    return { tosses, sum, symbol }
  }

  const generateHexagramLines = () =>
    Array.from({ length: 6 }, () => generateLine())

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast.error('Escreve a pergunta antes de lançar o I Ching.')
      return
    }

    try {
      const rawLines = generateHexagramLines()
      setLines(rawLines)

      const sums = rawLines.map((l) => l.sum)
      const binaryMatch = generateBinary(sums)
      const hexagramRaw = sums.join('')

      const res = await fetch('/api/hexagram/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(binaryMatch),
      })

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
      const data = await res.json()
      if (!data.success) throw new Error('Hexagrama não encontrado')

      const parsedHexagrams: BinaryMatchHexagramRawOutput = {
        match1: mapHexagramRow(data.data.match1),
        match2: mapHexagramRow(data.data.match2),
        hexagramRaw,
      }

      setHexagrams(parsedHexagrams)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
      toast.error(message)
    }
  }

  return {
    question,
    setQuestion,
    notes,
    setNotes,
    lines,
    hexagrams,
    error,
    handleGenerate,
    handleSave,
    clearReading,
  }
}
