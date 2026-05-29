
const router = require('express').Router();
const ctrl = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');
const { verificarAdmin } = require('../controllers/admin.controller');

router.get('/utilizadores',              auth, verificarAdmin, ctrl.listarUtilizadores);
router.put('/utilizadores/:id/estado',   auth, verificarAdmin, ctrl.atualizarEstadoUtilizador);
router.get('/empresas',                  auth, verificarAdmin, ctrl.listarEmpresas);
router.get('/organizacoes',              auth, verificarAdmin, ctrl.listarOrganizacoes);
router.get('/vagas',                     auth, verificarAdmin, ctrl.listarVagas);
router.delete('/vagas/:id',              auth, verificarAdmin, ctrl.eliminarVaga);
router.get('/estatisticas',              auth, verificarAdmin, ctrl.estatisticas);
router.get('/candidaturas',              auth, verificarAdmin, ctrl.listarCandidaturas);

module.exports = router;