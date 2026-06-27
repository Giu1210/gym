// ================================
// Gym Tracker
// Página Inicial
// ================================

// Nome do usuário
const nomeUsuario = "Giulia";

// Atualiza a saudação (caso exista)
const saudacao = document.querySelector(".header p");

if (saudacao) {
    const hora = new Date().getHours();

    let mensagem = "";

    if (hora < 12) {
        mensagem = "Bom dia";
    } else if (hora < 18) {
        mensagem = "Boa tarde";
    } else {
        mensagem = "Boa noite";
    }

    saudacao.textContent = `${mensagem}, ${nomeUsuario}! 👋`;
}

// Animação dos cards ao carregar
const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {

        card.style.transition = "0.5s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 150);

});

// Verifica se existe histórico salvo
const historico = JSON.parse(localStorage.getItem("historico")) || [];

console.log("Histórico:", historico);

// Verifica se existe tema salvo
const tema = localStorage.getItem("tema");

if (tema === "claro") {
    document.body.classList.add("tema-claro");
}

// Mensagem de boas-vindas no console
console.log("🏋️ Gym Tracker iniciado com sucesso!");if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js");

}