import React from 'react'
import style from './vencedor.module.css';

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
                  Voltar
                </button>
              </div>
              <div className={style.modal_body}>
                <h1>{winner.nome} é o vencedor!</h1>
                <h2>{player} ganhou desse duelo!</h2>
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

export default Ganhador;