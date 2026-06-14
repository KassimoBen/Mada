import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-ocean-600 flex items-center justify-center text-white text-4xl font-bold">
          ?
        </div>
        <h1 className="text-6xl font-bold font-heading gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">Page non trouvee</p>
        <p className="text-gray-500 mb-8">La page que vous cherchez n'existe pas ou a ete deplacee.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Retour a l'accueil</Link>
          <Link to="/offres" className="btn-outline">Voir nos offres</Link>
        </div>
      </div>
    </div>
  )
}
