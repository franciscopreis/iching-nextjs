'use client'

import dynamic from 'next/dynamic'
import clsx from 'clsx'
import HexagramGrid from './HexagramGrid'
import type { HexagramDisplayProps } from '@/lib/hexagram/hexagramTypes'

// Dynamic import do editor de notas (sem SSR)
const ReadingNotes = dynamic(() => import('../archive/ReadingNotes'), {
  ssr: false,
})

export default function HexagramDisplay({
  hexagrams,
  notes,
  setNotes,
  onSave,
  layout,
}: HexagramDisplayProps) {
  const isVertical = layout === 'vertical'

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className={clsx('flex flex-col gap-6', {
          'md:flex-row': isVertical,
        })}
      >
        {/* Coluna dos hexagramas */}
        <div
          className={clsx(
            'flex-1 min-w-[50%] w-full transition-all duration-300',
            isVertical && 'lg:max-h-[80vh] overflow-auto'
          )}
        >
          <HexagramGrid hexagrams={hexagrams} layout={layout} />
        </div>

        {/* Coluna das notas */}
        <div
          className={clsx(
            'flex-1 w-full transition-all duration-300',
            isVertical && 'md:max-h-[80vh]'
          )}
        >
          <ReadingNotes
            notes={notes}
            setNotes={setNotes}
            layout={layout}
            isEditing
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  )
}
