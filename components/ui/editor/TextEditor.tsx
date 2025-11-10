'use client'

import { useRef, useEffect } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  maxHeight?: number // altura máxima
}

export default function TextEditor({
  value,
  onChange,
  placeholder,
  maxLength = 8000,
  maxHeight = 400,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Função para ajustar altura
  const adjustHeight = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto' // reset
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px'
  }

  // Ajusta altura ao montar e sempre que o value muda
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
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value)
          }
        }}
        placeholder={placeholder ?? 'Escreve as tuas notas…'}
        className="w-full py-2 px-3 border rounded-md placeholder-gray-400 resize-y overflow-hidden"
      />
      <div className="mt-1 pr-1.5 text-sm text-gray-500 text-right">
        {value.length} / {maxLength}
      </div>
    </div>
  )
}
