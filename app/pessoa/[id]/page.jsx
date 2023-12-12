"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateStudent({ params }) {
  const { id } = params;
  const [equipe, setEquipe] = useState("");
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    async function fetchEquipe() {
      const response = await axios.get(
        `http://localhost:3000/api/equipe/${id}`
      );
      setEquipe(response.data);
      setNome(response.data.nome);
      setIdade(response.data.idade);
      setEmail(response.data.email);
      setHobby(response.data.hobby);
      setImg(response.data.img);
    }

    fetchEquipe();
  }, []);

  const voltar = async () => {
    router.push(`http://localhost:3000/api/equipe/pessoa`)};

  const atualizarPessoa = () => {
    axios.put(`http://localhost:3000/api/equipe/${id}`, {
        nome: nome,
        idade: idade,
        email: email,
        hobby: hobby,
        img:img,
      })
      .then((response) => {
        router.push("/pessoa");
      });
  };

  return (
    <div className={style.container}>
      <div className={style.editarContainer}>
      <h1>Atualizar Membro</h1>
      {equipe ? (
        <div>
          <p>{equipe.id}</p>
          <form onSubmit={atualizarPessoa}>
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
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              required
            />
            <input
              type="link"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
            <button onClick={() => atualizarPessoa()}>Atualizar</button>
            <button onClick={()=> voltar()}>Voltar</button>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    </div>
  );
}