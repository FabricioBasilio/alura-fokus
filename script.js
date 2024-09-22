const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botaoIniciar = document.getElementById("start-pause");
const banner = document.querySelector(".app__image");

const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

focoBt.addEventListener("click", () => {
    alterarContexto("foco");
});

curtoBt.addEventListener("click", () => {
    alterarContexto("descanso-curto");
});

longoBt.addEventListener("click", () => {
    alterarContexto("descanso-longo");

});

function alterarContexto(contexto) {
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);
}