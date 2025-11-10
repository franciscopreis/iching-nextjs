import type { Line } from '@/lib/hexagram/hexagramTypes'
import { isMovingLine } from '@/lib/readings/readingUtils'

// Hexagrama como soma das linhas
export function SymbolBlock({ lines }: { lines: Line[] }) {
  return (
    <div className="flex flex-col justify-center items-center p-2 font-mono w-fit text-center">
      {[...lines].reverse().map((line, idx) => (
        <div
          key={idx}
          className={isMovingLine(line.sum) ? 'text-yellow-600' : ''}
        >
          {line.symbol}
        </div>
      ))}
    </div>
  )
}
