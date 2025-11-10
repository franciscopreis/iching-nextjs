'use client'

import clsx from 'clsx'
import ReadingHexagrams from '../archive/ReadingHexagrams'
import ReadingNotes from '../archive/ReadingNotes'
import ReadingLogs from './readingLogs/ReadingLogs'
import ModeSelector from '../reading/ModeSelector'
import type { ReadingViewProps } from '@/lib/readings/readingsTypes'
import HexagramGrid from '../hexagram/HexagramGrid'

/**
 * Wrapper para exibir leitura da DB
 * Combina:
 * - Hexagramas
 * - Notas editáveis
 * - Logs de leitura
 * - Selector de layout
 *
 * Props:
 * - reading: objeto da leitura
 * - layout: layout atual ('stacked', 'horizontal', 'vertical')
 * - isEditing: modo edição
 * - notes / setNotes: estado das notas
 * - onSaveNotes: função para salvar notas
 * - showLogs: mostrar logs ou não
 * - editable: controlar edição
 */
export default function ReadingView({
  reading,
  layout = 'stacked',
  isEditing = false,
  notes,
  setNotes,
  onSaveNotes,
  showLogs = false,
  editable = true,
}: ReadingViewProps) {
  const shouldShowLogs =
    showLogs || reading.lines?.length === 6 || !!reading.hexagramRaw

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Logs opcionais */}
      {shouldShowLogs && (
        <ReadingLogs lines={reading.lines} hexagramRaw={reading.hexagramRaw} />
      )}

      {/* Conteúdo principal: hexagramas + notas */}
      <div
        className={clsx(
          'w-full flex flex-col gap-6',
          layout === 'vertical' && 'md:flex-row'
        )}
      >
        <div
          className={clsx('w-full', {
            'md:w-1/2 lg:max-h-[1000px] overflow-auto': layout === 'vertical', // ocupa metade no desktop
          })}
        >
          <HexagramGrid
            hexagrams={{
              match1: reading.originalHexagram,
              match2: reading.mutantHexagram,
            }}
            layout={layout}
          />
        </div>

        <div
          className={clsx(
            'w-full',
            layout === 'vertical' && 'md:w-1/2 lg:max-h-200px'
          )}
        >
          <ReadingNotes
            notes={notes}
            setNotes={setNotes}
            isEditing={isEditing}
            layout={layout}
            onSave={onSaveNotes}
          />
        </div>
      </div>
    </div>
  )
}
