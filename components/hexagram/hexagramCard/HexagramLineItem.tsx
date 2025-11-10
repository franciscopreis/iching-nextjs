import { Plus, Minus } from 'lucide-react'
import type { HexagramLineItemProps } from '@/lib/hexagram/hexagramTypes'

// Mostra linha individual do hexagrama
export function HexagramLineItem({
  idx,
  texts,
  isOpen,
  toggle,
}: HexagramLineItemProps) {
  return (
    <div className="mb-2">
      {/* Header clicável da linha */}
      <div
        className="flex justify-between items-center mb-1 cursor-pointer group"
        onClick={toggle}
      >
        <h4 className="pl-1 font-semibold tracking-wide leading-loose">
          Line {idx + 1}
        </h4>
        <span className="hidden group-hover:inline-flex">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </div>

      {/* Conteúdo da linha */}
      {isOpen && (
        <div className="py-1 border-t space-y-1 text-left tracking-wide leading">
          {texts.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      )}
    </div>
  )
}
