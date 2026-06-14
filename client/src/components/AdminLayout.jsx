import { useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { path: '/admin', label: 'Tableau de bord', icon: 'Dashboard', exact: true },
  { path: '/admin/offres', label: 'Offres', icon: 'Offers' },
  { path: '/admin/reservations', label: 'Réservations', icon: 'Bookings' },
  { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: 'Users' },
  { path: '/admin/messages', label: 'Messages', icon: 'Messages' },
  { path: '/admin/actualites', label: 'Actualités', icon: 'News' },
  { path: '/admin/avis', label: 'Avis', icon: 'Reviews' },
  { path: '/admin/categories', label: 'Categories', icon: 'Cat' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/')
  }, [user, navigate])

  if (!user || user.role !== 'admin') return null

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/uploads/logo.jpeg" alt="MadaHorizon" className="h-8 w-auto rounded" />
            <span className="font-heading font-bold">MadaHorizon</span>
          </Link>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${isActive(item.path, item.exact) ? 'bg-ocean-50 text-ocean-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{item.icon.charAt(0)}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t p-3 mt-4">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"><span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">R</span><span>Retour au site</span></Link>
          <button onClick={() => { logout(); navigate('/') }} className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition"><span className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">X</span><span>Déconnexion</span></button>
        </div>
      </aside>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex overflow-x-auto">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`flex-shrink-0 px-3 py-2 text-xs text-center ${isActive(item.path, item.exact) ? 'text-ocean-600 font-medium' : 'text-gray-500'}`}>
            <div className="w-6 h-6 mx-auto rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{item.icon.charAt(0)}</div>
            <div>{item.label}</div>
          </Link>
        ))}
      </nav>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>
    </div>
  )
}
