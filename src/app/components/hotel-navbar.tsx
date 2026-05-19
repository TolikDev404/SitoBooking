import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Sun, Moon, Menu, X } from 'lucide-react'

interface HotelNavbarProps {
  darkMode: boolean
  onToggleDark: () => void
}

export default function HotelNavbar({ darkMode, onToggleDark }: HotelNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span
            className={`font-display font-semibold text-lg tracking-tight transition-colors duration-300 ${
              scrolled
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-white drop-shadow-sm'
            }`}
          >
            TriplyRooms
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {['Hotel', 'Destinazioni', 'Offerte', 'Chi siamo'].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium transition-colors duration-200 hover:text-amber-500 ${
                scrolled
                  ? 'text-neutral-700 dark:text-neutral-300'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleDark}
            className={`p-2 rounded-full transition-colors duration-200 ${
              scrolled
                ? 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Cambia tema"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
              scrolled
                ? 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 px-4 py-4 space-y-3"
        >
          {['Hotel', 'Destinazioni', 'Offerte', 'Chi siamo'].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  )
}
