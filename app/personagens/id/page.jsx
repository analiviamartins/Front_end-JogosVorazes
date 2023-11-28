"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateStudent({ params }) {
  const { id } = params;
  const [voraze, setVoraze] = useState("");
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [genero, setGenero] = useState("");
  const [profissao, setProfissao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

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
      setDescricao(response.data.descricao);
      setImagem(response.data.imagem);
    }

    fetchVoraze();
  }, []);

  const atualizarPerso = () => {
    axios
      .put(`http://localhost:3000/api/voraze/${id}`, {
        nome: nome,
        idade: idade,
        distrito: distrito,
        genero: genero,
        profissao:profissao,
        descricao:descricao,
        imagem:imagem,
      })
      .then((response) => {
        router.push("/voraze");
      });
  };

  return (
    <div>
      <h1>Atualizar Personagem</h1>
      {voraze ? (
        <div>
          <p>{voraze.id}</p>
          <form onSubmit={atualizarPerso}>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
            <input
              type="text"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
            />
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            <input
              type="text"
              value={descricao}
              onChange={(e) => setProfissao(e.target.value)}
            />
            <input
              type="text"
              value={profissao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
            <button>Atualizar</button>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}