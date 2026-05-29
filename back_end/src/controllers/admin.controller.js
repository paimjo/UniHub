const pool = require('../config/db');

// Middleware para verificar se é admin
const verificarAdmin = (req, res, next) => {
    if (req.utilizador.tipo !== 'ADMIN') {
        return res.status(403).json({ erro: 'Acesso negado. Apenas admins.' });
    }
    next();
};

// GET /api/admin/utilizadores
exports.listarUtilizadores = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT uti_id, nome, email, tipo_email, tipo_utilizador, 
             estado, verificado, criado_em 
             FROM utilizador 
             ORDER BY criado_em DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/admin/utilizadores/:id/estado
exports.atualizarEstadoUtilizador = async (req, res) => {
    const { estado } = req.body;
    try {
        await pool.query(
            'UPDATE utilizador SET estado = ? WHERE uti_id = ?',
            [estado, req.params.id]
        );
        res.json({ mensagem: 'Estado do utilizador atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/empresas
exports.listarEmpresas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT e.*, u.nome, u.email FROM empresa e
             JOIN utilizador u ON e.uti_id = u.uti_id
             ORDER BY e.emp_id DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/organizacoes
exports.listarOrganizacoes = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT o.*, u.nome, u.email FROM organizacao o
             JOIN utilizador u ON o.uti_id = u.uti_id
             ORDER BY o.org_id DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/vagas
exports.listarVagas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT v.*, 
             e.nome_empresa, o.nome AS nome_organizacao
             FROM vaga v
             LEFT JOIN empresa e ON v.emp_id = e.emp_id
             LEFT JOIN organizacao o ON v.org_id = o.org_id
             ORDER BY v.data_publicacao DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// DELETE /api/admin/vagas/:id
exports.eliminarVaga = async (req, res) => {
    try {
        await pool.query('DELETE FROM vaga WHERE vaga_id = ?', [req.params.id]);
        res.json({ mensagem: 'Vaga eliminada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/candidaturas — NOVO
exports.listarCandidaturas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT c.cand_id, c.uti_id, c.vaga_id, c.estado, c.data_candidatura,
             u.nome, u.email,
             v.titulo,
             e.nome_empresa,
             o.nome AS nome_organizacao
             FROM candidatura c
             JOIN utilizador u ON c.uti_id = u.uti_id
             JOIN vaga v ON c.vaga_id = v.vaga_id
             LEFT JOIN empresa e ON v.emp_id = e.emp_id
             LEFT JOIN organizacao o ON v.org_id = o.org_id
             ORDER BY c.data_candidatura DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/perfis — NOVO (para estatísticas de idade)
exports.listarPerfis = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.*, u.nome, u.email, u.tipo_utilizador
             FROM perfil p
             JOIN utilizador u ON p.uti_id = u.uti_id
             ORDER BY p.uti_id DESC`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/admin/estatisticas
exports.estatisticas = async (req, res) => {
    try {
        const [[utilizadores]] = await pool.query('SELECT COUNT(*) AS total FROM utilizador');
        const [[estudantes]]   = await pool.query("SELECT COUNT(*) AS total FROM utilizador WHERE tipo_utilizador = 'ESTUDANTE'");
        const [[empresas]]     = await pool.query('SELECT COUNT(*) AS total FROM empresa');
        const [[organizacoes]] = await pool.query('SELECT COUNT(*) AS total FROM organizacao');
        const [[vagas]]        = await pool.query('SELECT COUNT(*) AS total FROM vaga');
        const [[candidaturas]] = await pool.query('SELECT COUNT(*) AS total FROM candidatura');

        res.json({
            utilizadores: utilizadores.total,
            estudantes: estudantes.total,
            empresas: empresas.total,
            organizacoes: organizacoes.total,
            vagas: vagas.total,
            candidaturas: candidaturas.total
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

module.exports = {
    verificarAdmin,
    listarUtilizadores:        exports.listarUtilizadores,
    atualizarEstadoUtilizador: exports.atualizarEstadoUtilizador,
    listarEmpresas:            exports.listarEmpresas,
    listarOrganizacoes:        exports.listarOrganizacoes,
    listarVagas:               exports.listarVagas,
    eliminarVaga:              exports.eliminarVaga,
    listarCandidaturas:        exports.listarCandidaturas,
    listarPerfis:              exports.listarPerfis,
    estatisticas:              exports.estatisticas,
};