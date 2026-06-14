import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-ocean-600 flex items-center justify-center text-white font-bold group-hover:shadow-glow-primary transition-all">
              M
            </div>
            <span className="font-heading text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-ocean-600">MadaHorizon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Accueil</Link>
            <Link to="/offres" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Offres</Link>
            <Link to="/a-propos" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">À propos</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-glow-primary transition-all text-sm">
                    Tableau de bord
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full gradient-text bg-primary-100 flex items-center justify-center font-bold">
                      {user.firstName?.charAt(0)}
                    </div>
                    <span className="text-gray-700 font-medium hidden sm:inline">{user.firstName}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/mon-compte" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                      <FiUser className="text-lg" /> Mon profil
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">
                      <FiLogOut className="text-lg" /> Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/connexion" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Connexion</Link>
                <Link to="/inscription" className="btn-primary text-sm py-2 px-4">S'inscrire</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile overlay */}
        {menuOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)} />}

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200/50 pt-4 animate-slide-down bg-white/95 backdrop-blur-xl">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/offres" 
              className="block py-2 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Offres
            </Link>
            <Link 
              to="/a-propos" 
              className="block py-2 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              À propos
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block py-2 px-4 text-primary-600 font-semibold hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                )}
                <Link 
                  to="/mon-compte" 
                  className="block py-2 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <button 
                  onClick={() => { handleLogout(); setMenuOpen(false) }} 
                  className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/connexion" 
                  className="block py-2 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/inscription" 
                  className="block py-2 px-4 text-primary-600 font-semibold bg-primary-50 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
