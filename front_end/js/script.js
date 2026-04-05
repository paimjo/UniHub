const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const botaoLoginConta = document.querySelector('.botaoLoginConta');
const botaoFechar = document.querySelector('.icon-close');

botaoLoginConta.onclick = () => {
    wrapper.classList.add('active-popup');
}

botaoFechar.onclick = () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
}

registerLink.onclick = () => {
    wrapper.classList.add('active');
}

loginLink.onclick = () => {
    wrapper.classList.remove('active');
}