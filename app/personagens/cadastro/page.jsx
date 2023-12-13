// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
"use client";

// Importa as bibliotecas e componentes necessários
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";

// Define a função do componente Register
export default function Register() {

   // Define o estado inicial para os campos do formulário e os personagens
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [genero, setGenero] = useState("");
  const [profissao, setProfissao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [vorazes, setVorazes] = useState([]);
  const [dadosApi, setDadosApi] = useState([]);

   // Obtém o objeto de roteamento do Next.js
  const router = useRouter();

   // Define a função para deletar um personagem
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

  // Define a função para editar um personagem
 const editPerso = async (id) => {
  console.log("id do edit", id)

  router.push(`/vorazes/${id}`);
}; 

// Define a função para lidar com o envio do formulário
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

 // Define a função para buscar os personagens
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

   // Retorna o JSX do componente
  return (
    <div className={styles.container}>
      <Header />
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
          <Footer />
        </div>

  );
}