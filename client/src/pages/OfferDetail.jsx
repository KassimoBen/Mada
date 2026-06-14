import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../context/api'

export default function OfferDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({ startDate: '', endDate: '', participants: 1, specialRequests: '' })
  const [bookingMsg, setBookingMsg] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [reviewMsg, setReviewMsg] = useState('')

  useEffect(() => {
    api.get(`/offers/${slug}`).then(data => {
      setOffer(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  const handlePaymentBooking = async (e) => {
    e.preventDefault()
    if (!user) { setBookingMsg('Veuillez vous connecter pour reserver'); return }
    setPaymentLoading(true)
    setBookingMsg('')
    try {
      const res = await api.post('/payments/create-checkout-session', { offerId: offer.id, ...booking })
      window.location.href = res.url
    } catch (err) {
      setBookingMsg(err.message || 'Erreur lors de la creation du paiement')
      setPaymentLoading(false)
    }
  }

  const handleFreeBooking = async (e) => {
    e.preventDefault()
    if (!user) { setBookingMsg('Veuillez vous connecter pour reserver'); return }
    setBookingLoading(true)
    setBookingMsg('')
    try {
      const res = await api.post('/bookings', { offerId: offer.id, ...booking })
      setBookingMsg(`Reservation confirmee ! Ref: ${res.reference}. Vous pouvez payer plus tard depuis votre compte.`)
    } catch (err) {
      setBookingMsg(err.message || 'Erreur lors de la reservation')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) return <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>
  if (!offer) return <div className="text-center py-20 text-gray-400"><p className="text-6xl mb-4">?</p><p>Offre non trouvée</p></div>

  const itinerary = offer.itinerary ? offer.itinerary.split('\n').filter(Boolean) : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/offres" className="text-ocean-500 hover:text-ocean-600 mb-6 inline-block">← Retour aux offres</Link>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="h-64 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center text-white text-8xl font-bold mb-6 overflow-hidden">
            {offer.mainImage ? (
              <img src={offer.mainImage} alt={offer.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ocean-300 to-ocean-600 flex items-center justify-center">M</div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-primary-500 bg-primary-50 px-3 py-1 rounded-full">{offer.category?.name}</span>
            <span className="text-sm text-gray-500">{offer.duration}</span>
            <span className="text-yellow-500 ml-auto">★ {offer.rating || '-'} ({offer.reviewCount || 0} avis)</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{offer.title}</h1>
          <p className="text-gray-600 mb-6">{offer.description}</p>

          {offer.included && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-green-600">Inclus</h3>
              <p className="text-gray-600 text-sm">{offer.included}</p>
            </div>
          )}
          {offer.excluded && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-red-600">Non inclus</h3>
              <p className="text-gray-600 text-sm">{offer.excluded}</p>
            </div>
          )}

          {itinerary.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Itinéraire</h3>
              <div className="space-y-3">
                {itinerary.map((step, i) => {
                  const match = step.match(/^Jour\s*\d+/i)
                  const title = match ? match[0] : `Étape ${i + 1}`
                  const desc = step.replace(/^Jour\s*\d+:\s*/i, '')
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-ocean-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                        {i < itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                      </div>
                      <div className="pb-6"><p className="font-semibold">{title}</p><p className="text-sm text-gray-600">{desc}</p></div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Avis clients</h3>
            {offer.reviews?.length > 0 ? (
              <div className="space-y-4 mb-8">
                {offer.reviews.map(r => (
                  <div key={r.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                      <span className="font-medium text-sm">{r.user?.firstName} {r.user?.lastName}</span>
                    </div>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mb-8">Aucun avis pour le moment</p>
            )}

            {user ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Donner votre avis</h4>
                {reviewMsg && <p className={`text-sm mb-3 ${reviewMsg.includes('Merci') ? 'text-green-600' : 'text-red-500'}`}>{reviewMsg}</p>}
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    await api.post('/reviews', { offer_id: offer.id, rating: reviewForm.rating, comment: reviewForm.comment })
                    setReviewMsg('Merci pour votre avis ! Il sera visible apres approbation.')
                    setReviewForm({ rating: 5, comment: '' })
                  } catch (err) {
                    setReviewMsg(err.message)
                  }
                }} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Note:</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: n })} className={`text-2xl ${n <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition`}>
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea rows={3} placeholder="Votre commentaire..." value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} className="input-field" required />
                  <button type="submit" className="btn-primary text-sm">Envoyer mon avis</button>
                </form>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Connectez-vous pour laisser un avis.</p>
            )}
          </div>
        </div>

        {/* Booking sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <div className="mb-6">
              {offer.originalPrice && <p className="text-sm text-gray-400 line-through">{offer.originalPrice.toLocaleString()} Ar</p>}
              <p className="text-3xl font-bold text-ocean-600">{parseFloat(offer.price).toLocaleString()} Ar</p>
              <p className="text-sm text-gray-500">par personne</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date d'arrivée</label>
                <input type="date" required value={booking.startDate} onChange={e => setBooking({ ...booking, startDate: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date de départ</label>
                <input type="date" required value={booking.endDate} onChange={e => setBooking({ ...booking, endDate: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Participants</label>
                <input type="number" min={1} max={offer.maxParticipants} value={booking.participants} onChange={e => setBooking({ ...booking, participants: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Demandes spéciales</label>
                <textarea rows={3} value={booking.specialRequests} onChange={e => setBooking({ ...booking, specialRequests: e.target.value })} className="input-field" placeholder="Options, allergies..." />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm"><span>Prix unitaire</span><span>{parseFloat(offer.price).toLocaleString()} Ar</span></div>
                <div className="flex justify-between text-sm"><span>Participants</span><span>{booking.participants || 1}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t"><span>Total</span><span>{(parseFloat(offer.price) * (booking.participants || 1)).toLocaleString()} Ar</span></div>
              </div>

              <div className="flex flex-col gap-2">
                <button type="button" disabled={paymentLoading} onClick={handlePaymentBooking} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-3">
                  {paymentLoading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Redirection vers le paiement...</>
                  ) : (
                    'Reserver et payer par carte'
                  )}
                </button>
                <button type="button" disabled={bookingLoading} onClick={handleFreeBooking} className="btn-outline w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2">
                  {bookingLoading ? 'Reservation en cours...' : 'Reserver sans payer'}
                </button>
              </div>
              {bookingMsg && <p className={`text-sm text-center ${bookingMsg.includes('Ref') ? 'text-green-600' : 'text-red-500'}`}>{bookingMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
