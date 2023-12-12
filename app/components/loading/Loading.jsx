//importe dos itens necessários
import React from 'react';
import estilo from './loading.module.css';

//criação do loading
const Loading = () => {
  return (
    <div className={estilo.full_screen_gif}>
      {/*adição de um gif*/}
      <img src="/loading.png" alt="GIF" />
    </div>
  );
};

//exporte do loading
export default Loading;