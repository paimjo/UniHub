const etapa1 = document.querySelector('.etapa-1');
const etapa2 = document.querySelector('.etapa-2');
const etapa3 = document.querySelector('.etapa-3');
const botoesProxima = document.querySelectorAll('.proxima');
const botoesVoltar = document.querySelectorAll('.voltar');

// ── NAVEGAÇÃO ENTRE ETAPAS ──────────────────────────────
botoesProxima[0].addEventListener('click', () => {
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

botoesProxima[1].addEventListener('click', () => {
    const inputs = etapa2.querySelectorAll('input');
    for (const input of inputs) {
        if (!input.value.trim()) return alert('Preenche todos os campos.');
    }
    etapa2.classList.remove('ativa');
    etapa3.classList.add('ativa');
});

botoesVoltar[0].addEventListener('click', () => {
    etapa2.classList.remove('ativa');
    etapa1.classList.add('ativa');
});

botoesVoltar[1].addEventListener('click', () => {
    etapa3.classList.remove('ativa');
    etapa2.classList.add('ativa');
});

// ── DATA PREVISTA DE CONCLUSÃO ──────────────────────────
const selectLicenciatura = document.getElementById('licenciatura-concluida');
const dataConclusaoBox   = document.getElementById('data-conclusao-box');

if (selectLicenciatura) {
    selectLicenciatura.addEventListener('change', function () {
        dataConclusaoBox.style.display = this.value === 'nao' ? 'block' : 'none';
    });
}

// ── SUBMETER REGISTO ────────────────────────────────────
const btnFinalizar = document.querySelector('.finalizar');

btnFinalizar.addEventListener('click', async (e) => {
    e.preventDefault();

    const nome     = etapa1.querySelector('input[type="text"]').value.trim();
    const email    = etapa1.querySelector('input[type="email"]').value.trim();
    const password = etapa1.querySelectorAll('input[type="password"]')[0].value;

    btnFinalizar.textContent = 'A registar...';
    btnFinalizar.disabled = true;

    try {
        await apiRequest('/auth/registo', 'POST', {
            nome,
            email,
            password,
            tipo_utilizador: 'ESTUDANTE',
            tipo_email: 'universitario'
        });

        alert('Conta criada com sucesso! Verifica o teu email para ativar a conta.');
        window.location.href = '../index.html';

    } catch (err) {
        alert('Erro ao registar: ' + err.message);
        btnFinalizar.textContent = 'Concluir Registro';
        btnFinalizar.disabled = false;
    }
});