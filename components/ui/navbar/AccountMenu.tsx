'use client'

import { useState, useEffect, useRef } from 'react'
import { User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function AccountMenu() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, refreshAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user || !user.name) return null

  const displayName =
    user.name.length > 10 ? user.name.slice(0, 10) + '…' : user.name

  const handleLogout = async () => {
    setOpen(false)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      await refreshAuth()
      router.push('/')
    } catch (error) {
      console.error('Erro ao terminar sessão:', error)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-sm text-primary"
        aria-label="Menu do utilizador"
      >
        <User className="text-primary lg:hidden" />
        <span className="hidden lg:inline">Olá, {displayName}!</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-stone-800 shadow-lg rounded-xl border dark:border-stone-700 text-sm z-50">
          <div className="px-4 py-2 border-b dark:border-stone-700 font-medium truncate text-stone-700 dark:text-stone-200">
            {displayName}
          </div>

          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700"
            onClick={() => setOpen(false)}
          >
            Painel
          </Link>

          <Link
            href="/dashboard/definicoes"
            className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700"
            onClick={() => setOpen(false)}
          >
            Definições
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 text-red-600 dark:text-red-400"
          >
            Terminar sessão
          </button>
        </div>
      )}
    </div>
  )
}
