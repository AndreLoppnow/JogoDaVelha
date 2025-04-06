document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const turnIndicator = document.querySelector(".turn-indicator");
    const modal = document.getElementById("result-modal");
    const resultMessage = document.getElementById("result-message");
    const playAgainBtn = document.getElementById("play-again");
    const exitGameBtn = document.getElementById("exit-game");
    let board = ["", "", "", "", "", "", "", "", ""];
    let player = "X";
    let ai = "O";
    let gameOver = false;
    let startTime = new Date();

    // Evento de clique em cada célula
    cells.forEach((cell, index) => {
        cell.addEventListener("click", function () {
            if (!gameOver && board[index] === "") {
                board[index] = player;
                cell.textContent = player;
                checkWinner();
                if (!gameOver) {
                    setTimeout(aiMove, 500);
                }
            }
        });
    });

    
    // Jogada do robô
    function aiMove() {
        let bestMove = findBestMove();
        if (bestMove !== -1) {
            board[bestMove] = ai;
            cells[bestMove].textContent = ai;
            checkWinner();
        }
    }

    // Melhor jogada do robô
    function findBestMove() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = ai;
                if (checkWin(ai)) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = player;
                if (checkWin(player)) {
                    board[i] = "";
                    return i;
                }
                board[i] = "";
            }
        }
        let availableMoves = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
        return availableMoves.length ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : -1;
    }

    // Verificação do vencedor
    function checkWinner() {
        if (checkWin(player)) {
            endGame("Você ganhou!");
        } else if (checkWin(ai)) {
            endGame("Você perdeu!");
        } else if (!board.includes("")) {
            endGame("Empate!");
        }
    }

    // Função que verifica se alguém ganhou
    function checkWin(symbol) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => pattern.every(index => board[index] === symbol));
    }

    // Finaliza o jogo e mostra o modal
    function endGame(message) {
        gameOver = true;
        resultMessage.textContent = message;
        modal.style.display = "flex";

        // Salva no histórico
        saveMatchHistory(message.includes("ganhou") ? "Jogador" : message.includes("perdeu") ? "Robô" : "Empate");
    }

    // Reiniciar o jogo
    playAgainBtn.addEventListener("click", function () {
        board.fill("");
        cells.forEach(cell => cell.textContent = "");
        gameOver = false;
        modal.style.display = "none";
        startTime = new Date(); // Reset tempo inicial
    });

    // Sair do jogo
    exitGameBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    // Salvar histórico da partida
    function saveMatchHistory(winner) {
        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000); // duração em segundos
        const matchData = {
            date: `${endTime.getDate()}/${endTime.getMonth() + 1}/${endTime.getFullYear()}`,
            time: `${endTime.getHours()}:${endTime.getMinutes()}`,
            duration: `${duration} segundos`,
            type: "Singleplayer",
            winner: winner
        };

        // Recupera histórico salvo no localStorage
        let history = JSON.parse(localStorage.getItem("matchHistory")) || [];
        history.push(matchData);
        localStorage.setItem("matchHistory", JSON.stringify(history));
    }
});
