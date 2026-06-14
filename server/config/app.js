// Configuration centralisée du serveur

module.exports = {
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  // JWT
  JWT: {
    EXPIRY: '7d',
    ALGORITHM: 'HS256',
  },

  // Bcrypt
  BCRYPT: {
    ROUNDS: 12,
  },

  // Rôles
  ROLES: {
    ADMIN: 'admin',
    CLIENT: 'client',
  },

  // Statuts
  BOOKING_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },

  PAYMENT_STATUS: {
    UNPAID: 'unpaid',
    PAID: 'paid',
    REFUNDED: 'refunded',
  },

  // Messages d'erreur
  ERRORS: {
    NOT_FOUND: 'Ressource non trouvée',
    UNAUTHORIZED: 'Authentification requise',
    FORBIDDEN: 'Accès refusé',
    VALIDATION_ERROR: 'Erreur de validation',
    INTERNAL_ERROR: 'Erreur serveur interne',
  },

  // Limites
  LIMITS: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_UPLOAD_FILES: 10,
    MAX_REQUEST_SIZE: '10mb',
  },
};
