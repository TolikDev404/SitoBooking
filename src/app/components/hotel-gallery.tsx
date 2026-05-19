import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import ImageWithFallback from './figma/ImageWithFallback'

interface HotelGalleryProps {
  images: string[]
  hotelName: string
}

export default function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const prev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setSelectedIndex((i) => (i + 1) % images.length)

  return (
    <>
      <div className="space-y-3">
        {/* Main image with zoom on hover */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[16/9] cursor-zoom-in">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full overflow-hidden rounded-2xl"
                onClick={() => setModalOpen(true)}
              >
                <ImageWithFallback
                  src={images[selectedIndex]}
                  alt={`${hotelName} - foto ${selectedIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full p-2 shadow-md transition-all duration-150 z-10"
              >
                <ChevronLeft className="w-4 h-4 text-neutral-800 dark:text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full p-2 shadow-md transition-all duration-150 z-10"
              >
                <ChevronRight className="w-4 h-4 text-neutral-800 dark:text-white" />
              </button>
            </>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-black/40 text-white rounded-lg px-2 py-1 flex items-center gap-1 text-xs pointer-events-none">
            <ZoomIn className="w-3 h-3" />
            <span>Espandi</span>
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 left-3 bg-black/40 text-white rounded-lg px-2 py-1 text-xs pointer-events-none">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                  i === selectedIndex
                    ? 'border-amber-500 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${hotelName} miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={images[selectedIndex]}
                alt={`${hotelName} - foto ${selectedIndex + 1}`}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Modal thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(i) }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === selectedIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
