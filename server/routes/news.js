const router = require('express').Router();
const ctrl = require('../controllers/newsController');
const { adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { body, validationResult } = require('express-validator');

const newsValidation = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('slug').trim().notEmpty().withMessage('Le slug est requis'),
  body('content').trim().notEmpty().withMessage('Le contenu est requis'),
];

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

router.get('/', ctrl.getAll);
router.get('/admin', adminAuth, ctrl.getAllAdmin);
router.get('/:slug', ctrl.getBySlug);
router.post('/', adminAuth, upload.single('image'), newsValidation, validate, ctrl.create);
router.put('/:id', adminAuth, upload.single('image'), newsValidation, validate, ctrl.update);
router.delete('/:id', adminAuth, ctrl.remove);

module.exports = router;
