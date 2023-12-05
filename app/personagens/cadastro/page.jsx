"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./register.module.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/vorazes", { nome, idade, distrito, genero, profissao, descricao, imagem });
      setVorazes([...vorazes, response.data]);
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
    async function fetchStudents() {
      try {
        const response = await axios.get("/api/vorazes");
        setVorazes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchStudents();
  }, []);
  return (
    <div className={styles.container}>

      <div className={styles.actions}>
        <Link href="/vorazes">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Alunos
          </button>
        </Link>
      </div>

      <div className={styles.studentsContainer}>
        <h1 className={styles.mainText}>Cadastrar Aluno</h1>

        <form onSubmit={handleSubmit}>
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
              type="number"
              id="idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="distrito">
              distrito:
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
              genero:
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
              profissao:
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
              descricao:
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

          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}