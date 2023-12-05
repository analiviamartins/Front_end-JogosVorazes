'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Vorazes, { Voraze } from '@/model/voraze';
import style from '../batalha/page.module.css';
import Ganhador from '../components/vencedor/vencedor';

const vorazesInstancia = new Vorazes();

function Page() {

  const [apiData, setApiData] = useState(null);

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const [player1Pontos, setPlayer1Pontos] = useState(0);
  const [player2Pontos, setPlayer2Pontos] = useState(0);

  const [ganhador, setGanhador] = useState(null);

  const [player1Vorazes, setPlayer1Vorazes] = useState(null);
  const [player2Vorazes, setPlayer2Vorazes] = useState(null);

  const [player1VorazeSelecionado, setPlayer1VorazeSelecionado] = useState(null);
  const [player2VorazeSelecionado, setPlayer2VorazeSelecionado] = useState(null);

  const [VorazeMostrar, setVorazeMostrar] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    async function JogosFetch() {
      try {
          const resposta = await axios.get("/api/vorazes");
          console.log(resposta.data.voraze);
          setApiData(resposta.data.voraze)
      } catch (error) {
          console.log("error fetching data:", error)
      }
    }
    JogosFetch();

  }, []);

  useEffect(() => {
    if (apiData) {
      apiData.forEach((voraze) => {
        const { id, attributes } = voraze;
        const novoVoraze = {
          ...attributes,
          id: id,
        };
        vorazesInstancia.addVoraze(novoVoraze);
      });
      setVorazes(vorazesInstancia.getVoraze())
    }
  }, [apiData]);

  const select5RandomVorazes = () => {
    const randomVorazes = [];
    const vorazes = vorazesInstancia.select5RandomVorazes();
    vorazes.forEach((voraze) => {
      randomVorazes.push(voraze);
    });

    return randomVorazes;
  }

  const [vorazes, setVorazes] = useState([]);

  useEffect(() => {
    if (vorazes.length > 0) {
      const randomVorazes = select5RandomVorazes();
      setPlayer1Vorazes(randomVorazes);
    }
  }, [vorazes]);

  useEffect(() => {
    if (vorazes.length > 0) {
      const randomVorazes = select5RandomVorazes();
      setPlayer2Vorazes(randomVorazes);
    }
  }, [vorazes]);

  function selecionarVoraze(player, voraze) {
    if (player == 'player1') {
      console.log('selecionar', voraze + player)
      setPlayer1VorazeSelecionado(voraze);
    } else {
      console.log('selecionar', voraze + player)
      setPlayer2VorazeSelecionado(voraze);
    }
  }

  const batalhar = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    const p1Indice = Number(player1VorazeSelecionado.ataque) + Number(player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.ataque) + Number(player2VorazeSelecionado.defesa);

    console.log("player 1 pontos: ", p1Indice);
    console.log("player 2 pontos: ", p2Indice);

    if (p1Indice == p2Indice) {
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log("Empate");
      limparCartasSelecionadas();

    } else if (p1Indice > p2Indice) {
      setPlayer1Pontos(player1Pontos + 1);
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log("Player 1 ganhou");
      setGanhador("Player 1");
      setModalOpen(true);
      setVorazeMostrar(player1VorazeSelecionado);
      limparCartasSelecionadas();

    } else {
      setPlayer2Pontos(player2Pontos + 1);
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log("Player 2 ganhou");
      setGanhador("Player 2");
      setModalOpen(true);
      setVorazeMostrar(player2VorazeSelecionado);
      limparCartasSelecionadas();
    }
  }

  const limparCartasSelecionadas = () => {
    setPlayer1VorazeSelecionado(null);
    setPlayer2VorazeSelecionado(null);
  }

  const removerCartaPerdedora = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    const p1Indice = Number(player1VorazeSelecionado.ataque + player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.ataque + player2VorazeSelecionado.defesa);

    if (p1Indice == p2Indice) {
      setPlayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
      setPlayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
    } else if (p1Indice > p2Indice) {
      setPlayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id != player2VorazeSelecionado.id));
    } else {
      setPlayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id != player1VorazeSelecionado.id));
    }
  }

  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.subDiv}>
          {
            player1VorazeSelecionado ? (
              <div className={style.subDiv}>
                <p>Cartas Player 1 - Pontos: {player1Pontos}</p>
                <div className={style.deckPlayers}>
                  {
                    player1VorazeSelecionado && (
                      <div className={style.herois} key={player1VorazeSelecionado.id}>
                        <h2>{player1VorazeSelecionado.nome}</h2>
                        <img className={style.imagem} onClick={() => selecionarVoraze('player1', player1VorazeSelecionado)} src={player1VorazeSelecionado.imagem} alt={player1VorazeSelecionado.nome} width={128} />
                        <p>Ataque: {player1VorazeSelecionado.ataque}</p>
                        <p>Defesa: {player1VorazeSelecionado.defesa}</p>
                      </div>
                    )
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
            player2VorazeSelecionado ? (
              <div className={style.subDiv}>
                <p>Cartas Player 2 - Pontos: {player2Pontos}</p>
                <div className={style.deckPlayers}>
                  {
                    player2VorazeSelecionado && (
                      <div className={style.herois} key={player2VorazeSelecionado.id}>
                        <h2>{player2VorazeSelecionado.nome}</h2>
                        <img className={style.imagem} onClick={() => selecionarVoraze('player2', player2VorazeSelecionado)} src={player2VorazeSelecionado.imagem} alt={player2VorazeSelecionado.nome} width={128} />
                        <p>Ataque: {player2VorazeSelecionado.ataque}</p>
                        <p>Defesa: {player2VorazeSelecionado.defesa}</p>
                      </div>
                    )
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
      <div className={style.heroisSelecionados}>
        <div>
          <p>Carta Selecionada Player 1</p>
          {
            player1VorazeSelecionado ? (
              <div className={style.herois} key={player1VorazeSelecionado.id}>
                <h2>{player1VorazeSelecionado.nome}</h2>
                <p>Ataque: {player1VorazeSelecionado.ataque}</p>
                <p>Defesa: {player1VorazeSelecionado.defesa}</p>
                <img className={style.imagem} src={player1VorazeSelecionado.imagem} alt={player1VorazeSelecionado.nome} width={128} />
              </div>
            ) : (
              <div>
                <p>Esperando Player 1</p>
              </div>
            )
          }
        </div>
        <div>
          <p>Carta Selecionada Player 2</p>
          {
            player2VorazeSelecionado ? (
              <div className={style.herois} key={player2VorazeSelecionado.id}>
                <h2>{player2VorazeSelecionado.nome}</h2>
                <p>Ataque: {player2VorazeSelecionado.ataque}</p>
                <p>Defesa: {player2VorazeSelecionado.defesa}</p>
                <img className={style.imagem} src={player2VorazeSelecionado.imagem} alt={player2VorazeSelecionado.nome} width={128} />
              </div>
            ) : (
              <div>
                <p>Esperando Player 2</p>
              </div>
            )
          }
        </div>
      </div>
      <div className={style.mainDiv}>
        {
          player1VorazeSelecionado && player2VorazeSelecionado ? (
            <div className={style.botao}>
              <button onClick={() => batalhar(player1VorazeSelecionado, player2VorazeSelecionado)}>Batalhar</button>
            </div>
          ) : (
            <div>
              <p>Selecione os personagens para batalhar</p>
            </div>
          )
        }
      </div>
      <div>
        {
          ganhador ? (
            <Ganhador isOpen={openModal} onClose={closeModal} winnerCard={VorazeMostrar} player={ganhador} />
          ) : null
        }
      </div>
    </>
  )
}
export default Page;