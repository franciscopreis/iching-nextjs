'use client'

import { useState } from 'react'
import clsx from 'clsx'
import SaveReadingButton from './SaveReadingButton'
import TextEditor from '../ui/editor/TextEditor'
import type { ReadingNotesProps as NotesProps } from '@/lib/readings/readingsTypes'

// Componente de notas da leitura
export default function ReadingNotes({
  notes,
  setNotes,
  isEditing,
  layout,
  onSave,
  isArchive = false,
  maxLength = 8000,
}: NotesProps & { isArchive?: boolean }) {
  // Estado local para as notas
  const [localNotes, setLocalNotes] = useState(notes)

  // Função para lidar com mudanças nas notas
  const handleChange = (value: string) => {
    setLocalNotes(value)
    setNotes(value)
  }

  const isVertical = layout === 'vertical'

  return (
    <div className={clsx('flex flex-col gap-2', { '': isVertical })}>
      <TextEditor
        value={localNotes}
        onChange={handleChange}
        maxLength={maxLength}
        maxHeight={300}
        placeholder="Escreve as tuas notas…"
        isEditing={isEditing}
      />

      {isEditing && (
        <div className="flex flex-col gap-2 mt-2">
          {!isArchive && <SaveReadingButton onSave={onSave} />}
        </div>
      )}
    </div>
  )
}
