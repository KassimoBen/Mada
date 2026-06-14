const router = require('express').Router();
const ctrl = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { registerValidation, loginValidation, updateProfileValidation, validate } = require('../middleware/validation');

router.post('/register', registerValidation, validate, ctrl.register);
router.post('/login', loginValidation, validate, ctrl.login);
router.get('/me', auth, ctrl.me);
router.put('/profile', auth, updateProfileValidation, validate, ctrl.updateProfile);
router.get('/verify/:token', ctrl.verifyEmail);
router.post('/forgot-password', ctrl.forgotPassword);
router.post('/reset-password', ctrl.resetPassword);

module.exports = router;
