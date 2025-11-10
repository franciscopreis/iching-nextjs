'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import type { BinaryMatchHexagramRawOutput } from '@/lib/hexagram/hexagramTypes'
import { getCurrentUser } from '@/lib/auth/session'

interface UseHexagramSaverProps {
  hexagrams: BinaryMatchHexagramRawOutput | null
  question: string
  notes: string
}

export function useHexagramSaver({
  hexagrams,
  question,
  notes,
}: UseHexagramSaverProps) {
  const router = useRouter()

  const handleSave = async (readingData?: any, clearCallback?: () => void) => {
    if (!hexagrams?.match1 || !hexagrams?.match2) {
      toast.error('Hexagramas incompletos')
      return
    }

    const user = await getCurrentUser()

    // Guest: salva localmente
    if (!user?.id) {
      if (readingData && clearCallback) clearCallback()
      localStorage.setItem(
        'guestReading',
        JSON.stringify(
          readingData ?? {
            question,
            notes,
            originalBinary: hexagrams.match1.binary,
            mutantBinary: hexagrams.match2.binary,
            hexagramRaw: hexagrams.hexagramRaw,
          }
        )
      )
      toast.warning(
        'A leitura foi guardada localmente. Para guardá-la no dashboard, inicia sessão ou regista-te.'
      )
      return
    }

    // User autenticado: grava na DB
    try {
      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          question,
          notes,
          originalBinary: hexagrams.match1.binary,
          mutantBinary: hexagrams.match2.binary,
          hexagramRaw: hexagrams.hexagramRaw,
        }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.error || `Erro HTTP ${response.status}`)
      }

      toast.success('Leitura guardada com sucesso!')
      if (clearCallback) clearCallback()
      router.push('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      toast.error('Erro ao guardar leitura: ' + message)
      console.error('Erro ao guardar leitura:', err)
    }
  }

  return { handleSave }
}
