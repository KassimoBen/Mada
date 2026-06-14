import { useState, useEffect } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', slug: '', description: '' })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { notify } = useNotify()

  useEffect(() => { api.get('/categories').then(setCategories).catch(() => {}) }, [])

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\u00e0-\u00fc]+/g, '-').replace(/(^-|-$)/g, '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, slug: form.slug || generateSlug(form.name) }
    try {
      if (editing) {
        const updated = await api.put(`/categories/${editing}`, data)
        setCategories(categories.map(c => c.id === editing ? updated : c))
        notify('Categorie mise a jour', 'success')
      } else {
        const created = await api.post('/categories', data)
        setCategories([...categories, created])
        notify('Categorie creee', 'success')
      }
      setShowForm(false)
      setEditing(null)
      setForm({ name: '', slug: '', description: '' })
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  const startEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '' })
    setEditing(cat.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette categorie ?')) return
    try {
      await api.del(`/categories/${id}`)
      setCategories(categories.filter(c => c.id !== id))
      notify('Categorie supprimee', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', slug: '', description: '' }) }} className="btn-primary text-sm">+ Nouvelle categorie</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mb-8 space-y-4 max-w-lg">
          <div><label className="block text-sm font-medium mb-1">Nom</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : generateSlug(e.target.value) })} className="input-field" required /></div>
          <div><label className="block text-sm font-medium mb-1">Slug</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field" /></div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">{editing ? 'Mettre a jour' : 'Creer'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Annuler</button>
          </div>
        </form>
      )}

      <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr><th className="text-left p-4 font-medium">Nom</th><th className="text-left p-4 font-medium">Slug</th><th className="text-left p-4 font-medium">Description</th><th className="text-right p-4 font-medium">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {categories.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-gray-500">{c.slug}</td>
                <td className="p-4 text-gray-500">{c.description || '-'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => startEdit(c)} className="text-ocean-500 hover:underline mr-3">Modifier</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {categories.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">{c.name}</h3>
              <span className="text-xs text-gray-400">{c.slug}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{c.description || '-'}</p>
            <div className="flex gap-3 text-sm border-t pt-3">
              <button onClick={() => startEdit(c)} className="text-ocean-500 hover:underline flex-1 text-center py-1.5 bg-ocean-50 rounded-lg">Modifier</button>
              <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:underline flex-1 text-center py-1.5 bg-red-50 rounded-lg">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
