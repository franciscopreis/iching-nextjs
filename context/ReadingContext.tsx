'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import type {
  Line,
  BinaryMatchHexagramRawOutput,
} from '@/lib/hexagram/hexagramTypes'
import { useAuth } from './AuthContext'
import type { ReadingContextType } from '@/lib/readings/readingsTypes'

const ReadingContext = createContext<ReadingContextType | undefined>(undefined)

export function ReadingProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  const [question, setQuestion] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<Line[] | null>(null)
  const [hexagrams, setHexagrams] =
    useState<BinaryMatchHexagramRawOutput | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Hidratação inicial (apenas para guests)
  useEffect(() => {
    if (loading || isAuthenticated) {
      setHydrated(true)
      return
    }
    try {
      const guestReading = localStorage.getItem('guestReading')
      if (guestReading) {
        const data = JSON.parse(guestReading)
        setQuestion(data.question || '')
        setNotes(data.notes || '')
        setLines(data.lines || null)
        setHexagrams(data.hexagrams || null)
      }
    } catch (err) {
      console.error('Erro ao recuperar leitura:', err)
    } finally {
      setHydrated(true)
    }
  }, [isAuthenticated, loading])

  // Persistência automática (só para guests)
  useEffect(() => {
    if (!hydrated || loading || isAuthenticated) return

    const hasData =
      question.trim() !== '' ||
      notes.trim() !== '' ||
      (lines && lines.length > 0) ||
      !!hexagrams

    if (hasData) {
      try {
        localStorage.setItem(
          'guestReading',
          JSON.stringify({ question, notes, lines, hexagrams })
        )
      } catch (err) {
        console.error('Erro ao gravar leitura no localStorage:', err)
      }
    } else {
      localStorage.removeItem('guestReading')
    }
  }, [hydrated, loading, isAuthenticated, question, notes, lines, hexagrams])

  // Gravação imediata antes de redirect/login
  const saveToLocalStorageNow = useCallback(() => {
    if (isAuthenticated) return // não gravar para user logado
    try {
      const readingData = { question, notes, lines, hexagrams }
      localStorage.setItem('guestReading', JSON.stringify(readingData))
      console.log('[save guestReading ->', readingData)
    } catch (err) {
      console.error('Erro ao gravar leitura no localStorage:', err)
    }
  }, [question, notes, lines, hexagrams, isAuthenticated])

  // Limpa leitura e localStorage
  const clearReading = useCallback(() => {
    setQuestion('')
    setNotes('')
    setLines(null)
    setHexagrams(null)
    localStorage.removeItem('guestReading')
  }, [])

  // Limpa automaticamente ao logar
  useEffect(() => {
    if (isAuthenticated) clearReading()
  }, [isAuthenticated, clearReading])

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
        saveToLocalStorageNow,
      }}
    >
      {children}
    </ReadingContext.Provider>
  )
}

export const useReading = () => {
  const context = useContext(ReadingContext)
  if (!context)
    throw new Error('useReading must be used within a ReadingProvider')
  return context
}
