import { useState, useEffect } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const { notify } = useNotify()

  useEffect(() => { api.get('/bookings').then(d => setBookings(d.data || d)).catch(() => {}) }, [])

  const updateStatus = async (id, status, paymentStatus) => {
    const body = {}
    if (status) body.status = status
    if (paymentStatus) body.paymentStatus = paymentStatus
    try {
      await api.put(`/bookings/${id}`, body)
      setBookings(bookings.map(b => b.id === id ? { ...b, ...body } : b))
      notify('Reservation mise a jour', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  const statusColors = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700', completed: 'bg-blue-100 text-blue-700' }
  const paymentColors = { unpaid: 'bg-red-100 text-red-700', paid: 'bg-green-100 text-green-700', refunded: 'bg-gray-100 text-gray-700' }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des reservations</h1>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr><th className="text-left p-4 font-medium">Ref</th><th className="text-left p-4 font-medium">Client</th><th className="text-left p-4 font-medium">Offre</th><th className="text-left p-4 font-medium">Dates</th><th className="text-right p-4 font-medium">Total</th><th className="text-center p-4 font-medium">Statut</th><th className="text-center p-4 font-medium">Paiement</th><th className="text-right p-4 font-medium">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">{b.reference}</td>
                <td className="p-4">{b.user?.firstName} {b.user?.lastName}</td>
                <td className="p-4 text-gray-500">{b.offer?.title}</td>
                <td className="p-4 text-gray-500 text-xs">{b.startDate} &rarr; {b.endDate}</td>
                <td className="p-4 text-right font-medium">{parseFloat(b.totalPrice).toLocaleString()} Ar</td>
                <td className="p-4 text-center"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[b.status]}`}>{b.status}</span></td>
                <td className="p-4 text-center"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${paymentColors[b.paymentStatus]}`}>{b.paymentStatus}</span></td>
                <td className="p-4 text-right">
                  <div className="flex gap-1 justify-end">
                    {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'confirmed', null)} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Confirmer</button>}
                    {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'cancelled', null)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">Annuler</button>}
                    {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed', null)} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Terminer</button>}
                    {b.paymentStatus === 'unpaid' && <button onClick={() => updateStatus(null, null, 'paid')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Marquer paye</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {bookings.map(b => (
          <div key={b.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-mono text-xs text-gray-400">{b.reference}</p>
                <p className="font-semibold">{b.user?.firstName} {b.user?.lastName}</p>
                <p className="text-sm text-gray-500">{b.offer?.title}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[b.status]}`}>{b.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
              <div><span className="text-gray-400">Dates:</span> {b.startDate} - {b.endDate}</div>
              <div className="text-right font-semibold">{parseFloat(b.totalPrice).toLocaleString()} Ar</div>
              <div><span className="text-gray-400">Paiement:</span> <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${paymentColors[b.paymentStatus]}`}>{b.paymentStatus}</span></div>
            </div>
            <div className="flex gap-2 border-t pt-3">
              {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'confirmed', null)} className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 flex-1">Confirmer</button>}
              {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'cancelled', null)} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 flex-1">Annuler</button>}
              {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed', null)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 flex-1">Terminer</button>}
              {b.paymentStatus === 'unpaid' && <button onClick={() => updateStatus(null, null, 'paid')} className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 flex-1">Marquer paye</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
