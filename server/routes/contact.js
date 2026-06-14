const router = require('express').Router();
const ctrl = require('../controllers/contactController');
const { adminAuth } = require('../middleware/auth');
const { createContactValidation, validate } = require('../middleware/validation');

router.get('/', adminAuth, ctrl.getAll);
router.post('/', createContactValidation, validate, ctrl.create);
router.put('/:id/read', adminAuth, ctrl.markRead);
router.delete('/:id', adminAuth, ctrl.remove);

module.exports = router;
