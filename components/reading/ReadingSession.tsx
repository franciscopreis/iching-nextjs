'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import ModeSelector from './ModeSelector'
import HexagramGrid from '../hexagram/HexagramGrid'
import ReadingLogs from './readingLogs/ReadingLogs'
import ReadingInput from './ReadingInput'
import type { ReadingType } from '@/lib/readings/readingsTypes'
import type { HexagramObject } from '@/lib/hexagram/hexagramTypes'
import { useState } from 'react'

const ReadingNotes = dynamic(() => import('../archive/ReadingNotes'), {
  ssr: false,
})

export type HexagramsType = {
  match1: HexagramObject
  match2: HexagramObject
  hexagramRaw: string
}

export type LineType = any

export type ReadingSessionProps = {
  reading?: ReadingType
  question?: string
  hexagrams?: HexagramsType
  lines?: LineType[] | null
  notes: string
  setNotes: (value: string) => void
  onSave?: () => void
  layout?: 'stacked' | 'horizontal' | 'vertical'
  isEditing?: boolean
  showInput?: boolean
  isArchive?: boolean
  showModeSelector?: boolean // nova prop
}

export default function ReadingSession({
  reading,
  question,
  hexagrams,
  lines,
  notes,
  setNotes,
  onSave,
  layout: initialLayout = 'horizontal',
  isEditing = false,
  showInput = false,
  isArchive = false,
  showModeSelector = true,
}: ReadingSessionProps) {
  const [layout, setLayout] = useState<'stacked' | 'horizontal' | 'vertical'>(
    initialLayout
  )
  const isVertical = layout === 'vertical'

  const displayHexagrams: HexagramsType | undefined =
    hexagrams ||
    (reading?.hexagrams
      ? reading.hexagrams
      : reading?.originalHexagram && reading?.mutantHexagram
        ? {
            match1: reading.originalHexagram,
            match2: reading.mutantHexagram,
            hexagramRaw: '',
          }
        : undefined)

  const displayLines = lines || reading?.lines
  const displayHexRaw = displayHexagrams?.hexagramRaw || ''

  return (
    <div className="w-full flex flex-col gap-6">
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
            <HexagramGrid hexagrams={displayHexagrams} layout={layout} />
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
