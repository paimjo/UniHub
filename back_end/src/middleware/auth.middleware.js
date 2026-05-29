const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ erro: 'Token em falta' });
    }

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unihub_segredo_2026');
        req.utilizador = decoded;
        next();
    } catch {
        return res.status(401).json({ erro: 'Token invalido' });
    }
};