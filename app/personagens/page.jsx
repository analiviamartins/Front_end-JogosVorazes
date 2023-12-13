// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
'use client'

// Importa as bibliotecas e componentes necessárioss
import axios from "axios"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Modal from "../components/modal/page.jsx"
import style from "../personagens/personagens.module.css"
import Link from "next/link";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";
import { PiBookBookmarkFill } from "react-icons/pi";
import Header from "../components/header/page.jsx";
import Footer from "../components/footer/page.jsx";
import Loading from "../components/loading/page.jsx";

// Define a função do componente Home
function home() {
   // Define o estado inicial para os vorazes e os dados da API
 const [vorazes, setVorazes] = useState([]);
 const [dadosApi, setDadosApi] = useState([]);

 // Obtém o objeto de roteamento do Next.js
 const router = useRouter();

 // Define o estado inicial para o modal e o estado do modal
 const [modalMostar, setModalMostrar] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 // Define o estado inicial para os filtros de nome, distrito e profissão
 const [nomeFiltro, setNomeFiltro] = useState("");
 const [distritoFiltro, setDistritoFiltro] = useState("");
 const [profissaoFiltro, setProfissaoFiltro] = useState("");

 // Define a função para abrir o modal
  const isOpen = () => {
    setIsModalOpen(true);
  }

  // Define a função para fechar o modal
  const onClose = () => {
    setIsModalOpen(false);
  }

  // Define a função para deletar um personagem
  const deletar = async (id) => {
    const url = `/api/vorazes/${id}`;
    try {
      await axios.delete(url);
      if (dadosApi) {
        setDadosApi(dadosApi.filter((vorazes) => vorazes.id !== id));
      }
      if (element) {
        element.parentNode.removeChild(element);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

// Define a função para atualizar um personagem
  const update = async (id) => {
    router.push(`/personagens/${id}`);
  };

  // Define a função para buscar os personagens
  useEffect(() => {
    async function fetchVoraze() {
      try {

        let queryParams = '';

        if (nomeFiltro) {
          queryParams += `nome=${nomeFiltro}&`
        }

        if (distritoFiltro) {
          queryParams += `distrito=${distritoFiltro}&`
        }
        if (profissaoFiltro) {
          queryParams += `profissao=${profissaoFiltro}&`
        }

        const resposta = await axios.get(`/api/vorazes?${queryParams}`);

        setVorazes(resposta.data.vorazes)
        setDadosApi(resposta.data.vorazes)
      } catch (error) {
        console.log("error fetching data:", error)
      }
    }

    fetchVoraze();

  }, [nomeFiltro, distritoFiltro, profissaoFiltro]);

// Retorna o JSX do componente
  return (
    <div className={style.body}>
        <Header />
      <div className={style.titulo}>
        <Loading />
        <img src="/image.png" width={500} height={300} />
      </div>
      <div className={style.actions}>
        <Link href="/personagens/cadastro">
          <button className={`${style.button} ${style.primaryButton}`}>
            Cadastrar personagem
          </button>
        </Link>
      </div>
      <div className={style.inputs}>
      <input className={style.pesquisa} type="text" placeholder="Filtrar por nome" value={nomeFiltro} onChange={(e) => setNomeFiltro(e.target.value)} />
      <input className={style.pesquisa} type="text" placeholder="Filtrar por distrito" value={distritoFiltro} onChange={(e) => setDistritoFiltro(e.target.value)} />
      <input className={style.pesquisa} type="text" placeholder="Filtrar por profissão" value={profissaoFiltro} onChange={(e) => setProfissaoFiltro(e.target.value)} />
      </div>
      <div className={style.lista}>
      {dadosApi ? (
        dadosApi.map((vorazes) => (
          <div key={vorazes.id} className={style.card}>
            <img src={vorazes.imagem} width={150} height={175} className={style.img} alt={vorazes.nome} />
            <div class="container">
              <div className={style.title}>
                <h1 className={style.Nome}>
                  {vorazes.nome}
                </h1>
              </div>
            </div>
            <div className={style.texto}>
              <p>
                <strong>Idade:</strong> {vorazes.idade}
              </p>
              <p>
                <strong>Distrito:</strong> {vorazes.distrito}
              </p>
              <p>
                <strong>Gênero:</strong> {vorazes.genero}
              </p>
              <p>
                <strong>Profissão:</strong> {vorazes.profissao}
              </p>
            </div>
            <div className={style.buttons}>
              <button
                className={`${style.button} ${style.viewButton}`}
                onClick={() => {
                  setModalMostrar(vorazes);
                  isOpen();
                }}
              >
                <PiBookBookmarkFill />
              </button>
              <button
                className={`${style.button} ${style.deleteButton}`}
                onClick={() => deletar(vorazes.id)}
              >
                <FaTrash />
              </button>
              <button
                className={`${style.button} ${style.editButton}`}
                onClick={() => update(vorazes.id)}
              >
                <RiPencilFill />
              </button>
            </div>

            {isModalOpen ? (
              <Modal isOpen={isOpen} onClose={onClose} vorazes={modalMostar} />
            ) : null}

          </div>
        ))
      ) : (
        <p>Não há personagens cadastrados</p>
      )}
      <Footer />
    </div>
    </div>
  )

};
export default home;