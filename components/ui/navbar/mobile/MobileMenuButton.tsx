'use client'

import { Menu, X } from 'lucide-react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 hover:scale-105 hover:text-amber-500 dark:hover:text-amber-500 transition-transform cursor-pointer"
      onClick={onClick}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}
