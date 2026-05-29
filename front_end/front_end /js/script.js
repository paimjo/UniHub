const janelaLogin = document.querySelector('.janela-login');
const botaoLoginConta = document.querySelector('.botaoLoginConta');
const botaoFechar = document.querySelector('.icone-fechar');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

botaoLoginConta.onclick = () => {
  janelaLogin.classList.add('active-popup');
};

botaoFechar.onclick = () => {
  janelaLogin.classList.remove('active-popup');
  janelaLogin.classList.remove('active');
};

if (registerLink) registerLink.onclick = (e) => {
  e.preventDefault();
  janelaLogin.classList.add('active');
};

if (loginLink) loginLink.onclick = (e) => {
  e.preventDefault();
  janelaLogin.classList.remove('active');
};


const formularioLogin = document.querySelector('.formulario.login form');

if (formularioLogin) {
  formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email    = formularioLogin.querySelector('input[type="email"]').value;
    const password = formularioLogin.querySelector('input[type="password"]').value;
    const btnLogin = formularioLogin.querySelector('button[type="submit"]');

    btnLogin.textContent = 'A entrar...';
    btnLogin.disabled = true;

    try {
      const dados = await apiRequest('/auth/login', 'POST', { email, password });

      setToken(dados.token);
      setUtilizador(dados.utilizador);

      const tipo = dados.utilizador.tipo;
      if (tipo === 'ESTUDANTE')        window.location.href = 'estudantes/home-estudante.html';
      else if (tipo === 'EMPRESA')     window.location.href = 'empresas/home-empresa.html';
      else if (tipo === 'ORGANIZACAO') window.location.href = 'ongs/home-ong.html';
      else if (tipo === 'ADMIN')       window.location.href = 'administrador/dashboard.html';
      else alert('Tipo de utilizador desconhecido: ' + tipo);

    } catch (err) {
      alert('Erro: ' + err.message);
      btnLogin.textContent = 'Login';
      btnLogin.disabled = false;
    }
  });
}