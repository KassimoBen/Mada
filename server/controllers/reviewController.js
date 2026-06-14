const { Review, User, Offer } = require('../models');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getByOffer = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { offer_id: req.params.offerId, isApproved: true },
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, user_id: req.user.id });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { page, limit, isApproved } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 100);

    const where = {};
    if (isApproved !== undefined) where.isApproved = isApproved === 'true';

    const { count, rows: reviews } = await Review.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Offer, as: 'offer', attributes: ['id', 'title', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: reviews, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });
    await review.update({ isApproved: true });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });
    await review.destroy();
    res.json({ message: 'Avis supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
