import { useState, useEffect } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const { notify } = useNotify()

  useEffect(() => { api.get('/users').then(d => setUsers(d.data || d)).catch(() => {}) }, [])

  const toggleActive = async (id) => {
    try {
      await api.put(`/users/${id}/toggle`)
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u))
      notify('Statut utilisateur mis a jour', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr><th className="text-left p-4 font-medium">Nom</th><th className="text-left p-4 font-medium">Email</th><th className="text-left p-4 font-medium">Role</th><th className="text-left p-4 font-medium">Telephone</th><th className="text-center p-4 font-medium">Actif</th><th className="text-right p-4 font-medium">Action</th></tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{u.firstName} {u.lastName}</td>
                <td className="p-4 text-gray-500">{u.email}</td>
                <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span></td>
                <td className="p-4 text-gray-500">{u.phone || '-'}</td>
                <td className="p-4 text-center"><span className={`inline-block w-3 h-3 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span></td>
                <td className="p-4 text-right"><button onClick={() => toggleActive(u.id)} className={`text-sm ${u.isActive ? 'text-red-500 hover:underline' : 'text-green-500 hover:underline'}`}>{u.isActive ? 'Desactiver' : 'Activer'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {users.map(u => (
          <div key={u.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">{u.firstName?.charAt(0)}</div>
                <div>
                  <p className="font-semibold">{u.firstName} {u.lastName}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
              </div>
              <span className={`inline-block w-3 h-3 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
              <div><span className="text-gray-400">Role:</span> <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>{u.role}</span></div>
              <div><span className="text-gray-400">Tel:</span> {u.phone || '-'}</div>
            </div>
            <button onClick={() => toggleActive(u.id)} className={`w-full text-sm py-2 rounded-lg ${u.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'} transition`}>{u.isActive ? 'Desactiver' : 'Activer'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
