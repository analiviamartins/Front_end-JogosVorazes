"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "@/app/pessoas/pessoas.module.css";
import { useRouter } from 'next/navigation';

export default function Cadaster() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [hobby, setHobby] = useState("");
  const [img, setImage] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault(); {
      try {
        const response = await axios.post("/api/equipe", { nome, idade, email, hobby, img });
        setPessoas([...pessoas, response.data]);
        setNome("");
        setIdade("");
        setEmail("");
        setHobby("");
        setImage("");
        console.log(handleSubmit)

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
            <label className={styles.label} htmlFor="idade">
              Idade:
            </label>
            <input className={styles.input} type="number" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)}
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
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="imagem">
              Imagem:
            </label>
            <input className={styles.input} type="url" id="img" value={img} onChange={(e) => setImage(e.target.value)} 
            rquired 
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









