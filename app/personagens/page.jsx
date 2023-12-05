'use client'
import axios from "axios"
import { Children, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Modal from "../components/modal/page.jsx"
import style from "../personagens/personagens.module.css"
import styles from "../personagens/cadastro/page.module.css"
import Link from "next/link";


function home() {
    const [vorazes, setVorazes] = useState([])
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();


    const [isModalOpen, setIsModalOpen] = useState(false);

    const isOpen = () => {
        setIsModalOpen(true);
    }

    const onClose = () => {
        setIsModalOpen(false);
    }

    const deletar = async (id) => {
        const url = `/api/vorazes/${id}`;
        try {
            await axios.delete(url);
            setDadosApi(dadosApi.filter((vorazes) => vorazes.id !== id));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const update = async (id) => {
        router.push(`/personagens/${id}`);
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
            <div className={styles.actions}>
                <Link href="/personagens/cadastro">
                    <button className={`${styles.button} ${styles.primaryButton}`}>
                        Cadastrar personagem
                    </button>
                </Link>
            </div>
            {dadosApi ? (
                vorazes ? (

                    <div className={style.lista}>

                        {dadosApi.map((vorazes) => (
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
                                <div className={styles.buttons}>
                                    <button
                                        className={styles.button}
                                        onClick={isOpen}
                                    >
                                        modal
                                    </button>
                                    <button
                                        className={`${styles.button} ${styles.deleteButton}`}
                                        onClick={() => deletar(vorazes.id)}
                                    >
                                        Deletar
                                    </button>
                                    <button
                                        className={`${styles.button} ${styles.editButton}`}
                                        onClick={() => update(vorazes.id)}
                                    >
                                        Atualizar
                                    </button>
                                </div>
                                {
                                    isModalOpen ? (
                                        <Modal isOpen={isOpen} onClose={onClose}  />
                                    ) : (
                                        null
                                    )
                                }
                            </div>

                        ))}
                    </div>



                ) : (
                    <p>Carregando...</p>
                )
            ) : (
                <p>Não há personagens cadastrados</p>
            )}
        </div>
    )
};
export default home;




