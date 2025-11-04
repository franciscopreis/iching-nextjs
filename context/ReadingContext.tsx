// context/ReadingContext.tsx
'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import type {
  Line,
  BinaryMatchHexagramRawOutput,
} from '@/lib/hexagram/hexagramTypes'

interface ReadingContextType {
  question: string
  setQuestion: (question: string) => void
  notes: string
  setNotes: (notes: string) => void
  lines: Line[] | null
  setLines: (lines: Line[] | null) => void
  hexagrams: BinaryMatchHexagramRawOutput | null
  setHexagrams: (hexagrams: BinaryMatchHexagramRawOutput | null) => void
  clearReading: () => void
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined)

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<Line[] | null>(null)
  const [hexagrams, setHexagrams] =
    useState<BinaryMatchHexagramRawOutput | null>(null)

  // Hydratar do localStorage no mount
  useEffect(() => {
    const guestReading = localStorage.getItem('guestReading')
    if (guestReading) {
      try {
        const data = JSON.parse(guestReading)
        setQuestion(data.question || '')
        setNotes(data.notes || '')
        setLines(data.lines || null)
        setHexagrams(data.hexagrams || null)
      } catch (err) {
        console.error('Erro ao recuperar leitura:', err)
      }
    }
  }, [])

  // Persistir automaticamente
  useEffect(() => {
    if (hexagrams || question.trim() || notes.trim()) {
      const readingData = { question, notes, lines, hexagrams }
      localStorage.setItem('guestReading', JSON.stringify(readingData))
    }
  }, [hexagrams, question, notes, lines])

  const clearReading = () => {
    setQuestion('')
    setNotes('')
    setLines(null)
    setHexagrams(null)
    localStorage.removeItem('guestReading')
  }

  return (
    <ReadingContext.Provider
      value={{
        question,
        setQuestion,
        notes,
        setNotes,
        lines,
        setLines,
        hexagrams,
        setHexagrams,
        clearReading,
      }}
    >
      {children}
    </ReadingContext.Provider>
  )
}

export const useReading = () => {
  const context = useContext(ReadingContext)
  if (context === undefined) {
    throw new Error('useReading must be used within a ReadingProvider')
  }
  return context
}
