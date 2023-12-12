"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default function Register() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [genero, setGenero] = useState("");
  const [profissao, setProfissao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [vorazes, setVorazes] = useState([]);
  const [dadosApi, setDadosApi] = useState([]);
  const router = useRouter();

  const deletePerso = async (id) => {
    console.log("id do delete", id)
    const url = `/api/vorazes/${id}`;
    try {
        await axios.delete(url);
        setVorazes(vorazes.filter((voraze) => voraze.id !== id));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
 };

 const editPerso = async (id) => {
  console.log("id do edit", id)

  router.push(`/vorazes/${id}`);
}; 


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/vorazes", { nome, idade, distrito, genero, profissao, descricao, imagem });
      setVorazes([...vorazes, response.data.data]);
      setNome("");
      setIdade("");
      setDistrito("");
      setGenero("");
      setProfissao("");
      setDescricao("");
      setImagem("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };


  useEffect(() => {
    async function fetchPerso() {
      try {
        const response = await axios.get("/api/vorazes");
        setVorazes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPerso();
  }, [deletePerso,editPerso, handleSubmit]);

  return (
    <div className={styles.container}>

      <div className={styles.actions}>
        <Link href="/personagens">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para personagens
          </button>
        </Link>
      </div>

      <div className={styles.cadastroContainer}>
        <h1 className={styles.mainText}>Cadastrar personagem</h1>

        <form onSubmit={handleSubmit} >
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="nome">
              Nome:
            </label>
            <input
              className={styles.input}
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="idade">
              Idade:
            </label>
            <input
              className={styles.input}
              type="text"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="distrito">
              Distrito:
            </label>
            <input
              className={styles.input}
              type="text"
              id="distrito"
              value={distrito}
              onChange={(e) => setDistrito(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="genero">
              Gênero:
            </label>
            <input
              className={styles.input}
              type="text"
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="profissao">
              Profissao:
            </label>
            <input
              className={styles.input}
              type="text"
              id="profissao"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="descricao">
              Descricao:
            </label>
            <input
              className={styles.input}
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="image">
              Image:
            </label>
            <input
              className={styles.input}
              type="link"
              id="image"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
            />
          </div>

          <button
           type="submit" onClick={handleSubmit}
            className={`${styles.button} ${styles.submitButton}`}
          >
            Cadastrar
          </button>
        </form>
          </div>
        </div>

  );
}