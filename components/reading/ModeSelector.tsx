'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

type ModeSelectorProps<T extends string> = {
  value: T
  options: T[]
  onChange: (value: T) => void
}

// Modo que controla o layout:
// - esconde em sm e md
// - força stacked em telas < lg

export default function ModeSelector<T extends string>({
  value,
  options,
  onChange,
}: ModeSelectorProps<T>) {
  const [internalValue, setInternalValue] = useState(value)

  // Sincroniza valor do pai
  useEffect(() => {
    setInternalValue(value)
  }, [value])

  // Força stacked abaixo de lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && internalValue !== 'stacked') {
        setInternalValue('stacked' as T)
        onChange('stacked' as T)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [internalValue, onChange])

  return (
    <div className="hidden lg:flex justify-center gap-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => {
            setInternalValue(opt)
            onChange(opt)
          }}
          className={clsx(
            'px-3 py-1 rounded-md border transition-colors',
            'dark:hover:bg-amber-500 hover:bg-amber-500',
            internalValue === opt
              ? ' dark:bg-white border dark:border-black dark:text-black bg-black border-white text-white'
              : ''
          )}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  )
}
