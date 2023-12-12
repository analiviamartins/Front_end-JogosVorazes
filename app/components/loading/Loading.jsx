//importando dos itens necessarios
import React from 'react';
import estilo from './loading.module.css';

//definindo o componente Loading
const Loading = () => {
  //retornando dados
  return (
    //criando um elemento de div para a imagem de carregamento
    <div className={estilo.full_screen_gif}>
      <img src="/loading.png" alt="GIF" />
    </div>
  );
};
//exportando o componente Loading
export default Loading;