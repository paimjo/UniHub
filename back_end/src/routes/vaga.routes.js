const router = require('express').Router();
const ctrl = require('../controllers/vaga.controller');
const auth = require('../middleware/auth.middleware');

router.get('/',          ctrl.listar);
router.get('/minhas',    auth, ctrl.minhas);
router.get('/:id',       ctrl.detalhe);
router.post('/',         auth, ctrl.criar);
router.put('/:id',       auth, ctrl.editar);
router.delete('/:id',    auth, ctrl.eliminar);

module.exports = router;