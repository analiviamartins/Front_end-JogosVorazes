import React from 'react';
import style from './ganhador.module.css';

const Ganhador = ({ isOpen, onClose, winner, player }) => {
    if (!isOpen) {
      return null;
}

return (
    <>
     {
        winner ? (
            <div className={style.modal_overlay}>
            <div className={style.modal}>
              <div className={style.modal_header}>
                <h2>Resultado da Batalha</h2>
                <button className={style.close_button} onClick={onClose}>
                  Fechar
                </button>
              </div>
              <div className={style.modal_body}>
                <h1>{winner.nome} é o vencedor!</h1>
                <h2>{player} é o vencedor desse duelo!</h2>
                <img src={winner.imagem} alt={winner.nome} />
                <p>Ataque: {winner.ataque}</p>
                <p>Defesa: {winner.defesa}</p>
              </div>
            </div>
          </div>
        ):(null)
       
    }
    </>
   
   
  );
};

export default Ganhador;