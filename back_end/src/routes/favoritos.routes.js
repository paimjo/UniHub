const router = require('express').Router();
const ctrl = require('../controllers/favoritos.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',              auth, ctrl.guardar);
router.get('/',               auth, ctrl.listar);
router.delete('/:vaga_id',    auth, ctrl.remover);

module.exports = router;