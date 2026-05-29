const pool = require('../config/db');

// GET /api/notificacao — listar notificacoes do utilizador
exports.listar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { lida } = req.query;

    let sql = 'SELECT * FROM notificacao WHERE uti_id = ?';
    const params = [uti_id];

    if (lida !== undefined) {
        sql += ' AND lida = ?';
        params.push(lida === 'true' ? 1 : 0);
    }

    sql += ' ORDER BY criado_em DESC';

    try {
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/notificacao/:id/lida — marcar notificacao como lida
exports.marcarLida = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        await pool.query(
            'UPDATE notificacao SET lida = 1 WHERE notif_id = ? AND uti_id = ?',
            [req.params.id, uti_id]
        );
        res.json({ mensagem: 'Notificacao marcada como lida' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/notificacao/lidas — marcar todas como lidas
exports.marcarTodasLidas = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        await pool.query(
            'UPDATE notificacao SET lida = 1 WHERE uti_id = ?',
            [uti_id]
        );
        res.json({ mensagem: 'Todas as notificacoes marcadas como lidas' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/notificacao/nao-lidas — contar notificacoes nao lidas
exports.contarNaoLidas = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            'SELECT COUNT(*) AS total FROM notificacao WHERE uti_id = ? AND lida = 0',
            [uti_id]
        );
        res.json({ total: rows[0].total });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};