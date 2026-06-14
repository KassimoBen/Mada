import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../context/api'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

export default function Footer() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(() => {})
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-500 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-ocean-600 flex items-center justify-center text-white font-bold group-hover:shadow-glow-primary transition-all">
                  M
                </div>
                <div>
                  <div className="font-heading text-lg font-bold text-white">MadaHorizon</div>
                  <div className="text-xs text-primary-300">Voyages Authentiques</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">Decouvrez Madagascar avec MadaHorizon. Des circuits inoubliables et des experiences authentiques vous attendent.</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                  <FiFacebook className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                  <FiInstagram className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-500 flex items-center justify-center transition-colors">
                  <FiTwitter className="text-lg" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Explorez</h4>
              <div className="space-y-3 text-sm">
                <Link to="/" className="block text-gray-400 hover:text-primary-400 transition-colors">Accueil</Link>
                <Link to="/offres" className="block text-gray-400 hover:text-primary-400 transition-colors">Nos offres</Link>
                <Link to="/a-propos" className="block text-gray-400 hover:text-primary-400 transition-colors">A propos de nous</Link>
                <Link to="/connexion" className="block text-gray-400 hover:text-primary-400 transition-colors">Connexion</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Categories</h4>
              <div className="space-y-3 text-sm">
                {categories.map(c => (
                  <Link key={c.id} to={`/offres?categorie=${c.id}`} className="block text-gray-400 hover:text-primary-400 transition-colors">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-white mb-6 text-lg">Nous Contacter</h4>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-primary-400 mt-1 flex-shrink-0 text-lg" />
                  <div>
                    <p className="text-gray-400">Antananarivo</p>
                    <p className="text-xs text-gray-500">Madagascar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-primary-400 flex-shrink-0 text-lg" />
                  <a href="tel:+261340000" className="text-gray-400 hover:text-primary-400 transition-colors">+261 34 00 000 00</a>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary-400 flex-shrink-0 text-lg" />
                  <a href="mailto:contact@madahorizon.com" className="text-gray-400 hover:text-primary-400 transition-colors">contact@madahorizon.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700/50 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} MadaHorizon. Tous droits reserves.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-primary-400 transition-colors">Politique de confidentialite</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Conditions d'utilisation</a>
              <a href="#" className="hover:text-primary-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-ocean-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Pret a partir en aventure ?</p>
              <p className="text-sm text-white/90">Decouvrez nos meilleures offres maintenant</p>
            </div>
            <Link to="/offres" className="px-6 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Consulter les offres
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
