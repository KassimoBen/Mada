import { Link, useSearchParams } from 'react-router-dom'

export default function PaymentCancel() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-lg text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-4xl text-yellow-600 font-bold">!</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">Paiement annule</h1>
          <p className="text-gray-600 mb-2">Le paiement a ete annule. Votre reservation n'a pas ete confirmee.</p>
          {reference && <p className="text-sm text-gray-400 mb-8">Réf: {reference}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offres" className="btn-primary">Retour aux offres</Link>
            <Link to="/mon-compte" className="btn-outline">Mes reservations</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
