const router = require('express').Router();
const ctrl = require('../controllers/paymentController');
const { auth } = require('../middleware/auth');

router.post('/create-checkout-session', auth, ctrl.createCheckoutSession);
router.get('/session/:sessionId/status', auth, ctrl.getSessionStatus);

module.exports = router;
