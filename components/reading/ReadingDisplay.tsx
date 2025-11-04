'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import ReadingInput from './ReadingInput'
import ModeSelector from '@/components/reading/ModeSelector'
import HexagramDisplay from '../hexagram/HexagramDisplay'
import ReadingLogs from './ReadingLogs'

type ReadingDisplayProps = {
  isGuest?: boolean
}

export default function ReadingDisplay({
  isGuest = false,
}: ReadingDisplayProps) {
  const router = useRouter()
  const {
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
  } = useHexagramDisplay()

  const [userMode, setUserMode] = useState<
    'stacked' | 'horizontal' | 'vertical'
  >('horizontal')
  const [isGenerating, setIsGenerating] = useState(false)

  const onGenerate = async () => {
    if (hexagrams && question.trim() !== '') {
      const confirm = await Swal.fire({
        title: 'Tens a certeza?',
        text: 'Isto vai substituir a leitura atual.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, continuar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#4b5563',
        cancelButtonColor: '#dc2626',
      })

      if (!confirm.isConfirmed) return
    }

    setIsGenerating(true)
    try {
      await handleGenerate()
    } finally {
      setIsGenerating(false)
    }
  }

  const onGuestSave = () => {
    if (!hexagrams || !question.trim()) {
      Swal.fire({
        title: 'Sem leitura',
        text: 'Não há leitura para guardar.',
        icon: 'warning',
        confirmButtonColor: '#4b5563',
      })
      return
    }

    Swal.fire({
      title: 'Leitura guardada!',
      text: 'A tua leitura foi guardada localmente.',
      icon: 'success',
      confirmButtonColor: '#4b5563',
    })

    clearReading()
  }

  const handleSaveAndClear = async () => {
    await handleSave(clearReading)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4">
      <ReadingInput
        isGenerating={isGenerating}
        question={question}
        setQuestion={setQuestion}
        onGenerate={onGenerate}
        error={error ?? undefined}
      />

      <div>
        {hexagrams && (
          <ReadingLogs
            lines={lines ?? undefined}
            hexagramRaw={hexagrams?.hexagramRaw}
          />
        )}
      </div>

      {hexagrams && (
        <ModeSelector userMode={userMode} setUserMode={setUserMode} />
      )}

      {hexagrams && (
        <HexagramDisplay
          hexagrams={hexagrams}
          notes={notes}
          setNotes={setNotes}
          onSave={isGuest ? onGuestSave : handleSaveAndClear}
          layout={userMode}
        />
      )}
    </div>
  )
}
