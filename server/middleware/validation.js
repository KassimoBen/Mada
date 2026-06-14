const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation échouée', 
      details: errors.array().map(e => ({ field: e.param, message: e.msg }))
    });
  }
  next();
};

const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('Le prénom est requis'),
  body('lastName').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit avoir au moins 6 caractères'),
  body('phone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
];

const updateProfileValidation = [
  body('firstName').trim().notEmpty().withMessage('Le prénom est requis'),
  body('lastName').trim().notEmpty().withMessage('Le nom est requis'),
  body('phone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide'),
];

const createOfferValidation = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('slug').trim().notEmpty().withMessage('Le slug est requis'),
  body('description').trim().notEmpty().withMessage('La description est requise'),
  body('duration').trim().notEmpty().withMessage('La durée est requise'),
  body('price').isDecimal().withMessage('Le prix doit être un nombre'),
  body('category_id').isInt().withMessage('La catégorie est requise'),
];

const createBookingValidation = [
  body('offerId').isInt().withMessage('L\'offre est requise'),
  body('startDate').isISO8601().withMessage('Date de début invalide'),
  body('endDate').isISO8601().withMessage('Date de fin invalide'),
  body('participants').isInt({ min: 1 }).withMessage('Au moins 1 participant requis'),
  body('contactPhone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide'),
];

const createReviewValidation = [
  body('offer_id').isInt().withMessage('L\'offre est requise'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Note entre 1 et 5 requise'),
  body('comment').trim().notEmpty().withMessage('Le commentaire est requis'),
];

const createContactValidation = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Le sujet est requis'),
  body('message').trim().notEmpty().withMessage('Le message est requis'),
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  updateProfileValidation,
  createOfferValidation,
  createBookingValidation,
  createReviewValidation,
  createContactValidation,
};
