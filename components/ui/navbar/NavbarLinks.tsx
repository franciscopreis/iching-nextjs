'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import NavItemRenderer from './NavItemRenderer'
import { NavItem } from './types'

interface NavbarLinksProps {
  onLinkClick?: () => void
}

// Links comuns
const baseLinks: NavItem[] = [
  { type: 'link', href: '/', label: 'Início' },
  { type: 'link', href: '/sobre/i-ching', label: 'Sobre' },
  { type: 'link', href: '/blog', label: 'Blog' },
]

export default function NavbarLinks({ onLinkClick }: NavbarLinksProps) {
  const { isAuthenticated, refreshAuth } = useAuth()
  const router = useRouter()

  // Logout handler
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    refreshAuth()
    router.push('/')
    onLinkClick?.()
  }

  // Links auth / not auth
  const authLinks: NavItem[] = isAuthenticated
    ? [
        { type: 'link', href: '/dashboard', label: 'Painel' },
        { type: 'action', label: 'Logout', onClick: handleLogout },
      ]
    : [
        { type: 'link', href: '/login', label: 'Login' },
        { type: 'link', href: '/registo', label: 'Registo' },
      ]

  const allLinks = [...baseLinks, ...authLinks]

  return (
    <>
      {allLinks.map((item) => (
        <NavItemRenderer
          key={item.type === 'link' ? item.href : item.label}
          item={item}
          onLinkClick={onLinkClick}
        />
      ))}
    </>
  )
}
