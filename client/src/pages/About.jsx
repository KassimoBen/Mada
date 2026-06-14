import { useState } from 'react'
import { api } from '../context/api'

export default function About() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/contact', form)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-ocean-700 to-ocean-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">À propos de MadaHorizon</h1>
          <p className="text-xl text-ocean-100">Votre passerelle vers Madagascar</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Notre histoire</h2>
            <p className="text-gray-600 mb-4">MadaHorizon est née d'une passion pour Madagascar et de l'envie de faire découvrir cette île exceptionnelle aux voyageurs du monde entier.</p>
            <p className="text-gray-600 mb-4">Basés à Antananarivo, notre équipe de professionnels du tourisme connaît chaque recoin de l'île et sélectionne pour vous les meilleures expériences.</p>
            <p className="text-gray-600">Notre mission : vous offrir un voyage authentique et inoubliable à des prix justes, tout en soutenant le tourisme durable et les communautés locales.</p>
          </div>
          <div className="h-80 bg-gradient-to-br from-ocean-200 to-ocean-400 rounded-xl flex items-center justify-center text-8xl text-white font-bold">M</div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center text-2xl font-bold text-ocean-600">E</div><h3 className="font-semibold mb-2">Expertise locale</h3><p className="text-gray-500 text-sm">Une connaissance approfondie de Madagascar pour des expériences authentiques.</p></div>
          <div className="p-6"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center text-2xl font-bold text-ocean-600">S</div><h3 className="font-semibold mb-2">Service personnalisé</h3><p className="text-gray-500 text-sm">Des conseillers à votre écoute pour créer le voyage qui vous ressemble.</p></div>
          <div className="p-6"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ocean-100 flex items-center justify-center text-2xl font-bold text-ocean-600">D</div><h3 className="font-semibold mb-2">Tourisme durable</h3><p className="text-gray-500 text-sm">Nous nous engageons pour un tourisme respectueux de l'environnement et des populations.</p></div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Contactez-nous</h2>
          <p className="section-subtitle text-center">Une question ? Un projet de voyage ? N'hésitez pas à nous écrire.</p>
          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-xl font-bold text-ocean-600 flex-shrink-0">A</div><div><h4 className="font-semibold">Adresse</h4><p className="text-gray-600">Antananarivo 101, Madagascar</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-xl font-bold text-ocean-600 flex-shrink-0">T</div><div><h4 className="font-semibold">Téléphone</h4><p className="text-gray-600">+261 34 00 000 00</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center text-xl font-bold text-ocean-600 flex-shrink-0">@</div><div><h4 className="font-semibold">Email</h4><p className="text-gray-600">contact@madahorizon.com</p></div></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Votre nom" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" />
              <input type="email" placeholder="Votre email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" />
              <input type="text" placeholder="Sujet" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" />
              <textarea rows={4} placeholder="Votre message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field" />
              <button type="submit" className="btn-primary w-full">{sent ? 'Message envoyé !' : 'Envoyer'}</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
