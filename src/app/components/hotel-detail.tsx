import { motion } from 'motion/react'
import { ArrowLeft, Star, MapPin, Globe, CircleCheck as CheckCircle } from 'lucide-react'
import type { Hotel } from '../types'
import HotelGallery from './hotel-gallery'

interface HotelDetailProps {
  hotel: Hotel
  onBack: () => void
}

const SERVICE_ICONS: Record<string, string> = {
  Spa: '🧖',
  Piscina: '🏊',
  Ristorante: '🍽️',
  'Vista Mare': '🌊',
  Palestra: '💪',
  Concierge: '🛎️',
  Parcheggio: '🚗',
  'Pet Friendly': '🐾',
}

export default function HotelDetail({ hotel, onBack }: HotelDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-neutral-50 dark:bg-neutral-950"
    >
      {/* Back button bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
          >
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.15 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            <span className="text-sm font-medium">Tutti gli hotel</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-medium px-2.5 py-1 rounded-full">
                  {hotel.category}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 leading-tight">
                {hotel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{hotel.rating}</span>
                  <span>({hotel.reviewCount} recensioni)</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <HotelGallery images={hotel.images} hotelName={hotel.name} />

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Il tuo soggiorno
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                {hotel.description}
              </p>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Servizi inclusi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {hotel.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2.5 bg-white dark:bg-neutral-900 rounded-xl px-4 py-3 border border-neutral-100 dark:border-neutral-800"
                  >
                    <span className="text-xl">{SERVICE_ICONS[service] ?? '✓'}</span>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Lingue parlate
              </h2>
              <div className="flex flex-wrap gap-2">
                {hotel.languages.map((lang) => (
                  <div key={lang} className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 rounded-full px-3 py-1.5 border border-neutral-100 dark:border-neutral-800">
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-lg overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 p-6 text-white">
                  <div className="text-sm text-neutral-400 mb-1">A partire da</div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold">€{hotel.pricePerNight}</span>
                    <span className="text-neutral-400 text-sm">/ notte</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                    <span className="text-neutral-400 text-sm">({hotel.reviewCount} recensioni)</span>
                  </div>
                </div>

                {/* Booking section */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    {['Colazione inclusa', 'Cancellazione gratuita entro 48h', 'Check-in flessibile'].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a
                    href="#prenota"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Prenota Ora
                  </motion.a>

                  <p className="text-xs text-center text-neutral-400 dark:text-neutral-500">
                    Nessun costo aggiuntivo al momento della prenotazione
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="h-48 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{hotel.city}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{hotel.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
