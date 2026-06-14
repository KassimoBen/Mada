import { useState, useEffect } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const { notify } = useNotify()

  useEffect(() => { api.get('/contact').then(d => setMessages(d.data || d)).catch(() => {}) }, [])

  const markRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`)
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m))
      notify('Message marque comme lu', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await api.del(`/contact/${id}`)
      setMessages(messages.filter(m => m.id !== id))
      notify('Message supprime', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages de contact</h1>
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`bg-white rounded-xl p-5 border ${m.isRead ? 'border-gray-100' : 'border-ocean-300 bg-ocean-50/20'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2"><span className="font-semibold">{m.name}</span>{!m.isRead && <span className="text-xs bg-ocean-500 text-white px-2 py-0.5 rounded-full">Nouveau</span>}</div>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <p className="text-sm font-medium text-ocean-600 mb-2">{m.subject}</p>
            <p className="text-gray-600 text-sm mb-3">{m.message}</p>
            <div className="flex gap-2">
              {!m.isRead && <button onClick={() => markRead(m.id)} className="text-xs bg-ocean-100 text-ocean-700 px-3 py-1 rounded-lg hover:bg-ocean-200">Marquer comme lu</button>}
              <button onClick={() => handleDelete(m.id)} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200">Supprimer</button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-gray-400 py-12">Aucun message</p>}
      </div>
    </div>
  )
}
