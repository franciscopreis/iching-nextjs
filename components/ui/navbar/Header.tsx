'use client'

import { useState } from 'react'
import Logo from './Logo'
import NavbarLinks from './NavbarLinks'
import AccountMenu from './AccountMenu'
import DarkModeToggle from '../button/DarkModeButton'
import MobileMenu from './mobile/MobileMenu'
import MobileMenuButton from './mobile/MobileMenuButton'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 md:h-15 h-13 bg-white dark:bg-stone-900 border-b  lg:opacity-95 lg:hover:opacity-100 items-center">
      <div className="max-w-7xl mx-auto md:p-4 p-2 flex items-center justify-between ">
        {/* Logo */}
        <Logo />

        {/* Navbar links (desktop) */}
        <nav className="hidden md:flex gap-x-6">
          <NavbarLinks onLinkClick={() => setMenuOpen(false)} />
        </nav>

        {/* Actions: DarkMode, Name, MobileMenuButton */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <AccountMenu />
          <MobileMenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </header>
  )
}
