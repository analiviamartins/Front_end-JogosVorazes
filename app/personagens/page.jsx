'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import style from "../personagens/personagens.module.css"


function home() {
    const [vorazes, setVorazes] = useState([])
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();

    const deletar = async (id) => {
        const url = `/api/vorazes/${id}`;
        try {
          await axios.delete(url);
          setDadosApi(dadosApi.filter((voraze) => voraze.id !== id));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    const update = async (id) => {
        router.push(`/vorazes/${id}`);
      };

    useEffect(() => {
        async function JogosFetch() {
            try {
                const resposta = await axios.get("/api/vorazes");
                setVorazes(resposta.data.voraze)
                setDadosApi(resposta.data.voraze)
            } catch (error) {
                console.log("error fetching data:", error)
            }
        }

        JogosFetch();

    }, []);

    console.log(dadosApi)
    return (
        <div className={style.body}>
            <div className={style.titulo}>
                <img src="/image.png" width={500} height={300} />
            </div>
            {dadosApi ? (
                vorazes ? (

                    <div className={style.lista}>
                        {dadosApi.map((voraze) => (
                            
                                     
                            <div key={voraze.id} className={style.card}>
                                <div class="flip-card">
                            <div class="flip-card-inner">
                            <div class="flip-card-front">
                                
                                <div className={style.title}>
                                <h1 className={style.Nome}>
                                    {voraze.nome}
                                </h1>
                                </div>
                                <img src={voraze.imagem} width={150} height={195} alt={voraze.nome} />
                                <p>
                                    <strong>Idade:</strong> {voraze.idade}
                                </p>
                                <p>
                                    <strong>Distrito:</strong> {voraze.distrito}
                                </p>
                                <p>
                                    <strong>Gênero:</strong> {voraze.genero}
                                </p>
                                <p>
                                    <strong>Profissão:</strong> {voraze.profissao}
                                </p>
                                </div>
                                <div class="flip-card-back">
                                <p>
                                    <strong>Descrição:</strong> {voraze.descricao}
                                </p>
                                </div>
                            </div>
                            </div>
                    </div>
                        ))}
                    </div>
                    
                ) : (
                    <p>Carregando...</p>
                )
            ) : (
                <p>Não há personagens cadastrados</p>
            )}
        <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => deletar(student.id)}
        >
          <FaTrash /> Deletar
        </button>
        <button
          className={`${styles.button} ${styles.editButton}`}
          onClick={() => update(student.id)}
        >
          <FaEdit /> Atualizar
        </button>
      </div>
      </div>
    )};
export default home;


      
    
  