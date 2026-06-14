const router = require('express').Router();
const ctrl = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');
const { createBookingValidation, validate } = require('../middleware/validation');

router.get('/', adminAuth, ctrl.getAll);
router.get('/stats', adminAuth, ctrl.getStats);
router.get('/mine', auth, ctrl.getUserBookings);
router.post('/', auth, createBookingValidation, validate, ctrl.create);
router.put('/:id', adminAuth, ctrl.updateStatus);
router.put('/:id/cancel', auth, ctrl.cancel);

module.exports = router;
