//'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
"use client";
//Importe dos itens necessários
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//definir componente UpdateVoraze
export default function UpdateVoraze({ params }) {
  const { id } = params;
  const [voraze, setVoraze] = useState("");
  const router = useRouter();

//declarar variável
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [genero, setGenero] = useState("");
  const [profissao, setProfissao] = useState("");
  const [dano, setDano] = useState("");
  const [defesa, setDefesa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

//buscar dados do personagem
  useEffect(() => {
    async function fetchVoraze() {
      const response = await axios.get(
        `http://localhost:3000/api/vorazes/${id}`
      );
      setVoraze(response.data);
      setNome(response.data.nome);
      setIdade(response.data.idade);
      setDistrito(response.data.distrito);
      setGenero(response.data.genero);
      setProfissao(response.data.profissao);
      setDano(response.data.dano);
      setDefesa(response.data.defesa);
      setDescricao(response.data.descricao);
      setImagem(response.data.imagem);
    }

    //requisição GET para a API
    fetchVoraze();
  }, []);

//definir função
  const voltar = async () => {
    router.push(`http://localhost:3000/api/vorazes/personagens`);
};

//requisição PUT para atualizar os personagens
  const atualizarPerso = () => {
    axios.put(`http://localhost:3000/api/vorazes/${id}`, {
        nome: nome,
        idade: idade,
        distrito: distrito,
        genero: genero,
        profissao:profissao,
        dano: dano,
        defesa: defesa,
        descricao:descricao,
        imagem:imagem,
      })
      .then((response) => {
        router.push("/personagens");
      });
  };

  return (

    <div>
      
      <h1>Atualizar Personagem</h1>
      {voraze ? (
        <div>
          <p>{voraze.id}</p>
           {/* campos do formulário */}
          <form onSubmit={atualizarPerso}>
             {/*renderização dos componentes*/}
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="text"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
            <input
              type="text"
              id="distrito"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              required
            />
            <input
              type="text"
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
            <input
              type="text"
              id="profissao"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
              required
            />
            <input
              type="text"
              id="dano"
              value={dano}
              onChange={(e) => setDano(e.target.value)}
              required
            />
            <input
              type="text"
              id="defesa"
              value={defesa}
              onChange={(e) => setDefesa(e.target.value)}
              required
            />
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <input
              type="link"
              id="image"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
            />
             {/*botão de atualizar e outro para voltar para págian de personagens*/}
            <button onClick={() => atualizarPerso()}>Atualizar</button>
            <button onClick={()=> voltar()}>Voltar</button>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>

  );
}