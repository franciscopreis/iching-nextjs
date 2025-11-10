'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import ReadingInput from './ReadingInput'
import ReadingSession from './ReadingSession'

export default function ReadingDisplay({ isGuest = false }) {
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
      })
      return
    }
    handleSave(clearReading)
  }

  const handleSaveAndClear = async () => {
    await handleSave(clearReading)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4">
      {/* Input da questão */}
      <ReadingInput
        isGenerating={isGenerating}
        question={question}
        setQuestion={setQuestion}
        onGenerate={onGenerate}
        error={error ?? undefined}
      />

      {/* Resultado da leitura */}
      {hexagrams && (
        <ReadingSession
          hexagrams={hexagrams}
          lines={lines ?? undefined}
          notes={notes}
          setNotes={setNotes}
          layout="horizontal"
          isEditing={true}
          onSave={isGuest ? onGuestSave : handleSaveAndClear}
        />
      )}
    </div>
  )
}
