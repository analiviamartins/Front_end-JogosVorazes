'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import  Vorazes, { Voraz } from '@/model/voraze';
import Ganhador from '../components/vencedor/vencedor';
import style from '../batalha/page.module.css';

const vorazesInstancia = new Vorazes();

function page() {

  const [vorazes, setVorazes] = useState([]);
  const [apiData, setApiData] = useState();

  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);

  const [player1Pontos, setplayer1Pontos] = useState(0);
  const [player2Pontos, setplayer2Pontos] = useState(0);

  const [ganhador, setGanhador] = useState(null);

  const [player1Vorazes, setplayer1Vorazes] = useState(null);
  const [player2Vorazes, setplayer2Vorazes] = useState(null);

  const [player1VorazeSelecionado, setPlayer1VorazeSelecionado] = useState(null);
  const [player2VorazeSelecionado, setPlayer2VorazeSelecionado] = useState(null);

  const [VorazeMostar, setVorazeMostrar] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const quantidadeVorazes = (array) => {
    let quantidade = array.length, valor, randomVorazes;
   
    while (0 !== quantidade) {
   
      randomVorazes = Math.floor(Math.random() * quantidade);
      quantidade -= 1;
   
      valor = array[quantidade];
      array[quantidade] = array[randomVorazes];
      array[randomVorazes] = valor;
    }
   
    return array;
  }

  useEffect(() => {
    async function JogosFetch() {
        try {
            const resposta = await axios.get("/api/vorazes");
            const data = resposta.data.voraze;
            const quantidadeVorazesData = quantidadeVorazes(data);
            setApiData(quantidadeVorazesData.slice(0, 6));
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
        const novoVoraze = new Voraz ({
          id: id,
          ...attributes
        });

        vorazesInstancia.addVoraze(novoVoraze);
      });
      setVorazes(vorazesInstancia.getVoraze())
    }
  }, [apiData]);

  const select5RandomVorazes = (vorazes) => {
    const randomIndices = [];
    while (randomIndices.length < 5) {
      const randomIndex = Math.floor(Math.random() * vorazes.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    const randomVorazes = randomIndices.map(index => vorazes[index]);
    return randomVorazes;
   };

   useEffect(() => {
    if (Vorazes.length > 0) {
      const randomVorazes = select5RandomVorazes(vorazes);
      setplayer1Vorazes(randomVorazes);
    }
   }, [Vorazes]);
   
   useEffect(() => {
    if (Vorazes.length > 0) {
      const randomVorazes = select5RandomVorazes(vorazes);
      setplayer2Vorazes(randomVorazes);
    }
   }, [Vorazes]);


  function selecionarPerso(player, voraze) {
    if (player == 'player1') {
      console.log('selecionar', voraze + player)
      setPlayer1VorazeSelecionado(voraze,);
    } else {
      console.log('selecionar', voraze + player)
      setPlayer2VorazeSelecionado(voraze);
    }
  }

  const batalhar = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    const p1Indice = Number(player1VorazeSelecionado.dano) + Number(player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.dano) + Number(player2VorazeSelecionado.defesa);

    console.log('Player 1 Pontos:', p1Indice);
    console.log('Player 2 Pontos:', p2Indice);

    if (p1Indice == p2Indice) { // Condição de empate
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log('Empate');
      limparCartasSelecionadas();

    } else if (p1Indice > p2Indice) {
      setplayer1Pontos(player1Pontos + 1);
      removerCartaPerdedora(player1VorazeSelecionado, player2VorazeSelecionado);
      console.log('Player 1 ganhou')
      setGanhador('Jogador 1');
      setModalOpen(true);
      setVorazeMostrar(player1VorazeSelecionado)
      limparCartasSelecionadas();

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

  const limparCartasSelecionadas = () => {
    setPlayer1VorazeSelecionado(null);
    setPlayer2VorazeSelecionado(null);
  }

  const removerCartaPerdedora = (player1VorazeSelecionado, player2VorazeSelecionado) => {
    const p1Indice = Number(player1VorazeSelecionado.ataque) + Number(player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.ataque) + Number(player2VorazeSelecionado.defesa);
   
    if (p1Indice === p2Indice) {
     if (player1VorazeSelecionado && player2VorazeSelecionado) {
       setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
       setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
     }
    } else if (p1Indice > p2Indice) {
     if (player1VorazeSelecionado && Array.isArray(player1Vorazes)) {
       setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
     }
    } else {
     if (player2VorazeSelecionado && Array.isArray(player2Vorazes)) {
       setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
     }
    }
   };

  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.subDiv}>
          {
            apiData ? (
              <div  className={style.subDiv}>
                <p>Cartas Player 1 - Pontos: {player1Pontos}</p>
                <div  className={style.deckPlayers}>
                  {
                    apiData.map((vorazes) => (
                      <div  className={style.herois} key={vorazes.id}>
                        <h2>{vorazes.nome}</h2>
                        <img className={style.imagem} onClick={() => selecionarPerso('player1', vorazes)} src={vorazes.imagem} alt={vorazes.nome} />
                        <p>Ataque: {vorazes.dano}</p>
                        <p>Defesa: {vorazes.defesa}</p>
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
              <div  className={style.subDiv}>
                <p>Cartas Player 2  - Pontos: {player2Pontos}</p>
                <div className={style.deckPlayers}>
                  {
                    apiData.map((voraze) => (
                      <div className={style.herois} key={voraze.id}>
                        <h2>{voraze.nome}</h2>
                        <img  className={style.imagem} onClick={() => selecionarPerso('player2', voraze)} src={voraze.imagem} alt={voraze.nome} width={128} />
                        <p>Ataque: {voraze.dano}</p>
                        <p>Defesa: {voraze.defesa}</p>
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
      <div className={style.heroisSelecionados}>
        <div>
          <p>Carta Selecionada Player 1</p>
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
                <img className={style.imagem} src={player2VorazeSelecionado.imagem} alt={player2VorazeSelecionado.nome} width={128} />
                <p>Ataque: {player2VorazeSelecionado.dano}</p>
                <p>Defesa: {player2VorazeSelecionado.defesa}</p>
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
              <p>Selecione os heróis para batalhar</p>
            </div>
          )
        }
      </div>
      <div>
        {
          ganhador == 'Jogador 1' ? (
            <Ganhador isOpen={openModal} onClose={closeModal} winner={VorazeMostar} player={ganhador} />
          ) : (
            <Ganhador isOpen={openModal} onClose={closeModal} winner={VorazeMostar} player={ganhador} />
          )
        }
      </div>
    </>

  )
}

export default page