const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaHistorico = document.getElementById('tela-historico');
const jogadorAtualElemento = document.getElementById('jogador-atual');
const tabuleiro = document.getElementById('tabuleiro');
const casas = document.querySelectorAll('.casa');
const modalVencedor = document.getElementById('modal-vencedor');
const mensagemVencedor = document.getElementById('mensagem-vencedor');
const listaHistorico = document.getElementById('lista-historico');

const botaoUmJogador = document.getElementById('um-jogador');
const botaoMultijogador = document.getElementById('multijogador');
const botaoHistorico = document.getElementById('historico');
const botaoVoltarInicial = document.getElementById('voltar-inicial');
const botaoVoltarInicialHistorico = document.getElementById('voltar-inicial-historico');
const botaoJogarNovamente = document.getElementById('jogar-novamente');
const botaoSair = document.getElementById('sair');

let jogadorAtual = 'X';
let jogoAcabou = false;
let modoUmJogador = false;
let historicoPartidas = JSON.parse(localStorage.getItem('historicoPartidas')) || [];
let tempoInicio;

botaoUmJogador.addEventListener('click', () => iniciarJogo(true));
botaoMultijogador.addEventListener('click', () => iniciarJogo(false));
botaoHistorico.addEventListener('click', mostrarHistorico);
botaoVoltarInicial.addEventListener('click', voltarInicial);
botaoVoltarInicialHistorico.addEventListener('click', voltarInicial);
botaoJogarNovamente.addEventListener('click', reiniciarJogo);
botaoSair.addEventListener('click', voltarInicial);

function iniciarJogo(umJogador) {
    modoUmJogador = umJogador;
    telaInicial.style.display = 'none';
    telaJogo.style.display = 'block';
    jogadorAtualElemento.textContent = `Jogador Atual: ${jogadorAtual}`;
    jogoAcabou = false;
    casas.forEach(casa => {
        casa.textContent = '';
        casa.addEventListener('click', jogar);
    });
    tempoInicio = new Date();
}

function jogar(evento) {
    if (jogoAcabou) return;

    const casa = evento.target;
    if (casa.textContent !== '') return;

    casa.textContent = jogadorAtual;
    verificarVencedor();
    if (jogoAcabou) return;

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    jogadorAtualElemento.textContent = `Jogador Atual: ${jogadorAtual}`;

    if (modoUmJogador && jogadorAtual === 'O') {
        jogadaIA();
    }
}

function jogadaIA() {
    jogoAcabou = true;
    jogadorAtualElemento.textContent = 'IA está jogando...';
    setTimeout(() => {
        const casasVazias = [...casas].filter(casa => casa.textContent === '');
        if (casasVazias.length > 0) {
            const jogada = casasVazias[Math.floor(Math.random() * casasVazias.length)];
            jogada.textContent = 'O';
            verificarVencedor();
        }
        jogadorAtual = 'X';
        jogadorAtualElemento.textContent = `Jogador Atual: ${jogadorAtual}`;
        jogoAcabou = false;
    }, 1000);
}

function verificarVencedor() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinacao of combinacoes) {
        const [a, b, c] = combinacao;
        if (casas[a].textContent && casas[a].textContent === casas[b].textContent && casas[a].textContent === casas[c].textContent) {
            jogoAcabou = true;
            mostrarVencedor(casas[a].textContent);
            return;
        }
    }

    if ([...casas].every(casa => casa.textContent !== '')) {
        jogoAcabou = true;
        mostrarVencedor('Empate');
    }
}

function mostrarVencedor(vencedor) {
    mensagemVencedor.textContent = vencedor === 'Empate' ? 'Empate!' : `Jogador ${vencedor} venceu!`;
    modalVencedor.style.display = 'block';
    salvarHistorico(vencedor);
}

function salvarHistorico(vencedor) {
    const agora = new Date();
    const data = agora.toLocaleDateString();
    const tempoFim = new Date();
    const duracao = calcularDuracao(tempoInicio, tempoFim);
    historicoPartidas.push({ vencedor, data, duracao, tipo: modoUmJogador ? 'Um Jogador' : 'Multijogador' });
    localStorage.setItem('historicoPartidas', JSON.stringify(historicoPartidas));
}

function calcularDuracao(inicio, fim) {
    const diferenca = fim - inicio;
    const minutos = Math.floor(diferenca / 60000);
    const segundos = Math.floor((diferenca % 60000) / 1000);
    return `${minutos}m ${segundos}s`;
}

function mostrarHistorico() {
    telaInicial.style.display = 'none';
    telaHistorico.style.display = 'block';
    listaHistorico.innerHTML = '';
    historicoPartidas.forEach(partida => {
        const item = document.createElement('li');
        item.textContent = `Vencedor: ${partida.vencedor}, Data: ${partida.data}, Duração: ${partida.duracao}, Tipo: ${partida.tipo}`;
        listaHistorico.appendChild(item);
    });
}

function reiniciarJogo() {
    modalVencedor.style.display = 'none';
    iniciarJogo(modoUmJogador);
}

function voltarInicial() {
    telaJogo.style.display = 'none';
    telaHistorico.style.display = 'none';
    telaInicial.style.display = 'block';
    modalVencedor.style.display = 'none';
}