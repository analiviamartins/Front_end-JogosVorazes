//Importando as bibliotecas e componentes necessários.
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

//definir componente Register
export default function Register() {
  //declarar variável
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

  //função de excluir
  const deletePerso = async (id) => {
    //requisição DELETE para a API
    const url = `/api/vorazes/${id}`;
    try {
        await axios.delete(url);
        setVorazes(vorazes.filter((voraze) => voraze.id !== id));
    } catch (error) {
    }
 };

 //função editar
 const editPerso = async (id) => {
 router.push(`/vorazes/${id}`);
}; 

//função para lidar com o envio do formulário.
  const handleSubmit = async (e) => {
    e.preventDefault();
   //requisição POST para a API
    try {
      const response = await axios.post("/api/vorazes", { nome, idade, distrito, genero, profissao, descricao, imagem });
      setVorazes([...vorazes, response.data.data]);
      //resetando formulário
      setNome("");
      setIdade("");
      setDistrito("");
      setGenero("");
      setProfissao("");
      setDescricao("");
      setImagem("");
    } catch (error) {
    }
  };

//buscar dados da API
  useEffect(() => {
    async function fetchPerso() {
      try {
        const response = await axios.get("/api/vorazes");
        setVorazes(response.data);
      } catch (error) {
      }
    }

    fetchPerso();
  }, [deletePerso,editPerso, handleSubmit]);

  //renderizar componente 
  return (
    <div className={styles.container}>

      <div className={styles.actions}>
        <Link href="/personagens">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para personagens
          </button>
        </Link>
      </div>
      {/*div para cadasro*/}
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
            {/*input para idade*/}
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
            {/*input para distrito*/}
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
            {/*input  para genero*/}
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
            {/*input para profissão*/}
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
            {/*input para descrição*/}
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
          {/*input para imagem*/}
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
          {/*botão de cadastrar*/}
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