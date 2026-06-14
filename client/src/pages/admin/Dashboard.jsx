import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../context/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0, revenue: 0 })
  const [bookings, setBookings] = useState([])
  const [offers, setOffers] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    api.get('/bookings/stats').then(setStats).catch(() => {})
    api.get('/bookings').then(d => setBookings(d.data || d)).catch(() => {})
    api.get('/offers').then(d => setOffers(d.data || d)).catch(() => {})
    api.get('/users').then(d => setUsers(d.data || d)).catch(() => {})
    api.get('/contact').then(d => setMessages(d.data || d)).catch(() => {})
  }, [])

  const statCards = [
    { label: 'Revenus', value: `${(stats.revenue || 0).toLocaleString()} Ar`, color: 'text-green-600', bg: 'bg-green-50', icon: 'R' },
    { label: 'Réservations', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50', icon: 'B' },
    { label: 'Réservations confirmées', value: stats.confirmed, color: 'text-ocean-600', bg: 'bg-ocean-50', icon: 'C' },
    { label: 'En attente', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: 'A' },
    { label: 'Offres', value: offers.length, color: 'text-purple-600', bg: 'bg-purple-50', icon: 'O' },
    { label: 'Clients', value: users.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: 'U' },
    { label: 'Messages', value: messages.length, color: 'text-rose-600', bg: 'bg-rose-50', icon: 'M' },
    { label: 'Messages non lus', value: messages.filter(m => !m.isRead).length, color: 'text-red-600', bg: 'bg-red-50', icon: 'N' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {statCards.map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 md:p-5`}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0"><p className="text-gray-500 text-xs md:text-sm truncate">{s.label}</p><p className={`text-lg md:text-2xl font-bold ${s.color} truncate`}>{s.value}</p></div>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/80 flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Dernières réservations</h2>
            <Link to="/admin/reservations" className="text-sm text-ocean-500 hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 5).map(b => (
              <div key={b.id} className="bg-white rounded-lg p-4 border border-gray-100 flex justify-between items-center">
                <div><p className="font-medium text-sm">{b.offer?.title}</p><p className="text-xs text-gray-500">{b.user?.firstName} {b.user?.lastName} - {b.reference}</p></div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Messages récents</h2>
            <Link to="/admin/messages" className="text-sm text-ocean-500 hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {messages.slice(0, 5).map(m => (
              <div key={m.id} className={`bg-white rounded-lg p-4 border ${m.isRead ? 'border-gray-100' : 'border-ocean-200 bg-ocean-50/30'} flex justify-between items-center`}>
                <div><p className="font-medium text-sm">{m.name}</p><p className="text-xs text-gray-500">{m.subject}</p></div>
                <span className={`text-xs px-2 py-1 rounded-full ${m.isRead ? 'text-gray-500' : 'text-ocean-600 font-semibold'}`}>{m.isRead ? 'Lu' : 'Nouveau'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
