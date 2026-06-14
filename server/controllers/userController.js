const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { paginate, paginationMeta } = require('../utils/helpers');

exports.getAll = async (req, res) => {
  try {
    const { page, limit, role, isActive } = req.query;
    const { offset, limit: limitNum, page: pageNum } = paginate(page, limit, 100);

    const where = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      offset,
      limit: limitNum,
    });

    res.json({ data: users, pagination: paginationMeta(count, pageNum, limitNum) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.update({ isActive: !user.isActive });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email déjà utilisé' });
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email, password: hashed, role: 'admin' });
    res.status(201).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
