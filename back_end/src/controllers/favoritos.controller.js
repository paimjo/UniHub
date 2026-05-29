const pool = require('../config/db');

// POST /api/favoritos — guardar vaga nos favoritos
exports.guardar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { vaga_id } = req.body;

    try {
        const [existe] = await pool.query(
            'SELECT fav_id FROM favoritos WHERE uti_id = ? AND vaga_id = ?',
            [uti_id, vaga_id]
        );
        if (existe.length > 0) {
            return res.status(400).json({ erro: 'Vaga ja guardada nos favoritos' });
        }
        await pool.query(
            'INSERT INTO favoritos (uti_id, vaga_id) VALUES (?,?)',
            [uti_id, vaga_id]
        );
        res.status(201).json({ mensagem: 'Vaga guardada nos favoritos' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/favoritos — listar favoritos do estudante
exports.listar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { tipo } = req.query;

    let sql = `
    SELECT f.*, v.titulo, v.tipo, v.regime, v.cidade, v.estado,
      e.nome_empresa, e.logo_url AS logo_empresa,
      o.nome AS nome_organizacao, o.logo_url AS logo_organizacao
    FROM favoritos f
    JOIN vaga v ON f.vaga_id = v.vaga_id
    LEFT JOIN empresa e ON v.emp_id = e.emp_id
    LEFT JOIN organizacao o ON v.org_id = o.org_id
    WHERE f.uti_id = ?
  `;
    const params = [uti_id];

    if (tipo) { sql += ' AND v.tipo = ?'; params.push(tipo); }
    sql += ' ORDER BY f.data_guardado DESC';

    try {
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// DELETE /api/favoritos/:vaga_id — remover vaga dos favoritos
exports.remover = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        await pool.query(
            'DELETE FROM favoritos WHERE uti_id = ? AND vaga_id = ?',
            [uti_id, req.params.vaga_id]
        );
        res.json({ mensagem: 'Vaga removida dos favoritos' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};