const { NewsArticle } = require('../models');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getAll = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 50);

    const { count, rows: articles } = await NewsArticle.findAndCountAll({
      where: { isPublished: true },
      order: [['publishedAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: articles, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 100);

    const { count, rows: articles } = await NewsArticle.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: articles, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const article = await NewsArticle.findOne({ where: { slug: req.params.slug } });
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = '/uploads/' + req.file.filename;
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    const article = await NewsArticle.create(data);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    const data = { ...req.body };
    if (req.file) data.image = '/uploads/' + req.file.filename;
    if (data.isPublished && !article.publishedAt) data.publishedAt = new Date();
    await article.update(data);
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const article = await NewsArticle.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    await article.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
