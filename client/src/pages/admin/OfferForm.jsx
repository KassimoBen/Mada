import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../context/api'
import { useNotify } from '../../context/Notification'

export default function AdminOfferForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useNotify()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    title: '', slug: '', description: '', duration: '', price: '', originalPrice: '',
    destination: '', maxParticipants: 20, isFeatured: false, isActive: true,
    category_id: '', included: '', excluded: '', itinerary: '',
  })
  const [mainImage, setMainImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const isEdit = Boolean(id)

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(() => {})
    if (isEdit) {
      api.get(`/offers/id/${id}`).then(data => {
        setForm({ ...data, price: data.price.toString(), originalPrice: data.originalPrice?.toString() || '' })
        if (data.mainImage) setPreview(data.mainImage)
      }).catch(() => navigate('/admin/offres'))
    }
  }, [id])

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\u00e0-\u00fc]+/g, '-').replace(/(^-|-$)/g, '')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMainImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('slug', form.slug)
      formData.append('description', form.description)
      formData.append('duration', form.duration)
      formData.append('price', form.price)
      formData.append('category_id', form.category_id)
      if (form.originalPrice) formData.append('originalPrice', form.originalPrice)
      if (form.destination) formData.append('destination', form.destination)
      formData.append('maxParticipants', form.maxParticipants)
      formData.append('isFeatured', form.isFeatured)
      formData.append('isActive', form.isActive)
      if (form.included) formData.append('included', form.included)
      if (form.excluded) formData.append('excluded', form.excluded)
      if (form.itinerary) formData.append('itinerary', form.itinerary)
      if (mainImage) formData.append('mainImage', mainImage)

      if (isEdit) {
        await api.upload(`/offers/${id}`, formData)
      } else {
        await api.upload('/offers', formData)
      }
      navigate('/admin/offres')
    } catch (err) {
      notify(err.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Modifier' : 'Nouvelle'} offre</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Titre</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="input-field" required /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Slug</label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="input-field" required /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field" required /></div>
          <div><label className="block text-sm font-medium mb-1">Catégorie</label><select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} className="input-field" required>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-1">Durée</label><input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="input-field" placeholder="ex: 7 jours / 6 nuits" required /></div>
          <div><label className="block text-sm font-medium mb-1">Prix (Ar)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-field" required /></div>
          <div><label className="block text-sm font-medium mb-1">Prix original (Ar)</label><input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1">Destination</label><input value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} className="input-field" /></div>
          <div><label className="block text-sm font-medium mb-1">Max participants</label><input type="number" value={form.maxParticipants} onChange={e => setForm({ ...form, maxParticipants: e.target.value })} className="input-field" /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Inclus</label><textarea rows={3} value={form.included} onChange={e => setForm({ ...form, included: e.target.value })} className="input-field" /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Non inclus</label><textarea rows={3} value={form.excluded} onChange={e => setForm({ ...form, excluded: e.target.value })} className="input-field" /></div>
          <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Itinéraire</label><textarea rows={6} value={form.itinerary} onChange={e => setForm({ ...form, itinerary: e.target.value })} className="input-field" placeholder="Jour 1: Description..." /></div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Photo principale</label>
            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Apercu" className="w-48 h-32 object-cover rounded-lg border" />
              </div>
            )}
            <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-ocean-50 file:text-ocean-700 hover:file:bg-ocean-100" />
          </div>
          <div className="flex gap-6"><label className="flex items-center gap-2"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} /> A la une</label><label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Actif</label></div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Enregistrement...' : (isEdit ? 'Mettre a jour' : 'Creer')}</button>
          <button type="button" onClick={() => navigate('/admin/offres')} className="btn-outline">Annuler</button>
        </div>
      </form>
    </div>
  )
}
