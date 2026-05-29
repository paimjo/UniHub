const etapa1 = document.querySelector('.etapa-1');
const etapa2 = document.querySelector('.etapa-2');
const botaoProxima = document.querySelector('.proxima');
const botaoVoltar  = document.querySelector('.voltar');


botaoProxima.addEventListener('click', () => {
    const nome      = etapa1.querySelector('input[type="text"]').value.trim();
    const email     = etapa1.querySelector('input[type="email"]').value.trim();
    const password  = etapa1.querySelectorAll('input[type="password"]')[0].value;
    const confirmar = etapa1.querySelectorAll('input[type="password"]')[1].value;

    if (!nome || !email || !password || !confirmar) {
        return alert('Preenche todos os campos.');
    }
    if (password !== confirmar) {
        return alert('As palavras-passe não coincidem.');
    }
    if (password.length < 6) {
        return alert('A palavra-passe deve ter pelo menos 6 caracteres.');
    }

    etapa1.classList.remove('ativa');
    etapa2.classList.add('ativa');
});

botaoVoltar.addEventListener('click', () => {
    etapa2.classList.remove('ativa');
    etapa1.classList.add('ativa');
});

// ── SUBMETER REGISTO ────────────────────────────────────
const btnFinalizar = document.querySelector('.finalizar');
btnFinalizar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nome      = etapa1.querySelector('input[type="text"]').value.trim();
    const email     = etapa1.querySelector('input[type="email"]').value.trim();
    const password  = etapa1.querySelectorAll('input[type="password"]')[0].value;

    const inputs2       = etapa2.querySelectorAll('input');
    const pais          = inputs2[0].value.trim();
    const codigo_postal = inputs2[1].value.trim();
    const nif           = inputs2[2].value.trim();
    const contacto      = inputs2[3].value.trim();
    const morada        = inputs2[4].value.trim();

    if (!pais || !codigo_postal || !nif || !contacto || !morada) {
        return alert('Preenche todos os campos.');
    }

    btnFinalizar.textContent = 'A registar...';
    btnFinalizar.disabled = true;

    try {
        await apiRequest('/auth/registo', 'POST', {
            nome,
            email,
            password,
            tipo_utilizador: 'EMPRESA',
            tipo_email: 'INSTITUCIONAL'
        });

        // Login automático para guardar token e criar perfil
        const dados = await apiRequest('/auth/login', 'POST', { email, password });
        localStorage.setItem('token', dados.token);
        localStorage.setItem('utilizador', JSON.stringify(dados.utilizador));

        await apiRequest('/empresa', 'POST', {
            nome_empresa: nome,
            nif,
            pais,
            codigo_postal,
            contacto,
            morada
        }, dados.token);

        alert('Empresa registada com sucesso! Verifica o teu email para ativar a conta.');
        window.location.href = '../index.html';

    } catch (err) {
        alert('Erro ao registar: ' + err.message);
        btnFinalizar.textContent = 'Concluir Registro';
        btnFinalizar.disabled = false;
    }
});