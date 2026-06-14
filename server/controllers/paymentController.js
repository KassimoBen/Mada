const { Booking, Offer } = require('../models');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

let _stripe = null;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key === 'sk_test_placeholder') {
      throw new Error('Stripe non configure. Definissez STRIPE_SECRET_KEY dans .env');
    }
    _stripe = require('stripe')(key);
  }
  return _stripe;
}

exports.createCheckoutSession = async (req, res) => {
  try {
    const { bookingId, offerId, startDate, endDate, participants, specialRequests, contactPhone } = req.body;

    let booking, offer, firstName, lastName;

    if (bookingId) {
      booking = await Booking.findByPk(bookingId, { include: [{ model: Offer, as: 'offer' }] });
      if (!booking) return res.status(404).json({ error: 'Reservation non trouvee' });
      if (booking.user_id !== req.user.id) return res.status(403).json({ error: 'Acces interdit' });
      if (booking.paymentStatus === 'paid') return res.status(400).json({ error: 'Deja paye' });
      offer = booking.offer;
      firstName = req.user.firstName;
      lastName = req.user.lastName;
    } else {
      offer = await Offer.findByPk(offerId);
      if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });

      const totalPrice = parseFloat(offer.price) * parseInt(participants);
      const reference = 'MDH-' + Date.now().toString(36).toUpperCase();

      booking = await Booking.create({
        reference, offer_id: offerId, user_id: req.user.id, startDate, endDate,
        participants, totalPrice, specialRequests, contactPhone,
        status: 'pending', paymentStatus: 'unpaid',
      });

      firstName = req.user.firstName;
      lastName = req.user.lastName;
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      client_reference_id: String(booking.id),
      customer_email: req.user.email,
      metadata: { booking_id: String(booking.id) },
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${offer.title} - ${firstName} ${lastName}`,
            description: `${offer.duration} - ${booking.participants} participant(s) - Ref: ${booking.reference}`,
          },
          unit_amount: Math.round(parseFloat(booking.totalPrice) * 100),
        },
        quantity: 1,
      }],
      success_url: `${CLIENT_URL}/paiement/succes?session_id={CHECKOUT_SESSION_ID}&reference=${booking.reference}`,
      cancel_url: `${CLIENT_URL}/paiement/annule?reference=${booking.reference}`,
    });

    res.json({ url: session.url, sessionId: session.id, reference: booking.reference });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionStatus = async (req, res) => {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const booking = await Booking.findByPk(session.metadata.booking_id);

    if (session.payment_status === 'paid' && booking && booking.paymentStatus !== 'paid') {
      booking.paymentStatus = 'paid';
      booking.status = 'confirmed';
      await booking.save();
    }

    res.json({
      status: session.payment_status,
      bookingId: session.metadata.booking_id,
      reference: booking?.reference,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret || endpointSecret === 'whsec_placeholder') {
    return res.status(400).json({ error: 'Webhook secret non configure' });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.booking_id;
    if (bookingId) {
      try {
        const booking = await Booking.findByPk(bookingId);
        if (booking) {
          booking.paymentStatus = 'paid';
          booking.status = 'confirmed';
          await booking.save();
        }
      } catch (err) {
        console.error('Webhook booking update failed:', err);
      }
    }
  }

  res.json({ received: true });
};
