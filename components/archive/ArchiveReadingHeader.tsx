import { Trash, Minus, Plus, Edit2 } from 'lucide-react'
import type { ReadingHeaderProps } from '@/lib/readings/readingsTypes'

/**
 * Cabeçalho da leitura no arquivo:
 * - Informação com pergunta, data e hexagramas
 * - Botões para editar notas, apagar leitura e expandir/colapsar
 */

export default function ArchiveReadingHeader({
  question,
  date,
  originalHexagram,
  mutantHexagram,
  hexagramRaw,
  isOpen,
  isEditing,
  onEdit,
  onDelete,
  onToggle,
}: ReadingHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-left">
        <div className="font-semibold text-sm lg:text-base">{question}</div>
        <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          {date} • {hexagramRaw} • {originalHexagram} {mutantHexagram}
        </div>
      </div>
      <div className="ml-4 flex gap-2 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          title="Apagar leitura"
          className="cursor-pointer hover:text-red-500"
        >
          <Trash size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
          title="Editar notas"
          className={`cursor-pointer ${
            isEditing ? 'text-amber-500' : 'hover:text-amber-500'
          }`}
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onToggle}
          className="cursor-pointer hover:text-amber-500"
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </button>
      </div>
    </div>
  )
}
