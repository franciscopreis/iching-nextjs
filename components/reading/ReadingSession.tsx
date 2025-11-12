'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import ModeSelector from './ModeSelector'
import HexagramGrid from '../hexagram/HexagramGrid'
import ReadingLogs from './readingLogs/ReadingLogs'
import { useState } from 'react'
import type {
  ReadingSessionProps,
  HexagramsType,
  LineType,
} from '@/lib/readings/readingsTypes'

const ReadingNotes = dynamic(() => import('./ReadingNotes'), {
  ssr: false,
})

// ReadingSession é o componente funcional associado a leituras (novas ou de arquivo) e gere:
// - ReadingLogs
// - ModeSelector
// - HexagramGrid
// - ReadingNotes

export default function ReadingSession({
  reading,
  hexagrams,
  lines,
  notes,
  setNotes,
  onSave,
  layout: initialLayout = 'horizontal',
  isEditing = false,
  showModeSelector = true,
}: ReadingSessionProps) {
  const [layout, setLayout] = useState<'stacked' | 'horizontal' | 'vertical'>(
    initialLayout
  )
  const isVertical = layout === 'vertical'

  // Criamos o objeto HexagramsType a partir do reading ou do prop hexagrams
  const displayHexagrams: HexagramsType | undefined =
    hexagrams ||
    (reading?.originalHexagram && reading?.mutantHexagram
      ? {
          match1: reading.originalHexagram,
          match2: reading.mutantHexagram,
          hexagramRaw: reading.hexagramRaw ?? '',
        }
      : undefined)

  // Linhas são usadas apenas se existem (ReadingDisplay), senão usamos hexagramRaw (Archive)
  const displayLines: LineType[] | undefined = lines ?? reading?.lines
  const displayHexRaw: string = displayHexagrams?.hexagramRaw ?? ''

  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      {(displayLines || displayHexRaw) && (
        <ReadingLogs lines={displayLines} hexagramRaw={displayHexRaw} />
      )}

      {showModeSelector && displayHexagrams && (
        <ModeSelector
          value={layout}
          options={['stacked', 'horizontal', 'vertical']}
          onChange={setLayout}
        />
      )}

      <div
        className={clsx('flex flex-col gap-6', { 'md:flex-row': isVertical })}
      >
        <div className="flex-1 min-w-[50%] w-full transition-all duration-300 lg:max-h-[80vh] overflow-auto">
          {displayHexagrams && (
            <HexagramGrid
              hexagrams={displayHexagrams}
              layout={layout}
              notes={notes}
              setNotes={setNotes}
              onSave={onSave ?? (() => {})}
            />
          )}
        </div>

        <div className="flex-1 w-full transition-all duration-300 lg:max-h-[80vh] overflow-auto flex flex-col gap-2">
          <ReadingNotes
            notes={notes}
            setNotes={setNotes}
            layout={layout}
            isEditing={isEditing}
            onSave={onSave ?? (() => {})}
          />
        </div>
      </div>
    </div>
  )
}
