'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"


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
        <div>
            <p>Jogos Vorazes</p>
            {dadosApi ? (
                vorazes ? (
                    <div>
                        {dadosApi.map((voraze) => (
                            <div key={voraze.id}>
                                <div>
                                    <p>
                                        <strong>Nome</strong> {voraze.nome}
                                    </p>
                                    <img src={voraze.imagem} alt={voraze.nome} />
                                    <p>
                                        <strong>Idade</strong> {voraze.idade}
                                    </p>
                                    <p>
                                        <strong>Distrito</strong> {voraze.distrito}
                                    </p>
                                    <p>
                                        <strong>Gênero</strong> {voraze.genero}
                                    </p>
                                    <p>
                                        <strong>Profissão</strong> {voraze.profissao}
                                    </p>
                                    <p>
                                        <strong>Descrição</strong> {voraze.descricao}
                                    </p>
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
        </div>
    )
};
export default home;