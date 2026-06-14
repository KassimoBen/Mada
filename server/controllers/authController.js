const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Cet email est déjà utilisé' });

    const hashed = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({ firstName, lastName, email, password: hashed, phone, verificationToken });

    console.log(`[EMAIL] Verification: ${CLIENT_URL}/verification?token=${verificationToken}`);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, isVerified: user.isVerified } });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    await req.user.update({ firstName, lastName, phone });
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de mise à jour' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { verificationToken: req.params.token } });
    if (!user) return res.status(400).json({ error: 'Lien de verification invalide' });
    await user.update({ isVerified: true, verificationToken: null });
    res.json({ message: 'Email verifie avec succes' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de verification' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ message: 'Si cet email existe, un lien de reinitialisation a ete envoye.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    await user.update({ resetToken, resetTokenExpiry });

    console.log(`[EMAIL] Reset password: ${CLIENT_URL}/reinitialisation?token=${resetToken}`);

    res.json({ message: 'Si cet email existe, un lien de reinitialisation a ete envoye.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la demande' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ error: 'Lien invalide ou expire' });
    }

    const hashed = await bcrypt.hash(password, 12);
    await user.update({ password: hashed, resetToken: null, resetTokenExpiry: null });

    res.json({ message: 'Mot de passe reinitialise avec succes' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de reinitialisation' });
  }
};
