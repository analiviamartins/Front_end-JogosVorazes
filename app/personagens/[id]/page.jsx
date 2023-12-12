"use client";
import axios from "axios";
import style from "./page.module.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateVoraze({ params }) {
  const { id } = params;
  const [voraze, setVoraze] = useState("");
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [genero, setGenero] = useState("");
  const [profissao, setProfissao] = useState("");
  const [dano, setDano] = useState("");
  const [defesa, setDefesa] = useState("");
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
      setDano(response.data.dano);
      setDefesa(response.data.defesa);
      setDescricao(response.data.descricao);
      setImagem(response.data.imagem);
    }

    fetchVoraze();
  }, []);

  const voltar = async () => {
    router.push(`http://localhost:3000/api/vorazes/personagens`);
  };

  const atualizarPerso = () => {
    axios.put(`http://localhost:3000/api/vorazes/${id}`, {
      nome: nome,
      idade: idade,
      distrito: distrito,
      genero: genero,
      profissao: profissao,
      dano: dano,
      defesa: defesa,
      descricao: descricao,
      imagem: imagem,
    })
      .then((response) => {
        router.push("/personagens");
      });
  };

  return (

    <div className={style.container}>
      <div className={style.editarContainer}>
        <h1 className={style.mainText}>Atualizar Personagem</h1>
        {voraze ? (
          <div>
            <form onSubmit={atualizarPerso}>
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
                <label className={style.label} htmlFor="distrito">
                  Distrito:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="distrito"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="gênero">
                  Gênero:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="profissão">
                  Profissão:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="profissao"
                  value={profissao}
                  onChange={(e) => setProfissao(e.target.value)}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="dano">
                  Dano:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="dano"
                  value={dano}
                  onChange={(e) => setDano(e.target.value)}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="defesa">
                  Defesa:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="defesa"
                  value={defesa}
                  onChange={(e) => setDefesa(e.target.value)}
                  required
                />
              </div>
              <div className={style.formGroup}>
                <label className={style.label} htmlFor="descrição">
                  Descrição:
                </label>
                <input
                  className={style.input}
                  type="text"
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
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
                  id="image"
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                  required
                />
              </div>
              <div className={style.lado}>
              <div>
              <button onClick={() => atualizarPerso()} className={`${style.button} ${style.submitButton}`}>Atualizar</button>
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