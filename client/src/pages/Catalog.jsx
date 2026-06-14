import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../context/api'
import { FiFilter, FiX, FiSearch } from 'react-icons/fi'

export default function Catalog() {
  const [offers, setOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const filter = searchParams.get('categorie') || ''
  const search = searchParams.get('search') || ''

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    setLoading(true)
    setError('')
    api.get('/categories')
      .then(setCategories)
      .catch(err => {
        console.error('Erreur catégories:', err)
        setError('Impossible de charger les catégories')
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams()
    if (filter) params.set('category', filter)
    if (search) params.set('search', search)
    if (sort) params.set('sort', sort)
    params.set('page', currentPage)
    params.set('limit', 12)
    
    api.get(`/offers?${params.toString()}`)
      .then(response => {
        if (response.data) {
          setOffers(response.data)
          setPagination(response.pagination)
        } else {
          setOffers(response)
        }
      })
      .catch(err => {
        console.error('Erreur offres:', err)
        setError('Impossible de charger les offres')
      })
      .finally(() => setLoading(false))
  }, [filter, search, sort, currentPage])

  const updateFilter = (key, value) => {
    setCurrentPage(1)
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value); else p.delete(key)
    setSearchParams(p)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    updateFilter('search', searchInput)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Nos offres touristiques</h1>
      <p className="text-gray-500 mb-6">Decouvrez toutes nos offres pour explorer Madagascar</p>

      <form onSubmit={handleSearchSubmit} className="mb-8">
        <div className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher une destination, un type de sejour..." value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="input-field pl-10 w-full" />
          </div>
          <button type="submit" className="btn-primary whitespace-nowrap">Rechercher</button>
          {search && (
            <button type="button" onClick={() => { setSearchInput(''); updateFilter('search', '') }} className="btn-outline px-3">
              <FiX />
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden flex gap-3">
          <button onClick={() => setShowFilters(!showFilters)} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <FiFilter className="text-lg" /> {showFilters ? 'Masquer filtres' : 'Filtres'}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto text-sm flex-shrink-0">
            <option value="">Trier</option>
            <option value="price_asc">Prix +</option>
            <option value="price_desc">Prix -</option>
            <option value="rating">Notes</option>
          </select>
        </div>

        {/* Filters sidebar */}
        <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Catégories</h3>
              <div className="space-y-2">
                <button onClick={() => updateFilter('categorie', '')} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${!filter ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>Toutes</button>
                {categories.map(c => (
                  <button key={c.id} onClick={() => updateFilter('categorie', c.id)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${String(filter) === String(c.id) ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>{c.name}</button>
                ))}
              </div>
            </div>
              <div>
                <h3 className="font-semibold mb-3">Recherche</h3>
                <input type="text" placeholder="Rechercher..." value={searchInput} onChange={e => { setSearchInput(e.target.value); updateFilter('search', e.target.value) }} className="input-field text-sm w-full" />
              </div>
              <div className="lg:hidden pt-2 border-t border-gray-100">
                <button onClick={() => setShowFilters(false)} className="w-full btn-primary text-sm py-2">Appliquer <FiX className="inline" /></button>
              </div>
            </div>
          </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-gray-500">{offers.length} offre{offers.length > 1 ? 's' : ''} trouvée{offers.length > 1 ? 's' : ''}</p>
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-auto text-sm">
              <option value="">Trier par</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-lg">Chargement des offres...</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-16 text-gray-400"><p className="text-6xl mb-4">!</p><p className="text-lg">Aucune offre trouvée</p></div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {offers.map(offer => (
                  <Link key={offer.id} to={`/offres/${offer.slug}`} className="card group">
                    <div className="h-40 bg-gray-100 flex items-center justify-center text-white text-5xl overflow-hidden">
                      {offer.mainImage ? (
                        <img src={offer.mainImage} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-ocean-300 to-ocean-600 flex items-center justify-center">
                          <span className="group-hover:scale-110 transition-transform duration-500">{offer.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary-500 bg-primary-50 px-2 py-1 rounded-full">{offer.category?.name}</span>
                        {offer.originalPrice && <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Promo</span>}
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary-500 transition">{offer.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{offer.duration}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-ocean-600">{parseFloat(offer.price).toLocaleString()} Ar</span>
                        <span className="text-yellow-500 text-sm">★ {offer.rating || '-'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages && pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={!pagination.hasPreviousPage}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 border rounded-lg transition ${currentPage === page ? 'bg-primary-500 text-white border-primary-500' : 'hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
