const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// GET /api/utilizador/perfil — ver dados do utilizador logado
exports.verPerfil = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        const [rows] = await pool.query(
            'SELECT uti_id, nome, email, tipo_email, tipo_utilizador, estado, verificado, criado_em FROM utilizador WHERE uti_id = ?',
            [uti_id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Utilizador nao encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/utilizador/perfil — editar nome e email
exports.editarPerfil = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { nome } = req.body;
    try {
        await pool.query(
            'UPDATE utilizador SET nome = ? WHERE uti_id = ?',
            [nome, uti_id]
        );
        res.json({ mensagem: 'Perfil atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// PUT /api/utilizador/password — alterar password
exports.alterarPassword = async (req, res) => {
    const uti_id = req.utilizador.id;
    const { password_atual, password_nova } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT password FROM utilizador WHERE uti_id = ?', [uti_id]
        );
        const valida = await bcrypt.compare(password_atual, rows[0].password);
        if (!valida) {
            return res.status(400).json({ erro: 'Password atual incorreta' });
        }
        const hash = await bcrypt.hash(password_nova, 10);
        await pool.query(
            'UPDATE utilizador SET password = ? WHERE uti_id = ?',
            [hash, uti_id]
        );
        res.json({ mensagem: 'Password alterada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// POST /api/utilizador/foto — upload de foto de perfil
exports.uploadFoto = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhuma foto enviada' });
        }
        const foto_url = `/uploads/fotos/${req.file.filename}`;
        await pool.query(
            'UPDATE perfil SET foto_url = ? WHERE uti_id = ?',
            [foto_url, uti_id]
        );
        res.json({ mensagem: 'Foto atualizada com sucesso', foto_url });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// POST /api/utilizador/cv — upload de CV
exports.uploadCV = async (req, res) => {
    const uti_id = req.utilizador.id;
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhum CV enviado' });
        }
        const cv_url = `/uploads/cvs/${req.file.filename}`;
        await pool.query(
            'UPDATE perfil SET cv_url = ? WHERE uti_id = ?',
            [cv_url, uti_id]
        );
        res.json({ mensagem: 'CV atualizado com sucesso', cv_url });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};