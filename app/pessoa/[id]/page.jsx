"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "../../pessoa/[id]/page.module.css"

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
      <h1 className={style.mainText}>Atualizar Membro</h1>
      {equipe ? (
        <div>
          <form onSubmit={atualizarPessoa}>
          <div className={style.formGroup}>
          <label className={style.label} htmlFor="nome">
                  Nome:
                </label>
            <input
            className={style.input}
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            </div>
            <div className={style.formGroup}>
            <label className={style.label} htmlFor="idade">
                  Idade:
                </label>
            <input
            className={style.input}
              type="text"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
             </div>
            <div className={style.formGroup}>
            <label className={style.label} htmlFor="email">
                  Email:
                </label>
            <input
            className={style.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
             </div>
            <div className={style.formGroup}>
            <label className={style.label} htmlFor="hobby">
                  Hobby:
                </label>
            <input
            className={style.input}
              type="text"
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              required
            />
            </div>
            <div className={style.formGroup}>
            <label className={style.label} htmlFor="imagem">
                  Imagem:
                </label>
            <input
            className={style.input}
              type="link"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
            </div>
            <div className={style.lado}>
              <div>
              <button onClick={() => atualizarPessoa()} className={`${style.button} ${style.submitButton}`}>Atualizar</button>
              </div>
              <div>
                <button onClick={() => voltar()} className={`${style.button} ${style.primaryButton}`}>Voltar</button>
              </div>
              </div>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    </div>
  );
}