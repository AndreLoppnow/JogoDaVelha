document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os botões da tela inicial
    const singleplayerBtn = document.getElementById("singleplayer-btn");
    const multiplayerBtn = document.getElementById("multiplayer-btn");
    const historyBtn = document.getElementById("history-btn");

    // Redireciona para a tela correspondente ao clicar
    if (singleplayerBtn) {
        singleplayerBtn.addEventListener("click", function () {
            window.location.href = "umjogador.html";
        });
    }

    if (multiplayerBtn) {
        multiplayerBtn.addEventListener("click", function () {
            window.location.href = "multiplayer.html";
        });
    }

    if (historyBtn) {
        historyBtn.addEventListener("click", function () {
            window.location.href = "historico.html";
        });
    }
});
