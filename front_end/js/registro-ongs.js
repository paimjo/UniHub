const etapa1 = document.querySelector('.etapa-1');
const etapa2 = document.querySelector('.etapa-2');
const botaoProxima = document.querySelector('.proxima');
const botaoVoltar = document.querySelector('.voltar');
const botaoFinalizar = document.querySelector('.finalizar');

if (botaoProxima) {
  botaoProxima.onclick = () => {
    etapa1.classList.remove('ativa');
    etapa2.classList.add('ativa');
  };
}

if (botaoVoltar) {
  botaoVoltar.onclick = () => {
    etapa2.classList.remove('ativa');
    etapa1.classList.add('ativa');
  };
}

// Conclui o registro e redireciona para Home da ONG
if (botaoFinalizar) {
  botaoFinalizar.onclick = (event) => {
    event.preventDefault(); 
    window.location.href = 'home-ong.html'; // <-- redireciona para a página da ONG
  };
}