import { useState, useEffect, useRef } from 'react'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminNews() {
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', isPublished: false })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileRef = useRef()
  const { notify } = useNotify()

  useEffect(() => { api.get('/news/admin').then(d => setArticles(d.data || d)).catch(() => {}) }, [])

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\u00e0-\u00fc]+/g, '-').replace(/(^-|-$)/g, '')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('slug', form.slug || generateSlug(form.title))
    formData.append('excerpt', form.excerpt || '')
    formData.append('content', form.content)
    formData.append('isPublished', form.isPublished)
    if (imageFile) formData.append('image', imageFile)
    try {
      if (editing) {
        await api.upload(`/news/${editing}`, formData, 'PUT')
        setArticles(articles.map(a => a.id === editing ? { ...a, ...form, image: imagePreview || a.image } : a))
        notify('Article mis a jour', 'success')
      } else {
        const res = await api.upload('/news', formData)
        setArticles([res, ...articles])
        notify('Article cree', 'success')
      }
      setShowForm(false)
      setEditing(null)
      setForm({ title: '', slug: '', excerpt: '', content: '', isPublished: false })
      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  const startEdit = (a) => { setForm(a); setEditing(a.id); setShowForm(true); if (a.image) setImagePreview(a.image) }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet article ?')) return
    try {
      await api.del(`/news/${id}`)
      setArticles(articles.filter(a => a.id !== id))
      notify('Article supprime', 'success')
    } catch (err) {
      notify(err.message || 'Erreur')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Actualites</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', slug: '', excerpt: '', content: '', isPublished: false }) }} className="btn-primary text-sm">+ Nouvel article</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1">Titre</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="input-field" required /></div>
            <div><label className="block text-sm font-medium mb-1">Extrait</label><textarea rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="input-field" /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="input-field" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium mb-1">Contenu</label><textarea rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="input-field" required /></div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Image a la une</label>
              <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" ref={fileRef} onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ocean-50 file:text-ocean-700 hover:file:bg-ocean-100" />
              {imagePreview && <img src={imagePreview} alt="" className="mt-2 h-24 w-auto rounded object-cover" />}
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} /> Publie</label>
          </div>
          <div className="flex gap-3"><button type="submit" className="btn-primary">{editing ? 'Mettre a jour' : 'Creer'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-outline">Annuler</button></div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map(a => (
          <div key={a.id} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm sm:text-base">{a.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${a.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{a.isPublished ? 'Publie' : 'Brouillon'}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{a.excerpt}</p>
            <div className="flex gap-3 text-sm">
              <button onClick={() => startEdit(a)} className="text-ocean-500 hover:underline">Modifier</button>
              <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:underline">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
