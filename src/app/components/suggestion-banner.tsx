import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, MapPin } from 'lucide-react'

interface SuggestionBannerProps {
  selectedCities: string[]
  onCityToggle: (city: string) => void
}

const BANNER_SESSION_KEY = 'triply_banner_shown'
const INACTIVITY_DELAY = 10_000

export default function SuggestionBanner({ selectedCities, onCityToggle }: SuggestionBannerProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dismissedRef = useRef(false)

  const dismiss = () => {
    dismissedRef.current = true
    setVisible(false)
    sessionStorage.setItem(BANNER_SESSION_KEY, '1')
  }

  const handleCta = () => {
    if (!selectedCities.includes('Roma Centro')) {
      onCityToggle('Roma Centro')
    }
    dismiss()
  }

  useEffect(() => {
    // Only show if at least one city is selected and not yet shown this session
    if (
      selectedCities.length === 0 ||
      sessionStorage.getItem(BANNER_SESSION_KEY) ||
      dismissedRef.current
    ) {
      return
    }

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (!sessionStorage.getItem(BANNER_SESSION_KEY) && !dismissedRef.current) {
        timerRef.current = setTimeout(() => {
          if (!sessionStorage.getItem(BANNER_SESSION_KEY) && !dismissedRef.current) {
            setVisible(true)
          }
        }, INACTIVITY_DELAY)
      }
    }

    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }))
    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, resetTimer))
    }
  }, [selectedCities.length])

  // Hide if user cleared all city filters
  useEffect(() => {
    if (selectedCities.length === 0) {
      setVisible(false)
    }
  }, [selectedCities.length])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mx-4 md:mx-8 my-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-800/40 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  Ti piace Roma?
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Guarda le nostre perle nel cuore della città — hotel storici con vista sui monumenti.
                </p>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCta}
                className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                Scopri ora
              </motion.button>

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                aria-label="Chiudi suggerimento"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
