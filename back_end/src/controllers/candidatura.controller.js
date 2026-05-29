const pool = require('../config/db');

// POST /api/candidatura — estudante candidata-se a uma vaga
exports.candidatar = async (req, res) => {
    const uti_id = req.utilizador.id;
    const tipo = req.utilizador.tipo;
    const { vaga_id } = req.body;

    if (tipo !== 'ESTUDANTE') {
        return res.status(403).json({ erro: 'Apenas estudantes podem candidatar-se' });
    }

    try {
        // Verificar se ja se candidatou
        const [existe] = await pool.query(
            'SELECT cand_id FROM candidatura WHERE vaga_id = ? AND uti_id = ?',
            [vaga_id, uti_id]
        );
        if (existe.length > 0) {
            return res.status(400).json({ erro: 'Ja te candidataste a esta vaga' });
        }

        // Verificar se a vaga existe e está aberta
        const [vaga] = await pool.query(
            'SELECT * FROM vaga WHERE vaga_id = ? AND estado = ?',
            [vaga_id, 'ABERTA']
        );
        if (vaga.length === 0) {
            return res.status(404).json({ erro: 'Vaga nao encontrada ou fechada' });
        }

        const [result] = await pool.query(
            'INSERT INTO candidatura (vaga_id, uti_id, estado) VALUES (?,?,?)',
            [vaga_id, uti_id, 'PENDENTE']
        );

        // Criar notificacao para o estudante
        await pool.query(
            'INSERT INTO notificacao (uti_id, mensagem, tipo) VALUES (?,?,?)',
            [uti_id, `A tua candidatura para "${vaga[0].titulo}" foi submetida com sucesso.`, 'CANDIDATURA']
        );

        res.status(201).json({ mensagem: 'Candidatura submetida com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/candidatura/minhas — ver candidaturas do estudante
exports.minhas = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            `SELECT c.*, v.titulo, v.tipo, v.regime, v.cidade,
        e.nome_empresa, o.nome AS nome_organizacao
       FROM candidatura c
       JOIN vaga v ON c.vaga_id = v.vaga_id
       LEFT JOIN empresa e ON v.emp_id = e.emp_id
       LEFT JOIN organizacao o ON v.org_id = o.org_id
       WHERE c.uti_id = ?
       ORDER BY c.data_candidatura DESC`, [uti_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/candidatura/vaga/:vaga_id — empresa ve candidatos de uma vaga
exports.porVaga = async (req, res) => {
    const uti_id = req.utilizador.id;
    const tipo = req.utilizador.tipo;

    if (tipo !== 'EMPRESA' && tipo !== 'ORGANIZACAO') {
        return res.status(403).json({ erro: 'Acesso negado' });
    }

    try {
        const [rows] = await pool.query(
            `SELECT c.*, u.nome, u.email,
        p.foto_url, p.curso, p.instituicao_ensino, p.cv_url,
        p.descricao AS descricao_perfil
       FROM candidatura c
       JOIN utilizador u ON c.uti_id = u.uti_id
       LEFT JOIN perfil p ON c.uti_id = p.uti_id
       WHERE c.vaga_id = ?
       ORDER BY c.data_candidatura DESC`, [req.params.vaga_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/candidatura/:id/estado — empresa atualiza estado da candidatura
exports.atualizarEstado = async (req, res) => {
    const { estado } = req.body;
    const tipo = req.utilizador.tipo;

    if (tipo !== 'EMPRESA' && tipo !== 'ORGANIZACAO') {
        return res.status(403).json({ erro: 'Acesso negado' });
    }

    if (!['ACEITE', 'REJEITADO'].includes(estado)) {
        return res.status(400).json({ erro: 'Estado invalido' });
    }

    try {
        // Buscar candidatura para notificar o estudante
        const [cand] = await pool.query(
            `SELECT c.*, v.titulo FROM candidatura c
       JOIN vaga v ON c.vaga_id = v.vaga_id
       WHERE c.cand_id = ?`, [req.params.id]
        );
        if (cand.length === 0) {
            return res.status(404).json({ erro: 'Candidatura nao encontrada' });
        }

        await pool.query(
            'UPDATE candidatura SET estado = ? WHERE cand_id = ?',
            [estado, req.params.id]
        );

        // Notificar o estudante
        const mensagem = estado === 'ACEITE'
            ? `Foste aceite na vaga "${cand[0].titulo}"!`
            : `A tua candidatura para "${cand[0].titulo}" nao foi seleccionada.`;

        await pool.query(
            'INSERT INTO notificacao (uti_id, mensagem, tipo) VALUES (?,?,?)',
            [cand[0].uti_id, mensagem, 'CANDIDATURA']
        );

        res.json({ mensagem: 'Estado da candidatura atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};