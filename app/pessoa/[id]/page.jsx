"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../pessoa/[id]/page.module.css"

export default function UpdateStudent({ params}) {
 const router = useRouter();
 const { id } = params;
 const [equipe, setEquipe] = useState("");

 const [nome, setNome] = useState("");
 const [idade, setIdade] = useState("");
 const [email, setEmail] = useState("");
 const [hobby, setHobby] = useState("");
 const [img, setImg] = useState("");

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
 }, [id]);

 const voltar = async () => {
   router.push(`http://localhost:3000/pessoa`);
 };

 const atualizarPessoa = () => {
   axios.put(`http://localhost:3000/${id}`, {
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

 return (
   <div className={styles.container}>
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
             <div className={styles.lado}>
               <div>
                <button onClick={() => atualizarPessoa()} className={`${styles.button} ${styles.submitButton}`}>Atualizar</button>
               </div>
               <div>
                <button onClick={() => voltar()} className={`${styles.button} ${styles.primaryButton}`}>Voltar</button>
               </div>
             </div>
           </form>
         </div>
       ) : (
         <p>Carregando...</p>
       )}
     </div>
   </div>
 );
}
