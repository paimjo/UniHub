const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { enviarEmailVerificacao } = require('../utils/email');

const dominiosProibidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'sapo.pt'];

exports.registo = async (req, res) => {
    const { nome, email, password, tipo_utilizador, tipo_email } = req.body;
    try {
        // Validar email de estudante
        if (tipo_utilizador === 'ESTUDANTE') {
            const dominio = email.split('@')[1];
            if (!email.endsWith('.pt') || dominiosProibidos.includes(dominio)) {
                return res.status(400).json({ erro: 'Estudantes devem usar email universitario (.pt)' });
            }
        }
        // Verificar se email ja existe
        const [rows] = await pool.query(
            'SELECT uti_id FROM utilizador WHERE email = ?', [email]
        );
        if (rows.length > 0) {
            return res.status(400).json({ erro: 'Email ja registado' });
        }
        // Cifrar password
        const hash = await bcrypt.hash(password, 10);
        // Gerar token de verificacao
        const token = crypto.randomBytes(32).toString('hex');
        const expira = new Date(Date.now() + 24 * 60 * 60 * 1000);
        // Inserir utilizador
        const [result] = await pool.query(
            `INSERT INTO utilizador 
       (nome, email, tipo_email, password, tipo_utilizador, token_verificacao, token_expira_em, verificado)
       VALUES (?,?,?,?,?,?,?,0)`,
            [nome, email, tipo_email, hash, tipo_utilizador, token, expira]
        );
        // Enviar email de verificacao
        await enviarEmailVerificacao(nome, email, token);
        res.status(201).json({
            mensagem: 'Conta criada! Verifica o teu email para ativar a conta.',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.verificarEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM utilizador WHERE token_verificacao = ?', [token]
        );
        if (rows.length === 0) {
            return res.status(400).json({ erro: 'Token invalido' });
        }
        const utilizador = rows[0];
        if (new Date() > new Date(utilizador.token_expira_em)) {
            return res.status(400).json({ erro: 'Token expirado' });
        }
        await pool.query(
            'UPDATE utilizador SET verificado = 1, token_verificacao = NULL WHERE uti_id = ?',
            [utilizador.uti_id]
        );
        res.json({ mensagem: 'Email verificado com sucesso! Ja podes fazer login.' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT * FROM utilizador WHERE email = ?', [email]
        );
        if (rows.length === 0) {
            return res.status(401).json({ erro: 'Credenciais invalidas' });
        }
        const utilizador = rows[0];
        if (!utilizador.verificado) {
            return res.status(401).json({ erro: 'Email nao verificado. Verifica o teu email.' });
        }
        const valida = await bcrypt.compare(password, utilizador.password);
        if (!valida) {
            return res.status(401).json({ erro: 'Credenciais invalidas' });
        }
        const token = jwt.sign(
            { id: utilizador.uti_id, tipo: utilizador.tipo_utilizador },
            process.env.JWT_SECRET || 'unihub_segredo_2026',
            { expiresIn: '7d' }
        );
        res.json({
            token,
            utilizador: {
                id: utilizador.uti_id,
                nome: utilizador.nome,
                tipo: utilizador.tipo_utilizador
            }
        });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};