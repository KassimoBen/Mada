const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { adminAuth } = require('../middleware/auth');

router.get('/', adminAuth, ctrl.getAll);
router.put('/:id/toggle', adminAuth, ctrl.toggleActive);
router.post('/admin', adminAuth, ctrl.createAdmin);

module.exports = router;
