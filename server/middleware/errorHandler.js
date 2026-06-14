const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erreur de validation',
      details: err.errors.map(e => ({ field: e.path, message: e.message })),
    });
  }

  // Unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Cette valeur existe déjà',
      details: err.errors.map(e => ({ field: e.path, message: e.message })),
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token invalide' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expiré' });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Une erreur serveur est survenue',
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, asyncHandler };
