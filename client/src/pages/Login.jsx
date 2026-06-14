import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading gradient-text mb-2">Connexion</h1>
          <p className="text-gray-600">Bienvenue chez MadaHorizon</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50 backdrop-blur-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3 animate-slide-down">
              <span className="text-xl text-red-500">!</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="input-field pl-12"
                  placeholder="votre@email.com"
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
                  className="input-field pl-12"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 font-semibold text-lg mt-8"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin-slow rounded-full h-5 w-5 border-b-2 border-white" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right -mt-3">
            <Link to="/mot-de-passe-oublie" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Mot de passe oublie ?
            </Link>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mb-6 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              S'inscrire maintenant
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">Comptes de demonstration:</p>
            <div className="space-y-1">
              <p className="break-all">Admin: <code className="bg-white px-2 py-0.5 rounded text-xs">admin@madahorizon.com</code></p>
              <p>Mot de passe: <code className="bg-white px-2 py-0.5 rounded text-xs">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
