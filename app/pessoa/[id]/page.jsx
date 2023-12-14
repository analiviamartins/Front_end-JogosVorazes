// 'use client' é uma diretiva para o Babel que permite o uso de recursos mais recentes do JavaScript.
"use client"

// Importa as bibliotecas e componentes necessários
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../pessoa/[id]/page.module.css"
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";

// Define a função do componente UpdateStudent
export default function UpdateMembros({ params}) {
  // Define o estado inicial para os campos do formulário e a equipe
 const router = useRouter();
 const { id } = params;
 const [equipe, setEquipe] = useState("");
 const [nome, setNome] = useState("");
 const [idade, setIdade] = useState("");
 const [email, setEmail] = useState("");
 const [hobby, setHobby] = useState("");
 const [img, setImg] = useState("");

 // Define a função para buscar os dados da equipe
 useEffect(() => {
   async function fetchEquipe() {
     const response = await axios.get(`http://localhost:3000/api/equipe/${id}`);
     setEquipe(response.data);
     setNome(response.data.nome);
     setIdade(response.data.idade);
     setEmail(response.data.email);
     setHobby(response.data.hobby);
     setImg(response.data.img);
   }

   fetchEquipe();
 }, []);

 // Define a função para atualizar um membro da equipe
 const atualizarPessoa = () => {
   axios.put(`http://localhost:3000/api/equipe/${id}`, {
       nome: nome,
       idade: idade,
       email: email,
       hobby: hobby,
       img: img,
     })
     .then((response) => {
       router.push("/pessoa");
     });
 };

  // Retorna o JSX do componente
 return (
   <div className={styles.container}>
    <Header/>
    <div className={styles.actions}>
        <Link href="/pessoa">
          <button className={`${styles.button} ${styles.primaryButton}`}>
            Voltar para Equipe
          </button>
        </Link>
      </div>
     <div className={styles.editarContainer}>
       <h1 className={styles.mainText}>Atualizar Membro</h1>
       {equipe ? (
         <div>
           <form onSubmit={atualizarPessoa}>
             <div className={styles.formGroup}>
               <label className={styles.label} htmlFor="nome">Nome:</label>
               <input className={styles.input} type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
             </div>
             <div className={styles.formGroup}>
               <label className={styles.label} htmlFor="idade">Idade:</label>
               <input className={styles.input} type="text" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
             </div>
             <div className={styles.formGroup}>
               <label className={styles.label} htmlFor="email">Email:</label>
               <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
             </div>
             <div className={styles.formGroup}>
               <label className={styles.label} htmlFor="hobby">Hobby:</label>
               <input className={styles.input} type="text" id="hobby" value={hobby} onChange={(e) => setHobby(e.target.value)} required />
             </div>
             <div className={styles.formGroup}>
               <label className={styles.label} htmlFor="imagem">Imagem:</label>
               <input className={styles.input} type="url" id="img" value={img} onChange={(e) => setImg(e.target.value)} required />
             </div>
               <div className={styles.button}>
                <button onClick={() => atualizarPessoa()} className={`${styles.button} ${styles.submitButton}`}>Atualizar</button>
             </div>
           </form>
         </div>
       ) : (
         <p>Carregando...</p>
       )}
     </div>
     <Footer />
   </div>
 );
}
