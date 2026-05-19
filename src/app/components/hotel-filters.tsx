import { motion, AnimatePresence } from 'motion/react'

const CITIES = [
  'Roma Centro',
  'Milano',
  'Venezia',
  'Firenze',
  'Napoli',
  'Amalfi',
  'Portofino',
  'Taormina',
  'Capri',
  'Cortina',
]

const SERVICES = [
  'Spa',
  'Piscina',
  'Ristorante',
  'Vista Mare',
  'Palestra',
  'Concierge',
  'Parcheggio',
  'Pet Friendly',
]

interface HotelFiltersProps {
  selectedCities: string[]
  selectedServices: string[]
  onCityToggle: (city: string) => void
  onServiceToggle: (service: string) => void
  onClearAll: () => void
}

export default function HotelFilters({
  selectedCities,
  selectedServices,
  onCityToggle,
  onServiceToggle,
  onClearAll,
}: HotelFiltersProps) {
  const hasFilters = selectedCities.length > 0 || selectedServices.length > 0

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Filtra per Città
          </h2>
          <AnimatePresence>
            {hasFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={onClearAll}
                className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
              >
                Rimuovi filtri
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => {
            const active = selectedCities.includes(city)
            return (
              <motion.button
                key={city}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCityToggle(city)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  active
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
              >
                {city}
              </motion.button>
            )
          })}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-3">
            Servizi
          </h2>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((service) => {
              const active = selectedServices.includes(service)
              return (
                <motion.button
                  key={service}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onServiceToggle(service)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                    active
                      ? 'bg-neutral-800 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                  }`}
                >
                  {service}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
