const html = document.querySelector("html");
const botoes = document.querySelectorAll(".app__card-button");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botaoIniciarImagem = document.querySelector("#start-pause img");
const botaoIniciar = document.getElementById("start-pause");
const botaoIniciarTexto = document.querySelector("#start-pause span");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const tempoNaTela = document.querySelector("#timer");
const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somPausar = new Audio("/sons/pause.mp3");
const somIniciar = new Audio("/sons/play.wav");
const somFinalizar = new Audio("/sons/beep.mp3");

musica.loop = true;

let intervaloId = null;
let tempoDecorridoEmSegundos = 1500;

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = duracaoFoco;
    alterarContexto("foco");
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = duracaoDescansoCurto;
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = duracaoDescansoLongo;
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");

});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somFinalizar.play();
        zerar();
        alert("Tempo finalizado.")
        return;
    }

    tempoDecorridoEmSegundos--;
    mostrarTempo();
}

botaoIniciar.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        somPausar.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    somIniciar.play();
    botaoIniciarImagem.setAttribute("src", "/imagens/pause.png");
    botaoIniciarTexto.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    botaoIniciarImagem.setAttribute("src", "/imagens/play_arrow.png");
    botaoIniciarTexto.textContent = "Começar";
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});

    tempoNaTela.innerHTML = `${tempoFormatado}`;
    
}

mostrarTempo();