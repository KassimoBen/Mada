const { ContactMessage } = require('../models');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getAll = async (req, res) => {
  try {
    const { page, limit, isRead } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 100);

    const where = {};
    if (isRead !== undefined) where.isRead = isRead === 'true';

    const { count, rows: messages } = await ContactMessage.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: messages, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const msg = await ContactMessage.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouvé' });
    await msg.update({ isRead: true });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouvé' });
    await msg.destroy();
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
