const { Booking, Offer, User } = require('../models');
const { Op } = require('sequelize');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Offer, as: 'offer', attributes: ['id', 'title', 'slug', 'mainImage', 'duration'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { page, limit, status, paymentStatus } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 100);

    const where = {};
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const { count, rows: bookings } = await Booking.findAndCountAll({
      where,
      include: [
        { model: Offer, as: 'offer', attributes: ['id', 'title', 'slug', 'mainImage'] },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] },
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: bookings, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { offerId, startDate, endDate, participants, specialRequests, contactPhone } = req.body;
    const offer = await Offer.findByPk(offerId);
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });

    const totalPrice = parseFloat(offer.price) * parseInt(participants);
    const reference = 'MDH-' + Date.now().toString(36).toUpperCase();

    const booking = await Booking.create({
      reference,
      offer_id: offerId,
      user_id: req.user.id,
      startDate,
      endDate,
      participants,
      totalPrice,
      specialRequests,
      contactPhone,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Réservation non trouvée' });
    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Reservation non trouvee' });
    if (booking.user_id !== req.user.id) return res.status(403).json({ error: 'Acces interdit' });
    if (booking.status === 'cancelled') return res.status(400).json({ error: 'Deja annulee' });
    if (booking.paymentStatus === 'paid') return res.status(400).json({ error: 'Impossible d\'annuler une reservation payee. Contactez l\'administration.' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Booking.count();
    const confirmed = await Booking.count({ where: { status: 'confirmed' } });
    const pending = await Booking.count({ where: { status: 'pending' } });
    const cancelled = await Booking.count({ where: { status: 'cancelled' } });
    const revenue = await Booking.sum('totalPrice', { where: { paymentStatus: 'paid' } });
    res.json({ total, confirmed, pending, cancelled, revenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
