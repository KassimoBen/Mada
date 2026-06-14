const rateLimit = require('express-rate-limit');

// Limiter global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limiter chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes de cette adresse IP, veuillez réessayer plus tard.',
  standardHeaders: true, // Retourner les informations de rate limit dans l'en-tête `RateLimit-*`
  legacyHeaders: false, // Désactiver l'en-tête `X-RateLimit-*`
});

// Limiter strict pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limiter à 5 tentatives
  message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.',
  skipSuccessfulRequests: true, // N'incrémenter que pour les requêtes échouées
});

// Limiter pour les uploads
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // Limiter à 20 uploads par heure
  message: 'Limite d\'uploads dépassée, veuillez réessayer plus tard.',
});

module.exports = { globalLimiter, authLimiter, uploadLimiter };
