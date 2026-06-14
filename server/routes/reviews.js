const router = require('express').Router();
const ctrl = require('../controllers/reviewController');
const { auth, adminAuth } = require('../middleware/auth');
const { createReviewValidation, validate } = require('../middleware/validation');

router.get('/offer/:offerId', ctrl.getByOffer);
router.get('/', adminAuth, ctrl.getAll);
router.post('/', auth, createReviewValidation, validate, ctrl.create);
router.put('/:id/approve', adminAuth, ctrl.approve);
router.delete('/:id', adminAuth, ctrl.remove);

module.exports = router;
