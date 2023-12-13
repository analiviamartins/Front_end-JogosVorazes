// Importando os módulos necessários
import React, { useState, useEffect } from 'react';
import estilo from './loading.module.css';

// Definindo o componente Loading
const Loading = () => {
 // Definindo o estado para controlar a visibilidade da imagem
 const [showImage, setShowImage] = useState(true);

 // Usando o hook useEffect para alterar o estado da imagem após 2 segundos
 useEffect(() => {
   const timer = setTimeout(() => {
     setShowImage(false); // Definindo a imagem para não ser mostrada após 2 segundos
   }, 2000);

   // Função de limpeza para parar o temporizador quando o componente for desmontado
   return () => clearTimeout(timer);
 }, []); // O array vazio significa que o useEffect será executado apenas uma vez quando o componente for montado

 // Se a imagem não deve ser mostrada, retorna null
 if (!showImage) {
   return null;
 }

 // Renderiza a imagem de carregamento
 return (
   <div className={estilo.full_screen_gif}>
     <img src="/loadingGif5.gif" alt="GIF" />
   </div>
 );
};

// Exportando o componente Loading
export default Loading;
