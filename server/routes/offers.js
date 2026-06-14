const router = require('express').Router();
const ctrl = require('../controllers/offerController');
const { adminAuth } = require('../middleware/auth');
const { createOfferValidation, validate } = require('../middleware/validation');
const upload = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlug);
router.get('/id/:id', ctrl.getById);
router.post('/', adminAuth, upload.single('mainImage'), ctrl.create);
router.put('/:id', adminAuth, upload.single('mainImage'), ctrl.update);
router.post('/json', adminAuth, createOfferValidation, validate, ctrl.create);
router.put('/json/:id', adminAuth, createOfferValidation, validate, ctrl.update);
router.delete('/:id', adminAuth, ctrl.remove);
router.post('/upload', adminAuth, uploadLimiter, upload.single('image'), ctrl.uploadImage);

module.exports = router;
