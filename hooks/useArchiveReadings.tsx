'use client'

import { useEffect, useState } from 'react'
import type { ReadingView } from '@/lib/readings/readingsTypes'
import { useAuth } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

/**
 * Hook para gestão de leituras do arquivo
 * - GET /api/readings
 * - DELETE /api/readings/[id]
 */
export function useArchiveReadings() {
  const { isAuthenticated, loading: authLoading } = useAuth()

  // Estado das leituras e loading
  const [readings, setReadings] = useState<ReadingView[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return // Espera autenticação
    if (!isAuthenticated) {
      setReadings([]) // Limpa leituras se não estiver autenticado
      setLoading(false)
      return
    }

    let isMounted = true // Para evitar setState após unmount

    const fetchReadings = async () => {
      try {
        const res = await fetch('/api/readings', { credentials: 'include' })
        if (!res.ok) throw new Error('Falha ao buscar leituras')

        // Removida redundância: antes havia try/catch extra para res.json()
        const json = await res.json()
        const arr: ReadingView[] = json.data || []

        if (!isMounted) return

        // Filtra leituras válidas e ordena por data decrescente
        setReadings(
          arr
            .filter((r) => r.id) // Filtra leituras inválidas
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
            )
        )
      } catch {
        if (isMounted) setReadings([]) // Em caso de erro, limpa estado
      } finally {
        if (isMounted) setLoading(false) // Garante fim do loading
      }
    }

    fetchReadings()

    return () => {
      isMounted = false // Cleanup
    }
  }, [isAuthenticated, authLoading])

  // Apaga leitura localmente
  const deleteReading = (id: number) => {
    setReadings((prev) => prev.filter((r) => r.id !== id))
  }

  // Apaga leitura com confirmação
  const deleteReadingWithConfirm = async (
    id: number,
    onDelete?: (id: number) => void
  ) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Tens a certeza?',
      text: 'Quer mesmo apagar esta leitura? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
    })

    if (!isConfirmed) return

    const res = await fetch(`/api/readings/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Leitura apagada com sucesso!')
      deleteReading(id)
      onDelete?.(id)
    } else {
      toast.error('Erro ao apagar leitura.')
    }
  }

  return { readings, loading, deleteReading, deleteReadingWithConfirm }
}
