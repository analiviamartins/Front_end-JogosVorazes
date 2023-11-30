'use client'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import listVorazes from '../../model/listVorazes';
import { vorazes } from '@/model/persoVorazes';
import Ganhador from '../components/vencedor/vencedor';
import style from '../batalha/page.module.css';

const vorazesInstancia = new listVorazes();

function page() {

  const [persos, setPersos] = useState([]);
  const [apiData, setApiData] = useState(null);

  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);

  const [player1Pontos, setplayer1Pontos] = useState(0);
  const [player2Pontos, setplayer2Pontos] = useState(0);

  const [ganhador, setGanhador] = useState(null);

  const [player1Vorazes, setplayer1Vorazes] = useState(null);
  const [player2Vorazes, setplayer2Vorazes] = useState(null);

  const [player1VorazeSelecionado, setplayer1VorazeSelecionado] = useState(null);
  const [player2VorazeSelecionado, setplayer2VorazeSelecionado] = useState(null);

  const [VorazeMostar, setVorazeMostrar] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    async function JogosFetch() {
        try {
            const resposta = await axios.get("/api/vorazes");
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
        const { id } = voraze;
        const novoVoraze = new vorazes({
            id: id,
            nome: voraze.nome,
            distrito: voraze.distrito,
            dano: voraze.dano,
            defesa: voraze.defesa,
            imagem: voraze.imagem,
        });

        vorazesInstancia.addPerso(novoVoraze);
      });
      setPersos(vorazesInstancia.getPersos())
    }
  }, [apiData]);

  const select5RandomPersos = () => {
    const randomPersos = [];
    const vorazes = vorazesInstancia.select5RandomPersos();
    vorazes.forEach((voraze) => {
        randomPersos.push(voraze);
    }
    );
    return randomPersos;
  }

  useEffect(() => {
    if (vorazes.length > 0) {
      const randomPersos = select5RandomPersos();
      setplayer1Vorazes(randomPersos);
    }
  }, [vorazes]);

  useEffect(() => {
    if (vorazes.length > 0) {
      const randomPersos = select5RandomPersos();
      setplayer2Vorazes(randomPersos);
    }
  }, [vorazes]);


  function selecionarPerso(player, voraze) {
    if (player == 'player1') {
      console.log('selecionar', voraze + player)
      setplayer1VorazeSelecionado(voraze,);
    } else {
      console.log('selecionar', voraze + player)
      setplayer2VorazeSelecionado(voraze);
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
    setplayer1VorazeSelecionado(null);
    setplayer2VorazeSelecionado(null);
  }

  const removerCartaPerdedora = (player1VorazeSelecionado, player2VorazeSelecionado, setplayer1Vorazes, setplayer2Vorazes) => {
    const p1Indice = Number(player1VorazeSelecionado.dano + player1VorazeSelecionado.defesa);
    const p2Indice = Number(player2VorazeSelecionado.dano + player2VorazeSelecionado.defesa);
  
    if (p1Indice === p2Indice) {
      setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
      setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
    } else if (p1Indice > p2Indice) {
      setplayer1Vorazes(player1Vorazes.filter((voraze) => voraze.id !== player1VorazeSelecionado.id));
    } else {
      setplayer2Vorazes(player2Vorazes.filter((voraze) => voraze.id !== player2VorazeSelecionado.id));
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
            <Ganhador isOpen={modalOpen} onClose={closeModal} winner={VorazeMostar} player={ganhador} />
          ) : (
            <Ganhador isOpen={modalOpen} onClose={closeModal} winner={VorazeMostar} player={ganhador} />
          )
        }
      </div>
    </>

  )
}

export default page