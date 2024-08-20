// Variáveis globais
let vida = 100;
let inventario = [];
let faseAtual = 'decisaoSair';
let sucesso = false;

// Elementos do DOM
const outputDiv = document.getElementById('output');
const inputField = document.getElementById('input');
const optionsDiv = document.getElementById('options');

// Função para atualizar o estado do jogo e as opções de interação
function updateGameState(description, options) {
    outputDiv.textContent = description;
    optionsDiv.innerHTML = '';  // Limpa opções anteriores

    // Adiciona opções de interação
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.onclick = () => {
            processInput(option.command);
        };
        optionsDiv.appendChild(button);
    });

    inputField.value = '';
}

// Função para explorar áreas
function explorar(area) {
    switch (area) {
        case 'decisaoSair':
            updateGameState(
                'Você tomou uma decisão importante para deixar seu país natal devido às dificuldades e ao governo. O que você faz agora?',
                [
                    { text: 'Ir ao aeroporto com seu colega', command: 'aeroporto' },
                    { text: 'Ficar e esperar mais um pouco', command: 'esperar' }
                ]
            );
            break;
        case 'aeroporto':
            updateGameState(
                'Você e seu colega chegaram ao aeroporto na Cidade do México. A sensação de medo e angústia é grande. Você sente que está começando uma nova jornada. O que você faz agora?',
                [
                    { text: 'Buscar informações sobre a viagem', command: 'buscarInformacoes' },
                    { text: 'Tentar relaxar e se preparar para a viagem', command: 'prepararViagem' }
                ]
            );
            break;
        case 'esperar':
            updateGameState(
                'Você decidiu esperar mais um pouco, mas o tempo passa e a necessidade de partir fica cada vez mais urgente. Você finalmente decide ir para o aeroporto.',
                [
                    { text: 'Ir ao aeroporto com seu colega', command: 'aeroporto' }
                ]
            );
            break;
        case 'buscarInformacoes':
            updateGameState(
                'Você busca informações sobre a viagem e descobre que há um risco de cruzar o Rio Grande. Você está determinado a prosseguir.',
                [
                    { text: 'Preparar-se para a travessia', command: 'prepararTravessia' },
                    { text: 'Procurar ajuda para a travessia', command: 'procurarAjudaTravessia' }
                ]
            );
            break;
        case 'prepararViagem':
            updateGameState(
                'Você tenta relaxar e se preparar mentalmente para a viagem. É um momento de grande tensão.',
                [
                    { text: 'Buscar informações sobre a viagem', command: 'buscarInformacoes' }
                ]
            );
            break;
        case 'prepararTravessia':
            updateGameState(
                'Você está pronto para atravessar o Rio Grande. É um momento de grande desafio, e você sabe que precisa estar focado.',
                [
                    { text: 'Tentar atravessar o rio', command: 'atravessarRio' },
                    { text: 'Buscar ajuda antes de atravessar', command: 'buscarAjudaTravessia' }
                ]
            );
            break;
        case 'procurarAjudaTravessia':
            updateGameState(
                'Você procura ajuda para a travessia e consegue algumas dicas importantes. Agora, você está mais preparado para enfrentar o desafio.',
                [
                    { text: 'Tentar atravessar o rio', command: 'atravessarRio' }
                ]
            );
            break;
        case 'atravessarRio':
            updateGameState(
                'Durante a travessia do Rio Grande, você ouve gritos de uma mulher em perigo. Você decide pular na água para salvá-la, e isso lhe dá força para continuar.',
                [
                    { text: 'Continuar a jornada', command: 'continuarJornada' }
                ]
            );
            break;
        case 'continuarJornada':
            updateGameState(
                'Você consegue atravessar o Rio Grande e continua sua jornada. Seu pedido de asilo foi atendido. Agora você está treinando muito para se preparar para as Olimpíadas.',
                [
                    { text: 'Treinar no centro de treinamento', command: 'centroTreinamento' },
                    { text: 'Procurar uma nova forma de treinamento', command: 'procurarNovoTreinamento' }
                ]
            );
            break;
        case 'procurarNovoTreinamento':
            updateGameState(
                'Você está procurando novas formas de treinamento e encontra um novo centro de treinamento que parece promissor.',
                [
                    { text: 'Ir para o novo centro de treinamento', command: 'novoCentroTreinamento' },
                    { text: 'Voltar ao campo de refugiados', command: 'campoRefugiados' }
                ]
            );
            break;
        case 'novoCentroTreinamento':
            updateGameState(
                'Você chega ao novo centro de treinamento e encontra um treinador que lhe oferece um desafio. Se você superar esse desafio, ganhará novas habilidades.',
                [
                    { text: 'Enfrentar o desafio', command: 'enfrentarDesafioTreinamento' },
                    { text: 'Voltar ao campo de refugiados', command: 'campoRefugiados' }
                ]
            );
            break;
        case 'centroTreinamento':
            updateGameState(
                'Você está no centro de treinamento com o treinador Alain Nogueras. A Olimpíada de Paris parece um sonho distante.',
                [
                    { text: 'Participar de um treino intenso', command: 'treinar' },
                    { text: 'Procurar outras formas de treinamento', command: 'procurarNovoTreinamento' }
                ]
            );
            break;
        case 'campoRefugiados':
            updateGameState(
                'Você está de volta ao campo de refugiados. Há um mural de notícias e algumas barracas ao redor.',
                [
                    { text: 'Ir para o Centro de Treinamento', command: 'centroTreinamento' },
                    { text: 'Ir para a Barraca de Ajuda', command: 'explorar barracaAjuda' },
                    { text: 'Olhar o Mural de Notícias', command: 'explorar muralNoticias' }
                ]
            );
            break;
        case 'desafioFinal':
            updateGameState(
                'Você está pronto para a competição final antes das Olimpíadas. Você precisa demonstrar todas as suas habilidades.',
                [
                    { text: 'Enfrentar o desafio final', command: 'enfrentarDesafioFinal' }
                ]
            );
            break;
        case 'salasOlympiadicas':
            if (vida >= 50) {
                sucesso = true;
                updateGameState(
                    'Você chegou às salas olímpicas e, com sua determinação e habilidades, conseguiu conquistar uma vaga nas Olimpíadas! ' +
                    'Parabéns, você superou todos os desafios e alcançou seu sonho.',
                    []
                );
            } else {
                sucesso = false;
                updateGameState(
                    'Você chegou às salas olímpicas, mas a falta de preparação fez com que você não conseguisse competir. ' +
                    'Você falhou em alcançar seu sonho desta vez, mas sua jornada ainda é inspiradora.',
                    []
                );
            }
            break;
        default:
            updateGameState('Área desconhecida. Tente explorar outro lugar.', []);
            break;
    }
}

