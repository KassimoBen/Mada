// Configuration centralisée de l'application

export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'MadaHorizon',
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    OFFER_LIMIT: 12,
    ADMIN_LIMIT: 20,
  },

  // Validations
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 6,
    PHONE_MIN_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Délais
  TIMEOUTS: {
    API_TIMEOUT: 30000, // 30 secondes
    DEBOUNCE: 300,
    AUTO_DISMISS_ERROR: 5000, // 5 secondes
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

  // Messages
  MESSAGES: {
    ERROR_DEFAULT: 'Une erreur est survenue. Veuillez réessayer.',
    SUCCESS_LOGIN: 'Connexion réussie!',
    SUCCESS_LOGOUT: 'Déconnexion réussie.',
    SUCCESS_REGISTER: 'Inscription réussie!',
    ERROR_LOGIN: 'Email ou mot de passe incorrect.',
    ERROR_REGISTER: 'Erreur lors de l\'inscription.',
    ERROR_NETWORK: 'Erreur de connexion. Vérifiez votre internet.',
    CONFIRMATION: 'Êtes-vous sûr?',
  },
};

export default APP_CONFIG;
