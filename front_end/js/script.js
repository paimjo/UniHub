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
