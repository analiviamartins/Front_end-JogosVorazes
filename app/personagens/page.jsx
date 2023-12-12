'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Modal from "../components/modal/page.jsx"
import style from "../personagens/personagens.module.css"
import Link from "next/link";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";
import { PiBookBookmarkFill } from "react-icons/pi";
import Header from "../components/header/page.jsx";
import Footer from "../components/footer/page.jsx";

function home() {
    const [vorazes, setVorazes] = useState([])
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();

    const [modalMostar, setModalMostrar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [nomeFiltro, setNomeFiltro] = useState("");
    const [distritoFiltro, setDistritoFiltro] = useState("");
    const [profissaoFiltro, setProfissaoFiltro] = useState("");

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


    const update = async (id) => {
        router.push(`/personagens/${id}`);
    };

    useEffect(() => {
        async function fetchVoraze() {
            try {
                const resposta = await axios.get("/api/vorazes");
                setVorazes(resposta.data.voraze)
                setDadosApi(resposta.data.voraze)
            } catch (error) {
                console.log("error fetching data:", error)
            }
        }

        fetchVoraze();

    }, []);

    const personagensFiltrados = dadosApi.filter(vorazes =>
        vorazes.nome.toLowerCase().includes(nomeFiltro.toLowerCase()) &&
        vorazes.distrito.toLowerCase().includes(distritoFiltro.toLowerCase()) &&
        vorazes.profissao.toLowerCase().includes(profissaoFiltro.toLowerCase())
    );


    console.log(dadosApi)
    return (
        <div className={style.body}>
            <Header />
            <div className={style.titulo}>
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
                {personagensFiltrados ? (
                    personagensFiltrados.map((vorazes) => (
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
            <Footer />
        </div>
    )
};
export default home;