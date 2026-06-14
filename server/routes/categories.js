const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const { adminAuth } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.post('/', adminAuth, ctrl.create);
router.put('/:id', adminAuth, ctrl.update);
router.delete('/:id', adminAuth, ctrl.remove);

module.exports = router;
