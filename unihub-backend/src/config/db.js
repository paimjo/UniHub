const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'unihub',
    waitForConnections: true,
    connectionLimit: 10
});

async function testarConexao() {
    try {
        const connection = await pool.getConnection();
        console.log('Ligado à base de dados unihub com sucesso!');
        connection.release();
    } catch (err) {
        console.error('Erro ao ligar à base de dados:', err.message);
    }
}

testarConexao();

module.exports = pool;