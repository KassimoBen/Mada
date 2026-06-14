import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../context/api'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const reference = searchParams.get('reference')
  const [status, setStatus] = useState('Vérification de votre paiement...')

  useEffect(() => {
    if (!sessionId) { setStatus('Aucune session de paiement'); return }
    api.get(`/payments/session/${sessionId}/status`).then(data => {
      if (data.status === 'paid') {
        setStatus('Votre paiement a été confirmé et votre réservation est validée.')
      } else {
        setStatus('Votre paiement est en cours de traitement.')
      }
    }).catch(() => setStatus('Impossible de vérifier le statut du paiement.'))
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-lg text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl text-green-600 font-bold">*</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">Paiement réussi</h1>
          <p className="text-gray-600 mb-2">{status}</p>
          {reference && <p className="text-sm text-gray-400 mb-8">Réf: {reference}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mon-compte" className="btn-primary">Voir mes réservations</Link>
            <Link to="/offres" className="btn-outline">Continuer mes voyages</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
