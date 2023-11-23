'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

function home(){
    const [vorazes, setVorazes] = useState([])
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function JogosFetch() {
            try {
                const resposta = await axios.get("/api/vorazes");
                setVorazes(resposta.data)
                setDadosApi(resposta.data)
            } catch(error) {
                console.log("error fetching data:", error)
            }
        }

        JogosFetch();

    },[]);

    console.log(dadosApi)
    console.log(vorazes)
    return(
        <div>
            <p>Jogos Vorazes</p>
            {dadosApi.length ? (
                vorazes ? (
                    <div>
                        {dadosApi.map((voraze)=> (
                            <div key={voraze.id}>
                                <div>
                                    <p>
                                        <strong>ID</strong> {voraze.id}
                                    </p>
                                    <p>
                                        <strong>Nome:</strong> {voraze.nome}
                                    </p>
                                    <p>
                                        <strong>Idade</strong> {voraze.idade}
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