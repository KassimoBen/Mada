import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../context/api'
import { FiMail, FiArrowLeft } from 'react-icons/fi'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading gradient-text mb-2">Mot de passe oublie</h1>
          <p className="text-gray-600">Entrez votre email pour recevoir un lien de reinitialisation</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl text-green-600 font-bold">*</span>
              </div>
              <p className="text-gray-700 mb-6">Si un compte existe avec cet email, vous recevrez un lien de reinitialisation.</p>
              <Link to="/connexion" className="text-primary-600 font-semibold hover:underline flex items-center justify-center gap-2">
                <FiArrowLeft /> Retour a la connexion
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                  <span className="text-xl text-red-500">!</span>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="input-field pl-12" placeholder="votre@email.com" disabled={loading} />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 font-semibold text-lg">
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </form>
              <p className="text-center text-gray-600 mt-6">
                <Link to="/connexion" className="text-primary-600 font-semibold hover:underline flex items-center justify-center gap-2">
                  <FiArrowLeft /> Retour a la connexion
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
