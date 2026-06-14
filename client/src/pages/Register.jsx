import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!form.firstName.trim()) errors.firstName = 'Le prénom est requis'
    if (!form.lastName.trim()) errors.lastName = 'Le nom est requis'
    if (!form.email.trim()) errors.email = 'L\'email est requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email invalide'
    if (!form.password) errors.password = 'Le mot de passe est requis'
    if (form.password.length < 6) errors.password = 'Au moins 6 caractères requis'
    setValidation(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading gradient-text mb-2">Créer un compte</h1>
          <p className="text-gray-600">Rejoignez notre communauté de voyageurs</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50 backdrop-blur-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 animate-slide-down">
              <span className="text-xl text-red-500">!</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                  <input 
                    type="text" 
                    required 
                    value={form.firstName} 
                    onChange={e => setForm({ ...form, firstName: e.target.value })} 
                    className={`input-field pl-12 ${validation.firstName ? 'border-red-500' : ''}`}
                    disabled={loading}
                  />
                </div>
                {validation.firstName && <p className="text-red-500 text-xs mt-1">{validation.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                  <input 
                    type="text" 
                    required 
                    value={form.lastName} 
                    onChange={e => setForm({ ...form, lastName: e.target.value })} 
                    className={`input-field pl-12 ${validation.lastName ? 'border-red-500' : ''}`}
                    disabled={loading}
                  />
                </div>
                {validation.lastName && <p className="text-red-500 text-xs mt-1">{validation.lastName}</p>}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                <input 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={e => setForm({ ...form, email: e.target.value })} 
                  className={`input-field pl-12 ${validation.email ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validation.email && <p className="text-red-500 text-xs mt-1">{validation.email}</p>}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone <span className="text-gray-400 font-normal">(optionnel)</span></label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                <input 
                  type="tel" 
                  value={form.phone} 
                  onChange={e => setForm({ ...form, phone: e.target.value })} 
                  className="input-field pl-12"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                <input 
                  type="password" 
                  required 
                  value={form.password} 
                  onChange={e => setForm({ ...form, password: e.target.value })} 
                  className={`input-field pl-12 ${validation.password ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
              </div>
              {validation.password && <p className="text-red-500 text-xs mt-1">{validation.password}</p>}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                required 
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                J'accepte les <a href="#" className="text-primary-600 hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-primary-600 hover:underline">politique de confidentialité</a>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 font-semibold text-lg mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin-slow rounded-full h-5 w-5 border-b-2 border-white" />
                  Inscription en cours...
                </>
              ) : (
                <>
                  Créer mon compte <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-700 font-semibold">50+ Destinations</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-700 font-semibold">Note 4.9/5</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-700 font-semibold">Paiement Sécurisé</p>
          </div>
        </div>
      </div>
    </div>
  )
}
