const router = require('express').Router();
const ctrl = require('../controllers/utilizador.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/perfil',       auth, ctrl.verPerfil);
router.put('/perfil',       auth, ctrl.editarPerfil);
router.put('/password',     auth, ctrl.alterarPassword);
router.post('/foto',        auth, upload.single('foto'), ctrl.uploadFoto);
router.post('/cv',          auth, upload.single('cv'), ctrl.uploadCV);

module.exports = router;