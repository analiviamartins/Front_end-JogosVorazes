"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "@/app/pessoas/pessoas.module.css";
import Link from "next/link";

export default function Cadaster() {
  const [nome, setNome] = useState("");
  const [url, setImage] = useState("");
  const [age, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [pessoas, setPessoas] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault(); {
      try {
        const response = await axios.post("/api/equipe", { nome, url, age, email, hobby, pessoas });
        setPessoas([...pessoas, response.data]);
        setNome("");
        setImage("");
        setIdade("");
        setEmail("");
        setHobby("");

      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };

    useEffect(() => {
      async function fetchPessoas() {
        try {
          const response = await axios.get("/api/equipe");
          setPessoas(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchPessoas();
    }, []);
  }
  console.log(pessoas);
  return (
    <div>
      <div className={styles.actions}>
        <Link href="/pessoas">
          <button type="button" className={`${styles.button} ${styles.backbutton}`}>
            Back Home
          </button>
        </Link>
      </div>
      <div className={styles.pessoasContainer}>
        <h1 className={styles.mainText}>Seu cadastro:</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Nome:
            </label>
            <input className={styles.input} type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="url">
              URL da sua imagem:
            </label>
            <input className={styles.input} type="url" id="url" value={url} onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="age">
              Idade:
            </label>
            <input className={styles.input} type="number" id="age" value={age} onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="hobby">
              Hobby:
            </label>
            <input className={styles.input} type="text" id="hobby" value={hobby} onChange={(e) => setHobby(e.target.value)}
              required
            />
          </div>
          <button type="button" className={`${styles.button} ${styles.submitButton}`}>
            Cadastrar
          </button>

        </form>
      </div>
    </div>
  );
}









