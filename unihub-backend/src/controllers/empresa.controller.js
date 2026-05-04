const pool = require('../config/db');

exports.criar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        nome_empresa, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude
    } = req.body;

    try {
        const [existe] = await pool.query(
            'SELECT emp_id FROM empresa WHERE uti_id = ?', [uti_id]
        );
        if (existe.length > 0) {
            return res.status(400).json({ erro: 'Empresa ja existe' });
        }
        const [result] = await pool.query(
            `INSERT INTO empresa
       (uti_id, nome_empresa, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude, aprovada)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)`,
            [uti_id, nome_empresa, nif, data_criacao, website, contacto, tipo,
                localizacao, pais, distrito, morada, codigo_postal,
                responsavel_nome, responsavel_email, responsavel_contacto,
                descricao, latitude, longitude]
        );
        res.status(201).json({ mensagem: 'Empresa criada com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.ver = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            `SELECT e.*, u.nome, u.email FROM empresa e
       JOIN utilizador u ON e.uti_id = u.uti_id
       WHERE e.uti_id = ?`, [uti_id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Empresa nao encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.editar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const {
        nome_empresa, nif, data_criacao, website, contacto, tipo,
        localizacao, pais, distrito, morada, codigo_postal,
        responsavel_nome, responsavel_email, responsavel_contacto,
        descricao, latitude, longitude
    } = req.body;

    try {
        await pool.query(
            `UPDATE empresa SET
       nome_empresa=?, nif=?, data_criacao=?, website=?, contacto=?, tipo=?,
       localizacao=?, pais=?, distrito=?, morada=?, codigo_postal=?,
       responsavel_nome=?, responsavel_email=?, responsavel_contacto=?,
       descricao=?, latitude=?, longitude=?
       WHERE uti_id=?`,
            [nome_empresa, nif, data_criacao, website, contacto, tipo,
                localizacao, pais, distrito, morada, codigo_postal,
                responsavel_nome, responsavel_email, responsavel_contacto,
                descricao, latitude, longitude, uti_id]
        );
        res.json({ mensagem: 'Empresa atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};