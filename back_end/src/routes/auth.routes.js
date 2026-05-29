const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/registo',          ctrl.registo);
router.get('/verificar/:token',  ctrl.verificarEmail);
router.post('/login',            ctrl.login);

module.exports = router;