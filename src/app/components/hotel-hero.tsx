import { motion } from 'motion/react'
import { Search } from 'lucide-react'

interface HotelHeroProps {
  onSearch?: (query: string) => void
}

export default function HotelHero({ onSearch }: HotelHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Hotel di lusso in Italia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4"
        >
          10 Destinazioni d'eccellenza
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          La tua fuga perfetta
          <br />
          <span className="text-amber-400">ti aspetta</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Dal mare alla montagna, scopri le perle del nostro portfolio di hotel esclusivi in Italia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center max-w-lg mx-auto bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 overflow-hidden focus-within:border-amber-400/70 transition-colors"
        >
          <Search className="w-5 h-5 text-white/60 ml-4 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cerca per città o hotel..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/50 px-3 py-4 text-sm outline-none"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
