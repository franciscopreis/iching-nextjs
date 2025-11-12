'use client'

import { useRef, useEffect } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  minHeight?: number // altura mínima
  maxHeight?: number // altura máxima
  isEditing?: boolean
}

// Componente de editor de texto com ajuste automático de altura
export default function TextEditor({
  value,
  onChange,
  placeholder,
  maxLength = 8000,
  minHeight = 100,
  maxHeight = 300,
  isEditing = true,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Função para ajustar a altura do textarea
  const adjustHeight = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto' // reset
    const newHeight = Math.min(Math.max(ta.scrollHeight, minHeight), maxHeight)
    ta.style.height = newHeight + 'px'
  }

  // Ajusta a altura quando o valor muda
  useEffect(() => {
    adjustHeight()
  }, [value])

  return (
    <div className="w-full flex flex-col">
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          if (!isEditing) return
          onChange(e.target.value)
        }}
        placeholder={placeholder ?? 'Escreve as tuas notas…'}
        disabled={!isEditing}
        className="w-full py-2 px-3 border rounded-md placeholder-gray-400 resize-none overflow-hidden
                   disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: minHeight, maxHeight: maxHeight }}
      />
      <div className="mt-1 pr-1.5 text-sm text-gray-500 text-right">
        {value.length} / {maxLength}
      </div>
    </div>
  )
}
