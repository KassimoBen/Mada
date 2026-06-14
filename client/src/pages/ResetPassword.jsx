import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../context/api'
import { FiLock } from 'react-icons/fi'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Au moins 6 caracteres requis'); return }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (!token) { setError('Lien invalide'); return }

    setLoading(true)
    try {
      await api.post('/auth/reset-password', { token, password })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50">
            <p className="text-red-600 font-semibold">Lien de reinitialisation invalide.</p>
            <Link to="/mot-de-passe-oublie" className="text-primary-600 hover:underline mt-4 inline-block">Demander un nouveau lien</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading gradient-text mb-2">Nouveau mot de passe</h1>
          <p className="text-gray-600">Choisissez un nouveau mot de passe pour votre compte</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl text-green-600 font-bold">*</span>
              </div>
              <p className="text-gray-700 mb-6">Votre mot de passe a ete reinitialise avec succes.</p>
              <Link to="/connexion" className="btn-primary inline-block">Se connecter</Link>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nouveau mot de passe</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      className="input-field pl-12" placeholder="Minimum 6 caracteres" disabled={loading} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmer le mot de passe</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                    <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                      className="input-field pl-12" placeholder="Retapez le mot de passe" disabled={loading} />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3 font-semibold text-lg">
                  {loading ? 'Reinitialisation...' : 'Reinitialiser'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
