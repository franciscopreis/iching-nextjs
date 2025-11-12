'use client'

import { useState, forwardRef } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import ArchiveReadingHeader from './ArchiveReadingHeader'
import ReadingSession from '../reading/ReadingSession'
import { useReadingNotes } from '@/hooks/useReadingNotes'
import { useArchiveReadings } from '@/hooks/useArchiveReadings'
import type { ReadingItemProps, LayoutMode } from '@/lib/readings/readingsTypes'

/**
 * Item de leitura do arquivo, contém:
 * - ArchiveReadingHeader
 * - ReadingSession
 */

const ArchiveReadingItem = forwardRef<HTMLDivElement, ReadingItemProps>(
  ({ reading, onDelete, isOpen, onToggle }, ref) => {
    const { notes, setNotes, isEditing, setIsEditing, saveNotes } =
      useReadingNotes(reading.id, reading.notes ?? '', isOpen)

    const { deleteReadingWithConfirm } = useArchiveReadings()

    const [layout, setLayout] = useState<LayoutMode>('horizontal')

    const date = reading.createdAt
      ? new Date(reading.createdAt).toLocaleString()
      : ''

    const [showDiscardModal, setShowDiscardModal] = useState(false)

    const handleEditClick = () => {
      if (isEditing) {
        if (notes !== (reading.notes ?? '')) {
          setShowDiscardModal(true)
        } else {
          setIsEditing(false)
        }
      } else {
        setIsEditing(true)
      }
    }

    return (
      <div ref={ref}>
        <AccordionItem
          title={
            <ArchiveReadingHeader
              question={reading.question}
              date={date}
              originalHexagram={reading.originalHexagram?.unicode ?? ''}
              mutantHexagram={reading.mutantHexagram?.unicode ?? ''}
              hexagramRaw={reading.hexagramRaw ?? ''}
              isOpen={isOpen}
              isEditing={isEditing}
              onToggle={onToggle}
              onEdit={handleEditClick}
              onDelete={() => deleteReadingWithConfirm(reading.id, onDelete)}
            />
          }
          isOpen={isOpen}
          onToggle={onToggle}
        >
          <ReadingSession
            reading={reading}
            notes={notes}
            setNotes={setNotes}
            isEditing={isEditing}
            onSave={saveNotes}
            showModeSelector={true}
            showInput={false}
            layout={layout}
          />
        </AccordionItem>

        {showDiscardModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Descartar alterações?
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                Tens alterações que não foram gravadas. Tens a certeza que
                queres descartar estas alterações?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowDiscardModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    setIsEditing(false)
                    setNotes(reading.notes ?? '')
                    setShowDiscardModal(false)
                  }}
                >
                  Descartar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

export default ArchiveReadingItem
