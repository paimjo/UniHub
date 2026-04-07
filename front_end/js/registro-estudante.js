const etapa1 = document.querySelector('.etapa-1');
const etapa2 = document.querySelector('.etapa-2');
const botaoProxima = document.querySelector('.proxima');
const botaoVoltar = document.querySelector('.voltar');

botaoProxima.addEventListener('click', () => {
  etapa1.classList.remove('ativa');
  etapa2.classList.add('ativa');
});

botaoVoltar.addEventListener('click', () => {
  etapa2.classList.remove('ativa');
  etapa1.classList.add('ativa');
});
