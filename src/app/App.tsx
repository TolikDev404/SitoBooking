import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { hotels } from './data/hotels'
import type { Hotel } from './types'
import HotelNavbar from './components/hotel-navbar'
import HotelHero from './components/hotel-hero'
import HotelFilters from './components/hotel-filters'
import HotelCard from './components/hotel-card'
import HotelDetail from './components/hotel-detail'
import HotelFooter from './components/hotel-footer'
import SuggestionBanner from './components/suggestion-banner'

type Page = 'home' | 'detail'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('triply_dark') === '1' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('triply_dark', darkMode ? '1' : '0')
  }, [darkMode])

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    )
  }

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const clearAll = () => {
    setSelectedCities([])
    setSelectedServices([])
  }

  const filteredHotels = useMemo(() => {
    let result = hotels

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.shortDescription.toLowerCase().includes(q)
      )
    }

    if (selectedCities.length > 0) {
      result = result.filter((h) => selectedCities.includes(h.city))
    }

    if (selectedServices.length > 0) {
      result = result.filter((h) =>
        selectedServices.every((s) => h.services.includes(s))
      )
    }

    return result
  }, [selectedCities, selectedServices, searchQuery])

  const openHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    setCurrentPage('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setSelectedHotel(null)
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Key for AnimatePresence to detect filter changes
  const gridKey = `${selectedCities.join(',')}-${selectedServices.join(',')}-${searchQuery}`

  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200`}>
      <HotelNavbar darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HotelHero onSearch={setSearchQuery} />

            <div className="bg-white dark:bg-neutral-900">
              <HotelFilters
                selectedCities={selectedCities}
                selectedServices={selectedServices}
                onCityToggle={toggleCity}
                onServiceToggle={toggleService}
                onClearAll={clearAll}
              />

              {/* Suggestion banner between filters and grid */}
              <SuggestionBanner
                selectedCities={selectedCities}
                onCityToggle={toggleCity}
              />
            </div>

            {/* Hotel grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {filteredHotels.length === hotels.length
                    ? `${hotels.length} hotel in Italia`
                    : `${filteredHotels.length} hotel trovati`}
                </p>
                {filteredHotels.length === 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Rimuovi tutti i filtri
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={gridKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredHotels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredHotels.map((hotel, index) => (
                        <motion.div
                          key={hotel.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2, delay: index * 0.04 }}
                        >
                          <HotelCard hotel={hotel} onSelect={openHotel} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-24"
                    >
                      <p className="text-4xl mb-4">🏨</p>
                      <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        Nessun hotel trovato
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Prova a rimuovere qualche filtro
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <HotelFooter />
          </motion.main>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedHotel && (
              <HotelDetail hotel={selectedHotel} onBack={goHome} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
