"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css'

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default function Cadaster() {
  const [nome, setNome] = useState("");
  const [url, setImage] = useState("");
  const [age, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const router = useRouter;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/pessoas", { nome, url, age, email, hobby, pessoas });
      setNome("");
      setImage("");
      setIdade("");
      setEmail("");
      setHobby("");
      setPessoas("");
      router.push(`/pessoas/`);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    async function fetchPessoas() {
      try {
        const response = await api.get("/api/pessoas");
        setPessoas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPessoas();
  }, []);

  return (
    <div className={styles.container}>
      <header />
      <div className={styles.actions}>
        <a href="./pessoas">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Go Home
          </button>
        </a>
      </div>
      <div className={styles.pessoasContainer}>
        <h1 className={styles.mainText}>Cadastre-se</h1>
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
            <label className={styles.label} htmlFor="url">
              Link da Imagem:
            </label>
            <input
              className={styles.input}
              type="url"
              id="url"
              value={url}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="age">
              Idade:
            </label>
            <input
              className={styles.input}
              type="number"
              id="age"
              value={age}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="hobby">
              Hobby:
            </label>
            <input
              className={styles.input}
              type="text"
              id="hobby"
              value={hobby}
              onChange={(e) => setHobby(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles.button} ${styles.submitButton}`}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}