'use client'

import { useState } from 'react'
import clsx from 'clsx'
import SaveReadingButton from '../reading/SaveReadingButton'
import type { ReadingNotesProps as NotesProps } from '@/lib/readings/readingsTypes'

export default function ReadingNotes({
  notes,
  setNotes,
  isEditing,
  layout,
  onSave,
  isArchive = false,
  maxLength = 8000,
}: NotesProps & { isArchive?: boolean }) {
  const [localNotes, setLocalNotes] = useState(notes)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNotes(e.target.value)
    setNotes(e.target.value)
  }

  const isVertical = layout === 'vertical'

  return (
    <div className={clsx('flex flex-col gap-2', { '': isVertical })}>
      <textarea
        title="Notas"
        className="w-full p-2 border rounded-lg resize-none dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-indigo-400"
        value={localNotes}
        maxLength={maxLength}
        onChange={handleChange}
        disabled={!isEditing}
        rows={10}
      />
      <div className="w-full lg:max-w-3xl text-right text-sm text-gray-500 mt-0.5 pr-1.5">
        {localNotes.length} / {maxLength}
      </div>

      {isEditing && (
        <div className="flex flex-col gap-2 mt-2">
          {!isArchive ? (
            <SaveReadingButton onSave={onSave} />
          ) : (
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={onSave}
            >
              Guardar alterações
            </button>
          )}
        </div>
      )}
    </div>
  )
}
