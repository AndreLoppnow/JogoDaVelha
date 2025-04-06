document.addEventListener("DOMContentLoaded", function () {
    const historyList = document.getElementById("history-list");
    const clearHistoryBtn = document.getElementById("clear-history");
    const backMenuBtn = document.getElementById("back-menu");

    // Recupera histórico do localStorage
    let history = JSON.parse(localStorage.getItem("matchHistory")) || [];

    // Função para carregar histórico na tela
    function loadHistory() {
        historyList.innerHTML = ""; // Limpa antes de carregar
        if (history.length === 0) {
            historyList.innerHTML = "<p>Nenhuma partida encontrada.</p>";
        } else {
            history.forEach(match => {
                let item = document.createElement("div");
                item.classList.add("history-item");
                item.innerHTML = `
                    <div class="history-icon">🧩</div>
                    <div class="history-text">
                        <strong>Data:</strong> ${match.date}<br>
                        <strong>Duração:</strong> ${match.duration}<br>
                        <strong>Tipo:</strong> ${match.type}<br>
                        <strong>Vencedor:</strong> ${match.winner}
                    </div>
                `;
                historyList.appendChild(item);
            });
        }
    }

    // Botão para limpar histórico
    clearHistoryBtn.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja apagar o histórico?")) {
            localStorage.removeItem("matchHistory");
            history = [];
            loadHistory();
        }
    });

    // Botão para voltar ao menu
    backMenuBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    // Carrega o histórico ao abrir a página
    loadHistory();
});
