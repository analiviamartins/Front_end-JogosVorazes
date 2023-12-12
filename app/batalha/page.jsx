// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
'use client'

// Importando as bibliotecas e componentes necessários.
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Vorazes, { Voraz } from '@/model/voraze';
import Ganhador from '../components/vencedor/vencedor';
import style from '../batalha/page.module.css';
import Header from '../components/header/page.jsx';
import Footer from '../components/footer/page.jsx';
import Loading from '../components/loading/Loading.jsx';

// Criando uma nova instância da classe Vorazes.
const vorazesInstancia = new Vorazes();

// Definindo o componente React.
function page() {

  // Definindo variáveis de estado para Vorazes e dados da API
  const [vorazes, setVorazes] = useState([]);
  const [apiData, setApiData] = useState([]);

  // Definindo variáveis de estado para os jogadores.
  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);

  // Definindo variáveis de estado para os pontos dos jogadores.
  const [player1Pontos, setplayer1Pontos] = useState(0);
  const [player2Pontos, setplayer2Pontos] = useState(0);

  // Definindo variável de estado para o vencedor.
  const [ganhador, setGanhador] = useState(null);

  // Definindo variáveis de estado para os Vorazes dos jogadores.
  const [player1Vorazes, setplayer1Vorazes] = useState(null);
  const [player2Vorazes, setplayer2Vorazes] = useState(null);

  // Definindo variáveis de estado para o Voraze selecionado pelos jogadores.
  const [player1VorazeSelecionado, setPlayer1VorazeSelecionado] = useState(null);
  const [player2VorazeSelecionado, setPlayer2VorazeSelecionado] = useState(null);

  // Definindo variável de estado para o Voraze a ser mostrado.
  const [VorazeMostar, setVorazeMostrar] = useState(null);

  // Definindo variável de estado para o estado do modal.
  const [modalOpen, setModalOpen] = useState(false);

  // Função para abrir o modal.
  const openModal = () => {
    setModalOpen(true);
  };

  // Função para fechar o modal.
  const closeModal = () => {
    setModalOpen(false);
  };

  // Função para embaralhar um array de Vorazes.
  const quantidadeVorazes = (array) => {
    let quantidade = array.length, valor, randomVorazes;

    // Enquanto a quantidade de Vorazes for diferente de zero, embaralhe o array.
    while (0 !== quantidade) {
      randomVorazes = Math.floor(Math.random() * quantidade);
      quantidade -= 1;

      valor = array[quantidade];
      array[quantidade] = array[randomVorazes];
      array[randomVorazes] = valor;
    }

    // Retorna o array embaralhado.
    return array;
  }

  // Hook useEffect que é executado quando o componente é montado.
  // Faz uma requisição GET para a API e armazena os dados no estado.
  useEffect(() => {
    async function JogosFetch() {
      try {
        const resposta = await axios.get("/api/vorazes");
        const data = resposta.data.voraze;
        const quantidadeVorazesData = quantidadeVorazes(data);
        const firstSixElements = quantidadeVorazesData.slice(0, 6);
        const lastSixElements = quantidadeVorazesData.slice(-6);
        setApiData([...firstSixElements, ...lastSixElements]);
      } catch (error) {
        console.log("error fetching data:", error)
      }
    }
    JogosFetch();
  }, []);

  // Hook useEffect que é executado quando os dados da API mudam.
  // Cria uma nova instância de Voraz para cada item nos dados da API e adiciona-os à instância de Vorazes.
  useEffect(() => {
    if (apiData) {
      apiData.forEach((voraze) => {
        const { id, attributes } = voraze;
        const novoVoraze = new Voraz({
          id: id,
          ...attributes
        });

        vorazesInstancia.addVoraze(novoVoraze);
      });
      setVorazes(vorazesInstancia.getVoraze())
    }
  }, [apiData]);

  // Função para selecionar um Voraze para um jogador.
  function selecionarPerso(player, voraze) {
    if (player == 'player1') {
      // Se o jogador for 'player1', seleciona o Voraze para 'player1'.
      console.log('selecionar', voraze + player)
      setPlayer1VorazeSelecionado(voraze,);
    } else {
      // Se o jogador for 'player2', seleciona o Voraze para 'player2'.
      console.log('selecionar', voraze + player)
      setPlayer2VorazeSelecionado(voraze);
    }
  }

  // Função para lidar com a batalha entre dois Vorazes.
  const batalhar = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    // Calcula os índices de pontos para cada jogador com base em seus atributos de dano e defesa.
    const p1Indice = Number(player1VorazeSelecionado.dano) + Number(player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.dano) + Number(player2VorazeSelecionado.defesa);

    console.log('Player 1 Pontos:', p1Indice);
    console.log('Player 2 Pontos:', p2Indice);

    // Se os índices forem iguais, remove as cartas e limpa as cartas selecionadas.
    if (p1Indice == p2Indice) { // Condição de empate
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log('Empate');
      limparCartasSelecionadas();

      // Se o índice do jogador 1 for maior, adiciona um ponto ao jogador 1, remove a carta perdente e limpa as cartas selecionadas.
    } else if (p1Indice > p2Indice) {
      setplayer1Pontos(player1Pontos + 1);
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log('Player 1 ganhou')
      setGanhador('Jogador 1');
      setModalOpen(true);
      setVorazeMostrar(player1VorazeSelecionado)
      limparCartasSelecionadas();

      // Se o índice do jogador 2 for maior, adiciona um ponto ao jogador 2, remove a carta perdente e limpa as cartas selecionadas.
    } else {
      setplayer2Pontos(player2Pontos + 1);
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log('Player 2 ganhou')
      setGanhador('Jogador 2');
      setVorazeMostrar(player2VorazeSelecionado)
      setModalOpen(true);
      limparCartasSelecionadas();
    }
  }

  // Função para limpar as cartas selecionadas.
  const limparCartasSelecionadas = () => {
    setPlayer1VorazeSelecionado(null);
    setPlayer2VorazeSelecionado(null);
  }

  // Função para remover a carta perdente.
  const removerCartaPerdedora = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    // Calcula os índices de pontos para cada jogador com base em seus atributos de ataque e defesa.
    const p1Indice = Number(player1VorazeSelecionado.ataque) + Number(player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.ataque) + Number(player2VorazeSelecionado.defesa);

    // Se os índices forem iguais, remove as cartas dos jogadores.
    if (p1Indice === p2Indice) {
      if (player1VorazeSelecionado && player2VorazeSelecionado) {
        setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
        setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
      }
      // Se o índice do jogador 1 for maior, remove a carta do jogador 1.
    } else if (p1Indice > p2Indice) {
      if (player1VorazeSelecionado && Array.isArray(player1Vorazes)) {
        setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
      }
      // Se o índice do jogador 2 for maior, remove a carta do jogador 2.
    } else {
      if (player2VorazeSelecionado && Array.isArray(player2Vorazes)) {
        setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
      }
    }
  };

  // Retorna o JSX para renderizar o componente.
  return (
    <>
    {/*Chamada do header*/}
      <Header />
      {/*Criação da div principal*/}
      <div className={style.mainDiv}>
      
        <div className={style.subDiv}>
          {
            apiData ? (
              <div className={style.subDiv}>
                <p className={style.pontos}><strong>Cartas time 1 - Pontos: </strong>{player1Pontos}</p>
                <div className={style.deckPlayers}>
                  {
                    //requisição da API
                    apiData.slice(0, 6).map((vorazes) => (
                      <div className={style.herois} key={vorazes.id}>
                        <h2>{vorazes.nome}</h2>
                        <img className={style.imagem} onClick={() => selecionarPerso('player1', vorazes)} src={vorazes.imagem} alt={vorazes.nome} />
                        <p><strong>Ataque:</strong>{vorazes.dano}</p>
                        <p><strong>Defesa:</strong>{vorazes.defesa}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div>
                <p>Carregando Player 1...</p>
              </div>
            )
          }
        </div>
        <div className={style.subDiv}>
          {
            apiData ? (
              <div className={style.subDiv}>
                {/*Chamada do loading*/}
                <Loading />
                <p className={style.pontos}><strong>Cartas time 2 - Pontos:</strong>{player2Pontos}</p>
                <div className={style.deckPlayers}>
                  {
                    //requisição da API
                    apiData.slice(-6).map((voraze) => (
                      <div className={style.herois} key={voraze.id}>
                        <h2>{voraze.nome}</h2>
                        <img className={style.imagem} onClick={() => selecionarPerso('player2', voraze)} src={voraze.imagem} alt={voraze.nome} width={128} />
                        <p><strong>Ataque:</strong>{voraze.dano}</p>
                        <p><strong>Defesa:</strong>{voraze.defesa}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div>
                <p>Carregando Player 2...</p>
              </div>
            )
          }
        </div>

      </div>
      {/*Selecionar carta*/}
      <div className={style.heroisSelecionados}>
        <div>
          <p><strong>Carta Selecionada Player 1</strong></p>
          {
            player1VorazeSelecionado ? (
              <div className={style.herois} key={player1VorazeSelecionado.id}>
                <h2>{player1VorazeSelecionado.nome}</h2>
                <img className={style.imagem} src={player1VorazeSelecionado.imagem} alt={player1VorazeSelecionado.nome} width={128} />
                <p>Ataque: {player1VorazeSelecionado.dano}</p>
                <p>Defesa: {player1VorazeSelecionado.defesa}</p>
              </div>
            ) : (
              <div>
                <p><strong>Esperando Player 1</strong></p>
              </div>
            )
          }
        </div>
        {/*Selecionar carta*/}
        <div>
          <p><strong>Carta Selecionada Player 2</strong></p>
          {
            player2VorazeSelecionado ? (
              <div className={style.herois} key={player2VorazeSelecionado.id}>
                <h2>{player2VorazeSelecionado.nome}</h2>
                <img className={style.imagem} src={player2VorazeSelecionado.imagem} alt={player2VorazeSelecionado.nome} width={128} />
                <p>Ataque: {player2VorazeSelecionado.dano}</p>
                <p>Defesa: {player2VorazeSelecionado.defesa}</p>
              </div>
            ) : (
              <div>
                <p><strong>Esperando Player 2</strong></p>
              </div>
            )
          }
        </div>
      </div>

      {/*Criaçao da div batalhar*/}
      <div className={style.mainDiv}>
        {
          player1VorazeSelecionado && player2VorazeSelecionado ? (
            <div className={style.botao}>
              <button onClick={() => batalhar(player1VorazeSelecionado, player2VorazeSelecionado)}>Batalhar</button>
            </div>
          ) : (
            <div>
              <p><strong>Selecione os heróis para batalhar</strong></p>
            </div>
          )
        }
      </div>

      {/*Exibir ganhador*/}
      <div>
        {
          ganhador == 'Jogador 1' ? (
            <Ganhador isOpen={openModal} onClose={closeModal} winner={VorazeMostar} player={ganhador} />
          ) : null
        }
      </div>
      
      {/*Chamda do footer*/}
      <Footer />
    </>

  )
}

//Exporte da função
export default page