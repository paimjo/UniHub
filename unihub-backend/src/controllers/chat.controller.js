const pool = require('../config/db');

// POST /api/chat — enviar mensagem
exports.enviar = async (req, res) => {
    const remetente_id = req.utilizador.id;
    const { destinatario_id, mensagem, vaga_id } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO chat (vaga_id, remetente_id, destinatario_id, mensagem) VALUES (?,?,?,?)',
            [vaga_id, remetente_id, destinatario_id, mensagem]
        );

        // Notificar o destinatario
        const [remetente] = await pool.query(
            'SELECT nome FROM utilizador WHERE uti_id = ?', [remetente_id]
        );
        await pool.query(
            'INSERT INTO notificacao (uti_id, mensagem, tipo) VALUES (?,?,?)',
            [destinatario_id, `${remetente[0].nome} enviou-te uma mensagem.`, 'MENSAGEM']
        );

        res.status(201).json({ mensagem: 'Mensagem enviada com sucesso', id: result.insertId });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/chat/:outro_id — ver conversa com outro utilizador
exports.conversa = async (req, res) => {
    const eu = req.utilizador.id;
    const outro = req.params.outro_id;

    try {
        const [rows] = await pool.query(
            `SELECT c.*, 
        r.nome AS nome_remetente,
        d.nome AS nome_destinatario
       FROM chat c
       JOIN utilizador r ON c.remetente_id = r.uti_id
       JOIN utilizador d ON c.destinatario_id = d.uti_id
       WHERE (c.remetente_id = ? AND c.destinatario_id = ?)
          OR (c.remetente_id = ? AND c.destinatario_id = ?)
       ORDER BY c.data_envio ASC`,
            [eu, outro, outro, eu]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// GET /api/chat — listar todas as conversas do utilizador
exports.listar = async (req, res) => {
    const uti_id = req.utilizador.id;

    try {
        const [rows] = await pool.query(
            `SELECT
                 outro_id,
                 MAX(outro_nome) AS outro_nome,
                 MAX(ultima_mensagem) AS ultima_mensagem,
                 MAX(data_ultima_mensagem) AS data_ultima_mensagem,
                 vaga_id,
                 MAX(titulo_vaga) AS titulo_vaga
             FROM (
                      SELECT
                          CASE WHEN c.remetente_id = ? THEN c.destinatario_id ELSE c.remetente_id END AS outro_id,
                          u.nome AS outro_nome,
                          c.mensagem AS ultima_mensagem,
                          c.data_envio AS data_ultima_mensagem,
                          c.vaga_id,
                          v.titulo AS titulo_vaga
                      FROM chat c
                               JOIN utilizador u ON u.uti_id = CASE WHEN c.remetente_id = ? THEN c.destinatario_id ELSE c.remetente_id END
                               LEFT JOIN vaga v ON c.vaga_id = v.vaga_id
                      WHERE c.remetente_id = ? OR c.destinatario_id = ?
                      ORDER BY c.data_envio DESC
                  ) AS sub
             GROUP BY outro_id, vaga_id`,
            [uti_id, uti_id, uti_id, uti_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};