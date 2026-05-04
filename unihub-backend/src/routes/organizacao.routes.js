const router = require('express').Router();
const ctrl = require('../controllers/organizacao.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',  auth, ctrl.criar);
router.get('/',   auth, ctrl.ver);
router.put('/',   auth, ctrl.editar);

module.exports = router;