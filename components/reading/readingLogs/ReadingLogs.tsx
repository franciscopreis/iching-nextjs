'use client'

import { useMemo, useState } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import { LineBlock } from './LineBlock'
import { SymbolBlock } from './SymbolBlock'
import type { ReadingLogsProps } from '@/lib/readings/readingsTypes'
import { buildSafeLines } from '@/lib/readings/readingUtils'

// Logs de leitura
export default function ReadingLogs({
  lines,
  hexagramRaw,
  title = 'Logs',
}: ReadingLogsProps) {
  const [open, setOpen] = useState(false)

  // Processa as linhas recebidas ou hexagramRaw
  const safeLines = useMemo(
    () => buildSafeLines(lines, hexagramRaw),
    [lines, hexagramRaw]
  )

  // Soma das linhas (equivalente ao hexagramRaw, quando existe)
  const sumsSequence = safeLines.map((l) => l.sum).join('')

  return (
    <AccordionItem title={title} isOpen={open} onToggle={() => setOpen(!open)}>
      <div className="flex lg:flex-row flex-col justify-around items-center w-full space-y-2 lg:space-x-0 mx-auto">
        <div className="flex flex-col justify-center items-center font-mono text-center w-fit">
          <p className="text-base">{sumsSequence}</p>
        </div>

        <LineBlock lines={safeLines} />
        <SymbolBlock lines={safeLines} />
      </div>
    </AccordionItem>
  )
}
