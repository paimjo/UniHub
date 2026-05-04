const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', require('express').static('uploads'));

app.get('/', (req, res) => {
    res.json({ mensagem: 'UniHub API esta a funcionar!' });
});

app.use('/api/auth', require('./routes/auth.routes'));

 app.use('/api/utilizador',    require('./routes/utilizador.routes'));
 app.use('/api/perfil',        require('./routes/perfil.routes'));
 app.use('/api/empresa',       require('./routes/empresa.routes'));
 app.use('/api/organizacao',   require('./routes/organizacao.routes'));
 app.use('/api/vaga',          require('./routes/vaga.routes'));
 app.use('/api/candidatura',   require('./routes/candidatura.routes'));
 app.use('/api/favoritos',     require('./routes/favoritos.routes'));
 app.use('/api/notificacao',   require('./routes/notificacao.routes'));
 app.use('/api/chat',          require('./routes/chat.routes'));
 app.use('/api/admin',         require('./routes/admin.routes'));

module.exports = app;