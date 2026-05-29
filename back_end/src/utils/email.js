const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '31c13e8217a4bf',
        pass: '38cd65dd17899c'
    }
});

async function enviarEmailVerificacao(nome, email, token) {
    const link = `http://localhost:3000/api/auth/verificar/${token}`;

    await transporter.sendMail({
        from: 'noreply@unihub.pt',
        to: email,
        subject: 'Verifica o teu email - UniHub',
        html: `
      <h2>Ola ${nome}!</h2>
      <p>Obrigado por te registares no UniHub.</p>
      <p>Clica no link abaixo para verificar o teu email:</p>
      <a href="${link}">Verificar email</a>
      <p>O link expira em 24 horas.</p>
    `
    });
}

module.exports = { enviarEmailVerificacao };