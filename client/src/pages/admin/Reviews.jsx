import { useState, useEffect } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const { notify } = useNotify()

  useEffect(() => { api.get('/reviews').then(d => setReviews(d.data || d)).catch(() => {}) }, [])

  const approve = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`)
      setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: true } : r))
      notify('Avis approuve', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet avis ?')) return
    try {
      await api.del(`/reviews/${id}`)
      setReviews(reviews.filter(r => r.id !== id))
      notify('Avis supprime', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des avis</h1>
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className={`bg-white rounded-xl p-5 border ${r.isApproved ? 'border-gray-100' : 'border-yellow-200 bg-yellow-50/30'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{r.user?.firstName} {r.user?.lastName}</span>
                <span className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                {!r.isApproved && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">En attente</span>}
              </div>
              <span className="text-xs text-gray-400">{r.offer?.title}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{r.comment}</p>
            <div className="flex gap-2">
              {!r.isApproved && <button onClick={() => approve(r.id)} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200">Approuver</button>}
              <button onClick={() => handleDelete(r.id)} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200">Supprimer</button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-center text-gray-400 py-12">Aucun avis</p>}
      </div>
    </div>
  )
}
