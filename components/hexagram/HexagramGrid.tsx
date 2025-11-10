import { HexagramLayoutProps } from '@/lib/hexagram/hexagramTypes'
import HexagramCard from './hexagramCard/HexagramCard'
import clsx from 'clsx'

// Mostra os hexagramas em diferentes layouts
export default function HexagramGrid({
  hexagrams,
  layout,
}: HexagramLayoutProps) {
  const isVertical = layout === 'vertical'
  const isHorizontal = layout === 'horizontal'
  const isStacked = layout === 'stacked'

  // Uso de clsx para aplicar classes CSS de acordo com as condições
  const gridClasses = clsx({
    'w-full grid grid-cols-1 gap-6 px-2': isStacked,
    'flex justify-between gap-6 w-full px-2': isHorizontal,
    'flex-1 grid grid-cols-1 gap-6 px-2': isVertical,
  })

  return (
    <div className={gridClasses}>
      <HexagramCard title="Original" hexagram={hexagrams.match1} />
      <HexagramCard title="Mutante" hexagram={hexagrams.match2} />
    </div>
  )
}
