const etapa1 = document.querySelector('.etapa-1');
const etapa2 = document.querySelector('.etapa-2');
const etapa3 = document.querySelector('.etapa-3');
const botoesProxima = document.querySelectorAll('.proxima');
const botoesVoltar = document.querySelectorAll('.voltar');

// Etapa 1 -> Etapa 2
botoesProxima[0].addEventListener('click', () => {
  etapa1.classList.remove('ativa');
  etapa2.classList.add('ativa');
});

// Etapa 2 -> Etapa 3
botoesProxima[1].addEventListener('click', () => {
  etapa2.classList.remove('ativa');
  etapa3.classList.add('ativa');
});

// Etapa 2 -> Etapa 1
botoesVoltar[0].addEventListener('click', () => {
  etapa2.classList.remove('ativa');
  etapa1.classList.add('ativa');
});

// Etapa 3 -> Etapa 2
botoesVoltar[1].addEventListener('click', () => {
  etapa3.classList.remove('ativa');
  etapa2.classList.add('ativa');
});

// Mostraa a data prevista se não concluída licenciatura
const selectLicenciatura = document.getElementById("licenciatura-concluida");
const dataConclusaoBox = document.getElementById("data-conclusao-box");

if (selectLicenciatura) {
  selectLicenciatura.addEventListener("change", function () {
    if (this.value === "nao") {
      dataConclusaoBox.style.display = "block";
    } else {
      dataConclusaoBox.style.display = "none";
    }
  });
}

