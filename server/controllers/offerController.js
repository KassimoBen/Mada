const { Offer, Category, OfferImage, Review } = require('../models');
const { Op } = require('sequelize');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getAll = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, duration, sort, featured, page, limit } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit);
    
    const where = { isActive: true };
    if (featured === 'true') where.isFeatured = true;
    if (category) where.category_id = category;
    if (search) where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
      { destination: { [Op.like]: `%${search}%` } },
    ];
    if (minPrice) where.price = { ...where.price, [Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: maxPrice };
    if (duration) where.duration = { [Op.like]: `%${duration}%` };

    const order = sort === 'price_asc' ? [['price', 'ASC']]
      : sort === 'price_desc' ? [['price', 'DESC']]
      : sort === 'rating' ? [['rating', 'DESC']]
      : [['createdAt', 'DESC']];

    const { count, rows: offers } = await Offer.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
        { model: OfferImage, as: 'images', limit: 1 },
      ],
      order,
      offset,
      limit: limitNum,
    });

    res.json({
      data: offers,
      pagination: paginationMeta(count, pageNum, limitNum),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const offer = await Offer.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, as: 'category' },
        { model: OfferImage, as: 'images' },
        { model: Review, as: 'reviews', include: [{ model: require('../models').User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }] },
      ],
    });
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: OfferImage, as: 'images' },
      ],
    });
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.mainImage = '/uploads/' + req.file.filename;
    }
    const offer = await Offer.create(data);
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offre non trouvee' });
    const data = { ...req.body };
    if (req.file) {
      data.mainImage = '/uploads/' + req.file.filename;
    }
    await offer.update(data);
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier fourni' });
    const url = '/uploads/' + req.file.filename;
    if (req.body.offer_id) {
      await OfferImage.create({ offer_id: req.body.offer_id, url, alt: req.body.alt || '', isPrimary: req.body.isPrimary === 'true' });
    }
    res.json({ url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    await offer.destroy();
    res.json({ message: 'Offre supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
