const pool = require('../config/db');

// POST /api/vaga — criar vaga (empresa ou organizacao)
exports.criar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const tipo_utilizador = req.utilizador.tipo;
    const {
        titulo, descricao, remuneracao, regime, competencias,
        nivel_exigencia, cidade, distrito, pais, latitude, longitude, tipo
    } = req.body;

    try {
        let emp_id = null;
        let org_id = null;

        // Verificar se é empresa ou organizacao
        if (tipo_utilizador === 'EMPRESA') {
            const [empresa] = await pool.query(
                'SELECT emp_id FROM empresa WHERE uti_id = ?', [uti_id]
            );
            if (empresa.length === 0) {
                return res.status(400).json({ erro: 'Perfil de empresa nao encontrado' });
            }
            emp_id = empresa[0].emp_id;
        } else if (tipo_utilizador === 'ORGANIZACAO') {
            const [org] = await pool.query(
                'SELECT org_id FROM organizacao WHERE uti_id = ?', [uti_id]
            );
            if (org.length === 0) {
                return res.status(400).json({ erro: 'Perfil de organizacao nao encontrado' });
            }
            org_id = org[0].org_id;
        } else {
            return res.status(403).json({ erro: 'Apenas empresas e organizacoes podem criar vagas' });
        }

        // Voluntariado nao tem remuneracao
        const remuneracao_final = tipo === 'VOLUNTARIADO' ? null : remuneracao;

        const [result] = await pool.query(
            `INSERT INTO vaga
       (emp_id, org_id, titulo, descricao, remuneracao, regime, competencias,
        nivel_exigencia, cidade, distrito, pais, latitude, longitude, tipo, estado)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,'ABERTA')`,
            [emp_id, org_id, titulo, descricao, remuneracao_final, regime, competencias,
                nivel_exigencia, cidade, distrito, pais, latitude, longitude, tipo]
        );
        res.status(201).json({ mensagem: 'Vaga criada com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/vaga — listar vagas com filtros
exports.listar = async (req, res) => {
    const { tipo, cidade, distrito, regime, nivel_exigencia, pesquisa } = req.query;
    let sql = `
    SELECT v.*, 
      e.nome_empresa, e.logo_url AS logo_empresa,
      o.nome AS nome_organizacao, o.logo_url AS logo_organizacao
    FROM vaga v
    LEFT JOIN empresa e ON v.emp_id = e.emp_id
    LEFT JOIN organizacao o ON v.org_id = o.org_id
    WHERE v.estado = 'ABERTA'
  `;
    const params = [];

    if (tipo)            { sql += ' AND v.tipo = ?';             params.push(tipo); }
    if (cidade)          { sql += ' AND v.cidade = ?';           params.push(cidade); }
    if (distrito)        { sql += ' AND v.distrito = ?';         params.push(distrito); }
    if (regime)          { sql += ' AND v.regime = ?';           params.push(regime); }
    if (nivel_exigencia) { sql += ' AND v.nivel_exigencia = ?';  params.push(nivel_exigencia); }
    if (pesquisa)        { sql += ' AND v.titulo LIKE ?';        params.push(`%${pesquisa}%`); }

    sql += ' ORDER BY v.data_publicacao DESC';

    try {
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/vaga/:id — ver detalhe de uma vaga
exports.detalhe = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT v.*,
        e.nome_empresa, e.logo_url AS logo_empresa, e.descricao AS descricao_empresa,
        o.nome AS nome_organizacao, o.logo_url AS logo_organizacao
       FROM vaga v
       LEFT JOIN empresa e ON v.emp_id = e.emp_id
       LEFT JOIN organizacao o ON v.org_id = o.org_id
       WHERE v.vaga_id = ?`, [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Vaga nao encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/vaga/:id — editar vaga
exports.editar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { titulo, descricao, remuneracao, regime, competencias,
        nivel_exigencia, cidade, distrito, estado } = req.body;
    try {
        await pool.query(
            `UPDATE vaga SET titulo=?, descricao=?, remuneracao=?, regime=?,
       competencias=?, nivel_exigencia=?, cidade=?, distrito=?, estado=?
       WHERE vaga_id=?`,
            [titulo, descricao, remuneracao, regime, competencias,
                nivel_exigencia, cidade, distrito, estado, req.params.id]
        );
        res.json({ mensagem: 'Vaga atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// DELETE /api/vaga/:id — eliminar vaga
exports.eliminar = async (req, res) => {
    try {
        await pool.query('DELETE FROM vaga WHERE vaga_id = ?', [req.params.id]);
        res.json({ mensagem: 'Vaga eliminada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/vaga/minhas — vagas da empresa ou organizacao
exports.minhas = async (req, res) => {
    const uti_id = req.utilizador.id;
    const tipo_utilizador = req.utilizador.tipo;
    try {
        let rows;
        if (tipo_utilizador === 'EMPRESA') {
            [rows] = await pool.query(
                `SELECT v.* FROM vaga v
         JOIN empresa e ON v.emp_id = e.emp_id
         WHERE e.uti_id = ?
         ORDER BY v.data_publicacao DESC`, [uti_id]
            );
        } else if (tipo_utilizador === 'ORGANIZACAO') {
            [rows] = await pool.query(
                `SELECT v.* FROM vaga v
         JOIN organizacao o ON v.org_id = o.org_id
         WHERE o.uti_id = ?
         ORDER BY v.data_publicacao DESC`, [uti_id]
            );
        } else {
            return res.status(403).json({ erro: 'Acesso negado' });
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};