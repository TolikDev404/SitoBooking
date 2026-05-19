export default function HotelFooter() {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-display text-white font-semibold text-lg">TriplyRooms</span>
            </div>
            <p className="text-sm leading-relaxed">
              La collezione di hotel di lusso più esclusiva d'Italia. Dal mare alla montagna, esperienze indimenticabili.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Hotel</h4>
            <ul className="space-y-2">
              {['Roma Centro', 'Milano', 'Venezia', 'Firenze', 'Napoli'].map((city) => (
                <li key={city}>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors">{city}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Servizi</h4>
            <ul className="space-y-2">
              {['Spa & Benessere', 'Ristoranti Gourmet', 'Esperienze Locali', 'Transfer Privato', 'Concierge 24/7'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-2 text-sm">
              <li>info@triplyrooms.it</li>
              <li>+39 06 1234 5678</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  {['FB', 'IG', 'TW'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 bg-neutral-800 hover:bg-amber-500 rounded-full flex items-center justify-center text-xs font-semibold text-white transition-colors duration-200"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2025 TriplyRooms. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Termini di servizio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
