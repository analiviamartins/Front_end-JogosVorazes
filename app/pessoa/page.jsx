'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Modal from "../components/modal/page.jsx"
import style from "../pessoa/page.module.css"
import Link from "next/link";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";
import { PiBookBookmarkFill } from "react-icons/pi";


function home() {
  const [equipe, setEquipe] = useState([])
  const [dadosApi, setDadosApi] = useState([]);
  const router = useRouter();

  const [modalMostar, setModalMostrar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const deletar = async (id) => {
    const url = `/api/equipe/${id}`;
    try {
      await axios.delete(url);
      if (dadosApi) {
        setDadosApi(dadosApi.filter((equipe) => equipe.id !== id));
      }
      if (element) {
        element.parentNode.removeChild(element);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const update = async (id) => {
    router.push(`/equipe/${id}`);
  };

  useEffect(() => {
    async function fetchEquipe() {
      try {
        const resposta = await axios.get(`/api/equipe`);

        setEquipe(resposta.data.equipe)
        setDadosApi(resposta.data.equipe)
      } catch (error) {
        console.log("error fetching data:", error)
      }
    }

    fetchEquipe();

  }, []);


  return (
    <div className={style.body}>
      <div className={style.titulo}>
        <img src="/image.png" width={500} height={300} />
      </div>
      <div className={style.actions}>
        <Link href="/pessoa/cadastro">
          <button className={`${style.button} ${style.primaryButton}`}>
            Cadastrar Membro
          </button>
        </Link>
      </div>
      {dadosApi ? (
        dadosApi.map((equipe) => (
          <div key={equipe.id} className={style.card}>
            <img src={equipe.img} width={150} height={175} className={style.img} alt={equipe.nome} />
            <div class="container">
              <div className={style.title}>
                <h1 className={style.Nome}>
                  {equipe.nome}
                </h1>
              </div>
            </div>
            <div className={style.texto}>
              <p>
                <strong>Idade:</strong> {equipe.idade}
              </p>
              <p>
                <strong>Email:</strong> {equipe.distrito}
              </p>
              <p>
                <strong>Hobby:</strong> {equipe.genero}
              </p>
            </div>
            <div className={style.buttons}>
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

          </div>
        ))
      ) : (
        <p>Não há personagens cadastrados</p>
      )}
    </div>
  )
};
export default home;