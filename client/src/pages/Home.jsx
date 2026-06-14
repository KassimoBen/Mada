import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../context/api'
import { FiArrowRight, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi'

export default function Home() {
  const [offers, setOffers] = useState([])
  const [news, setNews] = useState([])
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/offers?featured=true').then(d => setOffers(Array.isArray(d) ? d : d.data || [])).catch(() => {})
    api.get('/news').then(d => setNews(Array.isArray(d) ? d : d.data || [])).catch(() => {})
    api.get('/categories').then(d => setCategories(Array.isArray(d) ? d : d.data || [])).catch(() => {})
  }, [])

  const catIcons = {}

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-primary-800 to-ocean-800 animate-gradient-shift opacity-90" style={{backgroundSize: '200% 200%'}} />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-ocean-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-down mb-6">
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-200 rounded-full text-sm font-semibold border border-primary-400/30">Découvrez la magie de Madagascar</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 animate-slide-up">
            Voyagez au Cœur de l'<span className="gradient-text">Île Rouge</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Explorez des paysages à couper le souffle, des plages paradisiaques et une culture riche. MadaHorizon vous offre les meilleures expériences touristiques.
          </p>

          {/* Advanced Search Box */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-2xl">
              <form onSubmit={e => e.preventDefault()} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <FiMapPin className="absolute left-4 top-4 text-gray-300 text-xl" />
                  <input 
                    type="text" 
                    placeholder="Destination..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:bg-white/10 focus:border-primary-300 transition-all"
                  />
                </div>
                <Link to={`/offres?search=${search}`} className="btn-primary flex items-center justify-center gap-2 px-8 md:px-12">
                  Rechercher <FiArrowRight className="text-lg" />
                </Link>
              </form>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
            {categories.map(c => (
              <Link 
                key={c.id} 
                to={`/offres?categorie=${c.id}`} 
                className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all duration-300 border border-white/20 hover:border-primary-300 hover:shadow-lg"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Features */}
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi choisir MadaHorizon ?</h2>
            <p className="section-subtitle">L'excellence en tourisme à Madagascar</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: 'Globe', title: 'Destinations Premium', desc: 'Les plus beaux endroits de Madagascar' },
              { icon: 'Group', title: 'Guides Experts', desc: 'Professionnels passionnés par leur pays' },
              { icon: 'Star', title: '4.9/5 Avis', desc: 'Satisfaction clients garantie' },
              { icon: 'Card', title: 'Paiement Sécurisé', desc: 'Réservation en toute confiance' }
            ].map((feature, i) => (
              <div key={i} className="card p-8 text-center hover:shadow-glow-primary group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-2xl text-primary-600 font-bold group-hover:scale-110 transition-transform duration-300">{feature.icon === 'Globe' ? 'G' : feature.icon === 'Group' ? 'U' : feature.icon === 'Star' ? 'S' : 'P'}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Catégories</h2>
            <p className="section-subtitle">Trouvez l'expérience parfaite pour vous</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((c, idx) => (
              <Link key={c.id} to={`/offres?categorie=${c.id}`} className="group relative overflow-hidden rounded-2xl">
                <div className={`h-48 md:h-64 bg-gradient-to-br p-4 md:p-6 rounded-2xl transition-all duration-500 flex flex-col justify-between ${
                  idx === 0 ? 'from-primary-400 to-primary-600' :
                  idx === 1 ? 'from-ocean-400 to-ocean-600' :
                  idx === 2 ? 'from-green-400 to-green-600' :
                  'from-yellow-400 to-yellow-600'
                } text-white shadow-lg group-hover:shadow-glow-lg group-hover:-translate-y-2`}>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center text-xl md:text-2xl font-bold group-hover:scale-110 transition-transform duration-300">{c.name.charAt(0)}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{c.name}</h3>
                    <p className="text-white/90 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{c.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers - Improved */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="section-title">Offres Exclusives</h2>
              <p className="section-subtitle">Nos destinations les plus populaires</p>
            </div>
            <Link to="/offres" className="btn-outline text-sm hidden sm:inline-flex items-center gap-2">
              Voir tous <FiArrowRight />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.slice(0, 6).map((offer, idx) => (
              <Link key={offer.id} to={`/offres/${offer.slug}`} className="card group overflow-hidden animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {offer.mainImage ? (
                    <img src={offer.mainImage} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center text-white text-6xl font-bold ${
                      idx % 3 === 0 ? 'from-primary-400 to-primary-600' :
                      idx % 3 === 1 ? 'from-ocean-400 to-ocean-600' :
                      'from-green-400 to-green-600'
                    }`}>
                      {offer.title.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-full">{offer.category?.name}</span>
                    {offer.originalPrice && (
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        -{Math.round((1 - offer.price / offer.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {offer.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1"><FiCalendar className="text-primary-500" /> {offer.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {offer.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mr-2">{offer.originalPrice.toLocaleString()} Ar</span>
                      )}
                      <span className="text-xl font-bold gradient-text">{parseFloat(offer.price).toLocaleString()} Ar</span>
                    </div>
                    <span className="text-yellow-500 font-bold">★ {(offer.rating || 4.9).toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:hidden">
            <Link to="/offres" className="btn-primary">Voir tous les offres</Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 via-ocean-600 to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { number: '50+', label: 'Destinations' },
              { number: '5000+', label: 'Clients Heureux' },
              { number: '10+', label: 'Années d\'Expérience' },
              { number: '4.9★', label: 'Note Moyenne' }
            ].map((stat, i) => (
              <div key={i} className="animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="text-5xl md:text-6xl font-bold mb-2 gradient-text">{stat.number}</div>
                <div className="text-white/90 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Avis de nos Voyageurs</h2>
            <p className="section-subtitle">Des expériences inoubliables partagées par nos clients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stars: 5, text: "Circuit incroyable ! Les paysages sont magiques et notre guide était fantastique.", author: "Jean Rakoto" },
              { stars: 5, text: "Séjour à Nosy Be parfait ! Plages magnifiques et accueil chaleureux. À recommander !", author: "Marie Dupont" },
              { stars: 5, text: "Excursion inoubliable avec les lémuriens. Une véritable connexion avec la nature.", author: "Pierre Martin" }
            ].map((testimonial, i) => (
              <div key={i} className="card p-8 group hover:shadow-glow-primary relative">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full gradient-text font-bold flex items-center justify-center bg-primary-100">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">Voyageur MadaHorizon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      {news.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title">Actualités Madagascar</h2>
              <p className="section-subtitle">Restez informé des dernières nouvelles du tourisme</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {news.slice(0, 3).map((article, idx) => (
                <div key={article.id} className="card overflow-hidden group animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    {article.image ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-5xl text-white font-bold">
                        {article.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary-600 font-semibold mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <Link to={`/actualites/${article.slug}`} className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center gap-2 transition-colors">
                      Lire plus <FiArrowRight className="text-lg" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Premium */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary-600 via-primary-700 to-ocean-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            Prêt pour <span className="text-yellow-300">l'Aventure</span> ?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Réservez votre voyage à Madagascar dès maintenant et vivez une expérience inoubliable. Nos équipes sont prêtes à vous accueillir !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/offres" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 flex items-center justify-center gap-2 text-lg px-8 py-4">
              Découvrir nos offres <FiArrowRight />
            </Link>
            <Link to="/inscription" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 flex items-center justify-center gap-2 text-lg px-8 py-4">
              S'inscrire maintenant <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
