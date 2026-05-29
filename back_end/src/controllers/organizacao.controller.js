const pool = require('../config/db');

exports.criar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        nome, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude
    } = req.body;

    try {
        const [existe] = await pool.query(
            'SELECT org_id FROM organizacao WHERE uti_id = ?', [uti_id]
        );
        if (existe.length > 0) {
            return res.status(400).json({ erro: 'Organizacao ja existe' });
        }
        const [result] = await pool.query(
            `INSERT INTO organizacao
       (uti_id, nome, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude, aprovada)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)`,
            [uti_id, nome, nif, data_criacao, website, contacto, tipo,
                localizacao, pais, distrito, morada, codigo_postal,
                responsavel_nome, responsavel_email, responsavel_contacto,
                descricao, latitude, longitude]
        );
        res.status(201).json({ mensagem: 'Organizacao criada com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.ver = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            `SELECT o.*, u.nome AS nome_utilizador, u.email FROM organizacao o
       JOIN utilizador u ON o.uti_id = u.uti_id
       WHERE o.uti_id = ?`, [uti_id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Organizacao nao encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.editar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        nome, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude
    } = req.body;

    try {
        await pool.query(
            `UPDATE organizacao SET
       nome=?, nif=?, data_criacao=?, website=?, contacto=?, tipo=?,
       localizacao=?, pais=?, distrito=?, morada=?, codigo_postal=?,
       responsavel_nome=?, responsavel_email=?, responsavel_contacto=?,
       descricao=?, latitude=?, longitude=?
       WHERE uti_id=?`,
            [nome, nif, data_criacao, website, contacto, tipo,
                localizacao, pais, distrito, morada, codigo_postal,
                responsavel_nome, responsavel_email, responsavel_contacto,
                descricao, latitude, longitude, uti_id]
        );
        res.json({ mensagem: 'Organizacao atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};