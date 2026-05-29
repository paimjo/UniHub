const pool = require('../config/db');

exports.criar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        descricao, genero, data_nascimento, nacionalidade,
        numero_identificacao, contacto, morada, instituicao_ensino,
        curso, licenciatura_concluida, data_prevista_conclusao
    } = req.body;

    try {
        const [existe] = await pool.query(
            'SELECT perfil_id FROM perfil WHERE uti_id = ?', [uti_id]
        );
        if (existe.length > 0) {
            return res.status(400).json({ erro: 'Perfil ja existe' });
        }
        const [result] = await pool.query(
            `INSERT INTO perfil
             (uti_id, descricao, genero, data_nascimento, nacionalidade,
              numero_identificacao, contacto, morada, instituicao_ensino,
              curso, licenciatura_concluida, data_prevista_conclusao)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [uti_id, descricao, genero, data_nascimento, nacionalidade,
                numero_identificacao, contacto, morada, instituicao_ensino,
                curso, licenciatura_concluida, data_prevista_conclusao]
        );
        res.status(201).json({ mensagem: 'Perfil criado com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.ver = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            `SELECT p.*, u.nome, u.email FROM perfil p
                                                  JOIN utilizador u ON p.uti_id = u.uti_id
             WHERE p.uti_id = ?`, [uti_id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Perfil nao encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.editar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        descricao, genero, data_nascimento, nacionalidade,
        numero_identificacao, contacto, morada, instituicao_ensino,
        curso, licenciatura_concluida, data_prevista_conclusao
    } = req.body;

    try {
        await pool.query(
            `UPDATE perfil SET
                               descricao=?, genero=?, data_nascimento=?, nacionalidade=?,
                               numero_identificacao=?, contacto=?, morada=?, instituicao_ensino=?,
                               curso=?, licenciatura_concluida=?, data_prevista_conclusao=?
             WHERE uti_id=?`,
            [descricao, genero, data_nascimento, nacionalidade,
                numero_identificacao, contacto, morada, instituicao_ensino,
                curso, licenciatura_concluida, data_prevista_conclusao, uti_id]
        );
        res.json({ mensagem: 'Perfil atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};