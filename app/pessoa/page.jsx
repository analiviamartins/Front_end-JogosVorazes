'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"


function home() {
    const [pessoa, setPessoa] = useState([])
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function PessoaFetch() {
            try {
                const resposta = await axios.get("/api/pessoa");
                setPessoa(resposta.data.membros)
                setDadosApi(resposta.data.membros)
            } catch (error) {
                console.log("error fetching data:", error)
            }
        }

        PessoaFetch();

    }, []);

    console.log(dadosApi)
    return (
        <div>
            <p>Sobre nós</p>
            {dadosApi ? (
                pessoa ? (
                    <div>
                        {dadosApi.map((pesso) => (
                            <div key={pesso.id}>
                                <div>
                                    <p><strong> Nome:</strong> {pesso.nome} </p>
                                    <img src={pesso.url} alt={pesso.nome} />
                                    
                                    <p><strong>Idade:</strong> {pesso.idade}
                                    </p>
                                    
                                    <p><strong>Email:</strong> {pesso.email}
                                    </p>
                                    
                                    <p><strong>Hobby:</strong> {pesso.hobby}
                                    </p>
                                </div>
                            <div>
                        </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            ) : (
                <p>Não há pessoas cadastradas</p>
            )} 
            <div>
         </div>
         <div>
         <h2> Cadastrar </h2>
         <input
         value={nome} className={style.input} onChange={(e) => setNome(e.target.value)} type="text"  placeholder="Nome:"  />

            
            <input
              value={url}
              className={style.input} onChange={(e) => setImage(e.target.value)} type="url" placeholder="Link da sua imagem:"/>
            

            <input
              value={age}
              className={style.input} onChange={(e) => setIdade(e.target.value)} type="number" placeholder="Idade:"/>
            
            
            <input
              value={email}
              className={style.input} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email:" />
            
          
            <input
              value={hobby}
              className={style.input} onChange={(e) => setHobby(e.target.value)} type="text" placeholder="Seu hobby:"
            />
             <button className={style.remove} onClick={() => removePessoa(person)}>Excluir</button>
             <button className={style.edit} onClick={() => editPessoa(person)}>Editar</button>
          </div>
        </div>
    )
    
};
export default home;