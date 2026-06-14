import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../context/api'

export default function Dashboard() {
  const { user, logout, setUser } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [payingId, setPayingId] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [profileMsg, setProfileMsg] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/connexion'); return }
    api.get('/bookings/mine').then(setBookings).catch(() => {})
    setProfileForm({ firstName: user.firstName || '', lastName: user.lastName || '', phone: user.phone || '' })
  }, [user, navigate])

  const handlePay = async (bookingId) => {
    setPayingId(bookingId)
    try {
      const res = await api.post('/payments/create-checkout-session', { bookingId })
      window.location.href = res.url
    } catch (err) {
      alert(err.message || 'Erreur')
      setPayingId(null)
    }
  }

  const handleCancel = async (bookingId) => {
    if (!confirm('Annuler cette reservation ?')) return
    setCancellingId(bookingId)
    try {
      await api.put(`/bookings/${bookingId}/cancel`)
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    } catch (err) {
      alert(err.message || "Erreur lors de l'annulation")
    } finally {
      setCancellingId(null)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileMsg('')
    try {
      const res = await api.put('/auth/profile', profileForm)
      setUser(res.user)
      setProfileMsg('Profil mis a jour')
    } catch (err) {
      setProfileMsg(err.message || "Erreur de mise a jour")
    }
  }

  if (!user) return null

  const statusColors = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700', completed: 'bg-blue-100 text-blue-700' }
  const paymentColors = { unpaid: 'text-red-600 bg-red-50', paid: 'text-green-600 bg-green-50', refunded: 'text-gray-600 bg-gray-50' }

  const unpaid = bookings.filter(b => b.paymentStatus === 'unpaid').length
  const activeBookings = bookings.filter(b => b.status !== 'cancelled').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bonjour, {user.firstName}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowProfile(!showProfile)} className="btn-outline text-sm py-2 px-4">
            {showProfile ? 'Mes reservations' : 'Mon profil'}
          </button>
          <button onClick={() => { logout(); navigate('/') }} className="btn-outline text-sm py-2 px-4">Deconnexion</button>
        </div>
      </div>

      {showProfile ? (
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-6">Modifier mon profil</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Prenom</label>
              <input type="text" value={profileForm.firstName} onChange={e => setProfileForm({ ...profileForm, firstName: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input type="text" value={profileForm.lastName} onChange={e => setProfileForm({ ...profileForm, lastName: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telephone</label>
              <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} className="input-field" placeholder="+261 XX XXX XX XX" />
            </div>
            {profileMsg && <p className={`text-sm ${profileMsg.includes('mis a jour') ? 'text-green-600' : 'text-red-500'}`}>{profileMsg}</p>}
            <button type="submit" className="btn-primary">Enregistrer</button>
          </form>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-100"><p className="text-gray-500 text-xs md:text-sm">Reservations</p><p className="text-2xl md:text-3xl font-bold text-ocean-600">{bookings.length}</p></div>
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-100"><p className="text-gray-500 text-xs md:text-sm">Actives</p><p className="text-2xl md:text-3xl font-bold text-green-600">{activeBookings}</p></div>
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-100"><p className="text-gray-500 text-xs md:text-sm">En attente</p><p className="text-2xl md:text-3xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</p></div>
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-100"><p className="text-gray-500 text-xs md:text-sm">Impayees</p><p className="text-2xl md:text-3xl font-bold text-red-600">{unpaid}</p></div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Mes reservations</h2>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400"><p className="text-6xl mb-4">--</p><p>Aucune reservation pour le moment</p><Link to="/offres" className="btn-primary inline-block mt-4">Decouvrir nos offres</Link></div>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{b.offer?.title}</h3>
                    <p className="text-sm text-gray-500">{b.startDate} → {b.endDate} | {b.participants} pers.</p>
                    <p className="text-sm text-gray-500">Ref: {b.reference}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${paymentColors[b.paymentStatus] || 'bg-gray-100 text-gray-700'}`}>{b.paymentStatus}</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-ocean-600">{parseFloat(b.totalPrice).toLocaleString()} Ar</p>
                    <div className="flex items-center gap-2">
                      {b.paymentStatus === 'unpaid' && (
                        <button onClick={() => handlePay(b.id)} disabled={payingId === b.id}
                          className="text-xs bg-primary-500 text-white px-4 py-1.5 rounded-lg hover:bg-primary-600 transition disabled:opacity-50 whitespace-nowrap">
                          {payingId === b.id ? 'Redirection...' : 'Payer maintenant'}
                        </button>
                      )}
                      {b.status !== 'cancelled' && b.status !== 'completed' && (
                        <button onClick={() => handleCancel(b.id)} disabled={cancellingId === b.id}
                          className="text-xs bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg hover:bg-red-100 transition disabled:opacity-50 whitespace-nowrap">
                          {cancellingId === b.id ? 'Annulation...' : 'Annuler'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
