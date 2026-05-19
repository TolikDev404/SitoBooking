import { motion } from 'motion/react'
import { Star, MapPin } from 'lucide-react'
import type { Hotel } from '../types'
import ImageWithFallback from './figma/ImageWithFallback'

interface HotelCardProps {
  hotel: Hotel
  onSelect: (hotel: Hotel) => void
}

export default function HotelCard({ hotel, onSelect }: HotelCardProps) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 32 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 ease-out overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onSelect(hotel)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {hotel.category}
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">{hotel.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-100 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-150">
            {hotel.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{hotel.city}</span>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {hotel.shortDescription}
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
          {hotel.services.length > 3 && (
            <span className="text-xs text-neutral-400 dark:text-neutral-500 px-1 py-0.5">
              +{hotel.services.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              €{hotel.pricePerNight}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400"> / notte</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.stopPropagation(); onSelect(hotel) }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-sm px-5 py-2 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            Scopri
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
