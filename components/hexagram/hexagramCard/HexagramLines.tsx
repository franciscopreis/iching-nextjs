'use client'

import { useState, useMemo } from 'react'
import { Plus, Minus } from 'lucide-react'
import { HexagramLineItem } from './HexagramLineItem'

type HexagramLinesProps = {
  lines: string[][]
}

export default function HexagramLines({ lines }: HexagramLinesProps) {
  const [linesOpen, setLinesOpen] = useState(false)
  const [openLines, setOpenLines] = useState<number[]>([])

  // Cria array com índices das linhas
  const allLines = useMemo(() => lines.map((_, idx) => idx), [lines])

  // Toggle do painel principal de linhas
  const toggleLinesHeader = () => {
    setLinesOpen((prev) => !prev)
    if (!linesOpen) setOpenLines(allLines)
  }

  // Toggle de uma linha individual
  const toggleLine = (idx: number) => {
    setOpenLines((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div>
      {/* Header do painel de linhas */}
      <div className="mb-1 flex justify-between items-center cursor-pointer p-1 px-2 rounded text-sm">
        <h3 className="font-semibold tracking-wide leading-loose">Lines</h3>
        <button
          onClick={toggleLinesHeader}
          className="transition-all hover:text-amber-500"
        >
          {linesOpen ? <Minus /> : <Plus />}
        </button>
      </div>

      {/* Conteúdo expandido */}
      {linesOpen && (
        <div className="text-sm p-1 px-2">
          {lines.map((lineArr, idx) => (
            <HexagramLineItem
              key={idx}
              idx={idx}
              texts={lineArr}
              isOpen={openLines.includes(idx)}
              toggle={() => toggleLine(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
