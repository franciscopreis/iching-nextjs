import type { Line } from '@/lib/hexagram/hexagramTypes'
import { isMovingLine } from '@/lib/readings/readingUtils'

// Linhas individuais
export function LineBlock({ lines }: { lines: Line[] }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-2 lg:mt-5 font-mono text-xs text-center mb-5 w-fit">
      {[...lines].reverse().map((line, idx) => (
        <div
          key={idx}
          className={isMovingLine(line.sum) ? 'text-yellow-600' : ''}
        >
          Linha {lines.length - idx}:{' '}
          {line.tosses.length ? `${line.tosses.join(' + ')} = ` : ''}
          {line.sum}
        </div>
      ))}
    </div>
  )
}
