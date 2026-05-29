const router = require('express').Router();
const ctrl = require('../controllers/candidatura.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',                    auth, ctrl.candidatar);
router.get('/minhas',               auth, ctrl.minhas);
router.get('/vaga/:vaga_id',        auth, ctrl.porVaga);
router.put('/:id/estado',           auth, ctrl.atualizarEstado);

module.exports = router;