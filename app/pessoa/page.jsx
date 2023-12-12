"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default function Register() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [email, setEmail] = useState("");
    const [hobby, setHobby] = useState("");
    const [img, setImg] = useState("");
    const [equipe, setEquipe] = useState("");
  const router = useRouter();

  const deletePessoa = async (id) => {
    console.log("id do delete", id)
    const url = `/api/equipe/${id}`;
    try {
        await axios.delete(url);
        setEquipe(equipe.filter((equipes) => equipes.id !== id));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
 };

 const editPessoa = async (id) => {
  console.log("id do edit", id)

  router.push(`/equipe/${id}`);
}; 


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/equipe", {nome, idade, email, hobby, img});
      setEquipe([...equipe, response.data.data]);
      setNome("");
      setIdade("");
      setEmail("");
      setHobby("");
      setImg("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };


  useEffect(() => {
    async function fetchPessoa() {
      try {
        const response = await axios.get("/api/equipe");
        setEquipe(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPessoa();
  }, [deletePessoa,editPessoa, handleSubmit]);

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Link href="/pessoas">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Membros
          </button>
        </Link>
      </div>
  
      <div className={styles.studentsContainer}>
        <h1 className={styles.mainText}>Cadastrar Membro</h1>
  
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
              type="text"
              id="idade"
              value={idade}
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
              type="text"
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
  
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="imagem">
              Imagem:
            </label>
            <input
              className={styles.input}
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
  
          <button
            type="submit"
            onClick={handleSubmit}
            className={`${styles.button} ${styles.submitButton}`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};