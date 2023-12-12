//importe dos itens necessários
import React from 'react';
import style from './vencedor.module.css';

//criação do Ganhador
const Ganhador = ({ isOpen, onClose, winner, player }) => {
    if (!isOpen) {
      return null;
}

return (
    <>
     {
        winner ? (
          //criação do card
            <div className={style.modal_overlay}>
            <div className={style.modal}>
              <div className={style.modal_header}>
                {/*adição do título*/}
                <h2>Resultado da Batalha</h2>
                {/*botão para fechar o card*/}
                <button className={style.close_button} onClick={onClose}>
                  Fechar
                </button>
              </div>
              <div className={style.modal_body}>
                {/*adição do texto*/}
                <h1>{winner.nome} é o vencedor!</h1>
                <h2>{player} ganhou desse duelo!</h2>
                {/*adição da imagem*/}
                <img src={winner.imagem} alt={winner.nome} width={256}  height={128}/>
                <p>Ataque: {winner.dano}</p>
                <p>Defesa: {winner.defesa}</p>
              </div>
            </div>
          </div>
        ):(null)
       
    }
    </>
   
   
  );
};

//exporte da função
export default Ganhador;