const router = require('express').Router();
const ctrl = require('../controllers/notificacao.controller');
const auth = require('../middleware/auth.middleware');

router.get('/',              auth, ctrl.listar);
router.get('/nao-lidas',     auth, ctrl.contarNaoLidas);
router.put('/lidas',         auth, ctrl.marcarTodasLidas);
router.put('/:id/lida',      auth, ctrl.marcarLida);

module.exports = router;