// Função para coletar itens
function coletar(item) {
    if (item === 'empatia' || item === 'coragem') {
        inventario.push(item);
        updateGameState('Você coletou ' + item + '.', [
            { text: 'Voltar', command: 'explorar ' + faseAtual }
        ]);
    } else {
        updateGameState('Item desconhecido.', [
            { text: 'Voltar', command: 'explorar ' + faseAtual }
        ]);
    }
}

// Função para interagir com NPCs e enfrentar desafios
function interagir(acao) {
    switch (acao) {
        case 'enfrentarDesafioTreinamento':
            if (faseAtual === 'centroTreinamento' || faseAtual === 'novoCentroTreinamento') {
                if (vida >= 60) {
                    vida += 20;
                    updateGameState(
                        'Você enfrentou o desafio de treinamento e se saiu muito bem. Sua vida aumentou.',
                        [
                            { text: 'Voltar ao Campo de Refugiados', command: 'explorar campoRefugiados' },
                            { text: 'Ir para o Desafio Final', command: 'desafioFinal' }
                        ]
                    );
                } else {
                    vida -= 20;
                    updateGameState(
                        'Você tentou enfrentar o desafio de treinamento, mas não teve sucesso. Sua vida está em ' + vida + '.',
                        [
                            { text: 'Voltar ao Campo de Refugiados', command: 'explorar campoRefugiados' }
                        ]
                    );
                }
            } else {
                updateGameState('Você não pode enfrentar um desafio aqui.', [
                    { text: 'Voltar', command: 'explorar ' + faseAtual }
                ]);
            }
            break;
        case 'enfrentarDesafioFinal':
            if (faseAtual === 'desafioFinal') {
                if (vida >= 50) {
                    updateGameState(
                        'Você enfrentou o desafio final e conseguiu! Agora você está pronto para as Olimpíadas.',
                        [
                            { text: 'Ir para as Salas Olímpicas', command: 'salasOlympiadicas' }
                        ]
                    );
                } else {
                    updateGameState(
                        'Você tentou enfrentar o desafio final, mas sua preparação não foi suficiente.',
                        [
                            { text: 'Voltar ao Campo de Refugiados', command: 'explorar campoRefugiados' }
                        ]
                    );
                }
            } else {
                updateGameState('Você não pode enfrentar o desafio final aqui.', [
                    { text: 'Voltar', command: 'explorar ' + faseAtual }
                ]);
            }
            break;
        default:
            updateGameState('Ação desconhecida.', [
                { text: 'Voltar', command: 'explorar ' + faseAtual }
            ]);
            break;
    }
}

// Função para processar o input do jogador
function processInput(command = null) {
    let input = command || inputField.value.trim().toLowerCase();
    
    if (input.startsWith('explorar ')) {
        explorar(input.replace('explorar ', ''));
    } else if (input.startsWith('interagir ')) {
        interagir(input.replace('interagir ', ''));
    } else if (input === 'coletar empatia') {
        coletar('empatia');
    } else if (input === 'coletar coragem') {
        coletar('coragem');
    } else {
        updateGameState('Comando não reconhecido. Tente novamente.', [
            { text: 'Voltar', command: 'explorar ' + faseAtual }
        ]);
    }
}

// Início do jogo
updateGameState(
    'Você tomou uma decisão muito importante para sua vida: deixar seu país natal devido às dificuldades e ao governo. O que você faz agora?',
    [
        { text: 'Ir ao aeroporto com seu colega', command: 'aeroporto' },
        { text: 'Ficar e esperar mais um pouco', command: 'esperar' }
    ]
);

 
