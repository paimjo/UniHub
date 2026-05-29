const router = require('express').Router();
const ctrl = require('../controllers/chat.controller');
const auth = require('../middleware/auth.middleware');

router.post('/',           auth, ctrl.enviar);
router.get('/',            auth, ctrl.listar);
router.get('/:outro_id',   auth, ctrl.conversa);

module.exports = router;