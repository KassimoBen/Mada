import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const { notify } = useNotify()

  useEffect(() => { api.get('/offers').then(d => setOffers(d.data || d)).catch(() => {}) }, [])

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette offre ?')) return
    try {
      await api.del(`/offers/${id}`)
      setOffers(offers.filter(o => o.id !== id))
      notify('Offre supprimee avec succes', 'success')
    } catch (err) {
      notify(err.message || 'Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des offres</h1>
        <Link to="/admin/offres/nouveau" className="btn-primary text-sm">+ Nouvelle offre</Link>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr><th className="text-left p-4 font-medium">Image</th><th className="text-left p-4 font-medium">Titre</th><th className="text-left p-4 font-medium">Categorie</th><th className="text-left p-4 font-medium">Duree</th><th className="text-right p-4 font-medium">Prix</th><th className="text-center p-4 font-medium">Actif</th><th className="text-right p-4 font-medium">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {offers.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="w-12 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {o.mainImage ? <img src={o.mainImage} alt="" className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">-</span>}
                  </div>
                </td>
                <td className="p-4 font-medium">{o.title}</td>
                <td className="p-4 text-gray-500">{o.category?.name}</td>
                <td className="p-4 text-gray-500">{o.duration}</td>
                <td className="p-4 text-right font-medium">{parseFloat(o.price).toLocaleString()} Ar</td>
                <td className="p-4 text-center"><span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${o.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{o.isActive ? 'OUI' : 'NON'}</span></td>
                <td className="p-4 text-right">
                  <Link to={`/admin/offres/${o.id}`} className="text-ocean-500 hover:underline mr-3">Modifier</Link>
                  <button onClick={() => handleDelete(o.id)} className="text-red-500 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {offers.map(o => (
          <div key={o.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {o.mainImage && <img src={o.mainImage} alt={o.title} className="w-full h-40 object-cover" />}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{o.title}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${o.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{o.isActive ? 'Actif' : 'Inactif'}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-500 mb-3">
                <span>{o.category?.name}</span>
                <span className="text-right">{o.duration}</span>
                <span className="font-semibold text-gray-800">{parseFloat(o.price).toLocaleString()} Ar</span>
              </div>
              <div className="flex gap-3 border-t pt-3">
                <Link to={`/admin/offres/${o.id}`} className="text-ocean-500 hover:underline text-sm flex-1 text-center py-1.5 bg-ocean-50 rounded-lg">Modifier</Link>
                <button onClick={() => handleDelete(o.id)} className="text-red-500 hover:underline text-sm flex-1 text-center py-1.5 bg-red-50 rounded-lg">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
