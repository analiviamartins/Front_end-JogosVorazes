// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
"use client";

// Importa as bibliotecas e componentes necessários
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/app/components/header/page";

// Define a função do componente Register
export default function Register() {
   // Define o estado inicial para os campos do formulário e a equipe
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [email, setEmail] = useState("");
    const [hobby, setHobby] = useState("");
    const [img, setImg] = useState("");
    const [equipe, setEquipe] = useState([]);
    const [dadosApi, setDadosApi] = useState([]);
    const router = useRouter();

    // Define a função para deletar um membro da equipe
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

     // Define a função para editar um membro da equipe
    const editPessoa = async (id) => {
        console.log("id do edit", id)

        router.push(`/equipe/${id}`);
    };

// Define a função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/vorazes", { nome, idade, distrito, genero, profissao, descricao, imagem });
            setVorazes([...equipe, response.data.data]);
            setNome("");
            setIdade("");
            setEmail("");
            setHobby("");
            setImg("");
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    // Define a função para buscar os membros da equipe
    useEffect(() => {
        async function fetchPessoa() {
            try {
                const response = await axios.get("/api/vorazes");
                setVorazes(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchPessoa();
    }, [deletePessoa, editPessoa, handleSubmit]);

     // Retorna o JSX do componente
    return (
        <div className={styles.container}>
          <Header />
          <div className={styles.actions}>
            <Link href="/pessoa">
              <button className={`${styles.button} ${styles.primaryButton}`}>
                Voltar para Equipe
              </button>
            </Link>
          </div>
      
          <div className={styles.cadastroContainer}>
            <h1 className={styles.mainText}>Cadastrar personagem</h1>
      
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
                type="submit" onClick={handleSubmit}
                className={`${styles.button} ${styles.submitButton}`}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      );
};